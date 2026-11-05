# Kishu demo site

A static, responsive showcase for Kishu mode, with an unnamed puppy accent and three interactive model-routing walkthroughs. The browser demos are illustrative; this site does not connect to an agent or execute visitor prompts.

## Run locally

With Node.js installed, run these commands from this directory:

```sh
npm run dev
```

Open `http://127.0.0.1:4173`. The site has no runtime npm dependencies or build step. `dist/` is the complete deployable site and can be served by any static host.

## Check

```sh
npm test
npm run check
```

The 38 behavior checks cover the routing walkthrough, discovery generation, destination selection, simulated orders and workshop booking. The recursive resource checker verifies local files (including responsive images), cross-page anchors, unique IDs and portable URLs across every demo. Discovery checks detect outdated generated files. See [verification](VERIFICATION.md) for the executed cases and limits.

## Edit

- `dist/index.html` — page structure and copy.
- `dist/styles.css` — responsive design, type, color, and motion.
- `dist/app.mjs` — handoff rendering, accessible tabs, copy controls, model-role selection, and interruptible motion.
- `dist/motion.mjs` — puppy greetings, one-time section entrances, FAQ reveals, and reduced-motion handling.
- `dist/demo-engine.mjs` — scenario data and deterministic playback controller.
- `discovery.config.mjs` — canonical address, search copy, social preview metadata, and FAQ content.
- `scripts/generate-discovery.mjs` — generate metadata, visible FAQs, `index.md`, `llms.txt`, `sitemap.xml`, and `robots.txt` from the shared source. Run `npm run discovery` after editing the configuration or generator.
- `dist/assets/` — original artwork, logo stamp sizes, favicon, and social artwork. The puppy is decorative; there is no download package or separate character identity.
- `DESIGN.md` — design system extracted from the finished page.
- `asset-prompts/` — exact generation prompts for the puppy and head stamp.
- `brand-render.html` — source of the social artwork, available locally at `/__brand`.
- `scripts/brand-assets.mjs` — regenerate self-contained README lockups and copy them into the repository's `docs/brand/` folder.

The site serves all fonts and images locally. Font license notices are included in `dist/fonts/`. Original mascot PNGs carry provenance metadata; WebP provenance is in its adjacent JSON file. The current social JPEG is a browser capture of `brand-render.html`, using the original puppy asset.

## GitHub Pages

Publish the contents of `dist/` as the Pages artifact. Asset URLs are relative, so the page works at both a domain root and a repository subpath. No application build or server is required. Canonical, social, and sitemap URLs are configured for the user-confirmed `https://spduk.github.io/kishu-stack/`.

The repository workflow deploys `site/dist/` only from public `main`, after both verification jobs pass. It can also be started manually after Pages is configured to use GitHub Actions. Code, font and generated-artwork notes are in the [license review](../docs/licensing.md).

See [DISCOVERY.md](DISCOVERY.md) for search and AI-discovery choices, regeneration, and the host-root limitation of `robots.txt` on a GitHub Pages project site.

The website's demo code samples are explanatory examples, not complete backend implementations. External navigation leads to Kishu's source repository and the credited upstream projects.

## Product language and credits

Kishu mode owns the routing. Its design taste engine guides interface work, and its ADHD-aware communication puts outcomes and decisions first. The approach section explains those preferences and uses this site's actual build as an example.

The visible credits section names pstack, Impeccable, and i-have-adhd, their authors and licenses, and their roles within Kishu. Keep those credits consistent with the root [README](../README.md#whats-inside) and [third-party notices](../THIRD_PARTY_NOTICES.md). The [build story](BUILD_STORY.md) records the evidence behind the site's real-world example.

## Demo collection

| Demo | Local route | Interaction |
| --- | --- | --- |
| Veldrift | `/mmo/` | Explore three original fantasy landscapes with accessible destination tabs. |
| Meridian | `/meridian/` | Switch markets and timeframes, pause simulated prices, and place a fictional order. |
| Stillroom | `/stillroom/` | Select a workshop/session, choose participants, and review a local demo reservation. |

These fictional products demonstrate different interface needs. They send no market orders, payments or reservations. All generated scenery and studio photographs have provenance records. The [public story](dist/case-studies/mmo.html) explains what happened and why without exposing downloads or a technical ledger.

`npm run mmo:record` rebuilds the internal readable decision log. `npm run mmo:check` checks Veldrift, its case study, local resources and ledger consistency. `npm test` includes behavior checks for all three demos. The main site lists them under `#examples`.
