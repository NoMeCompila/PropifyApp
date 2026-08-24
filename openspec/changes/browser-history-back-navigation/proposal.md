## Why

In the current Single Page Application (SPA), routing is handled entirely in memory via React state (`activePage`, `selectedPropertyId`, `roleMode`). Because changes to `activePage` do not push entries into the browser's session history stack (`window.history.pushState`), the browser has no record of internal screen transitions.

Consequently, when a user clicks the **Back** or **Forward** button in a desktop browser, or performs the swipe/hardware back gesture on mobile, the browser navigates completely away from Propify (e.g. back to Google or a blank tab) instead of returning to the previous screen inside the application.

## What Changes

- **Browser History Integration via HTML5 History API & URL Search Params**:
  - Synchronize internal view state (`activePage`, `selectedPropertyId`, `interactionsInitialTab`, `interactionsPropertyFilter`) with browser history using URL search params (`?page=catalog`, `?page=detail&id=123`, `?page=dashboard`, `?page=listings`, `?page=interactions&tab=visits`, `?page=login`).
  - When navigating between screens via UI clicks, push new state entries using `window.history.pushState`.
  - Listen for native `popstate` events to restore the previous or next page state seamlessly when the user presses browser Back/Forward or swipes back on mobile.
  - Support direct deep-linking and reload from URL query params.

## Capabilities

### New Capabilities
- `browser-history-navigation`: Bidirectional synchronization between React application state and the browser's History API (`pushState` / `popstate`), enabling native Back and Forward buttons on desktop and mobile.

## Impact

- `src/App.tsx`: Manage URL parameter generation, pushState dispatching, and `popstate` event listener for seamless back/forward navigation.
