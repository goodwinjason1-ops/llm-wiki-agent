---
title: Quant Floor Recovery and Broad-Universe Edge Implementation Plan
created: 2026-07-16
status: approved — implementation in progress
mode: public-data, read-only, paper-only
---

# Implementation Plan: Broad-Universe Quant Floor Recovery

## Objective

Implement the Quant Floor architecture already agreed with Jayse, replacing the narrow BTC/ETH/SOL and single-observation workflow with:

1. a **Bybit-first, Hyperliquid-supplemented liquid crypto universe** of approximately 50 eligible assets;
2. daily **two-sided trend** and **two-sided funding-extremes** boards;
3. a source-verified, tradeability-screened **10–15 candidate pairs / relative-value shortlist** spanning multiple pair types;
4. costed, reproducible edge tests and paper-only promotion gates; and
5. explicit implementation status for the five professional edge families previously reviewed.

This plan does **not** treat any asset, pair, scanner score, funding print, or source claim as alpha. It produces candidates and evidence. Only reproducible costed out-of-sample and paper-forward results can establish a top-performing pair or promotable edge.

## Coverage reconciliation — 2026-07-16

The approved plan was checked against the preceding recovery summary before implementation.

| Prior commitment | Covered by | Coverage result |
|---|---|---|
| Bybit-first active ~50-coin trend universe | Tasks 2–4 | Covered: eligibility contract, resolver, immutable snapshot and trend board. |
| Hyperliquid supplementation if Bybit is short | Tasks 2–3 | Covered: explicit, provenance-preserving supplement; no silent venue substitution. |
| Separate positive and negative 24h trend leaders | Task 4 | Covered: two-sided scan output, not a trade recommendation. |
| Separate positive and negative funding extremes | Task 5 and Task 11 | Covered: metadata-aware two-sided board, event panel and forward-outcome test. |
| BTC/ETH/SOL as controls, not the universe | Tasks 2–4 and Task 10 | Covered: control tags plus removal of active three-control-only default. |
| Three functional token-pair groups plus broader instruments | Tasks 6–9 | Expanded: perp-DEX, lending, spot-DEX, same-asset basis/carry, cross-venue basis/funding dispersion and qualified event/revenue-factor pairs. |
| 10–15 researched pair candidates | Task 6 | Covered: source, identity, liquidity, history, mechanism and structural-risk requirements. |
| “Top-performing” pairs based on evidence, not assertion | Tasks 7–9 | Covered: compatible cost, OOS, robustness and paper-forward ranking gates. |
| Five professional edge families | Tasks 10–13 | Covered: trend; funding/basis; relative value; market-making; event/prediction microstructure. |
| Honest operational reporting and actual brief/worker integration | Tasks 1, 14–15 | Covered: verification ledger, review board, manual entrypoint and scheduler verification. |

**Result:** no item from the prior summary is missing. The pairs work is expanded beyond the original four ad-hoc examples; initial examples remain hypotheses until the source and test gates are passed.

## Non-negotiable boundaries

- Public/read-only market data only; no exchange authentication, wallets, API keys, deposits or orders.
- BTC, ETH and SOL remain controls/benchmarks, not the complete crypto universe or automatic trade theses.
- CASHCAT remains one historical screened funding observation, not a privileged strategy or default candidate.
- A pair must have an economic relationship, verified identity/listing, sufficient liquidity/history, explicit cost model, and an executable trade rule before testing.
- “Top performing” will mean **best costed held-out and robustness-tested results**, not headline returns, current price performance, or social reputation.
- Every output is labelled `observation`, `candidate`, `test result`, `paper-forward`, or `do_not_promote`.

## Architecture decisions

| Decision | Plan |
|---|---|
| Primary crypto venue | Bybit public spot/linear data first. |
| Fallback/supplement | Hyperliquid public data only when Bybit has fewer than 50 qualifying assets or where a venue-specific funding/basis test requires it. |
| Universe rules | Exclude stablecoins, wrapped/asset-backed tokens, inactive/delisted markets, inadequate liquidity, missing data, and duplicate economic exposure. Persist source timestamp and eligibility reasons. |
| Trend output | Separate top-N 24h positive and top-N 24h negative movers; retain 7d/30d/regime context. These are scan outputs, not trade signals. |
| Funding output | Separate top-N positive and top-N negative funding extremes; include funding convention, volume, OI, mark/index/basis where available, and liquidity gates. |
| Pair types | Same-function token relative value, spot-perp/futures basis, cross-venue basis, funding dispersion, and narrowly defined event/revenue-factor relative value. Do not mix types in one score. |
| Pair ranking | Use staged selection: economic comparability + listing/history/liquidity screen → pre-registered backtest → rolling holdout/jitter/statistical gates → forward paper monitoring. |
| Professional-edge implementation | Build one bounded, verifiable slice at a time. Do not expand a family until its first slice has an evidence result. |

