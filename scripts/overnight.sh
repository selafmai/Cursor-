#!/usr/bin/env bash
# Daily nag: stale inbox, stale provisional kill-by, ACTIVITY for today.
# Prints a report. Exit 0 always (cron-friendly). Does not mutate files.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
today="$(date -u +%Y-%m-%d)"
echo "== overnight $today =="

echo "-- inbox older than 7 days --"
found_inbox=0
if compgen -G "$ROOT/inbox/*.md" > /dev/null; then
  while IFS= read -r f; do
    base="$(basename "$f")"
    [[ "$base" == "README.md" || "$base" == "_template.md" ]] && continue
    # filename date prefix YYYY-MM-DD
    d="${base:0:10}"
    if [[ "$d" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
      if [[ "$(date -u -d "$d" +%s 2>/dev/null || date -u -j -f %Y-%m-%d "$d" +%s)" -lt "$(date -u -d "$today -7 days" +%s 2>/dev/null || echo 0)" ]]; then
        echo "STALE_INBOX $base"
        found_inbox=1
      fi
    fi
  done < <(find "$ROOT/inbox" -maxdepth 1 -type f -name '*.md')
fi
[[ "$found_inbox" -eq 0 ]] && echo "(none)"

echo "-- provisional kill-by on or before today --"
# rows look like | P-001 | ... | 2026-10-10 |
awk -F'|' -v today="$today" '
  /^\| P-/ {
    killby=$6
    gsub(/^[ \t]+|[ \t]+$/, "", killby)
    if (killby ~ /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/ && killby <= today) {
      print "STALE_PROVISIONAL", $2, "kill-by", killby
    }
  }
' "$ROOT/knowledge/_provisional.md" || true

echo "-- ACTIVITY today --"
if grep -q "^## $today" "$ROOT/ACTIVITY.md"; then
  echo "ACTIVITY_HAS_TODAY"
else
  echo "ACTIVITY_MISSING_TODAY"
fi

echo "-- knowledge index --"
"$ROOT/scripts/rebuild-index.sh"
echo "== done =="
