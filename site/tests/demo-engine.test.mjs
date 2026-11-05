import test from "node:test";
import assert from "node:assert/strict";
import {
  SCENARIOS,
  getScenario,
  getCommand,
  getInstallCommand,
  createDemoController,
  DEFAULT_ROLES,
  getRoleProfile,
  getSetupPrompt,
} from "../dist/demo-engine.mjs";

function fakeClock() {
  let nextId = 0;
  const queue = new Map();
  const history = new Map();
  return {
    schedule(callback, delay) {
      const id = ++nextId;
      queue.set(id, { callback, delay });
      history.set(id, callback);
      return id;
    },
    cancel(id) {
      queue.delete(id);
    },
    get size() {
      return queue.size;
    },
    get ids() {
      return [...queue.keys()];
    },
    get delays() {
      return [...queue.values()].map((task) => task.delay);
    },
    tick() {
      const [id, task] = queue.entries().next().value ?? [];
      assert.ok(task, "a scheduled stage must exist");
      queue.delete(id);
      task.callback();
    },
    fireStale(id) {
      history.get(id)();
    },
  };
}

function setup(options = {}) {
  const clock = fakeClock();
  const changes = [];
  const controller = createDemoController({
    schedule: clock.schedule,
    cancel: clock.cancel,
    onChange: (state) => changes.push(state),
    ...options,
  });
  return { clock, changes, controller };
}

test("visual scenarios include design while the backend fix skips it", () => {
  assert.equal(getScenario("debug").phases.some(({ name }) => name === "design"), false);
  assert.equal(getScenario("build").phases.some(({ name }) => name === "design"), true);
  assert.equal(getScenario("refactor").phases.some(({ name }) => name === "design"), true);
  assert.equal(getScenario("unknown").id, "build");
  assert.equal(getScenario().id, "build");
});

test("commands match the native README entrypoints and install paths", () => {
  const prefixes = {
    codex: "$kishu:kishu-mode",
    cursor: "/kishu-mode",
    claude: "/kishu:kishu-mode",
    standalone: "$kishu-mode",
  };
  for (const [host, prefix] of Object.entries(prefixes)) {
    assert.equal(
      getCommand(host, "  build a workspace  "),
      `${prefix} build a workspace`,
    );
    assert.equal(getCommand(host), prefix);
  }
  for (const host of ["codex", "cursor", "claude"]) {
    assert.equal(
      getInstallCommand(host),
      `python scripts/kishu.py install --harness ${host}`,
    );
  }
  assert.equal(
    getInstallCommand("standalone"),
    "python scripts/kishu.py install --destination /absolute/path/to/skills/kishu-mode",
  );
  assert.equal(getCommand("unknown", "help"), "$kishu:kishu-mode help");
  assert.equal(getCommand("toString", "help"), "$kishu:kishu-mode help");
  assert.equal(getInstallCommand("unknown"), getInstallCommand("codex"));
});

test("run moves through each stage and completes without overlapping runs", () => {
  const { clock, changes, controller } = setup();
  assert.deepEqual(controller.getState(), {
    scenarioId: "build",
    status: "idle",
    phaseIndex: -1,
  });
  controller.run();
  controller.run();
  controller.run();
  assert.equal(clock.size, 1);
  assert.equal(changes.length, 1);
  assert.deepEqual(clock.delays, [2200]);
  clock.tick();
  assert.equal(clock.size, 1);
  clock.tick();
  assert.equal(clock.size, 1);
  clock.tick();
  clock.tick();
  clock.tick();
  assert.equal(clock.size, 0);
  assert.deepEqual(
    changes.map(({ status, phaseIndex }) => [status, phaseIndex]),
    [
      ["running", 0],
      ["running", 1],
      ["running", 2],
      ["running", 3],
      ["running", 4],
      ["complete", 4],
    ],
  );
});

test("a completed demo can replay, and reset keeps its selected scenario", () => {
  const { clock, controller } = setup();
  controller.select("refactor");
  controller.run();
  while (clock.size) clock.tick();
  controller.run();
  assert.deepEqual(controller.getState(), {
    scenarioId: "refactor",
    status: "running",
    phaseIndex: 0,
  });
  const [staleId] = clock.ids;
  controller.reset();
  assert.equal(clock.size, 0);
  clock.fireStale(staleId);
  assert.deepEqual(controller.getState(), {
    scenarioId: "refactor",
    status: "idle",
    phaseIndex: -1,
  });
  controller.run();
  clock.tick();
  assert.equal(controller.getState().phaseIndex, 1);
});

test("switching during playback prevents stale updates from touching a new run", () => {
  const { clock, changes, controller } = setup();
  controller.run();
  const [oldId] = clock.ids;
  controller.select("debug");
  assert.equal(clock.size, 0);
  controller.run();
  const [newId] = clock.ids;
  const count = changes.length;
  clock.fireStale(oldId);
  assert.equal(changes.length, count);
  assert.deepEqual(controller.getState(), {
    scenarioId: "debug",
    status: "running",
    phaseIndex: 0,
  });
  assert.deepEqual(clock.ids, [newId]);
  controller.reset();
  assert.equal(
    clock.size,
    0,
    "the new timer remains cancellable after a stale callback",
  );
  clock.fireStale(newId);
  assert.equal(changes.length, count + 1);
  controller.select("missing");
  assert.equal(controller.getState().scenarioId, "build");
});

