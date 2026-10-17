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
  ["rejects whitespace-only image alt text", good.replace('alt="Descripción"', 'alt="   "'), 1, /alt text must not contain whitespace only/],
  ["rejects entity-encoded whitespace-only image alt text", good.replace('alt="Descripción"', 'alt="&#32;&#x09;&Tab;"'), 1, /alt text must not contain whitespace only/],
  ["accepts empty alt for decorative image", good.replace('alt="Descripción"', 'alt=""'), 0, /PASS accessibility structure/],
  ["rejects multiple main landmarks", good.replace("</main>", "</main><main><h1>Otro</h1></main>"), 1, /main landmark/],
  ["rejects link without accessible name", good.replace("</main>", '<a href="#x"><img src="icon.svg" alt=""></a></main>'), 1, /link has no detectable accessible name/],
  ["accepts icon link with aria-label", good.replace("</main>", '<a href="#x" aria-label="Abrir detalles"><img src="icon.svg" alt=""></a></main>'), 0, /PASS accessibility structure/],
  ["rejects dangling aria-labelledby", good.replace("</main>", '<a href="#x" aria-labelledby="missing-label"><img src="icon.svg" alt=""></a></main>'), 1, /link has no detectable accessible name/],
  ["accepts valid aria-labelledby", good.replace("</main>", '<span id="link-label">Abrir detalles</span><a href="#x" aria-labelledby="link-label"><img src="icon.svg" alt=""></a></main>'), 0, /PASS accessibility structure/],
  ["rejects aria-labelledby pointing to empty element", good.replace("</main>", '<span id="empty-label">   </span><a href="#x" aria-labelledby="empty-label"><img src="icon.svg" alt=""></a></main>'), 1, /link has no detectable accessible name/],
  ["rejects duplicate IDs", good.replace("</main>", '<span id="reused">Uno</span><span id="reused">Dos</span></main>'), 1, /duplicate id attribute value/],
  ["rejects duplicate IDs with unquoted attributes", good.replace("</main>", '<span id=reused>Uno</span><span id=reused>Dos</span></main>'), 1, /duplicate id attribute value/],
  ["accepts aria-labelledby with multiple existing IDs", good.replace("</main>", '<span id="first">Primero</span><span id="second">Segundo</span><a href="#x" aria-labelledby="first second"></a></main>'), 0, /PASS accessibility structure/],
  ["rejects duplicate IDs with single-quoted attributes", good.replace("</main>", "<span id='reused'>Uno</span><span id='reused'>Dos</span></main>"), 1, /duplicate id attribute value/],
  ["accepts case-sensitive distinct IDs", good.replace("</main>", '<span id="Item">Uno</span><span id="item">Dos</span></main>'), 0, /PASS accessibility structure/],
  ["rejects empty ID attribute", good.replace("</main>", '<span id="">Sin ID</span></main>'), 1, /id attribute value must be non-empty/],
  ["rejects ID containing whitespace", good.replace("</main>", '<span id="two words">ID inválido</span></main>'), 1, /id attribute value must be non-empty and contain no whitespace/],
  ["rejects link with whitespace-only text", good.replace("</main>", '<a href="#x">   </a></main>'), 1, /link has no detectable accessible name/],
  ["rejects whitespace-only aria-label on icon link", good.replace("</main>", '<a href="#x" aria-label="   "><img src="icon.svg" alt=""></a></main>'), 1, /link has no detectable accessible name/],
  ["rejects entity-encoded whitespace-only aria-label", good.replace("</main>", '<a href="#x" aria-label="&#32;&Tab;"><img src="icon.svg" alt=""></a></main>'), 1, /link has no detectable accessible name/],
  ["rejects entity-encoded whitespace-only link text", good.replace("</main>", '<a href="#x">&#32;&#x09;&Tab;</a></main>'), 1, /link has no detectable accessible name/],
  ["accepts single-quoted empty alt for decorative image", good.replace('alt="Descripción"', "alt=''"), 0, /PASS accessibility structure/],
  ["rejects aria-labelledby when one of multiple IDs is missing", good.replace("</main>", '<span id="label">Detalles</span><a href="#x" aria-labelledby="label missing-label"><img src="icon.svg" alt=""></a></main>'), 1, /aria-labelledby references missing id/],
  ["rejects dangling aria-labelledby on non-link elements", good.replace("</main>", '<section aria-labelledby="missing-heading"></section></main>'), 1, /aria-labelledby references missing id/],
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
