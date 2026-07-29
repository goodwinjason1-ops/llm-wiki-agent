---
title: TradingView Candidate Indicator Slate - 2026-07-13
created: 2026-07-13
updated: 2026-07-13
type: strategy-research-slate
status: candidates-queued
managed_as: paper-only
source: [[Miles Deutscher Vibe-Code TradingView Claude Article - Source Review - 2026-07-13]]
lab: [[QTF-021 TradingView Agentic Strategy Lab]]
tags: [tradingview, pine-script, indicators, qtf, paper-trading, candidate]
---

# TradingView Candidate Indicator Slate

These are **research hypotheses**, not successful indicators or trading recommendations. They are designed to be coded in Pine v6, tested on identical datasets and rejected unless they survive fees, slippage, out-of-sample, walk-forward, cross-asset and paper-alert checks.

## Candidate ranking

| ID | Candidate | Primary use | Priority |
|---|---|---|---:|
| TV-N01 | Regime-Weighted Trend Pressure | Trend participation / avoid weak breakouts | 1 |
| TV-N02 | Liquidity Sweep + Reclaim Score | Crypto reversal/continuation after level sweep | 2 |
| TV-N03 | Volatility Compression Breakout Quality | Breakout selection | 3 |
| TV-N04 | Cross-Asset Leadership Divergence | Crypto regime and leadership filter | 4 |
| TV-N05 | Adaptive VWAP/ATR Mean-Reversion Distance | Range-regime reversion | 5 |
| TV-N06 | RSI Divergence Detector | Confirmed momentum divergence | 6 |
| TV-N07 | BTC Dominance Regime Filter | Altcoin risk-on/risk-off filter | 7 |
| TV-N08 | Rolling High/Low Liquidity-Zone Proxy | Context/levels only; not actual liquidations | 8 |

## TV-N01 — Regime-Weighted Trend Pressure (RWTP)

### Hypothesis

Trend signals are more useful when directional pressure, volatility regime and participation agree. A normalized composite may reduce entries during low-quality/noise regimes better than a raw EMA or MACD cross.

### Features

- EMA slope normalised by ATR over a lookback.
- ADX/DMI directional strength.
- Relative volume versus a moving average.
- Close location within the recent high/low range.
- Higher-timeframe trend alignment.
- Volatility percentile gate to exclude dead markets and abnormal stress unless explicitly testing stress momentum.

### Example score

```text
RWTP = 0.35 * normalized_EMA_slope
     + 0.25 * normalized_ADX_direction
     + 0.20 * relative_volume_score
     + 0.20 * range_close_location
```

Long candidates require score above a pre-registered threshold, positive higher-timeframe alignment and a next-bar entry. Short candidates mirror the logic.

### Main risk

Composite indicators can hide overfitting through arbitrary weights. First test equal weights and one-feature ablations before optimisation.

## TV-N02 — Liquidity Sweep + Reclaim Score (LSR)

### Hypothesis

A confirmed sweep beyond a prior swing level followed by a close back inside the level may distinguish rejection/liquidity collection from a clean breakout, especially when paired with trend and volume context.

### Mechanical detector

1. Use confirmed pivots only; do not use future-looking unconfirmed pivots.
2. Identify a prior swing low/high with a minimum age and distance.
3. Require wick penetration beyond the level by an ATR-normalised amount.
4. Require close back above the swept low for a bullish reclaim, or below the swept high for a bearish reclaim.
5. Add volume z-score and higher-timeframe regime filters.
6. Enter next bar; stop beyond sweep extreme plus a defined ATR buffer.

### Main risk

Pivot confirmation creates latency, while low-liquidity crypto markets can produce false sweeps and optimistic historical fills.

## TV-N03 — Volatility Compression Breakout Quality (VCBQ)

### Hypothesis

Breakouts after measurable compression with real participation and a close outside the range may be higher quality than arbitrary resistance breaks.

### Features

- Bollinger Band width percentile.
- ATR percentile.
- Donchian/range width and age.
- Relative volume expansion.
- Close location value.
- Optional retest confirmation.

### Long condition

Compression percentile below a pre-registered threshold, range break above confirmed resistance, relative volume expansion, close near the upper bar range, and no entry after the first stale bar.

### Main risk

Compression thresholds and range definitions can be heavily data-mined. Use broad parameter buckets and walk-forward tests.

## TV-N04 — Cross-Asset Leadership Divergence (CARD)

### Hypothesis

Leadership shifts across BTC, ETH, TOTAL2/TOTAL3 and BTC dominance may filter crypto signals better than price-only indicators.

