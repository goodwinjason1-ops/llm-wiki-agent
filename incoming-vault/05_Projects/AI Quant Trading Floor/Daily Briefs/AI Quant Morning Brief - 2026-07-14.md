---
title: AI Quant Morning Brief - 2026-07-14
created: 2026-07-14
updated: 2026-07-13T20:00:08+00:00
type: daily-brief
status: generated
tags: [quant, morning-brief, read-only, guardrails]
---

# AI Quant Morning Brief - 2026-07-14

> Read-only research brief. No broker/exchange auth, no wallet actions, no orders. This is an idea-generation and evidence-gating workflow toward agents eventually trading with guardrails only after explicit approval.

> **Correction (2026-07-14):** The ETH-only candidate framing below is superseded. ETH is retained only as a benchmark/control inside cross-sectional and multi-asset tests. It is not an independent evidence queue or allocation thesis.

## Market snapshot

| Symbol | Close | 1D | 7D | 30D | Regime |
|---|---:|---:|---:|---:|---|
| BTCUSDT | 62268.7000 | -2.37% | -2.77% | -3.39% | range/chop |
| ETHUSDT | 1774.4700 | -1.79% | -1.39% | 5.55% | range/chop |
| SOLUSDT | 75.1700 | -2.28% | -8.28% | 9.07% | mixed |

## Three candidate ideas

### 1. Tactical Crypto Regime Desk — ETHUSDT

- **Idea ID:** `2026-07-14-QTF-MORNING-01`
- **Source notes:** [[QTF-017 Morning Idea Generator from Second Brain]]
- **Venue:** Bybit public data; no auth
- **Thesis:** Watch ETHUSDT as the strongest 7-day regime candidate
- **Why now:** ETHUSDT 7d=-1.39%, 30d=5.55%, regime=range/chop.
- **Regime assumption:** range/chop
- **Required data:** Bybit public candles, spread/liquidity check, benchmark BTC/ETH/SOL equal weight.
- **Risk flags:** directional beta, chop/reversal risk, weekend liquidity, no live order permission
- **Benchmark:** SOLUSDT
- **First test:** Run next-bar daily momentum/chop filter backtest; compare to equal-weight and buy-hold.
- **Next step:** Backtest only; if stable, add paper watch row with max-loss and no execution.
- **Reject conditions:** Reject if edge disappears after costs, underperforms benchmark, or drawdown > predefined sleeve limit.
- **Readiness score:** 80/100

### 2. Alternative Venue / Funding Desk — CASHCAT

- **Idea ID:** `2026-07-14-QTF-MORNING-02`
- **Source notes:** [[QTF-013 Hyperliquid Lighter Farming and Perp Venue Watchlist]], [[Alternative Venues Strategy Map - Prediction Markets Hyperliquid DeFi]]
- **Venue:** Hyperliquid public info endpoint; no auth
- **Thesis:** Investigate extreme funding/open-interest candidate CASHCAT
- **Why now:** CASHCAT funding annualized ≈ 362.42%, 24h volume ≈ $16,576,064.
- **Regime assumption:** perp funding dislocation / crowded positioning
- **Required data:** Hourly funding snapshots, mark/spot basis, OI, volume, liquidation buffer, cost model.
- **Risk flags:** leverage/liquidation risk, exchange risk, funding sign can flip, no live auth/orders
- **Benchmark:** Cash / no-position plus BTC perp funding baseline
- **First test:** Replay funding persistence/fade using recorded hourly snapshots; require 48+ samples before interpreting.
- **Next step:** Read-only recorder + paper ledger only; no private keys/API keys.
- **Reject conditions:** Reject if funding mean-reverts too fast after fees/slippage or OI/volume is too thin.
- **Readiness score:** 70/100

### 3. Strategy Intake / Social Claim Review Desk — multi-asset / source-dependent

