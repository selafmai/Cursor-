const STORAGE_KEY = "slush.spec.v1";

const MUST_HAVES = [
  { id: "P1", doc: "overview", label: "One-line framing", test: (s) => filled(s.overview?.type) && filled(s.overview?.who) && filled(s.overview?.goal) && filled(s.overview?.byDoing) },
  { id: "P2", doc: "prd", label: "Problem + solution", test: (s) => filled(s.prd?.problem) && filled(s.prd?.solution) },
  { id: "P3", doc: "prd", label: "Value propositions", test: (s) => listFilled(s.prd?.valueProps) },
  { id: "P5", doc: "prd", label: "Success definition", test: (s) => filled(s.prd?.businessSuccess) && filled(s.prd?.userSuccess) && filled(s.prd?.techSuccess) },
  { id: "P6", doc: "prd", label: "Hard constraints", test: (s) => filled(s.prd?.constraints) },
  { id: "P7", doc: "prd", label: "Personas (2+)", test: (s) => (s.prd?.personas || []).filter((p) => filled(p.name)).length >= 2 },
  { id: "P8", doc: "prd", label: "User stories (3+)", test: (s) => (s.prd?.stories || []).filter((x) => filled(x.text)).length >= 3 },
  { id: "P9", doc: "prd", label: "Critical flows (3+)", test: (s) => (s.prd?.flows || []).filter((x) => filled(x.name)).length >= 3 },
  { id: "P10", doc: "prd", label: "Feature + acceptance", test: (s) => listFilled(s.prd?.features) },
  { id: "P11", doc: "prd", label: "NFRs", test: (s) => filled(s.prd?.nfrs) },
  { id: "P12", doc: "prd", label: "Glossary", test: (s) => listFilled(s.prd?.glossary) },
  { id: "P13", doc: "prd", label: "Open questions", test: (s) => listFilled(s.prd?.questions) },
  { id: "S1", doc: "scope", label: "In scope", test: (s) => listFilled(s.scope?.inScope) },
  { id: "S2", doc: "scope", label: "Out of scope", test: (s) => listFilled(s.scope?.outOfScope) },
  { id: "S3", doc: "scope", label: "Phase map", test: (s) => listFilled(s.scope?.phases) },
  { id: "S5", doc: "scope", label: "Decision log", test: (s) => listFilled(s.scope?.decisions) },
  { id: "T1", doc: "spec", label: "System goal / context", test: (s) => filled(s.spec?.systemGoal) },
  { id: "T2", doc: "spec", label: "Layers + stack", test: (s) => filled(s.spec?.layers) && filled(s.spec?.stack) },
  { id: "T4", doc: "spec", label: "Directory layout", test: (s) => filled(s.spec?.layout) },
  { id: "T5", doc: "spec", label: "Contracts", test: (s) => filled(s.spec?.contracts) },
  { id: "T7", doc: "units", label: "Work units with Verify", test: (s) => (s.units || []).some((u) => filled(u.id) && filled(u.verify)) },
  { id: "O1", doc: "orch", label: "Runtime + loop", test: (s) => filled(s.orch?.runtime) && filled(s.orch?.loop) },
  { id: "O5", doc: "orch", label: "HITL gates", test: (s) => listFilled(s.orch?.hitl) },
  { id: "O6", doc: "orch", label: "Bootstrap sequence", test: (s) => filled(s.orch?.bootstrap) }
];

const DOCS = [
  { id: "overview", title: "Overview", kicker: "Start here", help: "Name the artifact. Write the goal, not the process. This becomes the header of every generated markdown file." },
  { id: "prd", title: "PRD", kicker: "Intent", help: "PRD owns why it exists, who it is for, and what success looks like. Do not put file paths or API shapes here." },
  { id: "scope", title: "Scope", kicker: "Boundaries", help: "If a later session cannot point to a line that allows the change, the change is out of scope." },
  { id: "spec", title: "Tech spec", kicker: "Mechanism", help: "A harness-ready spec is a contract: layers, stack, contracts, invariants — not an essay." },
  { id: "orch", title: "Orchestration", kicker: "Runtime", help: "How the agent is assembled from an empty repo: context loop, rules, tools, human-in-the-loop." },
  { id: "units", title: "Work units", kicker: "Harness", help: "The smallest change that can be verified without the next unit existing. If it needs more than three verify commands, split it." }
];

