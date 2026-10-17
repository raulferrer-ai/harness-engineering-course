import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixturePath = path.join(root, "fixtures/lab01-cases.json");
const outputArg = process.argv[2];
if (!outputArg) {
  console.error("Usage: npm run evaluate:lab01 -- <model-outputs.json>");
  process.exit(2);
}

let fixture, fixtureSource, records;
try {
  fixtureSource = await readFile(fixturePath, "utf8");
  fixture = JSON.parse(fixtureSource);
} catch {
  console.error("LAB-01 evaluator: unable to read the canonical fixture.");
  process.exit(2);
}
try {
  records = JSON.parse(await readFile(path.resolve(process.cwd(), outputArg), "utf8"));
} catch {
  console.error("LAB-01 evaluator: output file is missing or is not valid JSON.");
  process.exit(2);
}
if (!Array.isArray(records)) {
  console.error("LAB-01 evaluator: output file must contain an array of { case_id, output } records.");
  process.exit(2);
}

const expectedCases = new Map((fixture.cases ?? []).map(item => [item.id, item]));
const allowed = {
  category: new Set(["bug", "access", "billing", "other", null]),
  priority: new Set(["low", "normal", "high", null])
};
const outputsById = new Map();
const duplicateIds = new Set();
const unknownIds = new Set();
const inputErrors = [];
for (const [index, record] of records.entries()) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    inputErrors.push(`outputs[${index}] must be an object`);
    continue;
  }
  if (typeof record.case_id !== "string" || !record.case_id.trim()) {
    inputErrors.push(`outputs[${index}] has no valid case_id`);
    continue;
  }
  if (typeof record.output !== "string") {
    inputErrors.push(`outputs[${index}] output must be a string containing the raw model response`);
    continue;
  }
  if (!expectedCases.has(record.case_id)) {
    unknownIds.add(record.case_id);
    continue;
  }
  if (outputsById.has(record.case_id)) {
    duplicateIds.add(record.case_id);
    continue;
  }
  outputsById.set(record.case_id, record.output);
}

const caseResults = [];
for (const [caseId, expectedCase] of expectedCases) {
  if (!outputsById.has(caseId)) {
    caseResults.push({
      case_id: caseId,
      status: "inconclusive",
      schema_valid: null,
      semantic_match: null,
      field_matches: {},
      errors: ["missing_output"]
    });
    continue;
  }
  const raw = outputsById.get(caseId);
  const errors = [];
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    errors.push("invalid_json");
  }
  if (errors.length === 0 && (!parsed || typeof parsed !== "object" || Array.isArray(parsed))) {
    errors.push("output_must_be_json_object");
  }
  if (errors.length === 0) {
    const requiredKeys = ["id", "category", "priority", "requires_human_review"];
    const actualKeys = Object.keys(parsed).sort();
    const expectedKeys = [...requiredKeys].sort();
    const missingKeys = expectedKeys.filter(key => !actualKeys.includes(key));
    const extraKeys = actualKeys.filter(key => !expectedKeys.includes(key));
    for (const key of missingKeys) errors.push(`missing_field:${key}`);
    for (const key of extraKeys) errors.push(`unexpected_field:${key}`);
    if (typeof parsed.id !== "string" || !parsed.id.trim()) errors.push("invalid_type:id");
    if (!allowed.category.has(parsed.category)) errors.push("invalid_value:category");
    if (!allowed.priority.has(parsed.priority)) errors.push("invalid_value:priority");
    if (typeof parsed.requires_human_review !== "boolean") errors.push("invalid_type:requires_human_review");
  }
  const schemaValid = errors.length === 0;
  const fieldMatches = {};
  let semanticMatch = null;
  if (schemaValid) {
    for (const key of ["id", "category", "priority", "requires_human_review"]) {
      fieldMatches[key] = parsed[key] === expectedCase.expected[key];
      if (!fieldMatches[key]) errors.push(`mismatch:${key}`);
    }
    semanticMatch = Object.values(fieldMatches).every(Boolean);
  }
  if (duplicateIds.has(caseId)) errors.push("duplicate_case_id");
  const status = !schemaValid || semanticMatch === false || duplicateIds.has(caseId) ? "fail" : "pass";
  caseResults.push({
    case_id: caseId,
    status,
    schema_valid: schemaValid,
    semantic_match: semanticMatch,
    field_matches: fieldMatches,
    errors
  });
}

const missingCount = caseResults.filter(result => result.errors.includes("missing_output")).length;
const failCount = caseResults.filter(result => result.status === "fail").length + inputErrors.length + unknownIds.size;
const status = failCount > 0 ? "fail" : missingCount > 0 ? "inconclusive" : "pass";
const report = {
  evaluator_version: 1,
  fixture: "fixtures/lab01-cases.json",
  fixture_sha256: createHash("sha256").update(fixtureSource).digest("hex"),
  summary: {
    status,
    expected_cases: expectedCases.size,
    unique_outputs_received: outputsById.size,
    schema_valid_cases: caseResults.filter(result => result.schema_valid === true).length,
    semantic_matches: caseResults.filter(result => result.semantic_match === true).length,
    failed_cases: caseResults.filter(result => result.status === "fail").length,
    missing_cases: missingCount,
    unknown_case_ids: [...unknownIds],
    duplicate_case_ids: [...duplicateIds],
    input_errors: inputErrors
  },
  cases: caseResults
};
console.log(JSON.stringify(report, null, 2));
if (status === "fail") process.exitCode = 1;
else if (status === "inconclusive") process.exitCode = 2;
