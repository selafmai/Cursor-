# Cursor Cloud Agents — Documentation Pack (DRAFT)

**Status:** 🟡 DRAFT scaffold  
**Audience:** humans (PM / eng / design) and AI agents implementing via a vibe-coding harness  
**Last updated:** 2026-09-08  
**Canonical location:** `docs/`

This pack is the **source of truth** for what we are building, what we are not building, how the system is orchestrated, and how an agent should implement work **one verified slice at a time**.

Company memory (inbox, knowledge, decisions, logs) lives beside this pack — see [COMPANY.md](../COMPANY.md) and [CLAUDE.md](../CLAUDE.md). Do not copy the PRD into `knowledge/`.

---

## How to read this pack

Read in this order. Do not skip.

| Step | File | Job |
|------|------|-----|
| 0 | [PLAYBOOK.md](./PLAYBOOK.md) | What a DRAFT must contain, topics to cover, documentation craft, and the anatomy of a tech spec that can drive a harness |
| 1 | [PRD.md](./PRD.md) | Why it exists, who it is for, what success looks like |
| 2 | [SCOPE.md](./SCOPE.md) | Boundaries: in / out / later; phase gates |
| 3 | [TECH-SPEC.md](./TECH-SPEC.md) | How it is built: architecture, interfaces, work units, verification |
| 4 | [ORCHESTRATION.md](./ORCHESTRATION.md) | How the agent/runtime is assembled from scratch |

If two documents disagree, **PRD wins on intent**, **SCOPE wins on boundaries**, **TECH-SPEC wins on implementation**, and a new decision must be recorded in `SCOPE.md` § Decision log.

---

## How an agent should use this pack (harness)

1. Pin these files as context: `@docs/PRD.md` `@docs/SCOPE.md` `@docs/TECH-SPEC.md` `@docs/ORCHESTRATION.md`
2. Implement **one work unit** from `TECH-SPEC.md` at a time.
3. Stop at the work unit’s **Verify** command. Do not start the next unit until it passes.
4. If a requirement is marked `[DRAFT — resolve]`, do not invent a silent default. Record the assumption in the work unit notes and in `PRD.md` § Open Questions.

---

## Document roles (do not duplicate)

| Document | Owns | Does not own |
|----------|------|--------------|
| PLAYBOOK | Craft, anatomy, required sections | Product decisions |
| PRD | Problem, users, value, stories, NFRs-as-goals | File layout, APIs, work units |
| SCOPE | In/out, phases, decisions | How to implement |
| TECH-SPEC | Architecture, contracts, work units, verification | Market positioning |
| ORCHESTRATION | Runtime, context loop, rules, HITL, bootstrap sequence | Feature backlog |

---

## Status legend used in this pack

| Marker | Meaning |
|--------|---------|
| ✅ Locked | Decided enough to implement against |
| 🟡 DRAFT | Directionally true; expect edits |
| ⬜ Placeholder | Must be filled before that work unit starts |
| `[DRAFT — resolve]` | Open question; do not silently invent |
| `[assumption]` | Working assumption; challenge if evidence contradicts |

---

## What “done” looks like for this documentation milestone

- [x] Playbook: must-have DRAFT content, topic list, spec anatomy, documentation practices
- [x] PRD DRAFT with stories, flows, NFRs, open questions
- [x] Scope DRAFT with in/out, phases, decision log
- [x] Tech spec DRAFT written as a step-by-step harness
- [x] Orchestration architecture from a blank repo
- [ ] Product-specific answers filled for every `[DRAFT — resolve]`
- [ ] Rules under `.cursor/rules/` generated from locked decisions
- [ ] First vertical-slice work unit implemented against this spec
