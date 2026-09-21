#!/usr/bin/env bash
# Copy logs/_template.md to logs/YYYY-MM-DD-<slug>.md
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
slug="${1:-session}"
slug="$(echo "$slug" | tr '[:upper:]' '[:lower:]' | tr -cs 'a-z0-9-' '-' )"
slug="${slug#-}"
slug="${slug%-}"
day="$(date -u +%Y-%m-%d)"
dest="$ROOT/logs/${day}-${slug}.md"
if [[ -e "$dest" ]]; then
  echo "exists: $dest" >&2
  exit 1
fi
sed "s/YYYY-MM-DD/${day}/g; s/<slug>/${slug}/g" "$ROOT/logs/_template.md" > "$dest"
echo "$dest"
