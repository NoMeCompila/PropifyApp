## Purpose

Enable full support for browser Back and Forward navigation buttons on desktop and mobile viewports by synchronizing SPA routing states with the HTML5 History API and URL query parameters.

## ADDED Requirements

### Requirement: Browser Back and Forward Navigation Support
The application SHALL record screen navigation in the browser history stack and update the active view when the user triggers browser Back or Forward navigation.

#### Scenario: User navigates between screens and presses browser Back
- **GIVEN** a user who navigated from the Property Catalog (`page=catalog`) to a Property Detail view (`page=detail&id=prop-123`)
- **WHEN** the user presses the browser Back button (desktop) or executes the back gesture (mobile)
- **THEN** the application SHALL return to the Property Catalog view without reloading the web page or exiting the application.

#### Scenario: User navigates from Dashboard to Interactions tab and presses Back
- **GIVEN** an authenticated seller who navigated from Dashboard (`page=dashboard`) to the Visitas Agendadas tab (`page=interactions&tab=visits`)
- **WHEN** the seller presses the browser Back button
- **THEN** the application SHALL navigate back to the Dashboard view.

#### Scenario: User presses browser Forward button
- **GIVEN** a user who navigated back from Property Detail to the Catalog
- **WHEN** the user presses the browser Forward button
- **THEN** the application SHALL advance back to the Property Detail view of that property.

### Requirement: URL State Rehydration
On initial load or page refresh, the application SHALL parse URL search parameters to initialize the correct screen and context.

#### Scenario: Direct navigation via URL with query parameters
- **GIVEN** a URL containing `?page=detail&id=prop-456`
- **WHEN** the user opens or refreshes the page
- **THEN** the application SHALL rehydrate and display the Property Detail view for property `prop-456`.
