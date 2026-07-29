---
title: QTF-007 MoonDev Market Maker Sharpe Proxy
created: 2026-07-06
updated: 2026-07-06
type: quant-strategy
status: research
markets: [crypto-perps]
timeframes: [1m, 5m, 15m]
tags: [quant, trading, strategy, market-making, bybit, paper-trading, sharpe]
sources:
  - https://x.com/i/status/2016647662637064402
  - https://x.com/i/article/2009591446953943040
confidence: low
---

# QTF-007 MoonDev Market Maker Sharpe Proxy

## Purpose

Turn the MoonDev X article into a reproducible, research-only strategy candidate for Jayse's AI Quant Trading Floor. The goal is to test whether a small-profit passive maker sleeve can improve portfolio Sharpe after fees, slippage, drawdown controls, and out-of-sample checks.

## Source summary

Article title: **How I Engineered a 3.0+ Sharpe Ratio Trading Bot Using AutoGPT and Python**.

Key claims/methods extracted:

1. Manual/emotional trading loses against automated systems; move strategy logic into Python.
2. Prefer **maker** behavior over taker behavior because taker fees can turn a seemingly profitable scalp into a losing trade.
3. Calculate the percentage move required to break even by adding entry fee, exit fee, and desired profit, then dividing by notional.
4. Use order-book supply/demand zones and place orders just in front of large liquidity rather than placing random orders.
5. Harvest many small profits instead of looking for home runs.
6. Use inventory/risk controls, especially a hard **daily max-loss** circuit breaker.
7. Use AI agents for research/iteration, but execution logic still has to be deterministic and testable.

## Source vs reconstruction

### Explicitly sourced

- Market-making / liquidity-provision framing.
- Maker/taker fee awareness.
- Fee-adjusted breakeven/profit target formula.
- Order-book supply/demand zones.
- Place orders just in front of large players/liquidity.
- Daily max-loss safety guard.
- Iterate to success; do not expect the first version to work.

### Reconstructed assumptions

- Historical order-book snapshots are not available from the article, so initial backtest uses a candle-based proxy:
  - demand zone = 20th percentile of prior lows, adjusted by recent high-volume lows;
  - supply zone = 80th percentile of prior highs, adjusted by recent high-volume highs;
  - passive bid/ask is placed slightly inside the zone.
- Passive fill occurs if the next candle trades through the resting price.
- Same-bar stop/target handling is conservative: stop first if both are touched.
- Entry/normal exit use maker fees; circuit-breaker liquidation uses taker fee.
- Bybit public klines are used for crypto research because Binance is not preferred in Australia.

### Unknowns

- Exact dYdX implementation.
- Exact order-book depth thresholds.
- Exact AutoGPT research prompt/output/PDF.
- Whether the claimed 3.0+ Sharpe survives fees, latency, queue priority, adverse selection, and out-of-sample testing.

## Implemented artifact

- `Implementation/moondev_market_maker_lab.py`
- `Implementation/test_moondev_market_maker_lab.py`

## Entry rules

### Long maker proxy

1. Compute prior-only liquidity zones over `lookback` bars.
2. Place a passive bid just above reconstructed demand.
3. Fill long if the replay candle trades through that bid.
4. Size by account equity × `notional_pct`.

### Short maker proxy

1. Compute prior-only liquidity zones over `lookback` bars.
2. Place a passive ask just below reconstructed supply.
3. Fill short if the replay candle trades through that ask.
4. Size by account equity × `notional_pct`.

## Exit rules

1. Take profit at fee-adjusted breakeven plus `target_net_bps`.
2. Stop at `stop_atr_mult × ATR(14)` from entry.
3. If daily equity loss breaches `daily_max_loss_pct`, flatten at close with taker-fee assumption and pause until next UTC day.

## Position sizing and risk

- Starting capital assumption: `$5,000` default.
- Risk per trade: indirect via `notional_pct`, stop distance, and daily max-loss.
- Default max notional: 20% of equity per position.
- Default daily max loss: 2% of equity.
- No live orders; research-only public data.

## Fees and slippage

- Maker fee default: 1 bp.
- Taker/circuit-breaker fee default: 5.5 bps.
- Queue priority and latency are **not** modeled yet; this is a major adverse-selection risk.

## Bias controls

- [x] Signals use prior bars only.
- [x] Execution is modeled after signal creation.
- [x] No repainting indicators.
- [x] Same-bar ambiguity is conservative.
- [ ] Historical order-book replay still needed before paper promotion.
- [ ] Out-of-sample/walk-forward validation still needed before paper promotion.

