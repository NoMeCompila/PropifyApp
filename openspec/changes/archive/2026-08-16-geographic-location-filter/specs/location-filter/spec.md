## Purpose

Provides structured, multi-country hierarchical geographic filtering (Country -> State/Province -> City/Locality) for property buyers across Argentina, Uruguay, Paraguay, and Brazil, combined with attribute filtering, empty state handling, and seller listing location assignment.

## ADDED Requirements

### Requirement: Hierarchical Cascading Location Selection

The system SHALL support selecting geographic location parameters across South American countries (Argentina, Uruguay, Paraguay, Brazil) using a three-level cascading structure (Country -> State/Province -> City/Locality).

#### Scenario: Selection in cascade enables child dropdown levels
- **GIVEN** no country is selected in the location filter controls
- **WHEN** the user interacts with the location filter
- **THEN** the Country selector SHALL be enabled, and both the State/Province and City/Locality selectors SHALL remain disabled.

#### Scenario: Selecting a country filters available states
- **GIVEN** a user selects a Country (e.g., Argentina)
- **WHEN** the user opens the State/Province selector
- **THEN** the selector SHALL display only states belonging to that country, and the City/Locality selector SHALL be enabled only after a State/Province is selected.

#### Scenario: Selecting a state filters available cities
- **GIVEN** a Country and State/Province (e.g., Uruguay -> Maldonado) are selected
- **WHEN** the user opens the City/Locality selector
- **THEN** the selector SHALL display only localities belonging to that state (e.g., Punta del Este).

#### Scenario: Changing or clearing parent selection resets child selections
- **GIVEN** a country, state, and city are currently selected in the filter
- **WHEN** the user changes or clears the Country selection
- **THEN** the State/Province and City/Locality selections SHALL be automatically reset and their selectors disabled until a valid parent selection is made.

### Requirement: Location Filter Combination with Property Attributes

The system SHALL combine geographic location filters with existing property filters, including property tipology (departamento, lote, terreno, casa), transaction category, price range, and currency (USD / ARS).

#### Scenario: Filter catalog by combined location and property type
- **WHEN** a user selects Country='Argentina', State='Corrientes', and Property Type='Terreno / Lote'
- **THEN** the property catalog SHALL filter and display only land plot listings located in Corrientes, Argentina.

### Requirement: Empty State Management

When a user selects a combination of geographic location and property attribute filters that returns zero matching listings, the system SHALL render a dedicated empty state view with a filter reset action.

#### Scenario: Displaying empty state and filter reset trigger
- **GIVEN** a combination of location and property filters that matches no properties in the system
- **WHEN** the user views the catalog
- **THEN** the system SHALL display an informative message indicating no properties match the selected criteria, along with a prominent "Limpiar filtros" button to clear active filters.

### Requirement: Structured Location Assignment for Property Listings

The system SHALL allow sellers to assign structured geographic location data (Country, State/Province, City/Locality) to property listings using cascading selection controls.

#### Scenario: Assigning cascading location to a listing
- **WHEN** a seller creates or updates a property listing and chooses a Country, State/Province, and City/Locality in cascade
- **THEN** the system SHALL save the location identifiers and display the structured geographic location on property cards and detail views.