const FIELDS = {
  overview: [
    { path: "overview.productName", label: "Product / feature name", why: "Appears in every exported filename header.", type: "text" },
    { path: "overview.status", label: "Status", type: "select", options: ["DRAFT", "In review", "Locked"] },
    { path: "overview.version", label: "Version", type: "text" },
    { path: "overview.type", label: "Make me a… (type of project)", why: "P1 — keeps the agent from building the wrong artifact.", type: "text", placeholder: "documentation-first AI workspace" },
    { path: "overview.who", label: "for… (who it’s for)", type: "text", placeholder: "builders and the agents that implement for them" },
    { path: "overview.goal", label: "that helps… (goal / problem)", type: "textarea", placeholder: "ship the right system without silent scope invention" },
    { path: "overview.byDoing", label: "by doing… (what it does)", type: "textarea", placeholder: "PRD + scope + tech spec + orchestration as an executable harness" }
  ],
  prd: [
    { path: "prd.problem", label: "Problem (1–3 sentences)", why: "P2 — intent before mechanism.", type: "textarea", tall: true },
    { path: "prd.solution", label: "Solution (2–3 sentences)", why: "What it does, not how.", type: "textarea", tall: true },
    { path: "prd.valueProps", label: "Value propositions", why: "P3 — 3–5, used when trade-offs appear.", type: "list", item: "text", add: "Add value prop" },
    { path: "prd.businessSuccess", label: "Business success", why: "P5 — observable, not motivational.", type: "textarea" },
    { path: "prd.userSuccess", label: "User success", type: "textarea" },
    { path: "prd.techSuccess", label: "Technical / operational success", type: "textarea" },
    { path: "prd.constraints", label: "Hard constraints", why: "P6 — time, privacy, platforms, WCAG. These become tests.", type: "textarea", tall: true },
    { path: "prd.personas", label: "Personas", why: "P7 — at least two. Name, role, frustrations.", type: "list", item: "persona", add: "Add persona" },
    { path: "prd.stories", label: "User stories", why: "P8 — As a / I want / so that. At least three.", type: "list", item: "story", add: "Add story" },
    { path: "prd.flows", label: "Critical user flows", why: "P9 — 3–5 journeys with edges and acceptance.", type: "list", item: "flow", add: "Add flow" },
    { path: "prd.features", label: "Features + acceptance", why: "P10 — name, priority, checkbox-ready acceptance.", type: "list", item: "feature", add: "Add feature" },
    { path: "prd.nfrs", label: "Non-functional requirements", why: "P11 — perf, security, reliability, a11y, maintainability.", type: "textarea", tall: true },
    { path: "prd.glossary", label: "Glossary", why: "P12 — shared language so terms are not overloaded.", type: "list", item: "term", add: "Add term" },
    { path: "prd.questions", label: "Open questions", why: "P13 — numbered. Never silently invent a lock.", type: "list", item: "question", add: "Add question" },
    { path: "prd.assumptions", label: "Assumptions", type: "list", item: "text", add: "Add assumption" }
  ],
  scope: [
    { path: "scope.inScope", label: "In scope", why: "S1 — 5–7 concrete deliverables for this milestone.", type: "list", item: "text", add: "Add in-scope item" },
    { path: "scope.outOfScope", label: "Out of scope", why: "S2 — explicit non-goals, even if easy.", type: "list", item: "text", add: "Add non-goal" },
    { path: "scope.future", label: "Future / Phase 2+", why: "Start only when the trigger is true.", type: "list", item: "future", add: "Add future item" },
    { path: "scope.phases", label: "Phase map", why: "S3 — entry/exit criteria, not calendars.", type: "list", item: "phase", add: "Add phase" },
    { path: "scope.decisions", label: "Decision log", why: "S5 — date, decision, why, consequences.", type: "list", item: "decision", add: "Add decision" },
    { path: "scope.changePolicy", label: "Change policy", why: "How a DRAFT becomes locked; conflict rule.", type: "textarea" }
  ],
  spec: [
    { path: "spec.systemGoal", label: "System goal (implementation view)", why: "T1 — success vs failure in one breath.", type: "textarea", tall: true },
    { path: "spec.layers", label: "Layered architecture", why: "T2 — where code is allowed to live.", type: "textarea", tall: true },
    { path: "spec.stack", label: "Stack decisions", why: "Even if provisional. Mark DRAFT vs Locked.", type: "textarea", tall: true },
    { path: "spec.layout", label: "Directory layout", why: "T4 — agents write files in the right place.", type: "textarea", tall: true, mono: true },
    { path: "spec.contracts", label: "Contracts (APIs, events, envelopes)", why: "T5 — interfaces before implementations.", type: "textarea", tall: true },
    { path: "spec.domain", label: "Domain model / invariants", type: "textarea", tall: true },
    { path: "spec.failures", label: "Failure modes + observability", type: "textarea" },
    { path: "spec.security", label: "Security notes for this slice", type: "textarea" },
    { path: "spec.pins", label: "Default context pin list", why: "Exact @files to attach in a harness session.", type: "textarea" }
  ],
  orch: [
    { path: "orch.runtime", label: "Target runtime", why: "O1 — who orchestrates whom.", type: "textarea" },
    { path: "orch.loop", label: "Context loop", why: "Deconstruct → assemble → plan → execute → integrate.", type: "textarea", tall: true },
    { path: "orch.rules", label: "Rule hierarchy", why: "always / auto-attached / requested / manual.", type: "textarea" },
    { path: "orch.tools", label: "Tool / MCP map", why: "Allow-list. Every call should advance Verify.", type: "textarea" },
    { path: "orch.hitl", label: "HITL gates", why: "O5 — critical decisions stay human.", type: "list", item: "hitl", add: "Add gate" },
    { path: "orch.bootstrap", label: "Bootstrap from empty repo", why: "O6 — ordered steps with stop conditions.", type: "textarea", tall: true },
    { path: "orch.checkpoints", label: "Checkpoint / rollback", type: "textarea" }
  ]
};

