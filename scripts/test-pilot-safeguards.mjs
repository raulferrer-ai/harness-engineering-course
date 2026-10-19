import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const sourceFiles = [
  "scripts/check-pilot-safeguards.mjs",
  "docs/pilot-protocol.md",
  "docs/pilot-participant-information.md",
  "docs/pilot-observation-template.md",
  "docs/pilot-exit-survey.md",
  "docs/pilot-results-report-template.md"
];
const mutations = [
  {
    file: "docs/pilot-protocol.md",
    label: "missing draft-status safeguard",
    mutate: text => text.replace("Propuesta de trabajo; no es un piloto ejecutado", "Piloto aprobado y ejecutado"),
    expected: "falta salvaguarda requerida"
  },
  {
    file: "docs/pilot-protocol.md",
    label: "missing pre-collection approval gate",
    mutate: text => text.replace("antes de recoger datos", "después de recoger datos"),
    expected: "falta salvaguarda requerida"
  },
  {
    file: "docs/pilot-participant-information.md",
    label: "missing retention policy field",
    mutate: text => text.replace("Periodo de conservación y procedimiento de eliminación", "Periodo opcional"),
    expected: "falta salvaguarda requerida"
  },
  {
    file: "docs/pilot-participant-information.md",
    label: "missing voluntary participation safeguard",
    mutate: text => text.replace(/participar es voluntario/giu, "Participar es obligatorio"),
    expected: "falta salvaguarda requerida"
  },
  {
    file: "docs/pilot-participant-information.md",
    label: "forbidden approved-consent claim with altered case and whitespace",
    mutate: text => text + "\nCONSENTIMIENTO   APROBADO\n",
    expected: "afirmación de aprobación no permitida"
  },
  {
    file: "docs/pilot-observation-template.md",
    label: "missing privacy safeguard in observation template",
    mutate: text => text.replace("No incluyas nombres, correo, cuentas ni conversaciones privadas completas.", "Registra las conversaciones completas."),
    expected: "falta salvaguarda requerida"
  },
  {
    file: "docs/pilot-results-report-template.md",
    label: "missing draft-status safeguard in results report",
    mutate: text => text.replace("No contiene resultados ni certifica que se haya realizado un piloto", "Informe de resultados validado"),
    expected: "falta salvaguarda requerida"
  },
  {
    file: "docs/pilot-results-report-template.md",
    label: "missing privacy safeguard in results report",
    mutate: text => text.replace("No incluir nombres, contactos ni datos que permitan identificar participantes.", "Incluir nombres y contactos de participantes."),
    expected: "falta salvaguarda requerida"
  },
  {
    file: "docs/pilot-results-report-template.md",
    label: "missing prerequisite-failure handling in results report",
    mutate: text => text.replace("Si una condición previa no se cumplió", "Aunque no se cumpla ninguna condición previa"),
    expected: "falta salvaguarda requerida"
  },
  {
    file: "docs/pilot-exit-survey.md",
    label: "missing personal-data warning in exit survey",
    mutate: text => text.replace("No incluyas información personal ni datos confidenciales.", "Incluye información personal y datos confidenciales."),
    expected: "falta salvaguarda requerida"
  }
];

const temp = await mkdtemp(join(tmpdir(), "pilot-safeguards-tests-"));
let failures = 0;
function assert(condition, message) {
  if (!condition) {
    failures++;
    console.error("FAIL " + message);
  }
}
async function setup(name) {
  const project = join(temp, name);
  for (const file of sourceFiles) {
    const destination = join(project, file);
    await mkdir(join(destination, ".."), { recursive: true });
    await writeFile(destination, await readFile(join(root, file), "utf8"), "utf8");
  }
  return project;
}
function run(project) {
  return spawnSync(process.execPath, [join(project, "scripts/check-pilot-safeguards.mjs")], {
    cwd: project,
    encoding: "utf8"
  });
}
function expectPass(label, result) {
  const output = result.stdout + result.stderr;
  assert(result.status === 0, label + ": esperaba exit 0\n" + output);
  assert(output.includes("Pilot safeguards check passed"), label + ": falta mensaje de éxito\n" + output);
  if (result.status === 0) console.log("PASS " + label);
}
function expectFail(label, result, expected) {
  const output = result.stdout + result.stderr;
  assert(result.status === 1, label + ": esperaba exit 1\n" + output);
  assert(output.includes(expected), label + ": falta diagnóstico " + JSON.stringify(expected) + "\n" + output);
  if (result.status === 1 && output.includes(expected)) console.log("PASS rechaza " + label);
}

try {
  const canonical = await setup("canonical");
  expectPass("pilot safeguards canonical templates", run(canonical));
  const normalizedRequired = await setup("normalized-required");
  const normalizedPath = join(normalizedRequired, "docs/pilot-protocol.md");
  const normalizedOriginal = await readFile(normalizedPath, "utf8");
  await writeFile(normalizedPath, normalizedOriginal.replace("antes de recoger datos", "ANTES\n  DE   RECOGER\tDATOS"), "utf8");
  expectPass("accepts required safeguard with irregular whitespace and case", run(normalizedRequired));
  for (const [index, testCase] of mutations.entries()) {
    const project = await setup("mutation-" + index);
    const path = join(project, testCase.file);
    const original = await readFile(path, "utf8");
    const mutated = testCase.mutate(original);
    assert(mutated !== original, testCase.label + ": la mutación no alteró el documento");
    await writeFile(path, mutated, "utf8");
    expectFail(testCase.label, run(project), testCase.expected);
  }

  for (const [index, missingFile] of [
    "docs/pilot-participant-information.md",
    "docs/pilot-observation-template.md",
    "docs/pilot-exit-survey.md",
    "docs/pilot-results-report-template.md"
  ].entries()) {
    const missingDocumentProject = await setup("missing-document-" + index);
    await rm(join(missingDocumentProject, missingFile));
    const missingDocumentResult = run(missingDocumentProject);
    expectFail(
      "missing required pilot document: " + missingFile,
      missingDocumentResult,
      "No se pudo leer un documento de salvaguardas del piloto"
    );
  }
} finally {
  await rm(temp, { recursive: true, force: true });
}
if (failures) {
  console.error("Pilot safeguards regression tests failed: " + failures + " assertion(s).");
  process.exit(1);
}
console.log("Pilot safeguards regression tests passed.");
