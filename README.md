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
