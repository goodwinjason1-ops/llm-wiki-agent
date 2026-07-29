# Strategy Contract

Strategies are proposal generators. They must not place orders or bypass risk checks.

Every proposal must include:

- strategy id
- market and outcome id
- side
- limit price
- estimated probability
- market-implied probability
- confidence score
- liquidity score
- spread
- safe exit liquidity
- stop price
- target price
- time stop
- source timestamp
- rationale and evidence

The risk engine owns final sizing and approval.

## Supported Strategy Edges

The strategy contract applies to every edge. Current strategy ids are:

- `btc_short_timeframe`: BTC-linked prediction markets using BTC spot/perp
  context, momentum/reversal, volatility, liquidity, and source freshness.
- `mean_reversion`: active markets with stretched moves, z-score, velocity,
  liquidity, and catalyst-risk checks.
- `reverse_sniping`: the Reverse Snipe Strategy for unresolved
  high-probability markets late in their lifecycle.

Reverse sniping must be stricter than general mean reversion until validated.
It may create research signals from high implied probability, late public trade
flow, repeat wallet behavior, and fresh CLOB liquidity, but it must not create a
proposal unless the strategy is promoted and all required evidence is current.

Each reverse-sniping signal or proposal must include:

- market and outcome resolution rules
- active/unresolved market status
- bid, ask, midpoint, spread, and safe exit liquidity
- source timestamps for CLOB book, trade flow, and wallet-flow evidence
- public wallet-flow summary and repeatability score
- estimated probability versus market-implied probability
- ambiguity, dispute, invalid-market, or settlement-risk notes
- rationale for trade, wait, or reject
- paper-only validation status unless live promotion is separately approved

## Research Signals

Rolling analytics can also produce `StrategySignal` rows. These are research
artifacts, not trade proposals. A signal may explain that a market looks
extended, but it cannot reach execution unless a later strategy step creates a
separate `TradeProposal` and the risk engine stores an approval.

Signals must:

- use deterministic `signal_id` values so repeated polling updates the same logical signal
- store score components and rationale for later evidence-led review
- remain paper/research-only and never bypass proposal or risk contracts
- tolerate a zero-signal state when current data does not cross strategy thresholds
- keep reverse-sniping wallet-flow observations advisory and evidence-backed,
  never a guarantee or automatic approval

## Promotion Gate

Strategy state is operator-controlled:

- `quarantined` means signals may be stored, but proposal generation is blocked
- `promoted` means eligible signals may become paper `TradeProposal` rows
- `disabled` means the strategy is blocked until an operator changes its state

Promotion applies to paper trading only. Live execution remains separately
blocked by the global live-trading, compliance, operator-confirmation, and risk
health gates.

Reverse sniping should remain `quarantined` until historical/live replay and
paper PnL show that the late-wallet/liquidity-flow signal adds value after
spread, slippage, fees, and settlement risk. Early promotion should be
paper-only and use smaller allocation limits, limit orders only, no averaging
down, and stricter ambiguity filters.

## Evidence Ledger

When a promoted signal becomes a proposal, the system writes evidence events for:

- signal conversion, including the source signal id and conversion reason
- risk review, including approval status, rejection reasons, sizing output, and Kelly shadow values
- reverse-sniping candidate review, including wallet-flow summary, liquidity
  depth, resolution ambiguity checks, and post-trade paper reflection

The evidence ledger is the compact audit trail for post-trade review and for
the dashboard's "why not trade" analysis.
