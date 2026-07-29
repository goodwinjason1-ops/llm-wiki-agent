---
title: QTF Edge-First Production Mandate
created: 2026-07-14
updated: 2026-07-14
type: workflow
status: active
confidence: high
---

# Purpose

The Quant Floor exists to identify trades that satisfy pre-defined, economically plausible edges, test them rigorously, learn from the results, and move qualifying strategies toward paper production as quickly as responsibly possible.

It is not a general market-research feed and must not become a collection of arbitrary asset observations.

# Controlling rule

Every Quant Floor task must answer:

1. **Which identified edge does this test belong to?**
2. **What exact trade rule is being tested?**
3. **What data and execution assumptions are required?**
4. **What benchmark and costs apply?**
5. **What result would justify the next production step?**
6. **What result would kill or pause the hypothesis?**

If those questions cannot be answered, the item remains source context only and does not enter the active trading queue.

# Active edge families and allocation sleeves

> An **edge family** is a testable source of expected return. An **allocation sleeve** is a portfolio component used to diversify risk and weight capital across validated edge families; it is not automatically an edge itself.

## 1. Tactical trend and momentum

Test cross-sectional and time-series momentum, regime alignment, breakout continuation and volatility-scaled allocation. Current strongest direction: daily tactical multi-asset momentum, benchmarked against cash, buy-and-hold and simple trend controls.

## 2. Carry and funding

Test persistent funding, spot/perpetual basis and other clearly sourced carry. Include funding flips, fees, slippage, liquidation distance, capacity and tail risk. CASHCAT and Hyperliquid funding work belong here.

## 3. Forced-flow and liquidation response

Test whether liquidation clusters, open-interest shocks, funding extremes and volume/price disagreement predict continuation or reversion over a defined horizon. MoonDev-style claims are hypotheses for this sleeve, not evidence.

## 4. Mean reversion

Test rule-defined overshoot, volatility-band, event-shock and residual reversion with trend-strength gates and hard risk controls. A high win rate is irrelevant if expectancy disappears after costs.

## 5. Relative value and same-function pairs

Test economically related protocol pairs as one relative-value sleeve. The current HYPE/DYDX/LIT and AAVE/MORPHO candidates are a universe for testing, not a thesis or allocation.

## 6. DeFi and market-making research

Test DeFi and market-making hypotheses only as explicit, executable edge rules. DeFi yield, TVL, incentive or token observations are source context, not an edge; market-making requires fill-conditioned adverse-selection and inventory-economics evidence.

## 7. ETF diversification sleeve and cross-sleeve capital allocation

The ETF sleeve is a **diversification and stability component**, not a standalone edge claim. Its job is to broaden the opportunity set and support measured capital weights between more stable ETF exposure and validated crypto-edge sleeves. A future allocation scorecard must use comparable net return, drawdown/tail risk, liquidity, capacity, correlation, evidence quality, implementation complexity and reserve requirements. It must not use static weights, synthetic priors or asset-class preference.

# Production path

```text
identified edge
→ exact rule card
→ verified public data
→ naive and benchmark controls
→ realistic cost/risk model
→ in-sample diagnosis
→ walk-forward and held-out test
→ RST/Monte Carlo/jitter/DSR review
→ paper alerts
→ forward paper sample
→ explicit promotion review
```

# Priority and capital allocation

The sleeves are parallel opportunity buckets, not a permanent hierarchy. The best current opportunity may come from crypto trend, funding-rate extremes, forced-flow, relative value, DeFi, market making, an ETF tactical implementation, prediction markets, precious metals or another approved universe.

Research should rank opportunities using current evidence, not asset-class preference. The allocation layer then decides how much capital each approved sleeve receives, subject to:

- expected risk-adjusted return;
- drawdown and tail-risk estimates;
- confidence and evidence quality;
- liquidity and capacity;
- correlation and concentration;
- implementation complexity;
- capital lock-up and operational risk; and
- minimum cash/reserve requirements.

The goal is broad opportunity coverage without spreading capital so thinly that the strongest edges become ineffective. Research expands the investable universe; allocation determines where capital goes.

A sleeve can be inactive when no candidate passes its gates, and a lower-frequency sleeve can outrank a higher-frequency sleeve when its current expected risk-adjusted return is superior.

# Kill rules

Pause or reject a test when:

- it is only an asset observation with no rule;
- the edge is not economically plausible;
- costs remove expectancy;
- results depend on one period, one asset or one parameter choice;
- drawdown is not manageable for the proposed return;
- data provenance or execution assumptions are missing;
- it cannot produce a paper-monitorable signal.

# Boundaries

No live trading, private exchange access, wallet access or autonomous promotion is enabled. Research may move quickly; production approval remains evidence-gated.
