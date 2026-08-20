## Why

When a user (buyer or seller) refreshes the page while viewing a property's detail page (`activePage === 'detail'`), the screen goes completely blank. This occurs because `activePage` is persisted in `localStorage`, but `selectedProperty` is only kept in transient component state (`null` on reload). Since `{activePage === 'detail' && selectedProperty && <PropertyDetailView ... />}` fails, nothing is rendered in `<main>`.

## What Changes

1. **Persist Selected Property Identifier**:
   - Store `selectedPropertyId` in `localStorage` whenever a property is opened in detail view.
   - Clean up `selectedPropertyId` when navigating back to the catalog or dashboard.
2. **State Rehydration & Auto-Recovery**:
   - On app startup or reload, if `activePage === 'detail'` and `selectedPropertyId` exists, automatically rehydrate `selectedProperty` from loaded `properties` or fetch directly by ID.
3. **Loading Skeleton & Safe Fallback**:
   - While property data is loading on page reload, display an elegant loading skeleton rather than a blank void.
   - If the property is not found (deleted or invalid ID), gracefully redirect the user to the catalog view.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `detail-view-persistence`: Guarantees persistent session rehydration and loading states for `PropertyDetailView` across browser refreshes and direct navigation.

## Impact

- **Affected Files**: `src/App.tsx`, `src/services/propertiesService.ts` (ensure `getPropertyById` is exported), `src/pages/PropertyDetailView.tsx`.
- **Database**: No database changes required.
