Kishu includes and adapts these three projects. Their original notices and
licenses are preserved in the generated plugin. Exact revisions are recorded
in upstreams.lock.json.

- pstack, by Lauren Tan. MIT. https://github.com/cursor/plugins/tree/main/pstack
  Bundled under lib/pstack. Kishu changes the router, selected workflows,
  communication, testing, evidence, and host mappings. Original source stays
  available in the upstream checkout; modifications live in overrides/ and
  src/patches.json. Operational Poteto identifiers are renamed to Kishu;
  original external URLs and attribution are preserved.
- Impeccable, by Paul Bakaus. Apache-2.0.
  https://github.com/pbakaus/impeccable
  Bundled under lib/impeccable, including its license and any upstream notices.
  Its skill and runtime scripts are retained; Kishu adds scoped routing and
  a host-permission-preserving setting for live copy editing.
- i-have-adhd, by Ayoub G. MIT. https://github.com/ayghri/i-have-adhd
  The adapted communication guidance is under lib/communication and is
  incorporated into Kishu's router. Its independent startup hooks are not
  activated, avoiding duplicate communication instructions.

Kishu's own additions are MIT licensed. This distribution does not relicense
third-party files. Upstream author names do not imply endorsement of Kishu.

Additional components inherited through Impeccable:

- modern-screenshot, by wxm. MIT. https://github.com/qq15725/modern-screenshot
  The vendored browser capture script is scripts/modern-screenshot.umd.js inside
  Impeccable. Its full copyright and permission notice is included at
  lib/impeccable/third-party-licenses/modern-screenshot-LICENSE.txt.
- platform-design-skills, by ehmo. MIT.
  https://github.com/ehmo/platform-design-skills
  Impeccable's upstream NOTICE.md attributes its iOS and Android guidance to
  this work. The original NOTICE is preserved, with the full license at
  lib/impeccable/third-party-licenses/platform-design-skills-LICENSE.txt.

Standalone exports retain these notices under references/impeccable/ instead
of lib/impeccable/. Source copies of the added license texts are maintained in
src/licenses/impeccable/ in the Kishu repository.
