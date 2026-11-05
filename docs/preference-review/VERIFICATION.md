# Review verification

## Reproducible publication snapshot — November 4, 2026

The first hosted release check found that embedding the current Git HEAD made generated artifacts stale immediately after committing them. The generator now identifies the reviewed sources by their content hashes and uses explicitly ordered portable paths. GitHub links to Kishu open current `main`, while the page retains exact captured text and hashes. Existing feedback imports remain compatible.

Six Python tests and seven Node tests passed. The added regression checks prove that a commit-only change leaves the catalog unchanged and a reviewed-source edit changes its identity. Coverage also checks portable file ordering. Generated-file freshness passed before and after committing the fix; hosted status is recorded in [Actions](https://github.com/SPDUK/kishu-stack/actions/workflows/verify.yml).

## Original review — November 3, 2026

Verified November 3, 2026 against Kishu 0.1.2 and its pinned pstack revision. The review is outside the installed plugin; no runtime preferences were changed.

```text
python -m unittest discover -s tools/preference-review -p 'test_*.py'
Ran 4 tests — OK

node --test tools/preference-review/test-review.cjs
tests 7; pass 7; fail 0

python tools/preference-review/build.py --check
Generated artifacts match the captured sources and review implementation.
```

The coverage checks inventory every pinned upstream file, require a reason for each exclusion, retain activation metadata, preserve fenced examples, and compare captured blocks with the exact source lines. Feedback checks cover export/import round trips, untouched rules, local conflicts, changed or absent rules, malformed imports, filtering, and finding-to-source references.

A real Chrome session loaded the generated page from a loopback-only local server. It exercised the guided review, a decision with two text fields, reload persistence, Markdown and JSON downloads, clearing the temporary entry, reimporting the downloaded backup, and search. The actual downloaded files were read back and matched the temporary decision, note, and source ID. The temporary feedback was cleared afterward; the deliverable starts with no user decisions.

The browser download-event helper timed out once even though Chrome had written the file. The actual file was independently read, then successfully reimported through the page. That was a browser automation limitation rather than a failed application export.

The layout was visually inspected in the browser's existing desktop viewport. Mobile and other browser engines were not separately exercised. No third-party service or deployment was needed. The [preview](preview.jpg) shows the rendered review.

## Snapshot refresh — November 4, 2026

Refreshed the captured sources and editorial notes for Kishu 0.1.4. The guided performance finding now describes the checker's explained `Not applicable.` branch, while retaining the ten live verification lanes and interaction-review requirements. No runtime instructions or review interface behavior changed.

Executed from the repository root:

```text
python tools/preference-review/build.py
195 source views; 4082 reviewable blocks; 583 inventoried files; 21 guided findings

python -m unittest discover -s tools/preference-review -p 'test_*.py' -v
Ran 4 tests — OK

node --test tools/preference-review/test-review.cjs
tests 7; pass 7; fail 0

python tools/preference-review/build.py --check
Generated artifacts match the current captured sources and review implementation.
```

The refreshed finding links to the actual non-applicability branch as well as the live-lane and applicable-performance checks. Coverage still accounts for every pinned upstream file and every captured source line. Feedback round-trip, changed-rule reconciliation, conflict retention, malformed imports, filters, and finding references all passed.

`FEEDBACK.md` retained the same SHA-256 before and after regeneration. Browser storage and exported feedback were not accessed or changed. This refresh did not rerun browser interaction or visual checks; the earlier browser evidence above and `preview.jpg` remain historical.
