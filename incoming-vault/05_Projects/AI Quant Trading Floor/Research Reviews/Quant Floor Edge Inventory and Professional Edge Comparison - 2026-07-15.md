---
title: Quant Floor Edge Inventory and Professional Edge Comparison - 2026-07-15
created: 2026-07-15
type: research-review
status: active-inventory-and-external-comparison
risk_mode: read-only-paper-only
confidence: medium
sources:
  - ../Research/QTF Edge-First Production Mandate.md
  - ../Research/QTF Verification and Delivery Control - 2026-07-15.md
  - ../Strategies/2026-07-14 Tactical Momentum Trend Production Edge Card.md
  - ../Strategies/2026-07-14 Forced-Flow Liquidation Continuation-Reversion Edge Card.md
  - ../Backtests/QTF-V05 Costed Function-Based Pairs Backtest - 2026-07-15.md
  - ../Research Reviews/CASHCAT Funding Persistence Evidence Review - 2026-07-14.md
  - https://www.aqr.com/Insights/Research/Journal-Article/A-Century-of-Evidence-on-Trend-Following-Investing
  - https://www.aqr.com/Insights/Research/Journal-Article/Carry
  - https://economics.yale.edu/sites/default/files/2024-05/Zhu_Pairs_Trading.pdf
---

# Quant Floor edge inventory and professional-edge comparison

> **As at 15 July 2026.** This is an evidence inventory, not a trade list. Every Quant Floor sleeve is read-only/public-data or paper-only. No wallet, broker/exchange authentication, order placement, or live allocation is enabled.

## Executive conclusion

- **Production-ready edges: zero.** No sleeve has passed the full path of frozen data → costs/controls → walk-forward/holdout → robustness → forward-paper evidence → explicit promotion review.
- **Closest research candidate:** the **Robotics / Physical-AI tactical theme basket** has a genuine four-fold walk-forward result and is a *paper-monitor candidate after one further validation pass*. It is still not an approved allocation.
- **Best-developed hypothesis card:** **forced-flow liquidation response** is unusually well specified, but is **blocked by the missing documented public liquidation feed**.
- **Most urgent negative evidence:** the two tested **pairs** both failed OOS after modeled two-leg costs; they are not currently candidates for paper monitoring.
- **Operationally running evidence collectors:** ETF paper monitor; funding recorder; alternative-venue monitor; Polymarket paper signal recorder and outcome tracker; Antoine 1h/6h/24h/7d outcome watchdog; 6am Quant brief; dashboard refresh. The separate `AI Quant Floor edge execution worker` is enabled but its latest scheduled run is `error`, so it is an operational blocker, not proof of a successful running strategy.

## What “production distance” means here

| Level | Meaning |
|---|---|
| **0 — thesis/source** | Plausible idea or source capture; no deterministic rule/data test. |
| **1 — specified** | Rule card, universe, risks, controls and kill conditions exist. |
| **2 — reproducible diagnostic/backtest** | Frozen or reproducible data plus a costed test exists; may be rejected. |
| **3 — robust research candidate** | Held-out/walk-forward, costs, controls and robustness checks are substantially positive. |
| **4 — paper incubation** | Predeclared, zero-side-effect forward signals measured against realistic fills for at least 30 days. |
| **5 — production review** | Explicit human review of capital, max loss, venue, monitoring and kill switch. This is **not** automatic live trading. |

No current sleeve is above Level 3; none may trade live.

# Part 1 — Quant Floor edge inventory

## A. Active edge families and allocation sleeves

