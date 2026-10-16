// Parse only the primary mapping table; the first and last empty cells are Markdown delimiters.
export function parsePrimaryTraceability(markdown) {
  const section = markdown.split(/^## Competencias, resultados observables y evidencia disponible\s*$/m)[1]?.split(/^## /m)[0] ?? "";
  const rows = section.split(/\r\n?|\n/).filter(line => /^\s*\|/.test(line))
    .map(line => line.trim().split("|").map(cell => cell.trim()));
  return {
    competencyRows: rows.map(cells => cells[1]?.match(/^(COMP-\d{2})\s+—/)?.[1]).filter(Boolean),
    moduleRows: rows.map(cells => cells[2]?.match(/^(M\d{2}):/)?.[1]).filter(Boolean)
  };
}
