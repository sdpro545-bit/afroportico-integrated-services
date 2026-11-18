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
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
              }`}
            >
              <Image
                src={s.image}
                alt={s.alt}
                fill
                priority={idx === 0}
                className="object-cover object-right-top opacity-55 mix-blend-luminosity filter contrast-110"
              />
              {/* Deep Navy Gradient Scrim for readable text on the left two-thirds */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#04374D] via-[#04374D]/85 to-transparent lg:w-4/5" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04374D]/90 via-transparent to-transparent sm:hidden" />
            </div>
          ))}

          {/* Top Eyebrow Badge */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold tracking-wide text-[#E4EEF2] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#2BC194]" />
              {slide.eyebrow}
            </span>
          </div>

          {/* Center Copy Block */}
          <div className="relative z-10 max-w-2xl my-auto py-8">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-6">
              {slide.title}
            </h1>
            <p className="text-base sm:text-lg text-[#A9C2CD] leading-relaxed max-w-xl font-normal mb-8">
              {slide.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Primary Pill Button */}
              <Link
                href={slide.primaryCta.href}
                className="inline-flex items-center gap-4 h-14 pl-7 pr-2.5 rounded-full bg-[#2BC194] hover:bg-[#4FD6AE] text-[#04374D] font-bold text-sm tracking-wide transition-all shadow-md group active:scale-95"
              >
                <span>{slide.primaryCta.label}</span>
                <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowUpRight size={16} strokeWidth={2.2} className="text-[#04374D]" />
                </span>
              </Link>

              {/* Secondary Call Action */}
              <a
                href={slide.secondaryCta.href}
                className="hidden sm:inline-flex items-center gap-3 text-sm font-semibold text-white/90 hover:text-[#2BC194] transition-colors py-2"
              >
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#2BC194]">
                  <Phone size={15} strokeWidth={1.75} />
                </span>
                <span>{slide.secondaryCta.label}</span>
              </a>
            </div>
          </div>

          {/* Bottom Bar: Operational Focus Line & Pager */}
          <div className="relative z-10 flex items-end justify-between pt-4 border-t border-white/10">
            <div className="hidden sm:flex items-center gap-6 text-xs text-[#A9C2CD]">
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
              className="lg:absolute lg:right-8 lg:top-1/2 lg:-translate-y-1/2 flex lg:flex-col items-center gap-2.5 bg-white/15 backdrop-blur-md p-2 rounded-full border border-white/20"
              role="tablist"
              aria-label="Hero slide switcher"
            >
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2BC194] ${
                    idx === currentSlide
                      ? "w-7 h-2.5 lg:w-2.5 lg:h-7 bg-[#2BC194]"
                      : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
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
