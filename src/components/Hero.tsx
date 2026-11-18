"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
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

          {/* Top Eyebrow Badge with Smooth Slide Transition */}
          <div className="relative z-10 h-9 flex items-center">
            <div
              key={currentSlide}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 text-xs sm:text-[13px] font-medium tracking-wide text-[#E4EEF2] shadow-sm transition-all duration-500 animate-[fadeIn_0.5s_ease-out]"
            >
              <span className="w-2 h-2 rounded-full bg-[#2BC194] animate-pulse" />
              <span>{slide.eyebrow}</span>
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

            {/* Micro-interaction CTAs */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Primary Pill Button with Apple-style smooth micro-interaction */}
              <Link
                href={slide.primaryCta.href}
                className="group relative inline-flex items-center gap-4 h-14 pl-7 pr-2.5 rounded-full bg-[#2BC194] hover:bg-[#4FD6AE] text-[#04374D] font-semibold text-sm tracking-wide transition-all duration-300 shadow-[0_4px_20px_rgba(43,193,148,0.25)] hover:shadow-[0_6px_25px_rgba(43,193,148,0.4)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{slide.primaryCta.label}</span>
                <span className="relative w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden transition-all duration-300 shadow-sm group-hover:rotate-45">
                  <ArrowUpRight size={16} strokeWidth={2.2} className="text-[#04374D] transition-transform duration-300" />
                </span>
              </Link>

              {/* Secondary Call Action styled as sleek frosted glass pill */}
              <a
                href={slide.secondaryCta.href}
                className="inline-flex items-center gap-3 h-14 px-6 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/15 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-[#2BC194]">
                  <Phone size={14} strokeWidth={2} />
                </span>
                <span>{slide.secondaryCta.label}</span>
              </a>
            </div>
          </div>

          {/* Bottom Bar: Operational Focus Line & Pager */}
          <div className="relative z-10 flex items-end justify-between pt-4 border-t border-white/10">
            <div className="hidden sm:flex items-center gap-6 text-xs text-[#A9C2CD] font-medium">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2BC194]" />
                Warri Operations Base
              </span>
              <span>•</span>
              <span>International Engineering Standards</span>
              <span>•</span>
              <span>Zero-Incident HSE Culture</span>
            </div>

            {/* Pager Dots (Vertical on desktop right edge in reference, horizontal on mobile) */}
            <div
              className="lg:absolute lg:right-8 lg:top-1/2 lg:-translate-y-1/2 flex lg:flex-col items-center gap-2.5 bg-white/10 backdrop-blur-xl p-2 rounded-full border border-white/15 shadow-sm"
              role="tablist"
              aria-label="Hero slide switcher"
            >
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2BC194] ${
                    idx === currentSlide
                      ? "w-7 h-2.5 lg:w-2.5 lg:h-7 bg-[#2BC194] shadow-[0_0_8px_rgba(43,193,148,0.6)]"
                      : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Show slide ${idx + 1} of ${heroSlides.length}`}
                  aria-selected={idx === currentSlide}
                  role="tab"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
