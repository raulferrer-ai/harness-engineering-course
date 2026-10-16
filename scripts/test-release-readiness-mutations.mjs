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
  ["missing decision section", text => text.replace("## 5. Decisión", "## 5. Resultado"), /falta sección: ## 5\. Decisión/],
  ["missing evidence safeguard", text => text.replace("no inferir éxito", "asumir éxito"), /falta regla o salvaguarda: no inferir éxito/],
  ["missing decision owner", text => text.replace("| Responsable de la decisión |", "| Dueño de la decisión |"), /falta campo en el registro de decisión: Responsable de la decisión/],
  ["missing critical failure policy", text => text.replace("fallo crítico", "incidencia"), /falta regla o salvaguarda: fallo crítico/],
  ["missing release outcome choices", text => text.replace("BLOQUEAR / APROBAR CON CONDICIONES / APROBAR", "PUBLICAR"), /falta regla o salvaguarda: BLOQUEAR \/ APROBAR CON CONDICIONES \/ APROBAR/]
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
try {
  const baselinePath = join(temp, "canonical.md");
  await writeFile(baselinePath, canonical, "utf8");
  const baseline = run(baselinePath);
  if (baseline.status !== 0) {
    failures++;
    console.error("FAIL canonical checklist should pass\n" + baseline.stdout + baseline.stderr);
  } else {
    console.log("PASS canonical checklist");
  }

  for (const [label, mutate, expected] of cases) {
    const fixturePath = join(temp, label.replace(/[^a-z0-9]+/gi, "-") + ".md");
    await writeFile(fixturePath, mutate(canonical), "utf8");
    const result = run(fixturePath);
    const output = result.stdout + result.stderr;
    if (result.status !== 1 || !expected.test(output)) {
      failures++;
      console.error("FAIL " + label + ": expected exit 1 and diagnostic /" + expected.source + "/\nexit=" + result.status + "\n" + output);
    } else {
      console.log("PASS rejects " + label);
    }
  }
} finally {
  await rm(temp, { recursive: true, force: true });
}
if (failures) {
  console.error("Release checklist mutation tests failed: " + failures + " failure(s).");
  process.exit(1);
}
console.log("Release checklist mutation tests passed: canonical input accepted and " + cases.length + " mutations rejected.");
