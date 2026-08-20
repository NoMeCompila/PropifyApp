## 1. Database & Type Definitions

- [x] 1.1 Provide SQL migration script to add `show_location BOOLEAN DEFAULT true` and `maps_url TEXT` to `public.properties` in Supabase.
- [x] 1.2 Update `Property` and location types in `src/types.ts` to include `showLocation` and `mapsUrl`.
- [x] 1.3 Update `src/services/propertiesService.ts` mapping and payload creation to persist and read `show_location` and `maps_url`.

## 2. Utilities & Components

- [x] 2.1 Create `src/utils/mapsHelpers.ts` with `extractCoordinatesFromGoogleMapsUrl` and embed URL generator.
- [x] 2.2 Create `src/components/PropertyMapView.tsx` to render the Google Map card with marker, fallback embed, and external link.
- [x] 2.3 Update `src/components/PropertyFormModal.tsx` with the "Mostrar ubicación" checkbox and "Enlace de Google Maps" input.
- [x] 2.4 Update `src/pages/PropertyDetailView.tsx` to conditionally render `PropertyMapView` when `showLocation` is true.

## 3. Configuration & Verification

- [x] 3.1 Provide `.env` / `.env.local` template with `VITE_GOOGLE_MAPS_API_KEY` and Google Cloud restriction guidelines.
- [x] 3.2 Run `npm run build` to verify clean TypeScript compilation.
- [x] 3.3 Verify full flow: creating property with map link, creating property without map link (hidden), and rendering in property detail view.
