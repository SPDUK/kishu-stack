# Kishu logo assets

Use `kishu-stamp.png` as a compact transparent mascot, including in README headers and badges. The SVG wordmarks embed the mascot and typeface so they do not depend on external assets.

The main README uses the transparent icon above a native Markdown heading so the opening remains legible in light and dark themes. Use these paths from the repository's root README:

```html
<p align="center">
  <img src="docs/brand/kishu-stamp.png" width="112" height="112" alt="Kishu puppy icon">
</p>
```

The self-contained wordmark is available when a surface needs the full lockup:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/brand/kishu-readme-dark.svg">
  <img src="docs/brand/kishu-readme-light.svg" width="480" alt="Kishu — Big ideas. One command.">
</picture>
```

These are project assets, not a downloadable product. The puppy is unnamed visual flair. Artwork maintenance notes are in `site/dist/assets/BRAND.md`.
