import { readFile, readdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, relative, resolve, sep } from "node:path";
import { site } from "../discovery.config.mjs";
const root = fileURLToPath(new URL("../dist/", import.meta.url));
const documents = new Map();
async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    else if (/\.(html|css)$/.test(entry.name)) documents.set(path, await readFile(path, "utf8"));
  }
}
await collect(root);
const failures = [];
const checked = new Set();
for (const [path, text] of documents) {
  const label = relative(root, path);
  const html = path.endsWith(".html");
  if (html) {
    const ids = [...text.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    if (ids.length !== new Set(ids).size) failures.push(`${label}: duplicate IDs`);
  }
  const targets = html
    ? [...text.matchAll(/(?:src|href|poster)="([^"]+)"/g)].map(match => match[1]).concat(
        [...text.matchAll(/\bsrcset="([^"]+)"/g)].flatMap(match => match[1].split(",").map(candidate => candidate.trim().split(/\s+/)[0])),
      )
    : [...text.matchAll(/url\(["']?([^"')\s]+)["']?\)/g)].map(match => match[1]);
  if (path === resolve(root, "index.html")) targets.push(site.image);
  for (const reference of new Set(targets)) {
    if (/^[a-z][a-z0-9+.-]*:/i.test(reference)) continue;
    const [file, fragment] = reference.split("#");
    let target = file ? resolve(dirname(path), file.split("?")[0]) : path;
    if (reference.startsWith("/") || !target.startsWith(root.endsWith(sep) ? root : root + sep)) {
      failures.push(`${label}: nonportable ${reference}`);
      continue;
    }
    try {
      if ((await stat(target)).isDirectory()) target = resolve(target, "index.html");
      if (!(await stat(target)).isFile()) throw new Error("not a file");
      checked.add(target);
      if (fragment && target.endsWith(".html")) {
        const targetText = documents.get(target) ?? await readFile(target, "utf8");
        if (!targetText.includes(`id="${fragment}"`)) failures.push(`${label}: missing anchor ${reference}`);
      }
    } catch {
      failures.push(`${label}: missing ${reference}`);
    }
  }
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `Site check passed: ${documents.size} HTML/CSS files and ${checked.size} local resources; portable project paths, valid anchors, unique IDs.`,
  );
