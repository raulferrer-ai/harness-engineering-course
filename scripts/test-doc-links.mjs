import { cp, mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const checker = join(root, "scripts/check-doc-links.mjs");
const temp = await mkdtemp(join(tmpdir(), "doc-links-tests-"));
let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures++;
    console.error("FAIL " + message);
  }
}
function run(projectRoot) {
  return spawnSync(process.execPath, [join(projectRoot, "scripts/check-doc-links.mjs")], {
    cwd: projectRoot,
    encoding: "utf8"
  });
}
async function fixture(name, files) {
  const project = join(temp, name);
  await mkdir(join(project, "scripts"), { recursive: true });
  await cp(checker, join(project, "scripts/check-doc-links.mjs"));
  for (const [relative, contents] of Object.entries(files)) {
    const destination = join(project, relative);
    await mkdir(join(destination, ".."), { recursive: true });
    await writeFile(destination, contents, "utf8");
  }
  return project;
}
function expectPass(label, result, expected) {
  const output = result.stdout + result.stderr;
  assert(result.status === 0, label + ": esperaba exit 0; salida:\n" + output);
  if (expected) assert(output.includes(expected), label + ": falta salida esperada " + JSON.stringify(expected) + "\n" + output);
  if (result.status === 0) console.log("PASS " + label);
}
function expectFail(label, result, expected) {
  const output = result.stdout + result.stderr;
  assert(result.status === 1, label + ": esperaba exit 1; salida:\n" + output);
  assert(output.includes(expected), label + ": falta diagnóstico " + JSON.stringify(expected) + "\n" + output);
  if (result.status === 1 && output.includes(expected)) console.log("PASS rechaza " + label);
}

try {
  const valid = await fixture("valid", {
    "README.md": "# Inicio\n\n[Guía](docs/guia.md) [Directorio](docs/) [Ancla](#inicio) [Externo](https://example.com)\n",
    "docs/guia.md": "# Guía\n",
    "docs/index.html": "<h1>Docs</h1>\n"
  });
  expectPass("enlaces relativos, directorios y externos", run(valid), "enlaces locales comprobados");

  const encodedPath = await fixture("encoded-path", {
    "README.md": "[Archivo con almohadilla](docs/a%23b.md) [Archivo con interrogación](docs/a%3Fb.md)\n",
    "docs/a#b.md": "# Hash\n",
    "docs/a?b.md": "# Query\n"
  });
  expectPass("rutas con caracteres reservados codificados", run(encodedPath), "enlaces locales comprobados");

  const validAnchors = await fixture("valid-anchors", {
    "README.md": "# Inicio\n\n## Segunda sección\n\n## Repetida\n\n## Repetida\n\n## **Guía** [avanzada](docs/guia.md)\n\n[Segunda sección](#segunda-sección) [Ancla codificada](#segunda-secci%C3%B3n) [Título con enlace](#guía-avanzada) [Repetición](#repetida-1) [ID HTML](docs/guia.md?view=compact#detalle) [Referencia local][inicio]\n\n[inicio]: #inicio\n",
    "docs/guia.md": "# Guía\n\n<section id=\"detalle\">Contenido</section>\n"
  });
  expectPass("anclas Markdown, IDs HTML y referencias locales", run(validAnchors), "enlaces locales comprobados");

  const missingAnchor = await fixture("missing-anchor", {
    "README.md": "# Inicio\n\n[Sección ausente](#no-existe)\n"
  });
  expectFail("ancla inexistente", run(missingAnchor), "ancla no encontrada");

  const setextAnchors = await fixture("setext-anchors", {
    "README.md": "Guía de instalación\\n=====================\\n\\nRequisitos\\n----------\\n\\n[Ir a requisitos](#requisitos) [Ir a guía](#guía-de-instalación)\\n"
  });
  expectPass("anclas de encabezados Setext", run(setextAnchors), "enlaces locales comprobados");

  const commentOnlyAnchor = await fixture("comment-only-anchor", {
    "README.md": '<!-- <section id="solo-comentario"></section> -->\\n\\n[Ancla falsa](#solo-comentario)\\n'
  });
  expectFail("no acepta IDs HTML dentro de comentarios", run(commentOnlyAnchor), "ancla no encontrada");

  const codeOnlyAnchor = await fixture("code-only-anchor", {
    "README.md": "```md\n## Solo en código\n```\n\n[Ancla falsa](#solo-en-codigo)\n"
  });
  expectFail("no acepta encabezados dentro de bloques de código", run(codeOnlyAnchor), "ancla no encontrada");

  const codeOnlyHtmlId = await fixture("code-only-html-id", {
    "README.md": '```html\n<section id="solo-ejemplo"></section>\n```\n\n[ID falso](#solo-ejemplo)\n'
  });
  expectFail("no acepta IDs HTML dentro de bloques de código", run(codeOnlyHtmlId), "ancla no encontrada");

  const missingTargetAnchor = await fixture("missing-target-anchor", {
    "README.md": "[Sección ausente](docs/guia.md#no-existe)\n",
    "docs/guia.md": "# Guía\n"
  });
  expectFail("ancla inexistente en destino", run(missingTargetAnchor), "ancla no encontrada");

  const references = await fixture("references", {
    "README.md": "# Inicio\n\n[Guía][guide] y [ancla][start].\n\n[guide]: docs/guia.md\n[start]: #inicio\n",
    "docs/guia.md": "# Guía\n"
  });
  expectPass("enlaces Markdown de referencia", run(references), "enlaces locales comprobados");

  const collapsedReferences = await fixture("collapsed-references", {
    "README.md": "[Guía]\n\n[Guía]: docs/guia.md\n\nTexto [entre corchetes] y casilla [] sin enlace.\n\n```md\n[Ejemplo][missing]\n```\n",
    "docs/guia.md": "# Guía\n"
  });
  expectPass("referencias abreviadas, corchetes de texto y ejemplos en código", run(collapsedReferences), "enlaces locales comprobados");

  const brokenReference = await fixture("broken-reference", {
    "README.md": "[Guía][missing]\n"
  });
  expectFail("referencia sin definición", run(brokenReference), "definición de enlace Markdown no encontrada");

  const missingReferenceTarget = await fixture("missing-reference-target", {
    "README.md": "[Guía][guide]\n\n[guide]: docs/no-existe.md\n"
  });
  expectFail("destino de referencia inexistente", run(missingReferenceTarget), "enlace local no encontrado");
  const missing = await fixture("missing", {
    "README.md": "[No existe](docs/no-existe.md)\n"
  });
  expectFail("destino local inexistente", run(missing), "enlace local no encontrado");

  const traversal = await fixture("traversal", {
    "README.md": "[Fuera](../secreto.md)\n"
  });
  expectFail("ruta fuera del repositorio", run(traversal), "el enlace sale del repositorio");

  const malformed = await fixture("malformed", {
    "README.md": "[Ruta](docs/%E0%A4%A)\n"
  });
  expectFail("URL local mal codificada", run(malformed), "URL local mal codificada");
} finally {
  await rm(temp, { recursive: true, force: true });
}

if (failures) {
  console.error("Document link checker regression tests failed: " + failures + " assertion(s).");
  process.exit(1);
}
console.log("Document link checker regression tests passed.");
