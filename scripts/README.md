# scripts/

**Part 5 — overnight and batch helpers.** Local. No extra SaaS.

| Script | Job |
|--------|-----|
| [rebuild-index.sh](./rebuild-index.sh) | List `knowledge/*.md` topic files not yet in INDEX (does not rewrite prose) |
| [new-log.sh](./new-log.sh) | Copy the session log template |
| [overnight.sh](./overnight.sh) | Daily nag report (stale inbox, stale provisional, missing ACTIVITY today) |

```bash
./scripts/new-log.sh company-os
./scripts/rebuild-index.sh
./scripts/overnight.sh
```

Make executable: `chmod +x scripts/*.sh`. Hooks describe *when* to run these.
