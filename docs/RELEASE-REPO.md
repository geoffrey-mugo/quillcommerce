# Public release repo — github.com/geoffrey-mugo/quillcommerce

The sanitized source-release mirror (reviewer guidance: never publish
this private repo; share source only through a sanitized release repo).
Created 2026-09-16 from skeleton@d2316fb as a fresh single-commit
history — commit messages here mention Empire and must never be pushed
there.

## What ships there

- Shipping dirs verbatim: `assets/ config/ layout/ listings/
  locales/ sections/ snippets/ templates/` (`blocks/` was removed
  2026-09-16 — the Skeleton theme blocks were unreachable dead code)
- `LICENSE.md`, `THIRD_PARTY_NOTICES.md`
- `docs/MERCHANT-GUIDE.md`
- `docs/DEMO-IMAGE-CREDITS.txt` **truncated before the "Retired"
  ledger** (the ledger names third-party brands from the copyright
  audit — private evidence, keep it here)
- A release-repo `README.md` (its own file — the private README
  references Empire and internal governance)

Excluded: `CLAUDE.md`, `README-CLEANROOM-EMPIRE-PARITY.md`, private
`README.md`, `docs/provenance/`, `docs/qa/`, `docs/specs/`,
`docs/LISTING.md`, `docs/screenshots/`, this file.

## Cutting a release

1. Stage the files above into a fresh directory; copy the previous
   release README from the public repo (or rewrite).
2. Sanitization gate — every term must return nothing (only known
   false positive: "e**xplorer**" fixture filenames match `xplorer`):
   `rg -il "empire|pixel union|pxs-|pxu-|ssqll|ftv|flying ties|roxstar|clean.?room|winston" .`
   and `rg -ilw "sage" .`
3. Single commit (never the private history), push to `main`, tag
   `v<theme_version from settings_schema.json>`.
4. `shopify theme package` in the staged dir; attach the ZIP to a
   GitHub release for that tag.

v1.0.0-beta.1 published 2026-09-16: 118 files, tag + release with the
packaged ZIP attached.
