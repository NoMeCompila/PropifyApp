## Context

In `DashboardView.tsx`, clicking metric cards and action cards currently triggers `onNavigate('interactions')` with no tab parameter, so `InteractionsView.tsx` always falls back to the default inquiries tab.

See `proposal.md` for details.

## Goals / Non-Goals

**Goals:**
- Add `onNavigateToInteractions?: (tab: 'inquiries' | 'visits' | 'reservations', propertyId?: string) => void` to `DashboardViewProps`.
- Update card click listeners in `DashboardView.tsx` to dispatch with explicit tab targets:
  - Metric Consultas Recibidas: `'inquiries'`
  - Metric Visitas Solicitadas: `'visits'`
  - Metric Reservas Digitales: `'reservations'`
  - Shortcut Responder Mensajes: `'inquiries'`
  - Shortcut Confirmar Visitas: `'visits'`
- Connect `onNavigateToInteractions={handleNavigateToInteractions}` in `App.tsx`.

**Non-Goals:**
- Modifying `InteractionsView.tsx` (it already has full support for `initialTab` and tab switching).

## Decisions

### 1. Reusing App's `handleNavigateToInteractions`
- **Decision**: Pass `handleNavigateToInteractions` from `App.tsx` directly to `DashboardView.tsx`.
- **Rationale**: Keeps navigation centralized in `App.tsx` and reuses existing state synchronization (`interactionsInitialTab`).