| Sleeve | Actual edge being researched/tested | Universe / venue | Evidence today | Current work | Stage / production distance |
|---|---|---|---|---|---|
| **Tactical trend & cross-sectional momentum (TTM-01)** | Rank BTC/ETH/SOL on 20d + 60d return; require price above SMA50 and positive 20d return; hold the top qualifying asset or cash; size to 10% annualised vol. The economic thesis is delayed information/behavioural continuation, with a cash fallback in chop. | BTCUSDT, ETHUSDT, SOLUSDT spot; public Bybit daily data. ETH is a control, not an independent thesis. | The old BTC SMA/momentum baseline was negative (-2.77%, Sharpe 0.03). Frozen 1,000-row TTM-01 at 20bp had +0.65% total, Sharpe 0.654, max DD -0.54%, but only 0.52% exposure and 124 trades. It is explicitly `do_not_promote`, not proof of an edge. | Extend to >=1,095 rows/symbol; chronological walk-forward and untouched holdout; turnover/funding/cost sensitivity; parameter jitter, Monte Carlo/RST/DSR; then 30-day alerts if every gate passes. | **Level 2, rejected/partial** — roughly three major gates from paper incubation. |
| **Trend Rider / EMA-MACD / breakout baselines** | Time-series trend continuation using price/EMA/MACD/breakout/risk overlays. These are implementation baselines, not validated strategies. | Mainly BTCUSDT/SOLUSDT 4h/1d; public Bybit. | Best old clean-room result was SOL 4h Trend Rider: +222% total but Sharpe 0.40 and -50.42% DD; performance weakened in the second half. BTC MACD/momentum variants were weak. | One-variable-at-a-time risk work: vol sizing, ATR trailing stops and regime gate; then longer, frozen, walk-forward tests. | **Level 2, revise/high-DD or weak** — not eligible for paper signals. |
| **Funding-rate extremes / carry / basis** | Test whether extreme funding and positioning dislocations produce net carry or a *predeclared* persistence-vs-fade outcome after funding payments, fees, slippage, liquidity and liquidation risk. The edge is the rule, **not CASHCAT**. | Hyperliquid public data; cross-instrument screen. CASHCAT is one screen observation; BTC/ETH are controls. | 76 canonical hourly CASHCAT observations: 75 positive funding hours, 97.33% same-sign adjacency; magnitude autocorrelation near zero. It is descriptive only—no executed funding payments, forward return, basis, cost, borrow/short availability or holdout. | Hourly recorder continues. Build a ≥30-day, hash-anchored panel; specify threshold/direction/horizon; include mark/spot, OI, costs and liquidation buffer; test across instruments with BTC/ETH/cross-venue controls. | **Level 1–2, partial** — several research gates before any paper signal. |
| **Forced-flow / liquidation continuation and reversion** | At extreme signed liquidation pressure plus concurrent OI fall, test next 5m/30m/120m continuation; separately test predeclared post-overshoot reversion. Must beat price-shock, OI-shock, volume, unsigned-flow and placebo controls. | BTCUSDT, ETHUSDT, SOLUSDT perps on one venue; planned public liquidation/OI/L2 collection. | The rule card, execution convention, 10/20/40/60bp costs, risk limits, controls, RST/Monte-Carlo/holdout gates and kill rules are unusually concrete. A Hyperliquid capability probe confirmed normal market/OI/funding/L2 endpoints but its candidate liquidation-history request returned HTTP 422. No liquidation data was invented. | Obtain a documented public liquidation feed/archive; capture immutable raw data; conduct deterministic replay with 500 clustered events minimum. | **Level 1, hard data block** — impossible to advance until the data dependency is solved. |
| **Relative value / same-function pairs** | Trade temporary residual divergence between economically related assets using 60-bar rolling beta, 20-bar z-score entry ±2 and mean-cross exit. | Tested: BTCUSDT/ETHUSDT and ETHUSDT/SOLUSDT on Bybit. Planned same-function universe includes HYPE/DYDX/LIT and AAVE/MORPHO, but those are candidates—not evidence. | Costed point-in-time test with next-bar fills and 10bp/leg: BTC/ETH OOS -5.60%, Sharpe -0.44, DD -39.15%; ETH/SOL OOS -12.72%, Sharpe -1.20, DD -35.80%. Costs alone were ~10%. Both `do_not_promote`. | Do **not** tune these two losing pairs. First broaden/justify the economic-pair universe and obtain adequate funding history; only re-test with preregistered changes, stability/cointegration controls and forward-paper agreement. | **Level 2, negative OOS / parked** — no path toward paper until a new independently justified specification exists. |
| **Regime-gated mean reversion** | Test overshoot/reversion (RSI, VWAP, bands, residuals or event shocks) only outside persistent-trend conditions, with hard risk controls. | BTCUSDT/ETHUSDT plus potential event/prediction markets. | Existing simple clean-room mean-reversion variants failed materially: ETH 1h -63.63%, Sharpe -0.23; BTC 1h VWAP -33.96%, Sharpe -0.12. A more rigorous regime-gated rule is still only partial. | Freeze data and predeclare a regime gate, costs, baselines and final holdout. No recycling of failed variants as a positive result. | **Level 1–2, partial with negative baselines** — research only. |
| **Opening-range breakout/retest** | NY-session 15m opening range → 5m breakout confirmation → 1m entry, potentially filtered by VWAP, gaps, volume displacement and prior-session context. | SPY/QQQ/NVDA/TSLA via Yahoo/Polygon; BTC/ETH/SOL via Bybit. | First smoke test was mostly negative after costs: BTC -4.29%, ETH -0.50%, SOL -2.24% across only 15 sessions; QQQ +0.73%/4 trades and TSLA +5.28%/6 trades are too small to infer anything. | Longer quality intraday history, test filters and session opens, then walk-forward by market—not pooled cherry-picking. | **Level 2, smoke-tested / insufficient** — not paper-ready. |
| **ETF diversification & cross-sleeve allocation** | Not a standalone alpha claim. It is a stabilising, tactical trend/cash-fallback allocation sleeve to diversify *validated* crypto edges and weight capital using comparable net return, DD, correlation, liquidity, capacity and evidence quality. | SPY, QQQ, TLT, IEF, GLD, UUP public daily data. Weekday 08:00 read-only monitor. | Monitor is live and producing allocation research, but the exact ETF rule, frozen OHLCV, costed holdout, correlation/capacity scorecard and evidence-based weights remain missing. Synthetic allocator priors are explicitly deprecated. | Freeze data and rule; benchmark cash/B&H; test walk-forward net-risk result; build measured cross-sleeve scorecard with zero allocation to unvalidated sleeves. | **Level 1–2, partial** — a monitor exists, not a validated ETF edge. |
| **Robotics / Physical-AI thematic tactical basket** | Positive-momentum, volatility-targeted overlay seeks to make a multi-year theme investable with lower exposure/DD than static theme ownership. | BOTZ, ROBO, ARKQ, TSLA, AMZN, OUST, SYM. | Four rolling OOS folds: 3 positive; stitched OOS +24.35%, 11.51% CAGR, Sharpe 1.15, max DD -10.27%, 26.5% average exposure. First fold was negative. | Validate adjacent robotics/picks-and-shovels and a benchmark-matched QQQ/SPY tactical control; then begin a measured paper monitor only if that pass holds. | **Level 3, strongest paper-monitor candidate** — one broad validation pass then 30+ days forward paper. |
| **Prediction-market parity / maker microstructure** | Buy-both/merge parity; split-sell passive quotes; rebate/spread economics. Edge exists only if fill-conditioned P&L stays positive after queue, residual-leg, inventory, fees and adverse selection. | Polymarket public L2; BTC Up/Down micro-markets initially. | 50 binary books: no cost-positive taker buy-both candidates. 50 theoretical resting-maker pairs, but no confirmed fills. Sequential L2 capture saw 0 crossed-quote fill signals and modeled P&L 0. | Collect trade tape/queue depletion; model fills not quotes; add split/merge inventory ledger, rebate attribution and scale curve. | **Level 2, promotion blocked by fill evidence** — not a maker edge yet. |
| **Prediction-market forecast/event signals** | Event-shock fair-value reversion, smart-money late-game follow, fresh-window stale quotes, cheap two-sided bids and near-close anomalies. | Polymarket public data; daily signal recorder and six-hour outcome tracker. | Twelve historical paper signals were initially open/unresolved; the recorder/outcome machinery is real. Most hypotheses still lack an independent fair-probability model, reliable trader identity or executable fill evidence. | Accumulate resolved paper outcomes; use no-fill default; compare with naive market-implied/momentum/reversion controls. | **Level 1–2, paper evidence collection** — forward-outcome sample first. |
| **Antoine on-chain discovery method** | A method-evaluation question: do DEX-discovered tokens that pass public liquidity/risk gates outperform risk-gated and same-age controls at 1h/6h/24h/7d? It is not coin picking. | DEX Screener plus RugCheck (Solana), GoPlus/Honeypot (EVM), read-only ledger. | Candidate/risk/outcome pipeline and hourly horizon watchdog run. Identity hardening now removes name/ticker collisions and duplicate pair samples. Current evidence is too early to establish expectancy. | Mature outcome sample; compare pass/reject/control cohorts; validate chain-specific coverage. Keep Robinhood Chain candidates watch-only until coverage is proven. | **Level 2, evidence collection / high risk** — needs mature cohort outcomes and robustness before paper promotion. |
| **DeFi protocol / venue / farming research** | Possible yield, incentive, venue-microstructure or protocol-relative-value edges only when an explicit executable rule is specified. APY/TVL/news are not edges. | DeFiLlama, Hyperliquid/Lighter/TX Flow watchlists; public data. | Source/venue scans and a venue-metrics ledger run; no source-normalised candidate panel or edge-specific outcome test is complete. | Convert observations into rules with costs, lock-up, reward dilution, smart-contract and exit liquidity controls. | **Level 0–1, source context / partial** — no production path until a rule card exists. |

