# Reference Design Specification: Afroportico Integrated Services Limited

Measured and mapped from `1795029185834_image.png` (reference web design) and client specifications.

## 1. Global Layout and Shell
- **Viewport Target:** 1440px desktop baseline, fluid responsiveness from 360px to 2560px.
- **Container Max-Width:** 1320px with centered margin.
- **Page Margin / Gutter:** Fluid `clamp(16px, 2.5vw, 40px)`.
- **Vertical Rhythm / Section Spacing:** `clamp(72px, 9vw, 144px)`.
- **Header-Hero Gap:** 16px vertical gap between floating header and top of hero panel.

## 2. Surfaces and Colors
- **Page Background:** `#EEF3F5` (subtly tinted from deep navy, non-stark, comfortable reading contrast).
- **Cards & Elevated Surfaces:** `#FFFFFF` with 1px border `rgba(4, 55, 77, 0.12)` and soft shadow `0 12px 32px rgba(4, 55, 77, 0.08)`.
- **Dark Sections:** Deep Navy `#04374D` with nested cards in `#022636`.
- **Brand Accent:** Turquoise `#2BC194` for interactive fills, button chips, indicators.
- **Text on Light:** Heading `#04374D`, Body `#3D5A68` (contrast > 6.5:1), Accent text `#087A5E` (`--teal-ink` for WCAG AA compliance).

## 3. Typography Scale (Plus Jakarta Sans)
- **Hero Title (H1):** `clamp(2.5rem, 1.35rem + 4.6vw, 4.5rem)`, weight 600, leading 1.05, tracking -0.03em.
- **Section Title (H2):** `clamp(2rem, 1.2rem + 2.6vw, 3.25rem)`, weight 600, leading 1.1, tracking -0.025em.
- **Card Title (H3):** `clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)`, weight 600, leading 1.2.
- **Feature Title (H4):** `1.125rem` (18px), weight 600, leading 1.3.
- **Eyebrow / Badge:** `0.8125rem` (13px), weight 600, uppercase, tracking +0.08em.
- **Body Text:** `clamp(1rem, 0.96rem + 0.2vw, 1.125rem)`, weight 400, leading 1.65, max-width 68ch.
- **Ghost Marquee:** `clamp(4rem, 2rem + 9vw, 10rem)`, weight 600, outlined stroke `1px rgba(4, 55, 77, 0.18)` transparent fill.

## 4. Key Component Anatomy
- **Header:**
  - Floating pill bar with radius `20px` / `9999px`.
  - Left: Navigation links (`HOME`, `ABOUT US`, `SERVICES`, `PROJECTS`, `COMPLIANCE`).
  - Center: Afroportico portal emblem logo mark (36px height) + Live wordmark.
  - Right: Direct call button `+234 803 088 5952` with phone chip + "Get a Quote" pill button.
- **Hero Banner:**
  - Contained rounded panel (radius 28px).
  - Background imagery of Nigerian engineering technicians and infrastructure.
  - 3-slide pager with subtle 6s autoplay and pause on hover.
  - Floating vertical dot indicator on the right edge.
- **4 Feature Cards:**
  - White surface, radius 20px, padding 24px.
  - Bare Lucide icon (stroke 1.75) top-left.
  - Hairline separator with brand teal accent dot.
  - Distinctive notched bottom-right corner holding circular arrow action button.
- **Who We Are Section:**
  - Asymmetric two-column composition.
  - Left: Image frame with inverted corner tab cutout matching reference architecture.
  - Right: Eyebrow, two-tone heading, 3 tab pills (Mission / Vision / History), supporting image, 3-item checklist, outline CTA button + call block.
- **Dark Services Carousel:**
  - Deep Navy container (radius 28px).
  - High-contrast typography with teal highlighted phrase.
  - Navigation controls (prev white, next teal).
  - Cards featuring white inset border around industrial photography, bold titles, and bullet highlights.
- **Step Process (01-04):**
  - Oversized step numerals (`01`, `02`, `03`, `04`) in faded tabular styling with titles and scope definitions.
- **Industries Interactive List:**
  - Giant background watermark `INDUSTRIES WE SERVE`.
  - 4 full-width interactive rows with preview thumbnails and directional arrows.
- **FAQ Accordion:**
  - High-impact layout: photo on left, deep navy accordion on right.
  - Animated height transitions with 45-degree rotating plus icon.
- **Project Gallery:**
  - Interactive category filters (`All`, `Electrical`, `Facility Management`, `Mechanical`).
  - Floating white caption cards with category badges and lightbox view.
- **Footer & Pre-Footer Banner:**
  - "Tell us what you need" full-width quote invitation band.
  - 4-column corporate footer with verified Warri address, direct phone link, and legal copyright notice.
