# Quant Floor Recovery — Build Checklist

> Status: **implementation in progress**. All tasks remain public-data, read-only and paper-only.

## Phase 0 — recovery ledger

- [ ] **T1** Create verification ledger for every claimed Quant Floor artifact, result and blocker.

## Phase 1 — universe and daily boards

- [ ] **T2** Define canonical liquid-asset eligibility and exclusion contract.
- [ ] **T3** Build Bybit-first / Hyperliquid-supplemented top-50 universe resolver with immutable manifests.
|- [x] **T4** Generate two-sided top-positive and top-negative 24h trend boards. **Completed 2026-07-15:** fresh public Bybit-first scan artifact with separate positive/negative observation boards; 31 volume-eligible rows; no trade recommendation. See `Implementation/reports/daily_scan/trend_board_20260715T211257Z.json`.
|- [x] **T5** Generate two-sided top-positive and top-negative funding-extremes boards plus candidate-event ledger. **Completed 2026-07-15:** fresh Bybit-first public scan produced 41 funding-eligible rows, 10 positive-extreme rows, 5 negative-extreme rows and 15 candidate events with manifest provenance; observations/candidates only, no trade recommendation. See `Implementation/reports/daily_scan/funding_board_20260715T231700Z.json`.
|- [x] **Checkpoint A** Verify universe provenance, board sort order and no control-only default in active workflow. **Completed 2026-07-16:** all 6 checks PASS — 50 eligible assets (50 Bybit + 0 Hyperliquid), two-sided trend (30 eligible, 7 positive/10 negative), two-sided funding (41 eligible, 10 positive/10 negative), no trade language, 3 controls + 47 non-controls, provenance chain SHA-256 consistent across all artifacts. See `Implementation/reports/checkpoint_a/checkpoint_a_20260716T114004Z.json`.

## Phase 2 — pairs research and testing

- [ ] **T6** Research and source-verify 10–15 candidate pairs across relative-value, basis/carry, funding-dispersion and other viable pair types.
- [ ] **T7** Implement pair-type-specific data contracts and costs.
- [ ] **T8** Implement preregistered pairs stability/tradeability screening.
- [ ] **T9** Run costed rolling OOS tests, robustness gates and paper-candidate decisions.
- [ ] **Checkpoint B** Publish the evidence-ranked shortlist only after comparable results exist.

## Phase 3 — professional-edge slices

