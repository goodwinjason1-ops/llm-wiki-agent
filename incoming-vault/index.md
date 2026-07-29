# AI Second Brain Index

> Content catalog. Read this before working in the vault.
> Last updated: 2026-07-17 | Initial pages: 18+

## Dashboards
- [[Jayse Portfolio Command Dashboard]] — executive portfolio view: status, next jobs, completed dates, forecast dates and live-readiness gates.
- [[AI Quant Morning Brief - Latest]] — edge-gated, cross-sleeve daily status; BTC/ETH/SOL are control-universe diagnostics and ETH is benchmark-only.
- [[AI Quant Trading Floor Dashboard]]
- [[AI Quant Morning Next Step Queue]]
- [[START HERE]] — Entry point for using the vault.
- [[AI Second Brain Dashboard]] — Operational dashboard.
- [[Ari Handoff - 2026-07-08 2317]] — Fresh-session handoff for inbox processor, Antoine/Hyperliquid implementation, and new cap batch.
- [[Connection Illumination Dashboard]] — Generated graph/connection scan for missed links and synthesis candidates.
- [[Business Launch Asset Navigation Dashboard]] — Funnel-stage map of BuyerProof AU and Business Context Brain launch assets.
- [[BCB Demo and Outreach Action Pack - 2026-07-13]] — review-ready demo and outreach preparation pack.
- [[Business Context Brain Local Prospect Shortlist - Emerald 50km - 2026-07-13]] — public-evidence local prospect research for Emerald and southeastern suburbs.
- [[DamiDefi UCL Finance Paper Agent Architectures - Source Summary - 2026-07-13]] — X-linked source plus independently verified UCL paper synthesis.
- [[Miles Deutscher Vibe-Code TradingView Claude Article - Source Review - 2026-07-13]] — X-linked TradingView/Claude workflow review.
- [[TradingView Candidate Indicator Slate - 2026-07-13]] — paper-only custom indicator candidates.
- [[2026-07-14 Tactical Momentum Trend Production Edge Card]] — implementation-ready daily cross-sectional momentum/trend candidate, gates, costs and next step.
- [[2026-07-14 Forced-Flow Liquidation Continuation-Reversion Edge Card]] — implementation-ready public liquidation-flow continuation/reversion hypothesis, controls, costs and promotion gates.
- `05_Projects/AI Quant Trading Floor/Implementation/forced_flow/feed_capability_probe.py` — read-only Hyperliquid public-feed capability probe; liquidation-history request rejected, so forced-flow backtest remains data-insufficient.
- `05_Projects/AI Quant Trading Floor/Implementation/data_cache/ttm01/manifest.json` — frozen, hash-verified Bybit daily BTC/ETH/SOL input for the completed deterministic TTM-01 backtest; the result is `do_not_promote` and extended-history/walk-forward gates remain outstanding.
- `05_Projects/AI Quant Trading Floor/Implementation/reports/ttm01_v01/qtf_v01_walkforward.md` — extended 1,200-row Bybit snapshot with fixed-rule 70/30 chronological holdout; 20 bps holdout was negative and the result is `do_not_promote`.
||- `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_v04/qtf_v04_regime_mean_reversion.md` — frozen three-symbol RSI/regime-gated mean-reversion test with next-bar fills and 20 bps costs; zero holdout trades and `do_not_promote`.||- `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_v04b_relaxed_regime/qtf_v04b_relaxed_regime_result.json` — QTF-V04B relaxed-regime mean-reversion: four graduated regime relaxations on the same frozen 1,200-row Bybit daily snapshot. Relaxed regime produces holdout trades (original V04 had zero), confirming the original regime was too tight. Best holdout: ETHUSDT/relaxed_20pct (3 trades, +4.57% net, 66.67% HR). Aggregated across all symbols/configs, mean-reversion edge is negative. Decision `do_not_promote`. SHA-256 `755498c8e76974355bdd6f05e75904306fa1f34a4d49e49835b98997416bed6b`.||- `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_v04b_relaxed_regime_jitter/qtf_v04b_relaxed_regime_jitter_robustness.json` — QTF-V04B relaxed-regime jitter robustness: 6,561 parameter combinations tested (8 dimensions ×3). Base config relaxed_20pct: BTC -1.32%, ETH +4.57%, SOL -4.56% aggregated -1.32% net. Net survival rate 38.5% (robustness gate FAILED, threshold >= 60%). Mean holdout net across jitter: -16.10%. Dominant sensitivity: rsi_entry_cross (r=-0.7881). Decision `do_not_promote`. SHA-256 `7949b2d8302717306227d93261ccafb39134bb6c983a58f9e0f18c0eab5155ab`.
- `05_Projects/AI Quant Trading Floor/Implementation/reports/ttm01/ttm01_backtest.md` — verified deterministic TTM-01 backtest with cost sensitivity and controls; result `do_not_promote`.
- [[QTF-V05 Costed Function-Based Pairs Backtest - 2026-07-15]] — rolling-beta/residual Bybit pairs test with next-bar fills, two-leg costs, observed funding and chronological holdout; partial, both pairs `do_not_promote`.

