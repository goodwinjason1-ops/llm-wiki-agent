---
title: QTF Morin Process Alpha Extraction and Validation Plan - 2026-07-13
created: 2026-07-13
updated: 2026-07-13
type: validation-plan
status: queued-paper-only
sources:
  - [[Morin Performance Review Dashboard and First AI Trading Workflow - Source Review - 2026-07-13]]
  - [[QTF Performance Review and Process Learning Dashboard Contract - 2026-07-13]]
  - [[Robot James Method Library - Caps 1 to 9]]
---

# QTF process-improvement and alpha-extraction plan

This plan tests whether structured review information can help us extract more from existing strategy alpha by improving selection, execution, risk and feedback loops. It does not assume the source creates new market alpha.

# Alpha classification

## A. Process alpha — highest-confidence candidate

Hypothesis: fixed pre-trade questions, explicit “Why?” fields, lifecycle tags and post-trade review reduce avoidable execution and closure errors.

Candidate measures:

- planned-versus-observed adherence;
- late entries and unplanned exits;
- stop/target amendments;
- profit round-trips;
- over-risking by setup tier;
- missed checklist items;
- closure-phase errors;
- realised R after fees, spread, slippage and funding assumptions.

This is not automatically market alpha. It is an execution/process improvement hypothesis.

## B. Conditional setup alpha — testable but unproven

Hypothesis: setup performance differs materially by market context, lifecycle execution pattern, confluence, macro-event proximity and liquidity/flow conditions.

Candidate dimensions:

- weekly and daily bias;
- ranging versus trending regime;
- pro-trend versus counter-trend;
- setup/playbook version;
- execution-pattern tag;
- key-level location;
- macro-event veto status;
- volume/funding/liquidation context;
- Robot James forced-flow versus informed-repricing versus model-error classification.

Only retain a dimension if it improves held-out net performance or materially reduces drawdown with adequate sample size.

## C. Market-entry alpha — low-confidence / unverified

Morin references mean reversion, range extremes, TPO/composites, divergences, EMAs and key levels. These are inputs or confluences, not proven standalone edge. Each must be specified as a separate hypothesis and tested against simple baselines.

# Positives

- Strong rejection of “AI will make an unprofitable trader profitable.”
- Correct emphasis on explicit market context and rules.
- Separates trading playbooks from execution playbooks.
- “Why?” fields expose random or post-hoc reasoning.
- Lifecycle tags can show where losses or errors originate.
- Improvement plans can be compared with later observed behaviour.
- Fixed schemas make review data comparable over time.
- Fits the Quant Floor’s human-supervised, paper-only architecture.

# Negatives and failure modes

- Repeated tags can reflect the tagging system, not reality.
- Self-reported emotions and explanations are noisy and hindsight-biased.
- A setup scorecard can become a multiple-testing/selection machine.
- “Best versus worst” rankings are unstable with small samples.
- AI can hallucinate patterns or convert correlation into a causal story.
- A dashboard can optimise process theatre rather than actual expectancy.
- Context labels such as “trend” or “range” need deterministic definitions.
- TPO, confluence and key-level inputs can become discretionary hindsight features.
- Persistent memory without versioning can silently rewrite the research record.

# Validation design

## Phase 0 — schema and baseline

- Freeze the tag dictionary and definitions before evaluation.
- Record at least 50 paper events under the current process where feasible.
- Preserve the raw event ledger and all amendments.
- Define fees, spread, slippage and funding assumptions in advance.

## Phase 1 — structured workflow comparison

Compare the existing process with the Morin-style structured workflow in sequential, pre-registered blocks rather than cherry-picking favourable trades.

Primary measures:

- net expectancy in R after costs;
- drawdown and loss clustering;
- checklist adherence;
- planned-versus-observed deviation rate;
- closure mistakes and round-trips;
- risk-limit violations;
- time spent per review.

A positive result requires improvement in net outcomes or materially lower process-error cost without unacceptable review burden.

## Phase 2 — conditional setup analysis

- Split by setup, regime, execution pattern and event-risk status.
- Require minimum sample counts before ranking.
- Use confidence intervals or bootstrap intervals for performance estimates.
- Freeze the candidate rule before the held-out test.
- Test across symbols, timeframes and regimes where relevant.

## Phase 3 — paper promotion review

A process change may be promoted only when:

- the change is versioned;
- supporting records are linked;
- alternative explanations are recorded;
- held-out or walk-forward results are positive or clearly risk-reducing;
- no repeated re-optimisation has occurred;
- the review board accepts the remaining uncertainty.

# Implementation sequence

1. Freeze event schema and tag dictionary.
2. Create append-only paper ledger and amendment model.
3. Add deterministic weekly/monthly review templates.
4. Add streaks and scorecards with sample counts and uncertainty.
5. Add planned-versus-observed contradiction report.
6. Add read-only AI analysis that quotes source records and states alternatives.
7. Run baseline versus structured-process paper blocks.
8. Evaluate only pre-registered process changes.
9. Connect TradingView paper alerts only after the local ledger is validated.

# Profit pathway

The defensible pathway is:

```text
consistent capture
→ identify avoidable process loss
→ test one bounded change
→ measure net result after costs
→ retain only held-out improvements
→ repeat slowly
```

No source supports a claim that this workflow itself produces profitable trades. Profitability must come from tested improvements in strategy selection, execution quality, cost control or risk management.
