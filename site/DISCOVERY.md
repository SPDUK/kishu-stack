# Search and AI discovery

The user confirmed `https://spduk.github.io/kishu-stack/` as the public address. This revision prepares the static files for that address; it does not publish the site, submit it to search engines, or establish that it is indexed.

## Shared source

Edit `discovery.config.mjs` for the public address, title, description, social image, and FAQ answers. Run `npm run discovery` to update the marked regions of `dist/index.html` and the accompanying discovery files. The normal `npm run check` fails if generated files are out of date. The generator preserves the rest of the hand-authored page.

- Descriptive title and description identify Kishu as an AI coding workflow and model-routing plugin for Codex, Cursor, and Claude Code.
- An absolute canonical, Open Graph and Twitter image metadata, and a one-page sitemap use the same project-subpath address.
- JSON-LD describes a `WebSite`, `WebPage`, and `SoftwareSourceCode`, tied to the repository and actual license. No invented reviews, ratings, prices, or endorsements.
- Product explanations and native FAQ disclosures are present in the HTML before JavaScript. The initial demo also has a readable static handoff.
- `index.md` provides a compact textual product, setup, limitations, evidence, and attribution reference. `llms.txt` links to that reference and the repository documentation. These are optional convenience files, not a ranking promise or a replacement for crawlable HTML.
- `assets/kishu-social.jpg` is a 1200 × 630 browser-rendered card from `brand-render.html`, using the original unnamed puppy artwork. Preview locally at `/__brand` to regenerate it.

## Crawling and GitHub Pages

The page has an index/follow robots directive with full snippet and large-image previews allowed. `dist/robots.txt` allows crawling, including OAI-SearchBot, and names the sitemap.

A crawler reads robots rules at the **host root**. On this project site that is `https://spduk.github.io/robots.txt`, not `/kishu-stack/robots.txt`. The included project copy does not override host-root rules. If this account already has a host-root site, its owner must keep any rules there consistent with the intended visibility. No unrelated root repository or crawler policy was changed. In the absence of applicable robots restrictions, crawling is allowed by default.

Publication and indexing remain separate steps. Once deployed, verify that the canonical page, social image, and sitemap return successfully at the public URLs. Search Console submission can help with discovery when the account owner chooses to set it up. Neither search engines nor AI answer products guarantee inclusion or citation.

## Guidance used

Checked during the November 2026 revision:

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) — standard SEO, crawlable textual content, and structured data that agrees with visible information; no special AI schema or text file is required.
- [Google: canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) — keep canonical signals consistent.
- [Google: create a robots.txt file](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt) — robots files apply from the host root.
- [OpenAI: crawler overview](https://developers.openai.com/api/docs/bots) — OAI-SearchBot serves search discovery; it is distinct from GPTBot and user-directed page retrieval.
- [Schema.org: SoftwareSourceCode](https://schema.org/SoftwareSourceCode) — source-repository and target-product semantics.
- [The llms.txt proposal](https://llmstxt.org/) — a proposed textual entrypoint, used here as an optional documentation aid.

See [VERIFICATION.md](VERIFICATION.md) for executed local checks and their limits.
