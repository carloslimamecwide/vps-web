const base = new URL(process.argv[2] ?? "http://127.0.0.1:3100");
if (!["http:", "https:"].includes(base.protocol)) {
  throw new Error("O smoke test requer um URL HTTP ou HTTPS");
}

async function fetchOk(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(15_000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
  return response;
}

const response = await fetchOk(base);
const html = await response.text();
if (!html.includes("O guia de DevOps para iniciantes")) {
  throw new Error("A resposta não contém o guia esperado");
}

const assets = [...new Set(
  [...html.matchAll(/(?:src|href)="([^\"]*\/_next\/static\/[^\"]+)"/g)]
    .map((match) => new URL(match[1], base).href),
)];
if (!assets.length) throw new Error("O HTML não referencia os assets do Next.js");

for (const asset of assets) {
  if (new URL(asset).origin !== base.origin) {
    throw new Error("Um asset do Next.js aponta para outra origem");
  }
  await fetchOk(asset);
}

console.log(`Smoke HTTP aprovado: página e ${assets.length} assets`);
