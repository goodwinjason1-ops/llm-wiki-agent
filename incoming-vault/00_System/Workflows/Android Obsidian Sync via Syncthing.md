---
title: Android Obsidian Sync via Syncthing
created: 2026-07-03
updated: 2026-07-03
type: workflow
tags: [obsidian, android, syncthing, mobile-sync]
---

# Android Obsidian Sync via Syncthing

## Current laptop setup

Syncthing is installed on the laptop and running locally.

| Item | Value |
|---|---|
| Laptop vault | `C:\Users\Kidsg\Documents\AI Second Brain` |
| Syncthing folder label | `AI Second Brain` |
| Syncthing folder ID | `ai-second-brain` |
| Syncthing web UI | `http://127.0.0.1:8384` |
| Laptop Device ID | `PVG6PAI-2E2Y7J6-2Z36ABP-N3KV332-UOQXSOC-PK4QKHV-BBTX2TC-G33D7QI` |

Syncthing is configured to start automatically when the laptop user logs in.

Desktop shortcut:

```text
C:\Users\Kidsg\OneDrive\Desktop\Syncthing Control Panel.lnk
```

## Android phone setup

1. Install **Syncthing-Fork** on Android.
2. On the laptop, open the Syncthing Control Panel shortcut or visit:

```text
http://127.0.0.1:8384
```

3. In the laptop Syncthing UI, choose **Actions → Show ID** to show the laptop QR code.
4. On Android Syncthing-Fork, add a device and scan the laptop QR code.
5. Accept the phone device on the laptop when prompted.
6. Share the folder `AI Second Brain` / `ai-second-brain` with the phone.
7. On Android, accept the shared folder and save it as a local folder such as:

```text
/storage/emulated/0/Documents/AI Second Brain
```

or:

```text
/storage/emulated/0/Obsidian/AI Second Brain
```

8. Wait until Syncthing says **Up to Date** on both devices.
9. Open Obsidian on Android and choose:

```text
On this device
```

10. Select the synced local folder:

```text
AI Second Brain
```

## Safety rule

Before editing the same note on both laptop and phone, wait for Syncthing to say **Up to Date** on both devices. This avoids conflict files.
