"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroSlides } from "@/content/site";

function TypingEyebrow({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayedText(text);
      setIsDone(true);
      return;
    }

    setDisplayedText("");
    setIsDone(false);

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex++;
      setDisplayedText(text.slice(0, currentIndex));
      if (currentIndex >= text.length) {
        clearInterval(interval);
        setIsDone(true);
      }
    }, 32);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="tracking-widest inline-flex items-center min-h-[1.25em]">
      <span>{displayedText}</span>
      <span
        className={`inline-block w-[2px] h-[11px] bg-[#2BC194] ml-1.5 transition-opacity duration-300 ${
          isDone ? "animate-pulse" : "opacity-100"
        }`}
        aria-hidden="true"
      />
    </span>
  );
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const isTransitioningRef = useRef(false);

  // Auto-switch slides every 6s
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, currentSlide]);

  // Entrance line-mask reveal for H1 and fade-rise for description
  useEffect(() => {
    const titleEl = titleRef.current;
    if (!titleEl) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lines = titleEl.querySelectorAll<HTMLElement>(".hero-h1-line");

    if (prefersReducedMotion) {
      lines.forEach((l) => {
        l.style.opacity = "1";
        l.style.transform = "none";
      });
      if (descRef.current) descRef.current.style.opacity = "0.95";
      return;
    }

    if (lines.length > 0) {
      gsap.fromTo(
        lines,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          onComplete: () => {
            lines.forEach((l) => (l.style.willChange = "auto"));
          },
        }
      );
    }

    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 16, filter: "blur(6px)" },
        {
          opacity: 0.95,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          clearProps: "filter",
        }
      );
    }
  }, [currentSlide]);

  // Apple-level scroll scrub: scale container 1 to 0.94, radius 28 to 40px, parallax inner images
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const container = heroContainerRef.current;
    const section = heroSectionRef.current;
    if (!container || !section) return;

    const ctx = gsap.context(() => {
      // Scale container from 1 to 0.94, radius 28px to 40px
      gsap.to(container, {
        scale: 0.94,
        borderRadius: "40px",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Parallax inner background images yPercent 0 to 12
      const bgImages = container.querySelectorAll(".hero-bg-img");
      if (bgImages.length > 0) {
        gsap.to(bgImages, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleNextSlide = () => {
    if (isTransitioningRef.current) return;
    const nextIdx = (currentSlide + 1) % heroSlides.length;
    transitionToSlide(nextIdx);
  };

  const transitionToSlide = (nextIdx: number) => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setCurrentSlide(nextIdx);
      return;
    }

    const titleEl = titleRef.current;
    const descEl = descRef.current;

    isTransitioningRef.current = true;

    const lines = titleEl ? titleEl.querySelectorAll<HTMLElement>(".hero-h1-line") : [];

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSlide(nextIdx);
        isTransitioningRef.current = false;
      },
    });

    if (lines.length > 0) {
      tl.to(lines, {
        yPercent: -110,
        opacity: 0,
        duration: 0.35,
        stagger: 0.04,
        ease: "power2.in",
      });
    }

    if (descEl) {
      tl.to(
        descEl,
        {
          opacity: 0,
          y: -10,
          duration: 0.25,
          ease: "power2.in",
        },
        0
      );
    }
  };

  const slide = heroSlides[currentSlide];

  return (
    <section
      ref={heroSectionRef}
      className="pt-24 sm:pt-28 pb-8 sm:pb-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="site-container">
        {/* Main Hero Container with radius 28px transforming to 40px on scroll */}
        <div
          ref={heroContainerRef}
          className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-[#04374D] text-white flex flex-col justify-between p-6 sm:p-12 lg:p-16 shadow-[0_1px_2px_rgba(4,55,77,0.06),0_12px_32px_rgba(4,55,77,0.08)] will-change-transform"
        >
          {/* Background Slides with cross-fade & parallax */}
          {heroSlides.map((s, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                idx === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
              }`}
            >
              <div className="hero-bg-img relative w-full h-[120%] -top-[10%]">
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  priority={idx === 0}
                  className="object-cover object-right-top opacity-40 filter contrast-125"
                />
              </div>
              {/* Deep Navy Gradient Scrim for crisp contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#022636] via-[#04374D]/90 to-[#04374D]/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#022636]/90 via-transparent to-transparent sm:hidden" />
            </div>
          ))}

          {/* Center Copy Block with Close Proximity Eyebrow Pill */}
          <div className="relative z-10 max-w-3xl my-auto py-4 sm:py-6">
            {/* Eyebrow Badge with Smooth Typing Animation directly above H1 */}
            <div className="mb-4 sm:mb-5">
              <div
                key={`eyebrow-${currentSlide}`}
                className="inline-flex items-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-2xl border border-white/25 text-xs sm:text-[12.5px] font-semibold tracking-wider uppercase text-white shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-all duration-300"
              >
                <TypingEyebrow text={slide.eyebrow} />
              </div>
            </div>

            <h1
              ref={titleRef}
              style={{ color: "#FFFFFF" }}
              className="text-3xl sm:text-5xl lg:text-[56px] font-semibold tracking-[-0.03em] !text-white leading-[1.14] mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
            >
              <span className="block overflow-hidden py-0.5">
                <span className="hero-h1-line block will-change-transform">
                  Welcome to Afroportico
                </span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <span className="hero-h1-line block will-change-transform">
                  Integrated Services Limited
                </span>
              </span>
            </h1>

            <p
              ref={descRef}
              style={{ color: "#E4EEF2" }}
              className="text-base sm:text-lg !text-[#E4EEF2] leading-relaxed max-w-xl font-normal mb-8 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] opacity-95"
            >
              {slide.description}
            </p>

            {/* Single Primary CTA Button with Apple-Grade Pill Micro-Interaction */}
            <div className="flex items-center">
              <Link
                href={slide.primaryCta.href}
                className="group relative inline-flex items-center gap-4 h-14 pl-7 pr-2.5 rounded-full bg-[#2BC194] hover:bg-[#4FD6AE] text-[#04374D] font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_4px_20px_rgba(43,193,148,0.25)] hover:shadow-[0_6px_25px_rgba(43,193,148,0.4)] active:scale-[0.97]"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  {slide.primaryCta.label}
                </span>
                <span className="relative w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden transition-all duration-300 shadow-sm group-hover:rotate-45">
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2.4}
                    className="text-[#04374D] transition-transform duration-300"
                  />
                </span>
              </Link>
            </div>
          </div>

          {/* Bottom Bar: Operational Focus Line */}
          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#A9C2CD] font-medium">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2BC194]" />
                Mechanical &amp; HVAC
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2BC194]" />
                Oil &amp; Gas EPC
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2BC194]" />
                Facility Management
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2BC194]" />
                Telecoms &amp; Power
              </span>
            </div>

            <span className="hidden sm:inline-block text-xs text-[#A9C2CD] font-mono tracking-widest uppercase">
              Delta State, Nigeria
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
