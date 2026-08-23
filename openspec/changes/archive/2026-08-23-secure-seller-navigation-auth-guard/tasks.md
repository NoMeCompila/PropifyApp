## 1. Bottom Navigation & Route Protection Update

- [x] 1.1 Update `BottomNavBar.tsx` to branch navigation strictly on `isSellerNav = Boolean(currentUser && roleMode === 'seller')`
- [x] 1.2 Update `App.tsx` routes for `listings` and `interactions` to require `currentUser`
- [x] 1.3 Verify unauthenticated visitor toggling to "Vendedor" sees the login view with buyer bottom navigation (Explorar, Filtros, Ingresar)
- [x] 1.4 Verify authenticated seller still sees seller navigation (Tablero, Propiedades, Consultas, Salir)
- [x] 1.5 Run TypeScript build check to confirm clean compilation
