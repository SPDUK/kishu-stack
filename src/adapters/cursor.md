# Cursor adapter

Use Cursor's current tools and the user-configured model-role choices. Check model availability before delegation and inherit the current model when there is no applicable choice. Never fabricate a model ID or silently substitute a same-family panel for a requested cross-family review.

Pstack's specialist agent names describe roles. Read the corresponding file in `lib/pstack/agents/` when the host has no registered agent type, then give that brief to an available general agent. Delegate only when the Kishu router selects a task that benefits from it.

The cursor-team-kit plugin is optional. Use the host's existing UI/CLI control, review, and skill-authoring facilities when a guide names an unavailable external skill. A missing optional helper does not stop unrelated work. Use only the active workspace's transcript context.

Resolve all bundled paths from the plugin root, while keeping command cwd at the user's project. The public entrypoint is `/kishu-mode`. Optional always-on activation is one small Cursor rule pointing at that entrypoint, not a second copy of its instructions.
