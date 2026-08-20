## Why

Currently, buyers can only select from 4 fixed, hardcoded time slots when scheduling property visits. This restricts scheduling flexibility and does not prevent conflicts when visits are already confirmed. Implementing customizable 30-minute time slots within commercial hours (7:00 AM to 6:00 PM), enforcing a 3-hour blackout window after confirmed visits, adding a clear reservation summary confirmation step with Confirm and Cancel buttons, and providing instant, color-coded toast feedback directly improves user experience and appointment coordination.

## What Changes

- **Custom Time Slot Picker (7:00 AM - 6:00 PM)**:
  - Time slots generated in 30-minute intervals (`07:00`, `07:30`, `08:00`, ..., `18:00`).
  - Validation to disable past days and past hours if the selected date is today.
- **3-Hour Confirmed Visit Conflict Block**:
  - Automatically query and evaluate confirmed visits for the property.
  - Disable any time slot that falls within the 3-hour window following a confirmed visit on that date (e.g. a confirmed 07:00 AM visit disables slots up to 10:00 AM).
- **Reservation Summary & Confirmation Step with Cancel Option**:
  - Introduce a step/modal view in the schedule workflow that summarizes the selected property, date, and time slot with **"Confirmar Reserva"** and **"Cancelar"** (volver/descartar) buttons.
- **Toast Feedback Alignment**:
  - Upon successful visit scheduling: green toast `"Reserva Exitosa"`.
  - Upon database or network failure: red toast `"Reserva fallida, intente nuevamente"`.
- **Database Schema**:
  - **No database migration required**: The existing `public.visit_schedules` table already stores `date`, `time_slot`, `status`, and `property_id` in Supabase with open RLS policies.

## Capabilities

### New Capabilities
- `custom-visit-scheduling`: Granular 30-minute visit booking between 07:00 and 18:00 with past-time blocking, 3-hour confirmed visit blackout protection, and a two-step summary confirmation modal featuring Confirm and Cancel actions.

### Modified Capabilities
<!-- None -->

## Impact

- **Affected Files**: `src/components/ScheduleVisitModal.tsx`, `src/services/interactionsService.ts`, `src/App.tsx`.
- **Database Changes**: None required.
