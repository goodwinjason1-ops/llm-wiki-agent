---
title: QTF-006 Strategy Factory Optimizer
created: 2026-07-03
updated: 2026-07-03
type: quant-strategy
tags: [quant, trading, strategy, paper-trading]
sources: [https://youtu.be/Z-hU97WO30I, https://youtu.be/MbfuJZZ01IU]
confidence: medium
---

# QTF-006 Strategy Factory Optimizer

## Purpose

Clean and improve imported Strategy Factory / Trader Dev strategies without overfitting.

## Hypothesis

Existing strategies can be improved by systematic parameter tuning, regime filtering, and risk normalization, but only if optimization is walk-forward and penalizes complexity.

## Intake checklist

For each imported strategy, capture:

- Strategy name/source
- Market/timeframe
- Entry rules
- Exit rules
- Indicators and parameters
- Risk model
- Fees/slippage assumptions
- Original backtest metrics
- Known weaknesses

## Optimization process

1. Reproduce original backtest.
2. Add fees/slippage.
3. Split data into train/test/walk-forward windows.
4. Tune only a small number of parameters at once.
5. Penalize parameter sets with low trade counts or unstable performance.
6. Compare against baseline buy-and-hold and simple trend filters.
7. Add [[QTF-001 Markov Regime Filter]] only after baseline is reproduced.

## Anti-overfit rules

- Do not choose parameters solely by highest net profit.
- Prefer smoother equity curve and robustness across markets.
- Reject strategies that only work on one narrow historical period.
- Keep parameter values interpretable.

## Outputs

- Cleaned strategy spec
- Backtest report
- Walk-forward report
- Decision: promote, revise, archive

## Self-improvement requirements

This strategy must be handled through [[Self-Improvement Protocol|AI Quant Trading Floor Self-Improvement Protocol]]. Every iteration must record:

- what was tested,
- what evidence was produced,
- what failed or improved,
- what reusable lesson was learned,
- what artifact should be updated,
- whether the strategy should be rejected, revised, forward-tested, or escalated for human review.

Do not promote this strategy without reproducible backtest evidence, walk-forward/out-of-sample validation, and paper-trading review where appropriate.

