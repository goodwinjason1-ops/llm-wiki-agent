---
title: QTF Edge Measurement Toolkit - 2026-07-14
created: 2026-07-14
updated: 2026-07-14
type: workflow
status: active-draft-awaiting-capture-examples
confidence: medium
---

# Purpose

Use the most appropriate diagnostics for each edge. No single metric, including a pairs Z-score, is sufficient to establish profitability.

# Measurement map

| Edge | Primary tools | Required robustness checks |
|---|---|---|
| Trend following | ADX/trend-strength, moving-average slope, breakout/Donchian percentile, Hurst/efficiency ratio, time-series momentum | trend/chop regime split, volatility targeting, walk-forward, delayed execution, crash and whipsaw analysis |
| Cross-sectional momentum | ranked multi-horizon returns, residual momentum, breadth, relative strength, turnover-weighted ranking | rank stability, sector/market-beta neutralisation, top-N sensitivity, rebalance cost, capacity, unseen assets |
| Carry/funding | funding z-score, basis annualisation, carry-to-volatility, term/basis curve, funding persistence/autocorrelation | funding sign flips, liquidation distance, borrow/financing cost, stress episodes, capacity and fill assumptions |
| Mean reversion | rolling Z-score, Bollinger/ATR distance, percentile rank, half-life, Hurst, variance-ratio test | trend-strength quarantine, stop-loss asymmetry, holding-time decay, cost break-even, regime-conditioned expectancy |
| Pairs/relative value | log-spread Z-score, rolling hedge ratio, Engle-Granger/Johansen cointegration, Kalman filter beta, residual half-life, OU fit | parameter stability, structural-break tests, beta drift, multiple pair selection, borrow/funding, two-leg slippage, out-of-sample spread behaviour |
| Liquidation/forced flow | liquidation imbalance, OI shock percentile, funding/OI divergence, volume delta, signed flow, event-window returns | timestamp alignment, continuation vs reversal classification, horizon decay, false positives, exchange coverage, latency and impact |
| Market making | quoted spread, realised spread, adverse-selection rate, fill probability, queue position, inventory PnL, markout | partial fills, queue/latency simulation, inventory limits, volatility halts, fee/rebate changes, capacity and kill switch |
| ETF/tactical allocation | multi-horizon momentum, trend/regime score, volatility percentile, correlation matrix, drawdown and risk-parity weights | cash/buy-hold/equal-weight controls, rebalance cost, turnover, crisis windows, parameter jitter, portfolio concentration |
| Event/catalyst | event study, abnormal return, pre/post volume and volatility, gap/reversion profile | timestamp integrity, leakage controls, event clustering, conditional outcomes, false discovery correction |

# Common evidence layer

Every edge must also report:

- expectancy per trade and per unit of risk;
- win rate, payoff ratio and profit factor;
- Sharpe/Sortino and maximum drawdown;
- drawdown duration and recovery time;
- exposure, turnover and capacity estimate;
- fee, spread, slippage, funding and financing assumptions;
- benchmark comparison;
- walk-forward and held-out performance;
- Monte Carlo path risk;
- Rule Significance Test and multiple-testing/DSR review;
- sensitivity to parameter jitter and start/end dates;
- failure modes and kill conditions.

# Pairs-specific minimum

A Z-score is an entry/normalisation tool, not proof of a tradeable relationship. A pair must additionally show stable economic rationale, hedge-ratio stability, residual half-life, post-cost expectancy, structural-break resilience and paper-forward behaviour.

# Provisional top-three edge families

Until current external research access is restored and the user's captures are reviewed, treat this as a provisional shortlist rather than a live ranking:

1. **Trend/time-series and cross-sectional momentum** — broadly used because it is simple, scalable and testable across ETFs, futures and crypto; the key risk is regime whipsaw and crowding.
2. **Carry/funding/basis** — widely used across futures, FX, rates and crypto; the key risk is leverage, funding reversal, liquidity and crash exposure.
3. **Relative value/statistical arbitrage/mean reversion** — includes pairs and residual trades; the key risk is structural break, crowded convergence and costs.

Forced-flow/liquidation and market making are important crypto-specific extensions, but their data quality and execution requirements mean they should be ranked by measured evidence rather than assumed to be top-three universally.

# Decision rule

The “best” edge at any time is the candidate with the strongest validated risk-adjusted opportunity after costs and capacity, not the edge family with the best historical reputation.
