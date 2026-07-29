# TradingView Lab Review Scorecard

Use after Jayse captures TradingView Strategy Tester results.

| Category | Weight | Notes |
|---|---:|---|
| Strategy compiles cleanly | 10 | No Pine errors/warnings blocking use |
| Visual rule sanity | 15 | Entries/exits align with intended logic |
| Trade count sufficiency | 15 | Enough trades for timeframe/date range |
| Drawdown control | 15 | Max DD acceptable vs returns |
| Profit factor / expectancy | 15 | Not just one lucky trade |
| Multi-symbol/timeframe robustness | 15 | Works outside one chart |
| Paper alert contract readiness | 10 | Alert JSON validates and is paper-only |
| Simplicity / explainability | 5 | Jayse can understand when it fires |

## Promotion gates

| Score | Decision |
|---:|---|
| 0–39 | Reject/rewrite |
| 40–59 | Revise and retest |
| 60–74 | Paper-alert candidate |
| 75+ | Strong paper-alert candidate, still not live |
