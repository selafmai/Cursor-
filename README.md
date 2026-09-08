# Cursor Cloud Agents

**Status:** 🟡 DRAFT — documentation pack plus **Slush**, a tech spec writing tool.

Make a **documentation-first AI workspace** for builders and the agents that implement for them, so they ship the right system without silent scope invention, by keeping PRD + scope + tech spec + orchestration as an **executable harness**.

## Live

The writing tool is published at:

https://slush.here.now/

## Start here (docs)

Read **[docs/README.md](./docs/README.md)** in order (playbook → PRD → scope → tech spec → orchestration).

## Writing tool (`site/`)

Static SPA: guided DRAFT writer, must-have completeness, work units with Verify, markdown export. Open `site/index.html` locally or serve `site/`.

```bash
python3 -m http.server 8787 --directory site
```

## Harness session (copy/paste)

```markdown
Follow pinned context. Vibe mode ON.

Goal: Implement WU-00x from @docs/TECH-SPEC.md
Non-negotiables: do not expand scope; run the WU Verify; stop.
If you hit [DRAFT — resolve], record an assumption; do not invent a locked decision.
```

Pin: `@docs/PRD.md` `@docs/SCOPE.md` `@docs/TECH-SPEC.md` `@docs/ORCHESTRATION.md`
