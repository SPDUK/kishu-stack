# Claude Code adapter

Use available native tools. Map pstack Task calls to the host's supported delegation API and question/todo calls to its native equivalents. A pstack agent name is a role: when no registered agent matches it, read `lib/pstack/agents/<name>.md` and use its relevant brief with a supported general agent.

Honor explicit user model-role preferences where supported. Use only model IDs the current host accepts; default to inheriting the current model. Do not convert a user's cross-family review into same-family review without disclosing the limitation. If delegation or a requested family is unavailable, use the workflow's supported fallback or work directly with the limitation stated.

Use the current host's browser, shell, search, connectors, planning, and skill-authoring facilities. Cursor-specific skills, `/loop`, `drive`, and transcript paths are not dependencies. Resolve plugin file paths from the plugin root and commands relative to the user's project as appropriate.

Plugin skills may be namespaced by the host. Use the exposed Kishu skill, normally `/kishu:kishu-mode`. A standalone installation can expose `/kishu-mode`. The router also recognizes that spelling in natural-language prompts. Optional always-on activation belongs in CLAUDE.md as a small reference to the entrypoint.
