## Why

Buyers want visual spatial clarity when evaluating a property's neighborhood, surroundings, and exact location. Meanwhile, sellers need fine-grained privacy control over whether to disclose the exact location and map view. Integrating an interactive Google Maps component into the property details view—controlled by seller privacy preferences and Google Maps link extraction—delivers high visual value while preserving seller discretion.

## What Changes

1. **Database Schema (Supabase `public.properties`)**:
   - Add `show_location BOOLEAN DEFAULT true` to allow sellers to toggle public map visibility.
   - Add `maps_url TEXT` to store the provided Google Maps link.
2. **Seller Listing Form (`PropertyFormModal.tsx`)**:
   - Add a checkbox: *"Mostrar mapa de ubicación pública del inmueble"* (enabled by default).
   - When enabled, display a required text input: *"Enlace de Google Maps (URL / Compartir ubicación) *"*.
   - When unchecked, the map link field is hidden/disabled and the property will not display a map.
3. **Google Maps Link & Coordinate Extraction Utility (`src/utils/mapsHelpers.ts`)**:
   - Extract latitude and longitude from multiple Google Maps link variations (`@lat,lng`, `?q=lat,lng`, `ll=lat,lng`, etc.).
   - Fallback gracefully when a shortened or query-based link is provided.
4. **Property Details Page Map Section (`PropertyDetailView.tsx` & `src/components/PropertyMapView.tsx`)**:
   - Render an interactive Google Map card if `showLocation` is true and valid coordinates/link exist.
   - If `showLocation` is false or no map link is provided, hide the map section completely.
   - Provide an "Abrir en Google Maps" external link button.
5. **API Key & Security Configuration**:
   - Configure `VITE_GOOGLE_MAPS_API_KEY` in environment files (`.env`, `.env.local`).
   - Guide seller/admin on restricting API keys in Google Cloud Console via HTTP referrers to prevent leaks.

## Capabilities

### New Capabilities
- `property-location-map`: Google Maps integration on the property detail page with seller privacy controls, URL coordinate extraction, and secure API key configuration.

### Modified Capabilities
<!-- None -->

## Impact

- **Database**: Adds 2 nullable/defaulted columns (`show_location`, `maps_url`) to `public.properties`.
- **Frontend**: Updates `src/types.ts`, `src/services/propertiesService.ts`, `src/components/PropertyFormModal.tsx`, `src/pages/PropertyDetailView.tsx`, and creates `src/components/PropertyMapView.tsx` & `src/utils/mapsHelpers.ts`.
