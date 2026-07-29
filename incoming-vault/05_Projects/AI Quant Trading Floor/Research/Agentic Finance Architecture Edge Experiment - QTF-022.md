---
title: Agentic Finance Architecture Edge Experiment - QTF-022
created: 2026-07-13
updated: 2026-07-13
id: QTF-022
type: research-experiment
status: queued
managed_as: paper-only
promotion_gate: reproducible evidence plus independent review
source: [[DamiDefi UCL Finance Paper Agent Architectures - Source Summary - 2026-07-13]]
tags: [quant, qtf-021, ai-agents, paper-trading, experiment]
---

# QTF-021 — Agentic Finance Architecture Edge Experiment

## Hypothesis

A bounded, observable multi-stage research workflow can improve **decision quality and operational reliability** relative to a single-pass idea generator, even if it does not improve raw prediction accuracy. Any trading edge must be demonstrated after costs, out-of-sample testing and paper execution.

## Architecture to test

```text
Data Perception → Reasoning/Challenge → Decision Object → Risk/Execution Control → Paper Outcome → Review Board
```

### Desk roles

1. **Perception desk** — collects market, macro, news, funding, on-chain and vault evidence with timestamps and provenance.
2. **Thesis desk** — converts evidence into a precise hypothesis and candidate setup.
3. **Challenge desk** — independently attacks the thesis, searches for contradictions and identifies missing variables.
4. **Quant/risk desk** — specifies benchmark, costs, sizing, drawdown limits, regime conditions and reject rules.
5. **Paper execution desk** — records conservative next-bar/paper fills and unresolved outcomes.
6. **Review board** — decides reject, revise, incubate or promote to the next safe stage.

## Decision-object contract

Every candidate must produce a machine-readable and human-readable object containing:

- `candidate_id`
- `source_provenance`
- `market` and `timeframe`
- `thesis`
- `exact_entry_rules`
- `exact_exit_rules`
- `benchmark`
- `fees_and_slippage`
- `position_size_and_max_loss`
- `regime_assumption`
- `evidence_timestamp`
- `challenge_findings`
- `decision`
- `paper_ledger_path`
- `promotion_gate`
- `failure_conditions`

## New monitors suggested by the paper

### 1. Agent disagreement / heterogeneity monitor

Track independent analyst outputs before consensus. Measure:

- thesis agreement rate
- direction agreement rate
- rule agreement rate
- evidence-overlap rate
- model/vendor overlap
- disagreement resolved by new evidence vs forced consensus

**Interpretation:** high agreement is not automatically positive. High agreement with high evidence/vendor overlap may indicate coupling and crowding.

### 2. Execution-coupling monitor

For paper candidates, measure whether different strategies trigger at the same time, in the same direction, on the same asset or correlated assets. Flag:

- same-bar clustering
- same-direction exposure
- common news trigger
- common model/vendor dependency
- aggregate paper drawdown under clustered signals

### 3. Infrastructure concentration register

Record dependencies on:

- model/provider
- market-data provider
- news/search provider
- exchange/public API
- code/runtime environment

Define a degraded mode: if a critical source is stale, unavailable or materially changed, produce `watch-only` rather than a trade candidate.

### 4. Supervisory observability score

Score each candidate from 0–5 for:

- source traceability
- exact-rule completeness
- data freshness
- reproducibility
- risk-gate visibility
- paper-fill auditability
- human veto availability

Any candidate below the minimum threshold remains reject/revise, regardless of forecast appeal.

## Experiment design

### Baseline A — current single-pass workflow

Use the existing morning brief output with current evidence gates and paper ledger.

### Challenger B — staged architecture

Run the same candidate universe through independent perception, thesis, challenge and risk desks before paper entry.

### Controlled comparison

- Same markets, timeframe and data cut-off
- Same fees/slippage and paper-fill rules
- Same starting capital and risk budget
- Same paper holding horizon
- One architectural variable changed: staged challenge/control layer
- No live orders, wallet access or exchange credentials

## Metrics

### Process metrics

- time from source to decision object
- percentage of candidates with complete rules
- missing-data rate
- challenge reversal rate
- unsupported-claim rate
- audit completeness
- human review time

### Trading/research metrics

- paper expectancy after costs
- hit rate and profit factor
- max drawdown
- exposure concentration
- trade count
- benchmark-relative return
- regime-specific performance
- out-of-sample and walk-forward stability
- signal-correlation/coupling score

### Promotion gates

1. No promotion from conceptual framework alone.
2. Minimum valid sample and saved raw evidence.
3. Out-of-sample and walk-forward checks.
4. Jitter/perturbation or parameter-stability check where parameters exist.
5. Independent review-board sign-off.
6. Paper-forward monitoring before any consideration of constrained live scope.

## Expected edge types

| Edge type | What could improve | How to prove it |
|---|---|---|
| Information edge | Better source coverage/provenance and earlier synthesis | Timestamped event study and ablation |
| Reasoning edge | Fewer unsupported or incomplete ideas | Blind challenge/reversal and rule-completeness metrics |
| Risk edge | Lower drawdown and exposure concentration | Matched paper comparison |
| Execution edge | Fewer bad fills and stale signals | Conservative paper-fill replay |
| Operational edge | Faster, more repeatable research | Process metrics without sacrificing auditability |

## Initial decision

**Queue for paper-only implementation.** This is an architecture/control experiment, not a new trading strategy and not evidence of alpha. Start by adding the decision-object fields and coupling/observability fields to the existing morning-brief next-step queue. Do not introduce a new autonomous execution layer.

## Rejection conditions

- No measurable improvement over the single-pass baseline.
- More coordination cost without better evidence quality or risk outcomes.
- Higher agreement caused only by shared model/data dependence.
- Paper performance depends on hindsight, unavailable data or optimistic fills.
- Architecture increases autonomy without a matching increase in observability and control.
