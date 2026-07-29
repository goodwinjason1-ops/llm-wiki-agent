---
title: SPY Initial Backtest Evidence - AI Quant Trading Floor
created: 2026-07-03
updated: 2026-07-03
type: backtest-evidence
tags: [quant, trading, backtest, spy, evidence]
sources: [https://youtu.be/Z-hU97WO30I, https://youtu.be/MbfuJZZ01IU]
confidence: high
---

# SPY Initial Backtest Evidence - AI Quant Trading Floor

## Purpose

First smoke test of the runnable scaffold at [[quant_floor_backtest.py]] for the reconstructed strategy specs.

## Command

```bash
python "C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/AI Quant Trading Floor/Scripts/quant_floor_backtest.py" --symbol SPY --fee-bps 1.0
```

## Output

```text
Stooq fetch failed for SPY: Not enough rows for SPY; got 0; trying Yahoo fallback
Symbol: SPY
Rows: 8413  Range: 1993-01-29 -> 2026-07-02
Fee assumption: 1.0 bps per unit turnover

Buy & hold benchmark
--------------------
Total return:  2990.81%
CAGR:            10.83%
Max drawdown:   -55.19%
Sharpe:           0.65
Exposure:       100.00%
Trades:              1

QTF-002 Markov standalone
-------------------------
Total return:   -84.81%
CAGR:            -5.49%
Max drawdown:   -86.27%
Sharpe:          -0.39
Exposure:        20.48%
Trades:            879

QTF-005 RSI/MACD no regime
--------------------------
Total return:    79.86%
CAGR:             1.77%
Max drawdown:   -37.08%
Sharpe:           0.20
Exposure:        53.81%
Trades:            737

QTF-005 RSI/MACD + Markov filter
--------------------------------
Total return:   -36.64%
CAGR:            -1.36%
Max drawdown:   -47.76%
Sharpe:          -0.07
Exposure:        12.48%
Trades:            516

Research notes:
- Signals are shifted by one bar in the backtest to reduce lookahead bias.
- This scaffold is intentionally simple and must not be used for live trading.
- Next step: add walk-forward optimization and out-of-sample reports.
```

## Interpretation

The initial reconstructed strategies do **not** beat buy-and-hold on SPY. This is a useful rejection signal, not a failure of the workflow.

Immediate lessons:

- The naive fixed-threshold Markov standalone strategy is not acceptable as-is.
- The RSI/MACD baseline needs major improvement before promotion.
- The Markov filter worsened this baseline on SPY, so it should not be assumed useful without market/timeframe-specific validation.
- Next iteration should add walk-forward optimization, improved state definitions, and more markets/timeframes.

## Decision

Status: **revise / research only**.

No live trading. Do not promote these baselines without better out-of-sample evidence.