## Backtest command

```bash
cd "C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/AI Quant Trading Floor/Implementation"
python moondev_market_maker_lab.py --symbols BTCUSDT,ETHUSDT,SOLUSDT --interval 15m --days 30 --capital 5000
```

## Promotion criteria

May move to paper monitoring only if:

- Sharpe remains above 1.6 after walk-forward testing.
- Max drawdown remains below the maker-sleeve budget.
- Trade count is high enough across BTC/ETH/SOL.
- Real order-book snapshot replay confirms fill assumptions are not fantasy.
- Queue/adverse-selection stress tests do not kill the edge.
- Human approval is given for any paper automation.

## Failure modes

- Claimed Sharpe is marketing; exact rules are missing.
- Passive fills may be unrealistic without queue modeling.
- Strategy can get picked off during volatility spikes.
- Small targets are highly fee/latency sensitive.
- Daily max loss may trigger often in choppy markets.
- Candle proxy may overstate or understate real order-book edge.

## Initial evidence

### Baseline article translation

Command:

```bash
python moondev_market_maker_lab.py --symbols BTCUSDT,ETHUSDT,SOLUSDT --interval 15m --days 30 --capital 5000
```

Report:

- `Implementation/reports/moondev_market_maker_lab_20260706T060422+0000.json`

Result: baseline two-sided proxy rejected/revise. It generated many fills but lost money after stops/fees:

| Symbol | Return | Max DD | Sharpe | Trades | Decision |
|---|---:|---:|---:|---:|---|
| BTCUSDT | -7.65% | -7.68% | -23.90 | 636 | reject/revise |
| ETHUSDT | -10.45% | -10.63% | -25.67 | 711 | revise/high drawdown |
| SOLUSDT | -15.24% | -15.29% | -32.12 | 725 | revise/high drawdown |

Diagnosis: the naive two-sided maker proxy wins often but losses are much larger than wins. This is classic adverse-selection behavior: the bot harvests small targets until volatility picks it off.

### First one-variable-style sweep

Report:

- `Implementation/reports/moondev_market_maker_sweep_20260706T060923+0000.json`
- `Implementation/reports/moondev_market_maker_sweep_20260706T060923+0000.csv`

Best 30-day public-Bybit candle proxy candidates were **long-only**, wider target, wider stop, smaller notional:

| Symbol | Lookback | Target | Stop | Notional | Long-only | Return | Max DD | Sharpe | Trades | PF |
|---|---:|---:|---:|---:|---|---:|---:|---:|---:|---:|
| ETHUSDT | 48 | 20 bps | 3.0 ATR | 5% | yes | 0.59% | -0.30% | 6.54 | 206 | 1.55 |
| BTCUSDT | 48 | 20 bps | 3.0 ATR | 5% | yes | 0.41% | -0.34% | 4.90 | 184 | 1.42 |
| ETHUSDT | 48 | 12 bps | 3.0 ATR | 5% | yes | 0.15% | -0.48% | 1.81 | 255 | 1.23 |

Important: this does **not** prove a live 3+ Sharpe edge. It is a candle-proxy result and may be overstated by passive-fill/queue assumptions. Next gate is real order-book snapshot recording and replay.

## Decision log

| Date | Decision | Evidence |
|---|---|---|
| 2026-07-06 | research / implement clean-room proxy | Created `moondev_market_maker_lab.py`, unit tests, baseline report, and parameter sweep. Candidate direction: long-only, 48-bar zones, wider target, wider stop, low notional. |

