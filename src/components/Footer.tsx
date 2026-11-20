"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, ArrowUpRight, Mail } from "lucide-react";
import { siteConfig } from "@/content/site";

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.2 22 12z" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#04374D] text-[#E4EEF2] rounded-t-[28px] pt-16 pb-12 mt-12 sm:mt-16 border-t border-white/10">
      <div className="site-container">
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Column (Col 1-5) */}
          <div className="lg:col-span-5">
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
              Quality mechanical, electrical and facility services with a focus on safety, reliability and client satisfaction.
            </p>

            {/* Social Icons (LinkedIn & Facebook) */}
            <div className="flex items-center gap-3 mb-6">
              <a
                href={siteConfig.socialLinks.linkedin.value !== "[LINKEDIN_URL]" ? siteConfig.socialLinks.linkedin.value : "#"}
                aria-label="Afroportico on LinkedIn (Pending)"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#2BC194] hover:text-[#04374D] text-white flex items-center justify-center transition-all duration-300 shadow-xs"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.facebook.value !== "[FACEBOOK_URL]" ? siteConfig.socialLinks.facebook.value : "#"}
                aria-label="Afroportico on Facebook (Pending)"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#2BC194] hover:text-[#04374D] text-white flex items-center justify-center transition-all duration-300 shadow-xs"
                title="Facebook Profile"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#2BC194]">
              <span className="w-2 h-2 rounded-full bg-[#2BC194]" />
              CAC Verified Enterprise • Warri, Delta State
            </div>
          </div>

          {/* Company Column (Col 6-7) */}
          <div className="lg:col-span-2">
            <h4 style={{ color: "#FFFFFF" }} className="text-xs font-bold uppercase tracking-widest !text-white mb-5">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-[#A9C2CD]">
              <li>
                <Link href="/about-us" className="hover:text-[#2BC194] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#2BC194] transition-colors">
                  Services
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
                  FAQs
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
          <p>© {currentYear} Afroportico Integrated Services Limited. All rights reserved.</p>
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
