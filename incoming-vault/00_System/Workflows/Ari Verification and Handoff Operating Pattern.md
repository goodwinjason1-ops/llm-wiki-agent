---
title: Ari Verification and Handoff Operating Pattern
created: 2026-07-08
updated: 2026-07-08
type: workflow
tags: [hermes, ari, verification, handoff, workflow]
sources:
  - 03_Sources/youtube/Claude Code Money Partner - YouTube iTY8Q449YNQ.md
  - 03_Sources/x/Hermes Agent Use Cases X Source - 2068159407645671640.md
confidence: medium
---

# Ari Verification and Handoff Operating Pattern

## Pattern

For implementation-heavy work, Ari should use:

1. **Source-first intake** — save raw/source notes before synthesis when accessible.
2. **Stress test before build** — ask what can fail, what is generic, and what evidence is needed.
3. **Build with verification** — run compile/tests/smoke checks and report real outputs.
4. **Handoff before context reset** — save active queue, files changed, verification, and next action.
5. **No unsafe automation** — trading/DeFi stays read-only and paper-only unless Jayse explicitly approves live scope.

## Current session proof

- `00_System/Scripts/inbox_processor.py` dry-run report created.
- Antoine schema fields compiled and DEX Screener smoke scan returned schema-enriched watch-only rows.
- `venue_metrics_watchlist.py` recorded public Hyperliquid metrics and manual-review Lighter/TX Flow rows.
