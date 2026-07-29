# QTF-V01 TTM-01 extended history and chronological holdout

Decision: **do_not_promote**.

Input manifest SHA-256: `{manifest_hash}`

Split: {n} rows/symbol; development {split}; holdout {n-split} (70/30 chronological).

## Cost sensitivity
- **10bps** — development total 1.5106%, Sharpe 1.739, DD -0.3370%; holdout total -0.1767%, Sharpe -0.465, DD -0.5152%.
- **20bps** — development total 1.4258%, Sharpe 1.642, DD -0.3552%; holdout total -0.2096%, Sharpe -0.553, DD -0.5376%.
- **40bps** — development total 1.2565%, Sharpe 1.448, DD -0.3916%; holdout total -0.2754%, Sharpe -0.727, DD -0.5824%.
- **60bps** — development total 1.0875%, Sharpe 1.252, DD -0.4280%; holdout total -0.3412%, Sharpe -0.900, DD -0.6271%.

The >=1,095 data gate passed. The candidate remains blocked: this is a fixed-rule holdout, not parameter walk-forward optimization; robustness/jitter, benchmark, and paper-forward gates are outstanding. No trades or alerts.
