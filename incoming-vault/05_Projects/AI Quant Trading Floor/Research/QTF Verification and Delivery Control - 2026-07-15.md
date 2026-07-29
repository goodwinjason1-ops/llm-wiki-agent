---
title: QTF Verification and Delivery Control - 2026-07-15
created: 2026-07-15
updated: 2026-07-15
type: execution-control-ledger
status: active-audit
confidence: independently-verified-2026-07-15
tags: [quant, audit, verification, delivery-control, paper-only]
---

# Quant Floor verification and delivery control

> **Purpose:** replace assertion-based reporting with artifact-backed delivery. Nothing in this ledger is marked **verified complete** without a concrete artifact, reproducible evidence, and a stated gate outcome. All work remains read-only/paper-only: no credentials, orders, wallets, deposits, or live allocation.

## Controlling requirements

- [[QTF Edge-First Production Mandate]] governs every item.
- ETH is benchmark/control only unless a separately specified rule passes the same gates as every other candidate.
- A note, a script, a dashboard row, or a queued task alone is **not completion**.
- A result is never called a production edge unless its stated data, costs, controls, robustness, and forward-paper gates are evidenced.

## Evidence standard

| Status | Meaning | Required proof |
|---|---|---|
| `verified-complete` | Deliverable and its stated acceptance test exist and pass. | Exact artifact path, command/run result or immutable output, and gate outcome. |
| `partial` | Some real artifact exists but a stated acceptance condition is unmet. | Artifact path plus specific unmet condition. |
| `blocked` | The required data or access is unavailable after a documented probe. | Probe artifact, failure/output, and next unblocked dependency. |
| `queued` | Scoped but not yet implemented/tested. | Rule card plus acceptance criteria; no completion wording. |
| `contradicted` | Previous completion claim cannot be substantiated. | Evidence of mismatch; correction action. |

## Audit scope

### Claimed completed or partially completed — independent verification required

| Workstream | Claim audited | Audit status | Evidence outcome |
|---|---|---|---|
| Pairs Caps 1–9 | Consolidated source review and stated conclusion. | `verified-complete` as source synthesis | Consolidated review, source links and conclusion traceability verified. |
| CASHCAT carry | 83 raw / 76 canonical hourly observations and descriptive-only conclusion. | `partial` | Cutoff recalculation verified counts; dated non-frozen cache and minor correlation mismatch retained. |
| Momentum / TTM-01 | Frozen data and deterministic cost-sensitive backtest; no promotion. | `verified-complete` as rejected backtest | Manifest/report/replay comparison verified; extended validation remains partial. |
| Forced-flow | Exact hypothesis card and public-feed capability probe. | `verified-complete` as data-source block | Card, probe output/hash and no-fabrication result verified. |
| Pairs public-data screen | Diagnostic-only screen, not a backtest. | `partial` | Screen/smoke work verified; separate costed V05 run now exists but remains `do_not_promote`. |
| Website | Local five-page site and five accessible disclosure sections; not deployed. | `partial` | Local HTTP/headless/accessibility evidence verified; public deployment absent. |

### Outstanding production-research deliverables

