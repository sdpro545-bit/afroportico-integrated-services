"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, BadgeCheck, ClipboardCheck, CalendarCheck, ArrowUpRight } from "lucide-react";
import { featureCards } from "@/content/site";

const iconMap = {
  ShieldCheck,
  BadgeCheck,
  ClipboardCheck,
  CalendarCheck,
};

export default function FeatureCards() {
  return (
    <section className="py-6 sm:py-10" aria-label="Key Pillars">
      <div className="site-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 reveal-stagger">
          {featureCards.map((card) => {
            const IconComponent = iconMap[card.icon as keyof typeof iconMap] || ShieldCheck;

            return (
              <div
                key={card.id}
                className="card-hover-effect group relative bg-white rounded-[20px] p-5 sm:p-7 border border-[rgba(4,55,77,0.12)] shadow-[0_1px_2px_rgba(4,55,77,0.06),0_12px_32px_rgba(4,55,77,0.08)] flex flex-col justify-between transition-all duration-300 sm:min-h-[260px]"
              >
                {/* Top Row: Bare Lucide Icon (Navy, stroke 1.75) */}
                <div>
                  <div className="text-[#04374D] mb-4">
                    <IconComponent size={28} strokeWidth={1.75} />
                  </div>

                  {/* Hairline across card with small teal dot at right end */}
                  <div className="relative w-full h-[1px] bg-[rgba(4,55,77,0.12)] mb-5">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#2BC194]" />
                  </div>

                  {/* Title & Body */}
                  <h3 className="text-lg font-bold text-[#04374D] mb-2 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#3D5A68] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Row: Notched Corner Arrow Button */}
                <div className="pt-6 flex justify-end">
                  <Link
                    href={card.link}
                    className="w-11 h-11 rounded-full bg-[#EEF3F5] group-hover:bg-[#2BC194] text-[#04374D] flex items-center justify-center transition-all duration-300 transform group-hover:scale-105"
                    aria-label={`Learn more about ${card.title}`}
                  >
                    <ArrowUpRight
                      size={18}
                      strokeWidth={2}
                      className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
