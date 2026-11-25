# Afroportico Integrated Services Limited: Master Build Prompt

Save as `/docs/afroportico-master-prompt.md`. It sits on top of `/docs/playbook.md` and `AGENTS.md`. Paste Section 0 into Antigravity to start. Everything below it is the spec the agent must read and obey.

---

## 0. PASTE THIS FIRST

```
You are building the complete website for Afroportico Integrated Services Limited to
the standard of the best-crafted corporate sites in the world. Read, in order:
/docs/playbook.md, /AGENTS.md, /docs/afroportico-master-prompt.md. Load the skills
reference-decomposer, brand-guardian, motion-director, humanized-copy,
provenance-and-facts, anti-slop-auditor, visual-qa, and frontend-design.

Use Planning mode. Do not write UI code until you have produced and shown me:
1. /docs/reference-spec.md (measured from /references, Section 7 of the master prompt)
2. /design-tokens/tokens.json and tokens.css (Section 5)
3. /docs/gap-list.md and /docs/open-questions.md
Then wait for my approval. After approval, build, screenshot, diff, fix, repeat
until the QA gates in Section 15 pass. Never claim done without evidence.
Write CANNOT VERIFY instead of guessing. Report every assumption at the end.
```

---

## 1. Mission and order of authority

Build a multi-page, fully responsive, production-ready corporate website that replicates the layout, rhythm, component language and motion feel of the reference design, re-skinned to the Afroportico logo colors, with all copy tailored from ladoxeng.com to Afroportico.

When instructions conflict, obey in this order:

1. The client's written instructions in this file (they override the playbook's defaults).
2. The reference design, for layout, spacing, component shape and motion.
3. The logo and color files, for color, logo use and imagery grade.
4. `/docs/playbook.md` and `AGENTS.md`.
5. Your own taste, only after everything above is satisfied.

Where this file overrides the playbook, it is listed in Section 17 so the playbook can be patched.

---

## 2. Project facts

### 2.1 Verified (supplied by the client)

| Item | Value |
|---|---|
| Legal name | Afroportico Integrated Services Limited |
| Address | 37 Water Resources Road, Effurun, Warri, Delta State, Nigeria. |
| Phone | +234 803 088 5952 (`tel:+2348030885952`) |
| Email | `info@[DOMAIN]` (domain not supplied, see 2.2) |
| Palette | Deep Navy `#04374D`, Turquoise `#2BC194` |
| Logo | `Geometric_Navy_and_Teal_Portal_Emblem.png`, an arch mark, navy left half, teal right half, navy centre bar |

### 2.2 Pending (never invent, use a labelled placeholder and log it)

`[YEAR_FOUNDED]`, `[CAC_RC_NUMBER]`, `[WHATSAPP]`, `[LINKEDIN_URL]`, `[FACEBOOK_URL]`, `[INSTAGRAM_URL]`, stats (completion rate, client satisfaction, cost efficiency), client names and logos, testimonials, certifications, real project photos, vision and history text, HSE policy text, quality statement, response time promise, service areas beyond Warri.

### 2.2a Confirmed by the client in conversation

* Afroportico **does offer** the four service lines in Section 8.5: Mechanical, Oil and Gas Services, Facility Management, Electrical and Telecommunications. The service list is approved. The wording of each description is still tailored draft copy until the client reads it.
* The domain will be bought later.

### 2.2b Domain pending mode

The domain is not known, so never guess one. Put it in a single env var, `NEXT_PUBLIC_SITE_DOMAIN` (empty for now), and derive every email, canonical URL, sitemap entry, Open Graph URL and JSON-LD field from it. While it is empty:

* Every place that would show `info@[DOMAIN]` hides the email row in production. The phone number and address remain.
* The contact form route is disabled. The form UI still renders, and on submit shows the failure state with `+234 803 088 5952` as the fallback. Wire Resend or SMTP behind `CONTACT_TO_EMAIL`, so going live is an env change, not a code change.
* `robots.txt` returns `Disallow: /` and every page carries `noindex`, so the Vercel preview URL is never indexed.
* Canonical, sitemap and OG URLs use the deployment URL.

When the domain is set: fill `NEXT_PUBLIC_SITE_DOMAIN` and `CONTACT_TO_EMAIL=info@<domain>`, verify the sending domain (SPF, DKIM) with the email provider, remove `noindex`, then test a real submission. Document these steps in `README.md`.

### 2.3 Template and competitor leakage ban

Template sources and references are a structural and tonal source only. None of these may appear in the build, in code, in alt text or in comments: competitor names, obsolete years ("1991"), addresses ("Amore Street", "Ikeja"), competitor phone numbers or social links, and any client logo or name from competitor lists (Shell, Agip, Halliburton, Schlumberger, Globacom, TotalEnergies, Nigalex, Reynolds, UAC Foods, Nestlé, Allianz, Sterling Oil, IOM, CFAO Laborex, Renaissance). Also strictly ban "Meddy", "Meddy Global Solutions", "MG" emblems, and any other foreign company name, logo, vessel name or lettering visible inside generated or sourced images. Verify every image at 200% zoom. Do not use round placeholder stats that mimic template stats (95, 95, 20). Claiming another company's clients, years or results is strictly forbidden. Run a repo-wide grep before every handoff.

Copy is **rewritten and tailored**, never pasted verbatim.

---

## 3. Inputs

| File | What it is | How to use it |
|---|---|---|
| `Antigravity_Premium_Web_Playbook.md` | Rules, skills, QA | Standing rules |
| `1795029185834_image.png` | Reference design (Induztry style page plus a thumbnail strip of the rest of the page) | Layout, spacing, components, section order |
| `1795029525123_image.png` | Palette swatches | `#04374D` and `#2BC194` are the only brand colors |
| `Geometric_Navy_and_Teal_Portal_Emblem.png` | Logo (white background, raster) | Use exactly as supplied, see 5.3 |
| `https://ladoxeng.com` | Copy and information architecture source | Tailor, see Section 8 |

