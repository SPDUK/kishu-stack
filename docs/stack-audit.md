**Kishu stack audit — discussion draft**

Decision after this audit: the user declined all proposed additional skills and tools. Build only from pstack, Impeccable, and i-have-adhd. The optional candidates below are historical research, not implementation requirements.

Reviewed November 2, 2026, America/Los_Angeles. This is a source audit and a design recommendation. No candidate tools were installed, and no runtime token or performance benchmark was run. Repository links point to the revisions available during this review and can change upstream.

Kishu should remain a generalist. Its default package should combine a carefully adapted pstack, communication derived from i-have-adhd, conditional Impeccable design guidance, and the user's test and evidence requirements. Users can add domain specialists. There is no separate personal taste system.

The most valuable next step is resolving conflicts and overly broad triggers in the chosen foundations. Another general workflow framework would duplicate responsibility.

**Findings and recommended changes**

| Finding | Observed source behavior | Recommended Kishu behavior |
|---|---|---|
| Architecture activates too broadly | The mode routes code crossing a function boundary through architect. | Use architecture exploration for consequential design uncertainty, ownership changes, or explicit requests. Ordinary edits can proceed directly. |
| Investigation can repeat | Feature calls how, then architect. Architect's grounding phase calls how again. Even the simple how path spawns an explainer. | Reuse valid investigation from the current task. Let the main agent handle narrow questions directly. Delegate when an independent angle or separable workload provides value. |
| Implementation delegation is mandatory | The feature playbook requires a delegate and routes implementation alternatives through arena. | Preserve the workflow for work that benefits from it. Permit direct implementation for bounded, understood tasks. |
| Communication has competing owners | Pstack has goal restatements, principle reporting, playbook reply formats, and unslop. i-have-adhd adds action-first replies and state restatement. | Give one adapted communication policy ownership of chat responses. Keep specialist formats for actual documents and PRs when useful. |
| Expensive-test skipping exists in multiple files | Both the TDD skill and bug-fix playbook allow skipping expensive or unclear tests. | Update both, plus any derived references. Meaningful but expensive tests need a user decision with cost and benefit explained. |
| Verification is already present | Prove It Works requires direct observation and visible, repeatable evidence. | Extend this existing rule with task-appropriate presentation. Avoid adding a second verification framework. |
| Automatic comment review adds work | No Comments spawns a specialist, can route to how/why/architect, and can modify code around findings. | Keep comment cleanup available when requested or warranted by a review. Remove the universal pre-review trigger. |
| Workflow assumptions can expand scope | The feature flow ends in Opening a PR; the mode also assumes external skills such as cursor-team-kit. | Let the user's request and project workflow determine delivery. Resolve capabilities through the host adapter instead of assuming a named plugin exists. |

