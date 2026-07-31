# Guia prático de DevOps para iniciantes

Percurso introdutório e laboratório orientado: Linux, SSH, Docker, Compose, PostgreSQL básico, CI/CD, segurança e reverse proxy num VPS descartável.

## O que é — e o que não é

- **É** um guia pedagógico com explicações, comandos comentados e progresso no browser.
- **É** um laboratório hands-on (Configuração VPS, fases 1–10) para praticar de ponta a ponta.
- **Não é** um standard de produção, hardening enterprise nem substituto da documentação oficial.

## Duas camadas

| Camada | Onde | O que conta |
|--------|------|-------------|
| **Iniciação (conceitos)** | Separador Aprendizagem | Módulos **1 → 7.1** (reverse proxy) |
| **Laboratório VPS** | Separador Configuração VPS | Fases **1–10** (acesso → deploy), sem fases opcionais |
| **Continuação** | Aprendizagem 7.2–7.4 e módulos 8–12 | Mapa para aprofundar depois |

## Correr localmente

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm run start
npm run lint
npm run typecheck
```

## Produção (resumo)

- `Dockerfile` — multi-stage, utilizador `nextjs`, healthcheck
- `docker-compose.production.yml` — imagem GHCR com `TAG`, rede `apps`
- `.github/workflows/deploy.yml` — lint/typecheck → build/push → deploy self-hosted + smoke health

```bash
# no VPS (rede Docker já criada)
docker network create apps   # uma vez
TAG=<git-sha-curto> docker compose -f docker-compose.production.yml up -d
```

## Estrutura

```
src/content/     # Conteúdo dos guias
src/components/  # UI do curso
docs/            # Rascunho de post LinkedIn
```

## Avisos

- Usa um **VPS descartável** para o laboratório do guia.
- Runner self-hosted no mesmo VPS é pedagógico e **arriscado** com código não confiável.
- Docker pode contornar regras normais do UFW se publicares portas no host.

## Licença

MIT — ver [LICENSE](./LICENSE).

## Contribuições

Correções e sugestões são bem-vindas.
