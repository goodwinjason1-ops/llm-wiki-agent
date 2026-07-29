---
title: Ari Handoff - 2026-07-10 Polymarket Edge Batch
created: 2026-07-10
updated: 2026-07-10
type: handoff
status: completed
sources:
  - [[Queued YouTube Capture Batch - 2026-07-09]]
  - [[QTF-017 Strategy Verification Gauntlet]]
  - [[Forven Reddit Source Review - 2026-07-09]]
confidence: high
---

# Ari Handoff - 2026-07-10 Polymarket Edge Batch

## Resume instruction

When Jayse starts a new session, resume from this handoff. The active task is the **Polymarket Edge batch** from the queued YouTube captures, then draft **QTF-018 Prediction Market Edge Intake**.

## Active task list

- [x] `extract-polymarket` — Extract Polymarket edge ideas from Caps 1, 3, 4/5 transcripts. **Completed 2026-07-10** in [[QTF-018 Prediction Market Edge Intake]].
- [x] `draft-qtf018` — Draft QTF-018 Prediction Market Edge Intake with mechanical specs and data requirements.
- [x] `record-priorities` — Record Hyperliquid and iOS/Play Store as high-priority money-making opportunity tracks in [[High Priority Money-Making Tracks - 2026-07-10]].
- [x] `save-update` — Save notes and update `index.md` / `log.md`.
- [x] `summarize` — Summarize edges, cautions, and next implementation step.

## User intent / priorities

Jayse wants the highest-value immediate extraction to be the **Polymarket Edge batch**.

Also explicitly treat the following as high-priority money-making opportunity tracks, not side ideas:

1. **Hyperliquid ecosystem**
   - Trading bots / agentic trading.
   - DeFi opportunities.
   - HyperEVM / HIP ecosystem opportunities.
   - Other Hyperliquid-native money-making paths.
   - Safety: begin read-only/public-data/no-keys/no-orders; user wants eventual earnings only after guardrails/evidence.

2. **iOS + Play Store app monetization**
   - Basketball PWA is an example, not the whole thesis.
   - Consider mobile/app-store products broadly.
   - Basketball PWA monetization ideas: full coaching system subscription, modular components, dynamic coaches board, AI stats capture, game-plan analysis.
   - User said “maybe redo that,” meaning revisit/reframe the app-store monetization track with broader opportunity research.

## Source files already captured

Inventory note:

```text
C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/AI Quant Trading Floor/Research Reviews/Queued YouTube Capture Batch - 2026-07-09.md
```

Transcript/source folder:

```text
C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/AI Quant Trading Floor/Source Captures/2026-07-09 YouTube Capture Batch/
```

Key transcript files for current batch:

```text
cap_01_d25wtBb6ywI_AI_Automation_30_Day_Update_-_How_Much_Did_We_Prof.txt
cap_03_TDTXtgJtVtg_Polymarket_AI_Trading_UPDATE_new_treasure_hu.txt
cap_04_iW0E1g5q6g4_Find_100x_Low_Risk_High_Reward_Polymarket_Strategi.txt
```

Cap 5 duplicates Cap 4.

## Polymarket extraction already started

Relevant extracted transcript observations:

### Cap 1 — `AI Automation 30 Day Update - How Much Did We Profit?`

Source claims/observations:

- Creator used Codex/Claude Code to automate money-making experiments.
- Polymarket bots place trades “when an opportunity comes.”
- Strategy discussed as a **maker setup**.
- Polymarket pays maker rebates for market making.
- Claimed start around `$200`; after ~25 days balance around `$647`, with fluctuations/drawdown.
- One large example: bought down shares at `0.11`; `210` shares cost about `$23`; redeemed around `$210` / `$200 profit`.
- Mentions data collection:
  - fair value book snapshots,
  - `51,000` events,
  - `7,600` unique 5-minute market windows,
  - fill events,
  - more data improving consistency.
- Creator also mentions Kalshi as possible future adjacent venue.

Research implications:

- This is not enough to prove edge.
- Useful concepts: maker rebates, 5-minute window markets, fair-value/book snapshots, fill-event logging, small passive edges, data accumulation.

### Cap 3 — `Polymarket AI Trading UPDATE + new $$$ treasure hunt concept`

Source claims/observations:

- Previous Polymarket strategy allegedly paid off.
- Example: `50` shares at `1 cent` each; risk around `$0.50`; return around `$49.50`; about `50x`.
- Creator says even a `1 in 16` win rate can be positive for that payoff shape.
- They achieved the win after `17 fills`; fill rate is low and event is rare.
- Second strategy:
  - place resting orders `24 hours in advance`,
  - target a “fresh window,”
  - `2,700` orders placed,
  - `1` fill reported initially, lost about `$0.50`,
  - risk `50 cents` to win `50`,
  - cancel after `120` seconds,
  - passive/low-risk framing but unproven.
- Later notes a second fill did not pay off.
- Large portion of video is treasure-hunt/marketing; irrelevant to Quant Floor except as cautionary source-quality noise.

Research implications:

- Candidate edge family: **asymmetric deep-outcome lottery orders** in short-duration/fresh prediction windows.
- Needs fill probability, true loss rate, expected value, maker rebate, capital lockup, cancellation reliability, latency/adverse selection.
- Very high risk of survivorship/selection bias from showing rare winners.

