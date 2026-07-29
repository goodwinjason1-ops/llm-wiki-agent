---
title: AI Quant Morning Brief - 2026-07-22
created: 2026-07-22
updated: 2026-07-21T20:00:18+00:00
type: daily-brief
status: generated
tags: [quant, morning-brief, read-only, guardrails]
---

# AI Quant Morning Brief - 2026-07-22

> Read-only research brief. No broker/exchange auth, no wallet actions, no orders. This is an idea-generation and evidence-gating workflow toward agents eventually trading with guardrails only after explicit approval.

> Status authority: [[QTF Verification and Delivery Control - 2026-07-15]]. Do not treat a queued item, source note, asset move, or synthetic allocation as a verified edge.

## Control-market snapshot

> BTC, ETH and SOL are tracked here as control-universe diagnostics. A short-term return leader is not a standalone candidate or allocation decision; ETH remains a benchmark/control unless a separate rule passes its gates. Bidirectional scan: both top gainers and worst losers are tracked for momentum continuation.

| Symbol | Close | 1D | 7D | 30D | Regime |
|---|---:|---:|---:|---:|---|
| BTCUSDT | 66408.6000 | 1.76% | 2.11% | 4.90% | bullish-momentum |
| ETHUSDT | 1922.2900 | 0.93% | 1.61% | 12.63% | bullish-momentum |
| SOLUSDT | 77.8400 | -0.03% | -0.04% | 7.41% | range/chop |

## Research and allocation candidates

### 1. Tactical Momentum / Cross-Market Allocation Desk — Crypto control universe: BTCUSDT/ETHUSDT/SOLUSDT

- **Idea ID:** `2026-07-22-QTF-MORNING-01`
- **Source notes:** [[2026-07-14 Tactical Momentum Trend Production Edge Card]], [[QTF Edge-First Production Mandate]]
- **Venue:** Bybit public data; no auth
- **Thesis:** Validate the pre-defined TTM-01 cross-sectional momentum rule. Momentum must be bidirectional: track both top gainers (trend continuation long) and worst losers (trend continuation short / mean-reversion candidates). Do not create an asset-specific thesis from recent returns.
- **Why now:** Bidirectional scan — Leader: BTCUSDT 7d=2.11%, regime=bullish-momentum. Laggard: SOLUSDT 7d=-0.04%, regime=range/chop. Both directions are evidence; ETH remains a benchmark/control.
- **Regime assumption:** cross-sectional trend with cash fallback; no individual asset assumption
- **Required data:** Frozen BTC/ETH/SOL OHLCV, cost sensitivity, walk-forward/holdout report, and ETF/other-sleeve comparison before allocation.
- **Risk flags:** TTM-01 currently do_not_promote, directional beta, chop/reversal risk, no live order permission
- **Benchmark:** Cash, BTC/ETH/SOL buy-and-hold controls, and the ETF diversification sleeve when comparable evidence exists.
- **First test:** Complete the missing TTM-01 history and chronological walk-forward/holdout validation; do not emit a paper signal from this snapshot.
- **Next step:** Keep the crypto sleeve at zero allocation until its evidence gates pass; rank it against other validated sleeves rather than rank individual coins.
- **Reject conditions:** Reject or park if walk-forward, cost sensitivity, robustness, or drawdown gates fail.
- **Readiness score:** 35/100

### 2. Funding-Rate Extremes / Carry Validation Desk — Funding-rate-extremes universe (current screened example: VINE)

