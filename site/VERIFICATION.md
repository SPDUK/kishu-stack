# Verification

## Public demo collection — November 4, 2026

Veldrift (immersive MMO concept), Meridian (simulated trading dashboard), and Stillroom (local workshop booking) replace the earlier third-party-media study. The three products are fictional. Generated-image provenance and the concise build narrative are retained; earlier source-media evidence is excluded from publication.

Executed locally:

- `npm --prefix site test`: **38 passing tests** — eighteen existing routing/discovery cases, six market/order cases, two destination-selector cases, and twelve workshop-booking cases.
- `npm --prefix site run check`: discovery freshness, JavaScript syntax, and **43 local resources across ten HTML/CSS files** passed. The recursive resource check covers all three demos and the public story, including responsive images, cross-page anchors and project-subpath portability.
- `npm --prefix site run mmo:check`: Veldrift and story resources, responsive sources, and the readable decision record passed.
- Browser interaction: destination tabs changed the scene and supported Home/End navigation. Meridian paused price updates, switched to Ethereum and a one-week chart, rejected an unaffordable order, and applied a simulated $1,000 buy to its cash and activity. Arrow-key chart inspection worked. Stillroom rejected review without a session, then reviewed and confirmed two participants for November 21 at $136, explicitly without sending a reservation or payment.
- Responsive matrix: the main page, all three demos and the story were checked at **320, 768 and 1440px** viewport widths. Each finished with `scrollWidth === clientWidth`. The 320px Meridian check exposed a body minimum width that ignored the Windows scrollbar; removing it let the layout fit the actual 305px content width. Separate 390px captures were inspected for composition and readable copy.
- Visual corrections: Veldrift's phone cartographer crop now keeps the face visible; hidden line breaks retain spaces; the remaining 11px narrow-screen navigation became 12px. Ten generated images were inspected and encoded at their original dimensions. Gallery previews are fresh captures of the replacement pages.
- A single Impeccable detector pass covered the changed main, MMO and story files. It reported wrapper-padding warnings and differences from the older shared design scale, plus existing cream/Geist and deliberate italic Didot choices. Rendered gutters and separate brand directions were inspected; this is not a claim of a clean detector result. Meridian and Stillroom each received one author-run pass, with their sub-12px text corrected.

A fresh independent finish reviewer inspected all sixteen supplied captures and sampled the relevant source. Its disposition was **ship**, with no material fixes. The review judged the recorded directions and final renders; historical approved comps and quality-board artifacts were unavailable, so no pixel-parity claim is made.

Evidence lives locally in `.impeccable/review/public-collection/`, excluded from the public repository. Full-page captures can reconstruct an offscreen fixed skip link as visible; DOM inspection confirmed Meridian's unfocused skip link remains above the viewport. This capture artifact is not treated as a product state. Hosted CI and deployment results are tracked in [GitHub Actions](https://github.com/SPDUK/kishu-stack/actions/workflows/verify.yml).

## Horizontal overflow follow-up — November 3, 2026

- Reproduced in the user's current 867px viewport: document client width was 852px, scroll width was 853px, and the rotated puppy extended to 853.04px. The previous checks missed the range between the tablet and desktop breakpoints.
- Moved the puppy's inset positioning rule from the 850px breakpoint to the 1100px breakpoint, where the page gutters first narrow. The caption reserves space for the inset artwork, including on mobile. Its animation and keyboard focus remain intact.
- Repeated the original check: client and scroll widths both equal 852px; the puppy's resting right edge is 829.04px. Enter activation moved the puppy while the page remained at 852px scroll width.
- Checked 17 viewport widths: 320, 360, 361, 390, 400, 401, 600, 601, 768, 850, 851, 867, 1024, 1100, 1101, 1280, and 1440px. Every check had `scrollWidth === clientWidth`.
- `npm run check` passed. Fresh evidence: `.impeccable/review/overflow-fixed.jpg` at the user's original viewport. The temporary viewport override was reset.

## Motion and discovery revision — November 3, 2026

