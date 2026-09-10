# Skill: close-session

## When to use

End of every agent or human working session. Mandatory. See `CLAUDE.md`.

## Do

1. Copy `logs/_template.md` to `logs/YYYY-MM-DD-<slug>.md`.
2. Fill goal, changed paths, memory movements, open loops.
3. Append one or more bullets to `ACTIVITY.md` (newest day on top).
4. If knowledge files changed, INDEX is current (`scripts/rebuild-index.sh` or a hand edit).
5. Leave no secrets in the log.

## Don’t

- Skip this because the diff was “only code.”
- Paste the entire chat into `logs/`.
