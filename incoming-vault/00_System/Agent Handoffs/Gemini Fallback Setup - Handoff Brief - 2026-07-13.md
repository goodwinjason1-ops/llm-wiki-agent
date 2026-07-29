# Gemini Fallback — Handoff Brief

**Date:** 13 July 2026
**Task:** Set up Google Gemini as a fallback provider in Hermes Agent

## Current state

Gemini has been configured as the fallback provider in Hermes Agent (Windows, profile: `default`).

**Provider chain:**
| Priority | Provider | Model | Cost |
|---|---|---|---|
| Primary | `openai-codex` | `gpt-5.6-luna` | Subscription |
| Fallback 1 | `nous` | `deepseek-v4-pro` | Via Nous |
| Fallback 2 | `google` | `gemini-2.5-pro` | Free (AI Studio) |

## What's done

- [x] API key generated in Google AI Studio (project: Hermes, key ending `...ljVw`, created 2 July 2026, free tier)
- [x] `GOOGLE_API_KEY` added to `C:\Users\Kidsg\AppData\Local\hermes\.env`
- [x] `fallback_providers` set to `google/gemini-2.5-pro` in `config.yaml`
- [x] Key belongs to `goodwin.jason1@gmail.com` (PRO account)

## What still needs attention

- [ ] **Verify fallback fires correctly** — test by briefly pointing the primary provider to something invalid and confirming Gemini picks up
- [ ] **Billing** — currently on free tier. If rate limits become a problem, set up billing in [AI Studio](https://aistudio.google.com) to move the key to the paid tier
- [ ] **Model choice locked:** `gemini-2.5-pro` is the tertiary fallback by Jayse's explicit instruction. Do not change it to Flash unless Jayse explicitly asks.

## Key paths

| Resource | Path |
|---|---|
| Hermes config | `C:\Users\Kidsg\AppData\Local\hermes\config.yaml` |
| Hermes env | `C:\Users\Kidsg\AppData\Local\hermes\.env` |
| AI Studio keys | https://aistudio.google.com/apikey |

## How to verify

```bash
# Check current config
hermes config | grep -A2 fallback

# Test the provider
hermes chat -q "Hello, which model are you?" --provider google --model gemini-2.5-pro
```
