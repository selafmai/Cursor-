# CLAUDE.md — how the agent behaves

This repository is a **company that gets smarter every day**. Git is the memory. Chat is not.

Read this file at the start of every session. Then read `knowledge/INDEX.md`. Do not skip either.

The product specs in `docs/` still win on product intent, boundaries, and implementation. This file wins on **how you treat company memory**.

---

## The loop

1. **Arrive** — `knowledge/INDEX.md`, `knowledge/_provisional.md`, last 3 days of `ACTIVITY.md`, `inbox/`.
2. **Do the work** — one goal; file facts as you go; do not keep truth only in the transcript.
3. **Leave the camp cleaner** — promote or graveyard what you learned; write `logs/YYYY-MM-DD-<slug>.md`; append `ACTIVITY.md`.

If you ship code without touching memory, the company got dumber. That is a failed session.

---

## Where things live

| Need | Place |
|------|--------|
| Half-formed, unsorted | `inbox/` |
| Call / meeting transcript | `calls/` |
| A fact we will work from | `knowledge/` (update `INDEX.md`) |
| Not sure yet | `knowledge/_provisional.md` |
| Was wrong | `knowledge/_graveyard.md` (never silent-delete) |
| A choice with reasoning | `DECISIONS.md` |
| Who did what | `ACTIVITY.md` |
| Session summary | `logs/` |
| Unfinished personal draft | `workspaces/<handle>/` |
| Product PRD / spec / harness | `docs/` |
| Repeated procedure | `skills/` |
| Overnight / batch job | `scripts/` + `hooks/` |

**One fact, one home.** If it is a product requirement, it belongs in `docs/`, with a one-line pointer from `knowledge/INDEX.md`. Do not copy the PRD into `knowledge/`.

---

## Hard rules

- Never commit secrets, API keys, or credentials. Placeholders only (`$TOKEN`).
- Never put raw PII, customer secrets, or private call recordings in git. Redact transcripts in `calls/`.
- Never delete a knowledge file because it was wrong. Move the claim to `_graveyard.md` and say what replaced it.
- Never lock a guess. If it is not a fact, it is `_provisional.md` or an inbox note.
- Never invent a decision. If you must assume, write it as provisional and point at a `DECISIONS.md` stub only after a human accepts it — or record `D-xxx` as **proposed**.
- Implement only the requested change. Do not “also tidy” unrelated trees.
- Prefer links over duplication.

---

## Promotion path

```text
inbox/ or calls/  →  _provisional.md  →  knowledge/<topic>.md + INDEX.md
                                      ↘  _graveyard.md   (if false)
                                      ↘  DECISIONS.md    (if it was a choice)
```

Promote when: a second source agrees, a human confirms, or a shipped artifact proves it.

---

## Session close (mandatory)

Use `skills/close-session/SKILL.md`. Minimum:

1. `logs/YYYY-MM-DD-<short-slug>.md` from the template
2. One `ACTIVITY.md` bullet
3. INDEX touched if knowledge changed

---

## Conflict rule (unchanged)

PRD wins on intent · SCOPE wins on boundaries · TECH-SPEC wins on implementation · `DECISIONS.md` wins on *why we chose*. Then patch the loser so they agree.
