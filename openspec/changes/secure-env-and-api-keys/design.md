## Context

See [proposal.md](file:///c:/Users/FeR/Desktop/AllProjects/PropifyApp/openspec/changes/secure-env-and-api-keys/proposal.md) for background.

Currently:
1. `.env.local` was previously added to the git index, so Git tracked it even though `.gitignore` specifies `.env.local`.
2. As a consequence, running `git push` pushed real API credentials (`VITE_GOOGLE_MAPS_API_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) to the remote repository.
3. The frontend application uses Vite, which exposes client-side environment variables prefixed with `VITE_` via `import.meta.env`.
4. In Vercel, client environment variables must be defined in the Project Settings -> Environment Variables dashboard for production and preview environments.

## Goals / Non-Goals

**Goals:**
- Untrack `.env.local` from git without deleting the developer's local file (`git rm --cached .env.local`).
- Create a clear `.env.example` file that documents required environment variables for Supabase and Google Maps with safe placeholder values.
- Document and provide steps for configuring Vercel environment variables so that production builds succeed without missing secrets.
- Provide best-practice security recommendations for Google Cloud API Key restrictions (HTTP referrers / APIs).

**Non-Goals:**
- Rewriting git commit history with tools like `git filter-repo` / BFG unless explicitly requested (recommended approach is rotating/restricting the exposed key, as history rewriting can disrupt collaborators and active branches).
- Implementing backend proxying for Google Maps (since client-side Maps Embed / JS API keys are designed to be restricted by domain/referrer in Google Cloud Console).

## Decisions

### Decision 1: Untrack via `git rm --cached` vs Rewriting History
- **Choice**: Execute `git rm --cached .env.local` and commit the untracked state, while advising API key restriction/rotation in Google Cloud Console.
- **Rationale**: For public frontend keys (Google Maps client key and Supabase Anon key), rotation and HTTP referrer / domain restrictions are the standard security measure. Rewriting git history on public repositories does not guarantee security if the key was already scraped by external bots. Rotating the key in GCP invalidates the leaked secret immediately.
- **Alternatives considered**:
  - `git filter-repo`: Complex, rewrites all commit hashes, breaks open pull requests/branches, and does not replace the necessity of key rotation.

### Decision 2: `.env.example` as Standard Environment Spec
- **Choice**: Introduce `.env.example` at repository root with descriptive dummy values:
  ```env
  # Supabase Configuration
  VITE_SUPABASE_URL=https://your-project.supabase.co
  VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

  # Google Maps API Key (Optional / Embed)
  VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
  ```
- **Rationale**: Provides clear contract for developers and CI/CD pipelines without leaking actual keys.

### Decision 3: Vercel Deployment Configuration
- **Choice**: Keep `import.meta.env.VITE_*` variable consumption in the frontend code and configure identical variable names (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_GOOGLE_MAPS_API_KEY`) in Vercel Project Settings.
- **Rationale**: Vite automatically bundles `VITE_*` variables during Vercel's build step (`npm run build`).

## Risks / Trade-offs

- **[Risk: Local .env.local deletion during git cleanup]** → Use `git rm --cached .env.local` rather than `git rm .env.local`, preserving the local developer file.
- **[Risk: Key quota abuse before rotation]** → Restrict the API key in Google Cloud Console to authorized HTTP referrers (e.g. `localhost:*`, `*.vercel.app`, and custom production domain) and restrict APIs to Maps Embed API / Maps JavaScript API.
- **[Risk: Broken Vercel build if env vars are missing]** → Ensure fallback logic in helper modules (`src/utils/mapsHelpers.ts` and `src/lib/supabase.ts`) handles empty strings or gracefully notifies about missing configuration.
