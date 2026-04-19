# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page portfolio website for Xaviera Ananda Sinaiyangsih, deployed via GitHub Pages. No build system — all files are served directly.

## Development

No build step required. Open `index.html` directly in a browser, or use a local static server:

```bash
# Python
python -m http.server 8000

# Node (if available)
npx serve .
```

## Architecture

Single-page site with one `index.html` entry point (~350KB). All sections (intro, about, experience, portfolio, testimonials, contact) are in this one file.

**CSS:**
- `css/vendor.css` — bundled third-party CSS: PrismJS, Swiper
- `css/styles.css` — all custom styles, based on the "Monica" template

**JS:**
- `js/plugins.js` — bundled third-party JS: PrismJS 1.20.0, MoveTo, Swiper 6.4.5
- `js/main.js` — custom behavior: preloader, mobile menu, header fixed-on-scroll, Swiper specialties slider, MailChimp newsletter form, smooth scroll, back-to-top

**Assets:**
- `images/` — photos, SVGs, favicons
- `images/thumbs/` — responsive image variants (600/1200/2400px) for about, contact, single sections
- `vendor/bootstrap/` — Bootstrap 5 source (CSS/JS); included for reference only — the compiled output used in `css/vendor.css`

**External CDN dependencies** (loaded in `index.html` `<head>`):
- SweetAlert2
- Instagram embed
- Google Fonts (Material Symbols)

## GitHub Pages Deployment

The `main` branch root is served directly — no `docs/` subfolder or build output. Pushing to `main` deploys automatically. All asset paths must be relative (no leading `/`).

## Key Constraints

- All paths in HTML/CSS must be relative, not absolute — required for GitHub Pages subdirectory hosting.
- `vendor/bootstrap/` files are not directly referenced in HTML; only `css/vendor.css` and `js/plugins.js` are loaded.
- The specialties slider uses Swiper.js initialized in `js/main.js:150` with custom prev/next/first/last navigation buttons.
