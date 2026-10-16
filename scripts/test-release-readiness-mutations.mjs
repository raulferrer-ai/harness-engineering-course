import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const checklistPath = join(root, "docs/release-readiness-checklist.md");
const validatorPath = join(root, "scripts/check-release-readiness-checklist.mjs");
const canonical = await readFile(checklistPath, "utf8");
const cases = [
  { label: "missing decision section", mutate: text => text.replace("## 5. Decisión", "## 5. Resultado"), expectedDiagnostic: "falta sección: ## 5. Decisión" },
  { label: "missing evidence safeguard", mutate: text => text.replace("no inferir éxito", "asumir éxito"), expectedDiagnostic: "falta regla o salvaguarda: no inferir éxito" },
  { label: "missing decision owner", mutate: text => text.replace("| Responsable de la decisión |", "| Dueño de la decisión |"), expectedDiagnostic: "falta campo en el registro de decisión: Responsable de la decisión" },
  { label: "missing critical failure policy", mutate: text => text.replace("fallo crítico", "incidencia"), expectedDiagnostic: "falta regla o salvaguarda: fallo crítico" },
  { label: "missing release outcome choices", mutate: text => text.replace("BLOQUEAR / APROBAR CON CONDICIONES / APROBAR", "PUBLICAR"), expectedDiagnostic: "falta regla o salvaguarda: BLOQUEAR / APROBAR CON CONDICIONES / APROBAR" }
];

const temp = await mkdtemp(join(tmpdir(), "release-checklist-mutations-"));
let failures = 0;
function run(fixturePath) {
  return spawnSync(process.execPath, [validatorPath], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, RELEASE_CHECKLIST_PATH: fixturePath }
  });
}
function assert(condition, message) {
  if (!condition) {
    failures++;
    console.error("FAIL " + message);
    return false;
  }
  return true;
}

try {
  const baselinePath = join(temp, "canonical.md");
  await writeFile(baselinePath, canonical, "utf8");
  const baseline = run(baselinePath);
  assert(baseline.status === 0, "canonical checklist should pass (exit " + baseline.status + "):\n" + baseline.stdout + baseline.stderr);

  for (const testCase of cases) {
    const mutated = testCase.mutate(canonical);
    if (!assert(mutated !== canonical, testCase.label + ": mutation did not alter the canonical fixture")) continue;

    const fixturePath = join(temp, testCase.label.replace(/[^a-z0-9]+/gi, "-") + ".md");
    await writeFile(fixturePath, mutated, "utf8");
    const result = run(fixturePath);
    const output = result.stdout + result.stderr;
    assert(result.status === 1, testCase.label + ": expected exit 1, got " + result.status + "\n" + output);
    assert(output.includes(testCase.expectedDiagnostic), testCase.label + ": missing expected diagnostic " + JSON.stringify(testCase.expectedDiagnostic) + "\n" + output);
    if (result.status === 1 && output.includes(testCase.expectedDiagnostic)) console.log("PASS rejects " + testCase.label + " with the expected diagnostic");
  }
} finally {
  await rm(temp, { recursive: true, force: true });
}

if (failures) {
  console.error("Release checklist mutation tests failed: " + failures + " assertion(s).");
  process.exit(1);
}
console.log("Release checklist mutation tests passed: canonical input accepted and all " + cases.length + " mutations rejected with specific diagnostics.");
