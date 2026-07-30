// Generated from guia-vps.html by scripts/migrate-source.mjs.
export const devopsHtml = `<div class="course-header">
<h2>Roadmap de DevOps</h2>
<p>Um mapa de competências para te orientares, não uma lista obrigatória nem uma definição universal da função de DevOps.</p>
</div>
<div class="devops-nav">
<a href="#cat-fundamentos">Fundamentos</a>
<a href="#cat-containers">Containers</a>
<a href="#cat-database">Bases de dados</a>
<a href="#cat-cicd">CI/CD</a>
<a href="#cat-deploy">Deploy</a>
<a href="#cat-seguranca">Segurança</a>
<a href="#cat-webserver">Servidor web</a>
<a href="#cat-monitoring">Monitorização</a>
<a href="#cat-orchestration">Orquestração</a>
<a href="#cat-iac">IaC</a>
<a href="#cat-cloud">Cloud</a>
<a href="#cat-advanced">Avançado</a>
</div>

<section class="level-overview" aria-labelledby="roadmap-levels-title">
<h2 id="roadmap-levels-title">Como interpretar este mapa</h2>
<div class="level-grid level-grid-two">
<article class="level-card level-essential">
<span class="level-kicker">Começar aqui</span>
<h3>Base de iniciação</h3>
<p>Linux, containers, bases de dados, CI/CD, deployment, segurança e o conceito de reverse proxy acompanham os módulos 1–7.1.</p>
<button type="button" data-action="switch-guide" data-guide-target="learning">Abrir a aprendizagem</button>
</article>
<article class="level-card level-next">
<span class="level-kicker">Explorar depois</span>
<h3>Especialização progressiva</h3>
<p>Monitorização, Kubernetes, IaC, cloud e tópicos avançados dependem do contexto e não contam para concluir a iniciação.</p>
<button type="button" data-action="navigate-to" data-scope="devops" data-target="cat-monitoring">Ver próximos passos</button>
</article>
</div>
</section>

<div class="section" id="devops">
<div class="section-header">
<h2> Percurso DevOps</h2>
<span class="toggle-icon"></span>
</div>
<div class="section-content">
<p style="color: var(--text-secondary); margin-bottom: 1rem;">Usa esta checklist para orientação pessoal. Os itens assinalados são guardados no navegador, mas o total não determina a conclusão do nível de iniciação.</p>

<div class="progress-global">
<span class="progress-label">Exploração do roadmap:</span>
<div class="progress-bar">
<div class="progress-fill" id="globalProgressFill" style="width: 0%"></div>
</div>
<span class="progress-percent" id="globalProgressPercent">0%</span>
</div>

<!-- Fundamentos -->
<div class="devops-category" data-category="fundamentos" id="cat-fundamentos">
<div class="devops-category-header">
<h4> Fundamentos Linux</h4>
<span class="cat-progress"></span>
</div>
<div class="cat-bar"><div class="cat-bar-fill"></div></div>
<div class="devops-items">
<div class="devops-item">
<input type="checkbox" id="do-f1">
<label for="do-f1">Sistema de ficheiros (ls, cd, pwd, mkdir, cp, mv, rm)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-f2">
<label for="do-f2">Utilizadores e grupos (adduser, usermod, groupadd)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-f3">
<label for="do-f3">Permissões (chmod, chown, chgrp, umask)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-f4">
<label for="do-f4">Processamento de texto (grep, find, cat, tail, head)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-f5">
<label for="do-f5">SSH e autenticação por chave</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-f6">
<label for="do-f6">Fundamentos de rede (ping, curl, dig, ss, netstat)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-f7">
<label for="do-f7">Bash scripting básico</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-f8">
<label for="do-f8">Gestão de processos (ps, kill, top, htop)</label>
</div>
</div>
</div>

<!-- Containers -->
<div class="devops-category" data-category="containers" id="cat-containers">
<div class="devops-category-header">
<h4> Contentores e Docker</h4>
<span class="cat-progress"></span>
</div>
<div class="cat-bar"><div class="cat-bar-fill"></div></div>
<div class="devops-items">
<div class="devops-item">
<input type="checkbox" id="do-c1">
<label for="do-c1">Fundamentos de Docker (run, ps, stop, rm, logs)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-c2">
<label for="do-c2">Imagens Docker e Dockerfile</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-c3">
<label for="do-c3">Docker Compose (serviços, redes e volumes)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-c4">
<label for="do-c4">Redes Docker (bridge, host e personalizadas)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-c5">
<label for="do-c5">Volumes Docker e persistência</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-c6">
<label for="do-c6">GHCR (GitHub Container Registry)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-c7">
<label for="do-c7">Imagem e execução (segredos via ambiente, nunca na imagem)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-c8">
<label for="do-c8">Builds multi-stage</label>
</div>
</div>
</div>

<!-- Database -->
<div class="devops-category" data-category="database" id="cat-database">
<div class="devops-category-header">
<h4> Bases de dados</h4>
<span class="cat-progress"></span>
</div>
<div class="cat-bar"><div class="cat-bar-fill"></div></div>
<div class="devops-items">
<div class="devops-item">
<input type="checkbox" id="do-d1">
<label for="do-d1">PostgreSQL setup (Docker)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-d2">
<label for="do-d2">CRUD operations (INSERT, SELECT, UPDATE, DELETE)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-d3">
<label for="do-d3">Backup e restauro (pg_dump, pg_restore)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-d4">
<label for="do-d4">Várias bases de dados (CREATE DATABASE)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-d5">
<label for="do-d5">Strings de ligação e redes</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-d6">
<label for="do-d6">Backups automatizados (cron e scripts)</label>
</div>
</div>
</div>

<!-- CI/CD -->
<div class="devops-category" data-category="cicd" id="cat-cicd">
<div class="devops-category-header">
<h4> CI/CD e deployment</h4>
<span class="cat-progress"></span>
</div>
<div class="cat-bar"><div class="cat-bar-fill"></div></div>
<div class="devops-items">
<div class="devops-item">
<input type="checkbox" id="do-ci1">
<label for="do-ci1">Fundamentos de GitHub Actions (workflows, jobs e passos)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-ci2">
<label for="do-ci2">Runners self-hosted</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-ci3">
<label for="do-ci3">Gestão de GitHub Secrets e variáveis de ambiente</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-ci4">
<label for="do-ci4">Pipeline de build, push e deployment</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-ci5">
<label for="do-ci5">Automatização de deployment com Docker Compose</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-ci6">
<label for="do-ci6">Estratégias de reversão</label>
</div>
</div>
</div>

<!-- Deployment Strategies -->
<div class="devops-category" data-category="deploy" id="cat-deploy">
<div class="devops-category-header">
<h4> Estratégias de deployment</h4>
<span class="cat-progress"></span>
</div>
<div class="cat-bar"><div class="cat-bar-fill"></div></div>
<div class="devops-items">
<div class="devops-item">
<input type="checkbox" id="do-ds1">
<label for="do-ds1">Deployments progressivos (rolling)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-ds2">
<label for="do-ds2">Deployments blue-green</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-ds3">
<label for="do-ds3">Deployments canary</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-ds4">
<label for="do-ds4">Sinalizadores de funcionalidades</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-ds5">
<label for="do-ds5">Procedimentos de reversão</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-ds6">
<label for="do-ds6">Estratégias para reduzir a indisponibilidade</label>
</div>
</div>
</div>

<!-- Segurança -->
<div class="devops-category" data-category="seguranca" id="cat-seguranca">
<div class="devops-category-header">
<h4> Segurança</h4>
<span class="cat-progress"></span>
</div>
<div class="cat-bar"><div class="cat-bar-fill"></div></div>
<div class="devops-items">
<div class="devops-item">
<input type="checkbox" id="do-s1">
<label for="do-s1">Configuração da firewall UFW</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-s2">
<label for="do-s2">SSL/TLS (certificados de origem do Cloudflare)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-s3">
<label for="do-s3">Gestão de segredos (GitHub Secrets e .env)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-s4">
<label for="do-s4">Túneis SSH</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-s5">
<label for="do-s5">Princípio do menor privilégio</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-s6">
<label for="do-s6">Fundamentos de segurança de contentores</label>
</div>
</div>
</div>

<!-- Web Server -->
<div class="devops-category" data-category="webserver" id="cat-webserver">
<div class="devops-category-header">
<h4> Servidor web e redes</h4>
<span class="cat-progress"></span>
</div>
<div class="cat-bar"><div class="cat-bar-fill"></div></div>
<div class="devops-items">
<div class="devops-item">
<input type="checkbox" id="do-w1">
<label for="do-w1">Nginx reverse proxy</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-w2">
<label for="do-w2">DNS e proxy com Cloudflare</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-w3">
<label for="do-w3">Configuração de domínios e subdomínios</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-w4">
<label for="do-w4">Reverse proxy partilhado (várias aplicações)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-w5">
<label for="do-w5">Hosts virtuais e server blocks</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-w6">
<label for="do-w6">Cabeçalhos HTTP e de segurança</label>
</div>
</div>
</div>

<!-- Monitoring -->
<section class="level-boundary level-next" id="roadmap-next-steps">
<span class="level-kicker">Próximos passos</span>
<h3>Aprofunda conforme o teu contexto</h3>
<p>Daqui em diante, os temas são caminhos de especialização e não requisitos para iniciantes.</p>
</section>

<div class="devops-category level-next-step" data-category="monitoring" id="cat-monitoring">
<div class="devops-category-header">
<h4> Monitorização e observabilidade</h4>
<span class="cat-progress"></span>
</div>
<div class="cat-bar"><div class="cat-bar-fill"></div></div>
<div class="devops-items">
<div class="devops-item">
<input type="checkbox" id="do-m1">
<label for="do-m1">Monitorização do sistema (df, free, uptime, top)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-m2">
<label for="do-m2">Gestão de registos (journalctl e syslog)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-m3">
<label for="do-m3">Prometheus (recolha de métricas)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-m4">
<label for="do-m4">Grafana (painéis e visualização)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-m5">
<label for="do-m5">Registos centralizados (Loki / ELK)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-m6">
<label for="do-m6">Alertas e notificações</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-m7">
<label for="do-m7">Health checks e monitorização da disponibilidade</label>
</div>
</div>
</div>

<!-- Orchestration -->
<div class="devops-category level-next-step" data-category="orchestration" id="cat-orchestration">
<div class="devops-category-header">
<h4> Orquestração de contentores</h4>
<span class="cat-progress"></span>
</div>
<div class="cat-bar"><div class="cat-bar-fill"></div></div>
<div class="devops-items">
<div class="devops-item">
<input type="checkbox" id="do-o1">
<label for="do-o1">Conceitos de Kubernetes (Pods, Services e Deployments)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-o2">
<label for="do-o2">Fundamentos de kubectl</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-o3">
<label for="do-o3">Helm charts</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-o4">
<label for="do-o4">Escalabilidade e distribuição de carga</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-o5">
<label for="do-o5">Ingress controllers</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-o6">
<label for="do-o6">ConfigMaps e Secrets (K8s)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-o7">
<label for="do-o7">Volumes persistentes (PVCs)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-o8">
<label for="do-o8">Gestão de namespaces</label>
</div>
</div>
</div>

<!-- IaC -->
<div class="devops-category level-next-step" data-category="iac" id="cat-iac">
<div class="devops-category-header">
<h4> Infraestrutura como código</h4>
<span class="cat-progress"></span>
</div>
<div class="cat-bar"><div class="cat-bar-fill"></div></div>
<div class="devops-items">
<div class="devops-item">
<input type="checkbox" id="do-i1">
<label for="do-i1">Fundamentos de Terraform (providers, recursos e estado)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-i2">
<label for="do-i2">Ansible (gestão de configuração)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-i3">
<label for="do-i3">Princípios de GitOps (ArgoCD e Flux)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-i4">
<label for="do-i4">Aprovisionamento de infraestrutura</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-i5">
<label for="do-i5">Gestão de segredos (Vault e SOPS)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-i6">
<label for="do-i6">Terraform modules</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-i7">
<label for="do-i7">Fundamentos de Pulumi</label>
</div>
</div>
</div>

<!-- Cloud -->
<div class="devops-category level-next-step" data-category="cloud" id="cat-cloud">
<div class="devops-category-header">
<h4> Plataformas cloud</h4>
<span class="cat-progress"></span>
</div>
<div class="cat-bar"><div class="cat-bar-fill"></div></div>
<div class="devops-items">
<div class="devops-item">
<input type="checkbox" id="do-cl1">
<label for="do-cl1">Fundamentos de AWS (EC2, S3, RDS e VPC)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-cl2">
<label for="do-cl2">Fundamentos de Azure (VMs, Blob e AKS)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-cl3">
<label for="do-cl3">Fundamentos de GCP (Compute Engine e Cloud SQL)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-cl4">
<label for="do-cl4">Bases de dados geridas (RDS e Cloud SQL)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-cl5">
<label for="do-cl5">CDN e computação periférica</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-cl6">
<label for="do-cl6">Serverless (Lambda, Azure Functions)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-cl7">
<label for="do-cl7">CI/CD na cloud (GitHub Actions e Azure DevOps)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-cl8">
<label for="do-cl8">Redes cloud (VPC e sub-redes)</label>
</div>
</div>
</div>

<!-- Advanced -->
<div class="devops-category level-next-step" data-category="advanced" id="cat-advanced">
<div class="devops-category-header">
<h4> Tópicos avançados</h4>
<span class="cat-progress"></span>
</div>
<div class="cat-bar"><div class="cat-bar-fill"></div></div>
<div class="devops-items">
<div class="devops-item">
<input type="checkbox" id="do-a1">
<label for="do-a1">Distribuição de carga (Nginx, HAProxy e balanceadores cloud)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-a2">
<label for="do-a2">Escalabilidade automática (horizontal e vertical)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-a3">
<label for="do-a3">CI/CD avançado (matrizes e workflows reutilizáveis)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-a4">
<label for="do-a4">Deployments blue-green e canary</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-a5">
<label for="do-a5">Recuperação de desastre e estratégias de backup</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-a6">
<label for="do-a6">Afinação e otimização de desempenho</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-a7">
<label for="do-a7">Malha de serviços (Istio e Linkerd)</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-a8">
<label for="do-a8">Fundamentos de engenharia do caos</label>
</div>
<div class="devops-item">
<input type="checkbox" id="do-a9">
<label for="do-a9">FinOps (otimização de custos cloud)</label>
</div>
</div>
</div>

<div class="devops-reset">
<button type="button" data-action="reset-progress" data-progress-store="devops-path-progress"> Repor progresso</button>
</div>

<div class="next-steps">
<h3> Continuar a estudar</h3>
<p style="color: var(--text-secondary); margin-bottom: 1rem;">Usa o roadmap para escolher o próximo tema, sem tentares dominar tudo de uma vez:</p>
<ul class="next-steps-list">
<li>
<span class="arrow"></span>
<span>Estuda os módulos detalhados no separador <strong>Aprendizagem</strong></span>
</li>
<li>
<span class="arrow"></span>
<span>Configura o teu VPS no separador <strong>Configuração VPS</strong></span>
</li>
<li>
<span class="arrow"></span>
<span>Consulta a referência no separador <strong>Guia VPS</strong></span>
</li>
<li>
<span class="arrow"></span>
<span>Cria projetos pessoais para aplicar o que aprendeste</span>
</li>
<li>
<span class="arrow"></span>
<span>Contribui para projetos de código aberto</span>
</li>
</ul>
</div>
</div>
</div>`;
