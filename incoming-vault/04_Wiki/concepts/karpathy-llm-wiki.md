---
title: Karpathy LLM Wiki
created: 2026-07-02
updated: 2026-07-02
type: concept
tags: [ai-agent, second-brain]
sources: [03_Sources/youtube/scalable-obsidian-brain-for-an-ai-agent.md]
confidence: medium
---

# Karpathy LLM Wiki

Karpathy's LLM Wiki pattern uses three layers: immutable raw sources, an agent-maintained markdown wiki, and a schema that tells the agent how to ingest/query/lint. The key idea is compounding synthesis: the agent integrates each new source once and keeps the wiki current instead of re-deriving everything from raw files on every query.

The practical upgrade for Jayse's vault is the [[Karpathy Connection Illumination Workflow]]: a recurring pass that scans the existing markdown graph for likely missed links, orphan pages, hub pages, and cross-folder bridge candidates. This turns the vault from searchable memory into a maintained intelligence layer.

Related: [[ai-second-brain]], [[YouTube Ingest Workflow]], [[Weekly Lint Workflow]], [[Claude and Ari Second Brain Evolution Loop]], [[Connection Illumination Dashboard]].
