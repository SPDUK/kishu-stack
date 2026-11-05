const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const core = require("./review-core.js");
const catalog = JSON.parse(fs.readFileSync(path.join(__dirname, "../../docs/preference-review/catalog.json"), "utf8"));
const rule = catalog.rules.find(item => item.text.includes("**Verification.** Tests alone"));
const note = { decision: "Only on request", feedback: "Keep useful checks, avoid ten lanes by default.", proposed: "Choose lanes for the actual change.", updated: "2026-11-03T00:00:00Z" };

test("feedback survives export/import with exact instruction and source provenance", () => {
  const exported = core.exportReview(catalog, { [rule.id]: note });
  assert.equal(exported.feedback.length, 1);
  assert.equal(exported.feedback[0].exactText, rule.text);
  assert.equal(exported.feedback[0].line, rule.start);
  assert.equal(exported.kishuSourceHash, catalog.kishuSourceHash);
  assert.deepEqual(core.importReview(catalog, JSON.parse(JSON.stringify(exported))).entries[rule.id], note);
  assert.match(core.markdown(exported), /Only on request/);
  assert.match(core.markdown(exported), /avoid ten lanes/);
  assert.ok(core.markdown(exported).includes(catalog.kishuSourceHash));
  const legacy = { ...exported, kishuCommit: "previous-release" };
  delete legacy.kishuSourceHash;
  assert.deepEqual(core.importReview(catalog, legacy).entries[rule.id], note);
});

test("untouched and cleared feedback never becomes implicit approval", () => {
  const empty = { decision: "Unreviewed", feedback: "", proposed: "" };
  assert.equal(core.exportReview(catalog, { [rule.id]: empty }).feedback.length, 0);
  assert.equal(core.exportReview(catalog, { [rule.id]: { ...empty, feedback: "Still thinking" } }).feedback[0].decision, "Unreviewed");
});

test("imports preserve local conflicts and quarantine changed or missing rules", () => {
  const exported = core.exportReview(catalog, { [rule.id]: note });
  const current = { [rule.id]: { ...note, decision: "Keep" } };
  const conflict = core.importReview(catalog, exported, current);
  assert.equal(conflict.entries[rule.id].decision, "Keep");
  assert.equal(conflict.unresolved.length, 1);
  exported.feedback[0].hash = "old-content";
  const changed = core.importReview(catalog, exported);
  assert.equal(changed.entries[rule.id], undefined);
  assert.equal(changed.unresolved.length, 1);
  exported.feedback[0].id = "R-deleted";
  assert.equal(core.importReview(catalog, exported).unresolved.length, 1);
});

test("malformed or duplicate imports fail atomically", () => {
  const existing = { [rule.id]: note };
  const before = JSON.stringify(existing);
  const exported = core.exportReview(catalog, existing);
  exported.feedback.push({ id: "broken" });
  assert.throws(() => core.importReview(catalog, exported, existing), /malformed/);
  assert.equal(JSON.stringify(existing), before);
  exported.feedback[1] = exported.feedback[0];
  assert.throws(() => core.importReview(catalog, exported, existing), /duplicate/);
  assert.throws(() => core.importReview(catalog, { schema: 5 }), /supported/);
});

test("unresolved imports remain available in the next backup and readable export", () => {
  const exported = core.exportReview(catalog, { [rule.id]: note });
  exported.feedback[0].id = "R-absent";
  const imported = core.importReview(catalog, exported);
  const backup = core.exportReview(catalog, imported.entries, imported.unresolved);
  assert.equal(core.importReview(catalog, backup).unresolved[0].entry.feedback, note.feedback);
  assert.match(core.markdown(backup), /Unresolved imports/);
});

test("search and filters distinguish effective instructions, originals, and feedback", () => {
  const source = core.indexCatalog(catalog).sources.get(rule.source);
  const filters = { query: "ten lanes", edition: "all", group: "", source: "", status: "", finding: false };
  assert.equal(core.matches(rule, source, filters, {}, new Set()), true);
  assert.equal(core.matches(rule, source, { ...filters, edition: "reference" }, {}, new Set()), false);
  assert.equal(core.matches(rule, source, { ...filters, status: "noted" }, {}, new Set()), false);
  assert.equal(core.matches(rule, source, { ...filters, query: "avoid ten", status: "noted" }, { [rule.id]: note }, new Set()), true);
  assert.equal(core.matches(rule, source, { ...filters, finding: true }, {}, new Set([rule.id])), true);
  assert.equal(core.matches(rule, source, { ...filters, finding: true }, {}, new Set()), false);
});

test("every guided finding links to actual captured source text", () => {
  const index = core.indexCatalog(catalog);
  for (const finding of catalog.findings) {
    assert.ok(finding.ruleIds.length, finding.id);
    for (const id of finding.ruleIds) assert.ok(index.rules.has(id), id);
  }
  assert.ok(catalog.findings.find(item => item.id === "plan-gates").ruleIds.some(id => index.sources.get(index.rules.get(id).source).path.endsWith("check-plan.mjs")));
});
