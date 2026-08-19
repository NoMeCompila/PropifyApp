## Why

Users frequently miss important status changes, interaction feedback, and error alerts because the existing toast notifications are small, blend into the top-right corner, and lack immediate visual salience. Redesigning the notification system with a top-centered, prominent capsule/pill aesthetic, vibrant color-coded states (emerald green for success, vivid crimson red for errors, and electric blue for info), glassmorphic glows, and fluid spring animations ensures immediate visual feedback across buyer and seller actions.

## What Changes

- Redesign `ToastContainer` and toast item components in `src/components/Toast.tsx`:
  - Position: Centered horizontally at the top (`top: 20px`, `left: 50%`, `transform: translateX(-50%)`).
  - Shape & Size: Rounded pill (`rounded-full` / `50px`), increased padding (`py-3 px-6`), crisp typography, and enlarged icons.
  - Colors & Glows:
    - 🟢 **Success**: Rich emerald green with glowing box-shadow and translucent glass border.
    - 🔴 **Error**: Vibrant red with glowing box-shadow and translucent glass border.
    - 🔵 **Info**: Deep electric blue/cyan with glowing box-shadow and translucent glass border.
  - Animations: Spring-based entry/exit transitions powered by Motion (`motion/react`).
- Maintain compatibility with all existing notification triggers across auth, property management, visits, reservations, and inquiries.

## Capabilities

### New Capabilities
- `enhanced-toast-notifications`: High-visibility, top-centered animated toast popup system for real-time user feedback with distinct color grading for success, error, and informational states.

### Modified Capabilities
<!-- None -->

## Impact

- **Affected Files**: `src/components/Toast.tsx`, `src/App.tsx`.
- **User Experience**: Drastically improved feedback visibility for both buyers and sellers across all transactional flows.
