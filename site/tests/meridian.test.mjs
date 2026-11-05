import test from "node:test";
import assert from "node:assert/strict";
import { createMarket, advanceMarket, selectAsset, selectTimeframe, toggleWatchlist, portfolioValue, getSeries, placeOrder } from "../dist/meridian/market.mjs";

test("simulated quotes are repeatable, finite, and stop when paused", () => {
  let first = createMarket();
  let second = createMarket();
  for (let index = 0; index < 500; index += 1) {
    first = advanceMarket(first);
    second = advanceMarket(second);
  }
  assert.deepEqual(first, second);
  assert.notEqual(first.assets[0].price, createMarket().assets[0].price);
  assert.ok(first.assets.every((asset) => Number.isFinite(asset.price) && asset.price > 0));
  const paused = { ...first, paused: true };
  assert.equal(advanceMarket(paused), paused);
});

test("asset and timeframe changes produce distinct history ending at the visible quote", () => {
  const original = createMarket();
  const hourly = getSeries(selectTimeframe(original, "1H"));
  const daily = getSeries(original);
  const ethereum = getSeries(selectAsset(original, "ETH"));
  assert.equal(daily.at(-1).price, original.assets[0].price);
  assert.equal(ethereum.at(-1).price, original.assets[1].price);
  assert.equal(hourly.at(-1).time - hourly[0].time, 3600000);
  assert.equal(daily.at(-1).time - daily[0].time, 86400000);
  assert.notDeepEqual(hourly, daily);
  assert.equal(selectAsset(original, "UNKNOWN"), original);
  assert.equal(selectTimeframe(original, "invalid"), original);
  assert.ok(daily.every((point, index) => index === 0 || point.time > daily[index - 1].time));
});

test("watchlist membership toggles without changing selected market", () => {
  const original = createMarket();
  const removed = toggleWatchlist(original, "BTC");
  assert.equal(removed.watchlist.includes("BTC"), false);
  assert.equal(removed.selected, "BTC");
  assert.deepEqual(toggleWatchlist(removed, "BTC").watchlist.toSorted(), original.watchlist.toSorted());
  assert.deepEqual(original.watchlist, ["BTC", "ETH", "SOL"]);
});

test("invalid demo orders preserve balances and explain recovery", () => {
  const original = createMarket();
  for (const amount of ["", " ", "nope", NaN, Infinity, -1, 0, 9.99, 10.001]) {
    const result = placeOrder(original, { side: "buy", amount });
    assert.equal(result.ok, false);
    assert.ok(result.error.length > 10);
  }
  assert.equal(placeOrder(original, { side: "buy", amount: 24861 }).ok, false);
  assert.equal(placeOrder(original, { side: "sell", symbol: "AVAX", amount: 10 }).ok, false);
  assert.equal(placeOrder(original, { side: "transfer", amount: 10 }).ok, false);
  assert.equal(original.cash, 24860);
  assert.equal(original.orders.length, 0);
});

test("a simulated buy then sell updates holdings and cash without creating value", () => {
  const original = createMarket();
  const bought = placeOrder(original, { side: "buy", amount: 1200 });
  assert.equal(bought.ok, true);
  assert.equal(bought.state.cash, original.cash - 1200);
  assert.equal(bought.state.orders[0].status, "Simulated fill");
  assert.equal(bought.state.orders[0].id, "MD-0001");
  assert.ok(bought.state.assets[0].holding > original.assets[0].holding);
  assert.ok(Math.abs(portfolioValue(bought.state) - portfolioValue(original)) < 0.000001);
  const sold = placeOrder(bought.state, { side: "sell", amount: 1200 });
  assert.equal(sold.state.cash, original.cash);
  assert.ok(Math.abs(sold.state.assets[0].holding - original.assets[0].holding) < 0.000000001);
  assert.equal(sold.state.orders.length, 2);
  assert.equal(sold.state.orders[0].id, "MD-0002");
});

test("using the available USD balance at cent precision cannot produce negative balances", () => {
  const original = createMarket();
  const bought = placeOrder(original, { side: "buy", amount: original.cash });
  assert.equal(bought.state.cash, 0);
  const asset = bought.state.assets[0];
  const availableDollars = Math.floor(asset.holding * asset.price * 100) / 100;
  const sold = placeOrder(bought.state, { side: "sell", amount: availableDollars });
  assert.equal(sold.ok, true);
  assert.ok(sold.state.assets[0].holding >= 0);
  assert.ok(sold.state.assets[0].holding * asset.price < 0.01);
  assert.ok(sold.state.cash > 0);
});
