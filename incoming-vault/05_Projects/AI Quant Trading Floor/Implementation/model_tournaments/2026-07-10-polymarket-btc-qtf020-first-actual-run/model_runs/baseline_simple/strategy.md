# Strategy — baseline_simple

Status: completed first-run seed candidate
Strategy ID: `QTF020-BASELINE-OBSERVE-ONLY`

## Thesis

Baseline records detected candidate frequency without taking trades; any active strategy must beat this evidence standard after costs and fill realism.

## Rules — research-only reconstruction

1. Read candidate rows from `shared_readonly_data/polymarket_edge_candidates.jsonl`.
2. Filter to the relevant candidate family for this model-run thesis.
3. Do **not** assume fills from scanner appearance alone.
4. Require later replay to model bid/ask spread, queue, latency, taker/maker fees, adverse selection, and resolved market outcome.
5. Reject promotion if replay cannot prove positive expectancy after conservative costs.

## Current verdict

This is a completed tournament-run artifact, but it is **not a live or paper-approved strategy**. It is a research candidate/control for the review board.
