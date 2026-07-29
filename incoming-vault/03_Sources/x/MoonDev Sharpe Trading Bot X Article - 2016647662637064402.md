---
title: MoonDev Sharpe Trading Bot X Article - 2016647662637064402
created: 2026-07-08
updated: 2026-07-08
type: source_summary
tags: [x, quant, trading, market-making, autogpt, sharpe, paper-trading]
sources:
  - 02_Raw/x/2016647662637064402_moondev_article_metadata.json
  - https://x.com/i/status/2016647662637064402
  - https://x.com/i/article/2009591446953943040
confidence: medium
---

# MoonDev Sharpe Trading Bot X Article - 2016647662637064402

## Capture

- Source: X post by Moon Dev / @MoonDevOnYT.
- Status URL: https://x.com/i/status/2016647662637064402
- Article URL: https://x.com/i/article/2009591446953943040
- Captured intent: ingest and extract any alpha.
- Raw metadata file: `02_Raw/x/2016647662637064402_moondev_article_metadata.json`
- Raw metadata sha256: `0452314b5b2f99850e2b57cc02e456a003b5b5adae1b8f77efffb037893f445e`

## Retrieved metadata

- Article title: **How I Engineered a 3.0+ Sharpe Ratio Trading Bot Using AutoGPT and Python**
- Preview text: most traders are currently losing a war against machines without even realizing they are on the battlefield. i spent years throwing money at developers and watching my accounts get liquidated because
- Author: Moon Dev / @MoonDevOnYT
- Tweet text: https://t.co/JI6LO9K65p
- Views: 6676
- Likes: 85
- Bookmarks: 159
- Retweets: 5

## Source limitations

The public X metadata endpoint exposed the article title, preview, author, counts, image, and linked article ID. Full article body was not fully retrievable without additional X article access. Treat the article's 3.0+ Sharpe claim as unverified marketing until replicated.

## Alpha extraction

### Potential useful alpha

1. **Passive maker sleeve, not taker scalping** — the useful idea is not “AutoGPT made a bot”; it is a maker-fee-aware liquidity-provision sleeve where tiny targets only make sense if fees, queue position, and adverse selection are modeled.
2. **Fee-adjusted target formula** — every scalp target must exceed entry fee + exit fee + spread/queue/adverse-selection allowance + desired net profit.
3. **Liquidity-zone placement** — place resting orders near prior-only demand/supply or order-book liquidity, not random mid-price levels.
4. **Daily max-loss circuit breaker** — high-frequency small-edge systems need hard daily stop rules before any paper/live test.
5. **AI as research assistant, deterministic execution only** — AutoGPT/agents can generate hypotheses and code candidates, but execution rules must be fixed, testable, and bias-controlled.

### What our existing work already found

This source is already represented as [[QTF-007 MoonDev Market Maker Sharpe Proxy]]. The original candle proxy found attractive-looking long-only candidates, but order-book replay did **not** confirm the edge:

- naive two-sided maker proxy lost heavily after stops/fees;
- best candle-proxy sweep was long-only, low notional, wider targets/stops;
- public Bybit L2 order-book gate later rejected/revised the strategy because queue/adverse-selection assumptions killed the candle edge.

## Fit decision

- Fit: **Medium**
- Why: strong fit for AI Quant Trading Floor as a research hypothesis and cautionary example; weak as direct actionable alpha because the claim is unverified and our order-book replay did not confirm it.
- Suggested action: keep as research/source evidence, not promotion.
- Destination: [[QTF-007 MoonDev Market Maker Sharpe Proxy]] and [[AI Quant Trading Floor]].

## Next useful test if revisited

Only revisit if we can record much longer Bybit L2 snapshots and test:

- maker queue fill assumptions;
- adverse selection by volatility regime;
- long-only vs two-sided maker behavior;
- spread/fee sensitivity;
- hard daily max-loss response.

## Related

- [[QTF-007 MoonDev Market Maker Sharpe Proxy]]
- [[AI Quant Trading Floor]]
- [[AI Quant Trading Floor Workflow]]
- [[Quant Floor Data and News Sources Policy]]
