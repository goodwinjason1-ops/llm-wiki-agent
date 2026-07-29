---
title: Jayse Portfolio Command Dashboard
created: 2026-07-11
updated: 2026-07-21
type: dashboard
status: active
tags: [portfolio, roadmap, milestones, quant, business, projects, command-dashboard]
confidence: medium
---

# Jayse Portfolio Command Dashboard

Current Quant research synthesis: [[Robot James Method Library - Caps 1 to 9]].

> **As of 2026-07-21.** One-page operating view of active work, next jobs, achieved dates and conditional targets. Forecasts are planning ranges—not promises. "Live" means a usable production or customer-facing stage; trading systems require evidence and explicit approval before any capital is exposed.

## Executive snapshot

| Workstream | Current stage | Progress signal | Current decision | Next checkpoint | Earliest credible live/use target* |
|---|---|---:|---|---|---|
|| **Fable Trading System** | 23-edge multi-asset framework + execution layer (order gateway, risk monitor, kill-switch, **LTF registry**) | 🟢 100% | Master plan complete; execution scaffolded; LTF 5-strategy registry mapped; Tier 3 paper trading LIVE | 2026-07-25 review board | **Paper execution:** LIVE now; **guardrailed testnet:** Sep 2026 if gates pass ||
|| **AI Quant Floor** | Active research + paper evidence + 14 edge cards; scan pipeline REACTIVATED 2026-07-20 after 5-day dormancy (fresh boards, new manifest `d948d3a1...`) | 🟡 60% | Continue evidence; no live capital; scan now active | 2026-07-25 review-board status | **Guardrailed testnet:** Sep 2026; **limited live:** Oct–Nov 2026 only if gates pass |
| **Fable Trading (QTF-011)** | Research edge card — political disclosure copy trading delay | 🟡 30% | Paper research only; no live system yet | 2026-07-25 data sourcing check | **Research/lab:** Aug 2026 if SEC/CFI data available |
| **Prediction Bot** | Executable repo; paper/replay verification needed | 🟡 50% | Verify first; use as integration model | 2026-07-26 safe local smoke/replay target | **Paper operator:** Aug 2026; limited live no earlier than Oct 2026 |
| **Bybit Bot** | Specs/reference; executable path not confirmed | 🟠 25% | Confirm repo, then public adapter | 2026-07-26 repo decision/read-only adapter target | **Paper:** Sep 2026; testnet Oct; live Nov+ if approved |
| **Antoine / on-chain alpha** | Discovery + risk adapters + outcome watchdog active | 🟡 60% | Collect cohorts; Robinhood spike is watch-only | 2026-07-19 Robinhood adapter/support decision | **Research/paper already live**; capital deployment not forecast until cohort evidence passes |
| **Airdrop Agent** | Repo largely built; safe verification pending | 🟡 55% | Research + assisted checklists only | 2026-07-26 tests/safety inventory target | **Assisted use:** Aug 2026; autonomous execution not scheduled |
| **Business Context Brain / BuyerProof** | Assets/demo pack built; pilot validation next | 🟢 75% | Prioritize pilot and outreach | 2026-07-19 pilot package; 2026-07-20 outreach target | **Customer-facing pilot:** late Jul 2026; first paid pilot target Aug 2026 |
| **Source-to-System Studio** | Website (5 pages) + branding + LinkedIn posts + UTM tracking | 🟢 80% | Ready for domain/hosting; posts approved | Domain purchase; first LinkedIn post | **Offer live:** Aug 2026 once domain is live |
| **Basketball PWA / app monetization** | Existing product repo; monetization shape unresolved | 🟡 45% | Validate paid product shape before app-store work | 2026-07-26 monetization choice | **Pilot sale:** Aug–Sep 2026; store release depends on product/platform decision |
|| **AOD placement and paid-role search** | Finder, register, application sprint active; 2026-07-21 new leads: Anglicare Victoria, cohealth Women/Gender Diverse, arbias | 🟢 85% | Human-approved applications/follow-ups; urgent deadlines incoming | 2026-07-22 Permalink follow-up; 2026-07-24 Salvos Basin follow-up | Already operational; placement timing depends on external organisations |
|| **AI Second Brain / Ari uptime** | Vault + 19 cron jobs active, daily loops running; scan pipeline reactivated after 5-day gap; vault lint backlog (38 broken links, 133 missing frontmatter) | 🟢 90% | Maintain; fix broken links and missing frontmatter backlog | Weekly health check | Local system live now; VPS always-on target depends on Oracle approval |
| **Voice AI / VoxCPM2** | Repo cloned only | ⚪ 15% | Park until game/ad use case and install window | Reassess after higher-priority launches | No production date set |
| **Role-play/Jungian/BeastCity/Gym prototypes** | Catalogued/early concept stage | ⚪ 10–25% | Keep visible; do not fragment focus | Monthly portfolio review | No committed live date |

