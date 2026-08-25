## Why

GitGuardian detected exposed secret credentials (`VITE_GOOGLE_MAPS_API_KEY`) in the public repository because `.env.local` was previously committed and tracked in git history. To prevent secret leakage, ensure security compliance, and maintain seamless deployments to Vercel without breaking runtime map embeds or Supabase connectivity, environment secret tracking must be untracked from git, documented via `.env.example`, and managed securely through local private env files and Vercel Environment Variables.

## What Changes

- **Untrack Private Env Files**: Remove `.env.local` from git tracking index (`git rm --cached`) while keeping local files intact for development.
- **Environment Template**: Introduce a standard `.env.example` template with descriptive placeholder keys (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_GOOGLE_MAPS_API_KEY`) for onboarding and reference.
- **Vercel & Google Cloud Credentials Setup Guidance**: Define clear requirements for configuring environment variables in Vercel project settings and applying HTTP referrer / API restrictions in Google Cloud Console to protect the API key.
- **Graceful Fallback Handling**: Verify and ensure client runtime maps and Supabase helpers continue to gracefully fall back when keys are missing or when deployed on Vercel with configured environment variables.

## Capabilities

### New Capabilities
- `environment-configuration`: Standards, template definitions, and security policies for environment variables, secret isolation from git, and Vercel production deployment setup.

### Modified Capabilities
*(None - no behavioral requirements of existing business capabilities are changed)*

## Impact

- **Git Repository**: `.env.local` will no longer be tracked or committed to version control.
- **Developer Workflow**: Developers copy `.env.example` to `.env.local` for local secrets.
- **CI/CD / Vercel**: Production and preview environments read variables directly from Vercel Project Environment Variables (`Settings -> Environment Variables`), keeping builds fully operational.
- **Security**: Eliminates exposed secrets in new commits and provides guidance on Google Cloud key rotation/restrictions.
