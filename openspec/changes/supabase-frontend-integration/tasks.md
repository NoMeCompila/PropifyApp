## 1. Environment & Client Setup

- [x] 1.1 Create `.env.local` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- [x] 1.2 Install `@supabase/supabase-js` package.
- [x] 1.3 Create `src/lib/supabase.ts` singleton client instance.

## 2. Service Layer Implementation

- [x] 2.1 Implement `src/services/authService.ts` for seller registration, login, logout, and active session monitoring.
- [x] 2.2 Implement `src/services/propertiesService.ts` for filtering properties, fetching by ID, creating, editing, and deleting listings.
- [x] 2.3 Implement `src/services/interactionsService.ts` for inquiries, visit schedules, and digital reservations.
- [x] 2.4 Create `src/scripts/seedLocations.ts` for idempotent seeding of countries, states, and cities.

## 3. App State & View Integration

- [x] 3.1 Refactor `src/App.tsx` and state hooks to fetch properties, seller session, and interactions asynchronously from services.
- [x] 3.2 Connect `CatalogView.tsx` and `PropertyDetailView.tsx` to live Supabase queries and filter APIs.
- [x] 3.3 Connect `LoginView.tsx` seller login and sign-up forms to `authService.ts`.
- [x] 3.4 Connect `ListingsView.tsx`, `PropertyFormModal.tsx`, `ScheduleVisitModal.tsx`, `ReservationModal.tsx`, and `InteractionsView.tsx` to Supabase services.

## 4. Build & Verification

- [x] 4.1 Execute `npm run build` to verify type safety and bundle compilation.
- [x] 4.2 Test seller login flow, property publishing, catalog cascading filters, and buyer interaction submissions against Supabase.
