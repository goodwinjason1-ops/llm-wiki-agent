---
title: Cap 9 Free Data Collection - Preliminary Source Review
created: 2026-07-14
updated: 2026-07-14
source: https://youtu.be/CLXU4RGrU5I?si=TJF2q2DXa7xyE-mx
status: preliminary-review
risk_mode: paper-only
---

# Summary

The video demonstrates a “last 30 days” research workflow intended to retrieve recent information from sources that are often blocked or unevenly accessible to AI agents, including X, Reddit, YouTube, TikTok and Instagram. The transcript describes source-specific access differences between model ecosystems, CLI/skill workflows and API-key-based scraping services.

# Transferable value for the Quant Floor

1. **Recency windowing** — constrain research to a defined recent period instead of allowing stale search results to dominate.
2. **Source-specific collection** — treat X, Reddit, YouTube and other sources as separate channels with different access, reliability and provenance rules.
3. **CLI-first collection** — use reproducible command-line collectors where available, then preserve the raw output before summarising.
4. **Public-data separation** — distinguish free/public collection from paid API or scraping services; do not add paid dependencies without a cost/benefit decision.
5. **Provenance capture** — record source URL, collection timestamp, method, access status and whether the content is original, reposted or summarised.
6. **Current-information research** — a recency filter can support catalyst, liquidation, market-regime and trend research, but it is not itself a trading signal.

# Claims requiring caution

- The video promotes a workflow and mentions paid access/services; this is not independent evidence that those services produce alpha.
- “Last 30 days” may improve freshness but can introduce recency bias and omit older structural evidence.
- Scraped social content may be incomplete, manipulated, duplicated or unavailable later.
- Source access through a model or CLI does not guarantee data completeness, lawful reuse or timestamp accuracy.
- Any social/media-derived trade hypothesis still requires structured market data, exact rules, costs, out-of-sample testing and paper-forward validation.

# Low-cost implementation recommendation

Use the following paper-only collection contract before considering paid services:

```text
source_url
source_type
collection_timestamp_utc
collector (ddgs / yt-dlp / Agent Reach / browser / public API)
raw_artifact_path
access_status
content_timestamp_if_available
author_or_account
hash_or_duplicate_key
extraction_confidence
```

Initial free stack:

- DuckDuckGo `ddgs` for discovery;
- `yt-dlp` for permitted YouTube metadata/subtitles;
- public exchange APIs for market data;
- Agent Reach/OpenCLI where already configured;
- browser/direct retrieval for pages;
- local raw-file preservation and deduplication.

# Quant Floor applications

- **Trend/momentum:** recent-source and market-regime monitoring, never as a standalone signal.
- **Carry:** monitor funding, protocol announcements and catalyst changes alongside numerical funding data.
- **Forced flow:** collect timestamped liquidation/open-interest commentary only as a hypothesis input; validate against structured liquidation data.
- **Pairs:** use current-source research to identify candidate relationships or structural events, then calculate our own correlation, cointegration, residual Z-score and costs.
- **ETFs and other sleeves:** use recency windows for catalyst and regime scans while keeping price/volume data authoritative.

# Decision

**Adapt**, subject to free-first implementation and provenance controls. Do not purchase the promoted API/scraping services based on this video alone.

# Raw source

`02_Raw/youtube/Cap 9 Free Data Collection - 2026-07-14.txt`
