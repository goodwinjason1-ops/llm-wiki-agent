---
title: Robot James Crypto Pairs Research Contract - QTF-023
created: 2026-07-13
updated: 2026-07-13
id: QTF-023
type: quant-research-spec
status: queued-for-implementation
managed_as: paper-only
---

# Hypothesis

Temporary, price-insensitive divergence between genuinely related crypto assets can mean-revert after costs, while informed repricing and bad comparisons should be rejected or quarantined.

# Baseline

- Venue: Bybit public linear-perpetual data; no authentication
- Pair: candidate-specific, verified before testing
- Spread: log(price numerator) - log(price denominator)
- Hedge: rolling beta baseline plus equal-notional control
- Reference: rolling 20-bar mean and standard deviation
- Entry: next bar after spread z-score exceeds +/-2.0
- Exit: next bar after spread crosses its rolling mean
- Costs: two-leg fee, slippage, funding/borrow proxy
- Execution: next-bar conservative fill; no same-bar hindsight

# Required gates

1. Pair similarity and economic rationale
2. Both contracts available with adequate history/liquidity
3. Rolling beta/correlation stability
4. Spread amplitude survives two-leg costs
5. No token-specific event, listing/delisting, unlock, exploit or governance shock
6. Funding/liquidation/volume context recorded
7. In-sample, held-out and walk-forward results
8. Parameter jitter and same-age control pairs
9. Portfolio-level factor/exposure limits
10. Forward paper alerts before any production discussion

# Required outputs

- pair universe manifest
- raw data manifest and timestamps
- trade ledger
- metrics: return, CAGR, Sharpe/Sortino, max drawdown, turnover, trade count, exposure, win rate, expectancy
- cost decomposition
- divergence-cause labels: technical-flow / informed-or-manipulation / bad-model / unknown
- decision: advance, revise, quarantine or reject

# Initial status

The Robot James concepts and clean-room rules are documented. The actual crypto-pairs backtest has not yet been run. The earlier BTC momentum test was a separate strategy and must not be reported as pair evidence.
