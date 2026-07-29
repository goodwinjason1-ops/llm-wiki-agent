---
title: QTF Performance Review and Process Learning Dashboard - Research Contract
created: 2026-07-13
updated: 2026-07-13
type: research-contract
status: deterministic-core-implemented-paper-only
implementation:
  module: Implementation/performance_review_dashboard.py
  tests: Implementation/test_performance_review_dashboard.py
  schema: Implementation/schemas/performance_review_event.schema.json
owner: Quant Floor
source_review: [[Morin Performance Review Dashboard and First AI Trading Workflow - Source Review - 2026-07-13]]
related: [[Robot James Crypto Pairs Research Contract - QTF-023]]
---

# Purpose

Build a paper-only performance-review layer that helps distinguish strategy quality from trader/process execution quality. It should inform, evolve and improve research without becoming an autonomous strategy optimiser.

# Phase 1: minimum viable review ledger

Record one structured row per paper trade or research event:

- `event_id`
- `timestamp`
- `market_symbol`
- `timeframe`
- `strategy_version`
- `setup_tag`
- `execution_pattern_tag`
- `lifecycle_phase`
- `planned_entry`, `planned_stop`, `planned_target`
- `observed_entry`, `observed_exit`
- `risk_fraction`
- `fees`, `slippage`, `funding_assumption`
- `plan_followed`
- `emotion/process tags`
- `what_worked`
- `what_failed`
- `amendment_or_correction`

# Phase 2: weekly/monthly review

Weekly:

1. What did I do well?
2. What did I struggle with?
3. What will I improve next week?
4. Which setup, execution and lifecycle tags repeated?
5. Which planned actions were not observed in behaviour?

Monthly:

1. Best/worst setup by risk-adjusted result and sample count.
2. Common mistakes by execution, management and closure phase.
3. Process changes to test next month.
4. Contradictions between stated improvement plans and observed actions.
5. What evidence would falsify the proposed improvement?

# Phase 3: analysis views

- Punch-card grid of tags by week.
- Active streaks only when a tag occurs in at least two periods and has sufficient observations.
- Setup scorecard with sample count, net result after costs, drawdown contribution and uncertainty note.
- Planned-versus-observed contradiction table.
- Review action queue with owner, due date, evidence requirement and status.

# AI analysis contract

The model may:

- Summarise saved reviews.
- Identify candidate patterns.
- Quote supporting records.
- Surface contradictions.
- Suggest bounded process experiments.
- State uncertainty and alternative explanations.

The model may not:

- Place orders.
- Change risk limits automatically.
- Rewrite strategy rules without a review-board decision.
- Promote a setup based on tag counts alone.
- Treat repeated behaviour tags as causal proof.

# Promotion gate

A process change can enter the next paper-test cycle only when:

- The source records are identifiable.
- The proposed change is versioned.
- The alternative explanations are recorded.
- The test window and success criteria are defined before review.
- Costs, slippage and funding assumptions are explicit where relevant.
- Results are evaluated on held-out or walk-forward data where the change affects strategy rules.

# Implementation order

1. Define the event schema and tag dictionary.
2. Create a local append-only paper-review ledger.
3. Build weekly/monthly review templates.
4. Add deterministic streak, sample-count and scorecard views.
5. Add model analysis as a read-only report generator.
6. Add contradiction and planned-versus-observed review.
7. Test on historical/paper records before connecting TradingView alert events.
