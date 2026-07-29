---
title: Robot James Method Library - Caps 1 to 9
created: 2026-07-11
updated: 2026-07-11
type: source-synthesis
status: reviewed-actionable-research
priority: high
tags: [robot-james, quant, pairs-trading, forced-flows, risk-premia, rebalancing, volatility]
confidence: medium-high
sources:
  - https://robotjames.substack.com/p/three-dead-simple-edges-in-macro
  - https://robotjames.substack.com/p/a-dirty-long-vol-vix-trade
  - https://robotjames.substack.com/p/trading-to-stay-alive
  - https://robotjames.substack.com/p/crypto-violence-and-the-gentle-rebalancing
  - https://robotjames.substack.com/p/pairs-trading-for-dickheads
  - https://robotjames.substack.com/p/a-complete-temu-pairs-trading-strategy
  - https://robotjames.substack.com/p/how-to-make-money-as-a-random-dickhead
  - https://robotjames.substack.com/p/three-types-of-systematic-trading
  - https://robotjames.substack.com/p/the-best-places-to-get-trading-ideas
---

# Robot James Method Library — Caps 1 to 9

> A sequential, detail-preserving collation of Jayse's Robot James captures and Ari's analysis. This is a research library, not financial advice or live-trading approval.

## Reading notes and evidence boundary

- Nine distinct articles were supplied; the label **Cap 8** was accidentally used twice, so the sequence is normalized to **1–9**.
- Source statements are separated from **our interpretation and proposed use**.
- Several articles are paid. Where the public extract stops, missing rules are explicitly marked **unknown/paywalled** rather than reconstructed.
- Claimed backtests are author-reported unless we reproduce them with independent data, realistic costs and next-bar execution.
- Everything remains research, backtest, paper or testnet-only under [[AI Quant Trading Floor]].

## Executive conclusion

Robot James is highly useful to us—not because every shared rule should be copied, but because he supplies a coherent **market-cause-first operating system**:

1. Assume liquid markets are roughly fair most of the time.
2. Prefer easy games: diversified risk premia before heroic prediction.
3. Look for forced, constrained or price-insensitive participants.
4. Distinguish temporary technical dislocations from informed repricing.
5. Compare genuinely similar assets and normalize predictable differences.
6. Trade gently; forecasts usually evolve continuously, so exposures should too.
7. Size leveraged and short positions to survive adverse movement and volatility expansion.
8. Judge strategies according to their edge class, not through one generic backtest.
9. Independently reproduce borrowed ideas and continually mine live/paper results for anomalies.

The highest-priority implementation candidate is a **public-data crypto pairs research sleeve** enhanced with forced-flow classification, funding/borrow costs, two-leg execution costs and hard risk gates. The risk doctrine should apply across every Quant Floor strategy.

---

# Cap 1 — Three Dead Simple Edges in Macro ETFs