## Pair shortlist definition

### Deliverable A — research shortlist (10–15)

A vetted candidate list, not a profitability claim. Each row must state:

- pair type and exact instruments/venues;
- economic relationship and expected convergence/carry mechanism;
- data availability and minimum overlapping history;
- median volume, OI/depth, spread and funding/borrow availability;
- known structural-break risks: unlocks, migrations, listings, delistings, incentives and token-capture changes;
- specific trade rule to test; and
- decision: `eligible_for_backtest`, `watch_only`, or `rejected`.

### Deliverable B — evidence-ranked shortlist

After testing, rank only candidates with compatible evidence by:

1. net held-out expectancy after two-leg costs/funding/borrow;
2. Sharpe/Sortino and maximum drawdown;
3. trade count and stability across rolling folds;
4. parameter-jitter resilience and RST/Monte Carlo results;
5. liquidity/capacity and structural-break sensitivity; and
6. forward-paper agreement.

Candidates failing any required gate remain `do_not_promote`; they cannot be labelled top-performing.

### Initial research pool — hypotheses only

The research pass will expand and verify this starting pool rather than assuming it is correct:

| Pair type | Initial research pool | Why it belongs in research, not production |
|---|---|---|
| Perp-DEX relative value | HYPE/DYDX, HYPE/GMX, HYPE/DRIFT, DYDX/GMX | Comparable venue exposure is plausible, but token capture, chain risk, unlocks and liquidity may invalidate it. |
| Lending relative value | AAVE/MORPHO, AAVE/COMP, MORPHO/COMP | Same broad function; revenue, emissions and governance differences require explicit factor/event controls. |
| Spot-DEX relative value | UNI/CAKE, UNI/SUSHI, CAKE/SUSHI | Similar venue category, but chain/emissions/fee-capture differences must be measured. |
| Same-asset basis/carry | BTC spot–perp, ETH spot–perp, SOL spot–perp | A different strategy type: basis/funding capture, not token convergence. Test each independently. |
| Cross-venue funding/basis | BTC or ETH Bybit-linear vs Hyperliquid perp only if contract conventions/data alignment permit | Requires simultaneous public snapshots, executable-price proxy and venue-risk treatment; otherwise reject. |

The research stage will choose **10–15 total candidates** across these types; it must not force every starting example into the final list.

## Dependency graph

```text
Verification ledger + data contracts
        ↓
Bybit-first universe resolver ──→ Hyperliquid supplement resolver
        ↓                                   ↓
Daily immutable universe snapshot + eligibility report
        ↓
Trend board + funding-extremes board + candidate ledger
        ↓
Pair research / identity / liquidity / data-coverage screen
        ↓
Per-pair rule cards and cost models
        ↓
Costed rolling backtests and statistical gates
        ↓
Paper-only monitors + daily brief / worker integration
        ↓
Review board: promote, revise, park or reject
```

# Phased task list

## Phase 0 — zero-trust recovery ledger

### Task 1: Create the Quant Floor verification ledger

**Description:** Establish the single source of truth for every claimed existing scanner, backtest, collector and edge module.

**Acceptance criteria:**
- [ ] Every workstream is labelled `verified-complete`, `partial`, `blocked`, `queued`, or `contradicted`.
- [ ] Each claimed item links to an exact artifact and reproducible verification command.
- [ ] Trend, funding, pairs and the five professional-edge families are all included.

**Verification:** Run the ledger validator and manually inspect the dashboard links.

**Dependencies:** None.

**Likely files:** `Implementation/verification_ledger.py`, `reports/verification/`, dashboard/queue references.

---

## Phase 1 — broad market universe and daily scan outputs

### Task 2: Define the canonical liquid-asset eligibility contract

**Description:** Convert the current selector into a documented data contract: stablecoin/asset-backed exclusions, market-status rules, liquidity/OI thresholds, duplicate handling, venue precedence and fallback rules.

