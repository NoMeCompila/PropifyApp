## Purpose
Integrates the web application with Supabase BaaS to provide real-time cloud data persistence, seller account authentication, cascading location data, lead inquiry tracking, visit scheduling, and digital reservation processing.

## ADDED Requirements

### Requirement: Cloud Environment Connection Initialization
The web application SHALL initialize a single client instance connecting to Supabase using public environment variables.

#### Scenario: Client Connection Startup
- **GIVEN** valid cloud project credentials provided in environment configuration
- **WHEN** the application initializes in the user's browser
- **THEN** the client connection SHALL be established without throwing runtime configuration exceptions.

### Requirement: Seller Authentication Workflow
Real estate sellers SHALL be able to sign up, sign in, sign out, and maintain an active authenticated session against the BaaS provider.

#### Scenario: Seller Login
- **GIVEN** a registered real estate seller submitting valid credentials on the login screen
- **WHEN** the sign-in action is executed
- **THEN** the application SHALL establish an authenticated user session, store authentication tokens securely, and grant access to the backoffice portal.

#### Scenario: Seller Logout
- **GIVEN** an active seller session
- **WHEN** the seller triggers the sign-out action
- **THEN** the application SHALL terminate the cloud session and return the interface to the public catalog view.

### Requirement: Persistent Property Catalog Operations
All published properties and land lots SHALL be retrieved from cloud storage, filtered dynamically, and managed via authenticated seller CRUD actions.

#### Scenario: Public Catalog Filtering
- **GIVEN** a visitor applying location, price, and category filters on the public catalog page
- **WHEN** the filter parameters change
- **THEN** the application SHALL query cloud storage and update the property list according to matching database records.

#### Scenario: Seller Property Creation
- **GIVEN** an authenticated seller completing the new property creation modal
- **WHEN** the form submission is completed
- **THEN** the property data SHALL be saved to the database associated with the seller's user ID and instantly appear in their backoffice listings.

### Requirement: Inter-User Interactions Submission
Visitors and buyers SHALL be able to submit inquiries, schedule property visits, and initiate digital priority reservations without requiring seller authentication.

#### Scenario: Visitor Inquiry Submission
- **GIVEN** a public visitor viewing a property detail page
- **WHEN** the visitor submits an inquiry form
- **THEN** the inquiry record SHALL be saved to the database and made visible in the seller's interaction inbox.

#### Scenario: Seller Visit Status Update
- **GIVEN** an authenticated seller reviewing pending visit requests
- **WHEN** the seller confirms or declines a visit schedule
- **THEN** the visit status SHALL update in the database and reflect immediately in the seller's backoffice view.
