## Context

Location filtering currently imports static arrays from `src/data/locationData.ts`. Supabase PostgreSQL database tables `public.countries`, `public.states`, and `public.cities` store authoritative geographic data populated with Argentine provinces and capital cities.

## Goals / Non-Goals

**Goals:**
- Create `src/services/locationService.ts` to query `public.countries`, `public.states`, and `public.cities` with caching.
- Update `LocationCascadeSelect.tsx` to asynchronously load locations on mount and when upstream parent entities change.
- Ensure public unauthenticated access via Supabase RLS policies for geographic tables.
- Retain static fallback data in case of temporary offline/network errors.

**Non-Goals:**
- CRUD management interface for creating new countries/provinces from the frontend UI (this is managed directly in Supabase or admin scripts).

## Decisions

### 1. Dedicated Location Service with In-Memory Caching
- **Approach**: `locationService.ts` exposes `getCountries()`, `getStates(countryId)`, and `getCities(stateId)`.
- **Caching**: Once fetched, results are cached in module-level memory to prevent unnecessary network queries on subsequent dropdown interactions or filter toggles.

### 2. Location Cascade Component Architecture
- `LocationCascadeSelect` fetches `countries` on mount.
- When `countryId` is selected, it queries `states` for that country.
- When `stateId` is selected, it queries `cities` for that state.
- If the Supabase client query returns an empty list or error, fallback to `locationData.ts` seed data.

### 3. Supabase RLS Policies for Geographic Tables
Execute public read policies on Supabase:
```sql
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on countries" ON public.countries FOR SELECT USING (true);

ALTER TABLE public.states ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on states" ON public.states FOR SELECT USING (true);

ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on cities" ON public.cities FOR SELECT USING (true);
```

## Risks / Trade-offs

- **[Risk]** Network latency on initial dropdown click → **Mitigation**: Fetch initial country & state lists eagerly on component mount and cache responses.
- **[Risk]** Database RLS blocks unauthenticated public readers → **Mitigation**: Provide verified SQL SELECT policies for anonymous users.
