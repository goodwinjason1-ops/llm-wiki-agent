# AI Quant Trading Floor Implementation v0

Research/paper-trading implementation of the Model Trader + Hermes trading-floor pattern.

## Safety status

- Live trading: disabled
- Testnet trading: disabled
- Paper-trading ledger: available
- Public-data scanning/backtesting: available
- Private CEX/DEX/CMC integrations: placeholders only

Do not paste API keys into chat. Store secrets locally in environment variables or a secret manager.

## Files

| File | Purpose |
|---|---|
| `config.json` | Assets, thresholds, fee/slippage assumptions, safety mode |
| `quant_floor_system.py` | Data adapters, detectors, scanner, backtester, paper ledger |
| `opening_range_lab.py` | Intraday 15m/5m/1m opening-range backtester using Yahoo/Polygon equities plus Bybit/Hyperliquid crypto 1m candles |
| `moondev_market_maker_lab.py` | Clean-room research implementation of MoonDev article methods: maker/taker breakeven calculator, supply/demand maker proxy, inventory + daily max-loss controls on Bybit public data |
| `moondev_orderbook_gate.py` | Read-only Bybit order-book snapshot recorder/replayer for validating MoonDev maker candidates with latency, queue, spread, and adverse-selection penalties |
| `robotics_walkforward_validation.py` | Walk-forward validator for QTF-009 robotics theme basket |
| `antoine_alpha_desk.py` | Research-only Antoine/HandsomeFinance on-chain alpha corpus and candidate scorer |
| `venue_metrics_watchlist.py` | Read-only Hyperliquid/Lighter/TX Flow venue metrics ledger |
| `morning_quant_brief.py` | Daily 6am read-only Quant Floor brief: Bybit public regime snapshot, Hyperliquid funding/OI scan, recent source-note intake, three evidence-gated ideas |
| `ledgers/experiments.jsonl` | Append-only experiment/self-improvement history |
| `ledgers/paper_trades.jsonl` | Append-only simulated trade candidates |
| `.env.example` | Credential variable names for future local setup |

## Commands

Initialize ledgers:

```bash
python quant_floor_system.py init
```

Scan configured markets:

```bash
python quant_floor_system.py scan --interval 1d --limit 500
```

Backtest BTC public Bybit data (preferred for Jayse/Australia):

```bash
python quant_floor_system.py backtest --symbol BTCUSDT --adapter bybit --interval 1d --limit 1000
```

Legacy Binance adapter remains in code only as a fallback for old experiments; new crypto research should prefer Bybit where possible.

Run intraday opening-range crypto research with the current filters:

```bash
python opening_range_lab.py --adapter bybit --bybit-category linear --symbols BTCUSDT,ETHUSDT,SOLUSDT --days 30 --session-open-time 00:00 --use-vwap-filter --max-abs-gap-pct 3 --min-volume-displacement 1.1 --models breakout,retest --start-equity 5000
python opening_range_lab.py --adapter hyperliquid --symbols BTC,ETH,SOL --days 7 --session-open-time 09:30 --use-vwap-filter --max-abs-gap-pct 3 --min-volume-displacement 1.1 --models breakout,retest --start-equity 5000
```

Opening-range filters now include opening VWAP, prior-session high/low/close context, opening gap limits, and volume displacement. For crypto, use `--session-open-time` to test alternative opens such as `00:00`, `08:00`, `09:30`, or `20:00` in New York time.

For longer-window 1m equities/ETFs, use Polygon when a local key is available, or Bybit linear stock/ETF contracts when testing exchange-traded synthetic exposure available on Bybit:

```bash
export POLYGON_API_KEY=...
python opening_range_lab.py --adapter polygon --symbols SPY,QQQ,NVDA,TSLA --days 30 --use-vwap-filter --max-abs-gap-pct 3 --min-volume-displacement 1.1 --models breakout,retest --start-equity 5000

# Bybit linear stock/ETF contracts; bare symbols auto-map to SPYUSDT/QQQUSDT/NVDAUSDT/TSLAUSDT.
python opening_range_lab.py --adapter bybit --bybit-category linear --symbols SPY,QQQ,NVDA,TSLA --days 7 --use-vwap-filter --max-abs-gap-pct 3 --min-volume-displacement 1.1 --models breakout,retest --start-equity 5000
```

Hyperliquid currently does not list SPY/QQQ/NVDA/TSLA in its public perp universe, so it is crypto-only for this ORB lab unless that universe changes. Yahoo remains available for free short-window smoke tests only.

Backtest MoonDev clean-room market-maker proxy from public Bybit data:

