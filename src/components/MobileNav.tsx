"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/content/site";

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
      className="fixed inset-0 z-50 bg-[#04374D] text-[#E4EEF2] flex flex-col justify-between p-6 sm:p-10 overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      {/* Top Bar with White Tile Logo */}
      <div className="flex items-center justify-between">
        <Link href="/" onClick={onClose} className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-xl flex items-center justify-center shadow-sm">
            <Image
              src="/logo-mark.png"
              alt="Afroportico"
              width={34}
              height={26}
              className="object-contain"
            />
          </div>
          <div>
            <span className="font-bold text-white tracking-tight text-base block leading-none">
              AFROPORTICO
            </span>
            <span className="text-[10px] text-[#A9C2CD] tracking-widest uppercase mt-0.5 block leading-none">
              Integrated Services
            </span>
          </div>
        </Link>

        <button
          onClick={onClose}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#2BC194]"
          aria-label="Close navigation"
        >
          <X size={24} strokeWidth={1.75} />
        </button>
      </div>

      {/* Main Nav Links */}
      <nav className="my-auto py-8 space-y-4">
        {links.map((link) => {
          const isActive = currentPath === link.href;
          return (
            <div key={link.href} className="overflow-hidden">
              <Link
                href={link.href}
                onClick={onClose}
                className={`block text-2xl sm:text-3xl font-semibold tracking-tight transition-colors ${
                  isActive ? "text-[#2BC194]" : "text-white hover:text-[#2BC194]"
                }`}
              >
                {link.label}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Footer Contact Details & Quote Action */}
      <div className="space-y-6 pt-6 border-t border-white/10">
        <div className="space-y-2 text-sm text-[#A9C2CD]">
          <a
            href={siteConfig.phoneRaw.value}
            className="flex items-center gap-3 text-white hover:text-[#2BC194] transition-colors py-1"
          >
            <Phone size={16} strokeWidth={1.75} className="text-[#2BC194]" />
            <span>{siteConfig.phone.value}</span>
          </a>
          <div className="flex items-start gap-3 py-1">
            <MapPin size={16} strokeWidth={1.75} className="text-[#2BC194] mt-0.5 flex-shrink-0" />
            <span>{siteConfig.address.value}</span>
          </div>
        </div>

        <Link
          href="/contact-us?subject=quote"
          onClick={onClose}
          className="w-full flex items-center justify-between h-14 px-6 rounded-full bg-[#2BC194] text-[#04374D] font-bold text-sm tracking-wide transition-all shadow-md active:scale-95"
        >
          <span>Request a Project Quote</span>
          <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <ArrowUpRight size={16} strokeWidth={2} className="text-[#04374D]" />
          </span>
        </Link>
      </div>
    </div>
  );
}
