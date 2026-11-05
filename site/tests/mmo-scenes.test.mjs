import test from 'node:test';
import assert from 'node:assert/strict';
import { destinationForKey } from '../dist/mmo/scene-state.mjs';

test('destination keys traverse, wrap, and jump to the ends', () => {
  assert.equal(destinationForKey('ArrowLeft', 0, 3), 2);
  assert.equal(destinationForKey('ArrowRight', 2, 3), 0);
  assert.equal(destinationForKey('ArrowRight', 0, 3), 1);
  assert.equal(destinationForKey('ArrowLeft', 2, 3), 1);
  assert.equal(destinationForKey('End', 0, 3), 2);
  assert.equal(destinationForKey('Home', 2, 3), 0);
  assert.equal(destinationForKey('Tab', 1, 3), 1);
});

function element(attributes = {}) {
  const listeners = new Map();
  return {
    attributes: { ...attributes },
    tabIndex: Number(attributes.tabindex ?? 0),
    hidden: false,
    focused: false,
    animations: [],
    getAttribute(name) { return this.attributes[name]; },
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener(name, listener) { listeners.set(name, listener); },
    dispatch(name, event = {}) { listeners.get(name)?.(event); },
    focus() { this.focused = true; },
    animate() {
      const animation = { cancelled: false, cancel() { this.cancelled = true; } };
      this.animations.push(animation);
      return animation;
    },
  };
}

test('the selector updates visible panels, roving focus, and reduced-motion behavior', async () => {
  const panels = Array.from({ length: 3 }, (_, i) => ({ ...element(), hidden: i !== 0 }));
  const tabs = panels.map((_, i) => element({
    'aria-controls': `scene-${i}`,
    'aria-selected': String(i === 0),
    tabindex: i === 0 ? '0' : '-1',
  }));
  const reduce = { ...element(), matches: false };
  const originalDocument = globalThis.document;
  const originalWindow = globalThis.window;
  globalThis.document = {
    querySelectorAll: () => tabs,
    getElementById: id => panels[Number(id.slice(-1))],
  };
  globalThis.window = { matchMedia: () => reduce };
  try {
    await import('../dist/mmo/app.mjs');
    assert.equal(panels.flatMap(panel => panel.animations).length, 0, 'there is no automatic entrance animation');
    tabs[1].dispatch('click');
    assert.deepEqual(panels.map(panel => panel.hidden), [true, false, true]);
    assert.deepEqual(tabs.map(tab => tab.attributes['aria-selected']), ['false', 'true', 'false']);
    assert.deepEqual(tabs.map(tab => tab.tabIndex), [-1, 0, -1]);
    assert.equal(panels[1].animations.length, 1);
    tabs[1].dispatch('click');
    assert.equal(panels[1].animations.length, 1, 'selecting the current destination does not restart motion');

    let prevented = false;
    tabs[1].dispatch('keydown', { key: 'End', preventDefault() { prevented = true; } });
    assert.equal(prevented, true);
    assert.equal(panels[1].animations[0].cancelled, true, 'changing destination cancels the previous transition');
    assert.deepEqual(panels.map(panel => panel.hidden), [true, true, false]);
    assert.equal(tabs[2].focused, true);

    reduce.matches = true;
    reduce.dispatch('change');
    assert.equal(panels[2].animations[0].cancelled, true);
    tabs[2].dispatch('keydown', { key: 'ArrowRight', preventDefault() {} });
    assert.deepEqual(panels.map(panel => panel.hidden), [false, true, true]);
    assert.equal(tabs[0].focused, true);
    assert.equal(panels[0].animations.length, 0, 'reduced motion changes the scene immediately');

    prevented = false;
    tabs[0].dispatch('keydown', { key: 'Tab', preventDefault() { prevented = true; } });
    assert.equal(prevented, false, 'normal tab navigation is left to the browser');
    assert.deepEqual(panels.map(panel => panel.hidden), [false, true, true]);
  } finally {
    if (originalDocument === undefined) delete globalThis.document;
    else globalThis.document = originalDocument;
    if (originalWindow === undefined) delete globalThis.window;
    else globalThis.window = originalWindow;
  }
});
