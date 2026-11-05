"""Build a self-contained, review-only snapshot of Kishu's software instructions."""
from __future__ import annotations

import argparse
from collections import Counter
import hashlib
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent
OUTPUT = ROOT / "docs/preference-review"
CHAT_ONLY = {"bro", "in-your-own-words", "ketchup", "ketchup-video", "sharpen", "teach", "technical-writing", "unslop"}
SECTIONS = [
    {"title": "1. Performance & hidden requirements", "note": "When should measurement help a decision, and when does it become unnecessary work?", "ids": ["plan-gates", "benchmark-inspection", "measurement-limiter", "perf-target", "hillclimb-floor", "statechart-limits"]},
    {"title": "2. Scope & how much work to do", "note": "These rules shape whether an agent solves the task directly, adds tools, or expands the change.", "ids": ["lever-everywhere", "capability-vs-polish", "scope-and-gates"]},
    {"title": "3. Code design & maintainability", "note": "Useful engineering instincts, with a few strong opinions worth making explicit.", "ids": ["architecture-minimum", "redesign-vs-small-diff", "internal-validation", "typescript-opinions", "comment-removal"]},
    {"title": "4. Tests & visible proof", "note": "Keep quality high while matching verification to the behavior and its risk.", "ids": ["kishu-tests", "kishu-proof", "migration-sequencing"]},
    {"title": "5. Models, agents & budgets", "note": "These influence how the work is carried out, not what your software is allowed to do.", "ids": ["models-and-delegation", "context-budgets"]},
    {"title": "6. Delivery & optional automation", "note": "PR monitoring and issue automation have operational defaults of their own.", "ids": ["watcher-limits", "optional-benny"]},
    {"title": "7. Everything else, at your pace", "note": "The full inventory includes principles, ordinary build workflows, investigation, long-running programs, setup/update, references, and executable checks. You can leave feedback on any source block.", "ids": []},
]

