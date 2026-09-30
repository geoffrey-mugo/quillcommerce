# Image generation brief — Tailwater original product set

Production method: **original, art-directed generated imagery** (AI/CGI). Goal: one
consistent visual system across 18 products + editorial slots, depicting **no real
third-party product or brand**, with full provenance. Run these through one
generator/model in one session so the look holds; regenerate outliers until the
consistency test passes.

## Hard rules
- **No real brand names, logos, trademarks, or recognizable real products.** These
  are original fictional Tailwater items.
- No text, watermarks, or UI in the image.
- One look across the whole set — same background, light, grade, and crop for
  products; same grade for editorial.
- Log every asset in `provenance-ledger.md`: generator + model/version, full
  prompt, seed (if available), date, and "original — depicts no real product".
- Keep prompts/seeds so any asset can be regenerated identically.

## Global style contract
**Product style (apply to every product prompt, verbatim):**
> editorial catalog product photograph, {SUBJECT}, centered on a warm off-white
> paper backdrop (#F2EFE5), soft even overcast north-daylight, one gentle soft
> shadow, muted natural color grade, matte finish, crisp fine detail, 4:5 vertical
> composition, generous even margins, no text, no logos, no branding, no people

**Editorial style (apply to every editorial prompt, verbatim):**
> documentary outdoor photograph, {SCENE}, Pacific Northwest freestone river / trail,
> soft overcast or low golden daylight, muted greens and wet stone, natural filmic
> color grade, candid and unposed, no text, no logos, no recognizable brands

Negative / avoid (all): `text, watermark, logo, brand name, extra fingers, plastic
sheen, oversaturated, HDR, studio white seamless, duplicate, deformed`.

Consistency knobs: reuse one seed family or a style reference image; keep the same
aspect ratio (4:5 products; 3:2 or 16:9 editorial); fix focal length language
("shot on 50mm") across products.

## Per-product prompts ({SUBJECT})
| File | Product | SUBJECT |
|---|---|---|
| tw-riffle-fly-rod | Riffle Fly Rod | a modern graphite fly rod handle and reel seat, olive blank, cork grip, laid at a slight diagonal |
| tw-tailout-fly-rod | Tailout Fly Rod | a matte charcoal graphite fly rod grip and reel seat, understated |
| tw-headwaters-signature-fly-rod | Headwaters Signature Fly Rod | a premium fly rod grip with nickel-silver hardware and full-wells cork, refined |
| tw-riffle-fly-reel | Riffle Fly Reel | a machined large-arbor fly reel, brushed dark green, three-quarter view on pale wood |
| tw-headwaters-fly-reel | Headwaters Fly Reel | a premium sealed-drag fly reel, cold-forged charcoal frame, three-quarter view |
| tw-tapered-leader-3-pack | Tapered Leader 3-Pack | three coiled clear tapered leaders in flat resealable wallets, top-down |
| tw-dry-fly-assortment | Dry Fly Assortment | an open compartment fly box of small dry flies in tan and grey, top-down |
| tw-nymph-assortment | Nymph Assortment | an open slit-foam fly box of weighted nymphs, bead-heads visible, top-down |
| tw-streamer-selection | Streamer Selection | an open box of six larger streamer flies in olive and white, top-down |
| tw-local-favorites-fly-box | Local Favorites Fly Box | a small mixed fly box, assorted flies, top-down |
| tw-guide-landing-net | Guide Landing Net | a hand-shaped walnut and ash landing net with a clear rubber bag, flat |
| tw-waterproof-fly-box | Waterproof Fly Box | a slim gasketed waterproof fly box, closed then implied-open, matte grey |
| tw-fly-tying-starter-kit | Fly Tying Starter Kit | a compact fly-tying kit: small vise, bobbin, scissors and thread spools grouped |
| tw-rotary-tying-vise | Rotary Tying Vise | a true-rotary fly-tying vise with a steel jaw and pedestal base, three-quarter |
| tw-storm-wading-jacket | Storm Wading Jacket | a technical 3-layer wading shell in slate green, flat-lay, taped seams and zips |
| tw-river-hoodie | River Hoodie | a midweight grid-fleece hoodie in heather grey, neat flat-lay |
| tw-field-tee | Field Tee | a heavyweight plain olive cotton tee, neat flat-lay, no graphics |
| tw-guide-cap | Guide Cap | a 6-panel structured cap in field olive, three-quarter, low brim |

*(Gift card: render a simple original gift-card graphic on the paper backdrop —
`tw-gift-card`. Created manually in Admin.)*

Optional alt/hover shots: a second angle or detail macro per product, same style.

## Editorial slot prompts ({SCENE})
| File | Slot | SCENE |
|---|---|---|
| tw-river-hero | Home hero | a lone angler wading a misty river at dawn, wide, room on one side |
| tw-apparel-editorial | Field-kit lead | folded technical layers on a truck tailgate at a trailhead, soft light |
| tw-material-closeup | Material note | extreme macro of a taped waterproof seam and grid-fleece texture |
| tw-article-deschutes | Field report 1 | a rainy river morning, wet stones and moving water, moody |
| tw-article-lowwater | Field report 2 | a low, clear freestone creek, glassy run over gravel, bright overcast |
| tw-article-leader | Guide | close hands knotting a leader over water (no visible brand) |
| tw-cat-rods / -flies / -tackle / -apparel | Shop by category | one coherent representative frame per category, same grade |

## Post-generation QA
- Consistency test: any two product images side by side look like one shoot.
- All product images cropped to 4:5, longest edge ≥ 2000px, sRGB.
- No stray text/logos; nothing resembling a real brand's product.
- Write alt text for each (accessibility + SEO); record it with the asset.
- Every asset's provenance row complete and Approved before it enters the store.
