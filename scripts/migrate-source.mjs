import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, "..");
const sourcePath = resolve(projectRoot, process.argv[2] ?? "guia-vps.html");
const source = readFileSync(sourcePath, "utf8");

const styleMatch = source.match(/<style>([\s\S]*?)<\/style>/i);
if (!styleMatch) {
  throw new Error("Não foi possível localizar o bloco <style> no HTML de origem.");
}

const additions = String.raw`

/* React accessibility and interaction adapters */
.brand.brand-button,
.toc-link.toc-button,
.section-header.section-toggle-button,
.setup-phase-header.section-toggle-button,
.sidebar-backdrop,
.sidebar-toggle {
  appearance: none;
  font: inherit;
}

.brand.brand-button {
  width: 100%;
  border: 0;
  background: transparent;
  text-align: left;
}

.brand-button .brand-name,
.brand-button .brand-sub {
  display: block;
}

.toc-link.toc-button {
  width: 100%;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.section-header.section-toggle-button,
.setup-phase-header.section-toggle-button {
  width: 100%;
  border: 0;
  background: transparent;
  color: inherit;
  text-align: left;
}

.section-header .collapsible-heading {
  display: flex;
  align-items: center;
  gap: var(--s3);
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--text);
}

.setup-phase-header .collapsible-heading {
  display: flex;
  align-items: center;
  gap: var(--s2);
  font-size: 0.98rem;
  font-weight: 600;
  color: var(--text);
}

.sidebar-backdrop {
  border: 0;
}
`;

const css = styleMatch[1]
  .trim()
  .replace(
    /--font-ui:\s*"IBM Plex Sans"[^;]*;/,
    "--font-ui: var(--font-ibm-plex-sans), -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif;",
  )
  .replace(
    /--font-mono:\s*"IBM Plex Mono"[^;]*;/,
    "--font-mono: var(--font-ibm-plex-mono), ui-monospace, \"SF Mono\", Menlo, monospace;",
  );

const guides = [
  ["intro", "<!-- GUIDE: Introdução -->", "<!-- /guide-intro -->"],
  ["devops", "<!-- GUIDE: DevOps Path -->", "<!-- /guide-devops -->"],
  ["learning", "<!-- GUIDE: Aprendizagem -->", "<!-- /guide-learning -->"],
  ["setup", "<!-- GUIDE: Setup VPS -->", "<!-- /guide-setup -->"],
  ["vps", "<!-- GUIDE: VPS -->", "<!-- /guide-vps -->"],
];

function extractGuide(startMarker, endMarker) {
  const markerStart = source.indexOf(startMarker);
  const markerEnd = source.indexOf(endMarker, markerStart + startMarker.length);
  if (markerStart < 0 || markerEnd < 0) {
    throw new Error(`Marcadores em falta: ${startMarker} / ${endMarker}`);
  }

  const block = source.slice(markerStart + startMarker.length, markerEnd);
  const wrapperStart = block.indexOf('<div class="guide-panel');
  const wrapperOpenEnd = block.indexOf(">", wrapperStart);
  const wrapperClose = block.lastIndexOf("</div>");
  if (wrapperStart < 0 || wrapperOpenEnd < 0 || wrapperClose < 0) {
    throw new Error(`Estrutura de painel inválida depois de ${startMarker}`);
  }

  return block.slice(wrapperOpenEnd + 1, wrapperClose).trim();
}

function adaptMarkup(markup) {
  return markup
    .replace(/<table([^>]*)>([\s\S]*?)<\/table>/g, (table, attributes, body) => {
      if (/<(?:thead|tbody|tfoot)\b/i.test(body)) return table;
      return `<table${attributes}><tbody>${body}</tbody></table>`;
    })
    .replace(
      /<div class="devops-category" data-category="([^"]+)">/g,
      '<div class="devops-category" data-category="$1" id="cat-$1">',
    )
    .replace(
      /onclick="switchGuide\('([^']+)'\)"/g,
      'data-action="switch-guide" data-guide-target="$1"',
    )
    .replace(
      /onclick="resetProgress\(\)"/g,
      'data-action="reset-progress" data-progress-store="devops-path-progress"',
    )
    .replace(
      /onclick="resetLearningProgress\(\)"/g,
      'data-action="reset-progress" data-progress-store="learning-progress"',
    )
    .replace(
      /onclick="resetSetupProgress\(\)"/g,
      'data-action="reset-progress" data-progress-store="setup-vps-progress"',
    )
    .replace(/onclick="expandAll\(\)"/g, 'data-action="expand-all"')
    .replace(/onclick="collapseAll\(\)"/g, 'data-action="collapse-all"')
    .replace(/\s+onclick="[^"]*"/g, "")
    .replace(/\s+onchange="[^"]*"/g, "")
    .replace(/\s+onkeydown="[^"]*"/g, "")
    .replace(/<button(?![^>]*\btype=)/g, '<button type="button"')
    .replace(/<pre(?![^>]*\btabindex=)/g, '<pre tabindex="0"');
}

function escapeTemplateLiteral(value) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

function idsFor(pattern) {
  return [...source.matchAll(pattern)].map((match) => match[1]);
}

const outputDirectory = resolve(projectRoot, "src/content");
mkdirSync(outputDirectory, { recursive: true });
mkdirSync(resolve(projectRoot, "src/app"), { recursive: true });

writeFileSync(resolve(projectRoot, "src/app/globals.css"), `${css}${additions}\n`);

for (const [id, startMarker, endMarker] of guides) {
  const html = adaptMarkup(extractGuide(startMarker, endMarker));
  const exportName = `${id}Html`;
  writeFileSync(
    resolve(outputDirectory, `${id}.ts`),
    `// Generated from guia-vps.html by scripts/migrate-source.mjs.\nexport const ${exportName} = \`${escapeTemplateLiteral(html)}\`;\n`,
  );
}

const progressIds = {
  devops: idsFor(/id="(do-[^"]+)"/g),
  learning: idsFor(/id="(learn-[^"]+)"/g),
  setup: idsFor(/id="(s-[^"]+)"/g),
};

writeFileSync(
  resolve(outputDirectory, "progress-ids.ts"),
  `// Generated from guia-vps.html by scripts/migrate-source.mjs.\nexport const PROGRESS_IDS = ${JSON.stringify(progressIds, null, 2)} as const;\n`,
);

console.log(
  `Migração concluída: ${guides.length} guias, ${progressIds.devops.length} itens DevOps, ${progressIds.learning.length} lições e ${progressIds.setup.length} passos de setup.`,
);
