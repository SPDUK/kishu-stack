<p align="center">
  <img src="docs/brand/kishu-stamp.png" width="112" height="112" alt="Kishu puppy icon">
</p>

<h1 align="center">Kishu</h1>

<p align="center">
  <strong>Big ideas. One command.</strong><br>
  Give your agent a clear way to work — from a quick question to a carefully crafted interface.
</p>

<p align="center">Codex · Cursor · Claude Code · Agent Skills</p>

<p align="center">
  <a href="#why-kishu">Why Kishu</a> ·
  <a href="#install">Get started</a> ·
  <a href="#built-with-kishu">See the work</a> ·
  <a href="#whats-inside">Credits</a>
</p>

---

## Why Kishu

Describe the result you want. **Kishu mode** helps your agent choose an approach, bring in the right guidance, and carry the work through to a result you can inspect.

- **Less work managing the work.** One entrypoint routes the task. Small requests stay direct; deeper investigation and delegation come in when they help.
- **Design gets real attention.** Kishu's design taste engine guides composition, interaction and polish while respecting your brief and existing identity.
- **Clear progress, less mental overhead.** ADHD-aware communication puts the outcome first, keeps decisions easy to find, and leaves room for detail when you need it.
- **Useful proof of the result.** Relevant tests, rendered interfaces and actual checks support the work. Gaps are stated plainly.
- **Your models, your choices.** Keep your installed specialists and choose models for delegated roles. Personal preferences survive updates.

Kishu is a resourceful generalist. Your instructions, project requirements and host permissions come first.

## Install

Python 3.11+ is needed for the maintenance/install script. Git is needed to fetch or update upstreams. The generated `plugin/` is self-contained; installing it does not require the upstream checkouts.

Clone the source repository, then install for your host:

```sh
git clone https://github.com/SPDUK/kishu-stack.git
cd kishu-stack
python scripts/kishu.py install --harness codex
```

This registers the local `kishu-local` marketplace and installs `kishu@kishu-local` through the Codex CLI. Start a new chat or refresh skills if the current session has already loaded its skill inventory. The native install has been smoke-tested in an isolated Codex profile.

Other supported packaging:

```sh
python scripts/kishu.py install --harness claude
python scripts/kishu.py install --harness cursor
```

