// Generated from guia-vps.html by scripts/migrate-source.mjs.
export const vpsHtml = `<div class="course-header">
<h2> Guia de consulta do VPS</h2>
<p>Referência prática para rever comandos e ficheiros. Não é uma configuração universal nem substitui a documentação oficial, backups testados ou uma revisão de segurança.</p>
</div>
<div class="warning">
<strong>Adapta antes de copiar:</strong> nomes como <code>nome-app</code>, <code>dominio.com</code>, <code>IP_DO_VPS</code>, <code>UTILIZADOR_GITHUB</code> e <code>PALAVRA_PASSE</code> são placeholders. Os comandos assinalados como destrutivos podem remover dados, contas ou recursos.
</div>
<nav class="nav-bar">
<a href="#estrutura">Estrutura</a>
<a href="#docker">Docker</a>
<a href="#postgresql">PostgreSQL</a>
<a href="#services">Serviços</a>
<a href="#seguranca">Segurança</a>
<a href="#deploy">Deploy</a>
<a href="#quickref">Referência rápida</a>
<a href="#arquitetura">Arquitetura</a>
<a href="#certificados">SSL</a>
<div class="nav-divider"></div>
<button type="button" class="nav-btn" data-action="expand-all"> Expandir Todas</button>
<button type="button" class="nav-btn" data-action="collapse-all"> Colapsar Todas</button>
</nav>

<!-- 1. Estrutura VPS -->
<div class="section collapsed" id="estrutura">
<div class="section-header">
<h2> 1. Estrutura VPS</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
<div class="tree">
<span class="folder">/srv/</span>
 <span class="folder">proxy/</span><span class="comment"> nginx reverse proxy</span>
<span class="file">docker-compose.yml</span>
<span class="folder">conf.d/</span>
<span class="file">app-exemplo.conf</span>
<span class="file">exemplo1.conf</span>
 <span class="folder">apps/</span><span class="comment"> aplicações</span>
<span class="folder">app-exemplo/</span>
<span class="file">docker-compose.yml</span>
<span class="file">.env</span>
<span class="folder">exemplo1/</span>
<span class="file">docker-compose.production.yml</span>
<span class="file">.env</span>
<span class="folder">conf.d/</span>
<span class="folder">exemplo2/</span>
<span class="file">docker-compose.production.yml</span>
<span class="file">.env</span>
<span class="folder">barbershop-api/</span><span class="comment"> futuro backend</span>
 <span class="folder">db/</span><span class="comment"> PostgreSQL</span>
<span class="file">docker-compose.yml</span>
<span class="file">.env</span>
<span class="folder">data/</span><span class="comment"> dados persistentes</span>
<span class="folder">backups/</span><span class="comment"> dumps (.dump)</span>
<span class="folder">scripts/</span>
<span class="file">backup.sh</span>
<span class="file">README.md</span>
 <span class="folder">data/</span><span class="comment"> vazio (futuro)</span>

<span class="folder">/etc/cloudflare/</span><span class="comment"> certificados SSL</span>
 <span class="folder">exemplo1.com/</span>
<span class="file">cert.pem</span><span class="comment"> wildcard *.exemplo1.com</span>
<span class="file">key.pem</span><span class="comment"> chave privada</span>
 <span class="folder">exemplo2.com/</span><span class="comment"> para domínios personalizados</span>
<span class="file">cert.pem</span>
<span class="file">key.pem</span>

<span class="folder">/home/runner/</span><span class="comment"> GitHub Actions runners</span>
 <span class="folder">runner/</span><span class="comment"> utilizador do sistema</span>
<span class="folder">.ssh/</span><span class="comment"> chave SSH pública</span>
 <span class="folder">exemplo1-runner/</span><span class="comment"> runner do 1º projeto</span>
<span class="folder">bin/</span>
<span class="folder">externals/</span>
<span class="file">config.sh</span>
<span class="file">run.sh</span>
<span class="file">.runner</span>
 <span class="folder">exemplo2-runner/</span><span class="comment"> runner do 2º projeto</span>
     ...
</div>

<div class="tip">
<strong>Dica:</strong> todos os contentores usam redes externas (<code>edge</code>, <code>apps</code>, <code>data</code>) para comunicação.
</div>
</div>
</div>

<!-- 2. Docker -->
<div class="section collapsed" id="docker">
<div class="section-header">
<h2> 2. Comandos Docker</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
<div class="subsection">
<h3> Contentores</h3>
                    
<div class="command-block">
<code>docker ps</code>
<span class="comment"># Contentores em execução</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>docker ps -a</code>
<span class="comment"># Todos os contentores, incluindo os que estão parados</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>docker logs -f exemplo1-web</code>
<span class="comment"># Ver logs em tempo real</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>docker exec -it postgres psql -U exemplo1</code>
<span class="comment"># Entrar no container PostgreSQL</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>docker exec -it exemplo1-web sh</code>
<span class="comment"># Entrar no container web</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>docker stop exemplo1-web</code>
<span class="comment"># Parar container</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>docker start exemplo1-web</code>
<span class="comment"># Iniciar container</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>docker restart exemplo1-web</code>
<span class="comment"># Reiniciar container</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<div class="subsection">
<h3> Imagens</h3>
                    
<div class="command-block">
<code>docker images</code>
<span class="comment"># Listar imagens</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>docker pull ghcr.io/UTILIZADOR_GITHUB/exemplo1:latest</code>
<span class="comment"># Lab: latest. Rollback/produção: prefere o git sha publicado no GHCR</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<span class="risk-label">Remove imagens não utilizadas</span>
<code>docker image prune -f</code>
<span class="comment"># Limpar imagens não utilizadas</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<div class="subsection">
<h3> Redes</h3>
                    
<div class="command-block">
<code>docker network ls</code>
<span class="comment"># Listar redes</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>docker network inspect data</code>
<span class="comment"># Ver contentores na rede</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<table><tbody>
<tr>
<th>Rede</th>
<th>Propósito</th>
<th>Contentores</th>
</tr>
<tr>
<td><code>edge</code></td>
<td>Recebe tráfego da internet</td>
<td>proxy</td>
</tr>
<tr>
<td><code>apps</code></td>
<td>Comunicação interna apps  proxy</td>
<td>proxy, app-exemplo, exemplo1</td>
</tr>
<tr>
<td><code>data</code></td>
<td>Isolamento para bases de dados</td>
<td>postgres, exemplo1</td>
</tr>
</tbody></table>
</div>

<div class="subsection">
<h3> Docker Compose</h3>
                    
<div class="command-block">
<code>cd /srv/apps/exemplo1 && docker compose -f docker-compose.production.yml up -d</code>
<span class="comment"># Iniciar serviços em background</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>cd /srv/apps/exemplo1 && docker compose -f docker-compose.production.yml down</code>
<span class="comment"># Parar e remover serviços</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>cd /srv/apps/exemplo1 && docker compose -f docker-compose.production.yml pull</code>
<span class="comment"># Puxar última imagem</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>cd /srv/apps/exemplo1 && docker compose -f docker-compose.production.yml up -d --remove-orphans</code>
<span class="comment"># Atualizar (pull + restart)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>cd /srv/apps/exemplo1 && docker compose -f docker-compose.production.yml ps</code>
<span class="comment"># Ver estado dos serviços</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
</div>

<!-- 3. PostgreSQL -->
<div class="section collapsed" id="postgresql">
<div class="section-header">
<h2> 3. Comandos PostgreSQL</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
<div class="subsection">
<h3> Gerir bases de dados</h3>
                    
<div class="command-block">
<code>docker exec -i postgres psql -U exemplo1 -c "\\l"</code>
<span class="comment"># Listar todas as bases de dados</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>docker exec -i postgres psql -U exemplo1 -c "CREATE DATABASE nome_projeto;"</code>
<span class="comment"># Criar uma base de dados</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<span class="risk-label">Destrutivo · elimina a base de dados</span>
<code>docker exec -i postgres psql -U exemplo1 -c "DROP DATABASE nome_projeto;"</code>
<span class="comment"># Eliminar uma base de dados</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>docker exec -i postgres psql -U exemplo1 -c "SELECT datname, pg_size_pretty(pg_database_size(datname)) FROM pg_database WHERE datistemplate = false;"</code>
<span class="comment"># Ver o tamanho das bases de dados</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<div class="subsection">
<h3> Gerir Tabelas</h3>
                    
<div class="command-block">
<code>docker exec -i postgres psql -U exemplo1 -d exemplo2 -c "\\dt"</code>
<span class="comment"># Listar tabelas</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>docker exec -i postgres psql -U exemplo1 -d exemplo2 -c "\\d nome_tabela"</code>
<span class="comment"># Ver estrutura da tabela</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>docker exec -i postgres psql -U exemplo1 -d exemplo2 -c "
CREATE TABLE utilizadores (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);"</code>
<span class="comment"># Criar tabela exemplo</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<div class="subsection">
<h3> Consultas Úteis</h3>
                    
<div class="command-block">
<code>docker exec -i postgres psql -U exemplo1 -d exemplo2 -c "SELECT COUNT(*) FROM utilizadores;"</code>
<span class="comment"># Contar registos</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>docker exec -i postgres psql -U exemplo1 -d exemplo2 -c "SELECT * FROM utilizadores;"</code>
<span class="comment"># Ver todos os registos</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>docker exec -i postgres psql -U exemplo1 -d exemplo2 -c "SELECT * FROM utilizadores ORDER BY id DESC LIMIT 10;"</code>
<span class="comment"># Ver últimos 10 registos</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<div class="subsection">
<h3> Backup e restauro</h3>
                    
<div class="tip">
<strong>Paths:</strong> o redirecionamento <code>&gt; ficheiro</code> grava no <strong>host</strong>. O contentor só vê ficheiros sob o volume montado (ex.: <code>/srv/db/backups</code> → <code>/backups</code>). Para restaurar a partir do host, usa stdin (<code>&lt; ficheiro.dump</code>).
</div>

<div class="command-block">
<code>docker exec -i postgres pg_dump -U exemplo1 -Fc exemplo2 > /srv/db/backups/exemplo2_backup.dump</code>
<span class="comment"># Backup manual no host (pasta montada em /backups)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>docker exec -i postgres pg_dumpall -U exemplo1 > /srv/db/backups/all_databases.sql</code>
<span class="comment"># Cópia de segurança de todas as bases de dados</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>docker exec -i postgres pg_restore -U exemplo1 -d exemplo2 -c &lt; /srv/db/backups/exemplo2_backup.dump</code>
<span class="comment"># Restaurar via stdin a partir do host</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>docker exec -i postgres pg_restore -U exemplo1 -d exemplo2 -c /backups/exemplo2_backup.dump</code>
<span class="comment"># Alternativa: path dentro do contentor (volume ./backups:/backups)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>ls -lh /srv/db/backups/</code>
<span class="comment"># Ver backups disponíveis no host</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<div class="subsection">
<h3> Informação do PostgreSQL</h3>
                    
<div class="command-block">
<code>docker exec -i postgres psql -U exemplo1 -c "SELECT version();"</code>
<span class="comment"># Versão do PostgreSQL</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>docker exec -i postgres psql -U exemplo1 -c "\\du"</code>
<span class="comment"># Listar utilizadores</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>docker exec -i postgres psql -U exemplo1 -c "SELECT * FROM pg_stat_activity;"</code>
<span class="comment"># Ligações ativas</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<div class="subsection">
<h3> Comandos psql Rápidos</h3>
                    
<table><tbody>
<tr>
<th>Comando</th>
<th>Descrição</th>
</tr>
<tr>
<td><code>\\l</code></td>
<td>Listar bases de dados</td>
</tr>
<tr>
<td><code>\\dt</code></td>
<td>Listar tabelas</td>
</tr>
<tr>
<td><code>\\d nome_tabela</code></td>
<td>Ver estrutura da tabela</td>
</tr>
<tr>
<td><code>\\du</code></td>
<td>Listar utilizadores</td>
</tr>
<tr>
<td><code>\\q</code></td>
<td>Sair do psql</td>
</tr>
<tr>
<td><code>\\?</code></td>
<td>Ajuda do psql</td>
</tr>
</tbody></table>
</div>

<div class="tip">
<strong>Dica:</strong> Usa <code>-i</code> em vez de <code>-it</code> para comandos não interativos.
</div>

<div class="subsection">
<h3> Cadeias de ligação</h3>
                    
<div class="tip">
<strong>Anatomia:</strong><br>
<code>postgresql://<span style="color: var(--accent-blue)">utilizador</span>:<span style="color: var(--accent-blue)">PALAVRA_PASSE</span>@<span style="color: var(--accent-blue)">host</span>:<span style="color: var(--accent-blue)">porta</span>/<span style="color: var(--accent-blue)">base_de_dados</span></code>
</div>

<table><tbody>
<tr>
<th>Parte</th>
<th>Ambiente publicado (entre contentores)</th>
<th>Desenvolvimento (SSH tunnel)</th>
</tr>
<tr>
<td><code>utilizador</code></td>
<td><code>exemplo1</code></td>
<td><code>exemplo1</code></td>
</tr>
<tr>
<td><code>PALAVRA_PASSE</code></td>
<td>Palavra-passe definida em <code>/srv/db/.env</code></td>
<td>A mesma palavra-passe</td>
</tr>
<tr>
<td><code>host</code></td>
<td><code>postgres</code> (nome do contentor)</td>
<td><code>localhost</code> (através do túnel)</td>
</tr>
<tr>
<td><code>porta</code></td>
<td><code>5432</code> (porta padrão)</td>
<td><code>5433</code> (redirecionada)</td>
</tr>
<tr>
<td><code>base_de_dados</code></td>
<td><code>exemplo1</code>, <code>exemplo2</code>, etc.</td>
<td>A mesma base de dados</td>
</tr>
</tbody></table>

<h4> Ambiente publicado (entre contentores)</h4>
<div class="command-block">
<code>postgresql://exemplo1:PALAVRA_PASSE@postgres:5432/exemplo1</code>
<span class="comment"># Projeto (produção)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>postgresql://exemplo1:PALAVRA_PASSE@postgres:5432/exemplo1_dev</code>
<span class="comment"># Projeto (desenvolvimento)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>postgresql://exemplo1:PALAVRA_PASSE@postgres:5432/exemplo2</code>
<span class="comment"># Aplicação de exemplo 2</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="warning">
<strong>Nota:</strong> em produção, o <code>host</code> é <code>postgres</code> (nome do contentor Docker). O Docker resolve automaticamente o nome para o IP do contentor na rede <code>data</code>.
</div>

<h4> Desenvolvimento (túnel SSH)</h4>
<div class="command-block">
<code>ssh -L 5433:127.0.0.1:5432 utilizador-exemplo@IP_DO_VPS</code>
<span class="comment"># 1.º: Abrir o túnel (manter aberto)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>postgresql://exemplo1:PALAVRA_PASSE@localhost:5433/exemplo1</code>
<span class="comment"># 2.º: O DBeaver usa esta cadeia de ligação</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="tip">
<strong>Como funciona:</strong> o túnel SSH liga-te ao VPS e redireciona a porta <code>5433</code> do teu computador para a porta <code>5432</code> no VPS. Assim, o DBeaver pensa que está a estabelecer ligação a <code>localhost:5433</code>, mas comunica com o PostgreSQL no VPS.
</div>
</div>
</div>
</div>

<!-- 4. Services -->
<div class="section collapsed" id="services">
<div class="section-header">
<h2> 4. Comandos de serviços</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
<div class="subsection">
<h3> Systemctl</h3>
                    
<div class="command-block">
<code>systemctl status docker</code>
<span class="comment"># Estado do Docker</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>systemctl status cron</code>
<span class="comment"># Estado do Cron</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>systemctl restart docker</code>
<span class="comment"># Reiniciar Docker</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>systemctl restart cron</code>
<span class="comment"># Reiniciar Cron</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>systemctl enable docker</code>
<span class="comment"># Auto-iniciar Docker no boot</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<div class="subsection">
<h3> Cron</h3>
                    
<div class="command-block">
<code>crontab -l</code>
<span class="comment"># Ver crontab do utilizador</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>nano /etc/crontab</code>
<span class="comment"># Editar crontab do sistema</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>cat /var/log/pg-backup.log</code>
<span class="comment"># Ver log dos backups</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="tip">
<strong>Formato do cron:</strong> <code>minuto hora dia_mes mes dia_semana comando</code><br>
                        Exemplo: <code>0 2 * * *</code> = todos os dias às 02:00
</div>
</div>

<div class="subsection">
<h3> Registos</h3>
                    
<div class="command-block">
<code>cat /var/log/pg-backup.log</code>
<span class="comment"># Log dos backups PostgreSQL</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>journalctl -u docker --since "1 hour ago"</code>
<span class="comment"># Logs do Docker última hora</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>cat /var/log/syslog | grep CRON</code>
<span class="comment"># Logs do Cron</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<div class="subsection">
<h3> GitHub Actions Runner</h3>
                    
<div class="command-block">
<code>systemctl status actions.runner.*.service</code>
<span class="comment"># Estado do runner</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>systemctl list-units --type=service | grep actions.runner</code>
<span class="comment"># Listar todos os runners</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>systemctl restart actions.runner.*.service</code>
<span class="comment"># Reiniciar runner</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>ls /home/runner/</code>
<span class="comment"># Listar diretórios de runners</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>cd /home/runner/NOME-RUNNER && sudo ./svc.sh start</code>
<span class="comment"># Iniciar runner específico</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="tip">
<strong>Nota:</strong> cada projeto GitHub Actions tem o seu próprio runner. O serviço é gerado automaticamente com o nome <code>actions.runner.UTILIZADOR_GITHUB-REPOSITORIO.NOME.service</code>.
</div>
</div>
</div>
</div>

<!-- 5. Segurança -->
<div class="section collapsed" id="seguranca">
<div class="section-header">
<h2> 5. Segurança</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
<div class="subsection">
<h3> Utilizadores</h3>
                    
<table><tbody>
<tr>
<th>Utilizador</th>
<th>Grupos</th>
<th>Propósito</th>
</tr>
<tr>
<td><code>root</code></td>
<td>root</td>
<td>Administração do sistema</td>
</tr>
<tr>
<td><code>utilizador-exemplo</code></td>
<td>docker, deploy, users</td>
<td>Operações diárias</td>
</tr>
<tr>
<td><code>runner</code></td>
<td>docker, deploy</td>
<td>GitHub Actions (sem autenticação por palavra-passe)</td>
</tr>
</tbody></table>

<h4> Ver Utilizador</h4>
<div class="command-block">
<code>whoami</code>
<span class="comment"># Utilizador atual</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>id utilizador-exemplo</code>
<span class="comment"># UID, GID e grupos do utilizador</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>groups utilizador-exemplo</code>
<span class="comment"># Grupos do utilizador</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>who</code>
<span class="comment"># Quem tem sessão iniciada</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>last</code>
<span class="comment"># Histórico de logins</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>cat /etc/passwd | grep -v nologin | grep -v false</code>
<span class="comment"># Todos os utilizadores com shell</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<h4> Criar / Eliminar</h4>
<div class="command-block">
<code>adduser nome_utilizador</code>
<span class="comment"># Criar um utilizador (interativo, cria o diretório pessoal)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>useradd -m -s /bin/bash nome_utilizador</code>
<span class="comment"># Criar um utilizador (não interativo)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>passwd nome_utilizador</code>
<span class="comment"># Definir ou alterar a palavra-passe</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<span class="risk-label">Destrutivo · elimina a conta e o diretório pessoal</span>
<code>userdel -r nome_utilizador</code>
<span class="comment"># Eliminar o utilizador e o respetivo diretório pessoal</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>chsh -s /bin/bash nome_utilizador</code>
<span class="comment"># Alterar a shell do utilizador</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<div class="subsection">
<h4> Grupos</h4>
<div class="command-block">
<code>getent group</code>
<span class="comment"># Todos os grupos do sistema</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>getent group docker</code>
<span class="comment"># Membros de um grupo</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>groupadd nome_grupo</code>
<span class="comment"># Criar grupo</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<span class="risk-label">Destrutivo · elimina o grupo</span>
<code>groupdel nome_grupo</code>
<span class="comment"># Eliminar grupo</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>usermod -aG grupo nome_utilizador</code>
<span class="comment"># Adicionar um utilizador a um grupo (-a = acrescentar, não substituir)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>gpasswd -d nome_utilizador grupo</code>
<span class="comment"># Remover um utilizador de um grupo</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<div class="subsection">
<h3> Permissões</h3>

<h4> Ver Permissões</h4>
<div class="command-block">
<code>ls -la /srv/</code>
<span class="comment"># Ver permissões detalhadas</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>stat ficheiro.txt</code>
<span class="comment"># Info detalhada de permissões</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<h4> chmod (Numérico)</h4>
<table><tbody>
<tr><th>Nº</th><th>Permissão</th><th>Equivalente</th></tr>
<tr><td><code>7</code></td><td>Read + Write + Execute</td><td><code>rwx</code></td></tr>
<tr><td><code>6</code></td><td>Read + Write</td><td><code>rw-</code></td></tr>
<tr><td><code>5</code></td><td>Read + Execute</td><td><code>r-x</code></td></tr>
<tr><td><code>4</code></td><td>Read</td><td><code>r--</code></td></tr>
<tr><td><code>0</code></td><td>Sem permissão</td><td><code>---</code></td></tr>
</tbody></table>

<div class="command-block">
<code>chmod 600 ficheiro.txt</code>
<span class="comment"># rw------- (só o proprietário)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>chmod 644 ficheiro.txt</code>
<span class="comment"># rw-r--r-- (o proprietário lê/escreve; os restantes leem)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>chmod 755 ficheiro.txt</code>
<span class="comment"># rwxr-xr-x (o proprietário tem tudo; os restantes têm r+x)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>chmod 700 diretorio/</code>
<span class="comment"># rwx------ (só o proprietário)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<h4> chmod (Simbólico)</h4>
<div class="command-block">
<code>chmod u+x script.sh</code>
<span class="comment"># Adicionar permissão de execução ao proprietário</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>chmod g+w diretorio/</code>
<span class="comment"># Adicionar write ao grupo</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>chmod o-rw ficheiro.txt</code>
<span class="comment"># Remover read+write dos outros</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>chmod -R 755 diretorio/</code>
<span class="comment"># Recursivo em todos os ficheiros</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<h4> Proprietário e grupo</h4>
<div class="command-block">
<code>chown utilizador-exemplo:docker ficheiro.txt</code>
<span class="comment"># Alterar o proprietário e o grupo</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>chown -R utilizador-exemplo:docker /srv/apps/</code>
<span class="comment"># Recursivo</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>chgrp docker ficheiro.txt</code>
<span class="comment"># Mudar só o grupo</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<h4> Umask</h4>
<div class="command-block">
<code>umask</code>
<span class="comment"># Ver máscara atual (ex: 0022)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>umask 027</code>
<span class="comment"># Definir máscara (750 para ficheiros, 750 dirs)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<div class="subsection">
<h3> Firewall UFW</h3>
                    
<div class="command-block">
<code>ufw status</code>
<span class="comment"># Estado do firewall</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>ufw allow 22/tcp</code>
<span class="comment"># Permitir SSH</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>ufw allow 80/tcp</code>
<span class="comment"># Permitir HTTP</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>ufw allow 443/tcp</code>
<span class="comment"># Permitir HTTPS</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>ufw enable</code>
<span class="comment"># Ativar firewall</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<div class="subsection">
<h3> SSH Tunnel</h3>
                    
<div class="command-block">
<code>ssh -L 5433:127.0.0.1:5432 utilizador@IP_DO_VPS</code>
<span class="comment"># Tunnel para PostgreSQL (DBeaver liga a localhost:5433)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="warning">
<strong>Nota:</strong> O SSH tunnel permite ligar ao PostgreSQL localmente via DBeaver. A porta 5433 é redirecionada para 5432 no VPS.
</div>
</div>

<div class="subsection">
<h3> Cloudflare SSL</h3>
                    
<div class="command-block">
<code>ls -la /etc/cloudflare/</code>
<span class="comment"># Ver certificados</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<table><tbody>
<tr>
<th>Certificado</th>
<th>Caminho</th>
<th>Domínio</th>
</tr>
<tr>
<td>Wildcard</td>
<td><code>/etc/cloudflare/exemplo1.com/cert.pem</code></td>
<td>*.exemplo1.com</td>
</tr>
<tr>
<td>Wildcard Key</td>
<td><code>/etc/cloudflare/exemplo1.com/key.pem</code></td>
<td>*.exemplo1.com</td>
</tr>
</tbody></table>
</div>
</div>
</div>

<!-- 6. Deploy Workflow -->
<div class="section collapsed" id="deploy">
<div class="section-header">
<h2> 6. Fluxo de deployment</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
<div class="subsection">
<h3> Deployment de projeto</h3>
                    
<div class="architecture-diagram">
          
<span class="highlight">GitHub</span><span class="highlight">GitHub Actions</span><span class="highlight">VPS</span>
   (repositório)    (build)          (self-hosted) 
          
                                                        
                                                        
                             
<span class="container">GHCR</span><span class="container">Docker</span>
                           (imagem)               (container)   
                             
                                                        
                                                        
                             
<span class="network">ghcr.io/UTILIZADOR_GITHUB</span><span class="network">exemplo1-web</span>
                           :latest                (a correr)    
                             
</div>

<div class="command-block">
<code># Fluxo de deploy
git push origin main
 GitHub Actions builda imagem
 Push para GHCR
 Self-hosted runner no VPS puxa imagem
 docker compose up -d</code>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<div class="subsection">
<h3> Deployment manual (se necessário)</h3>
                    
<div class="command-block">
<span class="risk-label">A limpeza final remove imagens não utilizadas</span>
<code>cd /srv/apps/exemplo1 && docker compose -f docker-compose.production.yml pull && docker compose -f docker-compose.production.yml up -d --remove-orphans && docker image prune -f</code>
<span class="comment"># Deploy manual completo</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<div class="subsection">
<h3>🆕 Novo Projeto (Subdomínio)</h3>
                    
<ol style="color: var(--text-secondary); padding-left: 1.5rem; line-height: 2;">
<li>Criar um registo DNS no Cloudflare (registo A → IP_DO_VPS)</li>
<li>Criar diretório em VPS: <code>/srv/apps/novo-projeto/</code></li>
<li>Criar <code>docker-compose.production.yml</code></li>
<li>Criar <code>.env</code> com secrets</li>
<li>Criar nginx conf: <code>/srv/proxy/conf.d/novo-projeto.conf</code></li>
<li>Reiniciar proxy: <code>docker compose -f /srv/proxy/docker-compose.yml restart</code></li>
<li>Criar repositório GitHub</li>
<li>Configurar self-hosted runner (ver comandos abaixo)</li>
<li>Push para deploy automático</li>
</ol>

<div class="command-block">
<code>install -d -o runner -g runner /home/runner/NOME_RUNNER</code>
<span class="comment"># Criar o diretório com o proprietário correto</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="tip"><strong>Transferência:</strong> em GitHub → Settings → Actions → Runners → New self-hosted runner, escolhe Linux e a arquitetura do VPS. Executa como <code>runner</code> os comandos atuais de transferência e extração mostrados nessa página.</div>
<div class="command-block">
<code>cd /home/runner/NOME_RUNNER && sudo -u runner ./config.sh --url https://github.com/UTILIZADOR_GITHUB/REPOSITORIO --token TOKEN<br>
sudo ./svc.sh install runner && sudo ./svc.sh start<br>
systemctl status actions.runner.*.service</code>
<span class="comment"># O token de registo é temporário; gera outro se tiver expirado</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="danger"><strong>Risco do runner:</strong> não permitas que pull requests ou código não confiável sejam executados num runner com acesso ao VPS e ao grupo Docker.</div>
</div>

<div class="subsection">
<h3> Novo projeto (domínio personalizado)</h3>
                    
<ol style="color: var(--text-secondary); padding-left: 1.5rem; line-height: 2;">
<li>Adicionar domínio em Cloudflare (apex + www)</li>
<li>Gerar Cloudflare Origin Cert para o domínio</li>
<li>Guardar certificados em <code>/etc/cloudflare/exemplo2-com/</code></li>
<li>Adicionar volume mounts no proxy compose</li>
<li>Criar nginx conf com caminhos corretos</li>
<li>Reiniciar proxy: <code>docker compose -f /srv/proxy/docker-compose.yml up -d --force-recreate</code></li>
<li>Seguir passos 2-9 do subdomínio</li>
</ol>
</div>
</div>
</div>

<!-- 7. Quick Reference -->
<div class="section collapsed" id="quickref">
<div class="section-header">
<h2> 7. Referência rápida</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
<div class="quick-ref">
<div class="quick-ref-card">
<h4> Ver contentores</h4>
<code>docker ps</code>
</div>
<div class="quick-ref-card">
<h4> Registos do contentor</h4>
<code>docker logs -f nome</code>
</div>
<div class="quick-ref-card">
<h4> Entrar em PostgreSQL</h4>
<code>docker exec -it postgres psql -U exemplo1</code>
</div>
<div class="quick-ref-card">
<h4> Criar uma base de dados</h4>
<code>docker exec -i postgres psql -U exemplo1 -c "CREATE DATABASE x;"</code>
</div>
<div class="quick-ref-card">
<h4> Listar bases de dados</h4>
<code>docker exec -i postgres psql -U exemplo1 -c "\\l"</code>
</div>
<div class="quick-ref-card">
<h4> Listar tabelas</h4>
<code>docker exec -i postgres psql -U exemplo1 -d x -c "\\dt"</code>
</div>
<div class="quick-ref-card">
<h4> Backup manual</h4>
<code>docker exec -i postgres pg_dump -U exemplo1 -Fc x > /srv/db/backups/x.dump</code>
</div>
<div class="quick-ref-card">
<h4> Restaurar backup</h4>
<code>docker exec -i postgres pg_restore -U exemplo1 -d x -c &lt; /srv/db/backups/x.dump</code>
</div>
<div class="quick-ref-card">
<h4> Verificar rede</h4>
<code>docker network inspect data</code>
</div>
<div class="quick-ref-card">
<h4> Limpar imagens</h4>
<span class="risk-label">Remove imagens não utilizadas</span>
<code>docker image prune -f</code>
</div>
<div class="quick-ref-card">
<h4> Estado dos serviços</h4>
<code>systemctl status docker cron</code>
</div>
<div class="quick-ref-card">
<h4> Estado firewall</h4>
<code>ufw status</code>
</div>
<div class="quick-ref-card">
<h4> Ver certificados</h4>
<code>ls -la /etc/cloudflare/</code>
</div>
<div class="quick-ref-card">
<h4> Reiniciar proxy</h4>
<code>cd /srv/proxy && docker compose up -d --force-recreate</code>
</div>
<div class="quick-ref-card">
<h4> Testar SSL</h4>
<code>curl -I https://dominio.com</code>
</div>
<div class="quick-ref-card">
<h4> Estado do runner</h4>
<code>systemctl status actions.runner.*.service</code>
</div>
<div class="quick-ref-card">
<h4> Listar runners</h4>
<code>ls /home/runner/</code>
</div>
<div class="quick-ref-card">
<h4> Reiniciar runner</h4>
<code>cd /home/runner/NOME-RUNNER && sudo ./svc.sh start</code>
</div>
</div>
</div>
</div>

<!-- 8. Arquitetura -->
<div class="section collapsed" id="arquitetura">
<div class="section-header">
<h2> 8. Arquitetura Visual</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
<div class="architecture-diagram">
                    
<span class="highlight">INTERNET</span>
                    
                                              
                                              
                    
<span class="highlight">CLOUDFLARE</span>
                                       (DNS + SSL + Proxy)                                
                              *.exemplo1.com  IP_DO_VPS                           
                    
                                              
                                              
                    
<span class="network">UFW</span>
                                         (22, 80, 443)                                    
                    
                                              
                                              
                    
<span class="container">NGINX PROXY</span>
                                          /srv/proxy/                                     
                                        Portas: 80, 443                                   
                                        Redes: <span class="network">edge</span>, <span class="network">apps</span>
                    
                                              
                    
                                                                      
                                                                      
      
<span class="container">APP-EXEMPLO</span><span class="container">EXEMPLO1-WEB</span><span class="container">EXEMPLO2-API</span>
        /srv/apps/app-exemplo/      /srv/apps/exemplo1/        /srv/apps/exemplo2/    
       Rede: <span class="network">apps</span>Redes: <span class="network">apps</span>, <span class="network">data</span>Redes: <span class="network">apps</span>, <span class="network">data</span>
      
                                                                       
                                                                       
                                              
                                                        
                                                        
                    
<span class="container">POSTGRES</span>
                                          /srv/db/                                         
                                        Porta: 5432 (local)                               
                                        Rede: <span class="network">data</span>
                                        Databases:                                         
                                          - exemplo1                                      
                                          - exemplo1_dev                                  
                                          - exemplo2                                      
                                          - postgres (sistema)                             
                                        Backups: /srv/db/backups/                          
                                        Cron: 02:00 diário                                 
                    
</div>

<div class="tip">
<strong>Fluxo de dados:</strong><br>
                    Internet  Cloudflare (SSL)  UFW  NGINX (proxy)  App Container  PostgreSQL<br><br>
<strong>Cada container liga ao PostgreSQL pelo nome <code>postgres</code> na rede <code>data</code>.</strong>
</div>
</div>
</div>

<!-- 9. Certificados SSL -->
<div class="section collapsed" id="certificados">
<div class="section-header">
<h2> 9. Certificados SSL</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
<div class="subsection">
<h3> Certificados de origem do Cloudflare</h3>
                    
<p style="color: var(--text-secondary); margin-bottom: 1rem;">
                        Os Origin Certificates são gerados no Cloudflare e usados pelo nginx no VPS para comunicação segura entre Cloudflare e o servidor.
</p>

<div class="command-block">
<code># Estrutura de certificados no VPS
/etc/cloudflare/
 exemplo1.com/
    cert.pem              # Certificado wildcard (*.exemplo1.com)
    key.pem               # Chave privada
 exemplo2.com/          # Para domínios custom
     cert.pem
     key.pem</code>
<button type="button" class="copy-btn">Copiar</button>
</div>

<table><tbody>
<tr>
<th>Domínio</th>
<th>Certificado</th>
<th>Chave</th>
<th>Uso</th>
</tr>
<tr>
<td><code>*.exemplo1.com</code></td>
<td><code>/etc/cloudflare/exemplo1.com/cert.pem</code></td>
<td><code>/etc/cloudflare/exemplo1.com/key.pem</code></td>
<td>Todos os subdomínios</td>
</tr>
</tbody></table>
</div>

<div class="subsection">
<h3> Como gerar um certificado de origem</h3>
                    
<ol style="color: var(--text-secondary); padding-left: 1.5rem; line-height: 2;">
<li>Entrar em <strong>Cloudflare Dashboard</strong></li>
<li>Selecionar domínio<strong>SSL/TLS</strong><strong>Origin Server</strong></li>
<li>Clicar <strong>Create Certificate</strong></li>
<li>Selecionar <strong>Generate private key and CSR with Cloudflare</strong></li>
<li>Domínio: <code>*.exemplo1.com</code> (ou domínio personalizado)</li>
<li>Validade: <strong>15 anos</strong> (recomendado)</li>
<li>Copiar <strong>cert.pem</strong> e <strong>key.pem</strong></li>
<li>No VPS, criar diretório e guardar ficheiros:</li>
</ol>

<div class="command-block">
<code># Criar diretório para novo domínio
mkdir -p /etc/cloudflare/exemplo2.com

# Guardar certificado (colar conteúdo do Cloudflare)
nano /etc/cloudflare/exemplo2.com/cert.pem

# Guardar chave privada (colar conteúdo do Cloudflare)
nano /etc/cloudflare/exemplo2.com/key.pem

# Definir permissões
chmod 600 /etc/cloudflare/exemplo2.com/*.pem</code>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="warning">
<strong>Importante:</strong> NUNCA partilhes a chave privada (<code>key.pem</code>). Guarda-a num local seguro.
</div>
</div>

<div class="subsection">
<h3> Montagens de volumes no Docker Compose</h3>
                    
<p style="color: var(--text-secondary); margin-bottom: 1rem;">
                        Para o nginx aceder aos certificados, precisas de mapear as pastas no <code>docker-compose.yml</code> do proxy.
</p>

<div class="command-block">
<code># /srv/proxy/docker-compose.yml
services:
  nginx:
    image: nginx:alpine
    container_name: proxy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./conf.d:/etc/nginx/conf.d
      # Certificados por domínio
      - /etc/cloudflare/exemplo1.com:/etc/cloudflare/exemplo1.com:ro
      - /etc/cloudflare/exemplo2.com:/etc/cloudflare/exemplo2.com:ro
    networks:
      - edge
      - apps</code>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="danger">
<strong>Cuidado:</strong> Cada domínio precisa de <strong>caminhos de volume únicos</strong> no container. Não reutilizes os mesmos paths para domínios diferentes!
</div>
</div>

<div class="subsection">
<h3> Nginx Config com SSL</h3>
                    
<div class="command-block">
<code># /srv/proxy/conf.d/exemplo1.conf
server {
    listen 80;
    server_name *.exemplo1.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name *.exemplo1.com;

    ssl_certificate     /etc/cloudflare/exemplo1.com/cert.pem;
    ssl_certificate_key /etc/cloudflare/exemplo1.com/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass http://exemplo1-web:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}</code>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code># /srv/proxy/conf.d/exemplo2.conf
server {
    listen 80;
    server_name exemplo2.com www.exemplo2.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name exemplo2.com www.exemplo2.com;

    ssl_certificate     /etc/cloudflare/exemplo2.com/cert.pem;
    ssl_certificate_key /etc/cloudflare/exemplo2.com/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass http://novo-container:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}</code>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<div class="subsection">
<h3> Reiniciar Proxy Após Mudanças</h3>
                    
<div class="command-block">
<code># Após adicionar novo certificado ou nginx conf
cd /srv/proxy && docker compose up -d --force-recreate</code>
<span class="comment"># Recriar container com novos volumes</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code># Verificar se nginx está a funcionar
docker logs proxy</code>
<span class="comment"># Ver logs do nginx</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code># Testar SSL externamente
curl -I https://exemplo1.com</code>
<span class="comment"># Verificar headers SSL</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<div class="subsection">
<h3> Checklist: novo domínio personalizado</h3>
                    
<table><tbody>
<tr>
<th>#</th>
<th>Passo</th>
<th>Comando/Local</th>
</tr>
<tr>
<td>1</td>
<td>Adicionar domínio no Cloudflare</td>
<td>Dashboard  Add Site</td>
</tr>
<tr>
<td>2</td>
<td>Gerar Origin Certificate</td>
<td>SSL/TLS  Origin Server  Create</td>
</tr>
<tr>
<td>3</td>
<td>Criar diretório no VPS</td>
<td><code>mkdir -p /etc/cloudflare/dominio-com</code></td>
</tr>
<tr>
<td>4</td>
<td>Guardar cert.pem e key.pem</td>
<td><code>nano /etc/cloudflare/dominio-com/cert.pem</code></td>
</tr>
<tr>
<td>5</td>
<td>Definir permissões</td>
<td><code>chmod 600 /etc/cloudflare/dominio-com/*.pem</code></td>
</tr>
<tr>
<td>6</td>
<td>Adicionar volumes no proxy</td>
<td><code>/srv/proxy/docker-compose.yml</code></td>
</tr>
<tr>
<td>7</td>
<td>Criar nginx conf</td>
<td><code>/srv/proxy/conf.d/dominio.conf</code></td>
</tr>
<tr>
<td>8</td>
<td>Reiniciar proxy</td>
<td><code>docker compose -f /srv/proxy/docker-compose.yml up -d --force-recreate</code></td>
</tr>
<tr>
<td>9</td>
<td>Verificar SSL</td>
<td><code>curl -I https://dominio.com</code></td>
</tr>
</tbody></table>
</div>

<div class="tip">
<strong>Dica:</strong> para subdomínios (ex.: <code>api.exemplo1.com</code>), o certificado wildcard já assegura a cobertura. Só precisas de criar o registo DNS e a configuração do Nginx.
</div>

<div class="next-steps">
<h3>Próximos passos</h3>
<p style="color: var(--text-secondary); margin-bottom: 1rem;">Completaste a referência do VPS. Para avançar:</p>
<ul class="next-steps-list">
<li>
<span class="arrow"></span>
<span>Estuda os módulos no separador <strong>Aprendizagem</strong></span>
</li>
<li>
<span class="arrow"></span>
<span>Usa o roadmap no separador <strong>Percurso DevOps</strong> para escolher o próximo tema</span>
</li>
<li>
<span class="arrow"></span>
<span>Configura o teu VPS no separador <strong>Configuração do VPS</strong></span>
</li>
<li>
<span class="arrow"></span>
<span>Pratica primeiro num VPS descartável e valida cada alteração</span>
</li>
</ul>
</div>
</div>
</div>`;
