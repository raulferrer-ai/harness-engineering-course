import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const checker = path.join(root, "scripts/check-accessibility-basics.mjs");
const temp = await mkdtemp(path.join(tmpdir(), "a11y-structure-"));
const good = "<!doctype html><html lang=\"es\"><body><header></header><main><h1>Título</h1><img src=\"x.png\" alt=\"Descripción\"></main></body></html>";
const cases = [
  ["accepts basic accessible structure", good, 0, /PASS accessibility structure/],
  ["rejects missing document language", good.replace(' lang="es"', ""), 1, /lang attribute/],
  ["rejects missing main landmark", good.replace("<main>", "<div>").replace("</main>", "</div>"), 1, /main landmark/],
  ["rejects missing h1", good.replace("<h1>Título</h1>", "<h2>Título</h2>"), 1, /exactly one h1/],
  ["rejects image without alt attribute", good.replace(' alt="Descripción"', ""), 1, /missing its alt attribute/],
  ["rejects multiple main landmarks", good.replace("</main>", "</main><main><h1>Otro</h1></main>"), 1, /main landmark/],
  ["rejects empty generated site", null, 1, /no generated HTML pages/]
];
let failures = 0;
try {
  for (let i = 0; i < cases.length; i++) {
    const [label, html, expectedStatus, expectedOutput] = cases[i];
    const site = path.join(temp, String(i));
    await mkdir(site, { recursive: true });
    if (html !== null) await writeFile(path.join(site, "index.html"), html, "utf8");
    const result = spawnSync(process.execPath, [checker], { cwd: root, encoding: "utf8", env: { ...process.env, SITE_DIR: site } });
    const output = result.stdout + result.stderr;
    if (result.status !== expectedStatus || !expectedOutput.test(output)) {
      failures++;
      console.error(`FAIL ${label}: expected exit ${expectedStatus} and / ${expectedOutput.source} /; got exit ${result.status}\\n${output}`);
    } else console.log(`PASS ${label}`);
  }
} finally {
  await rm(temp, { recursive: true, force: true });
}
if (failures) process.exit(1);
console.log(`Accessibility structure regression tests passed: ${cases.length} cases.`);
