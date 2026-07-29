---
title: QTF-003 Hidden Markov Regime Strategy
created: 2026-07-03
updated: 2026-07-03
type: quant-strategy
tags: [quant, trading, strategy, paper-trading]
sources: [https://youtu.be/Z-hU97WO30I, https://youtu.be/MbfuJZZ01IU]
confidence: medium
---

# QTF-003 Hidden Markov Regime Strategy

## Purpose

Replace arbitrary bull/bear/sideways thresholds with inferred latent market regimes.

## Hypothesis

Hidden market states inferred from return and volatility features produce more robust regime labels than fixed 20-day return thresholds.

## Features

Use only past-known data:

- Log return
- Rolling volatility
- Rolling trend strength / slope
- ATR percentage
- Volume z-score where available
- Distance from moving average

## Model

Fit a 3-state Hidden Markov Model or equivalent clustering model on a training window.

Label inferred states after fitting:

- Bull = highest forward/training-window mean return with acceptable volatility.
- Bear = lowest mean return / negative drift state.
- Sideways = low drift or high chop state.

## Walk-forward process

1. Train HMM on historical window.
2. Infer current state for next out-of-sample period.
3. Trade/filter using only inferred state.
4. Roll window forward and repeat.

## Strategy modes

- **Filter mode:** gate base strategies by inferred state.
- **Standalone mode:** trade long in Bull, short/flat in Bear depending instrument, flat in Sideways.

## Key checks

- Stability of state labels across windows.
- Performance by inferred state.
- Sensitivity to number of states.
- Whether HMM adds value over simple fixed-threshold Markov filter.

## Failure modes

- Regime labels flip meaning between training windows.
- Model overfits low-sample windows.
- State inference lags fast market changes.

## Self-improvement requirements

This strategy must be handled through [[Self-Improvement Protocol|AI Quant Trading Floor Self-Improvement Protocol]]. Every iteration must record:

- what was tested,
- what evidence was produced,
- what failed or improved,
- what reusable lesson was learned,
- what artifact should be updated,
- whether the strategy should be rejected, revised, forward-tested, or escalated for human review.

Do not promote this strategy without reproducible backtest evidence, walk-forward/out-of-sample validation, and paper-trading review where appropriate.

