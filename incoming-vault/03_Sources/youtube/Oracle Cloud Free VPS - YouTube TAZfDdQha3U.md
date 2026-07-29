---
title: Oracle Cloud Free VPS - YouTube TAZfDdQha3U
created: 2026-07-08
updated: 2026-07-08
type: source-summary
tags: [youtube, cloud, vps, oracle-cloud, hermes, uptime, infrastructure]
sources:
  - 02_Raw/youtube/transcripts/TAZfDdQha3U.md
source_url: https://youtu.be/TAZfDdQha3U
video_id: TAZfDdQha3U
confidence: medium
---

# Oracle Cloud Free VPS - YouTube TAZfDdQha3U

## Fit

**Strong infrastructure opportunity, with account/billing/security caveats.** The video explains how to get an Oracle Cloud Always Free VPS with enough capacity to host self-managed services. For Jayse, the useful angle is not random self-hosting: it is a potential **Ari/Hermes continuity host** so the agent is less dependent on the laptop being online, undamaged, and unstolen.

## Claimed free-tier specs

- Up to **4 CPUs**, **24 GB RAM**, **200 GB storage**, and **10 TB network bandwidth** on Oracle Cloud Always Free.
- Prefer **ARM / Ampere** for much better free-tier capacity than AMD/x86.
- Possible allocation patterns:
  - one large server;
  - four smaller servers;
  - two medium servers, e.g. production + sandbox.

## Setup sequence from the video

1. Create Oracle Cloud account with real details, no VPN/temp email, and real card.
2. Choose a home region carefully; prefer a region with multiple availability domains to reduce capacity issues.
3. Create a VCN with internet connectivity before creating the instance.
4. Create an Ubuntu ARM/Ampere instance.
5. Allocate CPU/RAM/storage, e.g. 2 CPUs + 12 GB RAM + 100 GB boot volume for a production/sandbox split.
6. Download private and public SSH keys and back them up securely.
7. Connect with SSH or an SSH manager like Xpipe.
8. Update packages and enable `ufw` firewall.
9. Open only needed ports in both server firewall and Oracle VCN security rules.
10. Optionally install Coolify or Dokploy to manage self-hosted apps.

## Important caveats

- Oracle account creation can be finicky; fake details/VPN/temp email increase ban/failure risk.
- Free-tier capacity can be unavailable. The creator suggests retrying allocation or upgrading to pay-as-you-go.
- Pay-as-you-go can reduce capacity headaches, but requires billing controls. The video recommends a tiny budget alert/limit, but this still needs human review.
- Oracle can reclaim idle free compute, so persistent services/monitoring matter.
- Publicly exposed admin panels like Coolify need strict firewalling, TLS, strong passwords, and preferably IP allowlists/VPN/Tailscale.

## Jayse-specific opportunity

Use this as a **remote Ari host candidate**:

- run Hermes gateway + Telegram on a VPS instead of relying only on the laptop;
- keep scheduled jobs/cron alive when the laptop is off or broken;
- sync the Obsidian vault through Git/Syncthing/restic-style backups;
- make a disaster-recovery path if the laptop is stolen or damaged;
- use the laptop as local dev/desktop-control machine, not the only source of truth.

## Verdict

Worth evaluating, but not blindly moving everything. Best first step is a **non-live migration plan** and backup architecture. Account creation, card entry, region selection, and opening public ports require Jayse's direct approval and manual action.

## Related

- [[Hermes Remote VPS Migration Plan - Oracle Always Free]]
- [[Ari Context Guard and Handoff Workflow]]
- [[AI Second Brain Dashboard]]
- [[Android Obsidian Sync via Syncthing]]
- [[Ari Verification and Handoff Operating Pattern]]
