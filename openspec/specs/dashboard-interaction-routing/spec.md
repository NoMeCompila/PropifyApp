# Capability: Dashboard Interaction Routing

## Purpose
Enable direct contextual tab routing from seller dashboard cards (metric counters and action shortcuts) to their corresponding views in the Interactions panel (Consultas, Visitas, Reservas).

## Requirements

### Requirement: Contextual Navigation from Dashboard Cards to Specific Interaction Tabs
Clicking an interaction metric card or quick action shortcut on the seller Dashboard SHALL navigate the user directly to the corresponding tab in the Interactions view.

#### Scenario: Seller clicks Visitas Solicitadas metric card
- **GIVEN** an authenticated seller on the Dashboard
- **WHEN** the seller clicks the "Visitas Solicitadas" metric card
- **THEN** the system SHALL navigate to the Interactions view with the "Visitas Agendadas" (`visits`) tab active.

#### Scenario: Seller clicks Reservas Digitales metric card
- **GIVEN** an authenticated seller on the Dashboard
- **WHEN** the seller clicks the "Reservas Digitales" metric card
- **THEN** the system SHALL navigate to the Interactions view with the "Reservas Digitales" (`reservations`) tab active, even if the count is 0.

#### Scenario: Seller clicks Consultas Recibidas metric card
- **GIVEN** an authenticated seller on the Dashboard
- **WHEN** the seller clicks the "Consultas Recibidas" metric card
- **THEN** the system SHALL navigate to the Interactions view with the "Consultas Recibidas" (`inquiries`) tab active.

#### Scenario: Seller clicks Confirmar Visitas Agendadas shortcut card
- **GIVEN** an authenticated seller on the Dashboard
- **WHEN** the seller clicks the "Confirmar Visitas Agendadas" quick action card
- **THEN** the system SHALL navigate to the Interactions view with the "Visitas Agendadas" (`visits`) tab active.

#### Scenario: Seller clicks Responder Mensajes de Compradores shortcut card
- **GIVEN** an authenticated seller on the Dashboard
- **WHEN** the seller clicks the "Responder Mensajes de Compradores" quick action card
- **THEN** the system SHALL navigate to the Interactions view with the "Consultas Recibidas" (`inquiries`) tab active.
