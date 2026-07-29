---
title: QTF-017 Morning Idea Generator from Second Brain
created: 2026-07-09
updated: 2026-07-09
type: quant-strategy
status: workflow-spec
tags: [quant, morning-brief, obsidian, idea-generation, guardrails]
sources:
  - 03_Sources/x/X Bookmark Cap 4 - CyrilXBT Obsidian Trading Ideas Morning Workflow.md
  - 03_Sources/x/X Bookmark Cap 2 - AI Edge Fable Obsidian Self-Evolving Loops.md
confidence: medium
---

# QTF-017 Morning Idea Generator from Second Brain

## Purpose

Generate three candidate trading ideas each morning from Jayse's vault, market context, watchlists, and previous evidence — without jumping directly to execution.

## Output schema

```text
idea_id
source_notes
market
venue
thesis
why_now
regime_assumption
required_data
risk_flags
benchmark
first_test
paper_or_backtest_next_step
reject_conditions
```

## Guardrail

The morning generator proposes research tasks. It does not place trades. Candidates must pass evidence gates before any guarded trading path.

## Implementation

Implemented by `Implementation/morning_quant_brief.py`.

Run manually from the implementation folder:

```bash
python morning_quant_brief.py --stdout-mode summary
```

Outputs:

- `Daily Briefs/AI Quant Morning Brief - YYYY-MM-DD.md`
- `00_System/Dashboards/AI Quant Morning Brief - Latest.md`
- `Implementation/ledgers/morning_brief_ideas.jsonl`
- `Implementation/reports/morning_quant_brief_<run_id>.json`

Current data sources are read-only/public:

- Bybit public spot candles for BTC/ETH/SOL regime snapshot.
- Hyperliquid public info endpoint for funding/OI candidates.
- Polymarket public Gamma API for macro/crypto headline candidates.
- Recent vault source notes for strategy-intake candidates.

Scheduled daily at 6am via Hermes cron job `AI Quant Floor 6am Morning Brief` (`46c173e5f73f`).

## Useful loops

1. Pull market/regime context.
2. Pull relevant vault notes and open research questions.
3. Generate three candidate ideas.
4. Score each idea for data availability and risk.
5. Send only the top ideas to backtest/paper review.
6. Record rejected ideas and why.

## Related

- [[AI Quant Trading Floor]]
- [[QTF-016 Social Trading Claim Review Protocol]]
