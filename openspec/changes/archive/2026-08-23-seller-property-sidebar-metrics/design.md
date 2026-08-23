## Context

Currently, `PropertyDetailView.tsx` unconditionally displays buyer-facing inquiry, scheduling, and reservation components in its right column (and in the fixed mobile bottom bar). In `App.tsx`, state for `currentUser: AuthUser | null`, `roleMode: 'buyer' | 'seller'`, `inquiries: Inquiry[]`, `visits: VisitSchedule[]`, and `reservations: Reservation[]` is already loaded from Supabase.

See `proposal.md` for background and motivation.

## Goals / Non-Goals

**Goals:**
- Determine seller mode in `PropertyDetailView` when the active user is an authenticated seller (`currentUser !== null && roleMode === 'seller'`).
- Display a dedicated seller telemetry sidebar on desktop with cards for:
  - Received Inquiries count (with unread badge if any).
  - Scheduled Visits count (with upcoming/confirmed status counts).
  - Reservations count.
  - Quick action shortcuts (e.g., edit property / navigate to listings).
- Clicking any metric card triggers navigation to `InteractionsView` focused on the corresponding tab (`inquiries`, `visits`, `reservations`) and pre-filtered to the active property ID.
- Adapt the fixed bottom mobile action bar to display seller telemetry shortcuts and view switches rather than buyer contact buttons.
- Keep the buyer experience 100% identical when not logged in or in buyer role.

**Non-Goals:**
- Altering database schema or backend Supabase tables (all necessary entities already exist).
- Building an in-place conversation messaging chat system; navigation jumps directly to `InteractionsView`.

## Decisions

### 1. State and Prop Delegation from App.tsx to PropertyDetailView.tsx
- **Decision**: Pass `currentUser`, `roleMode`, property-specific filtered interactions (`inquiries`, `visits`, `reservations`), and a navigation handler `onNavigateToInteractions(tab, propertyId)` as props to `PropertyDetailView`.
- **Rationale**: `App.tsx` already holds the global interaction lists and navigation dispatchers. Passing filtered subsets or counts directly keeps `PropertyDetailView` modular, pure, and easy to test.
- **Alternatives Considered**: Fetching interactions directly inside `PropertyDetailView`. Rejected to prevent redundant network calls and keep state synchronized with `App.tsx`.

### 2. InteractionsView Property Filtering Support
- **Decision**: Enhance `InteractionsView.tsx` with a selected property filter state (`selectedPropertyFilter: string | 'all'`) that can be initialized via props or updated by the user via a dropdown filter.
- **Rationale**: When a seller clicks "Ver 5 Consultas" from a specific property page, they expect `InteractionsView` to show only the 5 inquiries for that property, while still allowing them to clear the filter to see all inquiries.

### 3. Desktop and Mobile Seller UI Architecture
- **Decision**: Extract/render a dedicated `SellerPropertyActionsPanel` inside `PropertyDetailView` for the right column, and a corresponding `SellerMobileActionBar` for mobile viewports (`md:hidden`).
- **Rationale**: Keeps the conditional JSX clean, maintainable, and prevents messy inline ternary nesting within large layout templates.

## Risks / Trade-offs

- **[Risk]**: A seller may own some properties but view another seller's property while logged in.
  - **Mitigation**: Verify if `currentUser.id === property.seller.id` or general seller role mode. If seller views their own listing, render the full telemetry dashboard. If they view another agent's listing in seller mode, allow view-only or appropriate context.
- **[Trade-off]**: Filtering `InteractionsView` by property ID adds optional state in `App.tsx` (`interactionPropertyFilter`).
  - **Mitigation**: Keep the filter state in `App.tsx` or `InteractionsView` defaulted to `null`/`'all'` so normal navigation from header bar shows all interactions.