test("dispose cancels playback and makes future operations inert", () => {
  const { clock, changes, controller } = setup();
  controller.run();
  const [staleId] = clock.ids;
  controller.dispose();
  controller.dispose();
  const count = changes.length;
  const disposedState = controller.getState();
  clock.fireStale(staleId);
  controller.run();
  controller.select("debug");
  controller.reset();
  assert.equal(clock.size, 0);
  assert.equal(changes.length, count);
  assert.deepEqual(controller.getState(), disposedState);
});

test("zero delay completes immediately with no timers for reduced motion", () => {
  const { clock, changes, controller } = setup({ stageDelay: 0 });
  controller.select("debug");
  controller.run();
  assert.equal(clock.size, 0);
  assert.deepEqual(controller.getState(), {
    scenarioId: "debug",
    status: "complete",
    phaseIndex: 3,
  });
  assert.equal(changes.length, 2);
  controller.reset();
  assert.equal(controller.getState().status, "idle");
});

test("consumer mutations and reset inside onChange cannot corrupt playback", () => {
  const { clock, changes, controller } = setup();
  controller.run();
  changes[0].phaseIndex = 99;
  controller.getState().status = "complete";
  assert.equal(controller.getState().phaseIndex, 0);
  assert.equal(controller.getState().status, "running");
  controller.dispose();

  const reentrant = setup({
    onChange(state) {
      if (state.status === "running") reentrant.controller.reset();
    },
  });
  reentrant.controller.run();
  assert.equal(reentrant.clock.size, 0);
  assert.equal(reentrant.controller.getState().status, "idle");
  assert.equal(clock.size, 0);
});

test("each route completes at its own final stage without extra callbacks", () => {
  for (const scenario of SCENARIOS) {
    const { clock, changes, controller } = setup();
    controller.select(scenario.id);
    controller.run();
    for (let i = 0; i < scenario.phases.length; i++) clock.tick();
    assert.equal(clock.size, 0);
    assert.deepEqual(controller.getState(), { scenarioId: scenario.id, status: "complete", phaseIndex: scenario.phases.length - 1 });
    assert.equal(changes.filter((state) => state.status === "running").length, scenario.phases.length);
  }
});

test("manual step selection pauses playback and rejects stale callbacks", () => {
  const { clock, controller } = setup();
  controller.run();
  const [oldId] = clock.ids;
  controller.seek(2);
  assert.equal(clock.size, 0);
  clock.fireStale(oldId);
  assert.deepEqual(controller.getState(), { scenarioId: "build", status: "paused", phaseIndex: 2 });
  for (const index of [-1, 99, 1.5, NaN]) controller.seek(index);
  assert.equal(controller.getState().phaseIndex, 2);
  controller.seek(0);
  assert.equal(controller.getState().phaseIndex, 0);
  controller.run();
  assert.equal(clock.size, 1);
});

test("showing the result cancels playback and still allows inspection and replay", () => {
  const { clock, controller } = setup();
  controller.select("debug");
  controller.run();
  const [oldId] = clock.ids;
  controller.finish();
  clock.fireStale(oldId);
  assert.equal(clock.size, 0);
  assert.deepEqual(controller.getState(), { scenarioId: "debug", status: "complete", phaseIndex: 3 });
  controller.seek(1);
  assert.equal(controller.getState().status, "paused");
  controller.run();
  assert.equal(controller.getState().phaseIndex, 1);
  controller.dispose();
  const disposed = controller.getState();
  controller.finish();
  controller.seek(2);
  assert.deepEqual(controller.getState(), disposed);
});

test("role choices propagate into a usable setup request with safe fallbacks", () => {
  const roles = { ...DEFAULT_ROLES, implementer: "reasoning", reviewer: "current" };
  const request = getSetupPrompt(roles);
  assert.match(request, /deep reasoning for implementation/);
  assert.match(request, /current chat model for review/);
  assert.match(request, /supported model IDs and reasoning effort/);
  assert.equal(getRoleProfile({ planner: "toString" }, "planner").label, "Deep reasoning");
  assert.equal(getRoleProfile({}, "implementer").label, "Fast coding");
  assert.equal(DEFAULT_ROLES.implementer, "coding");
});

test("resume continues from the inspected step instead of restarting", () => {
  const { clock, controller } = setup();
  controller.run();
  clock.tick();
  clock.tick();
  const [stale] = clock.ids;
  controller.seek(2);
  controller.run();
  clock.fireStale(stale);
  assert.equal(controller.getState().phaseIndex, 2);
  assert.equal(clock.size, 1);
  clock.tick();
  assert.equal(controller.getState().phaseIndex, 3);
});
