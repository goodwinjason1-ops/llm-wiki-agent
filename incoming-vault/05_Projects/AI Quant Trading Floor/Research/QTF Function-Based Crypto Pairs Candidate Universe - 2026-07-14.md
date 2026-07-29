---
title: QTF Function-Based Crypto Pairs Candidate Universe - 2026-07-14
created: 2026-07-14
updated: 2026-07-14
status: candidate-universe-not-validated
owner: Quant Floor
risk_mode: paper-only
---

# Purpose

Replace broad-cap crypto pairs with economically comparable protocol-token candidates. A candidate is not an approved pair, and token symbols/listings must be verified against the current venue before testing.

# Candidate groups

## A. Perpetual DEX / derivatives venues — highest-priority lane

| Candidate | Protocol/function | Pair candidates | Main comparability question |
|---|---|---|---|
| HYPE | Hyperliquid derivatives/venue ecosystem | HYPE / DYDX; HYPE / GMX; HYPE / DRIFT; HYPE / LIT if Lighter listing is confirmed | Are fee/revenue, unlock, chain and token-capture mechanics comparable? |
| DYDX | Decentralised derivatives venue | DYDX / GMX; DYDX / DRIFT; DYDX / AEVO | Different token utility and chain exposure may dominate the spread. |
| GMX | Perpetuals/spot trading protocol | GMX / DYDX; GMX / DRIFT | Compare fee capture, emissions, treasury and venue activity. |
| DRIFT | Solana derivatives venue | DRIFT / JUP only as a control, not a default pair | JUP is broader than perps; use only with a factor-control explanation. |
| AEVO | Derivatives/options venue | AEVO / DYDX; AEVO / GMX | Check current liquidity, token unlocks and product mix first. |
| LIT / Lighter | Candidate only if the intended asset is Lighter and the venue/token is confirmed | LIT / HYPE; LIT / DYDX | Confirm exact token, perpetual listing, history and circulating supply before inclusion. |

**Priority:** HYPE/DYDX, HYPE/GMX, DYDX/GMX, HYPE/DRIFT, then AEVO/LIT only after liquidity and token-status verification.

## B. Lending / borrowing protocols — separate high-priority lane

| Candidate | Protocol/function | Pair candidates | Main comparability question |
|---|---|---|---|
| AAVE | Multi-chain lending/borrowing | AAVE / MORPHO; AAVE / COMP; AAVE / SPARK token if liquid/listed | Revenue/fee capture and governance-token value accrual may differ. |
| MORPHO | Lending-market infrastructure | MORPHO / AAVE; MORPHO / COMP | Compare protocol revenue, supplied/borrowed liquidity and emissions. |
| COMP | Lending/borrowing protocol | COMP / AAVE; COMP / MORPHO | Liquidity and operational activity may be much lower; reject if costs dominate. |
| SPARK ecosystem token | Lending/credit-market candidate only if a liquid token is confirmed | AAVE / SPARK candidate only after confirmation | Do not assume the protocol has a suitable liquid pair token. |
| VENUS | BNB-chain lending/borrowing | VENUS / AAVE only as a cross-chain control | Structural chain and liquidity differences may invalidate the comparison. |

**Priority:** AAVE/MORPHO and AAVE/COMP, subject to same-venue availability and liquidity.

## C. Spot DEX / trading venues — separate lane, not mixed with perps by default

| Candidate | Protocol/function | Pair candidates | Note |
|---|---|---|---|
| UNI | Uniswap spot liquidity/DEX governance | UNI / SUSHI; UNI / CAKE | Different fee capture, chains and emissions require controls. |
| SUSHI | Spot DEX/liquidity | SUSHI / UNI; SUSHI / CAKE | Lower liquidity may make the relationship untradeable after costs. |
| CAKE | PancakeSwap spot/liquidity | CAKE / UNI; CAKE / SUSHI | Chain and tokenomics differences require explicit controls. |
| JUP | Solana aggregator/DeFi venue | JUP / DRIFT as a factor-control candidate | Not a pure spot-DEX pair; do not classify as same-function without a rationale. |

## D. Stablecoin / synthetic-dollar protocols — do not mix with exchange tokens

| Candidate | Function | Candidate relationship | Caution |
|---|---|---|---|
| ENA | Synthetic-dollar/stablecoin ecosystem | ENA / MKR or ENA / LQTY only as a hypothesis | Peg, collateral and event risk can dominate price behaviour. |
| MKR/SKY ecosystem | Stablecoin governance/credit system | MKR/SKY / ENA | Token migration and governance changes must be handled explicitly. |
| LQTY | Stablecoin/liquidation protocol | LQTY / ENA | Small-cap liquidity and tail risk are likely material. |

# Exclusions from first pass

- BTC/ETH/SOL as a same-function pair universe: retain only as broad-market controls.
- Meme coins: no stable economic relationship for this lane.
- Tokens with insufficient overlapping history, thin volume, major unlock distortion or unavailable funding data.
- Any candidate whose pair thesis is only “the charts look correlated.”

# Required validation for every candidate

1. Confirm exact token, venue listing and contract type.
2. Confirm at least 12 months of overlapping bars where available.
3. Measure rolling correlation, beta stability and cointegration/residual behaviour separately.
4. Include two-leg fees, spread/slippage and perpetual funding.
5. Run a 20-bar/2-sigma baseline only as a benchmark, not as an assumed edge.
6. Compare against a same-age control universe and broad beta controls.
7. Run walk-forward, out-of-sample and parameter-jitter tests.
8. Quarantine unlocks, migrations, governance events, listings and delistings.
9. Reject if the edge disappears after costs or is dependent on one short period.
10. Paper-monitor only after the statistical and operational gates pass.

# Production-oriented edge hypotheses

The aim is not to hold a random token. Test only hypotheses that could become repeatable:

- relative-value mean reversion among same-function venues;
- funding/carry divergence with a defined holding period and liquidation-safe sizing;
- fee/revenue/open-interest divergence as a catalyst for relative repricing;
- post-unlock or listing-event dislocations with pre-registered entry/exit rules.

All remain hypotheses until reproduced on held-out data and forward paper alerts.
