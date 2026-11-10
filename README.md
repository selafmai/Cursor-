# Cursor Cloud Agents

**Status:** Workfit assessment app lives in [`app/`](./app/). Documentation harness remains in `docs/`.

## Workfit (run this)

Assessment-as-ideation for incumbent enterprises. Maps a job to the July 2026 Future of Work Hype Cycle and scores it on the Evaluating AI Opportunities matrix.

```bash
cd app
npm install
npm run dev
```

Open http://127.0.0.1:5173

Make a **documentation-first AI workspace** for builders and the agents that implement for them, so they ship the right system without silent scope invention, by keeping PRD + scope + tech spec + orchestration as an **executable harness**.

## Start here

Read **[docs/README.md](./docs/README.md)** in order (playbook → PRD → scope → tech spec → orchestration).

## Harness session (copy/paste)

```markdown
Follow pinned context. Vibe mode ON.

Goal: Implement WU-00x from @docs/TECH-SPEC.md
Non-negotiables: do not expand scope; run the WU Verify; stop.
If you hit [DRAFT — resolve], record an assumption; do not invent a locked decision.
```

Pin: `@docs/PRD.md` `@docs/SCOPE.md` `@docs/TECH-SPEC.md` `@docs/ORCHESTRATION.md`

## What this repo is (now)

- Product intent, boundaries, and a step-by-step implementation spec
- Orchestration architecture you can stand up from an empty git repo
- Open questions numbered in `docs/PRD.md` (do not treat them as locked)

## What this repo is not (yet)

Application UI, auth, billing, and production infrastructure are **out of scope**. See `docs/SCOPE.md`.
