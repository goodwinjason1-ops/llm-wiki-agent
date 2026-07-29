# QTF-V01 TTM-01 Parameter Robustness / Jitter Analysis

**Decision: do_not_promote.**

Generated: 2026-07-16T03:56:08+00:00
Manifest SHA-256: `356420e8a737f967a32ab3cf740f0bcfa069a7c6cbf3276b91b30c5c630ceae7`
Output SHA-256: `ce64f3e8634a0fdd6d0d8d3ee0f63c64ed6fa89a31142a2d63074d40cfeefb89`

## Base Result (Holdout, 20 bps)
- Rows: 359
- Total return: -0.4328%
- Sharpe: -1.249
- Max drawdown: -0.5133%
- Trade count: 40

## Robustness Summary
- Parameter combinations tested: 972
- Holdout return survival rate (>= base): 52.8%
- Holdout Sharpe survival rate (>= base): 44.4%
- Holdout MDD survival rate (>= base): 50.0%
- Mean holdout return across jitter: -0.4328%
- Std holdout return across jitter: 0.1317%
- Mean holdout Sharpe: -1.256
- Mean holdout MDD: -0.5300%
- Mean holdout trades: 37
- **Robustness gate: FAILED**

## Parameter Sensitivity (Pearson correlation with holdout return)
Sorted by absolute correlation:
- **lookback20**: +0.6613
- **vol_target**: -0.5361
- **cost_bps**: -0.4470
- **rebal_thresh**: +0.0000
- **lookback60**: +0.0000
- **score_w**: +0.0000

## Interpretation
The TTM-01 rule was tested across 730 parameter combinations (3 lookback20 × 3 lookback60 × 3 vol_target × 3 reb_thresh × 3 score_w × 4 cost).
The robustness gate requires >= 60% of jittered parameters to produce holdout returns at or above the base result.
Current survival rate: 52.8%. Result is NOT robust — sensitive to parameter choice.

No trades, alerts, allocations, credentials or contacts were used.
