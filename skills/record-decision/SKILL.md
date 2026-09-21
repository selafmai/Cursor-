# Skill: record-decision

## When to use

Someone chose, and a later session will argue. Examples: stack, URL, layout, “we will not do X.”

## Do

1. Assign the next `D-xxx` (never reuse).
2. Append to `DECISIONS.md` with date, status (`proposed` or `accepted`), context, decision, why, consequences.
3. If it changes product boundary, also add a row to `docs/SCOPE.md` § Decision log and point at `D-xxx`.
4. If it creates an operational fact, update the topic file + INDEX.
5. ACTIVITY bullet.

## Don’t

- Record implementation trivia (“renamed a variable”).
- Mark **accepted** without a human when the choice is HITL (authz, secrets, destructive data, locking DRAFT). Use **proposed**.
