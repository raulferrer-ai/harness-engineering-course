import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const sourceFiles = [
  "scripts/check-pilot-safeguards.mjs",
  "docs/pilot-protocol.md",
  "docs/pilot-participant-information.md"
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
    mutate: text => text.replace("Participar es voluntario", "Participar es obligatorio"),
    expected: "falta salvaguarda requerida"
  },
  {
    file: "docs/pilot-participant-information.md",
    label: "forbidden approved-consent claim",
    mutate: text => text + "\nConsentimiento aprobado\n",
    expected: "afirmación de aprobación no permitida"
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
  for (const [index, testCase] of mutations.entries()) {
    const project = await setup("mutation-" + index);
    const path = join(project, testCase.file);
    const original = await readFile(path, "utf8");
    const mutated = testCase.mutate(original);
    assert(mutated !== original, testCase.label + ": la mutación no alteró el documento");
    await writeFile(path, mutated, "utf8");
    expectFail(testCase.label, run(project), testCase.expected);
  }

  const missingDocumentProject = await setup("missing-document");
  await rm(join(missingDocumentProject, "docs/pilot-participant-information.md"));
  const missingDocumentResult = run(missingDocumentProject);
  expectFail(
    "missing participant-information document",
    missingDocumentResult,
    "No se pudo leer un documento de salvaguardas del piloto"
  );
} finally {
  await rm(temp, { recursive: true, force: true });
}
if (failures) {
  console.error("Pilot safeguards regression tests failed: " + failures + " assertion(s).");
  process.exit(1);
}
console.log("Pilot safeguards regression tests passed.");
