# VELDRIFT design

## Direction

A quiet cinematic invitation to a wider world: warm light, small human figures, generous horizons, and editorial lettering. The approved composition remains the basis of the page. The replacement introduces original fiction and imagery within that composition.

## Palette and typography

| Role | Value |
| --- | --- |
| Ink-blue surface | `#10181f` |
| Ivory foreground | `#f3eedf` |
| Secondary foreground | `#c7c4ba` |
| Brass accent | `#d5b77b` |

GFS Didot carries headings and a few short editorial lines. Geist carries navigation, controls, and body copy at weights 400 and 600. Display tracking is `-.025em`. The hero display size tops out at 92px. The Didot font and OFL notice live in `dist/mmo/assets`; Geist remains shared under `dist/fonts`.

## Composition

The desktop opening places travelers and the world at left, with a two-line heading and one primary action at right. A dark gradient protects the copy while preserving the image’s light. Mobile switches to a portrait image and places the introduction below the subject.

A two-column prose section creates a pause before the destination scene. The selector sits immediately below a single full-width landscape. Each destination uses a short heading, a small paragraph, and a location line over the lower-left image shade. The Wayfarers section reverses the visual emphasis: a human cartographer at right and the community story at left. On mobile the figure sits above the text. A centered closing invitation leads into the Kishu case study.

The VELDRIFT emblem is simple SVG geometry: a brass diamond, an inner compass shape, and fine crossing lines. It is a mark rather than a substitute for illustrated artwork. Arrow icons share one stroke treatment. The artwork supplies environmental detail; the interface stays restrained.

## Interaction and accessibility

Destination selection immediately updates visibility and accessible state. When motion is allowed, the newly selected scene fades from half to full opacity over 650ms with `cubic-bezier(.16,1,.3,1)`. A new selection cancels the previous transition. Enabling reduced motion cancels an active transition and disables subsequent ones. The CSS also removes smooth scrolling and decorative control transitions under that preference.

The page includes a skip link, visible brass focus outlines, meaningful raster alternatives, named tab panels, roving tab stops, and a themed selection color and scrollbar. The first destination and all prose remain available without motion. The footer identifies the page as a fictional MMO concept with no playable game.

## Verification status

The selector’s keyboard, click, visibility, focus, cancellation, and reduced-motion behavior is covered by executed Node tests. Final desktop and phone renders were inspected, the phone cartographer crop was corrected, and an independent finish review returned ship. Consult the project verification record for the executed checks and their limits.
