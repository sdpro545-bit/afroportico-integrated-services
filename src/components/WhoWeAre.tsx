"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Phone, ArrowUpRight } from "lucide-react";
import { whoWeAreContent } from "@/content/site";

export default function WhoWeAre() {
  const [activeTab, setActiveTab] = useState<"mission" | "vision" | "history">("mission");

  return (
    <section className="py-12 sm:py-20 lg:py-24 overflow-hidden" id="about">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Asymmetrical Notched Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[28px] overflow-hidden bg-[#04374D] border border-[rgba(4,55,77,0.12)] shadow-[0_1px_2px_rgba(4,55,77,0.06),0_12px_32px_rgba(4,55,77,0.08)] aspect-[4/5] sm:aspect-[3/4]">
              <Image
                src={whoWeAreContent.mainImage}
                alt="Afroportico technical lead on site in Delta State"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04374D]/80 via-transparent to-transparent" />

              {/* Inverted Corner Badge overlay matching reference */}
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

          {/* Right Column: Copy, Tabs, Check List & Call Block */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#087A5E] mb-2 block">
              {whoWeAreContent.eyebrow}
            </span>

            {/* H2 Title with highlight */}
            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-[#04374D] leading-[1.15] mb-6">
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
                <p className="text-base text-[#04374D] font-medium leading-relaxed bg-white/70 p-4 rounded-xl border border-[rgba(4,55,77,0.08)]">
                  {whoWeAreContent.missionTab.content}
                </p>
              )}
              {activeTab === "vision" && (
                <p className="text-base text-[#04374D] font-medium leading-relaxed bg-white/70 p-4 rounded-xl border border-[rgba(4,55,77,0.08)]">
                  To be Nigeria&apos;s foremost multi-disciplinary engineering contractor, synonymous with uncompromising safety, technical precision, and enduring client partnership.
                </p>
              )}
              {activeTab === "history" && (
                <p className="text-base text-[#04374D] font-medium leading-relaxed bg-white/70 p-4 rounded-xl border border-[rgba(4,55,77,0.08)]">
                  Established in Warri to deliver integrated engineering solutions that combine local operational agility with international technical and safety benchmarks.
                </p>
              )}
            </div>

            {/* Inset Photo + Checklist Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-8">
              {/* Small Inset Photo with sparks/welding */}
              <div className="sm:col-span-5 relative h-36 rounded-2xl overflow-hidden border border-[rgba(4,55,77,0.12)]">
                <Image
                  src={whoWeAreContent.smallImage}
                  alt="Engineering fabrication and maintenance"
                  fill
                  className="object-cover"
                />
              </div>

              {/* 3-Item Check List */}
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

            {/* Bottom Row: Outline Know More Button + Call Block */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[rgba(4,55,77,0.12)]">
              <Link
                href="/about-us"
                className="inline-flex items-center gap-3.5 h-12 pl-6 pr-2 rounded-full bg-white border border-[rgba(4,55,77,0.2)] hover:border-[#2BC194] text-[#04374D] text-xs font-bold transition-all group"
              >
                <span>Know More</span>
                <span className="w-8 h-8 rounded-full bg-[#2BC194] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowUpRight size={14} strokeWidth={2.2} className="text-[#04374D]" />
                </span>
              </Link>

              {/* Direct Call Block */}
              <a
                href={whoWeAreContent.phoneRaw}
                className="flex items-center gap-3 group"
              >
                <span className="w-11 h-11 rounded-full bg-[#04374D] text-[#2BC194] flex items-center justify-center transition-transform group-hover:scale-105">
                  <Phone size={18} strokeWidth={1.75} />
                </span>
                <div>
                  <span className="text-[11px] text-[#3D5A68] uppercase font-semibold block leading-tight">
                    {whoWeAreContent.callPrompt}
                  </span>
                  <span className="text-sm font-bold text-[#04374D] group-hover:text-[#087A5E] transition-colors block leading-tight">
                    {whoWeAreContent.phoneDisplay}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
