# Afroportico Integrated Services Limited - Corporate Web Platform

Production-ready web application built for **Afroportico Integrated Services Limited** (Effurun, Warri, Delta State, Nigeria), delivering multi-disciplinary engineering, procurement, and contracting (EPC) capabilities across mechanical, electrical, facility management, and oil & gas services.

## Tech Stack & Architecture
- **Framework:** Next.js 15 (App Router, TypeScript strict)
- **Styling:** Tailwind CSS v4 with bespoke token architecture
- **Design Tokens:** Deep Navy (`#04374D`) and Turquoise (`#2BC194`)
- **Typography:** Plus Jakarta Sans variable font
- **Motion & UI:** GSAP, Lenis smooth scroll, Lucide icons (stroke 1.75)
- **Brand System:** Official Portal Emblem with protective white tile containment on dark surfaces

## Project Structure
```
├── assets/                  # Original brand assets and processed marks
├── content/                 # Single source of truth (site.ts) with typed status
├── design-tokens/           # tokens.json and tokens.css
├── docs/                    # Reference spec, gap list, provenance, fidelity reports
├── public/                  # Favicons, web manifest, and image assets
├── scripts/                 # Asset processor, content audit, and verification scripts
└── src/
    ├── app/                 # Next.js App Router pages (Home, About, Services, Projects, Compliance, Contact)
    └── components/          # Reusable UI components
```

## Running the Application
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run content integrity & leakage audit
npm run content:audit

# Build for production
npm run build
```

## Domain Pending Mode Activation Checklist
When the official domain is acquired:
1. Set `NEXT_PUBLIC_SITE_DOMAIN=https://<yourdomain>.com` in production environment variables.
2. Set `CONTACT_TO_EMAIL=info@<yourdomain>.com` for automated Resend/SMTP routing.
3. Update `robots: { index: true, follow: true }` in `src/app/layout.tsx`.
4. Run live test submission on `/contact-us`.

## Scroll-Driven Brand Intro (`#intro`)
The home page (`/`) renders a 60fps `<canvas>` frame-scrubbed brand intro (`src/components/IntroSequence.tsx`) before `#hero`:
- **Desktop frames (`>= 768px`):** `/public/frames/frame_0001.webp` .. `frame_0119.webp` (`1920px` wide)
- **Mobile frames (`< 768px`):** `/public/frames-sm/frame_0001.webp` .. `frame_0119.webp` (`960px` wide)

### Swapping the Intro Video & Re-extracting Frames
1. Replace `assets/Recreating_oil_and_gas_logo_b6d650d7_1080p.mp4` with your new MP4 (or update `videoPath` in `scripts/extract-frames.js`).
2. Run `npm run frames` (requires `ffmpeg` on PATH or WinGet `Gyan.FFmpeg`) to regenerate `/public/frames/` and `/public/frames-sm/`.
3. Update `INTRO_CONFIG.frameCount` in `src/components/IntroSequence.tsx` to match the extracted frame count.

### Tunable Constants (`INTRO_CONFIG` in `src/components/IntroSequence.tsx`)
- `scrollHeightVh`: `400` — Total scroll travel of `#intro` (`400vh`).
- `lerpFactor`: `0.12` — Frame smoothing factor per `requestAnimationFrame` tick (`0.10–0.15`).
- `frameCount`: `119` — Total frames in `/public/frames/` and `/public/frames-sm/`.
- `revealPoint`: `0.92` — Scroll progress (`0–1`) where the final logo frame holds, `#intro` slides/fades out, and `#hero` + navbar reveal.
- `initialPreloadCount`: `10` — Frames preloaded before unlocking scroll.
