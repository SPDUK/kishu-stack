# MERIDIAN interface system

This is an Operate surface: a fictional trader follows a market and tries a simulated order. The interface's precision, readable values, and familiar control behavior lead the design. MERIDIAN is an independent example brand, visually separate from the Kishu editorial site.

## Color and surfaces

| Role | Value | Use |
| --- | --- | --- |
| Background | `#0b1018` | Application shell and market rail |
| Panel | `#101721` | Price chart and ledger |
| Raised panel | `#121b26` | Order ticket and order book |
| Border | `#25303e` | Hairline work-area separation |
| Primary text | `#e9eef5` | Titles, values, actions |
| Secondary text | `#98a6b8` | Labels and supporting information |
| Muted text | `#78899f` | Axes and metadata |
| Mint | `#8bdfc5` | Primary buy action, price series, positive movement |
| Red | `#f08e9b` | Negative movement and sell direction |

Market logos use restrained per-asset hues. Semantic price changes always include a signed numerical percentage. Watchlist and selected states expose native pressed/selected state as well as color.

## Type and components

Geist carries labels, navigation, prose, and controls. Geist Mono carries prices, balances, measurements, and timestamps. Both are self-hosted through `../fonts/`. Functional text has a 12px minimum. A fixed scale reaches 32px for the selected price and 27px for portfolio value; phone price text remains 30px.

Controls use compact 3–5px radii. A single joined workspace uses a 9px outer radius and hairline internal divisions. Work areas have no decorative shadow; the chart tooltip has a small offset shadow to establish its temporary layer. Keyboard focus uses a visible mint outline.

## Layout

Above 1060px, the market list occupies a vertical rail. The central workspace uses a broad chart with the order ticket to its right and a holdings/activity ledger beneath it. The order book follows the ticket. Portfolio and cash summary stay outside that joined workspace.

At 1060px and below, the market list moves above the work areas in three columns. At 650px and below, markets use two columns; chart, ticket, ledger, and order book stack. At 360px and below, each market name and quote stack within their cell. The chart redraws through an adaptive viewBox and HTML axis labels; text is never scaled with the geometry.

## Motion and state

Price updates occur every 1.8 seconds without a flashing transition. The pause control remains directly above the workspace. Hidden documents and page navigation stop the timer. Reduced-motion preference starts the simulation paused. Hover and focus changes use 160ms color transitions; reduced motion removes them.

The chart's crosshair is an inspection aid with a keyboard equivalent and accessible history summary. Order validation appears inline and focuses the amount input; successful orders announce their simulated fill and switch the ledger to Activity. Empty search, empty watchlist, empty holdings, and empty activity states explain the next available action.
