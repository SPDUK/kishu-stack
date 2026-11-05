# Updating Kishu

## Build and release

The repository includes a generated, self-contained `plugin/`. Installation uses that reviewed bundle; development starts from the source and pinned upstream checkouts.

```sh
python scripts/kishu.py sync
python scripts/kishu.py build
python -m unittest discover -s tests -v
python scripts/kishu.py check
```

Make changes in `src/`, `overrides/` or `scripts/kishu.py`. The builder preserves upstream licenses and notices, rewrites operational Poteto identifiers, and refuses to overwrite edited generated files. Commit source, locks and generated output together when preparing a release.

For a published version, bump `VERSION` in `scripts/kishu.py`, rebuild and validate, then run:

```sh
python scripts/kishu.py package
```

The reproducible zip is written under ignored `dist/` and contains only `plugin/`. Packaging does not publish or install it. Local preview captures and Sites registration data are ignored separately under `site/`; design records, source provenance and original licenses remain part of the project.

## Update an installed copy

For a clean checkout you manage yourself:

```sh
git pull --ff-only
python scripts/kishu.py install --harness codex
```

Choose your host in the final command, then refresh skills or start a new chat.

End users can run `/kishu update` (Codex: `$kishu:kishu update`). The packaged updater fetches Kishu's own GitHub `main` into a separate clean checkout and runs its installer. It refuses local edits, a changed origin, a non-main branch, and unpublished/divergent commits. This is separate from the upstream-maintenance command below. On Codex, installation can migrate the Kishu-only local marketplace to the managed checkout, restoring the previous registration if migration fails.

The source checkouts are pristine. Kishu's preferences are separate from upstream, so refreshing a repository cannot silently erase them.

| Layer | Change here |
| --- | --- |
| Public activation and host mapping | `src/entrypoint.md`, `src/adapters/` |
| Router, communication, testing, proof, common workflows | `overrides/` |
| Small edits to otherwise retained upstream workflows | `src/patches.json` |
| Source revisions | `upstreams.lock.json` |
| Reviewed upstream content underneath full-file overrides | `overrides.lock.json` |

Run `python scripts/kishu.py update` for routine updates. It fetches all three tracked branches, checks full-file override baselines and exact patch anchors, then builds before publishing. Unaffected upstream changes flow through; overlapping changes stop for review. No upstream skill gets an independent always-on hook.

## When an update needs review

The failed update names overlapping files and leaves the lock, generated plugin, and checked-out revisions unchanged. `FETCH_HEAD` in each source checkout records the revision that was fetched.

1. Read the relevant upstream diff. For example, substitute the current pstack commit from `upstreams.lock.json`:

   ```sh
   git -C upstream/pstack diff <locked-commit> FETCH_HEAD -- pstack/skills/tdd/SKILL.md
   git -C upstream/pstack rev-parse FETCH_HEAD
   ```

2. Incorporate useful changes into the corresponding `overrides/` file while retaining Kishu's preferences. For a failed targeted patch, update its exact `old` anchor and reviewed `new` replacement in `src/patches.json`. Do not edit the upstream checkout.
3. Set each source's `commit` in `upstreams.lock.json` to the exact reviewed revision you want. Sources you do not want to advance can retain their existing revision. Record those hashes before another fetch can change `FETCH_HEAD`.
4. Run:

   ```sh
   python scripts/kishu.py sync
   python scripts/kishu.py accept-overrides --reason "Reviewed the named upstream changes and retained Kishu preferences"
   python scripts/kishu.py build
   python -m unittest discover -s tests -v
   python scripts/kishu.py check
   ```

5. Review source, lock, override-baseline, and generated diffs together. Reinstall the target harness or re-export the standalone skill. Bump the release version when distributing the change.

`accept-overrides` records the upstream files you reviewed. It does not merge them or establish that the new instructions behave correctly. Run the applicable cases in `tests/evals/cases.md` when routing or policy changes. A new upstream router entry is imported by the builder, but still deserves review because it can change task routing.

If an update is unwanted, restore the previous source/override/lock revision in version control and run `sync`, `build`, and `check`. Generated-file protection may require preserving and moving an edited generated tree before rebuilding; it will never overwrite those edits automatically.

## Validation

The regression suite needs Python, Git, and Node.js. It uses real local Git repositories, not network services. It checks compatible upgrades, rejected overlaps, rollback after a failed lock publication, edited-file protection, patch failures, standalone exports, activation, cleanup boundaries, router coverage, notices, and portable line endings. Node runs the packaged plan checker against applicable and non-applicable performance cases while preserving the live and visual-review requirements.

On this Windows Codex sandbox, Git's local transport requires Windows IPC access not available in the restricted shell. The suite passes when run in an ordinary terminal or with the harness's approved escalation. This is a test-environment constraint, not a reason to disable a failing assertion.

`python scripts/smoke_codex.py` tests the installed Codex CLI in a fresh profile under `.work/`; it does not change the user's normal Codex configuration. The full plugin cache is compared with an isolated copy of the generated package. A changed file is then reinstalled at the same version to check content refresh, followed by migration to a different source checkout. The app-server's actual skill catalog must expose exactly the two enabled entries `kishu:kishu-mode` and `kishu:kishu`.
