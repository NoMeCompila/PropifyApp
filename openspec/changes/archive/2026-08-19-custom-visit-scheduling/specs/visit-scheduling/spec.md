## Purpose
Enables buyers to select specific 30-minute appointment slots within commercial business hours (07:00 to 18:00), automatically enforces 3-hour blackout windows for confirmed visits, and provides a clear summary confirmation flow with confirm and cancel actions.

## ADDED Requirements

### Requirement: Commercial Hours 30-Minute Slot Generation
The visit scheduling interface SHALL allow buyers to select appointment times in 30-minute increments between 07:00 and 18:00 inclusive.

#### Scenario: Selecting a Commercial Time Slot
- **GIVEN** a buyer opens the visit scheduling modal for a property
- **WHEN** the buyer selects a valid future date
- **THEN** the system SHALL display interactive time slot options from 07:00 to 18:00 in 30-minute intervals (e.g. 07:00, 07:30, 08:00, ..., 18:00).

### Requirement: Past Time and Date Restrictions
The system SHALL prevent selecting past dates and past times on the current calendar day.

#### Scenario: Selecting Current Day with Past Hours
- **GIVEN** the current time is 14:15 on the current date
- **WHEN** the buyer selects today's date in the date picker
- **THEN** all time slots earlier than or equal to 14:30 SHALL be disabled and marked unselectable.

### Requirement: 3-Hour Confirmed Visit Conflict Protection
When a property has a confirmed visit on a given date, the system SHALL block that time slot and all subsequent slots within a 3-hour window.

#### Scenario: Blocking Slots Due to Confirmed Visit
- **GIVEN** a property with a confirmed visit at "07:00" on a selected date
- **WHEN** another buyer views the available time slots for that date
- **THEN** time slots from "07:00" through "10:00" SHALL be disabled and indicated as reserved/unavailable.

### Requirement: Two-Step Summary and Confirmation Modal with Cancel Option
The system SHALL present a summary of the selected property, chosen date, and time slot with both a "Confirmar Reserva" action and a "Cancelar" action before finalizing the booking.

#### Scenario: Confirming Booking from Summary
- **GIVEN** a buyer filled in their contact details and selected an available date and time slot
- **WHEN** the buyer proceeds to the summary step and clicks "Confirmar Reserva"
- **THEN** the system SHALL submit the schedule request to Supabase
- **AND** on success, the modal SHALL close and display a green toast notification with `"Reserva Exitosa"`
- **AND** on failure or database exception, a red toast notification with `"Reserva fallida, intente nuevamente"` SHALL be displayed.

#### Scenario: Canceling from Summary
- **GIVEN** a buyer on the summary confirmation step
- **WHEN** the buyer clicks "Cancelar"
- **THEN** the modal SHALL return to the editing step (or dismiss), allowing the buyer to modify the date/time or abort without creating a visit.
