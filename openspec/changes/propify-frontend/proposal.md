## Why

PropifyApp needs a modern, responsive frontend MVP for real estate buying, selling, and property management. Currently, the platform lacks a complete user interface for public property buyers to search, filter, schedule visits, and express purchase intent across both built real estate (houses, apartments, commercial spaces) and unbuilt land / raw lots for sale (terrenos en venta sin construcciones). Additionally, sellers and agents require a private management portal to list properties and land plots, manage inquiries, and confirm property tours.

Building this MVP frontend will establish the user experience foundation with high-fidelity React 19 components, Tailwind CSS v4, Motion animations, and Google Stitch MCP generated layout structures.

## What Changes

- **Buyer Portal (Public Marketplace):**
  - Interactive property catalog supporting built structures and raw land/lot listings with grid/list toggles, mobile-first collapsible filter bottom-drawer, and location/type (Casas, Departamentos, Terrenos/Lotes, Locales)/price/surface area filters.
  - Rich property detail view with mobile touch-swipe photo carousel, dynamic specs grid, interactive tour scheduling modal, contact inquiry form, WhatsApp trigger with pre-formatted inquiry message (`"Hola {vendedor.name} estoy interesado/a en la compra de {land/lot ID} {land/lot name} quisiera agendar una visita y saber mas detalles del mismo"`), and sticky bottom action bar for instant reservation & contact.
- **Seller Backoffice (Private Dashboard):**
  - Authentication screen supporting classic email/password login and user account registration, touch-optimized for mobile devices.
  - High-level metric summary dashboard (Propiedades Activas, Consultas Pendientes, Visitas Agendadas) rendered in mobile-friendly card stacks.
  - Property listings manager supporting responsive mobile cards and desktop tables with CRUD operations, publication status toggles (*Publicado*, *Pausado*, *Archivado*), and slide-over/bottom-sheet modal property creation & edit form with dynamic field switching for Land/Lot vs. Built Property attributes.
  - Interaction manager with dual tabs for managing inquiry messages and property tour confirmation schedules.
- **Component & Motion Infrastructure & Localization:**
  - Full application localization in Spanish (`es-AR`) tailored for users in Argentina (currency support for USD and ARS).
  - Mobile-first responsive navigation with a sticky bottom navigation bar on mobile viewports and a header bar on desktop.
  - Standardized touch targets (minimum 48px height) and layout structures scaffolded with Google Stitch MCP.
  - Micro-interactions and fluid sheet/modal transition animations built with Motion (`motion/react`).



## Capabilities

### New Capabilities

- `buyer-portal`: Public marketplace catalog, property search and filtering, detail view, tour scheduling, buyer inquiries, mobile bottom action bars, and digital reservation flow.
- `seller-backoffice`: Private seller dashboard, mobile navigation, authentication login view, property listing CRUD management, and inquiries & tour schedule management.

### Modified Capabilities

*(None)*

## Impact

- **Frontend Codebase:** Adds view components under `src/pages/`, reusable components under `src/components/`, types in `src/types.ts`, and mobile-first navigation/routing logic in `src/App.tsx`.
- **Dependencies:** React 19, TypeScript, Vite 6, Tailwind CSS v4, Lucide React (`lucide-react`), Motion (`motion/react`).
- **Data & API Layer:** Utilizes mock data in `src/data/` isolated behind service functions in `src/services/` for seamless transition to Supabase BaaS integrations.