||- `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_v02_broad/qtf_v02_broad_panel_v02_20260716T013119Z.json` — broad multi-asset QTF-V02 funding panel from live Bybit linear tickers: 222 volume-eligible rows (159 positive, 63 negative), all 6 side/horizon combos negative holdout with 0% hit rate; decision `do_not_promote`.||- `05_Projects/AI Quant Trading Floor/Implementation/reports/ttm01_v01_jitter/ttm01_v01_jitter_robustness.json` — QTF-V01 TTM-01 parameter robustness/jitter: 972 combinations tested (3×3×3×3×3×4 grid), survival rate 52.8% (return), robustness gate FAILED (threshold >= 60%), decision `do_not_promote`.||- `05_Projects/AI Quant Trading Floor/Implementation/reports/ttm01_v01_benchmark/ttm01_v01_benchmark_20260716T162011Z.json` — QTF-V01 TTM-01 benchmark comparison on the frozen 1,200-row Bybit daily snapshot holdout (rows 840–1200, a severe bear market): TTM-01 holdout -0.21% vs BTC -44.7%, ETH -49.6%, SOL -60.3%; capital preservation not edge; decision `do_not_promote`; paper-forward agreement remains outstanding.||- `05_Projects/AI Quant Trading Floor/Implementation/reports/ttm01_broad/ttm01_broad_backtest.json` — QTF-V01 TTM-01 broad-universe extension: same rule applied to 50 frozen Bybit spot symbols (vs. original 3). 158 backtest rows, 52 trades, Sharpe 0.913 (20bps), MDD -0.225%, avg exposure 0.32%. Consistent positive Sharpe but very low exposure. Decision `do_not_promote` — broader universe does not fix robustness failure. SHA-256 `c023f3ebac214a9d9980b908f404e8bc2a1bef2af6767c74b4c5b22982f17733`.||- `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_v07_multi_coin_funding/qtf_v07_multi_coin_20260716T064358Z.json` — QTF-V07 multi-coin funding-extreme forward test using Bybit historical funding API + daily klines: 10 candidate coins, 1,944 funding rows, 4,026 total episodes (3,142 holdout), 60 side/horizon results, 320 cost-grid points; decision `do_not_promote` (robustness/jitter completed, RST completed, paper-forward and cross-venue gates outstanding).||- `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_v07_multi_coin_funding/jitter_robustness/qtf_v07_jitter_20260716T091657Z.json` — QTF-V07 parameter jitter robustness: 1,920 combinations (4 thresholds × 4 costs × 3 horizons × 2 entries) across 10 coins × 2 sides; average survival rate 38.0%; only 2/20 passed >=60% robustness gate (HYPE persistence_long 63.5%, AVAX fade_short 61.5%); decision `do_not_promote`; robustness gate FAILED.||- `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_v07_multi_coin_funding/rst_significance/qtf_v07_rst_20260716T140328Z.json` — QTF-V07 RST (Randomized Sign Test) significance test: 60 side/horizon/coin configurations tested via binomial sign test; 20/60 significant at α=0.05 (33.3% rate); panel-level Fisher combined p≈0 — weak individual but strong collective evidence that the funding-extreme fade edge is not pure noise; jitter fragility (38.0% survival) still prevents promotion.||- `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_v07_multi_coin_funding/rst_significance/qtf_v07_rst_20260716T140328Z.md` — Markdown summary of RST results with per-coin hit rates, p-values, and top performers (BCHUSDT fade_short 7d: 87.7% hit, ||- `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_v07_cross_venue/qtf_v07_cross_venue_20260717T065817Z.json` — QTF-V07 cross-venue funding-extreme validation: Bybit vs Hyperliquid on 10 V07 coins (64,223 HL rows, 1,944 Bybit funding rows). HL fade_short 7d mean net +6.28% (100% HR) vs Bybit +0.02% (73% HR). Venue directional agreement: 50%. Per-coin agreement: 100%. Decision `do_not_promote` (jitter robustness already FAILED at 38.0%). SHA-256 `42b193671d0344b1f2657c01f59636b72f897c53150e42119f870c981dcdf3e8`.
||- `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_v07_costed_funding/qtf_v07_costed_20260717T141155Z.json` — QTF-V07 cost-adjusted funding payment backtest: actual executed funding payments from historical rate series (not proxy), 3bps realistic cost. Jitter survival dropped to 15.4% (from 38.0% in V07), confirming V07 funding proxy overestimated edge. Most apparent edge is price reversal, not funding carry. Decision `do_not_promote`. SHA-256 `21127fd96c8efeae073631d8e891b1a651857e55fd7758197f0d72345abac54f`.||- `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_t13_calibration/calibration_20260717T164513+0000.json` — QTF-T13 Polymarket probability calibration validation: 199 markets fetched, 116 historical candidates analyzed. Key finding: short-window BTC/ETH up/down markets lack active price discovery (outcomePrices=[0,0,0]) at Gamma API polling cadence. Bybit spot prices fetched as fair-value proxy. 3 well-formed binary markets found (settled price-target markets). Decision `do_not_promote`. SHA-256 `b2c07632a93d0cde6818230c16b93faa9bb5a66b81659ebafa502420cee63ed2`.||- `05_Projects/AI Quant Trading Floor/Implementation/reports/t12_market_maker_readiness.json` — T12 market-making data/replay readiness probe: Bybit public REST endpoints (kline, L2 orderbook, recent-trade) all return HTTP 200 but cannot support fill-conditioned adverse-selection or inventory-economics analysis. No historical L2 book time-series, no sub-second fill conditioning, no order-placement/removal history. Decision `blocked`. SHA-256 `c36b5e71fb8eba3d2ef53bef82fef57d92ad10ebcaaf78872c321574547c25a4`.
- `05_Projects/AI Quant Trading Floor/Implementation/reports/edge_worker/QTF Edge Execution Worker Verification - 2026-07-15.md` — verified read-only worker run consuming canonical scan artifacts; scheduler trigger remains blocked/not claimed.
- `05_Projects/AI Quant Trading Floor/Implementation/reports/daily_scan/trend_board_20260715T211257Z.json` — fresh Bybit-first two-sided 24h trend observation board; 31 volume-eligible rows, manifest provenance `e911d55e4c36c777e4c585a4850cba0612bff79ff954ce20f9d41e68514bc070`, no trade recommendation.
|- `05_Projects/AI Quant Trading Floor/Implementation/reports/daily_scan/funding_board_20260715T231700Z.json` — fresh Bybit-first two-sided funding-extremes observation board; 41 volume-eligible rows, 10 positive, 5 negative and 15 candidate-event rows; manifest provenance `1877be833e32b2a88f434e49f05cb33be3bfa2444421739067c275c05636817f`; no trade recommendation.
|- `05_Projects/AI Quant Trading Floor/Implementation/reports/checkpoint_a/checkpoint_a_20260716T114004Z.json` — Checkpoint A verification: all 6 checks PASS (universe size 50, two-sided trend/funding, no trade language, no control-only default, provenance chain SHA-256 consistent).
- [[Quant Floor Edge Inventory and Professional Edge Comparison - 2026-07-15]] — evidence-backed inventory of active/paper sleeves, production-distance gates, and comparison to five institutionally established edge families.
- [[Agentic Finance Architecture Edge Experiment - QTF-022]] — paper-only architecture/control experiment.
- [[CASHCAT Funding Persistence Evidence Review - 2026-07-14]] — 76 aligned hourly public Hyperliquid observations; descriptive gate passed, edge claim blocked.
- `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_v02/qtf_v02_funding_forward_test.md` — deterministic CASHCAT funding-extreme forward-outcome slice; 98 canonical hours, 6 rule/horizon results, `do_not_promote`.
- [[AOD Submission Attempt Log - 2026-07-13]]
- [[YSAS Student Placement Pathway - Wei Choong Email Review - 2026-07-13]] — verified YSAS site-led placement process.
- [[AOD Weekly Approval and Follow-up Surface - 2026-07-13]] — approval and timed follow-up surface.
- [[Handsome Finance Corpus Synthesis - 2025-01-08 to 2026-07-08]]
- [[Hermes Multi-Agent Kanban Workflow - YouTube 1MaFErWfL24]]
- [[Handsome Finance Channel Inventory - 2025-01-08 to 2026-07-08]]
- [[Antoine On-Chain Alpha Dashboard]] — paper-only DEX discovery-method evaluation; candidate identity is chain/mint-first, with canonical-name collisions quarantined from outcome evidence.

## Core concepts
- [[ai-second-brain]] — Obsidian as persistent memory and Codex/Hermes as execution.
- [[karpathy-llm-wiki]] — Compounding markdown wiki pattern.
- [[self-improvement-loop]] — How tasks become reusable workflows and skills.
- [[agent-reach]] — Multi-platform research access layer.
- [[codex-execution-engine]] — Codex as action/execution layer for the brain.

## Workflows
- [[Unigram Share-to-Ari Capture Workflow]]
- [[AI Job Hunter Workflow - Personal Career Agent]]
- [[Job Hunter Dashboard]]
- [[AI Health Fitness Coach Workflow]]
- [[Fitness Coach Dashboard]]
- [[AI Travel Planner - Parked Assessment]]
- [[Jayse AI Second Brain - 15 Minute Onboarding Demo Runbook]]
- [[Fable Style Self-Evolving Obsidian Loop]]
- [[AI Edge Anthropic Agentic Skills Guide - Jayse Adaptation]]
- [[Agent Skill Candidate Template]]
- [[Vault Loop Report - 2026-07-09]]
- [[Agent Skill Candidate Audit]]
- [[Capture Workflow]] — How to capture new information.
- [[Inbox Capture Template Guide]] — Simple content-intake templates for Inbox and Business Context Brain clients.
- [[Telegram Quick Capture Workflow]] — Prompted `cap` convention for Telegram source capture.
- [[Ari Context Guard and Handoff Workflow]] — Save/refresh handoffs before long sessions hit context limits.
- Inbox processor script/report — `00_System/Scripts/inbox_processor.py`; latest report `00_System/Reports/Inbox Processor Report - 2026-07-08.md`.
- [[YouTube Ingest Workflow]] — How to turn a YouTube video into vault knowledge.
- [[Weekly Lint Workflow]] — How to health-check the vault.
- [[Skill Improvement Workflow]] — How repeated tasks become skills.
- [[Claude and Ari Second Brain Evolution Loop]] — Weekly Obsidian self-improvement loop pairing Claude Code with Ari/Hermes.
- [[Karpathy Connection Illumination Workflow]] — Recurring scan for missed links, orphans, hubs, and synthesis candidates.
- [[Karpathy Self-Learning Lessons Review and Implementation Workflow]] — Review/triage/implement loop for useful Karpathy self-learning lessons.
- [[Obsidian Graph Visual Language]] — Karpathy-style color and node-size language for the vault graph.
- [[OpenCLI Agent Reach Cheat Sheet]] — Quick commands for OpenCLI, Agent Reach, Chrome Browser Bridge, and DevTools/CDP.
- [[Second Brain Agentic Capture Improvements - Captures 1 and 4]] — Claude/Obsidian capture and agentic-loop improvements from cap batch.
- [[AI Quant Trading Floor Workflow]] — Safety-first self-improving quant trading research floor.
- [[Self-Improvement Protocol|AI Quant Trading Floor Self-Improvement Protocol]] — Required learning loop, scorecards, ledgers, and approval gates for trading agents.
- [[Android Obsidian Sync via Syncthing]]
- [[Parallel Agent Research Board Workflow]] — Role-based multi-agent/Kanban workflow for scalable research batches. — Pair Android Obsidian with the laptop vault using Syncthing.

## Source summaries
- [[Thinkverse AI Five Claude Side Hustles - Business Context Brain Review]] — five-model business review; integrates the strongest idea as a Context Brain Content Activation add-on.
- [[Robot James Method Library - Caps 1 to 9]] — sequential synthesis of forced flows, risk premia, pairs trading, survival sizing, gentle rebalancing and strategy sourcing.
- [[Raw Source Corpus Navigation]] — immutable raw transcript corpora connected through source indexes and processed knowledge hubs.
- [[Moon Dev Robinhood Meme Discovery Bot - X 2075628021118099917]] — Robinhood Chain meme discovery reviewed as an Antoine-adjacent, watch-only adapter candidate.
- [[Miles Claude Trading Bot Article - X 2075615711150608468]] — Queued AI Quant/QTF-021 review; full public X Article retrieved, headline P&L remains unverified.
- [[AI Edge Personal Agent Ideas - X 2068159407645671640]]
- [[X Bookmark Cap 1 - CyrilXBT AI Second Brain in 15 Minutes]]
- [[X Bookmark Cap 2 - AI Edge Fable Obsidian Self-Evolving Loops]]
- [[X Bookmark Cap 3 - MoonDev AutoGPT Sharpe Trading Bot]]
- [[X Bookmark Cap 4 - CyrilXBT Obsidian Trading Ideas Morning Workflow]]
- [[X Bookmark Cap 5 - CyrilXBT Terminal Torrent Client]]
- [[X Bookmark Cap 6 - AI Edge Anthropic Agentic Skills Guide]]
- [[X Bookmark Cap 7 - DamiDefi DeFi Network Video Source Limited]]
- [[QTF-017 Morning Idea Generator from Second Brain]]
- [[Reddit AI Trading 10 Percent in 9 Days - Source-Limited Review]]
- [[Git Tools Install Review - X 2061870611115188297]]
- [[Oracle Cloud Free VPS - YouTube TAZfDdQha3U]]
- [[Claude Code Money Partner - YouTube iTY8Q449YNQ]]
- [[AI Agent Income Ideas - Cap 1 2026-07-08]]
- [[X Trading Journal Compounding Idea - 2071192941750599725]]
- [[QTF-015 Trading Journal Compounding Feedback Loop]]
- [[Ari Verification and Handoff Operating Pattern]]
- [[agent-reach-giving-hermes-codex-broader-internet-research-access]]
- [[scalable-obsidian-brain-for-an-ai-agent]]
- [[seven-levels-of-hermes-agent]]
- [[codex-obsidian-24-7-ai-business-partner]]
- [[hedge-fund-method-markov-regime-system]]
- [[hermes-ai-trading-floor-system]]
- [[how-to-build-a-self-improving-ai-trading-agent]]
- [[i-built-an-ai-trading-system-from-a-traders-youtube-videos]]
- [[fable-obsidian-second-brain-loop]]
- [[karpathy-ai-second-brain-connection-layer]]
- [[Robotics Physical AI Investing Guide - Miles Deutscher 2026-07-07]]
- [[AI Backtesting TradingView EMA Strategy - YouTube VDpTU5kdj8A]]
- [[MoonDev Sharpe Trading Bot X Article - 2016647662637064402]]
- [[Cap Batch 2026-07-08 - Sequential Capture Review]]

## Filed queries and syntheses
- [[Missed Connections Review - 2026-07-13]] — Generated connection dashboard review questions from the latest vault scan.
- [[Missed Connections Review - 2026-07-08]] — Generated connection dashboard review questions.
- [[Karpathy Connection Synthesis - 2026-07-08]] — First human-readable synthesis of missed vault/project connections.

## Active projects
- [[Hermes Remote VPS Migration Plan - Oracle Always Free]] — Proposed remote Ari/Hermes VPS uptime and disaster-recovery plan.
- [[Bybit Airdrop Prediction Bot Implementation Plan]] — Staged guardrailed plan for Prediction Bot, Airdrop Agent, and Bybit Trading Bot implementation.
- [[Vibe-Trading Paper-Only Pilot Plan]] — Proposed paper-only/public-data evaluation lane for Vibe-Trading components before any adoption.
- [[AI Quant Trading Floor]] — Hermes-assisted quant strategy research floor with self-improvement loop.
- [[AI Business Agent Lab]] — Safe NemoClaw/Hermes + GLM/OpenRouter + Stripe Projects implementation scaffold.
- [[AI Quant Trading Floor Implementation Architecture]] — Model Trader-style implementation for crypto/CEX/DEX/CMC research.
- [[Model Trader v0 Smoke Test Evidence]] — First verified scan/backtest run for the v0 implementation.
- [[Robotics Physical AI Theme Lab 01 - Article Basket Evidence]] — First robotics/physical-AI theme basket smoke test.
- [[Robotics Physical AI Theme Lab 02 - Walk-Forward Validation]] — Rolling out-of-sample validation for QTF-009.
- [[Antoine DEX Screener Adapter 01 - Watch Candidates]] — First read-only DEX Screener watchlist evidence for Antoine desk.
- [[Antoine Risk Adapter 02 - RugCheck Solana Gate]] — Second read-only risk adapter for Solana holder/dev/authority screening.
- [[Antoine Risk Adapter 03 - EVM GoPlus Honeypot Gate]] — EVM/Base/BSC public risk adapter for holder, tax, contract, and honeypot checks.
- [[Antoine Outcome Tracker 01 - Forward Snapshot Ledger]] — Forward price snapshots for Antoine candidate expectancy tracking.
- [[Antoine Cohort Comparison 01 - Random Same-Age Controls]] — Same-age control baseline for Antoine candidate expectancy testing.
- [[Vibe-Trading Evaluation Report - 2026-07-09]] — Read-only evaluation of HKUDS/Vibe-Trading as a pattern/reference repo for Quant Floor safety, evidence, and agent workflow design.
- [[Chronos Polymarket Recorder Smoke Test - 2026-07-09]] — First verified read-only Chronos/Kronos Polymarket + Bybit snapshot recorder smoke test.
- [[Vibe-Trading Paper-Only Smoke Test - 2026-07-09]] — First isolated no-key public-data Vibe-Trading backtest evidence note.
- [[Vibe-Trading Broad Tactical Momentum Benchmark - 2026-07-09]] — Broader public-data 5-ETF tactical momentum benchmark; infrastructure pass, strategy revise/reject signal.
- [[Vibe-Trading CORE_DEF Benchmark Comparison - 2026-07-09]] — Vibe-Trading expression of Quant Floor CORE_DEF-L252-T1-VT0.08; keep native engine, borrow Vibe-style artifacts.
- [[Native CORE_DEF Run Card Artifact Contract - 2026-07-09]] — Native Quant Floor CORE_DEF rerun with Vibe-style run card, hashes, artifacts, source snapshots, and validation JSON.
- [[Forven Reddit Source Review - 2026-07-09]] — Reddit/repo source review of Forven as an open-source AI quant verification gauntlet reference for Quant Floor.
- [[Queued YouTube Capture Batch - 2026-07-09]] — Inventory/triage of 13 queued captures across Polymarket, Hyperliquid, data quality, sovereign AI, iOS apps, and AI business ideas.
- [[High Priority Money-Making Tracks - 2026-07-10]] — Priority lanes for Hyperliquid ecosystem opportunities and iOS/Play Store app monetization.
- [[AOD Student Placement Checks and Melbourne Contacts - 2026-07-10]] — National Police Check, NDIS Worker Screening Check, and Melbourne/Victoria AOD placement contact research.
- [[AOD Placement and Sector Job Finder Agent]] — Scheduled weekdays 7am to find AOD/mental-health placements, paid part-time roles, and adjacent applications.
- [[AOD Placement Job Finder Dashboard]] — Tracker for placement/job leads, blockers, resume/cover-letter tailoring queue, and Jayse decisions.
- [[AOD Placement Finder Run - 2026-07-13]] — Public-page verification of placement pathways and known AOD/MH job leads.
- [[AOD Placement Finder Run - 2026-07-14]] — Public-page recheck; CMRH package created; known jobs and placement pages triaged.
- [[AOD Placement Finder Run - 2026-07-15]] — Live-status recheck; active leads retained, Uniting Ivanhoe and Western Health confirmed closed.
- [[2026-07-13 - Permalink - Student Placement]] — Application package for a direct Diploma of Mental Health placement enquiry.
- [[2026-07-14 - CMRH - Diploma of Mental Health Student Placement]] — Application package for a direct CMRH placement enquiry.

## Quant strategy specs
- [[QTF-001 Markov Regime Filter]]
- [[QTF-002 Standalone Markov Directional Strategy]]
- [[QTF-003 Hidden Markov Regime Strategy]]
- [[QTF-004 Enhanced Regime Scoring Model]]
- [[QTF-005 RSI MACD Trend Strategy]]
- [[QTF-006 Strategy Factory Optimizer]]
- [[QTF-009 Robotics Physical AI Theme Basket]]
- [[QTF-010 Antoine On-Chain Meme and Airdrop Alpha Pipeline]]
- [[QTF-011 Political Disclosure Copy Trading Delay Edge]]
- [[QTF-012 IBKR AI Trading Bot Ops Pattern]]
- [[QTF-013 Hyperliquid Lighter Farming and Perp Venue Watchlist]]
- [[QTF-014 Antoine Meme Coin Techniques Library]]
- [[QTF-016 Social Trading Claim Review Protocol]]
- [[QTF-017 Strategy Verification Gauntlet]] — Native staged verification spec for AI/source-generated strategies: gauntlet gates, graveyard, DSR selection-bias checks, and paper-monitor promotion rules.
- [[QTF-018 Prediction Market Edge Intake]] — Polymarket/prediction-market edge intake spec for event-shock reversion, smart-money following, two-sided cheap maker bids, fresh-window stale pricing, maker rebates, and lifecycle anomalies.
- [[QTF-019 Hyperliquid Agentic Heartbeat Ops Spec]] — Read-only Hyperliquid heartbeat/pod ops spec and public-data snapshot ledger pattern.
- Venue metrics ledger — `05_Projects/AI Quant Trading Floor/Implementation/ledgers/venue_watchlist_metrics.jsonl`.
- [[QTF-008 EMA Momentum Baseline and Volatility Overlay]]

## Project and extraction dashboards

- [[GitHub Tool Staging - 2026-07-08]]

- [[AI Second Brain Project Registry]]
- [[Fable Extraction Master Status]]
- [[Business Context Brain - Product Concept]]
- [[Business Context Brain Client Intake Guide]]
- [[Solo App Business Candidates - Cap 7 2026-07-08]]
- [[Mobile App Store Monetization Track - 2026-07-10]]
- [[Basketball Coach Game Plan Proof Pack - 2026-07-10]]
- [[YouTube AI Business Refresh Assessment - 2026-07-07]]
- [[AI Business Video Opportunity Extraction - 2026-07-07]]
- Business Context Brain Demo Pack: `05_Projects/AI Business Launch Backlog/Business Context Brain Demo Pack/`
- Business launch asset database: `05_Projects/AI Business Launch Backlog/Business Launch Asset Database.csv`
- Renovator Quote Brain Demo: `05_Projects/AI Business Launch Backlog/Business Context Brain Demo Pack/Renovator Quote Brain Demo/`

## AOD Student Placement / Job Finder

- [[AOD Placement and Sector Job Finder Agent]]
- [[AOD Placement Job Finder Dashboard]]
- [[Chisholm Diploma of Mental Health Placement Requirements - Extracted]]
- [[Role Categories to Capture for AOD MH Placement Finder]]
- [[AOD MH Master Profile]]
- [[Jayse Cover Letter - Source - cohealth Harm Reduction Worker]]
- [[Application Intake and Tracking System]]
- [[Application Register]]
- [[Paid Role Application Sprint - 2026-07-12 to 2026-07-14]] — Calendar schedule, live/closed listing status, tailored cover-letter links and approval gates.

## AOD ChatGPT Source / Contact Touches

- [[ChatGPT Project Source - Application Review and Job Search - 2026-07-10]]
- [[ChatGPT Project Extracted Text - 2026-07-10]]
- [[2026-07-10 - Contact Touch - cohealth - Marilyn]]

## cohealth AOD Application

- [[2026-07-10 - cohealth - Harm Reduction Worker]]
- [[2026-07-10 - cohealth - Harm Reduction Worker PD Extract]]
- [[2026-07-10 - Contact Touch - cohealth - Merelyn Fernon]]

## AI Quant / Polymarket Source Ingests

- [[GPT 5.6 Polymarket BTC Strategy Workflow - Video Ingest - 2026-07-10]]
- [[QTF-020 Polymarket Model Tournament Harness]]

- [[QTF-020 Polymarket Model Tournament Harness]] — scaffold implemented; dry-run folder: `Implementation/model_tournaments/2026-07-10-polymarket-btc-qtf020-dry-run-v2/`

## AI Quant / TradingView Agentic Lab

- [[Claude TradingView Trading Bot Workflow - Transcript - 2026-07-10]]
- [[Claude TradingView Trading Bot Workflow - Video Ingest - 2026-07-10]]
- [[QTF-021 TradingView Agentic Strategy Lab]]
- [[Miles Claude Trading Bot Article - Quant Review - 2026-07-12]] — twelve-strategy blocked; workflow upgrades adopted

## AI Business Source Ingests

- [[Claude AI Business Ideas - Transcript - 2026-07-10]]
- [[Claude AI Business Ideas - Video Ingest - 2026-07-10]]
- [[High Priority Money-Making Tracks - 2026-07-10]] — added Source-to-Revenue Content Engine track

## AI Quant Trading Floor Implementation Notes

- [[QTF-020 Polymarket Model Tournament Harness]] — contract-validator slice implemented; fresh scaffold `2026-07-10-polymarket-btc-qtf020-contract-v3`

## 2026-07-10 Active Build Outputs

- [[QTF-020 Polymarket Model Tournament Harness]] — first actual tournament run layer complete
- `05_Projects/AI Quant Trading Floor/Implementation/tradingview_lab/` — QTF-021 TradingView Lab scaffold
- [[Source-to-Revenue 14-Day Validation Sprint - 2026-07-10]]
- [[Source-to-Revenue Sprint - One Page Offer]]
- [[Source-to-Revenue Sprint - Outreach Messages]]
- [[Source-to-Revenue Sprint - Demo Build Checklist]]

## 2026-07-10 Next Suggested Moves

- [[QTF-020 Polymarket Model Tournament Harness]] — outcome/fill replay layer implemented
- `05_Projects/AI Quant Trading Floor/Implementation/tradingview_lab/docs/manual_paste_test_pack.md`
- `05_Projects/AI Business Launch Backlog/Source-to-Revenue Demo - BuyerProof Property Partner/README.md`

## Current Jayse Action Queue

- [[Jayse Action Queue - cohealth to Current Projects - 2026-07-10]]

## 2026-07-10 Polymarket Whale Economics

- [[Polymarket 5-Minute Whale Economics - Reddit Source - 2026-07-10]]
- [[Polymarket Whale Supply-Side Economics - Quant Review - 2026-07-10]]

## QTF-022 Polymarket Supply-Side Economics

- [[QTF-022 Polymarket Supply-Side Maker Economics Lab]]
- [[QTF-022 Supply-Side Economics Dashboard]]
- [[Polymarket Whale Supply-Side Economics - Quant Review - 2026-07-10]]

