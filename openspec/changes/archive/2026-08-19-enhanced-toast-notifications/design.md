## Context

Currently, `ToastContainer` in `src/components/Toast.tsx` is fixed at `top-4 right-4` with a rectangular card format (`rounded-xl max-w-sm`). Users report that this positioning and styling goes unnoticed. We will overhaul the toast styling to match a floating, glowing capsule pill centered at the top of the viewport.

## Goals / Non-Goals

**Goals:**
- Position `ToastContainer` fixed at `top-5 left-1/2 -translate-x-1/2 z-[200]` with `pointer-events-none` container and `pointer-events-auto` toast elements.
- Style toast items as glowing capsules (`rounded-full` / `50px` radius, `px-6 py-3.5`) with glassmorphic borders (`border border-white/20`) and custom box shadows.
- Implement specific color schemes:
  - **Success (Green)**: `bg-emerald-600/95 text-white shadow-[0_10px_30px_rgba(16,185,129,0.45)] border-white/25`
  - **Error (Red)**: `bg-red-500/95 text-white shadow-[0_10px_30px_rgba(239,68,68,0.45)] border-white/25`
  - **Info (Blue)**: `bg-blue-600/95 text-white shadow-[0_10px_30px_rgba(37,99,235,0.45)] border-white/25`
- Smooth spring entry animation (`y: -50` to `y: 0`, `scale: 0.9` to `scale: 1`, with custom spring transition).
- Ensure mobile responsiveness (fitting on smaller mobile screens with max-width `calc(100vw - 32px)`).

**Non-Goals:**
- Changing existing toast trigger messages or business logic in `App.tsx`.

## Decisions

### 1. Motion Spring Animation Configuration
```tsx
<motion.div
  initial={{ opacity: 0, y: -40, scale: 0.9 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: -30, scale: 0.9 }}
  transition={{
    type: 'spring',
    stiffness: 400,
    damping: 25,
    mass: 0.8
  }}
  className="..."
>
```

### 2. Layout Structure
```tsx
<div className="fixed top-5 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-2.5 w-full max-w-lg px-4 pointer-events-none">
```

## Risks / Trade-offs

- **[Risk]** Large toasts might obscure top navigation or mobile header temporarily.
  - **Mitigation**: Compact height, centered placement, dismiss button, and 4-second auto-dismissal keep interaction unobtrusive.
