import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#EEF3F5] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-[28px] p-8 sm:p-12 border border-[rgba(4,55,77,0.12)] shadow-lg flex flex-col items-center">
        {/* Logo */}
        <div className="relative w-20 h-16 mb-6">
          <Image
            src="/logo-mark.png"
            alt="Afroportico Portal Emblem"
            fill
            className="object-contain"
          />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-[#087A5E] mb-2 block">
          404 Error
        </span>

        <h1 className="text-3xl font-bold text-[#04374D] mb-3">
          Page Not Found
        </h1>

        <p className="text-sm text-[#3D5A68] leading-relaxed mb-8">
          The requested engineering resource or page could not be located.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-3 h-12 px-6 rounded-full bg-[#04374D] hover:bg-[#022636] text-white text-xs font-bold transition-all shadow-md active:scale-95"
        >
          <ArrowLeft size={16} />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
