## 1. Data Models & Geographic Dataset

- [x] 1.1 Update `src/types.ts` with `Country`, `State`, `City`, and updated `Property` / `PropertyFilter` interfaces containing location fields (`countryId`, `stateId`, `cityId`).
- [x] 1.2 Create `src/data/locationData.ts` with structured geographic seed data for Argentina (AR), Uruguay (UY), Paraguay (PY), and Brazil (BR), including states/provinces and cities/localities.
- [x] 1.3 Update `src/data/initialData.ts` to assign valid `countryId`, `stateId`, and `cityId` values to all seed property listings.

## 2. Service Layer & Cascading Component

- [x] 2.1 Update `src/services/propertyService.ts` to support hierarchical location filtering (`countryId`, `stateId`, `cityId`) in `getProperties()`.
- [x] 2.2 Create `src/components/LocationCascadeSelect.tsx` implementing cascading dropdown selectors (Country -> State -> City) that enforce parent-dependent enablement and selection resets.

## 3. UI Integration & Empty State Handling

- [x] 3.1 Integrate `LocationCascadeSelect` into `src/components/PropertyFilterBar.tsx` (desktop bar and mobile filter drawer).
- [x] 3.2 Update `src/pages/CatalogView.tsx` to handle location filter states and render a styled empty state view with a "Limpiar filtros" action button when no properties match.
- [x] 3.3 Integrate `LocationCascadeSelect` into `src/components/PropertyFormModal.tsx` for assigning structured location data when creating/editing property listings.

## 4. Verification & Build Validation

- [x] 4.1 Validate TypeScript build (`npm run build`) to ensure strict type compliance across all components and view layers.
- [x] 4.2 Verify cascading location filter behavior and empty state interactions across mobile and desktop viewports.
