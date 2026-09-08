# Documentation Playbook — Anatomy of a DRAFT that can drive a harness

**Status:** 🟡 DRAFT (method is stable; examples will track the product)  
**Purpose:** Define *what must be in a DRAFT*, *which topics to cover*, *how to write documentation that an agent can execute*, and *the anatomy of a great tech spec* for vibe-coding / harness engineering.

This file is **craft**, not product. Product decisions live in `PRD.md`, `SCOPE.md`, and `TECH-SPEC.md`.

---

## 1) What “DRAFT” means here

A DRAFT is not a blank template. A DRAFT is a **complete skeleton with honest unknowns**.

| DRAFT is | DRAFT is not |
|----------|--------------|
| Every required section present | Empty headings with no guidance |
| Directionally true product intent | Fake precision (invented SLAs, fake API paths presented as locked) |
| Open questions listed, numbered, owned | Hidden gaps that an agent will silently fill |
| Enough to start **WU-000 / WU-001** | Enough to ship v1 without review |
| Examples of *shape* (a story, a flow, a work unit) | A novel about the future |

**Rule:** If a section is required and the answer is unknown, write the **question**, the **default-if-we-must**, and the **cost of being wrong**. Never leave a required section as a heading only.

---

## 2) Content that MUST be in the DRAFT

These sections are **non-negotiable** for this pack. If any is missing, the DRAFT is not ready for harness use.

### 2.1 Must-have in the PRD

| # | Section | Why an agent needs it |
|---|---------|------------------------|
| P1 | One-line framing (type / who / goal / by-doing) | Prevents building the wrong artifact |
| P2 | Problem (1–3 sentences) + solution (2–3 sentences) | Intent before mechanism |
| P3 | Primary value propositions (3–5) | Prioritization when trade-offs appear |
| P4 | In scope / out of scope pointers (or link to SCOPE) | Stop scope creep mid-implementation |
| P5 | Success definition (business / user / technical) | “Done” is observable |
| P6 | Hard constraints (time, compliance, platforms, a11y) | Non-negotiables become tests |
| P7 | Personas (at least 2) | Voice, UX, and authz decisions |
| P8 | User stories in *As a / I want / so that* | Acceptance mapping |
| P9 | 3–5 critical user flows with edge cases | Implementation order and error states |
| P10 | Feature requirements with priority + acceptance checkboxes | Work breakdown |
| P11 | NFRs (perf, security, reliability, a11y, maintainability) | Prevents “works on my machine” shipping |
| P12 | Glossary | Shared language; no overloaded terms |
| P13 | Open questions + assumptions | Stops silent invention |
| P14 | Status, version, last updated | Trust in the document |

### 2.2 Must-have in SCOPE

| # | Section | Why |
|---|---------|-----|
| S1 | In scope (5–7 concrete items) | What this milestone actually delivers |
| S2 | Out of scope (3–5 explicit non-goals) | What not to build even if easy |
| S3 | Phase map (now / next / later) with entry/exit criteria | Harness phase gates |
| S4 | Impact–effort cut (what we refuse) | Avoid low-impact high-effort |
| S5 | Decision log (date, decision, why, consequences) | Conflicts get resolved in writing |
| S6 | Change policy (how a DRAFT becomes locked) | Prevents drive-by rewrites |

### 2.3 Must-have in the TECH SPEC

| # | Section | Why |
|---|---------|-----|
| T1 | System context diagram | Where the work sits |
| T2 | Layered architecture + boundaries | Where code is allowed to live |
| T3 | Stack decisions with rationale (even if provisional) | Stops stack thrash |
| T4 | Directory layout | Agents write files in the right place |
| T5 | Contracts: APIs / events / data shapes | Interfaces before implementations |
| T6 | Domain model (entities, relations, invariants) | Data and naming |
| T7 | Work units (WU-xxx) with verify steps | The harness itself |
| T8 | Definition of done per work unit | Stop conditions |
| T9 | Failure modes + observability | Errors are specified, not improvised |
| T10 | Security & threat notes for this slice | Authz is not an afterthought |
| T11 | Test strategy mapped to work units | Verification is executable |
| T12 | Context pin list (`@files` to attach) | Reproducible agent sessions |

### 2.4 Must-have in ORCHESTRATION

| # | Section | Why |
|---|---------|-----|
| O1 | Target runtime (who orchestrates whom) | Cloud agent vs local vs hybrid |
| O2 | Context loop (deconstruct → assemble → plan → execute → integrate) | Repeatable control flow |
| O3 | Rule hierarchy (always / auto / requested / manual) | Governance |
| O4 | Tool/MCP map | What the agent may invoke |
| O5 | Human-in-the-loop gates | Critical decisions stay human |
| O6 | Bootstrap sequence from empty repo | From-scratch path |
| O7 | Checkpoint / rollback policy | Safe iteration |

