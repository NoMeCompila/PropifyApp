## Context

See `proposal.md` for functional motivation and background.

PropifyApp is built with React 19, TypeScript, Vite 6, and Tailwind CSS v4. State and mock datasets are managed via modular services (`src/services/propertyService.ts`). Currently, properties contain plain text location fields (`location: string`). This design introduces a 3-tier hierarchical location model (`Country` -> `State` -> `City`) and cascading selector UI components.

## Goals / Non-Goals

**Goals:**
- Define relational TypeScript models for `Country`, `State`, and `City` in `src/types.ts`.
- Create seed location dataset (`src/data/locationData.ts`) covering Argentina (AR), Uruguay (UY), Paraguay (PY), and Brazil (BR).
- Update property entity and mock seed data (`src/data/initialData.ts`) with location IDs (`countryId`, `stateId`, `cityId`).
- Build reusable cascading location selector component (`src/components/LocationCascadeSelect.tsx`) enforcing parent-child state enablement.
- Integrate location filtering into `PropertyFilterBar.tsx` (desktop bar & mobile drawer) and `CatalogView.tsx`.
- Integrate location assignment into `PropertyFormModal.tsx` for seller property CRUD operations.
- Update `src/services/propertyService.ts` to execute hierarchical location filters.
- Display a dedicated empty state with a "Limpiar filtros" action button when zero properties match active filters.

**Non-Goals:**
- Third-party geocoding / map tiles API integrations.
- Automatic IP-based user location detection.
- Backend SQL database migrations (the implementation remains purely frontend-focused with mock services).

## Decisions

### 1. Hierarchical Location Data Schema
Define normalized interfaces in `src/types.ts`:
```typescript
export interface Country {
  id: string; // ISO 2-letter code: 'AR', 'UY', 'PY', 'BR'
  name: string;
}

export interface State {
  id: string;
  countryId: string;
  name: string;
}

export interface City {
  id: string;
  stateId: string;
  name: string;
}

export interface LocationSelection {
  countryId?: string;
  stateId?: string;
  cityId?: string;
}
```
*Rationale:* Mirrors standard relational SQL tables with foreign key constraints, enabling direct migration to Supabase BaaS in future phases.

### 2. Cascading Selection Component (`LocationCascadeSelect.tsx`)
Create a dedicated component handling cascading dropdown state:
- **Country Select:** Always enabled.
- **State Select:** Disabled when `countryId` is unset. Filtered by `state.countryId === countryId`.
- **City Select:** Disabled when `stateId` is unset. Filtered by `city.stateId === stateId`.
- **Cascading Reset:** Selecting a new country clears `stateId` and `cityId`. Selecting a new state clears `cityId`.

*Rationale:* Enforces US-01 acceptance criteria and prevents invalid orphan selections (e.g. selecting a city in Uruguay while Country is set to Argentina).

### 3. Service Layer & Filter Integration
Extend `PropertyFilter` interface in `src/types.ts`:
```typescript
export interface PropertyFilter {
  category?: 'all' | 'sale' | 'rent';
  type?: 'all' | 'house' | 'apartment' | 'lot' | 'commercial';
  status?: 'all' | 'published' | 'paused' | 'archived';
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
  currency?: 'all' | 'USD' | 'ARS';
  countryId?: string;
  stateId?: string;
  cityId?: string;
}
```
Update `propertyService.getProperties(filter)` to evaluate `countryId`, `stateId`, and `cityId` when present.

### 4. Empty State Management in `CatalogView.tsx`
When `filteredProperties.length === 0`:
Render a styled empty state card with Lucide icon (`MapPinOff` or `FilterX`), message `"No se encontraron propiedades que coincidan con la ubicación y filtros seleccionados"`, and a button `"Limpiar filtros"` invoking `onResetFilter()`.

## Risks / Trade-offs

- **[Risk]** Existing seed properties in `initialData.ts` may lack location IDs.
  - **Mitigation:** Update all seed properties in `initialData.ts` to include valid `countryId`, `stateId`, `cityId`, and human-readable location strings.
- **[Risk]** UI layout overflow on smaller mobile viewports in filter drawer.
  - **Mitigation:** Wrap cascading selectors cleanly in responsive flex/grid layouts with standard touch targets (min 48px height).
