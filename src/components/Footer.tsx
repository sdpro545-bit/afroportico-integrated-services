"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, ArrowUpRight, Mail } from "lucide-react";
import { siteConfig } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-[#04374D] text-[#E4EEF2] rounded-t-[28px] pt-16 pb-12 mt-12 sm:mt-16 border-t border-white/10">
      <div className="site-container">
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Column (Col 1-5) */}
          <div className="lg:col-span-5">
            {/* Logo on White Rounded Tile per Section 5.3 */}
            <Link href="/" className="inline-flex items-center gap-3.5 mb-6 focus:outline-none">
              <div className="bg-white p-2.5 rounded-2xl flex items-center justify-center shadow-md">
                <Image
                  src="/logo-mark.png"
                  alt="Afroportico Portal Emblem"
                  width={42}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-white tracking-tight text-lg block leading-none">
                  AFROPORTICO
                </span>
                <span className="text-[10px] text-[#2BC194] tracking-widest uppercase font-semibold mt-1 block leading-none">
                  Integrated Services Limited
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#A9C2CD] leading-relaxed max-w-sm mb-6">
              Afroportico Integrated Services Limited delivers quality mechanical, electrical and facility services with a focus on safety, reliability and client satisfaction.
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#2BC194]">
              <span className="w-2 h-2 rounded-full bg-[#2BC194]" />
              CAC Verified Enterprise • Warri, Delta State
            </div>
          </div>

          {/* Quick Links Column (Col 6-7) */}
          <div className="lg:col-span-2">
            <h4 style={{ color: "#FFFFFF" }} className="text-xs font-bold uppercase tracking-widest !text-white mb-5">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-[#A9C2CD]">
              <li>
                <Link href="/" className="hover:text-[#2BC194] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-[#2BC194] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#2BC194] transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#2BC194] transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="hover:text-[#2BC194] transition-colors">
                  Compliance
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-[#2BC194] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column (Col 8-9) */}
          <div className="lg:col-span-2">
            <h4 style={{ color: "#FFFFFF" }} className="text-xs font-bold uppercase tracking-widest !text-white mb-5">
              Resources
            </h4>
            <ul className="space-y-3 text-sm text-[#A9C2CD]">
              <li>
                <Link href="/hse-policy" className="hover:text-[#2BC194] transition-colors">
                  HSE Policy
                </Link>
              </li>
              <li>
                <Link href="/compliance#quality" className="hover:text-[#2BC194] transition-colors">
                  Quality Statement
                </Link>
              </li>
              <li>
                <Link href="/contact-us#faq" className="hover:text-[#2BC194] transition-colors">
                  Technical FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact-us?subject=quote" className="hover:text-[#2BC194] transition-colors">
                  Request a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch Column (Col 10-12) */}
          <div className="lg:col-span-3">
            <h4 style={{ color: "#FFFFFF" }} className="text-xs font-bold uppercase tracking-widest !text-white mb-5">
              Get in Touch
            </h4>
            <div className="space-y-4 text-sm text-[#A9C2CD]">
              <a
                href={siteConfig.phoneRaw.value}
                className="flex items-start gap-3 text-white hover:text-[#2BC194] transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#2BC194] flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Phone size={15} strokeWidth={1.75} />
                </span>
                <div>
                  <span className="text-[11px] text-[#A9C2CD] block uppercase tracking-wider font-semibold">
                    Direct Operations
                  </span>
                  <span className="font-bold text-sm block mt-0.5">
                    {siteConfig.phone.value}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${siteConfig.email.value}`}
                className="flex items-start gap-3 text-white hover:text-[#2BC194] transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#2BC194] flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Mail size={15} strokeWidth={1.75} />
                </span>
                <div>
                  <span className="text-[11px] text-[#A9C2CD] block uppercase tracking-wider font-semibold">
                    Email Inquiry
                  </span>
                  <span className="font-bold text-sm block mt-0.5">
                    {siteConfig.email.value}
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-3 pt-2">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#2BC194] flex-shrink-0 mt-0.5">
                  <MapPin size={15} strokeWidth={1.75} />
                </span>
                <div>
                  <span className="text-[11px] text-[#A9C2CD] block uppercase tracking-wider font-semibold">
                    Head Office
                  </span>
                  <span className="text-xs text-[#E4EEF2] block mt-0.5 leading-relaxed">
                    {siteConfig.address.value}
                  </span>
                  <a
                    href={siteConfig.mapsUrl.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2BC194] hover:underline mt-1.5"
                  >
                    <span>Open in Google Maps</span>
                    <ArrowUpRight size={11} strokeWidth={2} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A9C2CD]">
          <p>© 2026 Afroportico Integrated Services Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
