## Purpose

Provide role-appropriate authentication actions in the mobile bottom navigation bar, eliminating infinite login loops for sellers through a confirmation-guarded sign-out action and providing a convenient login entry point for buyers.

## ADDED Requirements

### Requirement: Seller Sign-Out Action with Confirmation Modal
The mobile bottom navigation bar SHALL display a "Salir" action for authenticated sellers instead of "Mi Cuenta", and require user confirmation before executing the logout.

#### Scenario: Seller taps Salir in mobile navigation
- **GIVEN** an authenticated seller viewing any page on a mobile viewport
- **WHEN** the seller taps the "Salir" button in the bottom navigation bar
- **THEN** the system SHALL open a confirmation modal asking if the seller wants to end their session.

#### Scenario: Seller confirms session termination
- **GIVEN** the sign-out confirmation modal is open
- **WHEN** the seller taps the "Confirmar" or "Cerrar Sesión" button
- **THEN** the system SHALL terminate the active session, close the modal, and redirect to the public catalog in buyer mode.

#### Scenario: Seller cancels session termination
- **GIVEN** the sign-out confirmation modal is open
- **WHEN** the seller taps the "Cancelar" button or backdrop
- **THEN** the system SHALL close the modal without ending the active session.

### Requirement: Buyer Login Entry Action
The mobile bottom navigation bar SHALL display an "Ingresar" action in buyer mode that directs unauthenticated visitors to the login/registration view.

#### Scenario: Unauthenticated buyer taps Ingresar in mobile navigation
- **GIVEN** a visitor browsing in buyer mode on a mobile viewport
- **WHEN** the buyer taps the "Ingresar" button in the bottom navigation bar
- **THEN** the system SHALL navigate directly to the Login and Registration page (`LoginView`).
