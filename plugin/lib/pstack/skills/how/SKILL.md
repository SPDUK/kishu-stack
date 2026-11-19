---
name: how
description: "Explain subsystem architecture, ownership, and flow when investigation is needed."
---

# How

Explore the relevant code or artifact to answer how it works. Reuse current findings and inspect only what is needed for the question or change.

For a narrow question or single module, the main agent explores and explains directly. For a complex subsystem, delegate independent questions when the host supports it and the benefit justifies the coordination. A delegate can trace the code and explain its findings in one read-only pass.

Honor Kishu's host adapter and the user's model-role choices. Give each explorer the question, scope, relevant paths, and expected evidence. Verify important findings against the sources rather than repeating an agent's conclusion unchecked.

Use the amount of explanation the user needs. An architectural walkthrough can cover concepts, runtime flow, ownership, and gotchas. A specific question can receive a specific answer. Internal investigation does not require a separate explanatory report before implementation.