### 2.5 Allowed to wait (NOT required in first DRAFT)

Do **not** block the DRAFT on these. Track them as later work units.

- Pixel-perfect design tokens and full Figma inventory
- Complete OpenAPI for every future endpoint
- Production SLO contracts signed by SRE
- Full threat model / pen-test report
- Seed datasets and anonymization pipelines
- Multi-region failover runbooks
- Legal copy, ToS, and marketing site

**Tip:** Put each “wait” item in SCOPE → Future, with a one-line trigger (“start when WU-014 lands”).

---

## 3) Topics / bullet points to cover

Use this as a **coverage checklist** when reviewing the pack. Every bullet should exist *somewhere* (PRD, SCOPE, TECH-SPEC, or ORCHESTRATION) — not duplicated everywhere.

### 3.1 Product & intent

- [ ] What job is the user hiring this for? (JTBD)
- [ ] Who is it *not* for?
- [ ] What existing workaround dies if we succeed?
- [ ] What is the smallest lovable slice (MLS)?
- [ ] What would make us kill the project?

### 3.2 Users & access

- [ ] Personas and environments (tools they already use)
- [ ] AuthN / AuthZ model (roles, least privilege)
- [ ] Human supervisor vs autonomous agent
- [ ] Audit audience (who reads logs, why)

### 3.3 Experience

- [ ] Happy path (3–5 flows)
- [ ] Empty, loading, error, permission-denied, timeout
- [ ] Keyboard / a11y (WCAG 2.1 AA)
- [ ] Responsive expectations if there is UI
- [ ] Copy tone (agent-facing vs human-facing)

### 3.4 Domain & data

- [ ] Glossary
- [ ] Entities, invariants, cardinality
- [ ] What is stored vs derived vs ephemeral
- [ ] Retention, soft-delete, PII
- [ ] Idempotency keys and uniqueness

### 3.5 System

- [ ] C4-ish context + containers
- [ ] Trust boundaries
- [ ] Sync vs async; queues vs request/response
- [ ] Failure isolation (what degrades vs what dies)
- [ ] Config vs code vs secrets

### 3.6 Delivery harness

- [ ] Work unit graph and dependencies
- [ ] Verification command per unit
- [ ] Checkpoint names
- [ ] Rollback story
- [ ] “Do not start X until Y is green”

### 3.7 Quality & ops

- [ ] Tests: unit / integration / UAT / a11y
- [ ] Logging, metrics, traces (what *must* be emitted)
- [ ] Rate limits, retries, backoff
- [ ] Incident: who is paged for v0? (often: nobody; log only)

### 3.8 Documentation itself

- [ ] Canonical paths
- [ ] Conflict resolution rule
- [ ] How to promote DRAFT → Locked
- [ ] Changelog

---

## 4) Anatomy of a great tech spec (for vibe-coding harness engineering)

A great tech spec is **not an essay**. It is a **contract the agent executes**.

Write for two readers at once:

1. A human who must approve direction in minutes.
2. An agent who must implement without asking “what file?” or “when am I done?”

### 4.1 The five layers of a harness-ready spec

```text
[Primary Goal]          ← one sentence; output type + accomplishment
    [Constraints]       ← what the output is NOT; platforms; a11y; secrets
        [Examples]      ← golden input → golden output
            [Work units]← ordered, verifiable slices
                [Verify]← command or observable check
```

This matches the working prompt pattern:

> Define the **goal**, not the process. Specify **constraints**, not ritual. Give **examples**. Embed **performance criteria**. Decompose hierarchically.

### 4.2 Spec section anatomy (use this shape every time)

Each major capability in `TECH-SPEC.md` should contain **all** of the following. If one is missing, the agent will improvise.

```markdown
### CAP-00x: <Name>

**Goal:** I need <output type> that <accomplishes what>.
**Context:** For <persona>, where <what matters>.
**Success looks like:** <observable>. Failure looks like: <anti-pattern>.
**Constraints:** Focus on <priority>. Avoid <anti-priority>.
**Pinned context:** `@docs/PRD.md` `@path/to/file`

**Contracts**
- Input:
- Output:
- Errors:

**Invariants**
- Always …
- Never …

**Examples**
- ✅ Good: …
- ❌ Bad: …

**Work units**
- WU-xxx → WU-xxy (dependency)

**Verify**
- Command or UI path
- Expected result

**Done when**
- [ ] …
```

