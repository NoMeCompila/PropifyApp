## 1. Types & Routing Setup

- [x] 1.1 Add `'privacy'` to `ActivePage` type union in `src/components/HeaderBar.tsx`
- [x] 1.2 Update `VALID_PAGES` array in `src/App.tsx` to support `'privacy'`

## 2. Privacy Policy View Implementation

- [x] 2.1 Create `src/pages/PrivacyPolicyView.tsx` with complete 6-section legal content, back button, and high-contrast dark/light mode styles

## 3. Footer Integration & Auth Guard

- [x] 3.1 Update `src/components/FooterBar.tsx` with `onNavigatePrivacy` prop and attach click handler to "Política de Privacidad" link
- [x] 3.2 Wire `PrivacyPolicyView` rendering in `src/App.tsx` with authentication guard (seller only) and back navigation

## 4. Verification

- [x] 4.1 Run TypeScript check and production build (`npm run build`) to verify clean compilation
