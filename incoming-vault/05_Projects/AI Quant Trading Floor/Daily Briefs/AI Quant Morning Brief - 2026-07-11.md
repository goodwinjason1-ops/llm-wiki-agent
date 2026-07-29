---
title: AI Quant Morning Brief - 2026-07-11
created: 2026-07-11
updated: 2026-07-10T20:00:29+00:00
type: daily-brief
status: generated
tags: [quant, morning-brief, read-only, guardrails]
---

# AI Quant Morning Brief - 2026-07-11

> Read-only research brief. No broker/exchange auth, no wallet actions, no orders. This is an idea-generation and evidence-gating workflow toward agents eventually trading with guardrails only after explicit approval.

## Market snapshot

| Symbol | Close | 1D | 7D | 30D | Regime |
|---|---:|---:|---:|---:|---|
| BTCUSDT | 63908.0000 | 1.08% | 2.11% | 3.90% | range/chop |
| ETHUSDT | 1792.1000 | 2.69% | 1.93% | 10.52% | range/chop |
| SOLUSDT | 77.8800 | -0.22% | -5.42% | 23.25% | mixed |

## Three candidate ideas

### 1. Tactical Crypto Regime Desk — BTCUSDT

- **Idea ID:** `2026-07-11-QTF-MORNING-01`
- **Source notes:** [[QTF-017 Morning Idea Generator from Second Brain]]
- **Venue:** Bybit public data; no auth
- **Thesis:** Watch BTCUSDT as the strongest 7-day regime candidate
- **Why now:** BTCUSDT 7d=2.11%, 30d=3.90%, regime=range/chop.
- **Regime assumption:** range/chop
- **Required data:** Bybit public candles, spread/liquidity check, benchmark BTC/ETH/SOL equal weight.
- **Risk flags:** directional beta, chop/reversal risk, weekend liquidity, no live order permission
- **Benchmark:** SOLUSDT
- **First test:** Run next-bar daily momentum/chop filter backtest; compare to equal-weight and buy-hold.
- **Next step:** Backtest only; if stable, add paper watch row with max-loss and no execution.
- **Reject conditions:** Reject if edge disappears after costs, underperforms benchmark, or drawdown > predefined sleeve limit.
- **Readiness score:** 80/100

### 2. Alternative Venue / Funding Desk — ETHFI

- **Idea ID:** `2026-07-11-QTF-MORNING-02`
- **Source notes:** [[QTF-013 Hyperliquid Lighter Farming and Perp Venue Watchlist]], [[Alternative Venues Strategy Map - Prediction Markets Hyperliquid DeFi]]
- **Venue:** Hyperliquid public info endpoint; no auth
- **Thesis:** Investigate extreme funding/open-interest candidate ETHFI
- **Why now:** ETHFI funding annualized ≈ 83.72%, 24h volume ≈ $2,686,507.
- **Regime assumption:** perp funding dislocation / crowded positioning
- **Required data:** Hourly funding snapshots, mark/spot basis, OI, volume, liquidation buffer, cost model.
- **Risk flags:** leverage/liquidation risk, exchange risk, funding sign can flip, no live auth/orders
- **Benchmark:** Cash / no-position plus BTC perp funding baseline
- **First test:** Replay funding persistence/fade using recorded hourly snapshots; require 48+ samples before interpreting.
- **Next step:** Read-only recorder + paper ledger only; no private keys/API keys.
- **Reject conditions:** Reject if funding mean-reverts too fast after fees/slippage or OI/volume is too thin.
- **Readiness score:** 70/100

### 3. Strategy Intake / Social Claim Review Desk — multi-asset / source-dependent

- **Idea ID:** `2026-07-11-QTF-MORNING-03`
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
| ETHFI | 83.72% | $2,686,507 | 0.41119 |
| AERO | 40.54% | $1,230,629 | 0.51341 |
| XMR | 35.79% | $5,698,110 | 323.98 |
| CRV | -23.78% | $1,648,960 | 0.2066 |
| BTC | 10.95% | $1,794,845,399 | 63899.0 |

### Polymarket high-volume macro/crypto headlines
| Question | Liquidity | End |
|---|---:|---|
| Will Marine Le Pen be the National Rally’s candidate for the 2027 French Presidential election? | $48,143 | 2027-04-23 |
| Will Bitcoin dip to $42,500 in July? | $56,343 | 2026-08-01 |
| Jerome Powell federally charged by December 31, 2026? | $4,985 | 2026-12-31 |
| Iran agrees to surrender enriched uranium stockpile by July 31, 2026? | $162,965 | 2026-07-31 |
| Exact Score: Sandefjord Fotball 1 - 1 Hamarkameratene? | $2,931 | 2026-07-12 |

