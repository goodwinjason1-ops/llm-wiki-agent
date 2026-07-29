---
tags:
  - quant-floor/backtest
  - intraday
  - opening-range
  - bybit
  - yahoo
status: smoke-tested
created: 2026-07-04
---

# Opening Range Lab 01 - Intraday Backtester Smoke Test

## Purpose

Build and verify the first dedicated **intraday backtester** for the YouTube opening-range strategy:

```text
15m opening range → 5m breakout confirmation → 1m entry model
```

Research only. No live trading, no broker/exchange auth, no orders.

## Artifact created

```text
05_Projects/AI Quant Trading Floor/Implementation/opening_range_lab.py
```

## Data-source policy update

Jayse noted Binance is not available in Australia and prefers Bybit where possible. The new intraday lab supports:

| Adapter | Use |
|---|---|
| `bybit` | Preferred crypto public 1m candles |
| `yahoo` | Public equity/ETF 1m candles, limited lookback |

The main v0 `quant_floor_system.py` was also patched to support `adapter=bybit`, and `config.json` now marks crypto CEX public assets as `bybit`.

## Commands run

### Equities / ETFs via Yahoo 1m

```bash
python opening_range_lab.py --symbols QQQ,SPY,NVDA,TSLA --adapter yahoo --days 7 --start-equity 10000 --fee-bps 1 --slippage-bps 3
```

Report:

```text
Implementation/reports/opening_range_lab_yahoo_20260704T104946+0000.json
Implementation/reports/opening_range_lab_yahoo_20260704T104946+0000.csv
```

TSLA initially hit a transient Yahoo connection reset, then succeeded with:

```bash
python opening_range_lab.py --symbols TSLA --adapter yahoo --days 7 --start-equity 10000 --fee-bps 1 --slippage-bps 3
```

Report:

```text
Implementation/reports/opening_range_lab_yahoo_20260704T105025+0000.json
Implementation/reports/opening_range_lab_yahoo_20260704T105025+0000.csv
```

### Crypto via Bybit 1m

```bash
python opening_range_lab.py --symbols BTCUSDT,ETHUSDT,SOLUSDT --adapter bybit --market crypto --days 14 --start-equity 10000 --fee-bps 6 --slippage-bps 4 --max-exit-minutes 390
```

Report:

```text
Implementation/reports/opening_range_lab_bybit_20260704T105008+0000.json
Implementation/reports/opening_range_lab_bybit_20260704T105008+0000.csv
```

### Main v0 Bybit adapter smoke test

```bash
python quant_floor_system.py backtest --symbol BTCUSDT --adapter bybit --interval 1d --limit 365
```

Result: executed successfully. Metrics: total return 15.69%, CAGR 10.62%, max drawdown -20.11%, Sharpe 0.62, exposure 32.33%, trades 36. Latest action: observe/flat. This remains research-only.

## Initial ORB smoke-test result summary

### Yahoo equities/ETFs, 7 observed sessions

| Symbol | Best model in short test | Return | Trades | Notes |
|---|---:|---:|---:|---|
| QQQ | retest | +0.73% | 4 | Small positive but tiny sample |
| SPY | breakout | -0.48% | 7 | Roughly flat/negative |
| NVDA | breakout | -2.82% | 6 | Negative across variants |
| TSLA | retest | +5.28% | 6 | Positive in tiny sample; needs much more data |

### Bybit crypto, 15 observed sessions

| Symbol | Best model in short test | Return | Trades | Notes |
|---|---:|---:|---:|---|
| BTCUSDT | retest | -4.29% | 10 | Negative |
| ETHUSDT | breakout | -0.50% | 14 | Near flat, not enough evidence |
| SOLUSDT | breakout | -2.24% | 14 | Negative |

## Interpretation

This is a successful infrastructure milestone, **not** a strategy promotion.

The raw video rules did not broadly pass the first smoke test. TSLA looked good over the short Yahoo sample, QQQ retest was slightly positive, and ETH breakout was near flat, but most variants were negative after costs/slippage.

## Limitations

- Yahoo 1m equity data has short lookback and can produce transient connection errors.
- Sample size is tiny: 7 equity sessions and 15 crypto sessions.
- Current model uses simplified stop placement rather than discretionary swing lows/order blocks.
- Same-bar stop/target conflicts are treated conservatively as stop-first.
- No walk-forward or parameter robustness yet.
- No news/regime filter yet.

## Next experiments

1. Add larger intraday data source if available for equities/ETFs.
2. Add filters:
   - prior-day high/low context,
   - VWAP trend filter,
   - opening gap filter,
   - no-trade chop/range filter,
   - volume/displacement threshold.
3. Separate TSLA/NVDA single-stock behavior from SPY/QQQ index behavior.
4. Test longer Bybit crypto windows and alternative session opens.
5. Add walk-forward scoring before any paper monitor.

## Decision

```text
Research status: keep and iterate.
Promotion status: not promoted.
Next action: add filters and larger data before paper alerts.
```