| ID | Deliverable | Initial status | Completion definition |
|---|---|---|---|
|| QTF-V01 | TTM-01 extended history + chronological walk-forward/holdout + jitter robustness | `partial` | Extended 1,200-row snapshot, fixed-rule 70/30 chronological holdout, and 972-parameter jitter robustness test completed; `do_not_promote`. Robustness gate FAILED (52.8% survival, threshold >= 60%). Benchmark comparison and paper-forward agreement remain outstanding. |
| QTF-V02 | Funding-rate-extremes / carry rule forward-outcome test | `partial` | CASHCAT is one descriptive screened observation, not the edge itself. Completion requires frozen/hash-anchored funding + forward-mark panel, declared cross-instrument signal/holding/costs, and holdout result. |
| QTF-V03 | Forced-flow liquidation data recorder + replay | `blocked` | Public capability probe rejected liquidation-history; requires documented public liquidation source, immutable raw data and deterministic replay, or remains explicitly blocked. |
| QTF-V04 | Regime-gated mean-reversion test | `partial` | A simple live-input RSI reconstruction exists; completion requires a frozen-data regime rule, costs, controls, holdout and decision report. |
| QTF-V05 | Costed function-based pairs backtest | `partial` | Point-in-time rolling-beta/residual, next-bar fills, two-leg costs and short observed funding panel ran on two Bybit pairs; both OOS results `do_not_promote`. Jitter, breadth, adequate funding history and paper-forward gates remain. |
| QTF-V06 | Cross-sleeve allocation engine | `partial` | Legacy analytic/synthetic optimizer exists but is non-actionable; completion requires measured sleeve inputs, comparable risk/correlation/capacity metrics and zero allocation for unvalidated sleeves. |
| QTF-V07 | DeFi edge research | `partial` | Read-only DeFiLlama-based screening exists; completion requires source-normalised candidate panel and edge-specific validation, not APY observation. |
| QTF-V08 | Market-making edge research | `partial` | Public L2/replay research lab exists and remains promotion-blocked; completion requires fill-conditioned adverse-selection and inventory economics evidence. |
| QTF-V09 | ETF diversification and cross-sleeve capital-weight scorecard | `partial` | An ETF sleeve evidence run exists; it is not standalone edge evidence. Completion requires a frozen comparable cross-sleeve net-risk/correlation/capacity scorecard for weighting the stabilising ETF sleeve against validated crypto-edge sleeves. |
| QTF-V10 | Contradiction detection Phase 1 | `partial` | Internal planned-vs-observed contradiction capability exists; external source-level pipeline requires timestamped inputs, null hypothesis, outcome window and false-positive controls. |
| QTF-V11 | Alpha digest implementation | `queued` | Source provenance, dedupe, edge-rule extraction, status/gate linkage and a verified delivery/archive run. |
| QTF-V12 | DeFiLlama source / market-share / stablecoin research | `partial` | Present as a read-only scanner dependency; completion requires versioned pulls, normalized records, provenance/error handling and edge-specific filters. |

## Independent audit result — 2026-07-15

### Previously claimed work

| Workstream | Audit result | Evidence / correction |
|---|---|---|
| Pairs Caps 1–9 | `verified-complete` as a source consolidation, **not** as an edge | Consolidated review exists and states no source proves a production-ready pairs edge. |
| CASHCAT descriptive review | `partial` | The stated cutoff reproduces 83 raw / 76 canonical hourly rows and 97.33% same-sign rate. It is a dated, unfrozen slice; independent lag-1 correlation is -0.052791 rather than -0.0505. Forward outcomes remain absent. |
| TTM-01 deterministic report | `verified-complete` as a rejected backtest, **not** as a production candidate | Independent deterministic replay matched cost-20bps result, controls and `do_not_promote`. Extended-history/walk-forward work remains `QTF-V01`. |
| Forced-flow capability probe | `verified-complete` as a data-source block | Stored hash reproduced; public liquidation-history request remains rejected and no event data was invented. |
| Pairs public-data work | `partial` | A diagnostic snapshot and two-pair smoke tests exist. A separate costed V05 backtest now includes observed funding but remains negative OOS and `do_not_promote`; it does not complete robustness or forward-paper gates. |
| Source-to-System Studio website | `partial` | Five local pages, their linked assets, and five native accessible disclosures passed local HTTP/headless checks. No public deployment, submission endpoint, domain, host, or deployment configuration exists. |

### Corrections made during audit

- The morning next-step queue previously pointed to non-existent result destinations and called a completed TTM-01 backtest `queued`.
- The brief generator now routes to the actual TTM-01 report, the actual CASHCAT review/cache as a funding-rate-extremes screen (not an edge), and the existing ETF sleeve run bundle as a diversification/capital-allocation input (not standalone edge evidence). Its status text distinguishes existing evidence from the missing gates.
- The dashboard's synthetic allocation frontier is now explicitly deprecated and prohibited from informing allocation.
- The TTM-01 snapshot entry in `index.md` and the stale logged backtest JSON hash require correction before they may be relied on; this is queued as a documentation-integrity repair.