Source: [Three Dead Simple Edges in Macro ETFs](https://robotjames.substack.com/p/three-dead-simple-edges-in-macro)

## Source thesis

Forced flows occur when a participant must trade regardless of price. Robot James illustrates this with a short position that doubles in notional as price doubles: risk becomes larger than intended, so covering becomes compulsory. Forced trades can temporarily distort prices.

A mundane institutional version is portfolio rebalancing. In a 60/40 stock/bond portfolio, if stocks outperform bonds, the stock weight becomes too large. The manager must sell stocks and buy bonds to restore the target. Much of wealth management behaves similarly, often around month end.

## Publicly specified Strategy 1

1. On trading day 15 of each month, calculate month-to-date returns for SPY and TLT.
2. If SPY MTD return is greater than TLT MTD return, go long TLT on the next trading day.
3. If TLT MTD return is greater than SPY MTD return, go long SPY on the next trading day.
4. Hold until month end.

Day 15 is not presented as special or optimized. It is a blunt proxy for being long the asset into which balanced portfolios are likely to rebalance.

## Unknown/paywalled details

The article promises two additional SPY/TLT ideas, but their exact rules are not visible in the public extract. Their chart images are not sufficient evidence to infer the rules. We should not claim to possess Strategies 2 and 3.

## Our assessment

This is plausible because it has a specific price-insensitive participant, direction and calendar window. It is more credible than a calendar anomaly with no causal explanation.

Risks:

- the effect may already be anticipated;
- actual institutions rebalance on different schedules and tolerance bands;
- SPY/TLT behaviour changed across inflation/rate regimes;
- close/open assumptions can materially change results;
- a single pair and monthly observations produce a small sample;
- the rule may be sensitive to dividends, adjusted prices and trading-day definitions.

## Proposed use

Create a small macro-flow research sleeve and test:

- next-day open and next-day close entries;
- adjusted versus unadjusted prices;
- day 13–17 perturbations without selecting the best after seeing results;
- pre- and post-2008, zero-rate, inflation-shock and recent regimes;
- realistic ETF spreads/fees;
- comparison with always-SPY, always-TLT, 60/40 and random-month controls.

Status: **testable; not yet independently validated**.

---

# Cap 2 — A Dirty Long-Vol VIX Trade

Source: [A Dirty Long-Vol VIX Trade](https://robotjames.substack.com/p/a-dirty-long-vol-vix-trade)

## Source thesis

VIX futures and ETPs have attractive features for relative-value research:

- high volatility and positive skew;
- concentrated, sticky customer positioning;
- predictable underreaction or overreaction caused by lopsided flows.

The article argues that after severe unexpected events, VIX futures can trade too cheaply because some customers systematically sell VIX futures, including into volatility upticks. The proposed approach compares VIX futures with volatility implied by SPX options and buys VIX futures or ETP exposure when VIX looks extremely cheap.

## Unknown/paywalled details

The public extract does not provide:

- the exact SPX-options-implied comparator;
- maturity matching and interpolation rules;
- entry threshold;
- VIX future or ETP selection;
- sizing;
- exit or stop logic;
- roll treatment;
- reported sample and costs.

Without these, we possess an economic hypothesis—not a reproducible strategy.

## Our assessment

The concept is strong because it compares related claims on SPX volatility and identifies sticky price-insensitive positioning. It is also operationally difficult:

- VIX is not directly tradable;
- futures, options and ETPs have different convexity, roll and path dependence;
- SPX options require clean surfaces, maturity alignment and bid/ask handling;
- long-vol carry can bleed severely;
- ETP histories contain structural changes and termination risk;
- event-day execution assumptions are decisive.

## Proposed use

Retain this as a dedicated volatility-dislocation research lane, behind pairs and macro-flow work. Required data include SPX option surfaces, VIX futures curves, ETP holdings/roll schedules and conservative executable quotes.

Status: **valuable hypothesis; blocked by missing rules and specialist data**.

---

# Cap 3 — Trading to Stay Alive

Source: [Trading to Stay Alive](https://robotjames.substack.com/p/trading-to-stay-alive)

## Source doctrine

Risk is slippery. A position changes size as price moves, and its volatility can also change.

### Long-only case

A single unlevered long position naturally becomes larger after gains and smaller after losses. A diversified long-only portfolio still drifts across assets, so rebalance occasionally or when weights leave predefined tolerance ranges. Rebalancing too frequently wastes money.

### Shorts and leverage

A losing short becomes more dangerous in two simultaneous ways:

- the short notional increases as price rises;
- portfolio equity falls.

A levered long that falls also becomes larger relative to remaining equity. A levered short that rises suffers the strongest combination: larger short notional, lower equity and often higher volatility.

Therefore, cutting adverse shorts and leveraged exposures is not an alpha decision. It is mandatory survival maintenance. Do not wait for a supposedly ideal time.

## Our integration

This should become infrastructure across every strategy:

- target volatility or risk-unit sizing;
- weight/tolerance bands;
- gross and net exposure limits;
- per-leg and per-pair concentration limits;
- drawdown-based de-risking;
- volatility-spike size reductions;
- forced reduction when leverage rises because equity falls;
- separate hard rules for shorts;
- funding/liquidity/borrow stress tests;
- kill switches independent of model conviction.

For crypto pairs, dollar neutrality alone is insufficient. Both legs can become riskier simultaneously, beta relationships can break and funding can compound losses.

Status: **adopt as mandatory risk doctrine**.

---

# Cap 4 — Crypto Violence and Gentle Rebalancing

Source: [Crypto Violence and the Gentle Rebalancing of Positions](https://robotjames.substack.com/p/crypto-violence-and-the-gentle-rebalancing)

## Source thesis

When crypto volatility rises, existing directional positions effectively become larger. Unless the trader has exceptional directional insight, size should be reduced—even if that means missing a bounce.

Robot James then argues that views usually evolve continuously as old information decays and new information arrives. They do not normally jump neatly between long, flat and short. Exposures should therefore adjust gradually too.

## Example

A trader ranks three assets every few hours and holds a fixed number of top/bottom positions. If B barely overtakes A, replacing all of A with B turns over the whole book for only a tiny expected-return improvement.

A gentler implementation allows more positions and shifts incrementally. Instead of an abrupt full replacement, exposure might transition toward something like:

- 40% long A;
- 10% long B;
- 50% short C.

The exact percentages are illustrative. The principle is to trade toward what is liked more and away from what is liked less only when expected benefit justifies cost.

## Our integration

Replace winner-take-all ranking with continuous target weights:

1. convert forecast ranks/scores into target exposure;
2. apply volatility scaling;
3. create no-trade or rebalance bands;
4. trade only part of the target gap per cycle;
5. require expected improvement to exceed fees, spread, slippage and funding;
6. permit more than a fixed number of positions when this reduces unnecessary turnover;
7. de-risk faster when volatility expands than when forecasts merely change slightly.

This is particularly relevant to our ETF allocator, crypto pairs portfolio, Hyperliquid funding sleeve and any multi-agent signal ensemble.

Status: **adopt as portfolio construction and execution doctrine**.

---

# Cap 5 — Pairs Trading for Dickheads

Source: [Pairs Trading for Dickheads](https://robotjames.substack.com/p/pairs-trading-for-dickheads)

## The central lesson

Mathematics does not remove the need to understand market cause and effect. Prices are not inefficient because regressions or cointegration tests exist; they become temporarily inefficient because participants behave or are forced to trade in observable ways.

Pairs trading assumes two assets that are “basically the same” should respond similarly to common information. A divergence may create a convergence trade—but only after asking why it occurred.

## The three divergence causes

### 1. Technical, price-insensitive flow — potentially tradeable

Forced unwinds, rebalances or other supply/demand shocks push one asset temporarily away from relative fair value. Other traders can close the gap.

### 2. Informed trading — not a convergence trade

New company/token-specific information genuinely changes relative value. Fading it can compound losses. In crypto, sustained manipulation can look similar to informed repricing.

### 3. Bad comparison/model — false divergence

Unmodelled beta, sector, duration or other risk-factor differences make ordinary relative movement look anomalous. The apparent spread need not revert.

## Basic construction

1. Choose genuinely similar, boring assets where informed repricing is relatively uncommon.
2. Check major common-factor sensitivities; PLD and REXR are used as a simple same-industry REIT illustration.
3. Normalize relative price movement. A simple ratio is acceptable only when sensitivities are sufficiently similar.
4. Use an adaptive spread because relative value is not fixed.
5. Observe enough historical divergence/convergence to justify testing.
6. Ensure spread amplitude is large enough to survive two-leg costs and errors.
7. Use a repeatable entry, exit and loss-control process.

## Public example rules

- Spread: price ratio of the two assets.
- Adaptive reference: 20-day Bollinger Bands.
- Entry: fade the spread on the bar after it exceeds the ±2 standard-deviation band.
- Exit: close on the bar after the spread crosses the moving average.
- Execution example: equal dollar amounts in each leg using market-on-close orders.
- Long spread: buy the numerator asset and short the denominator.
- Short spread: short the numerator and buy the denominator.

The author’s PLD/REXR illustration reportedly produced:

- over 100% pre-cost cumulative return using fixed full-stack trades;
- 78% winning trades;
- pre-cost Sharpe around 1;
- 86% cumulative return and Sharpe around 0.8 after a stated 0.1% commission assumption.

These are author-reported, idealized results—not independently verified here. The article describes 0.1% as producing a 0.2% round trip while also emphasizing two legs; this cost convention must be reconstructed carefully rather than copied blindly.

## Important warnings

- Similar assets may have spreads too small to survive costs.
- Less similar assets produce larger apparent opportunities but more model error.
- Volume may help distinguish informed trading from temporary technical flow.
- A broader mean-reverting portfolio may be cheaper and safer than rigidly wiring pairs.
- One profitable pair is inadequate; diversification is required.
- Good historical results do not guarantee right-edge performance.

## Our assessment

This article provides the conceptual foundation for our pairs sleeve. The strongest contribution is not the 20/2 Bollinger rule; it is the three-cause classifier. Our version should reject or quarantine signals around token-specific news, abnormal sustained volume, listing/delisting, unlocks, governance events, exploits and funding/borrow stress.

Status: **highest-priority implementation candidate**.

---

# Cap 6 — A Complete “Temu” Crypto Pairs Strategy

Source: [A Complete Temu Pairs Trading Strategy in Crypto](https://robotjames.substack.com/p/a-complete-temu-pairs-trading-strategy)

## Source thesis

Simple pair models can work in young, fragmented, inefficient crypto markets—but **pair selection is more important than mathematical sophistication**.

The best candidates maximize:

- “basically the same thing”-ness;
- boring/dinosaur-like fundamentals;
- high liquidity and stable markets;
- perpetual-futures support on major exchanges.

They minimize:

- informed trading, insider flow and manipulation;
- false divergences from comparing unlike assets;
- unstable liquidity and venue availability.

The article’s workflow includes brainstorming themes, visually reviewing relationships/spreads, simple simulation, practical exclusions, portfolio construction, trading process and live operation.

## Publicly visible limits

The extract stops before the promised exact pair list and later trading rules. We should not pretend to possess Robot James’s selected universe or updates. The conceptual rules inherited from Cap 5 are visible; the full paid implementation is not.

## Our clean-room adaptation

Construct candidate groups by economic/market role rather than correlation alone, then require:

1. both linear perps available on Bybit testnet/public API;
2. adequate turnover and open interest;
3. stable funding and manageable spread;
4. rolling return correlation and beta stability;
5. no structural token-specific event;
6. enough historical convergence after two-leg costs;
7. held-out stability across regimes;
8. portfolio limits preventing repeated exposure to the same underlying factor.

We should test the simple 20-bar/2σ model as a baseline, not assume it is optimal. Candidate enhancements—each tested separately—include rolling hedge ratios, residual spreads, volume/news vetoes, liquidation/funding context, time stops and continuous target sizing.

Status: **build as a clean-room Bybit public-data research lane; no live keys or orders**.

---

# Cap 7 — How to Make Money as a Random Dickhead

Source: [How to Make Money as a Random Dickhead](https://robotjames.substack.com/p/how-to-make-money-as-a-random-dickhead)

## Source framework

A small trader does not need to know absolute fair value all the time. Robot James focuses on simple technical supply/demand imbalances and “doing useful things that suck” in less competitive places.

Six market ideas:

1. The same thing should have the same price.
2. Predictable future information should already be in today’s price.
3. People sell unpleasant risks at a discount.
4. Price-insensitive participants distort prices.
5. Forced or constrained participants distort prices.
6. Positional imbalances can distort prices.

## Implications

### Replication and relative-value trades

Exact cross-venue or replicating-portfolio arbitrage is highly competitive. Riskier versions may appear in new, fragmented markets where clean conversion is difficult. New instruments can briefly be priced poorly because history and infrastructure are absent. These opportunities decay as professional competition arrives.

### Fundamental forecasting

Out-predicting the aggregate market using ordinary fundamental analysis belongs in the “too hard” basket for a small systematic trader unless there is a genuine information advantage.

### Risk premia

People demand compensation for holding unpleasant risks. This is the easiest and least competitive long-run source of expected return when diversified and managed sensibly. Examples discussed include long-biased equities, curve carry, VIX forward roll-down and short index volatility. Positively skewed lottery-like assets can be overpriced, but shorting them introduces severe tail risk.

### Forced and price-insensitive flow

This is the most attractive active niche: identify participants trading for reasons unrelated to current fair value and provide the liquidity or convergence pressure the market needs.

## Our strategy-intake question

For every candidate:

> Who is trading for a reason unrelated to fair value, why can we safely take the other side, what makes the opportunity unpleasant or capacity-limited, and what would prove the distortion is actually informed repricing?

## Mapping to our systems

- Forced liquidations → Hyperliquid/Bybit dislocation research.
- Similar assets converging → crypto pairs sleeve.
- Risk premia → diversified ETF, carry and funding sleeves.
- Lumpy new-market price discovery → Antoine/new-chain watch-only research.
- Small operationally awkward opportunities → appropriate small-account niche, subject to costs and venue risk.

Status: **adopt as Strategy Intake philosophy**.

---

# Cap 8 — Three Types of Systematic Trading Strategy That Can Work

Source: [Three Types of Systematic Trading Strategy That Can Work](https://robotjames.substack.com/p/three-types-of-systematic-trading)

## Type 1 — Risk-premia harvesting

Deliberately hold diverse risks that tend to be rewarded, prevent any one risk from dominating and remain patient. Examples include 60/40, risk parity/all-weather and liquidity provision. Active shorts must overcome the positive drift/risk premium in many assets.

## Type 2 — Slow-converging inefficiencies

Noisy behavioural or structural tendencies such as momentum, value, carry, quality, low volatility, seasonality, index effects and medium-frequency stat arb. They require:

- a reason the effect persists;
- large aggregate samples;
- faster diagnostic metrics for decay;
- patience through noisy P&L.

Home traders often spend too much time here and too little harvesting diversified risk premia.

## Type 3 — Fast-converging supply/demand imbalances

Short-lived relative-value dislocations, usually the domain of proprietary firms. They are economically simple and converge quickly, making edge easier to measure, but they are capacity-constrained and demand infrastructure, data and execution quality.

## Our architecture change

Every Quant Floor strategy should carry:

```yaml
edge_class: risk_premium | slow_inefficiency | fast_flow_imbalance | hybrid | unknown
```

Evidence must match the class:

- **Risk premium:** long history, diversification and tail stress.
- **Slow inefficiency:** causal thesis, broad sample, walk-forward and parameter stability.
- **Fast imbalance:** identifiable flow, high-resolution data, executable quotes, latency/fill analysis and rapid decay monitoring.

Pairs are a Type 2/3 hybrid: ordinary statistical convergence is slow/noisy, while a pair divergence tied to liquidation or forced flow can be fast.

Status: **adopt as Quant Floor taxonomy and validation router**.

---

# Cap 9 — The Best Places to Get Trading Ideas

Source: [The Best Places to Get Trading Ideas](https://robotjames.substack.com/p/the-best-places-to-get-trading-ideas)

## Three sources

1. **Borrow from traders demonstrably making money.** Markets do not reward originality. Do not copy institutional implementation blindly because large managers face capacity constraints a small trader does not.
2. **Transfer established ideas to new or illiquid markets.** New markets lack history and can temporarily reward sensible methods already understood elsewhere.
3. **Study anomalies in your own trading.** Monitor results, isolate effects and investigate outcomes inconsistent with your current model of cause and effect.

## Our application

The Robot James batch itself is borrowed research, but each idea must enter our verification gauntlet. We should transfer principles—not claims—into Bybit, Hyperliquid, Polymarket and new-chain contexts.

Our paper ledgers should become idea generators. Unexpected conditional winners and failures should create hypotheses, while multiple testing and selection bias are recorded.

Strategy Intake checklist:

1. What causes the inefficiency?
2. Why has it not been competed away?
3. Why do our smaller size and constraints help?
4. What useful market function are we providing?
5. What is the simplest robust local implementation?
6. What evidence would prove decay or invalidate the mechanism?

Status: **adopt as research-generation workflow**.

---

# Combined method library

## A. Portfolio foundation

- Diversified risk-premia core.
- No single sleeve dominates total risk.
- Explicit tail and liquidity stress tests.
- Patient holding rather than constant strategy churn.

## B. Active edge search

Prioritize:

1. forced and constrained flows;
2. price-insensitive rebalancing;
3. sticky positioning;
4. fragmented/new-market price discovery;
5. similar-asset convergence with a causal distortion.

Avoid assuming that correlation, a z-score or a compelling backtest is itself an explanation.

## C. Execution philosophy

- Next-bar decisions only in backtests.
- Model both legs and all costs.
- Trade gradually when forecasts change gradually.
- De-risk quickly when volatility or leverage expands.
- Use no-trade bands and expected-benefit-over-cost thresholds.
- Treat liquidity and capacity as part of the strategy.

## D. Research safeguards

- Author-reported results are hypotheses until reproduced.
- Preserve failed variants and the number of searches.
- Use held-out and walk-forward tests.
- Perturb parameters without choosing the best after inspection.
- Benchmark against simple passive and random controls.
- Separate signal quality, execution quality and portfolio construction.
- Paper/testnet gates precede any live-capital proposal.

# Recommended implementation order

| Priority | Workstream | Reason | Current decision |
|---:|---|---|---|
| 1 | Crypto pairs research lane | Most explicit rules and direct Bybit fit | Build public-data scaffold |
| 2 | Forced-flow classifier | Improves pair-signal quality and fits Hyperliquid recorder | Research adapter |
| 3 | Trading-to-stay-alive risk layer | Required before leverage/short testing | Mandatory infrastructure |
| 4 | Gentle rebalancing allocator | Reduces turnover across sleeves | Add to portfolio design |
| 5 | SPY/TLT month-end test | Simple, causal and independently testable | Backtest |
| 6 | VIX/SPX relative-vol idea | Strong concept but missing rules/data-heavy | Park pending data/rules |

# Pairs research acceptance gates

A candidate pair cannot enter paper monitoring unless it passes:

- economic/theme similarity;
- adequate liquidity and Bybit perp availability;
- stable rolling beta/correlation;
- convergence evidence after two-leg costs;
- no obvious token-specific event contamination;
- held-out and walk-forward stability;
- funding and spread stress;
- time-stop and divergence-stop definition;
- portfolio factor-concentration check;
- explicit testnet/paper-only status.

# Bottom line for Jayse

Yes, we can use Robot James’s “big brain.” The greatest value is a disciplined way to ask **why an edge exists** before optimizing it. His material supports a portfolio with a diversified risk-premia base, a small number of causal slow strategies, tightly controlled forced-flow experiments and a non-negotiable survival layer.

The first build should be the crypto pairs lab—but it must be our independently tested clean-room implementation, not an assumption that the newsletter’s historical examples will remain profitable.

## Related vault pages

- [[AI Quant Trading Floor]]
- [[Jayse Portfolio Command Dashboard]]
- [[Alternative Venues Strategy Map - Prediction Markets Hyperliquid DeFi]]
- [[Antoine On-Chain Alpha Dashboard]]
- [[QTF-017 Strategy Verification Gauntlet]]
- [[Bybit Airdrop Prediction Bot Implementation Plan]]
- [[Robot James Raw Extract Index]]

## Wiki concepts

Synthesised from this source — the claims here are cited in:

- [[forced-flows]]
- [[risk-premia-before-prediction]]
- [[survival-sizing]]
- [[gentle-rebalancing]]
- [[edge-class-evaluation]]
- [[relative-value-pairs]]
- [[independent-reproduction]]
