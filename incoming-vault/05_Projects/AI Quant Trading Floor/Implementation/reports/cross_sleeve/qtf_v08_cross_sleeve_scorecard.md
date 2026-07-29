---
title: QTF-V08 Cross-Sleeve Evidence Scorecard
created: 2026-07-17
updated: 2026-07-17T09:58:49.202015+00:00
type: backtest-evidence
status: zero_allocation
tags: [quant, cross-sleeve, allocation, paper-only, evidence-gated]
confidence: medium
---

# QTF-V08 Cross-Sleeve Evidence Scorecard

> Paper-only comparison artifact. It reports existing evidence; it is not an allocation engine.

## Observed metrics
| Sleeve | Family | Return (OOS/net) | Sharpe | Max DD | Trades | Decision |
|---|---|---:|---:|---:|---:|---|
| `S1-ETF-CORE-DEF` | tactical-momentum | 135.2540% | 1.1146 | n/a% | n/a | `partial_do_not_allocate` |
| `S2-TTM01-BROAD` | cross-sectional-trend | 0.1839% | 0.9125 | -0.2250% | 52 | `do_not_promote` |
| `S3-TTM01-V01` | cross-sectional-trend | -0.2096% | -0.5526 | -0.5376% | n/a | `do_not_promote` |
| `S4-FUNDING-V07` | funding-carry | 0.2196% | n/a | n/a% | n/a | `do_not_promote` |
| `S5-V04B-MR` | regime-gated-mean-reversion | 4.5650% | n/a | n/a% | n/a | `do_not_promote` |
| `S6-PAIRS-V05` | relative-value-pairs | -9.1603% | -0.8191 | -39.1482% | 30 | `do_not_promote` |

## Decision

**Zero allocation / no promotion.** None of the evaluated sleeves have passed all comparability, robustness, and paper-forward gates. The scorecard intentionally does not manufacture a cross-sleeve rank because the samples, horizons, costs and validation gates are not comparable.

## Blocking gates

- S1/S7: ETF and crypto samples use different windows, instruments, and cost models — not directly comparable.
- S1/S7: ETF run card does not state a comparable bps cost model or untouched holdout.
- S2/S3: TTM-01 FAILED jitter robustness gate (52.8% survival < 60% threshold) on both 3-symbol and 50-symbol universes.
- S4: Funding V07 has 10 holdout configs; cross-venue agreement only 50%; jitter robustness FAILED (38.0%).
- S5: V04b best holdout net is 4.56% on ETHUSDT/relaxed_20pct if found; all aggregated holdout nets negative. Robustness/jitter/benchmark/paper-forward outstanding.
- S6: V05 pairs are negative OOS on both BTC/ETH and ETH/SOL; funding history is short relative to price bars.
- No sleeve has passed all cross-sleeve comparability, robustness, and paper-forward gates.

## Individual sleeve notes

### TTM-01 broad-universe (50 symbols)
- Jitter robustness FAILED (52.8% survival < 60% threshold)
- Same rule applied to 50 symbols produces same fragility
- Broader universe does not fix robustness failure

### Funding fade (V07 multi-coin, 1d horizon)
- Mean holdout net across 10 configs: 0.0021963500904223733
- Jitter robustness already FAILED (38.0% survival)
- Cross-venue validation: 50% directional agreement between HL and Bybit
- Paper-forward agreement and executed funding payments remain outstanding

### Relaxed-regime mean reversion (V04b)
- Relaxed regime filter produces holdout trades (original V04 had zero)
- Best holdout: ETHUSDT/relaxed_20pct (+4.57%, 3 trades, 66.67% HR) and BTCUSDT/relaxed_15pct (+2.67%, 1 trade, 100% HR)
- All holdout nets negative when aggregated across symbols/configs
- Remaining unmet: robustness/jitter on best config, benchmark comparison, paper-forward agreement


## Evidence paths

- Machine-readable: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\cross_sleeve\qtf_v08_cross_sleeve_scorecard.json`
- `S1-ETF-CORE-DEF` — `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\runs\core_def_l252_t1_vt008_20260709T102738+0000\run_card.json`
- `S2-TTM01-BROAD` — `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\ttm01_broad\ttm01_broad_backtest.json`
- `S3-TTM01-V01` — `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\ttm01_v01\qtf_v01_walkforward.json`
- `S4-FUNDING-V07` — `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\qtf_v07_cross_venue\qtf_v07_cross_venue_20260717T065817Z.json`
- `S5-V04B-MR` — `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\qtf_v04b_relaxed_regime\qtf_v04b_relaxed_regime_result.json`
- `S6-PAIRS-V05` — `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Backtests\qtf_v05\qtf_v05_costed_pairs_report.json`
