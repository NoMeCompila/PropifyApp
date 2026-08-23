## MODIFIED Requirements

### Requirement: Seller Sign-Out Action with Confirmation Modal
The mobile bottom navigation bar SHALL display seller management navigation items (Tablero, Propiedades, Consultas, Salir) ONLY when an active authenticated user session exists (`currentUser !== null`) and role mode is set to seller.

#### Scenario: Unauthenticated visitor toggles to seller mode or visits login page
- **GIVEN** a visitor who is not logged in (`currentUser === null`)
- **WHEN** the visitor clicks the Vendedor header toggle or navigates to the login view
- **THEN** the mobile bottom navigation bar SHALL remain in buyer mode displaying Explorar, Filtros, and Ingresar, and SHALL NOT display seller navigation items.

#### Scenario: Authenticated seller views mobile navigation
- **GIVEN** an authenticated seller (`currentUser !== null`) with `roleMode === 'seller'`
- **WHEN** the seller views any page on a mobile viewport
- **THEN** the mobile bottom navigation bar SHALL display Tablero, Propiedades, Consultas, and Salir with confirmation-guarded logout.
