import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import process from "node:process";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const labs = [
  {
    id: "LAB-01", env: "LAB01_FIXTURE_PATH", fixture: "fixtures/lab01-cases.json", validator: "scripts/check-lab01-fixtures.mjs",
    cases: [
      ["missing rationale", d => { delete d.cases[0].rationale; }, /falta justificación/],
      ["duplicate case ID", d => { d.cases[1].id = d.cases[0].id; }, /ID vacío o duplicado/],
      ["invalid priority", d => { d.cases[0].expected.priority = "urgent"; }, /prioridad no permitida/]
    ]
  },
  {
    id: "LAB-02", env: "LAB02_FIXTURE_PATH", fixture: "fixtures/lab02-specification.json", validator: "scripts/check-lab02-specification.mjs",
    cases: [
      ["missing source request", d => { delete d.source_request; }, /falta source_request/],
      ["duplicate acceptance criterion ID", d => { d.acceptance_criteria[1].id = d.acceptance_criteria[0].id; }, /ID de criterio vacío o duplicado/],
      ["missing verification evidence", d => { delete d.acceptance_criteria[0].verification; }, /falta verification/]
    ]
  },
  {
    id: "LAB-03", env: "LAB03_FIXTURE_PATH", fixture: "fixtures/lab03-context-experiment.json", validator: "scripts/check-lab03-context-fixture.mjs",
    cases: [
      ["duplicate context variant ID", d => { d.context_variants[1].id = d.context_variants[0].id; }, /ID de variante vacío o duplicado/],
      ["duplicate path in variant", d => { d.context_variants[0].files.push({ ...d.context_variants[0].files[0] }); }, /ruta duplicada/],
      ["missing required source", d => { d.reference_cases[0].required_sources = []; }, /faltan fuentes requeridas/]
    ]
  },
  {
    id: "LAB-04", env: "LAB04_FIXTURE_PATH", fixture: "fixtures/lab04-code-review.json", validator: "scripts/check-lab04-code-review.mjs",
    cases: [
      ["unknown acceptance criterion reference", d => { d.test_matrix[0].criterion = "AC-999"; }, /expectativa vacía o criterio desconocido/],
      ["duplicate test ID", d => { d.test_matrix[1].id = d.test_matrix[0].id; }, /tests: ID vacío o duplicado/],
      ["invalid decision gate", d => { d.decision_gate.default = "ship_it"; }, /decisión inicial no válida/]
    ]
  },
  {
    id: "LAB-05", env: "LAB05_FIXTURE_PATH", fixture: "fixtures/lab05-tool-permissions.json", validator: "scripts/check-lab05-tool-permissions.mjs",
    cases: [
      ["allow by default", d => { d.decision_policy.default = "allow"; }, /la política debe denegar por defecto/],
      ["duplicate tool name", d => { d.tools[1].name = d.tools[0].name; }, /herramientas: valor vacío o duplicado/],
      ["invalid tool risk", d => { d.tools[0].risk = "extreme"; }, /riesgo no válido/]
    ]
  },
  {
    id: "LAB-06", env: "LAB06_FIXTURE_PATH", fixture: "fixtures/lab06-release-gates.json", validator: "scripts/check-lab06-release-gates.mjs",
    cases: [
      ["unknown required evidence", d => { d.gates[0].required = ["EV-999"]; }, /evidencia desconocida EV-999/],
      ["duplicate gate ID", d => { d.gates[1].id = d.gates[0].id; }, /gates: ID vacío o duplicado/],
      ["failed gate does not block", d => { d.gates[0].failure = "warn"; }, /el fallo debe bloquear/]
    ]
  },
  {
    id: "LAB-07", env: "LAB07_FIXTURE_PATH", fixture: "fixtures/lab07-evaluation.json", validator: "scripts/check-lab07-evaluation.mjs",
    cases: [
      ["duplicate rubric ID", d => { d.rubric[1].id = d.rubric[0].id; }, /rúbrica: ID vacío o duplicado/],
      ["invalid score threshold", d => { d.scoring_protocol.pass_threshold_percent = 150; }, /umbral de aprobación debe estar entre 0 y 100/],
      ["fractional rubric score", d => { const dimension = d.rubric[0].dimension; d.scoring_protocol.decision_test_vectors[0].scores[dimension] = 2.5; }, /puntuación para .* debe ser un entero entre 0 y 4/]
    ]
  },
  {
    id: "LAB-08",
    env: "LAB08_FIXTURE_PATH",
    fixture: "fixtures/lab08-security-threats.json",
    validator: "scripts/check-lab08-security-threats.mjs",
    cases: [
      ["missing asset name", d => { delete d.assets[0].name; }, /activo sin nombre o impacto/],
      ["duplicate asset ID", d => { d.assets[1].id = d.assets[0].id; }, /ID vacío o duplicado/],
      ["duplicate asset reference", d => { d.threats[0].asset_ids.push(d.threats[0].asset_ids[0]); }, /asset_ids contiene referencias duplicadas/],
      ["duplicate threat reference", d => { d.test_cases[0].threat_ids.push(d.test_cases[0].threat_ids[0]); }, /threat_ids contiene referencias duplicadas/]
    ]
  },
  {
    id: "LAB-09",
    env: "LAB09_FIXTURE_PATH",
    fixture: "fixtures/lab09-observability-recovery.json",
    validator: "scripts/check-lab09-observability-recovery.mjs",
    cases: [
      ["invalid signal threshold", d => { d.signals[0].threshold.value = "unknown"; }, /umbral inválido/],
      ["rate outside valid range", d => { const signal = d.signals.find(s => /rate$/.test(s.name)); signal.threshold.value = 1.5; }, /una tasa debe expresarse entre 0 y 1/],
      ["rate uses wrong unit", d => { const signal = d.signals.find(s => /rate$/.test(s.name)); signal.unit = "percent"; }, /las tasas deben usar unit=ratio/],
      ["invalid currency code", d => { d.signals.find(s => s.name === "cost_per_accepted_task").currency = "EURO"; }, /debe declarar unidad monetaria por tarea y código de moneda ISO 4217/],
      ["missing audit timestamp", d => { d.audit_fields = d.audit_fields.filter(field => field !== "timestamp"); }, /registro de auditoría insuficiente/],
      ["missing artifact digest audit field", d => { d.audit_fields = d.audit_fields.filter(field => field !== "artifact_digest"); }, /registro de auditoría insuficiente/],
      ["duplicate signal ID", d => { d.signals[1].id = d.signals[0].id; }, /ID vacío o duplicado/],
      ["unknown recovery trigger", d => { d.recovery_steps[0].trigger = "SIG-999"; }, /trigger desconocido/],
      ["recovery marked complete despite failed regression", d => { const scenario = d.scenarios.find(s => /regresi[oó]n/i.test(s.input)); scenario.expected = "se declara recuperación completa aunque la suite de regresión falla"; }, /debe existir un escenario que impida declarar recuperación completa si falla la regresión/]
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

const expectedLabIds = Array.from({ length: 10 }, (_, index) => `LAB-${String(index + 1).padStart(2, "0")}`);
const actualLabIds = labs.map(lab => lab.id);
if (JSON.stringify(actualLabIds) !== JSON.stringify(expectedLabIds)) {
  throw new Error(`Regression suite must cover LAB-01 through LAB-10 in order; got: ${actualLabIds.join(", ")}`);
}
for (const lab of labs) {
  if (lab.cases.length < 3) {
    throw new Error(`${lab.id} must define at least three negative mutations; got ${lab.cases.length}`);
  }
}
for (const field of ["env", "fixture", "validator"]) {
  const values = labs.map(lab => lab[field]);
  if (new Set(values).size !== values.length) {
    throw new Error(`Regression suite contains duplicate ${field} entries`);
  }
}

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
      const diagnosticLines = output.split(/\r?\n/).filter(line => line.trim() && !/^(Validator regression suite|FAIL |PASS )/.test(line));
      const matchingLines = diagnosticLines.filter(line => expected.test(line));
      if (result.status !== 1 || matchingLines.length !== 1) {
        failures++;
        console.error(`FAIL ${lab.id} ${label}: expected exit 1 and exactly one diagnostic matching / ${expected.source} /\nexit=${result.status}; diagnostics=${diagnosticLines.length}; matches=${matchingLines.length}\n${output}`);
      } else {
        console.log(`PASS ${lab.id} rejects ${label} with the expected diagnostic`);
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
const mutationCount = labs.reduce((total, lab) => total + lab.cases.length, 0);
console.log(`Validator regression suite OK: 10 canonical fixtures accepted; ${mutationCount} invalid mutations rejected for the expected reason.`);
