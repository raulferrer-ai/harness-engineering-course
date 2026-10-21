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
  },
  {
    path: new URL("../docs/pilot-observation-template.md", import.meta.url),
    required: [
      "No incluyas nombres, correo, cuentas ni conversaciones privadas completas",
      "Consentimiento/política comprobados por la persona responsable",
      "Detén la actividad ante exposición de secretos/datos personales"
    ],
    forbidden: ["recoger todas las conversaciones privadas"]
  },
  {
    path: new URL("../docs/pilot-results-report-template.md", import.meta.url),
    required: [
      "No contiene resultados ni certifica que se haya realizado un piloto",
      "Completar solo después de ejecutar el protocolo aprobado",
      "No incluir nombres, contactos ni datos que permitan identificar participantes",
      "Si una condición previa no se cumplió"
    ],
    forbidden: ["Piloto aprobado y ejecutado", "Resultados empíricos confirmados"]
  },
  {
    path: new URL("../docs/pilot-exit-survey.md", import.meta.url),
    required: [
      "responder es voluntario",
      "No incluyas información personal ni datos confidenciales",
      "No pedir nombre, correo, edad exacta, empresa, cuenta de proveedor"
    ],
    forbidden: ["es obligatorio responder todas las preguntas"]
  }
];

const failures = [];
for (const file of files) {
  let content;
  try {
    content = await readFile(file.path, "utf8");
  } catch {
    failures.push(`${file.path.pathname.split("/").pop()}: No se pudo leer un documento de salvaguardas del piloto.`);
    continue;
  }
  const normalizedContent = content.normalize("NFC").toLocaleLowerCase("es").replace(/\s+/gu, " ");
  for (const phrase of file.required) {
    const normalizedPhrase = phrase.normalize("NFC").toLocaleLowerCase("es").replace(/\s+/gu, " ");
    if (!normalizedContent.includes(normalizedPhrase)) failures.push(`${file.path.pathname.split("/").pop()}: falta salvaguarda requerida: ${phrase}`);
  }
  for (const phrase of file.forbidden) {
    const normalizedPhrase = phrase.normalize("NFC").toLocaleLowerCase("es").replace(/\s+/gu, " ");
    if (normalizedContent.includes(normalizedPhrase)) failures.push(`${file.path.pathname.split("/").pop()}: afirmación de aprobación no permitida en una plantilla: ${phrase}`);
  }
}

if (failures.length) {
  console.error("Pilot safeguards check failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}
console.log("Pilot safeguards check passed: draft status, privacy prerequisites, and no-data-before-approval safeguards are present.");
