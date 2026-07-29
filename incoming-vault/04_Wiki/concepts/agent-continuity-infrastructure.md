---
title: Agent Continuity Infrastructure
created: 2026-07-29
updated: 2026-07-29
type: concept
tags: [infrastructure, hermes, vps, uptime, ai-agent, tooling]
sources: [03_Sources/youtube/Oracle Cloud Free VPS - YouTube TAZfDdQha3U.md, 03_Sources/youtube/Open Source AI Stack Tools - Capture 2026-07-09.md, 03_Sources/youtube/Local Coding Assistant Qwen MTP - Capture 2026-07-09.md]
confidence: medium
---

# Agent Continuity Infrastructure

An always-on agent cannot depend on a laptop being awake, undamaged and unstolen. Continuity infrastructure is the set of choices that decouple the agent from one machine.

## Summary

Several captures in this vault look like generic self-hosting content but share one specific motive: **Ari/Hermes needs to run when Jayse's laptop does not.** That reframes the whole cluster. The question is not "what can I self-host" but "what breaks if this machine disappears, and what is the cheapest way to make that untrue".

Three layers, roughly in order of value:

1. **Compute continuity** — somewhere the agent runs 24/7
2. **Knowledge continuity** — the vault survives and syncs (already solved here via Syncthing)
3. **Capability continuity** — ingestion and retrieval keep working when a backend blocks

Layer 3 is the one currently failing, and it is why [[source-limited-capture]] notes exist.

## Key claims

- The useful angle on a free VPS is a Hermes/Ari continuity host, not general self-hosting — source: `03_Sources/youtube/Oracle Cloud Free VPS - YouTube TAZfDdQha3U.md`
- Oracle Cloud Always Free claims up to 4 CPUs, 24 GB RAM, 200 GB storage and 10 TB bandwidth ^conf:low — source: `03_Sources/youtube/Oracle Cloud Free VPS - YouTube TAZfDdQha3U.md`; vendor claim relayed by a video, not verified
- ARM/Ampere instances offer materially better free-tier capacity than x86 — source: `03_Sources/youtube/Oracle Cloud Free VPS - YouTube TAZfDdQha3U.md`
- A production + sandbox split is one of the recommended allocation patterns — source: `03_Sources/youtube/Oracle Cloud Free VPS - YouTube TAZfDdQha3U.md`
- Marker (document → markdown) and Crawl4AI (web → markdown) were assessed as the highest-fit ingestion tools; Qdrant and LangFuse as later VPS-backed services; DSPy deferred until a labelled eval set exists — source: `03_Sources/youtube/Open Source AI Stack Tools - Capture 2026-07-09.md`

## The sequencing judgement already recorded

The Open Source AI Stack capture contains a genuinely good call that is worth preserving as doctrine, not just a note: **defer DSPy until there is a labelled eval set or a repeated extraction failure pattern.** Optimising a pipeline you cannot yet measure is how tooling accumulates without capability improving.

The same logic applies to Qdrant. A vector database is a scaling answer, and this vault's problem is not scale — 784 notes is small. Its problem is synthesis. Adding retrieval infrastructure before [[synthesis-debt]] is repaid would be solving the wrong bottleneck.

## Caveats recorded in the sources

Account and billing risk on the free tier is real: the source specifies real details, no VPN or temporary email, and a real card. Capacity availability varies by region and is a common failure point. None of this has been executed or verified here.

## Links

- Enables: [[self-improvement-loop]] — the daily loop needs a host that is actually up
- Unblocks: [[source-limited-capture]] — capability continuity is what turns placeholders into summaries
- Should wait on: [[synthesis-debt]] — retrieval infrastructure is not the current bottleneck
- Related: [[agent-reach]], [[codex-execution-engine]]

## Open questions

- Has the Oracle free tier actually been provisioned, or is this still aspirational? The vault does not record an outcome either way.
- Which single backend failure causes the most source-limited notes? Fixing that one is worth more than the whole tool list.