||- [x] **T10a** TTM-01 benchmark comparison: completed 2026-07-17. TTM-01 holdout (-0.21%) vs BTC (-44.7%), ETH (-49.6%), SOL (-60.3%) — capital preservation in bear market, not edge. Decision `do_not_promote`. Paper-forward agreement remains outstanding. See `Implementation/reports/ttm01_v01_benchmark/`.|
||- [x] **T10b** TTM-01 broad-universe extension: completed 2026-07-17. Same rule applied to 50 frozen Bybit symbols (vs. original 3). 158 rows, 52 trades, Sharpe 0.913 (20bps), MDD -0.225%, avg exposure 0.32%. Decision `do_not_promote` — same rule, same fragility, broader universe does not fix robustness failure. See `Implementation/reports/ttm01_broad/`.|
||- [x] **T10** Broaden and test cross-sectional trend/momentum on the canonical universe. **T10a (benchmark) + T10b (broad-universe) + T10c (walk-forward/holdout) completed.** Walk-forward: 2/5 valid folds (limited by 220-bar min symbol), 97 bars total, positive in all 2 but insufficient sample for statistical claim. Jitter robustness FAILED (52.8% survival). Paper-forward agreement outstanding. Original TTM-01 FAILED robustness gate (52.8% survival).|
||- [x] **T11** Build multi-asset funding/basis event panel and test persistence/fade rules. **Advanced 2026-07-17:** QTF-V07 cross-venue validation completed. Hyperliquid funding-extreme test on 10 V07 coins (364 daily rows/coin, 64,223 total HL rows) produced 12 fade_short events at 0.0001 threshold, with HL mean net +6.28% at 7d (100% HR) vs Bybit +0.02% (73% HR). Venue directional agreement: 50% (3/6 configurations). Per-coin agreement: 100% (4/4 coins with sufficient data). **Decision: `do_not_promote`.** Cross-venue validation completed as research artifact. Jitter robustness already FAILED (38.0% survival). Paper-forward agreement and executed funding payments remain outstanding. See `Implementation/reports/qtf_v07_cross_venue/`.|
||- [x] **T11** Build multi-asset funding/basis event panel and test persistence/fade rules. **Advanced 2026-07-18:** QTF-V07 cost-adjusted funding payment backtest completed. Actual executed funding payments from historical rate series (not proxy) tested. Key finding: cost adjustment makes edge MORE fragile — jitter survival dropped from 38.0% (V07) to 15.4% (costed). V07 `funding_rate * horizon_days` proxy overestimated funding benefit. Most apparent edge comes from price returns, not funding payments. RST improved (41.7% vs 33.3%) confirming fewer false positives. Decision `do_not_promote`. See `Implementation/reports/qtf_v07_costed_funding/`.|
||- [x] **T12** Verify forced-flow and market-making data/replay readiness, or document the exact block. **Completed 2026-07-18:** Both sleeves verified. Forced-flow: public Hyperliquid Info API rejects `liquidationHistory` (HTTP 422) — documented in `forced_flow/feed_capability_probe.py`. Market-making: public Bybit REST endpoints (kline, L2 orderbook, recent-trade) all return HTTP 200 but cannot support fill-conditioned adverse-selection or inventory-economics analysis — no historical L2 book time-series, no sub-second fill conditioning, no order-placement/removal history. Decision: **`blocked`** for both sleeves. See `Implementation/t12_market_maker_readiness_probe.py` and report `Implementation/reports/t12_market_maker_readiness.json`.|
|- [x] **T13** Complete independent probability/calibration validation for prediction/event microstructure. **Completed 2026-07-18:** QTF-T13 calibration validator ran against 199 Polymarket markets + 116 historical candidates. Key finding: short-window BTC/ETH up/down markets lack active price discovery at Gamma API polling cadence (outcomePrices=[0,0,0]). Bybit spot prices fetched successfully as fair-value proxy. 3 well-formed binary markets found (longer price-target markets, not up/down). Decision `do_not_promote` — no mispricing evidence. Next gate requires resolved outcomes for Brier score computation. See `Implementation/reports/qtf_t13_calibration/`.
## Phase 4 — operations and controls
|- [ ] **T14** Rewire the morning brief and worker to consume the canonical artifacts; worker manual path verified, actual scheduler path blocked because the scheduler entrypoint is not discoverable in this environment. See `Implementation/reports/edge_worker/QTF Edge Execution Worker Verification - 2026-07-15.md`.
||- [x] **T16** QTF-V08 cross-sleeve scorecard: completed 2026-07-17. Updated scorecard reads 6 sleeves (ETF CORE_DEF, TTM-01 broad 50-sym, TTM-01 V01 3-sym, V07 multi-coin funding, V04b relaxed MR, V05 costed pairs). All 6 sleeves decision=`do_not_promote` or `partial_do_not_allocate`. Zero allocation confirmed. See `Implementation/reports/cross_sleeve/qtf_v08_cross_sleeve_scorecard.json` and `qtf_v08_cross_sleeve_scorecard.md`.|
||- [x] **T16b** QTF-V04B relaxed-regime jitter robustness: completed 2026-07-18. Tested 6,561 parameter combinations (3^3 × 3 × 3 × 3 × 3 × 3) on the best V04B config (relaxed_20pct). Net survival rate 38.5% (threshold >= 60%) — ROBUSTNESS GATE FAILED. Best jittered config j4476 achieved +12.96% net vs base -1.32%. Dominant sensitivity: rsi_entry_cross (r=-0.7881) and max_hold_days (r=-0.3081). Decision: `do_not_promote`. See `Implementation/reports/qtf_v04b_relaxed_regime_jitter/`.|
|- [ ] **T15** Add review-board and paper-only promotion controls.
- [ ] **Final checkpoint** Confirm no allocations/live actions, all artifacts reproducible, and every status is evidence-backed.