# These explain the purpose of a source. Exact instructions are always retained below them.
OVERVIEWS = {
    "architect": ("Architecture", "Compare designs before implementation", "Sketch interfaces and ownership, compare alternatives, then implement. Kishu limits entry to consequential unresolved choices; the selected workflow still contains a two-design minimum."),
    "arena": ("Delegation", "Compare competing attempts", "Run candidates against the same task, judge them, and combine useful parts. Useful for uncertain designs; coordination and repeated work are real costs."),
    "swarm": ("Delegation", "Divide work among agents", "Specify independent slices or a race, isolate writers, and combine evidence. Missing workers or unsupported models must be reported."),
    "interrogate": ("Delegation", "Challenge a proposal", "Use an adversarial panel to find weaknesses. Kishu makes this conditional on a useful uncertainty or a request, rather than mandatory for every change."),
    "how": ("Investigation", "Understand the current code", "Trace the relevant behavior. Kishu permits direct investigation and reuses findings instead of always starting another agent."),
    "why": ("Investigation", "Find the reason behind a decision", "Search history and available evidence sources, distinguish evidence from inference, and report gaps. This is a selected investigation, not permission to query every service on every task."),
    "blast-radius": ("Investigation", "Check what else a change could break", "Trace dependencies beyond the edited lines and execute a check for the assumptions that matter. The skill prefers demonstrated defects over speculative risk lists."),
    "benchmark-checklist": ("Performance", "Check whether a measurement is believable", "Checks realistic workloads, errors, actual work, noise, tuning, and bottlenecks. It does not set a universal speed target, but its full measurement procedure can be demanding."),
    "tdd": ("Tests & proof", "Protect behavior with tests", "Kishu tests new or changed logic where regression is meaningful, reuses sufficient coverage, and asks before substantial testing costs. Cost alone is not permission to skip."),
    "no-comments": ("Code design", "Remove comments and challenge workarounds", "An optional specialist deletes most comments and flags code to reshape. Kishu removed the universal trigger, but the specialist itself remains strongly opinionated."),
    "typescript-best-practices": ("Code design", "TypeScript implementation preferences", "Rules about domain types, casts, schemas, arguments, tests, and telemetry. These can affect implementation choices when working in TypeScript; they are preferences, not language requirements."),
    "create-verification-skill": ("Tests & proof", "Build a reusable app verification guide", "Create a project-specific way to launch and exercise real features. Worth considering when verification repeats; it is not required setup for every repository."),
    "maintain-verification-skill": ("Tests & proof", "Keep the verification guide accurate", "Compare the guide with the app and update stale feature coverage and control instructions. Conditional on a project using such a guide."),
    "create-formal-verification-skill": ("Tests & proof", "Create a formal verification workflow", "Model selected properties and connect the model to implementation. Formal checks have their own assumptions and setup cost; Kishu's cost gate still applies."),
    "maintain-formal-verification-skill": ("Tests & proof", "Maintain a formal model", "Reconcile model, implementation, proofs, and documented coverage. This does not turn every software task into formal verification."),
    "statechart": ("Tests & proof", "Explore behavior through a state model", "Model states and rules with TLA+, check them, and draw results. The bundled executable has explicit exploration and drawing limits; a model is not proof that real code behaves identically."),
    "figure-it-out": ("Scope & autonomy", "Design a workflow for unusual work", "Assemble a task-specific plan with visible evidence for ambitious work. Kishu narrows this route so ordinary generalist tasks do not acquire an engineering program."),
    "show-me-your-work": ("Scope & autonomy", "Keep a decision trail", "Keep a reviewable record for long or unattended work. Kishu makes a larger audit trail conditional on benefit rather than requiring it for a small edit."),
    "recall": ("Investigation", "Recover relevant working context", "Reconstruct prior work from available history. Host adapters restrict source access and prevent unrelated-project transcript searches."),
    "correct": ("Stack maintenance", "Fix recurring agent mistakes", "Diagnose repeated errors and encode useful corrections in repository instructions or tooling. Running this can change future agent behavior."),
    "reflect": ("Stack maintenance", "Review and improve a workflow", "Use reviewers to extract lessons and proposed updates. This is an explicit maintenance activity, not an automatic extra review of every task."),
    "automate-me": ("Stack maintenance", "Generate a personal working mode", "Build or update a mode from observed preferences. Optional and potentially overlapping with Kishu; invoking it can create another instruction owner."),
    "setup-pstack": ("Models & setup", "Choose delegated models and effort", "Kishu's setup resolves actual host capabilities and saves per-role choices. These choices affect delegates, not the current parent chat's model."),
    "poteto-help": ("Models & setup", "Upstream setup and workflow advice", "Inherited help may describe upstream defaults. Current Kishu setup, model adapters, and router take precedence; treat this as supporting documentation."),
    "make-bot-ui": ("Scope & autonomy", "Build a control interface for an agent", "Optional guidance for a small interface around agent work. It can create software and dependencies, so it belongs in this review even though it is not a default coding step."),
    "poteto-mode": ("Routing", "Kishu's routing and precedence", "Select only the workflow needed, preserve scope, use meaningful tests and real proof, and apply host/model preferences. Kishu's router overrides conflicting inherited defaults; it does not rewrite executable validators."),
    "comment-sicko": ("Code design", "The comment-removal agent's instructions", "This agent has a narrow keep-list for comments and flags refactoring targets. It is optional under Kishu, but its aggressive deletion bias remains when selected."),
    "poteto-agent": ("Delegation", "The implementation delegate's instructions", "Delegates must read the correct mode and relevant principles. Kishu supplies the current router path and translates this role to the available host tool."),
}