- **Idea ID:** `2026-07-22-QTF-MORNING-02`
- **Source notes:** [[CASHCAT Funding Persistence Evidence Review - 2026-07-14]], [[QTF Edge-First Production Mandate]]
- **Venue:** Hyperliquid public info endpoint; no auth
- **Thesis:** Test the pre-defined funding-rate-extremes / carry rule; VINE is one currently screened observation, not the edge itself or a standing trade thesis.
- **Why now:** Screened example VINE: funding annualized ≈ 188.68%, 24h volume ≈ $1,442,157. This observation only enters the funding-extremes test queue.
- **Regime assumption:** crowded positioning / funding dislocation
- **Required data:** Hourly funding history, mark/spot basis, OI, volume, liquidation buffer, realistic costs and forward outcomes.
- **Risk flags:** funding can flip, liquidation risk, venue risk, no live auth/orders
- **Benchmark:** Cash / no-position and a liquid BTC perpetual funding control.
- **First test:** Run the pre-defined persistence/fade analysis only after sufficient aligned observations and cost assumptions.
- **Next step:** Recorder and paper ledger only; test the funding-extremes rule across eligible instruments, then compare any validated result with ETF diversification and other eligible sleeves.
- **Reject conditions:** Reject if funding mean-reverts before costs, liquidity is inadequate, or forward outcomes fail the declared rule.
- **Readiness score:** 55/100

### 3. ETF Diversification / Cross-Sleeve Capital Allocation Desk — ETF diversification sleeve: SPY/QQQ/TLT/IEF/GLD/UUP control universe

- **Idea ID:** `2026-07-22-QTF-MORNING-03`
- **Source notes:** [[QTF Edge-First Production Mandate]], [[AI Quant Trading Floor Dashboard]]
- **Venue:** Existing read-only ETF paper monitor; public data only
- **Thesis:** Use the ETF sleeve as the stabilising diversification component of a future cross-sleeve capital-allocation framework, alongside validated crypto-edge sleeves; it is not a standalone edge claim.
- **Why now:** ETFs provide a potentially more stable, diversifying sleeve for capital weighting against validated crypto edges. The question is the measured cross-sleeve capital weight, not whether ETFs must compete as a standalone alpha thesis.
- **Regime assumption:** cross-asset tactical trend with cash fallback
- **Required data:** Frozen daily ETF OHLCV, explicit signal rule, cost model, walk-forward/holdout results, drawdown and correlation measures.
- **Risk flags:** no evidence-based allocation yet, market-hours/gap risk, model risk, no broker access/orders
- **Benchmark:** Cash, buy-and-hold controls, and all other validated sleeve candidates on comparable net-risk metrics.
- **First test:** Verify the ETF sleeve inputs and build a comparable cross-sleeve scorecard: net return, drawdown, liquidity, correlation, capacity and evidence quality versus each validated crypto-edge sleeve.
- **Next step:** Use the resulting scorecard to determine future capital weights between the diversifying ETF sleeve and validated crypto edges; no static allocation or live capital change is implied.
- **Reject conditions:** Reject or park if no precise rule, frozen data, realistic costs, held-out evidence, or paper-monitorable signal exists.
- **Readiness score:** 40/100

## Alternative-venue public scan excerpt

### Hyperliquid funding/OI candidates
| Coin | Funding ann. | 24h volume | Mark |
|---|---:|---:|---:|
| VINE | 188.68% | $1,442,157 | 0.009599 |
| ADA | -38.63% | $6,344,943 | 0.17366 |
| HYPE | -29.84% | $284,978,834 | 60.2271 |
| XRP | -31.42% | $76,745,730 | 1.1551 |
| ARB | -28.17% | $1,660,765 | 0.08901 |

### Polymarket high-volume macro/crypto headlines
| Question | Liquidity | End |
|---|---:|---|
| Will Carlos Roberto Massa Júnior finish in third place in the first round of the 2026 Brazilian presidential election? | $25,292 | 2026-10-04 |
| Ethereum Up or Down - July 21, 4:00PM-4:05PM ET | $9,913 | 2026-07-21 |

## Recent source notes considered

