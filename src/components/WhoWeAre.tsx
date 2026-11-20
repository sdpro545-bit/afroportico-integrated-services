"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Phone, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { whoWeAreContent, companyStats } from "@/content/site";
import {
  AirConditioningIllustration,
  IndustrialFacilityIllustration,
} from "./illustrations/EngineeringIllustrations";

function StatCounter({
  target,
  suffix,
  status,
  placeholder,
}: {
  target: number;
  suffix: string;
  status: "approved" | "draft" | "pending";
  placeholder: string;
}) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (status === "pending" || !numberRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      if (numberRef.current) numberRef.current.textContent = String(target);
      return;
    }

    const obj = { val: 0 };
    const el = numberRef.current;

    const anim = gsap.to(obj, {
      val: target,
      duration: 1.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        once: true,
      },
      onUpdate: () => {
        if (el) {
          el.textContent = String(Math.floor(obj.val));
        }
      },
    });

    return () => {
      anim.kill();
    };
  }, [target, status]);

  if (status === "pending") {
    return (
      <div className="flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-[#04374D]/35 font-mono">
          --
        </span>
        <span className="text-[10px] uppercase font-bold tracking-wider text-[#087A5E] bg-[#2BC194]/15 px-2 py-0.5 rounded-full">
          Pending Verification
        </span>
      </div>
    );
  }

  return (
    <div className="text-3xl sm:text-4xl font-extrabold text-[#04374D] tracking-tight">
      <span ref={numberRef}>0</span>
      <span className="text-[#2BC194]">{suffix}</span>
    </div>
  );
}

