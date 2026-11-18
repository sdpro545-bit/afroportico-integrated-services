"use client";

import React from "react";
import { stepsData } from "@/content/site";

export default function ProcessSteps() {
  return (
    <section className="py-12 sm:py-20 lg:py-24" aria-label="Process Steps">
      <div className="site-container">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <span className="text-[13px] font-bold uppercase tracking-wider text-[#087A5E] mb-2 block reveal-fade">
            Execution Framework
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-bold text-[#04374D] reveal-title">
            How we work with you
          </h2>
        </div>

        {/* 4 Across Step Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 reveal-stagger">
          {stepsData.map((step) => (
            <div
              key={step.number}
              className="relative p-6 sm:p-7 rounded-[24px] bg-white border border-[rgba(4,55,77,0.12)] shadow-[0_1px_2px_rgba(4,55,77,0.06),0_12px_32px_rgba(4,55,77,0.08)] flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Big Faded Number matching reference */}
                <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[rgba(4,55,77,0.14)] block mb-4 group-hover:text-[#2BC194] transition-colors tabular-nums">
                  {step.number}
                </span>

                {/* Step Title */}
                <h3 className="text-xl font-bold text-[#04374D] mb-3">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm text-[#3D5A68] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Bottom Hairline */}
              <div className="mt-6 pt-4 border-t border-[rgba(4,55,77,0.08)] flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#087A5E] uppercase tracking-wider">
                  Phase {step.number}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#2BC194]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
