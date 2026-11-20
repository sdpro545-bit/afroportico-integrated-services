"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ArrowUpRight, Phone, Mail } from "lucide-react";
import gsap from "gsap";
import { siteConfig } from "@/content/site";
import { pauseLenis, resumeLenis } from "./ScrollAnimationProvider";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{
    label: string;
    href: string;
    children?: Array<{ label: string; href: string }>;
  }>;
  currentPath: string;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export default function MobileNav({
  isOpen,
  onClose,
  links,
  currentPath,
  triggerRef,
}: MobileNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Build reversible GSAP timeline
    const linkItems = linksContainerRef.current?.querySelectorAll(".nav-link-inner");
    const linkIndices = linksContainerRef.current?.querySelectorAll(".nav-link-index");

    const tl = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.visibility = "hidden";
        }
        document.body.style.overflow = "";
        resumeLenis();
        // Return focus to trigger button
        triggerRef?.current?.focus();
      },
    });

    if (prefersReducedMotion) {
      tl.to(overlay, {
        opacity: 1,
        duration: 0.2,
        ease: "power1.out",
      });
    } else {
      // 1. Expanding circle clip-path from hamburger button position
      tl.fromTo(
        overlay,
        {
          clipPath: "circle(0px at calc(100% - 44px) 40px)",
          opacity: 1,
        },
        {
          clipPath: "circle(150% at calc(100% - 44px) 40px)",
          duration: 0.9,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        }
      );

      // 2. Links slide up from yPercent:110 in overflow:hidden masks (starts at 40% open = 0.36s)
      if (linkItems && linkItems.length > 0) {
        tl.fromTo(
          linkItems,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.75,
            stagger: 0.07,
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          },
          0.36
        );
      }

      if (linkIndices && linkIndices.length > 0) {
        tl.fromTo(
          linkIndices,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.07,
            ease: "power2.out",
          },
          0.4
        );
      }

      // 3. Footer CTA, phone and email fade up last
      if (footerRef.current) {
        tl.fromTo(
          footerRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          },
          0.65
        );
      }
    }

    tlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [links, triggerRef]);

  // Handle open/close animation changes
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (isOpen) {
      if (containerRef.current) {
        containerRef.current.style.visibility = "visible";
      }
      document.body.style.overflow = "hidden";
      pauseLenis();
      tl.timeScale(1).play();

      // Focus first focusable element inside drawer
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 100);
    } else {
      // Close in reverse with 0.6s equivalent speed
      tl.timeScale(1.5).reverse();
    }
  }, [isOpen]);

  // Trap focus & Escape listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const focusable = containerRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ visibility: "hidden" }}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Fullscreen Circular Expanding Curtain */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-[#04374D] text-[#E4EEF2] flex flex-col justify-between p-6 sm:p-10 pointer-events-auto border-l border-white/10 ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Top Header Row with Logo & Close */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#2BC194] rounded-2xl"
          >
            <div className="bg-white p-2 rounded-2xl flex items-center justify-center shadow-md">
              <Image
                src="/logo-mark.png"
                alt="Afroportico Portal Emblem"
                width={32}
                height={24}
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-extrabold text-white tracking-tight text-base block leading-none">
                AFROPORTICO
              </span>
              <span className="text-[9px] text-[#2BC194] tracking-widest uppercase mt-1 block leading-none font-semibold">
                Integrated Services
              </span>
            </div>
          </Link>

          {/* Close Button */}
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="relative w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:scale-92 text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#2BC194]"
            aria-label="Close navigation"
          >
            <X size={20} strokeWidth={2} className="transition-transform duration-300 hover:rotate-90" />
          </button>
        </div>

        {/* Links Container with Overflow-Hidden Line Masks & Dimming Effect */}
        <nav
          ref={linksContainerRef}
          className="my-auto py-6 space-y-3"
          aria-label="Mobile Navigation Links"
        >
          {links.map((link, idx) => {
            const isActive =
              currentPath === link.href ||
              (link.children && link.children.some((c) => currentPath === c.href));
            const isDimmed = hoveredIdx !== null && hoveredIdx !== idx;

            return (
              <div
                key={link.href}
                className="overflow-hidden py-1 transition-opacity duration-300"
                style={{ opacity: isDimmed ? 0.4 : 1 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className="nav-link-inner flex items-center justify-between">
                  <div className="relative inline-block">
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`text-3xl sm:text-4xl font-semibold tracking-tight transition-colors duration-300 block py-1 ${
                        isActive ? "text-[#2BC194]" : "text-white hover:text-[#2BC194]"
                      }`}
                    >
                      {link.label}
                    </Link>

                    {/* Teal Underline that draws left-to-right for active link */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2BC194] origin-left animate-[scaleX_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]" />
                    )}
                  </div>

                  <span className="nav-link-index text-xs font-mono text-white/35 tracking-widest">
                    0{idx + 1}
                  </span>
                </div>

                {/* Sub-links (e.g. HSE Policy Statement) */}
                {link.children && (
                  <div className="pl-4 mt-2 space-y-1.5 border-l border-white/15">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onClose}
                        className="block py-1 text-sm font-medium text-[#2BC194] hover:text-white transition-colors"
                      >
                        ↳ {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer Group (CTA, Phone & Email) */}
        <div ref={footerRef} className="pt-6 border-t border-white/10 space-y-4">
          <Link
            href="/contact-us?subject=quote"
            onClick={onClose}
            className="w-full flex items-center justify-between h-13 px-6 rounded-full bg-gradient-to-r from-[#2BC194] to-[#4FD6AE] hover:from-[#25b085] hover:to-[#3ec099] text-[#04374D] font-extrabold text-xs sm:text-sm tracking-wide transition-all shadow-lg active:scale-[0.97]"
          >
            <span>Request a Quote</span>
            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs">
              <ArrowUpRight size={15} strokeWidth={2.4} className="text-[#04374D]" />
            </span>
          </Link>

          <div className="flex items-center justify-between text-xs text-[#A9C2CD] pt-1">
            <a
              href={siteConfig.phoneRaw.value}
              className="flex items-center gap-2 hover:text-[#2BC194] transition-colors"
            >
              <Phone size={13} className="text-[#2BC194]" />
              <span>{siteConfig.phone.value}</span>
            </a>
            <span className="text-white/20">•</span>
            <span className="text-[#A9C2CD]">Warri, Delta State</span>
          </div>
        </div>
      </div>
    </div>
  );
}
