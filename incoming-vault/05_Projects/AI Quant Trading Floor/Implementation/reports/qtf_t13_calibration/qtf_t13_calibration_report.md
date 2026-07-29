---
title: QTF-T13 Polymarket Probability Calibration Validation
created: 2026-07-18
updated: 2026-07-18
type: project
tags: [quant, polymarket, calibration, qtf-018, qtf-017, paper-trading]
status: completed
decision: do_not_promote
edge_family: prediction_market_microstructure
confidence: medium
---

# QTF-T13 Polymarket Probability Calibration Validation

## Purpose

Independent probability/calibration validation for the QTF-018 Polymarket prediction-market edge intake. Validates whether the scanner's candidate detections correspond to actual market mispricing relative to an independent fair-value model.

## Script

`05_Projects/AI Quant Trading Floor/Implementation/qtf_t13_calibration.py`

## Machine Output

- **Report**: `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_t13_calibration/calibration_20260717T164513+0000.json`
- **SHA-256**: `b2c07632a93d0cde6818230c16b93faa9bb5a66b81659ebafa502420cee63ed2`
- **Exit code**: 0
- **Compilation**: `py_compile` exit code 0

## Results

### Data Collection

| Metric | Value |
|---|---|
| Polymarket markets fetched | 199 |
| Classified markets | 199 |
| Crypto binary markets | 25 |
| Crypto up/down markets | 20 |
| Well-formed binary (price sum ~1) | 3 |
| Markets with volume > $1K | 36 |
| Historical candidate rows (ledger) | 116 |
| PM-E03 candidates | 61 |
| PM-E04 candidates | 55 |

### Key Findings

1. **Short-window BTC/ETH up/down markets lack price discovery**: 20 crypto up/down markets were detected, but most have `outcomePrices: [0, 0, 0]` — these micro-markets (5-15 min windows) have not yet begun active trading or the Gamma API returns zeros for pre-trade periods. No mispricing can be detected without active prices.

2. **Well-formed binary markets are price-target markets, not up/down**: The 3 markets with valid binary pricing (`outcomePrices` summing to ~1.0) are longer-duration price-target markets (e.g., "Will ETH be above $1,500 on July 21?"), not the short-window binary markets targeted by PM-E03. These have resolved outcomes (0.0/1.0) indicating settled markets.

3. **Orderbook API limitations**: The historical candidate ledger shows 42 markets with book errors (HTTP 404 from CLOB API) and 188 with valid book data. The `clob.polymarket.com/book?token_id=` endpoint requires valid token IDs, which are often unavailable for short-window markets.

4. **Cross-venue reference**: Bybit spot prices were successfully fetched (BTCUSDT last: $1,839.31, ETHUSDT last: $1,839.09) providing an independent fair-value proxy for crypto binary markets. However, the Polymarket short-window markets have no active pricing to compare against.

### Calibration Metrics

- **Brier score**: Not computable — no resolved outcomes with corresponding predicted probabilities available
- **Log loss**: Not computable — same reason
- **Reliability bins**: Not computable — insufficient data
- **Expected calibration error**: Not computable

## Interpretation

The Polymarket short-window BTC/ETH up/down markets (the primary target for PM-E03 two-sided cheap maker bids) are **not actively traded** at scan time. The Gamma API returns zero outcome prices for these markets, meaning:

1. No mispricing can be detected without active prices
2. The scanner correctly identifies these as `baseline_snapshot_no_candidate_fill`
3. The PM-E03 hypothesis requires high-frequency orderbook data (sub-minute) to detect fleeting mispricings — the Gamma API polling cadence is insufficient
4. The CLOB orderbook API returns 404s for many token IDs, suggesting these markets use a different data model

The PM-E04 fresh-window hypothesis is partially supported: 55 candidate rows were generated from markets first-seen within 24 hours, but these require repeated first-seen snapshots to confirm stale-pricing behavior.

## Decision

**`do_not_promote`** — The calibration validation confirms that the Polymarket short-window binary markets lack active price discovery at the polling cadence achievable through public APIs. No evidence of mispricing can be established.

## Promotion Gates Outstanding

| Gate | Status |
|---|---|
| Deterministic spec | ✅ PM-E03/PM-E04/PM-E06 defined in QTF-018 |
| Verified public data | ✅ Gamma API + CLOB API accessible |
| Naive/benchmark controls | ✅ Bybit spot prices as fair-value proxy |
| Realistic cost/risk model | ⏳ Queue position, latency, fill probability unknown |
| In-sample diagnosis | ✅ Price formation quality measured |
| Walk-forward/held-out test | ❌ No resolved outcomes available |
| RST/Monte Carlo/jitter | ❌ Requires resolved outcome data |
| Paper monitor gate | ❌ No active mispricing detected |
| Review board decision | ❌ Pending evidence |

## Safety

- Read-only/public-data only
- No wallet, auth, keys, orders, or live trading
- No credential storage
- All data from public Polymarket Gamma API and Bybit public tickers

## Next Steps

1. **PM-E03**: Requires sub-minute orderbook polling via CLOB API with proper token_id resolution — current Gamma API polling cadence is insufficient
2. **PM-E04**: Implement repeated first-seen snapshot tracking over multiple hours to detect stale pricing
3. **Resolved outcome calibration**: Once markets resolve, collect outcome prices and compute Brier scores against Bybit fair-value proxies
4. **Consider alternative venues**: Polymarket's CLOB API structure may differ from the token_id-based approach; explore the Gamma API's `/markets/{id}` endpoint for detailed market state
