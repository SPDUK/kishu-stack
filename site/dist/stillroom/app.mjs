import { WORKSHOPS, SESSIONS, BookingError, createBooking, filterWorkshops, sessionsFor, participantLimit, bookingSummary, updateBooking, formatMoney, formatDate } from "./booking.mjs";

const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.7" /></svg>';
const sun = '<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M32 5v54M5 32h54M13 13l38 38M13 51 51 13" stroke="currentColor" stroke-width="1.6" /></svg>';
const check = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7" stroke="currentColor" stroke-width="1.7" /></svg>';
const minus = '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12" stroke="currentColor" stroke-width="1.5" /></svg>';
const plus = '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12M10 4v12" stroke="currentColor" stroke-width="1.5" /></svg>';
const list = document.querySelector("#workshop-list");
const reservation = document.querySelector("#reservation");
const dateFilter = document.querySelector("#date-filter");
const filterStatus = document.querySelector("#filter-status");
let state = createBooking();
let filters = { category: "all", date: "all" };
let feedback = "";

function renderWorkshops() {
  const visible = filterWorkshops(filters);
  filterStatus.textContent = `${visible.length} ${visible.length === 1 ? "workshop" : "workshops"} shown.`;
  if (!visible.length) {
    list.innerHTML = '<div class="empty-results"><h3>A different kind of pause?</h3><p>No workshops match this type and date. Try another date or see everything on the table.</p><button class="text-button" type="button" data-reset-filters>Show all workshops</button></div>';
    return;
  }
  list.innerHTML = visible.map((workshop) => {
    const sessions = sessionsFor(workshop.id).filter((session) => filters.date === "all" || session.date === filters.date);
    const available = sessions.filter((session) => session.seats > 0);
    const selected = state.workshopId === workshop.id;
    const availability = !available.length ? '<span class="sold-out-note">This date is sold out · try another</span>' : `${available.length} ${available.length === 1 ? "session" : "sessions"} available in November`;
    return `<article class="workshop${selected ? " is-selected" : ""}" aria-labelledby="${workshop.id}-title"><img class="workshop-photo" src="${workshop.image}" width="600" height="400" alt="${workshop.alt}" loading="lazy" /><div class="workshop-content"><h3 id="${workshop.id}-title">${workshop.title}</h3><p class="workshop-meta"><span>${workshop.category} workshop</span><span>${workshop.duration}</span></p><p class="workshop-description">${workshop.description}</p><div class="workshop-bottom"><p class="workshop-price">${formatMoney(workshop.price)} <small>/ person</small></p><button class="choose-workshop" type="button" data-workshop="${workshop.id}" aria-label="${selected ? "Change dates for" : "Choose dates for"} ${workshop.title}" aria-controls="reservation"><span>${selected ? "Your workshop" : "Choose dates"}</span>${selected ? check : arrow}</button></div><p class="row-availability">${availability}</p></div></article>`;
  }).join("");
}

function bookingErrorMarkup() {
  return `<p id="booking-feedback" class="booking-error" role="alert">${feedback}</p>`;
}

function summaryMarkup(summary) {
  return `<dl class="summary-list"><div><dt>Workshop</dt><dd>${summary.workshop.title}</dd></div><div><dt>Your session · November 2026</dt><dd class="summary-date">${formatDate(summary.session.date, true)}<br />${summary.session.time}</dd></div><div><dt>Participants</dt><dd>${summary.participants} ${summary.participants === 1 ? "person" : "people"} × ${formatMoney(summary.workshop.price)}</dd></div></dl><div class="booking-total"><span>Total · USD</span><strong>${formatMoney(summary.total)}</strong></div><p class="total-detail">Materials included. No added fees.</p>`;
}