**Acceptance criteria:**
- [ ] Deterministic input/output schema with exclusion reasons per asset.
- [ ] BTC/ETH/SOL explicitly tagged as controls while remaining eligible universe members.
- [ ] A test fixture covers stablecoins, inactive listings, duplicates and insufficient-liquid-asset fallback.

**Verification:** Unit tests for the selector and generated schema validation.

**Dependencies:** Task 1.

**Likely files:** `Implementation/qtf_universe.py`, `Implementation/test_qtf_universe.py`, `Implementation/schemas/`.

### Task 3: Build Bybit-first / Hyperliquid-supplemented top-50 resolver

**Description:** Produce a timestamped, immutable 50-asset research universe. Start from point-in-time market-cap ranking, intersect active/liquid Bybit markets, then supplement only the shortfall with eligible Hyperliquid instruments. Never silently substitute venues.

**Acceptance criteria:**
- [ ] Generates one universe snapshot, manifest and SHA-256 hashes.
- [ ] Includes source venue, eligibility metrics, inclusion/exclusion reason and control flag.
- [ ] Emits a clear `universe_insufficient` result rather than pretending 50 assets were found.

**Verification:** Run against live public endpoints once; rerun against fixture data; inspect manifest and count/duplicates.

**Dependencies:** Task 2.

**Likely files:** `Implementation/qtf_universe.py`, `Implementation/freeze_ttm01_snapshot.py`, `Implementation/tests/test_universe_resolver.py`.

### Task 4: Produce two-sided 24-hour trend boards

**Description:** Generate top positive and top negative 24-hour movers from the canonical universe, with 7d/30d context, trend regime, volume/OI/depth filter and explanatory labels.

**Acceptance criteria:**
- [ ] Separate positive and negative tables, with no asset-specific trade recommendation.
- [ ] Every row traces to the daily universe snapshot.
- [ ] Empty/partial source responses are plainly labelled and do not get silently filled.

**Verification:** Run the board generator from a fresh snapshot; validate sort order and stable schema.

**Dependencies:** Task 3.

**Likely files:** `Implementation/trend_board.py`, `Implementation/reports/trend/`, tests.

### Task 5: Produce two-sided funding-extremes boards

**Description:** Generate separate positive- and negative-funding rankings across eligible perp instruments, preserving each venue’s funding interval/convention and capturing volume, OI, mark/index/basis proxy and liquidity filters.

**Acceptance criteria:**
- [ ] Top-N positive and top-N negative funding tables exist; CASHCAT receives no special treatment.
- [ ] Cross-venue rates are not compared as economically identical without normalisation/metadata.
- [ ] Every output creates candidate-event rows for later outcome testing.

**Verification:** Run from a fresh public snapshot; assert each side’s sort direction and output provenance.

**Dependencies:** Tasks 2–3.

**Likely files:** `Implementation/funding_board.py`, `Implementation/alt_venue_scanner.py`, `Implementation/data_cache/funding/`, tests.

### Checkpoint A — broad-universe scan integrity

- [ ] New snapshot contains approximately 50 eligible assets or an explicit insufficiency report.
- [ ] Trend and funding boards are two-sided and reproducible.
- [ ] No board calls an observation a trade or a validated edge.
- [ ] Existing control-only TTM defaults are no longer used by the active workflow.

---

## Phase 2 — multi-type pairs research and candidate selection

### Task 6: Research and create the 10–15 pair candidate inventory

**Description:** Research additional eligible pairs across the approved pair types using official protocol/venue documentation and public venue data. This produces the research shortlist—not the performance ranking.

**Acceptance criteria:**
- [ ] 10–15 candidates total, spanning at least three pair types where data permits.
- [ ] Each has exact assets/contracts, venues, mechanism, source citations, identity checks, liquidity/history screen and structural-risk register.
- [ ] Each is classified `eligible_for_backtest`, `watch_only` or `rejected`.

**Verification:** Source audit and schema validator; manually spot-check every instrument identity/listing.

**Dependencies:** Tasks 2–3.

**Likely files:** `Research/QTF Multi-Type Pairs Candidate Inventory - 2026-07-16.md`, `Implementation/pairs/candidate_inventory.json`, `Implementation/pairs/identity_validator.py`.

### Task 7: Implement pair-type-specific data contracts and cost models

**Description:** Avoid falsely testing all pairs as the same strategy. Define separate data/fee/execution contracts for token-token relative value, spot-perp basis, cross-venue basis and funding dispersion.

