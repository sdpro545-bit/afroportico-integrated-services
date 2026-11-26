"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { complianceResources } from "@/content/site";

export default function ComplianceResources() {
  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-white/50 border-t border-[rgba(4,55,77,0.08)]">
      <div className="site-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[13px] font-bold uppercase tracking-wider text-[#087A5E] mb-2 block reveal-fade">
            Compliance
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#04374D] reveal-title">
            Compliance and HSE resources
          </h2>
        </div>

        {/* 3 Across Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal-stagger">
          {complianceResources.map((card) => (
            <div
              key={card.id}
              className="group bg-white rounded-[24px] overflow-hidden border border-[rgba(4,55,77,0.12)] shadow-[0_1px_2px_rgba(4,55,77,0.06),0_12px_32px_rgba(4,55,77,0.08)] flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Clean Unobstructed Photo Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#04374D]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-[#087A5E] mb-2">
                    {card.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#04374D] group-hover:text-[#087A5E] transition-colors mb-2.5">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#3D5A68] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0">
                <Link
                  href={card.link}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#04374D] group-hover:text-[#087A5E] transition-colors"
                >
                  <span>Read framework</span>
                  <span className="w-6 h-6 rounded-full bg-[#EEF3F5] group-hover:bg-[#2BC194] flex items-center justify-center transition-colors">
                    <ArrowUpRight size={13} strokeWidth={2.2} />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
