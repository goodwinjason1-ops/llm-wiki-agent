#!/usr/bin/env python3
"""Deterministic self-evolving vault loop for Jayse's AI Second Brain.

Runs read-only/low-risk maintenance steps, writes a report, and refreshes the Ari
handoff. It does not delete notes, rewrite raw sources, place trades, touch
wallets, or use secrets.
"""
from __future__ import annotations

import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

VAULT = Path('C:/Users/Kidsg/Documents/AI Second Brain')
SCRIPTS = VAULT / '00_System' / 'Scripts'
REPORTS = VAULT / '00_System' / 'Reports'
HANDOFF = VAULT / '00_System' / 'Handoffs' / 'Current Ari Handoff.md'
REPORTS.mkdir(parents=True, exist_ok=True)


def now_utc() -> str:
    return datetime.now(timezone.utc).isoformat(timespec='seconds')


def today() -> str:
    return datetime.now().strftime('%Y-%m-%d')


def run_step(name: str, command: list[str], timeout: int = 300, allow_nonzero: bool = False) -> dict:
    started = now_utc()
    try:
        proc = subprocess.run(
            command,
            cwd=str(VAULT),
            capture_output=True,
            text=True,
            timeout=timeout,
            encoding='utf-8',
            errors='replace',
        )
        ok = proc.returncode == 0 or allow_nonzero
        return {
            'name': name,
            'started_at': started,
            'finished_at': now_utc(),
            'command': command,
            'returncode': proc.returncode,
            'ok': ok,
            'stdout': proc.stdout[-8000:],
            'stderr': proc.stderr[-8000:],
        }
    except Exception as e:
        return {
            'name': name,
            'started_at': started,
            'finished_at': now_utc(),
            'command': command,
            'returncode': None,
            'ok': False,
            'stdout': '',
            'stderr': repr(e),
        }


def summarize_lint(stdout: str) -> dict:
    summary = {'broken_wikilinks': None, 'missing_frontmatter': None, 'large_pages': None}
    for line in stdout.splitlines():
        if line.startswith('Broken wikilinks:'):
            summary['broken_wikilinks'] = int(line.split(':',1)[1].strip())
        elif line.startswith('Missing frontmatter:'):
            summary['missing_frontmatter'] = int(line.split(':',1)[1].strip())
        elif line.startswith('Large pages >200 lines:'):
            summary['large_pages'] = int(line.split(':',1)[1].strip())
    return summary


def md_safe_excerpt(text: str) -> str:
    # vault_lint scans generated reports too; escape raw [[wikilinks]] inside
    # command-output code blocks so old broken links are not duplicated by reports.
    return (text or '').replace('[[', '[\u200b[').replace(']]', ']\u200b]')


# Lines that change on every run whether or not anything happened. Comparing
# reports without stripping these means every run looks like news.
VOLATILE_RE = __import__('re').compile(
    r'\d{4}-\d{2}-\d{2}T[\d:]+(?:\+00:00|Z)?|\d{4}-\d{2}-\d{2}|\d{8}T?\d{6}')


def stable(text: str) -> str:
    return VOLATILE_RE.sub('<ts>', text)


def unchanged_since_last(body: str, current: Path) -> Path | None:
    """The newest prior loop report whose substance matches, if any.

    This runner wrote a dated report unconditionally. The vault was quiet, so the
    substance never changed — and 21 identical notes appeared anyway, every one an
    orphan, each one nudging the vault's own health metrics in the wrong direction.
    A loop that reports 'nothing happened' 21 times is not observability, it is noise
    that trains you to stop reading the reports.
    """
    prior = sorted(p for p in REPORTS.glob('Vault Loop Report - *.md') if p != current)
    if not prior:
        return None
    try:
        return prior[-1] if stable(prior[-1].read_text(encoding='utf-8')) == stable(body) else None
    except OSError:
        return None


