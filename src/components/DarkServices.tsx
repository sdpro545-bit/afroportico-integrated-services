"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { servicesData } from "@/content/site";

export default function DarkServices() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Automatically switch to next tab
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTabIdx((prev) => (prev + 1) % servicesData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeService = servicesData[activeTabIdx];

  const prevTab = () => {
    setActiveTabIdx((prev) => (prev === 0 ? servicesData.length - 1 : prev - 1));
  };

  const nextTab = () => {
    setActiveTabIdx((prev) => (prev + 1) % servicesData.length);
  };

  return (
    <section
      className="py-12 sm:py-20 lg:py-24"
      id="services"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="site-container">
        {/* Navy Rounded Container */}
        <div className="rounded-[28px] bg-[#04374D] text-white p-6 sm:p-12 lg:p-16 shadow-[0_1px_2px_rgba(4,55,77,0.06),0_12px_32px_rgba(4,55,77,0.08)]">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
            <div className="max-w-3xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2BC194] mb-3 block reveal-fade">
                // Services
              </span>
              <h2
                style={{ color: "#FFFFFF" }}
                className="text-2xl sm:text-4xl lg:text-[40px] font-semibold tracking-[-0.025em] !text-white leading-[1.15] mb-4 reveal-title drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
              >
                Engineering Nigeria&apos;s Industries with International Standards and HSE Excellence
              </h2>
            </div>

            {/* Slider / Tab Navigation Buttons */}
            <div className="flex items-center gap-4 self-start lg:self-end">
              <Link
                href="/services"
                className="text-xs sm:text-sm font-bold text-[#2BC194] hover:text-[#4FD6AE] underline underline-offset-4 transition-colors"
              >
                View all capabilities ↗
              </Link>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevTab}
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all active:scale-95 border border-white/15"
                  aria-label="Previous service tab"
                >
                  <ChevronLeft size={20} strokeWidth={2.2} />
                </button>
                <button
                  type="button"
                  onClick={nextTab}
                  className="w-11 h-11 rounded-full bg-[#2BC194] hover:bg-[#4FD6AE] text-[#04374D] flex items-center justify-center transition-all active:scale-95 shadow-sm"
                  aria-label="Next service tab"
                >
                  <ChevronRight size={20} strokeWidth={2.2} />
                </button>
              </div>
            </div>
          </div>

          {/* 4 Tabs Selector Bar */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 pb-4 border-b border-white/10" role="tablist">
            {servicesData.map((service, idx) => {
              const isSelected = activeTabIdx === idx;
              return (
                <button
                  key={service.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTabIdx(idx)}
                  className={`h-11 px-5 sm:px-6 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 ${
                    isSelected
                      ? "bg-[#2BC194] text-[#04374D] shadow-[0_2px_12px_rgba(43,193,148,0.35)] scale-[1.02]"
                      : "bg-white/10 hover:bg-white/15 text-white/90 border border-white/10"
                  }`}
                >
                  {service.tabLabel}
                </button>
              );
            })}
          </div>

          {/* Tab Content Display: Large Image Left (7 cols), Copy & Bullets Right (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#022636]/60 rounded-[24px] p-6 sm:p-10 border border-white/10">
            {/* Left Column: Large Image */}
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-[20px] overflow-hidden border border-white/20 shadow-2xl">
                <Image
                  key={activeService.id}
                  src={activeService.image}
                  alt={activeService.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#022636]/70 via-transparent to-transparent" />
                
                {/* Floating Tag */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 px-4 py-2 rounded-full bg-[#04374D]/90 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#2BC194]">
                  {activeService.eyebrow}
                </div>
              </div>
            </div>

            {/* Right Column: Title, Short Paragraph, 3 Bullets & CTA */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2BC194] block mb-2">
                  0{activeTabIdx + 1} // {activeService.tabLabel}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-3">
                  {activeService.title}
                </h3>
                <p className="text-sm sm:text-base text-[#E4EEF2]/90 leading-relaxed font-normal">
                  {activeService.shortDesc}
                </p>
              </div>

              {/* 3 Bullets with Checkmarks */}
              <div className="space-y-3 pt-2">
                {activeService.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#2BC194] flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#E4EEF2] font-medium leading-normal">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-4">
                <Link
                  href={`/services#${activeService.slug}`}
                  className="inline-flex items-center gap-3 h-12 px-6 rounded-full bg-[#2BC194] hover:bg-[#4FD6AE] text-[#04374D] text-xs font-bold transition-all duration-300 shadow-sm active:scale-95"
                >
                  <span>Explore Service Scope</span>
                  <ArrowUpRight size={15} strokeWidth={2.4} />
                </Link>
                <Link
                  href="/contact-us?subject=quote"
                  className="text-xs font-bold text-white/80 hover:text-white transition-colors"
                >
                  Request quote →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
