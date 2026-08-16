## 1. Geographic Database Seeding

- [x] 1.1 Provide SQL seed script for `countries`, `states`, `cities` and RLS read policies.

## 2. Frontend Foreign Key Sanitization

- [x] 2.1 Refactor `src/services/propertiesService.ts` to sanitize `country_id`, `state_id`, `city_id` foreign keys prior to property creation.

## 3. Verification & Build

- [x] 3.1 Execute `npm run build` to verify clean compilation.
- [x] 3.2 Verify property creation succeeds smoothly without foreign key constraint violations.