### 4.3 Work-unit anatomy (the atomic harness cell)

A work unit is the **smallest change** that can be verified without the next unit existing.

| Field | Required | Notes |
|-------|----------|-------|
| ID | yes | Stable: `WU-014`. Never renumber; add `WU-014a` if you must split |
| Title | yes | Verb + object: “Add Zod validation to `POST /runs`” |
| Goal | yes | One sentence |
| Depends on | yes | IDs or `none` |
| Pins | yes | Exact `@files` |
| Files to touch | yes | Create / edit / do-not-touch |
| Steps | yes | Ordered; each step is a constraint, not a lecture |
| Don’t | yes | Anti-scope for this unit |
| Acceptance | yes | Given / When / Then or checkboxes |
| Verify | yes | Executable: test, curl, lint, screenshot path |
| Rollback | should | How to undo if verify fails after merge-forward |

**Size rule:** If a work unit cannot be described in ≤ 15 steps and verified with ≤ 3 commands, split it.

**Isolation rule:** A work unit must not require reading the author’s mind. If a name is ambiguous, link the glossary.

### 4.4 Example: bad vs good work unit

❌ **Bad**

> Improve the API and add tests.

✅ **Good**

```markdown
### WU-007 — Validate create-run input with Zod

**Goal:** Reject malformed create-run payloads before persistence.
**Depends on:** WU-006 (route stub exists)
**Pins:** `@src/api/runs.ts` `@src/api/schemas/run.ts` `@docs/TECH-SPEC.md`
**Files:** create `src/api/schemas/run.ts`; edit `src/api/runs.ts`; create `src/api/runs.test.ts`
**Don’t:** add auth, add DB migrations, change response envelope
**Acceptance:**
- Given a payload missing `goal`, When POST /runs, Then 400 with `{ code: "VALIDATION_ERROR", fields: ["goal"] }`
- Given a valid payload, When POST /runs, Then 201 and previously stubbed body
**Verify:** `pnpm test src/api/runs.test.ts`
**Done when:** tests pass; no other files changed.
```

### 4.5 The vibe-coding harness loop (spec → code)

```text
1. Select next WU with all dependencies green
2. Pin the WU’s files + PRD/SCOPE/TECH-SPEC
3. Implement only that WU
4. Run Verify
5. If red: fix within the WU; do not expand scope
6. If green: checkpoint (commit), mark WU done
7. Repeat
```

**Harness engineering** means the spec *is* the test harness’s design doc: every WU has a verify hook, every invariant has a test seat, every constraint has a “Don’t”.

### 4.6 Quality bar baked into the spec (non-negotiables)

When the work is a web surface, the spec must name these as **acceptance**, not vibes:

- **Fidelity:** spacing, type, color, radius called out where they matter; otherwise “match existing tokens in `styles/`”
- **Performance:** no unbounded lists; pagination or virtualization named
- **Accessibility:** semantic HTML, focus, labels, contrast AA — called out per UI WU

When the work is an agent/runtime:

- **Determinism of control:** same input context → same plan shape (not same prose)
- **Tool policy:** allow-list; no surprise side effects
- **Audit:** every consequential action has a log field list

---

## 5) Best practices, tips & tricks (best documentation)

### 5.1 Write for execution, not decoration

| Do | Don’t |
|----|-------|
| Put the answer in the first sentence of a section | Open with “It’s important to note…” |
| Use tables for inventories (endpoints, entities, WUs) | Hide inventories in paragraphs |
| Give one ✅ and one ❌ example | Give five similar examples |
| Name files, functions, status codes | Say “the backend” / “handle it properly” |
| Record unknowns as numbered questions | Use TBD as a personality |

### 5.2 One fact, one home

Duplication is how DRAFTs rot. If a fact must appear twice, **link** the owner:

- Intent → PRD
- Boundary → SCOPE
- Mechanism → TECH-SPEC
- Runtime / agent loop → ORCHESTRATION

**Tip:** In the spec, write “see PRD §5.2 Flow: Create run” instead of restating the flow.

### 5.3 Constraints, not rituals

Bad: “Always use Redux.”  
Good: “Client state that must survive a route change lives in X; ephemeral UI state stays local.”

Bad: “Write clean code.”  
Good: “No `any`. Public functions have tests. Errors are typed unions, not thrown strings.”

### 5.4 Honest DRAFT banners

At the top of every doc:

```markdown
> **Status:** 🟡 DRAFT — safe to implement WU-000…WU-00k. Not safe to implement WU-0xx until Q12 is resolved.
```

Update the banner when the truth changes. Stale banners destroy trust.