## Delivery rules

1. Before a status change, run the stated verification command or record why it cannot run.
2. Every completion message must link the artifact and state: **what was run, what returned, what remains blocked**.
3. If a prior report was inaccurate, mark it `contradicted` here; do not silently overwrite history.
4. The morning brief and next-step queue may show only this ledger's verified/queued/blocked status — never a standing ETH thesis or synthetic allocation.

## Checkpoint A verification — 2026-07-16

- Status: `verified-complete`.
- Script: `05_Projects/AI Quant Trading Floor/Implementation/checkpoint_a_verification.py`.
- Artifact: `05_Projects/AI Quant Trading Floor/Implementation/reports/checkpoint_a/checkpoint_a_20260716T114004Z.json`.
- Universe: 50 Bybit spot assets, 0 Hyperliquid supplement (universe complete, shortfall=0).
- Trend board: 30 eligible rows, 7 positive / 10 negative (top positive=ONDO +15.74%, top negative=LIT -7.75%).
- Funding board: 41 eligible rows, 10 positive / 10 negative (top positive=XRP, top negative=TRX).
- Provenance chain: manifest file SHA-256 `3c579cf02c0d0a3ba6be2394c4fb8a67...` matches both board provenance hashes.
- No trade language detected; all boards classified as `observation`; candidate events have `next_gate` instructions.
- Controls: BTC, ETH, SOL properly tagged; 47 non-control assets present; trend board includes non-control assets.
- Verification: `py_compile` exit code 0; script ran to completion; no orders, credentials, allocations, or contacts.

## Current audit checkpoint

- Audit launched: 2026-07-15.
- Local Quant Floor Python regression suite: `48 passed` via `python -m pytest -q` in `Implementation/`.
- This test result verifies only the existing test suite; it does **not** verify any market claim or production-edge conclusion.
- Core independent artifact audit, outstanding-deliverable inventory and adversarial morning-brief routing review completed.
- The routing review found and corrected a machine-readable status defect: the queue now separates `evidence_status` from `next_step_status`, preventing completed/partial evidence from being mislabeled as merely queued.

## QTF-V05 execution evidence — 2026-07-15

- Status: `partial`.
- Artifact: `05_Projects/AI Quant Trading Floor/Backtests/QTF-V05 Costed Function-Based Pairs Backtest - 2026-07-15.md`.
- Machine output: `05_Projects/AI Quant Trading Floor/Backtests/qtf_v05/qtf_v05_costed_pairs_report.json`.
- Command: `python qtf_v05_costed_pairs_backtest.py` from `Implementation/`; returned exit code `0`, `errors: []`.
- Result: BTC/ETH OOS return `-5.60%`, OOS Sharpe `-0.44`, max drawdown `-39.15%`; ETH/SOL OOS return `-12.72%`, OOS Sharpe `-1.20`, max drawdown `-35.80%`. Both decisions are `do_not_promote`.
- Remaining unmet evidence: funding history covers only the latest public window relative to the 1,000 daily price bars; parameter jitter, broader pair breadth, and forward-paper agreement remain undone. No promotion or allocation is permitted.

## QTF-V02 execution evidence — 2026-07-15

- Status: `partial`.
- Artifact: `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_v02/qtf_v02_funding_forward_test.md`.
- Machine output: `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_v02/qtf_v02_funding_forward_test.json`.
- Command: `python qtf_v02_funding_forward_test.py` from `Implementation/`; returned exit code `0`, `status: ok`, 98 canonical CASHCAT hourly rows and 6 results.
- Rule: `funding_hourly >= 0.0003`, canonical hourly mark entry, 1h/4h/8h mark outcomes, 10 bps round-trip proxy, chronological 70/30 split. Holdout episodes were 9–14 per result.
- Result: fade-short holdout mean net was `+1.5713%` / `+5.6330%` / `+8.2796%` at 1h/4h/8h; persistence-long was `-1.7713%` / `-5.8330%` / `-8.4796%`. Decision is `do_not_promote`.
- Remaining unmet evidence: frozen/hash-anchored multi-instrument panel, executed funding/settlement data, adequate holdout breadth, liquidity/borrow/liquidation controls and forward-paper agreement. No promotion, allocation, alert or order was permitted.

