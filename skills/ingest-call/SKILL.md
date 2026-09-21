# Skill: ingest-call

## When to use

A new file appears in `calls/`, or the human pastes a transcript.

## Do

1. Confirm the file uses `calls/_template.md` headers. Redact PII if the paste still has it — ask before committing secrets.
2. Extract bullets that might be true. Each bullet goes to `knowledge/_provisional.md`, not straight into a topic file.
3. If the human marks a line **confirmed**, then `skills/file-knowledge`.
4. Link the call from ACTIVITY: `ingested calls/YYYY-MM-DD-….md`.
5. Do not invent attendees or quotes that are not in the transcript.

## Don’t

- Treat the transcript as the PRD.
- Commit raw customer recordings or unredacted PII.