- [[QTF-V05 Costed Function-Based Pairs Backtest - 2026-07-15]] — score 13; sharpe, DeFi, wallet, claim; `05_Projects\AI Quant Trading Floor\Backtests\QTF-V05 Costed Function-Based Pairs Backtest - 2026-07-15.md`
- [[2026-07-14 Tactical Momentum Trend Production Edge Card]] — score 13; morning, sharpe, wallet, claim; `05_Projects\AI Quant Trading Floor\Strategies\2026-07-14 Tactical Momentum Trend Production Edge Card.md`
- [[2026-07-14 Forced-Flow Liquidation Continuation-Reversion Edge Card]] — score 9; DeFi, wallet, claim; `05_Projects\AI Quant Trading Floor\Strategies\2026-07-14 Forced-Flow Liquidation Continuation-Reversion Edge Card.md`
- [[QTF Perp DEX Pair Screen - Public Bybit Hourly Snapshot - 2026-07-14]] — score 0; ; `05_Projects\AI Quant Trading Floor\Backtests\QTF Perp DEX Pair Screen - Public Bybit Hourly Snapshot - 2026-07-14.md`
- [[QTF-024 Contradiction Detection Research - 2026-07-14]] — score 11; sharpe, DeFi, wallet; `05_Projects\AI Quant Trading Floor\Backtests\QTF-024 Contradiction Detection Research - 2026-07-14.md`
- [[0xJeff Hermes Workflows - Source Review - 2026-07-14]] — score 4; agent, claim; `03_Sources\x\0xJeff Hermes Workflows - Source Review - 2026-07-14.md`
- [[Morin Performance Review Dashboard and First AI Trading Workflow - Source Review - 2026-07-13]] — score 5; DeFi, claim; `03_Sources\x\Morin Performance Review Dashboard and First AI Trading Workflow - Source Review - 2026-07-13.md`
- [[QTF-023 Robot James Crypto Pairs Smoke Test - 2026-07-13]] — score 4; sharpe; `05_Projects\AI Quant Trading Floor\Backtests\QTF-023 Robot James Crypto Pairs Smoke Test - 2026-07-13.md`
- [[Miles Deutscher Vibe-Code TradingView Claude Article - Source Review - 2026-07-13]] — score 11; DeFi, wallet, agent, claim; `03_Sources\x\Miles Deutscher Vibe-Code TradingView Claude Article - Source Review - 2026-07-13.md`
- [[DamiDefi UCL Finance Paper Agent Architectures - Source Summary - 2026-07-13]] — score 5; DeFi, agent; `03_Sources\x\DamiDefi UCL Finance Paper Agent Architectures - Source Summary - 2026-07-13.md`

## Guardrail checklist

- [ ] No live execution requested or performed.
- [ ] No private API keys, broker auth, wallets, or deposits used.
- [ ] Each idea has a benchmark and reject condition.
- [ ] Candidates move to backtest/paper only after exact rules/data exist.
- [ ] Any future live/guardrailed trading requires explicit Jayse approval for venue, capital, max loss, and kill-switches.

## Machine-readable ideas

