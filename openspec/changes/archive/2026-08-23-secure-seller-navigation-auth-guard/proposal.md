## Why

When an unauthenticated visitor clicks the "Vendedor" toggle in the header, the app switches `roleMode` to `'seller'` and redirects to the login screen. Because `BottomNavBar.tsx` only evaluated `roleMode === 'buyer'`, it displayed the seller navigation bar ("Tablero", "Propiedades", "Consultas", "Salir") to unauthenticated visitors on the login page. This allowed unauthenticated users to click those navigation buttons and navigate into seller views without signing in.

Enforcing strict authentication guards on both the mobile bottom navigation bar and route views ensures that seller navigation items and screens are exclusively accessible to authenticated sellers (`currentUser !== null`), while unauthenticated users always see the buyer navigation bar.

## What Changes

- **Strict Authentication Guard for Seller Bottom Navigation**: Update `BottomNavBar.tsx` to only render seller navigation items (Tablero, Propiedades, Consultas, Salir) when the user is genuinely authenticated (`currentUser !== null && roleMode === 'seller'`). When `currentUser === null`, the bottom navigation always renders the buyer navigation (Explorar, Filtros, Ingresar).
- **Route-Level Protection for Seller Views**: Guard `listings` and `interactions` routes in `App.tsx` (in addition to `dashboard`) so unauthenticated attempts to access them render `LoginView` or redirect to the login form.

## Capabilities

### Modified Capabilities
- `bottom-nav-auth-actions`: Restrict seller bottom navigation to authenticated users (`currentUser !== null`), ensuring unauthenticated visitors always see buyer navigation.

## Impact

- `src/components/BottomNavBar.tsx`: Condition seller navigation on `currentUser !== null && roleMode === 'seller'`.
- `src/App.tsx`: Enforce `currentUser` check for `listings` and `interactions` views.
