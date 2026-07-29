---
title: QTF Alpha Digest Pipeline Contract - 2026-07-14
created: 2026-07-14
updated: 2026-07-14
type: implementation-contract
status: queued-for-implementation
owner: Quant Floor
inspiration: 0xJeff Hermes Workflows
related: [[0xJeff Hermes Workflows - Source Review - 2026-07-13]]
tags: [alpha-digest, cron, synthesis, multi-source, process-improvement]
---

# Objective

Implement a daily multi-source alpha synthesis pipeline that:
1. Tracks curated sources (Robot James, Miles, Dami-Defi, macro analysts)
2. Tier-bookmarks and summaries by relevance to paper-trading hypotheses
3. Injects rotating external sources to prevent confirmation bias
4. Delivers to Telegram as daily brief supplement
5. Ingests into vault for cross-session knowledge accumulation

# Source Categories

## Priority 1 (daily tracking)
- Robot James Method Library (crypto pairs, forced flow)
- Miles (market structure, regime detection)
- Dami-Defi (DeFi protocols, funding rates)
- Morin (trading psychology, performance review)

## Priority 2 (weekly rotation)
- Macro analysts (Fed policy, cross-asset correlation)
- Crypto on-chain (Glassnode, CryptoQuant summaries)
- Traditional quant (arxiv papers, hedge fund letters)

## Rotating external sources (day-of-week)
- Monday: arxiv quantitative finance
- Tuesday: hedge fund letters/earnings calls
- Wednesday: on-chain flows
- Thursday: derivatives data
- Friday: contrarian takes (Reddit, Twitter dissent)

# Tier System

## High relevance
- Directly addresses paper-trading hypotheses
- Provides testable signals or filters
- Relates to active research contracts (QTF-023, performance review)

## Medium relevance
- General market context
- Useful for future research
- Educational value

## Low relevance
- Entertainment
- Already captured elsewhere
- Outdated information

# Synthesis Output

Daily digest structure:
1. **Top 10 highlights** (ranked by relevance to active hypotheses)
2. **Contradiction flags** (where on-chain ≠ sentiment, or where sources disagree)
3. **New research questions** surfaced from synthesis
4. **Vault ingestion** (key insights added to relevant project notes)

# Delivery

- Telegram channel: daily at 09:00 Melbourne time
- Format: Markdown with source links
- Archive: Save to `02_Raw/digests/YYYY-MM-DD-digest.md`

# Implementation Phases

## Phase 1: Source Tracking (MVP)
- [ ] Create cron job to fetch from 5 priority sources
- [ ] Implement basic summarization (no tiering yet)
- [ ] Deliver to Telegram daily
- [ ] Manual review for first week

## Phase 2: Tiering and Rotation
- [ ] Add relevance scoring based on active hypotheses
- [ ] Implement rotating external sources
- [ ] Store digests in vault
- [ ] Track which digests led to actionable insights

## Phase 3: Contradiction Detection
- [ ] Cross-reference on-chain signals with social sentiment
- [ ] Flag disagreements as investigation triggers
- [ ] Record contradictions in paper ledger
- [ ] Evaluate whether contradictions predict regime changes

## Phase 4: Memory Augmentation
- [ ] Ingest previous day's digest into next day's context
- [ ] Surface recurring themes across 7/14/30-day windows
- [ ] Identify agent errors and what changed
- [ ] Build "compounding knowledge" layer

# Success Metrics

- Time saved reading (target: 50% reduction in daily research time)
- Pattern visibility (can we identify recurring themes?)
- Contradiction accuracy (do flagged contradictions lead to useful risk adjustments?)
- Knowledge retention (are insights available across sessions?)

# Gates

## Paper-only
- This is process improvement, not signal generation
- No automatic trading decisions
- All outputs are information, not instructions

## Review board approval
- Before any contradiction detection affects risk parameters
- Before any automated synthesis influences strategy selection

# NOT Implementing
- Live execution based on digest signals
- Automatic risk adjustments from contradictions
- External memory providers until vault approach is validated

# Decision

Queued for implementation. Start with Phase 1 MVP (source tracking + basic summary) within 2 weeks. Validate process improvement before adding complexity.