PRINCIPLES = {
    "attack-the-premise": ("Investigation", "Recheck an assumption after repeated failed fixes", "After two failures sharing an assumption, test that assumption before another fix. This is a debugging stop rule, not a cap on possible solutions."),
    "boundary-discipline": ("Code design", "Validate at boundaries and trust typed internals", "Centralize validation and separate pure logic from framework wiring. The wording 'trust internal code unconditionally' deserves judgment for dynamic, concurrent, or mixed-trust systems."),
    "build-the-lever": ("Scope & autonomy", "Write a tool for nontrivial work", "Prefers a reusable script or generator even for one-off nontrivial work. This can improve repeatability, but may add tooling where direct work would suffice."),
    "encode-lessons-in-structure": ("Stack maintenance", "Turn repeated lessons into checks", "Prefer an enforceable mechanism to repeating an instruction. Choose carefully: an overly broad check can become a hard limit, as the plan checker demonstrates."),
    "exhaust-the-design-space": ("Code design", "Try two or three designs for novel choices", "Requires competing prototypes for novel architecture or interaction choices. Kishu's proportionality rule limits when the exercise is useful."),
    "experience-first": ("Scope & autonomy", "Favor user experience over implementation convenience", "Prioritize polish and a coherent workflow. The 'ship fewer features' preference must not silently remove requested capability."),
    "explain-the-number": ("Performance", "Explain a metric before trusting it", "Name the decision, noise, and measured bottleneck. It is a confidence standard for claims, not permission to invent a performance ceiling."),
    "fix-root-causes": ("Investigation", "Fix the original fault", "Reproduce, trace the causal chain, and address repeated instances. Kishu's scope rule still bounds how far a cleanup or instrumentation change should go."),
    "foundational-thinking": ("Code design", "Choose the data shape before the logic", "Get ownership, types, shared state, and useful infrastructure right early. 'Scaffold first' should be weighed against actual task needs and testing cost."),
    "guard-the-context-window": ("Delegation", "Keep context and phases manageable", "Suggests phase sizing, scope caps, and turn budgets to protect agent reasoning. These are workflow techniques; they should not silently reduce the user's requested outcome."),
    "laziness-protocol": ("Code design", "Prefer the smallest sufficient change", "Consolidate repeated choices and avoid boilerplate. A small diff is a preference, not a reason to leave necessary work incomplete."),
    "make-operations-idempotent": ("Code design", "Make retries converge safely", "Design state-changing operations to recover from retries and interrupted runs. Particularly relevant to installers, jobs, migrations, and lifecycle commands."),
    "migrate-callers-then-delete-legacy-apis": ("Code design", "Remove an internal API after migrating its callers", "Prefer a single migration wave over permanent compatibility layers. Public compatibility promises and staged deployments may require a different approach."),
    "minimize-reader-load": ("Code design", "Reduce indirection and hidden state", "Prefer code a maintainer can trace quickly. The 30-second comprehension test is a heuristic, not a measured project acceptance criterion."),
    "model-the-domain": ("Code design", "Use structures that express the domain", "Prefer types, tables, state machines, or other fitting structures over scattered conditions. The source explicitly says not to force an abstraction."),
    "never-block-on-the-human": ("Scope & autonomy", "Proceed on authorized reversible work", "Avoid unnecessary questions while preserving product decisions and irreversible-action gates. Kishu's explicit expensive-test decision gate overrides a blanket 'never ask' reading."),
    "outcome-oriented-execution": ("Code design", "Allow scoped intermediate breakage in migrations", "Optimize for the verified final design rather than temporary compatibility code. Applies to planned reversible phases, not arbitrary breakage of working software."),
    "prove-it-works": ("Tests & proof", "Show evidence of the actual result", "Kishu asks for the evidence relevant to the change and reuses still-valid evidence. A screenshot proves appearance, not all logic; a passing unit test does not prove appearance."),
    "redesign-from-first-principles": ("Code design", "Reconsider the design around a new requirement", "Think as if the requirement existed from day one. This can conflict with minimal diffs and scope preservation if treated as a mandatory rewrite."),
    "separate-before-serializing-shared-state": ("Code design", "Avoid shared writes when ownership can be separate", "Prefer independent write targets; serialize structurally when shared state is a real requirement. This is a concurrency design preference, not a ban on locks."),
    "sequence-verifiable-units": ("Tests & proof", "Verify small units of work in sequence", "Check each meaningful unit before building further. Upstream also prescribes trunk rebases and proof-oriented commit order; Kishu leaves delivery to the task and project."),
    "subtract-before-you-add": ("Code design", "Remove unnecessary complexity before adding more", "Prefer observed needs to speculative layers and validators. Useful simplification can become unrelated cleanup if the task's scope is ignored."),
    "test-behavior-not-implementation": ("Tests & proof", "Test what callers can observe", "A test should catch a broken contract and survive an internal refactor. Invariants and observable external calls count as behavior."),
    "type-system-discipline": ("Code design", "Encode distinctions in types", "Brand meaningful primitives, parse outside data, and derive schemas. Strictness can help correctness but should match language and repository conventions."),
}

