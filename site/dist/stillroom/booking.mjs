export const WORKSHOPS = [
  {
    id: "clay",
    title: "Clay & Coffee",
    category: "Clay",
    duration: "2.5 hours",
    price: 68,
    image: "assets/clay.webp",
    alt: "Hands shaping a small clay bowl at a sunlit worktable",
    description: "Slow down, get your hands in clay, and shape a little something of your own. Coffee is on us.",
    takeHome: "A hand-built cup or bowl, fired and ready for collection in 3 weeks.",
  },
  {
    id: "print",
    title: "Botanical Printmaking",
    category: "Print",
    duration: "2 hours",
    price: 54,
    image: "assets/printmaking.webp",
    alt: "Botanical leaves and handmade blue prints on a studio table",
    description: "Leaves, ink, and a little happy accident. Turn the shapes of the garden into a set of original prints.",
    takeHome: "A set of botanical prints on beautiful, textured paper.",
  },
  {
    id: "table",
    title: "The Sunday Table",
    category: "Table",
    duration: "3 hours",
    price: 82,
    image: "assets/table.webp",
    alt: "A warm communal table set with handmade ceramics, flowers, and linen",
    description: "Make a seasonal arrangement, set a thoughtful table, and finish with a simple shared lunch.",
    takeHome: "Your seasonal arrangement and a few new ideas for gathering.",
  },
];

export const SESSIONS = [
  { id: "clay-14", workshopId: "clay", date: "2026-11-14", time: "10:00 am–12:30 pm", seats: 6 },
  { id: "clay-21", workshopId: "clay", date: "2026-11-21", time: "10:00 am–12:30 pm", seats: 2 },
  { id: "clay-28", workshopId: "clay", date: "2026-11-28", time: "10:00 am–12:30 pm", seats: 0 },
  { id: "print-15", workshopId: "print", date: "2026-11-15", time: "11:00 am–1:00 pm", seats: 8 },
  { id: "print-22", workshopId: "print", date: "2026-11-22", time: "11:00 am–1:00 pm", seats: 4 },
  { id: "table-22", workshopId: "table", date: "2026-11-22", time: "2:00 pm–5:00 pm", seats: 6 },
  { id: "table-29", workshopId: "table", date: "2026-11-29", time: "2:00 pm–5:00 pm", seats: 3 },
];

export class BookingError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "BookingError";
    this.field = field;
  }
}

export function createBooking() {
  return { workshopId: null, sessionId: null, participants: 1, stage: "choose" };
}

export function formatMoney(amount) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

export function formatDate(date, long = false) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: long ? "long" : "short",
    month: long ? "long" : "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

export function filterWorkshops({ category = "all", date = "all" } = {}) {
  return WORKSHOPS.filter((workshop) =>
    (category === "all" || workshop.id === category) &&
    (date === "all" || SESSIONS.some((session) => session.workshopId === workshop.id && session.date === date)),
  );
}

export function sessionsFor(workshopId) {
  return SESSIONS.filter((session) => session.workshopId === workshopId);
}

export function participantLimit(session) {
  return session ? Math.min(6, session.seats) : 0;
}

export function bookingSummary(state) {
  const workshop = WORKSHOPS.find((entry) => entry.id === state.workshopId);
  const session = SESSIONS.find((entry) => entry.id === state.sessionId);
  if (!workshop || !session || session.workshopId !== workshop.id || session.seats < 1) {
    throw new BookingError("Choose an available session to continue.", "session");
  }
  if (!Number.isInteger(state.participants) || state.participants < 1 || state.participants > participantLimit(session)) {
    throw new BookingError(`Choose between 1 and ${participantLimit(session)} participants for this session.`, "participants");
  }
  return { workshop, session, participants: state.participants, total: workshop.price * state.participants };
}

export function updateBooking(state, action) {
  if (action.type === "reset") return createBooking();
  if (action.type === "workshop") {
    if (!WORKSHOPS.some((entry) => entry.id === action.id)) throw new BookingError("Choose a workshop from the list.", "workshop");
    return { ...createBooking(), workshopId: action.id };
  }
  if (action.type === "edit") return { ...state, stage: "choose" };
  if (action.type === "confirm") {
    if (state.stage !== "review") throw new BookingError("Review your booking before confirming.", "review");
    bookingSummary(state);
    return { ...state, stage: "confirmed" };
  }
  if (state.stage !== "choose") throw new BookingError("Choose “Modify booking” to make a change.", "review");
  if (action.type === "session") {
    const session = SESSIONS.find((entry) => entry.id === action.id && entry.workshopId === state.workshopId);
    if (!session || session.seats < 1) throw new BookingError("That session is sold out. Choose another date.", "session");
    return { ...state, sessionId: session.id, participants: Math.min(state.participants, participantLimit(session)) };
  }
  if (action.type === "participants") {
    const session = SESSIONS.find((entry) => entry.id === state.sessionId && entry.workshopId === state.workshopId);
    if (!session) throw new BookingError("Choose a session before adding participants.", "session");
    if (!Number.isInteger(action.value) || action.value < 1 || action.value > participantLimit(session)) {
      throw new BookingError(`Choose between 1 and ${participantLimit(session)} participants for this session.`, "participants");
    }
    return { ...state, participants: action.value };
  }
  if (action.type === "review") {
    bookingSummary(state);
    return { ...state, stage: "review" };
  }
  throw new BookingError("That action is unavailable. Start a new demo booking.", "booking");
}
