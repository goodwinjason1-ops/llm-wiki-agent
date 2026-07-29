# Risk Controls

Non-negotiable defaults:

- live trading disabled by default
- no martingale
- no uncapped averaging down
- no execution without risk approval
- paper execution only consumes stored approved risk decisions
- paper positions retain proposal/order lineage and can close only from stored
  proposal stop, target, or time-stop rules
- paper accounting marks only stored open positions with a latest stored midpoint
- no full Kelly sizing
- all trades require stop, target, and time stop
- stale data blocks approval
- operator pause and kill switch override automation

Sizing starts with fixed conservative sizing:

- max risk per trade: 0.25 percent of portfolio
- max allocation per trade: 1 percent of portfolio
- max strategy allocation: 20 percent of portfolio
- max category allocation: 10 percent of portfolio
- daily drawdown halt: 2 percent
- weekly drawdown halt: 6 percent

Kelly is recorded in shadow mode for calibration and capped by `MAX_KELLY_MULTIPLIER=0.33`.

Paper execution is still a controlled execution path. It ignores rejected
decisions, ignores zero-size approvals, refuses mismatched proposal ids, and is
idempotent by proposal so repeated polling cannot create duplicate paper orders.

Mark-to-market PnL is informational for paper research. Missing mark prices are
skipped, unrealized PnL is derived from stored position quantity and average
entry, and the accounting step cannot create live or paper orders.

Paper close review runs before mark-to-market accounting in the polling cycle.
It uses the latest stored midpoint for each open paper position, persists
realized PnL with an exit price and close reason, and emits evidence-ledger
events. Missing midpoints or untriggered exits are skipped rather than forced.
