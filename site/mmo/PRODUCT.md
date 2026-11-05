# VELDRIFT concept showcase

<!-- impeccable:product-schema 1 -->

## Platform and purpose

Static web page at `dist/mmo/index.html`, built with HTML, CSS, and browser JavaScript. VELDRIFT is an original, fictional MMO concept used to demonstrate Kishu’s interface work. It is not a playable game, a product announcement, or a signup funnel. The footer states this plainly.

## Audience and journey

Visitors evaluating Kishu can experience an authored fantasy world and then inspect the case study. The opening introduces the world through the line “The horizon is only the start.” A short prologue leads to three selectable destinations: Lantern Coast, Glassroot Vale, and Astral Reach. The Wayfarers section introduces a human cartographer and a community of travelers. The final action opens `case-studies/mmo.html` to explain how the page was made.

## Content and interaction

The setting, characters, place names, and prose belong to this concept. Original generated raster artwork supplies the landscapes and character scene. A small geometric compass emblem and two consistent stroke icons are authored SVG. The design does not require video or an external media player.

The destination selector supports click, Left/Right arrows with wrapping, Home, and End. Only the active tab is in the normal tab order, and each tab identifies its visible panel. A brief user-triggered transition respects reduced-motion preferences. There is no automatic scene rotation. Without JavaScript, the first destination remains visible with an explanatory message.

## Constraints and evidence

Preserve the approved ink-blue, ivory, and brass composition and the self-hosted GFS Didot/Geist typography. A portrait hero source serves narrow screens. All actions navigate to real page sections or the local case study. No purchase, account, or gameplay controls are implied.

`tests/mmo-scenes.test.mjs` exercises the retained selector behavior. `scripts/check-mmo.mjs` checks local resources, responsive image references, portable paths, anchors, and the decision record. Final rendered review and artwork provenance belong in `VERIFICATION.md` and the case study; this product brief does not claim a visual pass.