## QTF-V02 Broad Funding Panel v02 — 2026-07-16

- Status: `partial` (advanced from single-asset CASHCAT to broad multi-asset panel).
- Script: `05_Projects/AI Quant Trading Floor/Implementation/qtf_v02_broad_funding_panel_v02.py`.
- Machine output: `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_v02_broad/qtf_v02_broad_panel_v02_20260716T013119Z.json` (SHA-256 `d9bf7ea3505d11400d8bb883fe138093fddabc2a25a0a839fefc0a3e9915b108`).
- Panel source: live Bybit linear `/v5/market/tickers` endpoint — 610 rows with funding, 222 volume-eligible (>= $1M 24h turnover).
- Panel SHA-256: `6cc7b2417591492a2ee21f702db2175038d30709483ce6475e89db2eb9ed6a72`.
- Distribution: 159 positive, 63 negative funding assets. Max |funding/hr| = 0.008881 (B3USDT, -7779% annualised).
- Rule: `|funding_hourly| >= 0.000001`, next-bar mark entry, 1h/4h/8h horizons, 10 bps cost, 0.3 price-fraction proxy, 70/30 chronological split.
- Results: all 6 side/horizon combinations returned negative holdout mean net; 0% hit rate across all configurations; 220 episodes, 66 holdout per combination.
- Cost grid (4h): 20 threshold×cost points all negative for both sides; costs dominate the funding proxy.
- Decision: `do_not_promote`. Gates not met: frozen panel, executed funding, adequate holdout breadth, jitter/RST, paper-forward.
- Verification: `py_compile` exit code 0; no orders, credentials, allocations, or contacts.

## QTF-V01 execution evidence — 2026-07-16

|- Status: `partial` (jitter robustness added).
|- Artifacts: `05_Projects/AI Quant Trading Floor/Implementation/qtf_v01_jitter_robustness.py`, `05_Projects/AI Quant Trading Floor/Implementation/reports/ttm01_v01_jitter/ttm01_v01_jitter_robustness.json`, and `ttm01_v01_jitter_robustness.md`.
|- Command: `python qtf_v01_jitter_robustness.py` from `Implementation/`; returned exit code `0`; `py_compile` passed.
|- Data gate: 1,200 rows per symbol, manifest SHA-256 `356420e8a737f967a32ab3cf740f0bcfa069a7c6cbf3276b91b30c5c630ceae7`.
|- Base holdout (20/60, SMA50, vol=10%, reb=10pp, score=50/50, cost=20bps): 359 rows, 40 trades, return -0.4328%, Sharpe -1.249, MDD -0.5133%.
|- Jitter: 972 parameter combinations tested (3×3×3×3×3×4 grid). Survival rate: return=52.8%, sharpe=44.4%, mdd=50.0%.
|- Robustness gate: **FAILED** (threshold >= 60%). Only 52.8% of jittered parameters survived at or above base return.
|- Parameter sensitivity (Pearson r with holdout return): lookback20=+0.6613, vol_target=-0.5361, cost_bps=-0.4470, others near-zero.
|- Decision: `do_not_promote`. Remaining unmet evidence: benchmark comparison and paper-forward agreement. No trades, alerts, allocations, credentials or contacts.
|- Output JSON SHA-256: `ce64f3e8634a0fdd6d0d8d3ee0f63c64ed6fa89a31142a2d63074d40cfeefb89`.

## QTF-V01 Broad Universe — 2026-07-17

