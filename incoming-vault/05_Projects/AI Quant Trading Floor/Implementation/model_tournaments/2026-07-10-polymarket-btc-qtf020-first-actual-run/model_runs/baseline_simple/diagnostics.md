# Diagnostics — baseline_simple

## Leakage controls

- Model folder starts from shared data and run card only.
- No other model output is used in this seed candidate.
- No prior profitable strategy report is copied into the candidate.

## Failure modes

- Scanner-level edge may disappear once queue/adverse-selection costs are applied.
- Prediction market resolution/outcome data is not yet replayed here.
- Low liquidity or stale quotes can create fake edge.
- Candidate rows may cluster in one regime/window.

## Required next evidence

1. Outcome resolver for completed markets.
2. Passive fill replay with queue/latency/adverse-selection assumptions.
3. Bootstrap/Monte Carlo only after enough filled trades exist.
4. Review-board rescore after real replay metrics.
