## MODIFIED Requirements

### Requirement: Conditional Sidebar Rendering Based on Auth Role
The system SHALL dynamically render buyer contact actions or seller management metrics in the property detail view based on whether the user is authenticated with a seller account.

#### Scenario: Unauthenticated visitor views property detail
- **GIVEN** a guest visitor who is not logged in (`currentUser === null`)
- **WHEN** the user views any property detail page
- **THEN** the system SHALL render the buyer interaction widgets including WhatsApp contact button, Visit scheduling button, Online reservation button, and the Direct Inquiry message form.

#### Scenario: Authenticated user views property detail in buyer or seller preview mode
- **GIVEN** an authenticated user logged into the application (`currentUser !== null`)
- **WHEN** the user navigates to any property detail page (from catalog view, listings view, or dashboard)
- **THEN** the system SHALL render the seller management sidebar with real-time property metrics and sublist navigation, regardless of whether the top navigation toggle is set to buyer preview mode or seller mode.
