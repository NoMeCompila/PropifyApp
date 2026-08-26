## 1. Types & Routing Setup

- [x] 1.1 Add `'terms'` to `ActivePage` type union in `src/components/HeaderBar.tsx`
- [x] 1.2 Update `VALID_PAGES` array in `src/App.tsx` to support `'terms'`

## 2. Terms & Conditions View Implementation

- [x] 2.1 Create `src/pages/TermsAndConditionsView.tsx` with complete 8-section legal content, back button, and high-contrast dark/light mode styles

## 3. Footer Integration & Auth Guard

- [x] 3.1 Update `src/components/FooterBar.tsx` with `onNavigateTerms` prop and attach click handler to "Términos y Condiciones" link
- [x] 3.2 Wire `TermsAndConditionsView` rendering in `src/App.tsx` with authentication guard (seller only) and back navigation

## 4. Verification

- [x] 4.1 Run TypeScript check and production build (`npm run build`) to verify clean compilation