**Acceptance criteria:**
- [ ] Two-leg fees, spread/slippage, funding/borrow and exit assumptions are explicit per pair type.
- [ ] Unsupported costs/data result in `not_testable`, not assumed zeros.
- [ ] Event/unlock/migration periods can be quarantined.

**Verification:** Contract fixtures and cost-calculation tests.

**Dependencies:** Task 6.

**Likely files:** `Implementation/pairs/contracts.py`, `Implementation/pairs/cost_models.py`, tests.

### Task 8: Build the preregistered pairs screening engine

**Description:** Implement stability/relationship diagnostics—rolling beta, residual stationarity, correlation, turnover, liquidity and structural-break flags—without optimisation-led pair selection.

**Acceptance criteria:**
- [ ] Produces a screen report before any backtest.
- [ ] Rejects insufficient history, unstable hedge ratios or cost-dominated candidates.
- [ ] Retains controls separately from production candidates.

**Verification:** Fixture tests plus one fresh public-data run saved as an artifact.

**Dependencies:** Tasks 6–7.

**Likely files:** `Implementation/pairs/screener.py`, `Implementation/pairs/reports/`, tests.

### Task 9: Run costed, rolling OOS pairs tests

**Description:** Test only screened pairs with next-bar or explicitly modelled fills, chronological formation/trading splits, walk-forward folds, cost sensitivity and predeclared parameter ranges.

**Acceptance criteria:**
- [ ] Per-pair report includes IS/OOS, net return, trade count, Sharpe/Sortino, max drawdown, exposure, turnover and all costs.
- [ ] Parameter-jitter, RST and Monte Carlo gates are recorded.
- [ ] Results produce `paper_candidate`, `revise`, or `do_not_promote`; never a live recommendation.

**Verification:** Re-run from immutable cached inputs and compare hashes/output schema.

**Dependencies:** Tasks 7–8.

**Likely files:** `Implementation/pairs/backtest.py`, `Implementation/pairs/reports/`, statistical gate integrations.

### Checkpoint B — pair evidence review

- [ ] The 10–15 inventory is source-verified and tradeability-screened.
- [ ] At least one candidate from each viable pair type has a costed OOS result.
- [ ] “Top-performing” language is used only for comparably tested candidates.
- [ ] Failed pairs are parked, documented and excluded from repeat tuning.

---

## Phase 3 — complete the priority professional-edge implementation slices

### Task 10: Broaden and test cross-sectional trend/momentum

**Description:** Replace active three-control-only trend work with the canonical universe, multi-horizon features, cash fallback, volatility targeting and benchmark controls.

**Acceptance criteria:**
- [ ] Uses the broad universe snapshot, not hard-coded BTC/ETH/SOL.
- [ ] Includes positive and negative trend context, but creates signals only from a predeclared rule.
- [ ] Produces costed walk-forward/holdout and robustness results.

**Verification:** Fresh run, immutable manifest replay and benchmark comparison.

**Dependencies:** Tasks 3–4.

**Likely files:** `Implementation/ttm01_backtest.py`, `Implementation/trend_board.py`, reports/tests.

### Task 11: Build the broad funding/basis event panel

**Description:** Replace the single-asset CASHCAT workflow with a broad, timestamp-aligned panel that turns funding extremes into event records and tests persistence/fade/basis rules.

**Acceptance criteria:**
- [ ] Multi-asset, multi-week/multi-regime panel with two-sided event labels.
- [ ] Declared thresholds, holding horizons, costs, liquidation/venue-risk filters and BTC/ETH/SOL controls.
- [ ] Forward outcomes are measured; descriptive sign persistence alone cannot pass the gate.

**Verification:** Panel completeness tests, event-count report and chronological holdout run.

**Dependencies:** Task 5.

**Likely files:** `Implementation/funding_panel.py`, `Implementation/funding_backtest.py`, reports/tests.

### Task 12: Verify forced-flow and market-making data readiness

**Description:** Keep forced-flow and market-making honest: either obtain suitable public event/order data and build a limited replay, or record a concrete blocker and stop pretending proxies are liquidation/fill data.

**Acceptance criteria:**
- [ ] Forced-flow source capability is documented and replayable or explicitly blocked.
- [ ] Market-making report distinguishes quotes, queue evidence and actual/proxy fills.
- [ ] No paper P&L is produced from unavailable fill data.

**Verification:** Capability probe and replay-contract tests.

**Dependencies:** Task 1.

**Likely files:** `Implementation/forced_flow/`, `Implementation/moondev_orderbook_gate.py`, reports/tests.