Step 1 of the build: put these in `/references` and `/assets`. The Ladox homepage was readable by a plain fetch. Its inner pages (`/about-us`, `/services`, `/projects`, `/compliance`, `/hse-policy`, `/contact-us`) are JavaScript rendered. Crawl them with Playwright (wait for network idle), save the rendered text to `/references/ladox-text/`, then rewrite for Afroportico. If a page cannot be read, write `CANNOT VERIFY` and draft from the homepage logic, flagged DRAFT COPY.

---

## 4. Stack and install

* Next.js (App Router, latest stable), TypeScript strict, deployed on Vercel.
* Tailwind CSS configured with **only** the project tokens. Disable the default palette and default font stack. No raw hex or arbitrary px in components (stylelint enforced).
* GSAP (ScrollTrigger, SplitText, Flip, CustomEase), Lenis on one shared scroll clock. Confirm that SplitText is included in your installed GSAP version and verify the API against that version.
* Lucide icons only, stroke 1.75, sizes 16, 20, 24. Inline SVG, `currentColor`.
* Font: **Plus Jakarta Sans** variable via `@fontsource-variable/plus-jakarta-sans`, self hosted, `font-display: swap`, size-adjusted fallback to prevent CLS. The reference typeface cannot be identified from a screenshot, so write `CANNOT VERIFY: reference font`, render the candidate beside the reference crop, and pick the closest geometric sans by structure. Log the choice in `provenance.md`. One family, weight contrast only.
* Forms: a server route using Resend (or the client's SMTP) to deliver to `info@[DOMAIN]`, with Zod validation, a honeypot field, and rate limiting.
* QA: Playwright, `@axe-core/playwright`, Lighthouse, `pixelmatch`, `sharp`.

```bash
npm i gsap lenis lucide-react zod resend @fontsource-variable/plus-jakarta-sans
npm i -D playwright @axe-core/playwright lighthouse stylelint pixelmatch pngjs sharp
npx playwright install
```

---

## 5. Brand system

### 5.1 Color tokens

Brand colors come from the swatches. Everything marked *derived* must be logged in `provenance.md` and checked for contrast before use.

```css
:root {
  /* brand */
  --navy-800: #04374D;   /* Deep Navy, brand */
  --teal-500: #2BC194;   /* Turquoise, brand */

  /* derived */
  --navy-900: #022636;   /* deeper navy for cards inside navy sections, footer base */
  --teal-400: #4FD6AE;   /* hover fill (keeps navy text above 4.5:1, verify) */
  --teal-ink: #087A5E;   /* teal used AS TEXT on light surfaces (verify AA) */

  /* roles */
  --bg:            #EEF3F5;  /* page, tinted from navy, never pure white or grey */
  --surface:       #FFFFFF;  /* cards */
  --text:          var(--navy-800);   /* headings */
  --text-body:     #3D5A68;           /* body on light, about 6.5:1 on --bg */
  --line:          rgba(4, 55, 77, 0.12);
  --on-navy:       #E4EEF2;
  --on-navy-muted: #A9C2CD;           /* about 6.8:1 on --navy-800 */
  --line-on-navy:  rgba(255, 255, 255, 0.14);
  --focus:         var(--teal-500);
}
```

Hard contrast rules (computed from the palette, re-verify in the build):

* Turquoise `#2BC194` as **text on light backgrounds fails AA** (about 2.3:1). Never do it. Use `--teal-ink` for highlighted words on light, or put the teal in a fill with navy text on it (about 5.5:1).
* Turquoise as text on `--navy-800` passes (about 5.5:1). This is where the reference's orange highlighted words map: orange on near black becomes teal on navy.
* The reference's orange pills and chips become `--teal-500` fills with navy text and navy arrows.
* No other accent color anywhere. No orange survives. No gradients unless a gradient is visible in the reference, and then only navy to navy-900 for depth.

### 5.2 Surfaces mapped from the reference

| Reference | Afroportico |
|---|---|
| Light grey blue page | `--bg` |
| White cards | `--surface` |
| Near black dark sections and footer | `--navy-800` with inner cards `--navy-900` |
| Orange | `--teal-500` (fill), `--teal-ink` (text on light), `--teal-500` (text on navy) |
| Orange tinted industrial photography | Photography graded cool: see Section 9 |

### 5.3 Logo rules

* The logo is a raster with a white background. Produce `logo-mark.png` with a transparent background using `sharp` (near white to alpha with a soft edge) and keep the untouched original in `/assets/original/`. Never stretch, recolor, outline, shadow or redraw.
* The navy half disappears on navy. **On any navy surface (dark sections, footer, page transition) place the unaltered logo on a white tile** (radius 16, padding 12). Ask whether the client has a reversed logo: `CANNOT VERIFY: reversed logo exists`.
* The source edges are slightly rough. Do not render it larger than 0.5x its native pixel width on 2x screens. If a larger size is needed, propose a faithful vector trace (potrace), mark it as a logged substitution, and wait for approval.
* Clear space equals the height of the centre bar. Minimum size 32px tall in the header.
* Derive from the original only: `favicon.ico` 32, `icon-192`, `icon-512`, `apple-touch-icon` 180 (mark centred on white, 20% padding), and `og-image` 1200 by 630 (white field, mark left, company name in live typography). Wordmark beside the mark in the header is live text set in Plus Jakarta Sans 700, uppercase, `AFROPORTICO`, with `Integrated Services Limited` smaller beneath it, navy.

---

## 6. Design system

### 6.1 Grid, spacing, radius

| Token | Value |
|---|---|
| Base unit | 8px. Allowed: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 |
| Container | max-width 1320px, centred, page gutter `clamp(16px, 2.5vw, 40px)` |
| Columns | 12 desktop, 8 tablet, 4 mobile. Gap 24px desktop, 16px mobile |
| Section padding (block) | `clamp(72px, 9vw, 144px)` |
| Header to hero gap | 16px (matches reference) |
| Radius | `--r-sm` 12, `--r-md` 20 (cards), `--r-lg` 28 (hero, dark sections, image frames), `--r-pill` 999 |
| Hairlines | 1px `--line` |
| Shadows | one soft token only: `0 1px 2px rgba(4,55,77,.06), 0 12px 32px rgba(4,55,77,.08)`. No glows. |

The reference is a single image, so exact pixel values are estimates. Measure it with a pixel overlay, scale to a 1440 design width, and write measured values into `reference-spec.md`. Where a value cannot be measured write `CANNOT VERIFY` and use the nearest 8pt token.

### 6.2 Type scale and weights

One family, weight does the hierarchy. All fluid with `clamp()`.

| Role | Size | Weight | Line height | Tracking | Notes |
|---|---|---|---|---|---|
| H1 hero | `clamp(2.5rem, 1.35rem + 4.6vw, 4.5rem)` (40 at 390, 57 at 768, 72 at 1440) | 600 | 1.05 | -0.03em | `text-wrap: balance`, max 2 lines desktop |
| H2 | `clamp(2rem, 1.2rem + 2.6vw, 3.25rem)` | 600 | 1.1 | -0.025em | `text-wrap: balance` |
| H3 card title | `clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)` | 600 | 1.2 | -0.015em | |
| H4 small title | 1.125rem | 600 | 1.3 | -0.01em | |
| Eyebrow | 0.8125rem (13) | 600 | 1.2 | +0.08em | uppercase |
| Body | `clamp(1rem, 0.96rem + 0.2vw, 1.125rem)` | 400 | 1.65 | 0 | max 68ch, `text-wrap: pretty` |
| Small | 0.875rem | 400 | 1.55 | 0 | |
| Nav links | 0.8125rem | 500 | 1 | +0.04em | uppercase, as in reference |
| Buttons | 0.9375rem | 600 | 1 | 0 | sentence case |
| Big numbers (steps, stats) | `clamp(3rem, 2rem + 4vw, 5.5rem)` | 600 | 1 | -0.03em | `tabular-nums` |
| Ghost marquee text | `clamp(4rem, 2rem + 9vw, 10rem)` | 600 | 1 | -0.03em | outlined only, see 10.9 |

No orphans, no widows, no ragged breaks. Test every headline at 390, 768, 1024, 1440 and 1920.

### 6.3 Components (exact shapes from the reference)

* **Pill button.** Height 56 desktop, 48 mobile (never under 44). Left padding 28, right padding 8. A 40px circular chip sits at the right edge holding an arrow icon. Primary: `--teal-500` fill, navy text, white chip with navy arrow. Dark variant: `--navy-800` fill, white text, teal chip with navy arrow. Outline variant: 1px `--line` on `--surface`, navy text, teal chip. Hover: fill goes to `--teal-400`, arrow exits right and re-enters from the left (320ms, out curve). Active: scale 0.97. Focus: 2px `--navy-800` ring with 2px `--bg` gap.
* **Feature card (four across under the hero).** White, radius 20, padding 24, min height about 260. Top: 28px Lucide icon in navy, no colored circle. A 1px hairline across the card with a small teal dot at its right end (as in the reference). Then title H4, then a 3 to 4 line paragraph. Bottom right: a notched tab with a 44px circular arrow button. The notch has an inverted corner radius of 20 and takes the page background color. Build the notch with layered `radial-gradient` pseudo elements or a mask, not a fixed pixel `clip-path`, so it scales. Hover: arrow chip fills teal and rotates from -45 to 0 degrees.
* **Tab pills (Our Mission, Our Vision, Our History).** Height 40, padding 0 20, uppercase 12px 600 tracking +0.06em. Active: `--teal-500` fill with navy text. Inactive: white with a 1px hairline. Tab content cross fades 240ms.
* **Check list.** 20px circular teal check, navy tick, 12px gap, 16px text.
* **Image frames with notches.** Radius 28. The Who We Are image has the cut-out corner seen in the reference, built with the same inverted-corner technique. Measure its notch position and size from the reference.
* **Dark service cards (inside navy section).** 3 visible on desktop, a 2px white inset border around the image (as in the reference), image radius 20, title beneath, `--navy-900` card base. Arrow controls top right: two 48px circles, previous white with navy arrow, next teal with navy arrow.
* **Accordion (FAQ).** Navy block, radius 28. Rows separated by `--line-on-navy`. Plus icon rotates 45 degrees, panel height animates with a measured `grid-template-rows` transition 320ms. Only one open. First open by default.
* **Footer.** `--navy-800`, radius 28 top corners, inner container, 4 columns desktop, 2 tablet, 1 mobile.

### 6.4 Icons

One family (Lucide), one stroke weight (1.75). Suggested set: `shield-check` (HSE), `badge-check` (standards), `clipboard-check` (QA/QC), `calendar-check` (on time), `wrench`, `flame`, `building-2`, `zap`, `phone`, `mail`, `map-pin`, `arrow-up-right`, `arrow-right`, `plus`, `check`, `menu`, `x`. No emoji. No icon in a colored circle above every feature (the reference puts the icon bare, top left, keep that).

---

## 7. Reference breakdown, section by section

Replicate this order on the home page. Measure each against `1795029185834_image.png`. The thumbnail strip on the right edge shows the lower sections, so zoom and crop it.

| # | Section | Reference behaviour | Afroportico mapping |
|---|---|---|---|
| 1 | Header | White rounded bar. Nav links left, logo centre, phone with circular icon plus number and a pill CTA on the right | Home, About Us, Our Services, Projects, Compliance on the left (Contact Us moves into the CTA group on tablet), logo centre, `+234 803 088 5952` and pill "Get a Quote" right |
| 2 | Hero | Large rounded photo panel, eyebrow pill, 2 line H1, white pill CTA, person right, vertical white pager at the right edge | 3 slide hero, see 8.1. Subject sits in the right third, copy in the left two thirds |
| 3 | Four feature cards | White cards, bare icon, hairline with dot, text, notched arrow | See 8.2 |
| 4 | Who We Are | Notched image left, eyebrow, two tone H2, tabs, small image plus text plus check list, outline "Know More" button, call block | See 8.3 |
| 5 | Ghost marquee | Huge outlined text with arrow circles, fading at the edges | "Engineering, Procurement, Contracting" outlined, see 10.9 |
| 6 | Dark service slider | Rounded navy block, two tone H2, side text with link, arrows, bordered image cards | See 8.5 |
| 7 | Steps 01 to 04 | Faded big numbers with titles and short text | See 8.6 |
| 8 | Ghost heading plus list | Giant faded word behind a list of 4 rows with arrows | "Industries we serve", see 8.7 |
| 9 | Image plus dark FAQ | Photo left, navy accordion right | See 8.8 |
| 10 | Testimonials | Cards with avatar, quote, rating | **Pending**, hidden until real testimonials exist |
| 11 | Client logo strip | Greyscale logos, scrolling | **Pending**, hidden until supplied official logos |
| 12 | Project gallery | Large image grid with floating white caption cards | See 8.9 |
| 13 | Articles | Card row with image, meta and title | Becomes Compliance and HSE resources, see 8.10 |
| 14 | Footer | Newsletter band plus columns | Quote CTA band plus columns, see 8.11 |

### 7.1 Pending content switch

All pending sections render in development with a visible `PENDING` badge and are removed from production output while `NEXT_PUBLIC_SHOW_PENDING` is not `true`. Content lives in one typed file, `content/site.ts`, where every field has `status: "approved" | "draft" | "pending"`. Mission is `draft`. Vision, History, stats, social links, client logos and testimonials stay `pending` and hidden. No invented claims such as "foremost", "leading" or "established in...". The content audit script `npm run content:audit` fails the production build if a `pending` field is rendered, or if any field is `approved` without a client confirmation logged in `docs/provenance.md`.

---

## 8. Copy deck (tailored DRAFT COPY pending client approval)

Rules: no em dashes, no en dashes, no spaced hyphens, no banned words from playbook Section 10, no non breaking hyphens (U+2011). The four service lines are **confirmed** as offered by Afroportico. The sentences describing them remain DRAFT COPY (wording only) until the client approves them. Do not add services beyond these four.

### 8.1 Hero

* Dynamic slider: copy changes with each slide (slide 1 company welcome, slide 2 Mechanical and Oil and Gas EPC, slide 3 Power, Facility Management and HSE), using only the four confirmed services.
* Slide 1: Eyebrow `INNOVATIVE ENGINEERING, RELIABLE DELIVERY`, H1 `Welcome to Afroportico Integrated Services Limited` (highlight `Afroportico Integrated Services`), CTA `Our Services` to `/services`.
* Slide 2: Eyebrow `MECHANICAL AND OIL AND GAS`, H1 `EPC Delivery Across Mechanical, Oil and Gas` (highlight `Mechanical, Oil and Gas`), CTA `Explore Projects` to `/projects`.
* Slide 3: Eyebrow `POWER AND FACILITY MANAGEMENT`, H1 `Reliable Power and Facility Management` (highlight `Power and Facility Management`), CTA `HSE and Compliance` to `/compliance`.
* Pager: Numbered 01/02/03 with 2px teal progress bar (`scaleX` 0 to 1 over 6s), prev (white) and next (teal) 48px circle arrow chips, swipe on touch, keyboard arrow navigation. Slider follows Part 3 of the Fix Pack.

### 8.2 Four feature cards

1. `International standards`: `Our work follows recognised engineering standards, from design through to handover.` (to `/about-us`)
2. `Strong HSE culture`: `Safety is planned into every job before the first tool is picked up.` (to `/compliance`)
3. `QA/QC discipline`: `Every installation is inspected and documented before we call it done.` (to `/compliance`)
4. `On time, on budget`: `Clear scopes, tracked schedules and straight talk from kickoff to handover.` (to `/services`)

### 8.3 Who We Are

* Eyebrow: `Who we are`
* H2: `Engineering excellence with Nigerian roots.` (highlight `Nigerian roots.` in `--teal-ink`). If `[YEAR_FOUNDED]` is supplied, switch to `Engineering excellence in Nigeria since [YEAR_FOUNDED].`
* Tab Our Mission (draft): `To deliver engineering, procurement and contracting work that is safe, on schedule and built to last.`
* Tab Our Vision: `[VISION_STATEMENT]` (pending, tab hidden in production)
* Tab Our History: `[HISTORY_TEXT]` (pending, tab hidden in production)
* Body: `We bring disciplined project controls, proven HSE practices and a steady focus on quality. We deliver safely, on time and on budget.`
* Checklist: `International standards` / `Strong HSE culture` / `Clear communication from kickoff to handover`
* Button: `Know More` (to `/about-us`)
* Call block: label `Have a question?`, value `Call us on +234 803 088 5952`

### 8.4 Stats band (pending, hidden in production)

Three counters in the reference's step style: `Completion rate` `[STAT_1]%`, `Client satisfaction` `[STAT_2]%`, `Cost efficiency` `[STAT_3]%`. Supporting lines (draft): `On time delivery backed by rigorous planning and QA/QC.` / `Clear communication, a strong HSE culture and QA/QC discipline.` / `Savings from optimised engineering, preventive upkeep and OEM sourcing.` Counters count up only for approved numbers.

### 8.5 Services (dark slider)

* Eyebrow: `Our services`
* H2: `Engineering Nigeria's industries to international standards, with HSE first.` (highlight `with HSE first.` in teal)
* Side text: `Together, we define the scope, the standards and the people each project needs.`
* Link: `Start your next project` (to `/contact-us?subject=quote`)
* Cards:
  1. `Mechanical`: `Design, installation and maintenance of industrial refrigeration and air conditioning, with sales, leasing and planned maintenance for all scales.` Bullets: `Industrial refrigeration and air conditioning` / `Sales, leasing and maintenance of room, split and central ACs` / `Cold room supply, installation and maintenance`
  2. `Oil and Gas Services`: `EPC delivery for upstream and downstream operations: HVAC, electrical, equipment supply and site maintenance.`
  3. `Facility Management`: `Planned and reactive maintenance that keeps buildings, plants and sites running.` (DRAFT, no Ladox text found for this card)
  4. `Electrical and Telecommunications`: `Power distribution, cell site maintenance, battery installations, and generator supply, leasing and maintenance.`

### 8.6 Steps (01 to 04)

* H2: `How we work with you`
* `01 Engineering`: `We define scope, standards and design with you before anything is ordered.`
* `02 Procurement`: `We source equipment and parts through OEMs and approved suppliers.`
* `03 Contracting`: `We install and commission under HSE and QA/QC control.`
* `04 Maintenance`: `Planned upkeep keeps the system performing long after handover.`

### 8.7 Industries (ghost heading `Industries we serve`)

* `Oil and Gas`: `EPC delivery for upstream and downstream operations, including HVAC, electrical, equipment supply and site maintenance.`
* `Manufacturing and FMCG`: `Industrial refrigeration, power distribution and facility management for production sites that cannot afford downtime.`
* `Telecoms and Power`: `Cell site maintenance, battery installations, and generator supply, leasing and maintenance, so networks stay up.`
* `Public Sector and Infrastructure`: `Turnkey projects built to international standards, safe, efficient and compliant with regulations.`

Rows are link rows with an arrow. On hover a thumbnail for that industry fades in on the right (200ms), the row text shifts 12px, and the hairline fills teal.

### 8.8 FAQ block

* H2: `Questions before you start?`
* Q1 `What services do you offer?` A: `Mechanical, oil and gas, facility management, and electrical and telecommunications services. The services page has the detail.`
* Q2 `How do I request a quote?` A: `Use the quote form, call +234 803 088 5952, or email info@[DOMAIN].`
* Q3 `How do you manage safety?` A: `HSE is planned into each job from the start. Read our HSE policy statement on the compliance page.`

### 8.9 Projects gallery

* Eyebrow: `Projects`
* H2: `From blueprint to handover: our EPC work.`
* Filter chips: `All`, `Electrical`, `Facility Management`, `Mechanical`
* Captions are category labels only (for example `Electrical installation`, `Cold room`, `Cell site power`). Do **not** name clients, sites, sizes or dates. Floating white caption cards as in the reference.
* Until real project photos are supplied, use the illustrative imagery from Section 9 and mark each image `illustrative: true` in `content/site.ts`.

### 8.10 Resources (replaces the blog row)

* Eyebrow: `Compliance`
* H2: `Compliance and HSE resources`
* Cards in the reference's article card style: `HSE Policy Statement` (to `/hse-policy`), `Quality Statement` (to `/compliance#quality`), `FAQs` (to `/contact-us#faq`). Card body text `[POLICY_SUMMARY]` is pending. Hide a card if its page has no approved text.

### 8.11 Footer

* Band above the footer: H2 `Tell us what you need.` Body `Send the scope, the site and the timeline. We will come back to you.` Button `Get a Quote`.
* Brand blurb: `Afroportico Integrated Services Limited delivers quality mechanical, electrical and facility services with a focus on safety, reliability and client satisfaction.`
* Columns: Company (About Us, Services, Projects, Compliance, Contact), Resources (HSE Policy, Quality Statement, FAQs), Get in touch.
* Get in touch: `+234 803 088 5952`, `info@[DOMAIN]`, `37 Water Resources Road, Effurun, Warri, Delta State, Nigeria.`
* Socials: show only the networks whose URLs are supplied.
* Legal row: `© 2026 Afroportico Integrated Services Limited. All rights reserved.` then `Privacy Policy` and `Terms of Service`.

---

## 9. Imagery: Nigerian models with the logo on their clothing

### 9.1 What is needed

Hero (3 slides), Who We Are (1 large, 1 small), four service cards, four industry thumbnails, FAQ side image, gallery (about 9), page header images for inner pages, OG image. All photographed in a Niger Delta and Nigerian context.

### 9.2 Casting and realism

* Nigerian professionals: men and women, mixed ages (late 20s to 50s), natural variation in skin tone, hair and build. Render dark skin tones accurately with correct highlights, no grey wash, no over smoothing. Natural hairstyles and head ties are welcome where they fit the work.
* Real work, real PPE: navy coveralls or polos with teal reflective trim, hi-vis vests, hard hats, safety boots, gloves, safety glasses, ear defenders where relevant. Competent, focused, mid task. No posed smiles at the camera except one confident portrait style frame at most.
* Settings: HVAC condensing units on a roof, a cold room interior, an electrical switchboard and cable trays, a telecom cell site with generator and battery cabinet, a plant floor, a facility plant room, a site office with drawings. Tropical light, humid haze, red laterite soil where outdoors. No snow, no European architecture, no generic Western office.
* Hands, fingers, teeth, tools and eyes must be anatomically correct. Reject and regenerate any frame with an odd hand, melted text, a hard hat that merges with the head, or PPE that is not worn the way it is on a real site.

### 9.3 Grade and framing

* One shared grade across all images: cool, slightly desaturated, navy shadows, warm skin preserved, subtle teal in reflective trim. This is how the warm reference photography is harmonised with a navy and teal brand. Same lighting logic, same crop logic, same level of realism.
* Hero: 16 by 9.5 desktop crop, subject in the right third, clear negative space across the left 55 percent for the H1. Provide separate mobile art directed crops at 4 by 5 with the subject in the upper two thirds. Use `<picture>` with focal points, not CSS cropping alone.
* Export AVIF and WebP, widths 480, 768, 1200, 1920, `sizes` set per layout, hero preloaded with `fetchpriority="high"`, blur-up from a 24px placeholder.

### 9.4 Logo on clothing: the correct pipeline

The logo must be **exact**, and image models cannot draw a logo accurately, so do not ask the model to invent it.

1. Generate each image with the model (Antigravity's image generation tool) using the logo file as a reference input for color and mood, and tell it to leave a **plain, flat, unmarked chest patch**, and where visible a plain hard hat front and a plain back panel.
2. Composite the real `logo-mark.png` onto each garment with `sharp` or a canvas script: perspective and displacement matched to the fabric folds, `multiply` or `soft-light` blend at about 90 percent opacity, a very subtle thread texture, and the same shadow direction as the scene. Left chest about 8 to 9 cm wide in real world scale, back of vest larger, hard hat front small.
3. The logo on navy fabric disappears. Place it on a white or off white embroidered badge or a light patch so the unaltered logo keeps its colors. On a light hi-vis vest, apply it directly.
4. Zoom to 200 percent on every image and reject any logo that is warped beyond the fabric, recolored, blurred or doubled.
5. Save the generation prompt, model name, date and seed to `provenance.md` for each file.

Prompt template for step 1 (adapt per scene):

```
Photorealistic documentary photograph, shot on a full frame camera, 50mm, natural
light, [SCENE in Warri, Delta State, Nigeria], a Nigerian [man/woman] in their
[age range] working as a [technician/engineer], wearing a [navy coverall with teal
reflective trim / hi-vis vest], hard hat, safety boots and gloves, with a plain flat
unmarked chest patch. Correct hands and fingers, natural skin texture, accurate dark
skin tones. Cool desaturated grade with navy shadows. No text, no logos, no
watermarks. [Framing: subject in right third, negative space left].
```

### 9.5 Honesty rules for generated people

* These images are **illustrative**. Never present a generated person as a named employee, "founder", "expert" or client. No names or job titles attached to faces. No testimonials with faces.
* Never label an illustrative image as a specific completed project.
* Alt text describes the scene (`Technician inspecting a rooftop air conditioning unit`), never an invented identity.
* Add `/docs/replace-with-real-photos.md` listing every illustrative image with the slot it fills. Recommend replacing them with the client's real staff and site photos as soon as available. A real photo swap must be a one line change in `content/site.ts`.

---

## 10. Motion system

Two easing tokens only, created with `CustomEase`:

```js
CustomEase.create("out", "0.16, 1, 0.3, 1");    // entrances, reveals
CustomEase.create("inout", "0.65, 0, 0.35, 1"); // transitions, wipes
```

Animate only `transform`, `opacity` and `clip-path`. Remove `will-change` on complete. All code behind `gsap.matchMedia()` with a reduced motion branch. One scroll clock: Lenis `lerp: 0.1`, `lenis.on("scroll", ScrollTrigger.update)`, GSAP ticker drives `lenis.raf`, `lagSmoothing(0)`. Native keyboard scroll, anchors, back button, find and text selection must keep working. Anchor links use `lenis.scrollTo` with a header offset.

### 10.1 Opening intro (first visit per session only)

Shown once per session via `sessionStorage`. The overlay is in the server HTML with inline critical CSS so there is no flash of the page before it. The overlay surface is **off white (`--bg`)** because the logo's navy half cannot sit on navy.

| t (ms) | Event |
|---|---|
| 0 | Off white surface covers the viewport. Page content is present underneath, `inert`. |
| 150 to 850 | Logo mark reveals with `clip-path: inset(0 100% 0 0)` to `inset(0)`, `out`, 700ms. The logo itself is never altered. |
| 550 to 1250 | Wordmark `Afroportico Integrated Services Limited` rises from a line mask, 2 lines, stagger 80ms, `out`. |
| Gate | Real loading only: `document.fonts.ready` AND hero image decoded AND minimum 1300ms shown. Hard cap 3000ms, after which the intro proceeds regardless. No percentage counter and no fake bar. |
| gate + 0 | Logo and wordmark move up 24px and fade, 400ms, `inout`. |
| gate + 100 | The surface lifts away upward (`yPercent: -100`, 900ms, `inout`). Its bottom edge carries the same 28px radius as the hero panel. |
| gate + 500 | Hero panel scales 1.08 to 1 and its `clip-path` insets from full bleed to the contained rounded panel, 1100ms, `out`. This **overlaps** the lift. |
| gate + 650 | Header drops from -100% to 0, 700ms, `out`. |
| gate + 800 | H1 lines rise from the mask (`yPercent: 110` to 0), 1000ms, stagger 90ms, `out`. Starts while the loader is still exiting. |
| gate + 1050 | Eyebrow pill fades up 12px (600ms). Body and CTA rise 32px, stagger 80ms. Pager fades in. |

Total on a warm cache stays under 3.0s. **Skip**: click, tap, Escape or Enter fast forwards with `timeScale(3)`. Repeat visits in the same session skip the overlay and run only a 500ms hero panel reveal plus the H1 line reveal. Reduced motion: no overlay, 300ms opacity fade of the hero. Keep LCP under 2.5s: the hero image is preloaded and the intro must never delay it.

### 10.2 Hero slider

3 slides, cross fade 900ms `inout` with the incoming image scaling 1.06 to 1 (a one time settle, not an idle loop). Copy stays fixed across slides. Pager dots are real buttons with `aria-label="Show slide n of 3"`. Autoplay pauses on hover, focus and when the tab is hidden. Reduced motion: autoplay off.

### 10.3 Text reveal (headlines)

Masked line reveal with SplitText, `mask: "lines"`, `autoSplit: true` so lines re-split on resize and after fonts load:

```js
SplitText.create(el, {
  type: "lines", mask: "lines", autoSplit: true, aria: "auto",
  onSplit(self) {
    return gsap.from(self.lines, {
      yPercent: 110, duration: 1, ease: "out", stagger: 0.08,
      scrollTrigger: { trigger: el, start: "top 85%", once: true }
    });
  }
});
```

Real text stays in the DOM. Verify the API against the installed GSAP version. Hero headline uses the same split but fires from the intro timeline, not from ScrollTrigger.

### 10.4 Reveal by role (do not use one reveal for everything)

| Element | Reveal | Duration |
|---|---|---|
| H1, H2 | Masked line rise, stagger 80ms | 1000ms |
| Eyebrow | Fade plus 12px rise | 600ms |
| Body paragraphs | Fade plus 32px rise as one block | 800ms |
| Images | `clip-path: inset(100% 0 0 0)` to `inset(0)`, inner image scale 1.12 to 1 | 1100ms |
| Feature and service cards | 40px rise, stagger 90ms as one group, total spread under 600ms | 800ms |
| Hairlines and rules | `scaleX 0 to 1`, origin left | 900ms |
| Step numbers | Fade, 24px rise, stagger | 800ms |
| Accordion and tabs | Height and opacity | 320ms |
| Counters (approved numbers only) | Count up from 0, `tabular-nums` | 1600ms, `out` |

All trigger at `top 85%`, run once, and are never replayed on scroll up.

### 10.5 Parallax

At most 2 layers per section, 5 to 25 percent, only on images, never on text. Hero background `yPercent: 10` with `scrub: 0.6`. Who We Are large image `yPercent: -6` against its frame, which clips with `overflow: hidden`. Disabled under 768px and under reduced motion.

### 10.6 Header behaviour

Sits in the layout flow like the reference bar. After 80px of scroll it becomes sticky, hides on scroll down and returns on scroll up (320ms `out`), gaining the single soft shadow token. No decorative blur.

### 10.7 Hover and press

120 to 200ms, one or two properties each. Card arrow chip fills teal and rotates. Service card image scales 1.04 inside its frame. Nav link underline draws from left (`scaleX`). Pill buttons as in 6.3. Press states on everything clickable. No cursor followers, no magnetic buttons. Hover only where `(hover: hover)`.

### 10.8 Page transitions

Navy panel wipes up over the page (450ms, `inout`) with the logo on its white tile centred and scaling 0.92 to 1. The route changes while covered. The panel then wipes off upward (450ms, `inout`), and the destination page's H1 lines reveal as it clears. Total about 900ms, never a blank flash. Implement with a `TransitionLink` wrapper that intercepts internal navigations, waits for the cover, calls `router.push`, then reveals once the new page has mounted. Back and forward buttons use a faster 300ms cross fade. Reduced motion: instant swap with a 150ms fade.

### 10.9 Ghost marquee text

Outlined text (`-webkit-text-stroke: 1px rgba(4,55,77,.18)`, transparent fill) with two arrow circles as in the reference, `aria-hidden="true"`, edge fade mask. Moves on a slow scroll linked `xPercent` (scrub 0.8), about 12 percent of travel. It is decorative, not readable content, so it is the one allowed text parallax.

### 10.10 Service slider

Native scroll snap with a GSAP driven drag (Draggable or pointer events), prev and next buttons, keyboard arrows, `aria-roledescription="carousel"`, visible focus. Cards 3 up desktop, 2 up tablet, 1.15 up mobile so the next card peeks. Disabled arrow states at the ends.

### 10.11 Mobile menu

Full screen navy panel, links reveal with the masked line technique, 60ms stagger, close on route change and Escape, focus trap, body scroll locked through Lenis `stop()`. Button 48 by 48.

### 10.12 Banned in motion

Idle pulse, float, bounce or glow. Particle fields. Scroll hijack. Fake loaders. Animations over 900ms for UI feedback (the hero and intro scenes are the only exceptions listed above). The same fade up on everything.

---

## 11. Responsive specification

Design and test at **360, 390, 768, 1024, 1280, 1440, 1920 and 2560**. Mobile is designed, not shrunk.

| Area | 360 to 639 | 640 to 1023 | 1024 to 1439 | 1440 and up |
|---|---|---|---|---|
| Header | Logo left, menu button right, phone moves into the menu | Logo centre, menu button, CTA pill | Full nav as reference | Full nav as reference |
| Hero panel | Height `78svh`, min 560, radius 20, H1 3 lines, art directed 4 by 5 crop, copy anchored bottom over a navy to transparent scrim (only if needed for contrast) | Height `80svh`, radius 24 | Height `calc(100svh - 104px)`, min 640, max 900, radius 28 | Same, container max 1320, extra width becomes margin |
| Feature cards | 1 column | 2 columns | 4 columns | 4 columns |
| Who We Are | Stacked: image, heading, tabs, body, list | Image top, copy below, 2 column list | Two column as reference | Two column as reference |
| Dark services | Slider 1.15 up, arrows below the heading | 2 up | 3 up | 3 up |
| Steps | 1 column, numbers 3rem | 2 by 2 | 4 across | 4 across |
| Industries list | Full width rows, thumbnails hidden | Full width rows | Rows with hover thumbnail | Rows with hover thumbnail |
| FAQ block | Image above, accordion below | Same | Side by side | Side by side |
| Gallery | 1 column, 4 by 3 crops | 2 columns | Masonry style 3 columns as reference | Same |
| Footer | 1 column | 2 columns | 4 columns | 4 columns |

Rules: no horizontal overflow at any width, `min-width: 0` on grid children, `svh` and `dvh` units for hero height, safe area insets on fixed UI, touch targets 44 by 44 minimum, 16px minimum input font size (stops iOS zoom), `max-width: 68ch` for paragraphs, and images always carry intrinsic `width` and `height` to prevent layout shift. Ghost text scales with `clamp` and never causes a scrollbar.

---

## 12. Pages

| Route | Contents |
|---|---|
| `/` | Sections in Section 7 |
| `/about-us` | Page header (reference style rounded image banner with H1 and breadcrumb), Who We Are expanded, mission, vision, history (pending tabs hidden), approach, stats band (pending), CTA band |
| `/services` | Page header, intro, one full block per service (alternating image side, bullets, "Request this service" link to the quote form with `?subject=` prefilled), industries list, CTA band |
| `/projects` | Page header, filterable gallery (All, Electrical, Facility Management, Mechanical) with a lightbox (focus trap, Escape, arrow keys), CTA band |
| `/compliance` | Page header, HSE overview, Quality statement section with id `quality`, certifications (pending), link to `/hse-policy` |
| `/hse-policy` | HSE Policy Statement (text pending, structured long form layout, readable measure) |
| `/contact-us` | Form plus details plus map link, see Section 13. `?subject=quote` preselects "Request a quote" |
| `/privacy-policy`, `/terms` | Drafted plain legal text, flagged for legal review |
| `not-found` | Designed 404 with the logo, a short line and a Home button |

Inner page headers reuse the reference's rounded banner. Breadcrumbs are real links. Every page has its own title, description, canonical URL and Open Graph data.

---

## 13. Contact, email and SEO

* **Form fields:** Name, Email, Phone, Subject (select: Request a quote, Mechanical, Oil and Gas, Facility Management, Electrical and Telecoms, Other), Message, a hidden honeypot. Labels above fields, 56px height inputs, radius 16, visible focus, inline errors that name the problem, a success state, a failure state with the phone number as a fallback, and a disabled and loading state on submit. Delivered to `CONTACT_TO_EMAIL` (see 2.2b for behaviour before the domain exists), with an auto reply to the sender only if the client approves the wording.
* **Direct links:** `tel:+2348030885952`, `mailto:info@[DOMAIN]`. Do not publish a WhatsApp link until `[WHATSAPP]` is supplied.
* **Address block:** `37 Water Resources Road, Effurun, Warri, Delta State, Nigeria.` plus an "Open in Maps" link built from the address string. No iframe, no API key, no third party scripts.
* **SEO:** unique titles such as `Afroportico Integrated Services Limited | Engineering, Procurement and Contracting in Warri`, meta descriptions written from approved copy, `sitemap.xml`, `robots.txt`, `LocalBusiness` JSON-LD containing **only** the supplied name, address, phone and email (no rating, no opening hours, no founding date unless supplied), canonical URLs, social preview image, favicon set.
* **Privacy:** no analytics or cookies until the client approves. If added later, use a consent banner.

---

## 14. Accessibility and performance

* WCAG 2.2 AA. Semantic landmarks, one H1 per page, logical heading order, skip link, visible focus on everything, `aria-current` on the active nav item, alt text on every image, decorative SVGs `aria-hidden`.
* Honour `prefers-reduced-motion` everywhere. Content must be fully readable if all JavaScript animation fails (reveal states are applied by JS, not by default CSS that hides content).
* LCP under 2.5s, CLS under 0.1, INP under 200ms on a throttled mid range mobile profile. 60fps scroll. Lazy load below the fold, code split GSAP plugins that are not needed on a page, cap DPR for any canvas work (there is none planned).
* Fonts preloaded and subset, no layout shift from font swap.
* No console errors, no broken links, no debug UI, no leftover `PENDING` badges in production.

---

## 15. Process, deliverables and gates

### 15.1 Order of work

1. **Analyst.** Ingest references and brand, write `reference-spec.md` (structure, grid, measured spacing, sampled colors mapped to tokens, type, surfaces, motion), `tokens.json`, `tokens.css`, `gap-list.md` (mobile, hover, error, empty and inner page states the reference does not show), `open-questions.md`. **Stop for approval.**
2. **Designer.** Faithful pass, home page first, then inner pages. No additions.
3. **Auditor.** Playwright screenshots at 390, 768, 1024, 1440, 1920 against reference crops, `fidelity-report.md`, fix, repeat. Motion recordings compared with Section 10 timings, within 50ms per scene.
4. **Creative pass.** At most one on brand signature moment per page, logged in `creative-additions.md`, removable in one step. Suggestion: the arch of the logo mark echoed as the inverted corner radius of the notched cards. Only if it adds to the reference and does not break it.
5. **Copywriter.** Final copy pass, dash grep, banned word grep, Ladox leakage grep (2.3).
6. **Auditor.** `anti-slop-auditor` and `visual-qa`, scoring with playbook Section 14.

### 15.2 Must pass (any failure blocks release)

* Reference fidelity within targets, every gap listed.
* Only tokens in use, no raw hex, no off scale spacing, stylelint clean.
* Logo used exactly as supplied, on white tiles on navy, no recolor, no stretch.
* Logo on clothing is the real composited file in every image that shows a logo.
* Zero Ladox leakage. Zero invented facts. Every placeholder logged. Pending sections absent from production.
* No em or en dashes, no banned words in visible copy or alt text.
* No glow, orb, halo, particle, decorative blur, gradient overuse or purple anywhere.
* Intro under 3.0s, skippable, once per session, tied to real loading. Reduced motion verified.
* Responsive at all eight widths with no overflow or clipped text. Touch targets 44px or more.
* axe clean, Lighthouse targets met, forms tested end to end including the email actually arriving.

### 15.3 Files the agent must leave behind

`/docs/reference-spec.md`, `gap-list.md`, `fidelity-report.md`, `creative-additions.md`, `provenance.md`, `open-questions.md`, `replace-with-real-photos.md`, `/design-tokens/tokens.json` and `tokens.css`, `/artifacts/<version>/` screenshots and recordings, `README.md` with run, build, deploy and content editing instructions (including how to turn pending sections on and off).

### 15.4 Final report

End with: score by category, remaining issues, every assumption, every `CANNOT VERIFY`, every placeholder still open, and the exact list of things the client must send.

---

## 16. Open questions for the client

1. The website domain, to be created later. Handled by domain pending mode (2.2b), so nothing blocks the build.
2. Read and approve the wording of the four service descriptions in 8.5 (the services themselves are confirmed).
3. Year founded, CAC RC number, certifications, vision, history and HSE policy text.
4. Real stats, or confirmation that the stats band stays hidden.
5. Real client names and their official logos, or confirmation the strip stays hidden.
6. Real testimonials with permission, or confirmation the section stays hidden.
7. Social URLs and a WhatsApp number.
8. A reversed (white) version of the logo, if one exists.
9. Real project and team photos to replace the illustrative images.
10. Approval of any response time promise for the quote form.

---

## 17. Playbook patches (add to `/docs/playbook.md`)

1. **Client override clause.** Add to Section 1: "Explicit written client instructions override the ban list. Log each override in `/docs/overrides.md`." Used here for AI generated people (the playbook bans AI faces by default, the client asked for model imagery).
2. **Generated people.** Add to Section 8 or a new imagery section: generated people are illustrative only, never named, never testimonials, never shown as real staff, and logos are composited from the supplied file, never drawn by the model (see 9.4 and 9.5).
3. **Logo on dark.** Add to Section 4: when a logo has a dark half, use it on a white tile over dark surfaces, and ask for a reversed file.
4. **Contrast of brand accents.** Add to Section 4: compute contrast for the brand accent as text, and define a separate `--accent-ink` for text on light surfaces.
5. **Pending content switch.** Add to the provenance skill: a typed content file with `status` per field and a build check that blocks unapproved content in production.
6. **Competitor copy.** Add to Section 10: when a client asks to "copy from" another company's site, take structure and tone only, rewrite everything, and grep for the source company's name, numbers, clients and contact details.
7. **Reference limits.** Add to Section 5: a single flattened screenshot gives estimated measurements only. Mark them as estimates and measure by pixel overlay.
8. **Hidden hyphens.** Add to the dash check: also search for U+2011 non breaking hyphen, U+2212 minus and U+2012 figure dash.
9. **Library check.** Section 7.6 SplitText sample: GSAP's current releases include SplitText, but confirm against the installed version.