PLAYBOOKS = {
    "feature": ("Build workflows", "Add or change behavior", "Kishu grounds the change, chooses a useful design approach, implements directly or with useful delegation, tests relevant logic, and supplies proof."),
    "bug-fix": ("Build workflows", "Reproduce and fix a defect", "Kishu reproduces on the relevant surface, traces the cause, adds useful regression coverage, and verifies the fix. Expensive tests require a decision, not silent skipping."),
    "refactoring": ("Build workflows", "Change structure while preserving behavior", "Kishu reuses sufficient investigation and tests, limits scope, and verifies behavior. It does not mandate a second architecture competition or a PR for every refactor."),
    "investigation": ("Investigation", "Answer without changing the project", "Read-only investigation stays read-only; use evidence and only the deeper workflows that help answer the question."),
    "perf-issue": ("Performance", "Fix a measured performance problem", "Measure before and after, try simpler interventions first, and stop when the agreed target is met. Kishu relaxes automatic architecture/delegation, not the need for credible measurement."),
    "hillclimb": ("Performance", "Iterate toward an agreed metric target", "Freeze a meaningful measurement, test one hypothesis at a time, and keep only real wins. An attempt floor is part of the chosen contract; the numeric example is not a global default."),
    "runtime-forensics": ("Investigation", "Diagnose a live runtime symptom", "Instrument the running system and deliver a diagnosis. A request for diagnosis does not automatically authorize a fix."),
    "trace-forensics": ("Investigation", "Diagnose a saved profiling trace", "Analyze the supplied artifact, separate evidence from causal guesses, and report the diagnosis."),
    "prototype": ("Code design", "Use a small experiment to settle a question", "Build the cheapest useful experiment for an observable uncertainty. Product preferences still belong to the user; Kishu's scope rule applies."),
    "visual-parity": ("Tests & proof", "Check requested visual equivalence", "Compare rendered results for matching or migration work. This is pstack verification guidance; Impeccable's taste rules are excluded from this review."),
    "opening-a-pr": ("Delivery", "Prepare an authorized pull request", "Kishu performs scoped review and relevant checks, writes a useful description, and opens a PR only when delivery calls for it."),
    "babysit": ("Delivery", "Watch or drive a PR toward readiness", "Choose a mode that matches the request, inspect concrete failures, and avoid merging beyond authorization. The watcher has configurable polling and error thresholds."),
    "shipping": ("Delivery", "Verify and land a stack", "Check each PR and the exact patch before merging an authorized contiguous stack. This is a selected shipping workflow, not the default end of every task."),
    "multi-phase-plan": ("Long-running work", "Write an executable multi-PR plan", "Produces a plan before execution. The selected workflow requires ten live lanes and interaction review. Kishu permits an explained Not applicable performance block; relevant performance checks use grounded acceptance criteria without inventing numeric caps."),
    "autopilot-full": ("Long-running work", "Run an authorized queue through merge", "Uses PR owners and independent verifiers under an explicit grant. The universal comment/deslop passes were removed, but substantial program machinery remains."),
    "autopilot-stack": ("Long-running work", "Prepare a queue for the user to land", "Runs an authorized multi-PR queue while reserving merge ownership for the user."),
    "autonomous-run": ("Long-running work", "Continue a task until its condition is met", "Kishu limits side fixes to the authorized goal and preserves decision gates. Continued execution requires actual host support; no fictional wakeups."),
    "orchestrate": ("Long-running work", "Coordinate a large standing program", "A coordinator delegates implementation and audits results across a multi-day program. Ordinary work that one agent can finish should not enter this route."),
    "pause-safely": ("Long-running work", "Stop work without losing its state", "Capture enough state to resume safely and honor the user's stop across active workers."),
    "session-pickup": ("Investigation", "Take over existing work", "Inspect the actual workspace and previous evidence, preserve decisions, and resume from verified state."),
    "worktree-cleanup": ("Delivery", "Clean up worktrees safely", "Check branch, uncommitted work, and delivery state before deleting worktrees. Cleanup is conditional on the task."),
    "eval": ("Tests & proof", "Run a controlled evaluation", "Define the task, test setup, comparison, and evidence. Avoid claiming improvement from an insensitive or biased evaluation."),
    "authoring-a-skill": ("Stack maintenance", "Create or change agent instructions", "Use a skill-authoring workflow for actual skill changes. This review records feedback without changing any installed instructions."),
}


