### Bug fix

1. Reproduce the reported failure through the relevant user or caller interface. If direct reproduction is unavailable, investigate as far as the tools allow and state the exact limitation.
2. Trace the cause using concrete hypotheses and observations. Reuse current context; use `how` or `why` for unresolved flow or history. After repeated fixes fail on the same assumption, test that assumption before another patch.
3. Select the smallest fix that addresses the cause. A function boundary alone does not need `architect`. Delegate only when independent investigation, review, or separable implementation earns its cost.
4. Follow the **tdd** skill. Add or update a meaningful regression test, demonstrate the intended failure before the fix when practical, and confirm it passes afterward. Useful expensive tests trigger the user's cost decision; they are not silently skipped.
5. Repeat the original reproduction after the fix and run affected tests plus required project checks. For a UI change, inspect the rendered result and provide a fresh screenshot when useful. For an API fix, show actual relevant requests and responses.
6. Review the scoped diff. Commit or open a PR only when requested or part of the agreed project workflow. Report the cause, changed behavior, observed proof, and any unverified gap.
