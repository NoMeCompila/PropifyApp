## Purpose
Provides a dedicated Privacy Policy view for authenticated sellers detailing data collection, processing purposes, third-party data sharing, ARCO rights, cookies, and security measures, maintaining visual harmony in both dark and light modes.

## Requirements

### Requirement: Privacy Policy View Access and Protection
The application SHALL render a dedicated Privacy Policy view (`page=privacy`) accessible only when an authenticated seller session is active.

#### Scenario: Authenticated Seller Access
- **GIVEN** an authenticated seller (`currentUser !== null`)
- **WHEN** the user navigates to the Privacy Policy page via footer or direct link
- **THEN** the platform SHALL display the Privacy Policy screen with complete legal content.

#### Scenario: Unauthenticated User Access Attempt
- **GIVEN** an unauthenticated visitor or buyer (`currentUser === null`)
- **WHEN** an attempt is made to access the Privacy Policy page
- **THEN** the platform SHALL redirect the user to the login screen or public catalog.

### Requirement: Complete Privacy Policy Content Representation
The Privacy Policy view SHALL render the full official privacy text including title, last update date, introduction, and the 6 enumerated sections.

#### Scenario: Viewing Privacy Sections
- **GIVEN** an authenticated seller on the Privacy Policy view
- **WHEN** reading the document
- **THEN** the view SHALL display:
  - Header: "Política de Privacidad – Propify"
  - Update: "Última actualización: Agosto de 2026"
  - Welcome and introductory text referencing Law No. 25.326
  - Section 1: "Datos que Recopilamos"
  - Section 2: "Finalidad del Tratamiento de los Datos"
  - Section 3: "Compartición de Información con Terceros"
  - Section 4: "Derechos de Acceso, Rectificación, Actualización y Supresión (ARCO)" (including contact email soporte@propify-app.vercel.app)
  - Section 5: "Cookies y Tecnologías Similares"
  - Section 6: "Seguridad de la Información"

### Requirement: Dual-Theme Styling and Back Navigation
The Privacy Policy view SHALL support high-contrast light and dark themes consistent with the platform design system and include accessible back navigation to return to the seller dashboard.

#### Scenario: Navigating Back
- **GIVEN** a seller viewing Privacy Policy
- **WHEN** clicking the back button
- **THEN** the platform SHALL navigate back to the previous screen or the seller dashboard.

#### Scenario: Theme Adaptation
- **GIVEN** a seller toggling themes while viewing Privacy Policy
- **WHEN** theme changes between dark and light
- **THEN** all containers, headings, body typography, and borders SHALL smoothly transition between light and dark palettes.