## Recent source notes considered

- [[Polymarket 5-Minute Whale Economics - Reddit Source - 2026-07-10]] — score 8; wallet, agent, claim; `03_Sources\reddit\Polymarket 5-Minute Whale Economics - Reddit Source - 2026-07-10.md`
- [[Native CORE_DEF Run Card Artifact Contract - 2026-07-09]] — score 8; sharpe, wallet; `05_Projects\AI Quant Trading Floor\Backtests\Native CORE_DEF Run Card Artifact Contract - 2026-07-09.md`
- [[QTF-Candidate Chronos Polymarket Directional Edge]] — score 4; wallet; `05_Projects\AI Quant Trading Floor\Strategies\QTF-Candidate Chronos Polymarket Directional Edge.md`
- [[AI Edge Personal Agent Ideas - X 2068159407645671640]] — score 2; agent; `03_Sources\x\AI Edge Personal Agent Ideas - X 2068159407645671640.md`
- [[QTF-017 Morning Idea Generator from Second Brain]] — score 19; morning, trading ideas, Hyperliquid, Obsidian, self-evolving, claim; `05_Projects\AI Quant Trading Floor\Strategies\QTF-017 Morning Idea Generator from Second Brain.md`
- [[X Bookmark Cap 7 - DamiDefi DeFi Network Video Source Limited]] — score 9; DeFi, wallet, Antoine, source-limited; `03_Sources\x\X Bookmark Cap 7 - DamiDefi DeFi Network Video Source Limited.md`
- [[X Bookmark Cap 6 - AI Edge Anthropic Agentic Skills Guide]] — score 2; agent, claim, source-limited; `03_Sources\x\X Bookmark Cap 6 - AI Edge Anthropic Agentic Skills Guide.md`
- [[X Bookmark Cap 5 - CyrilXBT Terminal Torrent Client]] — score 4; Antoine, claim, source-limited; `03_Sources\x\X Bookmark Cap 5 - CyrilXBT Terminal Torrent Client.md`
- [[X Bookmark Cap 4 - CyrilXBT Obsidian Trading Ideas Morning Workflow]] — score 14; morning, trading ideas, Antoine, Obsidian, claim, source-limited; `03_Sources\x\X Bookmark Cap 4 - CyrilXBT Obsidian Trading Ideas Morning Workflow.md`
- [[X Bookmark Cap 3 - MoonDev AutoGPT Sharpe Trading Bot]] — score 9; sharpe, AutoGPT, agent, claim, source-limited; `03_Sources\x\X Bookmark Cap 3 - MoonDev AutoGPT Sharpe Trading Bot.md`

## Guardrail checklist

- [ ] No live execution requested or performed.
- [ ] No private API keys, broker auth, wallets, or deposits used.
- [ ] Each idea has a benchmark and reject condition.
- [ ] Candidates move to backtest/paper only after exact rules/data exist.
- [ ] Any future live/guardrailed trading requires explicit Jayse approval for venue, capital, max loss, and kill-switches.

## Machine-readable ideas

```json
{
  "run_id": "20260710T200025Z",
  "generated_at": "2026-07-10T20:00:29+00:00",
  "ideas": [
    {
      "idea_id": "2026-07-11-QTF-MORNING-01",
      "desk": "Tactical Crypto Regime Desk",
      "source_notes": [
        "[[QTF-017 Morning Idea Generator from Second Brain]]"
      ],
      "market": "BTCUSDT",
      "venue": "Bybit public data; no auth",
      "thesis": "Watch BTCUSDT as the strongest 7-day regime candidate",
      "why_now": "BTCUSDT 7d=2.11%, 30d=3.90%, regime=range/chop.",
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
      "idea_id": "2026-07-11-QTF-MORNING-02",
      "desk": "Alternative Venue / Funding Desk",
      "source_notes": [
        "[[QTF-013 Hyperliquid Lighter Farming and Perp Venue Watchlist]]",
        "[[Alternative Venues Strategy Map - Prediction Markets Hyperliquid DeFi]]"
      ],
      "market": "ETHFI",
      "venue": "Hyperliquid public info endpoint; no auth",
      "thesis": "Investigate extreme funding/open-interest candidate ETHFI",
      "why_now": "ETHFI funding annualized \u2248 83.72%, 24h volume \u2248 $2,686,507.",
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
      "idea_id": "2026-07-11-QTF-MORNING-03",
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
