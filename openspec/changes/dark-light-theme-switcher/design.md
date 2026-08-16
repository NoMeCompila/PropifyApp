## Context

See `proposal.md` for functional motivation and background.

PropifyApp currently uses Tailwind CSS v4 utility classes with dark slate surfaces (`bg-slate-950`, `bg-slate-900`, `text-slate-100`, `border-slate-800`). This design introduces a global theme switcher supporting dynamic toggling between Dark Mode and Light Mode, with Dark Mode as default, local storage persistence under `'theme'`, and clean white-predominant Light Mode styling.

## Goals / Non-Goals

**Goals:**
- Export `ThemeMode = 'dark' | 'light'` type in `src/types.ts`.
- Manage global theme state in `src/App.tsx` initialized from `localStorage.getItem('theme')` (defaulting to `'dark'`).
- Toggle `dark` / `light` class on `document.documentElement` (`<html>`) for global CSS scope.
- Persist theme changes to `localStorage` under key `'theme'`.
- Build reusable `ThemeToggle.tsx` component with Lucide `Sun` (in Dark Mode) and `Moon` (in Light Mode) icons.
- Integrate `ThemeToggle` into `HeaderBar.tsx` (desktop) and `BottomNavBar.tsx` (mobile).
- Update app container and view layouts to support clean white Light Mode (`bg-slate-50`, `bg-white`, `text-slate-900`, `border-slate-200`) while preserving Dark Mode styles.

**Non-Goals:**
- OS system color scheme (`prefers-color-scheme`) override (Dark Mode remains the default for all new visitors).

## Decisions

### 1. Root State & HTML Class Sync
In `src/App.tsx`:
```typescript
const [theme, setTheme] = useState<ThemeMode>(() => {
  const saved = localStorage.getItem('theme');
  return (saved === 'light' || saved === 'dark') ? saved : 'dark';
});

useEffect(() => {
  localStorage.setItem('theme', theme);
  if (theme === 'light') {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }
}, [theme]);
```
*Rationale:* Synchronous state initialization prevents initial render flashing and keeps `localStorage` seamlessly in sync.

### 2. Light Mode Palette Design
- **Body & Outer Background:** `bg-slate-100` (Light) vs `bg-slate-950` (Dark)
- **Cards & Modals:** `bg-white` (Light) vs `bg-slate-900` (Dark)
- **Headings & Body Text:** `text-slate-900` & `text-slate-700` (Light) vs `text-white` & `text-slate-300` (Dark)
- **Borders & Dividers:** `border-slate-200` (Light) vs `border-slate-800` (Dark)
- **Input Controls:** `bg-slate-50 text-slate-900 border-slate-300` (Light) vs `bg-slate-800 text-slate-200 border-slate-700` (Dark)
- **Accents:** Vibrant Indigo (`indigo-600`) and Emerald (`emerald-600`) preserved across both modes.

### 3. `ThemeToggle.tsx` Component
Controlled component receiving `theme: ThemeMode` and `onToggle: () => void`:
- When `theme === 'dark'`: Renders `Sun` icon with text `"Modo Claro"` or compact icon button.
- When `theme === 'light'`: Renders `Moon` icon with text `"Modo Oscuro"` or compact icon button.
- Minimum 48px touch target for mobile devices.

## Risks / Trade-offs

- **[Risk]** Unstyled flash on page reload.
  - **Mitigation:** Synchronous state reading in `useState` initializer function ensures theme class is assigned immediately on initial React mount.
