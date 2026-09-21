#!/usr/bin/env bash
# Report knowledge topic files that are missing from INDEX.md (stdout).
# Does not rewrite INDEX — promotion is a human/agent edit.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
INDEX="$ROOT/knowledge/INDEX.md"
missing=0
while IFS= read -r f; do
  base="$(basename "$f")"
  case "$base" in
    INDEX.md|README.md|_provisional.md|_graveyard.md) continue ;;
  esac
  if ! grep -q "$base" "$INDEX"; then
    echo "MISSING_FROM_INDEX $base ($f)"
    missing=$((missing + 1))
  fi
done < <(find "$ROOT/knowledge" -maxdepth 1 -type f -name '*.md' | sort)
if [[ "$missing" -eq 0 ]]; then
  echo "INDEX_OK"
fi
exit 0
