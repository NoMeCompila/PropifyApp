## Purpose
Provides dynamic dark and light mode theme switching capabilities across all public, backoffice, and modal UI components, maintaining high visual contrast, persistency, and smooth micro-animations.

## Requirements

### Requirement: Default Dark Theme
The web application SHALL load in Dark Mode by default for any user who has not previously established a theme preference stored in browser local storage.

#### Scenario: First-time Visit Initial Theme
- **GIVEN** a new user accessing the web application for the first time without prior local storage state
- **WHEN** the main application layout mounts
- **THEN** the root HTML container SHALL render with dark slate background classes and light text, and local storage SHALL initialize or default to Dark Mode.

### Requirement: Instant Dynamic Theme Toggle
The user interface SHALL provide accessible toggle controls in desktop headers and mobile navigation bars that instantly switch the active theme between Dark Mode and Light Mode without triggering a browser page refresh.

#### Scenario: User Toggle Action
- **GIVEN** the user is viewing any screen in the application
- **WHEN** the user clicks or taps the theme toggle button
- **THEN** the application SHALL immediately toggle theme CSS classes on the root HTML element, update component color variables, and animate the toggle button icon.

### Requirement: Theme Preference Persistence
The selected theme mode (`'dark'` or `'light'`) SHALL be persisted under the local storage key `'theme'` and restored on subsequent application sessions or page reloads.

#### Scenario: Session Reload Persistence
- **GIVEN** a user who previously selected Light Mode
- **WHEN** the user reloads the browser window or returns to the application in a new tab
- **THEN** the application SHALL retrieve `'light'` from local storage and render Light Mode immediately on initial mount.

### Requirement: Light Mode Visual Palette
When Light Mode is active, all application surfaces, navigation toolbars, property cards, filter sidebars, form inputs, dropdown selectors, backoffice screens, and modal dialogs SHALL render with clean white/light-slate backgrounds (`bg-white` / `bg-slate-50`), dark text typography (`text-slate-900` / `text-slate-700`), and light borders (`border-slate-200`).

#### Scenario: Full Component Light Mode Adaptation
- **GIVEN** a user has activated Light Mode in the application
- **WHEN** the user navigates across the public catalog, inspects property cards, uses location cascading selects, views property details, logs into the seller portal, accesses dashboard metrics, or opens modal dialogs
- **THEN** every internal container, input field, dropdown select, toolbar, and dialog box SHALL render in clean white or light slate surfaces with high contrast dark typography instead of remaining dark slate.

#### Scenario: Dark Mode Contrast Preservation
- **GIVEN** a user has activated Dark Mode (or remains on default Dark Mode)
- **WHEN** the user interacts with any page, component, or modal
- **THEN** all surfaces SHALL maintain dark slate backgrounds (`dark:bg-slate-900`, `dark:bg-slate-950`) and light typography (`dark:text-slate-100`).
