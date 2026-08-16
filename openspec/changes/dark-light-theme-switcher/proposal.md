## Why

Users accessing PropifyApp in different lighting environments require the ability to toggle between Dark Mode and Light Mode. Providing a clean Light Mode option improves readability in bright environments while preserving Dark Mode as the default aesthetic.

Adding a theme switcher with instant dynamic updates and local persistence ensures a flexible, accessible user experience across all public marketplace views and private seller backoffice views.

## What Changes

- **Theme State & Persistence:**
  - Application theme state managed globally with default value `'dark'` (US-01).
  - Theme preference saved to `localStorage` under the key `'theme'` to persist user selection across reloads and future visits (US-03).
- **Dynamic Theme Switching & Iconography:**
  - Theme toggle button integrated into both desktop navigation (`HeaderBar.tsx`) and mobile bottom navigation (`BottomNavBar.tsx`).
  - Instant theme transition without page reloads (US-02).
  - Iconography reflects current theme: displays a Sun (`Sun`) icon when in Dark Mode to switch to light, and a Moon (`Moon`) icon when in Light Mode to switch to dark (US-04).
- **Light Mode Visual Theme:**
  - Predominantly white and clean background palette (`bg-slate-50`, `bg-white`) in Light Mode, with high-contrast text (`text-slate-900`, `text-slate-800`), refined borders (`border-slate-200`), and vibrant indigo/emerald accent highlights.
  - Dark Mode styles preserved as default when theme is `'dark'`.

## Capabilities

### New Capabilities
- `theme-switcher`: Global Dark/Light theme switching with Dark Mode default, local storage persistence, dynamic UI toggling, and clean visual themes across all views and modals.

### Modified Capabilities
*(None)*

## Impact

- **Frontend Codebase:** Updates root theme state in `src/App.tsx` and HTML document class/attributes; updates `src/index.css`, `src/components/HeaderBar.tsx`, `src/components/BottomNavBar.tsx`, and styling across components and view pages in `src/pages/` and `src/components/`.
- **Dependencies:** Uses existing Lucide React icons (`Sun`, `Moon`), Motion, and React state.
