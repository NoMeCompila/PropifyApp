## Purpose
Provides dynamic cascading location selection (Country -> Province/State -> City) synchronized with the backend database for catalog search filters and property publishing forms.

## ADDED Requirements

### Requirement: Dynamic Hierarchy Loading from Database
The location cascading dropdowns SHALL retrieve active countries, states, and cities dynamically from the backend database, reflecting newly inserted locations without requiring application rebuilds.

#### Scenario: Displaying Database Locations in Dropdown
- **GIVEN** new records inserted into the database for countries, provinces, or cities
- **WHEN** a user opens the catalog filters or property creation form
- **THEN** the selector dropdowns SHALL render the list of available locations queried directly from the database.

### Requirement: Cascading Filter Selection
The selector dropdowns SHALL enforce strict hierarchical dependency where selecting a country scopes available provinces, and selecting a province scopes available cities.

#### Scenario: Scoping Cities by Selected Province
- **GIVEN** a user has selected a specific province in the location selector
- **WHEN** the user opens the city dropdown
- **THEN** only cities linked to that specific province SHALL be displayed in the list.

### Requirement: Offline and Error Fallback
The location selector SHALL degrade gracefully in the event of network disconnection or database unavailability.

#### Scenario: Fallback on API Error
- **GIVEN** an unexpected database query failure or offline network state
- **WHEN** the location selector initializes
- **THEN** the system SHALL provide a fallback to cached or baseline location data without crashing or rendering empty non-functional inputs.
