## Purpose
Ensures real estate property listings can be published and updated by authenticated sellers without row-level security policy rejections.

## ADDED Requirements

### Requirement: Authenticated Seller Property Creation
An authenticated seller SHALL be able to publish a new property listing with uploaded images and technical specifications.

#### Scenario: Successful Property Publication
- **GIVEN** an authenticated seller with a valid Supabase session
- **WHEN** the seller submits a new property listing with uploaded PC photos
- **THEN** the listing SHALL be inserted into `public.properties` under the seller's user ID and display immediately in the seller's listings view.

#### Scenario: RLS Error Handling & User Feedback
- **GIVEN** a seller attempting to publish a property when database permissions or profile tables encounter RLS warnings
- **WHEN** the creation service executes
- **THEN** the application SHALL attempt fallback insertion procedures and present clear actionable error messages in notification toasts if insertion fails.
