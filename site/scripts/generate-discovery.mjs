import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { site, questions } from "../discovery.config.mjs";

const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

export function publicBase(value) {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash || url.hostname === "localhost" || url.hostname === "127.0.0.1") {
    throw new Error("Use a public HTTPS site URL without credentials, query parameters, or a fragment.");
  }
  if (!url.pathname.endsWith("/")) url.pathname += "/";
  return url.href;
}

export function buildDiscovery(config, faqs) {
  const base = publicBase(config.url);
  const absolute = (path) => new URL(path, base).href;
  const image = absolute(config.image);
  const sourceId = base + "#kishu";
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": base + "#website", url: base, name: config.name, description: config.description, inLanguage: "en", sameAs: config.repository },
      { "@type": "WebPage", "@id": base + "#webpage", url: base, name: config.title, description: config.description, inLanguage: "en", isPartOf: { "@id": base + "#website" }, mainEntity: { "@id": sourceId }, primaryImageOfPage: { "@type": "ImageObject", url: image, width: 1200, height: 630 } },
      { "@type": "SoftwareSourceCode", "@id": sourceId, name: config.name, alternateName: "Kishu mode", description: faqs[0].answer, url: base, codeRepository: config.repository, license: config.repository + "/blob/main/LICENSE", targetProduct: ["Codex", "Cursor", "Claude Code"].map((name) => ({ "@type": "SoftwareApplication", name })) },
    ],
  };
  const meta = (kind, name, content) => '    <meta ' + kind + '="' + name + '" content="' + escapeHtml(content) + '" />';
  const head = [
    '    <title>' + escapeHtml(config.title) + '</title>',
    meta("name", "description", config.description),
    meta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"),
    '    <link rel="canonical" href="' + escapeHtml(base) + '" />',
    '    <link rel="alternate" type="text/markdown" href="./index.md" title="Kishu in plain text" />',
    '    <link rel="describedby" href="./llms.txt" type="text/plain" />',
    '    <link rel="sitemap" type="application/xml" href="./sitemap.xml" />',
    meta("property", "og:type", "website"),
    meta("property", "og:site_name", config.name),
    meta("property", "og:locale", "en_US"),
    meta("property", "og:title", config.title),
    meta("property", "og:description", config.description),
    meta("property", "og:url", base),
    meta("property", "og:image", image),
    meta("property", "og:image:type", "image/jpeg"),
    meta("property", "og:image:width", "1200"),
    meta("property", "og:image:height", "630"),
    meta("property", "og:image:alt", config.imageAlt),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", config.title),
    meta("name", "twitter:description", config.description),
    meta("name", "twitter:image", image),
    meta("name", "twitter:image:alt", config.imageAlt),
    '    <script type="application/ld+json">\n' + JSON.stringify(graph, null, 2).replace(/</g, "\\u003c") + '\n    </script>',
  ].join("\n");
  const faq = '      <section id="faq" class="faq-section wrap" aria-labelledby="faq-heading">\n' +
    '        <div class="faq-intro" data-reveal="text"><h2 id="faq-heading">Kishu, explained.</h2><p>The practical details: where it works, how you choose your models, and what the workflow adds.</p></div>\n' +
    '        <div class="faq-list" data-reveal="surface">\n' + faqs.map(({ question, answer }, index) =>
      '          <details' + (index === 0 ? ' open' : '') + '><summary>' + escapeHtml(question) + '<svg class="icon" aria-hidden="true"><use href="#i-plus" /></svg></summary><p>' + escapeHtml(answer) + '</p></details>'
    ).join("\n") + '\n        </div>\n      </section>';
  const markdown = [
    "# Kishu — AI workflows and model routing for coding agents",
    "> " + config.description,
    "Kishu is an open-source workflow plugin, used inside an existing coding agent. It is not a hosted coding service. The website’s interactive scenarios and model profiles are demonstrations, not live model sessions or measured benchmarks.",
    "## How Kishu works",
    "1. Describe the outcome in one prompt.\n2. Kishu selects the relevant workflow and applies your preferences.\n3. pstack playbooks guide planning, implementation, and useful review.\n4. Impeccable guidance joins when interface design or polish matters.\n5. Receive a clear account of what changed, what was checked, and what remains.",
    "## Models and cost",
    "Choose supported models and reasoning effort for planning, implementation, review, and other roles. A deeper reasoning model can resolve uncertain decisions, while an efficient coding model implements a bounded brief. Independent assignments can run in parallel after agreeing shared boundaries. Actual savings depend on model prices, context, task complexity, and coordination overhead. These preferences guide delegated roles, not the model running the current chat.",
    "## Installation and activation",
    "Requires Python 3.11+ and Git for installation. Choose one native plugin or standalone export per harness.",
    "```sh\ngit clone --branch v0.1.5 --single-branch " + config.repository + ".git\ncd kishu-stack\npython scripts/kishu.py install --harness codex\n```",
    "Use `--harness cursor` or `--harness claude` for those hosts. Start a fresh session after installation.",
    "| Host | Work command | Model setup |\n| --- | --- | --- |\n| Codex plugin | `$kishu:kishu-mode` | `$kishu:kishu setup` |\n| Cursor | `/kishu-mode` | `/kishu setup` |\n| Claude Code | `/kishu:kishu-mode` | `/kishu:kishu setup` |",
    "## Common questions",
    ...faqs.map(({ question, answer }) => "### " + question + "\n\n" + answer),
    "## A real project",
    "This website was built using Kishu mode. Its source, behavior tests, and browser-verification record are in the repository’s site directory. The example engineering tasks are illustrative.",
    "## Open-source foundations",
    "- pstack, Lauren Tan, MIT: engineering playbooks, adapted by Kishu.\n- Impeccable, Paul Bakaus, Apache-2.0: design guidance.\n- i-have-adhd, Ayoub G., MIT: the starting point for ADHD-aware communication.\n\nKishu’s code is MIT licensed. Original upstream licenses and notices remain with the bundle. Attribution does not imply endorsement.",
    "## Source and documentation",
    "- [Website](" + base + ")\n- [Repository and setup guide](" + config.repository + ")\n- [Build story](" + config.repository + "/blob/main/site/BUILD_STORY.md)\n- [Verification record](" + config.repository + "/blob/main/site/VERIFICATION.md)\n- [Licenses and attribution](" + config.repository + "/blob/main/THIRD_PARTY_NOTICES.md)",
  ].join("\n\n") + "\n";
  const llms = "# Kishu\n\n> " + config.description + "\n\nKishu is an open-source plugin for existing coding agents. Kishu mode coordinates work; it does not run visitor prompts on this website. Model choices depend on the host. Cost and time savings are task dependent, and the walkthroughs are illustrative.\n\n## Product and setup\n\n- [Product overview and common questions](" + absolute("index.md") + "): workflow, model roles, installation commands, limitations, and attribution.\n- [Source and full installation guide](https://raw.githubusercontent.com/SPDUK/kishu-stack/main/README.md): authoritative repository documentation.\n\n## Project evidence\n\n- [Site build story](https://raw.githubusercontent.com/SPDUK/kishu-stack/main/site/BUILD_STORY.md): the site as a real Kishu project.\n- [Executed verification](https://raw.githubusercontent.com/SPDUK/kishu-stack/main/site/VERIFICATION.md): actual checks and limitations.\n- [Third-party notices](https://raw.githubusercontent.com/SPDUK/kishu-stack/main/THIRD_PARTY_NOTICES.md): upstream authors and licenses.\n";
  const robots = "# Serve at the host root to control crawling.\n# A GitHub Pages project-subpath copy does not override the host's robots.txt.\nUser-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nSitemap: " + absolute("sitemap.xml") + "\n";
  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>' + escapeHtml(base) + '</loc></url>\n</urlset>\n';
  return { head, faq, graph, files: { "index.md": markdown, "llms.txt": llms, "robots.txt": robots, "sitemap.xml": sitemap } };
}

