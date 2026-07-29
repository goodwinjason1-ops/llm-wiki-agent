---
title: AI Second Brain Project Registry
created: 2026-07-07
updated: 2026-07-19
type: dashboard
tags: [second-brain, project-registry, fable-extraction]
---

# AI Second Brain Project Registry

This dashboard maps Jayse's local project/knowledge folders into the Obsidian second brain so Hermes/Claude can find the right context quickly.

## Project table

| Project | Path | Classification | Files | Top file types |
|---|---|---|---:|---|
| [[Basketball PWA Project Context]] | `C:/Users/Kidsg/OneDrive/Desktop/Sixth Man/basketball-pwa` | code_or_mixed_project | 544 | .jsx:305, .js:121, .mjs:22, .py:19, .md:18 |
| [[BeastCity Project Context]] | `C:/Users/Kidsg/OneDrive/Desktop/BeastCity` | knowledge_reference_project | 34 | .svg:22, .md:4, .html:3, .json:3, [none]:1 |
| [[Gym App Project Context]] | `C:/Users/Kidsg/OneDrive/Desktop/Gym app` | unknown_or_assets | 1 | .html:1 |
| [[Jungian Project Context]] | `C:/Users/Kidsg/OneDrive/Desktop/Jungian` | knowledge_reference_project | 1 | .docx:1 |
| [[MVP Role Play Simulator Project Context]] | `C:/Users/Kidsg/OneDrive/Desktop/MVP - Role Play SImulator` | knowledge_reference_project | 2 | .pdf:1, .docx:1 |
| [[Prediction Bot Desktop Project Context]] | `C:/Users/Kidsg/OneDrive/Desktop/Prediction Bot` | knowledge_reference_project | 22 | .md:14, .docx:4, .pdf:4 |
| [[Prediction Bot New project 4 Project Context]] | `C:/Users/Kidsg/OneDrive/Documents/New project 4` | code_or_mixed_project | 336 | .py:112, .png:68, .sql:36, [none]:35, .pdf:17 |
| [[Airdrop Agent Project Context]] | `C:/Users/Kidsg/OneDrive/Documents/Airdrop Agent` | code_or_mixed_project | 264 | .py:147, .md:42, .ts:22, .tsx:17, .json:14 |
| [[Chisholm Mental Health Diploma Project Context]] | `C:/Users/Kidsg/OneDrive/Desktop/Chisholm - Diploma Mental Health 2026` | knowledge_reference_project | 209 | .docx:112, .pdf:69, .pptx:20, .zip:6, .rtf:1 |
| [[Chisholm AOD Course Work Project Context]] | `C:/Users/Kidsg/OneDrive/Desktop/Chisholm 2025 - AOD Course Work` | knowledge_reference_project | 344 | .docx:248, .pdf:47, .pptx:15, .rtf:10, .doc:8 |
| [[Bybit Downloads Project Context]] | `C:/Users/Kidsg/CrossDevice/Pixel 9 Pro Fold/storage/Download` | reference_materials | 222 | .pdf:105, .md:27, .docx:19, .html:11, .csv:11 |
| [[Bybit Bot Local Project Context]] | `C:/Users/Kidsg/OneDrive/Documents/bybit bot` | planning_spec_project | 8 | .md/.txt/.js/.html specs + tracker |
|| [[Source-to-System Studio Project Context]] | `C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/Source-to-System Studio Website/` | website_project | 13 | .html:5, .css:1, .js:1, .svg:4, .md:2 |
|| [[Fable Trading System Project Context]] ...[truncated]

## Global rules

- Do not read or print secrets (`.env`, API keys, credentials). Redact if encountered.
- Code projects need local `CLAUDE.md`/extraction docs before major edits.
- Knowledge/course projects should be ingested into source summaries and wiki notes, not edited in place.
- Trading/crypto projects default to paper/sandbox/dry-run and require explicit authorization for live actions.
- Mental health/AOD material is educational/course context only, not medical/clinical advice.

## Highest-value next extraction targets

1. `Prediction Bot New project 4` — actual executable prediction/trading bot code; GitHub confirmed as private repo `goodwinjason1-ops/prediction-trading-bot`.
2. `Bybit Bot Local` — clean/rotate local secrets, then scaffold a read-only/testnet-first executable repo from the specs.
3. `Airdrop Agent` — code project with API/web/apps and safety-sensitive crypto workflows.
4. `Chisholm Mental Health Diploma` + `Chisholm AOD Course Work` — knowledge base for role-play/simulation and possible education products.
5. `MVP Role Play Simulator` + `Jungian` — likely commercializable mental-health/AOD simulation concepts.
6. `BeastCity` / `Gym App` / `MVP Role Play Simulator` — creative/product prototypes.

## Related product idea

See [[Business Context Brain - Product Concept]].
