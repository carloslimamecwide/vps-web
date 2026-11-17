import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { promisify } from "node:util";
import { execFile } from "node:child_process";
import { mkdtemp, mkdir, writeFile, readdir, readFile, stat, rm, utimes } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { gunzipSync, gzipSync } from "node:zlib";

const exec = promisify(execFile);
const root = resolve(import.meta.dirname, "..");
const backup = join(root, "examples/postgres/backup.sh");

async function backupFixture(mode) {
  const directory = await mkdtemp(join(tmpdir(), "vps-backup-test-"));
  const bin = join(directory, "bin");
  const backups = join(directory, "backups");
  await mkdir(bin);
  await mkdir(backups);
  await writeFile(join(bin, "docker"), `#!/bin/sh
case "$MOCK_DUMP_MODE" in
  failure) printf 'partial SQL'; exit 42 ;;
  empty) exit 0 ;;
  *) printf '%s\\n' '-- PostgreSQL database cluster dump' 'SELECT 1;' ;;
esac
`, { mode: 0o755 });
  return {
    directory,
    backups,
    env: { ...process.env, PATH: `${bin}:${process.env.PATH}`, BACKUP_DIR: backups, MOCK_DUMP_MODE: mode },
    clean: () => rm(directory, { recursive: true, force: true }),
  };
}

test("uma falha do dump não publica backup nem aplica retenção", async () => {
  const fixture = await backupFixture("failure");
  try {
    const old = join(fixture.backups, "all_databases_old.sql.gz");
    await writeFile(old, "backup anterior");
    await utimes(old, new Date(0), new Date(0));
    await assert.rejects(exec("bash", [backup], { env: fixture.env }), (error) => {
      assert.equal(error.code, 42);
      assert.doesNotMatch(error.stdout, /Backup concluído/);
      return true;
    });
    assert.deepEqual(await readdir(fixture.backups), ["all_databases_old.sql.gz"]);
  } finally { await fixture.clean(); }
});

test("um dump vazio é rejeitado e o temporário é removido", async () => {
  const fixture = await backupFixture("empty");
  try {
    await assert.rejects(exec("bash", [backup], { env: fixture.env }), /dump está vazio/);
    assert.deepEqual(await readdir(fixture.backups), []);
  } finally { await fixture.clean(); }
});

test("um dump válido é publicado com acesso restrito e retém apenas os seus backups", async () => {
  const fixture = await backupFixture("success");
  try {
    for (const name of ["all_databases_old.sql.gz", "outro-backup.sql.gz"]) {
      const path = join(fixture.backups, name);
      await writeFile(path, "anterior");
      await utimes(path, new Date(0), new Date(0));
    }
    const result = await exec("bash", [backup], { env: fixture.env });
    assert.match(result.stdout, /Backup concluído/);
    const files = await readdir(fixture.backups);
    assert.equal(files.length, 2);
    assert.ok(files.includes("outro-backup.sql.gz"));
    const archive = files.find((name) => name.startsWith("all_databases_"));
    assert.match(archive, /\.sql\.gz$/);
    assert.match(gunzipSync(await readFile(join(fixture.backups, archive))).toString(), /SELECT 1;/);
    assert.equal((await stat(join(fixture.backups, archive))).mode & 0o777, 0o600);
  } finally { await fixture.clean(); }
});

test("uma retenção inválida falha antes de criar ficheiros", async () => {
  const fixture = await backupFixture("success");
  try {
    await assert.rejects(exec("bash", [backup], { env: { ...fixture.env, RETENTION_DAYS: "-1" } }), /inteiro positivo/);
    assert.deepEqual(await readdir(fixture.backups), []);
  } finally { await fixture.clean(); }
});

