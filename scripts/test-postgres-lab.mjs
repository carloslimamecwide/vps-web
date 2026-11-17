import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdtemp, writeFile, readdir, readFile, rm } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { gunzipSync } from "node:zlib";

const exec = promisify(execFile);
const root = resolve(import.meta.dirname, "..");
const directory = await mkdtemp(join(tmpdir(), "vps-postgres-lab-"));
const project = `vps-postgres-lab-${randomBytes(6).toString("hex")}`;
const container = `${project}-source`;
const file = join(directory, "compose.json");
const compose = ["compose", "-p", project, "-f", file];

try {
  const normalized = await exec("docker", ["compose", "-f", join(root, "examples/postgres/compose.yml"), "config", "--format", "json"]);
  const config = JSON.parse(normalized.stdout);
  const password = join(directory, "postgres_password");
  await writeFile(password, randomBytes(32).toString("base64"), { mode: 0o600 });
  config.services.postgres.container_name = container;
  config.services.postgres.ports = [];
  config.services.postgres.volumes = [{ type: "volume", source: "pgdata", target: "/var/lib/postgresql/data" }];
  config.secrets.postgres_password.file = password;
  config.networks = { data: { internal: true } };
  config.volumes = { pgdata: {} };
  delete config.name;
  await writeFile(file, JSON.stringify(config));
  await exec("docker", [...compose, "up", "--wait", "--wait-timeout", "120"], { timeout: 180_000 });
  await exec("docker", ["exec", container, "psql", "-v", "ON_ERROR_STOP=1", "-U", "exemplo1", "-d", "exemplo1", "-c",
    "CREATE TABLE backup_probe (id integer PRIMARY KEY, message text); INSERT INTO backup_probe VALUES (1, 'devops-validation');"]);
  const backups = join(directory, "backups");
  await exec("bash", [join(root, "examples/postgres/backup.sh")], {
    env: { ...process.env, POSTGRES_CONTAINER: container, POSTGRES_USER: "exemplo1", BACKUP_DIR: backups },
  });
  const archives = (await readdir(backups)).filter((name) => name.endsWith(".sql.gz"));
  assert.equal(archives.length, 1);
  const archive = join(backups, archives[0]);
  assert.match(gunzipSync(await readFile(archive)).toString(), /devops-validation/);
  const restored = await exec("bash", [join(root, "examples/postgres/restore-check.sh"), archive], { timeout: 180_000 });
  assert.match(restored.stdout, /exemplo1/);
  assert.match(restored.stdout, /Restauro de teste concluído/);
  console.log("PostgreSQL aprovado: secret montado, dump com dados e restauro isolado sem erros SQL");
} finally {
  try {
    await exec("docker", [...compose, "down", "--volumes", "--remove-orphans"], { timeout: 60_000 });
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}
