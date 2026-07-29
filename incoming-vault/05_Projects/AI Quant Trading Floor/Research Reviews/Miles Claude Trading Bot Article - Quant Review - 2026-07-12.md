---
title: Miles Claude Trading Bot Article - Quant Review - 2026-07-12
created: 2026-07-12
updated: 2026-07-12
type: research-review
status: evidence-blocked
tags: [quant-review, source-claim, tradingview, pine-script, claude, ai-quant, qtf-021, miles-deutscher, workflow-source]
sources:
  - 03_Sources/x/Miles Claude Trading Bot Article - X 2075615711150608468.md
confidence: medium
cross_refs:
  - QTF-021 TradingView Agentic Strategy Lab
  - AI Quant Trading Floor
  - QTF-017 Strategy Verification Gauntlet
review_ticket: scheduled-cron-2026-07-12
---

# Miles Claude Trading Bot Article — Quant Review

**Reviewed:** 2026-07-12 | **Source:** [[Miles Claude Trading Bot Article - X 2075615711150608468]] | **Author:** Miles Deutscher (`@milesdeutscher`)

## Verdict

**Useful workflow source; performance claim unverifiable.** The article's strongest contribution is process architecture, not the headline `+$168,236`. The twelve-strategy comparison table and winning-strategy parameters remain **blocked** behind X's login wall — no image OCR, no data table, no exact rules. Without those, the profit claim, the strategy identity, and the specific parameters cannot be reconstructed or tested.

## Evidence separation

### Explicit claims (from saved article text)

| Claim | Verifiability |
|---|---|
| Claude/Fable was used in VS Code to convert trading ideas into objective rules | Medium — workflow is plausible, tool names are specified |
| Rules required computable entry, stop, exit, and position-sizing rules | High — this is a stated constraint, not a result |
| Rules were converted into TradingView Pine Script v6 | Medium — consistent with article description |
| `0.1%` commission per side and next-bar-open fills were modeled | Medium — stated explicitly; reasonable default |
| A starting balance was set (amount unspecified) | Low — stated but amount not captured in saved text |
| Trade-list CSV was exported from TradingView and fed back to Claude | Medium — workflow is reproducible independently |
| Twelve famous strategies were tested against BTC | **Blocked** — identity and results are in images only |
| Only ONE strategy beat buy-and-hold | **Blocked** — table data inaccessible |
| The winning strategy was reportedly tested on stocks | **Blocked** — no stock symbol, timeframe, or results available |
| An RSI mean-reversion example produced `+$5,251` on one config but suffered deep drawdown on 4h | Low — parameters, timeframe, symbol, date range unspecified |
| Exchange MCP/API or human-approved alerts were suggested for execution | Medium — described as an option, not a claim of action |

### Inferred / reconstructed

| Item | Basis | Confidence |
|---|---|---|
| The twelve strategies likely include standard technical-analysis classics | Common "famous strategies" corpus includes MA crossover, RSI, MACD, Bollinger Bands, breakouts, momentum | Low — pure inference without the image |
| The winning strategy is NOT the RSI mean-reversion example | The RSI example was shown as a cautionary case (deep 4h drawdown) | Medium — contextual from article flow |
| The winning strategy likely involves multi-indicator confluence, trend-following, or regime filtering | Only one strategy beat buy-and-hold on BTC; simple single-indicator strategies tend to underperform | Low — no evidence |

### Unknown / blocked

| Block | Why |
|---|---|
| Twelve-strategy identity | Article image only; X login required; FxTwitter and Jina Reader both blocked |
| Twelve-strategy comparison results (profit, drawdown, trade count, win rate, etc.) | Same image; no text capture |
| Winning strategy identity and exact rules | Same image; no text capture |
| Stock test symbol, timeframe, date range, results | Article content behind login |
| Headline `+$168,236` P&L: in-sample vs out-of-sample vs walk-forward | Article does not distinguish from text alone |
| Starting balance for the headline result | Not stated in saved text |
| Full trade CSV | Not provided publicly |
| Parameter selection process | Unknown — could be optimized on full sample |
| Benchmark attribution (buy-and-hold over what exact period) | Not specified |

