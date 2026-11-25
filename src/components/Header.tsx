"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowUpRight, ChevronDown } from "lucide-react";
import { siteConfig } from "@/content/site";
import MobileNav from "./MobileNav";

interface HeaderProps {
  currentPath?: string;
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Our Service", href: "/services" },
  { label: "Projects", href: "/projects" },
  {
    label: "Compliance",
    href: "/compliance",
    children: [
      { label: "HSE Policy Statement", href: "/hse-policy" },
    ],
  },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Header({ currentPath = "/" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIntroActive, setIsIntroActive] = useState(false);
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keep Header inert & invisible during Home intro until handoff
  useEffect(() => {
    if (currentPath !== "/") {
      setIsIntroActive(false);
      return;
    }

    if (typeof document !== "undefined") {
      setIsIntroActive(document.documentElement.dataset.intro === "play");
    }

    const handleIntroState = (e: Event) => {
      const custom = e as CustomEvent<{ active: boolean }>;
      setIsIntroActive(Boolean(custom.detail?.active));
    };

    window.addEventListener("afroportico:intro-state", handleIntroState);
    return () => window.removeEventListener("afroportico:intro-state", handleIntroState);
  }, [currentPath]);

  const navLinks = NAV_LINKS;

  return (
    <>
      <header
        aria-hidden={isIntroActive}
        inert={isIntroActive || undefined}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-3 sm:py-4 ${
          isIntroActive
            ? "opacity-0 -translate-y-4 pointer-events-none"
            : "opacity-100 translate-y-0 pointer-events-auto"
        } ${
          isScrolled
            ? "bg-[#EEF3F5]/85 backdrop-blur-2xl shadow-[0_4px_24px_rgba(4,55,77,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="site-container">
          <div
            className={`bg-white/95 backdrop-blur-2xl rounded-full border border-white/80 shadow-[0_8px_32px_rgba(4,55,77,0.06),0_1px_3px_rgba(4,55,77,0.03)] px-4 sm:px-6 flex items-center justify-between transition-all duration-300 origin-top ${
              isScrolled ? "scale-y-[0.94] py-2" : "scale-y-100 py-2.5"
            }`}
          >
            {/* Logo Left */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#04374D] transition-transform duration-200 active:scale-95"
              aria-label="Afroportico Home"
            >
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo-mark.png"
                  alt="Afroportico Portal Emblem"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold tracking-[-0.01em] text-[#04374D] text-sm sm:text-base leading-none">
                  AFROPORTICO
                </span>
                <span className="text-[8.5px] sm:text-[9.5px] text-[#087A5E] tracking-[0.16em] uppercase font-bold mt-1 leading-none">
                  INTEGRATED SERVICES
                </span>
              </div>
            </Link>

            {/* Desktop Center Nav Links in Refined Glass Capsule with Dropdown */}
            <nav
              className="hidden lg:flex items-center gap-1 bg-[#04374D]/[0.03] p-1 rounded-full border border-[#04374D]/[0.06]"
              aria-label="Main Navigation"
            >
              {navLinks.map((link) => {
                const isActive =
                  currentPath === link.href ||
                  (link.children && link.children.some((c) => currentPath === c.href));
                return (
                  <div key={link.href} className="relative group">
                    <Link
                      href={link.href}
                      className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold tracking-wide transition-all duration-200 inline-flex items-center gap-1 ${
                        isActive
                          ? "bg-[#04374D] text-white shadow-sm font-bold"
                          : "text-[#04374D]/80 hover:text-[#04374D] hover:bg-white/80"
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.children && (
                        <ChevronDown
                          size={11}
                          className="transition-transform duration-200 group-hover:rotate-180 text-current opacity-70"
                        />
                      )}
                    </Link>

                    {link.children && (
                      <div className="absolute top-full left-0 mt-2 w-52 bg-white/95 backdrop-blur-2xl rounded-2xl border border-white/80 shadow-[0_12px_32px_rgba(4,55,77,0.12)] p-1.5 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-3.5 py-2 rounded-xl text-xs font-semibold text-[#04374D] hover:bg-[#EEF3F5] hover:text-[#087A5E] transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right Action Group */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Direct Phone Link on Desktop */}
              <a
                href={siteConfig.phoneRaw.value}
                className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#04374D] hover:bg-[#04374D]/5 transition-all"
                title="Call Warri Operations"
              >
                <span className="w-6 h-6 rounded-full bg-[#2BC194]/20 flex items-center justify-center text-[#087A5E]">
                  <Phone size={12} strokeWidth={2.2} />
                </span>
                <span>{siteConfig.phone.value}</span>
              </a>

              {/* Get a Quote Pill CTA with Sleek Microinteraction */}
              <Link
                href="/contact-us?subject=quote"
                className="hidden sm:inline-flex items-center gap-3 h-10 pl-5 pr-1.5 rounded-full bg-gradient-to-r from-[#2BC194] to-[#4FD6AE] hover:from-[#25b085] hover:to-[#3ec099] text-[#04374D] text-xs font-extrabold tracking-wide transition-all duration-300 shadow-[0_2px_12px_rgba(43,193,148,0.35)] hover:shadow-[0_4px_18px_rgba(43,193,148,0.45)] group active:scale-95"
              >
                <span>Get a Quote</span>
                <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shadow-xs">
                  <ArrowUpRight size={13} strokeWidth={2.4} className="text-[#04374D]" />
                </span>
              </Link>

              {/* 2-Line Morphing Hamburger Menu Button (400ms expo-out) */}
              <button
                ref={hamburgerBtnRef}
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative w-10 h-10 rounded-full flex flex-col items-center justify-center text-[#04374D] hover:bg-[#04374D]/5 active:scale-[0.92] transition-all focus:outline-none focus:ring-2 focus:ring-[#2BC194]"
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <span
                  className={`w-5 h-[2px] bg-[#04374D] rounded-full transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                    isMobileMenuOpen
                      ? "translate-y-[1px] rotate-45"
                      : "-translate-y-[3.5px] rotate-0"
                  }`}
                />
                <span
                  className={`w-5 h-[2px] bg-[#04374D] rounded-full transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                    isMobileMenuOpen
                      ? "-translate-y-[1px] -rotate-45"
                      : "translate-y-[3.5px] rotate-0"
                  }`}
                />
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
        triggerRef={hamburgerBtnRef}
      />
    </>
  );
}
