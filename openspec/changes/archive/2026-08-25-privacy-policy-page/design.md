## Context

See [proposal.md](file:///c:/Users/FeR/Desktop/AllProjects/PropifyApp/openspec/changes/privacy-policy-page/proposal.md) for background.

Currently:
1. The platform's universal footer (`FooterBar.tsx`) displays legal links (`Términos y Condiciones`, `Política de Privacidad`, etc.) when a seller is logged in (`currentUser !== null`).
2. The `Política de Privacidad` link currently has `href="#"` and prevents default action without navigating.
3. Central application routing in `App.tsx` and `HeaderBar.tsx` uses the `ActivePage` union type and synchronizes with the browser history (`pushState` / `popstate`).

## Goals / Non-Goals

**Goals:**
- Add `'privacy'` to `ActivePage` type and URL router.
- Implement `src/pages/PrivacyPolicyView.tsx` containing the exact official privacy policy text and structure.
- Update `FooterBar.tsx` to add `onNavigatePrivacy` prop and trigger navigation when clicking `Política de Privacidad`.
- Enforce seller authentication guard (redirect unauthenticated access to login or catalog).
- Support responsive layout with smooth transitions between Dark and Light modes.

**Non-Goals:**
- Handling interactive ARCO submission forms (users send requests via email `soporte@propify-app.vercel.app`).
- Creating pages for remaining links (`Defensa del Consumidor`, `Botón de Arrepentimiento`), which will be handled in separate changes.

## Decisions

### Decision 1: Dedicated View Component (`PrivacyPolicyView.tsx`)
- **Choice**: Implement `src/pages/PrivacyPolicyView.tsx` following the `*View.tsx` convention.
- **Rationale**: Keeps view logic modular and separated from other legal documents.

### Decision 2: Routing Integration in `App.tsx`
- **Choice**: Add `'privacy'` to `ActivePage` union and `VALID_PAGES` array.
- **Rationale**: Supports deep linking (`?page=privacy`) and browser forward/back buttons.

### Decision 3: Document Layout and Styling
- **Choice**: Structure the page with:
  - Back buttons (top and bottom) with Lucide `ArrowLeft` icon.
  - Document container (`max-w-4xl mx-auto my-8 p-6 sm:p-10 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm`).
  - Clear section headers (`text-indigo-600 dark:text-indigo-400`), highlighted email contact, and bulleted lists.
- **Rationale**: Maintains exact visual consistency with `TermsAndConditionsView.tsx` and the rest of the application.

## Risks / Trade-offs

- **[Risk: Unauthenticated direct access to ?page=privacy]** → Check `currentUser` before rendering `PrivacyPolicyView` in `App.tsx`; if unauthenticated, redirect to `login` and preserve intended destination.
