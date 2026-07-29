---
title: QTF-011 Political Disclosure Copy Trading Delay Edge
created: 2026-07-08
updated: 2026-07-08
type: quant-strategy
status: research
markets: [us-equities, etfs]
timeframes: [daily, weekly]
tags: [quant, politicians, disclosures, equities, paper-trading, compliance]
sources:
  - 02_Raw/youtube/transcripts/Rh_TviVt3Vo.md
confidence: low
---

# QTF-011 Political Disclosure Copy Trading Delay Edge

## Source

Cap 3: `I Let Claude Fable AI Trade to Copy US Politicians' Trades | INSANE Results`.

## Fit

**Medium.** Interesting as a public-disclosure anomaly research idea, but dangerous if treated as instant-copy alpha. US political disclosures can be delayed up to ~45 days, so naive copying may buy late.

## Hypothesis

Some politicians or committees may have persistent sector/security selection skill. The research question is not "copy every trade" but:

```text
Do disclosed trades from selected politicians outperform sector/market benchmarks after publication delay, costs, and risk controls?
```

## Required clean-room implementation

1. Pull public disclosure feed only.
2. Normalize disclosed trade date, filing date, ticker, amount bucket, transaction type.
3. Enter only after the public filing date, never assumed transaction date.
4. Compare against SPY/QQQ/sector ETF and random same-sector/date controls.
5. Track holding windows: 5d, 20d, 60d, 120d.
6. Exclude illiquid options/unknown derivatives unless data is clean.

## Alpha checks

- Politician-level ranking must be out-of-sample.
- Control for mega-cap beta and sector momentum.
- Avoid cherry-picking Pelosi-style examples.
- Include filing delay distribution.
- Paper-only unless Jayse explicitly approves a scoped live action.

## Verdict

Proceed only as a **paper research lab**. Potential edge is plausible but likely mostly momentum/sector exposure plus survivorship bias unless proven otherwise.

## Related

- [[AI Quant Trading Floor]]
- [[QTF-008 EMA Momentum Baseline and Volatility Overlay]]
- [[Quant Floor Data and News Sources Policy]]