def write_markdown_report(payload: dict) -> Path:
    report = REPORTS / f'Vault Loop Report - {today()}.md'
    lines = []
    lines += ['---', f'title: Vault Loop Report - {today()}', f'created: {today()}', f'updated: {now_utc()}', 'type: report', 'status: generated', 'tags: [vault-loop, self-evolving, ari, obsidian]', '---', '']
    lines += [f'# Vault Loop Report - {today()}', '', '> Deterministic loop: inbox processor → connection illuminator → vault lint → handoff refresh. No deletion, no raw-source rewriting, no trading/DeFi live actions.', '']
    lines += ['## Summary', '', '| Step | Return code | OK |', '|---|---:|---|']
    for step in payload['steps']:
        lines.append(f"| {step['name']} | {step['returncode']} | {'yes' if step['ok'] else 'no'} |")
    lines.append('')
    lint = payload.get('lint_summary') or {}
    lines += ['## Vault health', '', f"- Broken wikilinks: `{lint.get('broken_wikilinks')}`", f"- Missing frontmatter: `{lint.get('missing_frontmatter')}`", f"- Large pages: `{lint.get('large_pages')}`", '']
    lines += ['## Step output excerpts', '']
    for step in payload['steps']:
        lines += [f"### {step['name']}", '', '```text', md_safe_excerpt((step.get('stdout') or step.get('stderr') or '').strip()[-3000:] or '(no output)'), '```', '']
    lines += ['## Next actions', '', '- Review connection suggestions before applying any auto-links.', '- Process any Inbox items with enough context.', '- Keep raw sources immutable; improve source summaries/workflows instead.', '- Keep trading/DeFi workflows read-only/backtest/paper unless Jayse explicitly approves live scope.', '']
    body = '\n'.join(lines)

    same = unchanged_since_last(body, report)
    if same is not None:
        print(f'  nothing changed since {same.stem} — report not written')
        return same

    report.write_text(body, encoding='utf-8')
    return report


def refresh_handoff(payload: dict, report: Path) -> None:
    HANDOFF.parent.mkdir(parents=True, exist_ok=True)
    existing = HANDOFF.read_text(encoding='utf-8') if HANDOFF.exists() else '# Current Ari Handoff\n'

    # The marker used to embed today's date, so it never matched yesterday's line
    # and the replace branch could only ever fire twice in one day. The file grew
    # by one line every morning and had reached 154. A handoff is a statement of
    # where things stand, not a diary — the marker is now date-free so the line is
    # genuinely replaced, and the date lives in the text where it belongs.
    marker = 'Vault self-evolving loop last ran'
    line = (f"- {marker} {today()}: report [[{report.stem}]], "
            f"lint {payload.get('lint_summary')}.")
    # Keep the first marker line, replace it, drop the rest. Nineteen had already
    # accumulated; rewriting them all to the same text would leave nineteen
    # identical lines instead of one true one.
    out, seen = [], False
    for l in existing.splitlines():
        if marker in l:
            if not seen:
                out.append(line)
                seen = True
            continue
        out.append(l)
    if not seen:
        out.append(line)
    HANDOFF.write_text('\n'.join(out).rstrip() + '\n', encoding='utf-8')


def main() -> None:
    steps = []
    steps.append(run_step('Inbox processor', [sys.executable, str(SCRIPTS / 'inbox_processor.py')], allow_nonzero=True))
    steps.append(run_step('Connection illuminator', [sys.executable, str(SCRIPTS / 'connection_illuminator.py')], allow_nonzero=True))
    lint = run_step('Vault lint', [sys.executable, str(SCRIPTS / 'vault_lint.py')], allow_nonzero=True)
    steps.append(lint)
    payload = {
        'generated_at': now_utc(),
        'steps': steps,
        'lint_summary': summarize_lint(lint.get('stdout') or ''),
    }
    latest = REPORTS / 'vault_loop_latest.json'
    latest.write_text(json.dumps(payload, indent=2), encoding='utf-8')
    report = write_markdown_report(payload)
    refresh_handoff(payload, report)
    failed = [s for s in steps if not s['ok']]
    print(f"Vault loop report: {report}")
    print(f"Lint: {payload['lint_summary']}")
    if failed:
        print('Failed steps: ' + ', '.join(s['name'] for s in failed))


if __name__ == '__main__':
    main()
