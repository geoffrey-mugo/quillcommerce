# Pass 8 — Final release readiness & Theme Store submission — 2026-09-16

Capstone of the eight-pass audit (JS reliability, Liquid architecture,
shopping journey, performance, accessibility, Theme Editor,
responsive/cross-browser, release). All work through `45c4d87`.

## Gate battery (all green)

- theme check: 94 files, 0 offenses (repo AND staged release copy)
- node --check: 13/13 JS modules
- JSON: every template, group, listing, config, locale, and section
  schema parses
- Locales: 255 keys × 5 languages, exact parity
- Provenance scan: clean; release sanitization gates (empire /
  pixel union / pxs / pxu / ssqll / ftv / flying ties / roxstar /
  clean-room / winston / sage): clean

## Theme Store requirements review

- **Templates**: all 12 required templates + all 7 customer
  templates + gift_card (standalone layout) + password layout.
- **Commerce features**: dynamic checkout (payment_button) +
  payment_terms, unit prices, quantity rules + volume pricing,
  selling plans/subscriptions, pickup availability (Section
  Rendering refresh), gift-card recipient form, Follow on Shop,
  predictive search, faceted filtering + sort, cart note, cart
  drawer + page in sync, media types (image/video/external/model via
  media_tag), variant media hooks, preorder (continue-policy)
  labeling.
- **theme_info**: name QuillCommerce, author SaaSQuill, version
  1.0.0-beta.1, docs URL and support URL both live (HTTP 200
  verified today).
- **Quality bars measured this cycle**: axe-core clean on every
  template + open dialogs; CLS 0.0000; zero console errors across
  the storefront and in the Theme Editor preview; no horizontal
  overflow 320–1440; full purchase journey verified desktop + mobile
  (Pass 3 matrix); Theme Editor operations verified (Pass 6).
- **Final render sweep**: 15 URLs (all templates incl. paginated,
  filtered search, section-render endpoint, 404, password) — all
  clean, zero Liquid/translation errors.

## Release staged (awaiting version word)

Staged per docs/RELEASE-REPO.md in the session scratchpad
(`release-stage/`): shipping dirs, LICENSE.md, THIRD_PARTY_NOTICES.md,
MERCHANT-GUIDE, truncated DEMO-IMAGE-CREDITS, public-repo README.
Both sanitization gates pass; `shopify theme package` produced
`QuillCommerce-1.0.0-beta.1.zip` (124 files, 166 KB) with correct
structure (theme dirs + listings/ style presets; the license notice
ships inside layout/theme.liquid). RELEASE-REPO.md updated for the
removed `blocks/` directory.

**Not pushed**: the public-repo commit, tag, and GitHub release wait
on the version decision (stay `1.0.0-beta.2` or go `1.0.0`) — the
owner's call per the standing note. Once decided: bump
`theme_version` in settings_schema.json, restage, single-commit push,
tag `v<version>`, attach the repackaged ZIP.

## Remaining items outside this codebase (owner's list)

1. Version decision (above).
2. Manual keyboard pass in a real browser (own preference).
3. Live Safari + Firefox smoke test before submission (no other
   engines on this machine; iOS Simulator needs full Xcode).
4. Public-preview Lighthouse run for the reviewer (password-protected
   dev store blocks PageSpeed; needs a public preview link).
5. Driftwood/Slate per-preset demo stores.
6. Partner dashboard listing name/screenshots.
7. Counsel check on the license-notice method (noted earlier).
