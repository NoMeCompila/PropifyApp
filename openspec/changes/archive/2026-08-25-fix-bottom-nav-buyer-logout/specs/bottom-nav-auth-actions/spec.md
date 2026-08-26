## MODIFIED Requirements

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