- **Idea ID:** `2026-07-14-QTF-MORNING-03`
- **Source notes:** [[QTF-024 Contradiction Detection Research - 2026-07-14]]
- **Venue:** Vault research intake
- **Thesis:** Turn `QTF-024 Contradiction Detection Research - 2026-07-14` into a structured research card
- **Why now:** Recent vault source scored 11 for: sharpe, DeFi, wallet.
- **Regime assumption:** unknown until source rules are extracted
- **Required data:** Full source URL/body/video/comments, exact rules, costs, benchmark window, failure modes.
- **Risk flags:** source-limited risk, social-proof bias, overfitting/high-Sharpe claim risk, no live execution
- **Benchmark:** Relevant passive benchmark over same window
- **First test:** Complete source extraction and claim card before writing code.
- **Next step:** If rules become exact, write a small clean-room backtest scaffold.
- **Reject conditions:** Reject or park if source stays incomplete, rules are vague, or claims cannot be benchmarked.
- **Readiness score:** 44/100

## Alternative-venue public scan excerpt

### Hyperliquid funding/OI candidates
| Coin | Funding ann. | 24h volume | Mark |
|---|---:|---:|---:|
| CASHCAT | 362.42% | $16,576,064 | 0.1368 |
| PENGU | -114.46% | $1,197,939 | 0.005813 |
| SPX | -75.44% | $2,922,044 | 0.35262 |
| VVV | 56.71% | $2,328,265 | 10.818 |
| ARB | -53.33% | $13,427,720 | 0.09109 |

### Polymarket high-volume macro/crypto headlines
| Question | Liquidity | End |
|---|---:|---|
| Will Marlon Scott West win the 2026 Greater Manchester Mayoral Election? | $68,555 | 2026-07-30 |
| Will Carlos Roberto Massa Júnior finish in third place in the first round of the 2026 Brazilian presidential election? | $31,591 | 2026-10-04 |
| Will the price of Ethereum be above $2,000 on July 14? | $17,350 | 2026-07-14 |

## Recent source notes considered

- [[QTF-024 Contradiction Detection Research - 2026-07-14]] — score 11; sharpe, DeFi, wallet; `05_Projects\AI Quant Trading Floor\Backtests\QTF-024 Contradiction Detection Research - 2026-07-14.md`
- [[0xJeff Hermes Workflows - Source Review - 2026-07-14]] — score 4; agent, claim; `03_Sources\x\0xJeff Hermes Workflows - Source Review - 2026-07-14.md`
- [[Morin Performance Review Dashboard and First AI Trading Workflow - Source Review - 2026-07-13]] — score 5; DeFi, claim; `03_Sources\x\Morin Performance Review Dashboard and First AI Trading Workflow - Source Review - 2026-07-13.md`
- [[QTF-023 Robot James Crypto Pairs Smoke Test - 2026-07-13]] — score 4; sharpe; `05_Projects\AI Quant Trading Floor\Backtests\QTF-023 Robot James Crypto Pairs Smoke Test - 2026-07-13.md`
- [[Miles Deutscher Vibe-Code TradingView Claude Article - Source Review - 2026-07-13]] — score 11; DeFi, wallet, agent, claim; `03_Sources\x\Miles Deutscher Vibe-Code TradingView Claude Article - Source Review - 2026-07-13.md`
- [[DamiDefi UCL Finance Paper Agent Architectures - Source Summary - 2026-07-13]] — score 5; DeFi, agent; `03_Sources\x\DamiDefi UCL Finance Paper Agent Architectures - Source Summary - 2026-07-13.md`
- [[2026-07-13-QTF-MORNING-03 Strategy Claim Card]] — score 6; morning, DeFi, claim, source-limited; `05_Projects\AI Quant Trading Floor\Strategies\2026-07-13-QTF-MORNING-03 Strategy Claim Card.md`
- [[2026-07-13-QTF-MORNING-01 Tactical Crypto Regime Backtest]] — score 7; morning, sharpe; `05_Projects\AI Quant Trading Floor\Backtests\2026-07-13-QTF-MORNING-01 Tactical Crypto Regime Backtest.md`
- [[Miles Claude Trading Bot Article - X 2075615711150608468]] — score 4; agent, claim; `03_Sources\x\Miles Claude Trading Bot Article - X 2075615711150608468.md`
- [[Moon Dev Robinhood Meme Discovery Bot - X 2075628021118099917]] — score 10; wallet, Antoine, agent; `03_Sources\x\Moon Dev Robinhood Meme Discovery Bot - X 2075628021118099917.md`

## Guardrail checklist

