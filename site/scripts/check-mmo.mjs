import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname, sep } from 'node:path';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const ledger = JSON.parse(await readFile(new URL('../mmo/decisions.json', import.meta.url), 'utf8'));
const failures = [];
const checked = new Set();
for (const relative of ['mmo/index.html', 'mmo/styles.css', 'case-studies/mmo.html', 'case-studies/mmo.css']) {
  const path = resolve(root, relative);
  const text = await readFile(path, 'utf8');
  const ids = [...text.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  if (ids.length !== new Set(ids).size) failures.push(`${relative}: duplicate IDs`);
  const references = relative.endsWith('.css')
    ? [...text.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)].map(match => match[1])
    : [
        ...[...text.matchAll(/(?:src|href|poster)="([^"]+)"/g)].map(match => match[1]),
        ...[...text.matchAll(/\bsrcset="([^"]+)"/g)].flatMap(match =>
          match[1].split(',').map(candidate => candidate.trim().split(/\s+/)[0]),
        ),
      ];
  for (const reference of references) {
    if (/^[a-z][a-z0-9+.-]*:/i.test(reference)) continue;
    if (reference.startsWith('/')) { failures.push(`${relative}: nonportable ${reference}`); continue; }
    const [file, fragment] = reference.split('#');
    const target = file ? resolve(dirname(path), file.split('?')[0]) : path;
    if (!target.startsWith(root.endsWith(sep) ? root : root + sep)) { failures.push(`${relative}: escapes dist: ${reference}`); continue; }
    try {
      if (!(await stat(target)).isFile()) throw new Error('not a file');
      checked.add(target);
      if (fragment && target.endsWith('.html')) {
        const targetText = target === path ? text : await readFile(target, 'utf8');
        if (!targetText.includes(`id="${fragment}"`)) failures.push(`${relative}: missing anchor ${reference}`);
      }
    } catch { failures.push(`${relative}: missing ${reference}`); }
  }
}
assert.equal(new Set(ledger.events.map(event => event.id)).size, ledger.events.length, 'Decision IDs must be unique');
const caseHtml = await readFile(resolve(root, 'case-studies/mmo.html'), 'utf8');
assert.ok(!caseHtml.includes('mmo-records/'), 'The public story must not expose the internal record downloads');
const md = await readFile(new URL('../mmo/DECISIONS.md', import.meta.url), 'utf8');
for (const event of ledger.events) {
  for (const key of ['id', 'phase', 'title', 'actor', 'influence', 'tool', 'decision', 'why', 'alternatives', 'outcome']) assert.ok(event[key], `${event.id}: missing ${key}`);
  assert.ok(md.includes(`## ${event.id}. ${event.title}`), `Markdown omits ${event.id}`);
}
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log(`MMO checks passed: ${checked.size} local resources including responsive images; portable paths and anchors; public story has no record downloads; ${ledger.events.length} internal decisions retained.`);
