# Update Kishu

This command installs the latest published stable GitHub release from `https://github.com/SPDUK/kishu-stack`. Drafts, prereleases, unassociated Git tags, and unreleased `main` changes are excluded. It does **not** update pstack, Impeccable, or i-have-adhd independently; those revisions are reviewed and pinned by Kishu's maintainers.

Run the bundled [updater](../scripts/update_kishu.py) with the active harness. Resolve its absolute path from this guide, keep the user's project working directory unchanged, and use the current Python executable:

```text
python <absolute-plugin-root>/scripts/update_kishu.py --harness codex
```

Supported native values are `codex`, `claude`, and `cursor`. For a standalone installation, pass `--harness generic --destination <absolute-current-skill-directory>` so the export is refreshed instead of installing a different native plugin. The standalone mode skill also accepts `setup` and `update` requests directly.

If the user names a version, append `--version <version>`, for example `--version 0.1.5` or `--version v0.1.5`. This also supports an explicitly requested rollback to an older published stable release. Never pass a branch or prerelease. An ordinary update selects GitHub's latest stable release; do not silently choose another version when lookup fails.

For **Claude Code**, inspect `claude plugin marketplace list --json` first. If `kishu-local` already uses a local directory, use that registered Kishu directory as `--checkout`; the updater still verifies its remote and clean state. A clean legacy `main` checkout can migrate to a detached release commit. If the marketplace uses a Git/GitHub source, a different repository, or another pinned ref, explain the source conflict and resolve it with the user. Do not fall back to a host marketplace update that could track `main`. Never remove a Claude marketplace to switch its source: the host can delete its plugins and saved data.

The updater keeps a separate checkout at `~/.kishu/releases` by default. Existing `~/.kishu/source` checkouts are preserved. It verifies the origin, refuses local edits, development branches and unpublished/divergent commits, resolves a published release, checks out that exact tag's commit in detached mode, and invokes its installer. It fetches `main` only to check whether existing local commits are published; it never installs `main` as a fallback. A tag/package version mismatch stops installation. If the installer fails, the previous existing source checkout is restored; this does not guarantee rollback of any host-side partial installation.

It does not touch the user's project repository or personal model configuration. `--checkout <path>` can use another dedicated Kishu checkout when explicitly requested. Never stash, reset, force-push, or overwrite local work to bypass an update refusal.

Use the host's normal permissions for network and installation writes. If Git, Python, harness installation tools, or access to the GitHub repository is unavailable, report the specific missing prerequisite. The repository may require GitHub authentication; do not ask for secrets in chat. Do not claim the update succeeded if installation fails.

After success, report the installed version, release tag and source commit printed by the updater. Refresh the skill inventory or start a new chat to load the new instructions. Always-on rules should reference the installed skill by name so they follow the update; if a legacy Kishu block points at a versioned cache, explain that it needs to be refreshed through setup rather than claiming that stale reference was updated.