### Example features

- Relative-strength slope of BTC versus a crypto-market aggregate.
- BTC dominance trend.
- ETH/BTC relative trend.
- Breadth proxy: percentage of selected liquid symbols above a medium EMA, if data access is practical.
- Confirm whether the target asset agrees with or diverges from the leadership regime.

### Use

Prefer as a regime/exposure filter rather than a standalone entry indicator. For example, downgrade long altcoin signals when BTC leadership strengthens while alt breadth deteriorates.

### Main risk

TradingView symbol availability, feed differences and `request.security()` alignment can create hidden data and lookahead errors.

## TV-N05 — Adaptive VWAP/ATR Mean-Reversion Distance (AVAD)

### Hypothesis

Distance from anchored/session VWAP or a robust moving reference, scaled by ATR and gated by low trend strength, may identify range reversion more reliably than fixed RSI thresholds.

### Features

- Session or rolling VWAP distance divided by ATR.
- Trend-strength gate such as ADX below a threshold.
- Band-width/range regime.
- Close-location and volume exhaustion filter.
- Time stop and volatility-adjusted stop/target.

### Main risk

Mean reversion fails during persistent trends. A trend-strength gate and hard stop are mandatory; do not interpret a high win rate without expectancy after costs.

## Required validation for every candidate

- [ ] Pine v6 script compiles in TradingView.
- [ ] No `lookahead_on` or future leakage.
- [ ] Confirmed-bar logic where required.
- [ ] Next-bar or explicitly modelled execution.
- [ ] Fees and slippage included.
- [ ] Same symbol/date range and benchmark across candidates.
- [ ] In-sample, held-out and walk-forward results.
- [ ] Parameter-jitter test.
- [ ] Cross-asset/timeframe test.
- [ ] Trade count and exposure reported.
- [ ] Drawdown/tail loss reported.
- [ ] TradingView Strategy Tester export saved.
- [ ] Alert JSONL agrees with the strategy event stream.
- [ ] Paper monitoring before any production-readiness review.

## Suggested first test matrix

| Family | Crypto | Equity/ETF control | Timeframes |
|---|---|---|---|
| Trend/pressure | BTCUSDT, ETHUSDT | SPY, QQQ | 1h, 4h, daily |
| Sweep/reclaim | BTCUSDT, ETHUSDT | liquid index ETF | 15m, 1h, 4h |
| Compression breakout | BTCUSDT, ETHUSDT | SPY, QQQ | 1h, 4h, daily |
| Cross-asset filter | BTC/ETH/market aggregate | SPY/QQQ/sector ETF | 4h, daily |
| Mean reversion | BTCUSDT, ETHUSDT | SPY/QQQ | 1h, 4h, daily |

## Miles additions

### TV-N06 — RSI Divergence Detector

Use confirmed pivots and delay the signal until the pivot is known. Test whether divergence adds value after a trend/regime filter. The article's raw divergence prompt is not sufficient because unconfirmed pivots can repaint.

### TV-N07 — BTC Dominance Regime Filter

Use `request.security()` to obtain BTC.D as a context filter. Test whether rising dominance reduces altcoin long exposure and falling dominance improves risk-on selection. Treat symbol/feed availability and timeframe alignment as explicit test gates.

### TV-N08 — Rolling High/Low Liquidity-Zone Proxy

The article calls this a liquidation-zone detector, but a rolling 20-bar high/low is not exchange liquidation data. Implement only as a structural liquidity/level proxy. Do not use the word liquidation in alerts or reports.

### Multi-signal entry prompt

The RSI<40 + price>200 EMA + volume>1.5x average example is a useful baseline filter, not novel alpha. Test it as an ablation/control against the existing strategy and avoid treating the conjunction as independent confirmation.

Compile TV-N06/TV-N07/TV-N08 only after TV-N01 and TV-N02 establish the testing contract. The Miles additions are staged extensions, not a reason to optimise eight indicators at once. Do not build five fully optimised indicators simultaneously. Build one baseline plus one novel candidate, run the same test matrix, then decide whether the architecture adds evidence or merely complexity.

## Alert contract

All initial alerts remain paper-only and must include:

```json
{
  "source": "tradingview",
  "strategy_id": "TV-N01",
  "symbol": "{{ticker}}",
  "timeframe": "{{interval}}",
  "action": "paper_candidate",
  "price": "{{close}}",
  "time": "{{time}}",
  "run_mode": "paper_only"
}
```
