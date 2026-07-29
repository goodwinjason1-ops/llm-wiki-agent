---
title: GPT 5.6 Polymarket BTC Strategy Workflow - Video Ingest
date: 2026-07-10
type: source-ingest
status: captured
source_url: https://youtu.be/bzWWeya4crg?si=YTC0ctzNgbKYQbGW
tags: [ai-quant, polymarket, btc, prediction-markets, llm-agents, strategy-research]
---

# GPT 5.6 Polymarket BTC Strategy Workflow - Video Ingest

## Source

- YouTube: https://youtu.be/bzWWeya4crg?si=YTC0ctzNgbKYQbGW
- Video ID: `bzWWeya4crg`
- Duration: 15:38
- Transcript captured via Hermes `youtube-content` skill on 2026-07-10.

## What the video does

The creator tests a newly available GPT 5.6 model against GPT 5.5 on a Polymarket BTC 5-minute up/down strategy-research project.

The workflow is not a simple benchmark. It is a practical agentic quant workflow:

1. Use a large local Polymarket dataset.
2. Remove old strategy/backtest outputs to reduce contamination.
3. Run the same high-level quant prompt on GPT 5.6 and GPT 5.5.
4. Let each model independently produce a strategy and supporting backtest work.
5. Put both strategy writeups plus data into a fresh evaluation folder.
6. Ask GPT 5.6 Ultra/high reasoning to brutally evaluate both strategies and score them 0–100.
7. Use the higher-rated strategy as the next research allocation, not as a live-trading proof.

## Data mentioned

The creator reports roughly:

- 30 days of Polymarket BTC 5-minute up/down data.
- About 610,000 logged rows.
- 43 markets.
- Order book snapshots.
- Fills.
- BTC/USD candles.
- Metadata.
- Prior backtest outputs removed before the new model comparison.

## Prompt from the video - reconstructed

The core prompt was approximately:

```text
We have a big Polymarket data set from the BTC 5-minute up/down market in my data folder.
You are a quant trader expert that has been given the task to find the most profitable strategy from this data.
The only restraint is that we want to avoid slippage, avoid fees if possible, and we need to run backtests including best practices from quant/algo trading such as Monte Carlo simulations.
Look at drawdowns. Work on this until you are confident you have the best setup to run a long-running profitable trade.
```

Evaluation prompt was approximately:

```text
We have two different Polymarket strategies from GPT 5.5 and GPT 5.6. We have the data in our folder.
Please evaluate both strategies as an expert quant trader.
We know some data is missing, but focus on the best potential strategy.
Be brutally honest and give a rating from 0 to 100 for both.
```

## Reported result

The GPT 5.6 strategy scored higher than the GPT 5.5 strategy in the model-led review.

The 5.6 strategy reportedly scored **47/100**, which the creator explicitly notes is not great, but it had better potential because of:

- stronger economic thesis;
- chronological training/validation;
- claimed untouched 20-day holdout;
- a strategy the creator had not seen previous models suggest.

The recommendation was to allocate more research to the GPT 5.6 idea and keep GPT 5.5 as a simpler control.

## Useful workflow ideas for Jayse's Quant Floor

### 1. Multi-model strategy tournament

Run the same contamination-controlled task across several model/reasoning settings:

- current Hermes/Codex model;
- a stronger frontier model when available;
- a smaller/cheaper control model;
- optional adversarial reviewer model.

Each candidate must output a strategy spec, code/results path, assumptions, and evidence.

### 2. Clean-room folders per model

Avoid old strategy contamination by using fresh run folders:

```text
Implementation/model_tournaments/YYYY-MM-DD-btc-polymarket/
├─ data_manifest.md
├─ shared_readonly_data/
├─ gpt55_run/
├─ gpt56_run/
├─ hermes_run/
├─ review_board/
└─ tournament_summary.md
```

Each run gets the same data manifest and prompt, but cannot see the other model's strategy until the review stage.

### 3. Token/usage audit

The video explicitly monitors model usage before/after long runs. For Jayse, track a usage ledger per research tournament:

| Field | Meaning |
|---|---|
| model | model/reasoning level |
| start_time / end_time | wall-clock cost |
| prompt_type | discovery / backtest / review |
| files_read | data scope |
| code_runs | number of local test/backtest runs |
| tokens/cost/usage % | if provider exposes it |
| output_artifacts | strategy/report paths |
| score | review-board score |
| promote/reject | decision |

If Hermes/provider exposes token stats, store them. If not, record runtime/tool-call proxies.

### 4. Review-board scoring before promotion

Do not let a strategy self-promote. Every candidate should be scored on:

- economic thesis;
- data sufficiency;
- out-of-sample / untouched holdout;
- leakage/lookahead controls;
- fees/slippage/latency/queue modeling;
- drawdown and loss clustering;
- trade count;
- regime robustness;
- simplicity/operational risk;
- paper-monitor readiness.

### 5. BTC up/down fair-value lab

The creator's run gravitated toward real-time fair value modeling for BTC up/down markets. This maps well to Jayse's existing Polymarket scanner, but the key missing piece is historical/replay-quality data:

- Polymarket market metadata.
- Order book snapshots.
- Best bid/ask over time.
- Market lifecycle: open, near-close, resolution.
- External BTC candles/ticks.
- Conservative fill simulator.
- Fee/slippage/adverse-selection assumptions.

## How to apply to current QTF/Polymarket work

### Immediate adaptation

Create a **QTF Polymarket Model Tournament Harness** using the existing QTF-018 scanner outputs as the seed.

Initial target:

```text
BTC / crypto prediction market fair-value and lifecycle anomaly research
```

Candidate sleeves:

1. PM-E03 two-sided cheap binary-window maker bids.
2. PM-E04 fresh-window stale pricing.
3. PM-E06 near-close/open lifecycle anomaly.
4. New BTC 5m up/down fair-value candidate inspired by the video.

### Required build pieces

- Data manifest generator.
- Clean run-folder creator.
- Shared prompt template.
- Strategy output schema.
- Review-board scorecard.
- Usage/cost ledger.
- Paper/replay promotion gates.

### Guardrail

This should stay **research-only / public-data / simulated fills** until we have:

- enough historical order book snapshots;
- conservative fill model;
- untouched holdout;
- repeated walk-forward evidence;
- paper-monitor evidence;
- explicit user approval for any live venue/capital/scope.

## Suggested artifact IDs

- `QTF-020 Polymarket Model Tournament Harness`
- `QTF-021 BTC UpDown Fair Value Research Spec`
- `QTF-022 LLM Strategy Review Board Scorecard`

## My take

The valuable part of this video is not “GPT 5.6 found a profitable strategy.” It is the **workflow pattern**:

- build a large venue-specific dataset;
- remove prior-strategy contamination;
- run competing model agents independently;
- require backtests and Monte Carlo/drawdown analysis;
- have a stronger reviewer brutally score candidates;
- allocate research effort to the best candidate while keeping controls;
- do not treat a 47/100 as deployable.

For Jayse's AI Quant Floor, this is a strong fit because it turns frontier models into research analysts inside a controlled evidence factory rather than letting them directly trade.