## B. Active monitors and what they actually do

| Active job | Cadence | Actual function | What it does **not** prove |
|---|---:|---|---|
| Tactical ETF paper monitor | Weekdays 08:00 | Read-only ETF allocation research. | A live ETF alpha or approved allocation. |
| Alternative venues monitor | Daily 09:00 | Public scan of prediction, funding and DeFi candidates. | Tradability or a venue-specific edge. |
| Hyperliquid funding recorder | Hourly | Builds funding/OI history. | Funding P&L, borrow availability or carry expectancy. |
| Polymarket signal recorder | Daily 10:00 | Logs calibrated paper signals. | Fillability or positive expected value. |
| Polymarket outcome tracker | Every 6h | Resolves eligible paper outcomes. | Sufficient sample or execution realism. |
| Antoine outcome watchdog | Hourly | Logs newly matured 1h/6h/24h/7d DEX outcomes. | A valid on-chain discovery edge. |
| Quant morning brief | Daily 06:00 | Updates evidence-gated research queue. | A trade recommendation. |
| Edge execution worker | Every 2h | Intended paper-only implementation work. | **Latest run errored; it is not currently verified operational.** |

# Part 2 — comparison with five widely used professional edge families

## Important limitation on “most profitable traders”

There is no audited public league table of the most profitable traders and their proprietary books. Firms do not disclose full strategies, capacity, costs, risk transfer or P&L attribution. Therefore, this section does **not** claim to identify the five highest-profit traders or copy them. It compares the Quant Floor with five **institutionally established, economically coherent edge families** that are documented in academic research and used across systematic asset management, market making and relative-value desks.

