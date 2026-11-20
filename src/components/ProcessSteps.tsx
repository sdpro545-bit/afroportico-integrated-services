"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stepsData } from "@/content/site";

export default function ProcessSteps() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const progressLine = progressLineRef.current;
    if (!section || !progressLine) return;

    const ctx = gsap.context(() => {
      // Scale progress line as user scrolls through the steps
      gsap.fromTo(
        progressLine,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.8,
          },
        }
      );

      // Animate numbers counting and fading in
      const stepItems = section.querySelectorAll(".process-step-item");
      stepItems.forEach((item, index) => {
        const numEl = item.querySelector(".step-number");
        if (numEl) {
          gsap.fromTo(
            numEl,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.12,
              ease: "cubic-bezier(0.16, 1, 0.3, 1)",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-20 lg:py-24 relative"
      aria-label="Process Steps"
    >
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

        {/* Relative Container for Steps & Scrub Progress Line */}
        <div className="relative">
          {/* Subtle Track Line Behind Steps on Desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[5%] right-[5%] h-[2px] bg-[rgba(4,55,77,0.1)] -z-0">
            <div
              ref={progressLineRef}
              className="w-full h-full bg-[#2BC194] origin-left will-change-transform"
            />
          </div>

          {/* 4 Across Step Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 reveal-stagger relative z-10">
            {stepsData.map((step) => (
              <div
                key={step.number}
                className="process-step-item relative p-6 sm:p-7 rounded-[24px] bg-white border border-[rgba(4,55,77,0.12)] shadow-[0_1px_2px_rgba(4,55,77,0.06),0_12px_32px_rgba(4,55,77,0.08)] flex flex-col justify-between group hover:-translate-y-1 hover:border-[#2BC194]/40 hover:shadow-[0_16px_36px_rgba(4,55,77,0.12)] transition-all duration-300"
              >
                <div>
                  {/* Big Number matching reference with count/fade entrance */}
                  <span className="step-number text-4xl sm:text-5xl lg:text-6xl font-bold text-[rgba(4,55,77,0.14)] block mb-4 group-hover:text-[#2BC194] transition-colors tabular-nums">
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
                  <span className="w-2 h-2 rounded-full bg-[#2BC194] transition-transform duration-300 group-hover:scale-125" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