def digest(text):
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def read(path):
    return path.read_text(encoding="utf-8").replace("\r\n", "\n")


def rebrand(text):
    return text.replace("poteto", "kishu").replace("Poteto", "Kishu")


def excluded_reason(rel):
    parts = Path(rel).parts
    if "test" in parts or ".test." in rel or "test-helper" in rel or "types.compile." in rel:
        return "Test fixture or test implementation; evidence about tools, not an operating preference."
    if len(parts) > 1 and parts[0] == "skills" and parts[1] in CHAT_ONLY:
        return "Communication, prose style, or explanation-only skill; outside this software-behavior review."
    if Path(rel).suffix.lower() in {".png", ".jpg", ".lock"} or Path(rel).name in {"LICENSE", ".gitignore"}:
        return "Asset, dependency lock, license, or repository housekeeping; not a preference."
    if "plugin.json" in rel or Path(rel).name in {"package.json", "tsconfig.json"}:
        return "Package or compiler metadata; no software-task workflow preference."
    return ""


def describe(rel):
    p = Path(rel)
    parts = p.parts
    if "playbooks" in parts:
        group, title, note = PLAYBOOKS[p.stem]
    elif p.stem in {"poteto-agent", "comment-sicko"}:
        group, title, note = OVERVIEWS[p.stem]
    elif len(parts) > 1 and parts[0] == "skills":
        skill = parts[1]
        if skill.startswith("principle-"):
            group, title, note = PRINCIPLES[skill.removeprefix("principle-")]
        else:
            group, title, note = OVERVIEWS[skill]
    elif parts[0] == "automations":
        group, title, note = "Optional automation", "Benny · " + p.stem.replace("-", " "), "Optional upstream issue-triage/reproduction automation. Bundled files do not mean its automations are configured or running. Budgets and communication permissions apply only when that workflow is deliberately installed."
    else:
        group, title, note = "Upstream documentation", p.stem.replace("-", " "), "Supporting upstream documentation. It can repeat older defaults and is not a new layer of active Kishu rules. Prefer the current router, adapters, and selected workflow when they conflict."
    if "references" in parts:
        title += " · " + p.stem.replace("-", " ")
    if "scripts" in parts:
        title = "Tool implementation · " + p.name
        note = "Executable supporting " + title.replace("Tool implementation · ", "") + ". These checks or limits apply only when this tool is invoked. The code is included so enforced requirements are reviewable alongside prose."
        group = "Executable tools"
    return group, title, note


def partition(text, markdown=True, excluded_sections=()):
    """Every nonblank nonheading line belongs to exactly one block or exclusion."""
    lines = text.splitlines()
    blocks, omitted, headings = [], [], []
    current = []
    section = "Overview"
    stack = []
    fence = None
    metadata = bool(markdown and lines and lines[0] == "---")
    skip_level = None

    def flush():
        if not current:
            return
        nonlocal section
        while current and not current[-1][1].strip():
            current.pop()
        if current:
            blocks.append({"section": section, "start": current[0][0], "end": current[-1][0], "text": "\n".join(t for _, t in current)})
        current.clear()

    for number, line in enumerate(lines, 1):
        if metadata:
            current.append((number, line))
            if number > 1 and line == "---":
                section = "Activation and metadata"
                flush()
                metadata = False
                section = "Overview"
            continue
        heading = re.match(r"^(#{1,6})\s+(.+)$", line) if markdown and not fence else None
        if heading:
            flush()
            level, title = len(heading[1]), heading[2]
            while stack and stack[-1][0] >= level:
                stack.pop()
            stack.append((level, title))
            section = " / ".join(x[1] for x in stack)
            headings.append(number)
            if skip_level is not None and level <= skip_level:
                skip_level = None
            if title in excluded_sections:
                skip_level = level
            continue
        if skip_level is not None:
            if line.strip():
                omitted.append({"line": number, "reason": "Excluded communication or Impeccable design section."})
            continue
        marker = re.match(r"^\s*(`{3,}|~{3,})", line) if markdown else None
        if marker:
            if fence is None:
                flush()
                fence = marker[1]
            elif marker[1][0] == fence[0] and len(marker[1]) >= len(fence):
                current.append((number, line))
                fence = None
                flush()
                continue
        if not fence and not line.strip():
            flush()
            continue
        # Each list item and table row is independently reviewable; code fences remain intact.
        if not fence and markdown and (re.match(r"^\s*(?:[-*+] |\d+[.)] )", line) or line.startswith("|")):
            flush()
        current.append((number, line))
    flush()
    covered = {n for b in blocks for n in range(b["start"], b["end"] + 1)}
    accounted = covered | set(headings) | {o["line"] for o in omitted}
    missing = [i for i, line in enumerate(lines, 1) if line.strip() and i not in accounted]
    if missing:
        raise ValueError(f"Unaccounted source lines: {missing}")
    return blocks, omitted


