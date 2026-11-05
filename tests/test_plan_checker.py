"""Exercise the packaged plan checker through its CLI, using real plan documents."""
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest


PROJECT = Path(__file__).resolve().parents[1]
CHECKER = PROJECT / "plugin/lib/pstack/skills/kishu-mode/scripts/check-plan.mjs"
RULE = "Tests alone are not sufficient verification. A PR is verified only when its unit and live boxes and any applicable perf boxes are all checked."


def plan(performance, *, lanes=10, review="None.", review_boxes=""):
    live = "\n".join(f"- [ ] Lane {i}. Save `lane-{i}.png`. Pass when the scenario succeeds." for i in range(1, lanes + 1))
    return f"""# Update the account page

## How to read this
One box is one unit of work and names the evidence. Check a box only when its evidence exists. See playbooks/.
{RULE}

## Program checklist
### Arm the program
### Spawn owners
### PR mechanics
### Verdict and merge
### Boot recipe
`git show origin/main:` /loop 1h status message

## Show the updated account (PR 1)
**Depends on.** None.
**Files.**
- [ ] Edit `account.py`.
**Build.**
- [ ] Implement the requested account behavior.
**You see.**
- [ ] The account reflects the requested change.
**Verify, unit.** {RULE}
- [ ] Run `python -m unittest` against the account behavior.
**Verify, live.** {RULE} Ten lanes on `example-model` at the PR head
{live}
**Verify, perf.** {RULE} {performance}
**Review gate.** {review}
{review_boxes}
**Merge.**
- [ ] Merge after the required approval.

## Close the program
- [ ] Verify all evidence and report completion.

## Appendix A. Prototype evidence
Recorded.
"""


def measured_gate(rule):
    return f"""Account loading previously repeated a query for every row.
- [ ] Metric. Query count for the account list workload.
- [ ] Probe. Run the same seeded list workload at trunk and head, following the benchmark checklist.
- [ ] Baseline. Record the measured trunk count first.
- [ ] Rule. {rule}
"""


class PlanCheckerTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.node = shutil.which("node")
        if cls.node is None:
            raise RuntimeError("Node.js is required to exercise Kishu's packaged plan checker.")

    def run_plan(self, content):
        (PROJECT / ".work").mkdir(exist_ok=True)
        with tempfile.TemporaryDirectory(prefix="plan-check-", dir=PROJECT / ".work") as temporary:
            file = Path(temporary) / "plan.md"
            file.write_text(content, encoding="utf-8")
            return subprocess.run([self.node, str(CHECKER), str(file)], capture_output=True, text=True, encoding="utf-8", timeout=20)

    def test_unrelated_change_can_omit_performance_work_with_a_reason(self):
        result = self.run_plan(plan("Not applicable. Copy correction with unchanged data access, assets, and rendering work."))
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("verify-perf=0", result.stdout)

    def test_relevant_behavior_check_does_not_need_an_invented_numeric_cap(self):
        result = self.run_plan(plan(measured_gate("No query is issued separately for each returned account.")))
        self.assertEqual(result.returncode, 0, result.stderr)

    def test_explicit_project_budget_is_still_supported(self):
        result = self.run_plan(plan(measured_gate("Meet the existing 200 ms requirement in `docs/service-objectives.md` under its specified workload.")))
        self.assertEqual(result.returncode, 0, result.stderr)

    def test_not_applicable_requires_a_reason(self):
        result = self.run_plan(plan("Not applicable."))
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("needs a specific reason", result.stderr)

    def test_not_applicable_cannot_hide_unfinished_performance_boxes(self):
        result = self.run_plan(plan("Not applicable. Copy-only change.\n- [ ] Metric. Measure request time."))
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("must not contain perf boxes", result.stderr)

    def test_an_applicable_gate_still_needs_all_its_evidence(self):
        incomplete = measured_gate("No query per returned account.").replace("- [ ] Baseline. Record the measured trunk count first.\n", "")
        result = self.run_plan(plan(incomplete))
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("perf boxes", result.stderr)

    def test_applicability_cannot_be_left_unresolved(self):
        result = self.run_plan(plan(""))
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("perf boxes", result.stderr)

    def test_optional_perf_does_not_remove_the_ten_live_lanes(self):
        result = self.run_plan(plan("Not applicable. Copy-only change.", lanes=9))
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("expected 1 to 10", result.stderr)

    def test_optional_perf_does_not_remove_visual_review_requirements(self):
        result = self.run_plan(plan("Not applicable. Copy-only change.", review="The operator reviews before merge.", review_boxes="- [ ] Show the screenshot to the operator."))
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('Review gate lacks "video"', result.stderr)
        complete = self.run_plan(plan("Not applicable. Copy-only change.", review="The operator reviews before merge.", review_boxes="- [ ] Show the screenshot and video to the operator."))
        self.assertEqual(complete.returncode, 0, complete.stderr)

    def test_code_examples_do_not_create_fake_plan_requirements(self):
        example = "\n````markdown\n```md\n## Example only\n```\n````\n"
        result = self.run_plan(plan("Not applicable. Copy-only change.") + example)
        self.assertEqual(result.returncode, 0, result.stderr)


if __name__ == "__main__":
    unittest.main()