| Professional edge family | Why it can earn a return | Typical professional implementation | Evidence/source | Quant Floor overlap | Critical gap versus professional standard |
|---|---|---|---|---|---|
| **1. Diversified time-series & cross-sectional trend/momentum** | Investors underreact; macro/position changes unfold over time; trend also diversifies long-only beta in some crises. | Broad futures/FX/commodity/equity-index universe; multiple fast/medium/slow signals; volatility targeting; portfolio/risk caps; low-cost execution; ongoing crowding/regime controls. | AQR’s century study documents long history for time-series trend; Man Group notes material dispersion driven by speed, market set, carry and allocation. | TTM-01 and Trend Rider are the correct *family*, with cash fallback, vol scaling and costs. | Universe is only BTC/ETH/SOL; history/holdout insufficient; no multi-speed ensemble, cross-asset breadth, execution/capacity model or forward paper sample. **Best scalable core if validation expands.** |
| **2. Carry / funding / basis** | Compensation for bearing inventory, funding, crash/liquidity or balance-sheet risk; high carry is not free return and can unwind violently. | Diversified cross-asset carry; spot-perp/futures basis; financing and borrow fully charged; liquidity limits, liquidation distance, tail hedges and cross-venue execution. | AQR’s *Carry* finds carry predicts returns across and within several asset classes; its definition is return assuming prices/conditions do not change. | Funding-extremes/CASHCAT research targets the right crypto analogue. | Current data proves only a short sign-persistent episode, not basis/carry P&L. Missing multi-regime panel, costs, liquidation/borrow and cross-venue controls. **Promising but very early.** |
| **3. Relative value / statistical arbitrage** | Related assets can temporarily deviate because of flows, segmentation or slow arbitrage; convergence earns only if relationship is stable after costs. | Large diversified baskets; cointegration/stability tests; dynamic hedge ratios; factor neutrality; borrow/financing, turnover/capacity and structural-break controls. | Yale’s 2024 *Examining Pairs Trading Profitability* reviews cost-aware profitability; newer work stresses cointegration stability. | QTF-V05 uses a legitimate beta-residual/z-score/next-bar/two-leg-cost framework. | Current two crypto pairs both fail OOS net of costs. Need a wider economic universe and preregistered stability testing—**not parameter tuning.** |
| **4. Liquidity provision / market making** | Spread/rebate revenue can exceed adverse selection, inventory risk, hedging and operational costs only for a high-quality execution system. | Continuous L2/trade data; queue-aware fill model; fair-value/markout model; inventory skew; hedging, kill switches, latency and capital-at-risk monitoring. | BIS/CFTC research treats inventory and adverse selection as central; queue position materially changes risk. | Polymarket supply-side lab and Bybit/MoonDev L2 replay are correctly conservative. | Quotes are not fills; no trade-tape/queue-depletion, residual inventory, adverse-selection or reward-attribution evidence. **Infrastructure work is valid; alpha unproven.** |
| **5. Event / information / prediction-market microstructure** | Temporary discrepancy between a well-calibrated independent probability estimate and executable market price, or stale quotes around lifecycle/events. | Fast verified event feed + independent model; reliable time ordering; realistic execution/queue model; legal/venue controls; broad resolved sample and calibration statistics. | Prediction-market literature supports using prices as forecasts, but not automatic tradable alpha; calibration, fees, liquidity and settlement rules dominate execution. | Polymarket recorder, outcome tracker, event-shock and stale-window specs are the correct research substrate. | Lack of independent fair-value model, trade/fill proof, copy-lag identity reliability and enough resolved outcomes. **Keep paper-only.** |

