---
title: QTF-024 Contradiction Detection Research Contract - 2026-07-14
created: 2026-07-14
updated: 2026-07-14
type: research-contract
status: queued-for-research
owner: Quant Floor
inspiration: 0xJeff on-chain forensics workflow
related: [[0xJeff Hermes Workflows - Source Review - 2026-07-13]], [[QTF Alpha Digest Pipeline Contract - 2026-07-14]]
tags: [contradiction-detection, on-chain, sentiment, process-improvement, risk-management]
---

# Hypothesis

Contradictions between on-chain flow data and social sentiment predict regime changes or provide useful risk-management signals.

**Specific patterns to test:**
- "On-chain shows accumulation but X/Twitter sentiment is negative" → someone knows something not yet public
- "On-chain shows distribution but X sentiment is positive" → potential pump-and-dump or exit liquidity
- "Funding rates diverge from spot flow" → structural imbalance, potential mean-reversion opportunity

# Research Question

Can we detect meaningful contradictions, and do they:
1. Predict price regime changes (within 24-72 hours)?
2. Provide useful risk-adjustment signals (should we reduce exposure when contradiction detected)?
3. Occur frequently enough to be actionable (at least weekly)?

# Data Sources

## On-chain signals
- Whale wallet movements (accumulation/distribution patterns)
- Exchange inflows/outflows (Netflow to exchanges)
- Funding rates (perpetual futures)
- Open interest changes

## Social sentiment
- X/Twitter: influencer posts, sentiment scores from NLP
- Telegram: group activity, message volume
- Reddit: discussion volume, sentiment

## Contradiction definition
A "contradiction" occurs when:
- On-chain flow direction opposes prevailing social sentiment direction
- Funding rate sign differs from spot accumulation/distribution pattern
- Whale activity diverges from retail narrative

**Example:**
- On-chain: Large wallets accumulating BTC (exchange outflow)
- Social: Negative sentiment, "sell the news" narrative
- Contradiction: Smart money buying while retail fear

# Implementation

## Phase 1: Pattern cataloging (research only)
- [ ] Define contradiction taxonomy
- [ ] Build data collection (on-chain + sentiment APIs)
- [ ] Identify historical contradictions (backtest window)
- [ ] Record each contradiction in structured format:
  - Timestamp
  - On-chain signal
  - Sentiment signal
  - Contradiction type
  - Resolution (what happened in next 72 hours?)

## Phase 2: Statistical evaluation
- [ ] Calculate hit rate: what percentage of contradictions predicted regime changes?
- [ ] Measure lead time: did contradictions appear 24-72 hours before moves?
- [ ] False positive rate: how often were contradictions "noise"?
- [ ] Regime specificity: do contradictions appear in all regimes, or only certain ones?

## Phase 3: Risk-management integration
- [ ] If hit rate >60%, test as risk-adjustment signal
- [ ] Paper-trade: when contradiction detected, reduce position size by 25%
- [ ] Track whether risk adjustment improved risk-adjusted returns
- [ ] Evaluate: did we avoid drawdowns or miss opportunities?

## Phase 4: Quant Floor integration
- [ ] Add contradiction detection to daily alpha digest
- [ ] Flag high-confidence contradictions as investigation triggers
- [ ] Never automatic execution—always requires review board approval

# Success Criteria

## Minimum viable signal
- Hit rate: >55% of contradictions predict regime change within 72 hours
- Frequency: at least 2-3 contradictions per week across major pairs
- Lead time: contradictions appear 24+ hours before price moves

## Risk-adjustment value
- Paper-trading with contradiction-based risk reduction shows improved Sharpe ratio
- Reduction in maximum drawdown when contradictions flagged

## Failure conditions
- Hit rate <50% (no predictive value)
- Contradictions too frequent (>10/day = noise)
- No measurable improvement in risk-adjusted returns

# Gates

## Paper-only
- No live execution based on contradiction signals
- Research phase only until Phase 3 validated

## Review board approval
- Before any live risk adjustments
- Before signal affects strategy selection

## Adversarial testing
- What if manipulation creates false contradictions?
- What if data sources lag (on-chain data delayed)?
- What if sentiment analysis misclassifies tone?

# NOT Implementing
- Automatic trading on contradiction signals
- Real-time position adjustments before paper validation
- Public disclosure until backtest validated

# Decision

Queued for research. Phase 1 (pattern cataloging) should run for 30 days minimum to establish baseline. Evaluate statistical significance before proceeding to Phase 2.
