## Context

In `src/components/BottomNavBar.tsx`, the layout was branched using `roleMode === 'buyer' ? (...) : (...)`. When an unauthenticated user clicks "Vendedor" on the header, `roleMode` is updated to `'seller'` while navigating to `'login'`. Because the user is not authenticated, this caused the bottom bar to show seller options (Tablero, Propiedades, Consultas, Salir) on mobile.

See `proposal.md` for background.

## Goals / Non-Goals

**Goals:**
- Enforce `const isSellerNav = Boolean(currentUser && roleMode === 'seller')` inside `BottomNavBar.tsx`.
- If `!isSellerNav`, render the buyer navigation (`Explorar`, `Filtros`, `Ingresar`).
- In `App.tsx`, safeguard seller routes (`listings`, `interactions`) behind `currentUser` so direct navigation without auth routes to `LoginView`.

**Non-Goals:**
- Removing the "Vendedor" button in the header bar (it correctly navigates to login when unauthenticated).

## Decisions

### 1. Source of Truth for Seller Navigation
- **Decision**: `isSellerNav = Boolean(currentUser && roleMode === 'seller')`.
- **Rationale**: An unauthenticated user must never see or interact with privileged seller navigation items regardless of what role toggle is active in header state.

### 2. Route Protection in App.tsx
- **Decision**: Render `LoginView` (or redirect) if `activePage` is `'dashboard'`, `'listings'`, or `'interactions'` when `!currentUser`.
- **Rationale**: Complete defense-in-depth preventing unauthorized access.
