---
title: Pairs Trading Caps 1 to 9 - Consolidated Quant Floor Review
created: 2026-07-14
updated: 2026-07-14
status: reviewed
risk_mode: paper-only
---

# Executive decision

No source demonstrates a production-ready pairs edge. The batch is useful as a design and screening package.

Recommended architecture:

```text
liquid universe filter
→ point-in-time clustering/candidate generation
→ rolling hedge ratio
→ cointegration/stability tests
→ residual spread and Z-score
→ half-life and holding-period filter
→ funding/fees/slippage/borrow/legging costs
→ walk-forward and unseen-data validation
→ Monte Carlo/RST/multiple-testing controls
→ paper-forward monitoring
```

## Cap decisions

| Cap | Decision | Transferable value | Main rejection reason |
|---|---|---|---|
| 1 Alpaca BTC/COIN | Adapt | Synchronized multi-asset data and paper-execution plumbing | Short 2021 sample, inconsistent spread implementation, no hedge ratio/costs/cointegration |
| 2 YouTube ETH/ETC | Adapt methodology; reject demonstrated configuration | Rolling spread/Z-score, beta sizing, point-in-time candles, cointegration health check | Fee-disabled result reported 69%/5% drawdown, but realistic fees reduced $10,000 to about $343 with roughly $11,000 fees; extreme turnover |
| 3 ML clustering paper | Adapt as candidate filter | Clustering before within-cluster cointegration testing | No executable signal/PnL/costs; likely in-sample selection and no multiple-testing control |
| 4 CMC Markets | Adapt | Correlation-versus-cointegration distinction, structural-break warning, ratio/Z-score framing | Educational only; no quantified evidence or costs |
| 5 Gate Learn | Adapt, not direct adopt | Screening → cointegration → ADF → mean-reversion diagnostics | Daily Yahoo data and examples omit funding, execution, out-of-sample and cost modelling |
| 6 ForTraders | Use as universe/risk filter | Liquidity, instrument availability, drawdown discipline and daily loss controls | No pairs signal, hedge ratio or relative-value evidence |
| 7 Macroaxis | Blocked/watchlist | Possible discovery interface if methodology becomes transparent | HTTP 403; formula, lookback, inputs and export/API cannot be verified |
| 8 BitInfoCharts | Secondary only | Recent descriptive cross-check and factor-hypothesis source | Three-month multi-factor aggregate is not return correlation; unknown samples/uncertainty and missing-data treatment |
| 9 Free collection video | Adapt process only | Recency windows, multi-source collection, CLI/public pages, provenance and scheduled snapshots | Paid/API claims unverified; unofficial scrapers, cookies and popularity signals carry compliance and data-quality risks |

# Quant Floor implementation decisions

1. Correlation sources can generate candidates, but cannot establish a trade.
2. Use log returns for price correlation and explicit transformations for on-chain levels.
3. Use 30/90/180-day rolling measures and stability diagnostics rather than one fixed correlation.
4. Use rolling beta and residual spreads rather than raw price differences.
5. Do not use a single full-period standard deviation as a permanent threshold.
6. Include funding, borrow, fees, spread, slippage, market impact, latency, partial fills and liquidation buffers.
7. Freeze clustering/pair selection at each historical timestamp to prevent look-ahead.
8. Apply multiple-testing controls to broad pair searches.
9. Use portfolio-level drawdown and correlated-selloff limits.
10. Keep all conclusions paper-only until unseen-data and paper-forward gates pass.

# Sources

Caps 1–9 are recorded in [[Capture Queue - Pairs Trading Batch 1 to 5 - 2026-07-14]].
