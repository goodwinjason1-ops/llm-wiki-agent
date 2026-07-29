---
title: AI Quant Morning Brief - 2026-07-10
created: 2026-07-10
updated: 2026-07-09T20:00:18+00:00
type: daily-brief
status: generated
tags: [quant, morning-brief, read-only, guardrails]
---

# AI Quant Morning Brief - 2026-07-10

> Read-only research brief. No broker/exchange auth, no wallet actions, no orders. This is an idea-generation and evidence-gating workflow toward agents eventually trading with guardrails only after explicit approval.

## Market snapshot

| Symbol | Close | 1D | 7D | 30D | Regime |
|---|---:|---:|---:|---:|---|
| BTCUSDT | 63271.6000 | 1.58% | 2.78% | 2.50% | range/chop |
| ETHUSDT | 1749.0300 | 0.32% | 2.84% | 6.68% | range/chop |
| SOLUSDT | 78.1600 | 0.41% | -3.17% | 20.28% | mixed |

## Three candidate ideas

### 1. Tactical Crypto Regime Desk — ETHUSDT

- **Idea ID:** `2026-07-10-QTF-MORNING-01`
- **Source notes:** [[QTF-017 Morning Idea Generator from Second Brain]]
- **Venue:** Bybit public data; no auth
- **Thesis:** Watch ETHUSDT as the strongest 7-day regime candidate
- **Why now:** ETHUSDT 7d=2.84%, 30d=6.68%, regime=range/chop.
- **Regime assumption:** range/chop
- **Required data:** Bybit public candles, spread/liquidity check, benchmark BTC/ETH/SOL equal weight.
- **Risk flags:** directional beta, chop/reversal risk, weekend liquidity, no live order permission
- **Benchmark:** SOLUSDT
- **First test:** Run next-bar daily momentum/chop filter backtest; compare to equal-weight and buy-hold.
- **Next step:** Backtest only; if stable, add paper watch row with max-loss and no execution.
- **Reject conditions:** Reject if edge disappears after costs, underperforms benchmark, or drawdown > predefined sleeve limit.
- **Readiness score:** 80/100

### 2. Alternative Venue / Funding Desk — ADA

- **Idea ID:** `2026-07-10-QTF-MORNING-02`
- **Source notes:** [[QTF-013 Hyperliquid Lighter Farming and Perp Venue Watchlist]], [[Alternative Venues Strategy Map - Prediction Markets Hyperliquid DeFi]]
- **Venue:** Hyperliquid public info endpoint; no auth
- **Thesis:** Investigate extreme funding/open-interest candidate ADA
- **Why now:** ADA funding annualized ≈ -47.48%, 24h volume ≈ $4,049,656.
- **Regime assumption:** perp funding dislocation / crowded positioning
- **Required data:** Hourly funding snapshots, mark/spot basis, OI, volume, liquidation buffer, cost model.
- **Risk flags:** leverage/liquidation risk, exchange risk, funding sign can flip, no live auth/orders
- **Benchmark:** Cash / no-position plus BTC perp funding baseline
- **First test:** Replay funding persistence/fade using recorded hourly snapshots; require 48+ samples before interpreting.
- **Next step:** Read-only recorder + paper ledger only; no private keys/API keys.
- **Reject conditions:** Reject if funding mean-reverts too fast after fees/slippage or OI/volume is too thin.
- **Readiness score:** 70/100

### 3. Strategy Intake / Social Claim Review Desk — multi-asset / source-dependent

- **Idea ID:** `2026-07-10-QTF-MORNING-03`
- **Source notes:** [[QTF-017 Morning Idea Generator from Second Brain]]
- **Venue:** Vault research intake
- **Thesis:** Turn `QTF-017 Morning Idea Generator from Second Brain` into a structured research card
- **Why now:** Recent vault source scored 19 for: morning, trading ideas, Hyperliquid, Obsidian, self-evolving, claim.
- **Regime assumption:** unknown until source rules are extracted
- **Required data:** Full source URL/body/video/comments, exact rules, costs, benchmark window, failure modes.
- **Risk flags:** source-limited risk, social-proof bias, overfitting/high-Sharpe claim risk, no live execution
- **Benchmark:** Relevant passive benchmark over same window
- **First test:** Complete source extraction and claim card before writing code.
- **Next step:** If rules become exact, write a small clean-room backtest scaffold.
- **Reject conditions:** Reject or park if source stays incomplete, rules are vague, or claims cannot be benchmarked.
- **Readiness score:** 75/100

## Alternative-venue public scan excerpt

### Hyperliquid funding/OI candidates
| Coin | Funding ann. | 24h volume | Mark |
|---|---:|---:|---:|
| ADA | -47.48% | $4,049,656 | 0.16558 |
| LIT | -32.06% | $42,033,315 | 2.3301 |
| CHIP | -27.78% | $1,165,199 | 0.032856 |
| VVV | 23.61% | $5,339,395 | 11.546 |
| VINE | -20.17% | $1,539,324 | 0.009481 |

