import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const source = fileURLToPath(new URL('../mmo/', import.meta.url));
const ledger = JSON.parse(await readFile(resolve(source, 'decisions.json'), 'utf8'));
const markdown = `# ${ledger.title}\n\nSession date: ${ledger.sessionDate}.\n\n${ledger.scope}\n\nReference: ${ledger.reference}\n\n` + ledger.events.map(event => `## ${event.id}. ${event.title}\n\n- **Stage:** ${event.phase}\n- **Decision maker:** ${event.actor}\n- **Guidance:** ${event.influence}\n- **Executor:** ${event.tool}\n${event.requestedModel ? `- **Requested model:** ${event.requestedModel}; reasoning effort ${event.reasoningEffort}.\n` : ''}- **Historical outcome:** ${event.outcome}\n\n**Choice:** ${event.decision}\n\n**Why:** ${event.why}\n\n**Tradeoff / boundary:** ${event.alternatives}\n\n**Evidence:** ${event.evidence.join('; ')}\n`).join('\n');
await writeFile(resolve(source, 'DECISIONS.md'), markdown);
console.log('Updated the internal decision log. The public story is maintained in its HTML.');
