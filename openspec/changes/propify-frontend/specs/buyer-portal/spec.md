## Purpose
The buyer-portal capability enables public users to browse, search, filter, inspect property details, schedule in-person or virtual property tours, submit inquiries, and trigger digital purchase reservation intent.

## ADDED Requirements

### Requirement: Property Catalog Discovery
The system SHALL display an interactive catalog of published real estate and land/lot listings with search, filtering, and view mode controls.

#### Scenario: Filtering properties by type including Land/Lots
- **WHEN** a buyer selects property type filters such as "Land / Lot" (terrenos sin construcción), "House", or "Apartment" along with price or surface area range
- **THEN** the system SHALL immediately update the visible catalog listings to match the criteria without full page reloads

#### Scenario: Mobile viewport catalog filtering
- **WHEN** a buyer accesses the catalog on a mobile device and opens the filter menu
- **THEN** the system SHALL display a full-width bottom sheet drawer containing touch-optimized filter controls including property type (Land/Lot, House, Apartment) and surface area filters with minimum 48px touch targets

#### Scenario: Toggling catalog layout
- **WHEN** a buyer switches between grid view and list view options
- **THEN** the catalog layout SHALL dynamically adapt using smooth transition animations while maintaining active search filters

### Requirement: Spanish Localization & Argentina Target Market
The system SHALL present all buyer portal user interfaces, navigation menus, property type labels, status tags, form inputs, and error messages natively in Spanish (`es-AR`).

#### Scenario: Displaying catalog and property details in Spanish
- **WHEN** a user accesses the buyer portal
- **THEN** all text labels, filters (Terrenos/Lotes, Casas, Departamentos, Locales), statuses (En Venta, Reservado, Vendido), and action buttons SHALL be rendered in Spanish

### Requirement: Property Detail Inspection
The system SHALL provide a comprehensive property detail page displaying photo galleries, property specifications, descriptions, location details, and direct contact options optimized for both mobile touch and desktop devices, dynamically adapting specifications for built properties versus raw land/lots.

#### Scenario: Viewing land/lot details and land specifications on mobile
- **WHEN** a buyer opens a Land/Lot property card in the catalog on a mobile viewport
- **THEN** the system SHALL display land-specific attributes (total surface m², zoning classification, topography, and available utilities like water, electricity, sewage) instead of bedroom/bathroom counts, along with a sticky bottom action bar

#### Scenario: Triggering direct WhatsApp contact with pre-formatted message
- **WHEN** a buyer clicks the WhatsApp contact action trigger from the sticky action bar or property detail page
- **THEN** the system SHALL launch a WhatsApp link with a pre-populated message formatted as: `"Hola {vendedor.name} estoy interesado/a en la compra de {land/lot ID} {land/lot name} quisiera agendar una visita y saber mas detalles del mismo"` dynamically injecting the seller name, listing ID, and title



### Requirement: Tour Scheduling & Lead Submission
The system SHALL enable prospective buyers to submit inquiries and schedule property visits directly from the property detail interface or mobile bottom modal sheet.

#### Scenario: Submitting a visit schedule request
- **WHEN** a buyer selects a date and time slot in the tour scheduling widget and submits their contact details
- **THEN** the system SHALL create a pending visit request, clear the form, and present a confirmation message to the buyer

#### Scenario: Submitting a property inquiry message
- **WHEN** a buyer fills out and submits the inquiry contact form
- **THEN** the system SHALL record the buyer message under the listing's inquiry inbox and confirm successful delivery

### Requirement: Intent-to-Buy Digital Reservation
The system SHALL provide a checkout modal UI optimized for mobile touch and desktop screens for buyers to initiate digital reservations on published properties.

#### Scenario: Initiating digital reservation checkout on mobile
- **WHEN** a buyer clicks the "Reserve Property" action button on an eligible listing on mobile
- **THEN** the system SHALL display a full-height bottom sheet reservation modal summarizing downpayment terms, buyer details, and payment intent confirmation

