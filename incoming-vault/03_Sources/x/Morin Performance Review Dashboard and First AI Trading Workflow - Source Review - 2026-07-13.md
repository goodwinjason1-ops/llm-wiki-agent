---
title: Morin Performance Review Dashboard and First AI Trading Workflow - Source Review - 2026-07-13
created: 2026-07-13
updated: 2026-07-13
type: source-summary
status: consolidated-ingested-exact-mht-and-image
capture_note: Cap 3 duplicates/consolidates the already ingested “Stop using AI to trade. Do this instead.” MHT capture; no duplicate raw source created.
source_author: Trader Morin
source_urls:
  - https://x.com/i/article/2051590734726436864
  - https://x.com/i/article/2051590734726436864
raw_sources:
  - 02_Raw/x/Morin Stop Using AI To Trade Process Workflow Extract - 2026-07-13.txt
  - 02_Raw/x/Morin First AI Workflow Every Trader Should Build Extract - 2026-07-13.txt
image_source: C:/Users/Kidsg/AppData/Local/hermes/cache/images/img_8d98e769ac9e.jpg
tags: [trading-process, performance-review, journaling, ai-assisted-research, paper-only]
---

# Ingestion result

Two MHT captures were extracted and preserved, together with the attached infographic. The MHT extracts contain the readable X article text; the source is social-media commentary and personal workflow material, not independently verified evidence of profitability.

## Source 1: Stop using AI to trade. Do this instead.

Core warning: if a trader lacks a strong foundation, AI will not make them profitable. The recommended use is to streamline the trading process rather than ask AI to trade autonomously.

The stated foundation includes:

- Defined market context.
- Trading playbooks.
- Execution playbooks.
- Feedback loop.
- Rules for setup identification.
- Rules for execution.
- Rules for closing trades.
- Rules for sizing.

The source permits demo-account experimentation for familiarity, but does not support treating bots as a shortcut to profitability.

## Source 2: The First AI Workflow Every Trader Should Build

The article presents a five-part process:

### 1. Market Outlook

- Weekly bias.
- Daily bias.
- Pro-trend or counter-trend orientation.
- Setups on radar and intended business price.
- High-impact macro data.
- Key levels such as swing highs/lows and supply/demand zones.
- TPO/composite inefficiencies as secondary location/confluence, not a standalone strategy.

### 2. Daily Focus List

- Monthly and weekly process goals rather than PnL goals.
- Daily tasks aimed at improving the process.
- Examples include journaling all trades, dynamic risk, and avoiding profit round-trips.

### 3. Trade Plan

- Trade ID and checklist completion.
- Environment classification: ranging or trending.
- Position size and risk amount with an explicit “Why?” for entry, stop and risk.
- Confluences and an opposing-case challenge to avoid overrating an A* setup.

### 4. Trade Execution

- Setup checklist at execution time.
- Execution-pattern tags.
- Entry/exit and scale-in details.
- Separate trading playbooks from execution playbooks.

### 5. Trade Closure

- Thoughts and emotions during the trade lifecycle.
- Post-trade review of plan adherence.
- What worked well.
- Mistakes tagged by lifecycle phase: execution, management or closure.
- Identify root causes and process changes.

## Infographic: four-prompt performance review dashboard

The attached image proposes:

1. **Core build request:** create a dynamic, customisable dashboard for weekly/monthly reviews that saves information and spots patterns. Weekly questions: what went well, what was difficult, and how to improve next week. Monthly questions: best/worst setups, common mistakes and process adjustment.
2. **Load the framework:** preload actual setups and group mistake tags by lifecycle phase: Execution, Management and Closure.
3. **Demand pattern detection:** flag tags repeated across two or more periods as active streaks, show a punch-card grid of tags by week and score each setup best versus worst by month with a net score.
4. **Close the loop with AI:** add an analysis action that sends saved reviews to the model and returns the three to five strongest patterns, especially contradictions between improvement plans and later behaviour.

Prompting guidance in the image:

- Ask explicitly for persistent storage.
- Ask for editable questions and tags.
- Save using week/month labels so reviews can be overwritten cleanly.
- Screenshot broken behaviour back to the model for debugging.

The image claims fixed questions plus fixed tags produce comparable data, streaks surface without rereading old notes, setup scorecards show what to cut, and AI can identify contradictions in the trader’s own words. These are plausible workflow benefits but require testing; they are not performance evidence.

# Quant Floor adaptation

Adopt the workflow as a **Performance Review and Process-Learning layer**, not as a signal generator or execution system.

## Safe architecture

```text
Paper trade/event ledger
→ structured trade and lifecycle tags
→ weekly review
→ monthly review
→ streak/contradiction analysis
→ human review board
→ bounded process change
→ next paper-test cycle
```

## Required controls

- Append-only raw trade records; corrections create amendments rather than silently changing history.
- Separate observed facts, trader reflections and model-generated hypotheses.
- No model-generated trade automatically changes a strategy, risk limit or alert.
- No PnL goal optimisation from the dashboard.
- Preserve setup definitions and tag dictionaries by version.
- Keep strategy performance separate from trader execution/process performance.
- Apply minimum sample thresholds before interpreting streaks or setup scores.
- Use out-of-sample and walk-forward testing for any strategy/process change.
- Treat contradictions as review prompts, not proof of psychological causation.

## High-value additions for our Quant Floor

- A “planned vs observed” contradiction table.
- Lifecycle-phase error attribution.
- Setup/strategy scorecard with sample count and uncertainty fields.
- Weekly/monthly process-goal tracker.
- Paper-only action queue generated from reviews.
- Review-board decision record for every promoted process change.

## Not adopted from the source without modification

- “Net score” without sample size, costs and uncertainty.
- Automatic persistent memory without versioning and audit history.
- Sending full journals to a model without redaction/data-minimisation review.
- Treating repeated tags as causal explanations.
- Treating a dashboard as evidence that a strategy has edge.