## Where ETFs fit

Professional systematic portfolios commonly use ETFs/futures as **liquid implementation vehicles** for trend, momentum, carry, defensive and allocation factors. The Quant Floor’s ETF sleeve is correctly framed as a **diversification/capital-allocation sleeve**, not evidence that “ETFs” alone create alpha. Its present job is to test whether a tactical, cash-fallback ETF exposure improves portfolio-level return, drawdown and correlation *after* comparable evidence exists for every sleeve.

The Robotics basket is the nearest precise ETF/equity implementation. Its walk-forward result is encouraging but has only four folds, one negative fold and no benchmark-matched breadth validation. It should be the first ETF-adjacent sleeve to receive the next validation pass—not live capital.

# Priority recommendations

1. **Repair the errored 2-hour edge execution worker before adding new strategy scope.** It should only report concrete artifact/run/gate updates; no orders or credentials.
2. **Run the Robotics breadth/control validation** and, if it passes, start a 30-day paper monitor. It is the only sleeve presently near Level 4.
3. **Finish TTM-01 history + walk-forward/holdout** before iterating more trend variants. Broaden only after a clean three-asset test has a defensible outcome.
4. **Build the funding-rate panel, not a CASHCAT trade.** Target 30+ days, 48 independent extremes, declared persistence/fade rules, observed costs and BTC/ETH controls.
5. **Keep forced-flow blocked until a documented liquidation source exists.** Do not substitute price/OI proxies and relabel them liquidation flow.
6. **Park the two losing pairs.** A new pair test must come from an economically linked, broader universe with a predeclared stability test—not a tuned re-run.
7. **Continue Polymarket/market-making data capture with no-fill default.** Add trade tape/queue depletion before any paper P&L claim.
8. **Hold cross-sleeve allocation at zero for unvalidated sleeves.** Replace synthetic allocation priors only with comparable measured evidence.

## Bottom line

The Quant Floor is building the right *research machinery*: immutable inputs, explicit costs, controls, walk-forward gates, paper ledgers and refusal to mistake observations for edges. Its principal weakness is not a lack of ideas; it is that most sleeves have not yet accumulated sufficiently broad, execution-realistic, out-of-sample evidence. The right next move is concentrated validation of the strongest candidates—not live deployment and not expanding the watchlist.

# Appendix — external research evidence and implementation caveats

These sources support the *existence and mechanics* of the five edge families. They do not establish a public profitability ranking, nor do they prove a deployable result in the Quant Floor’s venues, size or data environment.

## Trend and momentum

