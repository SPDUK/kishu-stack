import test from "node:test";
import assert from "node:assert/strict";
import { applyDiscovery, buildDiscovery, publicBase } from "../scripts/generate-discovery.mjs";
import { site, questions } from "../discovery.config.mjs";

test("canonical, social image, sitemap, and entity URLs retain a project subpath", () => {
  const discovery = buildDiscovery({ ...site, url: "https://example.com/projects/kishu" }, questions);
  assert.equal(publicBase("https://example.com/projects/kishu"), "https://example.com/projects/kishu/");
  assert.match(discovery.head, /rel="canonical" href="https:\/\/example.com\/projects\/kishu\/"/);
  assert.match(discovery.head, /content="https:\/\/example.com\/projects\/kishu\/assets\/kishu-social.jpg"/);
  assert.match(discovery.files["sitemap.xml"], /<loc>https:\/\/example.com\/projects\/kishu\/<\/loc>/);
  assert.match(discovery.files["robots.txt"], /Sitemap: https:\/\/example.com\/projects\/kishu\/sitemap.xml/);
  assert.match(discovery.files["llms.txt"], /https:\/\/example.com\/projects\/kishu\/index.md/);
  assert.equal(discovery.graph["@graph"][1].mainEntity["@id"], discovery.graph["@graph"][2]["@id"]);
});

test("local, credentialed, and ambiguous URLs cannot become public canonicals", () => {
  for (const url of ["http://example.com/", "https://localhost/", "https://127.0.0.1/", "https://user:secret@example.com/", "https://example.com/?preview=1", "https://example.com/#demo"]) {
    assert.throws(() => publicBase(url));
  }
});

test("metadata escapes HTML and JSON-LD remains parseable for quoted copy", () => {
  const copy = { ...site, name: 'Kishu & "friends"', title: 'Kishu <script> & "test"', description: '</script><script>alert("x")</script>' };
  const discovery = buildDiscovery(copy, questions);
  assert.match(discovery.head, /Kishu &lt;script&gt; &amp; &quot;test&quot;/);
  const json = discovery.head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
  assert.equal(JSON.parse(json)["@graph"][0].description, copy.description);
  assert.equal(json.includes("</script>"), false);
});

test("regeneration preserves hand-authored content and produces the same output twice", () => {
  const source = '<head><!-- discovery:head:start -->old<!-- discovery:head:end --></head><main>Keep this design.<!-- discovery:faq:start -->old<!-- discovery:faq:end --></main>';
  const discovery = buildDiscovery(site, questions);
  const once = applyDiscovery(source, discovery);
  assert.equal(applyDiscovery(once, discovery), once);
  assert.match(once, /Keep this design\./);
  assert.throws(() => applyDiscovery("<html></html>", discovery), /Missing discovery markers/);
});

test("visible answers and plain-text answers derive from the same product facts", () => {
  const fact = { question: "Can I use my own models?", answer: "Yes, when your host supports them." };
  const discovery = buildDiscovery(site, [fact]);
  assert.ok(discovery.faq.includes(fact.answer));
  assert.ok(discovery.files["index.md"].includes(fact.answer));
  assert.equal(discovery.graph["@graph"][2].description, fact.answer);
});
