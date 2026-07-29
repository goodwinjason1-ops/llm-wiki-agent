# TTM-01 Broad-Universe Deterministic Backtest

> Cross-sectional momentum/trend rule applied to the full frozen Bybit daily snapshot (~48 symbols).
> **Decision: `do_not_promote`** — same rule as original TTM-01, now broadened.

## Rule

- 20d and 60d returns, SMA50 regime filter
- Cross-sectional rank scoring: 50% rank(20d return) + 50% rank(60d return)
- Select best-scoring eligible asset if score >= median
- Vol-targeted weight: 10% annual vol / realized vol
- 10pp rebalancing threshold
- Next-bar open fill
- Cash fallback when no eligible candidates

## Results

**Symbols loaded:** 50
**Minimum common rows:** 220

### Cost Sensitivity

| Cost | Total Return | CAGR | Sharpe | Max DD | Trades | Avg Exposure | Win Rate | Payoff Ratio | Profit Factor |
|---|---|---|---|---|---|---|---|---|---|
| 10bps | 0.1922% | 0.4446% | 0.953 | -0.2222% | 52 | 0.32% | 42.41% | 1.559 | 1.148 |
| 20bps | 0.1839% | 0.4254% | 0.913 | -0.2250% | 52 | 0.32% | 42.41% | 1.549 | 1.141 |
| 40bps | 0.1673% | 0.3869% | 0.831 | -0.2306% | 52 | 0.32% | 42.41% | 1.531 | 1.127 |
| 60bps | 0.1507% | 0.3484% | 0.748 | -0.2361% | 52 | 0.32% | 42.41% | 1.513 | 1.114 |

### Buy-and-Hold Controls

| Symbol | Total Return | Sharpe | Max DD |
|---|---|---|---|
| BTCUSDT | 119.2810% | 0.839 | -52.9681% |
| ETHUSDT | 17.5011% | 0.423 | -67.5538% |
| SOLUSDT | 189.6373% | 0.878 | -76.2614% |

## Gates

- [x] Frozen data with deterministic replay
- [x] Cost sensitivity (10/20/40/60 bps)
- [x] Buy-and-hold controls
- [ ] Walk-forward / holdout (>= 1,095 rows per symbol for >= 3 years)
- [ ] Parameter jitter robustness (original TTM-01 FAILED at 52.8% survival)
- [ ] Paper-forward agreement

## Decision

**`do_not_promote`** — The broad-universe extension tests the same TTM-01 rule across ~48 symbols instead of 3. The original rule already failed the robustness gate (52.8% parameter survival vs 60% threshold). Broadening the universe does not fix parameter fragility; it only tests whether the rule generalizes. Results below are reported for transparency.

Artifacts: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\ttm01_broad\ttm01_broad_backtest.json`
JSON SHA-256: `b5141a09d7a636fb74f87e9fadf0f91c43368b31c75807f69761b00076f003c0`
