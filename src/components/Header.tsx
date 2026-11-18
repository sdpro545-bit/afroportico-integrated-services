"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowUpRight, Menu, X } from "lucide-react";
import { siteConfig } from "@/content/site";
import MobileNav from "./MobileNav";

interface HeaderProps {
  currentPath?: string;
}

export default function Header({ currentPath = "/" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Compliance", href: "/compliance" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-3 sm:py-4 ${
          isScrolled ? "bg-[#EEF3F5]/80 backdrop-blur-xl shadow-[0_4px_20px_rgba(4,55,77,0.04)]" : "bg-transparent"
        }`}
      >
        <div className="site-container">
          <div className="bg-white/85 backdrop-blur-2xl rounded-full border border-white/60 shadow-[0_4px_30px_rgba(4,55,77,0.06)] px-4 sm:px-6 py-2 flex items-center justify-between transition-all duration-300">
            {/* Desktop Left Nav Links (Apple sleek typography) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = currentPath === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                      isActive
                        ? "bg-[#EEF3F5] text-[#087A5E] font-bold"
                        : "text-[#04374D]/80 hover:text-[#04374D] hover:bg-[#EEF3F5]/60"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Logo Center */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#04374D] transition-transform duration-200 active:scale-95"
              aria-label="Afroportico Home"
            >
              <div className="relative w-9 h-7 sm:w-10 sm:h-8 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo-mark.png"
                  alt="Afroportico Portal Emblem"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold tracking-tight text-[#04374D] text-sm sm:text-base leading-none">
                  AFROPORTICO
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#3D5A68] tracking-widest uppercase font-medium mt-0.5 leading-none">
                  Integrated Services
                </span>
              </div>
            </Link>

            {/* Right Action Group */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Direct Phone Link */}
              <a
                href={siteConfig.phoneRaw.value}
                className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#04374D] hover:bg-[#EEF3F5] transition-all"
                title="Call Warri Operations"
              >
                <span className="w-7 h-7 rounded-full bg-[#EEF3F5] flex items-center justify-center text-[#04374D]">
                  <Phone size={13} strokeWidth={2} />
                </span>
                <span className="hidden xl:inline">{siteConfig.phone.value}</span>
              </a>

              {/* Get a Quote Pill CTA with Apple microinteraction */}
              <Link
                href="/contact-us?subject=quote"
                className="hidden sm:inline-flex items-center gap-2.5 h-10 pl-5 pr-1.5 rounded-full bg-[#2BC194] hover:bg-[#4FD6AE] text-[#04374D] text-xs font-bold transition-all duration-300 shadow-sm hover:shadow-[0_2px_12px_rgba(43,193,148,0.35)] group active:scale-95"
              >
                <span>Get a Quote</span>
                <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={13} strokeWidth={2.4} className="text-[#04374D]" />
                </span>
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-full text-[#04374D] hover:bg-[#EEF3F5] active:scale-95 focus:outline-none"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
        currentPath={currentPath}
      />
    </>
  );
}
