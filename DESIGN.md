# Design System: AuraLens Foto-Booking

## 1. Visual Theme & Atmosphere
A warm, editorial-airy interface with offset asymmetric layouts and fluid motion. The atmosphere evokes a modern premium photo gallery—clean, minimalist, with focus on high-quality photography. The visual density is balanced (Level 4), design variance is high (Level 8) using offset columns and asymmetric grid tiles, and motion is fluid (Level 6) with spring-physics page reveals. Integrates **shadcn/ui** components customized for this specific aesthetic.

## 2. Color Palette & Roles

### Dark Theme (Active default)
- **Canvas Black** (#0C0C0E) — Primary background surface
- **Pure Surface Dark** (#161619) — Cards, dropdowns, navigation overlays
- **Warm White Ink** (#F4F4F5) — Primary text, headings
- **Muted Zinc Dark** (#A1A1AA) — Secondary text, descriptions, details
- **Whisper Border Dark** (rgba(39, 39, 42, 0.6)) — Subtle card borders, dividers
- **Premium Emerald Dark** (#34D399) — Accent for CTAs, active status, highlights

### Light Theme
- **Canvas Cream** (#FBFBFA) — Primary background surface
- **Pure Surface Light** (#FFFFFF) — Cards, dropdowns, navigation overlays
- **Charcoal Ink** (#18181B) — Primary text, headings
- **Muted Zinc Light** (#71717A) — Secondary text, descriptions, details
- **Whisper Border Light** (rgba(228, 228, 231, 0.8)) — Subtle card borders, dividers
- **Premium Emerald Light** (#059669) — Accent for CTAs, active status, highlights

## 3. Typography Rules
- **Display/Headlines:** Plus Jakarta Sans — Track-tight (`tracking-tighter`), weight-driven hierarchy, `leading-none` or `leading-tight`. Warm, rounded, friendly geometry.
- **Body:** Plus Jakarta Sans — Relaxed leading, 65ch max-width, neutral secondary color.
- **Mono:** Geist Mono — For numbers, package details, steps, metadata.
- **Banned:** `Inter` is strictly BANNED. Generic system fonts are BANNED. Serif fonts are BANNED in functional UI (buttons, forms, cards).

## 4. Component Stylings
- **Buttons:** Flat surfaces, no outer glow. Tactile `-translate-y-[1px]` or `scale-[0.98]` transition on click. Accent fill for primary, thin outline with background tint for secondary. Leveraging **shadcn/ui** custom configurations.
- **Cards:** Rounded corners (`rounded-2xl`). Soft diffused shadow. Used exclusively to group packages or testimonials. In list contexts, cards are replaced by pure spacing and `border-t` dividers.
- **Inputs:** Label strictly placed above input. No floating labels. Focus ring colored in Premium Emerald.
- **Loaders:** Skeletal loaders matching layout sizes. Circular spinners are BANNED.
- **Empty/Error States:** Inline beautiful typography with emerald details—no generic UI banners.

## 5. Layout Principles
- **Asymmetric Grid:** Selected works use a custom asymmetric grid (2 columns mixed with 1 column tiles).
- **Responsive Layout:** Multi-column layouts collapse to a single column on mobile viewports (< 768px). No absolute layouts causing horizontal scrolling.
- **Containment:** Main container max-width constrained to `max-w-7xl` (1280px) or `max-w-[1400px]` with generous side paddings.
- **Viewport Stability:** Full-height sections use `min-h-[100dvh]` to prevent viewport jumping on mobile.

## 6. Motion & Interaction
- **Spring Physics:** Active states and transitions use `type: "spring", stiffness: 100, damping: 20` for a weighty, natural feel.
- **Waterfall Reveal:** List items use staggered mounting delays (`staggerChildren` or CSS delay loops).
- **GPU Acceleration:** Animations restricted to `transform` and `opacity`.

## 7. Anti-Patterns (Banned)
- No emojis anywhere
- No `Inter` font
- No pure black (#000000)
- No neon/outer glow shadows
- No 3-column equal card grids (use asymmetric grid or horizontal scroll instead)
- No generic placeholder names (e.g. "John Doe", "Sarah Chan")
- No AI copywriting clichés ("Elevate", "Seamless", "Unleash")
- No scroll indicator arrows or chevrons
- No overlapping absolute elements causing layout clutter
