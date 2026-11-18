"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function ScrollAnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll with Apple-like fluid damping
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Subtle page fade-in on mount / route change
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0.85 },
        { opacity: 1, duration: 0.45, ease: "power2.out" }
      );
    }

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // 1. Sleek line-rise text reveals for titles
        const titles = document.querySelectorAll(".reveal-title");
        titles.forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 35 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                once: true,
              },
            }
          );
        });

        // 2. Smooth fade and translate for paragraphs & eyebrows
        const fades = document.querySelectorAll(".reveal-fade");
        fades.forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                once: true,
              },
            }
          );
        });

        // 3. Staggered card sequences
        const staggers = document.querySelectorAll(".reveal-stagger");
        staggers.forEach((container) => {
          const items = container.children;
          if (items.length > 0) {
            gsap.fromTo(
              items,
              { autoAlpha: 0, y: 35 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.75,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: container,
                  start: "top 86%",
                  once: true,
                },
              }
            );
          }
        });

        // 4. Hairline reveals
        const lines = document.querySelectorAll(".reveal-line");
        lines.forEach((line) => {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: {
                trigger: line,
                start: "top 92%",
                once: true,
              },
            }
          );
        });
      });

      ScrollTrigger.refresh();

      return () => ctx.revert();
    }, 80);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [pathname]);

  return <div ref={mainRef} className="w-full">{children}</div>;
}
