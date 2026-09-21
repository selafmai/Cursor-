# hooks/

**Part 5 — overnight automation.** These are *job definitions*, not Git’s `.git/hooks`.

Until a machine runs them, they are still the contract: what “overnight” means.

| Job | When | Command |
|-----|------|---------|
| [daily.md](./daily.md) | Once per day (UTC morning is fine) | `./scripts/overnight.sh` |

## Enable on a machine (optional)

```cron
15 6 * * * cd /path/to/Cursor- && ./scripts/overnight.sh >> logs/overnight.out 2>&1
```

Do not commit `logs/overnight.out`. The useful output is a human reading the report and then promoting inbox, not a firehose in git.

## Git hooks (out of band)

If you want a local `pre-commit` reminder, keep it in `.githooks/` on your machine. Do not surprise clones with a required daemon. This folder stays the **company** overnight loop.
