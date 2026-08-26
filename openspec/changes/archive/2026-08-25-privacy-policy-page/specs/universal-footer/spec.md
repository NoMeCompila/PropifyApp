## MODIFIED Requirements

### Requirement: Role-Aware Footer Content Display
The footer component SHALL render content based on the active user session status and route legal links to functional views when clicked.

#### Scenario: Viewing Footer as Logged-In Seller
- **GIVEN** an authenticated user with active seller session (`currentUser !== null`)
- **WHEN** the footer is rendered on any page
- **THEN** it SHALL display two centered rows:
  - Row 1: Legal links separated by middots: `Términos y Condiciones`, `Política de Privacidad`, `Defensa del Consumidor`, `Botón de Arrepentimiento`.
  - Row 2: `DTØ-04 © 2026 Todos los derechos reservados.`
  - And clicking `Política de Privacidad` SHALL navigate to the Privacy Policy page (`page=privacy`).

#### Scenario: Viewing Footer as Unauthenticated Buyer
- **GIVEN** an unauthenticated visitor or buyer (`currentUser === null`)
- **WHEN** the footer is rendered on any page
- **THEN** it SHALL display only the centered copyright row: `DTØ-04 © 2026 Todos los derechos reservados.`
