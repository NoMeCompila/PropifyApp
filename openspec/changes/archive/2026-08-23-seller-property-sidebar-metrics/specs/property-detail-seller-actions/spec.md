## Purpose

Provide role-aware conditional widgets in property details where authenticated sellers see real-time property performance metrics and direct sublist navigation, while unauthenticated buyers continue to see contact and reservation actions.

## ADDED Requirements

### Requirement: Conditional Sidebar Rendering Based on Auth Role
The system SHALL dynamically determine whether to render buyer contact actions or seller management metrics in the property detail view depending on the user's authentication and seller role status.

#### Scenario: Unauthenticated buyer views property detail
- **GIVEN** a user who is not logged in or is browsing in buyer mode
- **WHEN** the user navigates to the property detail page
- **THEN** the system SHALL render the buyer interaction widgets including WhatsApp contact button, Visit scheduling button, Online reservation button, and the Direct Inquiry message form.

#### Scenario: Authenticated seller views property detail
- **GIVEN** an authenticated user logged in as a seller
- **WHEN** the seller navigates to the property detail page
- **THEN** the system SHALL hide the buyer contact actions and inquiry form, and SHALL render the seller property management sidebar with real-time property metrics.

### Requirement: Property Telemetry and Metrics Display
The system SHALL calculate and present property-specific performance metrics to authenticated sellers on the property detail page.

#### Scenario: Displaying property-specific metric counts
- **GIVEN** an authenticated seller viewing a property detail page
- **WHEN** the seller panel is rendered
- **THEN** the system SHALL display individual count summaries for:
  - Total inquiries received for this specific property.
  - Total visit schedules created for this specific property.
  - Total reservations / earnest deposits placed on this specific property.

### Requirement: Interactive Navigation to Property Interaction Sublists
The system SHALL provide interactive links on each property metric card allowing the seller to jump directly into the relevant filtered interactions list.

#### Scenario: Seller clicks on inquiries metric card
- **GIVEN** an authenticated seller viewing the property metrics panel
- **WHEN** the seller clicks or taps on the Inquiries metric card
- **THEN** the system SHALL navigate to the Interactions view with the Inquiries tab active and filter the list to only show inquiries for the selected property.

#### Scenario: Seller clicks on visits or reservations metric card
- **GIVEN** an authenticated seller viewing the property metrics panel
- **WHEN** the seller clicks or taps on the Visits or Reservations metric card
- **THEN** the system SHALL navigate to the Interactions view with the corresponding tab active (Visits or Reservations) filtered to the selected property.

### Requirement: Mobile View Role-Aware Action Bar
The system SHALL replace the mobile fixed bottom action bar with seller actions when an authenticated seller views a property on mobile screens.

#### Scenario: Seller views property on mobile viewport
- **GIVEN** an authenticated seller viewing the property detail page on a mobile viewport
- **WHEN** the page is displayed
- **THEN** the system SHALL replace the buyer sticky bottom actions (WhatsApp, Visit, Reserve) with seller management action buttons and metrics navigation shortcuts.
