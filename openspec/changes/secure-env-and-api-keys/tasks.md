## 1. Environment & Git Clean Up

- [x] 1.1 Remove `.env.local` from Git index cache (`git rm --cached .env.local`) while preserving local developer file
- [x] 1.2 Verify `.gitignore` contains `.env.local` and `.env*.local` entries
- [x] 1.3 Create `.env.example` at repository root with safe placeholder keys for Supabase and Google Maps

## 2. Code Verification & Resilience

- [x] 2.1 Verify `src/utils/mapsHelpers.ts` gracefully falls back when `VITE_GOOGLE_MAPS_API_KEY` is undefined or empty
- [x] 2.2 Verify `src/lib/supabase.ts` handles missing Supabase env variables with clear diagnostic warnings
- [x] 2.3 Run typecheck and build validation (`npm run build`) to ensure build integrity

## 3. Vercel & Google Cloud Configuration Guidance

- [x] 3.1 Document step-by-step instructions for adding `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_GOOGLE_MAPS_API_KEY` in Vercel Project Settings
- [x] 3.2 Document step-by-step instructions for restricting and rotating the Google Maps API Key in Google Cloud Console (HTTP referrer restrictions for production domain & localhost)
- [x] 3.3 Commit changes and provide push instructions
