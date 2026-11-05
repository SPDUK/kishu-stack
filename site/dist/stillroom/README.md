# STILLROOM

A fictional creative studio and local workshop-booking demo, built with Kishu mode. It is self-contained HTML, CSS, and browser modules with no runtime dependencies, account flow, payment fields, or external transaction requests.

Open `index.html` through the repository's static preview server. The Kishu backlink returns to the example collection. Font files are shared from `../fonts/`. Original studio imagery lives in `assets/`.

## The experience

The bright cream, cobalt, and ink identity contrasts with the other demos. Bricolage carries the large editorial lettering; Geist carries operating details. A generous photo-led opening gives way to open workshop rows and a single reservation surface. The studio photograph has one brief settling motion, removed with reduced-motion preferences. Native radios, selects, details, quantity input, semantic buttons, visible keyboard focus, and a skip link provide the interaction foundations.

Visitors can filter three workshops by type and November 2026 date. Sold-out dates stay visible and disabled in the session chooser. A date filter preselects a matching available session when a workshop is chosen. A group can contain one to six people, capped by the session's available seats. Choosing a session with fewer seats adjusts the quantity with an inline explanation.

The price is the illustrative USD per-person price multiplied by participants, with no additional fee. Review, confirmation, modify, and reset stay inline. Confirmation clearly explains that no payment or reservation is sent. No choices are persisted; reloading clears the state. No personal information is collected.

## Verification scope

`../../tests/stillroom.test.mjs` exercises combined filters, empty results, sold-out and cross-workshop rejection, exact totals, invalid quantities, group limits, capacity adjustment, required review before confirmation, modify, workshop switching, reset, state validation, and time-zone-independent date labels.

Run from `site/`:

```sh
node --test tests/stillroom.test.mjs
node --check dist/stillroom/app.mjs
node --check dist/stillroom/booking.mjs
```

These tests protect the booking model. Rendered layout, keyboard focus, radio interaction, and phone behavior also need browser verification; the main task records that evidence separately.

## Attribution

Kishu mode routed this implementation. Its design taste engine uses Impeccable; pstack supplies the workflow foundation; i-have-adhd informs the communication preferences. Shared Bricolage and Geist font license files remain in `../fonts/`. The interface icons and STILLROOM mark are original SVG geometry.
