## Why

PropifyApp currently lacks a persistent footer across its views. Adding a clean, minimal footer establishes consistent branding, legal compliance links for sellers (Terms & Conditions, Privacy Policy, Consumer Defense, and Right of Withdrawal), and copyright information tailored by authentication state across light and dark themes.

## What Changes

1. **New Component (`src/components/FooterBar.tsx`)**:
   - For **authenticated sellers** (`currentUser !== null`):
     - Line 1: Centered links: `[Términos y Condiciones] · [Política de Privacidad] · [Defensa del Consumidor] · [Botón de Arrepentimiento]` (styled with `href="#"`).
     - Line 2: Centered copyright notice: `DTØ-04 © 2026 Todos los derechos reservados.`
   - For **unauthenticated buyers** (`currentUser === null`):
     - Line 1: Centered copyright notice: `DTØ-04 © 2026 Todos los derechos reservados.`
2. **Theming**:
   - Light mode: Light gray background with crisp black text (`bg-slate-200/90 text-slate-900 border-slate-300`).
   - Dark mode: Deep purple/violet background with bright white text (`dark:bg-[#160d26] dark:text-white dark:border-purple-950/60`).
3. **Universal Integration (`src/App.tsx`)**:
   - Render `FooterBar` globally at the bottom of the viewport across all views (Catalog, Detail, Login, Dashboard).

## Capabilities

### New Capabilities
- `universal-footer`: Persistent footer component rendering legal links and copyright info customized by user authentication status with dedicated light (light gray/black) and dark (dark purple/white) palettes.

### Modified Capabilities
<!-- None -->

## Impact

- **Affected Files**: `src/components/FooterBar.tsx` (new), `src/App.tsx`.
- **Database Changes**: None.
