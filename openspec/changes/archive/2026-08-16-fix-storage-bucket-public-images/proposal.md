## Why

Uploaded property images appear broken (displaying missing image icons) on the frontend detail and catalog pages. While file uploads to Supabase Storage return HTTP 200, the resulting public URLs are blocked from web GET requests because the `property-images` storage bucket lacks public read RLS policies, or because UI image components lack `onError` fallback handlers.

## What Changes

- **Supabase Storage Bucket & RLS Policies**: Configure SQL script to grant public `SELECT` access on `storage.objects` for bucket `property-images` and ensure public bucket visibility.
- **Frontend Image Components Resiliency**: Add `onError` image fallback handlers in `PropertyCard.tsx`, `PropertyDetailView.tsx`, and `ListingsView.tsx` to automatically render elegant fallback placeholder graphics if an image fails to load.
- **Data URL & Storage Fallback**: Enhance `uploadPropertyImage` in `src/services/propertiesService.ts` to compress and fallback to base64 Data URLs if Storage public URL resolution is restricted.

## Capabilities

### New Capabilities
- `resilient-image-rendering`: Guarantees that property cards, detail galleries, and listings render images seamlessly without broken image icon artifacts.

### Modified Capabilities
*(None)*

## Impact

- **Database / Storage**: Requires running a Storage RLS policy script in Supabase SQL Editor.
- **Frontend UI Components**: Updates `PropertyCard.tsx`, `PropertyDetailView.tsx`, and `ListingsView.tsx` with `onError` fallback logic.
