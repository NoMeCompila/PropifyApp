## Purpose
Ensures property listings can be published safely without violating geographic foreign key constraints in Supabase.

## ADDED Requirements

### Requirement: Geographic Foreign Key Fallback
When a property is created with geographic metadata (`country_id`, `state_id`, `city_id`), the application SHALL sanitize and verify references prior to insertion.

#### Scenario: Foreign Key Verification & Fallback Insertion
- **GIVEN** a property being created with country code `'AR'`
- **WHEN** the creation service executes
- **THEN** the service SHALL verify whether `'AR'` exists in `public.countries`, and if unseeded, gracefully omit or nullify the foreign key reference while retaining text location names (`country_name`, `province_name`, `city_name`).