*Dates assume focused work, no major dependency failures and required Jayse approvals. External approvals, app stores, placements and trading evidence can move dates.

## What has been achieved

| Date | Achievement | Evidence / destination |
|---|---|---|
| 2026-07-07 | Laptop project registry and first extraction map completed | [[AI Second Brain Project Registry]], [[Fable Extraction Master Status]] |
| 2026-07-08 | Antoine DEX discovery, Solana RugCheck, EVM risk and outcome-tracking layers established | [[Antoine On-Chain Alpha Dashboard]] |
| 2026-07-08 | Fable/Claude trading video ingested → QTF-011 Political Disclosure Copy Trading Delay Edge created | [[QTF-011 Political Disclosure Copy Trading Delay Edge]] |
| 2026-07-09 | Quant Morning Brief, next-step queue, Vibe paper pilot and multi-bot plan established | [[AI Quant Morning Brief - Latest]], [[Bybit Airdrop Prediction Bot Implementation Plan]] |
| 2026-07-10 | QTF-020 Polymarket tournament and QTF-021 TradingView lab scaffolds created | [[QTF-020 Polymarket Model Tournament Harness]], [[QTF-021 TradingView Agentic Strategy Lab]] |
| 2026-07-10 | Business money-making tracks prioritized | [[High Priority Money-Making Tracks - 2026-07-10]] |
| 2026-07-10 | AOD application intake, register, tailored-letter batch and Calendar sprint established | [[Application Register]], [[Paid Role Application Sprint - 2026-07-12 to 2026-07-14]] |
| 2026-07-11 | First morning Ideas 1 and 3 tested; both correctly blocked from promotion | [[2026-07-11-QTF-MORNING-01 Tactical Crypto Regime Backtest]], [[2026-07-11-QTF-MORNING-03 Strategy Claim Card]] |
| 2026-07-14 | Source-to-System Studio website built (5 pages, How It Works accordions, demo narratives, visual refinements) | `05_Projects/Source-to-System Studio Website/site/` |
| 2026-07-14 | Fable extraction master status reviewed; remaining priorities updated | [[Fable Extraction Master Status]] |
| 2026-07-18 | Tactical momentum made bidirectional (gainers + losers tracked) | [[morning_quant_brief.py]] patched |
| 2026-07-18 | Funding carry forward test run: 163 canonical hourly rows, fade_short improving at 8h horizon | [[qtf_v02_funding_forward_test.md]] |
| 2026-07-18 | Price reversal mechanism edge card created | [[Price Reversal Mechanism — Edge Investigation - 2026-07-18]] |
| 2026-07-18 | Source-to-System Studio: favicon, OG image, branding assets, UTM tracking, LinkedIn posts ready | `05_Projects/Source-to-System Studio Website/site/` + `docs/` |
| 2026-07-18 | AOD PDs extracted: Recovery Alliance Care x2, Supporting Your Life, Neami National | `05_Projects/AOD Student Placement/Position Descriptions/` |
| 2026-07-19 | Edge worker 13 consecutive idle runs logged; scan pipeline confirmed dormant since 2026-07-16 | `log.md` |
|| 2026-07-19 | Vault lint: 38 broken wikilinks, 133 missing frontmatter identified; SCHEMA.md absent | `00_System/Scripts/vault_lint.py` |
|| 2026-07-21 | AOD finder: 3 urgent new leads (Anglicare Victoria Case Manager, cohealth Women & Gender Diverse, arbias); 15 leads evaluated | [[AOD Placement Finder Run - 2026-07-21]] |
|| 2026-07-21 | Quant scan pipeline recovered after 5-day dormancy; fresh boards with new manifest `d948d3a1...`; trend PUMP +6.41% top positive | `log.md`, `edge_worker_20260720T214602Z.json` |
|| 2026-07-21 | Vault loop clean: 633 pages scanned, 40 missed connections, 0 new broken links | [[Vault Loop Report - 2026-07-21]] |

## Next jobs — ordered portfolio backlog

### Now: 2026-07-18 to 2026-07-25

1. **Domain + hosting for Source-to-System Studio** — purchase domain, deploy static site, insert live URLs into LinkedIn posts and UTM doc.
2. **Publish LinkedIn Week 1 posts** — 3 posts ready with UTM tracking; Jayse approves, then post Mon/Wed/Fri.
3. **QTF-011 data sourcing** — check if SEC/CFI political disclosure data is accessible for paper research lab.
4. **AOD follow-ups** — check Salvation Army Basin response (due 2026-07-24), Permalink reply (due 2026-07-22).
5. **Funding carry sleeve** — collect multi-venue funding data to pass promotion gate.
6. **Portfolio review** — update forecast dates based on actual progress.

### Next: 2026-07-26 to 2026-07-31

