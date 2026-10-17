import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const evaluator = path.join(root, "scripts/evaluate-lab01-output.mjs");
const fixture = JSON.parse(await readFile(path.join(root, "fixtures/lab01-cases.json"), "utf8"));
const temp = await mkdtemp(path.join(tmpdir(), "lab01-evaluator-"));
const toRecord = item => ({ case_id: item.id, output: JSON.stringify(item.expected) });
const canonical = fixture.cases.map(toRecord);
let failures = 0;

async function runCase(label, records, expectedExit, verify) {
  const file = path.join(temp, label.replace(/[^a-z0-9-]/gi, "-") + ".json");
  await writeFile(file, JSON.stringify(records, null, 2), "utf8");
  const result = spawnSync(process.execPath, [evaluator, file], { cwd: root, encoding: "utf8" });
  try {
    assert.equal(result.status, expectedExit, "exit status");
    const report = JSON.parse(result.stdout);
    verify(report, result.stdout);
    console.log("PASS " + label);
  } catch (error) {
    failures++;
    console.error("FAIL " + label + ": " + error.message + "\n" + result.stdout + result.stderr);
  }
}

try {
  await runCase("all exact outputs", canonical, 0, report => {
    assert.equal(report.summary.status, "pass");
    assert.equal(report.summary.expected_cases, 5);
    assert.equal(report.summary.semantic_matches, 5);
    assert.match(report.fixture_sha256, /^[a-f0-9]{64}$/);
    assert.equal(report.summary.schema_valid_cases, 5);
  });
  await runCase("malformed JSON response", canonical.map((item, i) => i === 0 ? { ...item, output: "not-json" } : item), 1, report => {
    assert.equal(report.cases[0].status, "fail");
    assert.deepEqual(report.cases[0].errors, ["invalid_json"]);
  });
  await runCase("semantic mismatch", canonical.map((item, i) => i === 0 ? { ...item, output: JSON.stringify({ ...fixture.cases[0].expected, priority: "low" }) } : item), 1, report => {
    assert.equal(report.cases[0].schema_valid, true);
    assert.equal(report.cases[0].semantic_match, false);
    assert.ok(report.cases[0].errors.includes("mismatch:priority"));
  });
  await runCase("missing output is inconclusive", canonical.slice(1), 2, report => {
    assert.equal(report.summary.status, "inconclusive");
    assert.equal(report.summary.missing_cases, 1);
  });
  await runCase("duplicate case output", [...canonical, canonical[0]], 1, report => {
    assert.equal(report.summary.duplicate_case_ids[0], "L01-01");
    assert.ok(report.cases[0].errors.includes("duplicate_case_id"));
  });
  await runCase("unknown case output", [...canonical, { case_id: "L01-99", output: "{}" }], 1, report => {
    assert.deepEqual(report.summary.unknown_case_ids, ["L01-99"]);
  });
  await runCase("unexpected output field", canonical.map((item, i) => i === 0 ? { ...item, output: JSON.stringify({ ...fixture.cases[0].expected, extra: "SENSITIVE-SYNTHETIC-SECRET" }) } : item), 1, (report, output) => {
    assert.ok(report.cases[0].errors.includes("unexpected_field:extra"));
    assert.equal(output.includes("SENSITIVE-SYNTHETIC-SECRET"), false, "raw response content must not leak into the report");
  });
  await runCase("invalid boolean type", canonical.map((item, i) => i === 0 ? { ...item, output: JSON.stringify({ ...fixture.cases[0].expected, requires_human_review: "false" }) } : item), 1, report => {
    assert.ok(report.cases[0].errors.includes("invalid_type:requires_human_review"));
  });
} finally {
  await rm(temp, { recursive: true, force: true });
}
if (failures) process.exit(1);
console.log("LAB-01 evaluator regression tests passed: 8 cases.");