```bash
python moondev_market_maker_lab.py --symbols BTCUSDT,ETHUSDT,SOLUSDT --interval 15m --days 30 --capital 5000
```

Run the robotics / physical-AI theme lab:

```bash
python robotics_theme_lab.py --capital 5000 --years 8
```

Run the stricter MoonDev order-book gate. This records public Bybit L2 snapshots and replays passive maker fills with latency/queue/spread/adverse-selection penalties. It is read-only and does not trade:

```bash
python moondev_orderbook_gate.py all --symbols BTCUSDT,ETHUSDT,SOLUSDT --samples 60 --delay-sec 1 --append-note
```

Backtest CMC-style research symbols via Yahoo fallback:

```bash
python quant_floor_system.py backtest --symbol SPY --adapter yahoo --interval 1d --limit 1000
python quant_floor_system.py backtest --symbol GLD --adapter yahoo --interval 1d --limit 1000
```

Create a paper-trade candidate only if score crosses threshold:

```bash
python quant_floor_system.py paper --symbol SOLUSDT --adapter bybit --interval 1d --limit 500
```

## Current v0 detectors

- RSI momentum
- MACD trend
- Markov-style 20-bar regime
- Swing highs/lows
- Failure-swing clustering
- Fair-value-gap approximation
- Confluence score thresholding

## Future adapter plan

| Adapter | Use | Credential handling |
|---|---|---|
| CCXT CEX | Exchange data/orderbooks/testnet later | env vars only |
| DEX/on-chain | On-chain crypto/stocks, pools, liquidity | RPC/indexer env vars only |
| CMC | Stocks, precious metals, ETFs universe/data | `CMC_API_KEY` env var only |
| Hyperliquid | Perps/paper/testnet/live if approved | env vars only |

## Self-improvement rule

Every scan/backtest appends to `ledgers/experiments.jsonl`. Any strategy change must update:

1. scorecard,
2. one changed variable,
3. evidence,
4. diagnosis,
5. baseline decision.

No live trading or write-mode automation until Jayse explicitly approves the exact scope.


## Antoine / Handsome Finance on-chain alpha desk

```bash
python antoine_alpha_desk.py --mode corpus
python antoine_alpha_desk.py --mode candidates --candidates-csv templates/antoine_candidate_template.csv
python antoine_alpha_desk.py --mode dexscreener --queries 'pump,ai,bonk,solana,base,aster,hyperliquid' --max-pairs 25
python antoine_alpha_desk.py --mode dexscreener_rugcheck --queries 'ai,pump,solana' --max-pairs 12
python antoine_alpha_desk.py --mode rugcheck --tokens '<solana_mint_1>,<solana_mint_2>'
python antoine_alpha_desk.py --mode dexscreener_fullrisk --queries 'ai,pump,base,bsc' --max-pairs 12
python antoine_alpha_desk.py --mode evm_risk --chain ethereum --tokens '<evm_contract_1>,<evm_contract_2>'
python antoine_alpha_desk.py --mode outcomes --max-outcome-rows 40
python antoine_alpha_desk.py --mode cohort --queries 'meme,dog,cat,base,bsc,eth,solana,pump,pepe,ai' --max-pairs 24 --per-bucket 4
python antoine_alpha_desk.py --mode compare
python ../../00_System/Scripts/antoine_outcome_watchdog.py
python venue_metrics_watchlist.py
```

The DEX Screener adapter is public/read-only discovery. The RugCheck adapter is public/read-only Solana risk gating for holder concentration, dev/insider supply proxy, authority flags, and risk labels. The GoPlus + Honeypot.is adapter performs public/read-only EVM risk checks for holder concentration, taxes, contract flags, and honeypot simulation. Antoine candidate rows now include source-tool, first-seen, launch-stage, wallet-score, bot-fee, priority-fee, slippage, bonding-curve, and migration-status fields, defaulting to unknown/zero unless evidence supplies them. Outcome mode snapshots forward candidate prices into `ledgers/antoine_candidate_outcomes.jsonl`. Cohort/compare modes build a same-age control group and compare outcomes. The watchdog is scheduled as cron `99832edcba1e` and stays silent unless a new matured horizon appears.

`venue_metrics_watchlist.py` appends public/read-only venue rows to `ledgers/venue_watchlist_metrics.jsonl`. Hyperliquid 24h notional volume and open interest are collected from the public info endpoint; Lighter/TX Flow remain manual-review rows until a reliable source is confirmed.

This desk is high-risk research only. It never stores private keys and never places orders.
