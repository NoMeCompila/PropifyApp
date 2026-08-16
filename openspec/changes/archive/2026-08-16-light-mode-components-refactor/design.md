## Context

See `proposal.md` for motivation.

In the previous iteration, `light:bg-white` and `light:...` class syntax was used across UI components. Because Tailwind CSS v4 does not recognize `light:` as a default variant, the compiler ignored `light:` declarations, leaving `bg-slate-900`, `bg-slate-800`, and `text-slate-100` as the only active utility classes. As a result, all component containers, filter panels, property cards, dropdown selectors, inputs, and modals remained dark slate even when Light Mode was active.

## Goals / Non-Goals

**Goals:**
- Configure `src/index.css` with standard Tailwind CSS v4 dark variant scoping (`@custom-variant dark (&:where(.dark, .dark *));` or root `.dark` class targeting).
- Replace all unhandled `light:...` utilities across components with standard Tailwind dual-theme classes: base light classes (`bg-white`, `bg-slate-50`, `text-slate-900`, `border-slate-200`) paired with `dark:` modifiers (`dark:bg-slate-900`, `dark:bg-slate-950`, `dark:text-slate-100`, `dark:border-slate-800`).
- Ensure 100% component surface coverage in both Light Mode and Dark Mode for:
  - Header & Mobile Navigation (`HeaderBar.tsx`, `BottomNavBar.tsx`, `ThemeToggle.tsx`)
  - Marketplace components (`PropertyCard.tsx`, `PropertyFilterBar.tsx`, `LocationCascadeSelect.tsx`)
  - Public pages (`CatalogView.tsx`, `PropertyDetailView.tsx`)
  - Seller portal & views (`LoginView.tsx`, `DashboardView.tsx`, `ListingsView.tsx`, `InteractionsView.tsx`)
  - Shared modals (`ScheduleVisitModal.tsx`, `ReservationModal.tsx`, `PropertyFormModal.tsx`)

**Non-Goals:**
- Changing component layouts, state logic, mock data structures, or Supabase service calls.

## Decisions

### 1. Standard Tailwind Base/Dark Variant Pattern
Reorganize component class strings from:
`bg-slate-900 dark:bg-slate-900 light:bg-white` ❌ (invalid variant)
To:
`bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800` ✅ (standard Tailwind pattern)

When `<html class="dark">` is active, `dark:` classes take precedence. When `<html class="light">` (or no `dark` class) is active, standard base classes apply automatically.

### 2. Comprehensive Token Mapping Matrix

| UI Element | Light Mode Base Class | Dark Mode (`dark:`) Class |
| :--- | :--- | :--- |
| **Page Outer Background** | `bg-slate-100 text-slate-900` | `dark:bg-slate-950 dark:text-slate-100` |
| **Card / Container Surfaces** | `bg-white border-slate-200 shadow-sm` | `dark:bg-slate-900 dark:border-slate-800 dark:shadow-xl` |
| **Header / Navigation Bar** | `bg-white/95 border-slate-200 text-slate-900` | `dark:bg-slate-900/90 dark:border-slate-800 dark:text-slate-100` |
| **Form Inputs & Selects** | `bg-slate-50 text-slate-900 border-slate-300 placeholder-slate-400` | `dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:placeholder-slate-500` |
| **Filter & Pill Controls** | `bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200` | `dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700` |
| **Secondary Action Buttons** | `bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200` | `dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700` |
| **Modal Dialog Containers** | `bg-white border-slate-200 text-slate-900 shadow-2xl` | `dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100` |

### 3. `src/index.css` Base & Scrollbar Configuration
In `src/index.css`:
```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@layer base {
  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }
}
```

## Risks / Trade-offs

- **[Risk]** Hover or focus state specificity conflicts.
  - **Mitigation:** Always pair base hover states (`hover:bg-slate-100`) with dark hover states (`dark:hover:bg-slate-800`).
