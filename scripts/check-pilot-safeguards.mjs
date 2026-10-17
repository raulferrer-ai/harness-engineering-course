import { readFile } from "node:fs/promises";

const files = [
  {
    path: new URL("../docs/pilot-protocol.md", import.meta.url),
    required: [
      "Propuesta de trabajo; no es un piloto ejecutado",
      "antes de recoger datos",
      "Si una condición crítica no se cumple",
      "entorno limpio"
    ],
    forbidden: ["Piloto aprobado y ejecutado", "Resultados empíricos confirmados"]
  },
  {
    path: new URL("../docs/pilot-participant-information.md", import.meta.url),
    required: [
      "plantilla sin aprobar",
      "No iniciar la recogida de datos mientras estos campos sigan vacíos",
      "Finalidad exacta y base aplicable",
      "Periodo de conservación y procedimiento de eliminación",
      "Participar es voluntario"
    ],
    forbidden: ["Aviso de privacidad aprobado", "Consentimiento aprobado"]
  }
];

const failures = [];
for (const file of files) {
  let content;
  try {
    content = await readFile(file.path, "utf8");
  } catch {
    failures.push("No se pudo leer un documento de salvaguardas del piloto.");
    continue;
  }
  for (const phrase of file.required) {
    if (!content.includes(phrase)) failures.push(`${file.path.pathname.split("/").pop()}: falta salvaguarda requerida: ${phrase}`);
  }
  for (const phrase of file.forbidden) {
    if (content.includes(phrase)) failures.push(`${file.path.pathname.split("/").pop()}: afirmación de aprobación no permitida en una plantilla: ${phrase}`);
  }
}

if (failures.length) {
  console.error("Pilot safeguards check failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}
console.log("Pilot safeguards check passed: draft status, privacy prerequisites, and no-data-before-approval safeguards are present.");
