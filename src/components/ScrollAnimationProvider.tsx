"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { splitLines } from "@/utils/textSplitter";
import { EASE } from "@/utils/motion";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function pauseLenis() {
  if (typeof window !== "undefined" && window.__lenis) {
    window.__lenis.stop();
  }
}

export function resumeLenis() {
  if (typeof window !== "undefined" && window.__lenis) {
    window.__lenis.start();
  }
}

export default function ScrollAnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Reset previous triggers on route change
    ScrollTrigger.getAll().forEach((t) => t.kill());

    // Initialize Lenis smooth scroll on desktop pointer devices; keep native 60fps touch scroll on mobile
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const lenis =
      isFinePointer && !prefersReducedMotion
        ? new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 0.95,
          })
        : null;

    window.__lenis = lenis ?? undefined;

    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
    }

    const tickerCallback = (time: number) => {
      lenis?.raf(time * 1000);
    };

    if (lenis) {
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    }

    // Anchor jump interceptor with fixed header offset (-88px)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]');
      if (target) {
        const href = target.getAttribute("href");
        if (href && href.length > 1) {
          const el = document.querySelector(href);
          if (el) {
            e.preventDefault();
            if (lenis) {
              lenis.scrollTo(el as HTMLElement, { offset: -88, duration: 1.2 });
            } else {
              const top = el.getBoundingClientRect().top + window.scrollY - 88;
              window.scrollTo({ top, behavior: "smooth" });
            }
          }
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    // Page Transition: 350ms fade/slide on route change + scroll to top
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true });

    if (pageContainerRef.current) {
      if (prefersReducedMotion) {
        gsap.fromTo(
          pageContainerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.2, ease: "power1.out" }
        );
      } else {
        gsap.fromTo(
          pageContainerRef.current,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: EASE.out,
            clearProps: "transform,opacity",
          }
        );
      }
    }

    // Split text reverters array
    const splitReverters: Array<() => void> = [];

    // Create GSAP context synchronously (not inside setTimeout)
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Fallback: simple 200ms fade for all triggers
        const allAnimEls = document.querySelectorAll(
          ".reveal-title, .reveal-fade, .reveal-stagger, .reveal-image-clip, .reveal-body"
        );
        allAnimEls.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.2,
              ease: "power1.out",
              scrollTrigger: {
                trigger: el,
                start: "top 92%",
                once: true,
              },
            }
          );
        });
        return;
      }

      // 1. TEXT REVEAL: Masked line reveals (.reveal-title)
      const titles = document.querySelectorAll<HTMLElement>(".reveal-title");
      titles.forEach((el) => {
        const { lines, revert } = splitLines(el);
        splitReverters.push(revert);

        if (lines.length > 0) {
          gsap.fromTo(
            lines,
            { yPercent: 110, opacity: 1 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.0,
              stagger: 0.07,
              ease: EASE.out,
              scrollTrigger: {
                trigger: el,
                start: "top 94%",
                once: true,
              },
              onComplete: () => {
                lines.forEach((l) => (l.style.willChange = "auto"));
              },
            }
          );
        }
      });

      // 2. Eyebrows: Fade with letter-spacing tightening from 0.16em to 0.08em
      const eyebrows = document.querySelectorAll<HTMLElement>(".reveal-fade");
      eyebrows.forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, letterSpacing: "0.16em" },
          {
            autoAlpha: 1,
            letterSpacing: "0.08em",
            duration: 0.9,
            ease: EASE.out,
            scrollTrigger: {
              trigger: el,
              start: "top 94%",
              once: true,
            },
          }
        );
      });

      // 3. Body paragraphs: Fade + 16px rise + subtle blur 6px to 0
      const bodyParagraphs = document.querySelectorAll<HTMLElement>(".reveal-body");
      bodyParagraphs.forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 16, filter: "blur(6px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.95,
            ease: EASE.out,
            scrollTrigger: {
              trigger: el,
              start: "top 94%",
              once: true,
            },
            onComplete: () => {
              el.style.filter = "none";
            },
          }
        );
      });

      // 4. Staggered card sequences (Features, Projects, Industries)
      const staggers = document.querySelectorAll<HTMLElement>(".reveal-stagger");
      staggers.forEach((container) => {
        const items = Array.from(container.children) as HTMLElement[];
        if (items.length > 0) {
          gsap.fromTo(
            items,
            {
              autoAlpha: 0,
              y: 40,
              boxShadow: "0 1px 2px rgba(4,55,77,0.02)",
            },
            {
              autoAlpha: 1,
              y: 0,
              boxShadow: "0 12px 32px rgba(4,55,77,0.08)",
              duration: 1.0,
              stagger: 0.1,
              ease: EASE.out,
              scrollTrigger: {
                trigger: container,
                start: "top 92%",
                once: true,
              },
              onComplete: () => {
                items.forEach((item) => (item.style.willChange = "auto"));
              },
            }
          );
        }
      });

      // 5. Section Images: Clip-path reveal inset(12% 12% 12% 12% round 28px) -> inset(0 round 28px) with 1.08 to 1 scale
      const clipImages = document.querySelectorAll<HTMLElement>(".reveal-image-clip");
      clipImages.forEach((frame) => {
        const innerImg = frame.querySelector("img") || frame;

        gsap.fromTo(
          frame,
          { clipPath: "inset(12% 12% 12% 12% round 28px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 28px)",
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top 90%",
              end: "top 45%",
              scrub: 0.6,
            },
          }
        );

        if (innerImg && innerImg !== frame) {
          gsap.fromTo(
            innerImg,
            { scale: 1.08 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                start: "top 90%",
                end: "top 45%",
                scrub: 0.6,
              },
            }
          );
        }
      });

      // 6. Hairline horizontal reveals
      const lines = document.querySelectorAll<HTMLElement>(".reveal-line");
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.9,
            ease: EASE.out,
            scrollTrigger: {
              trigger: line,
              start: "top 92%",
              once: true,
            },
          }
        );
      });
    }, pageContainerRef);

    // Call ScrollTrigger.refresh() after fonts are ready
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    } else {
      ScrollTrigger.refresh();
    }

    // Refresh on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    // One real cleanup function returned from the effect
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleAnchorClick);
      if (lenis) {
        gsap.ticker.remove(tickerCallback);
        lenis.destroy();
      }
      window.__lenis = undefined;
      splitReverters.forEach((rev) => rev());
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [pathname]);

  return (
    <div ref={pageContainerRef} className="w-full min-h-screen">
      {children}
    </div>
  );
}
