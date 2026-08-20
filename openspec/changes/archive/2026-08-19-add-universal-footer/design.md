## Context

PropifyApp needs a lightweight, compliant footer across all views. Sellers require quick legal links (T&C, Privacy, Consumer Defense, Right of Withdrawal), while public visitors need clean copyright branding (`DTØ-04 © 2026 Todos los derechos reservados.`).

## Goals / Non-Goals

**Goals:**
- Create `src/components/FooterBar.tsx` accepting `currentUser?: AuthUser | null`.
- Center both rows horizontally (`flex flex-col items-center justify-center text-center`).
- Theme styling:
  - Light mode: `bg-slate-200 text-slate-900 border-t border-slate-300` (light gray with dark/black text).
  - Dark mode: `dark:bg-[#150b24] dark:text-white dark:border-purple-900/40` (dark purple background with white text).
- Responsive spacing: `py-6 px-4 mb-16 md:mb-0` (to avoid overlapping the mobile bottom navigation bar on mobile devices).
- Integrate `FooterBar` in `src/App.tsx` directly below `<main className="flex-1">`.

**Non-Goals:**
- Creating full-page static legal policy views (links will use `href="#"` as requested for now).

## Component Structure

```tsx
export const FooterBar: React.FC<{ currentUser?: AuthUser | null }> = ({ currentUser }) => {
  const isSeller = Boolean(currentUser);

  return (
    <footer className="w-full py-6 px-4 bg-slate-200 text-slate-900 border-t border-slate-300 dark:bg-[#150b24] dark:text-white dark:border-purple-900/40 transition-colors duration-200 mb-16 md:mb-0">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-2 text-center text-xs sm:text-sm font-medium">
        {isSeller && (
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-slate-800 dark:text-white/90 font-semibold">
            <a href="#" className="hover:underline hover:text-indigo-600 dark:hover:text-purple-300 transition-colors">Términos y Condiciones</a>
            <span className="text-slate-400 dark:text-purple-400">·</span>
            <a href="#" className="hover:underline hover:text-indigo-600 dark:hover:text-purple-300 transition-colors">Política de Privacidad</a>
            <span className="text-slate-400 dark:text-purple-400">·</span>
            <a href="#" className="hover:underline hover:text-indigo-600 dark:hover:text-purple-300 transition-colors">Defensa del Consumidor</a>
            <span className="text-slate-400 dark:text-purple-400">·</span>
            <a href="#" className="hover:underline hover:text-indigo-600 dark:hover:text-purple-300 transition-colors">Botón de Arrepentimiento</a>
          </div>
        )}

        <p className="text-xs text-slate-700 dark:text-white/80 font-normal">
          DTØ-04 © 2026 Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
```
