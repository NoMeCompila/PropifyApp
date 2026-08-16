## Context

See `proposal.md`. The Supabase log reveals error code `42501` on `POST /rest/v1/countries`, followed by error `23503` (`409 Conflict`) on `properties_country_id_fkey`.

## Decisions

### Decision 1: SQL Seed Script for Supabase
Provide a SQL query to seed countries, states, and cities in Supabase SQL Editor and grant public SELECT policies:

```sql
-- 1. Grant public SELECT access to geographic lookup tables
CREATE POLICY "Public read countries" ON public.countries FOR SELECT USING (true);
CREATE POLICY "Public read states" ON public.states FOR SELECT USING (true);
CREATE POLICY "Public read cities" ON public.cities FOR SELECT USING (true);

-- 2. Seed default countries, states, and cities
INSERT INTO public.countries (id, code, name) VALUES
  ('AR', 'AR', 'Argentina'),
  ('UY', 'UY', 'Uruguay'),
  ('CL', 'CL', 'Chile'),
  ('BR', 'BR', 'Brasil'),
  ('PY', 'PY', 'Paraguay')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.states (id, country_id, name) VALUES
  ('ar-buenos-aires', 'AR', 'Buenos Aires / CABA'),
  ('ar-cordoba', 'AR', 'Córdoba'),
  ('ar-santa-fe', 'AR', 'Santa Fe'),
  ('ar-mendoza', 'AR', 'Mendoza')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.cities (id, state_id, name) VALUES
  ('ar-ba-caba', 'ar-buenos-aires', 'CABA (Puerto Madero / Palermo)'),
  ('ar-ba-la-plata', 'ar-buenos-aires', 'La Plata'),
  ('ar-cb-cordoba', 'ar-cordoba', 'Córdoba Capital'),
  ('ar-sf-rosario', 'ar-santa-fe', 'Rosario'),
  ('ar-mz-mendoza', 'ar-mendoza', 'Mendoza Capital')
ON CONFLICT (id) DO NOTHING;
```

### Decision 2: Frontend Foreign Key Sanitization
In `src/services/propertiesService.ts`:
- Query `public.countries` to check if `country_id` exists before setting `payload.country_id`.
- If `country_id` does not exist in `public.countries`, set `payload.country_id = null`, `payload.state_id = null`, `payload.city_id = null`.
- Text columns `country_name`, `province_name`, and `city_name` will ALWAYS preserve the human-readable location!
