# TTM-01 deterministic backtest

Decision: **do_not_promote**.

- 10bps: total 0.7463%, CAGR 0.2898%, Sharpe 0.746, max DD -0.5152%, exposure 0.52%, turnover 0.924
- 20bps: total 0.6533%, CAGR 0.2537%, Sharpe 0.654, max DD -0.5376%, exposure 0.52%, turnover 0.924
- 40bps: total 0.4676%, CAGR 0.1817%, Sharpe 0.469, max DD -0.5825%, exposure 0.52%, turnover 0.924
- 60bps: total 0.2822%, CAGR 0.1097%, Sharpe 0.284, max DD -0.6273%, exposure 0.52%, turnover 0.924

Controls:
- BTCUSDT: total 120.6754%, CAGR 33.5352%, Sharpe 0.844, max DD -52.9681%
- ETHUSDT: total 16.2724%, CAGR 5.6630%, Sharpe 0.417, max DD -67.5538%
- SOLUSDT: total 204.8937%, CAGR 50.2765%, Sharpe 0.900, max DD -76.2614%

Gate: frozen data contains 1,000 daily rows per symbol, below the required 1,095; walk-forward/holdout and robustness gates are not satisfied. No trades or alerts.
