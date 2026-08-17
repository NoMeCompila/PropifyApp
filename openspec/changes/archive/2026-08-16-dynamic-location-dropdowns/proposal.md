## Why

Currently, location filter dropdowns (Country, State/Province, City) rely on hardcoded local constants in the frontend bundle. When new geographic areas, provinces, or cities are added to the Supabase database, they do not appear in the catalog filters or property forms without redeploying code. Fetching location hierarchies dynamically from the database ensures the application reflects real-time database state seamlessly.

## What Changes

- Implement asynchronous fetching of geographic entities (countries, states, and cities) directly from Supabase database tables.
- Add caching/memoization layer to ensure instantaneous UI responsiveness without redundant network roundtrips.
- Update cascading dropdown components (`LocationCascadeSelect`) across catalog filters and property creation forms to consume real-time database locations with graceful fallback to seed data.
- Provide SQL RLS policies for `public.countries`, `public.states`, and `public.cities` to enable public read access.

## Capabilities

### New Capabilities
- `dynamic-locations`: Asynchronous retrieval and cascading selection of geographic hierarchies (Country -> State -> City) from Supabase BaaS with local caching and offline fallback.

### Modified Capabilities
<!-- None -->

## Impact

- **Affected Services**: Adds dedicated `src/services/locationService.ts` to manage geographic queries.
- **Affected Components**: `LocationCascadeSelect.tsx`, `PropertyFilterBar.tsx`, `PropertyFormModal.tsx`.
- **Database / BaaS**: Public read policies on `public.countries`, `public.states`, and `public.cities`.
