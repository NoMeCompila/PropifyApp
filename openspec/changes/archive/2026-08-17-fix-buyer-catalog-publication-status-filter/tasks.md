## 1. Database RLS Policies

- [x] 1.1 Provide and verify SQL RLS policy for `public.properties` to ensure public/unauthenticated reads only access `publication_status = 'published'`.

## 2. Frontend Buyer View Segregation

- [x] 2.1 Enforce `publicationStatus === 'published'` filtering on properties passed to `CatalogView` in `src/App.tsx`.
- [x] 2.2 Add publication status filter support in `src/services/propertiesService.ts` for buyer marketplace queries.
- [x] 2.3 Verify `ListingsView.tsx` continues to expose all seller properties across all statuses (`published`, `paused`, `archived`).

## 3. Verification & Build

- [x] 3.1 Run `npm run build` to verify clean TypeScript compilation.
- [x] 3.2 Verify that switching from Seller mode with paused/archived properties to Buyer mode only displays active (published) properties.
