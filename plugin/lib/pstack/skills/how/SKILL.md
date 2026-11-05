---
name: how
description: "Explain subsystem architecture, ownership, and flow when investigation is needed."
---

# How

Explore the relevant code or artifact to answer how it works. Reuse current findings and inspect only what is needed for the question or change.

For a narrow question or single module, the main agent explores and explains directly. For a complex subsystem, divide independent unknowns into useful angles and delegate if the host supports it and the benefit justifies the coordination. Use `references/explorer-prompt.md` and `references/explainer-prompt.md` as appropriate; a second synthesis agent is optional when the main agent already has sufficient context.

Honor Kishu's host adapter and the user's model-role choices. Give each explorer the question, scope, relevant paths, and expected evidence. Verify important findings against the sources rather than repeating an agent's conclusion unchecked.

Use the amount of explanation the user needs. An architectural walkthrough can cover concepts, runtime flow, ownership, and gotchas. A specific question can receive a specific answer. Internal investigation does not require a separate explanatory report before implementation.
