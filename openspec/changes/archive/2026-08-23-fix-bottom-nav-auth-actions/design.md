## Context

The mobile navigation bar component `BottomNavBar.tsx` currently renders "Mi Cuenta" (`onNavigate('login')`) for sellers and a theme toggle for buyers. For sellers, clicking "Mi Cuenta" leads to `activePage = 'login'`, prompting a re-login loop despite already having an active session in Supabase.

See `proposal.md` for additional motivation.

## Goals / Non-Goals

**Goals:**
- Replace the 4th item in `BottomNavBar` for sellers with a "Salir" button (`LogOut` icon).
- Add a confirmation modal in `BottomNavBar.tsx` (or managed via callbacks) asking "¿Estás seguro de que deseas cerrar sesión?".
- Replace the 3rd item in `BottomNavBar` for buyers with an "Ingresar" button (`LogIn` icon).
- Pass `onSignOut` from `App.tsx` into `BottomNavBar.tsx`.

**Non-Goals:**
- Removing the theme switcher from the desktop `HeaderBar.tsx` (the header bar already contains a dedicated, compact `ThemeToggle`).

## Decisions

### 1. Embedded Confirmation Modal in BottomNavBar
- **Decision**: Manage the confirmation modal state (`isLogoutConfirmOpen`) locally inside `BottomNavBar.tsx` using `motion/react` modal animation or simple dialog.
- **Rationale**: Keeps the interaction self-contained, avoiding prop drilling while directly invoking `onSignOut`.
- **Alternatives Considered**: Direct sign-out with no confirmation. Rejected per user requirement ("mostrar un mensaje de 'esta seguro de terminar sesion?' en formato de pequeño modal con las opciones: confirmar/cancelar").

### 2. Buyer Navigation Items Alignment
- **Decision**: In buyer mode, `BottomNavBar` renders 3 balanced items:
  1. Explorar (`Home` icon) -> `onNavigate('catalog')`
  2. Filtros (`Filter` icon) -> `onOpenMobileFilter()`
  3. Ingresar (`LogIn` icon) -> `onNavigate('login')`
- **Rationale**: Clean, consistent 3-item layout for buyers and 4-item layout for sellers (Tablero, Propiedades, Consultas, Salir).
