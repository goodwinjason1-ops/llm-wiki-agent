---
title: Edge Class Evaluation
created: 2026-07-29
updated: 2026-07-29
type: concept
tags: [quant, robot-james, backtesting, evaluation, methodology]
sources: [03_Sources/Robot James Method Library - Caps 1 to 9.md, 03_Sources/robot-james/raw-extracts/08-three-types-of-systematic-trading.md]
confidence: medium
---

# Edge Class Evaluation

Judge a strategy by the standards of its edge class, not through one generic backtest. A risk-premium harvester, a forced-flow trade and a prediction model fail in different ways, so testing them identically will pass the wrong ones.

## Summary

A single backtest template — split, run, check Sharpe, check drawdown — implicitly assumes all strategies can be wrong in the same way. They cannot:

| Edge class | Primary failure mode | What must be tested |
|---|---|---|
| Risk premia | The premium disappears, or you cannot hold through the drawdown | Regime coverage, holding-period survival, [[survival-sizing]] |
| Forced flow | The participant stops being forced, or the flow is anticipated | Participant persistence, window stability, crowding |
| Prediction | The signal was noise, or was fitted | Out-of-sample, parameter jitter, sign tests |

The Quant Floor's current gate stack — jitter robustness, cost sensitivity, chronological holdout, randomised sign test — is a **prediction-class** test suite. Applied to a genuine risk-premium sleeve it would likely reject it, because risk premia have long unrewarded stretches by construction.

## Key claims

- Judge strategies according to their edge class, not through one generic backtest — source: `03_Sources/Robot James Method Library - Caps 1 to 9.md`
- Three types of systematic trading are distinguished in the source material — source: `03_Sources/robot-james/raw-extracts/08-three-types-of-systematic-trading.md`
- Claimed backtests are author-reported unless reproduced with independent data, realistic costs and next-bar execution — source: `03_Sources/Robot James Method Library - Caps 1 to 9.md`
- The existing Quant Floor gates are prediction-class tests and would misjudge a risk-premium sleeve ^conf:low — our inference; not stated by the source and not yet tested

## Evidence from the vault's own record

Every sleeve tested to date has returned `do_not_promote`. Read one way that is disciplined gatekeeping. Read another way, a test suite that rejects everything is not discriminating — it is either testing the wrong class of thing or the candidate generator is drawing from the hardest class. See [[risk-premia-before-prediction]].

Both readings are currently consistent with the evidence. Distinguishing them requires running the gates against a strategy already believed to work — a known-good control.

## Links

- Depends on: [[risk-premia-before-prediction]], [[forced-flows]]
- Constrained by: [[survival-sizing]]
- Verification method: [[independent-reproduction]]
- Source library: [[Robot James Method Library - Caps 1 to 9]]
- Raw extract: [[08-three-types-of-systematic-trading]]

## Open questions

- Is there a known-good control strategy the gate stack can be validated against? Without one, "everything fails" is uninterpretable.
- Should each sleeve declare its edge class in frontmatter so the right gates are selected automatically?
