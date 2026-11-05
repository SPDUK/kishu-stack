import { createMarket, advanceMarket, selectAsset, selectTimeframe, toggleWatchlist, portfolioValue, getSeries, placeOrder, START_TIME } from "./market.mjs";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const money = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
const number = (value, digits = 2) => new Intl.NumberFormat("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
const percent = (value) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
const shortTime = (time, date = false) => new Intl.DateTimeFormat("en-GB", date ? { month: "short", day: "numeric", timeZone: "UTC" } : { hour: "2-digit", minute: "2-digit", timeZone: "UTC", hour12: false }).format(time);
const icon = (name, className = "") => `<svg class="${className}" aria-hidden="true"><use href="#${name}"/></svg>`;
const coin = (asset, large = false) => `<span class="coin${large ? " coin-large" : ""}" style="--coin-color:${asset.color}">${icon(`coin-${asset.symbol}`)}</span>`;
let state = createMarket();
let side = "buy";
let onlyWatchlist = false;
let query = "";
let interval = null;
let inspection = null;
let lastSeries = [];
let currentTab = "holdings";
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
if (reducedMotion.matches) state = { ...state, paused: true };

function selectedAsset() { return state.assets.find((asset) => asset.symbol === state.selected); }
function announce(message) { $("#announcer").textContent = message; }

function renderMarkets() {
  const focused = document.activeElement?.dataset?.focusKey;
  const assets = state.assets.filter((asset) => (!onlyWatchlist || state.watchlist.includes(asset.symbol)) && `${asset.name} ${asset.symbol}`.toLowerCase().includes(query));
  $("#market-list").innerHTML = assets.map((asset) => {
    const watched = state.watchlist.includes(asset.symbol);
    return `<div class="market-row${asset.symbol === state.selected ? " selected" : ""}"><button class="market-select" data-asset="${asset.symbol}" data-focus-key="select-${asset.symbol}" aria-pressed="${asset.symbol === state.selected}" aria-label="View ${asset.name}, ${money(asset.price)}, ${percent(asset.change)} in 24 hours">${coin(asset)}<div class="market-identity"><div><div class="market-symbol">${asset.symbol}</div><div class="market-name">${asset.name}</div></div><div class="market-quote"><div class="market-price">${number(asset.price)}</div><div class="market-change ${asset.change >= 0 ? "positive" : "negative"}">${percent(asset.change)}</div></div></div></button><button class="star-button" data-watch="${asset.symbol}" data-focus-key="watch-${asset.symbol}" aria-label="${watched ? "Remove" : "Add"} ${asset.name} ${watched ? "from" : "to"} watchlist" aria-pressed="${watched}">${icon("i-star")}</button></div>`;
  }).join("");
  $("#market-empty").hidden = assets.length > 0;
  $("#market-empty").textContent = query ? "No assets match. Try a name or symbol, like ETH." : "Your watchlist is clear. Choose All assets and star a market to add it here.";
  $("#watchlist-count").textContent = state.watchlist.length;
  if (focused) document.querySelector(`[data-focus-key="${focused}"]`)?.focus({ preventScroll: true });
}

function renderPortfolio() {
  const total = portfolioValue(state);
  $("#portfolio-total").textContent = money(total);
  $("#cash-total").textContent = money(state.cash);
  const holdings = state.assets.filter((asset) => asset.holding > 0.00000001);
  $(".portfolio-value>span").textContent = `Across ${holdings.length} ${holdings.length === 1 ? "asset" : "assets"} & USD`;
  $("#holding-count").textContent = holdings.length;
  $("#allocation-cash").textContent = `${Math.round(state.cash / total * 100)}% cash`;
  $("#allocation-bar").innerHTML = [...holdings.map((asset) => ({ name: asset.symbol, value: asset.price * asset.holding, color: asset.color })), { name: "USD", value: state.cash, color: "#52647c" }].map((part) => `<span style="width:${part.value / total * 100}%;background:${part.color}" title="${part.name}: ${Math.round(part.value / total * 100)}%"></span>`).join("");
  $("#allocation-bar").setAttribute("aria-label", [...holdings.map((asset) => `${asset.symbol} ${Math.round(asset.price * asset.holding / total * 100)}%`), `USD ${Math.round(state.cash / total * 100)}%`].join(", "));
  $(".allocation-legend").innerHTML = [...holdings.map((asset) => `<span><i style="background:${asset.color}"></i>${asset.symbol}</span>`), '<span><i class="cash-color"></i>USD</span>'].join("");
  $("#holdings-body").innerHTML = holdings.length ? holdings.map((asset) => `<tr><td><div class="holding-asset">${coin(asset)}<div><strong>${asset.symbol}</strong><small>${asset.name}</small></div></div></td><td class="holding-number">${number(asset.holding, asset.holding < 1 ? 4 : 2)}<span class="holding-unit">${asset.symbol}</span></td><td class="holding-number">${money(asset.price * asset.holding)}</td><td class="holding-number ${asset.change >= 0 ? "positive" : "negative"}">${percent(asset.change)}</td></tr>`).join("") : `<tr><td colspan="4">Your demo funds are all in USD. Simulate a buy to add an asset.</td></tr>`;
}

function renderQuote() {
  const asset = selectedAsset();
  $("#selected-coin").innerHTML = icon(`coin-${asset.symbol}`);
  $("#selected-coin").style.setProperty("--coin-color", asset.color);
  $("#asset-heading").textContent = asset.name;
  $("#asset-pair").textContent = `${asset.symbol} / USD`;
  $("#selected-price").textContent = money(asset.price);
  $("#selected-change").innerHTML = `${percent(asset.change)} <span>24h</span>`;
  $("#selected-change").className = `price-change ${asset.change >= 0 ? "positive" : "negative"}`;
  $("#day-high").textContent = number(asset.price * 1.0126);
  $("#day-low").textContent = number(asset.price * 0.9651);
  $("#day-volume").textContent = `$${asset.volume}`;
  const watched = state.watchlist.includes(asset.symbol);
  $("#asset-watch").setAttribute("aria-pressed", String(watched));
  $("#asset-watch").setAttribute("aria-label", `${watched ? "Remove" : "Add"} ${asset.name} ${watched ? "from" : "to"} watchlist`);
}

function renderChart() {
  const asset = selectedAsset();
  lastSeries = getSeries(state);
  const prices = lastSeries.map((point) => point.price);
  const min = Math.min(...prices), max = Math.max(...prices), padding = (max - min) * 0.14;
  const lower = min - padding, upper = max + padding;
  const x = (index) => index / (lastSeries.length - 1) * 800;
  const y = (price) => 12 + (1 - (price - lower) / (upper - lower)) * 226;
  const points = lastSeries.map((point, index) => [x(index), y(point.price)]);
  const path = points.map(([px, py], index) => `${index ? "L" : "M"}${px.toFixed(2)},${py.toFixed(2)}`).join(" ");
  const grid = [0, 1, 2, 3, 4].map((index) => {
    const py = 15 + index * 55;
    return `<path d="M0 ${py}H800" stroke="#2a3543" stroke-width="1" vector-effect="non-scaling-stroke"/>`;
  }).join("");
  const volume = lastSeries.map((point, index) => {
    const isUp = !index || point.price >= lastSeries[index - 1].price;
    return `<rect x="${x(index) - 2.4}" y="${320 - point.volume * 0.43}" width="4.8" height="${point.volume * 0.43}" fill="${isUp ? "#3e6a61" : "#6a444d"}" opacity=".48"/>`;
  }).join("");
  $("#price-svg").innerHTML = `${grid}<path d="${path} L800,252 L0,252 Z" fill="#8bdfc5" opacity=".035"/><g>${volume}</g><path d="${path}" fill="none" stroke="#8bdfc5" stroke-width="1.8" vector-effect="non-scaling-stroke"/><path d="M0 ${y(asset.price)}H800" stroke="#8bdfc5" opacity=".26" stroke-width="1" stroke-dasharray="3 5" vector-effect="non-scaling-stroke"/><circle cx="800" cy="${y(asset.price)}" r="3" fill="#8bdfc5"/><g id="crosshair" hidden><path id="crosshair-line" stroke="#8c9fb5" stroke-width="1" stroke-dasharray="3 4" vector-effect="non-scaling-stroke"/><circle id="crosshair-point" r="4" fill="#101721" stroke="#a0e8d1" stroke-width="2" vector-effect="non-scaling-stroke"/></g>`;
  $("#price-axis").innerHTML = [0, 1, 2, 3, 4].map((index) => `<span style="top:${(15 + index * 55) / 320 * 100}%">${number(upper - (upper - lower) * ((15 + index * 55 - 12) / 226), asset.price < 10 ? 3 : 0)}</span>`).join("");
  const date = ["1W", "1M"].includes(state.timeframe);
  $("#time-axis").innerHTML = [0, 20, 40, 60, 80].map((index) => `<span>${shortTime(lastSeries[index].time, date)}</span>`).join("");
  $("#chart-summary").textContent = `${asset.name} simulated ${state.timeframe} price history, from ${money(lastSeries[0].price)} to ${money(asset.price)}. Low ${money(min)}, high ${money(max)}. Volume bars are fictional.`;
  $("#chart-plot").setAttribute("aria-label", `${asset.name} simulated ${state.timeframe} price chart. Use left and right arrow keys to inspect prices.`);
  $("#chart-plot").dataset.lower = lower;
  $("#chart-plot").dataset.upper = upper;
  if (inspection !== null) showInspection(inspection);
}

function showInspection(index) {
  inspection = Math.max(0, Math.min(80, index));
  const point = lastSeries[inspection];
  const lower = Number($("#chart-plot").dataset.lower), upper = Number($("#chart-plot").dataset.upper);
  const x = inspection / 80 * 800, y = 12 + (1 - (point.price - lower) / (upper - lower)) * 226;
  $("#crosshair").removeAttribute("hidden");
  $("#crosshair-line").setAttribute("d", `M${x} 0V320`);
  $("#crosshair-point").setAttribute("cx", x);
  $("#crosshair-point").setAttribute("cy", y);
  const tooltip = $("#chart-tooltip");
  tooltip.hidden = false;
  tooltip.innerHTML = `<span>${shortTime(point.time, ["1W", "1M"].includes(state.timeframe))} UTC · ${state.selected}</span>${money(point.price)}`;
  const width = $("#chart-plot").clientWidth;
  tooltip.style.left = `${Math.max(4, Math.min(width - 156, inspection / 80 * width - 70))}px`;
}

function hideInspection() {
  inspection = null;
  $("#crosshair")?.setAttribute("hidden", "");
  $("#chart-tooltip").hidden = true;
}

function renderOrder() {
  const asset = selectedAsset();
  const amount = Math.max(0, Number($("#order-amount").value) || 0);
  $("#order-available").textContent = side === "buy" ? `${number(state.cash)} USD` : `${number(asset.holding, 6)} ${asset.symbol}`;
  $("#order-quantity").textContent = `${number(amount / asset.price, 6)} ${asset.symbol}`;
  $("#order-total").textContent = money(amount);
  $("#order-submit").innerHTML = `Simulate ${side} <span>${asset.symbol}</span>${icon("i-chev")}`;
  $("#order-submit").classList.toggle("sell", side === "sell");
  for (const item of ["buy", "sell"]) {
    $(`#${item}-side`).classList.toggle("active", side === item);
    $(`#${item}-side`).setAttribute("aria-pressed", String(side === item));
  }
}

function renderBook() {
  const asset = selectedAsset();
  const quantity = asset.symbol === "BTC" ? 0.001 : asset.symbol === "ETH" ? 0.04 : 0.9;
  const rows = (direction) => [0, 1, 2, 3].map((index) => {
    const level = direction === "ask" ? 4 - index : index + 1;
    const price = asset.price * (1 + (direction === "ask" ? 1 : -1) * level * 0.00011);
    const size = quantity * (7 + ((state.tick + index * 13 + (direction === "ask" ? 5 : 9)) % 41));
    return `<div class="book-row ${direction}" style="--depth:${26 + ((index * 23 + state.tick * 3) % 70)}%"><span>${number(price)}</span><span>${number(size, asset.symbol === "BTC" ? 4 : 3)}</span><span>${number(size * price, 0)}</span></div>`;
  }).join("");
  $("#asks").innerHTML = rows("ask");
  $("#bids").innerHTML = rows("bid");
  $("#book-symbol").textContent = asset.symbol;
  $("#book-mid-price").textContent = number(asset.price);
}

function renderActivity() {
  $("#activity-count").textContent = state.orders.length;
  $("#activity-empty").hidden = state.orders.length > 0;
  $("#orders-list").innerHTML = state.orders.map((order) => `<div class="order-item"><span class="order-direction ${order.side}">${icon("i-arrow")}</span><div><strong>${order.side === "buy" ? "Bought" : "Sold"} ${number(order.quantity, 6)} ${order.symbol}</strong><small>${order.id} · ${shortTime(order.time)} UTC</small></div><div>${money(order.amount)}<small>Simulated fill</small></div></div>`).join("");
}

function renderStatus() {
  document.body.classList.toggle("paused", state.paused);
  $("#simulation-toggle").setAttribute("aria-pressed", String(state.paused));
  $("#simulation-toggle").innerHTML = `${icon(state.paused ? "i-play" : "i-pause")}<span>${state.paused ? "Resume simulation" : "Pause simulation"}</span>`;
  $("#simulation-status").textContent = state.paused ? "Simulation paused" : "Simulation running";
  const time = START_TIME + state.tick * 1800;
  $("#simulation-time").textContent = `${new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "UTC", hour12: false }).format(time)} UTC`;
  $("#simulation-time").dateTime = new Date(time).toISOString();
}

function render() { renderMarkets(); renderPortfolio(); renderQuote(); renderChart(); renderOrder(); renderBook(); renderActivity(); renderStatus(); }
function clearOrderMessage() {
  $("#order-error").textContent = "";
  $("#order-amount").removeAttribute("aria-invalid");
  $("#order-feedback").textContent = "";
}

function setTab(tab, moveFocus = false) {
  currentTab = tab;
  for (const item of ["holdings", "activity"]) {
    const active = item === tab;
    $(`#${item}-tab`).setAttribute("aria-selected", String(active));
    $(`#${item}-tab`).tabIndex = active ? 0 : -1;
    $(`#${item}-panel`).hidden = !active;
  }
  if (moveFocus) $(`#${tab}-tab`).focus();
}

function syncTimer() {
  clearInterval(interval);
  interval = null;
  if (!document.hidden && !state.paused) interval = setInterval(() => { state = advanceMarket(state); render(); }, 1800);
}

$("#market-list").addEventListener("click", (event) => {
  const select = event.target.closest("[data-asset]");
  const watch = event.target.closest("[data-watch]");
  if (select) {
    state = selectAsset(state, select.dataset.asset);
    hideInspection(); clearOrderMessage(); render();
    announce(`${selectedAsset().name} market selected.`);
  }
  if (watch) {
    const asset = state.assets.find((item) => item.symbol === watch.dataset.watch);
    state = toggleWatchlist(state, asset.symbol); renderMarkets(); renderQuote();
    announce(`${asset.name} ${state.watchlist.includes(asset.symbol) ? "added to" : "removed from"} watchlist.`);
  }
});
$("#market-search").addEventListener("input", (event) => { query = event.target.value.trim().toLowerCase(); renderMarkets(); });
for (const [selector, filter] of [["#all-markets", false], ["#watchlist-filter", true]]) {
  $(selector).addEventListener("click", () => {
    onlyWatchlist = filter;
    $("#all-markets").setAttribute("aria-pressed", String(!filter));
    $("#all-markets").classList.toggle("active", !filter);
    $("#watchlist-filter").setAttribute("aria-pressed", String(filter));
    $("#watchlist-filter").classList.toggle("active", filter);
    renderMarkets();
  });
}
$("#asset-watch").addEventListener("click", () => { state = toggleWatchlist(state, state.selected); renderMarkets(); renderQuote(); announce(`${selectedAsset().name} ${state.watchlist.includes(state.selected) ? "added to" : "removed from"} watchlist.`); });
$$('[data-timeframe]').forEach((button) => button.addEventListener("click", () => {
  state = selectTimeframe(state, button.dataset.timeframe);
  $$('[data-timeframe]').forEach((item) => { const active = item.dataset.timeframe === state.timeframe; item.classList.toggle("active", active); item.setAttribute("aria-pressed", String(active)); });
  hideInspection(); renderChart(); announce(`${state.timeframe} price history selected.`);
}));
$("#simulation-toggle").addEventListener("click", () => { state = { ...state, paused: !state.paused }; syncTimer(); renderStatus(); announce(state.paused ? "Market simulation paused." : "Market simulation resumed."); });
document.addEventListener("visibilitychange", syncTimer);
window.addEventListener("pagehide", () => { clearInterval(interval); interval = null; });
window.addEventListener("pageshow", syncTimer);
reducedMotion.addEventListener("change", (event) => { if (event.matches) { state = { ...state, paused: true }; syncTimer(); renderStatus(); } });
$("#chart-plot").addEventListener("pointermove", (event) => { const rect = event.currentTarget.getBoundingClientRect(); showInspection(Math.round((event.clientX - rect.left) / rect.width * 80)); });
$("#chart-plot").addEventListener("pointerleave", () => { if (document.activeElement !== $("#chart-plot")) hideInspection(); });
$("#chart-plot").addEventListener("focus", () => showInspection(inspection ?? 80));
$("#chart-plot").addEventListener("blur", hideInspection);
$("#chart-plot").addEventListener("keydown", (event) => {
  if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
    event.preventDefault();
    showInspection(event.key === "Home" ? 0 : event.key === "End" ? 80 : (inspection ?? 80) + (event.key === "ArrowLeft" ? -1 : 1));
    announce(`${shortTime(lastSeries[inspection].time)} UTC, ${money(lastSeries[inspection].price)}.`);
  }
});
for (const item of ["buy", "sell"]) $(`#${item}-side`).addEventListener("click", () => { side = item; clearOrderMessage(); renderOrder(); });
$("#order-amount").addEventListener("input", () => { clearOrderMessage(); renderOrder(); });
$$('[data-percent]').forEach((button) => button.addEventListener("click", () => {
  const asset = selectedAsset();
  const available = side === "buy" ? state.cash : asset.holding * asset.price;
  $("#order-amount").value = (Math.floor(available * Number(button.dataset.percent)) / 100).toFixed(2);
  clearOrderMessage(); renderOrder();
}));
$("#order-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const result = placeOrder(state, { side, amount: $("#order-amount").value });
  if (!result.ok) {
    $("#order-error").textContent = result.error;
    $("#order-amount").setAttribute("aria-invalid", "true");
    $("#order-amount").focus();
    return;
  }
  state = result.state;
  clearOrderMessage();
  $("#order-amount").value = "";
  render(); setTab("activity");
  $("#order-feedback").textContent = `Simulated ${side}: ${number(result.order.quantity, 6)} ${result.order.symbol} for ${money(result.order.amount)}. Added to Activity.`;
});
for (const item of ["holdings", "activity"]) $(`#${item}-tab`).addEventListener("click", () => setTab(item));
$(".ledger-tabs").addEventListener("keydown", (event) => {
  if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
    event.preventDefault();
    setTab(event.key === "Home" ? "holdings" : event.key === "End" ? "activity" : currentTab === "holdings" ? "activity" : "holdings", true);
  }
});
document.querySelector('nav a[href="#activity"]').addEventListener("click", () => setTab("activity"));
render();
syncTimer();
