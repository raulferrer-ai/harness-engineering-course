import { readFile } from "node:fs/promises";
import process from "node:process";

const path = process.env.LAB01_FIXTURE_PATH ?? new URL("../fixtures/lab01-cases.json", import.meta.url);
const data = JSON.parse(await readFile(path, "utf8"));
const fail = (message) => {
  console.error(`LAB-01 fixtures: ${message}`);
  process.exitCode = 1;
};
const allowed = {
  category: new Set(["bug", "access", "billing", "other", null]),
  priority: new Set(["low", "normal", "high", null])
};

if (data.schema_version !== 1) fail("schema_version debe ser 1");
if (!Array.isArray(data.cases) || data.cases.length < 5) { fail("se requieren al menos cinco casos"); process.exit(1); }
const ids = new Set();
const expectedIds = new Set();
const kinds = new Set();
for (const item of data.cases ?? []) {
  if (typeof item.id !== "string" || !item.id.trim() || ids.has(item.id)) fail(`ID vacío o duplicado: ${item.id}`);
  ids.add(item.id);
  if (typeof item.input !== "string" || !item.input.trim()) fail(`${item.id}: entrada vacía`);
  if (typeof item.rationale !== "string" || !item.rationale.trim()) fail(`${item.id}: falta justificación`);
  const expected = item.expected;
  if (!expected || typeof expected.id !== "string" || !expected.id.trim()) {
    fail(`${item.id}: falta expected.id`);
  } else {
    if (expectedIds.has(expected.id)) fail(`${item.id}: expected.id duplicado ${expected.id}`);
    expectedIds.add(expected.id);
    if (typeof item.input === "string") {
      const ticketMatch = item.input.match(/\bTicket\s+([A-Z]-\d+)\b/i);
      if (!ticketMatch) {
        fail(`${item.id}: la entrada no contiene un identificador de ticket reconocible`);
      } else if (ticketMatch[1] !== expected.id) {
        fail(`${item.id}: expected.id ${expected.id} no coincide con el ticket de la entrada ${ticketMatch[1]}`);
      }
    }
  }
  if (!allowed.category.has(expected?.category)) fail(`${item.id}: categoría no permitida`);
  if (!allowed.priority.has(expected?.priority)) fail(`${item.id}: prioridad no permitida`);
  if (typeof expected?.requires_human_review !== "boolean") fail(`${item.id}: requires_human_review debe ser booleano`);
  if (typeof item.kind !== "string" || !["normal", "incomplete", "ambiguous", "conflicting_instruction", "irrelevant_data"].includes(item.kind)) fail(`${item.id}: tipo de caso no permitido`);
  else kinds.add(item.kind);
}
for (const kind of ["normal", "incomplete", "ambiguous", "conflicting_instruction", "irrelevant_data"]) {
  if (!kinds.has(kind)) fail(`falta caso de tipo ${kind}`);
}
if (process.exitCode) process.exit(process.exitCode);
console.log(`LAB-01 fixtures OK: ${data.cases.length} casos, ${kinds.size} tipos, IDs únicos.`);
