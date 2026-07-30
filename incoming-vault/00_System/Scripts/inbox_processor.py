#!/usr/bin/env python3
"""Dry-run-first Obsidian inbox processor for Jayse's AI Second Brain.

Scans markdown notes in 01_Inbox, extracts lightweight capture metadata, classifies
items, and writes a report. With --apply it appends a processing block to inbox
notes; it never deletes/moves files and never edits 02_Raw.
"""
from __future__ import annotations

import argparse
import json
import re
from datetime import datetime, timezone
from pathlib import Path

VAULT = Path(__file__).resolve().parents[2]
INBOX = VAULT / "01_Inbox"
REPORTS = VAULT / "00_System" / "Reports"

TYPE_KEYWORDS = {
    "youtube": ["youtube.com", "youtu.be", "youtube", "transcript"],
    "x": ["x.com", "twitter.com", "tweet", "thread", "social post"],
    "reddit": ["reddit.com", "subreddit", "reddit"],
    "web": ["http://", "https://", "article", "web link", "blog"],
    "doc": ["pdf", "document", "docx", "drive.google", "file path"],
    "biz": ["business", "customer", "client", "buyerproof", "business context brain", "offer", "sales"],
    "quant": ["trading", "quant", "market", "crypto", "defi", "bybit", "hyperliquid", "strategy", "backtest"],
    "idea": ["idea", "rough thought", "maybe", "concept"],
    "image": ["image", "screenshot", "png", "jpg", "jpeg", "webp"],
}

DESTINATIONS = {
    "youtube": ["02_Raw/youtube/", "03_Sources/youtube/"],
    "x": ["02_Raw/x/", "03_Sources/x/"],
    "reddit": ["02_Raw/reddit/", "03_Sources/reddit/"],
    "web": ["02_Raw/web/", "03_Sources/web/"],
    "doc": ["02_Raw/documents/", "03_Sources/documents/"],
    "biz": ["05_Projects/AI Business Launch Backlog/", "04_Wiki/"],
    "quant": ["05_Projects/AI Quant Trading Floor/", "04_Wiki/quant/"],
    "idea": ["04_Wiki/ideas/", "05_Projects/"],
    "image": ["02_Raw/images/", "03_Sources/images/"],
    "unknown": ["01_Inbox/"],
}

FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---\n", re.S)
URL_RE = re.compile(r"https?://[^\s)\]>\"]+")
FIELD_RE = re.compile(r"^(type|url|intent|apply|mode|priority|status)\s*:\s*(.+?)\s*$", re.I | re.M)


def now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


# Volatile lines: they differ on every run even when nothing about the inbox has
# changed. Ignoring them is what lets us tell "new information" from "ran again".
VOLATILE = ("- Generated:", "- JSON:", "created:", "updated:")


def stable(text: str) -> str:
    """The part of a report that carries information, with the clock removed."""
    return "\n".join(l for l in text.splitlines()
                     if not l.startswith(VOLATILE))


def unchanged_since_last(report_dir: Path, pattern: str, body: str) -> Path | None:
    """Return the newest prior report whose substance matches `body`, if any.

    Writing a dated file per run regardless of change is how this script produced
    21 byte-identical notes: the inbox had not changed in three weeks, so neither
    had the report, but a new file appeared each morning anyway. Those files then
    counted as orphans and dragged every graph measurement in the vault.
    """
    prior = sorted(report_dir.glob(pattern))
    if not prior:
        return None
    last = prior[-1]
    try:
        if stable(last.read_text(encoding="utf-8")) == stable(body):
            return last
    except OSError:
        return None
    return None


def parse_frontmatter(text: str) -> dict:
    m = FRONTMATTER_RE.search(text)
    data = {}
    if not m:
        return data
    for line in m.group(1).splitlines():
        if ":" not in line or line.lstrip().startswith("#"):
            continue
        k, v = line.split(":", 1)
        data[k.strip().lower()] = v.strip().strip('"').strip("'")
    return data


def parse_inline_fields(text: str) -> dict:
    return {m.group(1).lower(): m.group(2).strip() for m in FIELD_RE.finditer(text)}


def classify(text: str, meta: dict) -> tuple[str, list[str]]:
    explicit = str(meta.get("type") or "").lower().strip()
    if explicit and explicit not in {"inbox", "capture", "unprocessed"}:
        for k in TYPE_KEYWORDS:
            if k in explicit:
                return k, [f"explicit_type:{explicit}"]
    blob = " ".join([text.lower(), str(meta)]).lower()
    hits = []
    scores = {}
    for kind, kws in TYPE_KEYWORDS.items():
        score = sum(1 for kw in kws if kw in blob)
        if score:
            scores[kind] = score
            hits.extend([f"{kind}:{kw}" for kw in kws if kw in blob][:3])
    if not scores:
        return "unknown", []
    # Business/quant are intentional domains; prefer them over generic web when tied.
    ranked = sorted(scores.items(), key=lambda kv: (kv[1], kv[0] in {"biz", "quant"}), reverse=True)
    return ranked[0][0], hits


def note_title(path: Path, text: str) -> str:
    for line in text.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return path.stem


