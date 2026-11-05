# Publication and license notes

Reviewed November 4, 2026. This is a scoped inventory of the licenses and publication conditions found in this repository, not a legal opinion about every possible use.

## Code and bundled guidance

Kishu's own additions, pstack and i-have-adhd use MIT licensing. Public redistribution and modification are permitted with their copyright and permission notices retained. Impeccable uses Apache-2.0: retain its license and relevant notices, preserve its upstream NOTICE, and identify changes in modified Apache-covered files. The bundled Impeccable source matched the pinned upstream checkout at review time.

Two inherited MIT notices were added during this review: modern-screenshot and platform-design-skills. Their original license texts live in `src/licenses/impeccable/`. The builder includes them under `lib/impeccable/third-party-licenses/`, and standalone exports retain them under `references/impeccable/third-party-licenses/`. Distribution tests check that the notices survive.

Sources: [MIT](https://opensource.org/license/mit), [Apache-2.0 section 4](https://www.apache.org/licenses/LICENSE-2.0), [modern-screenshot license](https://github.com/qq15725/modern-screenshot/blob/main/LICENSE), [platform-design-skills license](https://github.com/ehmo/platform-design-skills/blob/main/LICENSE).

## Fonts and Kishu artwork

The site includes OFL notices for Bricolage Grotesque, Geist, Geist Mono and GFS Didot. The OFL permits website embedding and redistribution subject to its conditions, including retaining notices and OFL licensing and respecting reserved font names for modified fonts. The SVG wordmarks embed the original Bricolage font metadata. Kishu's puppy artwork was generated for this project; its provenance is recorded with the site assets.

Sources: [OFL terms](https://openfontlicense.org/open-font-license-official-text/), [SIL FAQ](https://openfontlicense.org/ofl-faq/).

## Original demo collection

The public collection uses fictional brands and new generated artwork. Veldrift's six paintings and Stillroom's four editorial studio images were created with the built-in OpenAI image-generation tool from text-only prompts. No third-party reference images were supplied. Meridian uses authored chart and interface geometry. The original prompts, input lists and file hashes are retained in each image directory's `provenance.json`.

OpenAI's terms assign its rights, if any, in output to the user to the extent permitted by law. They also state that output may not be unique and that users remain responsible for respecting others' rights. The repository does not claim exclusive rights in generated images or trademark clearance for the fictional demo names. Subject to those limits, Kishu's own site code, copy and generated artwork are supplied under the repository's MIT license; font and bundled upstream licenses remain separate.

The earlier third-party game media, derivative screenshots and acquisition scripts are excluded from the public snapshot. They were never pushed to the remote. The user authorized replacing the remote branch history with a single parentless release commit before changing visibility. Rewriting a branch removes its prior ancestry from the normal commit view; it is not a guarantee that a hosting provider has purged internal caches or unreachable objects.

Source: [OpenAI Terms of Use — Content](https://openai.com/policies/terms-of-use/#content).
