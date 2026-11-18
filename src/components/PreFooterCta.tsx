"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { siteConfig } from "@/content/site";

export default function PreFooterCta() {
  return (
    <section className="py-12 sm:py-16">
      <div className="site-container">
        {/* Banner with turquoise accent & deep navy text */}
        <div className="rounded-[28px] bg-gradient-to-r from-[#2BC194] to-[#4FD6AE] p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-lg">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#04374D] block mb-2 opacity-80">
              Direct Engineering Consultation
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-0.025em] text-[#04374D] leading-tight mb-3">
              Tell us what you need.
            </h2>
            <p className="text-base sm:text-lg text-[#04374D] font-normal leading-relaxed opacity-90">
              Send the scope, the site and the timeline. We will come back to you.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact-us?subject=quote"
              className="inline-flex items-center gap-4 h-14 pl-7 pr-2.5 rounded-full bg-[#04374D] hover:bg-[#022636] text-white font-semibold text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] group"
            >
              <span>Get a Quote</span>
              <span className="w-9 h-9 rounded-full bg-[#2BC194] text-[#04374D] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={16} strokeWidth={2.2} />
              </span>
            </Link>

            <a
              href={siteConfig.phoneRaw.value}
              className="inline-flex items-center gap-2 h-14 px-6 rounded-full bg-white/40 hover:bg-white/60 text-[#04374D] font-bold text-sm transition-all"
            >
              <Phone size={16} strokeWidth={2} />
              <span>{siteConfig.phone.value}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
