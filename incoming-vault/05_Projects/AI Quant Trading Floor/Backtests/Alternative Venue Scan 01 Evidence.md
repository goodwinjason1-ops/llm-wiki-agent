---
title: Alternative Venue Scan 01 Evidence
created: 2026-07-03
updated: 2026-07-03
type: scan-evidence
tags: [prediction-markets, polymarket, kalshi, hyperliquid, defi, evidence]
confidence: high
---

# Alternative Venue Scan 01 Evidence

## Command

```bash
python Implementation/alt_venue_scanner.py
```

## Report files

```text
Implementation/reports/alt_venue_scan_20260702T173741+0000.json
Implementation/reports/alt_venue_scan_20260702T173741+0000_polymarket.csv
Implementation/reports/alt_venue_scan_20260702T173741+0000_kalshi.csv
Implementation/reports/alt_venue_scan_20260702T173741+0000_hyperliquid.csv
Implementation/reports/alt_venue_scan_20260702T173741+0000_defi.csv
```

## Top Polymarket candidates from scan

| Rank | Market | Yes | Liquidity | Volume | Spread | Notes |
|---:|---|---:|---:|---:|---:|---|
| 1 | Eduardo Bolsonaro 2026 Brazilian presidential election | 0.15% | $1.01M | $9.99M | 0.1c | near-zero political market; needs model + settlement-risk discount |
| 2 | Bitcoin dip to $57,500 in July | 50.5% | $68.9k | $98.9k | 1c | strong research candidate because external BTC vol model possible |
| 3 | James Talarico 2028 Democratic nomination | 1.45% | $308k | $9.88M | 0.1c | long-dated political market; capital lockup risk |
| 4 | Brazil reach 2026 World Cup final | 18.5% | $203k | $98.6k | 1c | sports model possible but requires data feed |
| 5 | Bitcoin reach $70,000 in July | 22.5% | $55.4k | $99.6k | 1c | strong research candidate because external BTC vol model possible |

## Top Hyperliquid funding/perp candidates

| Rank | Coin | 1d return | Funding annualized | Day volume | Max lev | Notes |
|---:|---|---:|---:|---:|---:|---|
| 1 | ME | +10.08% | -556.78% | $1.17M | 3x | extreme negative funding; dangerous, research only |
| 2 | GRAM | +0.37% | +187.20% | $8.27M | 5x | extreme positive funding |
| 3 | ZRO | +5.57% | +84.89% | $3.70M | 5x | funding/momentum candidate |
| 4 | GRASS | -2.51% | +58.21% | $2.70M | 3x | funding/contrarian candidate |
| 5 | HEMI | +6.39% | +47.89% | $2.03M | 3x | funding/momentum candidate |

## Top DeFi yield candidates from raw scanner

These are not approved; many have IL/reward-token risk.

| Rank | Chain | Project | Pool | APY | 30d APY | TVL | Risk notes |
|---:|---|---|---|---:|---:|---:|---|
| 1 | Ethereum | Uniswap v4 | WBTC-USDT | 51.69% | 16.36% | $11.2M | IL yes, prediction Down |
| 2 | Ethereum | Uniswap v3 | WETH-USDT | 46.30% | 45.66% | $80.3M | IL yes, prediction Down |
| 3 | Base | Aerodrome v1 | USDC-AERO | 37.85% | 26.70% | $28.7M | IL yes, reward-token risk |
| 4 | Base | Uniswap v3 | USDC-CBBTC | 38.76% | 34.44% | $8.3M | IL yes |
| 5 | Ethereum | Uniswap v3 | UNI-WETH | 34.86% | 16.23% | $13.1M | IL yes |

## Interpretation

The best high-risk Sharpe path is not one venue. It is a portfolio of sleeves:

1. **Daily ETF tactical core** for stability.
2. **Polymarket crypto price-level markets** where external probability models can be built.
3. **Hyperliquid funding/perp sleeve** for short-lived carry/momentum anomalies.
4. **DeFi yield sleeve** for lower-correlation yield, starting with safer stablecoin/lending pools before LP pools.

## Immediate next research priorities

1. Build BTC/ETH probability model for Polymarket monthly price-level markets.
2. Record Hyperliquid funding/ctx snapshots every hour to create a real backtest dataset.
3. Pull DeFiLlama pool chart histories for stablecoin/lending pools and compare APY stability.
4. Create portfolio-level allocator with higher risk budget but hard drawdown guard.

## Safety gate

No live execution. These scans are read-only and public-data only.
