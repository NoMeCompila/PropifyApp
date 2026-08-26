## Why

When an authenticated user (seller) toggles the Role Switcher Pill in the header to browse in "Comprador" mode, the mobile bottom navigation bar currently renders `Explorar`, `Filtros`, and `Ingresar`. Displaying "Ingresar" to an already logged-in user is contradictory and confusing. The mobile navigation bar in Buyer mode must show `Salir` (with sign-out confirmation) when an active session exists, and only display `Ingresar` when unauthenticated.

## What Changes

- **Buyer Mode Authentication Action**: Update `BottomNavBar.tsx` to conditionally render the third action in Buyer mode based on session presence:
  - **Authenticated (`currentUser !== null`) in Buyer Mode**: Renders `Explorar`, `Filtros`, and `Salir` (which triggers the logout confirmation modal).
  - **Unauthenticated (`currentUser === null`) in Buyer Mode**: Renders `Explorar`, `Filtros`, and `Ingresar` (which navigates to `LoginView`).

## Capabilities

### New Capabilities
*(None)*

### Modified Capabilities
- `bottom-nav-auth-actions`: Update buyer mode navigation requirements so authenticated users in buyer mode see the `Salir` action with confirmation modal instead of `Ingresar`.

## Impact

- **Components**: `src/components/BottomNavBar.tsx` logic updated for role mode and session state combinations.
- **User Experience**: Consistent session control on mobile regardless of active role mode view.