def process_file(path: Path) -> dict:
    text = path.read_text(encoding="utf-8", errors="ignore")
    fm = parse_frontmatter(text)
    inline = parse_inline_fields(text)
    meta = {**fm, **inline}
    urls = URL_RE.findall(text)
    kind, reasons = classify(text, meta)
    status = str(meta.get("status") or "").lower() or ("empty" if not text.strip() else "unprocessed")
    priority = meta.get("priority") or "medium"
    return {
        "path": str(path.relative_to(VAULT)).replace("\\", "/"),
        "title": note_title(path, text),
        "status": status,
        "type": meta.get("type") or kind,
        "classified_as": kind,
        "priority": priority,
        "url": meta.get("url") or (urls[0] if urls else ""),
        "intent": meta.get("intent") or "",
        "apply": meta.get("apply") or "",
        "mode": meta.get("mode") or "dry-run",
        "suggested_destinations": DESTINATIONS.get(kind, DESTINATIONS["unknown"]),
        "reasons": reasons,
        "line_count": len(text.splitlines()),
        "empty": not text.strip(),
        "has_processing_block": "<!-- inbox-processor" in text,
    }


def markdown_report(rows: list[dict], report_json: Path) -> str:
    counts = {}
    for r in rows:
        counts[r["classified_as"]] = counts.get(r["classified_as"], 0) + 1
    lines = [
        "---",
        "title: Inbox Processor Report",
        f"created: {now()[:10]}",
        f"updated: {now()[:10]}",
        "type: report",
        "tags: [inbox, capture, automation]",
        "confidence: medium",
        "---",
        "",
        "# Inbox Processor Report",
        "",
        "> Dry-run-first scan. This report does not move/delete source notes; `--apply` only appends a processing block.",
        "",
        f"- Generated: `{now()}`",
        f"- JSON: `{report_json.relative_to(VAULT).as_posix()}`",
        f"- Inbox notes scanned: **{len(rows)}**",
        f"- Type counts: `{json.dumps(counts, sort_keys=True)}`",
        "",
        "## Items",
        "",
        "| Note | Class | Priority | URL | Suggested destinations | Status |",
        "|---|---:|---:|---|---|---|",
    ]
    # Render in path order, not scan order. Notes are scanned newest-first so
    # --limit takes the most recent, but mtime is not information about the inbox:
    # a sync that touches files reshuffles the table and makes an unchanged report
    # look changed. Deterministic order is what makes "did anything happen?"
    # answerable.
    for r in sorted(rows, key=lambda r: r["path"]):
        url = r["url"] or ""
        url_cell = f"[link]({url})" if url.startswith("http") else url
        dest = "<br>".join(f"`{d}`" for d in r["suggested_destinations"])
        lines.append(f"| [[{Path(r['path']).stem}]] | {r['classified_as']} | {r['priority']} | {url_cell} | {dest} | {r['status']} |")
    lines.extend([
        "",
        "## Next actions",
        "",
        "- Process `youtube`/`x`/`web` captures with source-first ingest into `02_Raw/` then `03_Sources/`.",
        "- Route `quant` items through [[AI Quant Trading Floor Workflow]] and keep trading/DeFi paper-only.",
        "- Route `biz` items into [[Business Launch Asset Navigation Dashboard]] or client-intake workflows.",
    ])
    return "\n".join(lines) + "\n"


def apply_processing_block(row: dict) -> None:
    path = VAULT / row["path"]
    text = path.read_text(encoding="utf-8", errors="ignore")
    if row["has_processing_block"]:
        return
    block = (
        "\n\n<!-- inbox-processor: start -->\n"
        "## Ari Inbox Processor\n\n"
        f"- Processed at: `{now()}`\n"
        f"- Classification: `{row['classified_as']}`\n"
        f"- Suggested destinations: {', '.join('`' + d + '`' for d in row['suggested_destinations'])}\n"
        f"- Safety: source note preserved in `01_Inbox`; no deletion or move performed.\n"
        "<!-- inbox-processor: end -->\n"
    )
    path.write_text(text.rstrip() + block, encoding="utf-8")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true", help="Append processing blocks to inbox notes; default is dry-run report only.")
    ap.add_argument("--limit", type=int, default=0, help="Optional max notes to scan.")
    ap.add_argument("--force", action="store_true",
                    help="Write the report even if the inbox has not changed.")
    args = ap.parse_args()

    REPORTS.mkdir(parents=True, exist_ok=True)
    notes = sorted(INBOX.glob("*.md"), key=lambda p: p.stat().st_mtime, reverse=True)
    if args.limit:
        notes = notes[: args.limit]
    rows = [process_file(p) for p in notes]
    if args.apply:
        for r in rows:
            apply_processing_block(r)
    stamp = now().replace(":", "").replace("-", "")
    json_path = REPORTS / f"inbox_processor_{stamp}.json"
    md_path = REPORTS / f"Inbox Processor Report - {now()[:10]}.md"
    payload = {"ts": now(), "mode": "apply" if args.apply else "dry-run", "inbox": str(INBOX), "rows": rows}
    body = markdown_report(rows, json_path)

    same = None if args.force else unchanged_since_last(
        REPORTS, "Inbox Processor Report - *.md", body)
    if same is not None and same != md_path:
        print(json.dumps({
            "mode": payload["mode"], "notes": len(rows), "written": False,
            "reason": "inbox unchanged since " + same.stem.split(" - ")[-1],
            "existing": str(same),
        }, indent=2))
        return

    json_path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    md_path.write_text(body, encoding="utf-8")
    prune_json(REPORTS)
    print(json.dumps({"mode": payload["mode"], "notes": len(rows), "written": True, "json": str(json_path), "markdown": str(md_path), "counts": {k: sum(1 for r in rows if r['classified_as'] == k) for k in sorted(set(r['classified_as'] for r in rows))}}, indent=2))


def prune_json(report_dir: Path, keep: int = 10) -> None:
    """Keep the last `keep` run payloads. 32 had accumulated, none ever read."""
    runs = sorted(report_dir.glob("inbox_processor_*.json"))
    for old in runs[:-keep]:
        try:
            old.unlink()
        except OSError:
            pass


if __name__ == "__main__":
    main()
