## Purpose

Provides a dedicated Terms and Conditions view for authenticated sellers detailing platform rules, rights, intellectual property, liability limitations, and applicable jurisdiction, maintaining visual harmony in both dark and light modes.

## ADDED Requirements

### Requirement: Terms & Conditions View Access and Protection
The application SHALL render a dedicated Terms & Conditions view (`page=terms`) accessible only when an authenticated seller session is active.

#### Scenario: Authenticated Seller Access
- **GIVEN** an authenticated seller (`currentUser !== null`)
- **WHEN** the user navigates to the Terms & Conditions page via footer or direct link
- **THEN** the platform SHALL display the Terms & Conditions screen with complete legal content.

#### Scenario: Unauthenticated User Access Attempt
- **GIVEN** an unauthenticated visitor or buyer (`currentUser === null`)
- **WHEN** an attempt is made to access the Terms & Conditions page
- **THEN** the platform SHALL redirect the user to the login screen or public catalog.

### Requirement: Complete Legal Content Representation
The Terms & Conditions view SHALL render the full official legal text including title, last update date, introduction, and the 8 enumerated sections.

#### Scenario: Viewing Legal Sections
- **GIVEN** an authenticated seller on the Terms & Conditions view
- **WHEN** reading the document
- **THEN** the view SHALL display:
  - Header: "Términos y Condiciones de Uso – Propify"
  - Update: "Última actualización: Agosto de 2026"
  - Welcome and introductory text
  - Section 1: "Naturaleza y Alcance del Servicio"
  - Section 2: "Registro de Usuario y Seguridad de la Cuenta"
  - Section 3: "Publicación de Inmuebles y Responsabilidad del Contenido"
  - Section 4: "Tasaciones, Precios y Valores de Referencia"
  - Section 5: "Propiedad Intelectual"
  - Section 6: "Limitación de Responsabilidad"
  - Section 7: "Modificaciones a los Términos"
  - Section 8: "Ley Aplicable y Jurisdicción"

### Requirement: Dual-Theme Styling and Back Navigation
The Terms & Conditions view SHALL support high-contrast light and dark themes consistent with the platform design system and include a prominent back action to return to the previous view or dashboard.

#### Scenario: Navigating Back
- **GIVEN** a seller viewing Terms & Conditions
- **WHEN** clicking the back button
- **THEN** the platform SHALL navigate back to the previous screen or the seller dashboard.

#### Scenario: Theme Adaptation
- **GIVEN** a seller toggling themes while viewing Terms & Conditions
- **WHEN** theme changes between dark and light
- **THEN** the container, headings, body typography, and borders SHALL smoothly transition between light and dark palettes.
