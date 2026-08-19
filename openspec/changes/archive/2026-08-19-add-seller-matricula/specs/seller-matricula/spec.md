## Purpose
Enforces capture, uniqueness, and public display of the seller's professional license number (*matrícula*) during onboarding and throughout seller profile and property touchpoints.

## ADDED Requirements

### Requirement: Mandatory Seller Registration License
The seller registration workflow SHALL require a non-empty `matricula` value from the registrant before creating an account or profile.

#### Scenario: Submitting Registration with Valid License
- **GIVEN** a new seller on the registration tab of the authentication view
- **WHEN** the seller provides a name, email, password, and a non-empty `matricula` (e.g., "CUCICBA 7842")
- **THEN** the registration SHALL proceed, persisting the `matricula` to the seller's profile in the database.

#### Scenario: Attempting Registration Without License
- **GIVEN** a new seller on the registration tab
- **WHEN** the seller attempts to submit the form without filling in the `matricula` field or leaves it with only whitespace
- **THEN** the system SHALL block form submission and display a validation error requiring a valid matrícula.

### Requirement: License Uniqueness
Each seller's `matricula` SHALL be unique across the entire platform.

#### Scenario: Duplicate License Registration
- **GIVEN** an existing registered seller with license "CUCICBA 7842"
- **WHEN** another registrant attempts to register with the same license "CUCICBA 7842"
- **THEN** the system SHALL reject the registration and notify the user that the matrícula is already in use.

### Requirement: Profile and Listing License Display
The seller's license number SHALL be prominently rendered in seller-facing management dashboards and buyer-facing contact sections.

#### Scenario: Viewing Dashboard Profile
- **GIVEN** an authenticated seller on `DashboardView`
- **WHEN** viewing the dashboard header
- **THEN** the seller's `matricula` SHALL be displayed directly beneath their name alongside their agency affiliation.

#### Scenario: Viewing Property Detail Contact Card
- **GIVEN** a prospective buyer viewing a property on `PropertyDetailView`
- **WHEN** reviewing the seller's contact and message card
- **THEN** the seller's `matricula` SHALL be clearly visible as proof of professional accreditation.
