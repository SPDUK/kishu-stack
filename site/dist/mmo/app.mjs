import { destinationForKey } from './scene-state.mjs';

const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
let current = 0;
let entrance;

function selectScene(index, focus = false) {
  if (index !== current) {
    entrance?.cancel();
    current = index;
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (!reduce.matches) {
      entrance = panels[index].animate([{ opacity: .5 }, { opacity: 1 }], {
        duration: 650,
        easing: 'cubic-bezier(.16,1,.3,1)',
      });
    }
  }
  if (focus) tabs[index].focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectScene(index));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    selectScene(destinationForKey(event.key, current, tabs.length), true);
  });
});

reduce.addEventListener('change', () => {
  if (reduce.matches) entrance?.cancel();
});
