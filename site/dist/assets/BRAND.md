# Kishu artwork maintenance

The same unnamed puppy is used as decorative flair across the website, README and favicon. It has no separate character name or downloadable identity package. The original AI-generated raster artwork is included at full resolution, with alpha transparency preserved.

## Files

- `kishu-puppy.png`: full-body mascot, transparent 1280 × 1280 original.
- `kishu-puppy.webp`: optimized 768 × 768 web version.
- `kishu-stamp.png`: compact head mark, transparent 1280 × 1280 original.
- `kishu-stamp-128.png`, `kishu-stamp-256.png`: ready-to-use sizes.
- `favicon-32.png`, `favicon.ico`: browser icons.
- `apple-touch-icon.png`: 180 × 180 touch icon.
- `kishu-readme-light.svg`, `kishu-readme-dark.svg`: self-contained wordmark lockups with embedded mascot and font.
- `kishu-social.jpg`: current 1200 × 630 social preview, rendered from `site/brand-render.html` with the original puppy asset.
- `kishu-social.png`: preserved artwork from the earlier page revision; no longer referenced in public metadata.

## Colors

| Role | Color |
| --- | --- |
| Ink | `#192C26` |
| Vermilion | `#ED5035` |
| Mint | `#B7D4BD` |
| Paper | `#F6F3E9` |
| Ivory | `#FFF9EC` |

Use the stamp at 24 pixels and above; use the full puppy at 96 pixels and above. Leave at least one ear's width around the silhouette. Preserve the proportions and original colors. For a single small mark, use the transparent PNG instead of adding a separate container. The ivory silhouette works on light and dark backgrounds.

## README example

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/brand/kishu-readme-dark.svg">
  <img src="docs/brand/kishu-readme-light.svg" width="480" alt="Kishu — Big ideas. One command.">
</picture>
```

For a simple stamp: `<img src="docs/brand/kishu-stamp.png" width="96" alt="Kishu puppy">`.

The Bricolage Grotesque, Geist and Geist Mono typefaces are distributed under the SIL Open Font License; their license notices are included with the site. No third-party character artwork was used as a reference.
