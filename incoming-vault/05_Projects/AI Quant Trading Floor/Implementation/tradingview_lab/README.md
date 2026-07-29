# QTF-021 TradingView Agentic Strategy Lab

Risk mode: research-only / paper-first.

Purpose: use TradingView as a signal lab and visual validation layer for Jayse's indicator-based trading ideas before any exchange/webhook/live automation.

Folders:

```text
pine_strategies/       Pine Script strategy drafts
alert_contracts/       Alert JSON schema and examples
ledgers/               Paper alert ledgers exported from TradingView/manual capture
reports/               Review summaries and paper-monitor reports
docs/                  TradingView setup guides and operating notes
tests/                 Validator tests
```

Hard stops:

- no Bybit/API keys;
- no Trigger Trade/live connector;
- no exchange order routing;
- no leverage automation;
- all alerts treated as paper signals until explicit approval.

## Manual paste/test pack

Use:

```text
docs/manual_paste_test_pack.md
reports/tradingview_backtest_capture_template.md
reports/tradingview_lab_scorecard.md
ledgers/README.md
```

Verified locally:

```text
python -m pytest tests -q
2 passed
python validate_tv_alert.py alert_contracts/example_alert.json
status: valid
```
