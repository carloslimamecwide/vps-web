// Generated from guia-vps.html by scripts/migrate-source.mjs.
export const learningHtml = `<div class="course-header">
<h2> Percurso introdutório de DevOps</h2>
<p>Começa pelos fundamentos e conclui a iniciação em 7.1 — O que é um Reverse Proxy? As lições seguintes ficam disponíveis como continuação, sem bloquearem o teu progresso essencial.</p>
</div>
<nav class="nav-bar">
<a href="#linux-fundamentos">Linux</a>
<a href="#docker-oque">Docker</a>
<a href="#postgresql-fundamentos">PostgreSQL</a>
<a href="#cicd-fundamentos">CI/CD</a>
<a href="#deploy-strategies">Deploy</a>
<a href="#seguranca-fundamentos">Segurança</a>
<a href="#nginx-fundamentos">Nginx</a>
<a href="#monitoring-fundamentos">Monitorização</a>
<a href="#kubernetes-fundamentos">Kubernetes</a>
<a href="#iac-fundamentos">IaC</a>
<a href="#cloud-fundamentos">Cloud</a>
<a href="#troubleshooting-fundamentos">Resolução de problemas</a>
</nav>

<div class="warning">
<strong>Antes de copiares comandos:</strong> valores em maiúsculas como <code>IP_DO_VPS</code>, <code>UTILIZADOR_GITHUB</code>, <code>REPOSITORIO</code>, <code>TOKEN</code> e <code>TAG_ANTERIOR</code> são placeholders. Usa um VPS descartável e confirma sempre o efeito do comando.
</div>

<section class="level-overview" aria-labelledby="learning-levels-title">
<h2 id="learning-levels-title">Três níveis, um percurso claro</h2>
<div class="level-grid">
<article class="level-card level-essential">
<span class="level-kicker">Nível 1 · essencial</span>
<h3>Iniciação</h3>
<p>Módulos 1–6 e a lição 7.1. Este é o percurso recomendado para quem está a começar.</p>
<button type="button" data-action="navigate-to" data-scope="learning" data-target="linux-fundamentos">Começar no Linux</button>
</article>
<article class="level-card level-practical">
<span class="level-kicker">Nível 2 · opcional</span>
<h3>Continuação prática</h3>
<p>Lições 7.2–7.4 para configurar Nginx, server blocks e terminação TLS.</p>
<button type="button" data-action="navigate-to" data-scope="learning" data-target="nginx-5-2">Ir para 7.2</button>
</article>
<article class="level-card level-next">
<span class="level-kicker">Nível 3 · explorar</span>
<h3>Próximos passos</h3>
<p>Monitorização, Kubernetes, infraestrutura como código, cloud e resolução de problemas.</p>
<button type="button" data-action="navigate-to" data-scope="learning" data-target="monitoring-fundamentos">Ver próximos passos</button>
</article>
</div>
</section>

<aside class="real-case" aria-labelledby="webfusionlab-case-title">
<span class="level-kicker">Caso real ao longo do guia</span>
<h2 id="webfusionlab-case-title">WebFusionLab</h2>
<p>Usamos o projeto para ligar a teoria à prática: Dockerfile multi-stage com utilizador não-root, Compose com redes e health check, GitHub Actions a publicar no GHCR e deployment num VPS protegido por Nginx e Cloudflare.</p>
<p><strong>Evolução futura:</strong> o projeto ainda não usa uma base de dados. Os exemplos de PostgreSQL preparam esse passo, mas não descrevem o estado atual do WebFusionLab.</p>
</aside>

<!-- Progress Bar Global -->
<div class="learning-progress-global">
<span class="progress-label">Progresso essencial:</span>
<div class="progress-bar">
<div class="progress-fill" id="learningProgressFill" style="width: 0%"></div>
            <div class="learning-reset">
                <button type="button" data-action="reset-progress" data-progress-store="learning-progress">Repor progresso</button>
            </div>

</div>
<span class="progress-percent" id="learningProgressPercent">0%</span>
</div>

            

<div class="section collapsed" id="linux-fundamentos">
<div class="section-header">
<h2> 1. Linux Fundamentos</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
                    
<!-- Aula 1.1 -->
<div class="subsection" id="linux-1-1">
<h3>1.1 Porquê Linux?</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-linux-1-1"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Compreender porquê que 90% dos servidores usam Linux e as vantagens para DevOps.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            Linux é o sistema operativo mais usado em servidores no mundo. Porquê? Porque é <strong>gratuito</strong>, <strong>seguro</strong>, <strong>estável</strong> e <strong>personalizável</strong>. Quando aprendes comandos Linux, aprendes a gerir qualquer servidor — desde um VPS da Contabo até AWS.
</p>

<div class="quick-ref">
<div class="quick-ref-card">
<h4> Segurança</h4>
<p style="color: var(--text-secondary);">Menos vulnerabilidades que Windows. Atualizações rápidas. Permissões granulares.</p>
</div>
<div class="quick-ref-card">
<h4> Performance</h4>
<p style="color: var(--text-secondary);">Leve, rápido, consome poucos recursos. Ideal para servidores.</p>
</div>
<div class="quick-ref-card">
<h4> Comunidade</h4>
<p style="color: var(--text-secondary);">Millhões de developers. Documentação gratuita. Stack Overflow.</p>
</div>
<div class="quick-ref-card">
<h4> Docker</h4>
<p style="color: var(--text-secondary);">Docker corre nativamente em Linux. Os contentores são processos Linux isolados.</p>
</div>
</div>

<div class="tip">
<strong>Neste VPS de exemplo:</strong> usamos Ubuntu 22.04 LTS. A maioria dos comandos funciona em qualquer distribuição Linux (Debian, CentOS, etc.).
</div>
</div>

<!-- Aula 1.2 -->
<div class="subsection" id="linux-1-2">
<h3>1.2 Sistema de ficheiros e navegação</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-linux-1-2"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> navegar no sistema de ficheiros Linux e compreender a estrutura de pastas.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            O sistema de ficheiros Linux é uma <strong>árvore</strong> que começa em <code>/</code> (root). Tudo está organizado em pastas com significados específicos.
</p>

<div class="file-content">
<div class="file-content-header">
<span class="file-name">Estrutura de Pastas Linux</span>
</div>
<pre tabindex="0"><span class="folder">/</span><span class="comment">← Raiz (root)</span>
├── <span class="folder">home/</span><span class="comment">← Pastas dos utilizadores</span>
│   ├── <span class="folder">utilizador-exemplo/</span><span class="comment">← Pasta do utilizador de exemplo</span>
│   └── <span class="folder">runner/</span><span class="comment">← Pasta do utilizador runner</span>
├── <span class="folder">etc/</span><span class="comment">← Configurações do sistema</span>
│   ├── <span class="file">nginx/</span><span class="comment">← Config do nginx</span>
│   └── <span class="file">ssh/</span><span class="comment">← Chaves SSH</span>
├── <span class="folder">var/</span><span class="comment">← Dados variáveis (logs, etc.)</span>
│   └── <span class="folder">log/</span><span class="comment">← Logs do sistema</span>
├── <span class="folder">srv/</span><span class="comment">← Aplicações de exemplo</span>
│   ├── <span class="folder">proxy/</span><span class="comment">← Nginx reverse proxy</span>
│   ├── <span class="folder">apps/</span><span class="comment">← Aplicações</span>
│   └── <span class="folder">db/</span><span class="comment">← PostgreSQL</span>
├── <span class="folder">tmp/</span><span class="comment">← Ficheiros temporários</span>
└── <span class="folder">usr/</span><span class="comment">← Programas do sistema</span></pre>
</div>

<h4>Comandos de Navegação</h4>
<div class="command-block">
<code>pwd</code>
<span class="comment"># Mostra em que diretório estás (diretório de trabalho atual)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>ls</code>
<span class="comment"># Lista ficheiros no diretório atual</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>ls -la</code>
<span class="comment"># Lista detalhada (inclui ocultos e permissões)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>cd /srv/apps</code>
<span class="comment"># Mudar para o diretório /srv/apps</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>cd ~</code>
<span class="comment"># Ir para a pasta home do utilizador</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>cd ..</code>
<span class="comment"># Voltar um diretório acima</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>tree -L 2 /srv</code>
<span class="comment"># Mostra estrutura em árvore (2 níveis)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="exercise">
<strong>Exercício:</strong> Liga ao teu VPS via SSH e navega até <code>/srv/apps</code>. Usa <code>pwd</code> para confirmar que estás no sítio certo. Depois volta para a home com <code>cd ~</code>.
</div>
</div>

<!-- Aula 1.3 -->
<div class="subsection" id="linux-1-3">
<h3>1.3 Operações com Ficheiros</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-linux-1-3"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Criar, copiar, mover, remover e procurar ficheiros.
</div>

<table>
<thead>
<tr>
<th>Comando</th>
<th>O que faz</th>
<th>Exemplo</th>
</tr>
</thead>
<tbody>
<tr><td><code>touch ficheiro.txt</code></td><td>Cria ficheiro vazio</td><td><code>touch nota.txt</code></td></tr>
<tr><td><code>mkdir pasta</code></td><td>Cria diretório</td><td><code>mkdir -p /srv/apps/novo</code></td></tr>
<tr><td><code>cp origem destino</code></td><td>Copia ficheiro</td><td><code>cp conf.bak conf.yml</code></td></tr>
<tr><td><code>mv origem destino</code></td><td>Move ou renomeia</td><td><code>mv antigo.log /tmp/</code></td></tr>
<tr><td><code>rm ficheiro</code></td><td>Remove ficheiro</td><td><code>rm temp.txt</code></td></tr>
<tr><td><code>rm -r pasta</code></td><td>Remove diretório</td><td><code>rm -r /tmp/antigo/</code></td></tr>
</tbody>
</table>

<h4>Procurar Texto</h4>
<div class="command-block">
<code>cat ficheiro.txt</code>
<span class="comment"># Mostra todo o conteúdo do ficheiro</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>grep "texto" ficheiro.txt</code>
<span class="comment"># Procura "texto" no ficheiro</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>tail -f /var/log/syslog</code>
<span class="comment"># Mostra últimas linhas de um log (em tempo real)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>find /srv -name "*.conf"</code>
<span class="comment"># Procura ficheiros .conf em /srv</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="warning">
<strong>Cuidado:</strong> <code>rm -rf</code> remove TUDO sem confirmar. Usa com cuidado! Nunca faças <code>rm -rf /</code>.
</div>

<div class="exercise">
<strong>Exercício:</strong> cria um diretório <code>/tmp/aula-linux</code>, cria um ficheiro <code>teste.txt</code> dentro dele e usa <code>grep</code> para procurar uma palavra no ficheiro.
</div>
</div>

<!-- Aula 1.4 -->
<div class="subsection" id="linux-1-4">
<h3>1.4 Utilizadores e grupos</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-linux-1-4"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> gerir utilizadores e grupos e compreender por que razão não deves usar root para tudo.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            Em Linux, cada utilizador tem o seu <strong>diretório pessoal</strong> e <strong>permissões próprias</strong>. Usar root para tudo é perigoso — um comando errado pode destruir o sistema. O ideal é ter:
</p>

<ul style="color: var(--text-secondary); padding-left: 1.5rem; line-height: 2;">
<li><strong>root</strong> — administração do sistema (usar só quando necessário)</li>
<li><strong>utilizador normal</strong> — operações diárias (ex.: <code>utilizador-exemplo</code>)</li>
<li><strong>utilizador de serviço</strong> — para apps específicas (ex: runner)</li>
</ul>

<div class="command-block">
<code>adduser nome</code>
<span class="comment"># Criar utilizador novo (interativo)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>usermod -aG docker utilizador-exemplo</code>
<span class="comment"># Adicionar o utilizador de exemplo ao grupo docker</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>groups utilizador-exemplo</code>
<span class="comment"># Ver grupos do utilizador</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>whoami</code>
<span class="comment"># Mostra o utilizador atual</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>id</code>
<span class="comment"># Mostra UID, GID e grupos</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="tip">
<strong>Neste VPS de exemplo:</strong> existem três utilizadores: <code>root</code> (administração), <code>utilizador-exemplo</code> (utilização diária, com sudo) e <code>runner</code> (GitHub Actions, sem autenticação por palavra-passe).
</div>
<div class="danger">
<strong>Grupo docker:</strong> um membro deste grupo consegue, na prática, obter acesso equivalente a root através do daemon. Adiciona apenas contas de confiança e volta a iniciar sessão depois de alterares os grupos.
</div>
</div>

<!-- Aula 1.5 -->
<div class="subsection" id="linux-1-5">
<h3>1.5 Permissões (chmod, chown)</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-linux-1-5"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> compreender e alterar permissões de ficheiros e diretórios.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            Cada ficheiro em Linux tem <strong>permissões</strong> que definem quem pode ler, escrever e executar. São representadas como <code>rwx</code> (read, write, execute).
</p>

<div class="file-content">
<div class="file-content-header">
<span class="file-name">Estrutura de Permissões</span>
</div>
<pre tabindex="0"><span class="comment"># Exemplo de output do ls -la:</span>
-rwxr-xr-- 1 utilizador-exemplo docker 4096 Jan 27 10:00 ficheiro.sh
│└┬┘└┬┘└┬┘
│ │  │  │
│ │  │  └── Outros (outros utilizadores): r-- (só leitura)
│ │  └───── Grupo (docker): r-x (leitura + execução)
│ └──────── Proprietário (utilizador-exemplo): rwx (tudo)
└────────── Tipo: - = ficheiro, d = diretório</pre>
</div>

<div class="command-block">
<code>chmod 755 ficheiro.sh</code>
<span class="comment"># Proprietário: rwx (7), grupo: r-x (5), outros: r-x (5)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>chmod 600 chave.pem</code>
<span class="comment"># Só o proprietário lê e escreve (ideal para chaves privadas)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>chown utilizador-exemplo:docker ficheiro.txt</code>
<span class="comment"># Altera o proprietário e o grupo</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="tip">
<strong>Números:</strong> r=4, w=2, x=1. Soma: rwx=7, rw-=6, r-x=5, r--=4.
</div>

<div class="exercise">
<strong>Exercício:</strong> No VPS, cria um ficheiro e muda as permissões para <code>600</code>. Usa <code>ls -la</code> para verificar. Depois muda para <code>755</code> e verifica novamente.
</div>
</div>

<!-- Aula 1.6 -->
<div class="subsection" id="linux-1-6">
<h3>1.6 SSH e acesso remoto</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-linux-1-6"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Ligação segura ao VPS via SSH, chaves públicas/privadas, túneis SSH.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            SSH (Secure Shell) é como uma <strong>"tunel seguro"</strong> entre o teu computador e o VPS. Tudo o que envias vai encriptado.
</p>

<div class="command-block">
<code>ssh utilizador-exemplo@IP_DO_VPS</code>
<span class="comment"># Ligar ao VPS (pede a palavra-passe)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<h4>Chaves SSH (mais seguras do que uma palavra-passe)</h4>
<div class="command-block">
<code>ssh-keygen -t ed25519</code>
<span class="comment"># Gerar par de chaves (no teu computador local)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>ssh-copy-id utilizador-exemplo@IP_DO_VPS</code>
<span class="comment"># Copiar chave pública para o VPS</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<h4>SSH Tunnel (para PostgreSQL)</h4>
<div class="command-block">
<code>ssh -L 5433:127.0.0.1:5432 utilizador-exemplo@IP_DO_VPS</code>
<span class="comment"># Porta 5433 no teu PC  5432 no VPS (PostgreSQL)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="tip">
<strong>Dica:</strong> Configura o <code>~/.ssh/config</code> para não precisares de escrever o IP sempre.
</div>

<div class="file-content">
<div class="file-content-header">
<span class="file-name">~/.ssh/config (exemplo)</span>
</div>
<pre tabindex="0">Host vps
    HostName IP_DO_VPS
    User utilizador-exemplo
    IdentityFile ~/.ssh/id_ed25519</pre>
</div>

<p style="color: var(--text-secondary); line-height: 1.8; margin-top: 1rem;">
                            Agora podes ligar apenas com: <code>ssh vps</code>
</p>
</div>

<!-- Aula 1.7 -->
<div class="subsection" id="linux-1-7">
<h3>1.7 Gestão de Processos</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-linux-1-7"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> ver processos em execução, terminá-los e compreender o systemd.
</div>

<div class="command-block">
<code>ps aux</code>
<span class="comment"># Lista todos os processos</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>top</code>
<span class="comment"># Monitor de processos em tempo real (pressiona q para sair)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>htop</code>
<span class="comment"># Versão melhorada do top (mais bonito)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>kill PID</code>
<span class="comment"># Matar processo pelo PID</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>pkill nome</code>
<span class="comment"># Matar processo pelo nome</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<h4>systemd — Gestão de Serviços</h4>
<p style="color: var(--text-secondary); line-height: 1.8;">
<code>systemctl</code> é o comando para gerir serviços (Docker, cron, nginx, etc.).
</p>

<div class="command-block">
<code>systemctl status docker</code>
<span class="comment"># Estado do serviço Docker</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>systemctl restart docker</code>
<span class="comment"># Reiniciar serviço</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>systemctl enable docker</code>
<span class="comment"># Auto-iniciar no boot</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<!-- Aula 1.8 -->
<div class="subsection" id="linux-1-8">
<h3>1.8 Gestão de pacotes e registos</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-linux-1-8"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Instalar programas, atualizar sistema, ver logs.
</div>

<h4>apt — Gestor de Pacotes (Ubuntu/Debian)</h4>
<div class="command-block">
<code>apt update</code>
<span class="comment"># Atualizar lista de pacotes disponíveis</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>apt upgrade -y</code>
<span class="comment"># Atualizar todos os pacotes instalados</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>apt install nome</code>
<span class="comment"># Instalar programa</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<h4>Registos do sistema</h4>
<div class="command-block">
<code>journalctl -u docker --since "1 hour ago"</code>
<span class="comment"># Logs do Docker última hora</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>tail -f /var/log/syslog</code>
<span class="comment"># Logs do sistema em tempo real</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>cat /var/log/pg-backup.log</code>
<span class="comment"># Log dos backups PostgreSQL</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="exercise">
<strong>Exercício:</strong> No VPS, Usa <code>apt update</code> e depois <code>apt list --upgradable</code> para ver quantos pacotes precisam de atualização.
</div>
</div>
</div>
</div>

<!-- ============================================ -->
<!-- SECÇÃO 2: POSTGRESQL -->
<!-- ============================================ -->


<div class="section collapsed" id="docker-oque">
<div class="section-header">
<h2> 2. Docker</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
<div class="subsection" id="docker-oque-1">
<h3> Analogia</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-oque-1"><span>Concluída</span></label>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            Imagina que queres montar uma equipa de futebol. Em vez de construíres um estádio completo para cada jogo (instalar o sistema operativo, dependências, configurações), Docker dá-te um <strong>"campo portátil"</strong> — uma caixa com tudo o que a tua aplicação precisa para funcionar, em qualquer sítio.
</p>
</div>

<div class="subsection" id="docker-oque-2">
<h3> Contentor e máquina virtual</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-oque-2"><span>Concluída</span></label>

<table>
<thead>
<tr>
<th>Aspecto</th>
<th>Container (Docker)</th>
<th>VM (VirtualBox, VMware)</th>
</tr>
</thead>
<tbody>
<tr>
<td>O que é</td>
<td>Processo isolado no SO host</td>
<td>Máquina virtual completa</td>
</tr>
<tr>
<td>Sistema operativo</td>
<td>Partilha o SO do host (só binários)</td>
<td>Tem o seu próprio SO completo</td>
</tr>
<tr>
<td>Tamanho</td>
<td>MBs (image pequena)</td>
<td>GBs (image completa)</td>
</tr>
<tr>
<td>Arranque</td>
<td>Segundos</td>
<td>Minutos</td>
</tr>
<tr>
<td>Isolamento</td>
<td>Bom (namespaces + cgroups)</td>
<td>Muito forte (hypervisor)</td>
</tr>
<tr>
<td>Uso de recursos</td>
<td>Leve (partilha kernel)</td>
<td>Pesado (SO dedicado)</td>
</tr>
</tbody>
</table>
</div>

<div class="subsection" id="docker-oque-3">
<h3>Por que usar Docker?</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-oque-3"><span>Concluída</span></label>

<div class="quick-ref">
<div class="quick-ref-card">
<h4> Consistência</h4>
<p style="color: var(--text-secondary);">"Funciona no meu computador"  funciona em qualquer sítio. O container tem as mesmas dependências sempre.</p>
</div>
<div class="quick-ref-card">
<h4> Isolamento</h4>
<p style="color: var(--text-secondary);">Cada app tem o seu container. Não há conflitos de versões entre projetos.</p>
</div>
<div class="quick-ref-card">
<h4> Portabilidade</h4>
<p style="color: var(--text-secondary);">O mesmo container corre em macOS, Linux, Windows, VPS, cloud — sem alterações.</p>
</div>
<div class="quick-ref-card">
<h4> Deploy rápido</h4>
<p style="color: var(--text-secondary);">Puxar image + arrancar container = segundos. Rollbacks instantâneos.</p>
</div>
</div>
</div>

<div class="subsection" id="docker-oque-4">
<h3>Comandos essenciais</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-oque-4"><span>Concluída</span></label>

<div class="command-block">
<code>docker --version</code>
<span class="comment"># Ver versão do Docker</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>docker info</code>
<span class="comment"># Informações detalhadas do Docker</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
</div>

<!-- Section 2: Images & Containers -->


<div class="section collapsed" id="docker-images">
<div class="section-header">
<h2> 2.2 Imagens e contentores</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
<div class="subsection" id="docker-images-1">
<h3> O que é uma imagem?</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-images-1"><span>Concluída</span></label>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            Uma <strong>image</strong> é um <strong>molde</strong> (template) com tudo o que uma aplicação precisa: código, dependências, sistema de ficheiros, configurações. É como uma fotografia — imutável (não muda depois de criada).
</p>
<div class="command-block">
<code>docker images</code>
<span class="comment"># Listar images locais</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>docker pull nginx:alpine</code>
<span class="comment"># Puxar image do Docker Hub</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<div class="subsection" id="docker-images-2">
<h3> O que é um contentor?</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-images-2"><span>Concluída</span></label>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            Um <strong>container</strong> é uma <strong>instância</strong> de uma image a correr. É como tirar uma fotografia e meter num quadro — a image é o molde, o container é o que está a funcionar agora.
</p>
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
</div>

<div class="subsection" id="docker-images-3">
<h3> Ciclo de vida</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-images-3"><span>Concluída</span></label>

<div class="architecture-diagram">
<span class="highlight">Imagem</span> <span class="network">docker run</span> <span class="container">Contentor (em execução)</span>
                              
                              
<span class="container">Contentor (parado)</span> <span class="network">docker start</span> <span class="container">Contentor (em execução)</span>
                              
                              
<span class="container">Contentor (removido)</span> <span class="network">docker rm</span> <span class="highlight">A imagem permanece</span></div>
</div>

<div class="subsection" id="docker-images-4">
<h3> Tabela de comandos</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-images-4"><span>Concluída</span></label>

<table>
<thead>
<tr>
<th>Comando</th>
<th>O que faz</th>
</tr>
</thead>
<tbody>
<tr><td><code>docker run -d nginx</code></td><td>Cria e arranca container (detached)</td></tr>
<tr><td><code>docker stop ID</code></td><td>Para container</td></tr>
<tr><td><code>docker start ID</code></td><td>Arranca container parado</td></tr>
<tr><td><code>docker rm ID</code></td><td>Remove container</td></tr>
<tr><td><code>docker rmi IMAGE</code></td><td>Remove image</td></tr>
<tr><td><code>docker logs ID</code></td><td>Mostra logs do container</td></tr>
<tr><td><code>docker exec -it ID bash</code></td><td>Entra no container (shell)</td></tr>
<tr><td><code>docker inspect ID</code></td><td>Info detalhada do container</td></tr>
</tbody>
</table>
</div>

<div class="tip">
<strong>Dica:</strong> Usa <code>docker run --name nome-container</code> para dar um nome legível ao container em vez de um ID aleatório.
</div>
</div>
</div>

<!-- Section 3: Dockerfile -->


<div class="section collapsed" id="dockerfile">
<div class="section-header">
<h2> 2.3 Dockerfile</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
<div class="subsection" id="dockerfile-1">
<h3>O que é um Dockerfile?</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-dockerfile-1"><span>Concluída</span></label>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            Um <strong>Dockerfile</strong> é uma receita — um conjunto de instruções, passo a passo, para construir uma imagem. Defines: "instala isto, copia aquele ficheiro e abre esta porta".
</p>
</div>

<div class="subsection" id="dockerfile-2">
<h3>Anatomia completa</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-dockerfile-2"><span>Concluída</span></label>

<div class="file-content">
<div class="file-content-header">
<span class="file-name">Dockerfile (exemplo Next.js)</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0"><span class="bash-comment"># --- Fase 1: Build ---</span>
<span class="bash-keyword">FROM</span> node:24-alpine <span class="bash-keyword">AS</span> builder

<span class="bash-comment"># Definir diretório de trabalho</span>
<span class="bash-keyword">WORKDIR</span> /app

<span class="bash-comment"># Copiar package.json primeiro (melhor cache)</span>
<span class="bash-keyword">COPY</span> package.json package-lock.json ./

<span class="bash-comment"># Instalar dependências</span>
<span class="bash-keyword">RUN</span> npm ci

<span class="bash-comment"># Copiar código fonte</span>
<span class="bash-keyword">COPY</span> . .

<span class="bash-comment"># Build (requer output: "standalone" no next.config)</span>
<span class="bash-keyword">RUN</span> npm run build

<span class="bash-comment"># --- Fase 2: Produção ---</span>
<span class="bash-keyword">FROM</span> node:24-alpine

<span class="bash-keyword">WORKDIR</span> /app
<span class="bash-keyword">ENV</span> NODE_ENV=production

<span class="bash-comment"># Utilizador sem privilégios root</span>
<span class="bash-keyword">RUN</span> addgroup --system --gid 1001 nodejs &amp;&amp; adduser --system --uid 1001 nextjs

<span class="bash-comment"># Standalone com dono correto (omite public/ se o projeto não tiver)</span>
<span class="bash-keyword">COPY</span> --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
<span class="bash-keyword">COPY</span> --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

<span class="bash-keyword">USER</span> nextjs

<span class="bash-keyword">EXPOSE</span> <span class="bash-num">3000</span>
<span class="bash-keyword">ENV</span> PORT=3000

<span class="bash-keyword">HEALTHCHECK</span> --interval=30s --timeout=5s --start-period=20s --retries=3 <span class="bash-keyword">CMD</span> node -e "fetch('http://127.0.0.1:3000').then((r)=&gt;process.exit(r.ok?0:1)).catch(()=&gt;process.exit(1))"

<span class="bash-keyword">CMD</span> [<span class="bash-str">"node"</span>, <span class="bash-str">"server.js"</span>]</pre>
</div>
</div>

<div class="subsection" id="dockerfile-3">
<h3>Instruções essenciais</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-dockerfile-3"><span>Concluída</span></label>

<table>
<thead>
<tr>
<th>Instrução</th>
<th>O que faz</th>
<th>Exemplo</th>
</tr>
</thead>
<tbody>
<tr><td><code>FROM</code></td><td>Imagem base</td><td><code>FROM node:24-alpine</code></td></tr>
<tr><td><code>WORKDIR</code></td><td>Diretório de trabalho</td><td><code>WORKDIR /app</code></td></tr>
<tr><td><code>COPY</code></td><td>Copia ficheiros para a imagem</td><td><code>COPY . .</code></td></tr>
<tr><td><code>RUN</code></td><td>Executa comando durante build</td><td><code>RUN npm ci</code></td></tr>
<tr><td><code>USER</code></td><td>Corre o processo sem root</td><td><code>USER nextjs</code></td></tr>
<tr><td><code>EXPOSE</code></td><td>Documenta porta (não abre!)</td><td><code>EXPOSE 3000</code></td></tr>
<tr><td><code>CMD</code></td><td>Comando ao arrancar o contentor</td><td><code>CMD ["node","server.js"]</code></td></tr>
<tr><td><code>ENV</code></td><td>Variável de ambiente</td><td><code>ENV NODE_ENV=production</code></td></tr>
</tbody>
</table>
</div>

<div class="subsection" id="dockerfile-4">
<h3> Build multi-stage</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-dockerfile-4"><span>Concluída</span></label>

<p style="color: var(--text-secondary); line-height: 1.8;">
<strong>Porquê?</strong> Uma imagem de build (compilação e dependências de desenvolvimento) pode ser grande. A imagem final com output <code>standalone</code> fica muito mais pequena e corre sem root.
</p>
<div class="architecture-diagram">
<span class="highlight">Fase 1: builder</span><span class="highlight">Fase 2: produção</span>
            
 node:24-alpine                    node:24-alpine       
 + npm ci               COPY   + .next/standalone  
 + npm run build        (só o  + .next/static      
 + código fonte         necessário) + USER nextjs  
</div>
</div>

<div class="subsection" id="dockerfile-5">
<h3>.dockerignore</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-dockerfile-5"><span>Concluída</span></label>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            Ficheiros que o Docker <strong>ignora</strong> ao copiar (como .gitignore mas para Docker). Coloca na raiz do projeto:
</p>
<div class="file-content">
<div class="file-content-header">
<span class="file-name">.dockerignore</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0">node_modules
.git
.env
.env.local
.next
Dockerfile
docker-compose*.yml
README.md</pre>
</div>
</div>

<div class="command-block">
<code>docker build -t nome-app .</code>
<span class="comment"># Construir image a partir do Dockerfile</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>

<!-- Section 4: Docker Compose -->


<div class="section collapsed" id="docker-compose">
<div class="section-header">
<h2> 2.4 Docker Compose</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
<div class="subsection" id="docker-compose-1">
<h3>O que é Docker Compose?</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-compose-1"><span>Concluída</span></label>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            Docker Compose permite definir <strong>vários contentores</strong> num só ficheiro YAML. Em vez de executares cinco comandos <code>docker run</code>, executas <code>docker compose up</code> e os serviços arrancam em conjunto.
</p>
</div>

<div class="subsection" id="docker-compose-2">
<h3>Estrutura do docker-compose.yml</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-compose-2"><span>Concluída</span></label>

<div class="file-content">
<div class="file-content-header">
<span class="file-name">docker-compose.yml (exemplo do VPS)</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0"><span class="yaml-key">services</span>: <span class="yaml-comment"># Contentores que queres executar</span>
  <span class="yaml-key">nginx</span>:
    <span class="yaml-key">image</span>: <span class="yaml-str">nginx:alpine</span> <span class="yaml-comment"># Imagem a utilizar</span>
    <span class="yaml-key">container_name</span>: <span class="yaml-str">proxy</span> <span class="yaml-comment"># Nome do contentor</span>
    <span class="yaml-key">restart</span>: <span class="yaml-str">unless-stopped</span> <span class="yaml-comment"># Reinicia automaticamente</span>
    <span class="yaml-key">ports</span>: <span class="yaml-comment"># Mapear portas do host para o contentor</span>
      - <span class="yaml-str">"80:80"</span>
      - <span class="yaml-str">"443:443"</span>
    <span class="yaml-key">volumes</span>: <span class="yaml-comment"># Mapear ficheiros do host</span>
      - <span class="yaml-str">./conf.d:/etc/nginx/conf.d</span>
      - <span class="yaml-str">/etc/cloudflare/exemplo1.com:/etc/cloudflare/exemplo1.com:ro</span>
      - <span class="yaml-str">/etc/cloudflare/exemplo2.com:/etc/cloudflare/exemplo2.com:ro</span>
    <span class="yaml-key">networks</span>: <span class="yaml-comment"># Redes em que o contentor participa</span>
      - <span class="yaml-str">edge</span>
      - <span class="yaml-str">apps</span>
    <span class="yaml-key">mem_limit</span>: <span class="yaml-num">128m</span> <span class="yaml-comment"># Limite de memória</span>
    <span class="yaml-key">cpus</span>: <span class="yaml-num">0.50</span> <span class="yaml-comment"># Limite de CPU</span>

<span class="yaml-key">networks</span>: <span class="yaml-comment"># Redes externas (já criadas)</span>
  <span class="yaml-key">edge</span>:
    <span class="yaml-key">external</span>: <span class="yaml-num">true</span>
  <span class="yaml-key">apps</span>:
    <span class="yaml-key">external</span>: <span class="yaml-num">true</span></pre>
</div>
</div>

<div class="subsection" id="docker-compose-3">
<h3>Comandos essenciais</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-compose-3"><span>Concluída</span></label>

<table>
<thead>
<tr>
<th>Comando</th>
<th>O que faz</th>
</tr>
</thead>
<tbody>
<tr><td><code>docker compose up -d</code></td><td>Arranca todos os contentores em segundo plano</td></tr>
<tr><td><code>docker compose down</code> <span class="risk-label">Interrompe o serviço</span></td><td>Para e remove contentores; com <code>-v</code> também remove volumes</td></tr>
<tr><td><code>docker compose ps</code></td><td>Mostra os contentores deste projeto Compose</td></tr>
<tr><td><code>docker compose logs -f</code></td><td>Mostra logs em tempo real</td></tr>
<tr><td><code>docker compose pull</code></td><td>Obtém as imagens mais recentes</td></tr>
<tr><td><code>docker compose up -d --force-recreate</code></td><td>Recria os contentores, mesmo sem alterações</td></tr>
<tr><td><code>docker compose exec nginx sh</code></td><td>Abre uma shell no contentor Nginx</td></tr>
</tbody>
</table>
</div>

<div class="subsection" id="docker-compose-4">
<h3>.env — Variáveis de ambiente</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-compose-4"><span>Concluída</span></label>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            O Docker Compose substitui <code>\${VARIAVEL}</code> no YAML pelo valor do ficheiro <code>.env</code> no mesmo diretório. Assim, não guardas segredos no repositório.
</p>
<div class="file-content">
<div class="file-content-header">
<span class="file-name">.env (exemplo)</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0"><span class="bash-keyword">POSTGRES_DB</span>=<span class="bash-str">exemplo1</span>
<span class="bash-keyword">POSTGRES_USER</span>=<span class="bash-str">exemplo1</span>
<span class="bash-keyword">POSTGRES_PASSWORD</span>=<span class="bash-str">minha_palavra_passe_forte</span></pre>
</div>
<div class="file-content">
<div class="file-content-header">
<span class="file-name">docker-compose.yml (usando .env)</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0"><span class="yaml-key">services</span>:
  <span class="yaml-key">postgres</span>:
    <span class="yaml-key">image</span>: <span class="yaml-str">postgres:16-alpine</span>
    <span class="yaml-key">env_file</span>: <span class="yaml-str">./.env</span> <span class="yaml-comment"># Usa o ficheiro .env</span></pre>
</div>
</div>

<div class="warning">
<strong>Importante:</strong> O ficheiro <code>.env</code> deve estar no mesmo diretório do <code>docker-compose.yml</code>. Nunca subas o <code>.env</code> ao Git!
</div>
</div>
</div>

<!-- Section 5: Volumes -->


<div class="section collapsed" id="docker-volumes">
<div class="section-header">
<h2> 2.5 Volumes e dados</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
<div class="subsection" id="docker-volumes-1">
<h3>Por que precisas de volumes?</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-volumes-1"><span>Concluída</span></label>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            Por omissão, quando removes um contentor, <strong>todos os dados que estão dentro dele são perdidos</strong>. Os volumes permitem guardar dados persistentes no host (no teu VPS).
</p>
</div>

<div class="subsection" id="docker-volumes-2">
<h3>Volumes geridos e bind mounts</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-volumes-2"><span>Concluída</span></label>

<table>
<thead>
<tr>
<th>Tipo</th>
<th>Sintaxe</th>
<th>Quando usar</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Volume gerido</strong></td>
<td><code>db-data:/var/lib/postgresql/data</code></td>
<td>Dados de bases de dados, dados que o Docker gere</td>
</tr>
<tr>
<td><strong>Bind Mount</strong></td>
<td><code>./conf.d:/etc/nginx/conf.d</code></td>
<td>Configurações, código fonte, certificados SSL</td>
</tr>
</tbody>
</table>
</div>

<div class="subsection" id="docker-volumes-3">
<h3>Exemplos do VPS</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-volumes-3"><span>Concluída</span></label>

<div class="file-content">
<div class="file-content-header">
<span class="file-name">PostgreSQL — bind mounts (dados e backups)</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0"><span class="yaml-key">services</span>:
  <span class="yaml-key">postgres</span>:
    <span class="yaml-key">volumes</span>:
      - <span class="yaml-str">./data:/var/lib/postgresql/data</span> <span class="yaml-comment"># Bind mount — diretório no VPS</span>
      - <span class="yaml-str">./backups:/backups</span> <span class="yaml-comment"># Bind mount — para backups</span></pre>
</div>
<div class="file-content">
<div class="file-content-header">
<span class="file-name">Nginx — Bind Mount (configurações)</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0"><span class="yaml-key">services</span>:
  <span class="yaml-key">nginx</span>:
    <span class="yaml-key">volumes</span>:
      - <span class="yaml-str">./conf.d:/etc/nginx/conf.d</span> <span class="yaml-comment"># Configurações Nginx</span>
      - <span class="yaml-str">/etc/cloudflare/dominio.com:/etc/cloudflare/dominio.com:ro</span> <span class="yaml-comment"># TLS (só de leitura)</span></pre>
</div>
</div>

<div class="subsection" id="docker-volumes-4">
<h3>Comandos de volumes</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-volumes-4"><span>Concluída</span></label>

<div class="command-block">
<code>docker volume ls</code>
<span class="comment"># Listar volumes geridos</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<span class="risk-label">Destrutivo · remove um volume e os respetivos dados</span>
<code>docker volume rm nome-volume</code>
<span class="comment"># Remover volume</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<div class="danger">
<strong>Cuidado:</strong> os bind mounts dão acesso direto ao sistema de ficheiros do host. Usa <code>:ro</code> (só de leitura) quando o contentor não precisa de escrever no ficheiro.
</div>
</div>
</div>

<!-- Section 6: Networks -->


<div class="section collapsed" id="docker-networks">
<div class="section-header">
<h2> 2.6 Redes</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
<div class="subsection" id="docker-networks-1">
<h3>O que são redes Docker?</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-networks-1"><span>Concluída</span></label>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            As redes Docker são como <strong>"redes virtuais"</strong>: os contentores na mesma rede conseguem comunicar entre si; contentores em redes diferentes ficam isolados, salvo configuração adicional.
</p>
</div>

<div class="subsection" id="docker-networks-2">
<h3>Tipos de rede</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-networks-2"><span>Concluída</span></label>

<table>
<thead>
<tr>
<th>Tipo</th>
<th>Descrição</th>
<th>Uso</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>bridge</code></td>
<td>Predefinição. Os contentores comunicam através de IP interno</td>
<td>Contentores no mesmo host</td>
</tr>
<tr>
<td><code>host</code></td>
<td>O contentor partilha a rede do host</td>
<td>Performance máxima (sem isolamento)</td>
</tr>
<tr>
<td><code>overlay</code></td>
<td>Contentores em hosts diferentes</td>
<td>Docker Swarm / Kubernetes</td>
</tr>
</tbody>
</table>
</div>

<div class="subsection" id="docker-networks-3">
<h3> Arquitetura de redes deste exemplo</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-networks-3"><span>Concluída</span></label>

<div class="architecture-diagram">
<span class="highlight">Internet</span>
    
    

<span class="network">edge</span> (recebe tráfego externo)                  
                              
<span class="container">nginx (proxy)</span>ports 80/443            
                              
                                                
                              
<span class="network">apps</span> (comunicação interna)                 
                              
                                                
           
<span class="container">exemplo1</span><span class="network">data</span> (isolado)        
<span class="container">app-exemplo</span>
<span class="container">postgres</span>
                               
                              
</div>
<p style="color: var(--text-secondary); line-height: 1.8; margin-top: 1rem;">
<strong>edge</strong>: nginx recebe pedidos da internet<br>
<strong>apps</strong>: comunicação entre nginx e aplicações<br>
<strong>data</strong>: isolada — só os contentores autorizados acedem à base de dados
</p>
</div>

<div class="subsection" id="docker-networks-4">
<h3>Comandos</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-networks-4"><span>Concluída</span></label>

<div class="command-block">
<code>docker network ls</code>
<span class="comment"># Listar redes</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>docker network create nome-rede</code>
<span class="comment"># Criar rede</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>docker network inspect edge</code>
<span class="comment"># Ver contentores na rede</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
</div>

<!-- Section 7: Registos & Deploy -->


<div class="section collapsed" id="docker-deploy">
<div class="section-header">
<h2> 2.7 Registos e deployment</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
<div class="subsection" id="docker-deploy-1">
<h3>O que é um registo de contentores?</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-deploy-1"><span>Concluída</span></label>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            Um registry é um <strong>"app store" para images Docker</strong>. Guardas as tuas images lá e depois puxas para qualquer máquina. O mais conhecido é o Docker Hub, mas nós usamos o <strong>GitHub Container Registry (GHCR)</strong>.
</p>
</div>

<div class="subsection" id="docker-deploy-2">
<h3> Comparação de registos</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-deploy-2"><span>Concluída</span></label>

<table>
<thead>
<tr>
<th>Registry</th>
<th>URL</th>
<th>Gratuito?</th>
</tr>
</thead>
<tbody>
<tr><td>Docker Hub</td><td>hub.docker.com</td><td>Sim (um repositório privado)</td></tr>
<tr><td>GitHub GHCR</td><td>ghcr.io</td><td><strong>Sim (ilimitado público)</strong></td></tr>
<tr><td>AWS ECR</td><td>amazonaws.com</td><td>500MB grátis/mês</td></tr>
<tr><td>Google GCR</td><td>gcr.io</td><td>5GB grátis</td></tr>
</tbody>
</table>
</div>

<div class="subsection" id="docker-deploy-3">
<h3> Fluxo de deployment deste exemplo de CI/CD</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-deploy-3"><span>Concluída</span></label>

<div class="architecture-diagram">
<span class="highlight">GitHub</span><span class="highlight">GHCR</span><span class="highlight">VPS</span>
        
 git push       build & push   docker pull      
 main branch       image             docker compose   
     ghcr.io/...       up -d            
    GitHub Actions       (self-hosted     
                    Container Registry    runner)         
</div>
</div>

<div class="subsection" id="docker-deploy-4">
<h3>Comandos de registry</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-deploy-4"><span>Concluída</span></label>

<div class="command-block">
<code>docker login ghcr.io</code>
<span class="comment"># Login ao GHCR (usa token do GitHub)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>docker tag nome-app:latest ghcr.io/UTILIZADOR_GITHUB/nome-app:latest</code>
<span class="comment"># Tag da image para o registry</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>docker push ghcr.io/UTILIZADOR_GITHUB/nome-app:latest</code>
<span class="comment"># Enviar image para o registry</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>docker pull ghcr.io/UTILIZADOR_GITHUB/nome-app:latest</code>
<span class="comment"># Puxar image do registry</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<div class="subsection" id="docker-deploy-5">
<h3> Tagging — Boas práticas</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-deploy-5"><span>Concluída</span></label>

<div class="command-block">
<code>docker tag app:latest ghcr.io/UTILIZADOR_GITHUB/app:latest</code>
<span class="comment"># latest = versão mais recente</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>docker tag app:latest ghcr.io/UTILIZADOR_GITHUB/app:v1.2.3</code>
<span class="comment"># Tag específica = versão fixa (recomendado)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="tip">
<strong>Dica:</strong> Em produção prefere tags imutáveis (<code>git sha</code> ou <code>v1.2.3</code>). O <code>latest</code> é conveniente no laboratório, mas dificulta rollbacks. Neste guia o pipeline publica <code>sha</code> e <code>latest</code>.
</div>
</div>

<div class="subsection" id="docker-deploy-6">
<h3>Resumo do fluxo completo</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-docker-deploy-6"><span>Concluída</span></label>

<div class="quick-ref">
<div class="quick-ref-card">
<h4>1. Desenvolver</h4>
<code>git push  GitHub Actions</code>
</div>
<div class="quick-ref-card">
<h4>2. Construir</h4>
<code>docker build  GHCR</code>
</div>
<div class="quick-ref-card">
<h4>3. Publicar</h4>
<code>self-hosted runner  docker compose up</code>
</div>
<div class="quick-ref-card">
<h4>4. Verificar</h4>
<code>curl -I https://app.dominio.com</code>
</div>
</div>
</div>
</div>
</div>

<!-- ============================================ -->
<!-- SECÇÃO 1: LINUX FUNDAMENTOS -->
<!-- ============================================ -->


<div class="section collapsed" id="postgresql-fundamentos">
<div class="section-header">
<h2> 3. PostgreSQL</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
                    
<!-- Aula 2.1 -->
<div class="subsection" id="pg-2-1">
<h3>3.1 O que é um BD Relacional?</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-pg-2-1"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Compreender o conceito de bases de dados relacionais, tabelas e SQL.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            Uma <strong>base de dados relacional</strong> é como uma <strong>folha de cálculo</strong> organizada em múltiplas tabelas que se podem relacionar entre si. O PostgreSQL é uma das BD mais usadas no mundo — é gratuito, potente e fiável.
</p>

<div class="quick-ref">
<div class="quick-ref-card">
<h4> Tabelas</h4>
<p style="color: var(--text-secondary);">Organizam dados em linhas (registos) e colunas (campos). Ex.: tabela <code>users</code> com as colunas <code>id</code>, <code>name</code> e <code>email</code>.</p>
</div>
<div class="quick-ref-card">
<h4> Relações</h4>
<p style="color: var(--text-secondary);">As tabelas podem estar ligadas. Ex.: a tabela <code>orders</code> referencia a tabela <code>users</code> através de uma chave estrangeira.</p>
</div>
<div class="quick-ref-card">
<h4> SQL</h4>
<p style="color: var(--text-secondary);">Linguagem para falar com a BD. CREATE, INSERT, SELECT, UPDATE, DELETE.</p>
</div>
</div>
</div>

<!-- Aula 2.2 -->
<div class="subsection" id="pg-2-2">
<h3>3.2 Configuração com Docker</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-pg-2-2"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Instalar e configurar PostgreSQL usando Docker.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            Usar Docker para bases de dados é uma boa opção em laboratório e em single-node: isolamento, portabilidade, backups simples e menos poluição do sistema operativo. Em produção de longa duração, muitas equipas preferem uma base gerida (RDS, Cloud SQL, etc.).
</p>

<div class="file-content">
<div class="file-content-header">
<span class="file-name">docker-compose.yml (PostgreSQL)</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0"><span class="yaml-key">services</span>:
  <span class="yaml-key">postgres</span>:
    <span class="yaml-key">image</span>: <span class="yaml-str">postgres:16-alpine</span>
    <span class="yaml-key">container_name</span>: <span class="yaml-str">postgres</span>
    <span class="yaml-key">restart</span>: <span class="yaml-str">unless-stopped</span>
    <span class="yaml-key">environment</span>:
      <span class="yaml-key">POSTGRES_DB</span>: <span class="yaml-str">exemplo1</span>
      <span class="yaml-key">POSTGRES_USER</span>: <span class="yaml-str">exemplo1</span>
      <span class="yaml-key">POSTGRES_PASSWORD</span>: <span class="yaml-str">SUBSTITUIR_POR_PALAVRA_PASSE_FORTE</span>
    <span class="yaml-key">volumes</span>:
      - <span class="yaml-str">./data:/var/lib/postgresql/data</span>
    <span class="yaml-key">ports</span>:
      - <span class="yaml-str">"127.0.0.1:5432:5432"</span> <span class="comment"># Só local</span>
    <span class="yaml-key">networks</span>:
      - <span class="yaml-str">data</span>

<span class="yaml-key">networks</span>:
  <span class="yaml-key">data</span>:
    <span class="yaml-key">external</span>: <span class="yaml-num">true</span></pre>
</div>

<div class="command-block">
<code>docker compose up -d</code>
<span class="comment"># Arrancar PostgreSQL</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>docker exec -it postgres psql -U exemplo1</code>
<span class="comment"># Entrar na BD via psql</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="warning">
<strong>Nota:</strong> O PostgreSQL só está acessível localmente (<code>127.0.0.1</code>). Para aceder de fora, usa SSH tunnel.
</div>
</div>

<!-- Aula 2.3 -->
<div class="subsection" id="pg-2-3">
<h3>3.3 SQL Básico (CRUD)</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-pg-2-3"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Criar tabelas, inserir dados, consultar, atualizar e remover.
</div>

<h4>CREATE — Criar Tabela</h4>
<div class="command-block">
<code>CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);</code>
<span class="comment"># Cria a tabela users com quatro colunas</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<h4>INSERT — Inserir Dados</h4>
<div class="command-block">
<code>INSERT INTO users (name, email) VALUES
  ('Utilizador Exemplo 1', 'utilizador1@exemplo1.com'),
  ('Utilizador Exemplo 2', 'utilizador2@exemplo1.com');</code>
<span class="comment"># Insere dois utilizadores</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<h4>SELECT — Consultar</h4>
<div class="command-block">
<code>SELECT * FROM users;</code>
<span class="comment"># Todos os utilizadores</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>SELECT name FROM users WHERE id = 1;</code>
<span class="comment"># Utilizador com o ID 1</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<h4>UPDATE — Atualizar</h4>
<div class="command-block">
<code>UPDATE users SET name = 'Utilizador Exemplo Atualizado' WHERE id = 1;</code>
<span class="comment"># Altera o nome do utilizador 1</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<h4>DELETE — Remover</h4>
<div class="command-block">
<code>DELETE FROM users WHERE id = 2;</code>
<span class="comment"># Remove o utilizador 2</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="exercise">
<strong>Exercício:</strong> Entra na BD com <code>docker exec -it postgres psql -U exemplo1</code> e cria uma tabela "produtos" com colunas id, nome, preco. Insere 3 produtos e consulta-os.
</div>
</div>

<!-- Aula 2.4 -->
<div class="subsection" id="pg-2-4">
<h3>3.4 Tabelas e relações</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-pg-2-4"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> compreender chaves primárias, chaves estrangeiras e JOINs básicos.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            A magia das BD relacionais está nas <strong>ligações entre tabelas</strong>.
</p>

<div class="command-block">
<code>CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  product VARCHAR(100),
  amount DECIMAL(10,2)
);</code>
<span class="comment"># Tabela orders com uma chave estrangeira para users</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<h4>JOIN — Juntar Tabelas</h4>
<div class="command-block">
<code>SELECT users.name, orders.product
FROM users
JOIN orders ON users.id = orders.user_id;</code>
<span class="comment"># Mostra o nome do utilizador e o produto que comprou</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="tip">
<strong>Tipos de JOIN:</strong><br>
                            • <code>JOIN</code> (INNER) — só registos que existem em ambas as tabelas<br>
                            • <code>LEFT JOIN</code> — todos da esquerda, mesmo sem correspondência<br>
                            • <code>RIGHT JOIN</code> — todos da direita, mesmo sem correspondência
</div>
</div>

<!-- Aula 2.5 -->
<div class="subsection" id="pg-2-5">
<h3>3.5 Backup e restauro</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-pg-2-5"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Fazer backups e restaurar bases de dados.
</div>

<div class="command-block">
<code>docker exec postgres pg_dump -U exemplo1 -Fc exemplo1 > /tmp/backup.dump</code>
<span class="comment"># Backup da BD (formato custom)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>docker exec -i postgres pg_restore -U exemplo1 -d exemplo1 &lt; /tmp/backup.dump</code>
<span class="comment"># Restaurar backup</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="tip">
<strong>Formatos:</strong><br>
                            • <code>-Fc</code> (custom) — comprimido, restaura com pg_restore<br>
                            • <code>-Fp</code> (plain) — SQL puro, lê com qualquer cliente<br>
                            • <code>-Ft</code> (tar) — formato tar
</div>

<div class="exercise">
<strong>Exercício:</strong> Faz um backup da BD, cria uma BD nova diferente, e restaura o backup nessa BD nova. Verifica se os dados estão lá.
</div>
</div>

<!-- Aula 2.6 -->
<div class="subsection" id="pg-2-6">
<h3>3.6 Backups automatizados</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-pg-2-6"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Criar scripts de backup automatizados com cron.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            Em produção, precisas de backups automáticos. O <strong>cron</strong> executa comandos em horários definidos.
</p>

<div class="file-content">
<div class="file-content-header">
<span class="file-name">backup.sh (exemplo do VPS)</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0"><span class="bash-keyword">#!/bin/bash</span>
<span class="bash-keyword">DATE</span>=<span class="bash-str">$(date +%Y%m%d_%H%M%S)</span>
<span class="bash-keyword">BACKUP_DIR</span>=<span class="bash-str">/srv/db/backups</span>

<span class="bash-comment"># Criar backup</span>
docker exec postgres pg_dump -U exemplo1 -Fc exemplo1 > <span class="bash-str">$BACKUP_DIR/exemplo1_$DATE.dump</span>

<span class="bash-comment"># DESTRUTIVO: eliminar backups locais com mais de 14 dias</span>
find <span class="bash-str">$BACKUP_DIR</span> -name "*.dump" -mtime +14 -delete</pre>
</div>

<div class="warning"><strong>Política de retenção:</strong> testa primeiro o comando <code>find</code> sem <code>-delete</code> e mantém uma cópia fora do VPS. Um backup no mesmo servidor não protege contra a perda desse servidor.</div>

<h4>Cron Job</h4>
<div class="command-block">
<code>0 2 * * * /srv/db/scripts/backup.sh >> /var/log/pg-backup.log 2>&1</code>
<span class="comment"># Todos os dias às 02:00</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="tip">
<strong>Formato cron:</strong> <code>minuto hora dia_mes mes dia_semana comando</code><br>
<code>0 2 * * *</code> = todos os dias às 02:00<br>
<code>*/30 * * * *</code> = a cada 30 minutos<br>
<code>0 0 * * 0</code> = todos os domingos à meia-noite
</div>
</div>
</div>
</div>

<!-- ============================================ -->
<!-- SECÇÃO 3: CI/CD & DEPLOY -->
<!-- ============================================ -->


<div class="section collapsed" id="cicd-fundamentos">
<div class="section-header">
<h2> 4. CI/CD e deployment</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
                    
<!-- Aula 3.1 -->
<div class="subsection" id="cicd-3-1">
<h3>4.1 O que é CI/CD?</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-cicd-3-1"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Compreender os conceitos de Continuous Integration e Continuous Deployment.
</div>

<div class="quick-ref">
<div class="quick-ref-card">
<h4> CI (Integration)</h4>
<p style="color: var(--text-secondary);">Quando fazes <code>git push</code>, o código é automaticamente verificado e compilado. Os erros são detetados mais cedo.</p>
</div>
<div class="quick-ref-card">
<h4> CD (deployment)</h4>
<p style="color: var(--text-secondary);">Se o código estiver OK, é automaticamente enviado para produção. Zero intervenção manual.</p>
</div>
</div>

<div class="architecture-diagram">
<span class="highlight">Pessoa que desenvolve</span> <span class="network">git push</span> <span class="highlight">GitHub</span><span class="highlight">GitHub Actions</span><span class="container">GHCR</span><span class="container">VPS</span>
                                                                            
     Escreve código              Detecta     Build       Armazena    Deploy
                                   push           & Push         imagem         automático</div>
</div>

<!-- Aula 3.2 -->
<div class="subsection" id="cicd-3-2">
<h3>4.2 Fundamentos de GitHub Actions</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-cicd-3-2"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Criar workflows de CI/CD com GitHub Actions.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            GitHub Actions é o sistema de CI/CD do GitHub. Funciona com <strong>ficheiros YAML</strong> na pasta <code>.github/workflows/</code>.
</p>

<div class="file-content">
<div class="file-content-header">
<span class="file-name">.github/workflows/build.yml</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0"><span class="yaml-key">name</span>: <span class="yaml-str">Build e deployment</span>

<span class="yaml-key">on</span>:
  <span class="yaml-key">push</span>:
    <span class="yaml-key">branches</span>: [<span class="yaml-str">main</span>]

<span class="yaml-key">jobs</span>:
  <span class="yaml-key">quality</span>:
    <span class="yaml-key">runs-on</span>: <span class="yaml-str">ubuntu-latest</span>
    <span class="yaml-key">steps</span>:
      - <span class="yaml-key">uses</span>: <span class="yaml-str">actions/checkout@v4</span>
      - <span class="yaml-key">uses</span>: <span class="yaml-str">actions/setup-node@v4</span>
        <span class="yaml-key">with</span>:
          <span class="yaml-key">node-version</span>: <span class="yaml-str">"24"</span>
          <span class="yaml-key">cache</span>: <span class="yaml-str">npm</span>
      - <span class="yaml-key">run</span>: <span class="yaml-str">npm ci</span>
      - <span class="yaml-key">run</span>: <span class="yaml-str">npm run lint</span>
      - <span class="yaml-key">run</span>: <span class="yaml-str">npm run build</span>

  <span class="yaml-key">build</span>:
    <span class="yaml-key">needs</span>: <span class="yaml-str">quality</span>
    <span class="yaml-key">runs-on</span>: <span class="yaml-str">ubuntu-latest</span>
    <span class="yaml-key">permissions</span>:
      <span class="yaml-key">contents</span>: <span class="yaml-str">read</span>
      <span class="yaml-key">packages</span>: <span class="yaml-str">write</span>
    <span class="yaml-key">steps</span>:
      - <span class="yaml-key">uses</span>: <span class="yaml-str">actions/checkout@v4</span>
      - <span class="yaml-key">uses</span>: <span class="yaml-str">docker/setup-buildx-action@v3</span>
      - <span class="yaml-key">uses</span>: <span class="yaml-str">docker/login-action@v3</span>
        <span class="yaml-key">with</span>:
          <span class="yaml-key">registry</span>: <span class="yaml-str">ghcr.io</span>
          <span class="yaml-key">username</span>: <span class="yaml-str">\${{ github.actor }}</span>
          <span class="yaml-key">password</span>: <span class="yaml-str">\${{ secrets.GITHUB_TOKEN }}</span>
      - <span class="yaml-key">uses</span>: <span class="yaml-str">docker/build-push-action@v6</span>
        <span class="yaml-key">with</span>:
          <span class="yaml-key">context</span>: <span class="yaml-str">.</span>
          <span class="yaml-key">push</span>: <span class="yaml-num">true</span>
          <span class="yaml-key">tags</span>: |
            <span class="yaml-str">ghcr.io/\${{ github.repository }}:\${{ github.sha }}</span>
            <span class="yaml-str">ghcr.io/\${{ github.repository }}:latest</span>

  <span class="yaml-key">deploy</span>:
    <span class="yaml-key">needs</span>: <span class="yaml-str">build</span>
    <span class="yaml-key">runs-on</span>: <span class="yaml-str">self-hosted</span>
    <span class="yaml-key">permissions</span>:
      <span class="yaml-key">contents</span>: <span class="yaml-str">read</span>
      <span class="yaml-key">packages</span>: <span class="yaml-str">read</span>
    <span class="yaml-key">steps</span>:
      - <span class="yaml-key">uses</span>: <span class="yaml-str">docker/login-action@v3</span>
        <span class="yaml-key">with</span>:
          <span class="yaml-key">registry</span>: <span class="yaml-str">ghcr.io</span>
          <span class="yaml-key">username</span>: <span class="yaml-str">\${{ github.actor }}</span>
          <span class="yaml-key">password</span>: <span class="yaml-str">\${{ secrets.GITHUB_TOKEN }}</span>
      - <span class="yaml-key">name</span>: <span class="yaml-str">Atualizar o serviço</span>
        <span class="yaml-key">env</span>:
          <span class="yaml-key">TAG</span>: <span class="yaml-str">\${{ github.sha }}</span>
        <span class="yaml-key">run</span>: |
          cd /srv/apps/nome-app
          docker compose pull
          docker compose up -d --remove-orphans
          docker compose ps</pre>
</div>

<div class="warning">
<strong>Opção pedagógica:</strong> um runner self-hosted no mesmo VPS simplifica o laboratório, mas executa código com acesso ao servidor. Usa-o apenas em repositórios e workflows de confiança, limita os triggers e considera um runner isolado ou deployment por SSH/OIDC para sistemas reais.
</div>

<h4>Conceitos-chave</h4>
<table>
<thead>
<tr>
<th>Conceito</th>
<th>O que é</th>
</tr>
</thead>
<tbody>
<tr><td><code>on: push</code></td><td>Trigger: executa quando fazes push</td></tr>
<tr><td><code>jobs:</code></td><td>Conjunto de passos que correm em paralelo</td></tr>
<tr><td><code>steps:</code></td><td>Passos individuais (um de cada vez)</td></tr>
<tr><td><code>uses:</code></td><td>Usa uma action da marketplace</td></tr>
<tr><td><code>run:</code></td><td>Executa um comando bash</td></tr>
<tr><td><code>secrets:</code></td><td>Valores sensíveis (não no código)</td></tr>
</tbody>
</table>
</div>

<!-- Aula 3.3 -->
<div class="subsection" id="cicd-3-3">
<h3>4.3 Runners self-hosted</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-cicd-3-3"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Configurar e gerir runners GitHub Actions no próprio VPS.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            Um <strong>runner self-hosted</strong> é um programa que corre no teu VPS e executa tarefas do GitHub Actions. Neste laboratório, permite fazer o deployment sem abrir uma ligação SSH separada.
</p>

<div class="command-block">
<code>install -d -o runner -g runner /home/runner/NOME_RUNNER</code>
<span class="comment"># Criar o diretório com o proprietário correto</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="tip"><strong>Usa as instruções atuais:</strong> abre GitHub → Settings → Actions → Runners → New self-hosted runner, seleciona Linux e a arquitetura do VPS, e executa como <code>runner</code> os comandos de transferência apresentados. A versão e o token mudam; não os fixes num tutorial.</div>
<div class="command-block">
<code>cd /home/runner/NOME_RUNNER && sudo -u runner ./config.sh --url https://github.com/UTILIZADOR_GITHUB/REPOSITORIO --token TOKEN</code>
<span class="comment"># Configurar (token obtido no GitHub)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>cd /home/runner/NOME_RUNNER && sudo ./svc.sh install runner && sudo ./svc.sh start</code>
<span class="comment"># Instalar e iniciar como serviço</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="tip">
<strong>Âmbito do runner:</strong> este exemplo regista o runner num repositório. Um runner de organização pode servir vários repositórios autorizados; um runner executa normalmente uma tarefa de cada vez. Em Linux, pode ser instalado como serviço systemd.
</div>
</div>

<!-- Aula 3.4 -->
<div class="subsection" id="cicd-3-4">
<h3>4.4 Segredos e ambiente</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-cicd-3-4"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Gerir segredos e variáveis de ambiente de forma segura.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
<strong>NUNCA</strong> coloques palavras-passe ou chaves no código-fonte. Usa <strong>GitHub Secrets</strong> para CI/CD e <strong>ficheiros .env</strong> para Docker.
</p>

<h4>Onde guardar segredos</h4>
<table>
<thead>
<tr>
<th>Contexto</th>
<th>Onde</th>
<th>Exemplo</th>
</tr>
</thead>
<tbody>
<tr><td>GitHub Actions</td><td>GitHub Secrets</td><td><code>\${{ secrets.RESEND_API_KEY }}</code></td></tr>
<tr><td>Docker Compose</td><td>Ficheiro .env</td><td><code>POSTGRES_PASSWORD=xxx</code></td></tr>
<tr><td>Aplicação</td><td>Variáveis de ambiente</td><td><code>export API_KEY=xxx</code></td></tr>
</tbody>
</table>

<div class="warning">
<strong>Regra de ouro:</strong> Nunca subas <code>.env</code> ao Git. Usa <code>.gitignore</code> para o ignorar.
</div>
</div>

<!-- Aula 3.5 -->
<div class="subsection" id="cicd-3-5">
<h3>4.5 Pipeline de deployment</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-cicd-3-5"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Compreender o fluxo completo de deploy e como fazer rollback.
</div>

<div class="architecture-diagram">
                
 <span class="highlight">git push</span><span class="highlight">build</span><span class="highlight">push</span><span class="highlight">pull</span><span class="highlight">up -d</span>
               (Docker)      (GHCR)        (VPS)         (VPS)    
</div>

<h4>Reversão manual (se necessário)</h4>
<div class="command-block">
<code>cd /srv/apps/nome-app<br>
TAG=TAG_ANTERIOR docker compose pull<br>
TAG=TAG_ANTERIOR docker compose up -d<br>
docker compose ps</code>
<span class="comment"># TAG_ANTERIOR = git sha no GHCR. Compose: image: ...:\${TAG:-latest}</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="warning">
<strong>Reversão não é recuperação de dados:</strong> trocar a imagem não reverte migrações da base de dados. Usa tags imutáveis, backups testados e um plano compatível para as migrações.
</div>

<div class="exercise">
<strong>Exercício:</strong> Cria um repositório GitHub novo, adiciona um Dockerfile simples, configura um self-hosted runner no VPS, e faz push para ver o deploy automático a funcionar.
</div>
</div>
</div>
</div>

<!-- ============================================ -->
<!-- SECÇÃO 4: SEGURANÇA -->
<!-- ============================================ -->


<div class="section collapsed" id="deploy-strategies">
<div class="section-header">
<h2> 5. Estratégias de deployment</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
                    
<!-- Aula 7.1 -->
<div class="subsection" id="ds-7-1">
<h3>5.1 Tipos de deployment</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-ds-7-1"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Conhecer as estratégias de deploy e quando usar cada uma.
</div>

<table>
<thead>
<tr>
<th>Estratégia</th>
<th>Como Funciona</th>
<th>Quando Usar</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Rolling Update</strong></td>
<td>Substitui instâncias uma a uma</td>
<td>Orquestradores como Kubernetes ou plataformas com várias réplicas</td>
</tr>
<tr>
<td><strong>Recriação do serviço</strong></td>
<td>Substitui o contentor do serviço</td>
<td>Comportamento habitual do Docker Compose num único VPS; pode existir uma breve interrupção</td>
</tr>
<tr>
<td><strong>Blue-Green</strong></td>
<td>Dois ambientes idênticos; alterna entre eles</td>
<td>Quando precisas de rollback instantâneo</td>
</tr>
<tr>
<td><strong>Canary</strong></td>
<td>Deployment para uma pequena percentagem de utilizadores; aumenta gradualmente</td>
<td>Aplicações críticas; testes com utilizadores reais</td>
</tr>
</tbody>
</table>

<div class="command-block">
<code># Atualizar um serviço com Docker Compose<br>
docker compose up -d --no-deps --build nome-servico<br>
docker compose ps</code>
<span class="comment"># Recria o contentor do serviço; não é um rolling update nem garante zero downtime</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<!-- Aula 7.2 -->
<div class="subsection" id="ds-7-2">
<h3>5.2 Estratégias de reversão</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-ds-7-2"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Saber como reverter um deploy que correu mal.
</div>

<div class="command-block">
<code># Ver imagens anteriores<br>
docker images | grep nome-app</code>
<span class="comment"># Lista todas as versões da imagem</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code># No docker-compose.yml, parametriza a tag<br>
image: ghcr.io/organizacao/app:\${TAG:-latest}<br><br>
# No terminal, escolhe uma tag imutável anterior<br>
TAG=TAG_ANTERIOR docker compose pull<br>
TAG=TAG_ANTERIOR docker compose up -d</code>
<span class="comment"># Substitui TAG_ANTERIOR por uma tag que exista no registo</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code># Git rollback (se deploy automático)<br>
git revert HEAD<br>
git push origin main</code>
<span class="comment"># Reverte último commit e faz deploy automático</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="exercise">
<strong>Exercício:</strong> Pratica rollback: faz deploy de uma versão "errada" e depois reverte para a anterior.
</div>
</div>

<!-- Aula 7.3 -->
<div class="subsection" id="ds-7-3">
<h3>5.3 Sinalizadores de funcionalidades</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-ds-7-3"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> ativar ou desativar funcionalidades sem efetuar um deployment.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            Feature flags permitem controlar funcionalidades via variáveis de ambiente, sem alterar código:
</p>

<div class="command-block">
<code># No .env da aplicação<br>
FEATURE_NEW_DASHBOARD=true<br>
FEATURE_BETA付款=false</code>
<span class="comment"># Controla features via variáveis de ambiente</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code># Exemplo em código (pseudocódigo)<br>
if (process.env.FEATURE_NEW_DASHBOARD === 'true') {<br>
&nbsp;&nbsp;// Mostrar novo painel<br>
} else {<br>
&nbsp;&nbsp;// Painel anterior<br>
}</code>
<span class="comment"># Verificação no código</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="exercise">
<strong>Exercício:</strong> adiciona uma feature flag à tua aplicação. Testa a ativação e a desativação sem efetuar um deployment.
</div>
</div>

<!-- Aula 7.4 -->
<div class="subsection" id="ds-7-4">
<h3>5.4 Deployment com indisponibilidade reduzida</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-ds-7-4"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Compreender o que é necessário para reduzir ou evitar interrupções durante um deployment.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            Para procurar zero downtime precisas de uma arquitetura que mantenha capacidade saudável enquanto a nova versão entra em serviço:
</p>

<ol style="color: var(--text-secondary); padding-left: 1.5rem; line-height: 2.5;">
<li><strong>Health check</strong> — container deve responder a <code>GET /health</code></li>
<li><strong>Graceful shutdown</strong> — app deve terminar pedidos em curso</li>
<li><strong>Multiple instances</strong> — pelo menos 2 réplicas</li>
</ol>

<div class="command-block">
<code># docker-compose.yml — healthcheck<br>
services:<br>
&nbsp;&nbsp;app:<br>
&nbsp;&nbsp;&nbsp;&nbsp;healthcheck:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;test: ["CMD", "curl", "-f", "http://localhost:3000/health"]<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;interval: 30s<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;timeout: 10s<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;retries: 3</code>
<span class="comment"># Health check no docker-compose</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code># Atualizar e verificar num único VPS<br>
docker compose up -d --no-deps --build --remove-orphans<br>
docker compose ps<br>
curl --fail http://127.0.0.1:3000/health</code>
<span class="comment"># O health check valida o resultado; o Compose pode recriar o contentor e causar uma breve interrupção</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="warning">
<strong>Limite do laboratório:</strong> um único contentor num único VPS não oferece zero downtime garantido. Para manter tráfego durante a atualização, usa pelo menos duas instâncias saudáveis, um balanceador capaz de retirar e adicionar backends e uma estratégia como blue-green ou um orquestrador.
</div>

<div class="exercise">
<strong>Exercício:</strong> Adiciona um endpoint <code>/health</code> à tua app e configura healthcheck no docker-compose.
</div>
</div>
</div>
</div>

<!-- MODULE 8: Monitoring & Observability -->


<div class="section collapsed" id="seguranca-fundamentos">
<div class="section-header">
<h2> 6. Segurança</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
                    
<!-- Aula 4.1 -->
<div class="subsection" id="seg-4-1">
<h3>6.1 Mentalidade de Segurança</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-seg-4-1"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Compreender os princípios básicos de segurança em servidores.
</div>

<div class="quick-ref">
<div class="quick-ref-card">
<h4> Defense in Depth</h4>
<p style="color: var(--text-secondary);">Múltiplas camadas de segurança. Se uma falhar, as outras protegem.</p>
</div>
<div class="quick-ref-card">
<h4> Least Privilege</h4>
<p style="color: var(--text-secondary);">Dar só as permissões necessárias. Se não precisas de root, não uses root.</p>
</div>
<div class="quick-ref-card">
<h4> Assume Breach</h4>
<p style="color: var(--text-secondary);">Assume que alguém pode tentar entrar. Prepara-te para detetar e responder.</p>
</div>
</div>
</div>

<!-- Aula 4.2 -->
<div class="subsection" id="seg-4-2">
<h3>6.2 Firewall UFW</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-seg-4-2"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Configurar firewall para proteger o VPS.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            UFW (Uncomplicated Firewall) é a primeira linha de defesa. Só deixa passar as portas que autorizares.
</p>

<div class="command-block">
<code>ufw status</code>
<span class="comment"># Ver estado atual do firewall</span>
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
<span class="comment"># Ativar a firewall</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="tip">
<strong>Neste VPS de exemplo:</strong> Portas permitidas: 22 (SSH), 80 (HTTP), 443 (HTTPS). Tudo o resto bloqueado.
</div>
<div class="warning">
<strong>Docker e UFW:</strong> portas publicadas por Docker podem contornar o percurso normal das regras do UFW. Evita publicar PostgreSQL ou portas internas no host; expõe apenas o reverse proxy e valida também a firewall do fornecedor ou a cadeia <code>DOCKER-USER</code>.
</div>
</div>

<!-- Aula 4.3 -->
<div class="subsection" id="seg-4-3">
<h3>6.3 Segurança de SSH</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-seg-4-3"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Tornar o acesso SSH mais seguro.
</div>

<h4>Boas práticas SSH</h4>
<ul style="color: var(--text-secondary); padding-left: 1.5rem; line-height: 2;">
<li>Usar <strong>chaves SSH</strong> em vez de palavras-passe</li>
<li>Desativar a autenticação por palavra-passe</li>
<li>Usar utilizador não-root para SSH</li>
<li>Trocar porta 22 (opcional, mas dissuade bots)</li>
</ul>

<div class="command-block">
<code>ssh-keygen -t ed25519 -C "email@exemplo.com"</code>
<span class="comment"># Gerar chave segura (no teu PC)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>ssh-copy-id -i ~/.ssh/id_ed25519.pub utilizador@vps</code>
<span class="comment"># Copiar chave para o VPS</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="warning">
<strong>Antes de desativares a autenticação por palavra-passe:</strong> testa se a chave SSH funciona. Caso contrário, podes ficar sem acesso ao VPS.
</div>
</div>

<!-- Aula 4.4 -->
<div class="subsection" id="seg-4-4">
<h3>6.4 SSL/TLS e Cloudflare</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-seg-4-4"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Compreender SSL/TLS e configurar com Cloudflare.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            SSL/TLS cifra a comunicação entre o navegador e o servidor. O <strong>Cloudflare</strong> gere o certificado apresentado ao navegador para os teus domínios.
</p>

<div class="quick-ref">
<div class="quick-ref-card">
<h4> Certificado de origem</h4>
<p style="color: var(--text-secondary);">Certificado que criamos no Cloudflare e instalamos no VPS. Comunicação VPS  Cloudflare.</p>
</div>
<div class="quick-ref-card">
<h4> Certificado do navegador</h4>
<p style="color: var(--text-secondary);">Certificado gerido pelo Cloudflare para a comunicação entre o navegador e o Cloudflare.</p>
</div>
</div>

<h4>Fluxo SSL</h4>
<div class="architecture-diagram">
<span class="highlight">Navegador</span> <span class="container">HTTPS</span> <span class="highlight">Cloudflare</span> <span class="container">HTTPS</span> <span class="container">Nginx (VPS)</span> <span class="network">HTTP</span> <span class="container">Aplicação</span>
                                                      
         Certificado           Certificado          Origin Cert
         automático            automático           (nós instalamos)</div>
</div>

<!-- Aula 4.5 -->
<div class="subsection" id="seg-4-5">
<h3>6.5 Segurança de contentores e segredos</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-seg-4-5"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> conhecer boas práticas de segurança para contentores Docker.
</div>

<table>
<thead>
<tr>
<th>Regra</th>
<th>Porquê</th>
<th>Como</th>
</tr>
</thead>
<tbody>
<tr><td>Secrets via env vars</td><td>Nunca na imagem Docker</td><td><code>docker run -e PASS=xxx</code></td></tr>
<tr><td>Utilizador sem privilégios root</td><td>Menos permissões = menos risco</td><td><code>USER node</code> no Dockerfile</td></tr>
<tr><td>Read-only filesystem</td><td>Container não altera ficheiros</td><td><code>--read-only</code></td></tr>
<tr><td>Resource limits</td><td>Previne abuso de recursos</td><td><code>mem_limit: 128m</code></td></tr>
<tr><td>Imagens atualizadas</td><td>Corrigir vulnerabilidades</td><td><code>docker pull</code> regularmente</td></tr>
</tbody>
</table>

<div class="exercise">
<strong>Exercício:</strong> no VPS, verifica o estado da firewall com <code>ufw status</code>. Se não estiver ativa, configura as três portas essenciais (22, 80 e 443) e ativa-a.
</div>
</div>
</div>
</div>

<!-- ============================================ -->
<!-- SECÇÃO 5: NGINX & REVERSE PROXY -->
<!-- ============================================ -->


<div class="section collapsed" id="nginx-fundamentos">
<div class="section-header">
<h2> 7. Nginx e reverse proxy</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
                    
<!-- Aula 5.1 -->
<div class="subsection" id="nginx-5-1">
<h3>7.1 O que é um Reverse Proxy?</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-nginx-5-1"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Compreender o conceito de reverse proxy e porquê usar nginx.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            Um <strong>reverse proxy</strong> é um intermediário entre o navegador e as tuas aplicações. Em vez de cada aplicação receber tráfego diretamente, o Nginx recebe-o e reencaminha-o.
</p>

<div class="quick-ref">
<div class="quick-ref-card">
<h4> Distribuição de carga</h4>
<p style="color: var(--text-secondary);">Distribui tráfego por múltiplos servidores (para quando cresceres).</p>
</div>
<div class="quick-ref-card">
<h4> Terminação TLS</h4>
<p style="color: var(--text-secondary);">Nginx gere o SSL, as apps ficam com HTTP interno (mais simples).</p>
</div>
<div class="quick-ref-card">
<h4> Segurança</h4>
<p style="color: var(--text-secondary);">Esconde as apps do exterior. Só o nginx está exposto.</p>
</div>
<div class="quick-ref-card">
<h4> Performance</h4>
<p style="color: var(--text-secondary);">Cache, compressão, buffers — tudo pelo nginx.</p>
</div>
</div>
</div>

<!-- Aula 5.2 -->
<aside class="level-boundary level-practical" id="learning-continuation">
<span class="level-kicker">Percurso essencial concluído</span>
<h3>A partir daqui, a aprendizagem é opcional</h3>
<p>As lições 7.2–7.4 aprofundam a configuração do Nginx. O teu nível de iniciação já pode chegar aos 100% sem as concluir.</p>
</aside>

<div class="subsection level-optional" id="nginx-5-2">
<h3>7.2 Configuração Nginx</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-nginx-5-2"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> compreender a estrutura de configuração do Nginx.
</div>

<div class="file-content">
<div class="file-content-header">
<span class="file-name">exemplo.conf (nginx)</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0"><span class="nginx-comment"># Redirecionar HTTP para HTTPS</span>
<span class="nginx-keyword">server</span> {
<span class="nginx-keyword">listen</span> <span class="nginx-num">80</span>;
<span class="nginx-keyword">server_name</span> <span class="nginx-str">exemplo1.com</span>;
<span class="nginx-keyword">return</span> <span class="nginx-num">301</span> <span class="nginx-str">https://$host$request_uri</span>;
}

<span class="nginx-keyword">server</span> {
<span class="nginx-keyword">listen</span> <span class="nginx-num">443</span> <span class="nginx-str">ssl</span>;
<span class="nginx-keyword">server_name</span> <span class="nginx-str">exemplo1.com</span>;

<span class="nginx-comment"># SSL</span>
<span class="nginx-keyword">ssl_certificate</span> <span class="nginx-str">/etc/cloudflare/exemplo1.com/cert.pem</span>;
<span class="nginx-keyword">ssl_certificate_key</span> <span class="nginx-str">/etc/cloudflare/exemplo1.com/key.pem</span>;
<span class="nginx-keyword">ssl_protocols</span> <span class="nginx-str">TLSv1.2 TLSv1.3</span>;

<span class="nginx-comment"># Proxy para a app</span>
<span class="nginx-keyword">location</span> <span class="nginx-str">/</span> {
<span class="nginx-keyword">proxy_pass</span> <span class="nginx-str">http://exemplo1-web:3000</span>;
<span class="nginx-keyword">proxy_set_header</span> <span class="nginx-str">Host $host</span>;
<span class="nginx-keyword">proxy_set_header</span> <span class="nginx-str">X-Real-IP $remote_addr</span>;
<span class="nginx-keyword">proxy_set_header</span> <span class="nginx-str">X-Forwarded-For $proxy_add_x_forwarded_for</span>;
<span class="nginx-keyword">proxy_set_header</span> <span class="nginx-str">X-Forwarded-Proto $scheme</span>;
    }
}</pre>
</div>

<h4>Blocos Principais</h4>
<table>
<thead>
<tr>
<th>Bloco</th>
<th>O que define</th>
</tr>
</thead>
<tbody>
<tr><td><code>server {}</code></td><td>Virtual host (um por domínio)</td></tr>
<tr><td><code>location /</code></td><td>O que fazer com pedidos neste caminho</td></tr>
<tr><td><code>proxy_pass</code></td><td>Para onde encaminhar o tráfego</td></tr>
<tr><td><code>ssl_certificate</code></td><td>Caminho para o certificado SSL</td></tr>
</tbody>
</table>
</div>

<!-- Aula 5.3 -->
<div class="subsection level-optional" id="nginx-5-3">
<h3>7.3 Server blocks e hosts virtuais</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-nginx-5-3"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Configurar múltiplos domínios no mesmo nginx.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            Um <strong>server block</strong> é como um "departamento" do nginx que trata de um domínio específico. Podes ter 10 domínios no mesmo VPS, cada um com o seu server block.
</p>

<div class="command-block">
<code>ls /srv/proxy/conf.d/</code>
<span class="comment"># Ver ficheiros de configuração</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>docker exec proxy nginx -t</code>
<span class="comment"># Testar configuração do nginx</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>docker compose -f /srv/proxy/docker-compose.yml up -d --force-recreate</code>
<span class="comment"># Reiniciar nginx após alterações</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="exercise">
<strong>Exercício:</strong> Cria uma nova nginx conf para um subdomínio fictício (<code>teste.exemplo1.com</code>) que faça proxy para uma app na porta 8080. Testa com <code>nginx -t</code>.
</div>
</div>

<!-- Aula 5.4 -->
<div class="subsection level-optional" id="nginx-5-4">
<h3>7.4 Terminação TLS</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-nginx-5-4"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Configurar SSL no nginx com Cloudflare Origin Certs.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            O nginx termina a ligação SSL — recebes HTTPS do exterior e envias HTTP para a app interna. Assim as apps não precisam de gerir SSL.
</p>

<div class="file-content">
<div class="file-content-header">
<span class="file-name">Estrutura de certificados</span>
</div>
<pre tabindex="0"><span class="folder">/etc/cloudflare/</span>
├── <span class="folder">exemplo1.com/</span>
│   ├── <span class="file">cert.pem</span><span class="comment">← Origin Certificate (15 anos)</span>
│   └── <span class="file">key.pem</span><span class="comment">← Chave privada</span>
└── <span class="folder">exemplo2.com/</span>
    ├── <span class="file">cert.pem</span>
    └── <span class="file">key.pem</span></pre>
</div>

<div class="warning">
<strong>Permissões:</strong> os certificados TLS devem ter <code>chmod 600</code> — só o proprietário pode ler.
</div>
</div>
</div>
</div>

<!-- ============================================ -->
<!-- SECÇÃO 6: TROUBLESHOOTING -->
<!-- ============================================ -->


<section class="level-boundary level-next" id="learning-next-steps">
<span class="level-kicker">Próximos passos</span>
<h2>Escolhe o tema que te fizer mais falta</h2>
<p>Os módulos 8–12 são um mapa de continuação. Não são requisitos para concluir a iniciação e devem ser aprofundados com a documentação oficial de cada ferramenta.</p>
</section>

<div class="section collapsed level-next-step" id="monitoring-fundamentos">
<div class="section-header">
<h2> 8. Monitorização e observabilidade</h2>
<span class="level-indicator">Próximo passo</span>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
                    
<!-- Aula 8.1 -->
<div class="subsection" id="mon-8-1">
<h3>8.1 O que é Observabilidade</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-mon-8-1"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> compreender os três pilares da observabilidade.
</div>

<table>
<thead>
<tr>
<th>Pilar</th>
<th>O que é</th>
<th>Ferramentas</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Logs</strong></td>
<td>Registos de eventos</td>
<td>Loki, ELK, CloudWatch</td>
</tr>
<tr>
<td><strong>Métricas</strong></td>
<td>Dados numéricos ao longo do tempo</td>
<td>Prometheus, Datadog</td>
</tr>
<tr>
<td><strong>Rastreios</strong></td>
<td>Fluxo de um pedido entre serviços</td>
<td>Jaeger, Zipkin</td>
</tr>
</tbody>
</table>

<div class="exercise">
<strong>Exercício:</strong> identifica onde tens registos, métricas e rastreios no teu projeto atual.
</div>
</div>

<!-- Aula 8.2 -->
<div class="subsection" id="mon-8-2">
<h3>8.2 Prometheus</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-mon-8-2"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Instalar e configurar Prometheus para recolher métricas.
</div>

<div class="command-block">
<code># docker-compose.yml — Prometheus<br>
services:<br>
&nbsp;&nbsp;prometheus:<br>
&nbsp;&nbsp;&nbsp;&nbsp;image: prom/prometheus<br>
&nbsp;&nbsp;&nbsp;&nbsp;ports:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- "9090:9090"<br>
&nbsp;&nbsp;&nbsp;&nbsp;volumes:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ./prometheus.yml:/etc/prometheus/prometheus.yml<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- prometheus_data:/prometheus</code>
<span class="comment"># Prometheus no Docker</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code># prometheus.yml<br>
global:<br>
&nbsp;&nbsp;scrape_interval: 15s<br>
scrape_configs:<br>
&nbsp;&nbsp;- job_name: 'app'<br>
&nbsp;&nbsp;&nbsp;&nbsp;static_configs:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- targets: ['app:3000']</code>
<span class="comment"># Configuração do Prometheus</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<!-- Aula 8.3 -->
<div class="subsection" id="mon-8-3">
<h3>8.3 Grafana</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-mon-8-3"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Criar dashboards visuais para monitorizar a app.
</div>

<div class="command-block">
<code># docker-compose.yml — Grafana<br>
services:<br>
&nbsp;&nbsp;grafana:<br>
&nbsp;&nbsp;&nbsp;&nbsp;image: grafana/grafana<br>
&nbsp;&nbsp;&nbsp;&nbsp;ports:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- "3001:3000"<br>
&nbsp;&nbsp;&nbsp;&nbsp;volumes:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- grafana_data:/var/lib/grafana<br>
&nbsp;&nbsp;&nbsp;&nbsp;environment:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- GF_SECURITY_ADMIN_PASSWORD=admin123</code>
<span class="comment"># Grafana no Docker</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            Passos no Grafana:
</p>
<ol style="color: var(--text-secondary); padding-left: 1.5rem; line-height: 2.5;">
<li>Abrir <code>http://IP:3001</code></li>
<li>Login: admin / admin123</li>
<li>Add Data Source  Prometheus</li>
<li>URL: <code>http://prometheus:9090</code></li>
<li>Importar o dashboard com o ID 315 (monitorização do Docker)</li>
</ol>
</div>

<!-- Aula 8.4 -->
<div class="subsection" id="mon-8-4">
<h3>8.4 Registos centralizados</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-mon-8-4"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Recolher logs de todos os containers num só sítio.
</div>

<div class="command-block">
<code># Loki + Promtail (recole logs)<br>
services:<br>
&nbsp;&nbsp;loki:<br>
&nbsp;&nbsp;&nbsp;&nbsp;image: grafana/loki<br>
&nbsp;&nbsp;&nbsp;&nbsp;ports:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- "3100:3100"<br>
&nbsp;&nbsp;promtail:<br>
&nbsp;&nbsp;&nbsp;&nbsp;image: grafana/promtail<br>
&nbsp;&nbsp;&nbsp;&nbsp;volumes:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- /var/log:/var/log<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- /var/lib/docker/containers:/var/lib/docker/containers</code>
<span class="comment"># Loki + Promtail para logs</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="exercise">
<strong>Exercício:</strong> Adiciona Loki ao teu docker-compose e liga ao Grafana como data source.
</div>
</div>

<!-- Aula 8.5 -->
<div class="subsection" id="mon-8-5">
<h3>8.5 Alertas e notificações</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-mon-8-5"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Configurar alertas quando algo corre mal.
</div>

<div class="command-block">
<code># Exemplo de regra de alerta (alert_rules.yml)<br>
groups:<br>
&nbsp;&nbsp;- name: app_alerts<br>
&nbsp;&nbsp;&nbsp;&nbsp;rules:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- alert: ContainerDown<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;expr: up == 0<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for: 1m<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;labels:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;severity: critical<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;annotations:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;summary: "Container está down!"</code>
<span class="comment"># Regra de alerta para Prometheus</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            Canais de notificação:
</p>
<ul style="color: var(--text-secondary); padding-left: 1.5rem; line-height: 2.5;">
<li><strong>Email</strong> — configura no Grafana Alerting</li>
<li><strong>Slack</strong> — webhook URL no Grafana</li>
<li><strong>Discord</strong> — webhook URL</li>
<li><strong>PagerDuty</strong> — para incidentes críticos</li>
</ul>

<div class="exercise">
<strong>Exercício:</strong> Configura um alerta no Grafana que te envie mensagem quando um container cair.
</div>
</div>
</div>
</div>

<!-- MODULE 9: Infrastructure as Code -->


<div class="section collapsed level-next-step" id="kubernetes-fundamentos">
<div class="section-header">
<h2> 9. Kubernetes</h2>
<span class="level-indicator">Próximo passo</span>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
                    
<!-- Aula 10.1 -->
<div class="subsection" id="k8s-10-1">
<h3>9.1 O que é Kubernetes</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-k8s-10-1"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> compreender os conceitos básicos do Kubernetes.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
<strong>Kubernetes (K8s)</strong> é um orquestrador de contentores que ajuda a gerir muitas instâncias de forma declarativa.
</p>

<table>
<thead>
<tr>
<th>Conceito</th>
<th>O que é</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Cluster</strong></td>
<td>Conjunto de máquinas (nodes)</td>
</tr>
<tr>
<td><strong>Node</strong></td>
<td>Máquina física ou virtual</td>
</tr>
<tr>
<td><strong>Pod</strong></td>
<td>Unidade mínima (um ou mais contentores)</td>
</tr>
<tr>
<td><strong>Deployment</strong></td>
<td>Define como correr pods (réplicas, updates)</td>
</tr>
<tr>
<td><strong>Service</strong></td>
<td>Expose pods à rede</td>
</tr>
<tr>
<td><strong>Namespace</strong></td>
<td>Isolamento lógico dentro do cluster</td>
</tr>
</tbody>
</table>
</div>

<!-- Aula 10.2 -->
<div class="subsection" id="k8s-10-2">
<h3>9.2 Pods e Deployments</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-k8s-10-2"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Criar e gerir pods e deployments no K8s.
</div>

<div class="command-block">
<code># deployment.yml<br>
apiVersion: apps/v1<br>
kind: Deployment<br>
metadata:<br>
&nbsp;&nbsp;name: minha-app<br>
spec:<br>
&nbsp;&nbsp;replicas: 3<br>
&nbsp;&nbsp;selector:<br>
&nbsp;&nbsp;&nbsp;&nbsp;matchLabels:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;app: minha-app<br>
&nbsp;&nbsp;template:<br>
&nbsp;&nbsp;&nbsp;&nbsp;metadata:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;labels:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;app: minha-app<br>
&nbsp;&nbsp;&nbsp;&nbsp;spec:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;containers:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- name: app<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image: nginx:alpine<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ports:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- containerPort: 80</code>
<span class="comment"># Deployment YAML</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code>kubectl apply -f deployment.yml  # Criar<br>
kubectl get pods                # Ver pods<br>
kubectl describe pod nome-pod   # Detalhes<br>
kubectl logs nome-pod           # Logs<br>
kubectl delete -f deployment.yml # DESTRUTIVO: apagar os recursos do ficheiro</code>
<span class="comment"># Comandos básicos kubectl</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="exercise">
<strong>Exercício:</strong> Instala minikube e cria um deployment com 3 réplicas de nginx.
</div>
</div>

<!-- Aula 10.3 -->
<div class="subsection" id="k8s-10-3">
<h3>9.3 Services e Ingress</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-k8s-10-3"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Expor aplicações Kubernetes à rede.
</div>

<table>
<thead>
<tr>
<th>Tipo de Service</th>
<th>Descrição</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>ClusterIP</strong></td>
<td>Apenas acessível dentro do cluster</td>
</tr>
<tr>
<td><strong>NodePort</strong></td>
<td>Expõe numa porta do node</td>
</tr>
<tr>
<td><strong>LoadBalancer</strong></td>
<td>Cria load balancer cloud</td>
</tr>
</tbody>
</table>

<div class="command-block">
<code># service.yml<br>
apiVersion: v1<br>
kind: Service<br>
metadata:<br>
&nbsp;&nbsp;name: minha-app-service<br>
spec:<br>
&nbsp;&nbsp;selector:<br>
&nbsp;&nbsp;&nbsp;&nbsp;app: minha-app<br>
&nbsp;&nbsp;ports:<br>
&nbsp;&nbsp;- port: 80<br>
&nbsp;&nbsp;&nbsp;&nbsp;targetPort: 80<br>
&nbsp;&nbsp;type: LoadBalancer</code>
<span class="comment"># Service para expor a app</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<!-- Aula 10.4 -->
<div class="subsection" id="k8s-10-4">
<h3>9.4 ConfigMaps e Secrets</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-k8s-10-4"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Gerir configuração e dados sensíveis no Kubernetes.
</div>

<div class="command-block">
<code># Criar ConfigMap<br>
kubectl create configmap app-config --from-literal=NODE_ENV=production<br>
<br>
# Criar Secret<br>
kubectl create secret generic app-secret --from-literal=DB_PASS=minha123</code>
<span class="comment"># ConfigMap e Secret</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code># Usar no Deployment<br>
spec:<br>
&nbsp;&nbsp;containers:<br>
&nbsp;&nbsp;- name: app<br>
&nbsp;&nbsp;&nbsp;&nbsp;envFrom:<br>
&nbsp;&nbsp;&nbsp;&nbsp;- configMapRef:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: app-config<br>
&nbsp;&nbsp;&nbsp;&nbsp;- secretRef:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: app-secret</code>
<span class="comment"># Inyectar no container</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<!-- Aula 10.5 -->
<div class="subsection" id="k8s-10-5">
<h3>9.5 Helm Charts</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-k8s-10-5"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Usar Helm como package manager do Kubernetes.
</div>

<div class="command-block">
<code># Instalar Helm<br>
brew install helm  # macOS<br>
# ou<br>
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash</code>
<span class="comment"># Instalação</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code># Instalar chart (ex: nginx)<br>
helm repo add bitnami https://charts.bitnami.com/bitnami<br>
helm install minha-app bitnami/nginx<br>
<br>
# Ver charts instalados<br>
helm list<br>
<br>
# Atualizar<br>
helm upgrade minha-app bitnami/nginx<br>
<br>
# Remover<br>
helm uninstall minha-app</code>
<span class="comment"># Comandos Helm básicos</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="exercise">
<strong>Exercício:</strong> Instala Helm e faz deploy de um chart nginx.
</div>
</div>

<!-- Aula 10.6 -->
<div class="subsection" id="k8s-10-6">
<h3>9.6 Comandos kubectl</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-k8s-10-6"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Dominar os comandos essenciais do kubectl.
</div>

<div class="command-block">
<code># Info do cluster<br>
kubectl cluster-info<br>
kubectl get nodes<br>
kubectl top nodes<br>
<br>
# Gerir recursos<br>
kubectl get all                  # Tudo<br>
kubectl get pods -o wide        # Pods detalhados<br>
kubectl get events              # Eventos recentes<br>
<br>
# Debug<br>
kubectl exec -it nome-pod -- /bin/sh  # Shell no pod<br>
kubectl port-forward svc/nome 8080:80  # Port forward<br>
kubectl logs -f nome-pod --tail=100    # Logs em tempo real</code>
<span class="comment"># Comandos kubectl essenciais</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="exercise">
<strong>Exercício:</strong> Usa kubectl para explorar um cluster. Lista pods, nodes, services e events.
</div>
</div>
</div>
</div>

<!-- MODULE 11: Cloud Platforms -->


<div class="section collapsed level-next-step" id="iac-fundamentos">
<div class="section-header">
<h2> 10. Infraestrutura como código</h2>
<span class="level-indicator">Próximo passo</span>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
                    
<!-- Aula 9.1 -->
<div class="subsection" id="iac-9-1">
<h3>10.1 O que é IaC</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-iac-9-1"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> compreender por que razão se gere infraestrutura como código.
</div>

<table>
<thead>
<tr>
<th>Benefício</th>
<th>Descrição</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Reprodutibilidade</strong></td>
<td>Mesma infra em qualquer ambiente</td>
</tr>
<tr>
<td><strong>Version control</strong></td>
<td>Infraestrutura fica no Git</td>
</tr>
<tr>
<td><strong>Review</strong></td>
<td>Alterações passam por code review</td>
</tr>
<tr>
<td><strong>Automatização</strong></td>
<td>Sem CLI manual, tudo via código</td>
</tr>
</tbody>
</table>

<table>
<thead>
<tr>
<th>Ferramenta</th>
<th>Tipo</th>
<th>Exemplo</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Terraform</strong></td>
<td>Declarativo</td>
<td>AWS, Azure, GCP, Docker</td>
</tr>
<tr>
<td><strong>Ansible</strong></td>
<td>Imperativo</td>
<td>Configurar servidores, instalar pacotes</td>
</tr>
<tr>
<td><strong>Pulumi</strong></td>
<td>Programático</td>
<td>Python/TypeScript para infra</td>
</tr>
</tbody>
</table>
</div>

<!-- Aula 9.2 -->
<div class="subsection" id="iac-9-2">
<h3>10.2 Fundamentos de Terraform</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-iac-9-2"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Criar e gerir infraestrutura básica com Terraform.
</div>

<div class="command-block">
<code># Instalar Terraform<br>
brew install terraform  # macOS<br>
# ou<br>
sudo apt install terraform  # Linux</code>
<span class="comment"># Instalação</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code># main.tf — Exemplo básico<br>
provider "docker" { }<br>
<br>
resource "docker_container" "app" {<br>
&nbsp;&nbsp;name  = "minha-app"<br>
&nbsp;&nbsp;image = "nginx:alpine"<br>
&nbsp;&nbsp;ports {<br>
&nbsp;&nbsp;&nbsp;&nbsp;internal = 80<br>
&nbsp;&nbsp;&nbsp;&nbsp;external = 8080<br>
&nbsp;&nbsp;}<br>
}</code>
<span class="comment"># Ficheiro Terraform para Docker</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code># Comandos Terraform<br>
terraform init    # Inicializar provider<br>
terraform plan    # Ver o que vai alterar<br>
terraform apply   # Aplicar alterações<br>
terraform destroy # DESTRUTIVO: destruir os recursos geridos</code>
<span class="comment"># Ciclo de vida Terraform</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="exercise">
<strong>Exercício:</strong> Instala Terraform e cria um ficheiro que levante um container nginx.
</div>
</div>

<!-- Aula 9.3 -->
<div class="subsection" id="iac-9-3">
<h3>10.3 State Management</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-iac-9-3"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> compreender como o Terraform guarda o estado da infraestrutura.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            O <strong>state</strong> é um ficheiro JSON que guarda o estado atual da infraestrutura. <strong>Nunca</strong> commits este ficheiro no Git!
</p>

<div class="command-block">
<code># .gitignore<br>
terraform.tfstate<br>
terraform.tfstate.backup<br>
.terraform/</code>
<span class="comment"># Nunca committar o state</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code># Remote state (S3 + DynamoDB)<br>
terraform {<br>
&nbsp;&nbsp;backend "s3" {<br>
&nbsp;&nbsp;&nbsp;&nbsp;bucket = "meu-terraform-state"<br>
&nbsp;&nbsp;&nbsp;&nbsp;key    = "state/terraform.tfstate"<br>
&nbsp;&nbsp;&nbsp;&nbsp;region = "eu-west-1"<br>
&nbsp;&nbsp;&nbsp;&nbsp;dynamodb_table = "terraform-locks"<br>
&nbsp;&nbsp;}<br>
}</code>
<span class="comment"># Remote state com locking</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<!-- Aula 9.4 -->
<div class="subsection" id="iac-9-4">
<h3>10.4 Fundamentos de Ansible</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-iac-9-4"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Automatizar configuração de servidores com Ansible.
</div>

<div class="command-block">
<code># Instalar Ansible<br>
pip install ansible  # ou brew install ansible</code>
<span class="comment"># Instalação</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code># playbook.yml<br>
- hosts: servers<br>
&nbsp;&nbsp;become: yes<br>
&nbsp;&nbsp;tasks:<br>
&nbsp;&nbsp;&nbsp;&nbsp;- name: Instalar Docker<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;apt:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: docker.io<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;state: present<br>
&nbsp;&nbsp;&nbsp;&nbsp;- name: Iniciar Docker<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;systemd:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: docker<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;state: started<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled: yes</code>
<span class="comment"># Playbook para instalar Docker</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="command-block">
<code># Executar playbook<br>
ansible-playbook -i inventory.ini playbook.yml</code>
<span class="comment"># Executa em todos os servidores do inventário</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<div class="exercise">
<strong>Exercício:</strong> Cria um playbook que instale Docker num servidor remoto.
</div>
</div>

<!-- Aula 9.5 -->
<div class="subsection" id="iac-9-5">
<h3>10.5 GitOps</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-iac-9-5"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> compreender o fluxo GitOps para deployment contínuo.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
<strong>GitOps:</strong> Git como única fonte de verdade para infraestrutura e aplicações.
</p>

<table>
<thead>
<tr>
<th>Ferramenta</th>
<th>Descrição</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>ArgoCD</strong></td>
<td>GitOps para Kubernetes, sync automático</td>
</tr>
<tr>
<td><strong>Flux</strong></td>
<td>GitOps toolkit, mais lightweight</td>
</tr>
</tbody>
</table>

<div class="exercise">
<strong>Exercício:</strong> Lê sobre ArgoCD e conceptualiza como o aplicarias ao teu projeto.
</div>
</div>
</div>
</div>

<!-- MODULE 10: Kubernetes -->


<div class="section collapsed level-next-step" id="cloud-fundamentos">
<div class="section-header">
<h2> 11. Plataformas cloud</h2>
<span class="level-indicator">Próximo passo</span>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
                    
<!-- Aula 11.1 -->
<div class="subsection" id="cloud-11-1">
<h3>11.1 Visão Geral</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-cloud-11-1"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Conhecer as principais plataformas cloud.
</div>

<table>
<thead>
<tr>
<th>Plataforma</th>
<th>Especialidade</th>
<th>Free Tier</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>AWS</strong></td>
<td>Maior ecossistema, mais serviços</td>
<td>12 meses free tier + always free</td>
</tr>
<tr>
<td><strong>Azure</strong></td>
<td>Integração Microsoft, .NET</td>
<td>170 crédito + always free</td>
</tr>
<tr>
<td><strong>GCP</strong></td>
<td>Kubernetes nativo, data analytics</td>
<td>$300 crédito 90 dias + always free</td>
</tr>
</tbody>
</table>
</div>

<!-- Aula 11.2 -->
<div class="subsection" id="cloud-11-2">
<h3>11.2 Computação</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-cloud-11-2"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> compreender as opções de computação na cloud.
</div>

<table>
<thead>
<tr>
<th>Opção</th>
<th>AWS</th>
<th>Azure</th>
<th>GCP</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>VMs</strong></td>
<td>EC2</td>
<td>Virtual Machines</td>
<td>Compute Engine</td>
</tr>
<tr>
<td><strong>Serverless</strong></td>
<td>Lambda</td>
<td>Functions</td>
<td>Cloud Functions</td>
</tr>
<tr>
<td><strong>Containers</strong></td>
<td>ECS/EKS</td>
<td>AKS</td>
<td>GKE</td>
</tr>
</tbody>
</table>
</div>

<!-- Aula 11.3 -->
<div class="subsection" id="cloud-11-3">
<h3>11.3 Armazenamento</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-cloud-11-3"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Conhecer as opções de armazenamento em cloud.
</div>

<table>
<thead>
<tr>
<th>Tipo</th>
<th>AWS</th>
<th>Azure</th>
<th>GCP</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Object Storage</strong></td>
<td>S3</td>
<td>Blob Storage</td>
<td>Cloud Storage</td>
</tr>
<tr>
<td><strong>Block Storage</strong></td>
<td>EBS</td>
<td>Managed Disks</td>
<td>Persistent Disk</td>
</tr>
<tr>
<td><strong>File Storage</strong></td>
<td>EFS</td>
<td>Azure Files</td>
<td>Filestore</td>
</tr>
</tbody>
</table>

<div class="command-block">
<code># AWS S3 (AWS CLI)<br>
aws s3 ls                          # Listar buckets<br>
aws s3 cp ficheiro.txt s3://bucket/ # Upload<br>
aws s3 sync ./pasta s3://bucket/   # Sync pasta</code>
<span class="comment"># Comandos S3 básicos</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<!-- Aula 11.4 -->
<div class="subsection" id="cloud-11-4">
<h3>11.4 Bases de dados geridas</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-cloud-11-4"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Conhecer as opções de BD managed em cloud.
</div>

<table>
<thead>
<tr>
<th>Tipo</th>
<th>AWS</th>
<th>Azure</th>
<th>GCP</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Relational</strong></td>
<td>RDS</td>
<td>Azure SQL</td>
<td>Cloud SQL</td>
</tr>
<tr>
<td><strong>NoSQL</strong></td>
<td>DynamoDB</td>
<td>CosmosDB</td>
<td>Firestore</td>
</tr>
<tr>
<td><strong>Cache</strong></td>
<td>ElastiCache</td>
<td>Redis Cache</td>
<td>Memorystore</td>
</tr>
</tbody>
</table>

<div class="exercise">
<strong>Exercício:</strong> Cria uma instância RDS free tier e liga a uma aplicação.
</div>
</div>

<!-- Aula 11.5 -->
<div class="subsection" id="cloud-11-5">
<h3>11.5 Redes e CDN</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-cloud-11-5"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> compreender redes e CDN na cloud.
</div>

<table>
<thead>
<tr>
<th>Serviço</th>
<th>AWS</th>
<th>Azure</th>
<th>GCP</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>VPC</strong></td>
<td>VPC</td>
<td>Virtual Network</td>
<td>VPC</td>
</tr>
<tr>
<td><strong>Load Balancer</strong></td>
<td>ALB/NLB</td>
<td>Load Balancer</td>
<td>Cloud LB</td>
</tr>
<tr>
<td><strong>CDN</strong></td>
<td>CloudFront</td>
<td>CDN</td>
<td>Cloud CDN</td>
</tr>
</tbody>
</table>

<div class="exercise">
<strong>Exercício:</strong> Configura uma VPC com subnets pública e privada na AWS.
</div>
</div>
</div>
</div>


<div class="section collapsed level-next-step" id="troubleshooting-fundamentos">
<div class="section-header">
<h2> 12. Resolução de problemas</h2>
<span class="level-indicator">Próximo passo</span>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
                    
<!-- Aula 6.1 -->
<div class="subsection" id="troub-6-1">
<h3>12.1 Mentalidade de Debug</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-troub-6-1"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Aprender a abordar problemas de forma sistemática.
</div>

<p style="color: var(--text-secondary); line-height: 1.8;">
                            Quando algo corre mal, não entres em pânico. Segue este processo:
</p>

<ol style="color: var(--text-secondary); padding-left: 1.5rem; line-height: 2.5;">
<li><strong>Lê o erro</strong> — copia e cola no Google</li>
<li><strong>Verifica logs</strong> — <code>docker logs</code>, <code>journalctl</code></li>
<li><strong>Verifica o óbvio</strong> — o container está a correr? A porta está aberta?</li>
<li><strong>Isola o problema</strong> — é a app? o nginx? a BD? a rede?</li>
<li><strong>Resolve e documenta</strong> — anota a solução para a próxima vez</li>
</ol>
</div>

<!-- Aula 6.2 -->
<div class="subsection" id="troub-6-2">
<h3>12.2 Ler registos</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-troub-6-2"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Saber onde encontrar logs de cada serviço.
</div>

<h4>Docker</h4>
<div class="command-block">
<code>docker logs -f nome-container</code>
<span class="comment"># Logs em tempo real de um container</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>docker logs --tail 100 nome-container</code>
<span class="comment"># Últimas 100 linhas</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<h4>Nginx</h4>
<div class="command-block">
<code>docker exec proxy cat /var/log/nginx/error.log</code>
<span class="comment"># Logs de erro do nginx</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<h4>PostgreSQL</h4>
<div class="command-block">
<code>docker logs postgres --tail 50</code>
<span class="comment"># Últimas 50 linhas do PostgreSQL</span>
<button type="button" class="copy-btn">Copiar</button>
</div>

<h4>Sistema</h4>
<div class="command-block">
<code>journalctl -u docker --since "1 hour ago"</code>
<span class="comment"># Logs do Docker última hora</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>tail -f /var/log/pg-backup.log</code>
<span class="comment"># Logs de backups</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>

<!-- Aula 6.3 -->
<div class="subsection" id="troub-6-3">
<h3>12.3 Problemas comuns e soluções</h3>
                        <label class="lesson-done"><input type="checkbox" id="learn-troub-6-3"><span>Concluída</span></label>

                        
<div class="learning-objective">
<strong>Objetivos:</strong> Conhecer os problemas mais frequentes e como resolver.
</div>

<table>
<thead>
<tr>
<th>Problema</th>
<th>Causa</th>
<th>Solução</th>
</tr>
</thead>
<tbody>
<tr>
<td>Container não arranca</td>
<td>Erro no Dockerfile ou dependências</td>
<td><code>docker logs nome</code> para ver o erro</td>
</tr>
<tr>
<td>Porta já em uso</td>
<td>Outro processo usa a mesma porta</td>
<td><code>lsof -i :80</code> para ver quem usa</td>
</tr>
<tr>
<td>Permissão negada</td>
<td>Utilizador sem permissões</td>
<td><code>chmod</code> ou <code>chown</code></td>
</tr>
<tr>
<td>Ligação BD falha</td>
<td>O PostgreSQL não está em execução ou a palavra-passe está errada</td>
<td><code>docker ps</code> + verificar .env</td>
</tr>
<tr>
<td>SSL error</td>
<td>Certificado expirado ou caminho incorreto</td>
<td>Verificar os caminhos na configuração do Nginx</td>
</tr>
<tr>
<td>502 Bad Gateway</td>
<td>Nginx não consegue ligar à app</td>
<td>Verificar se a app está a correr e na porta certa</td>
</tr>
</tbody>
</table>

<div class="exercise">
<strong>Exercício:</strong> Para um container que não arranca, Usa <code>docker logs</code> para identificar o erro. Pesquisa no Google a solução e aplica-a.
</div>
</div>
</div>
</div>

<!-- MODULE 7: Deployment Strategies -->

<div class="next-steps">
<h3>Próximos passos</h3>
<p style="color: var(--text-secondary); margin-bottom: 1rem;">Concluíste o percurso essencial. Para continuares a aprender:</p>
<ul class="next-steps-list">
<li>
<span class="arrow"></span>
<span>Usa o roadmap no separador <strong>Percurso DevOps</strong> para escolher o próximo tema</span>
</li>
<li>
<span class="arrow"></span>
<span>Configura o teu VPS no separador <strong>Configuração VPS</strong></span>
</li>
<li>
<span class="arrow"></span>
<span>Pratica primeiro num VPS descartável e só depois adapta os passos ao teu ambiente</span>
</li>
<li>
<span class="arrow"></span>
<span>Explora tópicos avançados, como Kubernetes, Terraform e plataformas cloud</span>
</li>
<li>
<span class="arrow"></span>
<span>Cria projetos pessoais para aplicar o que aprendeste</span>
</li>
</ul>
</div>`;
