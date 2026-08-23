## 1. BottomNavBar Component Update

- [x] 1.1 Update `BottomNavBarProps` in `src/components/BottomNavBar.tsx` to receive `onSignOut?: () => void` and `currentUser?: AuthUser | null`
- [x] 1.2 Replace the theme toggle button in buyer mode navigation with "Ingresar" (`LogIn` icon) pointing to `onNavigate('login')`
- [x] 1.3 Replace "Mi Cuenta" in seller mode navigation with "Salir" (`LogOut` icon)
- [x] 1.4 Implement the sign-out confirmation dialog ("¿Cerrar Sesión?") with "Cancelar" and "Confirmar" actions

## 2. App Integration & Validation

- [x] 2.1 Update `BottomNavBar` invocation in `src/App.tsx` to pass `onSignOut={handleSignOut}` and `currentUser={currentUser}`
- [x] 2.2 Verify mobile viewport behavior for both buyer (Ingresar button) and seller (Salir with confirmation modal)
- [x] 2.3 Run TypeScript build check to confirm clean compilation
