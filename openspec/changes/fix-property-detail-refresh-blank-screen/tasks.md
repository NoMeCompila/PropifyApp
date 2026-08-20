## 1. Service Layer & Persistence

- [x] 1.1 Add `getPropertyById(id: string)` in `src/services/propertiesService.ts` for fast direct single property retrieval with seller join.
- [x] 1.2 Implement `selectedPropertyId` state and `localStorage` synchronization in `src/App.tsx`.

## 2. Rehydration & View Handling

- [x] 2.1 Add rehydration effect in `src/App.tsx` that restores `selectedProperty` from `properties` array or via `getPropertyById` when `activePage === 'detail'`.
- [x] 2.2 Add loading skeleton / spinner state in `src/App.tsx` when `activePage === 'detail'` and `selectedProperty` is being fetched.
- [x] 2.3 Add fallback redirect to `catalog` view if the property ID cannot be found after data load completes.
- [x] 2.4 Update `onBack` in `PropertyDetailView` to clear `selectedPropertyId` and return cleanly to catalog.

## 3. Verification

- [x] 3.1 Run `npm run build` to verify clean TypeScript compilation.
- [x] 3.2 Verify flow: select property -> refresh page (F5) as buyer and as seller -> property detail reloads cleanly without blank screen.
