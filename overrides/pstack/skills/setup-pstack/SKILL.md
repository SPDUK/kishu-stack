---
name: setup-pstack
description: "Kishu's inherited pstack model setup. Configure available models and reasoning effort per delegated role through the Kishu entrypoint, preserving existing preferences across Codex, Cursor, and Claude Code."
---

# Set up Kishu models

Configure pstack's role choices using the current harness's actual delegation capabilities. This guide is internal: invoke it through Kishu with "configure my models" or "set up Kishu". It does not install the plugin or change the model selected for the main chat. If the user only asks how setup works, explain it without changing anything.

## Read the current choices

Use the router's configuration precedence: an explicitly referenced file, project `.kishu/models.md`, user `~/.kishu/models.md`, then legacy `~/.cursor/rules/pstack-models.mdc`. An applicable file takes precedence as a whole; unspecified roles inherit the parent. Read only the current host's section in a multi-host file. Treat an unsectioned legacy rule as applying to its declared host, or the current host if no host is declared.

Keep an existing selected path when updating choices. For new personal configuration, use `~/.kishu/models.md`; use project `.kishu/models.md` when the user asks for project-scoped choices. Resolve `~` through the current host's home directory. The Kishu router reads these files, so Codex does not need to understand Cursor `.mdc` rules for the legacy fallback to work.

## Discover capabilities, then choose

1. Inspect the subagent tool's accepted model IDs and reasoning settings. A model available in the main-chat picker is not necessarily available for delegation. Use a host entitlement API when available. Never invent a model ID or infer an accepted reasoning field from a model name.
2. Retain current role choices. With no existing configuration, default to `inherit-parent`; `auto` is an equivalent alias. Both omit a model override and preserve inherited effort. If a model or effort is no longer available, show the affected role and supported alternatives. Do not silently replace a requested cross-family review with a same-family panel.
3. If preferences are missing, ask for a reasoning target and any role overrides. Reuse choices already given in this chat. Pstack's labels are `small` (medium), `medium` (high), `large` (xhigh), and `unlimited` (max). They are reasoning targets, not price caps or a promise of unlimited resources. Apply only supported efforts; if the target is unsupported, explain the nearest supported lower effort before selecting it. Inherited aliases remain inherited.
4. Show the concrete role/model/effort changes. Resolve missing decisions; an explicit request for supported choices already authorizes those edits and does not need a second approval. A general question does not authorize choosing new preferences for the user.

On **Codex**, store a real model ID and reasoning effort separately, for example `<confirmed-model-id> <confirmed-effort>`. Pass them as separate tool arguments. Use `fork_turns: "none"` with an explicit override where required, and provide the task context in the brief. Do not append `-xhigh`, `-max`, or `-fast` to a GPT ID. On another host, use the format its tools actually accept; preserve its host section separately instead of reinterpreting one host's model IDs for another.

## Save only the requested settings

Preserve unrelated rules, comments, custom roles, and other host sections. Do not replace the entire existing instruction file. A new portable file can use this shape (replace aliases only with confirmed, chosen values):

```markdown
# Kishu model preferences

## Codex
# budget: inherit
feature, refactoring: inherit-parent
bug-fix: inherit-parent
perf-issue: inherit-parent
hillclimb: inherit-parent
judgment and prose: inherit-parent
hardest tasks: inherit-parent
how explorer: inherit-parent
how explainer: inherit-parent
why investigators: inherit-parent
why synthesizer: inherit-parent
reflect tooling: inherit-parent
reflect judgment, divergent, synthesizer: inherit-parent
arena runners: inherit-parent
arena cross-judge pool: inherit-parent
swarm workers: inherit-parent
architect runners: inherit-parent
interrogate reviewers: inherit-parent
```

Use `## Cursor`, `## Claude Code`, or the actual host name for another section. Panel roles accept comma-separated entries; each runner/reviewer entry counts as a candidate. The cross-judge pool selects one available model from a different family than the parent; an inherited alias cannot satisfy that requirement. If no such judge is available, disclose the limit and use the workflow's supported fallback. A configured panel does not make delegation mandatory for ordinary tasks.

If the configuration lives outside the plugin's built-in discovery paths, preserve or add one small reference in the host instructions so later Kishu chats can find it. Never copy personal model choices into the generated plugin. Read back the saved host section and report the changed roles, actual path, and any unsupported choices left unresolved. The choices can apply to subsequent delegations after reloading the file; start a new chat if the host has cached an old rule. Keep verification-skill setup and other optional onboarding out of this model-configuration task unless requested.
