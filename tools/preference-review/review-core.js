(function (root) {
  "use strict";
  const choices = ["Unreviewed", "Keep", "Change", "Ask first", "Only on request", "Remove", "Unsure"];
  const isObject = value => value !== null && typeof value === "object" && !Array.isArray(value);
  const touched = entry => entry && (entry.decision !== "Unreviewed" || entry.feedback || entry.proposed);

  function indexCatalog(catalog) {
    const sources = new Map(catalog.sources.map(source => [source.id, source]));
    const rules = new Map(catalog.rules.map(rule => [rule.id, rule]));
    if (sources.size !== catalog.sources.length || rules.size !== catalog.rules.length) throw new Error("Duplicate catalog IDs.");
    for (const rule of rules.values()) if (!sources.has(rule.source)) throw new Error("Missing rule source.");
    return { sources, rules };
  }

  function exportReview(catalog, entries, unresolved = [], now = new Date().toISOString()) {
    const index = indexCatalog(catalog);
    const feedback = [];
    for (const rule of catalog.rules) {
      const entry = entries[rule.id];
      if (!touched(entry)) continue;
      const source = index.sources.get(rule.source);
      feedback.push({ id: rule.id, hash: rule.hash, decision: entry.decision, feedback: entry.feedback, proposed: entry.proposed, updated: entry.updated,
        source: source.path, sourceHash: source.hash, edition: source.edition, section: rule.section, line: rule.start, exactText: rule.text });
    }
    return { format: "kishu-preference-feedback", schema: 1, exported: now, kishuVersion: catalog.version, kishuSourceHash: catalog.kishuSourceHash,
      pstackCommit: catalog.upstreamCommit, feedback, unresolved };
  }

  function importReview(catalog, value, existing = {}, previousUnresolved = []) {
    if (!isObject(value) || value.format !== "kishu-preference-feedback" || value.schema !== 1 || !Array.isArray(value.feedback) || !Array.isArray(value.unresolved)) {
      throw new Error("This is not a supported Kishu feedback export. Existing feedback was not changed.");
    }
    const index = indexCatalog(catalog);
    const entries = { ...existing };
    const unresolved = [...previousUnresolved];
    const seen = new Set();
    let added = 0;
    for (const item of value.feedback) {
      if (!isObject(item) || typeof item.id !== "string" || typeof item.hash !== "string" || !choices.includes(item.decision) ||
          typeof item.feedback !== "string" || typeof item.proposed !== "string" || (item.updated !== undefined && typeof item.updated !== "string")) {
        throw new Error("An imported feedback entry is malformed. Existing feedback was not changed.");
      }
      if (seen.has(item.id)) throw new Error("The import contains duplicate rule IDs. Existing feedback was not changed.");
      seen.add(item.id);
      const rule = index.rules.get(item.id);
      const clean = { decision: item.decision, feedback: item.feedback, proposed: item.proposed, updated: item.updated || "" };
      if (!rule || rule.hash !== item.hash) {
        unresolved.push({ reason: "The rule changed or is absent in this snapshot.", entry: item });
      } else if (touched(existing[item.id]) && JSON.stringify([existing[item.id].decision, existing[item.id].feedback, existing[item.id].proposed]) !== JSON.stringify([clean.decision, clean.feedback, clean.proposed])) {
        unresolved.push({ reason: "Different feedback already exists locally. Kept the local feedback.", entry: item });
      } else {
        entries[item.id] = clean;
        added += 1;
      }
    }
    for (const item of value.unresolved) {
      if (!isObject(item) || typeof item.reason !== "string" || !isObject(item.entry)) throw new Error("Malformed unresolved feedback. Existing feedback was not changed.");
      unresolved.push(item);
    }
    const unique = [...new Map(unresolved.map(item => [JSON.stringify(item), item])).values()];
    return { entries, unresolved: unique, added };
  }

  function markdown(review) {
    const identity = review.kishuSourceHash ? `source-content SHA-256 ${review.kishuSourceHash}` : `commit ${review.kishuCommit}`;
    const lines = ["# Kishu preference feedback", "", `Snapshot: Kishu ${review.kishuVersion}; pstack ${review.pstackCommit}; ${identity}.`, "",
      "Only explicit feedback is listed. Omitted rules remain unreviewed. These are requested decisions, not applied changes.", ""];
    for (const item of review.feedback) {
      lines.push(`## ${item.id} · ${item.decision}`, "", `Source: ${item.source}:${item.line} (${item.edition})`, `Section: ${item.section}`, "", "Exact instruction:", "",
        ...item.exactText.split("\n").map(line => "> " + line), "", "Feedback:", "", item.feedback || "(No note)", "", "Preferred wording or behavior:", "", item.proposed || "(Not supplied)", "");
    }
    if (review.unresolved.length) lines.push("## Unresolved imports", "", "These were preserved without replacing current feedback. Reconcile them against the current rules.", "", ...review.unresolved.map(item => JSON.stringify(item)), "");
    return lines.join("\n");
  }

  function matches(rule, source, filters, entries, findingIds) {
    if (filters.edition !== "all" && source.edition !== filters.edition) return false;
    if (filters.group && source.group !== filters.group) return false;
    if (filters.source && source.id !== filters.source) return false;
    const entry = entries[rule.id];
    if (filters.status === "noted" && !touched(entry)) return false;
    if (filters.status === "unreviewed" && touched(entry)) return false;
    if (filters.finding && !findingIds.has(rule.id)) return false;
    const haystack = [source.title, source.path, source.group, source.note, rule.section, rule.text, entry?.feedback || "", entry?.proposed || ""].join(" ").toLowerCase();
    return filters.query.trim().toLowerCase().split(/\s+/).filter(Boolean).every(term => haystack.includes(term));
  }

  const api = { choices, touched, indexCatalog, exportReview, importReview, markdown, matches };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.ReviewCore = api;
})(typeof globalThis === "undefined" ? this : globalThis);
