# Scope — Cursor Cloud Agents (DRAFT)

**Status:** 🟡 DRAFT  
**Version:** v0.1  
**Last updated:** 2026-09-08  
**Canonical location:** `docs/SCOPE.md`  
**Owns:** in / out / later, phase gates, decision log  
**Does not own:** user stories (PRD), APIs and WUs (TECH-SPEC)

> If a coding session cannot point to a line in this file that **allows** the change, the change is out of scope.

---

## 1) One-line boundary

**This milestone delivers a complete DRAFT documentation pack plus Slush, a static tech spec writing tool.** It does not deliver a control-plane UI, billing, or a running multi-agent mesh.

---

## 2) In Scope (this milestone)

Concrete deliverables. If it is not in this list, do not build it now.

1. **Documentation map** — `docs/README.md` with reading order and conflict rule
2. **Playbook** — must-have DRAFT content, topic checklist, spec anatomy, documentation practices
3. **PRD DRAFT** — problem, users, stories, flows, NFRs-as-goals, glossary, open questions
4. **Scope DRAFT** — this file: in/out, phases, decisions, change policy
5. **Tech spec DRAFT** — architecture sketch, directory layout, capabilities, work units with Verify
6. **Orchestration DRAFT** — from-scratch control loop, rules, tools, HITL, bootstrap
7. **Root README pointer** — status + how to start a harness session
8. **Slush writing tool** — static SPA in `site/` that turns the playbook into a guided writer and markdown export, published at `slush.here.now`

---

## 3) Out of Scope (explicit non-goals)

Do **not** implement even if it is easy or “the agent already knows how.”

1. **Application UI / product screens** — no Next.js app, no design-system implementation (Slush is a static writer, not a product control plane)
2. **Production infrastructure** — no Terraform, k8s, multi-region, paid cloud resources (here.now static hosting is allowed)
3. **Identity & billing** — no OAuth, SSO, Stripe, subscription tiers
4. **Model training / fine-tunes** — no company-data training pipelines
5. **Secretful examples** — no real API keys, tokens, or customer data in docs
6. **Unrequested repo extras** — no extra markdown the playbook did not call for (wikis, slide decks)
7. **Rewriting Cursor the product** — this repo documents a *workspace harness*, not a fork of Cursor IDE

---

## 4) Future Considerations / Phase 2+

Start only when the trigger is true. Do not “just quickly add” these.

| Item | Trigger |
|------|---------|
| `.cursor/rules/` baseline set | WU-003 (TECH-SPEC) started; Q8 has a default |
| First vertical code slice | Q2 and Q3 answered or assumed in writing |
| API + persistence | Q4 answered; contracts written as CAP in TECH-SPEC |
| Auth | Q5 answered |
| CI (lint, gitleaks, tests) | Q6 answered |
| UI with WCAG AA | Q2 includes a UI; Q11 has a design source or “tokens in repo” |
| Multi-agent parent/child | Q10 = yes |
| Hosting / environments | Q12 answered |
| Transcript retention / PII | Q9 answered |
| Bilingual docs | Q15 = yes |

---

## 5) Phase map (gates, not calendars)

Phases are **entry/exit criteria**. Do not start phase N+1 until exit(N) is true.

### Phase 0 — Empty repo

- **Entry:** git repo exists
- **Work:** this documentation pack
- **Exit:** PLAYBOOK §2 must-haves present; root README points here; open questions numbered

### Phase 1 — Harness bootstrap

- **Entry:** Phase 0 exit
- **Work:** rules layout, ignore secrets, optional markdown lint
- **Exit:** WU-003 Verify green; agent session can pin docs and follow HITL list

### Phase 2 — First vertical slice

- **Entry:** Q2/Q3 resolved or assumed; Phase 1 exit
- **Work:** thinnest path that proves the harness (one capability, tests, PR)
- **Exit:** Flow A in PRD succeeds on a *code* WU

### Phase 3 — Core product (depends on Q2)

- **Entry:** Phase 2 exit; CAP list in TECH-SPEC updated
- **Work:** capabilities in priority order
- **Exit:** MLS defined in a later SCOPE revision

### Phase 4 — Hardening

- **Entry:** something users depend on
- **Work:** a11y, perf, security tests, observability
- **Exit:** NFRs in PRD have test seats

---

## 6) Impact–effort cut (what we refuse now)

- **Quick wins:** documentation completeness, ID discipline, Verify hooks
- **Major (later):** control plane, auth, multi-agent, enterprise SSO
- **Fill-ins:** extra diagrams, prompt-command encyclopedia already covered in PLAYBOOK
- **Avoid now:** custom website for the spec; dual sources of truth (Notion + git)

---

## 7) Change policy (how DRAFT becomes reality)

1. **Intent change** → edit PRD + add a decision row here.
2. **Boundary change** → edit this file first, then patch PRD/SPEC if needed.
3. **Mechanism change** → edit TECH-SPEC / ORCHESTRATION; do not silently change stories.
4. **New WU** → append IDs; never renumber.
5. **Lock a section** → banner + decision row + named human in the PR.

**Conflict rule:** PRD wins on intent · SCOPE wins on boundaries · TECH-SPEC wins on implementation. Then fix the loser so they agree.

---

## 8) Decision log

| Date | Decision | Why | Consequences |
|------|----------|-----|----------------|
| 2026-09-08 | Markdown docs in `docs/` before application code | Harness needs a source of truth; empty repo | No app scaffold in this milestone |
| 2026-09-08 | One fact, one home across five docs + playbook | Prevent spec rot | Agents must link, not copy |
| 2026-09-08 | Work units are the execution quantum | Enables vibe-coding with stop conditions | No “build the whole platform” WUs |
| 2026-09-08 | Unknowns are Q-ids, not fake Locked numbers | Trust | Q3 stack is not secretly Next.js until assumed at code start |
| 2026-09-08 | Mermaid + tables, not images, for architecture | GitHub-native, agent-readable | No binary design dumps required for v0 |
| 2026-09-08 | English-only `[assumption]` | Unblock DRAFT | Q15 may add SL later |
| 2026-09-08 | Static Slush writer on here.now slug `slush` | User asked for a tech spec writing tool with modern-minimal UI | Persistence is localStorage; no accounts |

---

## 9) Scope checklist for every PR

- [ ] Cites a WU id or “docs-only milestone item”
- [ ] Does not implement an Out-of-scope bullet
- [ ] Updates Decision log if it changes a boundary
- [ ] Does not introduce a second source of truth
