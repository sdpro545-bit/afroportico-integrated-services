"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { servicesData } from "@/content/site";

export default function DarkServices() {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Automatically switch to next service slide
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1 >= servicesData.length ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setStartIndex((prev) => (prev === 0 ? servicesData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1 >= servicesData.length ? 0 : prev + 1));
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
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#2BC194] mb-3 block reveal-fade">
                OUR SERVICES
              </span>
              <h2
                style={{ color: "#FFFFFF" }}
                className="text-2xl sm:text-4xl lg:text-[40px] font-semibold tracking-[-0.025em] !text-white leading-[1.15] mb-4 reveal-title drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
              >
                Engineering Nigeria&apos;s industries to international standards,{" "}
                <span className="text-[#2BC194]">with HSE first.</span>
              </h2>
              <p
                style={{ color: "#E4EEF2" }}
                className="text-sm sm:text-base !text-[#E4EEF2] leading-relaxed font-normal reveal-fade opacity-95"
              >
                Together, we define the scope, the standards and the people each project needs.
              </p>
            </div>

            {/* Side Link and Circular Slider Controls */}
            <div className="flex items-center gap-6 self-start lg:self-end">
              <Link
                href="/contact-us?subject=quote"
                className="text-xs sm:text-sm font-bold text-[#2BC194] hover:text-[#4FD6AE] underline underline-offset-4 transition-colors"
              >
                Start your next project ↗
              </Link>

              {/* Prev and Next 48px Circular Controls */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full bg-white text-[#04374D] flex items-center justify-center transition-all hover:bg-slate-100 active:scale-95 shadow-sm"
                  aria-label="Previous service"
                >
                  <ChevronLeft size={22} strokeWidth={2.2} />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full bg-[#2BC194] text-[#04374D] flex items-center justify-center transition-all hover:bg-[#4FD6AE] active:scale-95 shadow-sm"
                  aria-label="Next service"
                >
                  <ChevronRight size={22} strokeWidth={2.2} />
                </button>
              </div>
            </div>
          </div>

          {/* Service Cards Grid / Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.slice(startIndex, startIndex + 3).map((service) => (
              <div
                key={service.id}
                className="group bg-[#022636] rounded-[24px] p-6 border border-white/10 flex flex-col justify-between transition-all duration-300 hover:border-[#2BC194]/40"
              >
                <div>
                  {/* Photo with 2px White Inset Border from Reference */}
                  <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden mb-6 p-1 border-2 border-white/90 shadow-inner">
                    <div className="relative w-full h-full rounded-[16px] overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Eyebrow & Title */}
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#2BC194] block mb-1">
                    {service.eyebrow}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#2BC194] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A9C2CD] leading-relaxed mb-5">
                    {service.shortDesc}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-2 mb-6">
                    {service.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#E4EEF2]">
                        <CheckCircle2 size={14} className="text-[#2BC194] mt-0.5 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={`/contact-us?subject=${encodeURIComponent(service.title)}`}
                    className="text-xs font-bold text-[#2BC194] group-hover:underline flex items-center gap-1.5"
                  >
                    <span>Request scope</span>
                    <ArrowUpRight size={14} strokeWidth={2} />
                  </Link>
                  <span className="text-[11px] font-mono text-[#A9C2CD]/60">
                    AIS / {service.slug}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
