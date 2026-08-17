## Why

When an authenticated seller switches to the buyer/visitor mode, the public property catalog inadvertently displays inactive (`paused` or `archived`) listings alongside active ones. This state leakage exposes unlisted inventory and violates the marketplace visibility rules. The buyer catalog must strictly filter and display only `published` (active) listings regardless of the user's authentication or seller status.

## What Changes

- Enforce strict public marketplace filtering: only properties with `publication_status = 'published'` are displayed in the Buyer Catalog and search results.
- Seller management views (`ListingsView`) continue to display all properties authored by the authenticated seller across all publication statuses (`published`, `paused`, `archived`).
- Provide / verify Supabase Row Level Security policy for `public.properties` to ensure public/anonymous queries only return `published` listings.

## Capabilities

### New Capabilities
- `listing-visibility-control`: Enforces marketplace visibility boundary so buyer catalog and public views strictly display active (`published`) properties, while seller dashboard retains full access to manage paused and archived listings.

### Modified Capabilities
<!-- None -->

## Impact

- **Affected Files**: `src/App.tsx`, `src/pages/CatalogView.tsx`, `src/services/propertiesService.ts`.
- **Database / BaaS**: RLS policy on `public.properties` for public reads vs authenticated seller reads.