The Claude command uses its CLI marketplace installer. The Cursor command copies the generated bundle into `~/.cursor/plugins/local/kishu`; reload Cursor and check Customize. Local imports must be allowed by any applicable organization policy. These follow the documented [Claude marketplace flow](https://code.claude.com/docs/en/plugin-marketplaces) and [Cursor local-plugin flow](https://cursor.com/docs/plugins); live loading in those two applications has not been verified in this workspace.

For a harness that accepts standalone Agent Skills, export the complete skill into its skill directory:

```sh
python scripts/kishu.py install --destination /absolute/path/to/skills/kishu-mode
```

The export keeps one public `SKILL.md`, with internal guides renamed and references rewritten. The target must be absent or an unedited previous Kishu export. Copying only the public `SKILL.md` breaks its dependencies.

Choose the native plugin or standalone export per harness; installing both exposes duplicate entrypoints. Existing pstack and Impeccable installations do not need to be removed, but avoid keeping a second Poteto/Kishu always-on rule active alongside Kishu.

## Use it

```text
/kishu-mode {your request}
```

The spelling exposed by a harness varies:

| Harness | Native entrypoint |
| --- | --- |
| Codex plugin | `$kishu:kishu-mode`, or select it through `/skills` |
| Codex standalone skill | `$kishu-mode` |
| Cursor | `/kishu-mode` |
| Claude Code plugin | `/kishu:kishu-mode` |
| Claude Code standalone skill | `/kishu-mode` |
| Other skill-capable harnesses | Their native skill selector; Kishu also recognizes `/kishu-mode` in ordinary text |

Codex does not gain a custom slash command merely from a skill manifest. Use its native selector for explicit activation, or the small always-on rule below.

### Setup and updates

```text
/kishu setup
/kishu update
```

`setup` walks through supported model choices, reasoning effort, and optional project-wide or personal always-on activation. Existing choices can be kept; a setup walkthrough does not reset them.

`update` installs the latest Kishu committed to `SPDUK/kishu-stack` on `main`. It uses a separate checkout at `~/.kishu/source`, preserves personal model settings, and refuses to overwrite local edits or unpublished commits. It does not independently upgrade Kishu's three bundled upstreams.

Cursor supports the spellings above. Codex exposes the administration skill as `$kishu:kishu setup` and `$kishu:kishu update` (also available through `/skills`). Claude Code uses `/kishu:kishu setup` and `/kishu:kishu update`. The standalone export supports the same actions through `kishu-mode setup` and `kishu-mode update`, using the host's normal skill selector. Ordinary work stays on `kishu-mode`.

## Configure models

Kishu's model setup adapts to the active harness. Use `kishu setup` for the full walkthrough, or request only model changes through the working mode:

```text
$kishu:kishu-mode configure my models
```

You can also give a specific request, such as "use my current model for every role" or "keep implementation on my chosen coding model and use a different model for reviews." The workflow discovers supported delegation models and efforts, retains current choices, and asks only for missing preferences. It does not change the model selected for the main chat.

The router reads the highest-priority applicable configuration: a file explicitly referenced in user/project instructions, project `.kishu/models.md`, user `~/.kishu/models.md`, or the existing `~/.cursor/rules/pstack-models.mdc`. Current user instructions override saved preferences. A portable file can hold separate Codex, Cursor, and Claude Code sections. Missing roles inherit the current model; unsupported IDs or cross-family requests are reported rather than invented.

Your model preferences live outside the generated plugin and survive plugin updates. `setup-pstack` remains the internal guide, not a second public command. Installation is a separate operation handled by `scripts/kishu.py install`.

### Optional always-on mode

Point a harness instruction file at Kishu:

```sh
python scripts/kishu.py activate --harness codex --instructions /absolute/path/to/AGENTS.md
python scripts/kishu.py activate --harness claude --instructions /absolute/path/to/CLAUDE.md
python scripts/kishu.py activate --harness cursor --instructions /absolute/path/to/.cursor/rules/kishu-mode.mdc
```

Pick either project instructions or your harness's global instructions. The command preserves existing content, adds one marked reference, and is idempotent. For Cursor `.mdc` files it enables `alwaysApply`. Remove the `kishu:begin`/`kishu:end` block to stop Kishu activation; a dedicated Cursor rule file can then be removed. Activation refers to the installed skill by name, so it follows plugin updates. If an older Kishu block refers to an absolute checkout/cache path, rerun activation or setup to refresh it. Installation alone does not edit global instructions.

## Built with Kishu

Kishu built its own website and three distinct, interactive examples. [Explore the collection](https://spduk.github.io/kishu-stack/#examples).

<a href="https://spduk.github.io/kishu-stack/mmo/">
  <img src="site/dist/mmo/preview.jpg" width="900" alt="Veldrift: an original fantasy MMO concept built with Kishu, with generated landscapes and cinematic ivory type.">
</a>

| Demo | Try it | What it demonstrates |
| --- | --- | --- |
| **Veldrift** | [Explore the MMO world](https://spduk.github.io/kishu-stack/mmo/) | Original generated artwork, cinematic storytelling, responsive exploration. |
| **Meridian** | [Open the trading dashboard](https://spduk.github.io/kishu-stack/meridian/) | A dark workspace, simulated moving prices, charts and a demo order flow. |
| **Stillroom** | [Visit the creative studio](https://spduk.github.io/kishu-stack/stillroom/) | A bright editorial site, workshop selection and a local booking flow. |

These are real Kishu builds for fictional products. Market data is simulated; no trades, payments or reservations are sent. The [build story](https://spduk.github.io/kishu-stack/case-studies/mmo.html) explains what happened and why. [Run the demos locally](site/README.md) to inspect the source and behavior tests.

## Working defaults

<details>
<summary><strong>How Kishu keeps the work grounded</strong></summary>

- **Kishu mode owns the routing.** It selects the workflow and references that help with the task. Ordinary work stays direct; uncertainty earns deeper investigation.
- **Your preferences shape the work.** A bounded task does not automatically need subagents, architecture exercises, security audits, cleanup passes, or a PR. User instructions, project requirements, and harness policy come first.
- **Test behavior that could regress.** Add or update meaningful coverage for added or changed logic, reuse existing coverage, and run affected tests and required project checks. If useful testing needs substantial setup, runtime, paid resources, or maintenance, explain its benefit and rough cost with assumptions, then ask. Expensive tests are a decision, not a silent omission.
- **Show useful proof.** Visual changes call for an inspected screenshot when possible; API changes call for actual requests and responses; logic changes call for executed checks. Research uses sources and writing uses the reviewed artifact. A server-start request needs a checked status/address. Report unavailable verification honestly.
- **Kishu's design taste engine guides interface work.** Composition, interaction, critique, and polish follow the brief. Refinements preserve the project's existing identity and reuse established design context.
- **ADHD-aware communication keeps the result in reach.** Lead with the answer or outcome. Use plain language, short connected paragraphs, visible progress, and links to deeper detail. Surface decisions and gaps clearly; explain fully when asked. This is Kishu's default communication style, with no separate mode to activate.
- **Warmth without ceremony.** Be candid, resourceful, persistent, and lightly playful. No compulsory closing question, repeated plan narration, or puppy roleplay.

These are agent instructions, not a runtime guarantee. Project tests and harness permissions remain the enforcement mechanisms.

</details>

## What's inside

Kishu brings three open-source foundations together with its own working preferences. The Kishu experience is the combination: proportional workflows, meaningful tests, evidence suited to the work, preserved design context, personal model choices, and clear communication. Those preferences take precedence over conflicting inherited defaults.

| Kishu capability | Foundation and credit | Kishu's adaptation |
| --- | --- | --- |
| Work routing and engineering playbooks | [pstack](https://github.com/cursor/plugins/tree/main/pstack), by Lauren Tan · MIT | A generalist router, selective workflow loading, delegation when useful, and testing and verification sized to the task. |
| Design taste engine | [Impeccable](https://github.com/pbakaus/impeccable), by Paul Bakaus · Apache-2.0 | Design judgment within Kishu's workflow, with existing identity respected and live copy editing kept within the host's permissions. |
| ADHD-aware communication | [i-have-adhd](https://github.com/ayghri/i-have-adhd), by Ayoub G. · MIT | Adapted guidance for result-first answers, visible progress, useful evidence, and less process noise. Its separate startup hooks are not enabled. |

Original licenses, notices, and upstream links remain in the bundle. See [third-party notices](THIRD_PARTY_NOTICES.md) and [pinned source revisions](upstreams.lock.json) for provenance. Credit does not imply endorsement by the upstream authors.

[Publication and license notes](docs/licensing.md) cover the code, fonts and generated showcase artwork.

## Contributing and maintenance

**Edit source, then generate.** Change `src/`, `overrides/` or the maintenance script; do not edit `plugin/` directly. The builder protects modified generated files from being overwritten.

```sh
python scripts/kishu.py sync
python scripts/kishu.py build
python -m unittest discover -s tests -v
python scripts/kishu.py check
```

Maintenance checks need Python, Git and Node.js. `sync` fetches the exact revisions in the lock file; it does not choose new upstream versions. Commit source, locks and generated output together when preparing a release.

| Guide | What it covers |
| --- | --- |
| [Maintenance](docs/maintenance.md) | Upstream updates, conflicts, validation and release packaging. |
| [Verification](docs/verification.md) | Executed checks and their limits. |
| [Site development](site/README.md) | Run the demos and their checks. |

<details>
<summary><strong>Repository map</strong></summary>

```text
src/                    Entrypoints, guides, updater, adapters and patches
overrides/              Kishu versions of selected upstream files
scripts/kishu.py        Build, update, install, activate and package
tests/                  Regression tests and behavioral evaluation briefs
plugin/                 Generated, self-contained distributable
docs/                   Brand assets, maintenance and verification
site/                   Kishu website and real build examples
tools/preference-review/ Review-page source and checks
upstreams.lock.json     Exact upstream revisions
overrides.lock.json     Reviewed baselines for full-file overrides
upstream/               Ignored pristine upstream checkouts
```

The plugin exposes `kishu-mode` for work and `kishu` for setup/update. Shared libraries load on demand. Impeccable’s launcher can download its checksum-pinned runtime on first use; its documented fallback applies when launching is unavailable.

</details>

## Review Kishu's preferences

Open the [interactive preference review](docs/preference-review/index.html) or read the [seven-section review plan](docs/preference-review/REVIEW.md). It explains software-related pstack defaults and Kishu changes, highlights possible overhead and enforced limits, and lets you leave feedback on the exact instructions. [Feedback instructions](docs/preference-review/README.md) include an editable document option and export/backup steps. This review is outside the plugin and adds no prompt overhead.

See [verification results and limits](docs/verification.md), [the original stack audit](docs/stack-audit.md), and [third-party notices](THIRD_PARTY_NOTICES.md).