## Order-book gate evidence
Updated: 2026-07-06T11:55:44+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T115543+0000.json`
Decision: **collect_more_orderbook_data: smoke test only, insufficient snapshots for promotion**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 30 | -0.0005% | -0.0005% | 0 | 0.0% | 0.00 | 0.000 |
| ETHUSDT | 30 | -0.0005% | -0.0005% | 0 | 0.0% | 0.00 | 0.000 |
| SOLUSDT | 30 | 0.0000% | 0.0000% | 0 | 0.0% | 0.00 | 0.000 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T12:00:35+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T120035+0000.json`
Decision: **collect_more_orderbook_data: smoke test only, insufficient snapshots for promotion**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 88 | -0.0509% | -0.0509% | 2 | 0.0% | 0.00 | -7.491 |
| ETHUSDT | 88 | -0.0476% | -0.0476% | 2 | 0.0% | 0.00 | -2.548 |
| SOLUSDT | 88 | -0.0335% | -0.0335% | 1 | 0.0% | 0.00 | -6.805 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T12:02:42+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T120242+0000.json`
Decision: **collect_more_orderbook_data: smoke test only, insufficient snapshots for promotion**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 98 | -0.0929% | -0.0929% | 3 | 0.0% | 0.00 | -10.629 |
| ETHUSDT | 98 | -0.0724% | -0.0724% | 3 | 0.0% | 0.00 | -5.799 |
| SOLUSDT | 98 | -0.0468% | -0.0468% | 2 | 0.0% | 0.00 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T12:18:56+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T121856+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 108 | -0.0923% | -0.0923% | 3 | 0.0% | 0.00 | -10.629 |
| ETHUSDT | 108 | -0.0787% | -0.0787% | 3 | 0.0% | 0.00 | -5.799 |
| SOLUSDT | 108 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T12:34:54+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T123454+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 118 | -0.0874% | -0.0874% | 3 | 0.0% | 0.00 | -10.629 |
| ETHUSDT | 118 | -0.0767% | -0.0767% | 3 | 0.0% | 0.00 | -5.799 |
| SOLUSDT | 118 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T12:50:55+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T125055+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 128 | -0.1531% | -0.1531% | 5 | 0.0% | 0.00 | -19.170 |
| ETHUSDT | 128 | -0.1345% | -0.1345% | 4 | 0.0% | 0.00 | -18.506 |
| SOLUSDT | 128 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T13:06:56+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T130656+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 138 | -0.1579% | -0.1579% | 5 | 0.0% | 0.00 | -19.170 |
| ETHUSDT | 138 | -0.1729% | -0.1729% | 5 | 0.0% | 0.00 | -21.966 |
| SOLUSDT | 138 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T13:23:06+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T132306+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 148 | -0.1693% | -0.1693% | 5 | 0.0% | 0.00 | -19.170 |
| ETHUSDT | 148 | -0.1722% | -0.1722% | 5 | 0.0% | 0.00 | -21.966 |
| SOLUSDT | 148 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T13:39:02+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T133902+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 158 | -0.2089% | -0.2089% | 6 | 0.0% | 0.00 | -21.899 |
| ETHUSDT | 158 | -0.1902% | -0.1902% | 6 | 0.0% | 0.00 | -18.839 |
| SOLUSDT | 158 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T13:55:20+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T135520+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 168 | -0.1807% | -0.1875% | 7 | 14.3% | 0.06 | -19.120 |
| ETHUSDT | 168 | -0.1823% | -0.1872% | 7 | 14.3% | 0.06 | -16.429 |
| SOLUSDT | 168 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T14:12:00+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T141200+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 178 | -0.1897% | -0.1897% | 7 | 14.3% | 0.05 | -19.120 |
| ETHUSDT | 178 | -0.1994% | -0.1994% | 7 | 14.3% | 0.05 | -16.429 |
| SOLUSDT | 178 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T14:28:00+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T142800+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 188 | -0.1724% | -0.1875% | 8 | 25.0% | 0.11 | -16.938 |
| ETHUSDT | 188 | -0.1710% | -0.1872% | 8 | 25.0% | 0.11 | -14.607 |
| SOLUSDT | 188 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T14:44:01+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T144400+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 198 | -0.1805% | -0.1875% | 8 | 25.0% | 0.11 | -16.938 |
| ETHUSDT | 198 | -0.1778% | -0.1872% | 8 | 25.0% | 0.11 | -14.607 |
| SOLUSDT | 198 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T15:00:04+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T150004+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 208 | -0.1841% | -0.1875% | 8 | 25.0% | 0.10 | -16.938 |
| ETHUSDT | 208 | -0.1824% | -0.1872% | 8 | 25.0% | 0.11 | -14.607 |
| SOLUSDT | 208 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T15:16:06+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T151606+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 218 | -0.1622% | -0.1875% | 9 | 33.3% | 0.17 | -15.473 |
| ETHUSDT | 218 | -0.1605% | -0.1872% | 9 | 33.3% | 0.17 | -13.132 |
| SOLUSDT | 218 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T15:32:21+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T153221+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 228 | -0.1698% | -0.1875% | 9 | 33.3% | 0.16 | -15.473 |
| ETHUSDT | 228 | -0.1616% | -0.1872% | 9 | 33.3% | 0.17 | -13.132 |
| SOLUSDT | 228 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T15:48:11+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T154811+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 238 | -0.1547% | -0.1875% | 10 | 40.0% | 0.22 | -14.034 |
| ETHUSDT | 238 | -0.1553% | -0.1872% | 10 | 40.0% | 0.22 | -12.351 |
| SOLUSDT | 238 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T16:04:06+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T160406+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 248 | -0.1463% | -0.1875% | 11 | 45.5% | 0.27 | -12.955 |
| ETHUSDT | 248 | -0.1454% | -0.1872% | 11 | 45.5% | 0.27 | -11.872 |
| SOLUSDT | 248 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T16:20:08+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T162008+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 258 | -0.1284% | -0.1875% | 12 | 50.0% | 0.34 | -11.974 |
| ETHUSDT | 258 | -0.1229% | -0.1872% | 12 | 58.3% | 0.37 | -11.260 |
| SOLUSDT | 258 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T16:36:08+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T163608+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 268 | -0.1375% | -0.1875% | 12 | 50.0% | 0.32 | -11.974 |
| ETHUSDT | 268 | -0.1586% | -0.1872% | 12 | 50.0% | 0.29 | -11.260 |
| SOLUSDT | 268 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T16:52:10+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T165209+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 278 | -0.1296% | -0.1875% | 12 | 50.0% | 0.34 | -11.974 |
| ETHUSDT | 278 | -0.1538% | -0.1872% | 12 | 50.0% | 0.30 | -11.260 |
| SOLUSDT | 278 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T17:08:10+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T170809+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 288 | -0.1228% | -0.1875% | 13 | 53.8% | 0.39 | -11.139 |
| ETHUSDT | 288 | -0.1530% | -0.1872% | 12 | 50.0% | 0.30 | -11.260 |
| SOLUSDT | 288 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T17:24:14+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T172414+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 298 | -0.1181% | -0.1875% | 13 | 53.8% | 0.40 | -11.139 |
| ETHUSDT | 298 | -0.1443% | -0.1872% | 12 | 50.0% | 0.31 | -11.260 |
| SOLUSDT | 298 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T17:40:11+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T174011+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 308 | -0.1289% | -0.1875% | 13 | 53.8% | 0.37 | -11.139 |
| ETHUSDT | 308 | -0.1795% | -0.1872% | 13 | 46.2% | 0.27 | -12.898 |
| SOLUSDT | 308 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T18:12:07+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T181207+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 318 | -0.1298% | -0.1875% | 13 | 53.8% | 0.37 | -11.139 |
| ETHUSDT | 318 | -0.1813% | -0.1872% | 13 | 46.2% | 0.26 | -12.898 |
| SOLUSDT | 318 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T18:44:23+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T184423+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 329 | -0.1256% | -0.1875% | 13 | 53.8% | 0.38 | -11.139 |
| ETHUSDT | 329 | -0.1701% | -0.1872% | 13 | 46.2% | 0.28 | -12.898 |
| SOLUSDT | 329 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T19:00:18+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T190018+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 339 | -0.1332% | -0.1875% | 13 | 53.8% | 0.37 | -11.139 |
| ETHUSDT | 339 | -0.1739% | -0.1872% | 13 | 46.2% | 0.27 | -12.898 |
| SOLUSDT | 339 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T19:16:12+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T191612+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 349 | -0.1272% | -0.1875% | 13 | 53.8% | 0.38 | -11.139 |
| ETHUSDT | 349 | -0.1698% | -0.1872% | 13 | 46.2% | 0.28 | -12.898 |
| SOLUSDT | 349 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T19:32:14+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T193214+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 359 | -0.1258% | -0.1875% | 13 | 53.8% | 0.38 | -11.139 |
| ETHUSDT | 359 | -0.1698% | -0.1872% | 13 | 46.2% | 0.28 | -12.898 |
| SOLUSDT | 359 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T19:48:14+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T194814+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 369 | -0.1194% | -0.1875% | 13 | 53.8% | 0.39 | -11.139 |
| ETHUSDT | 369 | -0.1628% | -0.1872% | 13 | 46.2% | 0.29 | -12.898 |
| SOLUSDT | 369 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T20:04:12+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T200412+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 379 | -0.1385% | -0.1875% | 13 | 53.8% | 0.36 | -11.139 |
| ETHUSDT | 379 | -0.1863% | -0.1872% | 13 | 46.2% | 0.26 | -12.898 |
| SOLUSDT | 379 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T20:36:13+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T203613+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 393 | -0.1200% | -0.1875% | 13 | 53.8% | 0.39 | -11.139 |
| ETHUSDT | 393 | -0.1667% | -0.1872% | 13 | 46.2% | 0.28 | -12.898 |
| SOLUSDT | 392 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T20:52:21+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T205221+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 403 | -0.1239% | -0.1875% | 13 | 53.8% | 0.38 | -11.139 |
| ETHUSDT | 403 | -0.1712% | -0.1872% | 13 | 46.2% | 0.28 | -12.898 |
| SOLUSDT | 402 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T21:08:27+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T210827+0000.json`
Decision: **collect_more_orderbook_data: too few fills to judge**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 413 | -0.1176% | -0.1875% | 13 | 61.5% | 0.40 | -11.139 |
| ETHUSDT | 413 | -0.1655% | -0.1872% | 13 | 46.2% | 0.28 | -12.898 |
| SOLUSDT | 412 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T21:40:35+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T214035+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 423 | -0.1101% | -0.1875% | 14 | 57.1% | 0.45 | -10.557 |
| ETHUSDT | 423 | -0.1460% | -0.1872% | 14 | 57.1% | 0.36 | -12.156 |
| SOLUSDT | 422 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T21:56:36+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T215636+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 433 | -0.1056% | -0.1875% | 15 | 60.0% | 0.49 | -9.928 |
| ETHUSDT | 433 | -0.1473% | -0.1872% | 15 | 53.3% | 0.37 | -11.417 |
| SOLUSDT | 432 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T22:12:55+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T221255+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 443 | -0.1134% | -0.1875% | 15 | 60.0% | 0.47 | -9.928 |
| ETHUSDT | 443 | -0.1555% | -0.1872% | 15 | 53.3% | 0.36 | -11.417 |
| SOLUSDT | 442 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T23:29:28+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T232928+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 453 | -0.1566% | -0.1875% | 16 | 56.2% | 0.39 | -11.864 |
| ETHUSDT | 453 | -0.2154% | -0.2154% | 16 | 50.0% | 0.29 | -14.290 |
| SOLUSDT | 452 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-06T23:45:34+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260706T234534+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 463 | -0.1601% | -0.1875% | 16 | 56.2% | 0.38 | -11.864 |
| ETHUSDT | 463 | -0.2375% | -0.2375% | 17 | 47.1% | 0.27 | -14.541 |
| SOLUSDT | 462 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T01:37:24+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T013724+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 473 | -0.1968% | -0.1968% | 17 | 52.9% | 0.33 | -13.039 |
| ETHUSDT | 473 | -0.2979% | -0.2979% | 18 | 44.4% | 0.22 | -17.007 |
| SOLUSDT | 472 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T01:53:22+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T015322+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 483 | -0.1869% | -0.1875% | 17 | 52.9% | 0.35 | -13.039 |
| ETHUSDT | 483 | -0.2831% | -0.2831% | 18 | 44.4% | 0.23 | -17.007 |
| SOLUSDT | 482 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T02:09:22+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T020922+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 493 | -0.1995% | -0.1995% | 17 | 52.9% | 0.33 | -13.039 |
| ETHUSDT | 493 | -0.2944% | -0.2944% | 18 | 44.4% | 0.23 | -17.007 |
| SOLUSDT | 492 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T02:25:23+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T022523+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 503 | -0.2192% | -0.2192% | 18 | 50.0% | 0.31 | -12.815 |
| ETHUSDT | 503 | -0.3381% | -0.3381% | 19 | 42.1% | 0.20 | -18.344 |
| SOLUSDT | 502 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T02:41:24+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T024124+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 513 | -0.2277% | -0.2277% | 18 | 50.0% | 0.30 | -12.815 |
| ETHUSDT | 513 | -0.3427% | -0.3427% | 19 | 42.1% | 0.20 | -18.344 |
| SOLUSDT | 512 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T02:57:27+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T025727+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 523 | -0.2705% | -0.2705% | 19 | 47.4% | 0.27 | -14.200 |
| ETHUSDT | 523 | -0.3716% | -0.3716% | 20 | 40.0% | 0.19 | -18.679 |
| SOLUSDT | 522 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T03:13:26+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T031326+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 533 | -0.2627% | -0.2627% | 19 | 47.4% | 0.27 | -14.200 |
| ETHUSDT | 533 | -0.3668% | -0.3668% | 20 | 40.0% | 0.19 | -18.679 |
| SOLUSDT | 532 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T03:29:27+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T032927+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 543 | -0.2722% | -0.2722% | 19 | 47.4% | 0.26 | -14.200 |
| ETHUSDT | 543 | -0.3821% | -0.3821% | 20 | 40.0% | 0.18 | -18.679 |
| SOLUSDT | 542 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T03:45:27+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T034527+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 553 | -0.2795% | -0.2795% | 19 | 47.4% | 0.26 | -14.200 |
| ETHUSDT | 553 | -0.4030% | -0.4030% | 21 | 38.1% | 0.18 | -18.452 |
| SOLUSDT | 552 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T04:01:27+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T040127+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 563 | -0.2778% | -0.2778% | 19 | 47.4% | 0.26 | -14.200 |
| ETHUSDT | 563 | -0.3970% | -0.3970% | 21 | 38.1% | 0.18 | -18.452 |
| SOLUSDT | 562 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T04:17:29+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T041729+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 573 | -0.2798% | -0.2798% | 19 | 47.4% | 0.26 | -14.200 |
| ETHUSDT | 573 | -0.4051% | -0.4051% | 21 | 38.1% | 0.18 | -18.452 |
| SOLUSDT | 572 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T04:33:29+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T043329+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 583 | -0.2756% | -0.2756% | 19 | 47.4% | 0.26 | -14.200 |
| ETHUSDT | 583 | -0.4035% | -0.4035% | 21 | 38.1% | 0.18 | -18.452 |
| SOLUSDT | 582 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T04:49:30+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T044930+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 593 | -0.3011% | -0.3011% | 20 | 45.0% | 0.24 | -14.454 |
| ETHUSDT | 593 | -0.4290% | -0.4290% | 22 | 36.4% | 0.17 | -17.702 |
| SOLUSDT | 592 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T05:05:30+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T050530+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 603 | -0.2995% | -0.2995% | 20 | 45.0% | 0.25 | -14.454 |
| ETHUSDT | 603 | -0.4206% | -0.4235% | 22 | 40.9% | 0.17 | -17.702 |
| SOLUSDT | 602 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T05:21:32+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T052132+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 613 | -0.3168% | -0.3168% | 20 | 45.0% | 0.24 | -14.454 |
| ETHUSDT | 613 | -0.4384% | -0.4384% | 22 | 36.4% | 0.16 | -17.702 |
| SOLUSDT | 612 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T05:37:32+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T053732+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 623 | -0.2943% | -0.2943% | 20 | 45.0% | 0.25 | -14.454 |
| ETHUSDT | 623 | -0.4130% | -0.4235% | 22 | 40.9% | 0.19 | -17.702 |
| SOLUSDT | 622 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T05:53:32+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T055332+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 633 | -0.2881% | -0.2881% | 20 | 45.0% | 0.25 | -14.454 |
| ETHUSDT | 633 | -0.4130% | -0.4235% | 22 | 40.9% | 0.19 | -17.702 |
| SOLUSDT | 632 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T06:09:34+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T060933+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 643 | -0.3022% | -0.3022% | 20 | 45.0% | 0.24 | -14.454 |
| ETHUSDT | 643 | -0.4228% | -0.4235% | 23 | 39.1% | 0.19 | -17.454 |
| SOLUSDT | 642 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T06:25:34+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T062534+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 653 | -0.2977% | -0.2977% | 20 | 45.0% | 0.25 | -14.454 |
| ETHUSDT | 653 | -0.4238% | -0.4238% | 23 | 39.1% | 0.19 | -17.454 |
| SOLUSDT | 652 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T06:41:35+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T064135+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 663 | -0.2862% | -0.2862% | 20 | 45.0% | 0.25 | -14.454 |
| ETHUSDT | 663 | -0.4067% | -0.4235% | 23 | 43.5% | 0.20 | -17.454 |
| SOLUSDT | 662 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T06:57:36+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T065736+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 673 | -0.2752% | -0.2857% | 20 | 50.0% | 0.28 | -14.454 |
| ETHUSDT | 673 | -0.4082% | -0.4235% | 24 | 41.7% | 0.21 | -16.780 |
| SOLUSDT | 672 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T07:13:38+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T071338+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 683 | -0.2779% | -0.2857% | 21 | 47.6% | 0.28 | -13.854 |
| ETHUSDT | 683 | -0.4011% | -0.4235% | 24 | 45.8% | 0.22 | -16.780 |
| SOLUSDT | 682 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T07:29:39+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T072939+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 693 | -0.2879% | -0.2879% | 21 | 47.6% | 0.27 | -13.854 |
| ETHUSDT | 693 | -0.4112% | -0.4235% | 24 | 41.7% | 0.21 | -16.780 |
| SOLUSDT | 692 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T07:45:39+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T074538+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 703 | -0.2960% | -0.2960% | 21 | 47.6% | 0.27 | -13.854 |
| ETHUSDT | 703 | -0.4256% | -0.4256% | 24 | 41.7% | 0.20 | -16.780 |
| SOLUSDT | 702 | -0.0236% | -0.0340% | 2 | 50.0% | 0.32 | -10.567 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T08:01:39+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T080139+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 713 | -0.2983% | -0.2983% | 21 | 47.6% | 0.27 | -13.854 |
| ETHUSDT | 713 | -0.4282% | -0.4282% | 24 | 41.7% | 0.20 | -16.780 |
| SOLUSDT | 712 | -0.0299% | -0.0340% | 3 | 33.3% | 0.27 | -7.658 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T08:17:40+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T081740+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 723 | -0.2980% | -0.2980% | 21 | 47.6% | 0.27 | -13.854 |
| ETHUSDT | 723 | -0.4264% | -0.4264% | 24 | 41.7% | 0.20 | -16.780 |
| SOLUSDT | 722 | -0.0323% | -0.0340% | 3 | 33.3% | 0.25 | -7.658 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T08:33:41+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T083341+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 733 | -0.3042% | -0.3042% | 21 | 47.6% | 0.26 | -13.854 |
| ETHUSDT | 733 | -0.4520% | -0.4520% | 25 | 40.0% | 0.19 | -17.082 |
| SOLUSDT | 732 | -0.0372% | -0.0372% | 3 | 33.3% | 0.23 | -7.658 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T08:49:42+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T084942+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 743 | -0.3032% | -0.3032% | 21 | 47.6% | 0.26 | -13.854 |
| ETHUSDT | 743 | -0.4491% | -0.4491% | 25 | 40.0% | 0.19 | -17.082 |
| SOLUSDT | 742 | -0.0317% | -0.0340% | 3 | 33.3% | 0.26 | -7.658 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T09:05:43+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T090543+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 753 | -0.2982% | -0.2982% | 21 | 47.6% | 0.27 | -13.854 |
| ETHUSDT | 753 | -0.4476% | -0.4476% | 25 | 40.0% | 0.19 | -17.082 |
| SOLUSDT | 752 | -0.0360% | -0.0360% | 3 | 33.3% | 0.23 | -7.658 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T09:21:45+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T092145+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 763 | -0.2903% | -0.2903% | 21 | 47.6% | 0.27 | -13.854 |
| ETHUSDT | 763 | -0.4417% | -0.4417% | 25 | 40.0% | 0.20 | -17.082 |
| SOLUSDT | 762 | -0.0372% | -0.0372% | 3 | 33.3% | 0.23 | -7.658 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T09:37:46+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T093746+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 773 | -0.2939% | -0.2939% | 21 | 47.6% | 0.27 | -13.854 |
| ETHUSDT | 773 | -0.4406% | -0.4406% | 25 | 40.0% | 0.20 | -17.082 |
| SOLUSDT | 772 | -0.0464% | -0.0464% | 3 | 33.3% | 0.19 | -7.658 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T09:53:45+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T095345+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 783 | -0.2844% | -0.2857% | 21 | 47.6% | 0.28 | -13.854 |
| ETHUSDT | 783 | -0.4331% | -0.4390% | 26 | 42.3% | 0.22 | -16.476 |
| SOLUSDT | 782 | -0.0348% | -0.0348% | 3 | 33.3% | 0.24 | -7.658 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T10:09:47+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T100947+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 793 | -0.2788% | -0.2857% | 21 | 47.6% | 0.28 | -13.854 |
| ETHUSDT | 793 | -0.4283% | -0.4390% | 26 | 46.2% | 0.22 | -16.476 |
| SOLUSDT | 792 | -0.0323% | -0.0340% | 3 | 33.3% | 0.25 | -7.658 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T10:25:48+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T102548+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 803 | -0.2781% | -0.2857% | 21 | 47.6% | 0.28 | -13.854 |
| ETHUSDT | 803 | -0.4280% | -0.4390% | 26 | 46.2% | 0.22 | -16.476 |
| SOLUSDT | 802 | -0.0415% | -0.0415% | 3 | 33.3% | 0.21 | -7.658 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T10:41:48+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T104148+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 813 | -0.2834% | -0.2857% | 21 | 47.6% | 0.28 | -13.854 |
| ETHUSDT | 813 | -0.4368% | -0.4390% | 26 | 42.3% | 0.21 | -16.476 |
| SOLUSDT | 812 | -0.0489% | -0.0489% | 3 | 33.3% | 0.18 | -7.658 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T10:57:49+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T105749+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 823 | -0.2882% | -0.2882% | 21 | 47.6% | 0.27 | -13.854 |
| ETHUSDT | 823 | -0.4469% | -0.4469% | 26 | 42.3% | 0.21 | -16.476 |
| SOLUSDT | 822 | -0.0581% | -0.0581% | 3 | 33.3% | 0.16 | -7.658 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T11:13:50+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T111350+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 833 | -0.2963% | -0.2963% | 21 | 47.6% | 0.27 | -13.854 |
| ETHUSDT | 833 | -0.4521% | -0.4521% | 26 | 42.3% | 0.21 | -16.476 |
| SOLUSDT | 832 | -0.0581% | -0.0581% | 3 | 33.3% | 0.16 | -7.658 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T11:29:51+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T112951+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 843 | -0.2944% | -0.2944% | 21 | 47.6% | 0.27 | -13.854 |
| ETHUSDT | 843 | -0.4402% | -0.4402% | 26 | 42.3% | 0.21 | -16.476 |
| SOLUSDT | 842 | -0.0581% | -0.0581% | 3 | 33.3% | 0.16 | -7.658 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T11:45:51+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T114550+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 853 | -0.2820% | -0.2857% | 21 | 47.6% | 0.28 | -13.854 |
| ETHUSDT | 853 | -0.4270% | -0.4390% | 26 | 46.2% | 0.22 | -16.476 |
| SOLUSDT | 852 | -0.0581% | -0.0581% | 3 | 33.3% | 0.16 | -7.658 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T12:01:53+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T120153+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 863 | -0.2748% | -0.2857% | 21 | 52.4% | 0.29 | -13.854 |
| ETHUSDT | 863 | -0.4309% | -0.4390% | 26 | 42.3% | 0.22 | -16.476 |
| SOLUSDT | 862 | -0.0581% | -0.0581% | 3 | 33.3% | 0.16 | -7.658 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T12:17:54+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T121754+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 873 | -0.2705% | -0.2857% | 22 | 50.0% | 0.31 | -13.291 |
| ETHUSDT | 873 | -0.4222% | -0.4390% | 27 | 44.4% | 0.24 | -15.935 |
| SOLUSDT | 872 | -0.0581% | -0.0581% | 3 | 33.3% | 0.16 | -7.658 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T12:33:53+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T123353+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 883 | -0.2768% | -0.2857% | 22 | 50.0% | 0.30 | -13.291 |
| ETHUSDT | 883 | -0.4266% | -0.4390% | 27 | 44.4% | 0.23 | -15.935 |
| SOLUSDT | 882 | -0.0625% | -0.0625% | 4 | 25.0% | 0.15 | -6.202 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T12:49:54+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T124954+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 893 | -0.2853% | -0.2857% | 22 | 50.0% | 0.30 | -13.291 |
| ETHUSDT | 893 | -0.4418% | -0.4418% | 27 | 44.4% | 0.23 | -15.935 |
| SOLUSDT | 892 | -0.0821% | -0.0821% | 4 | 25.0% | 0.12 | -6.202 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T13:05:56+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T130556+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 903 | -0.3043% | -0.3043% | 23 | 47.8% | 0.28 | -12.892 |
| ETHUSDT | 903 | -0.4587% | -0.4587% | 28 | 42.9% | 0.22 | -15.492 |
| SOLUSDT | 902 | -0.0894% | -0.0894% | 4 | 25.0% | 0.11 | -6.202 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T13:21:55+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T132155+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 913 | -0.3117% | -0.3117% | 23 | 47.8% | 0.28 | -12.892 |
| ETHUSDT | 913 | -0.4691% | -0.4691% | 28 | 42.9% | 0.22 | -15.492 |
| SOLUSDT | 912 | -0.0980% | -0.0980% | 4 | 25.0% | 0.10 | -6.202 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.

## Order-book gate evidence
Updated: 2026-07-07T13:37:58+00:00
Report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\moondev_orderbook_gate_20260707T133758+0000.json`
Decision: **reject_or_revise: order-book replay did not confirm candle proxy**

| Symbol | Snapshots | Return | Max DD | Trades | Win rate | PF | Avg adverse bps |
|---|---:|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 923 | -0.3196% | -0.3196% | 23 | 47.8% | 0.27 | -12.892 |
| ETHUSDT | 923 | -0.5019% | -0.5019% | 29 | 41.4% | 0.20 | -16.260 |
| SOLUSDT | 922 | -0.0980% | -0.0980% | 4 | 25.0% | 0.10 | -6.202 |

This gate uses public Bybit L2 snapshots with conservative latency/queue penalties. Short smoke runs are for pipeline validation only; promotion requires much longer snapshot history.
