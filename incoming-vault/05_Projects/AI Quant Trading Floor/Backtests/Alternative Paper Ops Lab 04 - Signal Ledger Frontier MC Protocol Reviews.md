---
title: Alternative Paper Ops Lab 04 - Signal Ledger Frontier MC Protocol Reviews
created: 2026-07-03
updated: 2026-07-03
type: research-evidence
tags: [quant, sharpe-target, paper-trading, polymarket, defi, monte-carlo, protocol-review]
confidence: high
---

# Alternative Paper Ops Lab 04 - Signal Ledger Frontier MC Protocol Reviews

## Goal

Run the next high-value moves after calibrated edge/risk controls:

1. Build and seed a Polymarket paper-signal ledger.
2. Build an outcome tracker for those paper signals.
3. Run Monte Carlo on constrained optimizer frontier weights.
4. Create DeFi protocol-review checklists for risk-adjusted stable-yield candidates.

All work is **read-only / paper-research only**.

## Built artifact

```text
Implementation/alt_paper_ops.py
```

Verified command:

```text
python Implementation/alt_paper_ops.py all
```

Reports:

```text
Implementation/reports/alt_paper_ops_all_20260703T024945+0000.json
Implementation/reports/alt_paper_ops_defi-checklists_20260703T025011+0000.json
Implementation/reports/alt_paper_ops_track-outcomes_20260703T025011+0000.json
```

## 1. Polymarket paper-signal ledger

Ledger path:

```text
Implementation/ledgers/polymarket_paper_signals.jsonl
```

Outcome ledger path:

```text
Implementation/ledgers/polymarket_paper_outcomes.jsonl
```

Current status:

| Ledger | Count |
|---|---:|
| Paper signals recorded | 8 |
| Outcomes resolved | 0 |

Sample recorded signals:

| Signal | Side | Market | Calibrated model | Edge | Confidence | Expiry |
|---|---|---:|---:|---:|---|---|
| ETH above $1,700 on July 3 | YES | 50.00% | 90.00% | +40.00% | low | 2026-07-03 16:00 UTC |
| BTC above $62,000 on July 3 | YES | 19.85% | 44.25% | +24.40% | medium-low | 2026-07-03 16:00 UTC |
| ETH dip to $1,500 in July | YES | 38.50% | 52.98% | +14.48% | medium-low | 2026-08-01 04:00 UTC |

Interpretation:

- The system now records timestamped paper signals instead of only displaying scanner output.
- This gives future evidence: hit rate, Brier score, edge decay, and paper PnL by confidence bucket.
- Outcome tracker is built; no outcomes were ready/resolvable at the verification run.

## 2. Outcome tracker

The tracker checks open paper signals and appends results when they can be resolved.

Important limitation:

- Simple expired above/below markets can be approximated from spot-at-check.
- Touch markets such as “reach”, “hit”, or “dip” are marked for manual/high-low review unless official/intraday high-low resolution is available.

This prevents the system from fabricating outcomes.

## 3. Monte Carlo on optimizer frontier weights

The previous optimizer produced a safer frontier that leaned toward ETF core + DeFi carry + cash until higher-risk sleeves prove themselves. This run tested the optimizer’s top weights with Monte Carlo.

Top 3 frontier Monte Carlo results:

| Rank | ETF | Prediction | Hyperliquid | DeFi | Cash | Median final equity | Prob profit | Median Sharpe | Prob Sharpe ≥ 1.6 | Median max DD |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 35% | 5% | 0% | 25% | 35% | $10,834.63 | 97.52% | 2.0034 | 65.98% | -2.42% |
| 2 | 35% | 0% | 5% | 25% | 35% | $10,827.93 | 97.57% | 2.0100 | 65.93% | -2.38% |
| 3 | 30% | 5% | 5% | 25% | 35% | $10,868.23 | 97.42% | 2.0020 | 65.32% | -2.52% |

Interpretation:

- Under the current research priors, the optimizer frontier has a much better chance of reaching the Sharpe target than the earlier higher-risk heuristic mix.
- The tradeoff is lower median growth than a more aggressive allocation, but materially better drawdown profile.
- This is still prior-based. Real paper returns must replace assumptions before any live discussion.

## 4. DeFi protocol-review checklists

Checklist directory:

```text
Risk Reviews/
```

Created/verified checklists:

| Candidate | Checklist |
|---|---|
| Pendle APYUSD Ethereum pool 22e7a8b0 | `Risk Reviews/DeFi Protocol Review - pendle-APYUSD-Ethereum-22e7a8b0.md` |
| Pendle APYUSD Ethereum pool 9fe33fd6 | `Risk Reviews/DeFi Protocol Review - pendle-APYUSD-Ethereum-9fe33fd6.md` |
| Pendle APYUSD Ethereum pool 8dc83a62 | `Risk Reviews/DeFi Protocol Review - pendle-APYUSD-Ethereum-8dc83a62.md` |
| APYX Protocol APXUSD Ethereum | `Risk Reviews/DeFi Protocol Review - apyx-protocol-APXUSD-Ethereum-cb6139f9.md` |
| Mainstreet MSUSD Ethereum | `Risk Reviews/DeFi Protocol Review - mainstreet-MSUSD-Ethereum-8a28570f.md` |
| Accountable USDC Monad | `Risk Reviews/DeFi Protocol Review - accountable-USDC-Monad-1a9c61c7.md` |

Each checklist requires review of:

- token/receipt mechanics,
- yield source,
- audit/admin keys,
- oracle dependencies,
- withdrawal liquidity,
- depeg/redemption mechanics,
- chain/bridge/sequencer assumptions,
- APY persistence,
- TVL concentration,
- paper-only max weight.

## Current best research posture

The strongest evidence-backed route is now:

```text
ETF tactical core + DeFi stable-yield paper candidates + high cash reserve
+ tiny prediction/funding paper sleeves until real signal/outcome evidence accumulates
```

Best current frontier posture:

| Sleeve | Weight |
|---|---:|
| ETF tactical core | 35% |
| Prediction-market paper sleeve | 5% |
| Hyperliquid paper sleeve | 0% |
| DeFi stable/lending paper sleeve | 25% |
| Cash reserve | 35% |

## Next experiment

1. Schedule daily/periodic paper signal recording for Polymarket.
2. Schedule periodic outcome tracking.
3. Add intraday high/low resolution for touch-style Polymarket markets.
4. Complete protocol review fields for APYUSD/APXUSD/MSUSD candidates.
5. After 48+ Hyperliquid hourly snapshots, run the preliminary funding persistence/fade test.

## Safety status

No live execution. No credentials. No private keys. No deposits. No orders.