export default function WhoWeAre() {
  const [activeTab, setActiveTab] = useState<"mission" | "vision" | "history">("mission");
  const [isPaused, setIsPaused] = useState(false);

  // Automatically cycle through tabs
  useEffect(() => {
    if (isPaused) return;
    const tabs: ("mission" | "vision" | "history")[] = ["mission", "vision", "history"];
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const nextIdx = (tabs.indexOf(prev) + 1) % tabs.length;
        return tabs[nextIdx];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="py-12 sm:py-20 lg:py-24 overflow-hidden"
      id="about"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="site-container">
        {/* Top Split: Notched Image & Editorial Story with Auto-Switching Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-20">
          {/* Left Column: Asymmetrical Notched Image Composition with Apple-grade clip reveal */}
          <div className="lg:col-span-5 relative">
            <div className="reveal-image-clip relative rounded-[28px] overflow-hidden bg-[#04374D] border border-[rgba(4,55,77,0.12)] shadow-[0_1px_2px_rgba(4,55,77,0.06),0_12px_32px_rgba(4,55,77,0.08)] aspect-[4/5] sm:aspect-[3/4]">
              <Image
                src={whoWeAreContent.mainImage}
                alt="Afroportico technical lead on site in Delta State"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04374D]/80 via-transparent to-transparent" />

              {/* Inverted Corner Badge overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-[16px] bg-white/95 backdrop-blur-md border border-white/40 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-[#087A5E] block">
                    Head Office &amp; Operations
                  </span>
                  <span className="text-xs font-bold text-[#04374D] block mt-0.5">
                    Warri, Delta State, Nigeria
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#2BC194] flex items-center justify-center text-[#04374D] font-bold text-xs">
                  AIS
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Copy, Tabs, Check List & Call Prompt */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#087A5E] mb-2 block reveal-fade">
              {whoWeAreContent.eyebrow}
            </span>

            {/* H2 Title with highlight */}
            <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-semibold tracking-[-0.025em] text-[#04374D] leading-[1.18] mb-6 reveal-title">
              {whoWeAreContent.titlePart1}
              <span className="text-[#087A5E]">{whoWeAreContent.highlightText}</span>
            </h2>

            {/* Tab Pills */}
            <div className="flex flex-wrap items-center gap-3 mb-6" role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === "mission"}
                onClick={() => setActiveTab("mission")}
                className={`h-10 px-5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === "mission"
                    ? "bg-[#2BC194] text-[#04374D] shadow-sm"
                    : "bg-white border border-[rgba(4,55,77,0.12)] text-[#04374D] hover:bg-[#EEF3F5]"
                }`}
              >
                Our Mission
              </button>

              <button
                role="tab"
                aria-selected={activeTab === "vision"}
                onClick={() => setActiveTab("vision")}
                className={`h-10 px-5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === "vision"
                    ? "bg-[#2BC194] text-[#04374D] shadow-sm"
                    : "bg-white border border-[rgba(4,55,77,0.12)] text-[#04374D] hover:bg-[#EEF3F5]"
                }`}
              >
                Our Vision
              </button>

              <button
                role="tab"
                aria-selected={activeTab === "history"}
                onClick={() => setActiveTab("history")}
                className={`h-10 px-5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === "history"
                    ? "bg-[#2BC194] text-[#04374D] shadow-sm"
                    : "bg-white border border-[rgba(4,55,77,0.12)] text-[#04374D] hover:bg-[#EEF3F5]"
                }`}
              >
                Our History
              </button>
            </div>

            {/* Tab Content Cross-fade Area */}
            <div className="min-h-[72px] mb-6">
              {activeTab === "mission" && (
                <p className="text-base text-[#04374D] font-medium leading-relaxed bg-white/70 p-4 rounded-xl border border-[rgba(4,55,77,0.08)] animate-[fadeIn_0.3s_ease-out]">
                  {whoWeAreContent.missionTab.content}
                </p>
              )}
              {activeTab === "vision" && (
                <p className="text-base text-[#04374D] font-medium leading-relaxed bg-white/70 p-4 rounded-xl border border-[rgba(4,55,77,0.08)] animate-[fadeIn_0.3s_ease-out]">
                  {whoWeAreContent.visionTab.content}
                </p>
              )}
              {activeTab === "history" && (
                <p className="text-base text-[#04374D] font-medium leading-relaxed bg-white/70 p-4 rounded-xl border border-[rgba(4,55,77,0.08)] animate-[fadeIn_0.3s_ease-out]">
                  {whoWeAreContent.historyTab.content}
                </p>
              )}
            </div>

            {/* Inset Photo + Checklist Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-8">
              <div className="sm:col-span-5 relative h-36 rounded-2xl overflow-hidden border border-[rgba(4,55,77,0.12)]">
                <Image
                  src={whoWeAreContent.smallImage}
                  alt="Engineering fabrication and maintenance"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="sm:col-span-7 space-y-3">
                {whoWeAreContent.checklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#2BC194] flex items-center justify-center text-[#04374D] flex-shrink-0">
                      <Check size={13} strokeWidth={2.5} />
                    </span>
                    <span className="text-sm font-semibold text-[#04374D]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call Action Bar */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[rgba(4,55,77,0.1)]">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[#2BC194]/20 flex items-center justify-center text-[#087A5E]">
                  <Phone size={18} strokeWidth={2.2} />
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#3D5A68] block">
                    {whoWeAreContent.callPrompt}
                  </span>
                  <a
                    href={whoWeAreContent.phoneRaw}
                    className="text-sm font-bold text-[#04374D] hover:text-[#087A5E] transition-colors"
                  >
                    {whoWeAreContent.phoneDisplay}
                  </a>
                </div>
              </div>

              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#087A5E] hover:text-[#04374D] transition-colors ml-auto"
              >
                <span>Read Full Company Profile</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section: Three Stat Cards & Two Supporting Line Illustrations */}
        <div className="pt-10 border-t border-[rgba(4,55,77,0.12)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 3 Stat Cards in Same Pattern (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 reveal-stagger">
              {companyStats.map((stat) => (
                <div
                  key={stat.id}
                  className="bg-white rounded-[22px] p-5 sm:p-6 border border-[rgba(4,55,77,0.1)] shadow-sm hover:shadow-md hover:border-[#2BC194]/30 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3D5A68] block mb-2">
                      {stat.label}
                    </span>
                    <StatCounter
                      target={stat.targetNumber}
                      suffix={stat.suffix}
                      status={stat.status}
                      placeholder={stat.value}
                    />
                  </div>
                  <p className="text-xs text-[#3D5A68] leading-relaxed font-normal">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Two Supporting Line Illustrations (5 cols) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-[22px] p-4 border border-[rgba(4,55,77,0.1)] shadow-sm flex flex-col items-center text-center hover:border-[#2BC194]/40 transition-colors">
                <div className="w-full h-28 flex items-center justify-center mb-2">
                  <AirConditioningIllustration className="w-full h-full object-contain" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#04374D]">
                  HVAC &amp; Refrigeration
                </span>
                <span className="text-[10px] text-[#3D5A68] mt-0.5">
                  Engineered Cooling Loops
                </span>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-[22px] p-4 border border-[rgba(4,55,77,0.1)] shadow-sm flex flex-col items-center text-center hover:border-[#2BC194]/40 transition-colors">
                <div className="w-full h-28 flex items-center justify-center mb-2">
                  <IndustrialFacilityIllustration className="w-full h-full object-contain" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#04374D]">
                  Industrial Plants
                </span>
                <span className="text-[10px] text-[#3D5A68] mt-0.5">
                  EPC &amp; Flow Facilities
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