export function applyDiscovery(html, discovery) {
  for (const marker of ["head", "faq"]) {
    const start = "<!-- discovery:" + marker + ":start -->";
    const end = "<!-- discovery:" + marker + ":end -->";
    const from = html.indexOf(start);
    const to = html.indexOf(end);
    if (from < 0 || to < from) throw new Error("Missing discovery markers for " + marker);
    html = html.slice(0, from + start.length) + "\n" + discovery[marker] + "\n    " + html.slice(to);
  }
  return html;
}

async function generate() {
  const root = fileURLToPath(new URL("../dist/", import.meta.url));
  const discovery = buildDiscovery(site, questions);
  const html = await readFile(resolve(root, "index.html"), "utf8");
  const files = { ...discovery.files, "index.html": applyDiscovery(html, discovery) };
  const stale = [];
  for (const [name, content] of Object.entries(files)) {
    const path = resolve(root, name);
    if (process.argv.includes("--check")) {
      if (await readFile(path, "utf8").catch(() => "") !== content) stale.push(name);
    } else await writeFile(path, content);
  }
  if (stale.length) throw new Error("Discovery files are stale: " + stale.join(", ") + ". Run npm run discovery.");
  console.log(process.argv.includes("--check") ? "Discovery metadata, FAQ, sitemap, and text summaries match their source." : "Generated discovery metadata for " + publicBase(site.url));
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await generate();
