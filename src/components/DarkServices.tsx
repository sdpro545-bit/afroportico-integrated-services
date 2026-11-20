"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesData } from "@/content/site";

export default function DarkServices() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

  // Auto-switch tabs when not paused or on mobile
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTabIdx((prev) => (prev + 1) % servicesData.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Desktop horizontal pin scrub
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const track = horizontalTrackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const totalPanels = servicesData.length;
        const totalShift = -((totalPanels - 1) / totalPanels) * 100;

        const pinTl = gsap.to(track, {
          xPercent: totalShift,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            snap: 1 / (totalPanels - 1),
            start: "top top+=70",
            end: () => `+=${section.offsetWidth * 1.5}`,
            onUpdate: (self) => {
              const currentStep = Math.round(self.progress * (totalPanels - 1));
              setActiveTabIdx(currentStep);
            },
          },
        });

        return () => {
          pinTl.kill();
        };
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const prevTab = () => {
    setActiveTabIdx((prev) => (prev === 0 ? servicesData.length - 1 : prev - 1));
  };

  const nextTab = () => {
    setActiveTabIdx((prev) => (prev + 1) % servicesData.length);
  };

  const activeService = servicesData[activeTabIdx];

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-20 lg:py-24"
      id="services"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="site-container">
        {/* Navy Rounded Container */}
        <div
          ref={desktopContainerRef}
          className="rounded-[28px] bg-[#04374D] text-white p-6 sm:p-12 lg:p-16 shadow-[0_1px_2px_rgba(4,55,77,0.06),0_12px_32px_rgba(4,55,77,0.08)] overflow-hidden"
        >
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

            {/* Controls & Capabilities Link */}
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
          <div
            className="flex flex-wrap gap-2 sm:gap-3 mb-10 pb-4 border-b border-white/10"
            role="tablist"
          >
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

          {/* Desktop Horizontal Sliding Track (>= 1024px) */}
          <div className="hidden lg:block overflow-hidden relative">
            <div
              ref={horizontalTrackRef}
              className="flex w-[400%] transition-transform duration-500 ease-out"
            >
              {servicesData.map((service, idx) => (
                <div
                  key={service.id}
                  className="w-1/4 px-2"
                >
                  <div className="grid grid-cols-12 gap-10 items-center bg-[#022636]/70 rounded-[24px] p-8 lg:p-10 border border-white/10">
                    {/* Left Column: Large Image with Inset Reveal */}
                    <div className="col-span-7 relative">
                      <div className="reveal-image-clip relative aspect-[16/10] w-full rounded-[20px] overflow-hidden border border-white/20 shadow-2xl">
                        <Image
                          src={service.image}
                          alt={service.alt}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
                          priority={idx === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#022636]/70 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-[#04374D]/90 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#2BC194]">
                          {service.eyebrow}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Title, Short Paragraph, 3 Bullets & CTA */}
                    <div className="col-span-5 space-y-6">
                      <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2BC194] block mb-2">
                          0{idx + 1} // {service.tabLabel}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-3">
                          {service.title}
                        </h3>
                        <p className="text-sm sm:text-base text-[#E4EEF2]/90 leading-relaxed font-normal">
                          {service.shortDesc}
                        </p>
                      </div>

                      <div className="space-y-3 pt-2">
                        {service.bullets.map((bullet, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 size={18} className="text-[#2BC194] flex-shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-[#E4EEF2] font-medium leading-normal">
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center gap-4">
                        <Link
                          href={`/services#${service.slug}`}
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
              ))}
            </div>
          </div>

          {/* Mobile Tab/Swipe View (< 1024px) */}
          <div className="lg:hidden">
            <div className="flex flex-col gap-6 bg-[#022636]/70 rounded-[24px] p-6 sm:p-8 border border-white/10">
              {/* Image */}
              <div className="relative aspect-[16/10] w-full rounded-[18px] overflow-hidden border border-white/20 shadow-xl">
                <Image
                  key={activeService.id}
                  src={activeService.image}
                  alt={activeService.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#022636]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-[#04374D]/90 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#2BC194]">
                  {activeService.eyebrow}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2BC194] block">
                  0{activeTabIdx + 1} // {activeService.tabLabel}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {activeService.title}
                </h3>
                <p className="text-sm text-[#E4EEF2]/90 leading-relaxed font-normal">
                  {activeService.shortDesc}
                </p>

                <div className="space-y-2.5 pt-2">
                  {activeService.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-[#2BC194] flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#E4EEF2] font-medium leading-normal">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/services#${activeService.slug}`}
                    className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[#2BC194] text-[#04374D] text-xs font-bold shadow-sm"
                  >
                    <span>Explore Scope</span>
                    <ArrowUpRight size={14} />
                  </Link>
                  <Link
                    href="/contact-us?subject=quote"
                    className="text-xs font-bold text-white/80 hover:text-white"
                  >
                    Request quote →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
