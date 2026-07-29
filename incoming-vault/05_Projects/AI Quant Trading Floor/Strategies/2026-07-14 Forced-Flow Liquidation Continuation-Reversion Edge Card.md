---
title: 2026-07-14 Forced-Flow Liquidation Continuation-Reversion Edge Card
created: 2026-07-14
updated: 2026-07-14
type: strategy-claim-card
status: data-source-blocked-after-public-capability-probe
edge_family: forced-flow-and-liquidation-response
tags: [quant, crypto, liquidation, forced-flow, continuation, mean-reversion, paper-only]
sources:
  - ../Research/Capture Queue - MoonDev Claude Trading X 2076728365340377455 - 2026-07-14.md
  - ../Research/QTF Edge-First Production Mandate.md
  - ../Implementation/statistical_gates/gate_runner.py
  - ../Implementation/statistical_gates/monte_carlo.py
confidence: medium
---

# Forced-flow liquidation edge card

## Scope and safety

Paper-only, read-only public-data research. No exchange credentials, wallet access, order placement, leverage, or autonomous promotion. MoonDev's claim is the source of a hypothesis only; no performance claim is accepted.

## Exact measurable hypothesis

**Primary continuation hypothesis (FF-LIQ-C-01):** For a symbol/time bucket, when signed liquidation pressure is an extreme event and open interest falls concurrently, the next 5-minute, 30-minute, and 120-minute mid-price return has the same sign as forced pressure more often and with greater net expectancy than matched non-event controls.

For event time `t`, define `P_t = short_liq_notional_t - long_liq_notional_t` (positive means forced buying from short liquidations; negative means forced selling from long liquidations). Define `r_h = log(mid_{t+h}/mid_t)`. The primary forecast is `sign(r_h) = sign(P_t)` and the primary effect is `mean(sign(P_t) * r_h)` after costs.

**Secondary reversion hypothesis (FF-LIQ-R-01):** If continuation fails, an extreme event followed by a price move whose magnitude exceeds the event-window shock predicts reversion over 30m/120m. This is a separately labelled secondary test, not a reason to flip the primary rule after seeing results.

Pre-register both arms and all horizons before reading outcomes. Report effect size, bootstrap confidence interval, hit rate, net expectancy, and number of independent events; do not select the best horizon after the fact.

## Universe, clock, and minimum public data

Initial universe: BTCUSDT, ETHUSDT and SOLUSDT perpetuals on one public venue with a documented liquidation feed and public trades/order-book or mark-price feed. UTC only; store source timestamps and local receipt timestamps. Start with 1-minute buckets; do not mix venues in the first test.

Minimum event row fields (immutable raw JSONL plus normalized Parquet/CSV):

`source, venue, symbol, event_ts_utc, received_ts_utc, event_id_or_source_seq, liquidated_side, liquidation_price, liquidation_qty, liquidation_notional_usd, mark_price, index_price, best_bid, best_ask, last_price, open_interest, funding_rate, volume_1m, trade_count_1m`.

Derived fields must be written, not silently recomputed: `bucket_ts, long_liq_notional, short_liq_notional, signed_pressure, total_liq_notional, oi_change_1m, return_1m, spread_bps, data_latency_ms, source_gap_flag, event_id_duplicate_flag`.

For every snapshot save request/collection time, endpoint/feed name, symbol, timezone, row count, gap count, and SHA-256. Preserve missing values as null; never forward-fill liquidation, OI, bid/ask, or prices.

## Event detection rules

1. Aggregate liquidation messages into UTC 1-minute buckets by symbol. Use liquidation side as supplied by the venue; do not infer it from candle direction. De-duplicate on venue event ID/sequence, otherwise on `(symbol,event_ts,side,price,qty)`.
2. Compute `P_t` and `L_t = long_liq_notional + short_liq_notional` at bucket close. Require valid bid/ask or mark price at `t`; otherwise discard the bucket and flag a data gap.
3. Build rolling baselines using only buckets strictly before `t`: `median_L_7d`, `MAD_L_7d`, `median_abs_P_7d`, and `median_oi_7d`. Require at least 7 complete days before events qualify.
4. A primary event is `L_t >= median_L_7d + 8*MAD_L_7d` OR `L_t >= rolling_95th_percentile(L, 7d)`, **and** `abs(P_t) >= rolling_90th_percentile(abs(P), 7d)`, **and** `abs(oi_change_1m) / median_oi_7d >= 0.25%`.
5. Set `event_sign = sign(P_t)`. If `P_t == 0`, the bucket is diagnostic only and cannot enter either trading label.
6. Cluster adjacent qualifying buckets for the same symbol within 5 minutes into one event. Event time is the first qualifying bucket; event notional and pressure are summed. Suppress a new event for 30 minutes after the cluster start.
7. The signal is observable only after bucket close plus the recorded feed latency. Enter at the next available 1-minute bar mid/ask/bid convention; never use the event bucket close as an executable fill.

