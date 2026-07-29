# Native Quant Floor Run Card

Generated: 2026-07-09T10:27:39+00:00
Run directory: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\runs\core_def_l252_t1_vt008_20260709T102738+0000`

## Safety
research/backtest only; public data; no broker/exchange auth; no orders

## Command
```bash
python strategy_lab_v3.py --core-def-bundle
```

## Config
- strategy_id: CORE_DEF-L252-T1-VT0.08
- symbols: ['SPY', 'QQQ', 'TLT', 'IEF', 'SHY', 'GLD', 'UUP']
- lookback: 252
- top_n: 1
- vol_target: 0.08
- initial_cash: 10000
- data_source: yfinance cached via strategy_lab_v2.align_daily
- days: 3650

## Reproducibility
- config_hash: `7e286e89b5a753a4d5f64a5f7ddde826d60d2879f8ed4bb52016909152ea630f`
- strategy_hash: `4e06df83e13ea886e5893a1a57c01a289d28ceb540ca5a7a7c5dcea1f78558cf`

## Metrics
- final_equity: 23525.399327444917
- return_pct: 135.25399327444916
- cagr_pct: 10.008950105689852
- max_dd_pct: -9.876523622225674
- sharpe: 1.114618527512827
- sortino: 1.464197762254929
- trades: 122
- win_rate_pct: 53.278688524590166
- profit_factor: 2.6032127633526443
- first_half_return_pct: 51.34496490661162
- second_half_return_pct: 55.442233191975966
- forecast_median_90d_pct: 3.7369437912053494
- forecast_p05_90d_pct: -4.634665838763526
- forecast_p95_90d_pct: 13.485533971429692
- prob_profit_90d_pct: 76.0

## Validation
- bootstrap: {"observed_sharpe": 1.1146, "ci_lower": 0.4578, "ci_upper": 1.7958, "median_sharpe": 1.0896, "prob_positive": 0.999, "n_bootstrap": 1000}
- walk_forward: {"n_windows": 5, "profitable_windows": 5, "consistency_rate": 1.0, "windows": [{"window": 1, "start": "2017-07-06", "end": "2019-04-23", "return": 0.141966, "sharpe": 0.9008}, {"window": 2, "start": "2019-04-24", "end": "2021-02-05", "return": 0.255457, "sharpe": 1.3771}, {"window": 3, "start": "2021-02-08", "end": "2022-11-21", "return": 0.085294, "sharpe": 0.5482}, {"window": 4, "start": "2022-11-22", "end": "2024-09-11", "return": 0.137665, "sharpe": 0.9635}, {"window": 5, "start": "2024-09-12", "end": "2026-07-02", "return": 0.328986, "sharpe": 1.7241}]}

## Artifacts
- `artifacts/equity.csv` (118836 bytes, sha256 `5e33e8858125f27b00381099f4e8b47960b789d50eefd76c8efa33ef8693e155`)
- `artifacts/metrics.csv` (479 bytes, sha256 `707d6d0f1e10012635a00e3b123af37a7f82a03f64eaf7aa15d5f8677153e5ca`)
- `artifacts/positions.csv` (163977 bytes, sha256 `87b65f7195f23e263083e0e7d4be79f7319438f25f3088fb2742e56fb728dbbf`)
- `artifacts/trades.csv` (13402 bytes, sha256 `0a35b643e5740a8fca33df446375740588df43ca51e886cdc49b712197215b12`)
- `artifacts/validation.json` (1115 bytes, sha256 `9c962fd16cf35fcc8290e0f9c57bddb94adff3676acacc5986199d8f0c6881ad`)
- `source_data/ohlcv_GLD.csv` (75683 bytes, sha256 `7f7936a9f05ebb1724531e0624e83bce37e8ba13dd4fc870e416783aae55bda2`)
- `source_data/ohlcv_IEF.csv` (75055 bytes, sha256 `551b295c28af74c6dddb4ec6afde9e1b5c6187346ef27e9b50474810b2a0ab54`)
- `source_data/ohlcv_QQQ.csv` (75752 bytes, sha256 `569b64f13533127c7afadc75c2fa1702bd74972e8365e71184c9868db90f0196`)
- `source_data/ohlcv_SHY.csv` (74759 bytes, sha256 `f917f01065206335384279680ea1e770c06af8b068a8aa3e754de0f89a183fc8`)
- `source_data/ohlcv_SPY.csv` (75492 bytes, sha256 `895a0960b50797cbda822ca8c5192b4e1704b754f351d1e8fc3d08a38cc0fdd5`)
- `source_data/ohlcv_TLT.csv` (75582 bytes, sha256 `f038f7ff18ca4d88f1fd832656606a0682bfff931090a95d73ed6dae17452ed0`)
- `source_data/ohlcv_UUP.csv` (76904 bytes, sha256 `a98c555fe97ee8076ec4d62f9b9594f4efcee45144cf482e43303acee14ae37c`)
