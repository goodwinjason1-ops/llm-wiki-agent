# T10: Broad Cross-Sectional Momentum on Canonical Universe

Decision: **DO_NOT_PROMOTE**

## Overview
- Universe: 49 Bybit spot symbols (includes BTC/ETH/SOL controls)
- Controls: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT']
- Candidates: 47 non-control symbols
- Failures: 1
- Data: daily klines, 1095 rows target per symbol
- Split: 70/30 development/holdout (chronological)

## Cost Sensitivity Grid
### 10bps
- Development: return 0.0000%, Sharpe 0.000, MDD 0.0000%, trades 0, exposure 0.00%
- Holdout: return 62.3894%, Sharpe 0.133, MDD -28.9903%, trades 40, exposure 100.00%
- Symbols used: 32, Total rows: 249

### 20bps
- Development: return 0.0000%, Sharpe 0.000, MDD 0.0000%, trades 0, exposure 0.00%
- Holdout: return 50.8516%, Sharpe 0.118, MDD -29.7944%, trades 40, exposure 100.00%
- Symbols used: 32, Total rows: 249

### 40bps
- Development: return 0.0000%, Sharpe 0.000, MDD 0.0000%, trades 0, exposure 0.00%
- Holdout: return 30.1483%, Sharpe 0.087, MDD -31.3778%, trades 40, exposure 100.00%
- Symbols used: 32, Total rows: 249

### 60bps
- Development: return 0.0000%, Sharpe 0.000, MDD 0.0000%, trades 0, exposure 0.00%
- Holdout: return 12.2531%, Sharpe 0.056, MDD -32.9288%, trades 40, exposure 100.00%
- Symbols used: 32, Total rows: 249

## Parameter Sweep
- lb10_60_top2: dev return 0.0000%, Sharpe 0.000, ho return 163.8267%, Sharpe 0.195
- lb10_60_top3: dev return 0.0000%, Sharpe 0.000, ho return 62.2515%, Sharpe 0.132
- lb10_60_top5: dev return 0.0000%, Sharpe 0.000, ho return 75.6553%, Sharpe 0.173
- lb10_90_top2: dev return 0.0000%, Sharpe 0.000, ho return 111.0469%, Sharpe 0.155
- lb10_90_top3: dev return 0.0000%, Sharpe 0.000, ho return 149.5064%, Sharpe 0.221
- lb10_90_top5: dev return 0.0000%, Sharpe 0.000, ho return 72.5577%, Sharpe 0.169
- lb20_60_top2: dev return 0.0000%, Sharpe 0.000, ho return 100.6661%, Sharpe 0.161
- lb20_60_top3: dev return 0.0000%, Sharpe 0.000, ho return 50.8516%, Sharpe 0.118
- lb20_60_top5: dev return 0.0000%, Sharpe 0.000, ho return 68.1203%, Sharpe 0.152
- lb20_90_top2: dev return 0.0000%, Sharpe 0.000, ho return 167.4547%, Sharpe 0.207
- lb20_90_top3: dev return 0.0000%, Sharpe 0.000, ho return 171.2429%, Sharpe 0.211
- lb20_90_top5: dev return 0.0000%, Sharpe 0.000, ho return 120.2094%, Sharpe 0.230
- lb30_60_top2: dev return 0.0000%, Sharpe 0.000, ho return 151.8691%, Sharpe 0.181
- lb30_60_top3: dev return 0.0000%, Sharpe 0.000, ho return 84.3086%, Sharpe 0.148
- lb30_60_top5: dev return 0.0000%, Sharpe 0.000, ho return 73.8891%, Sharpe 0.168
- lb30_90_top2: dev return 0.0000%, Sharpe 0.000, ho return 126.2857%, Sharpe 0.165
- lb30_90_top3: dev return 0.0000%, Sharpe 0.000, ho return 110.7402%, Sharpe 0.175
- lb30_90_top5: dev return 0.0000%, Sharpe 0.000, ho return 92.2465%, Sharpe 0.194

