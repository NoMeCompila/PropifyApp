# OpenSpec Proposal: PropifyApp MVP Frontend

## Intent
Build the initial MVP user interface for **PropifyApp**, a real estate buying, selling, and investment web platform. 

This proposal covers the implementation of the frontend interfaces using **React 19**, **Vite 6**, **Tailwind CSS v4**, **Lucide React**, and **Motion**, leveraging **Google Stitch MCP** for generating high-fidelity UI screens and interactive layouts.

---

## Scope & Capabilities

The MVP frontend is divided into two primary user-facing areas:

### 1. Seller Backoffice (Private Management Dashboard)
- **Authentication & Access:**
  - Login & Register view supporting classic email/password authentication and user account creation.
- **Property Content Management (CRUD):**
  - Form UI to create, edit, view, and delete property listings (land, houses, apartments).
  - Input fields for title, property type, price, status (*For Sale*, *Reserved*, *Sold*), location, square meters, room count, and description.
  - Interactive media gallery uploader component with image reordering support.
  - Toggle switch for publication status (*Published*, *Paused*, *Archived*).
- **Leads & Interaction Management:**
  - Inquiries inbox panel to read and reply to prospective buyers.
  - Interactive visits calendar/list view to confirm or reject scheduled property tours.
  - Reservation management UI to review, manually record, or approve digital property reservations.

### 2. Buyer Portal (Public Marketplace)
- **Navigation & Discovery:**
  - Public property catalog with responsive grid and list view toggles.
  - Search and filtering toolbar (location, property type, price range, rooms).
  - Detailed property view page featuring photo gallery carousel, specs sheet, full description, and map view.
- **Conversion & Engagement:**
  - Integrated visit scheduling modal with date/time pickers and buyer contact inputs.
  - Inquiry form embedded in property detail pages.
  - Quick action bar with direct WhatsApp messaging trigger.
  - Online reservation flow trigger (checkout modal UI for intent-to-buy downpayments).

---

## Technical Stack & Constraints

- **Core Framework:** React 19 with TypeScript.
- **Build Tool:** Vite 6.
- **Styling & UI:** Tailwind CSS v4 for utility-first styling.
- **Iconography:** Lucide React (`lucide-react`).
- **Animations:** Motion (`motion/react`) for page transitions, modal animations, and micro-interactions.
- **Generation Tooling:** **Google Stitch MCP** for automated component scaffolding, layout composition, and design-system alignment.
- **Target Market & Localization (Argentina - Spanish):** All application interface text, labels, status badges, forms, and messages MUST be written natively in Spanish (`es-AR`). Prices support ARS ($) and USD (US$).
- **WhatsApp Direct Action Message:** Clicking the WhatsApp contact button on property detail pages opens a pre-populated chat message to the seller:
  `"Hola {vendedor.name} estoy interesado/a en la compra de {land/lot ID} {land/lot name} quisiera agendar una visita y saber mas detalles del mismo"`


---

## Non-Goals (Out of Scope for initial Frontend Proposal)
- Backend business logic implementation, direct database migrations, or live payment gateway SDK configurations (covered in `design.md` and service layer integrations).
- Complex analytics or multi-tenant agent management dashboards (reserved for post-MVP iterations).

---

## Proposed Artifacts & Screens

The following UI screens will be generated and structured under `src/pages/` and `src/components/`:

### Public Buyer Views
1. **Catalog View (`src/pages/CatalogView.tsx`):**
   - Main discovery layout with filter controls and `PropertyCard` grids.
2. **Property Detail View (`src/pages/PropertyDetailView.tsx`):**
   - Media gallery, specs grid, interactive scheduling widget, contact form, and direct action triggers.

### Private Seller Views
3. **Login View (`src/pages/LoginView.tsx`):**
   - Auth screen for credentials login and new seller user account registration.
4. **Seller Dashboard / Backoffice (`src/pages/DashboardView.tsx`):**
   - High-level metric summary cards (active listings, pending leads, scheduled visits).
5. **Listings Management (`src/pages/ListingsView.tsx` & `src/components/PropertyFormModal.tsx`):**
   - Interactive table for CRUD operations and slide-over/modal form for creating/editing properties.
6. **Inquiries & Visits Manager (`src/pages/InteractionsView.tsx`):**
   - Dual-tab view for message inbox management and property tour confirmation schedule.

---

## Acceptance Criteria
- [ ] Google Stitch MCP successfully scaffolded component structures using specified React 19 and Tailwind CSS v4 patterns.
- [ ] Public buyer portal allows smooth browsing, property filtering, and opening detail views without layout shifts.
- [ ] Seller backoffice provides complete visual workflows for property creation, publication status toggling, and visit management.
- [ ] All interactive elements (modals, dropdowns, view toggles) utilize Motion for fluid UI transitions.
- [ ] Touch targets for mobile viewports meet the minimum 48px height requirement across all interactive components in both buyer and seller views.