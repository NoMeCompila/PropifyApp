## 1. Database RLS Policies

- [x] 1.1 Provide and verify SQL script to ensure public read access on `public.countries`, `public.states`, and `public.cities`.

## 2. Dynamic Location Service

- [x] 2.1 Create `src/services/locationService.ts` with `getCountries`, `getStates`, and `getCities` functions connected to Supabase BaaS with local caching and offline fallback.

## 3. Location Dropdown Component Integration

- [x] 3.1 Refactor `LocationCascadeSelect.tsx` to asynchronously load countries, states, and cities from `locationService.ts`.
- [x] 3.2 Verify dropdown cascading behavior in `PropertyFilterBar.tsx` (catalog filters) and `PropertyFormModal.tsx` (seller publication modal).

## 4. Verification & Build

- [x] 4.1 Run `npm run build` to verify clean TypeScript compilation.
- [x] 4.2 Verify that newly inserted provinces or cities from Supabase appear in dropdown lists.
