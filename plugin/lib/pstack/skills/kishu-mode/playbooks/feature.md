### Feature

1. Understand the requested behavior and the smallest affected part of the system. Reuse current investigation. Use `how` when the ownership or flow is unclear; a straightforward change can be understood directly.
2. Choose the data shape and approach. Use `architect` or competing designs only for consequential design uncertainty or an explicit request. Use Impeccable for relevant design work, preserving the brief and existing identity during refinement.
3. Implement the scoped behavior. Delegate separable work or independent review when useful; the main agent can implement a bounded change. Use a short plan for work that benefits from one.
4. Follow the **tdd** skill for new or changed logic with regression risk. Add or update useful tests, run affected tests, and ask about substantial extra testing cost instead of silently skipping it.
5. Verify the actual behavior on the relevant interface. Inspect the rendered result for visual changes and capture useful evidence. Distinguish failed, unavailable, and passing checks.
6. Review the diff for correctness, unintended changes, and applicable project requirements. Run required checks. Reverify behavior affected by subsequent edits.
7. Commit or open a PR only when the task or agreed project workflow calls for it, using **Opening a PR**. Report the outcome, important decisions, proof, and any remaining gap using Kishu's communication policy.