function renderReservation() {
  if (!state.workshopId) {
    reservation.innerHTML = `<div class="booking-empty">${sun}<h3 id="booking-title" tabindex="-1">A little space,<br />just for you.</h3><p>Choose a workshop, find a date, and make room for something good.</p><p class="booking-bottom-note">This is a working demo for a fictional studio. No payment or reservation is sent.</p></div>`;
    return;
  }
  const workshop = WORKSHOPS.find((entry) => entry.id === state.workshopId);
  if (state.stage === "review") {
    const summary = bookingSummary(state);
    reservation.innerHTML = `<h3 id="booking-title" tabindex="-1">Your time,<br />well spent.</h3><p class="booking-step">Review your demo booking</p>${summaryMarkup(summary)}<p class="review-intro">Looking good? Confirm below to try the final step.</p>${bookingErrorMarkup()}<button class="button button-cream booking-primary" type="button" data-action="confirm">Confirm demo booking ${arrow}</button><button class="booking-secondary" type="button" data-action="edit">Modify booking</button><p class="booking-bottom-note">Demo booking — no payment or reservation is sent.</p>`;
    return;
  }
  if (state.stage === "confirmed") {
    const summary = bookingSummary(state);
    reservation.innerHTML = `<div class="confirmation-mark">${check}</div><h3 id="booking-title" tabindex="-1">A morning,<br />made.</h3><p class="review-intro">Your demo booking is complete.</p>${summaryMarkup(summary)}<p class="confirmation-note">Nothing has been reserved. No payment was taken. Your choices stay only on this page.</p><div class="confirmation-actions"><button class="button button-cream booking-primary" type="button" data-action="reset">Try another workshop ${arrow}</button><button class="booking-secondary" type="button" data-action="edit">Modify booking</button></div>${bookingErrorMarkup()}`;
    return;
  }
  const session = SESSIONS.find((entry) => entry.id === state.sessionId);
  const limit = participantLimit(session);
  const total = workshop.price * state.participants;
  reservation.innerHTML = `<h3 id="booking-title" tabindex="-1">${workshop.title}</h3><p class="booking-workshop-price">${formatMoney(workshop.price)} per person · ${workshop.duration}</p><form id="booking-form" novalidate><fieldset class="booking-sessions" aria-describedby="booking-feedback"><legend>Choose your session</legend>${sessionsFor(workshop.id).map((entry) => `<label class="session"><input type="radio" name="session" id="session-${entry.id}" value="${entry.id}" ${entry.id === state.sessionId ? "checked" : ""} ${entry.seats === 0 ? "disabled" : ""} /><span class="session-label"><span class="radio-circle" aria-hidden="true"></span><span><span class="session-title">${formatDate(entry.date)}</span><span class="session-time">${entry.time}</span><span class="session-seats">${entry.seats ? `${entry.seats} places available` : "Sold out — try another date"}</span></span></span></label>`).join("")}</fieldset><div class="quantity-row"><label class="quantity-label" for="participants">Participants<small>${session ? `Up to ${limit} per booking` : "Choose a session first"}</small></label><div class="stepper"><button type="button" data-action="decrease" aria-label="Remove one participant" ${!session || state.participants <= 1 ? "disabled" : ""}>${minus}</button><input type="number" id="participants" name="participants" min="1" max="${limit || 1}" step="1" value="${state.participants}" inputmode="numeric" aria-describedby="booking-feedback" ${!session ? "disabled" : ""} /><button type="button" data-action="increase" aria-label="Add one participant" ${!session || state.participants >= limit ? "disabled" : ""}>${plus}</button></div></div><div class="booking-total"><span>Total · USD</span><strong id="booking-price" aria-live="polite">${formatMoney(total)}</strong></div><p class="total-detail">${state.participants} ${state.participants === 1 ? "person" : "people"} × ${formatMoney(workshop.price)} · materials included</p>${bookingErrorMarkup()}<button class="button button-cream booking-primary" type="submit">Review demo booking ${arrow}</button></form><button class="booking-secondary" type="button" data-action="reset">Clear selection</button><p class="booking-bottom-note">Demo booking — no payment or reservation is sent.<br />Illustrative prices in USD. No added fees.</p>`;
}

function restoreFocus(target) {
  if (!target) return;
  const element = reservation.querySelector(target);
  if (element && !element.disabled) element.focus({ preventScroll: true });
  else if (element?.disabled) reservation.querySelector("#participants")?.focus({ preventScroll: true });
}

function applyAction(action, focusTarget) {
  try {
    const previous = state;
    state = updateBooking(state, action);
    feedback = action.type === "session" && state.participants < previous.participants ? `This session has fewer places. Your group is now ${state.participants} people.` : "";
    renderReservation();
    if (["workshop", "reset"].includes(action.type)) renderWorkshops();
    restoreFocus(focusTarget);
  } catch (error) {
    if (!(error instanceof BookingError)) throw error;
    feedback = error.message;
    renderReservation();
    if (error.field === "session") restoreFocus('input[name="session"]:not(:disabled)');
    else restoreFocus(focusTarget);
  }
}

function scrollToReservation() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (window.innerWidth <= 760) reservation.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
}

list.addEventListener("click", (event) => {
  const workshopButton = event.target.closest("[data-workshop]");
  if (workshopButton) {
    applyAction({ type: "workshop", id: workshopButton.dataset.workshop }, "#booking-title");
    if (filters.date !== "all") {
      const matching = SESSIONS.find((entry) => entry.workshopId === state.workshopId && entry.date === filters.date && entry.seats > 0);
      if (matching) applyAction({ type: "session", id: matching.id }, "#booking-title");
    }
    scrollToReservation();
  }
  if (event.target.closest("[data-reset-filters]")) resetFilters();
});

function resetFilters() {
  filters = { category: "all", date: "all" };
  document.querySelector('input[name="category"][value="all"]').checked = true;
  dateFilter.value = "all";
  renderWorkshops();
  document.querySelector('input[name="category"][value="all"]').focus();
}

document.querySelector(".category-filter").addEventListener("change", (event) => {
  filters.category = event.target.value;
  renderWorkshops();
});
dateFilter.addEventListener("change", () => {
  filters.date = dateFilter.value;
  renderWorkshops();
});
reservation.addEventListener("change", (event) => {
  if (event.target.name === "session") applyAction({ type: "session", id: event.target.value }, `#${event.target.id}`);
  if (event.target.name === "participants") applyAction({ type: "participants", value: event.target.value === "" ? NaN : Number(event.target.value) }, "#participants");
});
reservation.addEventListener("submit", (event) => {
  event.preventDefault();
  applyAction({ type: "review" }, "#booking-title");
});
reservation.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button || button.disabled) return;
  const action = button.dataset.action;
  if (action === "increase" || action === "decrease") {
    applyAction({ type: "participants", value: state.participants + (action === "increase" ? 1 : -1) }, `[data-action="${action}"]`);
  } else {
    applyAction({ type: action }, "#booking-title");
    if (action === "reset") document.querySelector(".choose-workshop")?.focus({ preventScroll: true });
  }
});

renderWorkshops();
renderReservation();