|- Status: `partial` (broad-universe extension completed; robustness still outstanding).
|- Script: `05_Projects/AI Quant Trading Floor/Implementation/ttm01_broad_universe.py`.
|- Data: 50 frozen Bybit spot symbols loaded from `data_cache/ttm01/` (3 BTC/ETH/SOL controls + 47 non-controls).
|- Result (20bps): 158 backtest rows, 52 trades, total return 0.1839%, Sharpe 0.913, max drawdown -0.225%, avg exposure 0.32%.
|- Cost sensitivity: 10bps Sharpe 0.953, 20bps 0.913, 40bps 0.831, 60bps 0.748 — consistent positive Sharpe but very low exposure (rule stays in cash most days).
|- Decision: `do_not_promote`. The broad-universe extension does not fix the original TTM-01's robustness failure (52.8% parameter survival). Same rule, broader universe, same conclusion.
|- Artifacts: `Implementation/reports/ttm01_broad/ttm01_broad_backtest.json` (SHA-256 `c023f3ebac214a9d9980b908f404e8bc2a1bef2af6767c74b4c5b22982f17733`) and `.md`.
|- Remaining unmet evidence: walk-forward/holdout on the broad universe, jitter robustness on the broad universe, paper-forward agreement. No trades, alerts, allocations, credentials or contacts.

|## QTF-V07 Cross-Venue Validation — 2026-07-17|
|
|- Status: `partial` (cross-venue validation completed).|
|- Script: `05_Projects/AI Quant Trading Floor/Implementation/qtf_v07_cross_venue.py`.|
|- Machine output: `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_v07_cross_venue/qtf_v07_cross_venue_20260717T065817Z.json` (SHA-256 `42b193671d0344b1f2657c01f59636b72f897c53150e42119f870c981dcdf3e8`).|
|- Bybit input: 10 V07 coins, 1,944 funding rows, 60 side/horizon results.|
|- Hyperliquid input: 10 V07 coins, 64,223 hourly funding rows (364/day/coin), 150 daily buckets.|
|- Rule: identical funding-extreme fade/persistence test on both venues, threshold=0.0001, 10bps cost, 1d/3d/7d horizons.|
|- HL results: 12 fade_short events at 7d, mean net +6.28%, 100% HR. Bybit 7d fade_short mean net +0.02%, 73% HR (aggregated).|
|- Venue directional agreement: 50% (3/6 configurations agree on sign).|
|- Per-coin directional agreement: 100% (4/4 coins with sufficient HL data).|
|- Cost grid: HL results show strong cost sensitivity (higher costs → lower HL mean net), Bybit results flat across grid.|
|- Decision: `do_not_promote`. Cross-venue validation completed as research artifact. Jitter robustness already FAILED (38.0% survival). Paper-forward agreement and executed funding payments remain outstanding.|
|- Verification: `py_compile` exit code 0; script ran to completion with exit code 0; JSON valid; no orders, credentials, allocations, or contacts.|
|- Remaining unmet evidence: executed funding payments, paper-forward agreement, liquidity/volume controls.|
|
## QTF-V07 RST significance test — 2026-07-16

- Status: `partial` (RST significance test completed; robustness gate already failed).
- Script: `05_Projects/AI Quant Trading Floor/Implementation/qtf_v07_rst_significance.py`.
- Input: V07 multi-coin funding-extreme results `qtf_v07_multi_coin_20260716T064358Z.json` (panel SHA-256 `dafea4096b8a4d09add4ae6d5d1f9add048c7a5d153447112b8045fbcda948ee`).
- Method: Binomial sign test on 60 side/horizon/coin configurations (10 coins × 2 sides × 3 horizons), plus Fisher's combined p-value across all tests.
- Results: 20/60 tests significant at α=0.05 (33.3% significance rate). Panel-level Fisher combined p-value ≈ 0.000000 — strong collective evidence against the null.
- Notable: BCHUSDT fade_short 7d hit rate 87.7%, p=0.0001; BNBUSDT fade_short 7d hit rate 73.4%, p=0.0001; AAVEUSDT fade_short 7d hit rate 64.1%, p=0.0391. Persistence_long shows no significant edges (all hit rates near 50%).
- Interpretation: **Weak individual evidence** (33% significance rate) but **strong panel-level evidence** (Fisher p≈0). The funding-extreme fade edge is statistically distinguishable from random at the panel level, though it is coin-specific and horizon-dependent.
- Decision: `do_not_promote`. The RST confirms the edge is not pure noise, but the earlier jitter robustness failure (38.0% survival) means the edge is fragile across parameter space. Both tests together indicate a real but unstable effect.
- Remaining unmet evidence: executed funding payments, paper-forward agreement, cross-venue validation (Hyperliquid vs Bybit).
- Artifacts: `reports/qtf_v07_multi_coin_funding/rst_significance/qtf_v07_rst_20260716T140328Z.json` and `.md`.
- Verification: `py_compile` exit code 0; script ran to completion with exit code 0; JSON valid; no orders, credentials, allocations, or contacts.

