---
title: QTF Evidence Queue - CASHCAT and QTF-024
created: 2026-07-14
updated: 2026-07-14
status: active-paper-only
---

# Scope

Start the three evidence tasks named in the morning brief without live execution, exchange credentials or autonomous promotion.

# 1. ETH next-bar backtest — superseded/cancelled

- Status: cancelled as a standalone evidence task.
- Reason: ETH is not an independent Quant Floor thesis. It remains a benchmark/control inside cross-sectional and multi-asset tests.
- Replacement: the TTM-01 cross-sectional momentum test uses BTCUSDT, ETHUSDT and SOLUSDT as a universe; ETH is not selected because it is ETH.
- Rule: no ETH-only evidence or allocation claim may be promoted.

# 2. CASHCAT funding persistence review

- Status: forward-outcome slice complete; paper-only and promotion-blocked.
- Evidence: 83 raw CASHCAT records and 76 canonical UTC-hour observations (2026-07-11 05:00 UTC to 2026-07-14 08:00 UTC), with no hourly gaps.
- Result: 48+ descriptive sample gate passed; same-sign rate 97.33%, lag-1 funding-level autocorrelation -0.0505.
- Caveat: short single-venue snapshot episode; no forward outcome, executed payment, costs, borrow, liquidation or cross-venue controls.
- Artifact: [[CASHCAT Funding Persistence Evidence Review - 2026-07-14]].
- Gate: descriptive persistence only until a preregistered paper comparison exists.
- Forward slice: `Implementation/reports/qtf_v02/qtf_v02_funding_forward_test.md` computes the declared `funding_hourly >= 0.0003` rule at 1h/4h/8h horizons with a 10 bps round-trip proxy and a chronological 70/30 split. The result is `do_not_promote`: holdout is small (9–14 episodes), single-venue, and funding is a proxy rather than executed payment data.

## 3. QTF-024 contradiction claim card

- Status: convert the contradiction idea into a testable claim card.
- Candidate claim: disagreement between social sentiment and market/funding direction is an investigation trigger, not a trade signal.
- Required fields: source timestamp, sentiment direction, market direction, funding/open-interest context, contradiction class, subsequent outcome window and null hypothesis.
- Gate: no strategy promotion from contradiction flags alone.

## Next safe action

Locate/verify ETH and CASHCAT data sources first. If the data are absent, record a blocker rather than fabricate or substitute a dataset.
