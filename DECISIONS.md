# Decisions

**Part 3 — The paper trail (choices).**

Every choice that future-us will argue with. Numbered. Never reuse an ID. Product *boundary* rows also belong in `docs/SCOPE.md` § Decision log — add a pointer, do not fork a second story.

Status: **proposed** | **accepted** | **superseded**

---

## D-001 — Git is company memory

- **Date:** 2026-09-10
- **Status:** accepted
- **Context:** Chat and local agent transcripts evaporate; the next session starts cold.
- **Decision:** Durable facts, decisions, and session summaries live in this git repository.
- **Why:** A smarter company is a company that can be *read*.
- **Consequences:** If it is not committed, it did not happen. Inbox is for speed, not for hiding.

---

## D-002 — Five-part layout, names as specified

- **Date:** 2026-09-10
- **Status:** accepted
- **Context:** Need a drop zone, honest knowledge, a trail, WIP, and agent behavior.
- **Decision:** Use `inbox/`, `calls/`, `knowledge/` (+ INDEX, `_provisional`, `_graveyard`), `DECISIONS.md`, `ACTIVITY.md`, `logs/`, `workspaces/`, `CLAUDE.md`, `skills/`, `scripts/`, `hooks/`.
- **Why:** Shared language with the people who will drop files at 11pm.
- **Consequences:** Do not invent parallel folders (`notes/`, `memory/`, `adr/` as a second trail).

---

## D-003 — Honest knowledge: provisional and graveyard

- **Date:** 2026-09-10
- **Status:** accepted
- **Context:** Agents treat prose as fact. False confidence compounds.
- **Decision:** Unsure → `_provisional.md`. Wrong → `_graveyard.md`. Never silent-delete a claim.
- **Why:** Being wrong in public is cheaper than being wrong in production.
- **Consequences:** INDEX stays short; doubt is not mixed into topic files as if it were true.

---

## D-004 — `docs/` remains product source of truth

- **Date:** 2026-09-10
- **Status:** accepted
- **Context:** Risk of a second PRD inside `knowledge/`.
- **Decision:** PRD / SCOPE / TECH-SPEC / ORCHESTRATION stay in `docs/`. INDEX points at them. Knowledge files hold *operational* facts (URLs, layout, OS rules).
- **Why:** One fact, one home (playbook).
- **Consequences:** Updating a user story means editing `docs/PRD.md`, not `knowledge/slush.md`.

---

## D-005 — CLAUDE.md is the agent operating manual

- **Date:** 2026-09-10
- **Status:** accepted
- **Context:** Cursor and other harnesses need a single “how to behave” file.
- **Decision:** `CLAUDE.md` at repo root. Cursor always-rule points at it. Repeatable tasks live in `skills/`.
- **Why:** The user named this file; skills stay out of the always-context.
- **Consequences:** Do not paste the whole playbook into a second always-rule.

---

## D-006 — Slush live URL is the RoyalStudio label

- **Date:** 2026-09-08
- **Status:** accepted
- **Context:** `slush.here.now` 404’d; workspace already had label `slush`.
- **Decision:** Publish to slug `liminal-birch-96b3` in workspace `royal-studio` → https://slush.royal-studio.here.now/
- **Why:** That is the existing “here.now web site slush.”
- **Consequences:** Docs and knowledge must not advertise `slush.here.now` as live. Graveyard row recorded.

---

## D-007 — Adopt the company OS in this repo

- **Date:** 2026-09-10
- **Status:** accepted
- **Context:** Spec pack + Slush existed; memory did not compound.
- **Decision:** Scaffold the five parts in-tree and require session close (log + ACTIVITY).
- **Why:** A smarter company every day is an operating loop, not a poster.
- **Consequences:** SCOPE in-scope item 9. Overnight scripts are local; no new SaaS.
