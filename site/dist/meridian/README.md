# MERIDIAN

A fictional crypto workspace built as a public Kishu example. Open `/meridian/index.html` through the existing site preview server.

All prices, balances, order-book levels, and fills are synthetic. No remote market API, wallet, authentication, payment, or transaction service is connected. Changes live in memory and reset on reload. The fixed simulation begins on November 4, 2026, at 16:32 UTC; it does not represent current market conditions.

## Working interactions

- Select BTC, ETH, SOL, AVAX, LINK, or DOT. Search names/symbols, star assets, and filter the watchlist, including empty states.
- Switch between one hour, 24 hours, one week, and one month of deterministic price history. Inspect individual samples with a pointer or with the chart's left/right arrow keys, Home, and End.
- Pause or resume the simulation. Quotes stop while the document is hidden; reduced-motion preference starts paused and can be overridden explicitly with Resume.
- Simulate a buy or sell in USD, including balance percentages. Orders validate the $10 minimum, available USD, and available asset holdings, then update the fictional balances and activity ledger. Simulated fees are zero.
- Switch between holdings and activity with mouse, touch, or keyboard tabs. The activity navigation link opens the activity view.

The first viewport prioritizes the selected market and price history. Desktop separates the market rail, central chart, order ticket, holdings ledger, and order book. On phones, markets become a two-column list and work areas stack at readable sizes. Nothing relies on a cropped desktop canvas.

## Verification

Executed November 4, 2026:

```text
node --test tests/meridian.test.mjs
6 tests passed; 0 failed.

node --check dist/meridian/app.mjs
node --check dist/meridian/market.mjs
Both passed.
```

The tests cover 500 deterministic simulation ticks, pause behavior, distinct asset/timeframe histories, valid chronological samples, watchlist membership, rejected malformed/under-minimum/over-balance/excess-precision orders, portfolio conservation through a buy/sell round trip, unique order IDs, and use of the available USD balance at cent precision without negative holdings or cash. Max sell rounds down to cents and can leave an asset remainder worth less than one cent.

Supplemental Chrome checks exercised asset selection, timeframe changes, keyboard chart inspection, search empty states, watchlist removal, pause/resume, simulated buy and sell balance/activity changes, and overspend validation. All passed without a runtime exception. Supplemental captures showed no horizontal page overflow at 1440, 390, and 320 pixels; the parent integration task owns final CUA captures and independent visual review. A subsequent text-size correction raised the narrowest back link from 11px to 12px.

Impeccable's mechanical detector ran once. Its small functional-text findings were corrected to a 12px floor. Its Kishu-main-site font/radius advisories concern a separate visual identity; this independently branded surface uses the system recorded in `DESIGN.md`.

## Implementation and credits

`market.mjs` is deterministic, DOM-independent market and order logic; `app.mjs` binds the interface. `index.html`, `styles.css`, and the small authored SVG mark have no build step. The page uses the repository's self-hosted Geist and Geist Mono fonts and their existing license files in `../fonts/`.

Created through Kishu mode. Kishu provides the working mode and routing; its bundled pstack, Impeccable, and i-have-adhd sources are credited in the repository's attribution and license records. The brand mark, interface, asset icon geometry, and chart geometry in this demo were authored for MERIDIAN. No raster imagery was necessary.