Sensitivity is limited to the pre-registered threshold grid `{6,8,10}*MAD` and `{0.20%,0.25%,0.35%} OI`; no additional grid search is allowed without a new experiment ID and multiple-testing correction.

## Labels and paper trade construction

For each event, `p0` is the mid-price at the first fully observed post-event minute; `p_h` is the mid at `h` minutes after `p0`, with `h ∈ {5,30,120}`. Exclude observations with missing prices, a feed gap, or overlapping event hold windows. One event may produce one label per horizon, but horizons must not be pooled as independent trades.

- Continuation label: `C_h = 1` when `sign(P_t)*log(p_h/p0) > 0`; else `0`.
- Reversion label: `R_h = 1` when `sign(P_t)*log(p_h/p0) < 0`; else `0`.
- Economic return: `gross_h = sign(P_t)*log(p_h/p0)` for continuation; use its negative for the separately specified reversion arm.
- Trade entry: one unit of risk-scaled notional in the predicted direction at `p0` under the fixed next-minute fill convention. Exit at `p_h`; no stop/target optimization in the first run.

Report event-level and symbol-level clustered uncertainty. A 5m/30m/120m family is one hypothesis family for multiple-testing accounting.

## Costs, risk, and controls

Base cost is 20 bps round trip: 5 bps fee + 5 bps adverse slippage per side. Sensitivity is 10/20/40/60 bps round trip. Also report spread-crossing cost from recorded bid/ask, and a conservative latency penalty equal to the worst observed p95 mid move between event close and fill. Funding is recorded and charged when the holding period crosses a funding timestamp; it is zero only when the data proves no crossing.

Use fixed 10 bps of paper risk per event, no leverage, one concurrent position per symbol, and cap aggregate simultaneous exposure at 30% notional. These are accounting controls, not a live-trading recommendation. Report gross and net results, turnover, exposure, max drawdown, drawdown duration, win rate, payoff ratio, profit factor, expectancy, and capacity proxy.

Controls: cash/no-trade; price-shock-only (same return shock but no liquidation feature); OI-shock-only; volume-shock-only; unsigned liquidation volume; random timestamps matched by symbol/hour/volatility decile; sign-flipped placebo; and BTC/ETH/SOL symbol-level comparison. A forced-flow claim must beat the relevant price/OI/volume control after costs, not merely have a positive unconditional return.

## Out-of-sample and contamination design

Freeze raw files and hashes before fitting thresholds. Use chronological folds: 60% train, 20% validation, 20% untouched final holdout, plus at least four rolling walk-forward folds within the pre-holdout period. Thresholds are selected on train only, chosen on validation, then frozen for the final holdout. The holdout is opened once for the final report.

Minimum evidence: 1,000 complete pre-event days if available, 500 qualifying clustered events overall, at least 100 events per pressure sign, and at least 75 non-overlapping events per walk-forward fold. If the public feed cannot supply these counts, label the result `data-insufficient`, not positive.

Stratify results by symbol, hour/session, volatility tercile, OI-change tercile, liquidation-size tercile, and broad trend sign. Require no single symbol or two-week episode to supply more than 40% of the claimed net expectancy. Use block bootstrap by day (not iid event bootstrap) for confidence intervals.

## Statistical gates and promotion status

All gates run on net event returns using the predeclared fill and cost model, before optimization or paper alerts:

