#!/usr/bin/env bash
set -euo pipefail

archive="${1:?Indica o caminho do backup .sql.gz}"
image="${POSTGRES_IMAGE:-postgres:16-alpine}"
[[ -f "$archive" ]] || { printf 'Backup inexistente\n' >&2; exit 1; }
gzip -t "$archive"

# Contentor descartável, sem rede, portas ou volumes do servidor original.
name="postgres-restore-check-$(date -u +%Y%m%d%H%M%S)-$$"
cleanup() { docker rm --force --volumes "$name" >/dev/null 2>&1 || true; }
trap cleanup EXIT
docker run --detach --name "$name" --network none --memory 1g --cpus 1 \
  --env POSTGRES_USER=restore_check_admin \
  --env POSTGRES_HOST_AUTH_METHOD=trust "$image" >/dev/null

ready=false
# O entrypoint arranca primeiro um servidor temporário só com socket Unix.
# A porta TCP só fica disponível depois de terminar essa inicialização.
for ((attempt = 0; attempt < 60; attempt++)); do
  if docker exec "$name" pg_isready -h 127.0.0.1 -U restore_check_admin -d postgres >/dev/null 2>&1; then
    ready=true
    break
  fi
  sleep 1
done
[[ "$ready" == true ]] || { printf 'PostgreSQL de teste indisponível\n' >&2; exit 1; }

gzip -cd "$archive" | docker exec -i "$name" \
  psql -h 127.0.0.1 -X -v ON_ERROR_STOP=1 -U restore_check_admin -d postgres >/dev/null
docker exec "$name" psql -h 127.0.0.1 -X -v ON_ERROR_STOP=1 -U restore_check_admin \
  -d postgres -c 'SELECT datname FROM pg_database WHERE NOT datistemplate;'
printf 'Restauro de teste concluído no contentor descartável\n'
