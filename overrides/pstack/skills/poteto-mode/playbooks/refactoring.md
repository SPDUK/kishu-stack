### Refactoring

1. Identify the observable behavior that must remain unchanged. Inspect the affected code directly or use `how` where needed. Reuse sufficient existing tests; add characterization coverage for meaningful uncovered regression risk.
2. Name the simpler target structure and why the change is useful. Use `architect` when choosing among consequential designs, not merely because the change crosses a function boundary.
3. Move in small, behavior-preserving steps. Update callers and references together. Keep unrelated features and cleanup outside the requested scope. Delegate mechanical work only when separation improves throughput or review.
4. Run affected tests and required project checks. The **tdd** policy governs substantial new testing costs: explain and ask instead of either silently skipping coverage or undertaking major setup without a decision.
5. Verify equivalence through the relevant artifact or interface. Larger changes may need recorded baseline comparisons. Inspect and capture visual evidence for changed presentation; no screenshot is needed for a purely internal change with appropriate behavior evidence.
6. Review the diff for unintended behavior changes and remaining callers. Commit or open a PR only when the task or agreed workflow calls for it. Report the structural improvement, observed equivalence, and any coverage gap.
