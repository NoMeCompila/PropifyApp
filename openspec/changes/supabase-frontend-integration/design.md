## Context

See `proposal.md` for motivation. PropifyApp uses functional React components and TypeScript. The application requires real-time cloud data persistence using Supabase BaaS while keeping frontend component interfaces consistent.

## Goals / Non-Goals

**Goals:**
- Provide a clean, typed Supabase client singleton in `src/lib/supabase.ts`.
- Implement modular async services in `src/services/` (`authService.ts`, `propertiesService.ts`, `interactionsService.ts`).
- Create an idempotent geographic seeding script (`src/scripts/seedLocations.ts`).
- Connect seller login/logout, property creation/editing/deletion, catalog filters, inquiries, visit schedules, and digital reservations to Supabase.

**Non-Goals:**
- Implementing complex backend microservices outside Supabase.
- Modifying UI layouts or component aesthetic styles.

## Decisions

### Decision 1: Modular Async Services Architecture
- **Choice**: Isolate Supabase Client calls within `src/services/` (`authService.ts`, `propertiesService.ts`, `interactionsService.ts`) rather than executing `supabase.from()` directly inside UI components.
- **Rationale**: Keeps React components decoupled from BaaS query mechanics and allows seamless fallback or unit testing.

### Decision 2: Schema Mapping (Snake_Case Database to CamelCase TypeScript)
- **Choice**: Map PostgreSQL column names (`land_total_area_sqm`, `built_bedrooms`, `publication_status`, `seller_id`) to `src/types.ts` domain objects (`landDetails`, `builtDetails`, `publicationStatus`, `seller`) in service transformer helpers.
- **Rationale**: Preserves existing UI component props interfaces without requiring breaking refactors across components.

### Decision 3: Environment Credentials Management
- **Choice**: Store `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local` using `import.meta.env`.
- **Rationale**: Standard Vite pattern preventing hardcoded credentials in codebase repository files.

## Risks / Trade-offs

- **[Risk]**: RLS policies blocking public submissions of inquiries/visits if anonymous permissions are misconfigured.
  - *Mitigation*: Verify `inquiries`, `visit_schedules`, and `reservations` INSERT policies allow `true` (public) evaluation.
- **[Risk]**: Cold start or network delay during initial catalog load.
  - *Mitigation*: Maintain loading states in `CatalogView.tsx` and `DashboardView.tsx`.
