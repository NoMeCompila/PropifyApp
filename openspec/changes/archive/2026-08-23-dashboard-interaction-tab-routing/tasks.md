## 1. Dashboard View Navigation Update

- [x] 1.1 Add `onNavigateToInteractions?: (tab: 'inquiries' | 'visits' | 'reservations', propertyId?: string) => void` to `DashboardViewProps` in `src/pages/DashboardView.tsx`
- [x] 1.2 Update metric cards click handlers in `DashboardView.tsx`: Consultas (`'inquiries'`), Visitas (`'visits'`), Reservas (`'reservations'`)
- [x] 1.3 Update quick action shortcut cards click handlers: Responder Mensajes (`'inquiries'`), Confirmar Visitas (`'visits'`)

## 2. App Integration & Validation

- [x] 2.1 Update `DashboardView` call in `src/App.tsx` to pass `onNavigateToInteractions={handleNavigateToInteractions}`
- [x] 2.2 Verify clicking each card navigates to the expected tab in `InteractionsView`
- [x] 2.3 Run TypeScript build check to confirm clean compilation
