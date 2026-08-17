## Context

The global `properties` state in `App.tsx` is populated via `getProperties(filter)` from Supabase. When on Buyer mode (`roleMode === 'buyer'`), `CatalogView` renders `properties`, displaying all items including inactive (`paused`, `archived`) listings belonging to an authenticated seller.

## Goals / Non-Goals

**Goals:**
- Guarantee that `CatalogView` (Buyer mode) strictly renders and counts listings where `publicationStatus === 'published'`.
- Pass a filtered subset `buyerProperties` to `CatalogView` or enforce `publication_status = 'published'` in `CatalogView` and `getProperties` when in buyer context.
- Ensure the seller dashboard (`ListingsView`) retains access to all seller properties across all statuses (`published`, `paused`, `archived`).
- Provide / verify Supabase SQL RLS rules for `public.properties` so public users cannot retrieve unlisted properties.

**Non-Goals:**
- Modifying seller CRUD or pause/resume functionality in `ListingsView`.

## Decisions

### 1. Multi-Layer Filter Defense (UI + Service + DB)
- **UI Layer (`App.tsx` / `CatalogView.tsx`)**: In `App.tsx`, derive `buyerProperties = properties.filter((p) => p.publicationStatus === 'published')` when rendering `CatalogView`, and ensure `CatalogView` counts and renders only published items.
- **Service Layer (`propertiesService.ts`)**: Add `onlyPublished?: boolean` support to `getProperties(filters, onlyPublished)` or check if buyer mode requested.
- **Database Layer (Supabase RLS)**:
```sql
DROP POLICY IF EXISTS "Public can view published properties" ON public.properties;
CREATE POLICY "Public can view published properties"
  ON public.properties FOR SELECT
  USING (
    publication_status = 'published'
    OR (auth.role() = 'authenticated' AND seller_id = auth.uid())
  );
```

## Risks / Trade-offs

- **[Risk]** Seller switches to Buyer mode and expects to see their own drafts/paused listings on the public marketplace.
  - **Mitigation**: Clear separation of concern: the Buyer view is the exact representation of what public consumers see. Paused/archived listings are managed exclusively in the Seller Portal (`ListingsView`).