### 5.5 Decision records, tiny

When you decide something that future-you will argue with:

```markdown
| Date | Decision | Why | Consequences |
|------|----------|-----|----------------|
| 2026-09-08 | Markdown docs before code | Harness needs a source of truth | No app code in this milestone |
```

Do not start a parallel ADR folder until you have > 7 decisions. One table in SCOPE is enough at DRAFT.

### 5.6 Language that agents parse well

- Prefer **MUST / SHOULD / MAY** (RFC 2119) in contracts.
- Prefer **Given / When / Then** in acceptance.
- Prefer **always / never** in invariants.
- Number questions: `Q12`. Number work units: `WU-012`. Number capabilities: `CAP-003`.
- Never reuse an ID.

### 5.7 Examples beat adjectives

“Fast” → “P95 < 200ms for interactive context assembly on a 2k-token pin set (DRAFT target).”  
“Secure” → “Secrets never in git; agent reads only from env; logs redact `Authorization`.”  
“Simple” → “A new engineer (or agent) can run Verify for WU-001 in one command.”

### 5.8 Keep the DRAFT short where it can be, deep where it must be

Depth belongs in:

- invariants
- error catalogs
- authz matrices
- work units

Shallowness belongs in:

- market essays
- competitor roundups
- motivational prefaces

**Tip:** If a section does not change an implementation choice, move it to an appendix or delete it.

### 5.9 Review checklist (human, 15 minutes)

- [ ] I can say the one-line framing without looking
- [ ] I know what we will **not** ship
- [ ] Every P0 feature has a flow + acceptance
- [ ] Every WU has Verify
- [ ] Every `[DRAFT — resolve]` is in Open Questions
- [ ] Glossary covers every capitalized Domain Term
- [ ] Conflict rule is stated (PRD vs SCOPE vs SPEC)
- [ ] Bootstrap from empty repo is possible using ORCHESTRATION only

### 5.10 Review checklist (agent, before coding)

- [ ] Next WU dependencies are green
- [ ] Pins exist on disk
- [ ] Don’t-list does not contradict the WU goal
- [ ] Verify command is runnable in this environment
- [ ] No unresolved `[DRAFT — resolve]` on the critical path of this WU

### 5.11 Promotion: DRAFT → Locked

A section becomes ✅ Locked when:

1. The open questions that block it are answered or explicitly assumed
2. A human has reviewed the section (not just the file)
3. At least one work unit that depends on it has been implemented without a spec patch *caused by ambiguity*

Lock **sections**, not entire books. A PRD can be 40% locked and still useful.

### 5.12 Common failure modes

| Failure | Symptom | Fix |
|---------|---------|-----|
| Spec novel | 3k words, 0 work units | Cut prose; add WUs |
| Template cosplay | Headings, no sentences | Fill or delete the heading |
| Shadow spec | Decisions only in chat | Decision log |
| Fake precision | Invented port numbers marked locked | Mark DRAFT; list Q |
| God WU | “Build the app” | Split until Verify is one command |
| Duplicate truth | PRD and SPEC disagree on an endpoint | One owner; the other links |
| Hidden UI | No empty/error states | Add to every flow |
| Unverifiable NFR | “Must be secure” | Threat + control + test seat |

---

## 6) Suggested session prompts (copy/paste)

### Start a harness session

```markdown
Follow pinned context. Vibe mode ON.

Goal: Implement WU-00x from @docs/TECH-SPEC.md
Non-negotiables: do not expand scope; run the WU Verify; stop.
If you hit [DRAFT — resolve], record an assumption; do not invent a locked decision.
```

### Draft a new capability into the spec

```markdown
Add CAP-00x to @docs/TECH-SPEC.md using the anatomy in @docs/PLAYBOOK.md §4.2.
Include contracts, invariants, examples, work units, verify, done-when.
```

### Clarify requirements instead of coding

```markdown
Do not write app code. Using @docs/PRD.md and @docs/SCOPE.md,
list missing MUST-HAVE DRAFT sections from @docs/PLAYBOOK.md §2
and propose answers as Open Questions (Qn) with default-if-we-must.
```

---

## 7) Mapping: playbook → this repo’s files

| Playbook rule | Lives in |
|---------------|----------|
| Must-have lists | this file §2 |
| Topic coverage checklist | this file §3 |
| Spec & WU anatomy | this file §4 |
| Documentation craft | this file §5 |
| Product intent | `PRD.md` |
| Boundaries | `SCOPE.md` |
| Executable design | `TECH-SPEC.md` |
| Runtime from scratch | `ORCHESTRATION.md` |

When in doubt, add a work unit, not a paragraph.
