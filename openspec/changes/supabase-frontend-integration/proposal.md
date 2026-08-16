## Why

Currently, PropifyApp operates entirely in-memory with static seed mock data (`initialData.ts` and `locationData.ts`). To enable real-world property catalog management, persistent seller authentication, and live Lead/Visit/Reservation submission by buyers, the application needs to be connected to a cloud BaaS instance (Supabase PostgreSQL, Auth, RLS, and Storage).

## What Changes

- **Environment & Client Setup**: Add `.env.local` configuration for `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, install `@supabase/supabase-js`, and export a singleton client in `src/lib/supabase.ts`.
- **Authentication Service**: Implement `src/services/authService.ts` for seller registration, login, logout, and active session tracking backed by Supabase Auth (`auth.users`) and `public.sellers`.
- **Properties Service**: Implement `src/services/propertiesService.ts` to perform persistent CRUD operations on `public.properties`, supporting concurrent filters for category, type, price, area, and cascading geographic hierarchy (country, state, city).
- **Interactions Service**: Implement `src/services/interactionsService.ts` to handle public lead submissions (`inquiries`), visit scheduling (`visit_schedules`), and priority digital reservations (`reservations`), alongside seller status updates.
- **Geographic Data Seeding**: Create `src/scripts/seedLocations.ts` to seed `countries`, `states`, and `cities` idempotently into Supabase.

## Capabilities

### New Capabilities
- `supabase-integration`: Connects the React 19 frontend to Supabase BaaS for real-time data persistence, seller authentication, cascading location queries, and inter-user interaction workflows.

### Modified Capabilities
*(None - existing spec-level behaviors are preserved while replacing mock memory storage with live cloud persistence)*

## Impact

- **Dependencies**: Adds `@supabase/supabase-js`.
- **Environment**: Requires `.env.local` with project URL and public key.
- **Frontend Architecture**: Updates `src/App.tsx` and views to use async services (`src/services/`) instead of static array mutations.
