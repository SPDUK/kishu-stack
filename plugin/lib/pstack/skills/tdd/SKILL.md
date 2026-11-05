---
name: tdd
description: "Protect new or changed logic with meaningful behavior tests, reproduce bugs with regression tests, and ask before substantial additional testing costs."
---

# Tests for behavior that could regress

Use the project's existing test approach. Identify the observable behavior and the failure a test should catch. Reuse or extend existing coverage instead of duplicating it. Do not create tests that merely restate implementation text, mock behavior, or constants.

For added or changed logic, add or update appropriate tests and run affected tests plus required project checks. For a bug, reproduce the intended failure before the fix where practical, then confirm the same check passes after it. A behavior-preserving refactor can use existing sufficient coverage or a focused characterization test.

## When useful tests are expensive

Substantial fixture setup, missing infrastructure, slow integration runs, paid services, or ongoing maintenance trigger a user decision. Explain what the tests protect, why the cost exists, a rough effort/cost range with assumptions, and any smaller meaningful alternative. Ask whether to do that work. Continue independent authorized work while waiting; elapsed time is not approval.

Do not silently skip because a test is expensive or integration-heavy. If the user declines, record the specific coverage gap and perform other useful verification. If the test path is unclear, investigate enough to explain the options before asking. Uninformative or brittle tests should be improved or omitted on their merits; cost alone is not the same as low value.

## Verify and report

Confirm bug regressions fail for the intended reason and pass after the fix when practical. Keep test data isolated and cleanup scoped to what the run created. Do not weaken assertions to make wrong behavior pass. Distinguish new failures from pre-existing failures and checks that were not run.

Report the executed command and meaningful result. If failure-before evidence or a required check could not be obtained, state the exact limitation. Do not claim that writing a test proves it passed.
