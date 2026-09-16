# SPEC-025 — Conversion kit (P2 from Empire comparison)

Status: Implemented & verified — 2026-09-15
Source: SPEC-024 follow-up; Empire listing features + review mining.

## 1. Promo banner (qc-promo-banner)
Full-width strip: heading, text, one CTA, tone (accent / ink / raised
surface), start/center alignment. Pure Liquid.

## 2. Promo tiles (qc-promo-tiles)
2–6 image tiles, each fully clickable: image, heading, optional
subtext, link. Auto-fit grid, contrast scrim, hover lift consistent
with card motion.

## 3. Product badges
Cards and the PDP gallery show up to two badges: automatic **Sale**
(compare-at above price; Catalog toggle, default on) and custom badges
from product tags prefixed `badge:` (e.g. `badge:Limited`). Rendered
with the existing qc-badge primitives on the media top-left.

## 4. Pre-order presentation
A variant that tracks inventory, allows overselling, and has zero or
negative stock is *pre-orderable*: buy button (PDP, sticky bar) and
single-variant card quick-add read "Pre-order"; stock line reads the
pre-order note. Detection in Liquid for first paint and in
qc-product.js on variant switch (variants JSON already carries
managed/policy/qty).

## 5. Trust badges (product section block)
New `trust` block: icon (truck / shield / lock / returns — new
original stroke icons) + text, rendered as a wrapping row in the
buy-box block area. Repeatable, reorderable, app-block friendly.

## 6. Countdown timer (qc-countdown)
Section: heading, end date + time (text settings, store timezone),
optional CTA, expired message. qc-countdown element ticks per second,
renders D/H/M/S units with localized labels, swaps to the expired
message at zero, and shows the plain end date without JS.

## 7. Testimonials (qc-testimonials)
2–6 quote blocks: quote, author, detail (role/location). Auto-fit
grid, oversized quote mark, qc tokens only. Pure Liquid.

## 8. Bundled translations
Complete fr.json, de.json, es.json, it.json storefront locales
covering every key in en.default.json (Theme Check MatchingTranslations
must stay clean).

## Definition of done
Gates clean; pushed to #149206040653; sections/badges/pre-order
verified via temporary fixtures + Playwright (pre-order via a
continue-selling zero-stock variant on the QA parka); guide updated.
