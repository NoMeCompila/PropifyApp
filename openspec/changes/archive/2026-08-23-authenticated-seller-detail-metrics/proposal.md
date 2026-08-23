## Why

When an authenticated seller uses the top navigation bar toggle to explore the catalog in "Buyer Mode" (to preview the catalog layout as a buyer would see it) and clicks on a property, the detail view previously fell back to the buyer contact form instead of showing the seller metrics sidebar. 

Because an authenticated user is the property owner / agent, they should always be shown their property telemetry, metrics, and management actions inside `PropertyDetailView` regardless of which catalog exploration toggle state is currently active in the header, while unauthenticated users (guests) continue to receive the standard buyer contact and reservation widgets.

## What Changes

- **Auth-Driven Seller Role Determination in PropertyDetailView**: Update seller identification logic in `PropertyDetailView.tsx` to recognize authenticated users (`Boolean(currentUser)`), ensuring that logged-in sellers always access the seller telemetry sidebar and mobile management action bar even when navigating from the public catalog preview.
- **Preserved Unauthenticated Experience**: Ensure that unauthenticated guests (`currentUser === null`) continue to see the full buyer interaction flow (WhatsApp contact, Visit scheduling, Reservation modal, and direct inquiry form) without any changes.

## Capabilities

### Modified Capabilities
- `property-detail-seller-actions`: Expand seller action rendering in property details to activate whenever `currentUser` is authenticated, preventing self-inquiry widgets even when browsing in buyer preview mode.

## Impact

- `src/pages/PropertyDetailView.tsx`: Adjust `isSeller` determination logic to evaluate `Boolean(currentUser)`.
