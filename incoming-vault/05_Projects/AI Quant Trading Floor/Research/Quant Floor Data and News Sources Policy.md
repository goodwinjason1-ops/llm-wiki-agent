---
tags:
  - quant-floor/data-sources
  - news
  - bybit
status: active-policy
created: 2026-07-04
---

# Quant Floor Data and News Sources Policy

## Crypto market data preference

Jayse noted Binance is not available in Australia. For new crypto market-data work, prefer:

1. **Bybit public API** for public crypto candles where possible.
2. Keep Binance only as a legacy fallback for older experiments or venues where Binance-compatible data is uniquely useful.
3. Do not use authenticated exchange APIs, keys, deposits, or order endpoints without explicit approval.

## Current implementation status

- `opening_range_lab.py` supports Bybit 1m candles for crypto intraday testing.
- `quant_floor_system.py` now supports `adapter=bybit`.
- `config.json` uses `bybit` for `crypto_cex_public` assets.
- Some older research scripts may still contain Binance references and should be migrated progressively when touched.

## Preferred news stack

Jayse's preferred balanced news-source stack:

| Source | Use |
|---|---|
| Reuters | Fast factual global newswire / raw facts |
| Bloomberg | Market depth, global coverage, analysis; paywalled/free limited articles |
| Financial Times | Macro, policy, global/institutional lens; subscription |
| CoinDesk | Established dedicated crypto coverage |
| The Block | Data/institutional crypto-specific complement to CoinDesk |
| Investing.com | Free daily-driver dashboard, quotes, charts, broad market data and news aggregator |

## Cross-checking rule

Do not rely on a single narrative. Cross-check important stories across source types:

```text
Reuters/AP-style raw facts
+ Bloomberg/FT-style macro/market analysis
+ CoinDesk/The Block crypto-specific reporting
+ Investing.com market/quote dashboard
```

Crypto-native Twitter/Telegram feeds can be useful for discovery but should not be treated as primary evidence due to bias, pump risk, and rumor propagation.

## Research workflow impact

When a strategy depends on news or catalysts:

1. Capture raw headline/source/time.
2. Identify whether it is fact, analysis, rumor, or market commentary.
3. Cross-check at least two source categories before assigning signal weight.
4. Keep news-derived signals separate from price-only backtests unless timestamped news data is available.
