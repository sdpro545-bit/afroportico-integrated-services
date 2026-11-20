"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { heroSlides } from "@/content/site";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const slide = heroSlides[currentSlide];

  return (
    <section
      className="pt-24 sm:pt-28 pb-8 sm:pb-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="site-container">
        {/* Main Hero Container with radius 28px */}
        <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-[#04374D] text-white flex flex-col justify-between p-6 sm:p-12 lg:p-16 shadow-[0_1px_2px_rgba(4,55,77,0.06),0_12px_32px_rgba(4,55,77,0.08)]">
          {/* Background Slides with cross-fade */}
          {heroSlides.map((s, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                idx === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
              }`}
            >
              <Image
                src={s.image}
                alt={s.alt}
                fill
                priority={idx === 0}
                className="object-cover object-right-top opacity-40 filter contrast-125 transition-transform duration-1000 ease-out"
              />
              {/* Deep Navy Gradient Scrim for crisp contrast on the text block */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#022636] via-[#04374D]/90 to-[#04374D]/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#022636]/90 via-transparent to-transparent sm:hidden" />
            </div>
          ))}

          {/* Top Eyebrow Badge with Sleek Glassy Animation (No dot, glassy fade-in & out) */}
          <div className="relative z-10 h-10 flex items-center">
            <div
              key={currentSlide}
              className="inline-flex items-center px-5 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-2xl border border-white/25 text-xs sm:text-[13px] font-medium tracking-wider uppercase text-white shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-all duration-500 animate-glassy-fade"
            >
              <span className="tracking-widest">{slide.eyebrow}</span>
            </div>
          </div>

          {/* Center Copy Block */}
          <div className="relative z-10 max-w-3xl my-auto py-8">
            {/* Reduced bold font weight to sleek Apple-like font-semibold (600) with clean balance */}
            <h1
              key={`h1-${currentSlide}`}
              style={{ color: "#FFFFFF" }}
              className="text-3xl sm:text-5xl lg:text-[56px] font-semibold tracking-[-0.03em] !text-white leading-[1.12] mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] animate-[fadeIn_0.6s_ease-out]"
            >
              {slide.title}
            </h1>
            <p
              key={`desc-${currentSlide}`}
              style={{ color: "#E4EEF2" }}
              className="text-base sm:text-lg !text-[#E4EEF2] leading-relaxed max-w-xl font-normal mb-8 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] opacity-95 animate-[fadeIn_0.7s_ease-out]"
            >
              {slide.description}
            </p>

            {/* Single Primary CTA Button */}
            <div className="flex items-center">
              <Link
                href={slide.primaryCta.href}
                className="group relative inline-flex items-center gap-4 h-14 pl-7 pr-2.5 rounded-full bg-[#2BC194] hover:bg-[#4FD6AE] text-[#04374D] font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_4px_20px_rgba(43,193,148,0.25)] hover:shadow-[0_6px_25px_rgba(43,193,148,0.4)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{slide.primaryCta.label}</span>
                <span className="relative w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden transition-all duration-300 shadow-sm group-hover:rotate-45">
                  <ArrowUpRight size={16} strokeWidth={2.4} className="text-[#04374D] transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </div>

          {/* Bottom Bar: Operational Focus Line */}
          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#A9C2CD] font-medium">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2BC194]" />
                Warri Operations Base
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">International Engineering Standards</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Zero-Incident HSE Culture</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
