"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import { servicesData } from "@/content/site";
import CountUp from "./CountUp";

export default function DarkServices() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);

  // Auto-switch tabs every 2s across all screen sizes (continues while scrolling)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTabIdx((prev) => (prev + 1) % servicesData.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-20 lg:py-24"
      id="services"
    >
      <div className="site-container">
        {/* Navy Rounded Container */}
        <div
          ref={desktopContainerRef}
          className="rounded-[24px] sm:rounded-[28px] bg-[#04374D] text-white p-4 sm:p-12 lg:p-16 shadow-[0_1px_2px_rgba(4,55,77,0.06),0_12px_32px_rgba(4,55,77,0.08)] overflow-hidden"
        >
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-6 sm:mb-10">
            <div className="max-w-3xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2BC194] mb-3 block reveal-fade">
                {"// Services"}
              </span>
              <h2
                style={{ color: "#FFFFFF" }}
                className="text-2xl sm:text-3xl lg:text-[34px] font-semibold tracking-[-0.025em] !text-white leading-[1.2] mb-4 reveal-title"
              >
                Engineering Nigeria&apos;s Industries with International Standards and HSE Excellence
              </h2>
            </div>

            {/* Capabilities Link */}
            <div className="flex items-center gap-4 self-start lg:self-end">
              <Link
                href="/services"
                className="text-xs sm:text-sm font-bold text-[#2BC194] hover:text-[#4FD6AE] underline underline-offset-4 transition-colors"
              >
                View all capabilities ↗
              </Link>
            </div>
          </div>

          {/* 4 Tabs Selector Bar */}
          <div
            className="grid grid-cols-2 lg:flex lg:flex-nowrap gap-2.5 sm:gap-3 mb-6 sm:mb-10 pb-4 border-b border-white/10"
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
                  className={`min-h-[48px] w-full lg:w-auto py-2.5 px-3 sm:px-5 rounded-2xl lg:rounded-full text-[11px] sm:text-xs xl:text-sm font-bold tracking-wide text-center leading-snug flex items-center justify-center whitespace-normal lg:whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-md cursor-pointer ${
                    isSelected
                      ? "bg-[#2BC194]/95 text-[#04374D] shadow-[0_4px_24px_rgba(43,193,148,0.4)] scale-[1.02] border border-[#4FD6AE]/60"
                      : "bg-white/[0.08] hover:bg-white/[0.15] text-white/90 border border-white/15"
                  }`}
                >
                  {service.tabLabel}
                </button>
              );
            })}
          </div>

          {/* Desktop Smooth Glass Cross-Fade View (>= 1024px) */}
          <div className="hidden lg:block relative">
            <div className="relative">
              {servicesData.map((service, idx) => {
                const isCurrent = activeTabIdx === idx;
                return (
                  <div
                    key={service.id}
                    aria-hidden={!isCurrent}
                    className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isCurrent
                        ? "relative opacity-100 scale-100 blur-0 pointer-events-auto z-10"
                        : "absolute inset-0 opacity-0 scale-[0.985] blur-[6px] pointer-events-none z-0"
                    }`}
                  >
                    <div className="grid grid-cols-12 gap-10 items-center bg-[#022636]/65 backdrop-blur-xl rounded-[24px] p-8 lg:p-10 border border-white/15 shadow-[0_16px_48px_rgba(2,38,54,0.45)]">
                      {/* Left Column: Clean Unobstructed Image */}
                      <div className="col-span-7 relative">
                        <button
                          type="button"
                          onClick={() => setActiveTabIdx((prev) => (prev + 1) % servicesData.length)}
                          aria-label={`Next service from ${service.title}`}
                          className="relative aspect-[16/10] w-full rounded-[20px] overflow-hidden border border-white/15 shadow-2xl cursor-pointer block text-left group"
                        >
                          <Image
                            src={service.image}
                            alt={service.alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            priority={idx === 0}
                          />
                        </button>
                      </div>

                      {/* Right Column: Service Content & Bullets */}
                      <div className="col-span-5 space-y-5">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2BC194] block">
                          <CountUp target={idx + 1} pad={2} duration={0.8} /> {"// "}
                          {service.eyebrow}
                        </span>

                        <h3
                          style={{ color: "#FFFFFF" }}
                          className="text-2xl xl:text-3xl font-bold !text-white tracking-tight leading-snug"
                        >
                          {service.title}
                        </h3>

                        <p className="text-sm text-[#E4EEF2]/90 leading-relaxed font-normal">
                          {service.shortDesc}
                        </p>

                        <div className="space-y-3 pt-2">
                          {service.bullets.map((bullet, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <CheckCircle2 size={18} className="text-[#2BC194] flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-[#E4EEF2] font-medium leading-normal">
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
                );
              })}
            </div>
          </div>

          {/* Mobile Smooth Glass Cross-Fade View (< 1024px) */}
          <div className="lg:hidden relative">
            <div className="relative">
              {servicesData.map((service, idx) => {
                const isCurrent = activeTabIdx === idx;
                return (
                  <div
                    key={service.id}
                    aria-hidden={!isCurrent}
                    className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isCurrent
                        ? "relative opacity-100 scale-100 blur-0 pointer-events-auto z-10"
                        : "absolute inset-0 opacity-0 scale-[0.985] blur-[6px] pointer-events-none z-0"
                    }`}
                  >
                    <div className="flex flex-col gap-5 bg-[#022636]/70 backdrop-blur-xl rounded-[20px] p-4 sm:p-8 border border-white/15">
                      <button
                        type="button"
                        onClick={() => setActiveTabIdx((prev) => (prev + 1) % servicesData.length)}
                        aria-label={`Next service from ${service.title}`}
                        className="relative aspect-[16/10] w-full rounded-[18px] overflow-hidden border border-white/15 shadow-xl cursor-pointer block text-left"
                      >
                        <Image
                          src={service.image}
                          alt={service.alt}
                          fill
                          className="object-cover"
                        />
                      </button>

                      <div className="space-y-4">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2BC194] block">
                          0{idx + 1} {"// "}
                          {service.eyebrow}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                          {service.title}
                        </h3>
                        <p className="text-sm text-[#E4EEF2]/90 leading-relaxed font-normal">
                          {service.shortDesc}
                        </p>

                        <div className="space-y-2.5 pt-2">
                          {service.bullets.map((bullet, i) => (
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
                            href={`/services#${service.slug}`}
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
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
