# Data Manifest — polymarket-btc-qtf020-contract-v3

Created: 2026-07-10T05:31:39+00:00
Risk mode: **research-only / public-data / simulated fills**

## Rows by type

| Data type | Rows |
|---|---:|
| candidate ledger | 116 |
| orderbook snapshots | 110 |

## Edge counts

| Edge ID | Rows |
|---|---:|
| PM-E03 | 61 |
| PM-E04 | 55 |

## Date range

| Field | Value |
|---|---|
| first timestamp | 2026-07-09T23:58:40+00:00 |
| last timestamp | 2026-07-10T00:26:37+00:00 |

## Sample markets

- 1414846
- 1415215
- 1415275
- 1601813
- 1646147
- 1822773
- 2839826
- 2865122
- 2865123
- 2865124
- 2865125
- 2865126

## known_missing_data

- none detected by harness

## Execution constraints

- no wallet/auth/orders;
- no private API keys;
- no live trading;
- simulated fills only;
- conservative fee/slippage/latency/queue/adverse-selection assumptions required;
- no profitability claims without reproducible evidence.

## Leakage controls

- Model run folders start with blank strategy/report artifacts.
- Shared data folder contains only copied source ledgers/cache files.
- Prior strategy reports are not copied into model run folders.
- Review board files start blank and should be filled only after model candidates are complete.

## Holdout guidance

Use chronological splits. Preserve the latest untouched window as holdout before selecting parameters. If the dataset is too sparse for a holdout, reject or mark as data-insufficient.
