# calls/

**Part 1 — Somewhere to drop things** (the automatic half).

Transcripts live here. Pull them in from the recorder, the meeting bot, or a paste. The agent does not invent a call that did not happen.

## File a transcript

1. Copy [`_template.md`](./_template.md) to `calls/YYYY-MM-DD-<slug>.md`.
2. Redact names, emails, account numbers, and anything that must not be in git. See `CLAUDE.md`.
3. Run `skills/ingest-call/SKILL.md`: extract **provisional** facts only, unless a human marks a line as confirmed.

## Naming

`YYYY-MM-DD-<who-or-topic>.md`

Optional audio stays out of git. Link to the Drive or here.now Drive path in the transcript header.

## Automatic pull

When a hook exists, it writes files into this folder and appends `ACTIVITY.md`. Until then, paste is the automation.