Sources: [mode](https://github.com/cursor/plugins/blob/main/pstack/skills/poteto-mode/SKILL.md), [feature](https://github.com/cursor/plugins/blob/main/pstack/skills/poteto-mode/playbooks/feature.md), [how](https://github.com/cursor/plugins/blob/main/pstack/skills/how/SKILL.md), [architect](https://github.com/cursor/plugins/blob/main/pstack/skills/architect/SKILL.md), [No Comments](https://github.com/cursor/plugins/blob/main/pstack/skills/no-comments/SKILL.md), [TDD](https://github.com/cursor/plugins/blob/main/pstack/skills/tdd/SKILL.md), [bug fix](https://github.com/cursor/plugins/blob/main/pstack/skills/poteto-mode/playbooks/bug-fix.md), [Prove It Works](https://github.com/cursor/plugins/blob/main/pstack/skills/principle-prove-it-works/SKILL.md), [i-have-adhd](https://github.com/ayghri/i-have-adhd/blob/main/skills/i-have-adhd/SKILL.md).

These findings identify potential overhead and conflicts in the instructions. They do not establish how often a particular model follows each branch or the resulting token cost.

**Keep the good parts**

Keep pstack's focus on root causes, observable behavior, small justified changes, verifiable progress, and meaningful tests. Its existing [verification-skill generator](https://github.com/cursor/plugins/blob/main/pstack/skills/create-verification-skill/SKILL.md) can teach an agent how to launch and exercise a particular project. Use it when repeated verification would justify the setup; adapt its Cursor-specific output paths.

Keep Impeccable as the design specialist. Its current skill already distinguishes refinement from redesign, preserves the incumbent implementation for narrow refinements, and avoids making missing PRODUCT.md block those refinements. Kishu should preserve that scoped behavior. A color change should not automatically become a critique, redesign, hardening pass, and optimization pass. [Impeccable skill](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/SKILL.md)

Use i-have-adhd's prioritization, visible progress, and matter-of-fact error reporting. Adapt action-first to outcome-first when the agent has completed work. Give a next action only when the user needs to act. Explain fully when requested. Keep estimates conditional and grounded, particularly at expensive-test decisions. Use the communication preferences without requiring a medical assertion about the user. [Communication source](https://github.com/ayghri/i-have-adhd/blob/main/skills/i-have-adhd/SKILL.md)

Integrate activation once. The upstream i-have-adhd opt-in startup hook injects its full ruleset; adding that alongside a Kishu rule containing the same policy would duplicate instructions. [Startup hook](https://github.com/ayghri/i-have-adhd/blob/main/hooks/always-on.mjs)

**Existing additions worth evaluating**

| Candidate | Useful contribution | Disposition |
|---|---|---|
| [Context7](https://github.com/upstash/context7/blob/master/README.md) | Targeted library documentation and version-specific examples through CLI or MCP. | Optional. Use when local context or an existing documentation tool does not resolve the question. Do not import its suggested universal code-generation trigger. |
| [agent-browser](https://github.com/vercel-labs/agent-browser/blob/main/README.md) | A browser CLI with compact snapshots, interaction, screenshots, and Windows binaries. | Optional fallback where the host lacks suitable browser control. Prefer already available native tools when they meet the task. |
| [RTK](https://github.com/rtk-ai/rtk/blob/master/README.md) | Filters noisy shell output before it enters model context. | Experiment separately. Check exit-code and diagnostic preservation, raw-output access, Windows behavior, and interaction with proof capture before recommending a default. Its reported shell-output reductions are not equivalent to total task savings. |
| [Anthropic skill-creator evaluation tooling](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md) | Comparisons against a baseline, observed outcomes, and timing/token reporting. | Useful while developing Kishu. Adapt the evaluation method to the available host tools; do not add another always-active authoring policy to everyday chats. |
| [Agent Skills reference validation](https://agentskills.io/specification#validation) | Checks skill metadata and naming. | Use in Kishu's development and release checks. It does not validate behavioral quality. |

These candidates have different purposes. Documentation retrieval and browser control fill capability gaps. Output filtering targets execution overhead. Evaluation and validation maintain Kishu itself. None needs to run on every request.

**Existing additions to leave out of the default package**

[Superpowers](https://github.com/obra/superpowers/blob/main/README.md) is an alternative complete workflow. Adding it to pstack would duplicate planning, investigation, implementation, reviews, and verification. Its [bootstrap](https://github.com/obra/superpowers/blob/main/skills/using-superpowers/SKILL.md) aggressively requires skill loading even for weak matches. That conflicts with Kishu's restraint requirement. Its [completion-verification skill](https://github.com/obra/superpowers/blob/main/skills/verification-before-completion/SKILL.md) also overlaps pstack's existing evidence rule. Do not combine the two frameworks by default.

Do not bundle another generic frontend-design framework alongside Impeccable. Its README documents that it started from Anthropic's frontend-design skill and now includes its own design workflows. [Impeccable README](https://github.com/pbakaus/impeccable/blob/main/README.md)

Security suites, framework-specific packs, and domain skills should remain user-selected extensions. Kishu can use an appropriate installed specialist when the actual task calls for it. This replaces the earlier suggestion to include a broad security suite in the core.

**Small policies that are still missing**

1. A direct route for ordinary answers and actions. A generalist needs to complete a calculation, edit a sentence, or summarize supplied material without constructing an engineering workflow. It can also hand a task to an installed specialist without running a second competing workflow around it.
2. Clear ownership. Kishu decides task routing and scope; pstack supplies relevant engineering workflows; Impeccable owns design judgment; the adapted communication policy owns the chat report. These remain subordinate to the user's request, project instructions, and harness requirements.
3. A single test decision rule. Add or update tests for new or changed logic with meaningful regression risk. Check whether existing coverage already protects the behavior. Run relevant checks. For meaningful coverage requiring substantial additional setup or cost, explain the failure it catches, dependencies, rough effort range, recurring cost, and smaller useful alternatives, then ask. Continue independent work while waiting. A declined test remains a specific recorded coverage gap.
4. Evidence that matches the claim. Use a fresh rendered screenshot for a visual change, actual requests and responses for an API change, executable results for logic, source links for research, and a reviewed artifact for writing. Do not force every task into a terminal-command or screenshot format. Reuse evidence while the relevant artifact and environment are unchanged; rerun when a later change can invalidate it.
5. Capability-aware packaging. Check installation, references, missing tools, duplicate activation, and supported model choices during setup or diagnosis. Do not run a full environment inventory each turn. Keep upstream revisions pinned, preserve license notices, and review updates before release.

Expensive tests and uninformative tests are separate cases. User approval can authorize additional testing effort; it does not make a test that asserts nothing useful worth writing.

The missing policies should be incorporated into existing entrypoints and relevant leaf skills. Avoid adding a separately loaded framework for each policy.

**Specific integration issue to resolve before shipping**

Impeccable's current README documents a live-edit fallback that can launch Codex or Claude with approvals and sandboxing disabled. If Kishu includes live mode, configure its copy agent to use the current chat or disable that fallback. This is a concrete integration setting to review, not a reason to add a security audit to every task. [Documented live behavior](https://github.com/pbakaus/impeccable/blob/main/README.md)

**How to check that Kishu earns its overhead**

Compare the same tasks under the native harness, stock pstack, and Kishu. Hold the model, reasoning setting, tool access, and starting artifacts constant. Use repeated runs where variability matters. Grade outcomes from actual artifacts and tool results, not the agent's claim that it followed a rule.

| Representative request | What the comparison should establish |
|---|---|
| Explain a short concept or edit a sentence | Correct, useful response without unrelated tools or workflow. |
| Summarize a supplied document | Preserves key facts and requested format without invoking engineering skills. |
| Start an existing development server | Confirms startup and reports where to access it without an unnecessary evidence package. |
| Change a button color | Makes the scoped change and supplies a fresh screenshot without redesigning the page. |
| Add age validation to an API | Covers valid, missing, and invalid inputs with meaningful tests and observed examples. |
| Fix logic with an existing test suite | Adds or updates regression coverage and runs affected checks. |
| Change logic where useful tests require new infrastructure | Explains cost and benefit and asks instead of silently skipping or committing to major setup. |
| Use a user-installed specialist | Selects that capability and preserves its workflow without duplicate planning. |
| Work without the preferred browser or model | Uses an available supported alternative or reports the exact verification limitation. |
| Resume after context compaction | Preserves scope, decisions, and pending approvals without restarting unnecessary work. |

Measure correctness, coverage of the user's request, evidence quality, unnecessary actions, questions asked, elapsed time, and actual token usage when the host exposes it. Do not use file length or a tool's output-compression percentage as a substitute for end-to-end usage. Include cases where Kishu should add almost no work.

There is relevant caution from existing research: a study of repository context files found that they did not generally improve success on its tested coding tasks and increased inference cost. That is not a result about Kishu or every skill. It supports measuring additions against a baseline. [Evaluating AGENTS.md, revision 3](https://arxiv.org/abs/2602.11988v3)

Current OpenAI guidance likewise recommends narrower skill descriptions, conditional references, and revisiting unnecessary instructions. [Rethinking skills and prompts](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra)

The accepted implementation is a narrow pstack adaptation with one communication policy, conditional Impeccable routing, and the test/evidence changes above. The additional candidates were declined and are not included. Use behavior comparisons during development to check the chosen stack's value.
