import test from "node:test";
import assert from "node:assert/strict";
import {
  BookingError,
  createBooking,
  filterWorkshops,
  sessionsFor,
  participantLimit,
  bookingSummary,
  updateBooking,
  formatDate,
  formatMoney,
} from "../dist/stillroom/booking.mjs";

function clayBooking(session = "clay-14") {
  const workshop = updateBooking(createBooking(), { type: "workshop", id: "clay" });
  return updateBooking(workshop, { type: "session", id: session });
}

test("type and date filters combine; sold-out dates remain discoverable", () => {
  assert.equal(filterWorkshops().length, 3);
  assert.deepEqual(filterWorkshops({ category: "print", date: "2026-11-22" }).map((item) => item.id), ["print"]);
  assert.deepEqual(filterWorkshops({ date: "2026-11-22" }).map((item) => item.id), ["print", "table"]);
  assert.deepEqual(filterWorkshops({ category: "clay", date: "2026-11-22" }), []);
  assert.deepEqual(filterWorkshops({ date: "2026-11-28" }).map((item) => item.id), ["clay"]);
});

test("a booking cannot advance without an available session", () => {
  const empty = createBooking();
  assert.throws(() => updateBooking(empty, { type: "review" }), (error) => error instanceof BookingError && error.field === "session");
  const chosen = updateBooking(empty, { type: "workshop", id: "clay" });
  assert.throws(() => updateBooking(chosen, { type: "review" }), /Choose an available session/);
  assert.equal(empty.workshopId, null);
  assert.equal(chosen.sessionId, null);
});

test("sold-out sessions and sessions from another workshop cannot be selected", () => {
  const state = updateBooking(createBooking(), { type: "workshop", id: "clay" });
  assert.throws(() => updateBooking(state, { type: "session", id: "clay-28" }), /sold out/);
  assert.throws(() => updateBooking(state, { type: "session", id: "print-15" }), BookingError);
  assert.equal(state.sessionId, null);
});

test("the total follows the workshop price and the chosen participant count", () => {
  const state = updateBooking(clayBooking(), { type: "participants", value: 3 });
  const summary = bookingSummary(state);
  assert.equal(summary.participants, 3);
  assert.equal(summary.total, 204);
  assert.equal(summary.workshop.title, "Clay & Coffee");
  assert.equal(summary.session.date, "2026-11-14");
  assert.equal(formatMoney(summary.total), "$204");
});

test("quantity rejects empty, fractional, negative, and over-capacity groups", () => {
  const state = clayBooking("clay-21");
  for (const value of [NaN, 0, -1, 1.5, 3, Infinity, "2"]) {
    assert.throws(() => updateBooking(state, { type: "participants", value }), (error) => error instanceof BookingError && error.field === "participants");
  }
  const valid = updateBooking(state, { type: "participants", value: 2 });
  assert.equal(bookingSummary(valid).total, 136);
  assert.equal(state.participants, 1);
});

test("capacity limits a group to available seats and at most six people", () => {
  assert.equal(participantLimit(sessionsFor("print")[0]), 6);
  assert.equal(participantLimit(sessionsFor("clay")[1]), 2);
  assert.equal(participantLimit(null), 0);
  const large = updateBooking(clayBooking(), { type: "participants", value: 5 });
  const smaller = updateBooking(large, { type: "session", id: "clay-21" });
  assert.equal(smaller.participants, 2);
  assert.equal(bookingSummary(smaller).total, 136);
  assert.equal(large.participants, 5);
});

test("review and confirmation require the explicit sequence", () => {
  const chosen = clayBooking();
  assert.throws(() => updateBooking(chosen, { type: "confirm" }), /Review your booking/);
  const reviewed = updateBooking(chosen, { type: "review" });
  assert.equal(reviewed.stage, "review");
  assert.throws(() => updateBooking(reviewed, { type: "participants", value: 2 }), /Modify booking/);
  const confirmed = updateBooking(reviewed, { type: "confirm" });
  assert.equal(confirmed.stage, "confirmed");
  assert.equal(bookingSummary(confirmed).total, 68);
  assert.throws(() => updateBooking(confirmed, { type: "confirm" }), /Review your booking/);
});

test("modify keeps the choices, supports repricing, and requires a new review", () => {
  const reviewed = updateBooking(clayBooking(), { type: "review" });
  const confirmed = updateBooking(reviewed, { type: "confirm" });
  const editable = updateBooking(confirmed, { type: "edit" });
  assert.equal(editable.stage, "choose");
  assert.equal(editable.sessionId, "clay-14");
  const updated = updateBooking(editable, { type: "participants", value: 2 });
  assert.equal(bookingSummary(updated).total, 136);
  assert.throws(() => updateBooking(updated, { type: "confirm" }), /Review your booking/);
});

test("choosing another workshop clears the prior date, group, and confirmation", () => {
  const grouped = updateBooking(clayBooking(), { type: "participants", value: 4 });
  const reviewed = updateBooking(grouped, { type: "review" });
  const switched = updateBooking(reviewed, { type: "workshop", id: "table" });
  assert.deepEqual(switched, { workshopId: "table", sessionId: null, participants: 1, stage: "choose" });
  const table = updateBooking(switched, { type: "session", id: "table-29" });
  assert.equal(bookingSummary(table).total, 82);
});

test("reset discards the complete booking", () => {
  const confirmed = updateBooking(updateBooking(clayBooking(), { type: "review" }), { type: "confirm" });
  const reset = updateBooking(confirmed, { type: "reset" });
  assert.deepEqual(reset, createBooking());
  assert.equal(confirmed.stage, "confirmed");
});

test("summary validation protects confirmation from inconsistent or tampered state", () => {
  assert.throws(() => bookingSummary({ ...clayBooking(), sessionId: "print-15" }), BookingError);
  assert.throws(() => bookingSummary({ ...clayBooking(), participants: 7 }), /between 1 and 6/);
  assert.throws(() => updateBooking(createBooking(), { type: "workshop", id: "missing" }), /Choose a workshop/);
});

test("dates are stable across local time zones and expose useful session labels", () => {
  assert.equal(formatDate("2026-11-14"), "Sat, Nov 14");
  assert.equal(formatDate("2026-11-22", true), "Sunday, November 22");
  assert.equal(sessionsFor("clay").filter((session) => session.seats === 0).length, 1);
});