- `npm test`: **18 passing tests**. The original thirteen behavior tests still pass; five discovery tests cover project-subpath URLs, rejected local/ambiguous canonical addresses, escaped HTML and valid JSON-LD, idempotent generation, and consistent facts across visible and textual answers.
- `npm run check`: JavaScript syntax, generated-file freshness, and all **16 local resources** passed. Canonical, sitemap, and social URLs use the user-confirmed `https://spduk.github.io/kishu-stack/`. No public deployment or indexing was verified.
- Browser: the new puppy button worked with click and Enter, retained a visible keyboard focus ring, and announced its greeting. The rendered transform changed during activation. FAQ disclosures worked by keyboard and pointer. The demo played, could show its result, and returned to a paused planning step; its workspace remained fully opaque while focused.
- Responsive checks: **320, 390, 768, and 1280px**. The first narrow-screen pass found the rotated puppy extending beyond the actual document client width. Its position was corrected for screens below 850px. Rechecks used `scrollWidth` against `clientWidth`, accounting for the scrollbar, and found no horizontal overflow at those widths.
- Motion implementation: staggered hero arrival, a 1.25s puppy tilt, wordmark greeting, one-time 620–760ms text/surface entrances, and a 320ms FAQ reveal. All use already-visible defaults. Preference changes and page hiding cancel decorative motion; focusing a revealed section cancels its entrance. Reduced-motion guards and the existing zero-delay playback test were reviewed; OS-level preference emulation was not available in this browser tool.
- Social image: the new browser-rendered JPEG was inspected and its file header verified as **1200 × 630**, approximately **48 KiB**. It uses the original unnamed puppy artwork.
- Browser console: no warnings or errors during the exercised session. The browser's read-only inspection API does not expose `document.getAnimations()`; computed styles and rendered states were used instead.
- A separate direct HTTP/MIME probe was blocked by the shell sandbox's loopback connection restriction (`EACCES`); its temporary server was stopped. Browser verification used the existing local preview. MIME mappings for the new Markdown, XML, and JPEG files were inspected in `server.mjs`.
- One Impeccable mechanical pass reported wrapper-padding warnings, existing palette/font choices, and design-scale advisories. Computed spacing and screenshots confirmed the section gutters and borders were inset as intended. The warm palette and self-hosted type are established product choices. The pre-existing design sidecar remains stale; this was not a clean detector pass or a sidecar repair.
- Fresh evidence: `.impeccable/review/motion-desktop.jpg`, `motion-desktop-full.jpg`, `motion-mobile.jpg`, and `motion-mobile-full.jpg`. `dist/assets/kishu-social.jpg` is the deployable social card. The source and regeneration policy are documented in [DISCOVERY.md](DISCOVERY.md).

## Value-led revision — November 3, 2026

- `npm test`: **13 passing behavior tests**. Coverage includes conditional four/five-step routes, replay, pause/resume, manual inspection, show-result completion, scenario switching, stale callbacks, disposal, reduced-motion completion, model-role setup requests, and host commands.
- `npm run check`: JavaScript syntax and local resource/anchor/ID checks passed. All 11 local resources remain valid under a project subpath.
- Browser: all three scenarios inspected; a complete refactor playback reached its final output. Switching scenarios while playing reset the route. Manual steps pause, resume continues from the same step, and result/replay paths work.
- Model playground: selecting deep reasoning or the current model updates the role labels, handoff destinations, allocation view, summary, and copyable setup request. All-current-model configuration shows the single-model explanation.
- Keyboard: scenario End selected the final scenario; editor Home and ArrowRight selected Codex and Cursor. Native selects remain keyboard accessible.
- Host commands: Claude Code and Cursor installation/invocation strings matched the repository. The demo invocation and copy source now follow the selected host.
- Clipboard: copy controls reached the success state, but the browser automation clipboard API returned an empty string. OS clipboard contents were not independently verified. The setup request is also selectable under “Read the setup request.”
- Responsive checks: **320, 390, 768, and 1280px** viewport widths had no horizontal document overflow. The 320px check exposed clipped native-select text; selectors now stack at full width below 400px and were rechecked. Fresh desktop and mobile captures were inspected.
- Browser console: no warnings or errors during the exercised session.
- Motion: the rendered handoff uses a bounded 360ms transition; repeated actions cancel the previous animation. Playback pauses when the page is hidden. The zero-delay reduced-motion controller path is unit tested; the CSS media query and live preference listener were inspected. Browser emulation of the OS preference was not available through the current browser capability.
- Independent review found and verified fixes for resume position, selected-host copying, and conditional savings wording. Final source and screenshot review found no material remaining issues.
- Impeccable mechanical scan ran once. It flagged small text, apparent padding omissions, and differences from the prior design scale. All 10/11px text was raised to a 12px minimum, narrow selectors were corrected, and DESIGN.md was updated for the actual layout. Wrapper-padding warnings were checked against the rendered section gutters and inner containers. The scan was not rerun; do not describe it as a clean pass. The pre-existing Impeccable design sidecar is stale and was not regenerated.
- The public page contains no mascot name, mascot gallery, or download offer. The downloadable archive was removed. Original image-generation prompts remain historical provenance, including the original dog-breed description; they are not shown as a character name.

## Evidence

Fresh captures are local under `.impeccable/review/`:

- `routing-desktop.jpg` — desktop hero.
- `routing-desktop-full.jpg` — complete desktop page.
- `routing-mobile.jpg` — complete 390px mobile page.

This website is a real Kishu project. The three engineering scenarios and model profiles are illustrative, not executed model sessions. There are no measured cost, token, or speedup claims. This remains a local static site; publication was not part of this revision.
