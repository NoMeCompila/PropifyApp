## Context

In `PropertyDetailView.tsx`, seller state was previously evaluated as `isSeller = Boolean(currentUser && roleMode === 'seller')`. However, authenticated sellers often toggle to "Buyer Mode" via the header bar to preview how the catalog grid appears to prospective buyers. When clicking a property card from that preview, `roleMode` is `'buyer'`, which caused `PropertyDetailView` to render buyer contact actions rather than the seller management metrics.

See `proposal.md` for details.

## Goals / Non-Goals

**Goals:**
- Update `isSeller` determination in `PropertyDetailView.tsx` to `Boolean(currentUser)` so any logged-in user viewing property details accesses property telemetry, metrics, and management actions regardless of header preview mode.
- Maintain identical behavior for unauthenticated guests (`currentUser === null`).

**Non-Goals:**
- Altering header toggle functionality for the catalog view or dashboard navigation.

## Decisions

### Auth State as the Source of Truth for Seller Detail Actions
- **Decision**: Define `isSeller = Boolean(currentUser)`.
- **Rationale**: Any authenticated user in this system is an authorized seller/agent. Toggling the header role switch is an exploratory catalog filter/view preference rather than a logout. When viewing property details, an authenticated user must never be presented with forms to send messages or reservations to themselves.
