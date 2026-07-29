---
title: Hermes Remote VPS Migration Plan - Oracle Always Free
created: 2026-07-08
updated: 2026-07-08
type: project
status: proposed
priority: high
tags: [hermes, oracle-cloud, vps, uptime, backup, disaster-recovery]
sources:
  - 03_Sources/youtube/Oracle Cloud Free VPS - YouTube TAZfDdQha3U.md
confidence: medium
---

# Hermes Remote VPS Migration Plan - Oracle Always Free

## Goal

Make Ari/Hermes less fragile by moving the always-on pieces off Jayse's laptop and onto a remote VPS, while keeping local laptop capabilities for desktop/files that only exist locally.

## Why this matters

Laptop-only risk:

- laptop can be broken, stolen, off, asleep, or without internet;
- Telegram gateway/cron jobs depend on the local machine staying alive;
- local vault and configs are harder to recover if the laptop dies;
- long-running monitors are fragile.

Remote-host benefit:

- better uptime for Ari/Telegram;
- persistent cron/scheduled jobs;
- safer disaster recovery if paired with backups;
- laptop becomes a client/dev box rather than the single point of failure.

## Recommended architecture

```text
Telegram / user chat
        ↓
Remote VPS: Hermes gateway + cron + session DB + skills + lightweight scripts
        ↓ sync / backup
Obsidian vault remote copy + encrypted backups
        ↕
Laptop: rich local files, desktop control, OneDrive/Obsidian, dev projects
```

## Candidate host

Oracle Cloud Always Free ARM/Ampere instance from [[Oracle Cloud Free VPS - YouTube TAZfDdQha3U]].

Suggested split if capacity allows:

- **Production Ari host:** 2 OCPU / 12 GB RAM / 100 GB disk.
- **Sandbox/test host:** 2 OCPU / 12 GB RAM / 100 GB disk.

If only one instance is available, start with one production-like host and keep sandbox local.

## Migration phases

### Phase 0 — Safety and backup first

- [ ] Export current Hermes config path with `hermes config path`.
- [ ] Inventory active cron jobs with `hermes cron list`.
- [ ] Back up `~/.hermes/` excluding secrets unless encrypted.
- [ ] Back up AI Second Brain vault.
- [ ] Decide secret handling: never paste secrets into chat; use VPS env files or secret manager.

### Phase 1 — VPS account and base server

Human-only / approval-required steps:

- [ ] Create Oracle account with real details and 2FA.
- [ ] Choose region with multiple availability domains where possible.
- [ ] Create VCN with internet connectivity.
- [ ] Create Ubuntu ARM instance.
- [ ] Save SSH private key securely and back it up.
- [ ] Configure firewall: start with SSH only; open other ports only when needed.

### Phase 2 — Install Hermes on VPS

On server:

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
hermes doctor
hermes setup
```

Then configure provider/auth, gateway, Telegram, cron, and tools. Secrets must be entered manually by Jayse or stored in a local secret manager, not saved in notes.

### Phase 3 — Vault sync / source of truth

Options to evaluate:

| Option | Pros | Risks |
|---|---|---|
| Git private repo | versioned, clean recovery | secrets must be excluded; conflict handling |
| Syncthing laptop ↔ VPS | similar to current phone/laptop sync | always-on sync needs firewall/Tailscale planning |
| Restic/rclone backup | strong disaster recovery | not real-time editing |
| OneDrive on VPS | familiar | Linux support can be awkward/unofficial |

Recommended first pass: **private Git or restic encrypted backups**, then consider Syncthing/Tailscale once stable.

### Phase 4 — Move always-on jobs

Move only jobs that do not require laptop-only files or desktop control:

- Telegram gateway;
- scheduled summaries;
- public-data scanners;
- paper-only quant monitors;
- vault dashboard refreshes if the vault copy exists on the VPS.

Keep laptop-only:

- Windows desktop computer-use;
- OneDrive-local paths until synced;
- local browser/X sessions;
- project repos that have not been migrated.

### Phase 5 — Disaster-recovery test

- [ ] Stop laptop gateway.
- [ ] Confirm Telegram still reaches Ari on VPS.
- [ ] Run `hermes cron list` on VPS.
- [ ] Trigger a harmless cron/test message.
- [ ] Restore a backup to a temp folder.
- [ ] Document recovery steps in the vault.

## Security guardrails

- Do not expose Coolify/Hermes dashboards publicly without auth + TLS + firewall allowlist/Tailscale.
- Do not store API keys in Obsidian notes.
- Do not open database ports to the public internet.
- Use SSH keys, disable password SSH if possible.
- Keep OS updated.
- Use budget alerts/limits if upgrading Oracle to pay-as-you-go.

## Decision

**Proceed as a staged evaluation, not an immediate migration.** The opportunity is strong because it reduces laptop single-point-of-failure risk, but account setup, billing, and public server security require careful manual approval.