const EMPTY_WU = () => ({
  id: "",
  title: "",
  goal: "",
  dependsOn: "none",
  pins: "",
  files: "",
  dont: "",
  acceptance: "",
  verify: "",
  doneWhen: ""
});

function emptyState() {
  return {
    overview: {
      productName: "",
      status: "DRAFT",
      version: "v0.1 Draft",
      type: "",
      who: "",
      goal: "",
      byDoing: ""
    },
    prd: {
      problem: "",
      solution: "",
      valueProps: [""],
      businessSuccess: "",
      userSuccess: "",
      techSuccess: "",
      constraints: "",
      personas: [emptyPersona(), emptyPersona()],
      stories: [emptyStory(), emptyStory(), emptyStory()],
      flows: [emptyFlow(), emptyFlow(), emptyFlow()],
      features: [emptyFeature()],
      nfrs: "",
      glossary: [emptyTerm()],
      questions: [emptyQuestion()],
      assumptions: [""]
    },
    scope: {
      inScope: ["", "", ""],
      outOfScope: ["", ""],
      future: [emptyFuture()],
      phases: [emptyPhase()],
      decisions: [emptyDecision()],
      changePolicy: "PRD wins on intent. SCOPE wins on boundaries. TECH-SPEC wins on implementation. Then patch the loser so they agree."
    },
    spec: {
      systemGoal: "",
      layers: "",
      stack: "",
      layout: "",
      contracts: "",
      domain: "",
      failures: "",
      security: "",
      pins: "@docs/PRD.md @docs/SCOPE.md @docs/TECH-SPEC.md @docs/ORCHESTRATION.md"
    },
    orch: {
      runtime: "",
      loop: "1. Deconstruct the goal\n2. Assemble pinned context only\n3. Plan against the work unit\n4. HITL or execute\n5. Verify, then integrate",
      rules: "",
      tools: "",
      hitl: [emptyHitl()],
      bootstrap: "",
      checkpoints: "Git commit per green work unit. Revert the WU commit to roll back. Do not rewrite main history."
    },
    units: [EMPTY_WU()]
  };
}

function emptyPersona() { return { name: "", role: "", goals: "", frustrations: "" }; }
function emptyStory() { return { text: "As a **[type of user]**, I want **[some goal]** so that **[some reason]**." }; }
function emptyFlow() { return { name: "", steps: "", edges: "", acceptance: "" }; }
function emptyFeature() { return { name: "", priority: "Critical", acceptance: "" }; }
function emptyTerm() { return { term: "", definition: "" }; }
function emptyQuestion() { return { id: "Q1", text: "" }; }
function emptyFuture() { return { item: "", trigger: "" }; }
function emptyPhase() { return { name: "", entry: "", exit: "" }; }
function emptyDecision() { return { date: "", decision: "", why: "", consequences: "" }; }
function emptyHitl() { return { id: "HITL-01", gate: "", examples: "" }; }

