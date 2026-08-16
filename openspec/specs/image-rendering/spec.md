# Image Rendering & Storage Capability

## Purpose
Ensures property images stored in Supabase Storage or external URLs load properly and degrade gracefully with fallbacks.

## Requirements

### Requirement: Public Storage Read & Resilient Image Gallery
Property images SHALL be accessible to unauthenticated web buyers and SHALL render gracefully without broken browser icons.

#### Scenario: Public Access to Uploaded Images
- **GIVEN** a property published with photos uploaded to Supabase Storage bucket `property-images`
- **WHEN** a visitor views the catalog or property detail view
- **THEN** the image elements SHALL fetch and render the photo directly from Supabase Storage.

#### Scenario: Image Load Fallback
- **GIVEN** an image URL that fails to load due to network restriction or invalid path
- **WHEN** the browser triggers an `onError` event on the `<img>` tag
- **THEN** the component SHALL automatically replace the broken `src` with a high-resolution real estate fallback image.
