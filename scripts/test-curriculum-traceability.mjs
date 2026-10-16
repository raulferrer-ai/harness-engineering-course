import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parsePrimaryTraceability } from "./lib/parse-traceability.mjs";

const canonical = await readFile(new URL("../docs/traceability.md", import.meta.url), "utf8");
const expectedCompetencies = Array.from({ length: 9 }, (_, i) => "COMP-" + String(i + 1).padStart(2, "0"));
const expectedModules = Array.from({ length: 10 }, (_, i) => "M" + String(i + 1).padStart(2, "0"));
const parsed = parsePrimaryTraceability(canonical);
assert.deepEqual(parsed.competencyRows, expectedCompetencies, "canonical primary competencies");
assert.deepEqual(parsed.moduleRows, expectedModules, "canonical primary modules");

for (const [label, variant] of [
  ["LF", canonical],
  ["CRLF", canonical.replace(/\n/g, "\r\n")],
  ["CR-only", canonical.replace(/\n/g, "\r")],
  ["mixed", canonical.replace(/\n/g, (_, offset) => offset % 2 ? "\r\n" : "\r")]
]) {
  assert.deepEqual(parsePrimaryTraceability(variant), parsed, `${label} line endings`);
}

const duplicated = canonical.replace(/^(\| COMP-01 —[^\n]+\n)/m, "$1$1");
const duplicateRows = parsePrimaryTraceability(duplicated);
assert.equal(duplicateRows.competencyRows.filter(id => id === "COMP-01").length, 2, "duplicate competency retained");
assert.equal(duplicateRows.moduleRows.filter(id => id === "M01").length, 2, "duplicate module retained");

const removed = canonical.replace(/^\| COMP-09 —[^\n]+\n/m, "");
const missingRows = parsePrimaryTraceability(removed);
assert.equal(missingRows.competencyRows.includes("COMP-09"), false, "missing competency detected");
assert.equal(missingRows.moduleRows.includes("M10"), false, "missing module detected");

const unrelated = canonical + "\n## Notas adicionales\n| COMP-01 — repetición | M01: fuera de la matriz | x | y |\n";
assert.deepEqual(parsePrimaryTraceability(unrelated), parsed, "unrelated tables ignored");
console.log("Curriculum traceability parser regression tests passed.");
