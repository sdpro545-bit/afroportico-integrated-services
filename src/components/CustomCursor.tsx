"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check pointer type and reduced motion preferences
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    setIsEnabled(true);

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Fast coordinate setters via GSAP quickTo for zero lag
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" });

    let isHoveringInteractive = false;

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      gsap.to(cursor, { opacity: 1, duration: 0.2, overwrite: "auto" });
    };

    const onMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.2, overwrite: "auto" });
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.2, overwrite: "auto" });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], [role='tab'], input, select, textarea, .notched-card");
      if (interactive && !isHoveringInteractive) {
        isHoveringInteractive = true;
        gsap.to(cursor, {
          width: 48,
          height: 48,
          backgroundColor: "rgba(43, 193, 148, 0.18)",
          borderColor: "#2BC194",
          borderWidth: 1.5,
          duration: 0.3,
          ease: "expo.out",
          overwrite: "auto",
        });
      } else if (!interactive && isHoveringInteractive) {
        isHoveringInteractive = false;
        gsap.to(cursor, {
          width: 12,
          height: 12,
          backgroundColor: "#2BC194",
          borderColor: "transparent",
          borderWidth: 0,
          duration: 0.3,
          ease: "expo.out",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[9999] opacity-0 transition-[background-color,border-color,width,height] duration-150"
      style={{
        width: 12,
        height: 12,
        backgroundColor: "#2BC194",
        boxShadow: "0 0 12px rgba(43, 193, 148, 0.4)",
      }}
      aria-hidden="true"
    />
  );
}
