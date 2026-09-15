# Phase 5 · Slice 2 verification — SPEC-018 recently viewed products

Date: 2026-09-14 · Theme: #149206040653 (skeleton) on saasquill-app-dev
Feasibility precheck: storefront search resolves `id:` field queries on
this store (suggest endpoint returned the parka for its id) — the
section-render approach is valid.

## Results (live)

| Check | Result |
|---|---|
| Recording | PASS — visiting Ski Wax → Complete Snowboard → Parka leaves `qc:recently-viewed` = [parka, snowboard, ski-wax] (head-insert, deduped) |
| Render + exclusion | PASS — on the parka PDP the strip shows exactly [Complete Snowboard, Ski Wax]: current product excluded, most-recent-first |
| Recency reorder | PASS — client-side reorder by handle overrides search relevance order |
| Card consistency | PASS — canonical cards ("Choose options" for multi-variant products), rendered beneath the two recommendation strips without collision |
| Self-only history | PASS — history containing only the current product renders nothing and leaves no placeholder |
| Empty/unavailable storage | PASS — element removes itself immediately (verified with a detached instance after clearing storage); recordView is try/catch-guarded |
| Shared styles | PASS — `.qc-recs` presentation moved to qc-foundation.css (scoped-CSS lesson applied preemptively; Theme Check clean) |
| No-JS baseline | By design — placeholder renders nothing |

## Gates
Theme Check: 53 files, 0 offenses. Provenance scan: clean. `node
--check`: OK. Pushed to #149206040653 (template ships the section after
the recommendation strips).

## Known gaps
- Deleted/unpublished products in history are dropped by search
  (by design; not exercisable without deleting a product).
- Editor add/reorder of the section rides on the carried Theme Editor
  walkthrough.
