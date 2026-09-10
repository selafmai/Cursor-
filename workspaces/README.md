# workspaces/

**Part 4 — Room for unfinished work.**

Each person’s drafts. Messy is allowed. Shipping still goes through `docs/`, `site/`, or `knowledge/` — this folder is not a second source of truth.

## Layout

```text
workspaces/
  README.md
  _template/     ← copy this
  <handle>/      ← e.g. ales/, alex/, agent-riley/
    README.md
    scratch.md
```

```bash
cp -R workspaces/_template workspaces/<handle>
```

## Rules

- Put your name (or handle) on the folder. Do not dump personal drafts in `inbox/` if you will keep editing them for days.
- Agents may read workspaces for context. They may not treat scratch as Locked fact.
- Promote into `docs/` or `knowledge/` when a draft hardens. Do not let a workspace file quietly become the PRD.
