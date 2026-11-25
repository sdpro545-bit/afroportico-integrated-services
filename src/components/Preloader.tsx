"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { EASE } from "@/utils/motion";

export default function Preloader() {
  const [active, setActive] = useState(true);
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
      setActive(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          sessionStorage.setItem("afroportico_intro_seen", "true");
          setActive(false);
        },
      });

      // 1. Logo and brand emblem scale and rise in (0.5s)
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.92, y: 12 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: EASE.out,
        }
      );

      // 2. Hold 0.4s
      tl.to({}, { duration: 0.4 });

      // 3. Logo fades out as panels split (0.25s)
      tl.to(
        logoRef.current,
        {
          opacity: 0,
          scale: 1.05,
          duration: 0.25,
          ease: EASE.inout,
        },
        "-=0.1"
      );

      // 4. Twin panels split upward and downward (0.55s, inout)
      tl.to(
        topPanelRef.current,
        {
          yPercent: -100,
          duration: 0.55,
          ease: EASE.inout,
        },
        "-=0.15"
      );

      tl.to(
        bottomPanelRef.current,
        {
          yPercent: 100,
          duration: 0.55,
          ease: EASE.inout,
        },
        "<"
      );
    }, containerRef);

    const handleSkip = () => {
      document.body.style.overflow = "";
      sessionStorage.setItem("afroportico_intro_seen", "true");
      setActive(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        handleSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      ctx.revert();
    };
  }, []);

  if (!active) return null;

  return (
    <div
      id="preloader-overlay"
      ref={containerRef}
      onClick={() => {
        document.body.style.overflow = "";
        sessionStorage.setItem("afroportico_intro_seen", "true");
        setActive(false);
      }}
      className="fixed inset-0 z-[100] flex flex-col pointer-events-auto cursor-pointer select-none"
      role="progressbar"
      aria-label="Loading Afroportico Integrated Services"
    >
      {/* Top Half Panel: Off-white #EEF3F5 so the logo's navy half is visible */}
      <div
        ref={topPanelRef}
        className="w-full h-1/2 bg-[#EEF3F5] will-change-transform"
      />

      {/* Bottom Half Panel: Off-white #EEF3F5 */}
      <div
        ref={bottomPanelRef}
        className="w-full h-1/2 bg-[#EEF3F5] will-change-transform"
      />

      {/* Centered Logo Badge */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 p-6"
      >
        <div className="relative w-28 h-20 sm:w-36 sm:h-24 mb-4 p-3 rounded-2xl bg-white shadow-xl border border-[#04374D]/10">
          <Image
            src="/logo-mark.png"
            alt="Afroportico Portal Emblem"
            fill
            className="object-contain p-2"
            priority
          />
        </div>
        <div className="text-center">
          <span className="font-extrabold text-base sm:text-lg tracking-wider text-[#04374D] uppercase block">
            Afroportico
          </span>
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#087A5E] uppercase block mt-0.5">
            Integrated Services Limited
          </span>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 text-center text-[10px] font-mono tracking-widest text-[#3D5A68]/60 uppercase pointer-events-none">
        Click or press Esc to enter
      </div>
    </div>
  );
}
