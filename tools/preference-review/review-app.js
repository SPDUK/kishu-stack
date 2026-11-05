(function () {
  "use strict";
  const catalog = JSON.parse(document.getElementById("catalog").textContent);
  const core = ReviewCore;
  const index = core.indexCatalog(catalog);
  const $ = id => document.getElementById(id);
  const storageKey = "kishu-preference-review-v1";
  const perPage = 25;
  let entries = Object.create(null), unresolved = [], selected = null, page = 0, view = "guide", finding = null, toastTimer, preserveUnreadableStorage = false;
  let visible = [];
  const filters = { query: "", edition: "current", group: "", source: "", status: "", finding: false };
  const sections = catalog.sections;

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function button(text, action, className) {
    const node = element("button", text, className);
    node.type = "button";
    node.addEventListener("click", action);
    return node;
  }
  function link(text, url) {
    const node = element("a", text);
    node.href = url; node.target = "_blank"; node.rel = "noopener noreferrer";
    return node;
  }
  function toast(message) {
    $("toast").textContent = message; $("toast").hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { $("toast").hidden = true; }, 6500);
  }
  function snapshot() { return core.exportReview(catalog, entries, unresolved); }
  function stats() {
    const count = Object.values(entries).filter(core.touched).length;
    $("feedback-stats").textContent = count ? `${count} instruction${count === 1 ? "" : "s"} with feedback` : "No feedback yet";
  }
  function persist() {
    stats();
    if (preserveUnreadableStorage) {
      $("save-status").textContent = "Export new notes before closing";
      return;
    }
    try {
      localStorage.setItem(storageKey, JSON.stringify(snapshot()));
      $("save-status").textContent = "Saved in this browser · export to share";
      $("storage-warning").hidden = true;
    } catch (_) {
      $("save-status").textContent = "Not saved to browser storage";
      $("storage-warning").textContent = "Browser storage is unavailable or full. Your feedback is still on this page; export it before closing or reloading.";
      $("storage-warning").hidden = false;
    }
  }
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const restored = core.importReview(catalog, JSON.parse(saved));
      entries = restored.entries; unresolved = restored.unresolved;
      $("save-status").textContent = "Restored from this browser";
    }
  } catch (_) {
    preserveUnreadableStorage = true;
    $("storage-warning").textContent = "Saved feedback could not be restored. Autosave is disabled to preserve it. Export any new notes before closing; you can also import a valid backup.";
    $("storage-warning").hidden = false;
  }

  function setView(next) {
    view = next;
    for (const name of ["guide", "rules", "feedback", "coverage"]) $("view-" + name).hidden = name !== view;
    for (const node of document.querySelectorAll("nav button")) {
      if (node.dataset.view === view) node.setAttribute("aria-current", "page"); else node.removeAttribute("aria-current");
    }
    if (view === "rules") renderRules();
    if (view === "feedback") renderFeedback();
    if (view === "coverage") renderCoverage();
  }
  function openFinding(item) {
    resetFilters(false);
    filters.edition = "all"; $("edition").value = "all";
    filters.finding = true; finding = item; selected = item.ruleIds[0];
    setView("rules");
    $("main").scrollIntoView({ behavior: "instant" });
  }
  function renderGuide() {
    const container = $("guide-content"); container.replaceChildren();
    for (const section of sections) {
      const heading = element("div", undefined, "section-heading");
      heading.append(element("h2", section.title), element("p", section.note, "muted")); container.append(heading);
      const grid = element("div", undefined, "guide-grid");
      for (const id of section.ids) {
        const item = catalog.findings.find(value => value.id === id);
        const card = element("article", undefined, "guide-card");
        const top = element("div", undefined, "card-top");
        top.append(element("span", item.kind, "pill" + (item.kind.startsWith("Enforced") ? " warn" : "")), element("span", `${item.ruleIds.length} source blocks`, "step"));
        card.append(top, element("h3", item.title), element("p", item.meaning), element("p", item.effect, "muted"));
        const detail = element("details"); detail.append(element("summary", "A suggestion to consider"), element("p", item.suggestion));
        card.append(detail);
        const actions = element("div", undefined, "actions"); actions.append(button("Read rules & leave feedback", () => openFinding(item)));
        card.append(actions); grid.append(card);
      }
      container.append(grid);
      if (!section.ids.length) container.append(button("Explore all instructions", () => { resetFilters(false); setView("rules"); }, "primary"));
    }
  }
  function syncFilters() {
    for (const id of ["query", "edition", "group", "source", "status"]) filters[id] = $(id).value;
  }
  function resetFilters(render = true) {
    Object.assign(filters, { query: "", edition: "current", group: "", source: "", status: "", finding: false });
    for (const id of ["query", "edition", "group", "source", "status"]) $(id).value = filters[id];
    finding = null; page = 0; selected = null;
    if (render) renderRules();
  }
  function preview(rule) {
    const text = rule.text.replace(/^---\n[\s\S]*?description:\s*/, "").replace(/[*`#]/g, "").replace(/\n/g, " ").trim();
    return text.length > 150 ? text.slice(0, 147) + "…" : text;
  }
  function renderRules() {
    const ids = new Set(finding?.ruleIds || []);
    visible = catalog.rules.filter(rule => {
      if (filters.query.trim() === rule.id) return core.matches(rule, index.sources.get(rule.source), { ...filters, query: "" }, entries, ids);
      return core.matches(rule, index.sources.get(rule.source), filters, entries, ids);
    });
    if (!visible.some(rule => rule.id === selected)) selected = visible[0]?.id || null;
    page = Math.min(page, Math.max(0, Math.ceil(visible.length / perPage) - 1));
    $("guidance-focus").hidden = !finding;
    if (finding) {
      $("guidance-focus").replaceChildren(element("strong", finding.title), element("p", finding.meaning), element("p", finding.effect, "muted"), button("Show all instructions", () => resetFilters()));
    }
    $("result-count").textContent = `${visible.length.toLocaleString()} source blocks`;
    $("page-label").textContent = visible.length ? `${page + 1} / ${Math.ceil(visible.length / perPage)}` : "";
    $("previous-page").disabled = page === 0;
    $("next-page").disabled = (page + 1) * perPage >= visible.length;
    const list = $("rule-list"); list.replaceChildren();
    for (const rule of visible.slice(page * perPage, (page + 1) * perPage)) {
      const source = index.sources.get(rule.source);
      const row = button("", () => { selected = rule.id; renderRules(); }, "rule-button");
      row.setAttribute("aria-pressed", String(rule.id === selected)); row.dataset.ruleId = rule.id;
      row.append(element("span", source.title, "small muted"), element("span", preview(rule), "preview"));
      if (core.touched(entries[rule.id])) row.append(element("span", entries[rule.id].decision === "Unreviewed" ? "Note added" : entries[rule.id].decision, "status"));
      list.append(row);
    }
    if (!visible.length) list.append(element("p", "No instructions match these filters.", "empty"));
    renderDetail();
  }
  function renderDetail() {
    const detail = $("detail"); detail.replaceChildren();
    if (!selected) { detail.append(element("p", "Try clearing a filter or searching for different words.", "empty")); return; }
    const rule = index.rules.get(selected), source = index.sources.get(rule.source);
    const badges = element("div", undefined, "scope");
    badges.append(element("span", source.origin, "pill"), element("span", source.edition === "replaced" ? "Replaced upstream" : source.scope, "pill"));
    detail.append(badges, element("h2", source.title), element("p", source.note, "source-context"), element("p", rule.section, "label"));
    const links = element("div", undefined, "source-links");
    links.append(link("Exact source ↗", source.url + "#L" + rule.start));
    if (source.upstreamUrl && source.upstreamUrl !== source.url) links.append(link("Original upstream file ↗", source.upstreamUrl));
    const siblingKey = source.key.startsWith("current:") ? source.key.replace(/^current:/, "upstream:") : source.key.startsWith("upstream:") ? source.key.replace(/^upstream:/, "current:") : null;
    const sibling = catalog.sources.find(item => item.key === siblingKey);
    if (sibling) links.append(button(source.edition === "replaced" ? "Read current version" : "Compare original version", () => { resetFilters(false); filters.edition = "all"; filters.source = sibling.id; $("edition").value = "all"; $("source").value = sibling.id; selected = sibling.ruleIds[0]; renderRules(); }));
    detail.append(links, element("p", `${source.path}:${rule.start} · ${rule.id}`, "small muted rule-path"), element("pre", rule.text, "exact"));
    const grid = element("div", undefined, "feedback-grid");
    const choiceLabel = element("label", "Your decision", "label"); choiceLabel.htmlFor = "decision";
    const choiceWrap = element("div"); const select = element("select"); select.id = "decision";
    for (const choice of core.choices) select.append(new Option(choice, choice));
    const entry = entries[rule.id] || { decision: "Unreviewed", feedback: "", proposed: "" }; select.value = entry.decision;
    choiceWrap.append(choiceLabel, select);
    grid.append(choiceWrap, element("p", "A note is enough. You do not need to rewrite the rule or review every item.", "small muted")); detail.append(grid);
    const noteLabel = element("label", "What should stay or change?", "label"); noteLabel.htmlFor = "feedback-note";
    const note = element("textarea", undefined, "note-text"); note.id = "feedback-note"; note.placeholder = "e.g. Keep measurement honest, but only run a full benchmark when performance is part of the task."; note.value = entry.feedback;
    const proposedLabel = element("label", "Preferred behavior or wording (optional)", "label"); proposedLabel.htmlFor = "proposed-note";
    const proposed = element("textarea", undefined, "proposed-text"); proposed.id = "proposed-note"; proposed.placeholder = "When should it apply? Any exceptions or examples?"; proposed.value = entry.proposed;
    detail.append(noteLabel, note, proposedLabel, proposed);
    function saveEntry() {
      entries[rule.id] = { decision: select.value, feedback: note.value, proposed: proposed.value, updated: new Date().toISOString() };
      persist();
      const row = [...$("rule-list").children].find(node => node.dataset.ruleId === rule.id);
      if (row) {
        row.querySelector(".status")?.remove();
        if (core.touched(entries[rule.id])) row.append(element("span", select.value === "Unreviewed" ? "Note added" : select.value, "status"));
      }
    }
    select.addEventListener("change", saveEntry); note.addEventListener("input", saveEntry); proposed.addEventListener("input", saveEntry);
    const context = element("details", undefined, "context"); context.append(element("summary", "Read surrounding instructions"));
    context.addEventListener("toggle", () => {
      if (!context.open || context.children.length > 1) return;
      const position = source.ruleIds.indexOf(rule.id);
      for (const id of source.ruleIds.slice(Math.max(0, position - 2), position + 3)) {
        const siblingRule = index.rules.get(id); const block = element("div", undefined, "context-item");
        block.append(element("p", `${siblingRule.section} · line ${siblingRule.start}`), element("pre", siblingRule.text, "exact"));
        if (id !== rule.id) block.append(button("Leave feedback on this block", () => openRule(id)));
        context.append(block);
      }
    }); detail.append(context);
    const actions = element("div", undefined, "actions"); actions.style.marginTop = "20px";
    actions.append(button("Next instruction", () => { const at = visible.findIndex(item => item.id === rule.id); const next = visible[at + 1]; if (next) { selected = next.id; page = Math.floor((at + 1) / perPage); renderRules(); } else toast("You reached the last matching instruction."); }));
    detail.append(actions);
  }
  function openRule(id) {
    resetFilters(false); filters.edition = "all"; $("edition").value = "all";
    const rule = index.rules.get(id); filters.source = rule.source; $("source").value = rule.source; selected = id;
    page = Math.floor(index.sources.get(rule.source).ruleIds.indexOf(id) / perPage); setView("rules");
  }
  function renderFeedback() {
    const content = $("feedback-content"); content.replaceChildren(); const review = snapshot();
    if (!review.feedback.length) content.append(element("p", "No decisions yet. Start with a guided topic or browse the instructions.", "empty"));
    for (const item of review.feedback) {
      const rule = index.rules.get(item.id), source = index.sources.get(rule.source), card = element("article", undefined, "feedback-card");
      card.append(element("span", item.decision === "Unreviewed" ? "Note added" : item.decision, "pill"), element("h3", source.title), element("p", `${item.id} · ${item.section}`, "small muted"), element("p", item.feedback || "No note supplied."));
      if (item.proposed) card.append(element("p", "Preferred behavior: " + item.proposed));
      card.append(button("Edit this feedback", () => openRule(item.id))); content.append(card);
    }
    if (unresolved.length) {
      const panel = element("div", undefined, "banner warning"); panel.append(element("strong", `${unresolved.length} imported entries need reconciliation`), element("p", "Changed, missing, or conflicting feedback was preserved without overwriting current notes. It remains in both exports."));
      for (const item of unresolved) { const details = element("details"); details.append(element("summary", item.reason), element("pre", JSON.stringify(item.entry, null, 2), "exact")); panel.append(details); }
      content.append(panel);
    }
  }
  let coverageRendered = false;
  function renderCoverage() {
    if (coverageRendered) return; coverageRendered = true;
    const included = catalog.coverage.filter(item => item.status === "included").length;
    $("coverage-summary").textContent = `${catalog.coverage.length} files inventoried · ${included} included · ${catalog.coverage.length - included} excluded with reasons · ${catalog.sources.length} source views · ${catalog.rules.length.toLocaleString()} reviewable blocks. All nonblank nonheading lines in included sources are accounted for, with the router's communication/design sections explicitly excluded.`;
    const table = element("table", undefined, "coverage-table"), head = element("thead"), row = element("tr");
    for (const label of ["Source file", "Coverage", "Reason / open"]) row.append(element("th", label)); head.append(row); table.append(head);
    const body = element("tbody");
    for (const item of catalog.coverage) {
      const tr = element("tr"); tr.append(element("td", item.path), element("td", item.status)); const cell = element("td", item.reason);
      if (item.sources.length) cell.append(button("Read", () => openRule(index.sources.get(item.sources[0]).ruleIds[0])));
      tr.append(cell); body.append(tr);
    }
    table.append(body); $("coverage-content").append(table);
  }
  function download(filename, content, type) {
    const url = URL.createObjectURL(new Blob([content], { type })); const anchor = document.createElement("a");
    anchor.href = url; anchor.download = filename; document.body.append(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
  $("export-md").addEventListener("click", () => { download("kishu-feedback.md", core.markdown(snapshot()), "text/markdown;charset=utf-8"); toast("Feedback exported. Give kishu-feedback.md back to Codex when ready."); });
  $("export-json").addEventListener("click", () => { download("kishu-feedback.json", JSON.stringify(snapshot(), null, 2), "application/json"); toast("Backup exported. Import this JSON to resume on another browser."); });
  $("import-button").addEventListener("click", () => $("import-file").click());
  $("import-file").addEventListener("change", async event => {
    const file = event.target.files[0]; if (!file) return;
    try {
      const result = core.importReview(catalog, JSON.parse(await file.text()), entries, unresolved);
      entries = result.entries; unresolved = result.unresolved; persist(); setView("feedback");
      toast(`Imported ${result.added} entries. ${unresolved.length} preserved for reconciliation.`);
    } catch (error) { toast(error.message); }
    event.target.value = "";
  });
  for (const node of document.querySelectorAll("nav button")) node.addEventListener("click", () => setView(node.dataset.view));
  $("browse-all").addEventListener("click", () => { resetFilters(false); setView("rules"); });
  $("clear-filters").addEventListener("click", () => resetFilters());
  for (const group of [...new Set(catalog.sources.map(source => source.group))].sort()) $("group").append(new Option(group, group));
  for (const source of [...catalog.sources].sort((a, b) => a.title.localeCompare(b.title))) $("source").append(new Option(`${source.title} (${source.edition})`, source.id));
  for (const id of ["query", "edition", "group", "source", "status"]) $(id).addEventListener(id === "query" ? "input" : "change", () => { syncFilters(); page = 0; renderRules(); });
  $("previous-page").addEventListener("click", () => { page -= 1; selected = visible[page * perPage]?.id; renderRules(); });
  $("next-page").addEventListener("click", () => { page += 1; selected = visible[page * perPage]?.id; renderRules(); });
  $("footer").textContent = `Kishu ${catalog.version} · pstack ${catalog.upstreamCommit.slice(0, 12)} · source content ${catalog.kishuSourceHash.slice(0, 12)}. This page preserves exact text offline; Kishu source links open current main on GitHub. Browser saving is local to this browser and address. Export a backup for durable transfer. No preferences are applied here.`;
  stats(); renderGuide();
  const linkedRule = location.hash.slice(1);
  if (index.rules.has(linkedRule)) openRule(linkedRule);
})();
