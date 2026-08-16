## Purpose

Provides global theme switching capability between Dark Mode and Light Mode with Dark Mode default, instant UI transition without page reloads, local storage persistence, dynamic button iconography, and clean visual themes across all views.

## ADDED Requirements

### Requirement: Default Dark Theme Initialization

The system SHALL initialize in Dark Mode by default when no saved theme preference exists in local storage.

#### Scenario: First-time visitor initialization
- **GIVEN** a new user or a user with cleared browser local storage
- **WHEN** the user opens the application
- **THEN** the application SHALL render immediately in Dark Mode.

### Requirement: Dynamic Real-Time Theme Switching

The system SHALL support instant toggling between Dark Mode and Light Mode without requiring a page refresh or full navigation reload.

#### Scenario: User toggles theme dynamically
- **GIVEN** the application is currently rendered in Dark Mode
- **WHEN** the user clicks the theme toggle control
- **THEN** the application SHALL immediately update its color scheme to Light Mode without reloading the browser page.

### Requirement: Local Preference Persistence

The system SHALL store the user's selected theme preference in browser local storage under the key `'theme'` and apply it upon subsequent visits or page reloads.

#### Scenario: Persisting theme preference across reloads
- **GIVEN** a user has explicitly toggled the theme to Light Mode
- **WHEN** the user reloads the browser tab or returns in a new session
- **THEN** the system SHALL read the saved `'theme'` preference from local storage and render directly in Light Mode.

### Requirement: Toggle Control Iconography

The theme toggle control SHALL visually reflect the current theme state by displaying an opposite state icon (Sun in Dark Mode, Moon in Light Mode).

#### Scenario: Displaying Sun icon in Dark Mode
- **GIVEN** the application is rendered in Dark Mode
- **WHEN** the user views the navigation bar
- **THEN** the theme toggle control SHALL display a Sun icon indicating the option to switch to Light Mode.

#### Scenario: Displaying Moon icon in Light Mode
- **GIVEN** the application is rendered in Light Mode
- **WHEN** the user views the navigation bar
- **THEN** the theme toggle control SHALL display a Moon icon indicating the option to switch to Dark Mode.

### Requirement: Light Mode Visual Theme

When Light Mode is active, the system SHALL render a clean, predominantly white and light grey background palette with high-contrast text and refined borders.

#### Scenario: Rendering clean Light Mode theme
- **GIVEN** Light Mode is active
- **WHEN** the user views any marketplace catalog or seller dashboard screen
- **THEN** the background surfaces SHALL display predominantly white/light-slate tones, with dark grey text for optimal readability and vibrant accent colors for primary interactive elements.
