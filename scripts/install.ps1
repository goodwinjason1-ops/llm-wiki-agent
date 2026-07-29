# Set up the LLM Wiki vault structure. Safe to re-run: it only creates what's
# missing and never overwrites an existing file.
$ErrorActionPreference = "Stop"

Set-Location (Join-Path $PSScriptRoot "..")

$dirs = @(
  "sources",
  "wiki/inbox", "wiki/journal", "wiki/literature", "wiki/concepts",
  "wiki/entities", "wiki/procedures", "wiki/questions", "wiki/maps",
  "wiki/_templates", "tools/galaxy", "docs"
)
foreach ($d in $dirs) { New-Item -ItemType Directory -Force -Path $d | Out-Null }

# Git does not track empty directories.
$keep = $dirs | Where-Object { $_ -ne "wiki/_templates" -and $_ -ne "tools/galaxy" -and $_ -ne "docs" }
foreach ($d in $keep) {
  $k = Join-Path $d ".gitkeep"
  if (!(Test-Path $k)) { New-Item -ItemType File -Force -Path $k | Out-Null }
}

if (!(Test-Path "wiki/index.md")) {
  $today = Get-Date -Format "yyyy-MM-dd"
  @"
---
title: index
type: map
tier: semantic
status: active
confidence: 0.5
created: $today
updated: $today
reviewed: $today
tags: [meta/vault]
aliases: [Home]
---

# Vault Index

No sources have been ingested yet.

Add raw material to ``sources/``, then tell your agent:

    Read SCHEMA.md and AGENTS.md. Ingest all files in sources/ and update wiki/.
"@ | Set-Content "wiki/index.md" -Encoding UTF8
  Write-Host "  created wiki/index.md"
}

$missing = 0
foreach ($f in @("SCHEMA.md", "AGENTS.md")) {
  if (!(Test-Path $f)) {
    Write-Host "  WARNING: $f is missing - the agent has no rules to follow." -ForegroundColor Yellow
    $missing = 1
  }
}

$py = $null
foreach ($c in @("python3", "python", "py")) {
  if (Get-Command $c -ErrorAction SilentlyContinue) { $py = $c; break }
}

Write-Host ""
Write-Host "LLM Wiki vault is ready."
Write-Host ""
Write-Host "  1. Open this folder as an Obsidian vault (.obsidian/ is already configured)"
Write-Host "  2. Put raw material in sources/"
Write-Host "  3. Tell your agent:"
Write-Host "       Read SCHEMA.md and AGENTS.md. Ingest all files in sources/ and update wiki/."
Write-Host ""

if ($py) {
  Write-Host "  Tools ($py, no dependencies):"
  Write-Host "    $py tools\lint_vault.py            # health check"
  Write-Host "    $py tools\suggest_links.py         # connections you've missed"
  Write-Host "    $py tools\build_graph.py --open    # 3D galaxy view"
  Write-Host "    $py tools\migrate_vault.py --from C:\Path\To\YourVault   # import an existing vault"
} else {
  Write-Host "  Note: no Python found. The vault works fine without it, but the linter,"
  Write-Host "  connection finder and galaxy view all need Python 3.9+."
}
Write-Host ""

exit $missing
