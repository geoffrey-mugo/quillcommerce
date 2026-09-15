# Smart sticky header — mobile QA sweep

Date: 2026-09-14 · Theme: #149206040653 (live) · 375×812 touch profile

## Results

| Check | Result |
|---|---|
| Baseline | PASS — 65px header, all visible controls ≥44px, no horizontal scroll |
| Tuck on scroll down | PASS — header fully off-screen past ~2 header-heights |
| Reveal on scroll up (mid-page) | PASS — slides back at scrollY ≈920 with the floating shadow (`qc-header--stuck`) |
| Utility bar | PASS — scrolls away naturally while the header sticks |
| Nav drawer conflict | **DEFECT FOUND & FIXED** — scrolling down with the menu open tucked the header underneath the open panel; the tuck now skips whenever a header `details[open]` exists. Re-verified: menu open → header pinned while scrolling; menu closed → tucking resumes |
| Search dialog | PASS — opens from the tucked-capable header, fits viewport, scroll-locks, unlocks on close, no navigation |
| PDP dual-sticky | PASS — deep scroll: header tucked + bottom purchase bar shown (max content); scroll up: header on top, bar at bottom, zero overlap |
| Focus reveal | Handler in place (unchanged Phase 3 pattern); programmatic focus refused by the browser in this environment — part of the standing real-keyboard check |

## Gates
Theme Check 75 files / 0 offenses; pushed live.