```json
{
  "run_id": "20260721T200013Z",
  "generated_at": "2026-07-21T20:00:18+00:00",
  "ideas": [
    {
      "idea_id": "2026-07-22-QTF-MORNING-01",
      "desk": "Tactical Momentum / Cross-Market Allocation Desk",
      "source_notes": [
        "[[2026-07-14 Tactical Momentum Trend Production Edge Card]]",
        "[[QTF Edge-First Production Mandate]]"
      ],
      "market": "Crypto control universe: BTCUSDT/ETHUSDT/SOLUSDT",
      "venue": "Bybit public data; no auth",
      "thesis": "Validate the pre-defined TTM-01 cross-sectional momentum rule. Momentum must be bidirectional: track both top gainers (trend continuation long) and worst losers (trend continuation short / mean-reversion candidates). Do not create an asset-specific thesis from recent returns.",
      "why_now": "Bidirectional scan \u2014 Leader: BTCUSDT 7d=2.11%, regime=bullish-momentum. Laggard: SOLUSDT 7d=-0.04%, regime=range/chop. Both directions are evidence; ETH remains a benchmark/control.",
      "regime_assumption": "cross-sectional trend with cash fallback; no individual asset assumption",
      "required_data": "Frozen BTC/ETH/SOL OHLCV, cost sensitivity, walk-forward/holdout report, and ETF/other-sleeve comparison before allocation.",
      "risk_flags": [
        "TTM-01 currently do_not_promote",
        "directional beta",
        "chop/reversal risk",
        "no live order permission"
      ],
      "benchmark": "Cash, BTC/ETH/SOL buy-and-hold controls, and the ETF diversification sleeve when comparable evidence exists.",
      "first_test": "Complete the missing TTM-01 history and chronological walk-forward/holdout validation; do not emit a paper signal from this snapshot.",
      "paper_or_backtest_next_step": "Keep the crypto sleeve at zero allocation until its evidence gates pass; rank it against other validated sleeves rather than rank individual coins.",
      "reject_conditions": "Reject or park if walk-forward, cost sensitivity, robustness, or drawdown gates fail.",
      "score": 35
    },
    {
      "idea_id": "2026-07-22-QTF-MORNING-02",
      "desk": "Funding-Rate Extremes / Carry Validation Desk",
      "source_notes": [
        "[[CASHCAT Funding Persistence Evidence Review - 2026-07-14]]",
        "[[QTF Edge-First Production Mandate]]"
      ],
      "market": "Funding-rate-extremes universe (current screened example: VINE)",
      "venue": "Hyperliquid public info endpoint; no auth",
      "thesis": "Test the pre-defined funding-rate-extremes / carry rule; VINE is one currently screened observation, not the edge itself or a standing trade thesis.",
      "why_now": "Screened example VINE: funding annualized \u2248 188.68%, 24h volume \u2248 $1,442,157. This observation only enters the funding-extremes test queue.",
      "regime_assumption": "crowded positioning / funding dislocation",
      "required_data": "Hourly funding history, mark/spot basis, OI, volume, liquidation buffer, realistic costs and forward outcomes.",
      "risk_flags": [
        "funding can flip",
        "liquidation risk",
        "venue risk",
        "no live auth/orders"
      ],
      "benchmark": "Cash / no-position and a liquid BTC perpetual funding control.",
      "first_test": "Run the pre-defined persistence/fade analysis only after sufficient aligned observations and cost assumptions.",
      "paper_or_backtest_next_step": "Recorder and paper ledger only; test the funding-extremes rule across eligible instruments, then compare any validated result with ETF diversification and other eligible sleeves.",
      "reject_conditions": "Reject if funding mean-reverts before costs, liquidity is inadequate, or forward outcomes fail the declared rule.",
      "score": 55
    },
    {
      "idea_id": "2026-07-22-QTF-MORNING-03",
      "desk": "ETF Diversification / Cross-Sleeve Capital Allocation Desk",
      "source_notes": [
        "[[QTF Edge-First Production Mandate]]",
        "[[AI Quant Trading Floor Dashboard]]"
      ],
      "market": "ETF diversification sleeve: SPY/QQQ/TLT/IEF/GLD/UUP control universe",
      "venue": "Existing read-only ETF paper monitor; public data only",
      "thesis": "Use the ETF sleeve as the stabilising diversification component of a future cross-sleeve capital-allocation framework, alongside validated crypto-edge sleeves; it is not a standalone edge claim.",
      "why_now": "ETFs provide a potentially more stable, diversifying sleeve for capital weighting against validated crypto edges. The question is the measured cross-sleeve capital weight, not whether ETFs must compete as a standalone alpha thesis.",
      "regime_assumption": "cross-asset tactical trend with cash fallback",
      "required_data": "Frozen daily ETF OHLCV, explicit signal rule, cost model, walk-forward/holdout results, drawdown and correlation measures.",
      "risk_flags": [
        "no evidence-based allocation yet",
        "market-hours/gap risk",
        "model risk",
        "no broker access/orders"
      ],
      "benchmark": "Cash, buy-and-hold controls, and all other validated sleeve candidates on comparable net-risk metrics.",
      "first_test": "Verify the ETF sleeve inputs and build a comparable cross-sleeve scorecard: net return, drawdown, liquidity, correlation, capacity and evidence quality versus each validated crypto-edge sleeve.",
      "paper_or_backtest_next_step": "Use the resulting scorecard to determine future capital weights between the diversifying ETF sleeve and validated crypto edges; no static allocation or live capital change is implied.",
      "reject_conditions": "Reject or park if no precise rule, frozen data, realistic costs, held-out evidence, or paper-monitorable signal exists.",
      "score": 40
    }
  ]
}
```
