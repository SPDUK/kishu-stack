# Update Kishu

This command installs the latest committed Kishu from `https://github.com/SPDUK/kishu-stack.git`, branch `main`. It does **not** update pstack, Impeccable, or i-have-adhd independently; those revisions are reviewed and pinned by Kishu's maintainers.

Run the bundled [updater](../scripts/update_kishu.py) with the active harness. Resolve its absolute path from this guide, keep the user's project working directory unchanged, and use the current Python executable:

```text
python <absolute-plugin-root>/scripts/update_kishu.py --harness codex
```

Supported native values are `codex`, `claude`, and `cursor`. For a standalone installation, pass `--harness generic --destination <absolute-current-skill-directory>` so the export is refreshed instead of installing a different native plugin. The standalone mode skill also accepts `setup` and `update` requests directly.

For **Claude Code**, inspect `claude plugin marketplace list --json` first. If `kishu-local` already uses a local directory, use that registered Kishu directory as `--checkout`; the updater still verifies its remote, branch, and clean state. If it is already a Git/GitHub source for this exact repository with no pinned ref or with `main`, use `claude plugin marketplace update kishu-local` followed by `claude plugin update kishu@kishu-local` and report their actual results. Resolve a different source or pinned ref with the user before changing it. Never remove a Claude marketplace to switch its source: the host can delete its plugins and saved data.

The updater keeps a separate checkout at `~/.kishu/source` by default. It verifies the origin and branch, refuses local edits or unpublished/divergent commits, fetches `main`, fast-forwards, and invokes that revision's installer. It does not touch the user's project repository or personal model configuration. `--checkout <path>` can use another dedicated Kishu checkout when explicitly requested. Never stash, reset, force-push, or overwrite local work to bypass an update refusal.

Use the host's normal permissions for network and installation writes. If Git, Python, harness installation tools, or access to the GitHub repository is unavailable, report the specific missing prerequisite. The repository may require GitHub authentication; do not ask for secrets in chat. Do not claim the update succeeded if installation fails.

After success, report the installed version and source commit printed by the updater. Refresh the skill inventory or start a new chat to load the new instructions. Always-on rules should reference the installed skill by name so they follow the update; if a legacy Kishu block points at a versioned cache, explain that it needs to be refreshed through setup rather than claiming that stale reference was updated.
