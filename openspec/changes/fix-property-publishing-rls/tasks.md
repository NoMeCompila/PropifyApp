## 1. RLS Policy Configuration

- [x] 1.1 Provide SQL script for `sellers` and `properties` RLS policies in Supabase.

## 2. Service Layer Resilience

- [x] 2.1 Refactor `src/services/authService.ts` to handle RLS upsert errors on `public.sellers`.
- [x] 2.2 Refactor `src/services/propertiesService.ts` to use multi-stage fallback property creation and detailed error reporting.
- [x] 2.3 Update `src/App.tsx` toast handler to present exact Supabase error messages when property creation fails.

## 3. Verification & Build

- [x] 3.1 Execute `npm run build` to verify clean compilation.
- [x] 3.2 Verify property creation with local image uploads and Supabase persistence.
