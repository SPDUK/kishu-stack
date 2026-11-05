# Kishu demo collection — decision record

Session date: November 4, 2026 (America/Los_Angeles).

An authored record of consequential choices and observed tool outcomes. It is not a raw transcript or private reasoning trace. Generated art and fictional interactions replace the earlier source-media study.

Reference: The user's approved cinematic direction and expanded public-demo brief.

## 01. Three different product experiences

- **Stage:** Scope
- **Decision maker:** User
- **Guidance:** Current brief
- **Executor:** Chat instructions
- **Historical outcome:** The three isolated demo scopes were assigned.

**Choice:** Build an original MMO concept, a dark simulated trading dashboard, and a contrasting workshop site.

**Why:** Show Kishu across storytelling, dense product UI and a booking flow.

**Tradeoff / boundary:** Keep each fictional and avoid external transactions.

**Evidence:** site/dist/mmo/index.html; site/dist/meridian/index.html; site/dist/stillroom/index.html

## 02. Replace the earlier third-party media

- **Stage:** Publication
- **Decision maker:** User and main agent
- **Guidance:** License review and current instruction
- **Executor:** PowerShell Move-Item; repository inspection
- **Historical outcome:** Earlier media is outside the release file tree.

**Choice:** Exclude prior media, derivative screenshots, acquisition scripts and old records from the public snapshot.

**Why:** The user's chosen release uses generated assets and a new parentless history.

**Tradeoff / boundary:** Recursive deletion was blocked by policy; a non-destructive move into ignored .work/excluded-pre-release succeeded. No old media had been pushed.

**Evidence:** docs/licensing.md; site/.gitignore; .gitignore

## 03. Keep the cinematic composition

- **Stage:** Direction
- **Decision maker:** Main agent and MMO worker
- **Guidance:** Kishu design guidance; existing approved layout
- **Executor:** Repository edits
- **Historical outcome:** The new page has three original destinations and a Wayfarers feature.

**Choice:** Use ink blue, ivory type, brass controls and the new fictional Veldrift world.

**Why:** Retain the visual quality the user liked while replacing the source material.

**Tradeoff / boundary:** This was a scoped replacement; no new user-selected visual comp is claimed.

**Evidence:** site/mmo/DESIGN.md; site/mmo/PRODUCT.md

## 04. Generate ten composition-specific images

- **Stage:** Assets
- **Decision maker:** Main agent
- **Guidance:** Imagegen skill and page composition
- **Executor:** Built-in image_gen; ffmpeg; ffprobe
- **Historical outcome:** Ten generated outputs were inspected and their prompts, hashes and dimensions recorded.

**Choice:** Generate six Veldrift paintings and four Stillroom editorial images from text-only prompts, then encode WebP at original dimensions.

**Why:** Artwork belongs in the layout: desktop copy needs negative space, while mobile needs a portrait composition.

**Tradeoff / boundary:** No third-party images were used as reference inputs; originality does not claim uniqueness or trademark clearance.

**Evidence:** site/dist/mmo/assets/provenance.json; site/dist/stillroom/assets/provenance.json

## 05. Build with separate write boundaries

- **Stage:** Delegation
- **Decision maker:** Main agent
- **Guidance:** Kishu router; user's saved model roles
- **Executor:** collaboration.spawn_agent
- **Requested model:** gpt-6.1-sol; reasoning effort xhigh.
- **Historical outcome:** Each worker returned implementation, meaningful checks and known verification gaps.

**Choice:** Assign MMO, Meridian and Stillroom implementation to three separate coding workers.

**Why:** Independent folders let the work proceed in parallel without concurrent edits to shared files.

**Tradeoff / boundary:** Requested model/effort are configuration records, not runtime attestation, cost or timing measurements.

**Evidence:** site/tests/mmo-scenes.test.mjs; site/tests/meridian.test.mjs; site/tests/stillroom.test.mjs

## 06. Use functioning local demonstrations

- **Stage:** Interaction
- **Decision maker:** Demo workers
- **Guidance:** Task-specific design and behavior requirements
- **Executor:** JavaScript; Node test runner
- **Historical outcome:** Workers reported passing targeted behavior tests; integrated and browser checks are recorded separately.

**Choice:** Retain keyboard destination navigation, simulate market/order state, and validate workshop/session capacity and quantities.

**Why:** The controls should demonstrate actual product behaviors.

**Tradeoff / boundary:** Market values and products are fictional. There are no exchange, payment or booking integrations.

**Evidence:** site/VERIFICATION.md; site/dist/meridian/README.md; site/dist/stillroom/README.md

## 07. Show a concise visual story

- **Stage:** Communication
- **Decision maker:** Main agent
- **Guidance:** User request for what happened and why
- **Executor:** HTML/CSS edits
- **Historical outcome:** Gallery, README links and a six-step public story were implemented.

**Choice:** List all three demos on the main page and explain six consequential choices in one public story.

**Why:** Make the range and rationale visible without technical downloads.

**Tradeoff / boundary:** Detailed records remain source documentation. No hidden reasoning trace is presented.

**Evidence:** README.md; site/dist/index.html#examples; site/dist/case-studies/mmo.html

## 08. Check working states and actual screen widths

- **Stage:** Verification
- **Decision maker:** Main agent and demo workers
- **Guidance:** Kishu evidence guidance and Impeccable craft review
- **Executor:** Node test runner; Codex browser controls; Impeccable detector
- **Historical outcome:** 38 site tests passed. Resource checks passed. Browser flows confirmed scene changes, simulated orders and booking review; responsive testing found and fixed a narrow-screen minimum-width issue.

**Choice:** Exercise the real controls and inspect all five pages at phone, tablet and desktop widths.

**Why:** A visual showcase also needs readable layouts and credible behavior.

**Tradeoff / boundary:** Unit checks alone do not establish rendered quality; static screenshots alone do not verify transitions.

**Evidence:** site/VERIFICATION.md; site/scripts/check-site.mjs; site/tests/meridian.test.mjs; site/tests/stillroom.test.mjs

## 09. Review the finished collection in a fresh context

- **Stage:** Independent review
- **Decision maker:** Independent reviewer
- **Guidance:** Kishu model roles; Impeccable finish review
- **Executor:** collaboration.spawn_agent; local image and source inspection
- **Requested model:** gpt-6-astra; reasoning effort xhigh.
- **Historical outcome:** All sixteen required captures were inspected; disposition ship, no material fixes.

**Choice:** Pass the renders, scoped directions and observed checks to a fresh reviewer with no inherited chat history.

**Why:** Independent review can challenge the builder’s assumptions before publication.

**Tradeoff / boundary:** The reviewer had no browser and made no pixel-parity claim against unavailable historical comps.

**Evidence:** site/VERIFICATION.md
