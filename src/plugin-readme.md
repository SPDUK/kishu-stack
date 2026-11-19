# Kishu

A resourceful generalist for your agent. Kishu mode owns the routing, brings a design taste engine to interface work, and keeps communication focused. Warm, persistent, and no fuss.

Use the [Kishu entrypoint](skills/kishu-mode/SKILL.md) for your task. Codex exposes it as `$kishu:kishu-mode` or through `/skills`; Cursor uses `/kishu-mode`; Claude Code uses `/kishu:kishu-mode`. Kishu also recognizes `/kishu-mode` in ordinary prompts once activated. Native command spelling is controlled by the harness.

Use [Kishu administration](skills/kishu/SKILL.md) to configure models and optional always-on activation, or to install the latest published stable release. In Cursor, use `/kishu setup` and `/kishu update`. In Codex, use `$kishu:kishu setup` and `$kishu:kishu update`. In Claude Code, use `/kishu:kishu setup` and `/kishu:kishu update`. The updater uses the dependency revisions reviewed for that release and preserves your personal model preferences.

The [Kishu router](lib/pstack/skills/kishu-mode/SKILL.md) selects the workflow, brings in design judgment when useful, adds meaningful regression tests, asks about substantial testing costs, and produces evidence suited to the result. Detailed guides load only when useful. User instructions, project requirements, and harness policy come first.

Kishu's preferences keep rigor proportional, preserve existing design identity, respect personal model choices, and make progress and results easy to follow. Its ADHD-aware communication leads with the outcome, links deeper detail, and avoids repeated process narration and forced closing questions.

## Multi-PR planning

Ask Kishu to plan a change across several pull requests. The [planner](lib/pstack/skills/kishu-mode/playbooks/multi-phase-plan.md) lays out their dependencies and verification steps. Kishu runs the [plan checker](lib/pstack/skills/kishu-mode/scripts/check-plan.mjs) on the Markdown file and returns its findings. Implementation waits for your go-ahead. Live checks use your configured `swarm workers` role.

## Foundations and credits

- **Routing and engineering:** pstack, by Lauren Tan (MIT), adapted with Kishu's scope, testing, evidence, delegation, and host preferences.
- **Design taste engine:** Impeccable, by Paul Bakaus (Apache-2.0), integrated into Kishu's workflow with permission-aware live copy editing.
- **ADHD-aware communication:** i-have-adhd, by Ayoub G. (MIT), adapted into Kishu's default communication guidance without its independent startup hooks.

Original licenses and notices remain included. See [third-party notices](THIRD_PARTY_NOTICES.md) for upstream links and adaptation details. Attribution does not imply endorsement.

This entire directory is the installable plugin. Keep its library and adapter directories together. The source repository provides installation, standalone export, optional always-on activation, and pinned-upstream update commands. See [source revisions](upstreams.lock.json) and [third-party notices](THIRD_PARTY_NOTICES.md).