def make_catalog(root=ROOT):
    upstream = root / "upstream/pstack/pstack"
    lock = json.loads(read(root / "upstreams.lock.json"))
    upstream_commit = lock["sources"]["pstack"]["commit"]
    kishu_ref = "main"
    sources, rules, coverage = [], [], []
    patches = {p["path"] for p in json.loads(read(root / "src/patches.json")) if p["source"] == "pstack"}

    def add(key, path, text, group, title, note, edition, origin, scope, url, original_url="", edit_path="", excluded_sections=()):
        source_id = digest(key)[:12]
        blocks, omitted = partition(text, Path(path).suffix == ".md", excluded_sections)
        source = {"id": source_id, "key": key, "path": path, "title": title, "group": group, "note": note, "edition": edition, "origin": origin, "scope": scope, "url": url, "upstreamUrl": original_url, "editPath": edit_path or path, "hash": digest(text), "excludedLines": omitted, "ruleIds": []}
        occurrences = Counter()
        for block in blocks:
            signature = block["section"] + "\n" + block["text"]
            occurrences[signature] += 1
            block_id = "R-" + digest(key + "\n" + signature + "\n" + str(occurrences[signature]))[:12]
            rule = {**block, "id": block_id, "source": source_id, "hash": digest(block["text"])}
            rules.append(rule)
            source["ruleIds"].append(block_id)
        sources.append(source)
        return source_id

    for path in sorted(upstream.rglob("*"), key=lambda path: path.relative_to(upstream).as_posix()):
        if not path.is_file():
            continue
        rel = path.relative_to(upstream).as_posix()
        reason = excluded_reason(rel)
        item = {"path": "upstream/pstack/pstack/" + rel, "status": "excluded" if reason else "included", "reason": reason, "sources": []}
        coverage.append(item)
        if reason:
            continue
        runtime_rel = "plugin/lib/pstack/" + rebrand(rel)
        runtime = root / runtime_rel
        if not runtime.exists():
            raise ValueError(f"Missing packaged source: {runtime_rel}")
        original = read(path)
        effective = read(runtime)
        group, title, note = describe(rel)
        override = root / "overrides/pstack" / rel
        changed = override.exists() or rel in patches
        is_reference = rel.startswith("docs/") or rel == "README.md" or rel.startswith("skills/poteto-help/")
        edition = "reference" if is_reference else "current"
        scope = "Reference only" if is_reference else "When selected or relevant"
        if rel == "skills/poteto-mode/SKILL.md":
            scope = "When Kishu mode is active"
        elif rel.startswith("automations/"):
            scope = "Only after configuring Benny"
        elif "/scripts/" in rel:
            scope = "Only when this executable runs"
        edit_path = "overrides/pstack/" + rel if override.exists() else "src/patches.json" if rel in patches else "upstream/pstack/pstack/" + rel
        original_url = f"https://github.com/cursor/plugins/blob/{upstream_commit}/pstack/{rel}"
        url = f"https://github.com/SPDUK/kishu-stack/blob/{kishu_ref}/{runtime_rel}"
        exclusions = ("Communication", "Design") if rel == "skills/poteto-mode/SKILL.md" else ()
        item["sources"].append(add("current:" + rel, runtime_rel, effective, group, title, note, edition, "Kishu override" if changed else "Inherited pstack", scope, url, original_url, edit_path, exclusions))
        if changed:
            old_exclusions = ("Writing the reply",) if rel == "skills/poteto-mode/SKILL.md" else ()
            item["sources"].append(add("upstream:" + rel, item["path"], original, group, title + " · original upstream", "Original before Kishu's replacement or patch. Read the current version beside it; the original is not an additional active instruction. " + note, "replaced", "Original pstack", "Historical comparison", original_url, original_url, edit_path, old_exclusions))

    local_files = [*sorted((root / "src/adapters").glob("*.md"), key=lambda path: path.name), *sorted((root / "src/guides").glob("*.md"), key=lambda path: path.name), root / "src/entrypoint.md", root / "src/admin-entrypoint.md", root / "src/scripts/update_kishu.py", root / "scripts/kishu.py"]
    for path in local_files:
        rel = path.relative_to(root).as_posix()
        code = path.suffix == ".py"
        group = "Executable tools" if code else "Models & setup"
        title = "Kishu · " + (path.parent.name + " / " if path.parent.name in {"adapters", "guides"} else "") + path.stem.replace("-", " ")
        note = "Kishu's installation, activation, export, or update implementation. Included to expose enforced behavior and preservation rules; this code runs only when its command is invoked." if code else "Kishu's own entrypoint, setup/update instructions, or host mapping. Host capabilities and explicit user choices constrain inherited workflows. Setup is not run on ordinary tasks."
        sid = add("kishu:" + rel, rel, read(path), group, title, note, "current", "Kishu addition", "Command or host-specific", f"https://github.com/SPDUK/kishu-stack/blob/{kishu_ref}/{rel}")
        coverage.append({"path": rel, "status": "included", "reason": "Kishu addition", "sources": [sid]})

    findings = json.loads(read(HERE / "findings.json"))
    for finding in findings:
        finding["ruleIds"] = []
        for locator in finding.pop("locators"):
            matched_sources = [s for s in sources if s["key"] == locator["source"]]
            if len(matched_sources) != 1:
                raise ValueError(f"Finding source not unique: {locator}")
            matches = [r["id"] for r in rules if r["source"] == matched_sources[0]["id"] and locator["contains"] in r["text"]]
            if not matches:
                raise ValueError(f"Finding has no evidence: {locator}")
            finding["ruleIds"].extend(matches)
    version = json.loads(read(root / "plugin/.cursor-plugin/plugin.json"))["version"]
    source_hash = digest(json.dumps([(s["key"], s["hash"]) for s in sources], separators=(",", ":")))
    return {"schema": 1, "version": version, "upstreamCommit": upstream_commit, "kishuRef": kishu_ref, "kishuSourceHash": source_hash, "sources": sources, "rules": rules, "findings": findings, "sections": SECTIONS, "coverage": coverage}