1. [Moskowitz, Ooi & Pedersen — Time Series Momentum (2012)](https://w4.stern.nyu.edu/facdir/lpederse/papers/TimeSeriesMomentum.pdf): the cited study found positive 12-month TSMOM profits across its 58 liquid futures/forward contracts, with continuation around one year and partial longer-horizon reversal.
2. [Hurst, Ooi & Pedersen — Demystifying Managed Futures](https://www.aqr.com/-/media/AQR/Documents/Insights/Journal-Article/Demystifying-Managed-Futures.pdf): supports treating implementable TSMOM as a recognised CTA/managed-futures style, not as a uniquely profitable strategy.
3. [Jegadeesh & Titman — Returns to Buying Winners and Selling Losers (1993)](https://www.bauer.uh.edu/rsusmel/phd/jegadeesh-titman93.pdf) and [Asness, Moskowitz & Pedersen — Value and Momentum Everywhere (2013)](https://pages.stern.nyu.edu/~lpederse/papers/ValMomEverywhere.pdf): support cross-sectional winner-minus-loser and multi-market factor evidence.
4. [Daniel & Moskowitz — Momentum Crashes](https://www.nber.org/papers/w20439): supports the need to stress sharp rebounds after distressed/high-volatility periods.

**Production implication:** use point-in-time universe/contract data, tradeable prices, financing/roll/borrow/impact, predeclared walk-forward and untouched holdout, parameter-neighbourhood checks, exposure/capacity limits and forward signal-to-fill reconciliation.

## Carry, funding and basis

1. [AQR — Carry](https://www.aqr.com/Insights/Research/Journal-Article/Carry): documents carry predictability across and within several asset classes; it defines carry as expected return when price and market conditions do not change.
2. [Binance Research — Evaluation of Arbitrage Strategies on USDⓈ-M Market](https://assets.ctfassets.net/m1hizt3hapq0/6jIVdcRUDpMBFj28k8gpqM/eecc185a9dcf0ca9bbc23cbf2ecfc593/Trading_Focus_-4_Evaluation_of_Arbitrage_Strategies_on_USD_-M_Market.pdf): venue-specific description of spot-long/perp-short basis/funding mechanics and margin efficiency; simulations are not a general profitability assertion.
3. [Aevo perpetual funding methodology](https://docs.aevo.xyz/aevo-exchange/perpetuals-specifications/perpetual-futures-funding-rate): shows funding depends on contract-specific premium, interval and cap/floor conventions—archive actual historical methodology rather than annualised headline rates.
4. [Mancini, Ranaldo & Wrampelmeyer — Liquidity in the Foreign Exchange Market](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1447869): documents liquidity risk in carry currencies, including stress-period caveats.

**Production implication:** archive executable spot/perp books, index/mark/funding method and realised settlements, fees/rebates, borrow/financing, collateral and liquidation rules; test net P&L and basis-to-exit across funding regimes and stress periods.

## Relative value and market making

1. [Gatev, Goetzmann & Rouwenhorst — Pairs Trading](http://stat.wharton.upenn.edu/~steele/Courses/434/434Context/PairsTrading/PairsTradingGGR.pdf) is a classic distance-pair study and explicitly raises data-snooping, transaction/shorting and microstructure issues.
2. [Lei & Xu — Costly arbitrage through pairs trading](https://www.sciencedirect.com/science/article/abs/pii/S016518891500072X) supports the requirement to make transaction costs and stop behaviour endogenous to the test.
3. [Herdegen, Muhle-Karbe & Stebegg — Liquidity Provision with Adverse Selection and Inventory Costs](https://ideas.repec.org/a/inm/ormoor/v48y2023i3p1286-1315.html) models the essential market-making trade-off: spread revenue versus toxicity/adverse selection and inventory cost.

**Production implication:** pairs need survivorship-free point-in-time universe, factor/borrow/turnover controls and strictly rolling OOS formation/trading. Makers need full order-event/trade data, fill/queue/latency model, conditional mark-outs, inventory and hedge P&L—never quote spread alone.

## ETF/macro allocation and prediction markets

1. [Moskowitz & Grinblatt — Do Industries Explain Momentum?](https://onlinelibrary.wiley.com/doi/abs/10.1111/0022-1082.00146) supports the sector-relative momentum rationale; it is not a direct modern-ETF implementation result.
2. [Wolfers & Zitzewitz — Interpreting Prediction Market Prices as Probabilities](https://www.nber.org/system/files/working_papers/w12200/w12200.pdf) supports calibration rather than assuming price is literal truth.
3. [Kalshi order-book API](https://docs.kalshi.com/api-reference/market/get-market-orderbook) documents YES/NO book complementarity; a live endpoint alone does not provide historical queue/fill evidence.
4. [CFTC — Understanding Prediction Markets and Event Contracts](https://www.cftc.gov/LearnandProtect/PredictionMarkets) underlines the importance of current contract/venue rules, liquidity and oversight.

**Production implication:** ETF macro tests must use vintage macro/release-time data and point-in-time fund history, then compare net results against static/equal-risk benchmarks. Prediction-market tests need chronological calibration against market price, executable book/fee/rebate replay, worst-case one-leg-fill and settlement-rule checks.
