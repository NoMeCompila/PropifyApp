## 1. Services & Data Layer

- [x] 1.1 Add `getPropertyConfirmedVisits(propertyId: string, date: string)` in `src/services/interactionsService.ts` to fetch confirmed visit slots for a property on a given date.
- [x] 1.2 Update visit scheduling toast responses in `src/App.tsx` to display `"Reserva Exitosa"` on success and `"Reserva fallida, intente nuevamente"` on error.

## 2. Interactive Time Slot & Summary Components

- [x] 2.1 Implement commercial time slot generator (07:00 to 18:00 in 30-min increments) and blackout evaluation helper in `src/components/ScheduleVisitModal.tsx`.
- [x] 2.2 Build the visual time slot picker grid with disabled states for past times and 3-hour blackout windows.
- [x] 2.3 Implement the two-step flow in `ScheduleVisitModal.tsx` showing the reservation summary modal with both **"Confirmar Reserva"** and **"Cancelar"** buttons.

## 3. Verification & Build

- [x] 3.1 Run `npm run build` to verify clean TypeScript compilation.
- [x] 3.2 Verify time slot selection, 3-hour blackout blocking, summary modal flow with Confirm and Cancel buttons, and green/red toast feedback.
