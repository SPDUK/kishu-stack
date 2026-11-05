export const MODEL_PROFILES = {
  reasoning: { label: "Deep reasoning", detail: "More thinking for difficult decisions", className: "reasoning" },
  coding: { label: "Fast coding", detail: "Efficient implementation of a clear brief", className: "coding" },
  current: { label: "Current chat model", detail: "Keep this role on your existing model", className: "current" },
};
export const DEFAULT_ROLES = { planner: "reasoning", implementer: "coding", reviewer: "reasoning" };
export function getRoleProfile(roles, role) {
  const profile = roles?.[role];
  return MODEL_PROFILES[Object.hasOwn(MODEL_PROFILES, profile) ? profile : DEFAULT_ROLES[role]];
}
export function getSetupPrompt(roles) {
  return "Help me configure Kishu for my available models. Use " + getRoleProfile(roles, "planner").label.toLowerCase() + " for planning, " + getRoleProfile(roles, "implementer").label.toLowerCase() + " for implementation, and " + getRoleProfile(roles, "reviewer").label.toLowerCase() + " for review. Help me choose supported model IDs and reasoning effort for these roles, keep small tasks simple, and save my preferences.";
}
export const SCENARIOS = [
  {
    id: "build", label: "Build a feature", route: "Feature + interface design",
    prompt: "Add team workspaces with roles and email invites.",
    phases: [
      { name: "route", role: "router", title: "Choose the work, then the models.", detail: "Kishu spots a permissions decision, a bounded build, and an interface that needs care.", artifact: "The route", lines: ["Feature workflow → plan and implement", "Design guidance → invitation screens", "Verification → permissions and expired links"], benefit: "You describe the outcome once. Kishu loads the relevant guidance." },
      { name: "plan", role: "planner", title: "Spend the thinking on permissions.", detail: "The planning model works through ownership and invite expiry before the builder starts.", artifact: "The planner’s handoff", lines: ["Owner: manage members. Member: view workspace.", "Invites: single use, with an expiry time.", "Check permissions on the server; test expired links."], benefit: "Isolate decisions that would be costly to redo. Give them deeper reasoning when they need it." },
      { name: "build", role: "implementer", title: "Give the builder a bounded brief.", detail: "The coding model takes the decisions, relevant files, and acceptance checks into implementation.", artifact: "The implementer’s assignment", lines: ["workspace.ts → server permission boundary", "invites.ts → single-use invitation lifecycle", "InvitePanel.tsx → pending, accepted, and expired states"], benefit: "A focused handoff can reduce repeated exploration. An efficient implementer can keep premium-model tokens out of routine coding." },
      { name: "design", role: "implementer", title: "Make every invitation state feel clear.", detail: "Kishu brings in Impeccable guidance for hierarchy, feedback, and keyboard access.", artifact: "The design pass", lines: ["One obvious action: invite a teammate.", "Expired link: explain what happened and how to retry.", "Confirm success inline; preserve keyboard focus."], benefit: "Design judgment is part of the build, so polish doesn’t become a separate prompting project." },
      { name: "verify", role: "reviewer", title: "Review the behavior that matters.", detail: "The reviewer checks the permission boundary and invitation states against the original brief.", artifact: "The verification brief", lines: ["Member cannot perform an owner action.", "Accepted and expired links cannot be reused.", "Invitation form works with keyboard input."], benefit: "Use a fresh review where it adds confidence, with clear evidence and remaining gaps." },
    ],
    result: { title: "Team invites, with the edges considered.", summary: "Roles and single-use invitations implemented; pending and expired states made clear.", checks: "Permission and invite-lifecycle checks; keyboard walkthrough.", gap: "Email delivery still needs verification with your provider.", payoff: "The hard permission decisions happened once. The builder worked from a focused brief." },
  },
  {
    id: "debug", label: "Fix a tricky bug", route: "Bug investigation + regression check",
    prompt: "Our webhook sometimes applies the same event twice. Fix the race.",
    phases: [
      { name: "route", role: "router", title: "Route straight to the failure.", detail: "Kishu chooses investigation, a scoped patch, and a regression check. No interface work is needed.", artifact: "The route", lines: ["Reproduce two deliveries of the same event.", "Investigate transaction and uniqueness boundaries.", "Skip the design pass: this is backend behavior."], benefit: "Small or nonvisual work avoids an unnecessary design workflow." },
      { name: "plan", role: "planner", title: "Find the race before writing the patch.", detail: "The planning model traces concurrent deliveries and identifies the check-then-write gap.", artifact: "The diagnosis and handoff", lines: ["Both requests can pass the existing duplicate check.", "Claim the unique event key inside the transaction.", "Roll back the claim if applying the event fails."], benefit: "Use deeper investigation at the uncertain part, then hand off a precise fix." },
      { name: "build", role: "implementer", title: "Implement the transaction boundary.", detail: "The coding model applies the agreed fix and adds a regression test for concurrent delivery.", artifact: "The implementer’s assignment", lines: ["webhook.ts → atomic claim and event application", "events.sql → unique provider event key", "webhook.test.ts → concurrent delivery and retry"], benefit: "The implementer starts with the cause and acceptance checks, reducing guesswork and repeated diagnosis." },
      { name: "verify", role: "reviewer", title: "Challenge the fix with two deliveries.", detail: "The reviewer checks concurrency and failure recovery, not just whether the happy path passes.", artifact: "The verification brief", lines: ["Concurrent deliveries produce one update.", "A failed transaction remains safe to retry.", "The original failure is covered by a regression test."], benefit: "The review concentrates on the risky boundary instead of repeating the whole investigation." },
    ],
    result: { title: "One event. One applied update.", summary: "The event claim and business update now share a transaction boundary.", checks: "Concurrent-delivery and failure-retry regression cases.", gap: "Provider-specific delivery behavior still needs an integration check.", payoff: "Deep investigation, a narrow implementation, and targeted review. No unnecessary design pass." },
  },
  {
    id: "refactor", label: "Refactor a dashboard", route: "Refactoring + interface verification",
    prompt: "Untangle our dashboard data flow and keep the screen familiar.",
    phases: [
      { name: "route", role: "router", title: "Protect the behavior before moving code.", detail: "Kishu chooses a refactor with a visual check, keeping the existing interface as the reference.", artifact: "The route", lines: ["Map request ownership and loading dependencies.", "Refactor the data boundary before the view.", "Compare ready, empty, and error states."], benefit: "A clear scope stops a refactor from turning into an unrequested redesign." },
      { name: "plan", role: "planner", title: "Make one decision about data ownership.", detail: "The planning model separates the shared data contract from independent view changes.", artifact: "The planner’s handoff", lines: ["One loader owns projects and activity requests.", "Expose a stable view model to the components.", "Keep ready, empty, and error behavior unchanged."], benefit: "Settle the shared contract first so implementation can move without competing assumptions." },
      { name: "build", role: "implementer", title: "Split the work where it is independent.", detail: "Coding models can handle separate view and test files in parallel once the contract is agreed.", artifact: "Two bounded assignments", lines: ["Builder A → Dashboard.tsx consumes the view model.", "Builder B → dashboard.test.ts captures visible states.", "Coordinator → integrate against the shared data contract."], benefit: "Independent assignments can shorten the build; coordinated boundaries prevent overlapping edits." },
      { name: "design", role: "implementer", title: "Keep the interface feeling familiar.", detail: "Impeccable guidance checks the existing spacing, loading feedback, and responsive layout.", artifact: "The design check", lines: ["Keep the established typography and spacing.", "Preserve the empty-state action and error recovery.", "Compare the actual screen on desktop and mobile."], benefit: "Design guidance protects the experience you already have." },
      { name: "verify", role: "reviewer", title: "Verify the screen and the requests.", detail: "The reviewer compares rendered states and request ownership before any performance claim.", artifact: "The verification brief", lines: ["Ready, empty, and error states still match.", "One request per resource per load.", "Measure latency before claiming a speedup."], benefit: "A smaller code path comes back with evidence of what stayed the same." },
    ],
    result: { title: "A simpler system. The same familiar screen.", summary: "A shared data boundary replaces scattered loading; components consume one view model.", checks: "Visible-state comparison and request-ownership checks.", gap: "No latency improvement claimed until it is measured.", payoff: "One shared plan unlocked independent implementation work, with the existing design preserved." },
  },
];
export function getScenario(id) {
  return SCENARIOS.find((scenario) => scenario.id === id) ?? SCENARIOS[0];
}
const ENTRYPOINTS = { codex: "$kishu:kishu-mode", cursor: "/kishu-mode", claude: "/kishu:kishu-mode", standalone: "$kishu-mode" };
export function getCommand(host, prompt = "") {
  const entrypoint = Object.hasOwn(ENTRYPOINTS, host) ? ENTRYPOINTS[host] : ENTRYPOINTS.codex;
  const request = String(prompt).trim();
  return request ? entrypoint + " " + request : entrypoint;
}
export function getInstallCommand(host) {
  if (host === "standalone") return "python scripts/kishu.py install --destination /absolute/path/to/skills/kishu-mode";
  return "python scripts/kishu.py install --harness " + (["codex", "cursor", "claude"].includes(host) ? host : "codex");
}
export function createDemoController({ onChange = () => {}, schedule = setTimeout, cancel = clearTimeout, stageDelay = 2200 } = {}) {
  let state = { scenarioId: SCENARIOS[0].id, status: "idle", phaseIndex: -1 };
  let pending = null;
  let generation = 0;
  let disposed = false;
  const delay = Number.isFinite(stageDelay) ? Math.max(0, stageDelay) : 2200;
  const lastPhase = () => getScenario(state.scenarioId).phases.length - 1;
  const getState = () => ({ ...state });
  const emit = () => onChange(getState());
  function invalidate() {
    generation += 1;
    if (pending !== null) cancel(pending);
    pending = null;
  }
  function advance(version) {
    pending = schedule(() => {
      if (disposed || version !== generation) return;
      pending = null;
      state = state.phaseIndex < lastPhase()
        ? { ...state, phaseIndex: state.phaseIndex + 1 }
        : { ...state, status: "complete" };
      emit();
      if (state.status === "running" && !disposed && version === generation) advance(version);
    }, delay);
  }
  return {
    select(id) {
      if (disposed) return getState();
      invalidate();
      state = { scenarioId: getScenario(id).id, status: "idle", phaseIndex: -1 };
      emit();
      return getState();
    },
    run() {
      if (disposed || state.status === "running") return getState();
      invalidate();
      const version = generation;
      const resumeIndex = state.status === "paused" ? state.phaseIndex : 0;
      state = { ...state, status: delay === 0 ? "complete" : "running", phaseIndex: delay === 0 ? lastPhase() : resumeIndex };
      emit();
      if (delay > 0 && !disposed && version === generation) advance(version);
      return getState();
    },
    seek(index) {
      if (disposed || !Number.isInteger(index) || index < 0 || index > lastPhase()) return getState();
      invalidate();
      state = { ...state, status: "paused", phaseIndex: index };
      emit();
      return getState();
    },
    finish() {
      if (disposed) return getState();
      invalidate();
      state = { ...state, status: "complete", phaseIndex: lastPhase() };
      emit();
      return getState();
    },
    reset() {
      if (disposed) return getState();
      invalidate();
      state = { ...state, status: "idle", phaseIndex: -1 };
      emit();
      return getState();
    },
    dispose() {
      if (disposed) return;
      invalidate();
      disposed = true;
      state = { ...state, status: "idle", phaseIndex: -1 };
    },
    getState,
  };
}