function filled(v) { return typeof v === "string" ? v.trim().length > 0 : Boolean(v); }
function listFilled(list) {
  if (!Array.isArray(list) || list.length === 0) return false;
  return list.some((item) => {
    if (typeof item === "string") return filled(item);
    if (!item || typeof item !== "object") return false;
    return Object.values(item).some((v) => filled(String(v ?? "")));
  });
}

function exampleState() {
  const s = emptyState();
  s.overview = {
    productName: "Slush",
    status: "DRAFT",
    version: "v0.1 Draft",
    type: "tech spec writing tool",
    who: "builders, supervisors, and coding agents",
    goal: "produce a harness-ready DRAFT pack without silent invention",
    byDoing: "guiding PRD, scope, tech spec, orchestration, and work units with completeness checks and markdown export"
  };
  s.prd.problem = "Teams prompt an agent to “build the thing,” but without a canonical spec the agent invents scope, stack, and success. Drift is unreviewable.";
  s.prd.solution = "Slush is a quiet writing workspace that turns the playbook into fields. You leave with markdown a later session can execute one verified work unit at a time.";
  s.prd.valueProps = [
    "Single source of truth before code multiplies",
    "Must-have completeness instead of empty headings",
    "Work units with Verify hooks — vibe coding with stop conditions",
    "Honest unknowns as Q-ids, not fake-locked SLOs"
  ];
  s.prd.businessSuccess = "A stakeholder can approve direction from the exported pack without a meeting transcript.";
  s.prd.userSuccess = "A builder starts a session with “implement WU-00x” and gets a bounded, verifiable change.";
  s.prd.techSuccess = "Every PLAYBOOK must-have is either filled or listed as an open question.";
  s.prd.constraints = "Static site. No secrets in exports. WCAG 2.1 AA. English v0. Autosave in the browser; no account required.";
  s.prd.personas = [
    { name: "Alex", role: "Builder", goals: "Ship slices without rewriting architecture each session", frustrations: "Agents that touch unrelated files" },
    { name: "Sam", role: "Supervisor", goals: "Reviewability and security", frustrations: "Shadow specs in chat" },
    { name: "Riley", role: "Cloud agent", goals: "Complete one WU and stop", frustrations: "Ambiguous “improve the API”" }
  ];
  s.prd.stories = [
    { text: "As a **builder**, I want **a completeness meter on must-haves**, so that **I know when the DRAFT can drive a harness**." },
    { text: "As a **supervisor**, I want **explicit out-of-scope**, so that **PRs cannot quietly expand the product**." },
    { text: "As a **cloud agent**, I want **work units with Verify**, so that **I do not invent structure**." }
  ];
  s.prd.flows = [
    { name: "Write a DRAFT", steps: "Start blank or example → fill Guide steps → watch must-haves tick → export markdown", edges: "Empty required fields stay DRAFT; never auto-lock", acceptance: "Given a new visit, When the user writes P1–P2, Then completeness increases and autosave restores on reload" },
    { name: "Add a work unit", steps: "Open Work units → add WU → fill Verify → export TECH-SPEC", edges: "Missing Verify blocks T7", acceptance: "Exported WU includes Don’t-list and Verify command" },
    { name: "Start a harness session", steps: "Open Export → copy prompt → pin generated files", edges: "If a Q-id is unanswered, prompt forbids silent locks", acceptance: "Prompt cites WU-00x and Don’t expand scope" }
  ];
  s.prd.features = [
    { name: "Guided DRAFT writer", priority: "Critical", acceptance: "Guide mode walks must-have fields; Outline shows a full document" },
    { name: "Markdown pack export", priority: "Critical", acceptance: "Downloads README, PRD, SCOPE, TECH-SPEC, ORCHESTRATION" }
  ];
  s.prd.nfrs = "Performance: local-only, instant field updates.\nSecurity: no secrets in sample text; data stays in localStorage unless exported.\nAccessibility: WCAG 2.1 AA, keyboard, labels, focus rings.\nMaintainability: schema-driven fields.";
  s.prd.glossary = [
    { term: "DRAFT", definition: "Complete skeleton with honest unknowns — not blank, not locked." },
    { term: "Work unit", definition: "Smallest verifiable slice of change." },
    { term: "Harness", definition: "Spec work units + Verify hooks + pin lists + stop rules." }
  ];
  s.prd.questions = [
    { id: "Q1", text: "Should drafts sync via here.now Site Data, or remain local-only?" },
    { id: "Q2", text: "Is a shared team workspace required in v1?" }
  ];
  s.prd.assumptions = ["English-only UI for v0", "GitHub-flavored Markdown export"];
  s.scope.inScope = [
    "Guided writer for PRD, scope, spec, orchestration",
    "Work unit editor with Verify",
    "Must-have completeness checklist",
    "Autosave and markdown export",
    "Deploy at slush.here.now"
  ];
  s.scope.outOfScope = [
    "Accounts and multiplayer editing",
    "Model training",
    "Production app scaffolding from the spec with one click"
  ];
  s.scope.future = [{ item: "Site Data sync", trigger: "Q1 = yes" }];
  s.scope.phases = [
    { name: "Phase 0 — Writer", entry: "Empty repo + playbook", exit: "Live site can export a pack" },
    { name: "Phase 1 — Rules", entry: "Phase 0 exit", exit: "Always-rules exist in the repo" }
  ];
  s.scope.decisions = [
    { date: "2026-09-08", decision: "Static SPA on here.now slug slush", why: "Instant shareable URL; no backend", consequences: "Persistence is local unless exported" }
  ];
  s.spec.systemGoal = "A git-native writing tool whose export is an executable harness. Success: WU-00x in a PR with Verify. Failure: a novel with no work units.";
  s.spec.layers = "0 Source of truth (exported markdown)\n1 Governance (HITL, rules)\n2 Context assembly (pins)\n3 Reasoning (WU plan)\n4 Execution (tools)\n5 Integration (git)";
  s.spec.stack = "Static HTML/CSS/JS. Locked for v0. No framework. here.now static hosting. localStorage.";
  s.spec.layout = "site/index.html\nsite/styles.css\nsite/schema.js\nsite/export.js\nsite/app.js";
  s.spec.contracts = "State JSON in localStorage key slush.spec.v1. Export functions return markdown strings. Completeness = MUST_HAVES passed / total.";
  s.spec.domain = "Project → Documents → Fields / Lists → Work units. Invariants: never reuse WU ids; status DRAFT until must-haves pass.";
  s.spec.failures = "localStorage quota → toast and keep working memory.\nCorrupt JSON → reset after confirm.";
  s.spec.security = "Do not put secrets in fields. Exports are the user’s to share.";
  s.orch.runtime = "Human in the browser writes the spec. Cursor Cloud Agent later executes exported WUs. here.now hosts the static tool.";
  s.orch.rules = "always: no secrets, implement only named WU, do not lock Q-ids.\nmanual: freeze-public-api";
  s.orch.tools = "Browser: this app.\nAgent: edit, test, ManagePullRequest. No surprise MCP.";
  s.orch.hitl = [
    { id: "HITL-01", gate: "Scope expansion", examples: "New user-facing feature not in SCOPE" },
    { id: "HITL-03", gate: "Secrets", examples: "New env vars, key material" }
  ];
  s.orch.bootstrap = "1. Write pack in Slush\n2. Export markdown into docs/\n3. Add .cursor/rules\n4. Implement WU-001 with Verify\n5. Do not scaffold an app until a CAP says so";
  s.units = [
    {
      id: "WU-000",
      title: "Ship Slush writer",
      goal: "Publish a working spec writer at slush.here.now",
      dependsOn: "none",
      pins: "@site/index.html @docs/PLAYBOOK.md",
      files: "create site/* ; edit README.md",
      dont: "Add accounts, add a JS framework, commit secrets",
      acceptance: "Given a blank draft, When the user fills P1 and exports, Then markdown contains the one-line framing",
      verify: "Open the site, type a product name, reload, confirm it remains, download PRD.md",
      doneWhen: "Live URL serves the writer; completeness and export work"
    }
  ];
  return s;
}