- **RST:** use `statistical_gates.gate_runner.run_rule_significance_test` with the deterministic event strategy and aligned 1-minute data; run at least 2,000 random-entry/sign-preserving simulations. Pass only if one-sided `p < 0.05`, event count minimums are met, and the candidate beats matched controls. `run_all_gates_from_trades` is only a t-test approximation and cannot alone produce PAPERSAFE.
- **Monte Carlo:** shuffle the realized event-return sequence at least 200 times and save median/5th/95th percentile paths, Sharpe, total return and drawdown. Pass only if the original net Sharpe is positive, is not more than 30% above the shuffled median (anti-overfit check), and the existing runner reports `robust_strategy=True` (50th–75th percentile robustness band). Record any discrepancy between the runner's percentile rule and the 30% rule.
- **Jitter/multiple testing:** all threshold/horizon variants must retain the sign of net expectancy in >=70% of pre-registered variants; report family-wise correction or Deflated Sharpe Ratio. No promotion on an uncorrected best cell.
- **Holdout:** final-holdout net expectancy > 0, 95% day-block CI excludes zero, positive net expectancy in >=3/4 folds, and no holdout fold worse than -15% risk-scaled return.
- **Paper gate:** only after every gate passes, emit zero-side-effect paper alerts for 30 calendar days and compare predicted fills with the frozen next-minute convention. Statuses are `data-insufficient`, `research-reject`, `revise-one-variable`, `paper-incubation`, or `PAPERSAFE`; never `live-ready`.

## Process alpha versus market alpha

**Process alpha** is improvement in the research machine: faster complete-feed capture, lower timestamp latency, better de-duplication, fewer gaps, reproducible hashes, correct side semantics, lower simulated spread/slippage, and more reliable paper-fill measurement. It is valuable operational progress but is not evidence that liquidation flow predicts returns.

**Market alpha** is incremental, out-of-sample, net-of-cost predictive return from `P_t` versus the controls, with stable sign across symbols/regimes and surviving RST, Monte Carlo, jitter/multiple-testing, holdout, and paper-forward gates. Never combine process metrics (feed uptime, latency, event count) with P&L metrics in one alpha score.

## Kill, pause, and revise criteria

Kill the hypothesis (`do_not_promote`) if any of the following holds: liquidation side cannot be verified; timestamp ordering or de-duplication fails; event labels use future data; net expectancy is non-positive at 20 bps or becomes negative at 40 bps; RST p-value is >=0.05; Monte Carlo fails; the holdout CI includes zero; fewer than the minimum event counts; performance depends on one symbol/episode; or any required control matches/beats the candidate.

Pause for data repair if gap rate exceeds 1%, p95 event-to-fill latency exceeds 60 seconds, bid/ask is unavailable for >5% of events, or more than 5% of rows are duplicates. Revise exactly one variable after a failure (data source, event threshold, horizon, or execution convention), assign a new experiment ID, and preserve the failed report. Do not tune toward a passing result.

## Next executable step

Implement a public-feed recorder and deterministic local replay under `Implementation/forced_flow/`, freeze one venue's BTCUSDT/ETHUSDT/SOLUSDT liquidation, OI, mark, bid/ask and 1-minute trade data, then produce the first pre-registered FF-LIQ-C-01/FF-LIQ-R-01 report. No paper alert runner is enabled until the gates above are met.

## 2026-07-14 capability probe result

- Completed exactly one data-source verification item: [[../Implementation/forced_flow/feed_capability_probe.py|read-only Hyperliquid public-feed capability probe]].
- Verified HTTP 200 responses for `metaAndAssetCtxs`, `fundingHistory`, `l2Book`, and `candleSnapshot`.
- The candidate `liquidationHistory` request was rejected with HTTP 422; no liquidation records were fabricated or substituted.
- Evidence report: `../Implementation/forced_flow/reports/forced_flow_feed_capability_20260714T102223Z.json` (canonical payload SHA-256 `bf2a5edc986d1fbbde9e93b0a7b919dd8256d0d2d332ccbf46285d25f4fb53a7`; the JSON also stores this value).
- Decision: `data-insufficient`; market-alpha promotion and paper alerts remain blocked until a documented public liquidation feed or immutable archive is available.

## Related notes

- [[QTF Edge-First Production Mandate]]
- [[Capture Queue - MoonDev Claude Trading X 2076728365340377455]]
- [[AI Quant Trading Floor]]
