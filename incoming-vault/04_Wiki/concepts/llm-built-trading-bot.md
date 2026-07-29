---
title: LLM-Built Trading Bot
created: 2026-07-29
updated: 2026-07-29
type: concept
tags: [quant, ai-agent, trading-bot, evidence, youtube]
sources: [03_Sources/youtube/How To Build A Self-Improving AI Trading Agent.md, 03_Sources/youtube/I Built an AI Trading System From a Trader's YouTube Videos.md, 03_Sources/x/MoonDev Sharpe Trading Bot X Article - 2016647662637064402.md, 03_Sources/reddit/Reddit AI Trading 10 Percent in 9 Days - Source-Limited Review.md]
confidence: medium
---

# LLM-Built Trading Bot

The single most-captured genre in this vault: a video or post demonstrating an LLM writing, backtesting and running a trading strategy. Roughly fifteen source summaries describe variants of it.

## Summary

The genre is consistent enough to describe once. An LLM is given market data access and a goal, writes a strategy, backtests it, reports a favourable result, and iterates. Demonstrations are compelling because the loop is real — the model genuinely writes and runs code.

What the genre almost never shows is the part this vault has spent months on: what happens when the same strategy meets realistic costs, next-bar execution, a chronological holdout, and parameter jitter.

## The gap, measured in this vault

This is the concept's whole reason to exist. Set the captured claims against the reproduced results:

| Source genre claims | This vault's reproduced results |
|---|---|
| Favourable backtest, promising Sharpe | **Every sleeve tested: `do_not_promote`** |
| Iterating improves the strategy | V07 → costed V07: jitter survival fell 38.0% → 15.4% once *actual* funding payments replaced the proxy |
| The edge is the signal | "Most apparent edge is price reversal, not funding carry" |
| Robustness implied | V04B 38.5%, V07 38.0%, costed V07 15.4% survival — all below the 60% gate |

That is not evidence the genre is fraudulent. It is evidence that **the demo stops exactly where the hard part starts**, and that the hard part is where edges die. See [[independent-reproduction]].

## What is genuinely worth taking

Not the strategies — the operating model. From the strongest source in the cluster:

- Define success and failure numerically **before** running the strategy
- Score every outcome against that definition
- Change **one variable per iteration**, following the scientific method
- If a change improves results robustly it becomes the new baseline; if not, revert or archive the branch
- Start read-only, require human approval before write or live mode

## Key claims

- Four criteria for a good trading agent: accurate, reliable, well-defined goal, self-improving — source: `03_Sources/youtube/How To Build A Self-Improving AI Trading Agent.md`
- The strongest useful parts are the operating model for self-improvement, not the live-trading claims — source: `03_Sources/youtube/How To Build A Self-Improving AI Trading Agent.md`
- Change only one variable per iteration — source: `03_Sources/youtube/How To Build A Self-Improving AI Trading Agent.md`
- MoonDev-style claims require order-book/replay validation before they can be assessed — source: `03_Sources/x/MoonDev X Video Realism Review - 2071013205590331667.md`
- The genre's demonstrations end before costs, holdout and jitter testing, which is where this vault's sleeves have consistently failed ^conf:medium — our inference from the vault's own `do_not_promote` record, not a claim made by any source

## How to ingest one of these

1. Run [[claim-intake]] on the performance claim. Expect it to fail question 1.
2. Extract the **method**, not the strategy — the loop, the gates, the file layout.
3. Record the strategy as a hypothesis for [[edge-class-evaluation]], classified by edge class.
4. Do not add another sleeve unless it differs structurally from one already tested.

Point 4 matters. Fifteen captures of the same genre have produced strategies that fail the same gates in the same way. Capturing a sixteenth is not research.

## Links

- Validated by: [[claim-intake]], [[independent-reproduction]]
- Classified by: [[edge-class-evaluation]]
- Constrained by: [[survival-sizing]], [[gentle-rebalancing]]
- Method related: [[self-improvement-loop]]
- Alternative framing: [[risk-premia-before-prediction]] — the genre is almost entirely prediction-class

## Open questions

- Is there a single source in this cluster whose strategy was reproduced to the weak form (rules obtained, result reproduced)? If not, that is worth recording explicitly.
- What would a capture in this genre need to show for it to change a decision here? Writing that down would make the next fifteen captures cheaper to triage.
