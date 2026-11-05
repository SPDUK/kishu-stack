const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
const ease = "cubic-bezier(.16,1,.3,1)";
const active = new Map();
const revealed = new WeakSet();

function animate(element, frames, options = {}) {
  if (!element?.animate || preference.matches || document.hidden) return;
  active.get(element)?.cancel();
  const animation = element.animate(frames, { duration: 680, easing: ease, fill: "backwards", ...options });
  active.set(element, animation);
  animation.finished.then(() => {
    if (active.get(element) === animation) active.delete(element);
  }).catch(() => {
    if (active.get(element) === animation) active.delete(element);
  });
  return animation;
}

function settleMotion() {
  for (const animation of active.values()) animation.cancel();
  active.clear();
}

function greetPuppy() {
  const puppy = document.querySelector(".mascot-flair");
  if (active.has(puppy)) return;
  animate(puppy, [
    { transform: "translateY(0) rotate(7deg)", offset: 0 },
    { transform: "translateY(-5px) rotate(-5deg)", offset: .32 },
    { transform: "translateY(-7px) rotate(-5deg)", offset: .53 },
    { transform: "translateY(1px) rotate(9deg)", offset: .8 },
    { transform: "translateY(0) rotate(7deg)", offset: 1 },
  ], { duration: 1250, easing: "cubic-bezier(.33,0,.2,1)" });
}

for (const wordmark of document.querySelectorAll(".wordmark")) {
  const greet = () => {
    const stamp = wordmark.querySelector("img");
    if (active.has(stamp)) return;
    animate(stamp, [
      { transform: "rotate(0) translateY(0)" },
      { transform: "rotate(-12deg) translateY(-2px)", offset: .36 },
      { transform: "rotate(5deg) translateY(0)", offset: .7 },
      { transform: "rotate(0) translateY(0)" },
    ], { duration: 900 });
  };
  wordmark.addEventListener("pointerenter", greet);
  wordmark.addEventListener("focusin", greet);
}

const puppy = document.querySelector(".mascot-flair");
puppy?.addEventListener("pointerenter", greetPuppy);
puppy?.addEventListener("focusin", greetPuppy);
puppy?.addEventListener("click", () => {
  greetPuppy();
  document.querySelector("#mascot-message").textContent = preference.matches
    ? "A little hello. Motion is reduced to match your preference."
    : "A little hello from the puppy.";
});

for (const answer of document.querySelectorAll(".faq-list details")) {
  answer.addEventListener("toggle", () => {
    if (!answer.open) return;
    animate(answer.querySelector("p"), [
      { opacity: .3, transform: "translateY(4px)" },
      { opacity: 1, transform: "translateY(0)" },
    ], { duration: 320 });
  });
}

function reveal(element) {
  if (revealed.has(element)) return;
  revealed.add(element);
  const type = element.dataset.reveal;
  const frames = type === "surface"
    ? [{ opacity: .22, transform: "translateY(14px) scale(.995)" }, { opacity: 1, transform: "translateY(0) scale(1)" }]
    : [{ opacity: .3, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }];
  animate(element, frames, { duration: type === "surface" ? 760 : 620 });
}

const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    reveal(entry.target);
    observer.unobserve(entry.target);
  }
}, { threshold: .08, rootMargin: "0px 0px -32px 0px" }) : null;

for (const element of document.querySelectorAll("[data-reveal]")) observer?.observe(element);

for (const [index, element] of [...document.querySelectorAll(".hero-copy > *")].entries()) {
  animate(element, [
    { opacity: .35, transform: "translateY(12px)" },
    { opacity: 1, transform: "translateY(0)" },
  ], { duration: 700, delay: index * 65 });
}
const arrival = animate(document.querySelector(".routing-window"), [
  { opacity: .25, transform: "translateY(16px) scale(.99)" },
  { opacity: 1, transform: "translateY(0) scale(1)" },
], { duration: 850, delay: 100 });
arrival?.finished.then(greetPuppy).catch(() => {});

document.addEventListener("focusin", (event) => {
  const section = event.target.closest("[data-reveal]");
  if (!section) return;
  revealed.add(section);
  observer?.unobserve(section);
  active.get(section)?.cancel();
});
preference.addEventListener("change", () => {
  if (preference.matches) settleMotion();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) settleMotion();
});
window.addEventListener("pagehide", (event) => {
  settleMotion();
  if (!event.persisted) observer?.disconnect();
});
