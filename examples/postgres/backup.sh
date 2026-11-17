#!/usr/bin/env bash
set -euo pipefail
umask 077

BACKUP_DIR="${BACKUP_DIR:-/srv/db/backups}"
POSTGRES_CONTAINER="${POSTGRES_CONTAINER:-postgres}"
POSTGRES_USER="${POSTGRES_USER:-exemplo1}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"
[[ "$RETENTION_DAYS" =~ ^[1-9][0-9]*$ ]] || {
  printf 'RETENTION_DAYS tem de ser um inteiro positivo\n' >&2
  exit 1
}

mkdir -p "$BACKUP_DIR"
timestamp=$(date -u +%Y%m%d_%H%M%S)
archive="$BACKUP_DIR/all_databases_${timestamp}_$$.sql.gz"
temporary=$(mktemp "$BACKUP_DIR/.backup.XXXXXX")
trap 'if [[ -n "$temporary" ]]; then rm -f -- "$temporary"; fi' EXIT

# Sem TTY: uma falha do dump tem de fazer falhar toda a pipeline.
docker exec "$POSTGRES_CONTAINER" pg_dumpall -U "$POSTGRES_USER" --no-password \
  | gzip > "$temporary"
gzip -t "$temporary"
[[ "$(gzip -cd "$temporary" | wc -c)" -gt 0 ]] || {
  printf 'O dump está vazio; backup rejeitado\n' >&2
  exit 1
}

mv -- "$temporary" "$archive"
temporary=""
# Só aplicar retenção depois de publicar um backup com sucesso.
find "$BACKUP_DIR" -type f -name 'all_databases_*.sql.gz' \
  -mtime "+$RETENTION_DAYS" -delete
printf 'Backup concluído: %s\n' "$archive"
