---
title: Capture Queue - Pairs Trading Batch 1 to 9
created: 2026-07-14
updated: 2026-07-14
status: queued-for-ingestion
owner: Quant Floor
risk_mode: paper-only
---

# Purpose

Ingest and critically review five pairs-trading sources supplied by Jayse. Use them to improve the pairs toolkit and compare transferable methods with the Quant Floor's other edge sleeves.

# Sources

| Capture | Source | Type | Initial review focus |
|---|---|---|---|
| Cap 1 | [Alpaca — Pairs Trading with Crypto and Equities](https://alpaca.markets/learn/pairs-trading-with-crypto-and-equities) | Article | Spread construction, hedge ratio, execution assumptions and reproducibility |
| Cap 2 | [YouTube — YDMSqal-RZ4](https://youtu.be/YDMSqal-RZ4?si=5GpQQW2Y6ki5egOz) | Video | Strategy rules, data, claims, tooling and production path |
| Cap 3 | [Enhancing Pairs-Trading Strategies in Cryptocurrency using Machine Learning Clustering Algorithms](https://journalspress.com/LJRMB_Volume25/Enhancing-Pairs-Trading-Strategies-in-the-Cryptocurrency-Industry-using-Machine-Learning-Clustering-Algorithms.pdf) | Paper/PDF | Clustering, pair selection, look-ahead risk, validation and statistical significance |
| Cap 4 | [CMC Markets — Pairs Trading](https://www.cmcmarkets.com/en-gb/trading-strategy/pairs-trading) | Article | Practical spread/Z-score explanation, risks and execution limitations |
| Cap 5 | [Gate — Pairs Trading in Crypto](https://www.gate.com/learn/articles/-navigating-market-volatility-pairs-trading-and-its-application-in-the-crypto-market/4574) | Article | Crypto-specific implementation, funding, liquidity, costs and risk controls |
| Cap 6 | [ForTraders — Top 5 Crypto Pairs for Funded Traders](https://www.fortraders.com/blog/top-5-crypto-pairs-for-funded-traders) | Article | Conservative drawdown constraints, pair selection, liquidity and funded-account risk rules |
| Cap 7 | [Macroaxis — Crypto Correlation](https://www.macroaxis.com/invest/crypto-correlation) | Data table | Mathematical correlation values, methodology, update frequency, alternate data provenance and correlation/cointegration limitations |
| Cap 8 | [BitInfoCharts — Crypto Correlation](https://bitinfocharts.com/correlation.html) | Data table | Independent correlation source, calculation window, coverage, cross-source agreement and data-retrieval feasibility |
| Cap 9 | [YouTube — CLXU4RGrU5I](https://youtu.be/CLXU4RGrU5I?si=TJF2q2DXa7xyE-mx) | Video | Free data-collection techniques, public APIs, scraping/export workflows, provenance, rate limits and reusable system components |

# Required minimum review

For every capture:

1. Source summary and key claims.
2. Positive and negative findings.
3. Credibility and evidence quality.
4. Exact edge being proposed.
5. Transferable tools and methods.
6. Claims that are not reproducible or are unsupported.
7. Data, costs, liquidity and execution assumptions.
8. Look-ahead, selection and survivorship-bias risks.
9. Implementation recommendation for the Quant Floor.
10. Independent validation plan and kill criteria.
11. Final decision: adopt, adapt, monitor, reject or source-limited.

# Pairs-specific checklist

- Price ratio versus log-spread versus residual spread.
- Static versus rolling hedge ratio.
- OLS, Kalman filter or other beta estimation.
- Correlation versus cointegration distinction.
- ADF/Johansen tests and their limitations.
- Half-life and holding-period decay.
- Z-score threshold sensitivity and parameter jitter.
- Clustering/pair-selection leakage.
- Structural breaks and regime changes.
- Two-leg fees, spread, slippage, funding and borrow.
- Legging and execution risk.
- Out-of-sample, walk-forward, Monte Carlo and paper-forward gates.

# Boundary

This queue is research-only. No live orders, exchange credentials, wallet access or automatic strategy promotion will be enabled from these sources.