### Polymarket high-volume macro/crypto headlines
| Question | Liquidity | End |
|---|---:|---|
| Will New People (NL) win the most seats in the next Russian parliamentary election? | $90,426 | 2026-09-30 |
| Exact Score: Sandefjord Fotball 1 - 1 Hamarkameratene? | $2,785 | 2026-07-12 |

## Recent source notes considered

- [[Native CORE_DEF Run Card Artifact Contract - 2026-07-09]] — score 8; sharpe, wallet; `05_Projects\AI Quant Trading Floor\Backtests\Native CORE_DEF Run Card Artifact Contract - 2026-07-09.md`
- [[QTF-Candidate Chronos Polymarket Directional Edge]] — score 4; wallet; `05_Projects\AI Quant Trading Floor\Strategies\QTF-Candidate Chronos Polymarket Directional Edge.md`
- [[AI Edge Personal Agent Ideas - X 2068159407645671640]] — score 2; agent; `03_Sources\x\AI Edge Personal Agent Ideas - X 2068159407645671640.md`
- [[QTF-017 Morning Idea Generator from Second Brain]] — score 19; morning, trading ideas, Hyperliquid, Obsidian, self-evolving, claim; `05_Projects\AI Quant Trading Floor\Strategies\QTF-017 Morning Idea Generator from Second Brain.md`
- [[X Bookmark Cap 7 - DamiDefi DeFi Network Video Source Limited]] — score 9; DeFi, wallet, Antoine, source-limited; `03_Sources\x\X Bookmark Cap 7 - DamiDefi DeFi Network Video Source Limited.md`
- [[X Bookmark Cap 6 - AI Edge Anthropic Agentic Skills Guide]] — score 2; agent, claim, source-limited; `03_Sources\x\X Bookmark Cap 6 - AI Edge Anthropic Agentic Skills Guide.md`
- [[X Bookmark Cap 5 - CyrilXBT Terminal Torrent Client]] — score 4; Antoine, claim, source-limited; `03_Sources\x\X Bookmark Cap 5 - CyrilXBT Terminal Torrent Client.md`
- [[X Bookmark Cap 4 - CyrilXBT Obsidian Trading Ideas Morning Workflow]] — score 14; morning, trading ideas, Antoine, Obsidian, claim, source-limited; `03_Sources\x\X Bookmark Cap 4 - CyrilXBT Obsidian Trading Ideas Morning Workflow.md`
- [[X Bookmark Cap 3 - MoonDev AutoGPT Sharpe Trading Bot]] — score 9; sharpe, AutoGPT, agent, claim, source-limited; `03_Sources\x\X Bookmark Cap 3 - MoonDev AutoGPT Sharpe Trading Bot.md`
- [[X Bookmark Cap 2 - AI Edge Fable Obsidian Self-Evolving Loops]] — score 5; Obsidian, self-evolving, claim, source-limited; `03_Sources\x\X Bookmark Cap 2 - AI Edge Fable Obsidian Self-Evolving Loops.md`

## Guardrail checklist

- [ ] No live execution requested or performed.
- [ ] No private API keys, broker auth, wallets, or deposits used.
- [ ] Each idea has a benchmark and reject condition.
- [ ] Candidates move to backtest/paper only after exact rules/data exist.
- [ ] Any future live/guardrailed trading requires explicit Jayse approval for venue, capital, max loss, and kill-switches.

## Machine-readable ideas

```json
{
  "run_id": "20260709T200013Z",
  "generated_at": "2026-07-09T20:00:18+00:00",
  "ideas": [
    {
      "idea_id": "2026-07-10-QTF-MORNING-01",
      "desk": "Tactical Crypto Regime Desk",
      "source_notes": [
        "[[QTF-017 Morning Idea Generator from Second Brain]]"
      ],
      "market": "ETHUSDT",
      "venue": "Bybit public data; no auth",
      "thesis": "Watch ETHUSDT as the strongest 7-day regime candidate",
      "why_now": "ETHUSDT 7d=2.84%, 30d=6.68%, regime=range/chop.",
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
      "idea_id": "2026-07-10-QTF-MORNING-02",
      "desk": "Alternative Venue / Funding Desk",
      "source_notes": [
        "[[QTF-013 Hyperliquid Lighter Farming and Perp Venue Watchlist]]",
        "[[Alternative Venues Strategy Map - Prediction Markets Hyperliquid DeFi]]"
      ],
      "market": "ADA",
      "venue": "Hyperliquid public info endpoint; no auth",
      "thesis": "Investigate extreme funding/open-interest candidate ADA",
      "why_now": "ADA funding annualized \u2248 -47.48%, 24h volume \u2248 $4,049,656.",
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
      "idea_id": "2026-07-10-QTF-MORNING-03",
      "desk": "Strategy Intake / Social Claim Review Desk",
      "source_notes": [
        "[[QTF-017 Morning Idea Generator from Second Brain]]"
      ],
      "market": "multi-asset / source-dependent",
      "venue": "Vault research intake",
      "thesis": "Turn `QTF-017 Morning Idea Generator from Second Brain` into a structured research card",
      "why_now": "Recent vault source scored 19 for: morning, trading ideas, Hyperliquid, Obsidian, self-evolving, claim.",
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
      "score": 75
    }
  ]
}
```
