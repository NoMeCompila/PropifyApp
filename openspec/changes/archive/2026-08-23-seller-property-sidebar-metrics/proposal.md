## Why

Currently, the property detail view always displays buyer-focused action widgets (WhatsApp inquiry, visit scheduling, digital reservation, and direct contact form) regardless of the user's authentication state or role. When a property seller views their own listing (or is logged in as a seller), they are presented with options to send inquiries or make reservations to themselves, which leads to confusing UX and self-inquiries.

Providing seller-specific metrics (inquiries, scheduled visits, and reservations) with deep links into property-filtered interaction sublists transforms the sidebar into an operational management widget for authenticated sellers while keeping the experience completely unchanged for unauthenticated buyers.

## What Changes

- **Role-Aware Detail Sidebar**: Conditionally render the right sidebar on `PropertyDetailView` depending on whether the active user is an authenticated seller or an unauthenticated buyer.
- **Seller Metrics Display**: For authenticated sellers, show real-time count cards for inquiries, scheduled visits, and reservation deposits associated with that specific property.
- **Direct Navigation to Interactions Sublists**: Allow the seller to click on any metric card (inquiries, visits, reservations) to navigate directly to the Interactions view pre-filtered or focused on that specific property and corresponding tab.
- **Mobile Responsive Seller Action Bar**: Adapt the sticky bottom mobile action bar and bottom sections for sellers to show property metrics and quick operational shortcuts instead of buyer contact/reservation buttons.
- **Preserved Buyer Experience**: Unauthenticated buyers retain the full existing buyer workflow (WhatsApp contact, Visit scheduling modal, Online reservation modal, Direct message form) with zero regressions or visual changes.

## Capabilities

### New Capabilities
- `property-detail-seller-actions`: Role-aware conditional actions and metric telemetry in property details for authenticated sellers, replacing buyer contact widgets.

### Modified Capabilities
<!-- None -->

## Impact

- `src/pages/PropertyDetailView.tsx`: Introduce conditional rendering based on authentication state / seller context, displaying seller metric cards and navigation shortcuts.
- `src/App.tsx`: Pass relevant state (inquiries, visits, reservations, current user, navigation handlers) to `PropertyDetailView` and support navigating to Interactions view with property filtering.
- `src/pages/InteractionsView.tsx`: Support receiving or applying property-level filters when opened from property detail metrics.
- Mobile bottom action bar in `PropertyDetailView.tsx`: Switch between buyer actions and seller metrics/shortcuts based on authentication status.
