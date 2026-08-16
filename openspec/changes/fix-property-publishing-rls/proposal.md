## Why

During property creation testing, Supabase rejected the profile insert query with PostgreSQL Error 42501 (`"new row violates row-level security policy for table 'sellers'"`). To fix property publishing, Supabase RLS policies must allow authenticated sellers to insert/update their profile row in `public.sellers`, and the frontend service layer must handle fallback insertions gracefully while displaying clear feedback.

## What Changes

- **Database RLS Policies Script**: Provide SQL definitions for `sellers` and `properties` RLS policies allowing `INSERT`, `UPDATE`, and `SELECT` by authenticated sellers (`auth.uid() = id`).
- **Resilient Profile & Property Creation**: Update `src/services/authService.ts` and `src/services/propertiesService.ts` to swallow non-critical seller profile upsert errors, attempt fallback property insertion without mandatory seller join, and return exact error messages to the UI toasts.
- **Form Submission UX**: Ensure image URLs uploaded to Supabase Storage or pasted externally are cleanly passed to the property creation payload.

## Capabilities

### New Capabilities
- `property-publishing-resilience`: Guarantees property creation succeeds for authenticated sellers by establishing RLS policy permissions and resilient service fallbacks.

### Modified Capabilities
*(None)*

## Impact

- **Database**: Requires executing the updated RLS policy SQL script in Supabase SQL Editor.
- **Frontend Services**: Updates `propertiesService.ts` and `authService.ts` to handle RLS error edge cases gracefully.
