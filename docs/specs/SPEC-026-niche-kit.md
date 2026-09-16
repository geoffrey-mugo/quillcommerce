# SPEC-026 — Niche kit (P3 from Empire comparison)

Status: Implemented & verified — 2026-09-15

## 1. Quick order list (qc-quick-order)
B2B-style section: pick a collection and it renders a compact table —
thumbnail, product/variant, SKU, price, quantity input, per-row Add.
Each row is a plain `{% form 'product' %}`-shaped post to the cart
(works without JS); the existing qc-product-form element upgrades rows
to Ajax adds with busy state, announcements, and drawer/count updates.
Sold-out rows show a disabled state. Settings: collection, product
limit. Mobile: rows stack.

## 2. Image hotspots (qc-hotspots)
Section: one image + up to 6 hotspot blocks, each positioned by X/Y %
sliders and bound to a product. Dots are native `details` disclosures —
keyboard and no-JS friendly — opening a mini card (image, title, price,
link). Pure Liquid/CSS.

## 3. Age verifier
Theme-settings group (off by default): heading, message, confirm
label, decline label + URL. When enabled, layout renders a modal
dialog gate; qc-age-gate.js opens it for visitors without the stored
confirmation, blocks Escape, and remembers confirmation in
localStorage (guarded). Without JS the gate stays closed (fails open —
documented for merchants).

## Definition of done
Gates clean; pushed; Playwright: quick-order row add updates the cart
(and restores it), hotspot opens its mini card, age gate blocks then
persists confirmation and decline navigates away; guide updated;
new strings present in all five locales.
