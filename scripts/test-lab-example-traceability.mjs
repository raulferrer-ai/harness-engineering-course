import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const checker = path.join(root, "scripts/check-lab-example-traceability.mjs");
const temp = await mkdtemp(path.join(tmpdir(), "lab-example-traceability-"));

const contracts = [
  ["lab02-specification.json", "lab02-worked-example.md", { acceptance_criteria: [{ id: "AC-01" }] }, ["AC-01"]],
  ["lab07-evaluation.json", "lab07-worked-example.md", { scoring_protocol: { decision_test_vectors: [{ id: "DEC-01" }] } }, ["DEC-01"]],
  ["lab09-observability-recovery.json", "lab09-worked-example.md", { signals: [{ id: "SIG-01" }], events: [{ id: "EVT-01" }], recovery_steps: [{ id: "REC-01" }], scenarios: [{ id: "OPS-T01" }] }, ["SIG-01", "EVT-01", "REC-01", "OPS-T01"]],
  ["lab10-productivity-governance.json", "lab10-worked-example.md", { metrics: [{ id: "MET-01" }], governance_matrix: [{ id: "GOV-01" }], decision_rules: [{ id: "DEC-01" }], scenarios: [{ id: "VAL-T01" }], decision_test_vectors: [{ id: "TV-01" }] }, ["MET-01", "GOV-01", "DEC-01", "VAL-T01", "TV-01"]]
];
async function makeRoot(base, omitId = null) {
  await mkdir(path.join(base, "fixtures"), { recursive: true });
  await mkdir(path.join(base, "docs"), { recursive: true });
  for (const [fixtureName, exampleName, data, ids] of contracts) {
    await writeFile(path.join(base, "fixtures", fixtureName), JSON.stringify(data), "utf8");
    const visibleIds = ids.filter(id => id !== omitId);
    await writeFile(path.join(base, "docs", exampleName), visibleIds.join(" | "), "utf8");
  }
}
let failures = 0;
try {
  const canonical = spawnSync(process.execPath, [checker], { cwd: root, encoding: "utf8", env: { ...process.env, LAB_EXAMPLE_TRACEABILITY_ROOT: root } });
  if (canonical.status !== 0 || !/PASS lab\/example traceability/.test(canonical.stdout)) {
    failures++;
    console.error("FAIL canonical examples: " + canonical.stdout + canonical.stderr);
  } else console.log("PASS canonical worked examples reference required fixture IDs");

  const goodRoot = path.join(temp, "good");
  await makeRoot(goodRoot);
  const good = spawnSync(process.execPath, [checker], { cwd: root, encoding: "utf8", env: { ...process.env, LAB_EXAMPLE_TRACEABILITY_ROOT: goodRoot } });
  if (good.status !== 0) {
    failures++;
    console.error("FAIL accepts complete ID coverage: " + good.stdout + good.stderr);
  } else console.log("PASS accepts complete fixture/example ID coverage");

  const prefixCollisionRoot = path.join(temp, "prefix-collision");
  await makeRoot(prefixCollisionRoot);
  await writeFile(path.join(prefixCollisionRoot, "docs", "lab02-worked-example.md"), "AC-010", "utf8");
  const prefixCollision = spawnSync(process.execPath, [checker], { cwd: root, encoding: "utf8", env: { ...process.env, LAB_EXAMPLE_TRACEABILITY_ROOT: prefixCollisionRoot } });
  if (prefixCollision.status !== 1 || !(prefixCollision.stdout + prefixCollision.stderr).includes("LAB-02: docs/lab02-worked-example.md does not reference fixture ID AC-01")) {
    failures++;
    console.error("FAIL rejects fixture ID matched only as a longer identifier: " + prefixCollision.stdout + prefixCollision.stderr);
  } else console.log("PASS rejects fixture ID matched only as a longer identifier");

  const unicodeCollisionRoot = path.join(temp, "unicode-collision");
  await makeRoot(unicodeCollisionRoot);
  await writeFile(path.join(unicodeCollisionRoot, "docs", "lab02-worked-example.md"), "AC-01é", "utf8");
  const unicodeCollision = spawnSync(process.execPath, [checker], { cwd: root, encoding: "utf8", env: { ...process.env, LAB_EXAMPLE_TRACEABILITY_ROOT: unicodeCollisionRoot } });
  if (unicodeCollision.status !== 1 || !(unicodeCollision.stdout + unicodeCollision.stderr).includes("LAB-02: docs/lab02-worked-example.md does not reference fixture ID AC-01")) {
    failures++;
    console.error("FAIL rejects fixture ID followed by a Unicode letter: " + unicodeCollision.stdout + unicodeCollision.stderr);
  } else console.log("PASS rejects fixture ID followed by a Unicode letter");

  const badRoot = path.join(temp, "bad");
  await makeRoot(badRoot, "DEC-01");
  const bad = spawnSync(process.execPath, [checker], { cwd: root, encoding: "utf8", env: { ...process.env, LAB_EXAMPLE_TRACEABILITY_ROOT: badRoot } });
  if (bad.status !== 1 || !/LAB-07: docs\/lab07-worked-example\.md does not reference fixture ID DEC-01/.test(bad.stdout + bad.stderr)) {
    failures++;
    console.error("FAIL detects missing fixture ID in worked example: " + bad.stdout + bad.stderr);
  } else console.log("PASS rejects missing fixture ID in worked example");
} finally {
  await rm(temp, { recursive: true, force: true });
}
if (failures) process.exit(1);
console.log("Lab/example traceability regression tests passed: 5 scenarios.");