### Task 13: Complete the prediction/event microstructure validation slice

**Description:** Connect existing prediction-market recorder/outcome work to an independent probability/calibration model and conservative execution rules.

**Acceptance criteria:**
- [ ] Independent fair-value estimate is separated from market price.
- [ ] Resolved outcomes, calibration and execution assumptions are recorded.
- [ ] No recommendation is emitted without both model and market evidence.

**Verification:** Historical calibration report and paper-ledger replay.

**Dependencies:** Task 1.

**Likely files:** `Implementation/chronos_polymarket_recorder.py`, `Implementation/prediction_validation.py`, reports/tests.

### Checkpoint C — professional-edge implementation review

- [ ] Each of the five professional edge families has a verified status and one exact next gate.
- [ ] Trend/funding/pairs have broad-universe evidence rather than narrow examples.
- [ ] Market making and event/prediction work clearly state data limits.
- [ ] No allocation or live decision has been emitted.

---

## Phase 4 — workflow integration, evidence governance and paper-only operations

### Task 14: Rewire the morning brief and execution worker

**Description:** Consume the canonical universe, two-sided boards and verification ledger. Replace single observation framing with evidence-gated candidate summaries and exact next gates.

**Acceptance criteria:**
- [ ] Brief includes broad-universe metadata, top/bottom trend, top positive/negative funding and pair-status summary.
- [ ] It never selects an asset just because it moved or has extreme funding.
- [ ] The actual cron entrypoint is manually run, output inspected and scheduler status verified.

**Verification:** Syntax check, manual run of actual wrapper, rendered-output review and one controlled cron trigger.

**Dependencies:** Tasks 1, 4–5, 9–13.

**Likely files:** `Implementation/morning_quant_brief.py`, cron wrapper, dashboard/queue files, tests.

### Task 15: Add evidence-based review board and promotion controls

**Description:** Make every edge/pair candidate show exact stage, proof, blockers, current decision and next action; ensure paper monitoring is only started after hard gates.

**Acceptance criteria:**
- [ ] Review board rejects incomplete/low-sample/non-comparable claims.
- [ ] Dashboard distinguishes candidate, OOS result, paper-forward and promote-review statuses.
- [ ] No static allocation, synthetic allocation or automatic promotion remains.

**Verification:** Schema tests and inspection of generated dashboard/ledger.

**Dependencies:** Tasks 1, 9–14.

**Likely files:** `Implementation/review_board.py`, `Implementation/verification_ledger.py`, dashboards/ledgers/tests.

### Final checkpoint — definition of complete

- [ ] Broad Bybit-first/Hyperliquid-supplemented universe is live in the paper-only workflow.
- [ ] Daily trend and funding boards are two-sided, provenance-preserving and immutable.
- [ ] A 10–15 pair research inventory exists, and only screened candidates proceed to tests.
- [ ] Top-performing pairs are ranked only after comparable costed OOS/robustness evidence.
- [ ] The five professional edge families have truthful verification states and next gates.
- [ ] Morning brief and worker use the new artifacts and have been manually verified.
- [ ] No live exchange/account action occurred.

## Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Fewer than 50 eligible liquid Bybit assets | Medium | Supplement from Hyperliquid with explicit provenance; otherwise report shortfall. |
| Cross-venue funding conventions differ | High | Store interval, methodology and normalisation metadata; prohibit naive cross-venue ranking. |
| Candidate token identity/listing ambiguity | High | Contract/listing verification before ingestion; quarantine unresolved rows. |
| Short history or missing funding/borrow data | High | Mark not-testable; do not insert zero-cost assumptions. |
| Overfitting 10–15 pairs | High | Preregister screens, rolling OOS, jitter, RST/Monte Carlo and no repeated tuning of failed pairs. |
| Extreme funding unwinds / liquidation | High | Include liquidity, OI, liquidation-distance and stress controls; no promotion from snapshot data. |
| Cron edits affect the wrong script | Medium | Locate actual entrypoint, run it manually, inspect rendered output, then trigger scheduler. |
| “Top performing” gets mistaken for a trading recommendation | High | Use staged labels and require paper-forward evidence before any promotion review. |

## Approval gate

This document is a build plan, not an implementation claim. Implementation begins only after Jayse approves the task order. The first executable slice should be **Tasks 1–5**: the verification ledger plus broad-universe, two-sided trend/funding boards. That repair is the prerequisite for meaningful trend, funding and pairs research.
