---
title: Source-to-System Studio UTM Tracking Setup
created: 2026-07-18
type: implementation-contract
status: ready-for-launch
privacy: internal
tags: [marketing, utm, tracking, source-to-system, linkedin]
---

# Source-to-System Studio UTM Tracking Setup

## Purpose

Track where enquiries come from when sharing the website on LinkedIn and other channels. Every link shared externally uses UTM parameters so we can measure what works.

## UTM Convention

| Parameter | Value | Purpose |
|---|---|---|
| `utm_source` | `linkedin` | Platform name |
| `utm_medium` | `social` | Channel type |
| `utm_campaign` | `sst-launch-q3-2026` | Campaign name (change per campaign) |
| `utm_content` | `post-mon-scattered-knowledge` | Specific post identifier |
| `utm_term` | *(optional)* | Paid keyword (not used for organic) |

## Link Templates

### Homepage
```
https://source-to-system.studio/?utm_source=linkedin&utm_medium=social&utm_campaign=sst-launch-q3-2026&utm_content=post-mon-scattered-knowledge
```

### Offers page
```
https://source-to-system.studio/offers.html?utm_source=linkedin&utm_medium=social&utm_campaign=sst-launch-q3-2026&utm_content=post-wed-trade-businesses
```

### How it works
```
https://source-to-system.studio/how-it-works.html?utm_source=linkedin&utm_medium=social&utm_campaign=sst-launch-q3-2026&utm_content=post-fri-proof-before-promotion
```

### Contact page
```
https://source-to-system.studio/contact.html?utm_source=linkedin&utm_medium=social&utm_campaign=sst-launch-q3-2026&utm_content=post-cta-contact
```

## Post-to-UTM Mapping

| Day | Post Theme | utm_content |
|---|---|---|
| Mon | Scattered business knowledge | `post-mon-scattered-knowledge` |
| Wed | Trade and supply businesses | `post-wed-trade-businesses` |
| Fri | Proof before promotion | `post-fri-proof-before-promotion` |
| Mon W2 | What Business Context Brain looks like | `post-mon-bcb-demo` |
| Wed W2 | Quote intelligence vs manual | `post-wed-quote-intel` |
| Fri W2 | Development tracking example | `post-fri-tracking-example` |
| Mon W3 | Financial advisor pilot case study | `post-mon-fin-advisor-case` |
| Wed W3 | Wholesale business pilot case study | `post-wed-wholesale-case` |
| Fri W3 | Youth sports club pilot case study | `post-fri-sports-club-case` |
| Mon W4 | 3 things we learned from pilot 1 | `post-mon-learnings` |
| Wed W4 | Why mapping before building matters | `post-wed-mapping-first` |
| Fri W4 | What we're testing next | `post-fri-next-steps` |

## Implementation Checklist

- [ ] Domain purchased and pointed to hosting
- [ ] Google Analytics 4 (or equivalent) installed on site
- [ ] GA4 configured to recognise `utm_source`, `utm_medium`, `utm_campaign`
- [ ] UTM links tested in a new browser tab (verify they work and analytics fires)
- [ ] LinkedIn company page created
- [ ] First 3 posts drafted with UTM links inserted
- [ ] Link shortener decided (use raw UTM links — no shorteners, they strip params)

## Notes

- **Do NOT use URL shorteners** (bit.ly, etc.) — they often strip UTM parameters when LinkedIn's link preview parser rewrites URLs.
- **Raw UTM links are preferred** — ugly but reliable.
- Once the domain is live, replace `source-to-system.studio` with the actual URL.
- Track results weekly: which `utm_content` posts drive the most link clicks.
