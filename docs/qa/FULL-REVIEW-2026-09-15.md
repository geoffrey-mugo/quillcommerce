# Full three-lens review — 2026-09-15

Scope: Theme Store approval readiness, merchant experience, shopper
experience. Evidence: repo inspection, live storefront sweep on theme
#149206040653, Lighthouse 12 runs against `shopify theme dev`
(dev-proxy penalties noted where relevant).

## Lens 1 — Shopify Theme Store approval

### Blockers
1. **No app-block support.** No section declares `{"type": "@app"}`.
   The Theme Store requires app blocks at minimum on the product
   template; without them review apps, subscription apps, etc. cannot
   inject. Highest-priority gap.
2. **theme_info URLs do not resolve** (saasquill.com — owner action,
   already tracked in SUBMISSION-BLOCKERS-FIX.md §4).
3. **No favicon setting or output.** `settings_schema` has no favicon
   image setting and `meta-tags.liquid` emits no icon link.

### Likely review flags
4. **No contact form.** No section or template renders
   `{% form 'contact' %}`; "Contact form" is on the required features
   checklist.
5. **Images never lazy-load.** `snippets/image.liquid` passes no
   `loading` attribute; collection page shows ~353 KiB offscreen-image
   savings; hero LCP has no `fetchpriority`/preload. Local Lighthouse
   perf: home 58, PDP 62, collection 73 — depressed by dev-proxy
   artifacts (no gzip/HTTP2/HTTPS, +1s TTFB), so production likely
   clears the ≥60 average, but image loading is the one real
   theme-attributable cost.
6. **Contrast failure on unavailable variant pills** (PDP a11y 96):
   pill label #858585 on white = 3.69:1, below 4.5:1.
7. **Heading-order skip** (collection a11y 98): card `<h3>` directly
   under the page `<h1>`.
8. **No editor onboarding placeholders**: e.g. `qc-featured-collection`
   renders nothing until a collection is chosen; requirements favor
   placeholder content for unconfigured sections.

### Passing
All required templates present and themed (incl. password, gift_card,
list-collections, customers/*); OS 2.0 JSON everywhere; predictive
search; unit prices; quantity rules; locale-safe Ajax; translations
complete (Theme Check 0 offenses); OG + Twitter meta and JSON-LD;
zero external dependencies; no developer marketing in defaults;
provenance/IP clean (see COPYRIGHT audit trail); Lighthouse
accessibility 96–100 with skip link, `:focus-visible`, reduced-motion
collapse, SR labelling throughout.

## Lens 2 — Merchant

Strengths: three brand colors auto-derive a full palette (now with 4
optional overrides); corner-style presets; 11 addable merchandising
sections; cart page/drawer toggle; built-in compare + recently viewed
(features that usually cost an app); utility bar; 3-level nav; gift
card template; imageless products degrade to an icon tile; moderated
blog comments; MERCHANT-GUIDE.md exists.

Gaps, in merchant-pain order: (1) app blocks — cannot place review/
subscription/app widgets without editing code; (2) no contact form for
the standard Contact page; (3) no favicon upload; (4) unconfigured
sections look empty in the editor (no placeholder guidance); (5) only
one theme style/preset shipped (allowed, but 2–3 styles sell better);
(6) documentation/support links dead until saasquill.com resolves;
(7) English-only locale files (translatable, but no bundled languages).

## Lens 3 — Shopper

Strengths: light payload (~76 KB unminified JS+CSS total, no external
requests); every flow works without JavaScript; cart drawer with live
updates and screen-reader announcements; quick view; predictive search
with empty-state messaging; themed 404 and zero-results pages;
pagination overflow handled; sticky buy bar; pickup availability;
uniform cards at all breakpoints (mobile QA records); prefers-reduced-
motion respected.

Gaps: slower first paint on constrained networks from eager images
(hero + full grid); unavailable-variant pill text is genuinely hard to
read (same as flag 6); minor heading-structure skip for screen-reader
scanning; the standing manual keyboard pass (real Escape key on
dialogs, tab-reveal on tucked header) remains outstanding.

## Suggested fix order
@app blocks → favicon setting → contact form section/template → image
`loading`/`fetchpriority` strategy → pill contrast token → editor
placeholders → heading levels → (owner) saasquill.com DNS →
optional second/third theme style.
