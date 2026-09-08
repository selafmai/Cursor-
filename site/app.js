(() => {
  const $ = (sel, el = document) => el.querySelector(sel);
  const main = $("#main");
  const rail = $("#rail");
  const aside = $("#aside");
  const shell = $("#shell");
  const topMeta = $("#top-meta");
  const topActions = $("#top-actions");
  const statusPill = $("#status-pill");
  const completenessLabel = $("#completeness-label");
  const completenessRing = $("#completeness-ring");
  const btnGuide = $("#btn-guide");
  const btnOutline = $("#btn-outline");

  let state = loadState();
  let mode = "guide";
  let guideIndex = 0;
  let exportTab = "PRD.md";

  const GUIDE_STEPS = flattenGuide();

  function flattenGuide() {
    const steps = [];
    for (const doc of ["overview", "prd", "scope", "spec", "orch"]) {
      for (const field of FIELDS[doc]) steps.push({ doc, field });
    }
    steps.push({ doc: "units", field: { type: "units" } });
    return steps;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyState();
      return deepMerge(emptyState(), JSON.parse(raw));
    } catch {
      return emptyState();
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    renderChrome();
  }

  function deepMerge(base, extra) {
    if (Array.isArray(base)) return Array.isArray(extra) ? extra : base;
    if (base && typeof base === "object") {
      const out = { ...base };
      Object.keys(extra || {}).forEach((k) => {
        out[k] = extra[k] && typeof extra[k] === "object" && !Array.isArray(extra[k])
          ? deepMerge(base[k] || {}, extra[k])
          : extra[k];
      });
      return out;
    }
    return extra ?? base;
  }

  function getPath(path) {
    return path.split(".").reduce((acc, k) => (acc == null ? acc : acc[k]), state);
  }
  function setPath(path, value) {
    const parts = path.split(".");
    let cur = state;
    for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
    cur[parts[parts.length - 1]] = value;
    saveState();
  }

  function completeness() {
    const passed = MUST_HAVES.filter((m) => m.test(state)).length;
    return { passed, total: MUST_HAVES.length, pct: Math.round((passed / MUST_HAVES.length) * 100) };
  }

  function toast(msg) {
    let t = $(".toast");
    if (!t) {
      t = document.createElement("div");
      t.className = "toast";
      t.setAttribute("role", "status");
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 1800);
  }

  function route() {
    const hash = (location.hash || "#/").replace(/^#/, "");
    const parts = hash.split("/").filter(Boolean);
    if (parts[0] === "write") return { name: "write", doc: parts[1] || "overview" };
    if (parts[0] === "export") return { name: "export" };
    return { name: "home" };
  }

  function render() {
    const r = route();
    const inWorkspace = r.name !== "home";
    rail.hidden = !inWorkspace;
    aside.hidden = !inWorkspace;
    topMeta.hidden = !inWorkspace;
    topActions.hidden = !inWorkspace;
    shell.classList.toggle("has-nav", inWorkspace);
    shell.classList.toggle("has-aside", inWorkspace && r.name !== "export");
    if (r.name === "home") renderHome();
    else if (r.name === "export") renderExport();
    else renderWrite(r.doc);
    renderChrome();
    renderRail(r);
    if (inWorkspace && r.name !== "export") renderAside();
  }

  function renderChrome() {
    const { pct } = completeness();
    completenessLabel.textContent = `${pct}% ready`;
    completenessRing.style.background = `conic-gradient(var(--accent) ${pct * 3.6}deg, var(--line) 0deg)`;
    statusPill.textContent = state.overview.status || "DRAFT";
    btnGuide.setAttribute("aria-pressed", String(mode === "guide"));
    btnOutline.setAttribute("aria-pressed", String(mode === "outline"));
  }

  function renderRail(r) {
    const mobileNav = $("#mobile-nav");
    if (mobileNav) {
      const want = r.name === "export" ? "#/export" : `#/write/${r.doc}`;
      if ([...mobileNav.options].some((o) => o.value === want)) mobileNav.value = want;
    }
    rail.querySelectorAll("a").forEach((a) => {
      const href = a.getAttribute("href");
      const active = (r.name === "write" && href === `#/write/${r.doc}`) || (r.name === "export" && href === "#/export");
      a.classList.toggle("active", active);
      if (active) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  function renderAside() {
    const items = MUST_HAVES.map((m) => {
      const done = m.test(state);
      return `<li class="${done ? "done" : ""}"><span class="dot"></span><span><code>${m.id}</code> ${esc(m.label)}</span></li>`;
    }).join("");
    aside.innerHTML = `<h2>Must-haves</h2><ol>${items}</ol>`;
  }

  function renderHome() {
    main.innerHTML = `
      <section class="hero">
        <p class="kicker">here.now · slush</p>
        <h1>Write the spec.<br />Then vibe-code it.</h1>
        <p class="lede">A quiet workspace for a harness-ready DRAFT: PRD, scope, tech spec, orchestration, and work units with Verify hooks. Completeness is visible. Unknowns stay numbered.</p>
        <div class="hero-actions">
          <button type="button" class="btn solid" id="start-blank">Start a blank draft</button>
          <button type="button" class="btn ghost" id="start-example">Load the playbook example</button>
          ${hasContent() ? `<a class="btn ghost" href="#/write/overview">Continue draft</a>` : ""}
        </div>
        <p class="hero-note">Autosaves in this browser. Export markdown when you are ready to pin files for an agent.</p>
      </section>
      <div class="cards">
        <article class="card"><h3>Goal, not process</h3><p>One-line framing first. Constraints and examples before a pile of tasks.</p></article>
        <article class="card"><h3>Must-have DRAFT</h3><p>Empty headings do not count. The checklist is the playbook’s required sections.</p></article>
        <article class="card"><h3>Work units</h3><p>Each slice names files, a Don’t-list, and a Verify command. That is the harness.</p></article>
      </div>`;
    $("#start-blank").onclick = () => {
      state = emptyState();
      saveState();
      mode = "guide";
      guideIndex = 0;
      location.hash = "#/write/overview";
    };
    $("#start-example").onclick = () => {
      state = exampleState();
      saveState();
      mode = "outline";
      location.hash = "#/write/overview";
      toast("Example loaded");
    };
  }

  function hasContent() {
    return filled(state.overview.productName) || filled(state.prd.problem);
  }

  function renderWrite(docId) {
    const doc = DOCS.find((d) => d.id === docId) || DOCS[0];
    if (mode === "guide") renderGuide(docId, doc);
    else renderOutline(docId, doc);
  }

  function renderGuide(docId, doc) {
    const idxs = GUIDE_STEPS.map((s, i) => ({ s, i })).filter(({ s }) => s.doc === docId);
    if (!idxs.length) return renderOutline(docId, doc);
    if (!GUIDE_STEPS[guideIndex] || GUIDE_STEPS[guideIndex].doc !== docId) {
      guideIndex = idxs[0].i;
    }
    const step = GUIDE_STEPS[guideIndex];
    const pos = idxs.findIndex(({ i }) => i === guideIndex) + 1;
    main.innerHTML = `
      <p class="kicker">${esc(doc.kicker)} · Guide ${pos} of ${idxs.length}</p>
      <h1 class="doc-title">${esc(doc.title)}</h1>
      <p class="help">${esc(doc.help)}</p>
      <div id="fields"></div>
      <div class="pager">
        <button type="button" class="btn ghost" id="prev" ${guideIndex <= idxs[0].i ? "disabled" : ""}>Back</button>
        <button type="button" class="btn solid" id="next">${pos === idxs.length ? "Next document" : "Next"}</button>
      </div>`;
    const mount = $("#fields");
    if (step.field.type === "units") mount.appendChild(renderUnits());
    else mount.appendChild(renderField(step.field));
    $("#prev").onclick = () => { guideIndex = Math.max(idxs[0].i, guideIndex - 1); render(); };
    $("#next").onclick = () => {
      const last = idxs[idxs.length - 1].i;
      if (guideIndex >= last) {
        const order = ["overview", "prd", "scope", "spec", "orch", "units"];
        const n = order[order.indexOf(docId) + 1];
        if (n) {
          location.hash = `#/write/${n}`;
          const nextIdx = GUIDE_STEPS.findIndex((s) => s.doc === n);
          if (nextIdx >= 0) guideIndex = nextIdx;
        } else location.hash = "#/export";
      } else {
        guideIndex += 1;
        render();
      }
    };
  }

  function renderOutline(docId, doc) {
    main.innerHTML = `
      <p class="kicker">${esc(doc.kicker)} · Outline</p>
      <h1 class="doc-title">${esc(doc.title)}</h1>
      <p class="help">${esc(doc.help)}</p>
      <div id="fields"></div>`;
    const mount = $("#fields");
    if (docId === "units") mount.appendChild(renderUnits());
    else FIELDS[docId].forEach((f) => mount.appendChild(renderField(f)));
  }

  function renderField(field) {
    const wrap = document.createElement("div");
    wrap.className = "field";
    if (field.type === "list") {
      wrap.innerHTML = `<label>${esc(field.label)}</label>${field.why ? `<span class="why">${esc(field.why)}</span>` : ""}`;
      wrap.appendChild(renderList(field));
      return wrap;
    }
    const id = "f-" + field.path.replace(/\./g, "-");
    const val = getPath(field.path) ?? "";
    wrap.innerHTML = `<label for="${id}">${esc(field.label)}</label>
      ${field.why ? `<span class="why">${esc(field.why)}</span>` : ""}`;
    let control;
    if (field.type === "textarea") {
      control = document.createElement("textarea");
      if (field.tall) control.classList.add("tall");
      if (field.mono) control.style.fontFamily = "var(--mono)";
    } else if (field.type === "select") {
      control = document.createElement("select");
      field.options.forEach((opt) => {
        const o = document.createElement("option");
        o.value = opt; o.textContent = opt;
        control.appendChild(o);
      });
    } else {
      control = document.createElement("input");
      control.type = "text";
    }
    control.id = id;
    control.value = val;
    if (field.placeholder) control.placeholder = field.placeholder;
    control.addEventListener("input", () => setPath(field.path, control.value));
    wrap.appendChild(control);
    return wrap;
  }

  function renderList(field) {
    const box = document.createElement("div");
    box.className = "list-block";
    const items = getPath(field.path) || [];
    items.forEach((_, i) => box.appendChild(renderListItem(field, i, items.length)));
    const add = document.createElement("button");
    add.type = "button";
    add.className = "btn ghost tiny";
    add.textContent = field.add || "Add";
    add.onclick = () => {
      const list = getPath(field.path);
      list.push(newListItem(field.item));
      saveState();
      render();
    };
    box.appendChild(add);
    return box;
  }

  function newListItem(kind) {
    if (kind === "text") return "";
    if (kind === "persona") return emptyPersona();
    if (kind === "story") return emptyStory();
    if (kind === "flow") return emptyFlow();
    if (kind === "feature") return emptyFeature();
    if (kind === "term") return emptyTerm();
    if (kind === "question") {
      const n = (state.prd.questions || []).length + 1;
      return { id: `Q${n}`, text: "" };
    }
    if (kind === "future") return emptyFuture();
    if (kind === "phase") return emptyPhase();
    if (kind === "decision") return emptyDecision();
    if (kind === "hitl") {
      const n = String((state.orch.hitl || []).length + 1).padStart(2, "0");
      return { id: `HITL-${n}`, gate: "", examples: "" };
    }
    return {};
  }

  function renderListItem(field, i, len) {
    const item = (getPath(field.path) || [])[i];
    const el = document.createElement("div");
    el.className = "list-item";
    const head = document.createElement("div");
    head.className = "list-head";
    head.innerHTML = `<strong>${esc(field.item === "text" ? `Item ${i + 1}` : labelForItem(field.item, item, i))}</strong>`;
    const rm = document.createElement("button");
    rm.type = "button";
    rm.className = "btn tiny danger";
    rm.textContent = "Remove";
    rm.disabled = len <= minLen(field);
    rm.onclick = () => {
      getPath(field.path).splice(i, 1);
      saveState();
      render();
    };
    head.appendChild(rm);
    el.appendChild(head);
    el.appendChild(innerFields(field, i, item));
    return el;
  }

  function minLen(field) {
    if (field.path.includes("personas")) return 2;
    if (field.path.includes("stories") || field.path.includes("flows")) return 3;
    return 0;
  }

  function labelForItem(kind, item, i) {
    if (kind === "persona") return item.name || `Persona ${i + 1}`;
    if (kind === "story") return `Story ${i + 1}`;
    if (kind === "flow") return item.name || `Flow ${i + 1}`;
    if (kind === "feature") return item.name || `Feature ${i + 1}`;
    if (kind === "term") return item.term || `Term ${i + 1}`;
    if (kind === "question") return item.id || `Q${i + 1}`;
    if (kind === "phase") return item.name || `Phase ${i + 1}`;
    if (kind === "decision") return item.decision || `Decision ${i + 1}`;
    if (kind === "hitl") return item.id || `HITL ${i + 1}`;
    if (kind === "future") return item.item || `Later ${i + 1}`;
    return `Item ${i + 1}`;
  }

  function innerFields(field, i, item) {
    const wrap = document.createElement("div");
    const bind = (key, label, type = "text") => {
      const f = document.createElement("div");
      f.className = "field";
      const id = `l-${field.path}-${i}-${key}`.replace(/\./g, "-");
      f.innerHTML = `<label for="${id}">${esc(label)}</label>`;
      const c = type === "textarea" ? document.createElement("textarea") : document.createElement("input");
      if (c.tagName === "INPUT") c.type = "text";
      c.id = id;
      c.value = typeof item === "string" ? item : (item[key] || "");
      c.addEventListener("input", () => {
        const list = getPath(field.path);
        if (typeof list[i] === "string") list[i] = c.value;
        else list[i][key] = c.value;
        saveState();
      });
      f.appendChild(c);
      wrap.appendChild(f);
    };
    switch (field.item) {
      case "text": bind(null, "Text", "textarea"); break;
      case "persona": bind("name", "Name"); bind("role", "Role"); bind("goals", "Goals", "textarea"); bind("frustrations", "Frustrations", "textarea"); break;
      case "story": bind("text", "As a / I want / so that", "textarea"); break;
      case "flow": bind("name", "Workflow name"); bind("steps", "Steps", "textarea"); bind("edges", "Edge cases", "textarea"); bind("acceptance", "Acceptance", "textarea"); break;
      case "feature": bind("name", "Feature name"); bind("priority", "Priority"); bind("acceptance", "Acceptance", "textarea"); break;
      case "term": bind("term", "Term"); bind("definition", "Definition", "textarea"); break;
      case "question": bind("id", "ID"); bind("text", "Question", "textarea"); break;
      case "future": bind("item", "Item"); bind("trigger", "Trigger"); break;
      case "phase": bind("name", "Phase name"); bind("entry", "Entry"); bind("exit", "Exit"); break;
      case "decision": bind("date", "Date"); bind("decision", "Decision"); bind("why", "Why"); bind("consequences", "Consequences"); break;
      case "hitl": bind("id", "ID"); bind("gate", "Gate"); bind("examples", "Examples"); break;
      default: break;
    }
    return wrap;
  }

  function renderUnits() {
    const wrap = document.createElement("div");
    wrap.className = "wu-grid";
    (state.units || []).forEach((u, i) => {
      const card = document.createElement("div");
      card.className = "list-item";
      card.innerHTML = `<div class="list-head"><strong>${esc(u.id || "New work unit")}</strong></div>`;
      const rm = document.createElement("button");
      rm.type = "button";
      rm.className = "btn tiny danger";
      rm.textContent = "Remove";
      rm.onclick = () => { state.units.splice(i, 1); if (!state.units.length) state.units.push(EMPTY_WU()); saveState(); render(); };
      card.querySelector(".list-head").appendChild(rm);
      const fields = [
        ["id", "ID", "text"],
        ["title", "Title (verb + object)", "text"],
        ["goal", "Goal", "textarea"],
        ["dependsOn", "Depends on", "text"],
        ["pins", "Pins (@files)", "text"],
        ["files", "Files to touch", "textarea"],
        ["dont", "Don’t", "textarea"],
        ["acceptance", "Acceptance (Given / When / Then)", "textarea"],
        ["verify", "Verify command", "text"],
        ["doneWhen", "Done when", "textarea"]
      ];
      fields.forEach(([key, label, type]) => {
        const f = document.createElement("div");
        f.className = "field";
        const id = `wu-${i}-${key}`;
        f.innerHTML = `<label for="${id}">${esc(label)}</label>`;
        const c = type === "textarea" ? document.createElement("textarea") : document.createElement("input");
        if (c.tagName === "INPUT") c.type = "text";
        c.id = id;
        c.value = u[key] || "";
        c.addEventListener("input", () => { state.units[i][key] = c.value; saveState(); });
        f.appendChild(c);
        card.appendChild(f);
      });
      wrap.appendChild(card);
    });
    const add = document.createElement("button");
    add.type = "button";
    add.className = "btn ghost";
    add.textContent = "Add work unit";
    add.onclick = () => {
      const n = (state.units.length + 1).toString().padStart(3, "0");
      const wu = EMPTY_WU();
      wu.id = `WU-${n}`;
      state.units.push(wu);
      saveState();
      render();
    };
    wrap.appendChild(add);
    return wrap;
  }

  function renderExport() {
    aside.hidden = true;
    shell.classList.remove("has-aside");
    const files = allExports(state);
    const names = Object.keys(files);
    if (!names.includes(exportTab)) exportTab = names[0];
    const { passed, total, pct } = completeness();
    main.innerHTML = `
      <p class="kicker">Export</p>
      <h1 class="doc-title">Pin these files</h1>
      <p class="help">${pct}% of must-haves are filled (${passed}/${total}). Download the pack, drop it in <code>docs/</code>, and start the next session on one work unit.</p>
      <div class="export-bar">
        <button type="button" class="btn solid" id="dl-all">Download all markdown</button>
        <button type="button" class="btn ghost" id="dl-one">Download this file</button>
        <button type="button" class="btn ghost" id="copy-prompt">Copy harness prompt</button>
        <button type="button" class="btn ghost" id="copy-file">Copy this file</button>
        <button type="button" class="btn ghost danger" id="reset">Reset draft</button>
      </div>
      <div class="tabs" id="tabs">${names.map((n) => `<button type="button" class="btn ghost tiny ${n === exportTab ? "active" : ""}" data-tab="${esc(n)}">${esc(n)}</button>`).join("")}</div>
      <pre class="preview" id="preview">${esc(files[exportTab])}</pre>`;
    $("#tabs").onclick = (e) => {
      const b = e.target.closest("[data-tab]");
      if (!b) return;
      exportTab = b.dataset.tab;
      renderExport();
    };
    $("#dl-all").onclick = () => { downloadAll(state); toast("Downloading pack"); };
    $("#dl-one").onclick = () => { downloadText(exportTab, files[exportTab]); toast("Downloaded " + exportTab); };
    $("#copy-file").onclick = async () => { await navigator.clipboard.writeText(files[exportTab]); toast("Copied " + exportTab); };
    $("#copy-prompt").onclick = async () => { await navigator.clipboard.writeText(files["HARNESS-PROMPT.md"]); toast("Prompt copied"); };
    $("#reset").onclick = () => {
      if (confirm("Reset this browser draft? Exports already downloaded are kept.")) {
        state = emptyState();
        saveState();
        location.hash = "#/";
      }
    };
  }

  function esc(str) {
    return String(str ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  btnGuide.onclick = () => { mode = "guide"; render(); };
  btnOutline.onclick = () => { mode = "outline"; render(); };
  $("#mobile-nav")?.addEventListener("change", (e) => { location.hash = e.target.value; });
  window.addEventListener("hashchange", render);
  render();
})();
