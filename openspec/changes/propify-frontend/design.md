## Context

See `proposal.md` for project motivation. 

The application architecture is a single-page application built with React 19, Vite 6, TypeScript, Tailwind CSS v4, Lucide React (`lucide-react`), and Motion (`motion/react`). Data operations are abstracted behind a modular service layer under `src/services/`, utilizing initial mock data in `src/data/initialData.ts` with explicit TypeScript types in `src/types.ts`. This structure ensures a smooth transition to Supabase BaaS integration without altering UI component signatures.

## Goals / Non-Goals

**Goals:**
- Implement responsive, high-fidelity UI views for both public buyers and private sellers following the specifications in `docs/propify-frontend.md`.
- Establish clean page routing and active view navigation within `src/App.tsx`.
- Create modular, reusable components using Tailwind CSS v4 and Motion for smooth animations and transitions.
- Isolate state management and simulated async API calls within dedicated service modules (`propertyService.ts`, `authService.ts`, `interactionService.ts`).

**Non-Goals:**
- Live Supabase BaaS client connections, database schema execution, or RLS policy creation in this change (handled in mock layer now, with Supabase integration ready).
- Real-time WebSockets or payment gateway SDK processing.

### 1. Full Spanish Localization (`es-AR`) & Argentina Market Focus
- **Decision:** All application UI text, navigation items, status tags, form placeholders, metrics, and notification toasts are natively written in Spanish (`es-AR`).
  - Property statuses: *En Venta*, *Reservado*, *Vendido*.
  - Publication statuses: *Publicado*, *Pausado*, *Archivado*.
  - Categories & Types: *Terrenos / Lotes*, *Casas*, *Departamentos*, *Locales comerciales*.
  - Formatting utilities in `src/utils/formatters.ts` support currency display in ARS ($) and USD (US$).
- **Rationale:** Aligns with the target audience in Argentina, ensuring a clear and localized user experience.

