## Why

To comply with platform legal disclosure requirements and provide sellers with clear governance regarding property publication, platform liability, account responsibilities, and applicable regulations, Propify requires a dedicated "Términos y Condiciones de Uso" page accessible directly to logged-in sellers from the universal footer.

## What Changes

- **Terms & Conditions View**: Create a dedicated view (`TermsAndConditionsView`) displaying the exact official legal terms, section by section, with responsive styling supporting both Dark and Light modes and a back button for seamless return to previous/dashboard views.
- **Role-Based Access Control**: Ensure the terms page is restricted exclusively to authenticated seller profiles. Unauthenticated access attempts redirect to login or public catalog.
- **Footer Navigation Integration**: Update the universal footer's `Términos y Condiciones` link for logged-in sellers so clicking it navigates directly to the terms page with browser history synchronization (`?page=terms`).

## Capabilities

### New Capabilities
- `terms-and-conditions`: Dedicated Terms and Conditions screen for logged-in sellers with complete legal text, readable typography, dark/light theme styling, and back navigation.

### Modified Capabilities
- `universal-footer`: The "Términos y Condiciones" link in the footer navigates authenticated sellers to the Terms and Conditions page instead of remaining a non-functional `#` anchor.

## Impact

- **Routing & Navigation**: `ActivePage` enum and URL router in `App.tsx` support `'terms'` (`?page=terms`).
- **Components**: `FooterBar.tsx` receives navigation callback to handle terms link click.
- **New Screen**: `src/pages/TermsAndConditionsView.tsx` added to page views.
