## Purpose
Enforces strict visibility segregation between public marketplace visitors and authenticated seller management dashboards so that only published/active inventory is accessible to buyers.

## ADDED Requirements

### Requirement: Buyer Mode Publication Status Restriction
The public property catalog, search queries, and buyer property detail views SHALL exclusively expose listings with `publicationStatus = 'published'`.

#### Scenario: Seller Switches to Buyer Mode
- **GIVEN** an authenticated seller user who owns properties with status `published`, `paused`, and `archived`
- **WHEN** the user switches their active view mode to "Buyer" (Comprador)
- **THEN** only properties with status `published` SHALL be rendered in the catalog and included in total result counts
- **AND** all properties with status `paused` or `archived` SHALL be strictly excluded from the display.

#### Scenario: Anonymous Visitor Access
- **GIVEN** an unauthenticated visitor browsing the marketplace
- **WHEN** navigating property catalog, searching, or filtering
- **THEN** only properties with status `published` SHALL be retrievable and visible.

### Requirement: Seller Management Dashboard Visibility
The seller listings dashboard SHALL continue to expose all properties authored by the authenticated seller across all publication statuses.

#### Scenario: Seller Views Listings Management
- **GIVEN** an authenticated seller on the seller dashboard (`ListingsView`)
- **WHEN** viewing their inventory table or tabs (Todas, Publicadas, Pausadas)
- **THEN** all properties belonging to the seller SHALL be displayed with their respective publication status badges.
