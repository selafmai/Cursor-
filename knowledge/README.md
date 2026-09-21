# knowledge/

**Part 2 — Knowledge, kept honest.**

This folder is the facts we work from. Honesty is the feature: doubt has a file, being wrong has a file, and the index is how the agent finds the right page fast.

| File | Job |
|------|-----|
| [INDEX.md](./INDEX.md) | Catalog. Read this before searching the tree. |
| [_provisional.md](./_provisional.md) | Not sure yet. |
| [_graveyard.md](./_graveyard.md) | Turned out to be wrong. |
| `*.md` (other) | One topic per file. Stable names. |

## Rules

- One topic per file. New fact about Slush → `slush.md`, not a new overlapping page.
- Update INDEX in the same commit as the fact.
- Product requirements stay in `docs/`. Point at them from INDEX; do not fork a second PRD.
- Titles are nouns. Dates and “notes from Tuesday” belong in `inbox/` or `logs/`.

## New topic

`knowledge/<kebab-topic>.md` with a one-line summary at the top, then facts as bullets or short sections. Link DECISIONS when a fact exists *because* we chose.
