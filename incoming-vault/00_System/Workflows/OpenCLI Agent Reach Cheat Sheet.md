---
title: OpenCLI Agent Reach Cheat Sheet
created: 2026-07-03
updated: 2026-07-03
type: workflow
tags: [opencli, agent-reach, chrome, devtools, browser-bridge, hermes]
sources: []
confidence: high
---

# OpenCLI Agent Reach Cheat Sheet

Quick reference for the local OpenCLI + Agent Reach + Chrome Browser Bridge setup.

## Current working pieces

| Component | Purpose | Check command |
|---|---|---|
| Agent Reach | Routes internet/social/platform research to the right backend | `agent-reach doctor --json` |
| OpenCLI | CLI/browser bridge for logged-in browser automation | `opencli doctor` |
| Chrome Browser Bridge extension | Connects Chrome profile to OpenCLI daemon | `opencli profile list` |
| DevTools Chrome profile | Separate Chrome profile with CDP enabled | `curl http://127.0.0.1:9222/json/version` |
| cua-driver / Computer Use | Desktop UI automation driver | `hermes computer-use doctor` |

## Important paths

```text
C:\Users\Kidsg\.chrome-devtools-profile
C:\Users\Kidsg\.opencli-chrome-profile
C:\Users\Kidsg\Downloads\opencli-extension\v1.0.20
```

Primary active DevTools profile:

```text
C:\Users\Kidsg\.chrome-devtools-profile
```

## OpenCLI health checks

```bash
opencli doctor
opencli profile list
```

If multiple profiles are connected or the default is stale:

```bash
opencli profile use <profile-id>
```

Example from the successful setup session:

```bash
opencli profile use q3xhkfu6
```

Expected healthy output:

```text
[OK] Daemon: running on port 19825
[OK] Extension: connected
[OK] Connectivity: connected
Everything looks good!
```

## Agent Reach health check

```bash
agent-reach doctor --json
```

Useful quick summary command on Windows/Git Bash:

```bash
OUT="$HOME/AppData/Local/Temp/agent-reach-doctor.json"
agent-reach doctor --json > "$OUT"
python - <<'PY'
import json, pathlib
p = pathlib.Path.home() / 'AppData/Local/Temp/agent-reach-doctor.json'
data = json.loads(p.read_text())
for name, info in data.items():
    print(f"{name}: {info.get('status')} via {info.get('active_backend')}")
PY
```

## Chrome DevTools / CDP

DevTools endpoint:

```text
http://127.0.0.1:9222/json/version
```

Verify:

```bash
curl http://127.0.0.1:9222/json/version
```

Launch dedicated DevTools Chrome profile:

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --user-data-dir=C:/Users/Kidsg/.chrome-devtools-profile \
  --remote-debugging-port=9222 \
  --remote-allow-origins=* \
  --no-first-run \
  --disable-first-run-ui \
  https://example.com
```

If Chrome ignores DevTools flags, close all Chrome windows/processes first, then relaunch with the dedicated profile above.

## OpenCLI direct usage examples

```bash
opencli twitter search "AI agents" -f yaml
opencli reddit search "Hermes agent" -f yaml
opencli xiaohongshu search "AI workflow" -f yaml
opencli instagram search "open source ai" -f yaml
opencli facebook search "AI automation" -f yaml
```

These commands use the connected Chrome Browser Bridge profile. If a platform requires login, log into that platform inside the connected Chrome profile first.

## Agent Reach / Hermes usage examples

Ask Hermes naturally, for example:

```text
Search X/Twitter for what people are saying about Hermes Agent.
```

```text
Check Reddit discussions about local AI agents.
```

```text
Research this topic across web, X, Reddit, and YouTube.
```

Hermes should use [[agent-reach]] and OpenCLI where appropriate.

## Known working channels after setup

| Channel | Backend | Status |
|---|---|---|
| Twitter/X | OpenCLI | Working |
| Reddit | OpenCLI | Working |
| Facebook | OpenCLI | Working |
| Instagram | OpenCLI | Working |
| Xiaohongshu | OpenCLI | Working |
| GitHub | gh CLI | Working |
| YouTube | yt-dlp | Working |
| Bilibili | bili-cli | Working |
| LinkedIn | LinkedIn scraper MCP | Working |
| V2EX | Public API | Working |
| RSS/Atom | feedparser | Working |
| Web pages | Jina Reader | Working |
| Exa search | mcporter / Exa | Working |

## Still needs extra setup

| Channel | Needs |
|---|---|
| Xiaoyuzhou podcast transcription | Groq API key |
| Xueqiu | Logged-in Xueqiu browser cookie/session |

## Troubleshooting

### OpenCLI extension not connected

```bash
opencli doctor
opencli daemon restart
opencli profile list
```

If multiple profiles are connected:

```bash
opencli profile use <profile-id>
```

### DevTools endpoint not responding

1. Close Chrome windows/processes.
2. Relaunch the dedicated profile with `--remote-debugging-port=9222`.
3. Verify:

```bash
curl http://127.0.0.1:9222/json/version
```

### Login-dependent platforms fail

Open the relevant site inside the connected Chrome profile and log in manually. Do not paste passwords or 2FA codes into chat.

## Related notes

- [[agent-reach]]
- [[AI Second Brain Dashboard]]
- [[Skill Improvement Workflow]]