def review_documents(catalog):
    findings = {f["id"]: f for f in catalog["findings"]}
    rules = {r["id"]: r for r in catalog["rules"]}
    sources = {s["id"]: s for s in catalog["sources"]}
    lines = ["# Review how Kishu works", "", "Start with the first section. You do not need to review everything in one sitting.", "", "For feedback, use the [interactive review](index.html) or write into [FEEDBACK.md](FEEDBACK.md). Use **Keep / Change / Ask first / Only on request / Remove / Unsure**. A short note is enough. Untouched items remain unreviewed. Nothing is applied automatically.", "", "This plan is generated; keep your notes in the page or FEEDBACK.md so rebuilding the catalog cannot overwrite them.", "", "**The main finding:** the selected multi-phase planning workflow still requires ten live verification lanes and review of interaction changes. Its performance section accepts `Not applicable.` with a specific reason and no performance boxes. When performance verification applies, use a credible concern, existing requirement, or actual platform constraint and grounded acceptance criteria. Numeric caps are not universal defaults. Other performance guidance checks measurement quality or governs optional optimization work.", ""]
    for section in catalog["sections"]:
        lines.extend(["## " + section["title"], "", section["note"], ""])
        for key in section["ids"]:
            item = findings[key]
            lines.extend(["### " + item["title"], "", "**Type:** " + item["kind"], "", "**What it means:** " + item["meaning"], "", "**Effect on your work:** " + item["effect"], "", "**Consider:** " + item["suggestion"], "", f"[Read exact instructions and leave feedback](index.html#{item['ruleIds'][0]}). Topic ID: `{item['id']}`.", ""])
            source_links = []
            for rule_id in item["ruleIds"]:
                rule = rules[rule_id]
                source = sources[rule["source"]]
                source_links.append(f"[{rule_id}]({source['url']}#L{rule['start']})")
            lines.extend(["Evidence: " + ", ".join(source_links) + ".", ""])
        if not section["ids"]:
            lines.extend(["Use the [source inventory](INVENTORY.md) to pick a topic, or search **All instructions** in the [review page](index.html). Each source has a purpose, scope, version label, and exact text. The coverage tab records every included and excluded upstream file.", ""])
    lines.extend(["## After your feedback", "", "1. Export feedback from the page, or save FEEDBACK.md, and give it back to Codex.", "2. Resolve any ambiguous notes into specific edits. Keep decisions that you marked Keep; do not interpret silence as approval to change a rule.", "3. Update the responsible router, leaf skill, or executable together. A prose override alone cannot relax a hardcoded checker.", "4. Check representative behavior: a small edit, a logic change needing tests, an expensive-test decision, a performance request, and an explicitly rigorous long-running task.", "5. Show the resulting diff and proof before reporting the revision complete. Publish or install it only under the applicable authorization.", "", f"Snapshot: Kishu {catalog['version']}; source-content SHA-256 {catalog['kishuSourceHash']}; pstack {catalog['upstreamCommit']}. Kishu links open current main; exact captured text and hashes are retained in the review. Impeccable and the ADHD communication policy are outside this review.", ""])
    inventory = ["# Source inventory", "", "Use this as a topic index. Exact wording and feedback controls are in the [review page](index.html). Current sources remain conditional on the task and Kishu's precedence rules. Original replacements and upstream reference documentation are labeled explicitly.", ""]
    for group in sorted({s["group"] for s in catalog["sources"]}):
        inventory.extend(["## " + group, ""])
        for source in sorted((s for s in catalog["sources"] if s["group"] == group), key=lambda s: (s["edition"], s["title"])):
            inventory.extend([f"### {source['title']}", "", f"**{source['edition']} · {source['origin']} · {source['scope']}**", "", source["note"], "", f"[Read and review](index.html#{source['ruleIds'][0]}) · [Source on GitHub]({source['url']})", "", f"Source: `{source['path']}`. Edit owner: `{source['editPath']}`.", ""])
    return {"REVIEW.md": "\n".join(lines), "INVENTORY.md": "\n".join(inventory)}


def build(check=False):
    catalog = make_catalog()
    serialized = json.dumps(catalog, ensure_ascii=False, indent=2) + "\n"
    payload = json.dumps(catalog, ensure_ascii=False, separators=(",", ":")).replace("<", "\\u003c").replace("\u2028", "\\u2028").replace("\u2029", "\\u2029")
    html = read(HERE / "page.html").replace("/*__CORE__*/", read(HERE / "review-core.js")).replace("/*__APP__*/", read(HERE / "review-app.js")).replace("__CATALOG__", payload)
    artifacts = {"catalog.json": serialized, "index.html": html, **review_documents(catalog)}
    if check:
        for name, content in artifacts.items():
            if read(OUTPUT / name) != content:
                raise SystemExit(f"Stale review artifact: {name}; run python tools/preference-review/build.py")
    else:
        OUTPUT.mkdir(parents=True, exist_ok=True)
        for name, content in artifacts.items():
            (OUTPUT / name).write_text(content, encoding="utf-8")
    print(f"{len(catalog['sources'])} source views; {len(catalog['rules'])} reviewable blocks; {len(catalog['coverage'])} inventoried files; {len(catalog['findings'])} guided findings")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    build(parser.parse_args().check)
