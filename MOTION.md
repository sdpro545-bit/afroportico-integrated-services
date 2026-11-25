# Afroportico Integrated Services Limited — Motion & Animation Manifesto

This document specifies the motion engineering, interaction architecture, easing curves, selectors, durations, and accessibility standards for the Afroportico corporate web platform.

---

## 1. Global Motion Rules & Tokens

- **Entrance Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (`expo.out`)
- **In-Out Easing:** `cubic-bezier(0.65, 0, 0.35, 1)` (`power3.inOut`)
- **Entrance Durations:** `0.8s – 1.2s`
- **Micro-Interaction Durations:** `0.25s – 0.35s`
- **Properties Animated:** `transform`, `opacity`, `clip-path`, `letter-spacing`, `filter: blur()`. Never animate `width`, `height`, or `top`.
- **Hardware Acceleration:** `will-change` is applied only during active transitions and cleanly reset to `auto` upon completion.
- **Progressive Enhancement:** Content is 100% visible by default in HTML/CSS. If JavaScript fails or is disabled, no content remains hidden.
- **Route Lifecycle:** On Next.js route change, ScrollTrigger instances are destroyed, SplitText DOM structures are reverted, and the page scrolls to top.

---

## 2. Text Reveal Architecture

| Element / Selector | Animation Mechanism | Easing | Duration / Stagger | Trigger Point |
| :--- | :--- | :--- | :--- | :--- |
| **Headings (`.reveal-title`)** | Custom line-splitter creates `.line-mask` (`overflow: hidden`) and inner spans (`yPercent: 110 -> 0`) | `cubic-bezier(0.16, 1, 0.3, 1)` | `1.0s`, stagger `0.07s` | `top 88%`, `once: true` |
| **Eyebrows (`.reveal-fade`)** | `autoAlpha: 0 -> 1`, letter-spacing tightening `0.16em -> 0.08em` | `cubic-bezier(0.16, 1, 0.3, 1)` | `0.9s` | `top 90%`, `once: true` |
| **Body Paragraphs (`.reveal-body`)** | `autoAlpha: 0 -> 1`, `y: 16px -> 0`, `filter: blur(6px) -> blur(0px)` | `cubic-bezier(0.16, 1, 0.3, 1)` | `0.95s` | `top 90%`, `once: true` |
| **Hero H1 on Slide Change** | Current H1 lines exit `yPercent: -110` (0.35s, `power2.in`), new lines enter `yPercent: 110 -> 0` (0.85s, `expo.out`) | Custom timeline | `0.35s` exit / `0.85s` enter | Slide change event |

---

## 3. Scroll & Pinning Architecture

| Component | Selector / Ref | Motion Specification | Easing / Scrub |
| :--- | :--- | :--- | :--- |
| **Lenis Smooth Scroll** | Window singleton `__lenis` | Damping: `1.2s`, `smoothWheel: true`. Auto-paused when mobile menu is open. | Fluid exponential damping |
| **Anchor Jumps** | `a[href^="#"]` | Smoothly scrolled via `lenis.scrollTo(target, { offset: -88, duration: 1.2 })`. | `1.2s` |
| **Hero Panel** | Container & Images | Entrance fires on ScrollTrigger (`top 85%`) with `inset(6% 3% 6% 3% round 28px)` to `inset(0)` + `scale(1.04 -> 1)`. Scroll scrub scales `1.0 -> 0.95`, radius `28px -> 40px`. Inner image parallaxes `yPercent: 0 -> 6`. | `EASE.out` / Scrub: `true` |
| **Section Images** | `.reveal-image-clip` | Clip-path `inset(12% 12% 12% 12% round 28px) -> inset(0 round 28px)`. Inner image scale `1.08 -> 1.0`. | Scrub: `0.6` |
| **Card Sequences** | `.reveal-stagger > *` | Cards rise `y: 40px -> 0`, `autoAlpha: 0 -> 1`, soft elevation shadow builds in. | `1.0s`, stagger `0.1s` |
| **Process Steps (01–04)** | `.process-step-item` | Connecting progress line scrubs `scaleX: 0 -> 1`. Numbers fade & rise `y: 20px -> 0`. | Scrub: `0.8` / Duration `0.8s` |
| **Stats Counters** | `StatCounter` | Counts from `0` to target value (approved numbers only) using `power3.out` over `1.6s`. Hidden while pending. | `1.6s` |
| **Ghost Marquee** | `.animate-marquee` | Horizontal marquee skew responds dynamically to scroll velocity (`-2deg` to `+2deg`). | Velocity-linked `quickTo` |
| **Dark Services Pin** | `#services` (Desktop) | Section pins for 1.5x width while 4 service cards scrub horizontally (`xPercent: -75%`). Mobile uses responsive tab/swipe. | Scrub: `1.0`, Snap: `0.33` |
| **Header Behaviour** | `header` | Fixed at top (`top-0`). Inert and hidden during Home `<IntroSequence />`, slides in at handoff (`Hero` `top 85%`), and stays permanently fixed while scrolling. Pill shrinks slightly after 30px scroll. | `0.5s` |
| **Route Transitions** | `ScrollAnimationProvider` | Smooth `350ms` fade/slide (`y: 14px -> 0`, `opacity: 0 -> 1`) on route change + reset to top. Native 60fps touch scroll on mobile; Lenis smooth wheel on desktop. | `0.35s` |

