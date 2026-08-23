## 1. Property Detail Component Enhancement

- [x] 1.1 Update `PropertyDetailViewProps` to accept `currentUser`, `roleMode`, property-specific telemetry (`inquiries`, `visits`, `reservations`), and `onNavigateToInteractions` handler
- [x] 1.2 Implement the seller property telemetry sidebar panel in `PropertyDetailView.tsx` showing count cards for inquiries, visits, and reservations
- [x] 1.3 Implement the role-aware mobile action bar in `PropertyDetailView.tsx` replacing buyer buttons with seller shortcuts when logged in as a seller
- [x] 1.4 Connect metric card clicks to `onNavigateToInteractions(tab, propertyId)` for instant sublist filtering

## 2. App State & InteractionsView Navigation Integration

- [x] 2.1 Update `App.tsx` to pass `currentUser`, `roleMode`, interaction records, and `onNavigateToInteractions` to `PropertyDetailView`
- [x] 2.2 Update `InteractionsView.tsx` to support property-level filtering when navigated from a specific property metric card
- [x] 2.3 Verify unauthenticated buyer workflow remains identical with zero visual or functional regressions

## 3. Validation & Quality Assurance

- [x] 3.1 Verify desktop and mobile viewports for buyer mode (unauthenticated)
- [x] 3.2 Verify desktop and mobile viewports for seller mode (authenticated)
- [x] 3.3 Run TypeScript checks and production build to verify clean compilation
