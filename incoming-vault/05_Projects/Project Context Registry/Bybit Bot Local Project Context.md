---
title: Bybit Bot Local Project Context
created: 2026-07-09
updated: 2026-07-09
type: project-context
source_path: "C:/Users/Kidsg/OneDrive/Documents/bybit bot"
classification: planning_spec_project
status: local_git_initialized_no_remote
safety: secrets-redaction-required
tags: [project-context, bybit, trading-bot, quant, safety-first]
---

# Bybit Bot Local Project Context

## Source path

`C:/Users/Kidsg/OneDrive/Documents/bybit bot`

## Current classification

Planning/spec/tracker folder for the dual-venue Bybit + Hyperliquid AI Trading Platform. This is **not yet an executable scaffold**.

## Local files confirmed

- `PLAN.md` — 13-phase build plan.
- `spec_clean.md`, `spec_extracted.md`, `spec_wrapped.md` — extracted source specs.
- `tracker/index.html`, `tracker/progress-data.js` — progress tracker.
- `Phase 0.txt` — local-only credential-like setup notes; ignored by git.
- `Phase 0.redacted.md` — safe planning copy created 2026-07-09.
- `.gitignore`, `.env.example`, `SECURITY.md`, `CLAUDE.md` — safety hardening files created 2026-07-09.

## Git/GitHub status

- Local git initialized: yes.
- GitHub remote: not yet created/found.
- First commit: not yet made.
- Reason: rotate/clean any exposed secrets before pushing anywhere.

## Safety rules

- Do not print or commit secrets.
- Treat `Phase 0.txt` as exposed until all real keys/tokens/passwords are rotated.
- Keep all execution disabled until explicitly approved.
- Build order: public/read-only adapter → storage → backtest/paper → risk gates → dashboard → testnet → live only with explicit scope approval.

## Links

- [[AI Second Brain Project Registry]]
- [[Bybit Airdrop Prediction Bot Implementation Plan]]