---

## 4. Mobile Navigation & Hamburger

- **2-Line Morphing Button:**
  - Closed: 2 horizontal bars (`w-5 h-[2px] bg-[#04374D]`, spaced 7px apart).
  - Open: Morphs into an X via 400ms `cubic-bezier(0.16, 1, 0.3, 1)` (top rotates `+45deg`, bottom `-45deg`).
  - Press: `active:scale(0.92)`.
- **Fullscreen Radial Expansion:**
  - Expanding circular clip-path: `circle(0px at calc(100% - 44px) 40px)` to `circle(150% at calc(100% - 44px) 40px)` in `0.9s` (reverse in `0.6s`).
- **Cascading Links:**
  - Contained in `overflow: hidden` line masks, sliding up from `yPercent: 110 -> 0` with `0.07s` stagger starting at 40% overlay expansion (`0.36s`).
  - Index numbers (`01–05`) fade in alongside.
  - Active route displays a teal underline that draws left-to-right (`scaleX: 0 -> 1`).
  - Hovering dims non-hovered sibling links to `opacity: 0.4` with `300ms` transition.
- **Accessibility & Focus Trap:**
  - Keyboard focus is trapped within the mobile drawer.
  - Pressing `Escape` closes the drawer.
  - Focus returns to the hamburger button on close.
  - Background scrolling and Lenis are locked when open.

---

## 5. Micro-Interactions

- **Pill Buttons (`.pill-btn-*`):**
  - Hover: Arrow chip rotates `45deg`, text label shifts `4px` to the right.
  - Active: Smooth scale down to `0.97`.
- **Cards (`.card-hover-effect`, `.notched-card`):**
  - Hover: `4px` vertical lift, subtle emerald/teal border glow (`rgba(43, 193, 148, 0.45)`), and `1.04` image zoom inside clipped frame.
- **Industries Row Thumbnail Tracking:**
  - Desktop: Floating preview thumbnail tracks cursor coordinates with lerp `0.12` and smooth inset clip-path reveal.
- **FAQ Accordion:**
  - Smooth `grid-template-rows: 0fr -> 1fr` height expansion, plus icon rotates `45deg` into an X, answer content fades in.
- **Scroll-Scrubbed Brand Intro (`<IntroSequence />`, Home `/` only):**
  - Outer wrapper `450vh` desktop / `380vh` mobile with `position: sticky; top: 0; height: 100svh` stage.
  - ScrollTrigger (`start: "top top"`, `end: "bottom bottom"`, `scrub: true`) + `gsap.ticker` smoothly scrubs `/intro/afroportico-intro-1080.mp4` (`>= 1440px`) or `/intro/afroportico-intro-720.mp4` (`< 1440px`) up to `0.82` progress, holding the final frame afterward.
  - Masked captions `"Engineer."` (`0.45`), `"Procure."` (`0.55`), `"Deliver."` (`0.65`, teal period) scrub in and lift out (`0.70–0.82`).
  - At `0.82–0.94`, the `#EEF3F5` plate expands via `circle(0% -> 150%)` from `--emblem-x: 50%; --emblem-y: 62%`, revealing `/logo-mark.png` with a left-to-right clip-path wipe and `"Afroportico Integrated Services Limited"`.
  - Gated once per session via `sessionStorage.getItem("afroportico_intro_seen")` and skipped on hash URLs; `"Replay intro"` in the footer resets and replays it.
  - Reduced motion, `saveData`, or `2g`/`3g` connections render a static `70svh` logo plate without loading the video.
  - Other routes render directly without any preloader.

---

## 6. Accessibility & Reduced Motion Compliance

Whenever a user requests reduced motion (`prefers-reduced-motion: reduce`):
1. **Parallax and Pinning:** Completely disabled; sections render in standard natural document flow.
2. **Line Masking / SplitText:** Bypassed; headings and paragraphs render normally.
3. **Animations:** Fall back to an instantaneous or gentle `200ms` opacity cross-fade.
4. **Brand Intro:** Renders a static `70svh` plate with the Afroportico logo and company name (no video load or scroll scrub).
