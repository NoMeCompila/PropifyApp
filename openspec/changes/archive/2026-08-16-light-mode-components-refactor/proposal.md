## Why

In the initial theme implementation, non-standard `light:` utility classes were ignored by the Tailwind CSS compiler, causing internal UI components (property cards, search inputs, dropdown selects, filter panels, backoffice metrics, and modal dialogs) to remain dark slate (`bg-slate-900`) even when the user selected Light Mode.

This refactor establishes a proper Tailwind CSS dark/light mode architecture where default utility classes define clean white/light-slate Light Mode surfaces (`bg-white`, `bg-slate-50`, `text-slate-900`, `border-slate-200`), and `dark:` modifier classes define dark mode styling (`dark:bg-slate-900`, `dark:bg-slate-950`, `dark:text-slate-100`, `dark:border-slate-800`).

## What Changes

- Refactor component classes across all UI elements so Light Mode displays clean white/light slate backgrounds, dark typography, and crisp borders.
- Refactor `HeaderBar.tsx` and `BottomNavBar.tsx` navigation bars to adapt header backgrounds, search inputs, role pills, and mobile tabs.
- Refactor `PropertyCard.tsx`, `PropertyFilterBar.tsx`, and `LocationCascadeSelect.tsx` to render white cards, light filter panels, and styled form selects in Light Mode.
- Refactor public views (`CatalogView.tsx`, `PropertyDetailView.tsx`) and seller backoffice views (`LoginView.tsx`, `DashboardView.tsx`, `ListingsView.tsx`, `InteractionsView.tsx`).
- Refactor shared modal dialogs (`ScheduleVisitModal.tsx`, `ReservationModal.tsx`, `PropertyFormModal.tsx`).

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `theme-switcher`: Expand specification requirements to guarantee 100% visual theme adaptivity across all internal UI components, inputs, cards, selects, modals, and backoffice panels when switching between Light Mode and Dark Mode.

## Impact

- Affected files: `src/components/*.tsx`, `src/pages/*.tsx`, `src/index.css`, `src/App.tsx`.
- Runtime: Zero breaking changes to business logic or Supabase services; strictly visual styling and theme reactivity refactor.
