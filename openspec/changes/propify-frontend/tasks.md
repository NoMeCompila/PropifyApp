## 1. Core Data Models & Service Abstraction

- [x] 1.1 Update `src/types.ts` with TypeScript definitions for Property (discriminating built real estate vs. Land/Lots with `landDetails`), Inquiry, VisitSchedule, Reservation, and AuthUser.
- [x] 1.2 Create seed dataset in `src/data/initialData.ts` representing sample houses, apartments, and raw land/lots (terrenos en venta sin construcción), tour schedules, and inquiries.
- [x] 1.3 Implement `src/services/propertyService.ts` for property and land/lot retrieval, filtering, and CRUD operations.
- [x] 1.4 Implement `src/services/authService.ts` for email/password authentication, session state management, and user account registration (`signUp` & `signIn`).
- [x] 1.5 Implement `src/services/interactionService.ts` for inquiry message handling and tour appointment status management.
- [x] 1.6 Create `src/utils/whatsappHelpers.ts` for generating WhatsApp chat links prepopulated with `"Hola {vendedor.name} estoy interesado/a en la compra de {land/lot ID} {land/lot name} quisiera agendar una visita y saber mas detalles del mismo"`.
- [x] 1.7 Create `src/utils/formatters.ts` for Spanish currency (USD / ARS) and surface area (m²) text formatting.


## 2. Reusable UI Components & Modals

- [x] 2.1 Build `src/components/HeaderBar.tsx` with desktop navigation, search input, Spanish labels, and role switcher (Comprador / Vendedor).
- [x] 2.2 Build `src/components/BottomNavBar.tsx` with mobile fixed bottom navigation in Spanish for single-thumb section switching (`md:hidden`).
- [x] 2.3 Build `src/components/PropertyCard.tsx` supporting mobile-first layout cards, dynamic spec badges in Spanish for built properties vs. land/lots, grid/list view adaptivity, status badges (En Venta, Reservado, Vendido), touch actions, and hover animations.
- [x] 2.4 Build `src/components/PropertyFilterBar.tsx` with mobile bottom-sheet filter drawer and desktop inline filter controls in Spanish (Category, Type: Terrenos/Lotes, Casas, Departamentos, Locales, Price, Surface Area).
- [x] 2.5 Build `src/components/ScheduleVisitModal.tsx` for scheduling property and land plot tours with touch-friendly date/time pickers.
- [x] 2.6 Build `src/components/ReservationModal.tsx` for digital intent-to-buy downpayment checkout workflow with mobile bottom-sheet styling in Spanish.
- [x] 2.7 Build `src/components/PropertyFormModal.tsx` for creating/editing properties and land/lot listings with dynamic field switching in Spanish (hiding rooms/baths for Land/Lots, showing zoning/utilities/topography).
- [x] 2.8 Build `src/components/Toast.tsx` for animated feedback notifications in Spanish.


## 3. Public Buyer Views

- [x] 3.1 Implement `src/pages/CatalogView.tsx` with mobile-first catalog layout in Spanish supporting houses, apartments, and land/lot listings, grid/list view toggling, and active filtering.
- [x] 3.2 Implement `src/pages/PropertyDetailView.tsx` with touch-swipe photo gallery, dynamic specs grid, sticky mobile bottom action bar, tour scheduler, inquiry form, WhatsApp trigger with pre-formatted message (`"Hola {vendedor.name} estoy interesado/a en la compra de {land/lot ID} {land/lot name}..."`), and reservation modal.



## 4. Private Seller Views

- [x] 4.1 Implement `src/pages/LoginView.tsx` with email/password login and new user account registration forms, optimized for touch screens.
- [x] 4.2 Implement `src/pages/DashboardView.tsx` with mobile-friendly stacked summary metric cards and quick action shortcuts.
- [x] 4.3 Implement `src/pages/ListingsView.tsx` with responsive listings table / mobile cards for built properties and land plots, publication status toggles, and modal form integration.
- [x] 4.4 Implement `src/pages/InteractionsView.tsx` with dual-tab management for inquiry inbox and tour visit confirmations.


## 5. Main Routing & Layout Integration

- [x] 5.1 Update `src/App.tsx` to handle page routing, view transitions, notification toasts, mobile bottom bar integration, and state synchronization across views.
- [x] 5.2 Validate application build (`npm run build`) and test frontend workflows across mobile (320px-480px), tablet, and desktop viewports.



