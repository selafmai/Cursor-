# Daily hook

**Intent:** The company gets a little smarter even when nobody opened a laptop — by nags, not by inventing facts.

## Run

```bash
./scripts/overnight.sh
```

## The script will

1. List `inbox/` files with a dated name older than 7 days.
2. List `_provisional.md` rows whose kill-by is today or past.
3. Warn if `ACTIVITY.md` has no heading for today.
4. Report knowledge topic files missing from INDEX.

## The script will not

- Promote or delete files
- Invent a session log
- Call external APIs
- Commit

A human or agent reads the report, then uses `skills/promote-inbox` and `skills/close-session`.
