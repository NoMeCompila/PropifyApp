## 1. Database & Type Definitions

- [x] 1.1 Provide and verify SQL migration script to add `matricula TEXT NOT NULL UNIQUE` to `public.sellers` in Supabase.
- [x] 1.2 Update `SellerInfo` and `AuthUser` interfaces in `src/types.ts` to include `matricula`.

## 2. Authentication & Data Services

- [x] 2.1 Update `src/services/authService.ts` (`signUpSeller`, `ensureSellerProfileExists`, `getCurrentSellerSession`, `onAuthStateChange`) to persist and retrieve `matricula`.
- [x] 2.2 Update `src/services/propertiesService.ts` to select and map `sellers(..., matricula)` in property queries.

## 3. Frontend UI Components

- [x] 3.1 Update `src/pages/LoginView.tsx` with a required, validated input field for `matricula` in the seller registration form.
- [x] 3.2 Update `src/App.tsx` auth handlers to pass `matricula` during sign up.
- [x] 3.3 Display the seller's `matricula` badge under their name in `src/pages/DashboardView.tsx`.
- [x] 3.4 Display the seller's `matricula` badge on the contact card in `src/pages/PropertyDetailView.tsx`.

## 4. Verification & Build

- [x] 4.1 Run `npm run build` to verify clean TypeScript compilation.
- [x] 4.2 Verify registration and profile display flow with valid and empty `matricula`.
