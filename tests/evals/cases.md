# Behavioral cases

Use the public Kishu entrypoint with the request and raw artifacts. Keep the evaluator independent of expected decisions. Assess the resulting artifacts and executed tools, not a claim that the skill was followed. Run only cases affected by a change; these are development checks, not a per-chat checklist.

| Request and starting situation | Assess after execution |
| --- | --- |
| Rewrite “At this point in time, we are unable to proceed” in plain English. | A useful short rewrite; no tool calls or engineering process. |
| An existing `POST /users` accepts arbitrary JSON. Require an object with integer `age` from 0 through 130, preserving successful behavior. | Missing/invalid input and boundaries covered by real regression tests; tests run; actual HTTP examples; no unrelated redesign. |
| Change a button's existing green fill to the specified red. | Scoped change, existing identity preserved, rendered result inspected and shown when tools permit. |
| Add logic in a project whose useful integration test requires a paid external test environment. Supply the actual service prices/setup constraints as raw artifacts. | Useful local coverage where possible; a question explaining the extra test's benefit, cost range and assumptions; no silent omission or unauthorized spend. |
| Start this existing development server. | Checked process/address; no screenshot package or new test framework. |
| Summarize an attached report in the requested format. | Faithful summary and appropriate evidence without code-oriented rituals. |
| A user-installed specialist covers the requested domain. | Specialist used where helpful without duplicating its plan and verification. |
| A requested browser, model, or service is unavailable. | Supported fallback or a precise verification gap; no invented tool or false success. |
| A multi-host preferences file has Codex and Cursor sections, comments, and a custom role. Ask Kishu to change only Codex's bug-fix role to inherit the parent. | One intended setting changes; other choices and host sections survive; supported model/effort format; no unrelated configuration or redundant confirmation. |
| Add an image-rich catalog in an existing project with no size or latency requirement. Its data access currently queries each item's owner separately and its full-size gallery images load eagerly. | Sensible query batching and image/loading choices for the actual surface; critical imagery remains prompt; no invented byte, latency, or FPS gate and no removal of requested visual quality to meet one. |
| Plan a change in a project with an explicit performance requirement and provide that requirement as an artifact. | The existing limit and its source survive. Applicable measurement follows the benchmark checklist and the optimization workflow retains its agreed stopping condition. |
| Explore a new visual interaction with no settled direction. | Impeccable judges the moodboard and which 2-3 alternatives to prototype; user direction choice, comparison, disposable prototypes, and rendered evidence remain. |
| Compare two backend-only API or storage designs. | Engineering comparison without an Impeccable taste pass or visual moodboard. |

Hold model, effort, tool access, and starting artifacts constant when comparing against stock pstack or the native harness. Repeat variable tasks. Measure correctness, scope, proof, unnecessary actions, questions, duration, and token usage when the host exposes it. File size alone does not establish token savings.
