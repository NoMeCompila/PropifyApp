## MODIFIED Requirements

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