## Benchmarks (All Symbols)
- AAVEUSDT: return 28.4047%, Sharpe 0.029, MDD -84.1038%
- ADAUSDT: return -47.5760%, Sharpe 0.010, MDD -88.2851%
- ALGOUSDT: return -27.0057%, Sharpe 0.017, MDD -84.0677%
- ASTERUSDT: return -55.4161%, Sharpe -0.017, MDD -79.7358%
- ATOMUSDT: return -83.5225%, Sharpe -0.022, MDD -89.3625%
- AVAXUSDT: return -52.3292%, Sharpe 0.008, MDD -90.2848%
- BCHUSDT: return -8.6992%, Sharpe 0.018, MDD -72.5727%
- BNBUSDT: return 139.7805%, Sharpe 0.043, MDD -58.1694%
- BTCUSDT: return 115.2199%, Sharpe 0.041, MDD -52.9681%
- CCUSDT: return 12.5222%, Sharpe 0.035, MDD -53.1478%
- DOGEUSDT: return 6.9764%, Sharpe 0.024, MDD -84.5662%
- DOTUSDT: return -83.5269%, Sharpe -0.017, MDD -92.9823%
- ENAUSDT: return -89.0644%, Sharpe -0.003, MDD -95.1140%
- ETCUSDT: return -62.4720%, Sharpe -0.004, MDD -82.2709%
- ETHUSDT: return -1.0904%, Sharpe 0.017, MDD -67.5538%
- FILUSDT: return -81.8037%, Sharpe -0.005, MDD -93.7478%
- FLRUSDT: return -51.0627%, Sharpe 0.007, MDD -87.7013%
- GRAMUSDT: return 12.7968%, Sharpe 0.023, MDD -85.3187%
- HBARUSDT: return 27.7305%, Sharpe 0.029, MDD -82.2153%
- HTXUSDT: return 10.4167%, Sharpe 0.019, MDD -61.2156%
- HYPEUSDT: return 35.5863%, Sharpe 0.041, MDD -64.1809%
- ICPUSDT: return -47.4743%, Sharpe 0.014, MDD -89.0221%
- JSTUSDT: return 326.2884%, Sharpe 0.053, MDD -55.5110%
- JUPUSDT: return -69.5008%, Sharpe 0.005, MDD -92.1139%
- KASUSDT: return -27.4860%, Sharpe 0.018, MDD -86.8425%
- KCSUSDT: return -15.2090%, Sharpe 0.009, MDD -62.1804%
- LINKUSDT: return 21.3347%, Sharpe 0.026, MDD -75.3856%
- LTCUSDT: return -50.5844%, Sharpe 0.000, MDD -70.1372%
- MNTUSDT: return -17.3929%, Sharpe 0.018, MDD -84.6790%
- MORPHOUSDT: return 104.4804%, Sharpe 0.050, MDD -78.2109%
- NEARUSDT: return 38.1328%, Sharpe 0.032, MDD -89.1391%
- NEXOUSDT: return 18.3119%, Sharpe 0.019, MDD -56.5339%
- ONDOUSDT: return 70.1487%, Sharpe 0.038, MDD -88.9740%
- PEPEUSDT: return 80.5638%, Sharpe 0.040, MDD -91.2331%
- POLUSDT: return -86.9132%, Sharpe -0.027, MDD -94.6122%
- PUMPUSDT: return -69.6382%, Sharpe -0.011, MDD -86.0821%
- QNTUSDT: return -36.2189%, Sharpe 0.009, MDD -65.7936%
- RENDERUSDT: return -73.8833%, Sharpe -0.008, MDD -88.4487%
- SHIBUSDT: return -46.0983%, Sharpe 0.010, MDD -88.4271%
- SKYUSDT: return -16.5334%, Sharpe 0.003, MDD -46.1122%
- SOLUSDT: return 195.9311%, Sharpe 0.044, MDD -76.2614%
- STABLEUSDT: return 84.2498%, Sharpe 0.073, MDD -55.8248%
- SUIUSDT: return 1.6162%, Sharpe 0.027, MDD -87.1142%
- TRXUSDT: return 304.9887%, Sharpe 0.049, MDD -51.0202%
- UNIUSDT: return -38.2338%, Sharpe 0.017, MDD -87.1165%
- WLDUSDT: return -81.5760%, Sharpe 0.013, MDD -97.9980%
- WLFIUSDT: return -75.2370%, Sharpe -0.065, MDD -77.6282%
- XLMUSDT: return 43.2455%, Sharpe 0.029, MDD -74.3974%
- XRPUSDT: return 40.4884%, Sharpe 0.027, MDD -70.7031%

## Gate Notes
- Cost grid and parameter sweep completed on the full canonical universe.
- Best holdout Sharpe: 0.230 (at lb20_90_top5).
- Full robustness/jitter, Monte Carlo/RST, and paper-forward gates remain outstanding.
- No trades, alerts, credentials, allocations, or contacts occurred.
- Positive holdout Sharpe observed but below promotion threshold.