test("o restauro aguarda o servidor TCP e não aceita o socket temporário de inicialização", async () => {
  const fixture = await backupFixture("success");
  try {
    const bin = join(fixture.directory, "bin");
    await writeFile(join(bin, "docker"), `#!/bin/sh
case "$1" in
  run) printf 'container-de-teste\\n' ;;
  rm) touch "$MOCK_RESTORE_STATE/cleaned" ;;
  exec)
    shift
    interactive=false
    if [ "$1" = -i ]; then interactive=true; shift; fi
    shift
    command=$1
    shift
    case "$command" in
      pg_isready)
        host=''
        while [ "$#" -gt 0 ]; do
          case "$1" in
            -h|--host) host=$2; shift ;;
            --host=*) host=\${1#--host=} ;;
          esac
          shift
        done
        # O bootstrap responde pelo socket, mas ainda não aceita TCP.
        if [ -z "$host" ]; then exit 0; fi
        attempt=0
        if [ -f "$MOCK_RESTORE_STATE/attempts" ]; then
          attempt=$(cat "$MOCK_RESTORE_STATE/attempts")
        fi
        attempt=$((attempt + 1))
        printf '%s' "$attempt" > "$MOCK_RESTORE_STATE/attempts"
        if [ "$attempt" -lt 3 ]; then exit 1; fi
        touch "$MOCK_RESTORE_STATE/ready"
        ;;
      psql)
        if [ ! -f "$MOCK_RESTORE_STATE/ready" ]; then
          printf 'FATAL: terminating connection due to administrator command\\n' >&2
          exit 2
        fi
        if [ "$interactive" = true ]; then
          cat > "$MOCK_RESTORE_STATE/restored.sql"
        else
          printf 'exemplo1\\n'
        fi
        ;;
      *) exit 1 ;;
    esac
    ;;
  *) exit 1 ;;
esac
`, { mode: 0o755 });
    await writeFile(join(bin, "sleep"), "#!/bin/sh\nexit 0\n", { mode: 0o755 });
    const archive = join(fixture.backups, "restore.sql.gz");
    await writeFile(archive, gzipSync("SELECT 1;\n"));
    const result = await exec("bash", [join(root, "examples/postgres/restore-check.sh"), archive], {
      env: { ...fixture.env, MOCK_RESTORE_STATE: fixture.directory },
    });
    assert.match(result.stdout, /Restauro de teste concluído/);
    assert.equal(await readFile(join(fixture.directory, "attempts"), "utf8"), "3");
    assert.equal(await readFile(join(fixture.directory, "restored.sql"), "utf8"), "SELECT 1;\n");
    await stat(join(fixture.directory, "cleaned"));
  } finally { await fixture.clean(); }
});

test("o Compose de produção exige uma tag e aceita a versão explícita", () => {
  const env = { ...process.env };
  delete env.TAG;
  const compose = ["compose", "-f", join(root, "docker-compose.production.yml"), "config", "--format", "json"];
  assert.throws(() => execFileSync("docker", compose, { env, encoding: "utf8", stdio: "pipe" }), /TAG/);
  const config = JSON.parse(execFileSync("docker", compose, {
    env: { ...env, TAG: "a".repeat(40) }, encoding: "utf8", stdio: "pipe",
  }));
  assert.equal(config.services.web.image, `ghcr.io/carloslimamecwide/vps-web:${"a".repeat(40)}`);
  assert.ok(config.services.web.mem_limit);
  assert.ok(Number(config.services.web.cpus) > 0);
});

async function smokeFixture(scenario) {
  const previousFetch = globalThis.fetch;
  const previousArgv = process.argv;
  const calls = [];
  process.argv = ["node", "smoke-http.mjs", "http://smoke.test/"];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    if (String(url) === "http://smoke.test/") {
      return new Response('O guia de DevOps para iniciantes<link href="/_next/static/test.css">', { status: 200 });
    }
    return new Response("asset", { status: scenario === "broken-asset" ? 404 : 200 });
  };
  try {
    await import(`../scripts/smoke-http.mjs?scenario=${scenario}`);
    return calls;
  } finally {
    globalThis.fetch = previousFetch;
    process.argv = previousArgv;
  }
}

test("o smoke test verifica a página e os assets", async () => {
  const calls = await smokeFixture("success");
  assert.deepEqual(calls, ["http://smoke.test/", "http://smoke.test/_next/static/test.css"]);
});

test("o smoke test falha se um asset devolver erro", async () => {
  await assert.rejects(smokeFixture("broken-asset"), /HTTP 404/);
});
