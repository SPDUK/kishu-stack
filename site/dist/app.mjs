import { getScenario, getCommand, getInstallCommand, createDemoController, DEFAULT_ROLES, getRoleProfile, getSetupPrompt } from "./demo-engine.mjs";
const $ = (selector) => document.querySelector(selector);
const icon = (name) => '<svg class="icon" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
const roles = { ...DEFAULT_ROLES };
const phaseLabels = { route: "Route", plan: "Plan", build: "Build", design: "Design", verify: "Review" };
let host = "codex";
let toastTimer;
let renderedScenario;
let renderedDetail;
let detailAnimation;
function announce(message) { $("#announcement").textContent = message; }
function toast(message) {
  clearTimeout(toastTimer);
  $("#toast").textContent = message;
  $("#toast").classList.add("visible");
  announce(message);
  toastTimer = setTimeout(() => $("#toast").classList.remove("visible"), 2600);
}
async function copy(text, button) {
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
    else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      textarea.setAttribute("readonly", "");
      document.body.append(textarea);
      textarea.select();
      let copied;
      try { copied = document.execCommand("copy"); }
      finally { textarea.remove(); button?.focus({ preventScroll: true }); }
      if (!copied) throw new Error("Clipboard unavailable");
    }
    toast("Copied. Ready for your next chat.");
  } catch { toast("Clipboard unavailable. Select and copy the text directly."); }
}
function modelFor(phase) {
  if (phase.role === "router") return { label: "Kishu router", className: "current" };
  return getRoleProfile(roles, phase.role);
}
function updateDetail(html, key) {
  if (renderedDetail === key) return;
  const hasPrevious = renderedDetail !== undefined;
  renderedDetail = key;
  detailAnimation?.cancel();
  $("#handoff-content").innerHTML = html;
  if (hasPrevious && !motion.matches) {
    detailAnimation = $("#handoff-content").animate([
      { opacity: .35, transform: "translateX(10px)", clipPath: "inset(0 0 0 8px)" },
      { opacity: 1, transform: "translateX(0)", clipPath: "inset(0 0 0 0)" },
    ], { duration: 360, easing: "cubic-bezier(.16,1,.3,1)" });
  }
}
function renderDemo(state) {
  const scenario = getScenario(state.scenarioId);
  const complete = state.status === "complete";
  const running = state.status === "running";
  const index = Math.max(0, state.phaseIndex);
  const phase = scenario.phases[index];
  document.querySelectorAll("[data-scenario]").forEach((tab) => {
    const selected = tab.dataset.scenario === state.scenarioId;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  $("#demo-panel").setAttribute("aria-labelledby", "tab-" + state.scenarioId);
  $("#scenario-prompt").textContent = scenario.prompt;
  $("#route-label").textContent = scenario.route;
  $("#workflow-state").textContent = complete ? "Complete" : running ? "Playing" : state.status === "paused" ? "Paused" : "Ready";
  $("#run-demo").innerHTML = icon(running ? "pause" : complete ? "replay" : "play") + "<span>" + (running ? "Pause flow" : complete ? "Replay flow" : state.status === "paused" ? "Resume flow" : "Play the flow") + "</span>";
  if (renderedScenario !== state.scenarioId) {
    renderedScenario = state.scenarioId;
    $("#workflow-steps").innerHTML = scenario.phases.map((step, i) =>
      '<li><button class="step-button" data-step="' + i + '" aria-controls="demo-detail"><span class="step-symbol">' + (i + 1) + '</span><span class="step-text"><strong>' + phaseLabels[step.name] + '</strong><small></small></span></button></li>'
    ).join("");
    document.querySelectorAll("[data-step]").forEach((button) => button.addEventListener("click", () => controller.seek(Number(button.dataset.step))));
    $("#workflow-steps").style.gridTemplateColumns = "repeat(" + scenario.phases.length + ", minmax(0, 1fr))";
  }
  document.querySelectorAll("[data-step]").forEach((button, i) => {
    const done = complete || i < index;
    button.classList.toggle("done", done);
    if (!complete && i === index) button.setAttribute("aria-current", "step");
    else button.removeAttribute("aria-current");
    button.querySelector(".step-symbol").innerHTML = done ? icon("check") : String(i + 1);
    button.querySelector("small").textContent = modelFor(scenario.phases[i]).label;
    button.setAttribute("aria-label", phaseLabels[scenario.phases[i].name] + ": " + modelFor(scenario.phases[i]).label);
  });
  if (complete) {
    updateDetail('<div class="handoff-meta"><span>Clear output</span><span class="model-badge">Example handback</span></div><h3 class="handoff-content-title">' + escapeHtml(scenario.result.title) + '</h3><dl class="result-list"><div><dt>Changed</dt><dd>' + escapeHtml(scenario.result.summary) + '</dd></div><div><dt>Checked</dt><dd>' + escapeHtml(scenario.result.checks) + '</dd></div><div><dt>Still to do</dt><dd>' + escapeHtml(scenario.result.gap) + '</dd></div></dl><p class="handoff-path">' + icon("check") + 'The outcome first. The useful detail close by.</p>', state.scenarioId + ":complete");
    $("#demo-benefit").textContent = scenario.result.payoff;
    announce(scenario.label + " walkthrough complete. " + scenario.result.title);
  } else {
    const profile = modelFor(phase);
    const next = scenario.phases[index + 1];
    const html = '<div class="handoff-meta"><span>Step ' + (index + 1) + ' of ' + scenario.phases.length + '</span><span class="model-badge ' + profile.className + '">' + escapeHtml(profile.label) + '</span></div><h3 class="handoff-content-title">' + escapeHtml(phase.title) + '</h3><p class="handoff-description">' + escapeHtml(phase.detail) + '</p><div class="artifact"><h4>' + escapeHtml(phase.artifact) + '</h4><ul>' + phase.lines.map((line) => '<li>' + escapeHtml(line) + '</li>').join("") + '</ul></div><p class="handoff-path">' + icon("arrow") + (next ? 'Next: ' + phaseLabels[next.name] + ' · ' + escapeHtml(modelFor(next).label) : "Next: a clear, checked handback") + '</p>';
    updateDetail(html, state.scenarioId + ":" + index + ":" + JSON.stringify(roles));
    $("#demo-benefit").textContent = phase.benefit;
    if (state.status === "idle") announce(scenario.label + " selected. Choose a step or play the flow.");
    else announce("Step " + (index + 1) + " of " + scenario.phases.length + ". " + phase.title + " " + profile.label + ".");
  }
}
const controller = createDemoController({ onChange: renderDemo, stageDelay: motion.matches ? 0 : 2600 });
renderDemo(controller.getState());
$("#run-demo").addEventListener("click", () => {
  const state = controller.getState();
  if (state.status === "running") controller.seek(state.phaseIndex);
  else if (motion.matches) controller.finish();
  else controller.run();
});
$("#show-result").addEventListener("click", () => controller.finish());
document.querySelectorAll("[data-scenario]").forEach((tab) => tab.addEventListener("click", () => controller.select(tab.dataset.scenario)));
$("#hero-demo").addEventListener("click", () => {
  controller.select("build");
});
$("#copy-demo").addEventListener("click", (event) => copy(getCommand(host, getScenario(controller.getState().scenarioId).prompt), event.currentTarget));
function renderRoles() {
  for (const role of Object.keys(DEFAULT_ROLES)) {
    const profile = getRoleProfile(roles, role);
    const allocation = $("#allocation-" + role);
    allocation.className = profile.className;
    allocation.querySelector("strong").textContent = profile.label;
  }
  $("#model-summary").textContent = roles.implementer === "coding" && roles.planner === "reasoning"
    ? "Deeper thinking at the decision points. Efficient coding for the implementation."
    : Object.values(roles).every((value) => value === "current")
      ? "One familiar model across the workflow. Kishu still chooses the relevant guidance."
      : roles.implementer === "reasoning"
        ? "Deeper reasoning through implementation, too. More thinking may mean more cost and waiting."
        : "Your mix follows the work. Choose deeper reasoning or faster execution for each role.";
  $("#setup-request").textContent = getSetupPrompt(roles);
}
document.querySelectorAll("[data-model-role]").forEach((select) => select.addEventListener("change", () => {
  roles[select.dataset.modelRole] = select.value;
  renderRoles();
  renderDemo(controller.getState());
  announce(select.dataset.modelRole + " model profile changed to " + getRoleProfile(roles, select.dataset.modelRole).label + ". Walkthrough updated.");
}));
renderRoles();
$("#copy-setup").addEventListener("click", (event) => copy(getSetupPrompt(roles), event.currentTarget));
const installDetails = {
  codex: "Select Kishu through /skills, or use the command above. Python 3.11+ and Git are needed for installation.",
  cursor: "Reload Cursor and check Customize after installation. Local plugin imports must be allowed by your organization. Python 3.11+ and Git are needed.",
  claude: "The installer uses the Claude Code CLI marketplace flow. Refresh the plugin or start a new session after installation. Python 3.11+ and Git are needed.",
};
function installCommands() {
  return "git clone https://github.com/SPDUK/kishu-stack.git\ncd kishu-stack\n" + getInstallCommand(host);
}
document.querySelectorAll("[data-host]").forEach((tab) => tab.addEventListener("click", () => {
  host = tab.dataset.host;
  document.querySelectorAll("[data-host]").forEach((item) => {
    const selected = item.dataset.host === host;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  $("#install-content").setAttribute("aria-labelledby", "host-" + host);
  $("#install-command").textContent = installCommands();
  $("#invoke-command").textContent = getCommand(host);
  $("#demo-invocation").textContent = getCommand(host);
  $("#install-detail").textContent = installDetails[host];
}));
$("#copy-install").addEventListener("click", (event) => copy(installCommands(), event.currentTarget));
$("#copy-invoke").addEventListener("click", (event) => copy(getCommand(host), event.currentTarget));
document.querySelectorAll('[role="tablist"]').forEach((tablist) => tablist.addEventListener("keydown", (event) => {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const index = tabs.indexOf(document.activeElement);
  if (index < 0) return;
  let next;
  if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
  if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
  if (event.key === "Home") next = 0;
  if (event.key === "End") next = tabs.length - 1;
  if (next === undefined) return;
  event.preventDefault();
  tabs[next].focus();
  tabs[next].click();
}));
motion.addEventListener("change", () => {
  if (motion.matches) {
    detailAnimation?.cancel();
    if (controller.getState().status === "running") controller.finish();
  }
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden && controller.getState().status === "running") controller.seek(controller.getState().phaseIndex);
});
window.addEventListener("pagehide", (event) => {
  clearTimeout(toastTimer);
  $("#toast").classList.remove("visible");
  detailAnimation?.cancel();
  if (event.persisted) controller.reset();
  else controller.dispose();
});
