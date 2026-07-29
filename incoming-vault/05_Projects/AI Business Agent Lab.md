---
tags:
  - project/ai-business-agent
  - hermes
  - nemoclaw
  - stripe
  - glm
status: active-scaffold
created: 2026-07-04
---

# AI Business Agent Lab

## Purpose

Build a **safe, sandboxed business-agent lab** from the Wes/NVIDIA/Stripe video recommendations.

This lab is **not** an autonomous spending system yet. It is a controlled path for:

- running Hermes inside a NemoClaw/OpenShell-style sandbox,
- routing cheap/common work to GLM/OpenRouter where useful,
- using Stripe Projects for dev-only infrastructure provisioning later,
- keeping every payment / credential / production action behind explicit user approval.

## Current local status verified 2026-07-04

- Hermes Agent: installed, `v0.18.0`.
- Current active model/provider: `gpt-5.5` via `openai-codex`.
- Nous Portal: logged in.
- Telegram gateway: running.
- Docker: installed.
- NVIDIA GPU: RTX 3060 Laptop, 6GB VRAM.
- OpenRouter API key: **not set**.
- Z.AI / GLM API key: **not set**.
- NVIDIA NIM API key: **not set**.

## Architecture target

```text
Hermes Agent
  ├─ Main high-judgment model: current Codex/GPT-class provider
  ├─ Cheap workhorse model: GLM 5.2 via OpenRouter or Z.AI
  ├─ Runtime safety: NVIDIA NemoClaw / OpenShell sandbox
  └─ Controlled provisioning: Stripe Projects, dev-only, spend-capped
```

## Safety policy

1. No API keys, payment credentials, card details, or tokens stored in notes.
2. No live purchases without Jayse's explicit approval for the exact spend.
3. Stripe Projects starts in **development environment only**.
4. Any generated `.env` must be gitignored before credentials are written.
5. No trading/live-money actions in this lab.
6. NemoClaw/Stripe setup may require local/VPS install commands and must be approved before execution.

## Stage 1 — NemoClaw sandbox

Goal: create a separate Hermes sandbox with network/policy controls.

Official Hermes/NemoClaw command from NVIDIA docs:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=hermes bash
```

Preferred deployment choices:

| Choice | Recommendation |
|---|---|
| Machine | Linux VPS / NVIDIA Brev first; Windows laptop only as experiment |
| Provider | NVIDIA Endpoints or Hermes Provider |
| Policy tier | Balanced |
| Sandbox name | `jayse-business-agent` |
| Dashboard | Local/private only, not exposed publicly |

## Stage 2 — GLM 5.2 via OpenRouter

Yes, GLM 5.2 can be connected via OpenRouter. Current machine does **not** have `OPENROUTER_API_KEY` set, so OpenRouter was likely discussed during setup but not actually connected, or it was superseded by Nous Portal/OpenAI Codex.

Recommended model route:

```text
z-ai/glm-5.2 via OpenRouter
```

Use GLM 5.2 for:

- Obsidian note cleanup,
- first-pass coding,
- summaries,
- dashboard/report drafts,
- common front-end tasks,
- cheap batch research transforms.

Keep current stronger provider for:

- orchestration,
- payments,
- security-sensitive operations,
- complex quant logic,
- ambiguous debugging.

## Stage 3 — Stripe Projects, not random shopping

Use Stripe Projects first, not Stripe Link web-shopping.

Target safe first use cases:

- dev database provisioning,
- staging-only web app infrastructure,
- low-spend sandbox services.

Avoid initially:

- random merchant purchases,
- unattended top-ups,
- production services,
- anything that writes payment credentials into agent context.

## Approval gates

Before proceeding beyond this scaffold, Jayse must choose/provide locally:

- OpenRouter key if GLM via OpenRouter is desired.
- NVIDIA endpoint key if using NemoClaw with NVIDIA endpoints.
- Deployment target: local Windows/WSL/Docker, Linux VPS, or NVIDIA Brev.
- Stripe account/Projects setup only when ready for dev provisioning.

## Related notes

- [[AI Quant Trading Floor]]
