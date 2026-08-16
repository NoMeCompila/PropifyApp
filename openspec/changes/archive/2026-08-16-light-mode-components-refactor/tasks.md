## 1. Global CSS & Root Layout Refactor

- [x] 1.1 Configure `src/index.css` with standard Tailwind v4 dark variant scoping (`@custom-variant dark`) and body background defaults.
- [x] 1.2 Refactor `src/App.tsx` root container to use base light background (`bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100`).

## 2. Navigation & Header Component Refactor

- [x] 2.1 Refactor `src/components/HeaderBar.tsx` styling using standard `bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800` pattern for headers, search bar, role pills, and user menus.
- [x] 2.2 Refactor `src/components/BottomNavBar.tsx` and `ThemeToggle.tsx` for clean light mode rendering.

## 3. Public Marketplace Components & Views Refactor

- [x] 3.1 Refactor `src/components/PropertyCard.tsx` cards, title typography, location tags, spec boxes, and seller footers to display clean white backgrounds (`bg-white dark:bg-slate-900`).
- [x] 3.2 Refactor `src/components/LocationCascadeSelect.tsx` to render styled select controls with light background (`bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-800`).
- [x] 3.3 Refactor `src/components/PropertyFilterBar.tsx` desktop panel, category pills, price/surface inputs, and reset button.
- [x] 3.4 Refactor `src/pages/CatalogView.tsx` controls toolbar, view mode buttons, and empty state cards.
- [x] 3.5 Refactor `src/pages/PropertyDetailView.tsx` detail cards, spec grids, seller contact form, and sticky mobile action bar.

## 4. Backoffice Portal & Modal Dialogs Refactor

- [x] 4.1 Refactor `src/pages/LoginView.tsx` portal card, login/register tabs, and form inputs.
- [x] 4.2 Refactor `src/pages/DashboardView.tsx`, `ListingsView.tsx`, and `InteractionsView.tsx` headers, metric cards, tables, and tabs.
- [x] 4.3 Refactor `src/components/ScheduleVisitModal.tsx`, `ReservationModal.tsx`, and `PropertyFormModal.tsx` sheet containers, header banners, inputs, and action buttons.

## 5. Build & Visual Verification

- [x] 5.1 Run `npm run build` to verify type safety and bundle generation.
- [x] 5.2 Verify complete Light Mode visual adaptation across all pages, cards, selects, forms, and modals.
