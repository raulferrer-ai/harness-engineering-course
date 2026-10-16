import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import process from "node:process";

const root = resolve(new URL("..", import.meta.url).pathname);
const labs = [
  {
    id: "LAB-08",
    env: "LAB08_FIXTURE_PATH",
    fixture: "fixtures/lab08-security-threats.json",
    validator: "scripts/check-lab08-security-threats.mjs",
    cases: [
      ["missing asset name", d => { delete d.assets[0].name; }, /activo sin nombre o impacto/],
      ["duplicate asset ID", d => { d.assets[1].id = d.assets[0].id; }, /ID vacío o duplicado/],
      ["broken threat-to-test reference", d => { d.threats[0].test_case_id = "SEC-T999"; }, /test_case_id debe referenciar una prueba existente/]
    ]
  },
  {
    id: "LAB-09",
    env: "LAB09_FIXTURE_PATH",
    fixture: "fixtures/lab09-observability-recovery.json",
    validator: "scripts/check-lab09-observability-recovery.mjs",
    cases: [
      ["invalid signal threshold", d => { d.signals[0].threshold.value = "unknown"; }, /umbral inválido/],
      ["duplicate signal ID", d => { d.signals[1].id = d.signals[0].id; }, /ID vacío o duplicado/],
      ["unknown recovery trigger", d => { d.recovery_steps[0].trigger = "SIG-999"; }, /trigger desconocido/]
    ]
  },
  {
    id: "LAB-10",
    env: "LAB10_FIXTURE_PATH",
    fixture: "fixtures/lab10-productivity-governance.json",
    validator: "scripts/check-lab10-productivity-governance.mjs",
    cases: [
      ["accepted deliveries exceed completed tasks", d => { d.comparison.baseline.accepted_deliveries = d.comparison.baseline.tasks_completed + 1; }, /entregas aceptadas superan tareas completadas/],
      ["duplicate metric ID", d => { d.metrics[1].id = d.metrics[0].id; }, /ID vacío o duplicado/],
      ["broken evidence reference", d => { d.acceptance_criteria[0].evidence = "MET-999"; }, /evidencia referencia un elemento inexistente MET-999/]
    ]
  }
];

const temp = await mkdtemp(join(tmpdir(), "lab-validator-regressions-"));
let failures = 0;
function runValidator(lab, fixturePath) {
  return spawnSync(process.execPath, [join(root, lab.validator)], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, [lab.env]: fixturePath }
  });
}
try {
  for (const lab of labs) {
    const canonicalPath = join(root, lab.fixture);
    const canonical = JSON.parse(await readFile(canonicalPath, "utf8"));
    const positive = runValidator(lab, canonicalPath);
    if (positive.status !== 0) {
      failures++;
      console.error(`FAIL ${lab.id} canonical fixture should pass\n${positive.stdout}${positive.stderr}`);
    } else {
      console.log(`PASS ${lab.id} canonical fixture`);
    }

    for (let i = 0; i < lab.cases.length; i++) {
      const [label, mutate, expected] = lab.cases[i];
      const altered = structuredClone(canonical);
      mutate(altered);
      const fixturePath = join(temp, `${lab.id.toLowerCase()}-${i + 1}.json`);
      await writeFile(fixturePath, JSON.stringify(altered, null, 2) + "\n", "utf8");
      const result = runValidator(lab, fixturePath);
      const output = result.stdout + result.stderr;
      if (result.status !== 1 || !expected.test(output)) {
        failures++;
        console.error(`FAIL ${lab.id} ${label}: expected exit 1 and / ${expected.source} /\nexit=${result.status}\n${output}`);
      } else {
        console.log(`PASS ${lab.id} rejects ${label}`);
      }
    }
  }
} finally {
  await rm(temp, { recursive: true, force: true });
}
if (failures) {
  console.error(`Validator regression suite failed: ${failures} failure(s).`);
  process.exit(1);
}
console.log("Validator regression suite OK: 3 canonical fixtures accepted; 9 invalid mutations rejected for the expected reason.");
