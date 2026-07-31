// Generated from guia-vps.html by scripts/migrate-source.mjs.
export const setupHtml = `<div class="course-header">
<h2> Configuração inicial do VPS</h2>
<p>Laboratório orientado e sequencial para configurar um VPS descartável. As dez fases fazem parte da configuração e devem ser concluídas pela ordem apresentada.</p>
</div>
<div class="setup-nav">
<a href="#phase-1">1. Acesso</a>
<a href="#phase-2">2. Utilizadores</a>
<a href="#phase-3">3. Segurança</a>
<a href="#phase-4">4. Docker</a>
<a href="#phase-5">5. Redes</a>
<a href="#phase-6">6. Proxy</a>
<a href="#phase-7">7. SSL</a>
<a href="#phase-8">8. PostgreSQL</a>
<a href="#phase-9">9. CI/CD</a>
<a href="#phase-10">10. Deploy</a>
</div>

<div class="warning">
<strong>Placeholders:</strong> substitui <code>IP_DO_VPS</code>, <code>dominio.com</code>, <code>nome-app</code>, <code>UTILIZADOR_GITHUB</code>, <code>REPOSITORIO</code>, <code>TOKEN</code> e <code>PALAVRA_PASSE</code> pelos teus valores. Executa este laboratório num VPS descartável e mantém outra sessão SSH aberta ao alterar a firewall ou o SSH.
</div>

<section class="level-overview" aria-labelledby="setup-levels-title">
<h2 id="setup-levels-title">Sequência da configuração</h2>
<div class="level-grid level-grid-two">
<article class="level-card level-essential">
<span class="level-kicker">Parte 1 · fases 1–7</span>
<h3>Base do servidor</h3>
<p>Acesso, utilizadores, segurança, Docker, redes, proxy Nginx e TLS com Cloudflare.</p>
<button type="button" data-action="navigate-to" data-scope="setup" data-target="phase-1">Começar a configuração</button>
</article>
<article class="level-card level-practical">
<span class="level-kicker">Parte 2 · fases 8–10</span>
<h3>Serviços e deployment</h3>
<p>PostgreSQL, um runner self-hosted e o primeiro deployment. No WebFusionLab, a base de dados continua identificada como uma evolução futura.</p>
<button type="button" data-action="navigate-to" data-scope="setup" data-target="phase-8">Continuar na fase 8</button>
</article>
</div>
</section>

<div class="setup-progress-global">
<span class="progress-label">Progresso da configuração:</span>
<div class="progress-bar">
<div class="progress-fill" id="setupProgressFill" style="width: 0%"></div>
</div>
<span class="progress-percent" id="setupProgressPercent">0%</span>
</div>

<!-- FASE 1: Acesso Inicial -->
<div class="setup-phase" id="phase-1">
<div class="setup-phase-header">
<h3> Fase 1: Acesso Inicial</h3>
<span class="phase-progress"></span>
<span class="toggle-icon"></span>
</div>
<div class="phase-bar"><div class="phase-bar-fill"></div></div>
<div class="phase-content">
<div class="setup-step">
<input type="checkbox" id="s-1-1">
<div class="step-body">
<span class="step-num">1.1</span>
<div class="step-title">Criar um VPS num fornecedor à escolha</div>
<div class="step-desc">Exemplo: Ubuntu LTS recente, acesso root e endereço IP público. Adapta o tamanho à aplicação e ao orçamento.</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-1-2">
<div class="step-body">
<span class="step-num">1.2</span>
<div class="step-title">Ligar ao VPS via SSH (root)</div>
<div class="command-block">
<code>ssh root@IP_DO_VPS</code>
<span class="comment"># Usar a chave SSH ou a palavra-passe fornecida pelo teu fornecedor</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-1-3">
<div class="step-body">
<span class="step-num">1.3</span>
<div class="step-title">Atualizar sistema</div>
<div class="command-block">
<code>apt update && apt upgrade -y</code>
<span class="comment"># Atualiza pacotes</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
</div>
</div>

<!-- FASE 2: Utilizadores -->
<div class="setup-phase" id="phase-2">
<div class="setup-phase-header">
<h3> Fase 2: Utilizadores</h3>
<span class="phase-progress"></span>
<span class="toggle-icon"></span>
</div>
<div class="phase-bar"><div class="phase-bar-fill"></div></div>
<div class="phase-content">
<div class="setup-step">
<input type="checkbox" id="s-2-1">
<div class="step-body">
<span class="step-num">2.1</span>
<div class="step-title">Criar o utilizador de exemplo</div>
<div class="command-block">
<code>adduser utilizador-exemplo</code>
<span class="comment"># Definir uma palavra-passe forte (usada em SSH e sudo)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-2-2">
<div class="step-body">
<span class="step-num">2.2</span>
<div class="step-title">Criar o grupo de deployment e adicionar o utilizador</div>
<div class="command-block">
<code>groupadd --force deploy && usermod -aG deploy,users utilizador-exemplo</code>
<span class="comment"># O grupo docker só existe depois da instalação, na fase 4</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-2-3">
<div class="step-body">
<span class="step-num">2.3</span>
<div class="step-title">Dar privilégios sudo ao utilizador de exemplo</div>
<div class="command-block">
<code>usermod -aG sudo utilizador-exemplo</code>
<span class="comment"># Permite usar sudo</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-2-4">
<div class="step-body">
<span class="step-num">2.4</span>
<div class="step-title">Criar utilizador runner</div>
<div class="command-block">
<code>useradd -m -s /bin/bash runner</code>
<span class="comment"># GitHub Actions runner</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-2-5">
<div class="step-body">
<span class="step-num">2.5</span>
<div class="step-title">Adicionar o runner ao grupo de deployment</div>
<div class="command-block">
<code>usermod -aG deploy runner</code>
<span class="comment"># O acesso ao Docker é configurado apenas na fase 4</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-2-6">
<div class="step-body">
<span class="step-num">2.6</span>
<div class="step-title">Verificar os grupos do utilizador de exemplo</div>
<div class="command-block">
<code>id utilizador-exemplo</code>
<span class="comment"># Deve mostrar: deploy, users e sudo</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
</div>
</div>

<!-- FASE 3: Segurança -->
<div class="setup-phase" id="phase-3">
<div class="setup-phase-header">
<h3> Fase 3: Segurança</h3>
<span class="phase-progress"></span>
<span class="toggle-icon"></span>
</div>
<div class="phase-bar"><div class="phase-bar-fill"></div></div>
<div class="phase-content">
<div class="setup-step">
<input type="checkbox" id="s-3-1">
<div class="step-body">
<span class="step-num">3.1</span>
<div class="step-title">Configurar UFW - permite SSH</div>
<div class="command-block">
<code>ufw allow 22/tcp</code>
<span class="comment"># SSH sempre aberto</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-3-2">
<div class="step-body">
<span class="step-num">3.2</span>
<div class="step-title">Configurar UFW - permite HTTP/HTTPS</div>
<div class="command-block">
<code>ufw allow 80/tcp && ufw allow 443/tcp</code>
<span class="comment"># Tráfego web</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-3-3">
<div class="step-body">
<span class="step-num">3.3</span>
<div class="step-title">Ativar o UFW</div>
<div class="command-block">
<code>ufw enable</code>
<span class="comment"># Confirma com 'y'</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-3-4">
<div class="step-body">
<span class="step-num">3.4</span>
<div class="step-title">Verificar estado UFW</div>
<div class="command-block">
<code>ufw status</code>
<span class="comment"># Deve mostrar 22, 80, 443 ALLOW</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-3-5">
<div class="step-body">
<span class="step-num">3.5</span>
<div class="step-title">Configurar a chave SSH do utilizador de exemplo (no computador local)</div>
<div class="command-block">
<code>ssh-keygen -t ed25519</code>
<span class="comment"># Aceitar os valores predefinidos (Enter em tudo)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>ssh-copy-id utilizador-exemplo@IP_DO_VPS</code>
<span class="comment"># Pede a palavra-passe do utilizador de exemplo uma última vez</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>ssh utilizador-exemplo@IP_DO_VPS</code>
<span class="comment"># Testar — deve entrar sem pedir a palavra-passe</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-3-6">
<div class="step-body">
<span class="step-num">3.6</span>
<div class="step-title">Hardening de SSH — desativar a autenticação por palavra-passe após validar a chave SSH</div>
<div class="step-desc">Mantém outra sessão SSH aberta. Só continua se <code>ssh utilizador-exemplo@IP_DO_VPS</code> entrar com chave e sem palavra-passe.</div>
<div class="command-block">
<code>nano /etc/ssh/sshd_config</code>
<span class="comment"># Garante (ou acrescenta) as linhas abaixo; evita duplicados contraditórios</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="file-content">
<div class="file-content-header">
<span class="file-name">Trecho a confirmar em /etc/ssh/sshd_config</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0">PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin no
PubkeyAuthentication yes</pre>
</div>
<div class="command-block">
<code>sshd -t &amp;&amp; systemctl restart ssh</code>
<span class="comment"># Valida a config e reinicia o SSH (Ubuntu: serviço ssh)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="warning">
<strong>Antes de fechares a sessão atual:</strong> testa noutra janela se ainda consegues entrar com a chave. Se falhar, corrige a config nesta sessão ainda aberta.
</div>
</div>
</div>
</div>
</div>

<!-- FASE 4: Docker -->
<div class="setup-phase" id="phase-4">
<div class="setup-phase-header">
<h3> Fase 4: Docker</h3>
<span class="phase-progress"></span>
<span class="toggle-icon"></span>
</div>
<div class="phase-bar"><div class="phase-bar-fill"></div></div>
<div class="phase-content">
<div class="setup-step">
<input type="checkbox" id="s-4-1">
<div class="step-body">
<span class="step-num">4.1</span>
<div class="step-title">Instalar Docker</div>
<div class="command-block">
<code>curl -fsSL https://get.docker.com -o /tmp/get-docker.sh && sh /tmp/get-docker.sh --dry-run</code>
<span class="comment"># Transfere o script oficial e mostra o que seria executado</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>less /tmp/get-docker.sh</code>
<span class="comment"># Revê o script; prime q para sair</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>sh /tmp/get-docker.sh</code>
<span class="comment"># Instala Docker Engine e o plugin Docker Compose</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="warning"><strong>Contexto:</strong> o script de conveniência é adequado a este laboratório descartável. Num servidor de longa duração, segue a instalação pelo repositório <code>apt</code> documentada pelo Docker para controlares versões e atualizações.</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-4-2">
<div class="step-body">
<span class="step-num">4.2</span>
<div class="step-title">Ativar o Docker no arranque</div>
<div class="command-block">
<code>systemctl enable docker && systemctl start docker</code>
<span class="comment"># Docker inicia automaticamente</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-4-3">
<div class="step-body">
<span class="step-num">4.3</span>
<div class="step-title">Autorizar os utilizadores e verificar o Docker</div>
<div class="command-block">
<code>usermod -aG docker utilizador-exemplo && usermod -aG docker runner</code>
<span class="comment"># Termina a sessão e volta a entrar para aplicar os novos grupos</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="command-block">
<code>docker --version && docker compose version</code>
<span class="comment"># Deve mostrar versões</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="danger">
<strong>Privilégio elevado:</strong> pertencer ao grupo <code>docker</code> permite, na prática, obter acesso equivalente a root. Limita este grupo a contas de confiança e não executes workflows de contribuições não confiáveis num runner com acesso ao Docker.
</div>
<div class="warning">
<strong>Atenção ao Docker e ao UFW:</strong> quando publicas uma porta com Docker, o tráfego pode não seguir as regras normais do UFW. Publica apenas 80/443 no proxy; mantém serviços internos sem <code>ports</code> no Compose e complementa a proteção com a firewall do fornecedor ou regras verificadas na cadeia <code>DOCKER-USER</code>.
</div>
</div>
</div>
</div>
</div>

<!-- FASE 5: Redes Docker -->
<div class="setup-phase" id="phase-5">
<div class="setup-phase-header">
<h3> Fase 5: Redes Docker</h3>
<span class="phase-progress"></span>
<span class="toggle-icon"></span>
</div>
<div class="phase-bar"><div class="phase-bar-fill"></div></div>
<div class="phase-content">
<div class="setup-step">
<input type="checkbox" id="s-5-1">
<div class="step-body">
<span class="step-num">5.1</span>
<div class="step-title">Criar rede edge</div>
<div class="command-block">
<code>docker network create edge</code>
<span class="comment"># Recebe tráfego da internet (nginx)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-5-2">
<div class="step-body">
<span class="step-num">5.2</span>
<div class="step-title">Criar rede apps</div>
<div class="command-block">
<code>docker network create apps</code>
<span class="comment"># Comunicação interna apps  proxy</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-5-3">
<div class="step-body">
<span class="step-num">5.3</span>
<div class="step-title">Criar rede data</div>
<div class="command-block">
<code>docker network create data</code>
<span class="comment"># Isolamento para bases de dados</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-5-4">
<div class="step-body">
<span class="step-num">5.4</span>
<div class="step-title">Verificar redes</div>
<div class="command-block">
<code>docker network ls</code>
<span class="comment"># Deve mostrar edge, apps, data</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
</div>
</div>

<!-- FASE 6: Proxy Nginx -->
<div class="setup-phase" id="phase-6">
<div class="setup-phase-header">
<h3> Fase 6: Proxy Nginx</h3>
<span class="phase-progress"></span>
<span class="toggle-icon"></span>
</div>
<div class="phase-bar"><div class="phase-bar-fill"></div></div>
<div class="phase-content">
<div class="setup-step">
<input type="checkbox" id="s-6-1">
<div class="step-body">
<span class="step-num">6.1</span>
<div class="step-title">Criar diretório do proxy</div>
<div class="command-block">
<code>mkdir -p /srv/proxy/conf.d</code>
<span class="comment"># Estrutura do proxy</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-6-2">
<div class="step-body">
<span class="step-num">6.2</span>
<div class="step-title">Criar docker-compose.yml do proxy</div>
<div class="command-block">
<code>nano /srv/proxy/docker-compose.yml</code>
<span class="comment"># Criar ficheiro e colar o conteúdo abaixo</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="file-content">
<div class="file-content-header">
<span class="file-name">/srv/proxy/docker-compose.yml</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0"><span class="yaml-key">services</span>:
  <span class="yaml-key">nginx</span>:
    <span class="yaml-key">image</span>: <span class="yaml-str">nginx:alpine</span>
    <span class="yaml-key">container_name</span>: <span class="yaml-str">proxy</span>
    <span class="yaml-key">restart</span>: <span class="yaml-str">unless-stopped</span>
    <span class="yaml-key">ports</span>:
      - <span class="yaml-str">"80:80"</span>
    <span class="yaml-key">volumes</span>:
      - <span class="yaml-str">./conf.d:/etc/nginx/conf.d</span>
    <span class="yaml-key">networks</span>:
      - <span class="yaml-str">edge</span>
      - <span class="yaml-str">apps</span>
    <span class="yaml-key">mem_limit</span>: <span class="yaml-num">128m</span>
    <span class="yaml-key">cpus</span>: <span class="yaml-num">0.50</span>

<span class="yaml-key">networks</span>:
  <span class="yaml-key">edge</span>:
    <span class="yaml-key">external</span>: <span class="yaml-num">true</span>
  <span class="yaml-key">apps</span>:
    <span class="yaml-key">external</span>: <span class="yaml-num">true</span></pre>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-6-3">
<div class="step-body">
<span class="step-num">6.3</span>
<div class="step-title">Criar nginx.conf base</div>
<div class="command-block">
<code>nano /srv/proxy/conf.d/default.conf</code>
<span class="comment"># Configuração base do nginx</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="file-content">
<div class="file-content-header">
<span class="file-name">/srv/proxy/conf.d/default.conf</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0"><span class="yaml-key">server</span> {
<span class="yaml-key">listen</span> <span class="yaml-num">80</span>;
<span class="yaml-key">server_name</span> <span class="yaml-str">_</span>;

<span class="yaml-comment"># Bootstrap HTTP: não requer certificados</span>
<span class="yaml-key">location</span> <span class="yaml-str">/</span> {
<span class="yaml-key">default_type</span> <span class="yaml-str">text/plain</span>;
<span class="yaml-key">return</span> <span class="yaml-num">200</span> <span class="yaml-str">"Proxy HTTP pronto. Configura TLS na fase 7.\n"</span>;
    }
}</pre>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-6-4">
<div class="step-body">
<span class="step-num">6.4</span>
<div class="step-title">Iniciar proxy</div>
<div class="command-block">
<code>cd /srv/proxy && docker compose up -d</code>
<span class="comment"># Inicia nginx</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-6-5">
<div class="step-body">
<span class="step-num">6.5</span>
<div class="step-title">Testar proxy</div>
<div class="command-block">
<code>curl -I http://IP_DO_VPS</code>
<span class="comment"># Deve retornar HTTP 200 antes de configurares TLS</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
</div>
</div>

<!-- FASE 7: SSL Cloudflare -->
<div class="setup-phase" id="phase-7">
<div class="setup-phase-header">
<h3> Fase 7: SSL Cloudflare</h3>
<span class="phase-progress"></span>
<span class="toggle-icon"></span>
</div>
<div class="phase-bar"><div class="phase-bar-fill"></div></div>
<div class="phase-content">
<div class="setup-step">
<input type="checkbox" id="s-7-1">
<div class="step-body">
<span class="step-num">7.1</span>
<div class="step-title">Comprar um domínio e adicioná-lo ao Cloudflare</div>
<div class="step-desc">Comprar um domínio num agente de registo e adicioná-lo ao Cloudflare</div>
<div class="tip" style="margin-top: 0.5rem;">
<strong>1. Comprar domínio</strong><br>
                                Escolhe um agente de registo: <strong>Namecheap</strong>, <strong>Porkbun</strong>, <strong>GoDaddy</strong> ou <strong>Cloudflare Registrar</strong> (sem margem adicional).<br>
                                Pesquisa o domínio → verifica a disponibilidade → compra-o (cerca de 10 €/ano para um domínio .com).<br><br>
<strong>2. Criar conta Cloudflare</strong><br>
                                Acede a <code>dash.cloudflare.com</code> → <strong>Sign Up</strong> → introduz o e-mail e a palavra-passe → verifica o e-mail.<br><br>
<strong>3. Adicionar site</strong><br>
                                No dashboard, seleciona <strong>Add Site</strong> → introduz o domínio → <strong>Continue</strong>.<br>
                                Escolhe o plano <strong>Free</strong> → <strong>Continue</strong>.<br>
                                Quando o Cloudflare perguntar se pretendes importar registos DNS, seleciona <strong>Continue</strong> (ignora-os por agora; serão criados posteriormente).
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-7-2">
<div class="step-body">
<span class="step-num">7.2</span>
<div class="step-title">Atualizar os nameservers no agente de registo</div>
<div class="step-desc">Substituir nameservers originais pelos do Cloudflare</div>
<div class="tip" style="margin-top: 0.5rem;">
<strong>1. Copiar nameservers do Cloudflare</strong><br>
                                Após adicionar o site, Cloudflare mostra 2 nameservers, tipo:<br>
<code>exemplo1.ns.cloudflare.com</code><br>
<code>exemplo2.ns.cloudflare.com</code><br>
                                Copiar ambos.<br><br>
<strong>2. Entrar no painel do agente de registo</strong><br>
                                Onde compraste o domínio (Namecheap, Porkbun, GoDaddy, etc.).<br>
                                Encontrar secção <strong>"Nameservers"</strong> ou <strong>"DNS"</strong>.<br><br>
<strong>3. Substituir nameservers</strong><br>
                                Apaga os nameservers originais → cola os dois nameservers do Cloudflare → seleciona <strong>Guardar</strong>.<br><br>
<strong>4. Esperar propagação</strong><br>
                                Pode levar de 5 minutos a 24h (normalmente &lt;1h).<br>
                                Cloudflare verifica automaticamente  mostra <strong>"Active"</strong> no dashboard quando pronto.
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-7-3">
<div class="step-body">
<span class="step-num">7.3</span>
<div class="step-title">Criar um registo DNS (registo A)</div>
<div class="step-desc">Cloudflare → DNS → Adicionar registo → A → @ → IP_DO_VPS. Mantém temporariamente o estado «Apenas DNS» até concluíres o passo 7.9.</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-7-4">
<div class="step-body">
<span class="step-num">7.4</span>
<div class="step-title">Preparar o modo Full (Strict)</div>
<div class="step-desc">Cloudflare → SSL/TLS → Vista geral. Só atives <strong>Full (Strict)</strong> depois de instalares o Origin Certificate e reiniciares o proxy no passo 7.9; ativá-lo antes pode causar um erro 526.</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-7-5">
<div class="step-body">
<span class="step-num">7.5</span>
<div class="step-title">Gerar Origin Certificate</div>
<div class="step-desc">SSL/TLS  Origin Server  Create Certificate  15 anos</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-7-6">
<div class="step-body">
<span class="step-num">7.6</span>
<div class="step-title">Guardar certificados no VPS</div>
<div class="command-block">
<code>mkdir -p /etc/cloudflare/dominio.com && chmod 700 /etc/cloudflare/dominio.com</code>
<span class="comment"># Criar diretório para certificados</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="tip">
<strong>Criar cert.pem e key.pem:</strong><br>
                                1. <code>nano /etc/cloudflare/dominio.com/cert.pem</code>colar conteúdo do certificado  Ctrl+X  Y<br>
                                2. <code>nano /etc/cloudflare/dominio.com/key.pem</code>colar conteúdo da chave  Ctrl+X  Y<br>
<span style="color: var(--text-secondary);">O Cloudflare mostra o certificado e a chave ao criá-los. Copia e cola diretamente.</span>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-7-7">
<div class="step-body">
<span class="step-num">7.7</span>
<div class="step-title">Definir permissões dos certificados</div>
<div class="command-block">
<code>chmod 600 /etc/cloudflare/dominio.com/*.pem</code>
<span class="comment"># Só o proprietário lê e escreve</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-7-8">
<div class="step-body">
<span class="step-num">7.8</span>
<div class="step-title">Ativar HTTPS no Compose e no Nginx</div>
<div class="step-desc">Substitui <code>dominio.com</code> pelo domínio real. No Compose, edita as secções <code>ports</code> e <code>volumes</code> do serviço <code>nginx</code> para ficarem como no excerto.</div>
<div class="file-content">
<div class="file-content-header">
<span class="file-name">acrescentar a /srv/proxy/docker-compose.yml</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0"><span class="yaml-key">services</span>:
  <span class="yaml-key">nginx</span>:
    <span class="yaml-key">ports</span>:
      - <span class="yaml-str">"80:80"</span>
      - <span class="yaml-str">"443:443"</span>
    <span class="yaml-key">volumes</span>:
      - <span class="yaml-str">./conf.d:/etc/nginx/conf.d:ro</span>
      - <span class="yaml-str">/etc/cloudflare/dominio.com:/etc/cloudflare/dominio.com:ro</span></pre>
</div>
<div class="file-content">
<div class="file-content-header">
<span class="file-name">/srv/proxy/conf.d/default.conf</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0"><span class="nginx-keyword">server</span> {
    <span class="nginx-keyword">listen</span> <span class="nginx-num">80</span>;
    <span class="nginx-keyword">server_name</span> <span class="nginx-str">dominio.com</span>;
    <span class="nginx-keyword">return</span> <span class="nginx-num">301</span> <span class="nginx-str">https://$host$request_uri</span>;
}

<span class="nginx-keyword">server</span> {
    <span class="nginx-keyword">listen</span> <span class="nginx-num">443</span> <span class="nginx-str">ssl</span>;
    <span class="nginx-keyword">server_name</span> <span class="nginx-str">dominio.com</span>;
    <span class="nginx-keyword">ssl_certificate</span> <span class="nginx-str">/etc/cloudflare/dominio.com/cert.pem</span>;
    <span class="nginx-keyword">ssl_certificate_key</span> <span class="nginx-str">/etc/cloudflare/dominio.com/key.pem</span>;
    <span class="nginx-keyword">ssl_protocols</span> <span class="nginx-str">TLSv1.2 TLSv1.3</span>;

    <span class="nginx-keyword">location</span> / {
        <span class="nginx-keyword">default_type</span> <span class="nginx-str">text/plain</span>;
        <span class="nginx-keyword">return</span> <span class="nginx-num">200</span> <span class="nginx-str">"TLS pronto. A aplicação é ligada na fase 10.\n"</span>;
    }
}</pre>
</div>
<div class="tip"><strong>Bootstrap seguro:</strong> esta configuração responde sem depender de uma aplicação. O <code>proxy_pass</code> só é acrescentado na fase 10, quando o contentor já existe na rede <code>apps</code>.</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-7-9">
<div class="step-body">
<span class="step-num">7.9</span>
<div class="step-title">Reiniciar proxy com novos volumes</div>
<div class="command-block">
<code>cd /srv/proxy && docker compose config && docker compose run --rm --no-deps nginx nginx -t && docker compose up -d --force-recreate</code>
<span class="comment"># Valida o Compose e o Nginx antes de substituir o proxy em execução</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="step-desc">Depois deste comando, ativa o proxy do registo DNS (nuvem laranja) e seleciona <strong>Full (Strict)</strong> no Cloudflare.</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-7-10">
<div class="step-body">
<span class="step-num">7.10</span>
<div class="step-title">Testar SSL externamente</div>
<div class="command-block">
<code>curl -I https://dominio.com</code>
<span class="comment"># Deve retornar 200 com headers SSL</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
</div>
</div>

<!-- FASE 8: PostgreSQL -->
<div class="setup-phase" id="phase-8">
<div class="setup-phase-header">
<h3> Fase 8: PostgreSQL</h3>
<span class="phase-progress"></span>
<span class="toggle-icon"></span>
</div>
<div class="phase-bar"><div class="phase-bar-fill"></div></div>
<div class="phase-content">
<div class="setup-step">
<input type="checkbox" id="s-8-1">
<div class="step-body">
<span class="step-num">8.1</span>
<div class="step-title">Criar estrutura do PostgreSQL</div>
<div class="command-block">
<code>mkdir -p /srv/db/{data,backups,scripts}</code>
<span class="comment"># Diretórios</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-8-2">
<div class="step-body">
<span class="step-num">8.2</span>
<div class="step-title">Criar .env do PostgreSQL</div>
<div class="command-block">
<code>nano /srv/db/.env</code>
<span class="comment"># Criar ficheiro e colar o conteúdo abaixo</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="file-content">
<div class="file-content-header">
<span class="file-name">/srv/db/.env</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0"><span class="yaml-comment"># PostgreSQL credentials</span>
<span class="bash-keyword">POSTGRES_DB</span>=<span class="bash-str">exemplo1</span>
<span class="bash-keyword">POSTGRES_USER</span>=<span class="bash-str">exemplo1</span>
<span class="bash-keyword">POSTGRES_PASSWORD</span>=<span class="bash-str">SUBSTITUIR_POR_PALAVRA_PASSE_FORTE</span></pre>
</div>
<div class="warning">
<strong>Importante:</strong> substitui <code>SUBSTITUIR_POR_PALAVRA_PASSE_FORTE</code> por uma palavra-passe forte. Esta palavra-passe é usada para estabelecer ligação à base de dados.
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-8-3">
<div class="step-body">
<span class="step-num">8.3</span>
<div class="step-title">Criar docker-compose.yml do PostgreSQL</div>
<div class="command-block">
<code>nano /srv/db/docker-compose.yml</code>
<span class="comment"># Criar ficheiro e colar o conteúdo abaixo</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="file-content">
<div class="file-content-header">
<span class="file-name">/srv/db/docker-compose.yml</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0"><span class="yaml-key">services</span>:
  <span class="yaml-key">postgres</span>:
    <span class="yaml-key">image</span>: <span class="yaml-str">postgres:16-alpine</span>
    <span class="yaml-key">container_name</span>: <span class="yaml-str">postgres</span>
    <span class="yaml-key">restart</span>: <span class="yaml-str">unless-stopped</span>
    <span class="yaml-key">env_file</span>: <span class="yaml-str">./.env</span>
    <span class="yaml-key">ports</span>:
      - <span class="yaml-str">"127.0.0.1:5432:5432"</span> <span class="yaml-comment"># Só local, não exposto à internet</span>
    <span class="yaml-key">volumes</span>:
      - <span class="yaml-str">./data:/var/lib/postgresql/data</span>
      - <span class="yaml-str">./backups:/backups</span>
    <span class="yaml-key">networks</span>:
      - <span class="yaml-str">data</span>
    <span class="yaml-key">mem_limit</span>: <span class="yaml-num">1g</span>
    <span class="yaml-key">cpus</span>: <span class="yaml-num">1.0</span>
    <span class="yaml-key">healthcheck</span>:
      <span class="yaml-key">test</span>: [<span class="yaml-str">"CMD-SHELL"</span>, <span class="yaml-str">"pg_isready -U exemplo1"</span>]
      <span class="yaml-key">interval</span>: <span class="yaml-num">10s</span>
      <span class="yaml-key">timeout</span>: <span class="yaml-num">5s</span>
      <span class="yaml-key">retries</span>: <span class="yaml-num">5</span>

<span class="yaml-key">networks</span>:
  <span class="yaml-key">data</span>:
    <span class="yaml-key">external</span>: <span class="yaml-num">true</span></pre>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-8-4">
<div class="step-body">
<span class="step-num">8.4</span>
<div class="step-title">Iniciar PostgreSQL</div>
<div class="command-block">
<code>cd /srv/db && docker compose up -d</code>
<span class="comment"># Aguardar container healthy</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-8-5">
<div class="step-body">
<span class="step-num">8.5</span>
<div class="step-title">Verificar PostgreSQL</div>
<div class="command-block">
<code>docker exec -i postgres psql -U exemplo1 -c "\\l"</code>
<span class="comment"># Listar bases de dados</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-8-6">
<div class="step-body">
<span class="step-num">8.6</span>
<div class="step-title">Criar script de backup</div>
<div class="command-block">
<code>nano /srv/db/scripts/backup.sh</code>
<span class="comment"># Criar ficheiro e colar o conteúdo abaixo</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="file-content">
<div class="file-content-header">
<span class="file-name">/srv/db/scripts/backup.sh</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0"><span class="bash-comment">#!/bin/bash</span>
<span class="bash-comment"># PostgreSQL backup script</span>
<span class="bash-comment"># Runs daily at 02:00 via cron</span>

<span class="bash-keyword">BACKUP_DIR</span>=<span class="bash-str">"/srv/db/backups"</span>
<span class="bash-keyword">TIMESTAMP</span>=<span class="bash-str">$(date +%Y%m%d_%H%M%S)</span>
<span class="bash-keyword">RETENTION_DAYS</span>=<span class="bash-num">14</span>

<span class="bash-comment"># Create backup directory if needed</span>
<span class="bash-keyword">mkdir</span> -p <span class="bash-str">"$BACKUP_DIR"</span>

<span class="bash-comment"># Cópia de segurança de todas as bases de dados</span>
<span class="bash-keyword">docker</span> exec -t postgres pg_dumpall -U exemplo1 | gzip > <span class="bash-str">"$BACKUP_DIR/all_databases_\${TIMESTAMP}.dump"</span>

<span class="bash-comment"># Remove backups older than retention period</span>
<span class="bash-keyword">find</span> <span class="bash-str">"$BACKUP_DIR"</span> -name <span class="bash-str">"*.dump"</span> -mtime +<span class="bash-num">$RETENTION_DAYS</span> -delete

<span class="bash-keyword">echo</span> <span class="bash-str">"[$(date)] Backup completed: all_databases_\${TIMESTAMP}.dump"</span></pre>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-8-7">
<div class="step-body">
<span class="step-num">8.7</span>
<div class="step-title">Tornar script executável</div>
<div class="command-block">
<code>chmod +x /srv/db/scripts/backup.sh</code>
<span class="comment"># Permissão de execução</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-8-8">
<div class="step-body">
<span class="step-num">8.8</span>
<div class="step-title">Configurar cron para backups</div>
<div class="command-block">
<code>nano /etc/crontab</code>
<span class="comment"># Adicionar a linha abaixo no final do ficheiro</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="file-content">
<div class="file-content-header">
<span class="file-name">Linha a adicionar no /etc/crontab:</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0"><span class="bash-comment"># PostgreSQL daily backup at 02:00</span>
<span class="bash-num">0 2</span> * * * <span class="bash-keyword">root</span> <span class="bash-str">/srv/db/scripts/backup.sh >> /var/log/pg-backup.log 2>&1</span></pre>
</div>
<div class="tip">
<strong>Dica:</strong> Depois de adicionar a linha, guarda o ficheiro (Ctrl+X  Y) e testa com <code>/srv/db/scripts/backup.sh</code>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-8-9">
<div class="step-body">
<span class="step-num">8.9</span>
<div class="step-title">Definir permissões data/</div>
<div class="command-block">
<code>chown -R 10001:0 /srv/db/data && chmod 700 /srv/db/data</code>
<span class="comment"># Permissões PostgreSQL</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-8-10">
<div class="step-body">
<span class="step-num">8.10</span>
<div class="step-title">Testar backup manual</div>
<div class="command-block">
<code>/srv/db/scripts/backup.sh</code>
<span class="comment"># Executar e verificar /srv/db/backups/</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
</div>
</div>

<!-- FASE 9: GitHub Actions -->
<div class="setup-phase" id="phase-9">
<div class="setup-phase-header">
<h3> Fase 9: CI/CD</h3>
<span class="phase-progress"></span>
<span class="toggle-icon"></span>
</div>
<div class="phase-bar"><div class="phase-bar-fill"></div></div>
<div class="phase-content">
<div class="setup-step">
<input type="checkbox" id="s-9-1">
<div class="step-body">
<span class="step-num">9.1</span>
<div class="step-title">Criar diretório do runner</div>
<div class="command-block">
<code>install -d -o runner -g runner /home/runner/nome-runner</code>
<span class="comment"># Cria o diretório com o proprietário correto</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-9-2">
<div class="step-body">
<span class="step-num">9.2</span>
<div class="step-title">Transferir a versão atual do runner</div>
<div class="step-desc">No GitHub: repositório → Settings → Actions → Runners → New self-hosted runner → Linux → escolhe a arquitetura do VPS. Entra no diretório com <code>cd /home/runner/nome-runner</code> e executa, como utilizador <code>runner</code>, os comandos de transferência e extração apresentados pelo GitHub. Não reutilizes um URL de versão copiado deste guia.</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-9-3">
<div class="step-body">
<span class="step-num">9.3</span>
<div class="step-title">Obter token do GitHub</div>
<div class="step-desc">Na mesma página, copia o token de registo temporário. O token expira; gera outro se o comando de configuração já não for aceite.</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-9-4">
<div class="step-body">
<span class="step-num">9.4</span>
<div class="step-title">Configurar runner</div>
<div class="command-block">
<code>cd /home/runner/nome-runner && sudo -u runner ./config.sh --url https://github.com/UTILIZADOR_GITHUB/REPOSITORIO --token TOKEN</code>
<span class="comment"># Usar token do passo anterior</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-9-5">
<div class="step-body">
<span class="step-num">9.5</span>
<div class="step-title">Instalar como serviço</div>
<div class="command-block">
<code>cd /home/runner/nome-runner && sudo ./svc.sh install runner && sudo ./svc.sh start</code>
<span class="comment"># Instala e inicia serviço</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-9-6">
<div class="step-body">
<span class="step-num">9.6</span>
<div class="step-title">Verificar runner</div>
<div class="command-block">
<code>systemctl status actions.runner.*.service</code>
<span class="comment"># Deve mostrar active (running)</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-9-7">
<div class="step-body">
<span class="step-num">9.7</span>
<div class="step-title">Criar GitHub Secrets</div>
<div class="step-desc">No GitHub: repositório → Settings → Secrets → Actions → adicionar todos os valores do <code>.env</code> como secrets</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-9-8">
<div class="step-body">
<span class="step-num">9.8</span>
<div class="step-title">Criar workflow CI/CD</div>
<div class="step-desc">Criar ficheiro <code>.github/workflows/build.yml</code> no repositório GitHub</div>
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
      - <span class="yaml-key">uses</span>: <span class="yaml-str">actions/checkout@v4</span>
      - <span class="yaml-key">uses</span>: <span class="yaml-str">docker/login-action@v3</span>
        <span class="yaml-key">with</span>:
          <span class="yaml-key">registry</span>: <span class="yaml-str">ghcr.io</span>
          <span class="yaml-key">username</span>: <span class="yaml-str">\${{ github.actor }}</span>
          <span class="yaml-key">password</span>: <span class="yaml-str">\${{ secrets.GITHUB_TOKEN }}</span>
      - <span class="yaml-key">name</span>: <span class="yaml-str">Preparar e atualizar o serviço</span>
        <span class="yaml-key">env</span>:
          <span class="yaml-key">TAG</span>: <span class="yaml-str">\${{ github.sha }}</span>
        <span class="yaml-key">run</span>: |
          mkdir -p /srv/apps/nome-app
          cp docker-compose.production.yml /srv/apps/nome-app/docker-compose.yml
          rm -f /srv/apps/nome-app/.env
          echo "NODE_ENV=production" > /srv/apps/nome-app/.env
          echo "PORT=3000" >> /srv/apps/nome-app/.env
          echo "DATABASE_URL=\${{ secrets.DATABASE_URL }}" >> /srv/apps/nome-app/.env
          echo "RESEND_API_KEY=\${{ secrets.RESEND_API_KEY }}" >> /srv/apps/nome-app/.env
          echo "CONTACT_FROM=\${{ secrets.CONTACT_FROM }}" >> /srv/apps/nome-app/.env
          echo "CONTACT_TO=\${{ secrets.CONTACT_TO }}" >> /srv/apps/nome-app/.env
          cd /srv/apps/nome-app
          docker compose pull
          docker compose up -d --remove-orphans
          docker compose ps</pre>
</div>
<div class="warning">
<strong>Substituir:</strong> <code>nome-app</code> pelo nome real da tua aplicação. <code>GITHUB_TOKEN</code> é fornecido automaticamente pelo GitHub Actions.
</div>
<div class="danger">
<strong>Runner self-hosted:</strong> este modelo é útil para o laboratório, mas o runner executa código com acesso ao VPS e, neste exemplo, ao Docker. Usa apenas repositórios de confiança, não o exponhas a pull requests não confiáveis e prefere isolamento ou um mecanismo de deployment dedicado num contexto real.
</div>
</div>
</div>
</div>
</div>

<!-- FASE 10: Deploy Primeira App -->
<div class="setup-phase" id="phase-10">
<div class="setup-phase-header">
<h3> Fase 10: Deployment da aplicação</h3>
<span class="phase-progress"></span>
<span class="toggle-icon"></span>
</div>
<div class="phase-bar"><div class="phase-bar-fill"></div></div>
<div class="phase-content">
<div class="setup-step">
<input type="checkbox" id="s-10-1">
<div class="step-body">
<span class="step-num">10.1</span>
<div class="step-title">Criar estrutura de pastas das apps</div>
<div class="command-block">
<code>mkdir -p /srv/apps/{site-institucional,api-backend,loja-online}</code>
<span class="comment"># Cria a pasta apps e três projetos de exemplo</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="file-content">
<div class="file-content-header">
<span class="file-name">Estrutura esperada em /srv/apps/</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0"><span class="folder">/srv/apps/</span>
├── <span class="folder">site-institucional/</span><span class="comment">← frontend (Next.js, React, etc.)</span>
│   ├── <span class="file">docker-compose.yml</span>
│   └── <span class="file">.env</span>
├── <span class="folder">api-backend/</span><span class="comment">← backend (ASP.NET, Node API, etc.)</span>
│   ├── <span class="file">docker-compose.yml</span>
│   └── <span class="file">.env</span>
└── <span class="folder">loja-online/</span><span class="comment">← projeto futuro</span>
    ├── <span class="file">docker-compose.yml</span>
    └── <span class="file">.env</span></pre>
</div>
<div class="tip">
<strong>Padrão:</strong> Na VPS só se criam as pastas em <code>/srv/apps/</code> — os ficheiros (<code>docker-compose.yml</code> e <code>.env</code>) são criados pelo runner do CI/CD no próximo <code>git push</code>. Para adicionar uma app nova, basta criar a pasta e seguir os passos abaixo.
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-10-2">
<div class="step-body">
<span class="step-num">10.2</span>
<div class="step-title">Criar docker-compose.production.yml no repositório</div>
<div class="command-block">
<code>nano docker-compose.production.yml</code>
<span class="comment"># No teu computador, dentro do repositório da app. O runner copia este ficheiro para a VPS no deploy.</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="file-content">
<div class="file-content-header">
<span class="file-name">docker-compose.production.yml</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0"><span class="yaml-key">services</span>:
  <span class="yaml-key">app</span>:
    <span class="yaml-key">image</span>: <span class="yaml-str">ghcr.io/UTILIZADOR_GITHUB/nome-app:\${TAG:-latest}</span>
    <span class="yaml-key">container_name</span>: <span class="yaml-str">nome-app</span>
    <span class="yaml-key">restart</span>: <span class="yaml-str">unless-stopped</span>
    <span class="yaml-key">env_file</span>: <span class="yaml-str">./.env</span>
    <span class="yaml-key">networks</span>:
      - <span class="yaml-str">apps</span>
      - <span class="yaml-str">data</span> <span class="yaml-comment"># Só precisas se ligar a PostgreSQL</span>

<span class="yaml-key">networks</span>:
  <span class="yaml-key">apps</span>:
    <span class="yaml-key">external</span>: <span class="yaml-num">true</span>
  <span class="yaml-key">data</span>:
    <span class="yaml-key">external</span>: <span class="yaml-num">true</span></pre>
</div>
<div class="tip">
<strong>Nota:</strong> o ficheiro <code>.env</code> da app não se cria à mão — o runner cria-o na VPS a partir dos GitHub Secrets (Fase 9.7). Se não precisares de BD, remove a rede <code>data</code>. A imagem vem do GHCR com <code>TAG</code> (git sha no deploy; default <code>latest</code>). Rollback: <code>TAG=&lt;sha_anterior&gt; docker compose up -d</code>.
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-10-3">
<div class="step-body">
<span class="step-num">10.3</span>
<div class="step-title">Fazer push — o runner cria os ficheiros e inicia a app</div>
<div class="command-block">
<code>git add . && git commit -m "deploy: configuração de produção" && git push</code>
<span class="comment"># O workflow CI/CD corre e o job deploy cria os ficheiros na VPS e inicia o contentor</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="file-content">
<div class="file-content-header">
<span class="file-name">Estrutura criada pelo runner em /srv/apps/nome-app/</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0"><span class="folder">/srv/apps/nome-app/</span>
├── <span class="file">docker-compose.yml</span><span class="comment">← copiado de docker-compose.production.yml</span>
└── <span class="file">.env</span><span class="comment">← criado a partir dos GitHub Secrets</span></pre>
</div>
<div class="tip">
<strong>Verificar:</strong> depois de o workflow terminar, confirma na VPS com <code>docker ps</code> que o contentor <code>nome-app</code> está <code>Up</code> e saudável.
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-10-4">
<div class="step-body">
<span class="step-num">10.4</span>
<div class="step-title">Criar nginx conf da app</div>
<div class="command-block">
<code>nano /srv/proxy/conf.d/nome-app.conf</code>
<span class="comment"># Criar ficheiro e colar o conteúdo abaixo</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
<div class="file-content">
<div class="file-content-header">
<span class="file-name">/srv/proxy/conf.d/nome-app.conf</span>
<button type="button" class="copy-file-btn">Copiar Conteúdo</button>
</div>
<pre tabindex="0"><span class="yaml-key">server</span> {
<span class="yaml-key">listen</span> <span class="yaml-num">80</span>;
<span class="yaml-key">server_name</span> <span class="yaml-str">app.dominio.com</span>;
<span class="yaml-key">return</span> <span class="yaml-num">301</span> <span class="yaml-str">https://$host$request_uri</span>;
}

<span class="yaml-key">server</span> {
<span class="yaml-key">listen</span> <span class="yaml-num">443</span> <span class="yaml-str">ssl</span>;
<span class="yaml-key">server_name</span> <span class="yaml-str">app.dominio.com</span>;

<span class="yaml-comment"># SSL certificates</span>
<span class="yaml-key">ssl_certificate</span> <span class="yaml-str">/etc/cloudflare/dominio.com/cert.pem</span>;
<span class="yaml-key">ssl_certificate_key</span> <span class="yaml-str">/etc/cloudflare/dominio.com/key.pem</span>;
<span class="yaml-key">ssl_protocols</span> <span class="yaml-str">TLSv1.2 TLSv1.3</span>;

<span class="yaml-key">location</span> <span class="yaml-str">/</span> {
<span class="yaml-key">proxy_pass</span> <span class="yaml-str">http://nome-app:3000</span>;
<span class="yaml-key">proxy_set_header</span> <span class="yaml-str">Host $host</span>;
<span class="yaml-key">proxy_set_header</span> <span class="yaml-str">X-Real-IP $remote_addr</span>;
<span class="yaml-key">proxy_set_header</span> <span class="yaml-str">X-Forwarded-For $proxy_add_x_forwarded_for</span>;
<span class="yaml-key">proxy_set_header</span> <span class="yaml-str">X-Forwarded-Proto $scheme</span>;
    }
}</pre>
</div>
<div class="warning">
<strong>Substituir:</strong> substitui <code>app.dominio.com</code> pelo subdomínio real, <code>nome-app</code> pelo nome do contentor, <code>3000</code> pela porta da aplicação e os caminhos dos certificados, caso sejam diferentes.
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-10-5">
<div class="step-body">
<span class="step-num">10.5</span>
<div class="step-title">Recarregar o proxy</div>
<div class="command-block">
<code>cd /srv/proxy && docker exec proxy nginx -t && docker exec proxy nginx -s reload</code>
<span class="comment"># O contentor já existe na rede, por isso o Nginx resolve o upstream sem erro</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
<div class="setup-step">
<input type="checkbox" id="s-10-6">
<div class="step-body">
<span class="step-num">10.6</span>
<div class="step-title">Verificar deploy</div>
<div class="command-block">
<code>docker ps && curl -I https://nome-app.dominio.com</code>
<span class="comment"># Contentores e teste do URL</span>
<button type="button" class="copy-btn">Copiar</button>
</div>
</div>
</div>
</div>
</div>

<div class="setup-reset">
<button type="button" data-action="reset-progress" data-progress-store="setup-vps-progress"> Repor progresso da configuração</button>
</div>

<div class="next-steps">
<h3> Próximos passos</h3>
<p style="color: var(--text-secondary); margin-bottom: 1rem;">Concluíste a configuração do VPS. Para avançares:</p>
<ul class="next-steps-list">
<li>
<span class="arrow"></span>
<span>Consulta a referência completa no separador <strong>Guia VPS</strong></span>
</li>
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
<span>Repete os comandos num VPS descartável antes de os adaptares a outro ambiente</span>
</li>
</ul>
</div>`;
