# Review how Kishu works

Start with the first section. You do not need to review everything in one sitting.

For feedback, use the [interactive review](index.html) or write into [FEEDBACK.md](FEEDBACK.md). Use **Keep / Change / Ask first / Only on request / Remove / Unsure**. A short note is enough. Untouched items remain unreviewed. Nothing is applied automatically.

This plan is generated; keep your notes in the page or FEEDBACK.md so rebuilding the catalog cannot overwrite them.

**The main finding:** the selected multi-phase planning workflow still requires ten live verification lanes and review of interaction changes. Its performance section accepts `Not applicable.` with a specific reason and no performance boxes. When performance verification applies, use a credible concern, existing requirement, or actual platform constraint and grounded acceptance criteria. Numeric caps are not universal defaults. Other performance guidance checks measurement quality or governs optional optimization work.

## 1. Performance & hidden requirements

When should measurement help a decision, and when does it become unnecessary work?

### Ten live lanes remain; performance checks depend on the change

**Type:** Enforced when invoked

**What it means:** The selected multi-phase planner requires unit verification, exactly ten numbered live lanes, and review of interaction changes. Its performance block accepts Not applicable. with a specific reason and no boxes. Applicable performance verification retains its named boxes and uses a credible concern, existing requirement, or actual platform constraint.

**Effect on your work:** The executable checker enforces the explained performance exemption as well as the remaining live and review gates. A plan can still be rejected for missing mandatory lanes or review evidence. This workflow does not apply automatically to every chat, and it does not impose universal numeric performance caps.

**Consider:** Review whether ten live lanes suit the long-running work you select. Keep performance verification tied to the actual change, explain non-applicability, and derive numeric criteria from a relevant requirement, constraint, or agreed target.

