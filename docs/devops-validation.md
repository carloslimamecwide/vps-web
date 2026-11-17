# Validação DevOps

Atualizado em 17 de novembro de 2026

## Resultado após as correções

As sete situações identificadas foram corrigidas no código e nos exemplos do guia.

A aplicação é um guia Next.js sem base de dados. O CI não arranca PostgreSQL nem
executa o ensaio real do laboratório. Esse ensaio é opcional, através de
`npm run test:lab:postgres`; os exemplos permanecem disponíveis nas lições.

| Ponto | Correção aplicada |
| --- | --- |
| Permissões PostgreSQL | O passo consulta as permissões geridas pela imagem, sem alterar o proprietário do cluster |
| Backup com falso sucesso | Modo estrito, dump sem TTY, temporário, validação de gzip/conteúdo, publicação atómica e retenção apenas após sucesso |
| Secrets no shell | Removida a criação de `.env` com secrets no CI; PostgreSQL usa um secret montado no runtime |
| Contexto Docker | `.dockerignore` exclui dependências, outputs locais, Git e ficheiros sensíveis |
| README versus workflow | Documentado o build/publicação real e o procedimento separado de entrega |
| Versão da imagem | Compose exige `TAG`; exemplos usam o SHA completo publicado |
| Prontidão e rollback | Deployment espera pelo healthcheck, verifica HTTP e conserva a imagem/configuração anterior; procedimento de reversão documentado |

Também foram adicionados limites de CPU/memória, rotação de logs, teste da imagem
em staging, scanning antes da publicação e validação dos workflows/scripts. O
exemplo Nginx acompanha alterações do IP do contentor pelo DNS do Docker.

Os exemplos em `examples/` são a origem dos blocos exibidos nas lições; a
sincronização é verificada no CI. O Dockerfile mostrado na aprendizagem é o
Dockerfile real deste guia.

### Dependências e imagem

A auditoria complementar encontrou versões vulneráveis do Next.js e dependências
transitivas. Next.js e ESLint foram alinhados em **16.4.6**, com lockfile atualizado
sem upgrades forçados de major. O resultado final de `npm audit` foi **zero**
vulnerabilidades. Os [advisories do Next.js](https://github.com/advisories/GHSA-673q-mjm6-r5xr)
fundamentaram a atualização.

O scan da imagem também detetou seis alertas HIGH nas dependências do npm global
da imagem base. Os gestores npm/Corepack/Yarn foram retirados apenas do runtime
standalone, que usa Node diretamente. A imagem final passou o Trivy 0.76.2 com
**zero alertas HIGH/CRITICAL**, sem ignorar vulnerabilidades não corrigidas.

### Verificação final

- Lint, TypeScript e testes operacionais com simulações: aprovados
- Workflows: actionlint 1.7.12 e ShellCheck aprovados
- Docker build real em Linux/arm64 com Next.js 16.4.6: aprovado
- Staging: contentor healthy, utilizador `nextjs`, limite de 512 MiB e um CPU
- Smoke HTTP da imagem final: página e 12 assets aprovados
- Ensaio manual anterior do laboratório: secret montado, dados no dump e restauro
  num contentor descartável. Foi corrigida entretanto uma corrida no arranque:
  a prontidão passa a usar TCP para não aceitar o servidor Unix temporário
- Navegador: cópia do backup preserva o código, workflows das duas lições iguais,
  dez passos da fase 8 e sem overflow horizontal no móvel
- Identificadores de progresso: preservados os 61 do laboratório e 87 da aprendizagem

Procedimento de entrega e reversão: [deployment.md](deployment.md).
Os testes são locais; não foi feito deployment nem executado o workflow remoto.
As regras dos environments, secret manager, TLS, monitorização e aprovações do
servidor real dependem da configuração desse ambiente.

### Limpeza do repositório

Removidos capturas e logs de browser, metadados `.DS_Store`, caches antigas,
configuração vazia do VS Code, o exemplo de ambiente sem utilização e o migrador
do HTML de origem que já não existe. Retirados os comentários e o comando npm que
referenciavam esse migrador. A geração automática de regras Next.js foi desativada;
o relatório conserva apenas o resultado atual. Os contentores de teste foram
removidos e o servidor de desenvolvimento voltou a responder após a limpeza.
