---
title: Claim Intake
created: 2026-07-29
updated: 2026-07-29
type: concept
tags: [quant, evidence, methodology, validation, ai-business]
sources: [03_Sources/reddit/Reddit AI Trading 10 Percent in 9 Days - Source-Limited Review.md, 03_Sources/youtube/Thinkverse AI Five Claude Side Hustles - Business Context Brain Review.md]
confidence: medium-high
---

# Claim Intake

A standing question set applied to any performance claim before it is allowed to influence a decision. Trading returns, income figures, subscriber counts — the questions differ in wording, not in structure.

## Summary

Most of the material in this vault arrives as a claim: *10% in 9 days*, *$3,000/month client in one week*, *five-figure toolkit sales*. A claim is not evidence, but it is not worthless either — it is a hypothesis with a provenance. Claim intake is the step that converts one into the other, or explicitly declines to.

The vault already does this well in places and not at all in others. The value of naming it is that it becomes checkable.

## The question set

Recorded from a real intake in this vault, generalised:

1. **Was it live, paper, backtest, or demo?** The single highest-value question. Most claims collapse here.
2. **What was the starting capital and position sizing?**
3. **What markets and venues?**
4. **How much leverage?**
5. **What was maximum drawdown during the window?**
6. **How many trades or observations?** A 9-day window is a sample size, not a track record.
7. **Were fees, slippage, funding, spreads and failed orders included?**
8. **Was it benchmarked** against simply holding the obvious alternative over the same window?
9. **Was the window cherry-picked** after a good run?
10. **What did critics say?** Comments and replies are cheap adverse review.

Absent answers, the correct verdict is recorded verbatim in the source note: **"promising observation, not validated edge."**

## Key claims

- A 10% return in 9 days is, by itself, insufficient evidence to trust a trading system — source: `03_Sources/reddit/Reddit AI Trading 10 Percent in 9 Days - Source-Limited Review.md`
- The ten-question intake set was derived in-vault and is reusable — source: `03_Sources/reddit/Reddit AI Trading 10 Percent in 9 Days - Source-Limited Review.md`
- Promotional sources routinely state in their own descriptions that earnings are not guaranteed and most starters earn little or nothing — source: `03_Sources/youtube/Thinkverse AI Five Claude Side Hustles - Business Context Brain Review.md`
- Listing the specific unverified claims by name is more useful than a blanket confidence rating, because it makes each one individually checkable — source: `03_Sources/youtube/Thinkverse AI Five Claude Side Hustles - Business Context Brain Review.md`

## The evidence-boundary section

The strongest source summaries in this vault carry an explicit **Evidence boundary** heading listing what was *not* verified. That habit should be mandatory for any source making a performance or income claim, and it costs about four lines.

It also composes with [[source-limited-capture]]: if the source could not be retrieved, the evidence boundary is the whole note.

## Benchmarking is the neglected question

Question 8 is the one most often skipped and most often decisive. A recorded example from the Quant Floor: TTM-01 returned −0.21% on a holdout where BTC returned −44.7%. Against no benchmark that reads as a loss; against the benchmark it is capital preservation. Neither reading is "edge" — but you cannot tell which conversation you are having without the comparison.

## Links

- Applies: [[independent-reproduction]]
- Composes with: [[source-limited-capture]]
- Governs promotion under: [[edge-class-evaluation]]
- Related: [[llm-built-trading-bot]], [[persistent-context-business]]

## Open questions

- Should `03_Sources` notes with a performance claim be required to carry an `## Evidence boundary` section, checkable by `vault_health.py`?
- What is the intake set for a *capability* claim — "this tool does X" — as opposed to a performance claim?
