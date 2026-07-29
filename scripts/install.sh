#!/usr/bin/env bash
# Set up the LLM Wiki vault structure. Safe to re-run: it only creates what's
# missing and never overwrites an existing file.
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p sources \
         wiki/{inbox,journal,literature,concepts,entities,procedures,questions,maps} \
         wiki/_templates \
         tools/galaxy \
         docs

# Git does not track empty directories.
for d in sources wiki/inbox wiki/journal wiki/literature wiki/concepts \
         wiki/entities wiki/procedures wiki/questions wiki/maps; do
  [ -f "$d/.gitkeep" ] || touch "$d/.gitkeep"
done

if [ ! -f wiki/index.md ]; then
  cat > wiki/index.md <<'EOF'
---
title: index
type: map
tier: semantic
status: active
confidence: 0.5
created: 1970-01-01
updated: 1970-01-01
reviewed: 1970-01-01
tags: [meta/vault]
aliases: [Home]
---

# Vault Index

No sources have been ingested yet.

Add raw material to `sources/`, then tell your agent:

    Read SCHEMA.md and AGENTS.md. Ingest all files in sources/ and update wiki/.
EOF
  # stamp today's date without depending on GNU vs BSD sed differences
  today="$(date +%Y-%m-%d)"
  tmp="$(mktemp)"
  sed "s/1970-01-01/$today/g" wiki/index.md > "$tmp" && mv "$tmp" wiki/index.md
  echo "  created wiki/index.md"
fi

missing=0
for f in SCHEMA.md AGENTS.md; do
  if [ ! -f "$f" ]; then
    echo "  WARNING: $f is missing — the agent has no rules to follow."
    missing=1
  fi
done

python_bin=""
for c in python3 python; do
  if command -v "$c" >/dev/null 2>&1; then python_bin="$c"; break; fi
done

echo
echo "LLM Wiki vault is ready."
echo
echo "  1. Open this folder as an Obsidian vault (.obsidian/ is already configured)"
echo "  2. Put raw material in sources/"
echo "  3. Tell your agent:"
echo "       Read SCHEMA.md and AGENTS.md. Ingest all files in sources/ and update wiki/."
echo

if [ -n "$python_bin" ]; then
  echo "  Tools ($python_bin, no dependencies):"
  echo "    $python_bin tools/lint_vault.py            # health check"
  echo "    $python_bin tools/suggest_links.py         # connections you've missed"
  echo "    $python_bin tools/build_graph.py --open    # 3D galaxy view"
  echo "    $python_bin tools/migrate_vault.py --from ~/YourVault   # import an existing vault"
else
  echo "  Note: no python3 found. The vault works fine without it, but the linter,"
  echo "  connection finder and galaxy view all need Python 3.9+."
fi
echo

exit $missing
