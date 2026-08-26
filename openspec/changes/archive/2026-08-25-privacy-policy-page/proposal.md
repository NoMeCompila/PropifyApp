## Why

To comply with data protection regulations (including Argentine Law No. 25.326 and regional privacy standards) and provide transparent information regarding personal data collection, processing purposes, ARCO rights, and security measures, Propify requires a dedicated "Política de Privacidad" page accessible to authenticated sellers from the universal footer.

## What Changes

- **Privacy Policy View**: Create a dedicated view (`PrivacyPolicyView`) displaying the exact official privacy policy content (6 sections, update date, introduction, and contact details) supporting both Dark and Light modes with a top and bottom back navigation action.
- **Role-Based Access Control**: Restrict access to authenticated sellers, redirecting unauthenticated users to login or catalog.
- **Footer Navigation Integration**: Update the universal footer's `Política de Privacidad` link for logged-in sellers to trigger navigation to the privacy policy page with browser history synchronization (`?page=privacy`).

## Capabilities

### New Capabilities
- `privacy-policy`: Dedicated Privacy Policy view for authenticated sellers detailing personal data handling, processing purposes, ARCO rights, cookies, and security standards with full dark/light theme support.

### Modified Capabilities
- `universal-footer`: The "Política de Privacidad" link in the footer navigates authenticated sellers to the Privacy Policy page (`page=privacy`) instead of remaining an unhandled `#` anchor.

## Impact

- **Routing & Navigation**: `ActivePage` union type and router in `App.tsx` support `'privacy'` (`?page=privacy`).
- **Components**: `FooterBar.tsx` receives `onNavigatePrivacy` callback prop.
- **New Screen**: `src/pages/PrivacyPolicyView.tsx` created under `src/pages/`.
