# Kishu preference review

Open [the review page](index.html) in your browser. It is self-contained and works offline. Start with the seven guided sections; use **All instructions** to search any included source block.

For each instruction, choose **Keep**, **Change**, **Ask first**, **Only on request**, **Remove**, or **Unsure**, and write any feedback. A note alone is fine. Unreviewed is the default and does not imply approval. Feedback does not edit or activate any preferences.

**Export feedback** creates a readable `kishu-feedback.md` to hand back to Codex. **Save backup** creates JSON that can be imported later. Browser storage saves locally, tied to that browser and address; keep a backup before moving the file or switching browsers. If storage fails, the page displays a warning. Changed or conflicting imports are preserved for reconciliation rather than silently replacing current notes.

For a document workflow, read [the review plan](REVIEW.md) and write into [FEEDBACK.md](FEEDBACK.md). The [source inventory](INVENTORY.md) explains each included file. The page's **Sources & coverage** tab also lists every excluded upstream file and its reason.

This is a snapshot of the pinned pstack revision and Kishu 0.1.4. It includes software-related principles, workflows, agent briefs, supporting references, optional automation, executable tools, and Kishu's own routing/setup/update changes. Communication-only skills, the ADHD policy, and Impeccable's design system are outside scope. User/project/host instructions still outrank Kishu. Private local model choices and unrelated installed plugins are not embedded.

The snapshot is identified by its source-content hash, so committing the generated files does not make them stale. Exact text and per-source hashes are embedded. Kishu's GitHub links open current `main`; upstream links use the pinned revision. File ordering is stable across Windows and Linux.

The current multi-phase planner permits an explained `Not applicable.` performance block with no performance boxes. Its ten live verification lanes and interaction-review gates remain. The original [browser verification record](VERIFICATION.md) describes the 0.1.2 review; it is historical evidence, not a browser check of this refreshed snapshot.

The plain-English notes are editorial interpretations. The exact captured text and source links let you check those interpretations. “Source blocks” are paragraphs, list items, table rows, metadata, or code blocks; they are not a count of distinct policies. Some contain several clauses. Current, replaced, and reference-only versions are labeled separately. Tool code is included because it can enforce a requirement that prose alone cannot override.

To regenerate after a Kishu build, from the repository root:

```powershell
python tools/preference-review/build.py
python tools/preference-review/build.py --check
python -m unittest discover -s tools/preference-review -p 'test_*.py'
node --test tools/preference-review/test-review.cjs
```

The builder reads the local pinned upstream and generated plugin; it does not fetch updates or modify instructions. It inventories every upstream file, records exclusions, and accounts for every nonblank nonheading line in included instruction files. Stable content-based IDs preserve unchanged feedback; changed blocks are not silently treated as reviewed. The review tooling lives outside the plugin and adds no runtime prompt or token overhead.

Upstream content retains its project attribution. See [third-party notices](../../THIRD_PARTY_NOTICES.md) and the bundled pstack [license](../../plugin/lib/pstack/LICENSE).