## QTF-V04 execution evidence — 2026-07-15

- Status: `partial`.
- Artifacts: `05_Projects/AI Quant Trading Floor/Implementation/qtf_v04_regime_mean_reversion.py`, `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_v04/qtf_v04_regime_mean_reversion.md`, and machine output `qtf_v04_regime_mean_reversion.json`.
- Command: `python qtf_v04_regime_mean_reversion.py` from `Implementation/`; returned `status: ok`, `symbols: 3`, and `decision: do_not_promote`. `py_compile` passed; local regression suite returned `66 passed in 5.37s`.
- Rule: RSI(14) cross above 30 in a neutral regime defined by absolute 20-day return <=10% and close/SMA50 in [0.85, 1.15]; next daily bar open entry; RSI 55 / 3% stop / five-day exit; 20 bps round-trip cost; chronological 70/30 split.
- Result: frozen 1,200-row BTCUSDT/ETHUSDT/SOLUSDT inputs were hash-recorded. Development produced 1 BTC trade (-6.6285%) and 3 ETH trades (-15.0216%); SOL produced no trades. Holdout produced zero trades for all three symbols, so no positive forward evidence exists.
- Remaining unmet evidence: parameter robustness/jitter, benchmark-relative comparison, sufficient holdout episodes and paper-forward agreement. No paper signals, promotion, allocation, alerts or orders were emitted.

## QTF-V04B Relaxed-Regime Jitter Robustness — 2026-07-18

- Status: `partial` (jitter robustness tested and FAILED).
- Script: `05_Projects/AI Quant Trading Floor/Implementation/qtf_v04b_jitter_robustness.py`.
- Machine output: `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_v04b_relaxed_regime_jitter/qtf_v04b_relaxed_regime_jitter_robustness.json` (SHA-256 `7949b2d8302717306227d93261ccafb39134bb6c983a58f9e0f18c0eab5155ab`).
- Grid: 8 jitter dimensions (return_threshold ×3, sma_band_lo ×3, sma_band_hi ×3, rsi_entry_cross ×3, rsi_exit_level ×3, stop_pct ×3, max_hold_days ×3, cost_bps ×3) = **6,561 combinations**.
- Base config: relaxed_20pct (return_threshold=0.20, sma_band=[0.75,1.25], rsi_entry=30, rsi_exit=55, stop=3%, max_hold=5d, cost=20bps).
- Base holdout: BTC 3 trades (-1.32%), ETH 3 trades (+4.57%), SOL 1 trade (-4.56%), aggregated -1.32% net / 57.14% HR.
- Survival rates: net=38.5%, trades=56.0%, hit_rate=22.8%.
- **Robustness gate FAILED** (threshold >= 60%). Only 38.5% of jittered parameters survived at or above base net.
- Mean holdout net across jitter: -16.10% (std 21.86%) — the jittered configs produce far worse results than base.
- Best jittered config: j4476 at +12.96% net (outlier among 6,561 configs).
- Parameter sensitivity: `rsi_entry_cross` dominates (r=-0.7881), `max_hold_days` secondary (r=-0.3081). Lower RSI entry cross → better net.
- Decision: **`do_not_promote`**. The mean-reversion rule is highly sensitive to RSI entry threshold — tightening the entry (lower cross) helps, but the aggregated rule remains fragile.
- Remaining unmet evidence: benchmark comparison, paper-forward agreement.
- Verification: `py_compile` exit code 0; script ran to completion; JSON valid; ad-hoc verification passed (base holdout nets match V04B output, 6561 combinations, robustness_gate=fail). No orders, credentials, allocations, or contacts.

