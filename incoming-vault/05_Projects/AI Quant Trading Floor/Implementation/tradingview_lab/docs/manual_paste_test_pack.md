# TradingView Manual Paste/Test Pack — QTF-021

Purpose: give Jayse a simple checklist to test the Pine strategies in TradingView and send results back for Quant Floor review.

## Strategy files to test

```text
pine_strategies/tv_e01_bb_macd_rsi_momentum.pine
pine_strategies/tv_e02_ema_supertrend_macd.pine
```

## Suggested first symbols/timeframes

| Priority | Symbol | Timeframe | Why |
|---:|---|---|---|
| 1 | BTCUSDT | 1h | aligns with crypto/TradingView experience |
| 2 | BTCUSDT | 4h | less noisy trend confirmation |
| 3 | ETHUSDT | 1h | adjacent crypto validation |
| 4 | SPY or QQQ | 1D | sanity check outside crypto |

## Paste/test steps

1. Open TradingView.
2. Open the chart for the symbol/timeframe.
3. Open Pine Editor.
4. Paste one strategy file.
5. Click **Add to chart**.
6. Check for compile errors.
7. Open **Strategy Tester**.
8. Record results into `reports/tradingview_backtest_capture_template.md`.
9. Take screenshots of:
   - chart with entries/exits;
   - overview performance;
   - list of trades if available.
10. Do not enable webhook/live execution.

## What to send Ari

- symbol/timeframe;
- which script;
- net profit %;
- max drawdown %;
- trade count;
- profit factor;
- screenshot/photo if easy;
- any compile error text.
