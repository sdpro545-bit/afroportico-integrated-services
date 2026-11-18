"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLifting, setIsLifting] = useState(false);

  useEffect(() => {
    // Check session storage
    const hasSeen = sessionStorage.getItem("afroportico_intro_seen");
    if (hasSeen) {
      return;
    }

    setIsVisible(true);

    const liftTimer = setTimeout(() => {
      setIsLifting(true);
    }, 1400);

    const finishTimer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("afroportico_intro_seen", "true");
    }, 2200);

    const handleSkip = () => {
      setIsLifting(true);
      setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("afroportico_intro_seen", "true");
      }, 300);
    };

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" || e.key === "Enter") handleSkip();
    });

    return () => {
      clearTimeout(liftTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      onClick={() => {
        setIsLifting(true);
        setTimeout(() => {
          setIsVisible(false);
          sessionStorage.setItem("afroportico_intro_seen", "true");
        }, 300);
      }}
      className={`fixed inset-0 z-50 bg-[#EEF3F5] flex flex-col items-center justify-center p-6 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] cursor-pointer select-none ${
        isLifting ? "-translate-y-full rounded-b-[28px]" : "translate-y-0"
      }`}
      role="progressbar"
      aria-label="Loading Afroportico"
    >
      <div className="flex flex-col items-center text-center animate-fadeIn">
        {/* Logo Emblem */}
        <div className="relative w-20 h-16 sm:w-28 sm:h-20 mb-6 drop-shadow-sm">
          <Image
            src="/logo-mark.png"
            alt="Afroportico Portal Emblem"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Live Typography */}
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#04374D]">
          AFROPORTICO
        </h2>
        <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#087A5E] mt-1">
          Integrated Services Limited
        </span>

        {/* Subtle Progress Indicator */}
        <div className="mt-8 w-24 h-1 bg-[rgba(4,55,77,0.12)] rounded-full overflow-hidden">
          <div className="h-full bg-[#2BC194] animate-[pulse_1s_infinite] w-full" />
        </div>

        <span className="text-[10px] text-[#3D5A68] mt-4 opacity-60">
          Press ESC or click anywhere to skip
        </span>
      </div>
    </div>
  );
}
