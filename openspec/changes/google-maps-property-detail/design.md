## Context

PropifyApp is built with React 19, TypeScript, and Vite 6. Currently, properties store addresses and optional `lat`/`lng` in the database, but no interactive map is embedded in `PropertyDetailView.tsx`. Sellers also do not have a dedicated UI control to show or hide the map or paste a Google Maps link.

## Goals / Non-Goals

**Goals:**
- Add `show_location` (`BOOLEAN DEFAULT true`) and `maps_url` (`TEXT`) to Supabase `public.properties`.
- Update `Property` and `Location` interface in `src/types.ts`.
- Add coordinate extraction utility `src/utils/mapsHelpers.ts` supporting standard Google Maps URLs (`@lat,lng`, `q=lat,lng`, etc.).
- Update `PropertyFormModal.tsx` to include:
  - Toggle / Checkbox: *"Mostrar mapa de ubicación"* (default: true).
  - Conditional Input: *"Enlace de Google Maps *"*.
  - Automatic extraction of `lat` and `lng` on form submission.
- Create `src/components/PropertyMapView.tsx` to render:
  - Interactive Google Map (using Google Maps Embed or JS API with `VITE_GOOGLE_MAPS_API_KEY`).
  - Fallback to Google Maps Embed iframe using extracted coordinates or address if key is unconfigured.
  - "Ver en Google Maps" external link button.
- Integrate `PropertyMapView` into `PropertyDetailView.tsx` beneath the property specifications.
- Provide comprehensive guide for obtaining and securing the Google Maps API Key via Google Cloud Console.

**Non-Goals:**
- Live geocoding autocomplete (can be added in a future iteration; currently user pastes link directly).

## Technical Details

### 1. Database Schema Update (SQL for Supabase)
```sql
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS show_location BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS maps_url TEXT;
```

### 2. URL Coordinate Parser (`src/utils/mapsHelpers.ts`)
```typescript
export const extractCoordinatesFromGoogleMapsUrl = (
  url: string
): { lat: number; lng: number } | null => {
  if (!url) return null;

  // 1. Matches: /@(-?\d+\.\d+),(-?\d+\.\d+)
  const atMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (atMatch) {
    return { lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2]) };
  }

  // 2. Matches: q=(-?\d+\.\d+)(?:,|%2C)(-?\d+\.\d+)
  const qMatch = url.match(/[?&]q=(-?\d+\.\d+)(?:,|%2C)(-?\d+\.\d+)/);
  if (qMatch) {
    return { lat: parseFloat(qMatch[1]), lng: parseFloat(qMatch[2]) };
  }

  // 3. Matches: ll=(-?\d+\.\d+)(?:,|%2C)(-?\d+\.\d+)
  const llMatch = url.match(/[?&]ll=(-?\d+\.\d+)(?:,|%2C)(-?\d+\.\d+)/);
  if (llMatch) {
    return { lat: parseFloat(llMatch[1]), lng: parseFloat(llMatch[2]) };
  }

  return null;
};
```

### 3. Google Cloud API Key Configuration & Protection
- Environment variable name in Vite: `VITE_GOOGLE_MAPS_API_KEY`.
- In Google Cloud Console:
  1. Create project -> Enable **Maps JavaScript API** & **Maps Embed API**.
  2. Create API Key under Credentials.
  3. **Application Restrictions**: Set to **Websites (HTTP referrers)** and add:
     - `http://localhost:*`
     - `https://*.vercel.app/*`
     - `https://tu-dominio-personalizado.com/*`
  4. **API Restrictions**: Restrict key to *Maps JavaScript API* and *Maps Embed API* only.