## QTF-V01 Benchmark comparison — 2026-07-17

- Status: `partial` (benchmark comparison completed).
- Script: `05_Projects/AI Quant Trading Floor/Implementation/ttm01_benchmark_comparison.py`.
- Input manifest SHA-256: `356420e8a737f967a32ab3cf740f0bcfa069a7c6cbf3276b91b30c5c630ceae7` (1,200 rows/symbol, 70/30 chronological split).
- TTM-01 holdout (20bps): total return -0.2096%, Sharpe -0.553, max drawdown -0.5376%, 39 trades, 359 holdout rows.
- BTCUSDT holdout buy-and-hold: -44.7170%, Sharpe -1.177, max drawdown -52.9681%.
- ETHUSDT holdout buy-and-hold: -49.6071%, Sharpe -0.719, max drawdown -67.5538%.
- SOLUSDT holdout buy-and-hold: -60.2810%, Sharpe -0.955, max drawdown -74.8667%.
- Interpretation: TTM-01 holdout period was a severe bear market (all three controls lost 44–60%). TTM-01 preserved capital via near-zero exposure but still lost -0.21% net. It beats all benchmarks on raw metrics but only because it barely participated — this is capital preservation, not edge.
- Decision: `do_not_promote`. Robustness/jitter already FAILED (52.8% survival). Benchmark comparison completed. Paper-forward agreement remains outstanding.
- Artifacts: `05_Projects/AI Quant Trading Floor/Implementation/reports/ttm01_v01_benchmark/ttm01_v01_benchmark_20260716T162011Z.json` (SHA-256 `d629e0f81a6e23867eb690071b3c6d5081a6783bbf7665abd1be01a3bee9c959`) and `.md`.
|- Verification: `py_compile` exit code 0; script ran to completion with exit code 0; JSON valid; no orders, credentials, allocations, or contacts.

## QTF-V07 Cost-Adjusted Funding Payment Backtest — 2026-07-18

- Status: `partial` (executed funding gate MET; jitter robustness tested and FAILED).
- Script: `05_Projects/AI Quant Trading Floor/Implementation/qtf_v07_costed_funding.py`.
- Machine output: `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_v07_costed_funding/qtf_v07_costed_20260717T141155Z.json` (SHA-256 `21127fd96c8efeae073631d8e891b1a651857e55fd7758197f0d72345abac54f`).
- Panel: 10 Bybit linear coins, 3,524 total episodes, 2,414 holdout episodes.
- Key difference from V07: uses ACTUAL cumulative funding payments from historical rate series (walk forward through funding-rate timeline) instead of `funding_rate * horizon_days` proxy; uses 3bps realistic trading cost instead of 10bps proxy.
- Jitter robustness (best config: RENDERUSDT fade_short 7d): survival rate **15.4%** (4/26) — gate FAILED (threshold >= 60%).
- RST significance: 25/60 significant (41.7%), Fisher combined p ≈ 0.0.
- **Critical finding:** Cost adjustment makes the edge MORE fragile (15.4% vs 38.0% in V07). The V07 `funding_rate * horizon_days` proxy overestimated the funding benefit. Mean actual funding payments are tiny (±0.0001-0.0002), confirming most of the apparent edge comes from price returns, not funding payments.
- Top fade_short holdout: RENDERUSDT 7d (+6.58%, 100% HR, 12 episodes), ICPUSDT 7d (+4.84%, 58.2% HR, 55 episodes), BCHUSDT 7d (+3.93%, 69.2% HR, 52 episodes).
- Decision: `do_not_promote`. The edge is real but fragile — primarily a price-reversal phenomenon after funding extremes, not a funding-carry edge.
- Remaining unmet evidence: robustness improvement strategies (identify what drives price reversal), paper-forward agreement, cross-venue validation.
- Verification: `py_compile` exit code 0; script ran to completion with exit code 0; JSON valid; no orders, credentials, allocations, or contacts.

