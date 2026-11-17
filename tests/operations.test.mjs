import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { promisify } from "node:util";
import { execFile } from "node:child_process";
import { mkdtemp, mkdir, writeFile, readdir, readFile, stat, rm, utimes } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { gunzipSync } from "node:zlib";

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
