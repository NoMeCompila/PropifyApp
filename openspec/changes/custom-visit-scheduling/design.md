## Context

Currently, `ScheduleVisitModal` in `src/components/ScheduleVisitModal.tsx` renders a basic HTML `<select>` with 4 hardcoded options (`10:00 hs`, `12:00 hs`, `15:00 hs`, `17:30 hs`). We will replace this with an interactive visual time slot picker and a 2-step wizard flow (Step 1: Contact Details & Slot Picker, Step 2: Confirmation Summary with Confirm and Cancel buttons).

## Goals / Non-Goals

**Goals:**
- Generate 23 time slots from `07:00` to `18:00` in 30-minute intervals (`07:00`, `07:30`, `08:00`, ..., `18:00`).
- Fetch confirmed visits for the property via `getPropertyConfirmedVisits(propertyId, date)`.
- Compute blocked time slots:
  - If a confirmed visit exists at `HH:MM`, parse minutes from midnight `M = H * 60 + Min`.
  - Block all slots in range `[M, M + 180]` (3 hours / 180 minutes).
  - If date is today, block slots where slot time `<= current time + buffer`.
- Create a visual grid of time chips with clear visual states:
  - Selected (Indigo active)
  - Available (Clickable)
  - Blocked / Confirmed (Disabled, muted with lock/clock indicator)
- Implement two-step modal navigation:
  - Step 1: Form & Slot Selection -> "Continuar a Resumen"
  - Step 2: Simple Summary Modal -> Shows Property Title, Selected Date, Time Slot, Buyer Info with two action buttons:
    - **"Confirmar Reserva"** (primary action: submits booking to Supabase)
    - **"Cancelar"** (secondary action: returns to step 1 to adjust details or allows closing)
- Toast Messages in `src/App.tsx`:
  - Success: `addToast('Reserva Exitosa', 'success');`
  - Error: `addToast('Reserva fallida, intente nuevamente', 'error');`

**Non-Goals:**
- Modifying Supabase table schema (existing schema already supports all required fields).

## Technical Details

### Time Math & Blackout Helper
```typescript
export const isSlotBlocked = (
  slotTime: string, // e.g. "07:30"
  selectedDate: string, // "YYYY-MM-DD"
  confirmedVisitTimes: string[] // e.g. ["07:00", "14:00"]
): boolean => {
  const [slotH, slotM] = slotTime.split(':').map(Number);
  const slotMinutes = slotH * 60 + slotM;

  // 1. Check past time if today
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  if (selectedDate === todayStr) {
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    if (slotMinutes <= currentMinutes) return true;
  }

  // 2. Check 3-hour blackout after any confirmed visit
  for (const confirmed of confirmedVisitTimes) {
    const [confH, confM] = confirmed.replace(' hs', '').trim().split(':').map(Number);
    if (isNaN(confH) || isNaN(confM)) continue;
    const confMinutes = confH * 60 + confM;
    const blackoutEnd = confMinutes + 180; // 3 hours
    if (slotMinutes >= confMinutes && slotMinutes <= blackoutEnd) {
      return true;
    }
  }

  return false;
};
```
