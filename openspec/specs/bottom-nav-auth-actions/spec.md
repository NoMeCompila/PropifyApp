# Capability: Mobile Bottom Navigation Bar Auth Actions

## Purpose
Provide role-appropriate authentication actions in the mobile bottom navigation bar, offering direct login entry points for unauthenticated buyers and strictly confirmation-guarded sign-out for authenticated sellers and buyers, while preventing unauthenticated users from accessing or seeing seller navigation items.

## Requirements

### Requirement: Seller Sign-Out Action with Confirmation Modal
The mobile bottom navigation bar SHALL display seller management navigation items (Tablero, Propiedades, Consultas, Salir) ONLY when an active authenticated user session exists (`currentUser !== null`) and role mode is set to seller, and require confirmation before executing logout.

#### Scenario: Unauthenticated visitor toggles to seller mode or visits login page
- **GIVEN** a visitor who is not logged in (`currentUser === null`)
- **WHEN** the visitor clicks the Vendedor header toggle or navigates to the login view
- **THEN** the mobile bottom navigation bar SHALL remain in buyer mode displaying Explorar, Filtros, and Ingresar, and SHALL NOT display seller navigation items.

#### Scenario: Authenticated seller views mobile navigation
- **GIVEN** an authenticated seller (`currentUser !== null`) with `roleMode === 'seller'`
- **WHEN** the seller views any page on a mobile viewport
- **THEN** the mobile bottom navigation bar SHALL display Tablero, Propiedades, Consultas, and Salir.

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
The mobile bottom navigation bar SHALL display session-appropriate authentication actions in buyer mode, showing "Ingresar" for unauthenticated visitors and "Salir" (with confirmation modal) for authenticated users.

#### Scenario: Unauthenticated buyer taps Ingresar in mobile navigation
- **GIVEN** a visitor browsing in buyer mode on a mobile viewport without an active session (`currentUser === null`)
- **WHEN** viewing or tapping actions in the bottom navigation bar
- **THEN** the system SHALL display the "Ingresar" button and navigate directly to the Login and Registration page (`LoginView`) when tapped.

#### Scenario: Authenticated user views buyer mode navigation
- **GIVEN** an authenticated user (`currentUser !== null`) browsing in buyer mode (`roleMode === 'buyer'`) on a mobile viewport
- **WHEN** viewing the mobile bottom navigation bar
- **THEN** the navigation bar SHALL display "Explorar", "Filtros", and "Salir" (instead of "Ingresar").

#### Scenario: Authenticated user taps Salir in buyer mode
- **GIVEN** an authenticated user browsing in buyer mode on a mobile viewport
- **WHEN** tapping the "Salir" button in the bottom navigation bar
- **THEN** the system SHALL open the logout confirmation modal.
