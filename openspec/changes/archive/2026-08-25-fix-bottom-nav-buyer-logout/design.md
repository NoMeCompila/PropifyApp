## Context

See [proposal.md](file:///c:/Users/FeR/Desktop/AllProjects/PropifyApp/openspec/changes/fix-bottom-nav-buyer-logout/proposal.md) for background.

Currently in `src/components/BottomNavBar.tsx`:
- `isSellerNav` is computed as `Boolean(currentUser && roleMode === 'seller')`.
- When `isSellerNav` is false (buyer mode or unauthenticated visitor), the component renders the Buyer mode navigation:
  1. `Explorar`
  2. `Filtros` (if `onOpenMobileFilter` is provided)
  3. `Ingresar` (unconditionally hardcoded).
- If an authenticated seller switches the Role Switcher Pill in the header to `Comprador`, `isSellerNav` becomes false, causing the navigation bar to display `Ingresar` instead of `Salir`.

## Goals / Non-Goals

**Goals:**
- In Buyer mode, conditionally render `Salir` (with sign-out confirmation modal) if `currentUser` is authenticated.
- In Buyer mode, render `Ingresar` (pointing to `LoginView`) only if `currentUser` is unauthenticated (`null` or `undefined`).
- Maintain existing styling, icon sizes, and confirmation modal workflows.

**Non-Goals:**
- Changing seller mode tabs (`Tablero`, `Propiedades`, `Consultas`, `Salir`).
- Altering header role switcher behavior.

## Decisions

### Decision 1: Conditional Auth Action in Buyer Mode
- **Choice**: Inside the buyer branch of `BottomNavBar.tsx`, check `currentUser`:
  - If `currentUser` is truthy: Render the `Salir` button with `LogOut` icon and `onClick={() => setIsLogoutConfirmOpen(true)}`.
  - If `currentUser` is falsy: Render the `Ingresar` button with `LogIn` icon and `onClick={() => onNavigate('login')}`.
- **Rationale**: Direct, minimal change that preserves exact UI layout and styling conventions while resolving the state contradiction.

## Risks / Trade-offs

- **[Risk: Accidental sign-out in buyer mode]** → Reuses the existing `isLogoutConfirmOpen` confirmation modal before calling `onSignOut`, preventing accidental logouts.
