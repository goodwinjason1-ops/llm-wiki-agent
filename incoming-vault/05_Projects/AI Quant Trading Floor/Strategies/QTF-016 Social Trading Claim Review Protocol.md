---
title: QTF-016 Social Trading Claim Review Protocol
created: 2026-07-08
updated: 2026-07-08
type: quant-strategy
status: workflow-spec
markets: [multi-asset]
timeframes: [intraday, swing]
tags: [quant, reddit, x, claim-review, paper-trading, risk]
sources:
  - 03_Sources/reddit/Reddit AI Trading 10 Percent in 9 Days - Source-Limited Review.md
confidence: medium
---

# QTF-016 Social Trading Claim Review Protocol

## Purpose

Turn social posts claiming strong AI-trading results into structured evidence reviews before they influence Jayse's AI Quant Floor.

## Trigger

Use this when a Reddit/X/YouTube/Discord post claims:

- high return over a short window;
- AI bot performance;
- “autonomous” strategy success;
- a public screenshot without full methodology;
- a friend's system worth reviewing.

## Claim card schema

```text
source_url
source_platform
author
claim_return_pct
claim_period_days
capital_base
market
venue
live_or_paper
strategy_family
trade_count
win_rate
profit_factor
max_drawdown_pct
max_intraday_drawdown_pct
leverage
fees_included
slippage_included
funding_included
benchmark_symbol
benchmark_return_same_period
evidence_type
comment_objections
reproducibility_status
review_verdict
next_test
```

## Review checklist

- [ ] Separate source claim from our inference.
- [ ] Save raw post/comment evidence where accessible.
- [ ] Identify whether performance is live, paper, backtest, or screenshot-only.
- [ ] Compare against simple benchmarks over the same exact window.
- [ ] Require fees, slippage, spread, funding, and failed-order assumptions.
- [ ] Measure drawdown and tail risk, not just return.
- [ ] Check if leverage explains most of the result.
- [ ] Look for cherry-picked windows or survivorship bias.
- [ ] Extract skeptical comments as adversarial review input.
- [ ] If promising, create a paper-only replay/backtest task.

## Verdict classes

| Verdict | Meaning | Action |
|---|---|---|
| `lead-only` | Interesting but insufficient evidence | Save and revisit later |
| `paper-replay` | Enough rules/evidence to test | Build replay/backtest |
| `reject` | Clear flaw, unverifiable, dangerous, or too much leverage | Archive lesson |
| `monitor` | Could be tracked forward without execution | Add paper/watch ledger |
| `promote-review` | Strong evidence after tests | Human review board only |

## Guardrail

Social proof is not strategy proof. A 10% short-window result can be luck, leverage, regime beta, or cherry-picking. It becomes useful only after reproducible testing and forward evidence.

## Related

- [[AI Quant Trading Floor]]
- [[Reddit AI Trading 10 Percent in 9 Days - Source-Limited Review]]
- [[Self-Improvement Protocol|AI Quant Trading Floor Self-Improvement Protocol]]
