"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ArrowUpRight } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{
    label: string;
    href: string;
    children?: Array<{ label: string; href: string }>;
  }>;
  currentPath: string;
}

export default function MobileNav({ isOpen, onClose, links, currentPath }: MobileNavProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#04374D]/95 backdrop-blur-3xl text-[#E4EEF2] flex flex-col justify-between p-6 sm:p-10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-8 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      {/* Top Bar with Minimal Sleek Tile */}
      <div className="flex items-center justify-between">
        <Link href="/" onClick={onClose} className="flex items-center gap-3 group">
          <div className="bg-white p-2 rounded-2xl flex items-center justify-center shadow-sm">
            <Image
              src="/logo-mark.png"
              alt="Afroportico"
              width={32}
              height={24}
              className="object-contain"
            />
          </div>
          <div>
            <span className="font-bold text-white tracking-tight text-base block leading-none">
              AFROPORTICO
            </span>
            <span className="text-[9px] text-[#2BC194] tracking-widest uppercase mt-1 block leading-none font-semibold">
              Integrated Services
            </span>
          </div>
        </Link>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="relative w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#2BC194]"
          aria-label="Close navigation"
        >
          <X size={20} strokeWidth={2} className="transition-transform duration-300 hover:rotate-90" />
        </button>
      </div>

      {/* Main Nav Links with Cascading Stagger Animation */}
      <nav className="my-auto py-8 space-y-3">
        {links.map((link, idx) => {
          const isActive = currentPath === link.href;
          return (
            <div
              key={link.href}
              className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isOpen ? `${idx * 60 + 100}ms` : "0ms" }}
            >
              <Link
                href={link.href}
                onClick={onClose}
                className={`group flex items-center justify-between text-2xl sm:text-3xl font-medium tracking-tight transition-all duration-300 py-2 ${
                  isActive
                    ? "text-[#2BC194] font-bold pl-3 border-l-2 border-[#2BC194]"
                    : "text-white/80 hover:text-white hover:pl-2"
                }`}
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">{link.label}</span>
                <span className="text-xs font-mono text-white/30 tracking-widest group-hover:text-[#2BC194]/60 transition-colors">
                  0{idx + 1}
                </span>
              </Link>

              {/* Sub-items (e.g. HSE Policy Statement) */}
              {link.children && (
                <div className="pl-4 mt-1 space-y-1 border-l border-white/10">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onClose}
                      className="block py-1 text-sm text-[#2BC194] hover:text-white transition-colors font-medium"
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

      {/* Footer Quote Action */}
      <div
        className={`pt-6 border-t border-white/10 transition-all duration-500 ease-out delay-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <Link
          href="/contact-us?subject=quote"
          onClick={onClose}
          className="w-full flex items-center justify-between h-14 px-6 rounded-full bg-gradient-to-r from-[#2BC194] to-[#4FD6AE] hover:from-[#25b085] hover:to-[#3ec099] text-[#04374D] font-extrabold text-sm tracking-wide transition-all shadow-lg active:scale-[0.98]"
        >
          <span>Request a Quote</span>
          <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs">
            <ArrowUpRight size={16} strokeWidth={2.4} className="text-[#04374D]" />
          </span>
        </Link>
      </div>
    </div>
  );
}
