export const introHtml = `<nav class="intro-nav">
<a href="#intro-oque">O que é</a>
<a href="#intro-quem">Para quem</a>
<a href="#intro-como">Como usar</a>
<a href="#intro-caso-real">Caso real</a>
<a href="#intro-mapa">Mapa</a>
</nav>

<div class="intro-hero">
<p class="intro-eyebrow">guia prático para iniciantes</p>
<h1>O guia de DevOps para iniciantes</h1>
<p class="intro-lead">Um percurso introdutório, gratuito e orientado à prática para ligar conceitos que muitas vezes aparecem dispersos: Linux, SSH, Docker, Compose, CI/CD, segurança e reverse proxy num VPS.</p>
</div>

<div class="intro-block" id="intro-oque">
<h2>O que é — e o que não é</h2>
<p>Este guia ajuda-te a construir uma primeira visão integrada de DevOps através de explicações curtas, comandos comentados e um laboratório num VPS descartável. O percurso essencial termina em <strong>7.1 — O que é um Reverse Proxy?</strong>; daí em diante, podes continuar ao teu ritmo.</p>
<p>Não substitui a documentação oficial, uma revisão de segurança ou o desenho de uma arquitetura para um sistema real. Também não promete disponibilidade contínua: é uma base pedagógica para aprenderes a fazer melhores perguntas e continuares a evoluir.</p>
</div>

<div class="intro-block" id="intro-quem">
<h2>Para quem</h2>
<p>Destina-se a quem está a começar em DevOps e prefere compreender o fluxo completo antes de aprofundar cada ferramenta. Não precisas de experiência profissional em operações.</p>
<p><strong>Pré-requisitos:</strong> noções básicas de terminal e Git, um computador com SSH e, para o laboratório, um VPS descartável com Ubuntu. Um domínio só é necessário na fase de SSL.</p>
</div>

<div class="intro-block" id="intro-como">
<h2>Como usar</h2>
<ol class="intro-steps">
<li><strong>Percurso essencial de aprendizagem</strong> — estuda os módulos 1 a 7.1. É este nível que conta para a conclusão da iniciação.</li>
<li><strong>Configuração do VPS</strong> — executa as fases 1–10 pela ordem apresentada. Nesta área não existem fases opcionais.</li>
<li><strong>Continuação da aprendizagem</strong> — aprofunda as lições 7.2–7.4 e usa os módulos 8–12 como mapa para monitorização, Kubernetes, infraestrutura como código, cloud e resolução de problemas.</li>
</ol>
<p style="margin-top:1rem;">Testa os comandos num ambiente descartável, lê cada aviso e substitui os valores em maiúsculas pelos teus dados. Não copies comandos para um servidor importante sem compreenderes o seu efeito.</p>
</div>

<div class="intro-block" id="intro-caso-real">
<h2>WebFusionLab como caso real</h2>
<p>O WebFusionLab mostra estes conceitos aplicados progressivamente: um Dockerfile multi-stage com utilizador sem privilégios root, Docker Compose com redes e health check, GitHub Actions a publicar imagens no GHCR e deployment num VPS com Nginx e Cloudflare.</p>
<p>A base de dados ainda não faz parte desta fase do projeto. PostgreSQL aparece no guia como aprendizagem e evolução futura, não como uma funcionalidade já implementada no WebFusionLab.</p>
</div>

<div class="intro-block" id="intro-mapa">
<h2>Mapa do guia</h2>
<ul class="intro-map">
<li>
<div>
<div class="map-key">01</div>
<div class="map-title">Percurso DevOps</div>
<div class="map-desc">Checklist de orientação: fundamentos, prática e temas para explorar depois.</div>
</div>
<button type="button" data-action="switch-guide" data-guide-target="devops">Abrir</button>
</li>
<li>
<div>
<div class="map-key">02</div>
<div class="map-title">Aprendizagem</div>
<div class="map-desc">Lições com explicações, comandos e progresso essencial até 7.1.</div>
</div>
<button type="button" data-action="switch-guide" data-guide-target="learning">Abrir</button>
</li>
<li>
<div>
<div class="map-key">03</div>
<div class="map-title">Configuração VPS</div>
<div class="map-desc">Laboratório completo e sequencial com dez fases, do primeiro acesso ao deployment.</div>
</div>
<button type="button" data-action="switch-guide" data-guide-target="setup">Abrir</button>
</li>
<li>
<div>
<div class="map-key">04</div>
<div class="map-title">Guia VPS</div>
<div class="map-desc">Referência de consulta para comandos, ficheiros e conceitos operacionais.</div>
</div>
<button type="button" data-action="switch-guide" data-guide-target="vps">Abrir</button>
</li>
</ul>
</div>

<div class="intro-cta">
<button type="button" class="btn-primary" data-action="switch-guide" data-guide-target="learning">Começar a iniciação</button>
<button type="button" class="btn-ghost" data-action="switch-guide" data-guide-target="devops">Ver o percurso</button>
</div>
<p class="intro-note">O progresso fica guardado apenas neste navegador. Não precisas de criar uma conta; apenas as lições posteriores a 7.1 ficam fora da conclusão da iniciação.</p>`;