[Read exact instructions and leave feedback](index.html#R-268ec226b9c9). Topic ID: `plan-gates`.

Evidence: [R-268ec226b9c9](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/multi-phase-plan.md#L13), [R-c4cdfd6336ba](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/scripts/check-plan.mjs#L156), [R-64d7a723e506](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/scripts/check-plan.mjs#L5), [R-bc460826d2ac](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/scripts/check-plan.mjs#L169).

### The benchmark checklist checks measurement quality

**Type:** Conditional guidance

**What it means:** The benchmark checklist checks tuning, errors, whether work really ran, noise, bottlenecks, and end-to-end relevance. A full comparison asks for at least five alternating runs per side.

**Effect on your work:** There is no universal millisecond or throughput limit here. The procedure can still be excessive for a modest question. A requested ballpark already has a one-run exception.

**Consider:** Keep honest measurement. Review when the full procedure is justified, and whether lighter evidence can support appropriately qualified claims.

[Read exact instructions and leave feedback](index.html#R-6e98e34e60f6). Topic ID: `benchmark-inspection`.

Evidence: [R-6e98e34e60f6](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/benchmark-checklist/SKILL.md#L11), [R-a48ea4822f74](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/benchmark-checklist/SKILL.md#L25), [R-6c3c740b85c8](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/benchmark-checklist/SKILL.md#L33).

### Do we always need to explain the bottleneck?

**Type:** Conditional guidance

**What it means:** Explain the Number asks for a decision threshold, noise floor, and a measured limiter before trusting a result.

**Effect on your work:** This protects against false speedup claims. Read literally, it can also prevent a useful qualified observation until a deeper profiling exercise is complete.

**Consider:** Distinguish a measured observation from a causal explanation or an adoption recommendation. Decide what evidence each claim needs.

[Read exact instructions and leave feedback](index.html#R-a306a1052533). Topic ID: `measurement-limiter`.

Evidence: [R-a306a1052533](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-explain-the-number/SKILL.md#L10), [R-644d2d2d80a0](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-explain-the-number/SKILL.md#L9).

### Stop optimizing once the chosen target is met

**Type:** Conditional guidance

**What it means:** The performance-fix playbook tries eliminating unused work, reuse, less work, deferral, concurrency, then cheaper work. It stops once an earlier option meets the target.

**Effect on your work:** This is generally an anti-overoptimization rule. The important question is who chose the target; it should not become a silent ceiling on a stronger user request.

**Consider:** Keep the ordering as a heuristic, with the target grounded in the user's request or a stated assumption.

[Read exact instructions and leave feedback](index.html#R-2700c826767c). Topic ID: `perf-target`.

Evidence: [R-2700c826767c](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/perf-issue.md#L16), [R-01ed75c24129](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/perf-issue.md#L6).

### Optimization loops can require a minimum number of attempts

**Type:** Optional workflow

**What it means:** Hillclimb pairs its metric target with an attempt floor. Its example is 50% improvement and ten iterations, not a global setting.

**Effect on your work:** This applies when sustained optimization is selected. It can keep running after an early success; later wording also permits stopping when ideas no longer earn their cost.

**Consider:** Make the floor, target, and stopping tradeoff explicit when starting a sustained run. Do not infer this workflow from an ordinary feature request.

[Read exact instructions and leave feedback](index.html#R-4ef0eddbd757). Topic ID: `hillclimb-floor`.

Evidence: [R-4ef0eddbd757](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/hillclimb.md#L7), [R-3227377b1daf](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/hillclimb.md#L18).

### Statechart has actual exploration and drawing limits

**Type:** Enforced when invoked

**What it means:** The tool draws a full graph only up to 500 states. Follow-up checking runs after the first broken rule stop at 100,000 distinct states. The initial check is a different case.

**Effect on your work:** These limit the optional model-checking tool, not the size or performance of software Kishu may build. Unchecked rules must be reported; they do not count as passing.

**Consider:** Keep the distinction between drawing and proof visible. If this tool matters to your work, consider configurable limits and a cost decision before bigger runs.

[Read exact instructions and leave feedback](index.html#R-a77e544cae7e). Topic ID: `statechart-limits`.

Evidence: [R-a77e544cae7e](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/ir.ts#L137), [R-ef53ac2ea5ac](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/ir.ts#L139), [R-183db4a452b6](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/SKILL.md#L69), [R-97a03fa14f47](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/SKILL.md#L74).

## 2. Scope & how much work to do

These rules shape whether an agent solves the task directly, adds tools, or expands the change.

### Build a tool even for one-off nontrivial work

**Type:** Inherited preference

**What it means:** Build the Lever defaults to a script, generator, codemod, or delegate skill whenever work is not trivial. It explicitly says repetition is not required.

**Effect on your work:** A rerunnable tool can be valuable proof. Making one compulsory can add maintenance and time when a direct edit plus existing checks would be sufficient.

**Consider:** Consider a benefit-based trigger: repeated work, meaningful error risk, or proof that needs to be rerun. Keep the option for one-off work without requiring it.

[Read exact instructions and leave feedback](index.html#R-32b16a0e781f). Topic ID: `lever-everywhere`.

Evidence: [R-32b16a0e781f](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-build-the-lever/SKILL.md#L12), [R-2f19a87b724f](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-build-the-lever/SKILL.md#L21).

### Fewer polished features must not erase requested capability

**Type:** Inherited preference

**What it means:** Experience First favors fewer polished features; Subtract Before You Add prefers removal before construction.

**Effect on your work:** These are useful product heuristics. Taken as authority to reduce the brief or clean unrelated code, they conflict with Kishu's scope preservation.

**Consider:** Use these principles to discuss tradeoffs, while delivering the agreed capability and asking about material scope changes.

[Read exact instructions and leave feedback](index.html#R-efea760b54ab). Topic ID: `capability-vs-polish`.

Evidence: [R-efea760b54ab](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-experience-first/SKILL.md#L12), [R-2e0d8488101c](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-subtract-before-you-add/SKILL.md#L13), [R-5e5638edf544](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/SKILL.md#L18).

### Autonomy must preserve the user's gates and scope

**Type:** Kishu override

**What it means:** Kishu restricts side discoveries to necessary authorized work and preserves the expensive-test decision gate. Its router removes automatic security audits, comment deletion, PRs, and unrelated skill repair.

**Effect on your work:** The inherited Never Block on the Human principle is subordinate to these exceptions and host permissions. A reversible action alone is not unlimited authority.

**Consider:** Likely keep. Review the exact cases where you want a decision versus an autonomous assumption.

[Read exact instructions and leave feedback](index.html#R-e2ec9c2b24e1). Topic ID: `scope-and-gates`.

Evidence: [R-e2ec9c2b24e1](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/autonomous-run.md#L9), [R-b95057a0b051](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-never-block-on-the-human/SKILL.md#L11).

## 3. Code design & maintainability

Useful engineering instincts, with a few strong opinions worth making explicit.

### Selecting Architect still means at least two designs

**Type:** Optional workflow

**What it means:** Kishu removed the rule that crossing a function boundary automatically activates Architect. Inside Architect, two structurally distinct candidates are still required.

**Effect on your work:** The outer trigger is lighter, but the selected workflow can still spend multiple model runs on an otherwise settled design.

**Consider:** Decide whether two candidates should be mandatory only when competing approaches are genuinely unresolved or when the user asks for comparison.

[Read exact instructions and leave feedback](index.html#R-e6d59d9ea61f). Topic ID: `architecture-minimum`.

Evidence: [R-e6d59d9ea61f](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/architect/SKILL.md#L33), [R-2552d7d56acd](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/SKILL.md#L15), [R-324ca3cdc3f9](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-exhaust-the-design-space/SKILL.md#L1).

### Smallest change and first-principles redesign can pull apart

**Type:** Preference tension

**What it means:** One principle minimizes the diff; another says to redesign around a new requirement as if it were foundational from day one.

**Effect on your work:** Both are useful lenses. An agent can over-refactor if it treats redesign as an instruction to rewrite rather than a way to evaluate the needed change.

**Consider:** Clarify that thinking broadly does not authorize broad edits. Expand implementation scope when the requirement or demonstrated defect needs it.

[Read exact instructions and leave feedback](index.html#R-ed31fdb765b3). Topic ID: `redesign-vs-small-diff`.

Evidence: [R-ed31fdb765b3](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-redesign-from-first-principles/SKILL.md#L9), [R-5139915a4913](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-laziness-protocol/SKILL.md#L10).

### Trust internal types unconditionally

**Type:** Inherited preference

**What it means:** Boundary Discipline centralizes validation at inputs and treats internal validation as redundant.

**Effect on your work:** This can simplify well-typed pure code. Dynamic inputs, persisted corruption, concurrency, and mixed-language boundaries need more care than a literal unconditional rule permits.

**Consider:** Keep boundary validation as the default while allowing checks that protect a real invariant or trust boundary. Avoid adding defensive checks without a concrete failure mode.

[Read exact instructions and leave feedback](index.html#R-814cb48dd04a). Topic ID: `internal-validation`.

Evidence: [R-814cb48dd04a](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-boundary-discipline/SKILL.md#L9), [R-6b0351ee6b84](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-boundary-discipline/SKILL.md#L33).

### Some TypeScript rules are stronger than common project conventions

**Type:** Language-specific preference

**What it means:** The skill favors branded primitives, no unchecked casts, object arguments, running real dependencies, and structured logging.

**Effect on your work:** These can improve correctness, but need repository and hot-path context. They are not constraints imposed by TypeScript itself.

**Consider:** Review the individual table rows. Preserve useful exceptions and project conventions rather than replacing the entire rule set.

[Read exact instructions and leave feedback](index.html#R-3ecc6cae3e36). Topic ID: `typescript-opinions`.

Evidence: [R-3ecc6cae3e36](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/typescript-best-practices/SKILL.md#L27), [R-8ad9fffd76d4](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/typescript-best-practices/SKILL.md#L20), [R-1a91dfe8912e](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/typescript-best-practices/SKILL.md#L28), [R-0cfc608599e5](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/typescript-best-practices/SKILL.md#L29).

### The optional comment reviewer has a strong deletion bias

**Type:** Optional workflow

**What it means:** Comment Sicko keeps only specific exceptions, deletes uncertain comments, and flags internal surprises for code redesign.

**Effect on your work:** Kishu stopped running it before every review. If selected, it can still turn a comment cleanup into pressure for a refactor. Legal headers and public API contracts are explicit exceptions.

**Consider:** Consider retaining useful non-obvious rationale and requiring concrete value before restructuring code. Or keep this specialist explicitly opt-in with its current personality.

[Read exact instructions and leave feedback](index.html#R-115b47fa6a00). Topic ID: `comment-removal`.

Evidence: [R-115b47fa6a00](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/agents/comment-sicko.md#L22), [R-d68eae112754](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/no-comments/SKILL.md#L20), [R-5e5638edf544](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/SKILL.md#L18).

## 4. Tests & visible proof

Keep quality high while matching verification to the behavior and its risk.

### Kishu already replaces automatic expensive-test skipping

**Type:** Kishu override

**What it means:** Test logic that could regress, reuse sufficient coverage, run affected checks, and ask when useful coverage has substantial setup, runtime, service, or maintenance cost.

**Effect on your work:** A declined or unavailable test remains a visible coverage gap. This policy intentionally replaces the upstream cheap-test-only bias.

**Consider:** Likely keep. Review the meaning of substantial cost and what an estimate should include, without adding a fixed budget that silently makes the decision for you.

[Read exact instructions and leave feedback](index.html#R-d5df73cfda40). Topic ID: `kishu-tests`.

Evidence: [R-d5df73cfda40](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/tdd/SKILL.md#L14), [R-21a51dcf0c4d](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/tdd/SKILL.md#L16), [R-117fe2c9fe11](https://github.com/cursor/plugins/blob/ae5650febf4320793844c12c4adaa937f417f8da/pstack/skills/tdd/SKILL.md#L1), [R-e7bd6aa230a6](https://github.com/cursor/plugins/blob/ae5650febf4320793844c12c4adaa937f417f8da/pstack/skills/tdd/SKILL.md#L26).

### Evidence should match the claim and can be reused

**Type:** Kishu override

**What it means:** Visual changes get inspected rendered evidence where possible; APIs get actual calls and responses; logic gets executed checks. Evidence is rerun when invalidated, not merely on the next message.

**Effect on your work:** This adds useful proof without making every task produce screenshots, videos, benchmarks, and a report. It does not substitute a screenshot for meaningful tests.

**Consider:** Likely keep. Review any workflow that separately reimposes a larger evidence package regardless of the change.

[Read exact instructions and leave feedback](index.html#R-a2a8fb0e139a). Topic ID: `kishu-proof`.

Evidence: [R-a2a8fb0e139a](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-prove-it-works/SKILL.md#L10), [R-38c01ae5aebf](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-prove-it-works/SKILL.md#L12).

### Migration and verification principles need compatible boundaries

**Type:** Preference tension

**What it means:** Outcome-Oriented Execution allows planned intermediate breakage; Sequence Verifiable Units says not to advance until a unit is green and prescribes trunk-first sequencing.

**Effect on your work:** They can coexist if the verifiable unit is an agreed migration phase. A literal per-edit interpretation can create unnecessary compatibility scaffolding or repeated checks.

**Consider:** Define meaningful verification boundaries for the task, preserve useful checks, and leave commit/rebase mechanics to the actual delivery workflow.

[Read exact instructions and leave feedback](index.html#R-9cef3d9624d4). Topic ID: `migration-sequencing`.

Evidence: [R-9cef3d9624d4](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-outcome-oriented-execution/SKILL.md#L15), [R-89e7b8d4f4ab](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-sequence-verifiable-units/SKILL.md#L13).

## 5. Models, agents & budgets

These influence how the work is carried out, not what your software is allowed to do.

### Configured model roles do not change the main chat model

**Type:** Kishu override

**What it means:** Kishu resolves user/project configuration, checks available models, passes effort separately in Codex, and inherits the parent where appropriate.

**Effect on your work:** Upstream leaf skills still mention their bundled model defaults and cross-family panels. Kishu's router and adapters govern them; an unavailable family must be disclosed, not invented.

**Consider:** Keep capability-aware selection. Review any per-role cost policy separately from the software's performance. Your private local model file is not copied into this shareable catalog.

[Read exact instructions and leave feedback](index.html#R-59cc76650833). Topic ID: `models-and-delegation`.

Evidence: [R-59cc76650833](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/SKILL.md#L45), [R-2b7f04b637de](https://github.com/SPDUK/kishu-stack/blob/main/src/adapters/codex.md#L7), [R-c26340a242c0](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/arena/SKILL.md#L28).

### Phase and turn budgets should organize work, not shrink the goal

**Type:** Inherited preference

**What it means:** Guard the Context Window explicitly suggests limiting files per phase, setting turn budgets, and accounting for mechanism costs.

**Effect on your work:** This manages the agent's working context. It is not a stated performance limit on your software or a reason to silently omit requirements.

**Consider:** Keep phased execution and compact context. Make any reduction in scope or meaningful quality/cost tradeoff explicit.

[Read exact instructions and leave feedback](index.html#R-52bd47a487a9). Topic ID: `context-budgets`.

Evidence: [R-52bd47a487a9](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-guard-the-context-window/SKILL.md#L12).

## 6. Delivery & optional automation

PR monitoring and issue automation have operational defaults of their own.

### PR watching has configurable operational defaults

**Type:** Enforced when invoked

**What it means:** The watcher defaults to 60-second polling, 300-second stack sweeps, no timeout, and a five-consecutive-query-error budget.

**Effect on your work:** These control an optional watcher, not the build quality or feature scope. Query-error exhaustion is a tool failure to report, not evidence that a PR passed.

**Consider:** Probably keep as visible command options; tune them when a specific monitoring task needs it.

[Read exact instructions and leave feedback](index.html#R-7e63f8b054a3). Topic ID: `watcher-limits`.

Evidence: [R-7e63f8b054a3](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/scripts/watch-pr/cli.ts#L1).

### Benny's time budgets belong to a separate optional automation

**Type:** Optional automation

**What it means:** The bundled Benny example contains triage, reproduction, fixing, follow-up, and artifact-retention budgets.

**Effect on your work:** These are configuration examples for that issue automation. Merely including pstack does not schedule Benny or activate its budgets in every Kishu chat.

**Consider:** Leave this out of ordinary-work defaults. Review its settings if you decide to configure the automation.

[Read exact instructions and leave feedback](index.html#R-72ec33493308). Topic ID: `optional-benny`.

Evidence: [R-72ec33493308](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/automations/benny/templates/configuration.example.yaml#L70).

## 7. Everything else, at your pace

The full inventory includes principles, ordinary build workflows, investigation, long-running programs, setup/update, references, and executable checks. You can leave feedback on any source block.

Use the [source inventory](INVENTORY.md) to pick a topic, or search **All instructions** in the [review page](index.html). Each source has a purpose, scope, version label, and exact text. The coverage tab records every included and excluded upstream file.

## After your feedback

1. Export feedback from the page, or save FEEDBACK.md, and give it back to Codex.
2. Resolve any ambiguous notes into specific edits. Keep decisions that you marked Keep; do not interpret silence as approval to change a rule.
3. Update the responsible router, leaf skill, or executable together. A prose override alone cannot relax a hardcoded checker.
4. Check representative behavior: a small edit, a logic change needing tests, an expensive-test decision, a performance request, and an explicitly rigorous long-running task.
5. Show the resulting diff and proof before reporting the revision complete. Publish or install it only under the applicable authorization.

Snapshot: Kishu 0.1.5; source-content SHA-256 4096d29bf19177e4df97d8879aafb03b9df2f0cb8cb03c870459a5fa7f1a298a; pstack ae5650febf4320793844c12c4adaa937f417f8da. Kishu links open current main; exact captured text and hashes are retained in the review. Impeccable and the ADHD communication policy are outside this review.
