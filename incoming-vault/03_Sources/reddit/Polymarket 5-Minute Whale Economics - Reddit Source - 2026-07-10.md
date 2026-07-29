---
title: Polymarket 5-Minute Whale Economics - Reddit Source - 2026-07-10
created: 2026-07-10
updated: 2026-07-10
type: source-capture
status: captured
source_platform: Reddit
source_confidence: medium-high
privacy: personal
url: https://www.reddit.com/r/PredictionsMarkets/s/P0PRqFwudV
resolved_candidate: https://www.reddit.com/r/Polymarket/comments/1un85mg/i_spent_7_months_testing_every_strategy_on/
tags: [reddit, polymarket, whales, market-making, execution, qtf]
---

# Polymarket 5-Minute Whale Economics — Reddit Source

## Access note

The supplied Reddit short-share URL returned HTTP 403 through anonymous/Jina access. Agent Reach's documented OpenCLI/login-backed Reddit search recovered the post below, whose title and subject exactly match Jayse's description. Treat the resolved mapping as **medium-high confidence**, not cryptographic proof of the short-link redirect.

## Matched post

**Title:** I spent 7 months testing every strategy on Polymarket's 5-min crypto markets — 1.7M candles + 4,600 real windows. Here's what actually moves the needle, and how the whales really make money

**Author:** `u/Roxas-M33`

**Post ID:** `1un85mg`

**Canonical URL:** https://www.reddit.com/r/Polymarket/comments/1un85mg/i_spent_7_months_testing_every_strategy_on/

## Author's central claims

- Tested approximately 1.7 million candles and 4,600 resolved five-minute windows.
- Five-minute directional prices are highly calibrated; apparent momentum/lag/favorite-side edges generally disappear after real fees and fills.
- Near 50 cents, taker fees create a material hurdle, while makers pay no trading fee.
- Real execution is substantially worse than idealized backtests: partial/no fills, 2–10 cent degradation, spread crossing, and balance/allowance races.
- Maker orders suffer adverse selection: fills occur disproportionately when the quote has become stale or unfavorable.
- Large profitable wallets are described as supply-side operators rather than superior direction forecasters.
- Claimed whale mechanisms:
  - split collateral into both outcome tokens;
  - quote/sell both legs;
  - buy both legs below one dollar and merge;
  - collect maker rebates/liquidity rewards;
  - operate at large scale with automation, inventory and rapid flattening.
- A faint possible hypothesis was fading extended moves, but the author explicitly says it has not survived real maker-fill/adverse-selection validation.

## Key quoted idea

> The money in these markets is made on the supply side — spread, rebates, split/merge mechanics and scale — rather than by simply guessing direction.

## Comments worth preserving

- A commenter correctly asks whether `YES ask + NO ask + taker fees + realistic slippage < $1` ever survives real simultaneous execution.
- Another notes that UI/taker latency creates an additional disadvantage versus lower-latency market-maker infrastructure.
- The author warns that backtests assuming instant fills at observed prices are misleading and recommends forward testing with real fill constraints.

## Official cross-check sources

- Fees: https://docs.polymarket.com/trading/fees
- Liquidity rewards: https://docs.polymarket.com/developers/market-makers/liquidity-rewards
- Split tokens: https://docs.polymarket.com/developers/CTF/split

## Limitations

- The claimed datasets, code, wallet attribution and calculations were not linked in a reproducible package in the accessible post.
- This capture is a source record, not an endorsement or proof of profitability.

## Wiki concepts

Synthesised from this source:

- [[claim-intake]]
