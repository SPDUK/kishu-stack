import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const assets = resolve(root, "dist/assets");
const stamp = (await readFile(resolve(assets, "kishu-stamp-256.png"))).toString(
  "base64",
);
const font = (
  await readFile(resolve(root, "dist/fonts/bricolage-700.ttf"))
).toString("base64");
for (const [name, background, ink] of [
  ["light", "#f6f3e9", "#192c26"],
  ["dark", "#192c26", "#fff9ec"],
]) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="180" viewBox="0 0 600 180" role="img" aria-label="Kishu: Big ideas. One command."><style>@font-face{font-family:KishuDisplay;src:url(data:font/ttf;base64,${font}) format('truetype')}text{font-family:KishuDisplay,Arial,sans-serif;font-weight:700}</style><rect width="600" height="180" rx="14" fill="${background}"/><image href="data:image/png;base64,${stamp}" x="38" y="20" width="140" height="140"/><text x="196" y="112" font-size="93" letter-spacing="-3" fill="${ink}">kishu<tspan fill="#ed5035">.</tspan></text><text x="202" y="145" font-size="17" fill="${ink}">Big ideas. One command.</text></svg>`;
  await writeFile(resolve(assets, `kishu-readme-${name}.svg`), svg);
}

const docs = resolve(root, "../docs/brand");
await mkdir(docs, { recursive: true });
await copyFile(
  resolve(assets, "kishu-stamp-256.png"),
  resolve(docs, "kishu-stamp.png"),
);
await copyFile(
  resolve(assets, "kishu-readme-light.svg"),
  resolve(docs, "kishu-readme-light.svg"),
);
await copyFile(
  resolve(assets, "kishu-readme-dark.svg"),
  resolve(docs, "kishu-readme-dark.svg"),
);
console.log(
  "Created self-contained README lockups and repository mascot stamp.",
);
