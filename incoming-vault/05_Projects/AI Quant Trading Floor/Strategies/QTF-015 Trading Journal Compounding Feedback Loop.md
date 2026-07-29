---
title: QTF-015 Trading Journal Compounding Feedback Loop
created: 2026-07-08
updated: 2026-07-08
type: quant-strategy
status: workflow-spec
markets: [multi-asset]
timeframes: [all]
tags: [quant, trading-journal, process, paper-trading]
sources:
  - 03_Sources/x/X Trading Journal Compounding Idea - 2071192941750599725.md
confidence: low
---

# QTF-015 Trading Journal Compounding Feedback Loop

## Hypothesis

A structured trading journal can improve Jayse's research floor if it converts every paper decision into reviewable fields and recurring lessons, rather than freeform notes.

## Schema fields

```text
journal_id, ts, venue, market, timeframe, strategy_id, signal_source,
pre_trade_thesis, setup_tags, entry_plan, invalidation, target_plan,
risk_pct, paper_size_usd, confidence_pre, emotion_state, execution_quality,
actual_entry, actual_exit, result_r, result_pct, mistake_tags,
lesson, rule_update_candidate, reviewer_verdict, approved_for_rules
```

## Review loop

- Daily: append rows; no live action.
- Weekly: summarize mistake clusters and best setup clusters.
- Monthly: propose one rule change at a time.
- Promotion gate: rule changes require out-of-sample/paper evidence, not vibes.

## Guardrail

This is a journal and feedback system, not a live trading executor.
