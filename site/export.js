function framingLine(s) {
  const o = s.overview || {};
  return `Make me a ${o.type || "[TYPE]"} for ${o.who || "[WHO]"} that helps ${o.goal || "[GOAL]"} by doing ${o.byDoing || "[WHAT IT DOES]"}`;
}

function mdList(items, mapFn) {
  const rows = (items || []).map(mapFn).filter(Boolean);
  return rows.length ? rows.map((r) => `- ${r}`).join("\n") : "- _TBD_";
}

function exportReadme(s) {
  const name = s.overview.productName || "Untitled";
  return `# ${name} — Documentation pack (${s.overview.status || "DRAFT"})

**Version:** ${s.overview.version || "v0.1"}

${framingLine(s)}

## How to read

| Step | File | Job |
|------|------|-----|
| 1 | PRD.md | Why it exists |
| 2 | SCOPE.md | Boundaries |
| 3 | TECH-SPEC.md | Mechanism + work units |
| 4 | ORCHESTRATION.md | Runtime from scratch |

Conflict rule: PRD wins on intent · SCOPE wins on boundaries · TECH-SPEC wins on implementation.

## Harness

Pin the four files. Implement one work unit at a time. Stop at Verify. Do not lock \`[DRAFT — resolve]\` silently.
`;
}

function exportPrd(s) {
  const p = s.prd;
  const o = s.overview;
  return `# Product Requirements Document (PRD)

**Product / Feature Name:** ${o.productName || "_Untitled_"}
**Status:** 🟡 ${o.status || "DRAFT"}
**Version:** ${o.version || "v0.1"}

## 1) Executive Summary

### Problem
${p.problem || "_TBD_"}

### Solution
${p.solution || "_TBD_"}

### Primary value propositions
${mdList(p.valueProps, (x) => (typeof x === "string" ? x.trim() : "") || null)}

## 3) Goals, Success, and Constraints

### 3.1 One-line framing

\`\`\`text
${framingLine(s)}
\`\`\`

### 3.3 Definition of success

- **Business:** ${p.businessSuccess || "_TBD_"}
- **User:** ${p.userSuccess || "_TBD_"}
- **Technical:** ${p.techSuccess || "_TBD_"}

### 3.4 Hard constraints

${p.constraints || "_TBD_"}

## 4) Personas

${(p.personas || []).filter((x) => x.name).map((x) => `### ${x.name}
- **Role:** ${x.role || ""}
- **Goals:** ${x.goals || ""}
- **Frustrations:** ${x.frustrations || ""}`).join("\n\n") || "_Add at least two personas._"}

## 5) User stories, flows, and acceptance

### 5.1 Stories
${mdList(p.stories, (x) => x.text?.trim())}

### 5.2 Flows
${(p.flows || []).filter((f) => f.name).map((f) => `#### ${f.name}
- **Steps:** ${f.steps || ""}
- **Edge cases:** ${f.edges || ""}
- **Acceptance:** ${f.acceptance || ""}`).join("\n\n") || "_Add 3–5 flows._"}

## 6) Features

${(p.features || []).filter((f) => f.name).map((f) => `### ${f.name}
- **Priority:** ${f.priority || ""}
- **Acceptance:** ${f.acceptance || ""}`).join("\n\n") || "_TBD_"}

## 6.2 Non-functional requirements

${p.nfrs || "_TBD_"}

## 7) Glossary

${(p.glossary || []).filter((g) => g.term).map((g) => `- **${g.term}:** ${g.definition || ""}`).join("\n") || "- _TBD_"}

## 13) Assumptions and open questions

### Assumptions
${mdList(p.assumptions, (x) => (typeof x === "string" ? x.trim() : "") || null)}

### Open questions
${(p.questions || []).filter((q) => q.text).map((q) => `- [ ] **${q.id || "Q"}** ${q.text}`).join("\n") || "- [ ] _TBD_"}
`;
}