### 2. Pre-formatted WhatsApp Inquiry Action Generator
- **Decision:** Implement a dedicated helper function in `src/utils/whatsappHelpers.ts`:
  ```typescript
  export function createWhatsAppInquiryLink(
    sellerName: string,
    sellerPhone: string,
    listingId: string,
    listingTitle: string
  ): string {
    const text = `Hola ${sellerName} estoy interesado/a en la compra de ${listingId} ${listingTitle} quisiera agendar una visita y saber mas detalles del mismo`;
    return `https://wa.me/${sellerPhone}?text=${encodeURIComponent(text)}`;
  }
  ```
- **Rationale:** Fulfills the explicit buyer conversion trigger requirement, passing mock seller phone data and property parameters seamlessly.

### 3. View & Route Navigation Architecture
- **Decision:** Use a top-level state-based navigation switcher in `src/App.tsx` with role switching (Buyer / Seller mode toggle) and page routing.
- **Rationale:** Avoids overhead of full client-side router libraries while keeping navigation fast and straightforward for an MVP.
- **Alternative Considered:** `react-router-dom` v7 — rejected for initial MVP to keep state management simple per project AGENTS guidelines.


### 2. Dynamic Property Category Data Schema (Built Real Estate vs. Land/Lots)
- **Decision:** Model real estate listings with a flexible category discriminator and conditional attribute schema in `src/types.ts`:
  - `category`: `'built' | 'land'`
  - `type`: `'house' | 'apartment' | 'land_lot' | 'commercial' | 'industrial'`
  - **Built Property Attributes:** `bedrooms`, `bathrooms`, `parkingSpaces`, `coveredAreaSqm`.
  - **Land/Lot Attributes (`landDetails`):** `totalAreaSqm`, `zoning` (e.g. Residential, Commercial, Agricultural), `topography` (`'flat' | 'sloped' | 'steep'`), `utilities` (`water`, `electricity`, `sewage`, `gas`, `internet`), and `accessType` (`'paved' | 'dirt'`).
  - UI components (`PropertyCard.tsx`, `PropertyDetailView.tsx`, `PropertyFormModal.tsx`, `PropertyFilterBar.tsx`) dynamically switch rendered badge specs and form controls based on `category`.
- **Rationale:** Ensures clean domain modeling for unbuilt land / raw lots without forcing irrelevant bedroom/bathroom fields onto land listings.

### 3. Mobile-First UX Strategy & Touch Ergonomics
- **Decision:** Build the entire UI using a strict **Mobile-First** paradigm:
  - Base utility styles target mobile viewports (320px - 480px width) first, using Tailwind `sm:`, `md:`, and `lg:` breakpoints to scale up for tablets and desktops.
  - Interactive touch targets maintain a minimum height/width of **48px** (`h-12`) to support one-handed thumb interaction.
  - Form dialogs, filter controls, and modals present as **Bottom Sheet Drawers** on mobile screens, sliding up with `motion/react` animations, and as centered modals on desktop screens.
  - Property Detail View includes a **Sticky Bottom Action Bar** (`fixed bottom-0 left-0 right-0 z-40 md:hidden`) providing instant one-tap access to WhatsApp inquiry, tour scheduling, and reservation intent.
  - Main app navigation features a **Sticky Mobile Bottom Nav Bar** (`src/components/BottomNavBar.tsx`) for primary section switching on mobile devices.
- **Rationale:** Ensures optimal usability for mobile buyers and sellers who represent the majority of real estate platform traffic.

### 4. Component Scaffolding & Google Stitch Integration
- **Decision:** Scaffold core layouts and high-fidelity themes using Google Stitch MCP design assets, adhering to modern minimalist and sleek dark/light theme aesthetics with Motion animations.
- **Rationale:** Provides consistent styling, typography, spacing, and micro-interactions.

### 5. Data Flow & Service Abstraction Layer
- **Decision:** Create domain-specific services in `src/services/`:
  - `propertyService.ts`: CRUD operations, filtering (including Land/Lot type filter), status toggles.
  - `authService.ts`: Email/password authentication, session management, and user account registration (`signUp` & `signIn`).
  - `interactionService.ts`: Buyer inquiry message & tour schedule manager.
- **Rationale:** Separates UI logic from data persistence, allowing seamless replacement with `@supabase/supabase-js` later.

### 6. Page & Component File Organization
- **Pages (`src/pages/`):**
  - `CatalogView.tsx`: Public buyer marketplace catalog with search, filter toolbar (House, Apartment, Land/Lot), mobile bottom filter drawer, and grid/list view toggles.
  - `PropertyDetailView.tsx`: Photo gallery carousel, dynamic specs grid (built vs. land/lot attributes), schedule tour widget, inquiry form, sticky mobile bottom action bar, and reservation modal trigger.
  - `LoginView.tsx`: Seller authentication screen supporting credentials login and new user account registration tabs/toggle, touch-optimized for mobile.
  - `DashboardView.tsx`: High-level metrics summary cards for active listings, unread leads, and scheduled tours in mobile-friendly card stacks.
  - `ListingsView.tsx`: Seller property management table/mobile card list supporting land plots and built listings with status toggles and modal form trigger.
  - `InteractionsView.tsx`: Seller dual-tab inbox for buyer inquiries and property tour confirmation schedule.
- **Components (`src/components/`):**
  - `HeaderBar.tsx`: Desktop top navigation header with role toggle and search bar.
  - `BottomNavBar.tsx`: Mobile fixed bottom navigation bar for single-thumb navigation (`md:hidden`).
  - `PropertyCard.tsx`: Mobile-first listing display card supporting built properties and land/lots with status badges, touch actions, and hover animations.
  - `PropertyFilterBar.tsx`: Filter controls (property type, price, surface area) with mobile bottom-sheet drawer trigger.
  - `PropertyFormModal.tsx`: Mobile bottom-sheet / desktop slide-over form for creating and editing built properties and land/lot listings with dynamic field switching.
  - `ScheduleVisitModal.tsx`: Date/time picker widget for scheduling tour visits.
  - `ReservationModal.tsx`: Intent-to-buy digital reservation checkout modal.
  - `Toast.tsx`: Animated feedback notification toasts.


## Risks / Trade-offs

- **[Risk] State Persistence in Memory:** In-memory mock data resets on browser refresh.
  - **Mitigation:** Use `localStorage` backup within service helpers to persist state across browser reloads until Supabase BaaS is linked.
- **[Risk] Large Layout Shift in Photo Gallery:** High-res photos causing CLS during image load on mobile devices.
  - **Mitigation:** Predefine aspect ratios (`aspect-video`, `aspect-square`) and skeleton loaders via Motion and Tailwind CSS.

