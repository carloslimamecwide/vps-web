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
npm run test:ops
```

## Produção (resumo)

- `Dockerfile` — multi-stage, utilizador `nextjs`, healthcheck
- `docker-compose.production.yml` — SHA obrigatório, limites de CPU/memória, logs com rotação e healthcheck
- `docker-compose.staging.yml` — teste isolado da mesma imagem, com porta apenas em loopback
- `.github/workflows/deploy.yml` — lint/typecheck/testes → build Docker → staging e smoke HTTP → Trivy → publicação no GHCR
- Pull requests são validados sem publicar imagens; em `main`, a publicação só acontece após os testes e o scan
- O workflow deste repositório publica a imagem. O deployment do guia é uma etapa separada, descrita no [procedimento operacional](docs/deployment.md)
- A aplicação não tem base de dados. O CI não cria PostgreSQL nem executa os ensaios de integração do laboratório

```bash
# No VPS, usa o SHA completo de uma imagem publicada e aprovada em staging.
# A rede apps e o proxy têm de estar preparados.
export TAG=SHA_COMPLETO_PUBLICADO_NO_GHCR
docker compose -f docker-compose.production.yml pull
docker compose -f docker-compose.production.yml up --wait --wait-timeout 120
```

O pipeline mantém os aliases existentes `latest` e `deploy` por compatibilidade,
mas o Compose de produção exige uma versão explícita por SHA. O scan bloqueia a
publicação quando encontra vulnerabilidades HIGH ou CRITICAL.

## Exemplos operacionais do guia

Os exemplos executáveis ficam em `examples/`. As lições usam uma cópia gerada
destes ficheiros para manter os exemplos de aprendizagem e do laboratório iguais.

```bash
npm run examples:sync  # depois de alterar examples/
npm run test:ops       # deteta divergências e testa falhas, retenção e smoke HTTP
```

O teste operacional usa simulações para os scripts pedagógicos e não arranca uma
base de dados. O ensaio real de PostgreSQL é opcional, apenas para validar o
conteúdo do laboratório, com Docker ativo:

```bash
npm run test:lab:postgres
```

`examples/postgres/backup.sh` publica apenas dumps válidos e não vazios;
`examples/postgres/restore-check.sh` ensaia o restauro num contentor descartável.
O exemplo de CI/CD em `examples/build-and-deploy.yml` inclui um runner para o
laboratório e é distinto do workflow de publicação deste repositório.

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
