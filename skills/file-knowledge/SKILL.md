# Skill: file-knowledge

## When to use

A claim is confirmed (second source, human, or shipped artifact) and is not already in `docs/` as a requirement.

## Do

1. Read INDEX. Prefer an existing topic file.
2. If new: `knowledge/<kebab>.md` with a one-line **Summary**, then facts. Add a row to INDEX.
3. Remove the matching `_provisional.md` row if any.
4. If the old claim was wrong, add `_graveyard.md` first.
5. ACTIVITY bullet. Link DECISIONS if the fact exists because of a choice.

## Don’t

- Duplicate PRD stories. Point at `docs/` from INDEX instead.
- Mix provisional language into a topic file (“maybe we will…”).