### Cap 4 / 5 — `Find 100x Low Risk High Reward Polymarket Strategies With AI`

Source claims/observations:

- Creator reviews strange Polymarket trades using Codex/Claude Code.
- Examples:
  - buy at `1%`, win `100x`,
  - buy at `2%`, win `50x`,
  - Bitcoin up/down 5-minute windows.
- Key observed mechanic:
  - both up and down legs filled cheaply,
  - example: bought `50` down at `1` cent and `50` up at `1` cent,
  - one side must resolve to `1`, so combined payout if both legs filled is about `$50` for about `$2` cost, ignoring fees/structure.
- Codex explanation in transcript: both fills were maker fills from the user wallet/bot, likely posted orders matched around close/open/reset behavior.
- Source asks how both sides can fill around `1 second` after window opened/ended.
- Strategy ideas mentioned by model/source:
  - paired exposure with up calls/down calls below/share,
  - ideally both sides at `1–2 cents`,
  - two-sided cheap maker bids,
  - post-close winner-side snipe,
  - hybrid/short/pair accounting.
- Future-window strategy:
  - API can access future windows up to about `24 hours` ahead,
  - strategy targets **newly listed future windows**, not current 5-minute window,
  - places orders 24 hours ahead,
  - cancels bids after 2 minutes.
- Creator says paper trading may miss latency/fill realities, but this must not justify unsafe live testing; Quant Floor should build conservative replay/paper ledgers.

Research implications:

- Candidate edge family: **two-sided cheap maker bids in binary up/down micro-windows**.
- Candidate edge family: **fresh-window / newly-listed future-window stale pricing**.
- Candidate edge family: **near-close/near-open resolution/reset microstructure anomaly**.
- Requires public CLOB/orderbook snapshots, market lifecycle timestamps, orderbook depth, spread, fills if available, and conservative simulated fill model.

## Jayse-added Polymarket hypotheses

Jayse specifically mentioned two edges he believes overlap with his existing Prediction Bot:

1. **Event-shock mean reversion**
   - Example: sports goal or anomalous event drops/pumps fair price outside expected range.
   - Trade when market overshoots expected fair range.
   - Exit/do opposite when reversion to mean occurs.
   - Need event timestamps, pre/post fair probability model, liquidity/spread, and conservative fill assumptions.

2. **Smart-money following / late-game high-probability markets**
   - Follow traders with high P/L or high accuracy.
   - Especially near end-of-time markets with high probability outcome, e.g. late tennis games.
   - Need trader identity reliability, anti-copy-trading lag model, market state/time-left data, and outcome/liquidity tracking.

## QTF-018 draft direction

Create note:

```text
C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/AI Quant Trading Floor/Strategy Specs/QTF-018 Prediction Market Edge Intake.md
```

Suggested structure:

- YAML frontmatter.
- Purpose: convert Polymarket/prediction-market ideas into testable, read-only specs.
- Safety boundary: no wallet, no Polymarket auth, no live orders; public-data and paper/replay only.
- Source list: Caps 1, 3, 4/5; Jayse hypotheses; link to capture batch note.
- Edge candidates:
  1. PM-E01 — Event-shock mean reversion.
  2. PM-E02 — Smart-money late-game following.
  3. PM-E03 — Two-sided cheap binary-window maker bids.
  4. PM-E04 — Fresh-window / newly listed future-window stale pricing.
  5. PM-E05 — Maker rebate / passive market-making micro-edge.
  6. PM-E06 — Near-close/open resolution/reset anomaly / post-close winner-side snipe.
- For each edge candidate include:
  - hypothesis,
  - source evidence,
  - mechanical detector sketch,
  - required data,
  - paper/replay simulation method,
  - costs/slippage/latency/fill model,
  - failure modes,
  - rejection criteria,
  - QTF-017 gauntlet gates.
- Recommended first build:
  - public-data recorder/scanner only,
  - no credentials,
  - record market metadata/orderbooks for BTC/ETH or sports micro-markets if public data allows,
  - output JSONL ledger for candidate windows,
  - score candidates but do not trade.

## Important caution framing

Do not call the Polymarket strategies profitable. Treat all source claims as anecdotes until Quant Floor has reproducible evidence. Emphasize:

- survivorship bias,
- selection bias from viral “100x” examples,
- fill-rate uncertainty,
- maker/taker fees,
- spread and liquidity,
- API/market lifecycle changes,
- resolution/dispute risk,
- paper/live fill mismatch,
- legal/geo/access constraints,
- no live trading without explicit future approval.

## Next actions in new session

1. Open/read this handoff.
2. Read the three transcript files or use the extracted observations above.
3. Draft `QTF-018 Prediction Market Edge Intake.md`.
4. Create/update a high-priority opportunity note for Hyperliquid + iOS/Play Store money-making tracks, or add a dedicated section to the capture batch note.
5. Update:
   - `C:/Users/Kidsg/Documents/AI Second Brain/index.md`
   - `C:/Users/Kidsg/Documents/AI Second Brain/log.md`
6. Summarize recommended first implementation slice.
