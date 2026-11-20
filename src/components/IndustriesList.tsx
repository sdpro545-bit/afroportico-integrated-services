"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { industriesData } from "@/content/site";

export default function IndustriesList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [isHoveringList, setIsHoveringList] = useState(false);
  const floatingPreviewRef = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const preview = floatingPreviewRef.current;
    const container = listContainerRef.current;
    if (!preview || !container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Fast lerp setters with duration 0.28 (approx lerp 0.12)
    const xTo = gsap.quickTo(preview, "x", { duration: 0.28, ease: "power2.out" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.28, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      xTo(relX);
      yTo(relY);
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-white/70 border-y border-[rgba(4,55,77,0.08)]">
      {/* Ghost Heading Watermark */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none select-none text-[clamp(3.5rem,1rem+10vw,10rem)] font-extrabold uppercase tracking-tight text-[rgba(4,55,77,0.03)] whitespace-nowrap z-0">
        Industries
      </div>

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Interactive List Rows */}
          <div
            ref={listContainerRef}
            className="lg:col-span-8 relative"
            onMouseEnter={() => setIsHoveringList(true)}
            onMouseLeave={() => setIsHoveringList(false)}
          >
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#087A5E] mb-2 block reveal-fade">
              // Industries
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-bold text-[#04374D] tracking-tight mb-8 reveal-title">
              Discover the Industries we serve
            </h2>

            <div className="divide-y divide-[rgba(4,55,77,0.12)] reveal-stagger">
              {industriesData.map((item, idx) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className="group py-6 sm:py-8 flex items-center justify-between cursor-pointer transition-all duration-300"
                >
                  <div className="transform transition-transform duration-300 group-hover:translate-x-3 max-w-xl">
                    <span className="text-xs font-bold font-mono text-[#087A5E] mr-3">
                      [0{idx + 1}]
                    </span>
                    <h3 className="text-lg sm:text-2xl font-bold text-[#04374D] group-hover:text-[#087A5E] transition-colors inline-block mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#3D5A68] leading-relaxed mt-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Circular Arrow Badge */}
                  <Link
                    href={`/contact-us?subject=${encodeURIComponent(item.title)}`}
                    className="w-12 h-12 rounded-full border border-[rgba(4,55,77,0.15)] group-hover:bg-[#2BC194] group-hover:border-[#2BC194] flex items-center justify-center text-[#04374D] transition-all duration-300 flex-shrink-0 ml-4 shadow-xs"
                    aria-label={`Inquire about ${item.title}`}
                  >
                    <ArrowUpRight size={18} strokeWidth={2.2} />
                  </Link>
                </div>
              ))}
            </div>

            {/* Floating Cursor Thumbnail for Desktop */}
            <div
              ref={floatingPreviewRef}
              className={`hidden lg:block absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-48 h-32 rounded-2xl overflow-hidden shadow-2xl border-2 border-white pointer-events-none z-30 transition-all duration-300 ${
                isHoveringList
                  ? "opacity-100 scale-100 [clip-path:inset(0%_round_16px)]"
                  : "opacity-0 scale-90 [clip-path:inset(20%_round_16px)]"
              }`}
            >
              {industriesData.map((item, idx) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-opacity duration-200 ${
                    hoveredIndex === idx ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#04374D]/30" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Static Hero Frame on Desktop */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden border-2 border-white shadow-xl bg-[#04374D]">
              {industriesData.map((item, idx) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-opacity duration-300 ease-out ${
                    hoveredIndex === idx ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04374D]/90 via-[#04374D]/20 to-transparent flex flex-col justify-end p-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2BC194]">
                      Sector Focus
                    </span>
                    <span className="text-lg font-bold text-white">
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
