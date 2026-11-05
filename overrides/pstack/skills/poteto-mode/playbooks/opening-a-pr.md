### Opening a PR

Use this playbook only when the user requested a PR or the agreed project workflow includes one. A reference from another playbook does not itself authorize publishing.

1. Inspect the actual working tree and target branch. Preserve unrelated work. Use an isolated branch or worktree when needed; follow project naming conventions and the host's branch prefix.
2. Review the diff for correctness, scope, and maintainability. Run relevant tests and required project checks. Use available review tools when they help; cursor-team-kit, deslop, and no-comments are not required dependencies.
3. Create focused commits when authorized, preserving useful history and the user's changes. Do not reset a dirty branch or rewrite shared history merely to satisfy a preferred commit shape.
4. Use the host's native PR tool when available, otherwise the repository's established forge tool. Respect requested draft/readiness state. A check that did not run is a reported gap, never a green result.
5. Write a concise title and description covering the problem, resulting behavior, relevant tradeoffs, and actual verification. Attach screenshots or sample outputs when they demonstrate the change. Use the repository template where required.
6. Return the real PR link and any material blocker. Opening a PR does not authorize merging, deployment, or a continuing babysit loop; use the matching playbook when those actions are requested.
