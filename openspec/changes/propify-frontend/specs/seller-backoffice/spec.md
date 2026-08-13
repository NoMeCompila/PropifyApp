## Purpose
The seller-backoffice capability provides real estate sellers and agents with a private portal to authenticate, monitor performance metrics, create and edit property listings, manage publication statuses, and handle buyer inquiries and tour requests.

## ADDED Requirements

### Requirement: Spanish Localization & Argentina Target Market
The system SHALL present all seller backoffice interfaces, navigation links, status indicators (*Publicado*, *Pausado*, *Archivado*), forms, and metrics in Spanish (`es-AR`).

#### Scenario: Viewing backoffice dashboard in Spanish
- **WHEN** an authenticated seller accesses the backoffice dashboard or listings manager
- **THEN** all navigation tabs, metric titles (Propiedades Activas, Consultas Pendientes, Visitas Agendadas), publication statuses, and form labels SHALL be displayed in Spanish


### Requirement: Seller Authentication & Access
The system SHALL provide an authentication interface supporting classic email/password login and user account registration written in Spanish.


#### Scenario: Registering a new seller user account
- **WHEN** a new seller fills out the registration form with valid email, full name, and password
- **THEN** the system SHALL create the user account in Supabase Auth and redirect the authenticated user to the Seller Dashboard

#### Scenario: Successful seller login
- **WHEN** an existing seller enters valid email and password credentials and submits the login form
- **THEN** the system SHALL authenticate the user via Supabase Auth and redirect them to the Seller Dashboard


### Requirement: Mobile & Desktop Navigation
The system SHALL provide navigation structures tailored to the device viewport, utilizing a fixed bottom navigation bar on mobile screens and a top header on desktop screens.

#### Scenario: Navigating views on a mobile device
- **WHEN** a seller uses the app on a mobile device
- **THEN** the system SHALL present a sticky bottom navigation bar providing single-thumb access between Dashboard, Listings, and Interactions views

### Requirement: Dashboard Performance Overview
The system SHALL display an executive dashboard summarizing active listings, pending lead inquiries, and upcoming scheduled visits formatted responsively for mobile and desktop screens.

#### Scenario: Viewing dashboard metric cards on mobile
- **WHEN** an authenticated seller views the dashboard on a mobile screen
- **THEN** the system SHALL display stacked, touch-friendly metric cards with prominent status counts and clear call-to-action buttons

### Requirement: Property Listing Management (CRUD)
The system SHALL allow sellers to view, create, edit, delete, and toggle publication status for built real estate and land/lot property listings using responsive tables on desktop and card lists on mobile viewports.

#### Scenario: Managing listings on mobile screen
- **WHEN** a seller accesses the listings manager on a mobile device
- **THEN** the system SHALL render listings as mobile cards displaying key identifiers (Type badge: Land/Lot, House, Apartment, Price, Location, Surface area) with quick inline publication status toggles and a Floating Action Button (FAB) for creating new listings

#### Scenario: Creating a Land/Lot listing via dynamic modal form
- **WHEN** a seller selects "Land / Lot" as the property category in the property creation modal/bottom sheet
- **THEN** the system SHALL dynamically adjust the form input fields to hide bedroom/bathroom inputs and display land-specific inputs (total surface m², zoning type, topography, and available utility services)


#### Scenario: Toggling publication status
- **WHEN** a seller toggles the status switch of a property between Published, Paused, and Archived
- **THEN** the system SHALL update the listing state immediately and update its visibility on the public catalog

### Requirement: Inquiry & Visit Interaction Management
The system SHALL provide a centralized interaction center for managing buyer inquiries and confirming or declining tour schedules.

#### Scenario: Managing buyer inquiries
- **WHEN** a seller opens the Inquiries tab in the interactions manager
- **THEN** the system SHALL display the inbox of buyer messages with options to mark as read, archive, or reply

#### Scenario: Confirming or rejecting scheduled tours
- **WHEN** a seller reviews a pending property tour request and clicks "Confirm" or "Decline"
- **THEN** the system SHALL update the visit request status, notify the buyer, and reflect the updated schedule in the calendar view

