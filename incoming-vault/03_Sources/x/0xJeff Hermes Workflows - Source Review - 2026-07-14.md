---
title: 0xJeff Hermes Workflows - Source Review - 2026-07-14
created: 2026-07-14
updated: 2026-07-14
type: source-review
status: ingested-reviewed
author: 0xJeff (@0xJeff on X)
platform: X (Twitter) article
date_published: ~2026-07-13
raw: 02_Raw/x/0xJeff 2 Hermes Workflows - Raw MHT - 2026-07-14.mht
tags: [hermes, workflows, cron, x-search, onchain, alpha-digest, research-pipeline]
---

# Ingestion

Extracted from MHT capture of 0xJeff's X article published ~9:33 PM Jul 13, 2026. 10.3K views at capture time. Author claims 4+ months of consistent daily Hermes use as "a core part of my research & investment workflows."

# What the article describes

## Workflow 1: Daily Grok Alpha Trackers + X Bookmark + Alpha Synthesis

**The problem:** X algorithm burying favourite analysts; too much alpha to track manually.

**The system:**
- Hermes cron jobs track 11+ analysts across macro, equities and crypto
- Summarises posts in 24+ hr timeframe, includes links, delivered to Discord in actionable form tailored to preference/portfolio/strategies
- Separate workflow categorises 5–15 daily bookmarks into 3 tiers (high/medium/low importance)
- Synthesis layer: top-10 alpha digest combining analyst outputs + bookmarks + rotating external sources
- Rotating sources shift Monday–Sunday: arxiv papers, hedge fund letters, onchain flows, derivatives, etc.
- "Everything in Top 10 gets ingested into Hindsight (external memory)" — learnings used to improve next day's context
- "Champion loop + feedback sweep loop" provides continuous daily improvement of format, content and analysis

**Requirements:** Grok/X Premium for x_search, X API v2 for bookmarks, DeepSeek v4 Pro for synthesis, Hindsight for external memory.

## Workflow 2: Onchain Forensics

**The problem:** Understanding token holder concentration, buy/sell patterns and whale movements for onchain holdings.

**The system:**
- 3+ daily workflows tracking main onchain holdings
- Agent checks large whale movements (buy/sell/transfer)
- Flags recurring patterns
- Daily and weekly summaries on holder changes
- Cross-checks with X sentiment
- Contradiction detection: if onchain dumps while X is positive → investigate; if X negative but onchain inflows → somebody accumulating

**Requirements:** x402 via AgentCash & BlockRun, Nansen, BlockRun SQL, Surf, Base RPC, Cookie MCP for X sentiment.

## Bonus: Exa Monitors
- Daily monitoring feature that surfaces meaningful news/signals from diverse sources beyond usual tracking
- Firecrawl has similar but more granular (hourly cadence)

# Positives

1. **Multi-source synthesis with deduplication** is exactly the right architecture for research. Top-10 alpha digest + rotating sources prevents echo chambers.
2. **Tiered bookmark processing** (high/medium/low) is immediately useful — most capture systems are flat.
3. **Contradiction detection** between onchain flow and social sentiment is genuinely interesting signal design. "Onchain dumps, X positive = investigate" is a real edge pattern.
4. **Rotating external sources by day of week** is a smart anti-echo-chamber mechanism. Mon=arxiv, Tue=hedge letters, Wed=onchain, etc.
5. **Memory persistence** (Hindsight ingestion of daily outputs) creates compounding knowledge rather than disposable summaries.
6. **Feedback loop** (champion loop + feedback sweep) for continuous improvement is the right approach to agent quality.
7. **Cron-based architecture** is simple, reliable and auditable — matches our Quant Floor philosophy.
8. **Discord delivery** is practical for the end user rather than requiring a separate dashboard.

# Negatives and risks

1. **No mention of false positive rates** — how often does the onchain/sentiment contradiction actually predict something actionable? Signal without specificity is noise.
2. **"Tailored to my preference/portfolio/strategies"** — no description of how preference targeting works or whether it introduces confirmation bias into the synthesis.
3. **Single-point-of-trust for onchain analysis** — 3+ workflows tracking holdings but no mention of how the agent handles false signals or stale data from Nansen/BlockRun.
4. **No backtesting of the alpha synthesis** — the top-10 digest is described as useful but there's no evidence that the items promoted by the agent outperform a random selection.
5. **"Hindsight" external memory** — no detail on what the memory layer actually does beyond "learnings used to improve context." Could be simple retrieval or could be hallucinating connections.
6. **X API v2 for bookmarks** is increasingly restricted; the workflow may break when X changes API terms.
7. **No mention of cost** — 11+ analyst trackers + 5-15 bookmarks/day + 3 onchain workflows + daily synthesis = significant API/compute cost. Not acknowledged.
8. **Survivorship in the article itself** — 0xJeff says these workflows "have been the most rewarding" but doesn't say what was tried and discarded.
9. **No adversarial testing described** — what happens when an analyst posts misinformation or when onchain data is manipulated?

# Alpha extraction assessment

## Process improvement value (HIGH)

The architecture is directly implementable for our Quant Floor:
- Daily alpha digest from tracked sources
- Rotating external source injection
- Bookmark triage
- Cross-source contradiction detection
- Memory-augmented daily briefings

This improves how we **consume and synthesise** information, not how we generate signals. That is exactly our process-improvement framing.

## Market alpha value (LOW-UNVERIFIED)

The article does not claim or demonstrate profitable alpha from any specific workflow. The onchain forensics approach may detect accumulation/distribution patterns ahead of price moves, but no backtest or hit-rate is provided. Treat as a research hypothesis, not a validated signal.

# Implementation recommendations for the Quant Floor

## Priority 1 — Alpha Digest Pipeline (process improvement)

Create a daily alpha synthesis cron job:
1. Track 5–10 curated sources (Robot James, Miles, Dami-Defi, macro analysts)
2. Summarise and rank by relevance to our paper-trading hypotheses
3. Inject rotating external sources (arxiv, CoinDesk, macro data)
4. Deliver to Telegram as daily briefing supplement
5. Ingest outputs into the vault for cross-session knowledge

This is a pure process-improvement workflow with quantifiable value: time saved reading, better pattern visibility, reduced confirmation bias from rotating sources.

## Priority 2 — Contradiction Detection Module (research)

Build the "X says X but market says Y" pattern detector:
- Compare social/analyst sentiment with actual price/volume/funding action
- Flag contradictions as investigation triggers, not trade signals
- Record contradictions and resolution in the paper ledger
- Evaluate over time whether flagged contradictions lead to useful risk adjustments

## Priority 3 — Memory-Augmented Briefings (process improvement)

Extend the existing daily briefing to:
- Ingest the previous day's briefing outputs into next-day context
- Surface recurring themes across 7/14/30-day windows
- Identify what the agent got wrong last week and what changed

## NOT implementing

- Live onchain holder tracking without paper validation
- Any workflow that automatically adjusts positions based on sentiment/flow contradictions
- External memory providers until the local vault memory is proven sufficient

# Decision

File as **process-improvement reference** for the Quant Floor alpha-extraction and alpha-digest pipeline. The architecture is sound, the workflow design is practical, and the contradiction-detection pattern is worth paper-testing. No market-entry alpha claims are accepted from this source.
