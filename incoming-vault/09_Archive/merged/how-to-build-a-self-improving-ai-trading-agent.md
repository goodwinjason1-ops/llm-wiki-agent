---
title: How To Build A Self-Improving AI Trading Agent
created: 2026-07-03
updated: 2026-07-03
type: source-summary
tags: [trading-agent, hermes, self-improvement, quant, youtube]
sources: [https://youtu.be/6njREUQAFdg]
confidence: medium
status: merged
merged_into: "[[How To Build A Self-Improving AI Trading Agent]]"
---
> **Merged into [[How To Build A Self-Improving AI Trading Agent]] on 2026-07-29.**
> Kept for the record. Do not edit — edit the keeper.


# How To Build A Self-Improving AI Trading Agent

## Source

- Video: https://youtu.be/6njREUQAFdg
- Public title found via web search: “How To Build A Self-Improving AI Trading Agent (Insanely Cool)”
- Raw transcript: [[6njREUQAFdg]]

## Core idea

The video describes a trading agent that repeatedly converts a prompt into a strategy, records the outcome, learns from that outcome, writes a better prompt/strategy, and repeats the loop. The strongest useful parts are not the live-trading claims, but the operating model for self-improvement.

## Four criteria for a good trading agent

1. **Accurate** — data, APIs, news interpretation, and scoring must be objective and reliable.
2. **Reliable** — the agent should run on a durable 24/7 system, not depend on a laptop staying awake.
3. **Well-defined goal** — success and failure must be numeric, realistic, and known before optimization starts.
4. **Self-improving** — the agent must learn from outcomes, form hypotheses, test one change at a time, and update the strategy/prompt/process.

## Self-improvement mechanics extracted

- Define success and failure before running the strategy.
- Score every trade/outcome against the goal.
- Record whether each result moved toward or away from the goal.
- Diagnose why the result happened.
- Form a next-step hypothesis.
- Change only one variable per iteration, following the scientific method.
- If a change improves the result robustly, it becomes the new baseline.
- If it worsens the result, revert or archive the branch.
- Organize strategy files, ledgers, metrics, learned parameters, and reviews in a Hermes-readable structure.
- Start with a read-only / review-only first cycle.
- Require human approval before write mode or live mode.
- Run periodic reviews, e.g. weekly strategy reviews and separate parameter-tuning cadence.

## Implementation takeaways for Jayse's AI Quant Trading Floor

The existing [[Self-Improvement Protocol|AI Quant Trading Floor Self-Improvement Protocol]] should be upgraded with:

- accuracy/reliability/goal/self-improvement gates,
- explicit success/failure scorecards,
- one-variable-at-a-time experiment rules,
- baseline promotion/reversion rules,
- read-only first cycle,
- human approval before write/live mode,
- learned-parameters JSON or equivalent artifact,
- periodic review cadence with offset between optimizer and reviewer agents.

## Caution

The video discusses real-money trading, Railway deployment, and agents deciding when a system is ready. In this vault, the safe interpretation is: agents may research, review, backtest, and paper-test. Live trading remains disabled unless Jayse gives explicit, separate approval and risk controls are implemented.
