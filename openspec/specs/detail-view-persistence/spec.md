# Detail View Persistence Capability

## Purpose
Ensures that refreshing the browser while on the property detail view seamlessly rehydrates the selected property and prevents a blank screen for both buyers and sellers.

## Requirements

### Requirement: Detail View State Persistence & Rehydration
The application SHALL persist the selected property identifier and rehydrate the property detail view upon page refresh.

#### Scenario: Buyer Refreshes on Property Detail View
- **GIVEN** an unauthenticated buyer viewing the details of property `prop-123`
- **WHEN** the buyer refreshes the browser (F5 / reload)
- **THEN** the application SHALL restore `selectedPropertyId` from local storage
- **AND** the application SHALL display a loading skeleton while property data is fetched
- **AND** the application SHALL render `PropertyDetailView` with `prop-123` data as soon as data loading completes.

#### Scenario: Seller Refreshes on Property Detail View
- **GIVEN** an authenticated seller viewing a property from the dashboard
- **WHEN** the seller refreshes the browser
- **THEN** the application SHALL preserve seller session authentication and rehydrate the property detail view.

### Requirement: Graceful Fallback for Missing Property
The application SHALL handle cases where a persisted property ID cannot be found.

#### Scenario: Persisted Property Not Found
- **GIVEN** a persisted `selectedPropertyId` that no longer exists in Supabase
- **WHEN** the application finishes loading data
- **THEN** the application SHALL clear `selectedPropertyId`
- **AND** the application SHALL redirect the user to `catalog` view without crashing or displaying a blank screen.