## Workflow comparison: Miles Article vs QTF-021

| Aspect | Miles Article | QTF-021 TradingView Lab | Assessment |
|---|---|---|---|
| Idea → rules | Claude in VS Code converts idea to objective rules | [[QTF-021 TradingView Agentic Strategy Lab]] requires a strategy spec first | **Complementary.** QTF-021 can adopt the Claude-assisted rule-generation step as an intake accelerator |
| Rules → code | Claude generates Pine Script v6 | QTF-021 has Pine templates with paper-alert contract built-in | **QTF-021 is ahead.** Our templates already enforce `paper_only: true` alerts, commission modeling, and no-lookahead |
| Commission model | `0.1%` per side, next-bar-open | `0.06%` per side (exchange-appropriate for crypto) | **Both reasonable.** QTF-021's rate matches Bybit maker/taker; Miles' rate is more conservative |
| Visual validation | Paste into TradingView, inspect chart | QTF-021 has a manual-paste test pack with checklist | **QTF-021 is more structured** with capture templates and scorecards |
| Evidence artifact | TradingView trade CSV export → Claude | QTF-021 has paper alert JSONL ledger, backtest capture template, and scorecard | **QTF-021 has stronger evidence pipeline.** CSV alone is less accountable than JSONL with schema validation |
| Improvement loop | Feed CSV back to Claude for improvement plan | QTF-021 requires held-out/walk-forward data, one-variable experiments, and promotion gates via [[QTF-017 Strategy Verification Gauntlet]] | **QTF-021 is safer.** Feeding the same sample back to Claude risks selection bias and overfitting |
| Multi-timeframe | Test across timeframes (1h, 4h) | QTF-021 explicitly requires cross-timeframe stability as a scorecard category | **Equivalent.** Both recognize this need |
| Multi-asset | BTC test → stocks extension | QTF-021 specifies BTC, ETH, XAUUSD, SPY/QQQ in initial candidate families | **Equivalent.** Both plan cross-asset validation |
| Execution gate | Claude MCP/API or human-approved alerts | Paper-alert ledger → review board → guarded live bridge only after explicit approval | **QTF-021 is more conservative.** No API key to Claude/MCP; subaccount, caps, kill-switch required |
| Self-improvement | Implicit (Claude reviews CSV) | Explicit scorecards, experiment ledgers, baseline promotion/reversion rules | **QTF-021 is more rigorous.** Structured self-improvement beats ad-hoc CSV review |

### Architecture/process upgrades QTF-021 should adopt

1. **Claude-assisted rule generation as intake accelerator.** QTF-021 already has strategy specs; adding an LLM-assisted "vague idea → spec" intake desk speeds up the Idea → spec pipeline without replacing the spec gate.

2. **TradingView CSV export as a second evidence artifact.** The paper alert JSONL ledger captures individual signals; adding a TradingView Strategy Tester CSV export gives a machine-readable backtest summary that is harder to fabricate than a screenshot.

3. **Multi-strategy shootout (twelve-strategy pattern).** Even though the article's specific results are blocked, the **method** of running multiple strategies against the same asset/date range and ranking them is valuable. QTF-021 should add a `Strategy Shootout` report format that runs N candidate Pine scripts against the same symbol/timeframe/date range and ranks by risk-adjusted metrics.

4. **Explicit 0.1% commission as a conservative default for equity/stocks.** QTF-021's 0.06% is crypto-appropriate; adding a 0.1% default for stock tests improves conservatism.

5. **Claude improvement-review gate (with safeguards).** The idea of feeding backtest results to an LLM for an improvement plan is useful **IF** the improvements are tested on held-out data. QTF-021 should add a `Claude Review → Held-Out Test` gate that takes the LLM's suggestions, applies them, and validates on unseen data before promotion.

## Reproducible public-data backtest plan (blocked-article version)

Since the winning strategy's identity is blocked, this plan defines the **method** for testing any clean-room reconstruction once revealed, plus a fallback reconstruction of the stated RSI mean-reversion example.

### Test plan: RSI mean-reversion reconstruction (the one example with partial details)

