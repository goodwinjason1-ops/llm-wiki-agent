---
title: Git Tools Install Review - X 2061870611115188297
created: 2026-07-08
updated: 2026-07-08
type: source_summary
status: installed-partial
source_url: https://x.com/i/status/2061870611115188297
tags: [x, github, ai-agent, quant, finance, tts, skills]
sources:
  - 02_Raw/x/2061870611115188297_access_attempt.md
confidence: medium
---

# Git Tools Install Review - X 2061870611115188297

## Source status

The original X article could not be retrieved from this environment. This review uses Jayse's list plus live GitHub repo metadata and local README inspection. The repos were cloned into a safe staging folder, but heavy apps were **not executed**.

Staging path:

`C:/Users/Kidsg/ai-tools/git-caps/2061870611115188297/`

## Install / staging status

| # | Tool | Repo identified | Local status | Best section | Verdict |
|---:|---|---|---|---|---|
| 1 | Trading agents | `TauricResearch/TradingAgents` | cloned only | AI Quant / Antoine research | Useful, but paper/research only. Do not wire to live trading. |
| 2 | LibreChat | `danny-avila/LibreChat` | cloned only | Personal AI hub / cost-control lab | Potentially useful as self-hosted multi-model UI, but duplicates Hermes in some areas. Best on VPS later. |
| 4 | Fincept Terminal | `Fincept-Corporation/FinceptTerminal` | cloned only | AI Quant research terminal | Useful to evaluate. Do not install/run broker integrations yet. License/maintenance caveats. |
| 7 | VoxCPM2 | `OpenBMB/VoxCPM` | cloned only | Personal/media voice stack | Useful for local/private TTS if hardware supports it; risky for voice-cloning misuse. |
| 9 | Addy Osmani agent skills | `addyosmani/agent-skills` | installed globally via `npx skills` | Agent/dev workflow | Installed. Useful for Claude/Codex/Hermes software workflow quality gates. |

## Actual actions taken

### Cloned repos

```text
C:/Users/Kidsg/ai-tools/git-caps/2061870611115188297/TradingAgents
C:/Users/Kidsg/ai-tools/git-caps/2061870611115188297/LibreChat
C:/Users/Kidsg/ai-tools/git-caps/2061870611115188297/FinceptTerminal
C:/Users/Kidsg/ai-tools/git-caps/2061870611115188297/VoxCPM
C:/Users/Kidsg/ai-tools/git-caps/2061870611115188297/agent-skills
```

### Installed agent skills

Ran:

```bash
npx -y skills@latest add addyosmani/agent-skills --global --yes
```

Verified with:

```bash
npx -y skills@latest list -g -a claude-code
```

Installed 24 Addy Osmani skills globally under `C:/Users/Kidsg/.agents/skills/`, linked for Claude Code, Hermes Agent, and Pi. PromptScript global install failed, but that does not affect Claude/Hermes use.

## Categorisation corrections

### TradingAgents

Jayse categorised as **AI quant & Antoine**. Correct, with a caveat:

- Best fit: AI Quant strategy research, analyst/researcher/risk-manager architecture, paper reports.
- Antoine fit: only as a **research-board layer** after Antoine candidates are risk-gated. It should not discover memecoins or execute trades directly.

### LibreChat

Jayse categorised as cost-efficient subscription replacement. Correct, but it is not a direct Ari replacement.

- Best fit: personal/family/self-hosted chat UI, model-router, shared web interface.
- Potential overlap: Hermes already handles Telegram, tools, cron, memory, and local execution.
- Better deployment target: future VPS from [[Hermes Remote VPS Migration Plan - Oracle Always Free]].

### Fincept Terminal

Jayse categorised as AI Quant, possible Antoine. Mostly correct.

- Best fit: AI Quant research dashboard, market data, portfolio/risk, finance analytics.
- Antoine fit: only if DEX/on-chain data connectors are usable or exported into Antoine ledgers.
- Caveat: README says public repo moved to monthly maintenance and team is focused on a private subscription edition. License is AGPL/commercial terms, so be cautious with client/product reuse.

### VoxCPM2

Not quant. Best fit is **personal/media/voice stack**.

- Useful for private local TTS, voice memos, content generation, and maybe Ari voice experiments.
- Harm risk: voice cloning can be misused. Use only with consent and clear labeling.
- Hardware caveat: Python >=3.10 and <3.13, PyTorch >=2.5, CUDA >=12 recommended. This Windows laptop has Python 3.11 available, but local GPU suitability still needs checking before install.

### Addy Osmani agent skills

Correct fit: **agent/dev workflow**, not trading-specific.

- Strongly useful for code quality: spec, plan, build, test, review, security, docs, context engineering.
- Potential downside: can slow tiny tasks because it enforces more process. Use for non-trivial builds, reviews, and client-facing work.

## What I did not do

- Did not run TradingAgents, LibreChat, Fincept, or VoxCPM install scripts.
- Did not download large model weights.
- Did not connect broker/exchange APIs.
- Did not enter API keys or secrets.
- Did not enable live trading or wallet actions.

## Recommended next actions

1. **TradingAgents:** create an isolated Python 3.12 env and run a paper-only report on a harmless symbol; save output to Quant Floor evidence.
2. **LibreChat:** defer until VPS decision; evaluate as a remote personal AI UI, not laptop-first.
3. **Fincept:** download official Windows release only after checksum/release review; use for research dashboarding, not broker connections.
4. **VoxCPM2:** check GPU/CUDA first; if insufficient, use hosted demo or VPS/GPU option rather than forcing local install.
5. **Addy skills:** use immediately in Claude/Hermes/Codex for coding workflow quality gates.

## Related

- [[AI Quant Trading Floor]]
- [[Antoine On-Chain Alpha Dashboard]]
- [[Hermes Remote VPS Migration Plan - Oracle Always Free]]
- [[Ari Context Guard and Handoff Workflow]]
