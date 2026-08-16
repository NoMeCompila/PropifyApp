## 1. Core Types & Theme State Management

- [x] 1.1 Add `ThemeMode = 'dark' | 'light'` type export to `src/types.ts`.
- [x] 1.2 Update `src/App.tsx` with global `theme` state initialized from `localStorage.getItem('theme')` (defaulting to `'dark'`) and synchronize `document.documentElement` class (`dark` / `light`).

## 2. Theme Toggle Component & Navigation Integration

- [x] 2.1 Create `src/components/ThemeToggle.tsx` rendering a Sun icon in Dark Mode and Moon icon in Light Mode with smooth hover transitions.
- [x] 2.2 Integrate `ThemeToggle` into `src/components/HeaderBar.tsx` for desktop viewports.
- [x] 2.3 Integrate `ThemeToggle` into `src/components/BottomNavBar.tsx` for mobile viewports.

## 3. Light Mode Theme Styling & View Adaptations

- [x] 3.1 Update `src/index.css` and root container in `src/App.tsx` to support clean white Light Mode backgrounds (`bg-slate-50` / `bg-white`) and dark typography (`text-slate-900`).
- [x] 3.2 Adapt marketplace components (`PropertyCard.tsx`, `PropertyFilterBar.tsx`, `LocationCascadeSelect.tsx`) and public pages (`CatalogView.tsx`, `PropertyDetailView.tsx`) to render seamlessly in Light Mode.
- [x] 3.3 Adapt seller backoffice pages (`LoginView.tsx`, `DashboardView.tsx`, `ListingsView.tsx`, `InteractionsView.tsx`) and shared modal dialogs (`ScheduleVisitModal.tsx`, `ReservationModal.tsx`, `PropertyFormModal.tsx`) to render seamlessly in Light Mode.

## 4. Verification & Build Validation

- [x] 4.1 Validate TypeScript build (`npm run build`) to guarantee type safety and clean asset bundling across all component layers.
- [x] 4.2 Verify real-time theme toggling, `localStorage` persistence under key `'theme'`, button iconography, and visual contrast across mobile and desktop viewports.
