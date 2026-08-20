# Property Location Map Capability

## Purpose
Integrates Google Maps visualization into the property detail view while allowing sellers to configure location visibility and provide Google Maps links during property creation.

## Requirements

### Requirement: Seller Location Privacy & Google Maps Link Input
The property creation and edition form SHALL allow sellers to toggle public map visibility and provide a Google Maps URL when enabled.

#### Scenario: Seller Enables Location Sharing
- **GIVEN** a seller creating or editing a property in `PropertyFormModal`
- **WHEN** the seller checks the option to show the property's location on the map
- **THEN** the system SHALL display a mandatory text input for the Google Maps URL
- **AND** the system SHALL validate that the URL is a non-empty string.

#### Scenario: Seller Disables Location Sharing
- **GIVEN** a seller creating or editing a property
- **WHEN** the seller unchecks the location sharing option
- **THEN** the Google Maps URL field SHALL be hidden or disabled
- **AND** the property SHALL be saved with `showLocation = false`.

### Requirement: Google Maps Coordinate Extraction
The system SHALL parse coordinates (`latitude` and `longitude`) from provided Google Maps URLs.

#### Scenario: Parsing Standard Google Maps Coordinates
- **GIVEN** a Google Maps URL containing coordinates (e.g. `https://www.google.com/maps/place/.../@-34.5884,-58.4305,17z` or `?q=-34.5884,-58.4305`)
- **WHEN** the URL is parsed by the coordinate extraction utility
- **THEN** the system SHALL extract `{ lat: -34.5884, lng: -58.4305 }` and store them in the property's location data.

### Requirement: Conditional Map Display on Property Details
The property details view SHALL embed a Google Map if and only if `showLocation` is true and valid coordinates or map link are available.

#### Scenario: Viewing Property with Location Sharing Enabled
- **GIVEN** a property with `showLocation = true` and valid coordinates or Google Maps link
- **WHEN** a buyer opens the property details page (`PropertyDetailView`)
- **THEN** the system SHALL render the interactive Google Map with a marker at the property's location and an "Abrir en Google Maps" action button.

#### Scenario: Viewing Property with Location Sharing Disabled
- **GIVEN** a property with `showLocation = false` or without coordinates
- **WHEN** a buyer opens the property details page
- **THEN** the Google Map section SHALL remain completely hidden.
