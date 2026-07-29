---
title: CASHCAT Funding Persistence Evidence Review - 2026-07-14
created: 2026-07-14
updated: 2026-07-14
type: project
tags: [research, quant, funding, carry, cashcat, paper-only]
sources: [05_Projects/AI Quant Trading Floor/Implementation/data_cache/hyperliquid_funding_snapshots.jsonl, 05_Projects/AI Quant Trading Floor/Implementation/alt_research_lab.py, 05_Projects/AI Quant Trading Floor/Research/QTF Evidence Queue - CASHCAT and QTF-024 - 2026-07-14.md]
confidence: medium
---

# Decision

**48+ observation gate: passed for a descriptive persistence screen.** The local public-data cache contains 83 CASHCAT records. After UTC-hour alignment and keeping the last record in each hour, there are **76 consecutive hourly observations** from 2026-07-11 05:00 UTC through 2026-07-14 08:00 UTC, with no missing hourly bins.

This is **not** evidence of a tradeable carry/fade edge. The result remains descriptive and paper-only. The sample is a short, single-venue episode and includes only recorder snapshots, not executed funding payments, costs, borrow availability, liquidation outcomes, or a preregistered forward-return test.

## Evidence inventory

| Item | Finding |
|---|---|
| Candidate | CASHCAT perpetual, identified in the Quant Floor morning briefs |
| Venue/source | Hyperliquid public market-data API; recorder code uses `https://api.hyperliquid.xyz/info` with `metaAndAssetCtxs` |
| Local evidence | `Implementation/data_cache/hyperliquid_funding_snapshots.jsonl` |
| Raw CASHCAT records | 83 |
| Exact duplicate timestamps | 0 |
| Canonical UTC-hour records | 76 |
| Extra within-hour records | 7, concentrated in the 23:00 UTC bins on Jul 11–13 |
| Canonical time span | 2026-07-11 05:00 UTC to 2026-07-14 08:00 UTC |
| Hourly gaps | 0; maximum adjacent-bin gap is 1 hour |
| Fields available | funding hourly, annualized funding, mark, oracle, premium, open interest, day volume, leverage |
| Fields absent | historical executed funding payments, fees/slippage, borrow/short availability, liquidation/position outcomes, cross-venue comparator |

## Descriptive metrics

Metrics below use the **76-record canonical hourly series** (`funding_hourly`; one last observation per UTC hour). No values were imputed.

| Metric | Result |
|---|---:|
| Mean hourly funding | 0.0004444465 (0.04444%) |
| Median hourly funding | 0.0003953032 (0.03953%) |
| Sample standard deviation | 0.0004139854 |
| Minimum / maximum hourly funding | -0.0000101422 / 0.0017276995 |
| Mean annualized display | 389.34% |
| Median annualized display | 346.29% |
| Positive observations | 75/76 = 98.68% |
| Negative observations | 1/76 = 1.32% |
| Lag-1 Pearson autocorrelation | -0.0505 |
| Same-sign rate across adjacent hours | 73/75 = 97.33% |
| Cumulative sum of hourly funding rates | 0.0337779349 (not a realized P&L measure) |

The apparent sign persistence is almost entirely a consequence of the funding series being positive in 75 of 76 hours. The near-zero lag-1 level autocorrelation means the data do **not** establish persistence in the magnitude of the funding rate. The single negative observation is not enough to assess funding flips or a fade rule.

## Timestamp and missing-data handling

1. Parse timestamps as timezone-aware UTC.
2. Sort by timestamp.
3. Assign each record to its UTC hour (`floor` to the hour).
4. For the seven multi-record hours, retain the last timestamp in that hour; do not count multiple same-hour snapshots as independent hourly samples.
5. Check the resulting hourly index for gaps; none were found in this cache slice.
6. Do not fill missing funding values. There were no missing `funding_hourly` values among the 76 canonical records.

## Persistence definition used

Two descriptive definitions are reported:

- **Sign persistence:** share of adjacent canonical hours with the same funding sign.
- **Magnitude persistence:** lag-1 Pearson autocorrelation of the hourly funding-rate level.

These are diagnostics, not a strategy specification. A proper persistence/fade test still needs a preregistered signal threshold, holding horizon, entry/exit timing, payment convention, costs, and an out-of-sample outcome definition.

## Blockers to stronger inference

- The local cache covers only 76 consecutive hours, not a multi-week or multi-regime history.
- It records public snapshots, not the historical funding payments actually charged to a position.
- No forward mark/return series is joined to each funding observation, so no fade-versus-persistence outcome metric was calculated.
- No fees, slippage, borrow/short availability, liquidation distance, capacity or cross-venue basis controls are present.
- Recorder snapshots are not a vendor-archived historical series; continuity beyond the local window is not established.

## Free/public acquisition plan

1. **Funding history:** query Hyperliquid's public `info` endpoint with a `fundingHistory` request for `coin: CASHCAT`, bounded by explicit `startTime`/`endTime` windows; page/chunk requests as required by the endpoint and save the raw JSON response.
2. **Market outcomes:** query the same public API for candle/mark-price history (or retain hourly `metaAndAssetCtxs` snapshots) covering each funding timestamp plus the preregistered forward horizons.
3. **Replication:** save UTC-normalized raw JSON, request timestamps, endpoint/request body, response counts, and a checksum; reject duplicate or non-monotonic records and document any gaps rather than imputing them.
4. **Minimum research panel:** target at least 30 days of hourly funding observations (720 hourly points) and at least 48 independent signal episodes after applying the funding-extreme threshold. Split chronologically into development and holdout periods.
5. **Outcome test:** preregister persistence versus fade, e.g. next 1h/4h/8h mark return after funding-cost adjustment, with signal threshold, direction, fees/slippage and no-look-ahead timing fixed before calculation. Report episode count, hit rate, mean/median net outcome, volatility, drawdown and confidence intervals.
6. **Controls:** add BTC/ETH perp funding baselines and, where freely available, a second venue or spot/perp basis comparator. Keep all work read-only/paper-only; no credentials, orders or autonomous promotion.

## Reproducibility note

The snapshot schema and collection method are implemented in `Implementation/alt_research_lab.py` (`hyperliquid_record_snapshot`, lines 250–269). The review calculations were run directly against the local JSONL cache on 2026-07-14. The 83-row raw count and 76-row canonical count are therefore auditable from the named file, but should not be treated as a continuous historical archive.

## Gate outcome

- **Descriptive 48+ sample gate:** PASS (76 aligned hourly observations).
- **Persistence/fade claim:** NOT ESTABLISHED.
- **Promotion or trading decision:** BLOCKED; paper-only evidence collection continues.

Related: [[QTF Evidence Queue - CASHCAT and QTF-024 - 2026-07-14]], [[QTF Edge Measurement Toolkit - 2026-07-14]], [[QTF Edge-First Production Mandate]].
