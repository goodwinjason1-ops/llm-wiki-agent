# QTF-022 Supply-Side Lab

Research-only Polymarket parity and maker-economics scaffold.

## Run

```bash
cd "C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/AI Quant Trading Floor/Implementation"
python polymarket_supply_side_lab.py \
  --snapshots ledgers/polymarket_orderbook_snapshots.jsonl \
  --output supply_side_lab/runs/2026-07-10-first-slice
```

## Test

```bash
python -m pytest test_polymarket_supply_side_lab.py -q
python -m pytest test_polymarket_edge_scanner.py test_polymarket_model_tournament.py test_polymarket_supply_side_lab.py -q
```

## Output contract

```text
parity_scan_summary.json
parity_candidates.jsonl
observed_parity.jsonl
run_summary.json
decision.md
```

## Sequential L2 collection and replay

```bash
python polymarket_l2_collector.py \
  --output supply_side_lab/runs/manual-sequential-capture \
  --samples 20 \
  --interval-seconds 1 \
  --max-markets 1
```

Then:

```python
from polymarket_supply_side_lab import run_sequential_replay
run_sequential_replay(
    "supply_side_lab/runs/manual-sequential-capture/sequential_l2_snapshots.jsonl",
    "supply_side_lab/runs/manual-sequential-capture",
)
```

The replay records displayed queue ahead, crossed-quote first/second-leg signals, seller markouts at +1/+5/+30 seconds, residual-leg taker flatten costs, and separate maker-reward attribution. Crossed quotes are not treated as confirmed trades.

## Interpretation

A scanner candidate is not a trade. Sequential L2 evidence is still not a trade tape; public trade or stronger queue-depletion evidence is required before treating a crossed quote as a fill.

No wallet, authentication or order path is present.
