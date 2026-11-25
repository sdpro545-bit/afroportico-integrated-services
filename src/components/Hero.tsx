"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroSlides } from "@/content/site";
import { EASE } from "@/utils/motion";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const heroSectionRef = useRef<HTMLElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const isTransitioningRef = useRef(false);
  const hasEnteredRef = useRef(false);
  const slideTimerRef = useRef<gsap.core.Tween | null>(null);
  const kenBurnsTweenRef = useRef<gsap.core.Tween | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Transition to specific slide
  const goToSlide = useCallback((nextIdx: number) => {
    if (isTransitioningRef.current || nextIdx === currentSlide) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setCurrentSlide(nextIdx);
      return;
    }

    isTransitioningRef.current = true;

    // Kill existing slide autoplay timer & Ken Burns
    if (slideTimerRef.current) slideTimerRef.current.kill();
    if (kenBurnsTweenRef.current) kenBurnsTweenRef.current.kill();

    const titleEl = titleRef.current;
    const descEl = descRef.current;
    const ctaEl = ctaRef.current;
    const eyebrowEl = eyebrowRef.current;

    const lines = titleEl ? titleEl.querySelectorAll<HTMLElement>(".hero-h1-line") : [];
    const container = heroContainerRef.current;
    const allSlideLayers = container ? container.querySelectorAll<HTMLElement>(".hero-slide-layer") : [];
    const currentLayer = allSlideLayers[currentSlide];
    const nextLayer = allSlideLayers[nextIdx];

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSlide(nextIdx);
        isTransitioningRef.current = false;
      },
    });

    // 1. Text out: current lines rise and vanish, description and CTA fade up 12px
    if (lines.length > 0) {
      tl.to(lines, {
        yPercent: -110,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: EASE.inout,
      }, 0);
    }

    if (descEl) {
      tl.to(descEl, {
        opacity: 0,
        y: -12,
        duration: 0.3,
        ease: EASE.inout,
      }, 0);
    }

    if (ctaEl) {
      tl.to(ctaEl, {
        opacity: 0,
        y: -8,
        duration: 0.25,
        ease: EASE.inout,
      }, 0);
    }

    if (eyebrowEl) {
      tl.to(eyebrowEl, {
        opacity: 0,
        x: -16,
        duration: 0.25,
        ease: EASE.inout,
      }, 0);
    }

    // 2. Image transition: next image wipes in from right while scaling 1.12 to 1, old drifts -4%
    if (currentLayer && nextLayer) {
      const nextImg = nextLayer.querySelector(".hero-inner-img");
      const currentImg = currentLayer.querySelector(".hero-inner-img");

      gsap.set(nextLayer, { zIndex: 3, opacity: 1 });
      gsap.set(currentLayer, { zIndex: 2 });

      tl.fromTo(
        nextLayer,
        { clipPath: "inset(0 0 0 100%)" },
        { clipPath: "inset(0 0 0 0%)", duration: 1.0, ease: EASE.inout },
        0.1
      );

      if (nextImg) {
        tl.fromTo(
          nextImg,
          { scale: 1.12 },
          { scale: 1.0, duration: 1.0, ease: EASE.inout },
          0.1
        );
      }

      if (currentImg) {
        tl.to(
          currentImg,
          { xPercent: -4, opacity: 0.4, duration: 0.9, ease: EASE.inout },
          0.1
        );
      }
    }
  }, [currentSlide]);

  const handleNext = useCallback(() => {
    const nextIdx = (currentSlide + 1) % heroSlides.length;
    goToSlide(nextIdx);
  }, [currentSlide, goToSlide]);

  const handlePrev = useCallback(() => {
    const prevIdx = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    goToSlide(prevIdx);
  }, [currentSlide, goToSlide]);

  // Autoplay timer with progress bar
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const bars = heroContainerRef.current?.querySelectorAll<HTMLElement>(".hero-pager-bar");
    if (!bars) return;

    bars.forEach((bar, idx) => {
      if (idx !== currentSlide) {
        gsap.set(bar, { scaleX: 0 });
      }
    });

    const currentBar = bars[currentSlide];
    if (!currentBar) return;

    gsap.set(currentBar, { scaleX: 0 });

    if (isPaused) {
      if (slideTimerRef.current) slideTimerRef.current.pause();
      return;
    }

    slideTimerRef.current = gsap.to(currentBar, {
      scaleX: 1,
      duration: 6.0,
      ease: "none",
      onComplete: () => {
        handleNext();
      },
    });

    return () => {
      if (slideTimerRef.current) slideTimerRef.current.kill();
    };
  }, [currentSlide, isPaused, handleNext]);

  // Active slide reveal & Ken Burns effect
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const container = heroContainerRef.current;
    if (!container) return;

    const allSlideLayers = container.querySelectorAll<HTMLElement>(".hero-slide-layer");
    allSlideLayers.forEach((layer, idx) => {
      if (idx === currentSlide) {
        gsap.set(layer, { zIndex: 2, opacity: 1, clipPath: "inset(0 0 0 0%)" });
      } else {
        gsap.set(layer, { zIndex: 1, opacity: 0, clipPath: "inset(0 0 0 100%)" });
      }
    });

    const activeLayer = allSlideLayers[currentSlide];
    const activeImg = activeLayer?.querySelector<HTMLElement>(".hero-inner-img");

    if (activeImg && !prefersReducedMotion) {
      gsap.set(activeImg, { scale: 1, xPercent: 0, opacity: 0.55 });
      kenBurnsTweenRef.current = gsap.to(activeImg, {
        scale: 1.06,
        duration: 6.0,
        ease: "none",
      });
    }

    // Text In Entrance
    const titleEl = titleRef.current;
    const descEl = descRef.current;
    const ctaEl = ctaRef.current;
    const eyebrowEl = eyebrowRef.current;
    const underline = titleEl?.querySelector<HTMLElement>(".hero-highlight-underline");

    if (prefersReducedMotion) {
      if (titleEl) {
        titleEl.querySelectorAll<HTMLElement>(".hero-h1-line").forEach((l) => {
          l.style.opacity = "1";
          l.style.transform = "none";
        });
      }
      if (descEl) descEl.style.opacity = "0.95";
      if (ctaEl) ctaEl.style.opacity = "1";
      if (eyebrowEl) eyebrowEl.style.opacity = "1";
      if (underline) gsap.set(underline, { scaleX: 1 });
      return;
    }

    const lines = titleEl ? titleEl.querySelectorAll<HTMLElement>(".hero-h1-line") : [];

    const enterTl = gsap.timeline({ paused: !hasEnteredRef.current });

    if (eyebrowEl) {
      enterTl.fromTo(
        eyebrowEl,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: EASE.out },
        0
      );
    }

    if (lines.length > 0) {
      enterTl.fromTo(
        lines,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: EASE.out,
          onComplete: () => {
            lines.forEach((l) => (l.style.willChange = "auto"));
          },
        },
        0.1
      );
    }

    if (underline) {
      enterTl.fromTo(
        underline,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: EASE.out },
        0.5
      );
    }

    if (descEl) {
      enterTl.fromTo(
        descEl,
        { opacity: 0, y: 16, filter: "blur(6px)" },
        {
          opacity: 0.95,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: EASE.out,
          clearProps: "filter",
        },
        0.35
      );
    }

    if (ctaEl) {
      enterTl.fromTo(
        ctaEl,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: EASE.out },
        0.45
      );
    }

    let enterTrigger: ScrollTrigger | null = null;
    if (!hasEnteredRef.current && heroSectionRef.current) {
      gsap.registerPlugin(ScrollTrigger);
      enterTrigger = ScrollTrigger.create({
        trigger: heroSectionRef.current,
        start: "top 88%",
        onEnter: () => {
          hasEnteredRef.current = true;
          window.dispatchEvent(new CustomEvent("afroportico:intro-state", { detail: { active: false } }));
          if (heroContainerRef.current) {
            gsap.fromTo(
              heroContainerRef.current,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: EASE.out,
              }
            );
          }
          enterTl.play();
        },
        onLeaveBack: () => {
          window.dispatchEvent(new CustomEvent("afroportico:intro-state", { detail: { active: true } }));
        },
      });
    } else {
      enterTl.play();
    }

    return () => {
      if (enterTrigger) enterTrigger.kill();
      enterTl.kill();
      if (kenBurnsTweenRef.current) kenBurnsTweenRef.current.kill();
    };
  }, [currentSlide]);

  // Pointer Parallax (desktop only) & Scroll Scrub
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia("(hover: none)").matches;

    const container = heroContainerRef.current;
    const section = heroSectionRef.current;
    const textBlock = textBlockRef.current;
    if (!container || !section) return;

    const ctx = gsap.context(() => {
      // 1. Apple-grade Scroll scrub: scale container 1 to 0.95, radius 28 to 40px
      gsap.to(container, {
        scale: 0.95,
        borderRadius: "40px",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Parallax inner background images yPercent: 6 with h-[115%] top-[-7.5%]
      const innerImages = container.querySelectorAll(".hero-inner-img");
      if (innerImages.length > 0) {
        gsap.to(innerImages, {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Text block rises 40px and fades to 0.4
      if (textBlock) {
        gsap.to(textBlock, {
          y: -40,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // 2. Desktop pointer parallax
      if (!prefersReducedMotion && !isTouch) {
        const glowEl = glowRef.current;
        const gridEl = gridRef.current;

        const quickGlowX = glowEl ? gsap.quickTo(glowEl, "x", { duration: 0.6, ease: "power2.out" }) : null;
        const quickGlowY = glowEl ? gsap.quickTo(glowEl, "y", { duration: 0.6, ease: "power2.out" }) : null;
        const quickGridX = gridEl ? gsap.quickTo(gridEl, "x", { duration: 0.8, ease: "power2.out" }) : null;
        const quickGridY = gridEl ? gsap.quickTo(gridEl, "y", { duration: 0.8, ease: "power2.out" }) : null;

        const handleMouseMove = (e: MouseEvent) => {
          const rect = container.getBoundingClientRect();
          const relX = e.clientX - rect.left;
          const relY = e.clientY - rect.top;
          const normX = (relX / rect.width - 0.5) * 2;
          const normY = (relY / rect.height - 0.5) * 2;

          if (quickGlowX && quickGlowY) {
            quickGlowX(relX);
            quickGlowY(relY);
          }
          if (quickGridX && quickGridY) {
            quickGridX(normX * 8);
            quickGridY(normY * 8);
          }
        };

        container.addEventListener("mousemove", handleMouseMove);
        return () => {
          container.removeEventListener("mousemove", handleMouseMove);
        };
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;
    if (diff > 50) {
      handlePrev();
    } else if (diff < -50) {
      handleNext();
    }
    touchStartXRef.current = null;
  };

  const slide = heroSlides[currentSlide];

  // Title render helper with teal highlight underline
  const renderTitle = (title: string, highlight?: string) => {
    if (!highlight || !title.includes(highlight)) {
      return (
        <span className="block overflow-hidden py-0.5">
          <span className="hero-h1-line block will-change-transform">{title}</span>
        </span>
      );
    }

    const parts = title.split(highlight);
    return (
      <>
        {parts[0] && (
          <span className="block overflow-hidden py-0.5">
            <span className="hero-h1-line block will-change-transform">{parts[0]}</span>
          </span>
        )}
        <span className="block overflow-hidden py-0.5">
          <span className="hero-h1-line block will-change-transform">
            <span className="relative inline-block text-[#2BC194]">
              {highlight}
            </span>
          </span>
        </span>
        {parts[1] && (
          <span className="block overflow-hidden py-0.5">
            <span className="hero-h1-line block will-change-transform">{parts[1]}</span>
          </span>
        )}
      </>
    );
  };

  return (
    <section
      id="hero"
      ref={heroSectionRef}
      className="pt-24 sm:pt-28 pb-8 sm:pb-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="site-container">
        {/* Main Hero Container: rounded 28px transforming to 40px on scroll */}
        <div
          ref={heroContainerRef}
          className="relative min-h-[520px] sm:min-h-[640px] lg:min-h-[720px] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-[#04374D] text-white flex flex-col justify-between p-5 sm:p-12 lg:p-16 shadow-[0_1px_2px_rgba(4,55,77,0.06),0_12px_32px_rgba(4,55,77,0.08)] select-none"
        >
          {/* Subtle pointer-following radial teal glow (desktop only) */}
          <div
            ref={glowRef}
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#2BC194]/15 blur-3xl z-10 transition-opacity duration-500 opacity-60 hidden sm:block"
          />

          {/* Faint engineering line grid (6% white) behind text */}
          <div
            ref={gridRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-1 opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Polite screen reader live region for headline updates */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {slide.title}
          </div>

          {/* Background Slides: all 3 mounted for instant cross-fade & wipe */}
          {heroSlides.map((s, idx) => (
            <div
              key={idx}
              className={`hero-slide-layer absolute inset-0 overflow-hidden pointer-events-none ${
                idx === 0 ? "z-2 opacity-100" : "z-1 opacity-0"
              }`}
            >
              {/* Inner Image: h-[115%] top-[-7.5%] ensures no gap exposed during parallax */}
              <div className="hero-inner-img absolute w-full h-[115%] -top-[7.5%] left-0">
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  priority={idx === 0}
                  className="object-cover object-right-top contrast-115 brightness-95"
                  sizes="(max-width: 1024px) 100vw, 1280px"
                />
              </div>

              {/* Navy Scrim Gradients ensuring contrast: deep navy on left 50%, gradient to transparent */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#022636] via-[#04374D]/90 to-[#04374D]/35" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#022636]/95 via-transparent to-transparent sm:hidden" />
            </div>
          ))}

          {/* Center Copy Block */}
          <div ref={textBlockRef} className="relative z-10 max-w-3xl my-auto py-4 sm:py-6">
            {/* Eyebrow Badge: Server-rendered full text with clip reveal, no blanking, no blinking cursor */}
            <div className="mb-4 sm:mb-5">
              <div
                ref={eyebrowRef}
                aria-label={slide.eyebrow}
                className="hero-eyebrow inline-flex items-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-2xl border border-white/25 text-xs sm:text-[12.5px] font-semibold tracking-wider uppercase text-white shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-all duration-300"
              >
                <span>{slide.eyebrow}</span>
              </div>
            </div>

            {/* Dynamic H1: line mask reveal with highlight underline */}
            <h1
              ref={titleRef}
              style={{ color: "#FFFFFF" }}
              className="text-[26px] sm:text-5xl lg:text-[56px] font-semibold tracking-[-0.03em] !text-white leading-[1.14] mb-5 sm:mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
            >
              {renderTitle(slide.title, slide.highlight)}
            </h1>

            {/* Dynamic Description */}
            <p
              ref={descRef}
              style={{ color: "#E4EEF2" }}
              className="text-base sm:text-lg !text-[#E4EEF2] leading-relaxed max-w-xl font-normal mb-8 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] opacity-95"
            >
              {slide.description}
            </p>

            {/* Dynamic Primary CTA Button with Apple-Grade Pill Micro-Interaction */}
            <div ref={ctaRef} className="flex items-center gap-4">
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

          {/* Bottom Bar: Operational Focus, Numbered Pager & 48px Navigation Arrows */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
            {/* Operational Focus Indicators */}
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

            {/* Pager and Arrow Controls */}
            <div className="flex items-center gap-5 sm:gap-6 self-end sm:self-auto">
              {/* Numbered Pager (01, 02, 03) with 2px teal progress line */}
              <div className="flex items-center gap-3">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    aria-label={`Show slide ${idx + 1} of ${heroSlides.length}`}
                    className="group flex flex-col items-start gap-1 py-1 focus:outline-none"
                  >
                    <span
                      className={`text-[11px] font-mono font-bold tracking-widest transition-colors ${
                        idx === currentSlide
                          ? "text-[#2BC194]"
                          : "text-white/50 group-hover:text-white/80"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <div className="w-8 sm:w-12 h-[2px] bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="hero-pager-bar h-full bg-[#2BC194] origin-left"
                        style={{ transform: "scaleX(0)" }}
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Prev / Next 48px Circle Arrow Chips: prev white, next teal */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous slide"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-[#04374D] flex items-center justify-center shadow-md hover:bg-white/90 active:scale-95 transition-all duration-200"
                >
                  <ChevronLeft size={20} strokeWidth={2.4} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next slide"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#2BC194] text-[#04374D] flex items-center justify-center shadow-md hover:bg-[#4FD6AE] active:scale-95 transition-all duration-200"
                >
                  <ChevronRight size={20} strokeWidth={2.4} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}