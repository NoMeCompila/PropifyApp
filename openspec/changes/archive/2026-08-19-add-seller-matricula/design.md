## Context

Sellers register via Supabase Auth and their public metadata is stored in `public.sellers`. In the current implementation, `public.sellers` contains `id`, `name`, `email`, `phone`, `agency_name`, and `avatar_url`. We need to introduce `matricula` as a mandatory, unique column and integrate it across data models, authentication services, registration views, and seller profile headers.

## Goals / Non-Goals

**Goals:**
- Add `matricula` column to `public.sellers` with `UNIQUE` constraint and validation in Supabase.
- Update `AuthUser` and `SellerInfo` in `src/types.ts` to include `matricula`.
- Add `matricula` required input with validation to `LoginView.tsx` (Registration tab).
- Pass `matricula` to Supabase user metadata and `public.sellers` profile in `authService.ts`.
- Include `matricula` in `getProperties` select join query (`sellers(..., matricula)`) in `propertiesService.ts`.
- Render `matricula` badge below the seller's name in `DashboardView.tsx` and in `PropertyDetailView.tsx`.

**Non-Goals:**
- Adding third-party external licensing API verification (e.g. government registry integration).

## Decisions

### 1. Database Schema Update in Supabase
Execute in Supabase SQL Editor:
```sql
-- 1. Add matricula column to public.sellers if it does not exist
ALTER TABLE public.sellers 
ADD COLUMN IF NOT EXISTS matricula TEXT;

-- 2. Populate fallback for any existing test rows before enforcing NOT NULL
UPDATE public.sellers 
SET matricula = 'MAT-' || SUBSTRING(id::text FROM 1 FOR 8) 
WHERE matricula IS NULL OR matricula = '';

-- 3. Set NOT NULL and UNIQUE constraints
ALTER TABLE public.sellers 
ALTER COLUMN matricula SET NOT NULL;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'sellers_matricula_unique'
  ) THEN
    ALTER TABLE public.sellers ADD CONSTRAINT sellers_matricula_unique UNIQUE (matricula);
  END IF;
END $$;
```

### 2. Frontend Layer Updates
- **`src/types.ts`**:
  - `SellerInfo`: `matricula?: string;`
  - `AuthUser`: `matricula?: string;`
- **`src/services/authService.ts`**:
  - `signUpSeller`: accepts `metadata: { name: string; matricula: string; phone?: string; agencyName?: string }`.
  - `ensureSellerProfileExists`: writes `matricula` to `public.sellers`.
  - `getCurrentSellerSession`: retrieves `matricula` from `public.sellers` and `user_metadata`.
- **`src/pages/LoginView.tsx`**:
  - Adds `matricula` state, required `<input>` with badge icon, and validation checking `!matricula.trim()`.
- **`src/pages/DashboardView.tsx` & `src/pages/PropertyDetailView.tsx`**:
  - Render a professional badge: `Mat. {matricula}`.

## Risks / Trade-offs

- **[Risk]** Existing test users in `public.sellers` might have `NULL` matricula before adding `NOT NULL`.
  - **Mitigation**: The migration script updates any existing rows with a unique default before applying the `NOT NULL` constraint.
