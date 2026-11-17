# Entrega, verificação e reversão do guia

## Build e publicação

O workflow `.github/workflows/deploy.yml` valida pull requests e pushes em `main`.
Executa lint, TypeScript e testes operacionais, constrói a imagem, testa o arranque
e os assets no Compose de staging e faz scanning com Trivy. Publica no GHCR apenas
em `main`, depois de todos os gates passarem. O workflow não acede ao VPS.

O identificador de entrega é o SHA completo do commit. Os aliases `latest` e
`deploy` são mantidos por compatibilidade com consumidores existentes; não os
uses como versão de um deployment gerido por este procedimento.

Se existir uma plataforma externa a consumir esses aliases, configura nela o
mesmo processo de staging, aprovação e reversão. A configuração dessa plataforma
não faz parte deste repositório e não foi inspecionada.

## Preparação

- Docker Engine e Docker Compose com suporte para `up --wait`
- Node.js 24 no host de validação para os scripts de smoke e de testes; no VPS,
  a verificação HTTP mínima pode ser feita com `curl --fail` e inspeção da página
- Acesso à imagem no GHCR; para uma imagem privada, autenticação com uma credencial
  de leitura obtida do gestor de credenciais/secret manager do ambiente
- Rede externa `apps`, reverse proxy e TLS preparados para o serviço `vps-web:3000`
- Uma versão anterior aprovada e a sua configuração preservadas para reversão
- Recursos para o serviço: limite de 512 MiB e um CPU, ajustáveis após medição

A aplicação deste guia não tem base de dados nem precisa de secrets de e-mail.
Os backups PostgreSQL apresentados no conteúdo pertencem ao laboratório. O CI da
aplicação não executa o ensaio real de PostgreSQL; esse ensaio é opcional através
de `npm run test:lab:postgres`.

Se o proxy for Nginx em Docker, configura a resolução do upstream no runtime para
acompanhar a mudança de IP ao recriar o contentor. Dentro do bloco `location /`,
um exemplo para este guia é:

```nginx
resolver 127.0.0.11 valid=10s ipv6=off;
set $guide_backend vps-web:3000;
proxy_pass http://$guide_backend;
```

O proxy tem de pertencer à rede `apps`. O [DNS interno do Docker](https://docs.docker.com/engine/network/#dns-services)
e a [resolução Nginx no runtime](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass)
permitem seguir o novo endereço; configura também os cabeçalhos de proxy e TLS
conforme o ambiente.

## Validar a imagem em staging

Executa num host de staging, ou no VPS usando o projeto isolado e a porta de
loopback deste Compose. `IMAGE_NAME` é opcional; o valor predefinido é o registry
deste guia. O exemplo abaixo pressupõe a imagem já publicada:

```bash
export TAG=SHA_COMPLETO_PUBLICADO_NO_GHCR
docker compose -f docker-compose.staging.yml pull
docker compose -f docker-compose.staging.yml up --wait --wait-timeout 120
node scripts/smoke-http.mjs http://127.0.0.1:3100
docker compose -f docker-compose.staging.yml down
```

O teste verifica o conteúdo do guia e todos os assets Next.js referenciados no
HTML. O Compose de staging usa uma rede própria e não publica portas na internet.
O pipeline executa este teste antes da publicação, usando a imagem local com o
mesmo SHA. Conserva o resultado e o SHA aprovado para a entrega.

## Aplicar a versão aprovada

Antes de executar estes comandos, a entrega deve estar aprovada pelo responsável
do ambiente. Executa no diretório da aplicação no VPS, onde está o Compose atual.
O `TAG` abaixo pode indicar a versão atualmente instalada; não é necessário para
a consulta via `docker inspect`.

```bash
# Regista a imagem atual e conserva o Compose antes de o substituir.
docker inspect --format '{{.Config.Image}}' vps-web > previous-image.txt
cp docker-compose.production.yml docker-compose.previous.yml

# Instala o Compose revisto e usa a versão aprovada em staging.
export TAG=SHA_COMPLETO_APROVADO_EM_STAGING
docker compose -f docker-compose.production.yml config --quiet
docker compose -f docker-compose.production.yml pull
docker compose -f docker-compose.production.yml up --wait --wait-timeout 120
curl --fail --silent --show-error --connect-timeout 5 --max-time 15 https://DOMINIO_DO_GUIA
```

No primeiro deployment ainda não existe contentor anterior; omite apenas o registo
da versão e a cópia de configuração inexistentes. Falhar a verificação de saúde ou
o smoke HTTP deve interromper a entrega e iniciar a análise/reversão. `restart:
unless-stopped` reinicia processos que terminem; não substitui esta verificação.

## Reverter

Consulta `previous-image.txt` e retira o SHA da referência da imagem. Se o Compose
também tiver mudado, restaura a cópia da versão anterior antes de a iniciar.

```bash
cat previous-image.txt
cp docker-compose.previous.yml docker-compose.production.yml
export TAG=SHA_COMPLETO_DA_VERSAO_ANTERIOR
docker compose -f docker-compose.production.yml pull
docker compose -f docker-compose.production.yml up --wait --wait-timeout 120
curl --fail --silent --show-error --connect-timeout 5 --max-time 15 https://DOMINIO_DO_GUIA
```

Mantém a imagem anterior no registry e conserva as configurações da entrega. Não
incluas limpeza de imagens no comando de deployment. Quando aplicares este padrão
a uma app com dados, a reversão da imagem não reverte migrações nem substitui um
restauro testado.

## Acompanhar após a entrega

```bash
docker compose -f docker-compose.production.yml ps
docker compose -f docker-compose.production.yml logs --since 10m --tail 100
docker stats --no-stream vps-web
```

Confirma saúde, erros e consumo de recursos durante a janela da entrega. O Compose
limita o tamanho dos logs locais. A monitorização externa de disponibilidade e os
alertas devem usar o URL real do guia e o canal operacional da equipa.

## Secrets do laboratório PostgreSQL

O Compose PostgreSQL usa `POSTGRES_PASSWORD_FILE`, com um secret montado em
`/run/secrets`. O ficheiro local restrito é uma opção para o laboratório; num
ambiente duradouro, materializa esse ficheiro a partir de um secret manager. Uma
app não passa a ler variáveis `_FILE` automaticamente: precisa de suporte explícito.

A criação do secret no guia recusa sobrescrever um ficheiro existente. Alterar esse
ficheiro depois de inicializar o cluster não altera a palavra-passe da base de
dados; uma rotação exige um procedimento próprio na base e nos consumidores.

O backup usa modo estrito, ficheiro temporário e retenção após sucesso. O restauro
de teste usa um PostgreSQL descartável sem rede, portas ou volumes da origem. Deve
ser repetido regularmente e complementado por cópias fora do VPS.

A prontidão do PostgreSQL é verificada por TCP em `127.0.0.1`. O servidor temporário
de inicialização da imagem oficial aceita sockets Unix e depois é desligado;
esperar apenas pelo socket podia iniciar o restauro durante essa fase transitória.
[Entrypoint oficial](https://github.com/docker-library/postgres/blob/master/docker-entrypoint.sh).