function exportScope(s) {
  const sc = s.scope;
  return `# Scope — ${s.overview.productName || "Untitled"} (${s.overview.status || "DRAFT"})

## In scope
${mdList(sc.inScope, (x) => (typeof x === "string" ? x.trim() : "") || null)}

## Out of scope
${mdList(sc.outOfScope, (x) => (typeof x === "string" ? x.trim() : "") || null)}

## Future
${(sc.future || []).filter((f) => f.item).map((f) => `- **${f.item}** — trigger: ${f.trigger || "TBD"}`).join("\n") || "- _TBD_"}

## Phases
${(sc.phases || []).filter((p) => p.name).map((p) => `### ${p.name}
- **Entry:** ${p.entry || ""}
- **Exit:** ${p.exit || ""}`).join("\n\n") || "_TBD_"}

## Change policy
${sc.changePolicy || ""}

## Decision log
${(sc.decisions || []).filter((d) => d.decision).map((d) => `| ${d.date || ""} | ${d.decision} | ${d.why || ""} | ${d.consequences || ""} |`).join("\n") ? `| Date | Decision | Why | Consequences |\n|------|----------|-----|----------------|\n${(sc.decisions || []).filter((d) => d.decision).map((d) => `| ${d.date || ""} | ${d.decision} | ${d.why || ""} | ${d.consequences || ""} |`).join("\n")}` : "_None yet._"}
`;
}

function exportTechSpec(s) {
  const sp = s.spec;
  const units = s.units || [];
  const unitMd = units.filter((u) => u.id || u.title).map((u) => `### ${u.id || "WU-???"} — ${u.title || "Untitled"}

| | |
|---|---|
| **Goal** | ${u.goal || ""} |
| **Depends on** | ${u.dependsOn || "none"} |
| **Pins** | ${u.pins || ""} |
| **Files** | ${u.files || ""} |
| **Don’t** | ${u.dont || ""} |
| **Acceptance** | ${u.acceptance || ""} |
| **Verify** | \`${u.verify || ""}\` |
| **Done when** | ${u.doneWhen || ""} |
`).join("\n");

  return `# Technical Specification — ${s.overview.productName || "Untitled"} (${s.overview.status || "DRAFT"})

## Goal
${sp.systemGoal || "_TBD_"}

## Layers
${sp.layers || "_TBD_"}

## Stack
${sp.stack || "_TBD_"}

## Directory layout

\`\`\`text
${sp.layout || ""}
\`\`\`

## Contracts
${sp.contracts || "_TBD_"}

## Domain / invariants
${sp.domain || "_TBD_"}

## Work units

${unitMd || "_Add work units with Verify commands._"}

## Failure modes
${sp.failures || "_TBD_"}

## Security
${sp.security || "_TBD_"}

## Context pins
${sp.pins || ""}
`;
}

function exportOrch(s) {
  const o = s.orch;
  return `# Orchestration — ${s.overview.productName || "Untitled"} (${s.overview.status || "DRAFT"})

## Runtime
${o.runtime || "_TBD_"}

## Context loop
${o.loop || ""}

## Rules
${o.rules || "_TBD_"}

## Tools
${o.tools || "_TBD_"}

## HITL gates
${(o.hitl || []).filter((h) => h.gate || h.id).map((h) => `- **${h.id}** ${h.gate} — ${h.examples || ""}`).join("\n") || "- _TBD_"}

## Bootstrap from scratch
${o.bootstrap || "_TBD_"}

## Checkpoints / rollback
${o.checkpoints || ""}
`;
}

function exportHarnessPrompt(s) {
  const first = (s.units || []).find((u) => u.id) || { id: "WU-00x" };
  return `Follow pinned context. Vibe mode ON.

Goal: Implement ${first.id} from @docs/TECH-SPEC.md
Non-negotiables: do not expand scope; run the WU Verify; stop.
If you hit [DRAFT — resolve], record an assumption; do not invent a locked decision.

Pins: @docs/PRD.md @docs/SCOPE.md @docs/TECH-SPEC.md @docs/ORCHESTRATION.md
`;
}

function allExports(s) {
  return {
    "README.md": exportReadme(s),
    "PRD.md": exportPrd(s),
    "SCOPE.md": exportScope(s),
    "TECH-SPEC.md": exportTechSpec(s),
    "ORCHESTRATION.md": exportOrch(s),
    "HARNESS-PROMPT.md": exportHarnessPrompt(s)
  };
}

function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function downloadAll(s) {
  const files = allExports(s);
  Object.entries(files).forEach(([name, text], i) => {
    setTimeout(() => downloadText(name, text), i * 120);
  });
}
