## Purpose
Provides high-visibility, top-centered animated feedback notifications that alert users immediately whenever an action succeeds, fails, or produces informational status changes.

## ADDED Requirements

### Requirement: Top-Centered Prominent Toast Layout
The toast notification system SHALL render active alerts horizontally centered near the top of the viewport (`top: 20px`, `left: 50%`, centered) in an elevated capsule format (`rounded-full`).

#### Scenario: Toast Appears on Action
- **GIVEN** a user triggers an action (e.g. logs in, publishes a property, or books a visit)
- **WHEN** the toast notification is triggered
- **THEN** it SHALL animate smoothly from the top down to `top: 20px` in the center of the screen
- **AND** it SHALL display a distinct color palette and icon corresponding to its state (`success`, `error`, `info`).

### Requirement: Color-Coded Feedback States
The toast component SHALL visually differentiate notification types with dedicated colors and glowing accents:
- **Success (Green)**: Emerald background with glowing green shadow for completed operations.
- **Error (Red)**: Crimson red background with glowing red shadow for validation or API failures.
- **Info (Blue)**: Electric blue/indigo background with glowing blue shadow for session or general updates.

#### Scenario: Success Feedback Display
- **GIVEN** a successful property creation or login
- **WHEN** the toast displays
- **THEN** it SHALL render with a green capsule background, glowing green shadow, checkmark icon, and white text.

#### Scenario: Error Feedback Display
- **GIVEN** a network failure, validation error, or RLS error
- **WHEN** the toast displays
- **THEN** it SHALL render with a vivid red capsule background, glowing red shadow, alert icon, and white text.

### Requirement: Auto-Dismiss and Manual Dismissal
The toast SHALL automatically dismiss after a duration and permit manual dismissal via a close button.

#### Scenario: Closing Toast Manually
- **GIVEN** an active toast on screen
- **WHEN** the user clicks the close button (`X`)
- **THEN** the toast SHALL animate exit upwards and be removed from the display immediately.
