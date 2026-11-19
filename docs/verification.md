# Verification

Verification history from the local Windows workspace. Each revision below records its executed checks and limits; the original installation checks began on November 2, 2026 (America/Los_Angeles).

## Kishu v0.1.7 release checks — November 19, 2026

The release ZIP matched the generated plugin byte for byte across all 646 archive entries, including the manifest and dependency lock. A fresh Codex profile discovered both public skills and passed same-version refresh and marketplace migration. In Edge at 1280px and 390px, all three installer tabs used the v0.1.7 tag, the release link pointed to v0.1.7, and the FAQ showed the reviewed dependency versions. [Release notes](releases/v0.1.7.md) · [Site checks](../site/VERIFICATION.md)

## Dependency refresh — November 19, 2026

The local Codex development install uses Kishu 0.1.6 with these revisions from the three tracked `main` branches.

| Dependency | Version | Pinned commit |
| --- | --- | --- |
| pstack | 0.15.36 → 0.15.44 | [50b3a323](https://github.com/cursor/plugins/tree/50b3a3234bf2e0293849a48784d72030948e44ee/pstack) |
| Impeccable | 4.8.2 → 4.10.0 | [b49177d3](https://github.com/pbakaus/impeccable/tree/b49177d32788f2dc585c42831d845dacf1ebed2c) |
| i-have-adhd | 0.4.1, already current | [1ecea199](https://github.com/ayghri/i-have-adhd/tree/1ecea1993b7fce257ffbd686c070948b5e07eda6) |

The generated router links all 22 upstream playbooks. Kishu retains its adapted plan checker after its removal upstream. A regression test exercises removal, explicit acceptance, rebuilding, and an upstream reintroduction. The standalone worker brief and planner links resolve to the exported files.

On Windows, 46 root regression tests, 6 preference-review Python tests, 7 preference-review Node tests, and 38 site tests passed. Generated package, preference snapshot, site asset, and MMO story checks passed. The isolated Codex installation exposed both skills and passed same-version refresh and marketplace migration. The refreshed local install matched all 645 generated payload files and its manifest. The Investigation, Runtime forensics, and Trace forensics playbooks matched their prior installed contents byte for byte, and their router links resolved in the native and standalone bundles. The Impeccable launcher reported engine 0.1.27 during the dependency refresh. Live design workflows were outside this check.

## Release 0.1.6 preparation — November 10, 2026

Rebuilt the package as 0.1.6 with the image-proof handoff rules and reviewed upstream refresh. Updated the README and site installation commands and generated discovery content to the new tag.

Executed on the release candidate: 43 root regression tests, 6 preference-review Python tests, 7 preference-review Node tests, and 38 site tests passed (94 total). Generated-package validation, review snapshot freshness, site resource/discovery checks, MMO/story checks, and native Codex isolated installation, discovery, same-version refresh, and source migration passed. The ZIP was generated successfully. Hosted Windows/Ubuntu checks and publication are recorded by the tag's [release workflow](https://github.com/SPDUK/kishu-stack/actions/workflows/verify.yml).

The image handoff was exercised after the earlier policy-only check: a sub-agent rendered a new local HTML proof card with Chromium headless-shell and saved a 1200 × 780 PNG. The main agent opened that exact file and embedded its absolute path in the final reply. The earlier interactive-browser attempt was stopped by Computer Use before navigation and produced no screenshot. This confirms the local artifact handoff was performed; it does not prove rendering in every client. Missing-artifact and unsupported-display evaluation cases remain unexecuted.

## Upstream refresh — November 10, 2026

Fetched the three tracked upstream branches with the maintenance updater. The full-file override baselines and targeted patch anchors passed without conflicts; Kishu's preferences and the image-proof handoff changes remain in place.

| Source | Previous revision | Installed source revision | Result |
| --- | --- | --- | --- |
| pstack | `ae5650febf4320793844c12c4adaa937f417f8da` | `246bc508c139c5e036dfafea8978d31a7433279f` | Repository pin advanced; the bundled pstack subtree is byte-for-byte unchanged upstream. |
| Impeccable | `9fadc41729c38fd47d7ae622b501558653f9d2e9` | `f2baa414a87d9acf1e21ccf776bfaec0262ad6df` | Skill 4.8.0 → 4.8.2; engine 0.1.18 → 0.1.22. Includes launcher, live editing, audit, and design guidance updates. |
| i-have-adhd | `1ecea1993b7fce257ffbd686c070948b5e07eda6` | `1ecea1993b7fce257ffbd686c070948b5e07eda6` | Already current. |

Executed after the refresh: 43 root regression tests, 6 preference-review Python tests, 7 preference-review Node tests, generated-package check, review snapshot check, and live-browser JavaScript syntax check passed. Native Codex isolated installation, skill discovery, same-version refresh, and source-migration smoke checks passed. The Windows launcher returned `impeccable-engine 0.1.22`. Design workflows and live-browser interactions were not exercised end to end.

Reinstalled the local development build as Kishu 0.1.5 in the normal Codex profile. The plugin is enabled and its entire installed cache matches the generated package. This is a local upstream refresh, not a newly published Kishu release; refresh skills or start a new chat to load the new instructions.

## Image proof handoff — November 10, 2026

The router and proof guide now require the main agent to retrieve and inspect image evidence, including sub-agent artifacts, and embed or attach it in the final user-facing reply. The Codex adapter specifies absolute image paths, paths containing spaces, missing-artifact recovery, and honest fallback when inline display is unavailable.

Executed: generated-package build/check, 43 root regression tests, 6 preference-review Python tests, 7 preference-review Node tests, 38 site tests, review snapshot freshness, site resource/discovery checks, and MMO/story checks all passed. The local Codex plugin was refreshed; the installed router, proof guide, and adapter match the generated files byte-for-byte. Changed skill frontmatter and local links were checked directly. The separate skill-creator validator could not start because this Python environment lacks PyYAML; no dependency was installed.

Three behavioral evaluation briefs cover accessible sub-agent images, missing/private artifacts, and hosts without inline display. These briefs were added but not executed as independent agent trials. Package tests do not establish that a future response renders in the user's UI; live end-to-end image delivery remains unverified.

## Stable release updater: 0.1.5 — November 4, 2026

Kishu now selects GitHub's latest published stable release, or an explicitly requested published version, and installs its exact tagged commit. Drafts, prereleases, missing releases and tag/package mismatches are rejected without installing `main`. The default checkout is `~/.kishu/releases`; older managed sources are preserved. The release workflow packages and publishes only after both hosted verification jobs succeed.

Executed before publication:

- Root regression suite: **43 passed**, including **17 updater cases** with real temporary Git repositories and a simulated GitHub HTTP boundary. Cases cover newer unreleased `main`, annotated release tags, repeated installation, rollback, clean legacy-main migration, local-work protection, unavailable releases, invalid metadata, rate limiting, offline lookup and source restoration after installer failure.
- Generated-package check and reproducible ZIP packaging: passed for **0.1.5**.
- Native Codex isolated smoke: installation, both enabled public skill discoveries, cache/package comparison, repeat installation, same-version content refresh and marketplace-source migration passed.
- Preference-review verification: **6 Python and 7 Node cases** passed; snapshot freshness passed. Site verification: **38 tests**, discovery/resource checks and the MMO/story checks passed. The combined local suites contain **94 passing tests**.
- An actual unauthenticated GitHub lookup for the not-yet-published `v0.1.5` returned the intended failure; the updater exited unsuccessfully without creating its checkout or installing anything.
- Workflow YAML parsed successfully. Independent review found no actionable correctness, data-loss or publication blocker.

These are local pre-publication results. The [Actions workflow](https://github.com/SPDUK/kishu-stack/actions/workflows/verify.yml) records hosted checks and publication, and the [v0.1.5 release](https://github.com/SPDUK/kishu-stack/releases/tag/v0.1.5) contains the packaged artifact and checksum. Live Cursor and Claude Code loading remains unverified.

## License packaging and publication preparation — November 4, 2026

The public demo collection now contains Veldrift, Meridian and Stillroom, with original generated artwork and separate visual directions. The integrated site suite passed **38 tests**, recursive resource and discovery checks passed, and browser flows and responsive layouts were exercised. The [site verification record](../site/VERIFICATION.md) describes those observations and the detector's remaining advisories. Together with 33 root regression cases and 6 Python / 7 Node preference-review cases, the local suites contain **84 passing tests**. The first hosted check exposed a commit-dependent review snapshot; its [reproducibility fix](preference-review/VERIFICATION.md) is included in this release.

The license review found two missing inherited MIT notices, for modern-screenshot and platform-design-skills. Their complete upstream texts are now included in generated plugins and standalone exports. Existing distribution tests check both copies. The root suite passed **33 tests**, the generated-package check passed, and the preference-review snapshot was regenerated and checked after the builder changed.

The GitHub workflow supports manual dispatch and a Pages deployment after both verification jobs pass, restricted to public `main`. Local results in this record are distinct from hosted verification; the [Actions page](https://github.com/SPDUK/kishu-stack/actions/workflows/verify.yml) records checks and deployment for each published commit. The [license review](licensing.md) records the included notices and original generated artwork. Earlier third-party showcase media was excluded from the public source and was never pushed.

## Public README and repository cleanup — November 4, 2026

The README now leads with the Kishu icon, benefits and installation; setup, model configuration, source attribution and maintenance remain available. It includes the real earlier concept demo as a visual example and removes the stale eight-test claim. Detailed working defaults and the repository map use native disclosures. The release instructions now live in the maintenance guide.

The preference review was refreshed from 0.1.2 to the current 0.1.4 sources, correcting its universal performance-gate wording while preserving actual live-lane and interaction-review requirements. Saved feedback was preserved. Local Sites registration and captured development screenshots are ignored; original design records, artwork provenance and licenses remain. Historical asset notes now use portable paths.

Executed during this revision:

- Root regression suite: **33 passed**. Generated-package check: passed for Kishu 0.1.4.
- Site suite: **21 passed**. Main-site resources/discovery and earlier concept demo/story checks: passed.
- Preference review: **4 Python and 7 Node tests passed**; regenerated snapshot freshness check passed. See its own verification history for scope.
- CI now runs those existing site and preference-review checks alongside package verification on Windows and Ubuntu. The changed workflow was not executed on hosted runners during this local task.
- README presentation was checked in light and dark local Markdown previews at 1280px and in a 390px phone layout, with no document overflow. The icon and showcase image loaded; jump links and the working-defaults disclosure worked. All 27 checked local documentation references resolved. This is not a claim of a published GitHub rendering or a deployment.

No plugin behavior, model preferences, installed skills or upstream pins changed in this revision.

## General wording audit: 0.1.4

The November 3 audit found that the recent performance guidance repeated the user's illustrative problems as runtime rules, and design routing repeated specific exclusions. The router and affected playbooks now use the intended experience, expected workload, likely impact, and justified acceptance criteria. Impeccable's role is expressed positively for visual and interaction decisions; its duplicated router paragraphs were combined. Concrete scenarios remain in tests and historical verification records. The plan checker's required syntax and all executable behavior are unchanged.

The existing 33 regression tests passed, as did the generated-package check, both public skill metadata checks, and the isolated native Codex smoke test. The regular Codex installation was refreshed to 0.1.4 and its cache matches the generated package. This was a wording and scope audit; no new model behavior trial was run for this revision. The prior performance workflows, benchmark checklist, experience-first principle, and visual-parity workflow remain unchanged.

## Performance and visual exploration: 0.1.3

On November 3, Kishu's performance preferences were narrowed to concrete concerns in the changed work, existing user or project requirements, and actual platform constraints. The router rules out invented numeric budgets, including when using Impeccable. The multi-PR plan and its executable checker now accept a performance section marked not applicable with a reason; applicable checks can use a concrete behavior criterion without a numeric cap. Live lanes and visual review remain required by that playbook.

Impeccable now guides the choice of visual or interaction prototypes and the reference moodboard. The user's direction choice, competing alternatives, disposable prototypes, and proof remain. Pure architecture and API alternatives retain engineering criteria without an Impeccable pass. The existing performance-fix playbook, hillclimb stopping rules, benchmark checklist, experience-first principle, and visual-parity playbook were compared with the previous release and are unchanged.

Executed:

```text
python -m unittest discover -s tests -v
Ran 33 tests
OK

python scripts/kishu.py check
Checked Kishu 0.1.3: mode + setup/update dispatcher, three pinned sources.
```

The ten new tests run the packaged JavaScript plan checker through Node.js with real temporary Markdown plans. They cover explained non-applicability, relevant checks without invented caps, explicit project budgets, missing performance evidence, malformed exemptions, and preservation of live-lane and screenshot/video review requirements. They check plan structure, not whether a stated performance requirement is substantively justified. The Git fixture suite again needed approved Windows shell escalation for local transport IPC.

`python scripts/smoke_codex.py` passed native installation, both public skill discoveries, repeat installation, content refresh, and marketplace source migration in an isolated profile. Kishu 0.1.3 was then installed and enabled in the regular Codex profile; its cache matches the generated package. Both public skills passed the host metadata validator. That validator does not accept pstack's inherited internal `disable-model-invocation` field; the internal guide was left unchanged in that respect and is not a separately exposed Codex skill. Bun is unavailable here, so the inherited Bun suite was not run; the Node-based regression cases exercise the changed checker.

An independent agent received only the public entrypoint and a planning request for a photo catalog with unsettled layout, existing cream/charcoal identity, N+1 owner queries, eagerly loaded original images, and no published performance targets. Its response proposed a moodboard, user direction choice, three distinct layout/interaction candidates, and comparable disposable prototypes. It addressed query batching and image variants, preserved promptly loaded visible images and visual quality, and declined to invent byte, timing, or frame-rate caps. This was a planning-only trial; no rendered prototypes, actual performance measurements, or production changes were produced. The new backend-only case remains a future behavioral check.

## Setup/update commands: 0.1.2

On November 3, `kishu` was added as the setup/update dispatcher alongside `kishu-mode`. The native Codex smoke test discovered both `kishu:kishu` and `kishu:kishu-mode`, with no internal library skills exposed. It also verified content refresh and migration from an existing local marketplace to another source checkout.

An independent setup walkthrough kept a supplied multi-host model file byte-for-byte unchanged and added only a project-local always-on Kishu block, as requested. The block references the installed mode by name rather than a versioned cache. Kishu 0.1.2 was also installed in the regular Codex profile; its cache matches the generated package.

The regression suite now has 23 passing tests. Seven added tests use real local Git repositories to verify cloning, fast-forward updates, explicit standalone destinations, preservation of local edits/development branches/unpublished commits, wrong-origin rejection, and honest installer failure reporting. Two CLI-contract tests cover refreshing an already-installed Claude plugin and refusing a source conflict without removing marketplace data; these are simulated CLI tests, not live Claude Code validation. The remaining sections record earlier checks; their one-skill catalog describes versions before the administration command was added.

## Model setup update: 0.1.1

On November 3, the inherited model setup guide was adapted for Codex's separate model/effort parameters and routed through the single Kishu entrypoint. Existing explicitly referenced pstack configurations remain supported; new portable configurations can use separate host sections outside the generated plugin.

An independent agent received a multi-host preferences file and a request to make only Codex's `bug-fix` role inherit the current chat. Read-back inspection confirmed the exact one-line change, preserving the other Codex roles, a custom role, comments, and the Cursor section. The agent made the explicitly requested edit without an unnecessary confirmation. The real user's model configuration was not changed.

All 14 regression tests and the native Codex installation/discovery/content-refresh smoke test passed again for 0.1.1. The generated package check passed.

## Build and update regression suite

Executed:

```text
python -m unittest discover -s tests -v
Ran 14 tests
OK
```

The suite uses actual local Git repositories to exercise compatible upgrades, upstream conflicts, a simulated failure publishing the new lock, generated-file edits, dirty sources, patch failures, standalone export, always-on activation, cleanup boundaries, pstack route coverage, license notices, and portable line endings. It confirms that rejected updates preserve the prior lock, build, and checked-out revisions.

The Windows shell sandbox initially prevented Git's local transport from creating its IPC objects. The successful suite ran with approved shell escalation. A later intermittent Windows directory-rename failure led to a bounded retry for transient access/sharing failures; persistent failures still propagate, and update rollback remains tested.

`python scripts/kishu.py check` also rebuilt the real pinned bundle and confirmed the generated files match. The host skill-creator validator accepted the public skill metadata.

## Native Codex installation

Executed `python scripts/smoke_codex.py` with a fresh workspace-local profile. The normal user's Codex configuration was unchanged. Observed result:

```json
{
  "plugin": "kishu@kishu-local",
  "installed": true,
  "enabled": true,
  "discovered_skills": ["kishu:kishu-mode"],
  "cache_matches_package": true,
  "repeat_install": "passed",
  "same_version_content_refresh": "passed"
}
```

This checks native marketplace registration, installation, repeat installation after a same-version source change in an isolated copy, cached file contents, and the app-server's actual `skills/list` response. The exposed skill is namespaced by Codex. The internal pstack and Impeccable libraries do not appear as additional public plugin skills.

After verification, `python scripts/kishu.py install --harness codex` installed Kishu in the user's regular Codex profile. `codex plugin list --marketplace kishu-local --json` confirmed it installed and enabled. Its cached files match the verified package. Existing harness instruction files were not edited; always-on activation remains optional.

## Independent behavior checks

An independent agent received the public entrypoint, an isolated Python HTTP server, and this request:

> POST /users must require age. Accept only a JSON object whose age is an integer from 0 through 130. Preserve successful request behavior otherwise.

It added scoped validation and five HTTP-based regression tests, including object validation, missing age, invalid types/ranges, accepted boundaries, and preserved successful payloads. The agent observed a failing missing-age regression before the fix, then five passing tests. The resulting implementation and tests were inspected by the parent agent. Actual response examples reported by the evaluator included:

```text
{}             -> 400
{"age": true}  -> 400
{"age": 130}   -> 201 {"user": {"age": 130}}
```

A follow-up request to simplify a sentence produced only: “We can’t move forward right now.” It did not introduce a coding workflow.

A separate scenario supplied a hosted-queue verification requirement, 10–20 minutes of provisioning, 40–60 minutes of testing, and 120,000 billable operations at $0.0004 each. Kishu kept the integration property explicitly unverified, calculated approximately 50–80 minutes and $48 in operation charges, and asked for that decision while proposing independent preparation. It neither silently skipped the test nor treated the local fake as proof. This was a decision scenario; no vendor resources were provisioned.

These are narrow behavioral checks, not a controlled performance comparison against stock pstack or a proof that every model will follow the instructions.

## Remaining validation limits

- Cursor and Claude Code formats and installation paths follow their current official documentation. Live loading in those applications was not exercised here; Claude Code is not installed on this host.
- The standalone export is checked for one public skill, working entry/router/design links, rewritten internal paths, and idempotent replacement. Other harness runtimes were not exercised.
- The early behavior trials above did not include a rendered-UI task. Later [site work](../site/BUILD_STORY.md) and the [demo collection](../site/VERIFICATION.md) have their own rendered evidence. No actual paid-service test, broad domain benchmark or total-token comparison is claimed; future cases remain in `tests/evals/cases.md`.
- Windows/Linux CI is configured in `.github/workflows/verify.yml`; hosted results are available in the repository's [Actions page](https://github.com/SPDUK/kishu-stack/actions). The local checks above are reported separately from hosted results.
- Impeccable's optional downloaded runtime and live design server were not launched. Its launcher, references, license, and third-party notice are included.

The build is ready for local use and further evaluation. These limits should remain visible when describing its maturity.
