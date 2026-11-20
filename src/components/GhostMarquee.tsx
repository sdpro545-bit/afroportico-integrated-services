"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GhostMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const textItems = [
    "Engineering, Procurement, Contracting",
    "Mechanical & Electrical Services",
    "Oil & Gas EPC Support",
    "Industrial Facility Management",
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const skewTo = gsap.quickTo(track, "skewX", {
      duration: 0.35,
      ease: "power3.out",
    });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        // Clamp velocity to skew range -2deg to 2deg
        const velocity = self.getVelocity();
        const clampedSkew = gsap.utils.clamp(-2, 2, velocity / 350);
        skewTo(clampedSkew);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-6 sm:py-10 overflow-hidden select-none border-y border-[rgba(4,55,77,0.08)] bg-white/40"
      aria-hidden="true"
    >
      <div className="relative flex whitespace-nowrap overflow-hidden">
        {/* Continuous Marquee Track with Scroll-Velocity Skew */}
        <div
          ref={trackRef}
          className="flex animate-marquee gap-8 sm:gap-12 items-center will-change-transform"
        >
          {textItems.concat(textItems).map((text, i) => (
            <div key={i} className="flex items-center gap-6 sm:gap-10">
              <span className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-transparent [-webkit-text-stroke:1.5px_rgba(4,55,77,0.22)]">
                {text}
              </span>
              <span className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-[rgba(4,55,77,0.2)] flex items-center justify-center text-[#04374D] font-bold text-xl sm:text-2xl">
                ↗
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
