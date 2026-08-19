## Why

In the Argentine real estate market and professional marketplace platforms, brokers and sellers must possess a valid, verifiable professional license number (*Matrícula Profesional / Colegiado*) to legally publish, intermediate, and negotiate real estate assets. Requiring a mandatory, unique, and non-empty `matricula` field on seller registration ensures compliance, security, and institutional trust for prospective buyers.

## What Changes

- Add a required, unique `matricula` field to the `sellers` database model and frontend interfaces.
- Update the Seller Registration form (`LoginView.tsx`) to make `matricula` a mandatory, non-empty, validated input.
- Display the seller's verified `matricula` across the application:
  - Inside the Seller Dashboard (`DashboardView.tsx`) prominently under the seller's name.
  - Inside the Property Detail view (`PropertyDetailView.tsx`) on the direct contact seller card.
- Update authentication services (`authService.ts`) and property query mapping (`propertiesService.ts`) to persist, query, and populate `matricula`.
- Provide an explicit SQL script for Supabase to add the `matricula` column with unique constraint and validation to `public.sellers`.

## Capabilities

### New Capabilities
- `seller-matricula`: Mandatory, unique professional license (*matrícula*) capture during seller onboarding and visible verification on seller profiles and listings.

### Modified Capabilities
<!-- None -->

## Impact

- **Database / BaaS**: `public.sellers` table schema update (adds `matricula TEXT UNIQUE NOT NULL`).
- **Data Models**: `SellerInfo` and `AuthUser` in `src/types.ts`.
- **Frontend Services**: `src/services/authService.ts` and `src/services/propertiesService.ts`.
- **UI Components**: `src/pages/LoginView.tsx`, `src/pages/DashboardView.tsx`, `src/pages/PropertyDetailView.tsx`.
