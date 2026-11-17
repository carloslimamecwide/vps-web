export function escapeCode(source: string): string {
  return source.trimEnd()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
