## Why

In `DashboardView.tsx`, clicking on interaction metric cards (Visitas Solicitadas, Reservas Digitales) or shortcut cards (Confirmar Visitas Agendadas) executes a generic `onNavigate('interactions')`. Because `InteractionsView.tsx` defaults to the `'inquiries'` tab when no initial tab is specified, clicking any of these cards always opened the "Consultas Recibidas" tab, forcing the seller to manually click over to the "Visitas Agendadas" or "Reservas Digitales" tabs.

## What Changes

- Connect `DashboardView.tsx` with the tab-aware navigation handler `handleNavigateToInteractions` from `App.tsx`.
- Metric card "Consultas Recibidas" navigates to the `'inquiries'` tab.
- Metric card "Visitas Solicitadas" navigates to the `'visits'` tab.
- Metric card "Reservas Digitales" navigates to the `'reservations'` tab (even when the list is empty).
- Quick action card "Responder Mensajes de Compradores" navigates to the `'inquiries'` tab.
- Quick action card "Confirmar Visitas Agendadas" navigates to the `'visits'` tab.

## Capabilities

### New Capabilities
- `dashboard-interaction-routing`: Contextual tab routing from seller dashboard cards and action shortcuts to specific sub-tabs of `InteractionsView`.

## Impact

- `src/pages/DashboardView.tsx`: Accept `onNavigateToInteractions` prop and invoke it with target tab on card clicks.
- `src/App.tsx`: Pass `onNavigateToInteractions={handleNavigateToInteractions}` to `DashboardView`.