1. Verify Prediction Bot locally in paper/replay mode.
2. Run Airdrop Agent tests and safety-control inventory.
3. Confirm whether the Bybit bot is executable code or specs only.
4. Select Basketball PWA's first paid product shape.
5. Begin Business Context Brain paid pilot outreach.

### August 2026 focus

1. Keep AI Quant in evidence/paper mode and hold a formal promotion review.
2. Run Prediction Bot as an operator-visible paper system.
3. Begin Bybit paper harness only after the public adapter and backtest contracts pass.
4. Launch Business Context Brain/Source-to-System paid pilot outreach.
5. Test Basketball PWA monetization with real conversations before store packaging.
6. QTF-011 political disclosure research lab if SEC/CFI data is accessible.

## Trading live-readiness gates

No calendar date alone promotes a trading system. The earliest-live ranges above require every applicable gate:

- [ ] Reproducible strategy specification and data manifest.
- [ ] No lookahead/repainting; next-bar or explicit fill model.
- [ ] Fees, slippage, liquidity and adverse-selection costs.
- [ ] Passive benchmark comparison.
- [ ] Walk-forward/out-of-sample evidence.
- [ ] Parameter jitter and selection-bias/DSR review.
- [ ] Adequate trade/sample count across regimes.
- [ ] Paper monitoring with stable expected behavior.
- [ ] Testnet/sandbox verification where available.
- [ ] Max position, max daily loss, cooldown and kill switch tested.
- [ ] Monitoring, audit trail and incident procedure.
- [ ] Jayse explicitly approves venue, capital, permissions and maximum loss.

**Current overall decision:** AI Quant is progressing toward guardrailed use, but no sleeve is approved for live capital yet.

## Business live-readiness gates

- [ ] One clear target customer and urgent problem.
- [ ] One demo using Jayse-owned material.
- [ ] One-page offer, price hypothesis and delivery scope.
- [ ] Outreach batch and response tracking.
- [ ] First pilot with documented before/after proof.
- [ ] Repeatable onboarding/delivery workflow.
- [ ] Only then expand automation, channels or product variants.

## Scheduled operating rhythm

| Time | Job | Delivery behavior |
|---|---|---|
| Daily 06:00 | AI Quant Morning Brief | Readable three-idea brief |
| Daily 06:20 | Second Brain vault loop | Routine maintenance; compact result |
| Daily 07:00 | Jayse daily morning start brief | Personal briefing |
| Daily 19:00 | Jayse daily evening close brief | Wrap-up and next-day prep |
| Weekdays 07:00 | AOD placement/job finder | New verified opportunities |
| Weekdays 08:00 | Tactical ETF paper monitor | Paper evidence only |
| Daily 09:00 | Alternative venues monitor | Readable summary |
| Hourly | Hyperliquid funding recorder | **Silent on normal success** |
| Hourly | Antoine outcome watchdog | Silent unless a horizon matures or error occurs |
| Daily 10:00 | Polymarket paper signal recorder | Only new simulated signals/errors |
| Every 6 hours | Polymarket outcome tracker | Only new outcomes/errors |
| Every 2 hours | Edge execution worker | Paper ledger verification |
| Every 15 minutes | Due-task reminder watchdog | Silent unless tasks are due |
| Sundays 09:00 | Second Brain health check | Weekly health summary |
| Mondays 09:30 | Claude + Ari evolution review | Weekly improvements |

## Forecast confidence and blockers

| Forecast | Confidence | Main blockers |
|---|---|---|
| Source-to-System Studio live | High | Domain purchase, hosting deployment |
| LinkedIn posts | High | Jayse approval of Week 1 posts |
| Business pilot late July / August | Medium-high | Offer focus, outreach execution, customer response |
| Basketball monetization pilot Aug–Sep | Medium | Product choice, user validation, packaging |
| Quant testnet Sep | Medium-low | Strategy evidence, sample size, integrations, risk testing |
| Quant limited live Oct–Nov | Low/conditional | Every trading gate plus explicit approval |
| VPS always-on Ari | Medium | Oracle account, instance, SSH and migration approval |
| Placement date | Low/external | Host availability, checks and placement approval |

## Linked operating dashboards

- [[AI Second Brain Dashboard]]
- [[AI Second Brain Project Registry]]
- [[AI Quant Morning Next Step Queue]]
- [[Antoine On-Chain Alpha Dashboard]]
- [[Business Launch Asset Navigation Dashboard]]
- [[AOD Placement Job Finder Dashboard]]
- [[Connection Illumination Dashboard]]
- [[High Priority Money-Making Tracks - 2026-07-10]]
- [[Fable Extraction Master Status]]

## Weekly review questions

1. What changed since last week?
2. What evidence was produced—not merely discussed?
3. Which next three jobs have the highest impact?
4. What is blocked by Jayse, an external party or missing data?
5. Which forecast dates need to move, and why?
6. Did anything pass a gate, fail a gate or need to be archived?
