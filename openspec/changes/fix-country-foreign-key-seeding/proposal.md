## Why

When publishing a property, Supabase rejected the `INSERT` query with PostgreSQL error `23503`: `"insert or update on table 'properties' violates foreign key constraint 'properties_country_id_fkey'"`. The log screenshot shows that prior to this error, `POST /rest/v1/countries` failed with error `42501` (`"new row violates row-level security policy for table 'countries'"`), leaving the `countries` reference table unpopulated in Supabase.

## What Changes

- **Database Geographic Seed SQL Script**: Provide a SQL snippet to seed `countries`, `states`, and `cities` directly in Supabase SQL Editor, and add read/insert policies for geographic lookup tables.
- **Service & Model Resilient Fallback**: Refactor `createProperty` in `src/services/propertiesService.ts` to check if `country_id`, `state_id`, `city_id` exist in Supabase, and set invalid/missing foreign key references to `NULL` (or valid defaults) so that property creation never crashes on foreign key constraints.

## Capabilities

### New Capabilities
- `resilient-geographic-references`: Ensures property publishing succeeds even if geographic foreign key rows are missing or unseeded in Supabase tables.

### Modified Capabilities
*(None)*

## Impact

- **Database**: The user will execute a SQL seed script to populate `countries`, `states`, `cities` once in Supabase.
- **Frontend Services**: Updates `src/services/propertiesService.ts` to sanitize foreign key references before inserting into `properties`.
