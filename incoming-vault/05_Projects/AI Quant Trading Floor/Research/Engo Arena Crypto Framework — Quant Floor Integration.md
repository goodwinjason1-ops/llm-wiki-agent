---
title: Engo Arena Crypto Framework — Quant Floor Integration
created: 2026-07-16
updated: 2026-07-16
type: research
tags: [quant-floor, engo, crypto, edges, research]
source: https://engo.capital
status: paper-trading
---

# Engo Arena Crypto Framework — Quant Floor Integration

## Overview

The Engo Arena Crypto Framework adapts four winning edges from Engo Arena's public leaderboard to the Bybit crypto universe. This is a **Quant Floor module**, not a replacement for the Fable Trade Plan.

## Academic Foundations

- Cohen & Frazzini (2008) — Economic Links & Predictable Returns
- Moskowitz & Grinblatt (1999) — Do Industries Explain Momentum?
- Moreira & Muir (2017) — Volatility-Managed Portfolios
- Etula et al (2020) — Dash for Cash (Turn-of-Month)

## Edges Implemented

### 1. Residual Momentum (ENG-RM)
- **Description**: Momentum after stripping BTC/ETH market exposure
- **Maps to Fable**: C-LTF-1 (liquidation fade) + C-HTF-5 (trend following)
- **Signal**: Z-score of residual momentum; trade longs when > 0.5z
- **Data**: Bybit OHLCV, 15-coin universe

### 2. Idiosyncratic Reversal (ENG-IR)
- **Description**: Fade deviations from sector peer groups
- **Maps to Fable**: C-HTF-4 (alt/majors pairs & relative value)
- **Signal**: Sector z-score; LONG when z < -0.5, SHORT when z > 0.5
- **Data**: Bybit OHLCV, 9 crypto sectors

### 3. Sector Rotation (ENG-SR)
- **Description**: Rotate into strongest crypto sectors
- **Maps to Fable**: C-HTF-4 (pairs) + C-HTF-5 (trend)
- **Signal**: Sector performance rankings; LONG top 5, SHORT bottom 5
- **Data**: Bybit OHLCV, 30-day lookback

### 4. Turn-of-Month Flow (ENG-TMF)
- **Description**: Exploit month-boundary flow effects
- **Maps to Fable**: C-LTF-2 (funding-timestamp positioning)
- **Signal**: Early-month vs late-month return differential
- **Data**: Bybit OHLCV, BTC/ETH/SOL/XRP/ADA

## Integration with Quant Floor

### How it works
- Engo Framework runs **independently** from the Fable Trade Plan
- Engo signals are fed into Quant Floor's existing crypto sleeves:
  - C-LTF-1 (liquidation fade) — uses ENG-RM + ENG-TMF signals
  - C-HTF-4 (pairs/RV) — uses ENG-IR + ENG-SR signals
  - C-HTF-5 (trend) — uses ENG-RM + ENG-SR signals
- Fable plan's risk framework (DD ladder, position limits) governs all Engo-driven trades

### Execution flow
1. Daily: `python3.11 daily_runner.py` generates signals
2. Signals logged to `Implementation/reports/engo_crypto/`
3. Engo signals compared against Fable plan edge criteria
4. If Engo signal + Fable edge align → paper trade
5. Quarterly: Engo performance reviewed against Fable benchmarks

### Files
- `C:/Users/Kidsg/AppData/Local/hermes/engo_crypto_research/framework.py` — Main engine
- `C:/Users/Kidsg/AppData/Local/hermes/engo_crypto_research/daily_runner.py` — Daily runner
- `C:/Users/Kidsg/AppData/Local/hermes/engo_crypto_research/README.md` — Documentation

## Safety Rules
- Paper trading only — no live execution
- Fable plan risk framework governs all trades
- Engo signals are alpha inputs, not standalone strategies
- Quarterly review required to maintain Engo module status
