# Source inventory

Use this as a topic index. Exact wording and feedback controls are in the [review page](index.html). Current sources remain conditional on the task and Kishu's precedence rules. Original replacements and upstream reference documentation are labeled explicitly.

## Architecture

### Compare designs before implementation

**current · Kishu override · When selected or relevant**

Sketch interfaces and ownership, compare alternatives, then implement. Kishu limits entry to consequential unresolved choices; the selected workflow still contains a two-design minimum.

[Read and review](index.html#R-21a77e1850e0) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/architect/SKILL.md)

Source: `plugin/lib/pstack/skills/architect/SKILL.md`. Edit owner: `src/patches.json`.

### Compare designs before implementation · design red flags

**current · Inherited pstack · When selected or relevant**

Sketch interfaces and ownership, compare alternatives, then implement. Kishu limits entry to consequential unresolved choices; the selected workflow still contains a two-design minimum.

[Read and review](index.html#R-020a72f7a322) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/architect/references/design-red-flags.md)

Source: `plugin/lib/pstack/skills/architect/references/design-red-flags.md`. Edit owner: `upstream/pstack/pstack/skills/architect/references/design-red-flags.md`.

### Compare designs before implementation · rationale template

**current · Inherited pstack · When selected or relevant**

Sketch interfaces and ownership, compare alternatives, then implement. Kishu limits entry to consequential unresolved choices; the selected workflow still contains a two-design minimum.

[Read and review](index.html#R-1cde774c0aff) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/architect/references/rationale-template.md)

Source: `plugin/lib/pstack/skills/architect/references/rationale-template.md`. Edit owner: `upstream/pstack/pstack/skills/architect/references/rationale-template.md`.

### Compare designs before implementation · runner prompt

**current · Inherited pstack · When selected or relevant**

Sketch interfaces and ownership, compare alternatives, then implement. Kishu limits entry to consequential unresolved choices; the selected workflow still contains a two-design minimum.

[Read and review](index.html#R-f71a099769ed) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/architect/references/runner-prompt.md)

Source: `plugin/lib/pstack/skills/architect/references/runner-prompt.md`. Edit owner: `upstream/pstack/pstack/skills/architect/references/runner-prompt.md`.

### Compare designs before implementation · original upstream

**replaced · Original pstack · Historical comparison**

Original before Kishu's replacement or patch. Read the current version beside it; the original is not an additional active instruction. Sketch interfaces and ownership, compare alternatives, then implement. Kishu limits entry to consequential unresolved choices; the selected workflow still contains a two-design minimum.

[Read and review](index.html#R-9f080830c016) · [Source on GitHub](https://github.com/cursor/plugins/blob/ae5650febf4320793844c12c4adaa937f417f8da/pstack/skills/architect/SKILL.md)

Source: `upstream/pstack/pstack/skills/architect/SKILL.md`. Edit owner: `src/patches.json`.

## Build workflows

### Add or change behavior

**current · Kishu override · When selected or relevant**

Kishu grounds the change, chooses a useful design approach, implements directly or with useful delegation, tests relevant logic, and supplies proof.

[Read and review](index.html#R-6ad3eb725f16) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/feature.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/feature.md`. Edit owner: `overrides/pstack/skills/poteto-mode/playbooks/feature.md`.

### Change structure while preserving behavior

**current · Kishu override · When selected or relevant**

Kishu reuses sufficient investigation and tests, limits scope, and verifies behavior. It does not mandate a second architecture competition or a PR for every refactor.

[Read and review](index.html#R-cd51c4144a16) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/refactoring.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/refactoring.md`. Edit owner: `overrides/pstack/skills/poteto-mode/playbooks/refactoring.md`.

### Reproduce and fix a defect

**current · Kishu override · When selected or relevant**

Kishu reproduces on the relevant surface, traces the cause, adds useful regression coverage, and verifies the fix. Expensive tests require a decision, not silent skipping.

[Read and review](index.html#R-2bf98c2cf921) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/bug-fix.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/bug-fix.md`. Edit owner: `overrides/pstack/skills/poteto-mode/playbooks/bug-fix.md`.

### Add or change behavior · original upstream

**replaced · Original pstack · Historical comparison**

Original before Kishu's replacement or patch. Read the current version beside it; the original is not an additional active instruction. Kishu grounds the change, chooses a useful design approach, implements directly or with useful delegation, tests relevant logic, and supplies proof.

[Read and review](index.html#R-557b4eccbc30) · [Source on GitHub](https://github.com/cursor/plugins/blob/ae5650febf4320793844c12c4adaa937f417f8da/pstack/skills/poteto-mode/playbooks/feature.md)

Source: `upstream/pstack/pstack/skills/poteto-mode/playbooks/feature.md`. Edit owner: `overrides/pstack/skills/poteto-mode/playbooks/feature.md`.

### Change structure while preserving behavior · original upstream

**replaced · Original pstack · Historical comparison**

Original before Kishu's replacement or patch. Read the current version beside it; the original is not an additional active instruction. Kishu reuses sufficient investigation and tests, limits scope, and verifies behavior. It does not mandate a second architecture competition or a PR for every refactor.

[Read and review](index.html#R-801e61a3057e) · [Source on GitHub](https://github.com/cursor/plugins/blob/ae5650febf4320793844c12c4adaa937f417f8da/pstack/skills/poteto-mode/playbooks/refactoring.md)

Source: `upstream/pstack/pstack/skills/poteto-mode/playbooks/refactoring.md`. Edit owner: `overrides/pstack/skills/poteto-mode/playbooks/refactoring.md`.

### Reproduce and fix a defect · original upstream

**replaced · Original pstack · Historical comparison**

Original before Kishu's replacement or patch. Read the current version beside it; the original is not an additional active instruction. Kishu reproduces on the relevant surface, traces the cause, adds useful regression coverage, and verifies the fix. Expensive tests require a decision, not silent skipping.

[Read and review](index.html#R-f6f106edc14b) · [Source on GitHub](https://github.com/cursor/plugins/blob/ae5650febf4320793844c12c4adaa937f417f8da/pstack/skills/poteto-mode/playbooks/bug-fix.md)

Source: `upstream/pstack/pstack/skills/poteto-mode/playbooks/bug-fix.md`. Edit owner: `overrides/pstack/skills/poteto-mode/playbooks/bug-fix.md`.

## Code design

### Allow scoped intermediate breakage in migrations

**current · Inherited pstack · When selected or relevant**

Optimize for the verified final design rather than temporary compatibility code. Applies to planned reversible phases, not arbitrary breakage of working software.

[Read and review](index.html#R-dae1caba1766) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-outcome-oriented-execution/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-outcome-oriented-execution/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/principle-outcome-oriented-execution/SKILL.md`.

### Avoid shared writes when ownership can be separate

**current · Inherited pstack · When selected or relevant**

Prefer independent write targets; serialize structurally when shared state is a real requirement. This is a concurrency design preference, not a ban on locks.

[Read and review](index.html#R-5546cc5925cc) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-separate-before-serializing-shared-state/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-separate-before-serializing-shared-state/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/principle-separate-before-serializing-shared-state/SKILL.md`.

### Choose the data shape before the logic

**current · Inherited pstack · When selected or relevant**

Get ownership, types, shared state, and useful infrastructure right early. 'Scaffold first' should be weighed against actual task needs and testing cost.

[Read and review](index.html#R-c1d5ef5cef5f) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-foundational-thinking/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-foundational-thinking/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/principle-foundational-thinking/SKILL.md`.

### Encode distinctions in types

**current · Inherited pstack · When selected or relevant**

Brand meaningful primitives, parse outside data, and derive schemas. Strictness can help correctness but should match language and repository conventions.

[Read and review](index.html#R-694e20c230cc) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-type-system-discipline/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-type-system-discipline/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/principle-type-system-discipline/SKILL.md`.

### Make retries converge safely

**current · Inherited pstack · When selected or relevant**

Design state-changing operations to recover from retries and interrupted runs. Particularly relevant to installers, jobs, migrations, and lifecycle commands.

[Read and review](index.html#R-d9d406122da0) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-make-operations-idempotent/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-make-operations-idempotent/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/principle-make-operations-idempotent/SKILL.md`.

### Prefer the smallest sufficient change

**current · Inherited pstack · When selected or relevant**

Consolidate repeated choices and avoid boilerplate. A small diff is a preference, not a reason to leave necessary work incomplete.

[Read and review](index.html#R-b572fea69b93) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-laziness-protocol/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-laziness-protocol/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/principle-laziness-protocol/SKILL.md`.

### Reconsider the design around a new requirement

**current · Inherited pstack · When selected or relevant**

Think as if the requirement existed from day one. This can conflict with minimal diffs and scope preservation if treated as a mandatory rewrite.

[Read and review](index.html#R-bdb14833a88c) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-redesign-from-first-principles/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-redesign-from-first-principles/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/principle-redesign-from-first-principles/SKILL.md`.

### Reduce indirection and hidden state

**current · Inherited pstack · When selected or relevant**

Prefer code a maintainer can trace quickly. The 30-second comprehension test is a heuristic, not a measured project acceptance criterion.

[Read and review](index.html#R-2537fb6888c1) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-minimize-reader-load/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-minimize-reader-load/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/principle-minimize-reader-load/SKILL.md`.

### Remove an internal API after migrating its callers

**current · Inherited pstack · When selected or relevant**

Prefer a single migration wave over permanent compatibility layers. Public compatibility promises and staged deployments may require a different approach.

[Read and review](index.html#R-466c2a57b4d1) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md`.

### Remove comments and challenge workarounds

**current · Inherited pstack · When selected or relevant**

An optional specialist deletes most comments and flags code to reshape. Kishu removed the universal trigger, but the specialist itself remains strongly opinionated.

[Read and review](index.html#R-b71024bd120f) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/no-comments/SKILL.md)

Source: `plugin/lib/pstack/skills/no-comments/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/no-comments/SKILL.md`.

### Remove unnecessary complexity before adding more

**current · Inherited pstack · When selected or relevant**

Prefer observed needs to speculative layers and validators. Useful simplification can become unrelated cleanup if the task's scope is ignored.

[Read and review](index.html#R-039d59259841) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-subtract-before-you-add/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-subtract-before-you-add/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/principle-subtract-before-you-add/SKILL.md`.

### The comment-removal agent's instructions

**current · Inherited pstack · When selected or relevant**

This agent has a narrow keep-list for comments and flags refactoring targets. It is optional under Kishu, but its aggressive deletion bias remains when selected.

[Read and review](index.html#R-6129a6ee433b) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/agents/comment-sicko.md)

Source: `plugin/lib/pstack/agents/comment-sicko.md`. Edit owner: `upstream/pstack/pstack/agents/comment-sicko.md`.

### Try two or three designs for novel choices

**current · Kishu override · When selected or relevant**

Requires competing prototypes for novel architecture or interaction choices. Kishu's proportionality rule limits when the exercise is useful.

[Read and review](index.html#R-324ca3cdc3f9) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-exhaust-the-design-space/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-exhaust-the-design-space/SKILL.md`. Edit owner: `src/patches.json`.

### TypeScript implementation preferences

**current · Inherited pstack · When selected or relevant**

Rules about domain types, casts, schemas, arguments, tests, and telemetry. These can affect implementation choices when working in TypeScript; they are preferences, not language requirements.

[Read and review](index.html#R-a8d9049113bf) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/typescript-best-practices/SKILL.md)

Source: `plugin/lib/pstack/skills/typescript-best-practices/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/typescript-best-practices/SKILL.md`.

### TypeScript implementation preferences · patterns

**current · Inherited pstack · When selected or relevant**

Rules about domain types, casts, schemas, arguments, tests, and telemetry. These can affect implementation choices when working in TypeScript; they are preferences, not language requirements.

[Read and review](index.html#R-086e99ec1651) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/typescript-best-practices/references/patterns.md)

Source: `plugin/lib/pstack/skills/typescript-best-practices/references/patterns.md`. Edit owner: `upstream/pstack/pstack/skills/typescript-best-practices/references/patterns.md`.

### Use a small experiment to settle a question

**current · Kishu override · When selected or relevant**

Build the cheapest useful experiment for an observable uncertainty. Product preferences still belong to the user; Kishu's scope rule applies.

[Read and review](index.html#R-2727af77dac2) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/prototype.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/prototype.md`. Edit owner: `src/patches.json`.

### Use structures that express the domain

**current · Inherited pstack · When selected or relevant**

Prefer types, tables, state machines, or other fitting structures over scattered conditions. The source explicitly says not to force an abstraction.

[Read and review](index.html#R-e64698c344e4) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-model-the-domain/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-model-the-domain/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/principle-model-the-domain/SKILL.md`.

### Validate at boundaries and trust typed internals

**current · Inherited pstack · When selected or relevant**

Centralize validation and separate pure logic from framework wiring. The wording 'trust internal code unconditionally' deserves judgment for dynamic, concurrent, or mixed-trust systems.

[Read and review](index.html#R-2bdb250fcf01) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-boundary-discipline/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-boundary-discipline/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/principle-boundary-discipline/SKILL.md`.

### Try two or three designs for novel choices · original upstream

**replaced · Original pstack · Historical comparison**

Original before Kishu's replacement or patch. Read the current version beside it; the original is not an additional active instruction. Requires competing prototypes for novel architecture or interaction choices. Kishu's proportionality rule limits when the exercise is useful.

[Read and review](index.html#R-761ff5042b22) · [Source on GitHub](https://github.com/cursor/plugins/blob/ae5650febf4320793844c12c4adaa937f417f8da/pstack/skills/principle-exhaust-the-design-space/SKILL.md)

Source: `upstream/pstack/pstack/skills/principle-exhaust-the-design-space/SKILL.md`. Edit owner: `src/patches.json`.

### Use a small experiment to settle a question · original upstream

**replaced · Original pstack · Historical comparison**

Original before Kishu's replacement or patch. Read the current version beside it; the original is not an additional active instruction. Build the cheapest useful experiment for an observable uncertainty. Product preferences still belong to the user; Kishu's scope rule applies.

[Read and review](index.html#R-d138cd36e556) · [Source on GitHub](https://github.com/cursor/plugins/blob/ae5650febf4320793844c12c4adaa937f417f8da/pstack/skills/poteto-mode/playbooks/prototype.md)

Source: `upstream/pstack/pstack/skills/poteto-mode/playbooks/prototype.md`. Edit owner: `src/patches.json`.

## Delegation

### Challenge a proposal

**current · Inherited pstack · When selected or relevant**

Use an adversarial panel to find weaknesses. Kishu makes this conditional on a useful uncertainty or a request, rather than mandatory for every change.

[Read and review](index.html#R-7c8a7473697d) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/interrogate/SKILL.md)

Source: `plugin/lib/pstack/skills/interrogate/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/interrogate/SKILL.md`.

### Compare competing attempts

**current · Inherited pstack · When selected or relevant**

Run candidates against the same task, judge them, and combine useful parts. Useful for uncertain designs; coordination and repeated work are real costs.

[Read and review](index.html#R-b9e00b495a60) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/arena/SKILL.md)

Source: `plugin/lib/pstack/skills/arena/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/arena/SKILL.md`.

### Divide work among agents

**current · Inherited pstack · When selected or relevant**

Specify independent slices or a race, isolate writers, and combine evidence. Missing workers or unsupported models must be reported.

[Read and review](index.html#R-f226641dbd01) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/swarm/SKILL.md)

Source: `plugin/lib/pstack/skills/swarm/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/swarm/SKILL.md`.

### Keep context and phases manageable

**current · Inherited pstack · When selected or relevant**

Suggests phase sizing, scope caps, and turn budgets to protect agent reasoning. These are workflow techniques; they should not silently reduce the user's requested outcome.

[Read and review](index.html#R-f54d0dbac767) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-guard-the-context-window/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-guard-the-context-window/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/principle-guard-the-context-window/SKILL.md`.

### The implementation delegate's instructions

**current · Inherited pstack · When selected or relevant**

Delegates must read the correct mode and relevant principles. Kishu supplies the current router path and translates this role to the available host tool.

[Read and review](index.html#R-524788b471ca) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/agents/kishu-agent.md)

Source: `plugin/lib/pstack/agents/kishu-agent.md`. Edit owner: `upstream/pstack/pstack/agents/poteto-agent.md`.

## Delivery

### Clean up worktrees safely

**current · Inherited pstack · When selected or relevant**

Check branch, uncommitted work, and delivery state before deleting worktrees. Cleanup is conditional on the task.

[Read and review](index.html#R-4dc9f9c2bed8) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/worktree-cleanup.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/worktree-cleanup.md`. Edit owner: `upstream/pstack/pstack/skills/poteto-mode/playbooks/worktree-cleanup.md`.

### Prepare an authorized pull request

**current · Kishu override · When selected or relevant**

Kishu performs scoped review and relevant checks, writes a useful description, and opens a PR only when delivery calls for it.

[Read and review](index.html#R-cdb1a9d01dcb) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/opening-a-pr.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/opening-a-pr.md`. Edit owner: `overrides/pstack/skills/poteto-mode/playbooks/opening-a-pr.md`.

### Verify and land a stack

**current · Inherited pstack · When selected or relevant**

Check each PR and the exact patch before merging an authorized contiguous stack. This is a selected shipping workflow, not the default end of every task.

[Read and review](index.html#R-ad0a2a39b16d) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/shipping.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/shipping.md`. Edit owner: `upstream/pstack/pstack/skills/poteto-mode/playbooks/shipping.md`.

### Watch or drive a PR toward readiness

**current · Inherited pstack · When selected or relevant**

Choose a mode that matches the request, inspect concrete failures, and avoid merging beyond authorization. The watcher has configurable polling and error thresholds.

[Read and review](index.html#R-fc5dfd478553) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/babysit.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/babysit.md`. Edit owner: `upstream/pstack/pstack/skills/poteto-mode/playbooks/babysit.md`.

### Prepare an authorized pull request · original upstream

**replaced · Original pstack · Historical comparison**

Original before Kishu's replacement or patch. Read the current version beside it; the original is not an additional active instruction. Kishu performs scoped review and relevant checks, writes a useful description, and opens a PR only when delivery calls for it.

[Read and review](index.html#R-d51b73f2381c) · [Source on GitHub](https://github.com/cursor/plugins/blob/ae5650febf4320793844c12c4adaa937f417f8da/pstack/skills/poteto-mode/playbooks/opening-a-pr.md)

Source: `upstream/pstack/pstack/skills/poteto-mode/playbooks/opening-a-pr.md`. Edit owner: `overrides/pstack/skills/poteto-mode/playbooks/opening-a-pr.md`.

## Executable tools

### Kishu · kishu

**current · Kishu addition · Command or host-specific**

Kishu's installation, activation, export, or update implementation. Included to expose enforced behavior and preservation rules; this code runs only when its command is invoked.

[Read and review](index.html#R-f8dd7948fc3d) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/scripts/kishu.py)

Source: `scripts/kishu.py`. Edit owner: `scripts/kishu.py`.

### Kishu · update_kishu

**current · Kishu addition · Command or host-specific**

Kishu's installation, activation, export, or update implementation. Included to expose enforced behavior and preservation rules; this code runs only when its command is invoked.

[Read and review](index.html#R-cb87d569af7c) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/src/scripts/update_kishu.py)

Source: `src/scripts/update_kishu.py`. Edit owner: `src/scripts/update_kishu.py`.

### Tool implementation · annotate.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting annotate.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-ab64eb5bf0e1) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/passes/annotate.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/passes/annotate.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/passes/annotate.ts`.

### Tool implementation · bootstrap.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting bootstrap.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-825707135d1d) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/scripts/bootstrap.ts)

Source: `plugin/lib/pstack/skills/kishu-mode/scripts/bootstrap.ts`. Edit owner: `upstream/pstack/pstack/skills/poteto-mode/scripts/bootstrap.ts`.

### Tool implementation · cfg.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting cfg.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-6e5ddcf636a8) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/backends/cfg.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/backends/cfg.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/backends/cfg.ts`.

### Tool implementation · check-plan.mjs

**current · Kishu override · Only when this executable runs**

Executable supporting check-plan.mjs. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-27043403d630) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/scripts/check-plan.mjs)

Source: `plugin/lib/pstack/skills/kishu-mode/scripts/check-plan.mjs`. Edit owner: `overrides/pstack/skills/poteto-mode/scripts/check-plan.mjs`.

### Tool implementation · cli.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting cli.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-7e63f8b054a3) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/scripts/watch-pr/cli.ts)

Source: `plugin/lib/pstack/skills/kishu-mode/scripts/watch-pr/cli.ts`. Edit owner: `upstream/pstack/pstack/skills/poteto-mode/scripts/watch-pr/cli.ts`.

### Tool implementation · config.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting config.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-f3fa55fd52e7) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/frontends/config.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/frontends/config.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/frontends/config.ts`.

### Tool implementation · dot.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting dot.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-bcc157d68ceb) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/frontends/dot.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/frontends/dot.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/frontends/dot.ts`.

### Tool implementation · github.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting github.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-a96840ca9db2) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/scripts/watch-pr/github.ts)

Source: `plugin/lib/pstack/skills/kishu-mode/scripts/watch-pr/github.ts`. Edit owner: `upstream/pstack/pstack/skills/poteto-mode/scripts/watch-pr/github.ts`.

### Tool implementation · ir.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting ir.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-ef5def3d2c0c) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/ir.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/ir.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/ir.ts`.

### Tool implementation · label.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting label.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-04ba561f5840) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/passes/label.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/passes/label.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/passes/label.ts`.

### Tool implementation · lift.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting lift.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-c376065e707a) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/passes/lift.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/passes/lift.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/passes/lift.ts`.

### Tool implementation · log.sh

**current · Inherited pstack · Only when this executable runs**

Executable supporting log.sh. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-ca49e56cf295) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/show-me-your-work/scripts/log.sh)

Source: `plugin/lib/pstack/skills/show-me-your-work/scripts/log.sh`. Edit owner: `upstream/pstack/pstack/skills/show-me-your-work/scripts/log.sh`.

### Tool implementation · loop-check.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting loop-check.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-9ca3326cf4d8) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/passes/loop-check.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/passes/loop-check.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/passes/loop-check.ts`.

### Tool implementation · marks.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting marks.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-c8f2171e0b56) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/frontends/marks.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/frontends/marks.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/frontends/marks.ts`.

### Tool implementation · mermaid.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting mermaid.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-658b87650c06) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/backends/mermaid.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/backends/mermaid.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/backends/mermaid.ts`.

### Tool implementation · messages.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting messages.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-f538001d53f0) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/frontends/messages.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/frontends/messages.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/frontends/messages.ts`.

### Tool implementation · paths.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting paths.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-3d12817a0850) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/passes/paths.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/passes/paths.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/passes/paths.ts`.

### Tool implementation · pipeline.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting pipeline.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-b3e4bd4ebe63) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/pipeline.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/pipeline.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/pipeline.ts`.

### Tool implementation · plain-text.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting plain-text.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-7727f9cc7744) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/backends/plain-text.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/backends/plain-text.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/backends/plain-text.ts`.

### Tool implementation · policy.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting policy.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-3e28ab8e62fc) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/scripts/watch-pr/policy.ts)

Source: `plugin/lib/pstack/skills/kishu-mode/scripts/watch-pr/policy.ts`. Edit owner: `upstream/pstack/pstack/skills/poteto-mode/scripts/watch-pr/policy.ts`.

### Tool implementation · reach.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting reach.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-f86c5a5c4a76) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/passes/reach.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/passes/reach.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/passes/reach.ts`.

### Tool implementation · region-check.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting region-check.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-2b9053135976) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/passes/region-check.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/passes/region-check.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/passes/region-check.ts`.

### Tool implementation · regions.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting regions.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-a481abbffc98) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/passes/regions.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/passes/regions.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/passes/regions.ts`.

### Tool implementation · render.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting render.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-472a93a3c7fa) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/scripts/watch-pr/render.ts)

Source: `plugin/lib/pstack/skills/kishu-mode/scripts/watch-pr/render.ts`. Edit owner: `upstream/pstack/pstack/skills/poteto-mode/scripts/watch-pr/render.ts`.

### Tool implementation · report.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting report.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-67fd92feec31) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/backends/report.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/backends/report.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/backends/report.ts`.

### Tool implementation · run.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting run.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-0f44250b0a28) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/run.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/run.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/run.ts`.

### Tool implementation · spec.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting spec.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-67c2c17c1672) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/frontends/spec.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/frontends/spec.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/frontends/spec.ts`.

### Tool implementation · statechart

**current · Inherited pstack · Only when this executable runs**

Executable supporting statechart. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-3de9f722953e) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/statechart)

Source: `plugin/lib/pstack/skills/statechart/scripts/statechart`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/statechart`.

### Tool implementation · statechart.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting statechart.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-992b423ab4ed) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/statechart.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/statechart.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/statechart.ts`.

### Tool implementation · trace.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting trace.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-d7f0459348fa) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/frontends/trace.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/frontends/trace.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/frontends/trace.ts`.

### Tool implementation · types.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting types.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-ca8de9219deb) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/scripts/watch-pr/types.ts)

Source: `plugin/lib/pstack/skills/kishu-mode/scripts/watch-pr/types.ts`. Edit owner: `upstream/pstack/pstack/skills/poteto-mode/scripts/watch-pr/types.ts`.

### Tool implementation · value.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting value.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-eeee44e9eb61) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/frontends/value.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/frontends/value.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/frontends/value.ts`.

### Tool implementation · verdict.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting verdict.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-2441ec65b557) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/frontends/verdict.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/frontends/verdict.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/frontends/verdict.ts`.

### Tool implementation · view.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting view.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-0f9bc9c31e08) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/frontends/view.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/frontends/view.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/frontends/view.ts`.

### Tool implementation · watch-pr

**current · Inherited pstack · Only when this executable runs**

Executable supporting watch-pr. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-64b9ae58f1d0) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/scripts/watch-pr/watch-pr)

Source: `plugin/lib/pstack/skills/kishu-mode/scripts/watch-pr/watch-pr`. Edit owner: `upstream/pstack/pstack/skills/poteto-mode/scripts/watch-pr/watch-pr`.

### Tool implementation · worker.ts

**current · Inherited pstack · Only when this executable runs**

Executable supporting worker.ts. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-b9b8cb4fcc96) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/scripts/worker.ts)

Source: `plugin/lib/pstack/skills/statechart/scripts/worker.ts`. Edit owner: `upstream/pstack/pstack/skills/statechart/scripts/worker.ts`.

### Tool implementation · worktree-audit.sh

**current · Inherited pstack · Only when this executable runs**

Executable supporting worktree-audit.sh. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-ce6dbb89b097) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/scripts/worktree-audit.sh)

Source: `plugin/lib/pstack/skills/kishu-mode/scripts/worktree-audit.sh`. Edit owner: `upstream/pstack/pstack/skills/poteto-mode/scripts/worktree-audit.sh`.

### Tool implementation · check-plan.mjs · original upstream

**replaced · Original pstack · Historical comparison**

Original before Kishu's replacement or patch. Read the current version beside it; the original is not an additional active instruction. Executable supporting check-plan.mjs. These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose.

[Read and review](index.html#R-f77de7f99148) · [Source on GitHub](https://github.com/cursor/plugins/blob/ae5650febf4320793844c12c4adaa937f417f8da/pstack/skills/poteto-mode/scripts/check-plan.mjs)

Source: `upstream/pstack/pstack/skills/poteto-mode/scripts/check-plan.mjs`. Edit owner: `overrides/pstack/skills/poteto-mode/scripts/check-plan.mjs`.

## Investigation

### Answer without changing the project

**current · Kishu override · When selected or relevant**

Read-only investigation stays read-only; use evidence and only the deeper workflows that help answer the question.

[Read and review](index.html#R-4f57feb3a048) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/investigation.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/investigation.md`. Edit owner: `overrides/pstack/skills/poteto-mode/playbooks/investigation.md`.

### Check what else a change could break

**current · Inherited pstack · When selected or relevant**

Trace dependencies beyond the edited lines and execute a check for the assumptions that matter. The skill prefers demonstrated defects over speculative risk lists.

[Read and review](index.html#R-5c706de9bc3d) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/blast-radius/SKILL.md)

Source: `plugin/lib/pstack/skills/blast-radius/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/blast-radius/SKILL.md`.

### Diagnose a live runtime symptom

**current · Inherited pstack · When selected or relevant**

Instrument the running system and deliver a diagnosis. A request for diagnosis does not automatically authorize a fix.

[Read and review](index.html#R-4e98fc035a5d) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/runtime-forensics.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/runtime-forensics.md`. Edit owner: `upstream/pstack/pstack/skills/poteto-mode/playbooks/runtime-forensics.md`.

### Diagnose a saved profiling trace

**current · Inherited pstack · When selected or relevant**

Analyze the supplied artifact, separate evidence from causal guesses, and report the diagnosis.

[Read and review](index.html#R-c3c3397f740c) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/trace-forensics.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/trace-forensics.md`. Edit owner: `upstream/pstack/pstack/skills/poteto-mode/playbooks/trace-forensics.md`.

### Find the reason behind a decision

**current · Inherited pstack · When selected or relevant**

Search history and available evidence sources, distinguish evidence from inference, and report gaps. This is a selected investigation, not permission to query every service on every task.

[Read and review](index.html#R-8a43415ec3a4) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/why/SKILL.md)

Source: `plugin/lib/pstack/skills/why/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/why/SKILL.md`.

### Find the reason behind a decision · code archaeology

**current · Inherited pstack · When selected or relevant**

Search history and available evidence sources, distinguish evidence from inference, and report gaps. This is a selected investigation, not permission to query every service on every task.

[Read and review](index.html#R-3f072283b137) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/why/references/sources/code-archaeology.md)

Source: `plugin/lib/pstack/skills/why/references/sources/code-archaeology.md`. Edit owner: `upstream/pstack/pstack/skills/why/references/sources/code-archaeology.md`.

### Find the reason behind a decision · databricks

**current · Inherited pstack · When selected or relevant**

Search history and available evidence sources, distinguish evidence from inference, and report gaps. This is a selected investigation, not permission to query every service on every task.

[Read and review](index.html#R-1b5eba8b3d67) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/why/references/sources/databricks.md)

Source: `plugin/lib/pstack/skills/why/references/sources/databricks.md`. Edit owner: `upstream/pstack/pstack/skills/why/references/sources/databricks.md`.

### Find the reason behind a decision · datadog

**current · Inherited pstack · When selected or relevant**

Search history and available evidence sources, distinguish evidence from inference, and report gaps. This is a selected investigation, not permission to query every service on every task.

[Read and review](index.html#R-b977e76688df) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/why/references/sources/datadog.md)

Source: `plugin/lib/pstack/skills/why/references/sources/datadog.md`. Edit owner: `upstream/pstack/pstack/skills/why/references/sources/datadog.md`.

### Find the reason behind a decision · epistemics

**current · Inherited pstack · When selected or relevant**

Search history and available evidence sources, distinguish evidence from inference, and report gaps. This is a selected investigation, not permission to query every service on every task.

[Read and review](index.html#R-983455ffcaa0) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/why/references/epistemics.md)

Source: `plugin/lib/pstack/skills/why/references/epistemics.md`. Edit owner: `upstream/pstack/pstack/skills/why/references/epistemics.md`.

### Find the reason behind a decision · incident postmortem

**current · Inherited pstack · When selected or relevant**

Search history and available evidence sources, distinguish evidence from inference, and report gaps. This is a selected investigation, not permission to query every service on every task.

[Read and review](index.html#R-6bc96ab336b5) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/why/references/sources/incident-postmortem.md)

Source: `plugin/lib/pstack/skills/why/references/sources/incident-postmortem.md`. Edit owner: `upstream/pstack/pstack/skills/why/references/sources/incident-postmortem.md`.

### Find the reason behind a decision · investigator prompt

**current · Inherited pstack · When selected or relevant**

Search history and available evidence sources, distinguish evidence from inference, and report gaps. This is a selected investigation, not permission to query every service on every task.

[Read and review](index.html#R-d47cdf3719aa) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/why/references/investigator-prompt.md)

Source: `plugin/lib/pstack/skills/why/references/investigator-prompt.md`. Edit owner: `upstream/pstack/pstack/skills/why/references/investigator-prompt.md`.

### Find the reason behind a decision · linear

**current · Inherited pstack · When selected or relevant**

Search history and available evidence sources, distinguish evidence from inference, and report gaps. This is a selected investigation, not permission to query every service on every task.

[Read and review](index.html#R-2117efb4589d) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/why/references/sources/linear.md)

Source: `plugin/lib/pstack/skills/why/references/sources/linear.md`. Edit owner: `upstream/pstack/pstack/skills/why/references/sources/linear.md`.

### Find the reason behind a decision · notion

**current · Inherited pstack · When selected or relevant**

Search history and available evidence sources, distinguish evidence from inference, and report gaps. This is a selected investigation, not permission to query every service on every task.

[Read and review](index.html#R-124ec0a98626) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/why/references/sources/notion.md)

Source: `plugin/lib/pstack/skills/why/references/sources/notion.md`. Edit owner: `upstream/pstack/pstack/skills/why/references/sources/notion.md`.

### Find the reason behind a decision · sentry

**current · Inherited pstack · When selected or relevant**

Search history and available evidence sources, distinguish evidence from inference, and report gaps. This is a selected investigation, not permission to query every service on every task.

[Read and review](index.html#R-d8051b4bd1f0) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/why/references/sources/sentry.md)

Source: `plugin/lib/pstack/skills/why/references/sources/sentry.md`. Edit owner: `upstream/pstack/pstack/skills/why/references/sources/sentry.md`.

### Find the reason behind a decision · slack

**current · Inherited pstack · When selected or relevant**

Search history and available evidence sources, distinguish evidence from inference, and report gaps. This is a selected investigation, not permission to query every service on every task.

[Read and review](index.html#R-eb2a618da1bf) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/why/references/sources/slack.md)

Source: `plugin/lib/pstack/skills/why/references/sources/slack.md`. Edit owner: `upstream/pstack/pstack/skills/why/references/sources/slack.md`.

### Find the reason behind a decision · source playbook

**current · Inherited pstack · When selected or relevant**

Search history and available evidence sources, distinguish evidence from inference, and report gaps. This is a selected investigation, not permission to query every service on every task.

[Read and review](index.html#R-f0110b2b95a4) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/why/references/source-playbook.md)

Source: `plugin/lib/pstack/skills/why/references/source-playbook.md`. Edit owner: `upstream/pstack/pstack/skills/why/references/source-playbook.md`.

### Find the reason behind a decision · synthesizer prompt

**current · Inherited pstack · When selected or relevant**

Search history and available evidence sources, distinguish evidence from inference, and report gaps. This is a selected investigation, not permission to query every service on every task.

[Read and review](index.html#R-0bb1aafa3465) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/why/references/synthesizer-prompt.md)

Source: `plugin/lib/pstack/skills/why/references/synthesizer-prompt.md`. Edit owner: `upstream/pstack/pstack/skills/why/references/synthesizer-prompt.md`.

### Fix the original fault

**current · Inherited pstack · When selected or relevant**

Reproduce, trace the causal chain, and address repeated instances. Kishu's scope rule still bounds how far a cleanup or instrumentation change should go.

[Read and review](index.html#R-8e6b1bc18263) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-fix-root-causes/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-fix-root-causes/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/principle-fix-root-causes/SKILL.md`.

### Recheck an assumption after repeated failed fixes

**current · Inherited pstack · When selected or relevant**

After two failures sharing an assumption, test that assumption before another fix. This is a debugging stop rule, not a cap on possible solutions.

[Read and review](index.html#R-1376b56b427b) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-attack-the-premise/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-attack-the-premise/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/principle-attack-the-premise/SKILL.md`.

### Recover relevant working context

**current · Inherited pstack · When selected or relevant**

Reconstruct prior work from available history. Host adapters restrict source access and prevent unrelated-project transcript searches.

[Read and review](index.html#R-fbef080bdfc1) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/recall/SKILL.md)

Source: `plugin/lib/pstack/skills/recall/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/recall/SKILL.md`.

### Take over existing work

**current · Inherited pstack · When selected or relevant**

Inspect the actual workspace and previous evidence, preserve decisions, and resume from verified state.

[Read and review](index.html#R-02ca873561be) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/session-pickup.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/session-pickup.md`. Edit owner: `upstream/pstack/pstack/skills/poteto-mode/playbooks/session-pickup.md`.

### Understand the current code

**current · Kishu override · When selected or relevant**

Trace the relevant behavior. Kishu permits direct investigation and reuses findings instead of always starting another agent.

[Read and review](index.html#R-af488fe0f401) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/how/SKILL.md)

Source: `plugin/lib/pstack/skills/how/SKILL.md`. Edit owner: `overrides/pstack/skills/how/SKILL.md`.

### Understand the current code · explainer prompt

**current · Inherited pstack · When selected or relevant**

Trace the relevant behavior. Kishu permits direct investigation and reuses findings instead of always starting another agent.

[Read and review](index.html#R-071db782b8ca) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/how/references/explainer-prompt.md)

Source: `plugin/lib/pstack/skills/how/references/explainer-prompt.md`. Edit owner: `upstream/pstack/pstack/skills/how/references/explainer-prompt.md`.

### Understand the current code · explorer prompt

**current · Inherited pstack · When selected or relevant**

Trace the relevant behavior. Kishu permits direct investigation and reuses findings instead of always starting another agent.

[Read and review](index.html#R-18d2b0bba95a) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/how/references/explorer-prompt.md)

Source: `plugin/lib/pstack/skills/how/references/explorer-prompt.md`. Edit owner: `upstream/pstack/pstack/skills/how/references/explorer-prompt.md`.

### Answer without changing the project · original upstream

**replaced · Original pstack · Historical comparison**

Original before Kishu's replacement or patch. Read the current version beside it; the original is not an additional active instruction. Read-only investigation stays read-only; use evidence and only the deeper workflows that help answer the question.

[Read and review](index.html#R-7e68ce50c021) · [Source on GitHub](https://github.com/cursor/plugins/blob/ae5650febf4320793844c12c4adaa937f417f8da/pstack/skills/poteto-mode/playbooks/investigation.md)

Source: `upstream/pstack/pstack/skills/poteto-mode/playbooks/investigation.md`. Edit owner: `overrides/pstack/skills/poteto-mode/playbooks/investigation.md`.

### Understand the current code · original upstream

**replaced · Original pstack · Historical comparison**

Original before Kishu's replacement or patch. Read the current version beside it; the original is not an additional active instruction. Trace the relevant behavior. Kishu permits direct investigation and reuses findings instead of always starting another agent.

[Read and review](index.html#R-30fb19518382) · [Source on GitHub](https://github.com/cursor/plugins/blob/ae5650febf4320793844c12c4adaa937f417f8da/pstack/skills/how/SKILL.md)

Source: `upstream/pstack/pstack/skills/how/SKILL.md`. Edit owner: `overrides/pstack/skills/how/SKILL.md`.

## Long-running work

### Continue a task until its condition is met

**current · Kishu override · When selected or relevant**

Kishu limits side fixes to the authorized goal and preserves decision gates. Continued execution requires actual host support; no fictional wakeups.

[Read and review](index.html#R-e4921ce89d3c) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/autonomous-run.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/autonomous-run.md`. Edit owner: `src/patches.json`.

### Coordinate a large standing program

**current · Inherited pstack · When selected or relevant**

A coordinator delegates implementation and audits results across a multi-day program. Ordinary work that one agent can finish should not enter this route.

[Read and review](index.html#R-b60fdd587e6e) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/orchestrate.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/orchestrate.md`. Edit owner: `upstream/pstack/pstack/skills/poteto-mode/playbooks/orchestrate.md`.

### Prepare a queue for the user to land

**current · Inherited pstack · When selected or relevant**

Runs an authorized multi-PR queue while reserving merge ownership for the user.

[Read and review](index.html#R-6d463442b329) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/autopilot-stack.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/autopilot-stack.md`. Edit owner: `upstream/pstack/pstack/skills/poteto-mode/playbooks/autopilot-stack.md`.

### Run an authorized queue through merge

**current · Kishu override · When selected or relevant**

Uses PR owners and independent verifiers under an explicit grant. The universal comment/deslop passes were removed, but substantial program machinery remains.

[Read and review](index.html#R-8a1a8cce26b4) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/autopilot-full.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/autopilot-full.md`. Edit owner: `src/patches.json`.

### Stop work without losing its state

**current · Inherited pstack · When selected or relevant**

Capture enough state to resume safely and honor the user's stop across active workers.

[Read and review](index.html#R-1e237720ca29) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/pause-safely.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/pause-safely.md`. Edit owner: `upstream/pstack/pstack/skills/poteto-mode/playbooks/pause-safely.md`.

### Write an executable multi-PR plan

**current · Kishu override · When selected or relevant**

Produces a plan before execution. The selected workflow requires ten live lanes and interaction review. Kishu permits an explained Not applicable performance block; relevant performance checks use grounded acceptance criteria without inventing numeric caps.

[Read and review](index.html#R-63f9daaa4dee) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/multi-phase-plan.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/multi-phase-plan.md`. Edit owner: `overrides/pstack/skills/poteto-mode/playbooks/multi-phase-plan.md`.

### Continue a task until its condition is met · original upstream

**replaced · Original pstack · Historical comparison**

Original before Kishu's replacement or patch. Read the current version beside it; the original is not an additional active instruction. Kishu limits side fixes to the authorized goal and preserves decision gates. Continued execution requires actual host support; no fictional wakeups.

[Read and review](index.html#R-949bb1587932) · [Source on GitHub](https://github.com/cursor/plugins/blob/ae5650febf4320793844c12c4adaa937f417f8da/pstack/skills/poteto-mode/playbooks/autonomous-run.md)

Source: `upstream/pstack/pstack/skills/poteto-mode/playbooks/autonomous-run.md`. Edit owner: `src/patches.json`.

### Run an authorized queue through merge · original upstream

**replaced · Original pstack · Historical comparison**

Original before Kishu's replacement or patch. Read the current version beside it; the original is not an additional active instruction. Uses PR owners and independent verifiers under an explicit grant. The universal comment/deslop passes were removed, but substantial program machinery remains.

[Read and review](index.html#R-4013a8340fae) · [Source on GitHub](https://github.com/cursor/plugins/blob/ae5650febf4320793844c12c4adaa937f417f8da/pstack/skills/poteto-mode/playbooks/autopilot-full.md)

Source: `upstream/pstack/pstack/skills/poteto-mode/playbooks/autopilot-full.md`. Edit owner: `src/patches.json`.

### Write an executable multi-PR plan · original upstream

**replaced · Original pstack · Historical comparison**

Original before Kishu's replacement or patch. Read the current version beside it; the original is not an additional active instruction. Produces a plan before execution. The selected workflow requires ten live lanes and interaction review. Kishu permits an explained Not applicable performance block; relevant performance checks use grounded acceptance criteria without inventing numeric caps.

[Read and review](index.html#R-1856948a395e) · [Source on GitHub](https://github.com/cursor/plugins/blob/ae5650febf4320793844c12c4adaa937f417f8da/pstack/skills/poteto-mode/playbooks/multi-phase-plan.md)

Source: `upstream/pstack/pstack/skills/poteto-mode/playbooks/multi-phase-plan.md`. Edit owner: `overrides/pstack/skills/poteto-mode/playbooks/multi-phase-plan.md`.

## Models & setup

### Choose delegated models and effort

**current · Kishu override · When selected or relevant**

Kishu's setup resolves actual host capabilities and saves per-role choices. These choices affect delegates, not the current parent chat's model.

[Read and review](index.html#R-3115bdb0efea) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/setup-pstack/SKILL.md)

Source: `plugin/lib/pstack/skills/setup-pstack/SKILL.md`. Edit owner: `overrides/pstack/skills/setup-pstack/SKILL.md`.

### Kishu · adapters / claude code

**current · Kishu addition · Command or host-specific**

Kishu's own entrypoint, setup/update instructions, or host mapping. Host capabilities and explicit user choices constrain inherited workflows. Setup is not run on ordinary tasks.

[Read and review](index.html#R-eb53db63affd) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/src/adapters/claude-code.md)

Source: `src/adapters/claude-code.md`. Edit owner: `src/adapters/claude-code.md`.

### Kishu · adapters / codex

**current · Kishu addition · Command or host-specific**

Kishu's own entrypoint, setup/update instructions, or host mapping. Host capabilities and explicit user choices constrain inherited workflows. Setup is not run on ordinary tasks.

[Read and review](index.html#R-7e40ba29389c) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/src/adapters/codex.md)

Source: `src/adapters/codex.md`. Edit owner: `src/adapters/codex.md`.

### Kishu · adapters / cursor

**current · Kishu addition · Command or host-specific**

Kishu's own entrypoint, setup/update instructions, or host mapping. Host capabilities and explicit user choices constrain inherited workflows. Setup is not run on ordinary tasks.

[Read and review](index.html#R-1768fc25cb54) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/src/adapters/cursor.md)

Source: `src/adapters/cursor.md`. Edit owner: `src/adapters/cursor.md`.

### Kishu · adapters / generic

**current · Kishu addition · Command or host-specific**

Kishu's own entrypoint, setup/update instructions, or host mapping. Host capabilities and explicit user choices constrain inherited workflows. Setup is not run on ordinary tasks.

[Read and review](index.html#R-76c1877ead3e) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/src/adapters/generic.md)

Source: `src/adapters/generic.md`. Edit owner: `src/adapters/generic.md`.

### Kishu · admin entrypoint

**current · Kishu addition · Command or host-specific**

Kishu's own entrypoint, setup/update instructions, or host mapping. Host capabilities and explicit user choices constrain inherited workflows. Setup is not run on ordinary tasks.

[Read and review](index.html#R-7b35ad7404f2) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/src/admin-entrypoint.md)

Source: `src/admin-entrypoint.md`. Edit owner: `src/admin-entrypoint.md`.

### Kishu · entrypoint

**current · Kishu addition · Command or host-specific**

Kishu's own entrypoint, setup/update instructions, or host mapping. Host capabilities and explicit user choices constrain inherited workflows. Setup is not run on ordinary tasks.

[Read and review](index.html#R-826f225845d7) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/src/entrypoint.md)

Source: `src/entrypoint.md`. Edit owner: `src/entrypoint.md`.

### Kishu · guides / setup

**current · Kishu addition · Command or host-specific**

Kishu's own entrypoint, setup/update instructions, or host mapping. Host capabilities and explicit user choices constrain inherited workflows. Setup is not run on ordinary tasks.

[Read and review](index.html#R-847fc3a54a25) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/src/guides/setup.md)

Source: `src/guides/setup.md`. Edit owner: `src/guides/setup.md`.

### Kishu · guides / update

**current · Kishu addition · Command or host-specific**

Kishu's own entrypoint, setup/update instructions, or host mapping. Host capabilities and explicit user choices constrain inherited workflows. Setup is not run on ordinary tasks.

[Read and review](index.html#R-d34af9e774fd) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/src/guides/update.md)

Source: `src/guides/update.md`. Edit owner: `src/guides/update.md`.

### Upstream setup and workflow advice

**reference · Inherited pstack · Reference only**

Inherited help may describe upstream defaults. Current Kishu setup, model adapters, and router take precedence; treat this as supporting documentation.

[Read and review](index.html#R-dafd568e3d6e) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-help/SKILL.md)

Source: `plugin/lib/pstack/skills/kishu-help/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/poteto-help/SKILL.md`.

### Upstream setup and workflow advice · prompting

**reference · Inherited pstack · Reference only**

Inherited help may describe upstream defaults. Current Kishu setup, model adapters, and router take precedence; treat this as supporting documentation.

[Read and review](index.html#R-f28cf99b0bc9) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-help/references/prompting.md)

Source: `plugin/lib/pstack/skills/kishu-help/references/prompting.md`. Edit owner: `upstream/pstack/pstack/skills/poteto-help/references/prompting.md`.

### Upstream setup and workflow advice · recipes

**reference · Inherited pstack · Reference only**

Inherited help may describe upstream defaults. Current Kishu setup, model adapters, and router take precedence; treat this as supporting documentation.

[Read and review](index.html#R-257e5e481d0c) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-help/references/recipes.md)

Source: `plugin/lib/pstack/skills/kishu-help/references/recipes.md`. Edit owner: `upstream/pstack/pstack/skills/poteto-help/references/recipes.md`.

### Choose delegated models and effort · original upstream

**replaced · Original pstack · Historical comparison**

Original before Kishu's replacement or patch. Read the current version beside it; the original is not an additional active instruction. Kishu's setup resolves actual host capabilities and saves per-role choices. These choices affect delegates, not the current parent chat's model.

[Read and review](index.html#R-928b6b220c83) · [Source on GitHub](https://github.com/cursor/plugins/blob/ae5650febf4320793844c12c4adaa937f417f8da/pstack/skills/setup-pstack/SKILL.md)

Source: `upstream/pstack/pstack/skills/setup-pstack/SKILL.md`. Edit owner: `overrides/pstack/skills/setup-pstack/SKILL.md`.

## Optional automation

### Benny · FOR_AGENTS

**current · Inherited pstack · Only after configuring Benny**

Optional upstream issue-triage/reproduction automation. Bundled files do not mean its automations are configured or running. Budgets and communication permissions apply only when that workflow is deliberately installed.

[Read and review](index.html#R-31df0c79af2a) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/automations/benny/FOR_AGENTS.md)

Source: `plugin/lib/pstack/automations/benny/FOR_AGENTS.md`. Edit owner: `upstream/pstack/pstack/automations/benny/FOR_AGENTS.md`.

### Benny · README

**current · Inherited pstack · Only after configuring Benny**

Optional upstream issue-triage/reproduction automation. Bundled files do not mean its automations are configured or running. Budgets and communication permissions apply only when that workflow is deliberately installed.

[Read and review](index.html#R-23633b6fa576) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/automations/benny/README.md)

Source: `plugin/lib/pstack/automations/benny/README.md`. Edit owner: `upstream/pstack/pstack/automations/benny/README.md`.

### Benny · SKILL

**current · Inherited pstack · Only after configuring Benny**

Optional upstream issue-triage/reproduction automation. Bundled files do not mean its automations are configured or running. Budgets and communication permissions apply only when that workflow is deliberately installed.

[Read and review](index.html#R-b4760087a506) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/automations/benny/skills/reproduce-and-fix-issues/SKILL.md)

Source: `plugin/lib/pstack/automations/benny/skills/reproduce-and-fix-issues/SKILL.md`. Edit owner: `upstream/pstack/pstack/automations/benny/skills/reproduce-and-fix-issues/SKILL.md`.

### Benny · SKILL

**current · Inherited pstack · Only after configuring Benny**

Optional upstream issue-triage/reproduction automation. Bundled files do not mean its automations are configured or running. Budgets and communication permissions apply only when that workflow is deliberately installed.

[Read and review](index.html#R-ee1321b06946) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/automations/benny/skills/setup-benny/SKILL.md)

Source: `plugin/lib/pstack/automations/benny/skills/setup-benny/SKILL.md`. Edit owner: `upstream/pstack/pstack/automations/benny/skills/setup-benny/SKILL.md`.

### Benny · SKILL

**current · Inherited pstack · Only after configuring Benny**

Optional upstream issue-triage/reproduction automation. Bundled files do not mean its automations are configured or running. Budgets and communication permissions apply only when that workflow is deliberately installed.

[Read and review](index.html#R-e23b4437d0c7) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/automations/benny/skills/triage-issue-reports/SKILL.md)

Source: `plugin/lib/pstack/automations/benny/skills/triage-issue-reports/SKILL.md`. Edit owner: `upstream/pstack/pstack/automations/benny/skills/triage-issue-reports/SKILL.md`.

### Benny · configuration.example

**current · Inherited pstack · Only after configuring Benny**

Optional upstream issue-triage/reproduction automation. Bundled files do not mean its automations are configured or running. Budgets and communication permissions apply only when that workflow is deliberately installed.

[Read and review](index.html#R-871615ab4f97) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/automations/benny/templates/configuration.example.yaml)

Source: `plugin/lib/pstack/automations/benny/templates/configuration.example.yaml`. Edit owner: `upstream/pstack/pstack/automations/benny/templates/configuration.example.yaml`.

### Benny · control adapter · control adapter

**current · Inherited pstack · Only after configuring Benny**

Optional upstream issue-triage/reproduction automation. Bundled files do not mean its automations are configured or running. Budgets and communication permissions apply only when that workflow is deliberately installed.

[Read and review](index.html#R-e1c6cf239f12) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/automations/benny/skills/reproduce-and-fix-issues/references/control-adapter.md)

Source: `plugin/lib/pstack/automations/benny/skills/reproduce-and-fix-issues/references/control-adapter.md`. Edit owner: `upstream/pstack/pstack/automations/benny/skills/reproduce-and-fix-issues/references/control-adapter.md`.

### Benny · feature map.example · feature map.example

**current · Inherited pstack · Only after configuring Benny**

Optional upstream issue-triage/reproduction automation. Bundled files do not mean its automations are configured or running. Budgets and communication permissions apply only when that workflow is deliberately installed.

[Read and review](index.html#R-855858547307) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/automations/benny/skills/reproduce-and-fix-issues/references/feature-map.example.md)

Source: `plugin/lib/pstack/automations/benny/skills/reproduce-and-fix-issues/references/feature-map.example.md`. Edit owner: `upstream/pstack/pstack/automations/benny/skills/reproduce-and-fix-issues/references/feature-map.example.md`.

### Benny · reproduce automation prompt

**current · Inherited pstack · Only after configuring Benny**

Optional upstream issue-triage/reproduction automation. Bundled files do not mean its automations are configured or running. Budgets and communication permissions apply only when that workflow is deliberately installed.

[Read and review](index.html#R-de09f3a42ccb) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/automations/benny/templates/reproduce-automation-prompt.md)

Source: `plugin/lib/pstack/automations/benny/templates/reproduce-automation-prompt.md`. Edit owner: `upstream/pstack/pstack/automations/benny/templates/reproduce-automation-prompt.md`.

### Benny · routing.example · routing.example

**current · Inherited pstack · Only after configuring Benny**

Optional upstream issue-triage/reproduction automation. Bundled files do not mean its automations are configured or running. Budgets and communication permissions apply only when that workflow is deliberately installed.

[Read and review](index.html#R-e380a1840ac9) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/automations/benny/skills/triage-issue-reports/references/routing.example.md)

Source: `plugin/lib/pstack/automations/benny/skills/triage-issue-reports/references/routing.example.md`. Edit owner: `upstream/pstack/pstack/automations/benny/skills/triage-issue-reports/references/routing.example.md`.

### Benny · triage automation prompt

**current · Inherited pstack · Only after configuring Benny**

Optional upstream issue-triage/reproduction automation. Bundled files do not mean its automations are configured or running. Budgets and communication permissions apply only when that workflow is deliberately installed.

[Read and review](index.html#R-092b83680cb4) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/automations/benny/templates/triage-automation-prompt.md)

Source: `plugin/lib/pstack/automations/benny/templates/triage-automation-prompt.md`. Edit owner: `upstream/pstack/pstack/automations/benny/templates/triage-automation-prompt.md`.

### Benny · verify existing fix · verify existing fix

**current · Inherited pstack · Only after configuring Benny**

Optional upstream issue-triage/reproduction automation. Bundled files do not mean its automations are configured or running. Budgets and communication permissions apply only when that workflow is deliberately installed.

[Read and review](index.html#R-f6f990e5dd9e) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/automations/benny/skills/reproduce-and-fix-issues/references/verify-existing-fix.md)

Source: `plugin/lib/pstack/automations/benny/skills/reproduce-and-fix-issues/references/verify-existing-fix.md`. Edit owner: `upstream/pstack/pstack/automations/benny/skills/reproduce-and-fix-issues/references/verify-existing-fix.md`.

## Performance

### Check whether a measurement is believable

**current · Inherited pstack · When selected or relevant**

Checks realistic workloads, errors, actual work, noise, tuning, and bottlenecks. It does not set a universal speed target, but its full measurement procedure can be demanding.

[Read and review](index.html#R-bde27eecb579) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/benchmark-checklist/SKILL.md)

Source: `plugin/lib/pstack/skills/benchmark-checklist/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/benchmark-checklist/SKILL.md`.

### Explain a metric before trusting it

**current · Inherited pstack · When selected or relevant**

Name the decision, noise, and measured bottleneck. It is a confidence standard for claims, not permission to invent a performance ceiling.

[Read and review](index.html#R-70a49a90b310) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-explain-the-number/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-explain-the-number/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/principle-explain-the-number/SKILL.md`.

### Fix a measured performance problem

**current · Kishu override · When selected or relevant**

Measure before and after, try simpler interventions first, and stop when the agreed target is met. Kishu relaxes automatic architecture/delegation, not the need for credible measurement.

[Read and review](index.html#R-17464d5fb7a3) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/perf-issue.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/perf-issue.md`. Edit owner: `src/patches.json`.

### Iterate toward an agreed metric target

**current · Inherited pstack · When selected or relevant**

Freeze a meaningful measurement, test one hypothesis at a time, and keep only real wins. An attempt floor is part of the chosen contract; the numeric example is not a global default.

[Read and review](index.html#R-a7cf2106e096) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/hillclimb.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/hillclimb.md`. Edit owner: `upstream/pstack/pstack/skills/poteto-mode/playbooks/hillclimb.md`.

### Fix a measured performance problem · original upstream

**replaced · Original pstack · Historical comparison**

Original before Kishu's replacement or patch. Read the current version beside it; the original is not an additional active instruction. Measure before and after, try simpler interventions first, and stop when the agreed target is met. Kishu relaxes automatic architecture/delegation, not the need for credible measurement.

[Read and review](index.html#R-0bbd3bf27b09) · [Source on GitHub](https://github.com/cursor/plugins/blob/ae5650febf4320793844c12c4adaa937f417f8da/pstack/skills/poteto-mode/playbooks/perf-issue.md)

Source: `upstream/pstack/pstack/skills/poteto-mode/playbooks/perf-issue.md`. Edit owner: `src/patches.json`.

## Routing

### Kishu's routing and precedence

**current · Kishu override · When Kishu mode is active**

Select only the workflow needed, preserve scope, use meaningful tests and real proof, and apply host/model preferences. Kishu's router overrides conflicting inherited defaults; it does not rewrite executable validators.

[Read and review](index.html#R-c8f510a31b50) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/SKILL.md)

Source: `plugin/lib/pstack/skills/kishu-mode/SKILL.md`. Edit owner: `overrides/pstack/skills/poteto-mode/SKILL.md`.

### Kishu's routing and precedence · bugbot triage

**current · Inherited pstack · When selected or relevant**

Select only the workflow needed, preserve scope, use meaningful tests and real proof, and apply host/model preferences. Kishu's router overrides conflicting inherited defaults; it does not rewrite executable validators.

[Read and review](index.html#R-54dfed1fd44a) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/references/bugbot-triage.md)

Source: `plugin/lib/pstack/skills/kishu-mode/references/bugbot-triage.md`. Edit owner: `upstream/pstack/pstack/skills/poteto-mode/references/bugbot-triage.md`.

### Kishu's routing and precedence · original upstream

**replaced · Original pstack · Historical comparison**

Original before Kishu's replacement or patch. Read the current version beside it; the original is not an additional active instruction. Select only the workflow needed, preserve scope, use meaningful tests and real proof, and apply host/model preferences. Kishu's router overrides conflicting inherited defaults; it does not rewrite executable validators.

[Read and review](index.html#R-6d97c7279f4f) · [Source on GitHub](https://github.com/cursor/plugins/blob/ae5650febf4320793844c12c4adaa937f417f8da/pstack/skills/poteto-mode/SKILL.md)

Source: `upstream/pstack/pstack/skills/poteto-mode/SKILL.md`. Edit owner: `overrides/pstack/skills/poteto-mode/SKILL.md`.

## Scope & autonomy

### Build a control interface for an agent

**current · Inherited pstack · When selected or relevant**

Optional guidance for a small interface around agent work. It can create software and dependencies, so it belongs in this review even though it is not a default coding step.

[Read and review](index.html#R-c1d47a319355) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/make-bot-ui/SKILL.md)

Source: `plugin/lib/pstack/skills/make-bot-ui/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/make-bot-ui/SKILL.md`.

### Design a workflow for unusual work

**current · Inherited pstack · When selected or relevant**

Assemble a task-specific plan with visible evidence for ambitious work. Kishu narrows this route so ordinary generalist tasks do not acquire an engineering program.

[Read and review](index.html#R-00aea4ab7722) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/figure-it-out/SKILL.md)

Source: `plugin/lib/pstack/skills/figure-it-out/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/figure-it-out/SKILL.md`.

### Favor user experience over implementation convenience

**current · Inherited pstack · When selected or relevant**

Prioritize polish and a coherent workflow. The 'ship fewer features' preference must not silently remove requested capability.

[Read and review](index.html#R-81a422d162d8) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-experience-first/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-experience-first/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/principle-experience-first/SKILL.md`.

### Keep a decision trail

**current · Inherited pstack · When selected or relevant**

Keep a reviewable record for long or unattended work. Kishu makes a larger audit trail conditional on benefit rather than requiring it for a small edit.

[Read and review](index.html#R-1929460e2aa4) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/show-me-your-work/SKILL.md)

Source: `plugin/lib/pstack/skills/show-me-your-work/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/show-me-your-work/SKILL.md`.

### Keep a decision trail · decision log template

**current · Inherited pstack · When selected or relevant**

Keep a reviewable record for long or unattended work. Kishu makes a larger audit trail conditional on benefit rather than requiring it for a small edit.

[Read and review](index.html#R-e336b37c173c) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/show-me-your-work/references/decision-log-template.tsv)

Source: `plugin/lib/pstack/skills/show-me-your-work/references/decision-log-template.tsv`. Edit owner: `upstream/pstack/pstack/skills/show-me-your-work/references/decision-log-template.tsv`.

### Proceed on authorized reversible work

**current · Inherited pstack · When selected or relevant**

Avoid unnecessary questions while preserving product decisions and irreversible-action gates. Kishu's explicit expensive-test decision gate overrides a blanket 'never ask' reading.

[Read and review](index.html#R-8190d4fc2442) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-never-block-on-the-human/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-never-block-on-the-human/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/principle-never-block-on-the-human/SKILL.md`.

### Write a tool for nontrivial work

**current · Inherited pstack · When selected or relevant**

Prefers a reusable script or generator even for one-off nontrivial work. This can improve repeatability, but may add tooling where direct work would suffice.

[Read and review](index.html#R-2b3101c44200) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-build-the-lever/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-build-the-lever/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/principle-build-the-lever/SKILL.md`.

## Stack maintenance

### Create or change agent instructions

**current · Inherited pstack · When selected or relevant**

Use a skill-authoring workflow for actual skill changes. This review records feedback without changing any installed instructions.

[Read and review](index.html#R-0758bf0cbfd6) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/authoring-a-skill.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/authoring-a-skill.md`. Edit owner: `upstream/pstack/pstack/skills/poteto-mode/playbooks/authoring-a-skill.md`.

### Fix recurring agent mistakes

**current · Inherited pstack · When selected or relevant**

Diagnose repeated errors and encode useful corrections in repository instructions or tooling. Running this can change future agent behavior.

[Read and review](index.html#R-df083dac7499) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/correct/SKILL.md)

Source: `plugin/lib/pstack/skills/correct/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/correct/SKILL.md`.

### Generate a personal working mode

**current · Inherited pstack · When selected or relevant**

Build or update a mode from observed preferences. Optional and potentially overlapping with Kishu; invoking it can create another instruction owner.

[Read and review](index.html#R-7b20c654329c) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/automate-me/SKILL.md)

Source: `plugin/lib/pstack/skills/automate-me/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/automate-me/SKILL.md`.

### Review and improve a workflow

**current · Inherited pstack · When selected or relevant**

Use reviewers to extract lessons and proposed updates. This is an explicit maintenance activity, not an automatic extra review of every task.

[Read and review](index.html#R-a1a48b15475b) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/reflect/SKILL.md)

Source: `plugin/lib/pstack/skills/reflect/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/reflect/SKILL.md`.

### Review and improve a workflow · divergent reviewer

**current · Inherited pstack · When selected or relevant**

Use reviewers to extract lessons and proposed updates. This is an explicit maintenance activity, not an automatic extra review of every task.

[Read and review](index.html#R-c7b73c11b90e) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/reflect/references/divergent-reviewer.md)

Source: `plugin/lib/pstack/skills/reflect/references/divergent-reviewer.md`. Edit owner: `upstream/pstack/pstack/skills/reflect/references/divergent-reviewer.md`.

### Review and improve a workflow · judgment reviewer

**current · Inherited pstack · When selected or relevant**

Use reviewers to extract lessons and proposed updates. This is an explicit maintenance activity, not an automatic extra review of every task.

[Read and review](index.html#R-f983b5fdb08c) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/reflect/references/judgment-reviewer.md)

Source: `plugin/lib/pstack/skills/reflect/references/judgment-reviewer.md`. Edit owner: `upstream/pstack/pstack/skills/reflect/references/judgment-reviewer.md`.

### Review and improve a workflow · synthesizer

**current · Inherited pstack · When selected or relevant**

Use reviewers to extract lessons and proposed updates. This is an explicit maintenance activity, not an automatic extra review of every task.

[Read and review](index.html#R-9c7a315d235e) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/reflect/references/synthesizer.md)

Source: `plugin/lib/pstack/skills/reflect/references/synthesizer.md`. Edit owner: `upstream/pstack/pstack/skills/reflect/references/synthesizer.md`.

### Review and improve a workflow · tooling reviewer

**current · Inherited pstack · When selected or relevant**

Use reviewers to extract lessons and proposed updates. This is an explicit maintenance activity, not an automatic extra review of every task.

[Read and review](index.html#R-1c42f9917dd8) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/reflect/references/tooling-reviewer.md)

Source: `plugin/lib/pstack/skills/reflect/references/tooling-reviewer.md`. Edit owner: `upstream/pstack/pstack/skills/reflect/references/tooling-reviewer.md`.

### Turn repeated lessons into checks

**current · Inherited pstack · When selected or relevant**

Prefer an enforceable mechanism to repeating an instruction. Choose carefully: an overly broad check can become a hard limit, as the plan checker demonstrates.

[Read and review](index.html#R-3b4b0c830609) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-encode-lessons-in-structure/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-encode-lessons-in-structure/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/principle-encode-lessons-in-structure/SKILL.md`.

## Tests & proof

### Build a reusable app verification guide

**current · Inherited pstack · When selected or relevant**

Create a project-specific way to launch and exercise real features. Worth considering when verification repeats; it is not required setup for every repository.

[Read and review](index.html#R-dc3ec2f94f27) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/create-verification-skill/SKILL.md)

Source: `plugin/lib/pstack/skills/create-verification-skill/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/create-verification-skill/SKILL.md`.

### Build a reusable app verification guide · README

**current · Inherited pstack · When selected or relevant**

Create a project-specific way to launch and exercise real features. Worth considering when verification repeats; it is not required setup for every repository.

[Read and review](index.html#R-c36786973398) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/create-verification-skill/references/feature-map-example/README.md)

Source: `plugin/lib/pstack/skills/create-verification-skill/references/feature-map-example/README.md`. Edit owner: `upstream/pstack/pstack/skills/create-verification-skill/references/feature-map-example/README.md`.

### Build a reusable app verification guide · create note

**current · Inherited pstack · When selected or relevant**

Create a project-specific way to launch and exercise real features. Worth considering when verification repeats; it is not required setup for every repository.

[Read and review](index.html#R-1e50e4b26aec) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/create-verification-skill/references/feature-map-example/create-note.md)

Source: `plugin/lib/pstack/skills/create-verification-skill/references/feature-map-example/create-note.md`. Edit owner: `upstream/pstack/pstack/skills/create-verification-skill/references/feature-map-example/create-note.md`.

### Build a reusable app verification guide · search

**current · Inherited pstack · When selected or relevant**

Create a project-specific way to launch and exercise real features. Worth considering when verification repeats; it is not required setup for every repository.

[Read and review](index.html#R-62c445947154) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/create-verification-skill/references/feature-map-example/search.md)

Source: `plugin/lib/pstack/skills/create-verification-skill/references/feature-map-example/search.md`. Edit owner: `upstream/pstack/pstack/skills/create-verification-skill/references/feature-map-example/search.md`.

### Check requested visual equivalence

**current · Inherited pstack · When selected or relevant**

Compare rendered results for matching or migration work. This is pstack verification guidance; Impeccable's taste rules are excluded from this review.

[Read and review](index.html#R-f67d837c803a) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/visual-parity.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/visual-parity.md`. Edit owner: `upstream/pstack/pstack/skills/poteto-mode/playbooks/visual-parity.md`.

### Create a formal verification workflow

**current · Inherited pstack · When selected or relevant**

Model selected properties and connect the model to implementation. Formal checks have their own assumptions and setup cost; Kishu's cost gate still applies.

[Read and review](index.html#R-4342f5a7951f) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/create-formal-verification-skill/SKILL.md)

Source: `plugin/lib/pstack/skills/create-formal-verification-skill/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/create-formal-verification-skill/SKILL.md`.

### Explore behavior through a state model

**current · Inherited pstack · When selected or relevant**

Model states and rules with TLA+, check them, and draw results. The bundled executable has explicit exploration and drawing limits; a model is not proof that real code behaves identically.

[Read and review](index.html#R-4362a3d703f8) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/SKILL.md)

Source: `plugin/lib/pstack/skills/statechart/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/statechart/SKILL.md`.

### Explore behavior through a state model · render

**current · Inherited pstack · When selected or relevant**

Model states and rules with TLA+, check them, and draw results. The bundled executable has explicit exploration and drawing limits; a model is not proof that real code behaves identically.

[Read and review](index.html#R-cfb69b390d46) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/statechart/references/render.md)

Source: `plugin/lib/pstack/skills/statechart/references/render.md`. Edit owner: `upstream/pstack/pstack/skills/statechart/references/render.md`.

### Keep the verification guide accurate

**current · Inherited pstack · When selected or relevant**

Compare the guide with the app and update stale feature coverage and control instructions. Conditional on a project using such a guide.

[Read and review](index.html#R-b22da7e62779) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/maintain-verification-skill/SKILL.md)

Source: `plugin/lib/pstack/skills/maintain-verification-skill/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/maintain-verification-skill/SKILL.md`.

### Maintain a formal model

**current · Inherited pstack · When selected or relevant**

Reconcile model, implementation, proofs, and documented coverage. This does not turn every software task into formal verification.

[Read and review](index.html#R-f27d3d38dc8c) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/maintain-formal-verification-skill/SKILL.md)

Source: `plugin/lib/pstack/skills/maintain-formal-verification-skill/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/maintain-formal-verification-skill/SKILL.md`.

### Protect behavior with tests

**current · Kishu override · When selected or relevant**

Kishu tests new or changed logic where regression is meaningful, reuses sufficient coverage, and asks before substantial testing costs. Cost alone is not permission to skip.

[Read and review](index.html#R-2cba54bc7e69) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/tdd/SKILL.md)

Source: `plugin/lib/pstack/skills/tdd/SKILL.md`. Edit owner: `overrides/pstack/skills/tdd/SKILL.md`.

### Run a controlled evaluation

**current · Inherited pstack · When selected or relevant**

Define the task, test setup, comparison, and evidence. Avoid claiming improvement from an insensitive or biased evaluation.

[Read and review](index.html#R-060a50df5621) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/kishu-mode/playbooks/eval.md)

Source: `plugin/lib/pstack/skills/kishu-mode/playbooks/eval.md`. Edit owner: `upstream/pstack/pstack/skills/poteto-mode/playbooks/eval.md`.

### Show evidence of the actual result

**current · Kishu override · When selected or relevant**

Kishu asks for the evidence relevant to the change and reuses still-valid evidence. A screenshot proves appearance, not all logic; a passing unit test does not prove appearance.

[Read and review](index.html#R-f74fc64644b4) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-prove-it-works/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-prove-it-works/SKILL.md`. Edit owner: `overrides/pstack/skills/principle-prove-it-works/SKILL.md`.

### Test what callers can observe

**current · Inherited pstack · When selected or relevant**

A test should catch a broken contract and survive an internal refactor. Invariants and observable external calls count as behavior.

[Read and review](index.html#R-87640b95e4f4) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-test-behavior-not-implementation/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-test-behavior-not-implementation/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/principle-test-behavior-not-implementation/SKILL.md`.

### Verify small units of work in sequence

**current · Inherited pstack · When selected or relevant**

Check each meaningful unit before building further. Upstream also prescribes trunk rebases and proof-oriented commit order; Kishu leaves delivery to the task and project.

[Read and review](index.html#R-f95c9827428e) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/skills/principle-sequence-verifiable-units/SKILL.md)

Source: `plugin/lib/pstack/skills/principle-sequence-verifiable-units/SKILL.md`. Edit owner: `upstream/pstack/pstack/skills/principle-sequence-verifiable-units/SKILL.md`.

### Protect behavior with tests · original upstream

**replaced · Original pstack · Historical comparison**

Original before Kishu's replacement or patch. Read the current version beside it; the original is not an additional active instruction. Kishu tests new or changed logic where regression is meaningful, reuses sufficient coverage, and asks before substantial testing costs. Cost alone is not permission to skip.

[Read and review](index.html#R-117fe2c9fe11) · [Source on GitHub](https://github.com/cursor/plugins/blob/ae5650febf4320793844c12c4adaa937f417f8da/pstack/skills/tdd/SKILL.md)

Source: `upstream/pstack/pstack/skills/tdd/SKILL.md`. Edit owner: `overrides/pstack/skills/tdd/SKILL.md`.

### Show evidence of the actual result · original upstream

**replaced · Original pstack · Historical comparison**

Original before Kishu's replacement or patch. Read the current version beside it; the original is not an additional active instruction. Kishu asks for the evidence relevant to the change and reuses still-valid evidence. A screenshot proves appearance, not all logic; a passing unit test does not prove appearance.

[Read and review](index.html#R-c4d17ca93020) · [Source on GitHub](https://github.com/cursor/plugins/blob/ae5650febf4320793844c12c4adaa937f417f8da/pstack/skills/principle-prove-it-works/SKILL.md)

Source: `upstream/pstack/pstack/skills/principle-prove-it-works/SKILL.md`. Edit owner: `overrides/pstack/skills/principle-prove-it-works/SKILL.md`.

## Upstream documentation

### 01 setup

**reference · Inherited pstack · Reference only**

Supporting upstream documentation. It can repeat older defaults and is not a new layer of active Kishu rules. Prefer the current router, adapters, and selected workflow when they conflict.

[Read and review](index.html#R-4b9fa2b22391) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/docs/guide/01-setup.md)

Source: `plugin/lib/pstack/docs/guide/01-setup.md`. Edit owner: `upstream/pstack/pstack/docs/guide/01-setup.md`.

### 02 poteto mode

**reference · Inherited pstack · Reference only**

Supporting upstream documentation. It can repeat older defaults and is not a new layer of active Kishu rules. Prefer the current router, adapters, and selected workflow when they conflict.

[Read and review](index.html#R-5e5047ff0044) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/docs/guide/02-kishu-mode.md)

Source: `plugin/lib/pstack/docs/guide/02-kishu-mode.md`. Edit owner: `upstream/pstack/pstack/docs/guide/02-poteto-mode.md`.

### 03 understand

**reference · Inherited pstack · Reference only**

Supporting upstream documentation. It can repeat older defaults and is not a new layer of active Kishu rules. Prefer the current router, adapters, and selected workflow when they conflict.

[Read and review](index.html#R-3e4eada44690) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/docs/guide/03-understand.md)

Source: `plugin/lib/pstack/docs/guide/03-understand.md`. Edit owner: `upstream/pstack/pstack/docs/guide/03-understand.md`.

### 04 design

**reference · Inherited pstack · Reference only**

Supporting upstream documentation. It can repeat older defaults and is not a new layer of active Kishu rules. Prefer the current router, adapters, and selected workflow when they conflict.

[Read and review](index.html#R-06aae6db935e) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/docs/guide/04-design.md)

Source: `plugin/lib/pstack/docs/guide/04-design.md`. Edit owner: `upstream/pstack/pstack/docs/guide/04-design.md`.

### 05 build and clean

**reference · Inherited pstack · Reference only**

Supporting upstream documentation. It can repeat older defaults and is not a new layer of active Kishu rules. Prefer the current router, adapters, and selected workflow when they conflict.

[Read and review](index.html#R-6b70802d85f1) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/docs/guide/05-build-and-clean.md)

Source: `plugin/lib/pstack/docs/guide/05-build-and-clean.md`. Edit owner: `upstream/pstack/pstack/docs/guide/05-build-and-clean.md`.

### 06 verify and ship

**reference · Inherited pstack · Reference only**

Supporting upstream documentation. It can repeat older defaults and is not a new layer of active Kishu rules. Prefer the current router, adapters, and selected workflow when they conflict.

[Read and review](index.html#R-3c1478b14243) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/docs/guide/06-verify-and-ship.md)

Source: `plugin/lib/pstack/docs/guide/06-verify-and-ship.md`. Edit owner: `upstream/pstack/pstack/docs/guide/06-verify-and-ship.md`.

### 07 overnight

**reference · Inherited pstack · Reference only**

Supporting upstream documentation. It can repeat older defaults and is not a new layer of active Kishu rules. Prefer the current router, adapters, and selected workflow when they conflict.

[Read and review](index.html#R-38fd09f9fa9f) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/docs/guide/07-overnight.md)

Source: `plugin/lib/pstack/docs/guide/07-overnight.md`. Edit owner: `upstream/pstack/pstack/docs/guide/07-overnight.md`.

### 08 principles

**reference · Inherited pstack · Reference only**

Supporting upstream documentation. It can repeat older defaults and is not a new layer of active Kishu rules. Prefer the current router, adapters, and selected workflow when they conflict.

[Read and review](index.html#R-bb384372fe37) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/docs/guide/08-principles.md)

Source: `plugin/lib/pstack/docs/guide/08-principles.md`. Edit owner: `upstream/pstack/pstack/docs/guide/08-principles.md`.

### 09 make it yours

**reference · Inherited pstack · Reference only**

Supporting upstream documentation. It can repeat older defaults and is not a new layer of active Kishu rules. Prefer the current router, adapters, and selected workflow when they conflict.

[Read and review](index.html#R-999a62ed4985) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/docs/guide/09-make-it-yours.md)

Source: `plugin/lib/pstack/docs/guide/09-make-it-yours.md`. Edit owner: `upstream/pstack/pstack/docs/guide/09-make-it-yours.md`.

### 10 recipes and pitfalls

**reference · Inherited pstack · Reference only**

Supporting upstream documentation. It can repeat older defaults and is not a new layer of active Kishu rules. Prefer the current router, adapters, and selected workflow when they conflict.

[Read and review](index.html#R-35525a58a849) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/docs/guide/10-recipes-and-pitfalls.md)

Source: `plugin/lib/pstack/docs/guide/10-recipes-and-pitfalls.md`. Edit owner: `upstream/pstack/pstack/docs/guide/10-recipes-and-pitfalls.md`.

### README

**reference · Inherited pstack · Reference only**

Supporting upstream documentation. It can repeat older defaults and is not a new layer of active Kishu rules. Prefer the current router, adapters, and selected workflow when they conflict.

[Read and review](index.html#R-7e63a07d5114) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/README.md)

Source: `plugin/lib/pstack/README.md`. Edit owner: `upstream/pstack/pstack/README.md`.

### README

**reference · Inherited pstack · Reference only**

Supporting upstream documentation. It can repeat older defaults and is not a new layer of active Kishu rules. Prefer the current router, adapters, and selected workflow when they conflict.

[Read and review](index.html#R-35fbc7daf99b) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/docs/guide/README.md)

Source: `plugin/lib/pstack/docs/guide/README.md`. Edit owner: `upstream/pstack/pstack/docs/guide/README.md`.

### claude code

**reference · Inherited pstack · Reference only**

Supporting upstream documentation. It can repeat older defaults and is not a new layer of active Kishu rules. Prefer the current router, adapters, and selected workflow when they conflict.

[Read and review](index.html#R-7e174c95bf85) · [Source on GitHub](https://github.com/SPDUK/kishu-stack/blob/main/plugin/lib/pstack/docs/harness/claude-code.md)

Source: `plugin/lib/pstack/docs/harness/claude-code.md`. Edit owner: `upstream/pstack/pstack/docs/harness/claude-code.md`.
