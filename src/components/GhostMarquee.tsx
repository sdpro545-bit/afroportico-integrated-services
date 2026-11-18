"use client";

import React from "react";

export default function GhostMarquee() {
  const textItems = [
    "Engineering, Procurement, Contracting",
    "Mechanical & Electrical Services",
    "Oil & Gas EPC Support",
    "Industrial Facility Management",
  ];

  return (
    <section className="py-6 sm:py-10 overflow-hidden select-none border-y border-[rgba(4,55,77,0.08)] bg-white/40" aria-hidden="true">
      <div className="relative flex whitespace-nowrap overflow-hidden">
        {/* Continuous Marquee Track */}
        <div className="flex animate-marquee gap-8 sm:gap-12 items-center">
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
