"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check session storage
    const hasSeen = sessionStorage.getItem("afroportico_intro_seen");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hasSeen || prefersReducedMotion) {
      return;
    }

    setIsVisible(true);
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setIsVisible(false);
          sessionStorage.setItem("afroportico_intro_seen", "true");
        },
      });

      // 1. Logo and brand emblem draw/scale in (0.5s)
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.92, y: 12 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "expo.out",
        }
      );

      // 2. Hold 0.4s
      tl.to({}, { duration: 0.4 });

      // 3. Logo fades out as panels split (0.2s)
      tl.to(
        logoRef.current,
        {
          opacity: 0,
          scale: 1.05,
          duration: 0.25,
          ease: "power2.in",
        },
        "-=0.1"
      );

      // 4. Twin panels split upward and out (0.55s, cubic-bezier(0.65, 0, 0.35, 1))
      tl.to(
        topPanelRef.current,
        {
          yPercent: -100,
          duration: 0.55,
          ease: "power3.inOut",
        },
        "-=0.15"
      );

      tl.to(
        bottomPanelRef.current,
        {
          yPercent: 100,
          duration: 0.55,
          ease: "power3.inOut",
        },
        "<"
      );
    }, containerRef);

    const handleSkip = () => {
      document.body.style.overflow = "";
      setIsVisible(false);
      sessionStorage.setItem("afroportico_intro_seen", "true");
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") handleSkip();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      ctx.revert();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col pointer-events-auto"
      role="progressbar"
      aria-label="Loading Afroportico Integrated Services"
    >
      {/* Top Half Panel */}
      <div
        ref={topPanelRef}
        className="w-full h-1/2 bg-[#04374D] border-b border-white/10 will-change-transform"
      />

      {/* Bottom Half Panel */}
      <div
        ref={bottomPanelRef}
        className="w-full h-1/2 bg-[#04374D] border-t border-white/10 will-change-transform"
      />

      {/* Centered Logo Badge */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 p-6"
      >
        <div className="relative w-20 h-16 sm:w-24 sm:h-20 mb-5 p-3 rounded-2xl bg-white shadow-2xl">
          <Image
            src="/logo-mark.png"
            alt="Afroportico Portal Emblem"
            fill
            className="object-contain p-2"
            priority
          />
        </div>

        <span className="font-extrabold tracking-tight text-white text-xl sm:text-2xl block leading-none">
          AFROPORTICO
        </span>
        <span className="text-[10px] sm:text-xs text-[#2BC194] tracking-[0.2em] uppercase font-bold mt-2 block leading-none">
          INTEGRATED SERVICES LIMITED
        </span>

        {/* Ambient progress indicator bar */}
        <div className="w-24 h-[2px] bg-white/15 rounded-full mt-6 overflow-hidden">
          <div className="w-full h-full bg-[#2BC194] origin-left animate-[scaleX_1.2s_ease-out_forwards]" />
        </div>
      </div>
    </div>
  );
}
