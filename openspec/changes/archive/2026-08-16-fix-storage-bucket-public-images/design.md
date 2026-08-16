## Context

Uploaded property photos return HTTP 200 during upload, but when loaded in browser `<img>` elements (`https://glfcegffzbzqpudhlnsh.supabase.co/storage/v1/object/public/property-images/...`), the browser displays broken image icons. This occurs when Supabase Storage bucket `property-images` has `public = false` or lacks a SELECT policy on `storage.objects`.

## Architecture & Data Flow

```
┌────────────────────────┐      ┌─────────────────────────┐      ┌──────────────────────────┐
│  PropertyFormModal.tsx │ ───▶ │ uploadPropertyImage()   │ ───▶ │ Supabase Storage Bucket  │
│  (PC File Selection)   │      │ (Storage & Public URL)  │      │ 'property-images'        │
└────────────────────────┘      └─────────────────────────┘      └──────────────────────────┘
                                                                               │
                                                                               ▼
┌────────────────────────┐      ┌─────────────────────────┐      ┌──────────────────────────┐
│ PropertyDetailView.tsx │ ◀─── │ <img src={url}          │ ◀─── │ Public GET HTTP Request  │
│ PropertyCard.tsx       │      │   onError={fallback} /> │      │ (Requires Public RLS)    │
└────────────────────────┘      └─────────────────────────┘      └──────────────────────────┘
```

## Decisions

### Decision 1: Supabase Storage RLS SQL Script
Execute the following SQL in Supabase SQL Editor to grant public read access to `property-images` objects:

```sql
-- 1. Ensure property-images bucket is public
UPDATE storage.buckets SET public = true WHERE id = 'property-images';

-- 2. Allow public unauthenticated read access to property-images
CREATE POLICY "Public Read Property Images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'property-images');

-- 3. Allow authenticated sellers to upload property images
CREATE POLICY "Authenticated Upload Property Images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'property-images' AND auth.role() = 'authenticated');
```

### Decision 2: UI Image Error Fallback Handler
In `PropertyDetailView.tsx`, `PropertyCard.tsx`, `ListingsView.tsx`:
Add an `onError` event handler:
```tsx
const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';

<img
  src={imageUrl}
  alt={title}
  onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = DEFAULT_FALLBACK_IMAGE;
  }}
/>
```
