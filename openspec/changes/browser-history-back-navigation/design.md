## Context

The React single page application previously kept navigation in memory and `localStorage`. When the user clicked on a property or dashboard section, `setActivePage` switched components, but `window.history` was never updated. Browser Back button caused the browser to navigate out of the website.

See `proposal.md` for background.

## Goals / Non-Goals

**Goals:**
- Maintain URL search parameters in sync with active view states:
  - `page`: `catalog` | `detail` | `dashboard` | `listings` | `interactions` | `login`
  - `id`: property ID for detail view
  - `tab`: `inquiries` | `visits` | `reservations` for interactions view
  - `propertyId`: optional property filter for interactions view
- Use `window.history.pushState` on forward user navigations (clicking on properties, navbar buttons, dashboard cards).
- Listen to `window.addEventListener('popstate', onPopState)` to parse state/URL and update React state on Back/Forward actions without re-triggering redundant `pushState` calls.
- Support clean initial page load from URL parameters.

**Non-Goals:**
- Introducing heavy routing dependencies (like `react-router-dom`), keeping the codebase lightweight and performant with zero added dependencies.

## Decisions

### 1. Native HTML5 History API + URL Search Params
- **Decision**: Use `window.location.search`, `window.history.pushState`, and `popstate` directly in `src/App.tsx`.
- **Rationale**: Keeps the architecture simple, avoids breaking existing component props interfaces, and provides instant URL sharing (deep links) alongside back/forward navigation support.

### 2. State Sync Flow & Loop Prevention
- **Decision**: Implement a centralized `navigateTo(targetPage, options, replace?)` helper in `App.tsx`.
  - When `popstate` occurs, parse the URL and update React states directly with a flag (`isNavigatingFromPopstate = true`) so it does not issue an extra `pushState`.
- **Rationale**: Clean separation between user-initiated forward clicks (`pushState`) and browser-initiated history traversal (`popstate`).
