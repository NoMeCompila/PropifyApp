## Context

See [proposal.md](file:///c:/Users/FeR/Desktop/AllProjects/PropifyApp/openspec/changes/terms-and-conditions-page/proposal.md) for background.

Currently:
1. The platform's universal footer (`FooterBar.tsx`) displays legal links (`Términos y Condiciones`, `Política de Privacidad`, etc.) only when a seller is logged in (`currentUser !== null`).
2. The `Términos y Condiciones` link currently has `href="#"` and prevents default action with no navigation.
3. Central application routing is managed via `ActivePage` in `App.tsx` and `HeaderBar.tsx` with URL synchronization (`window.history.pushState` / `popstate`).

## Goals / Non-Goals

**Goals:**
- Add `'terms'` to `ActivePage` type and routing engine.
- Create `TermsAndConditionsView.tsx` component in `src/pages/` containing the exact legal terms requested.
- Connect the `FooterBar.tsx` "Términos y Condiciones" link to navigate to the new view via `onNavigateTerms` callback.
- Restrict access to authenticated sellers (redirect unauthenticated users to login or catalog).
- Support responsive layout with high-contrast Dark and Light mode themes.

**Non-Goals:**
- Creating pages for other footer links (`Política de Privacidad`, `Defensa del Consumidor`, `Botón de Arrepentimiento`) which will remain placeholders for future changes.
- Persisting user agreement timestamps in the database (terms are informational/legal reference).

## Decisions

### Decision 1: Dedicated View Component (`TermsAndConditionsView.tsx`)
- **Choice**: Implement a standalone page component `src/pages/TermsAndConditionsView.tsx` following the project's `*View.tsx` naming convention.
- **Rationale**: Isolates legal presentation logic, keeps `App.tsx` clean, and adheres to the project structure guidelines.

### Decision 2: Routing Integration in `App.tsx`
- **Choice**: Add `'terms'` to `VALID_PAGES` array and `ActivePage` union type.
- **Rationale**: Enables direct URL routing (`?page=terms`), browser history back/forward navigation support, and deep linking for sellers.

### Decision 3: Presentation and Visual Styling
- **Choice**: Design a document-style container with:
  - Sticky/top back button with `ArrowLeft` icon.
  - Card container (`max-w-4xl mx-auto my-8 p-6 md:p-10 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm`).
  - Clear typography with subtle dividers (`border-slate-200 dark:border-slate-800`), bold subheadings (`text-indigo-600 dark:text-indigo-400`), and formatted lists.
- **Rationale**: Matches the clean aesthetic of Propify and ensures readability in both theme modes.

## Risks / Trade-offs

- **[Risk: Unauthenticated direct URL navigation to ?page=terms]** → Guard `activePage === 'terms'` in `App.tsx` by checking `currentUser`. If null, render `LoginView` or redirect to `login`.
- **[Risk: Mobile bottom nav overlap]** → Include proper bottom padding (`pb-24 md:pb-12`) so the document is scrollable without bottom bar obstruction.
