import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = path.resolve(process.env.LAB_EXAMPLE_TRACEABILITY_ROOT ?? process.cwd());
const contracts = [
  {
    lab: "LAB-02",
    fixture: "fixtures/lab02-specification.json",
    example: "docs/lab02-worked-example.md",
    ids: data => (data.acceptance_criteria ?? []).map(item => item.id)
  },
  {
    lab: "LAB-07",
    fixture: "fixtures/lab07-evaluation.json",
    example: "docs/lab07-worked-example.md",
    ids: data => (data.scoring_protocol?.decision_test_vectors ?? []).map(item => item.id)
  },
  {
    lab: "LAB-09",
    fixture: "fixtures/lab09-observability-recovery.json",
    example: "docs/lab09-worked-example.md",
    ids: data => [
      ...(data.signals ?? []),
      ...(data.events ?? []),
      ...(data.recovery_steps ?? []),
      ...(data.scenarios ?? [])
    ].map(item => item.id)
  },
  {
    lab: "LAB-10",
    fixture: "fixtures/lab10-productivity-governance.json",
    example: "docs/lab10-worked-example.md",
    ids: data => [
      ...(data.metrics ?? []),
      ...(data.governance_matrix ?? []),
      ...(data.decision_rules ?? []),
      ...(data.scenarios ?? []),
      ...(data.decision_test_vectors ?? [])
    ].map(item => item.id)
  }
];
const errors = [];
for (const contract of contracts) {
  let fixture, example;
  try {
    fixture = JSON.parse(await readFile(path.join(root, contract.fixture), "utf8"));
    example = await readFile(path.join(root, contract.example), "utf8");
  } catch {
    errors.push(`${contract.lab}: unable to read fixture or worked example`);
    continue;
  }
  const ids = contract.ids(fixture);
  if (ids.length === 0 || ids.some(id => typeof id !== "string" || !id.trim())) {
    errors.push(`${contract.lab}: fixture contract has no valid identifiers`);
    continue;
  }
  for (const id of ids) {
    let exactMatch = false;
    let offset = example.indexOf(id);
    while (offset !== -1) {
      const before = offset === 0 ? "" : example[offset - 1];
      const after = example[offset + id.length] ?? "";
      if (!/[\p{L}\p{N}_-]/u.test(before) && !/[\p{L}\p{N}_-]/u.test(after)) {
        exactMatch = true;
        break;
      }
      offset = example.indexOf(id, offset + id.length);
    }
    if (!exactMatch) errors.push(`${contract.lab}: ${contract.example} does not reference fixture ID ${id}`);
  }
}
if (errors.length) {
  console.error(`Lab/example traceability check failed: ${errors.length} issue(s).`);
  for (const error of errors) console.error("- " + error);
  process.exit(1);
}
console.log("PASS lab/example traceability: LAB-02 criteria, LAB-07 decision vectors, LAB-09 operational evidence, and LAB-10 metrics/governance/scenario IDs are referenced in their worked examples.");
