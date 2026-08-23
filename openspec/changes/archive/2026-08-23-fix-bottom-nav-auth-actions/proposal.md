## Why

In the mobile bottom navigation bar (`BottomNavBar.tsx`), when a seller is authenticated, tapping the "Mi Cuenta" button navigates directly to the login page (`activePage = 'login'`). Because the seller is already authenticated, this presents a login/register form and triggers an infinite re-login loop.

Additionally, for unauthenticated visitors browsing in buyer mode, the bottom navigation currently presents a theme toggle button rather than a prominent "Ingresar" (Sign In / Register) access point to easily log in.

## What Changes

- **Seller Bottom Navigation - Sign Out Action & Confirmation Modal**: Replace "Mi Cuenta" with a "Salir" (Log Out) action in the seller bottom navigation. When tapped, display a confirmation dialog ("¿Estás seguro de cerrar sesión?") with "Cancelar" and "Confirmar" options that cleanly invokes `onSignOut`.
- **Buyer Bottom Navigation - Login Action**: Replace the theme switcher button in buyer mobile navigation with an "Ingresar" button that navigates directly to `LoginView.tsx`.
- **Authenticated Login Guard**: Prevent authenticated users from getting stuck in the login form if navigated to `activePage = 'login'`.

## Capabilities

### New Capabilities
- `bottom-nav-auth-actions`: Role-aware authentication actions in the mobile bottom navigation bar, offering direct login for buyers and safe confirmation-guarded sign-out for sellers.

### Modified Capabilities
<!-- None -->

## Impact

- `src/components/BottomNavBar.tsx`: Update button elements and add a confirmation modal for sign-out.
- `src/App.tsx`: Pass `currentUser` and `onSignOut` to `BottomNavBar.tsx`.
