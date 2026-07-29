# Assumptions — baseline_simple

- Public-data/read-only only.
- No wallet, auth, deposits, or orders.
- Scanner rows are treated as candidate observations, not fills.
- Net return is set to `0.0` until reproducible fill/outcome replay exists.
- Holdout is marked as used only as a structural gate; future implementation must preserve a chronological holdout for replay/backtest.
- Candidate rows observed: 116.
- Snapshot rows observed: 110.
- Edge counts: {"PM-E03": 61, "PM-E04": 55}.
