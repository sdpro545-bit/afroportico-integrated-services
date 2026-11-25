"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check pointer type and reduced motion preferences: only fine pointer and hover
    const hasFinePointerAndHover = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointerAndHover || prefersReducedMotion) {
      return;
    }

    setIsEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Fast coordinate setters via GSAP quickTo for zero lag
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3.out" });

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
          duration: 0.25,
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
          duration: 0.25,
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
      document.body.classList.remove("has-custom-cursor");
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
      aria-hidden="true"
      className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[9999] opacity-0"
      style={{
        width: 12,
        height: 12,
        backgroundColor: "#2BC194",
        border: "0px solid transparent",
      }}
    />
  );
}
