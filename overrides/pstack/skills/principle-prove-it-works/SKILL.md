---
name: principle-prove-it-works
description: "Verify the actual result and show task-appropriate evidence before claiming completion."
---

# Prove It Works

Check the real artifact or behavior, not a proxy, another agent's claim, a cached image, or compilation alone. Choose a check that could reveal the relevant failure. Prefer a repeatable check when the behavior warrants it and reuse existing project tooling.

Match the evidence to the work. Show a fresh inspected screenshot for a visual change when possible, actual requests and responses for an API change, and the executed command and outcome for logic. Research uses relevant sources. Documents and other artifacts require inspecting the requested result. A simple process-start task needs direct readiness verification and its address/status, not a screenshot ceremony.

Capture evidence after the relevant change. Rerun when subsequent edits or environmental changes invalidate it, not merely because another message was sent. Keep useful proof available to the user after temporary test resources are cleaned up. Redact secrets and unnecessary personal data.

The [testing policy](../tdd/SKILL.md) controls test coverage and expensive-test decisions. A screenshot does not replace a needed behavior test, and a passing unit test does not demonstrate visual correctness.

State what was verified and what remains unverified. A command suggested to the user is not evidence that it ran. If a tool or environment prevents a check, report that precise gap and continue work that does not depend on it. Save a larger audit trail only when the work benefits from one.
