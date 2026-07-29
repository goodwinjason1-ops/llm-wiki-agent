# TradingView Paper Alert Ledger

Paste one JSON alert per line below or save exported alert rows to `tv_paper_alerts.jsonl`.

Validator:

```bash
python validate_tv_alert.py alert_contracts/example_alert.json
```

## Required JSON shape

```json
{"schema_version":"tv-alert-v1","risk_mode":"paper","strategy_id":"TV-E01-BB-MACD-RSI-MOM","symbol":"BTCUSDT","timeframe":"60","action":"enter_long","price":65000.0,"bar_time":1783728000000,"paper_only":true}
```

## Ledger notes

- Paper only.
- No webhook execution.
- No exchange routing.
- Record whether alert fired at bar close.
