export const ASSETS = Object.freeze([
  { symbol: "BTC", name: "Bitcoin", price: 68421.80, change: 2.84, volume: "28.42B", holding: 0.42, color: "#e6a35a" },
  { symbol: "ETH", name: "Ethereum", price: 3482.65, change: 1.67, volume: "14.18B", holding: 4.2, color: "#9da6ed" },
  { symbol: "SOL", name: "Solana", price: 172.34, change: 5.12, volume: "3.86B", holding: 28, color: "#9cd3ba" },
  { symbol: "AVAX", name: "Avalanche", price: 36.82, change: -1.24, volume: "482.61M", holding: 0, color: "#e4868e" },
  { symbol: "LINK", name: "Chainlink", price: 18.45, change: 0.86, volume: "326.42M", holding: 0, color: "#8da6e8" },
  { symbol: "DOT", name: "Polkadot", price: 7.28, change: -0.73, volume: "182.38M", holding: 0, color: "#db96b5" },
]);

export const TIMEFRAMES = Object.freeze({ "1H": 60, "24H": 1440, "1W": 10080, "1M": 43200 });
export const START_TIME = Date.UTC(2026, 10, 4, 16, 32);

function randomGenerator(seed) {
  let value = seed >>> 0;
  return () => {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

export function createMarket(seed = 12471) {
  return {
    seed, tick: 0, selected: "BTC", timeframe: "24H", paused: false,
    cash: 24860, assets: ASSETS.map((asset) => ({ ...asset })),
    watchlist: ["BTC", "ETH", "SOL"], orders: [],
  };
}

export function advanceMarket(state) {
  if (state.paused) return state;
  const tick = state.tick + 1;
  const random = randomGenerator(state.seed + tick * 739);
  return {
    ...state, tick,
    assets: state.assets.map((asset, index) => {
      const price = Math.max(0.01, asset.price * (1 + (random() - 0.47) * 0.0007));
      const anchor = ASSETS[index].price / (1 + ASSETS[index].change / 100);
      return { ...asset, price, change: (price / anchor - 1) * 100 };
    }),
  };
}

export function selectAsset(state, symbol) {
  return state.assets.some((asset) => asset.symbol === symbol) ? { ...state, selected: symbol } : state;
}

export function selectTimeframe(state, timeframe) {
  return Object.hasOwn(TIMEFRAMES, timeframe) ? { ...state, timeframe } : state;
}

export function toggleWatchlist(state, symbol) {
  if (!state.assets.some((asset) => asset.symbol === symbol)) return state;
  return { ...state, watchlist: state.watchlist.includes(symbol)
    ? state.watchlist.filter((item) => item !== symbol) : [...state.watchlist, symbol] };
}

export function portfolioValue(state) {
  return state.cash + state.assets.reduce((total, asset) => total + asset.price * asset.holding, 0);
}

export function getSeries(state) {
  const asset = state.assets.find((item) => item.symbol === state.selected);
  const assetIndex = ASSETS.findIndex((item) => item.symbol === state.selected);
  const minutes = TIMEFRAMES[state.timeframe];
  const random = randomGenerator(state.seed + assetIndex * 193 + minutes);
  const trend = (state.timeframe === "1H" ? 0.004 : state.timeframe === "24H" ? 0.029 : state.timeframe === "1W" ? 0.085 : 0.14);
  const points = Array.from({ length: 81 }, (_, index) => {
    const progress = index / 80;
    const wave = Math.sin(index * 0.39) * 0.003 + Math.sin(index * 0.96) * 0.0015;
    const shape = progress * trend + wave + (random() - 0.5) * 0.0035;
    return {
      time: START_TIME + state.tick * 1800 - (1 - progress) * minutes * 60000,
      price: asset.price * (1 - trend + shape),
      volume: 18 + random() * 63 + Math.abs(wave) * 11000,
    };
  });
  const offset = asset.price - points.at(-1).price;
  return points.map((point) => ({ ...point, price: point.price + offset }));
}

export function placeOrder(state, { side, symbol = state.selected, amount }) {
  const asset = state.assets.find((item) => item.symbol === symbol);
  if (!asset || !["buy", "sell"].includes(side)) return { ok: false, error: "Choose a market and order side." };
  const dollars = Number(amount);
  if (String(amount).trim() === "" || !Number.isFinite(dollars) || dollars <= 0) {
    return { ok: false, error: "Enter an amount in USD to simulate an order." };
  }
  if (dollars < 10) return { ok: false, error: "The minimum simulated order is $10." };
  if (Math.abs(dollars * 100 - Math.round(dollars * 100)) > 0.000001) {
    return { ok: false, error: "Use at most two decimal places for the USD amount." };
  }
  const available = side === "buy" ? state.cash : asset.holding * asset.price;
  if (dollars > available + 0.000001) {
    return { ok: false, error: side === "buy" ? "This exceeds your demo USD balance. Enter a smaller amount." : `This exceeds your demo ${symbol} holding. Enter a smaller amount.` };
  }
  const quantity = dollars / asset.price;
  const order = {
    id: `MD-${String(state.orders.length + 1).padStart(4, "0")}`,
    side, symbol, amount: dollars, quantity, price: asset.price,
    time: START_TIME + state.tick * 1800, status: "Simulated fill",
  };
  return {
    ok: true, order,
    state: {
      ...state, cash: Math.max(0, state.cash + (side === "buy" ? -dollars : dollars)),
      assets: state.assets.map((item) => item.symbol === symbol
        ? { ...item, holding: Math.max(0, item.holding + (side === "buy" ? quantity : -quantity)) } : item),
      orders: [order, ...state.orders],
    },
  };
}