## QTF-T13 Probability/Calibration Validation — 2026-07-18

- Status: `partial` (calibration validation completed; no mispricing evidence found).
- Script: `05_Projects/AI Quant Trading Floor/Implementation/qtf_t13_calibration.py`.
- Machine output: `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_t13_calibration/calibration_20260717T164513+0000.json` (SHA-256 `b2c07632a93d0cde6818230c16b93faa9bb5a66b81659ebafa502420cee63ed2`).
- Data: 199 Polymarket markets fetched from Gamma API; 116 historical candidates from scanner ledger analyzed.
- Key finding: short-window BTC/ETH up/down markets (20 detected) have `outcomePrices=[0,0,0]` — no active price discovery at Gamma API polling cadence. No mispricing can be detected without active prices.
- Bybit spot prices fetched successfully as fair-value proxy (BTCUSDT: $1,839.31, ETHUSDT: $1,839.09).
- 3 well-formed binary markets found (longer price-target markets with resolved outcomes), but these are settled markets, not active trading opportunities.
- Historical ledger: 61 PM-E03 candidates (baseline_snapshot_no_candidate_fill), 55 PM-E04 candidates (candidate_watch_only_fresh_window). 42 markets had book API errors (HTTP 404), 188 had valid book data.
- Decision: `do_not_promote`. The calibration validation confirms that the Polymarket short-window binary markets lack active price discovery at the achievable polling cadence.
- Remaining unmet evidence: resolved outcome data for Brier score computation, sub-minute orderbook polling for PM-E03, repeated first-seen snapshots for PM-E04 stale-pricing detection.
- Verification: `py_compile` exit code 0; script ran to completion with exit code 0; JSON valid; no orders, credentials, allocations, or contacts.

## T12 Market-Making Data/Replay Readiness — 2026-07-18

- Status: `verified-complete` as a documented block.
- Script: `05_Projects/AI Quant Trading Floor/Implementation/t12_market_maker_readiness_probe.py`.
- Machine output: `05_Projects/AI Quant Trading Floor/Implementation/reports/t12_market_maker_readiness.json` (SHA-256 `c36b5e71fb8eba3d2ef53bef82fef57d92ad10ebcaaf78872c321574547c25a4`).
- Data sources probed: Bybit spot kline (5 rows, array format), linear kline (5 rows), L2 orderbook (10 asks + 10 bids, array format `[[price,qty],...]`), recent-trade (5 rows with `execId, price, size, side, time, seq`).
- **Adverse-selection feasibility:** ❌ Blocked — (1) no exact fill-conditioning data (trade price ≠ limit-order fill level), (2) no historical order-placement/removal data for inventory tracking, (3) REST polling latency unknown for sub-second timing.
- **Inventory-economics feasibility:** ❌ Blocked — (1) orderbook endpoint returns point-in-time snapshot only, not time-series, (2) no historical L2 book evolution available.
- **Required data for unblocking:** Time-series of L2 order-book states (at least every few seconds) with price, quantity, and update timestamps — only available via WebSocket replay (subscription) or purchased historical data feed.
- Decision: `blocked`. The market-making sleeve (QTF-V08) cannot proceed without historical L2 book data.
- Forced-flow (already documented): Hyperliquid public Info API rejects `liquidationHistory` (HTTP 422).
- Verification: `py_compile` exit code 0; script ran to completion with exit code 0; JSON valid; no orders, credentials, allocations, or contacts.

## Related

- [[QTF Edge-First Production Mandate]]
- [[AI Quant Trading Floor Dashboard]]
- [[AI Quant Morning Brief - Latest]]
- [[AI Quant Morning Next Step Queue]]