**Strategy spec (clean-room reconstructed):**
- **Name:** MD-RSI-MR-01 (Miles Deutscher RSI Mean Reversion — Reconstruction 01)
- **Hypothesis:** RSI oversold bounces can produce positive expectancy on lower timeframes but fail on higher timeframes due to trend persistence.
- **Market:** BTCUSDT
- **Timeframes:** 1h (primary, where `+$5,251` was reportedly observed), 4h (where deep drawdown was reported)
- **Entry:** RSI crosses below 30 → wait for cross back above 30 → enter long at next bar open
- **Exit:** RSI crosses above 70 OR fixed 2% stop OR 3% take-profit (whichever triggers first)
- **Position sizing:** Fixed notional (e.g., $1,000 per trade)
- **Fees:** 0.1% per side (matching article) + 0.02% slippage
- **Data source:** Yahoo Finance BTC-USD (daily for 4h proxy) or Bybit public klines (1h)
- **Date range:** 2023-01-01 to 2026-06-30 (wide, with held-out splits)
- **Validation split:** 2023-01-01 to 2025-06-30 (in-sample) / 2025-07-01 to 2026-06-30 (held-out)
- **Walk-forward:** 12-month rolling window, refit every 3 months
- **Parameter-jitter check:** RSI threshold ±5, stop ±0.5%, TP ±0.5% — test all combinations, report range

### Test plan: twelve-strategy shootout (generic template)

Once the twelve strategy identities become available:
1. Reconstruct each as a clean-room Pine Script v5/v6 strategy
2. Run all 12 against the same BTCUSDT daily data with identical date range, starting capital, commission (0.1%), and next-bar fills
3. Rank by: risk-adjusted return (Sortino or Calmar), profit factor, max drawdown, trade count
4. Compare each against buy-and-hold over the same period
5. Hold out 2025-07-01 to 2026-06-30 as the out-of-sample validation window
6. The winning strategy must beat buy-and-hold on BOTH in-sample and out-of-sample windows
7. Run parameter jitter: for the winning strategy, vary each parameter ±20% and ensure performance doesn't collapse

### Safety controls for all tests

- [ ] Signals use only data available at that historical bar (no lookahead)
- [ ] Execution uses next-bar-open fills
- [ ] Fees (0.1%/side) and slippage (0.02%) included
- [ ] Trade count ≥ 30 for statistical relevance
- [ ] Max drawdown reported alongside return
- [ ] Buy-and-hold benchmark over the same date range
- [ ] Parameter selection performed on in-sample only
- [ ] Out-of-sample / walk-forward window never seen during optimization
- [ ] Parameter jitter range reported (best case, worst case, median)
- [ ] Cross-asset sanity check (ETHUSDT or SPY) before any paper-monitor promotion

### Promotion gates (aligned with QTF-017)

| Stage | Requirement |
|---|---|
| spec | Exact rules saved with unknowns marked |
| smoke | Python/Pine backtest runs without error |
| in-sample | Meets minimum trade count; metrics above random baseline |
| held-out | Performance does not degrade catastrophically in the unseen window |
| jitter | Parameters are not fragile; ±20% range still produces similar metrics |
| cross-asset | At least one adjacent market shows directionally consistent behavior |
| paper-monitor | Strategy alerts logged to paper JSONL for ≥ 30 days |
| paper review | Live alert behavior matches backtest assumptions within tolerance |
| guarded live | Only after explicit user approval, subaccount, caps, kill-switch |

**Current status: BLOCKED at spec stage** — winning strategy identity and parameters unavailable from source images.

## Artifacts created

| Artifact | Path |
|---|---|
| Quantitative review note | `05_Projects/AI Quant Trading Floor/Research Reviews/Miles Claude Trading Bot Article - Quant Review - 2026-07-12.md` |
| Source file (preexisting) | `03_Sources/x/Miles Claude Trading Bot Article - X 2075615711150608468.md` |
| Index update | `index.md` (this review added) |
| Log entry | `log.md` (this review logged) |

## Safety status: RESEARCH ONLY / PAPER-ONLY

- No exchange API keys used, stored, or referenced
- No MCP execution, wallets, or orders
- No live trading connection
- All proposed tests are read-only/backtest/paper-monitor
- The headline `+$168,236` remains an unverified claim pending image access