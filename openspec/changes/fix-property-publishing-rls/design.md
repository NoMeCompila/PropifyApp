## Context

See `proposal.md` for motivation. The Supabase log reveals error code `42501`: `"new row violates row-level security policy for table 'sellers'"`.

## Goals / Non-Goals

**Goals:**
- Provide clear SQL script to configure RLS policies for `public.sellers` and `public.properties`.
- Refactor `createProperty` in `src/services/propertiesService.ts` to perform multi-stage fallback insertion (with join first, without join second).
- Display exact Supabase error details in UI toast notifications when failures occur.

**Non-Goals:**
- Disabling RLS entirely in Supabase.

## Decisions

### Decision 1: Required RLS Policies in Supabase
Execute the following SQL in Supabase SQL Editor:
```sql
-- Policies for public.sellers
CREATE POLICY "Sellers insert own profile" ON public.sellers FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Sellers update own profile" ON public.sellers FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Public read sellers" ON public.sellers FOR SELECT USING (true);

-- Policies for public.properties
CREATE POLICY "Sellers insert properties" ON public.properties FOR INSERT WITH CHECK (auth.uid() = seller_id);
CREATE POLICY "Sellers update properties" ON public.properties FOR UPDATE USING (auth.uid() = seller_id);
CREATE POLICY "Sellers delete properties" ON public.properties FOR DELETE USING (auth.uid() = seller_id);
CREATE POLICY "Public read properties" ON public.properties FOR SELECT USING (publication_status = 'published' OR auth.uid() = seller_id);
```

### Decision 2: Fallback Service Layer Insert
- If `ensureSellerProfileExists` encounters an RLS block on `sellers`, catch the error silently so property creation attempt is not aborted.
- Try `insert(payload).select('*, sellers(...)')`. If PostgREST fails with RLS or join error, execute `insert(payload).select('*')`.

## Risks / Trade-offs

- **[Risk]**: If `seller_id` has a foreign key constraint to `public.sellers(id)` and the user signed up before the RLS policy was added, `sellers` row might be missing.
  - *Mitigation*: The `sellers` insert policy allows `auth.uid() = id` so `ensureSellerProfileExists` can upsert the seller row seamlessly.
