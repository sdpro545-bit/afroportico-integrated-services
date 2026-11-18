"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ArrowUpRight } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ label: string; href: string }>;
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#04374D]/95 backdrop-blur-2xl text-[#E4EEF2] flex flex-col justify-between p-6 sm:p-10 transition-all duration-300"
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
            <span className="text-[9px] text-[#A9C2CD] tracking-widest uppercase mt-0.5 block leading-none">
              Integrated Services
            </span>
          </div>
        </Link>

        <button
          onClick={onClose}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#2BC194]"
          aria-label="Close navigation"
        >
          <X size={22} strokeWidth={1.75} />
        </button>
      </div>

      {/* Main Nav Links (Sleek Apple style spacing & font) */}
      <nav className="my-auto py-8 space-y-5">
        {links.map((link, idx) => {
          const isActive = currentPath === link.href;
          return (
            <div key={link.href} className="overflow-hidden">
              <Link
                href={link.href}
                onClick={onClose}
                className={`flex items-center justify-between text-2xl sm:text-3xl font-medium tracking-tight transition-all duration-200 py-1 ${
                  isActive ? "text-[#2BC194] font-semibold pl-2 border-l-2 border-[#2BC194]" : "text-white/90 hover:text-white"
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-white/30 tracking-widest">
                  0{idx + 1}
                </span>
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Footer Quote Action Only (No phone, no address per instruction) */}
      <div className="pt-6 border-t border-white/10">
        <Link
          href="/contact-us?subject=quote"
          onClick={onClose}
          className="w-full flex items-center justify-between h-14 px-6 rounded-full bg-[#2BC194] hover:bg-[#4FD6AE] text-[#04374D] font-bold text-sm tracking-wide transition-all shadow-md active:scale-[0.98]"
        >
          <span>Request a Quote</span>
          <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <ArrowUpRight size={16} strokeWidth={2.2} className="text-[#04374D]" />
          </span>
        </Link>
      </div>
    </div>
  );
}
