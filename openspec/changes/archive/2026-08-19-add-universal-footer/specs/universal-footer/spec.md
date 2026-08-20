## Purpose
Renders a universal, responsive footer at the bottom of all platform views with role-tailored content (legal links for logged-in sellers and copyright for public buyers) and custom color themes for light and dark modes.

## ADDED Requirements

### Requirement: Role-Aware Footer Content Display
The footer component SHALL render content based on the active user session status.

#### Scenario: Viewing Footer as Logged-In Seller
- **GIVEN** an authenticated user with active seller session (`currentUser !== null`)
- **WHEN** the footer is rendered on any page
- **THEN** it SHALL display two centered rows:
  - Row 1: Legal links separated by middots: `Términos y Condiciones`, `Política de Privacidad`, `Defensa del Consumidor`, `Botón de Arrepentimiento` with `href="#"`.
  - Row 2: `DTØ-04 © 2026 Todos los derechos reservados.`

#### Scenario: Viewing Footer as Unauthenticated Buyer
- **GIVEN** an unauthenticated visitor or buyer (`currentUser === null`)
- **WHEN** the footer is rendered on any page
- **THEN** it SHALL display only the centered copyright row: `DTØ-04 © 2026 Todos los derechos reservados.`

### Requirement: Universal View Coverage
The footer SHALL be visible at the bottom of all application views (`catalog`, `detail`, `login`, `dashboard`).

#### Scenario: Navigating Between Views
- **GIVEN** a user browsing the catalog, viewing a property detail, accessing the login portal, or managing the dashboard
- **WHEN** the user scrolls to the bottom of the page
- **THEN** the footer SHALL be rendered consistently at the base of the content layout.

### Requirement: Theme-Specific Color Schemes
The footer SHALL dynamically apply distinct color palettes for light mode and dark mode:
- **Light Mode**: Light gray background (`bg-slate-200` / `bg-gray-200`) with black text (`text-slate-900` / `text-black`).
- **Dark Mode**: Dark purple/violet background (`dark:bg-[#160d26]` / `dark:bg-purple-950/90`) with white text (`dark:text-white`).

#### Scenario: Switching Themes
- **GIVEN** a user toggling between light and dark mode
- **WHEN** the theme changes
- **THEN** the footer SHALL smoothly transition its background and text colors to the corresponding theme palette.