- [ ] No live execution requested or performed.
- [ ] No private API keys, broker auth, wallets, or deposits used.
- [ ] Each idea has a benchmark and reject condition.
- [ ] Candidates move to backtest/paper only after exact rules/data exist.
- [ ] Any future live/guardrailed trading requires explicit Jayse approval for venue, capital, max loss, and kill-switches.

## Machine-readable ideas

```json
{
  "run_id": "20260713T200003Z",
  "generated_at": "2026-07-13T20:00:08+00:00",
  "ideas": [
    {
      "idea_id": "2026-07-14-QTF-MORNING-01",
      "desk": "Tactical Crypto Regime Desk",
      "source_notes": [
        "[[QTF-017 Morning Idea Generator from Second Brain]]"
      ],
      "market": "ETHUSDT",
      "venue": "Bybit public data; no auth",
      "thesis": "Watch ETHUSDT as the strongest 7-day regime candidate",
      "why_now": "ETHUSDT 7d=-1.39%, 30d=5.55%, regime=range/chop.",
      "regime_assumption": "range/chop",
      "required_data": "Bybit public candles, spread/liquidity check, benchmark BTC/ETH/SOL equal weight.",
      "risk_flags": [
        "directional beta",
        "chop/reversal risk",
        "weekend liquidity",
        "no live order permission"
      ],
      "benchmark": "SOLUSDT",
      "first_test": "Run next-bar daily momentum/chop filter backtest; compare to equal-weight and buy-hold.",
      "paper_or_backtest_next_step": "Backtest only; if stable, add paper watch row with max-loss and no execution.",
      "reject_conditions": "Reject if edge disappears after costs, underperforms benchmark, or drawdown > predefined sleeve limit.",
      "score": 80
    },
    {
      "idea_id": "2026-07-14-QTF-MORNING-02",
      "desk": "Alternative Venue / Funding Desk",
      "source_notes": [
        "[[QTF-013 Hyperliquid Lighter Farming and Perp Venue Watchlist]]",
        "[[Alternative Venues Strategy Map - Prediction Markets Hyperliquid DeFi]]"
      ],
      "market": "CASHCAT",
      "venue": "Hyperliquid public info endpoint; no auth",
      "thesis": "Investigate extreme funding/open-interest candidate CASHCAT",
      "why_now": "CASHCAT funding annualized \u2248 362.42%, 24h volume \u2248 $16,576,064.",
      "regime_assumption": "perp funding dislocation / crowded positioning",
      "required_data": "Hourly funding snapshots, mark/spot basis, OI, volume, liquidation buffer, cost model.",
      "risk_flags": [
        "leverage/liquidation risk",
        "exchange risk",
        "funding sign can flip",
        "no live auth/orders"
      ],
      "benchmark": "Cash / no-position plus BTC perp funding baseline",
      "first_test": "Replay funding persistence/fade using recorded hourly snapshots; require 48+ samples before interpreting.",
      "paper_or_backtest_next_step": "Read-only recorder + paper ledger only; no private keys/API keys.",
      "reject_conditions": "Reject if funding mean-reverts too fast after fees/slippage or OI/volume is too thin.",
      "score": 70
    },
    {
      "idea_id": "2026-07-14-QTF-MORNING-03",
      "desk": "Strategy Intake / Social Claim Review Desk",
      "source_notes": [
        "[[QTF-024 Contradiction Detection Research - 2026-07-14]]"
      ],
      "market": "multi-asset / source-dependent",
      "venue": "Vault research intake",
      "thesis": "Turn `QTF-024 Contradiction Detection Research - 2026-07-14` into a structured research card",
      "why_now": "Recent vault source scored 11 for: sharpe, DeFi, wallet.",
      "regime_assumption": "unknown until source rules are extracted",
      "required_data": "Full source URL/body/video/comments, exact rules, costs, benchmark window, failure modes.",
      "risk_flags": [
        "source-limited risk",
        "social-proof bias",
        "overfitting/high-Sharpe claim risk",
        "no live execution"
      ],
      "benchmark": "Relevant passive benchmark over same window",
      "first_test": "Complete source extraction and claim card before writing code.",
      "paper_or_backtest_next_step": "If rules become exact, write a small clean-room backtest scaffold.",
      "reject_conditions": "Reject or park if source stays incomplete, rules are vague, or claims cannot be benchmarked.",
      "score": 44
    }
  ]
}
```
