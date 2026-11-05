---
name: kishu
description: "Kishu administration: use for /kishu setup to configure models and optional always-on use, or /kishu update to install the latest Kishu version from SPDUK/kishu-stack."
---

# Kishu

Dispatch the argument without loading an unrelated work playbook:

- `setup`: follow [setup](../../guides/setup.md).
- `update`: follow [update](../../guides/update.md).
- With no argument, briefly offer these two commands. Do not change settings until the user chooses.

Keep `kishu-mode` for ordinary work. Codex registers this dispatcher as `kishu:kishu`; use `$kishu:kishu setup` or `$kishu:kishu update`, or select it through `/skills`. Cursor uses `/kishu setup` and `/kishu update`; Claude Code plugin skills are normally namespaced as `/kishu:kishu setup` and `/kishu:kishu update`. Recognize the user's short spelling in ordinary prompts, without claiming the host supports custom slash commands it does not expose.
