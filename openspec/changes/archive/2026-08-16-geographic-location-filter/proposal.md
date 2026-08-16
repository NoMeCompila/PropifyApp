## Why

Users searching for real estate and sellers/agents managing property listings need the ability to search and filter properties (apartments, lots, land, houses) by a structured geographic hierarchy: Country -> State/Province -> City/Locality across Argentina, Uruguay, Paraguay, and Brazil. Currently, the application lacks multi-country hierarchical location data models and cascading filter components.

Adding hierarchical location filtering will allow buyers to narrow down properties by specific geographic locations and allow sellers to categorize property listings accurately.

## What Changes

- **Cascading Location Filtering:**
  - Cascading selectors for Country -> State/Province -> City/Locality in both the public marketplace filter controls/drawer and the seller backoffice property manager.
  - State/Province and City/Locality selectors remain disabled until their immediate parent level is selected (US-01).
- **Multi-Country Data Model & Dataset:**
  - Geographic data entities (`Country`, `State`, `City`) supporting ISO codes (`AR`, `UY`, `PY`, `BR`) and hierarchical relationships for Argentina, Uruguay, Paraguay, and Brazil.
  - Geographic fields (`countryId`, `stateId`, `cityId`, `address`, `lat`, `lng`) integrated into the `Property` entity and initial mock dataset.
- **Filter Integration & Empty State Handling:**
  - Full compatibility of geographic location filters with property types (departamento, lote, terreno, casa), price range, currency (USD/ARS), and status (US-03).
  - User-friendly empty state view when no properties match the selected geographic and attribute filters, with a "Limpiar filtros" action button (US-04).
- **Property Form Location Selectors:**
  - Cascading location selectors integrated into `PropertyFormModal.tsx` for assigning structured location data when creating or editing property listings.

## Capabilities

### New Capabilities
- `location-filter`: Cascading hierarchical location selection (Country -> State -> City) across South American countries (AR, UY, PY, BR), filter integration with property attributes, empty state management, and location assignment in seller listing forms.

### Modified Capabilities
*(None)*

## Impact

- **Frontend Codebase:** Updates to `src/types.ts`, `src/data/initialData.ts`, `src/data/locationData.ts` (new dataset), `src/services/propertyService.ts`, `src/components/PropertyFilterBar.tsx`, `src/components/PropertyFormModal.tsx`, `src/pages/CatalogView.tsx`, and `src/pages/ListingsView.tsx`.
- **Dependencies:** Utilizes existing React 19, TypeScript, Tailwind CSS v4, Lucide React, and Motion infrastructure.
- **Data Layer:** Extends mock property types and service queries in `src/services/propertyService.ts` for hierarchical location filtering.
