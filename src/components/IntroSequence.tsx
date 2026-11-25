"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "@/utils/motion";

export default function IntroSequence() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const logoClipRef = useRef<HTMLDivElement>(null);
  const companyNameRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const captionsWrapRef = useRef<HTMLDivElement>(null);
  const caption1Ref = useRef<HTMLSpanElement>(null);
  const caption2Ref = useRef<HTMLSpanElement>(null);
  const caption3Ref = useRef<HTMLSpanElement>(null);

  const [isSkipped, setIsSkipped] = useState(false);
  const [isStaticFallback, setIsStaticFallback] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  // Listen for "Replay intro" event from Footer
  useEffect(() => {
    const handleReplay = () => {
      try {
        sessionStorage.removeItem("afroportico_scroll_intro_seen");
        document.documentElement.dataset.intro = "play";
      } catch {
        // ignore
      }
      setIsSkipped(false);
      window.dispatchEvent(new CustomEvent("afroportico:intro-state", { detail: { active: true } }));

      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 0.8 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    window.addEventListener("afroportico:replay-intro", handleReplay);
    return () => window.removeEventListener("afroportico:replay-intro", handleReplay);
  }, []);

  // Determine initial skip/fallback/videoSrc on client mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasHash = Boolean(window.location.hash && window.location.hash.length > 1);
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem("afroportico_scroll_intro_seen"));
    } catch {
      seen = false;
    }

    if (seen || hasHash || document.documentElement.dataset.intro === "skip") {
      setIsSkipped(true);
      document.documentElement.dataset.intro = "skip";
      window.dispatchEvent(new CustomEvent("afroportico:intro-state", { detail: { active: false } }));
      return;
    }

    document.documentElement.dataset.intro = "play";
    window.dispatchEvent(new CustomEvent("afroportico:intro-state", { detail: { active: true } }));

    // Check reduced motion or data saver / slow connection
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const saveData = Boolean(nav.connection?.saveData);
    const effectiveType = nav.connection?.effectiveType;
    const isSlowNet = effectiveType === "2g" || effectiveType === "slow-2g" || effectiveType === "3g";

    if (prefersReducedMotion || saveData || isSlowNet) {
      setIsStaticFallback(true);
      window.dispatchEvent(new CustomEvent("afroportico:intro-state", { detail: { active: false } }));
      return;
    }

    // Load 1080p only when viewport width >= 1440, otherwise 720p
    const updateVideoSource = () => {
      const src =
        window.innerWidth >= 1440
          ? "/intro/afroportico-intro-1080.mp4"
          : "/intro/afroportico-intro-720.mp4";
      setVideoSrc(src);
    };

    updateVideoSource();
  }, [isSkipped]);

  // Scrub engine & ScrollTrigger timeline
  useEffect(() => {
    if (typeof window === "undefined" || isSkipped || isStaticFallback || !videoSrc) return;

    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    const plate = plateRef.current;
    const logoWrap = logoWrapRef.current;
    const logoClip = logoClipRef.current;
    const companyName = companyNameRef.current;
    const scrollCue = scrollCueRef.current;
    const captionsWrap = captionsWrapRef.current;
    const cap1 = caption1Ref.current;
    const cap2 = caption2Ref.current;
    const cap3 = caption3Ref.current;

    if (!root || !stage || !video) return;

    let progress = 0;
    let curTime = 0;
    let isDisposed = false;
    let isMetadataReady = false;
    let isDecoderPrimed = false;

    const primeDecoder = () => {
      if (isDisposed || isDecoderPrimed || !video) return;
      isDecoderPrimed = true;
      try {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.then === "function") {
          playPromise
            .then(() => {
              video.pause();
            })
            .catch(() => {
              isDecoderPrimed = false;
            });
        } else {
          video.pause();
        }
      } catch {
        // ignore
      }
    };

    const markReady = () => {
      if (isDisposed || isMetadataReady) return;
      isMetadataReady = true;
      primeDecoder();
      if (video.readyState >= 2) {
        setVideoReady(true);
      }
    };

    const onLoadedMetadata = () => {
      if (video.readyState >= 2) {
        markReady();
      }
    };

    const onLoadedData = () => {
      primeDecoder();
      setVideoReady(true);
      markReady();
    };

    const onCanPlayThrough = () => {
      primeDecoder();
      setVideoReady(true);
      markReady();
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("canplay", onLoadedData);
    video.addEventListener("canplaythrough", onCanPlayThrough);

    // If already cached/ready
    if (video.readyState >= 2) {
      onLoadedData();
    } else {
      try {
        video.load();
      } catch {
        // ignore
      }
    }

    // 2.5s timeout fallback to continue even if network is still buffering
    const readyTimeout = window.setTimeout(() => {
      markReady();
    }, 2500);

    // Master scrub state update
    const applyVisualProgress = (p: number) => {
      // 1. Scroll cue: 0.00 -> 0.05 fade out
      if (scrollCue) {
        const cueOpacity = gsap.utils.clamp(0, 1, 1 - p / 0.05);
        scrollCue.style.opacity = String(cueOpacity);
      }

      // 2. Stage subtle scale: 0.00 -> 0.20 (1 to 1.04)
      const stageScale = 1 + gsap.utils.clamp(0, 1, p / 0.2) * 0.04;
      stage.style.transform = `scale(${stageScale})`;

      // 3. Captions masked reveals (scrubbed in both directions):
      // "Engineer." at 0.45, "Procure." at 0.55, "Deliver." at 0.65
      // Lift -24px and fade out during 0.70 -> 0.82
      const revealSpan = (el: HTMLSpanElement | null, startP: number) => {
        if (!el) return;
        const t = gsap.utils.clamp(0, 1, (p - startP) / 0.07);
        // ease out cubic approximation
        const eased = 1 - Math.pow(1 - t, 3);
        el.style.transform = `translate3d(0, ${(1 - eased) * 110}%, 0)`;
      };
      revealSpan(cap1, 0.45);
      revealSpan(cap2, 0.55);
      revealSpan(cap3, 0.65);

      if (captionsWrap) {
        const fadeT = gsap.utils.clamp(0, 1, (p - 0.7) / 0.12);
        captionsWrap.style.opacity = String(1 - fadeT);
        captionsWrap.style.transform = `translate3d(0, ${-fadeT * 24}px, 0)`;
      }

      // 4. LOGO REVEAL: 0.82 -> 0.94
      const logoT = gsap.utils.clamp(0, 1, (p - 0.82) / 0.12);
      if (plate) {
        // Off-white plate expands circle(0% -> 150%) from emblem centre
        const radius = logoT * 150;
        plate.style.clipPath = `circle(${radius}% at var(--emblem-x, 50%) var(--emblem-y, 62%))`;
      }

      // Inside plate: real logo-mark.png scale 0.94 -> 1 + left-to-right wipe
      // Holds 0.94 -> 0.96, then lifts -40px and fades 0.96 -> 1.00
      const exitT = gsap.utils.clamp(0, 1, (p - 0.94) / 0.06);

      if (logoWrap) {
        const logoScale = 0.94 + logoT * 0.06;
        const logoLiftY = -exitT * 40;
        const logoOpacity = logoT > 0.05 ? 1 - exitT : 0;
        logoWrap.style.opacity = String(logoOpacity);
        logoWrap.style.transform = `translate3d(0, ${logoLiftY}px, 0) scale(${logoScale})`;
      }

      if (logoClip) {
        const wipeT = gsap.utils.clamp(0, 1, (p - 0.84) / 0.08);
        const rightInset = (1 - wipeT) * 100;
        logoClip.style.clipPath = `inset(0 ${rightInset}% 0 0)`;
      }

      if (companyName) {
        const nameT = gsap.utils.clamp(0, 1, (p - 0.87) / 0.06);
        companyName.style.opacity = String(nameT * (1 - exitT));
        companyName.style.transform = `translate3d(0, ${(1 - nameT) * 16}px, 0)`;
      }

      // Handoff to Header when approaching end (>= 0.94)
      if (p >= 0.94) {
        window.dispatchEvent(new CustomEvent("afroportico:intro-state", { detail: { active: false } }));
        try {
          sessionStorage.setItem("afroportico_scroll_intro_seen", "true");
        } catch {
          // ignore
        }
      } else {
        window.dispatchEvent(new CustomEvent("afroportico:intro-state", { detail: { active: true } }));
      }
    };

    // Initial visual state
    applyVisualProgress(0);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          progress = self.progress;
          applyVisualProgress(progress);
        },
        onLeave: () => {
          window.dispatchEvent(new CustomEvent("afroportico:intro-state", { detail: { active: false } }));
          try {
            sessionStorage.setItem("afroportico_scroll_intro_seen", "true");
          } catch {
            // ignore
          }
        },
      });
    }, rootRef);

    // Ensure ScrollTrigger recalculates after mount
    ScrollTrigger.refresh();

    // Smooth video scrub ticker
    const tickerFn = () => {
      if (!video || !video.duration || Number.isNaN(video.duration)) return;
      const target = gsap.utils.clamp(0, 1, progress / 0.82) * video.duration;
      curTime += (target - curTime) * 0.18;
      if (Math.abs(video.currentTime - curTime) > 1 / 48 && !video.seeking) {
        try {
          video.currentTime = curTime;
        } catch {
          // ignore seek error before ready
        }
      }
    };

    gsap.ticker.add(tickerFn);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      isDisposed = true;
      window.clearTimeout(readyTimeout);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("canplay", onLoadedData);
      video.removeEventListener("canplaythrough", onCanPlayThrough);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      gsap.ticker.remove(tickerFn);
      ctx.revert();
    };
  }, [isSkipped, isStaticFallback, videoSrc]);

  const handleSkipIntro = () => {
    try {
      sessionStorage.setItem("afroportico_scroll_intro_seen", "true");
    } catch {
      // ignore
    }
    window.dispatchEvent(new CustomEvent("afroportico:intro-state", { detail: { active: false } }));

    const heroEl = document.getElementById("hero-section");
    if (heroEl) {
      if (window.__lenis) {
        window.__lenis.scrollTo(heroEl, { duration: 1.0 });
      } else {
        heroEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (isSkipped) {
    return null;
  }

  // Fallback for reduced motion / saveData / 2g-3g / no-JS
  if (isStaticFallback) {
    return (
      <section
        id="intro-sequence-root"
        aria-label="Brand introduction"
        className="relative h-[70svh] w-full bg-[#EEF3F5] flex flex-col items-center justify-center px-6 text-center"
      >
        <div className="relative w-[clamp(240px,56vw,560px)] aspect-[1105/586] mb-5">
          <Image
            src="/logo-mark.png"
            alt="Afroportico Integrated Services Limited"
            fill
            priority
            className="object-contain"
          />
        </div>
        <p className="text-xs sm:text-sm font-bold tracking-[0.22em] uppercase text-[#04374D]">
          Afroportico Integrated Services Limited
        </p>
      </section>
    );
  }

  return (
    <section
      id="intro-sequence-root"
      ref={rootRef}
      aria-label="Brand introduction"
      className="relative w-full h-[380vh] md:h-[450vh] bg-[#04374D]"
      style={
        {
          "--emblem-x": "50%",
          "--emblem-y": "62%",
        } as React.CSSProperties
      }
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 w-full h-[100svh] overflow-hidden bg-[#04374D]">
        {/* Skip Intro Button: 44px touch target, top-right, always visible, first focusable */}
        <button
          type="button"
          onClick={handleSkipIntro}
          className="absolute top-5 right-5 sm:top-8 sm:right-8 z-40 h-11 px-5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white text-xs font-bold tracking-wider uppercase transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2BC194] active:scale-95"
          aria-label="Skip brand introduction and go to hero"
        >
          Skip intro
        </button>

        {/* Scaled Stage Container */}
        <div
          ref={stageRef}
          className="relative w-full h-full flex flex-col items-center justify-center will-change-transform"
        >
          {/* Video & Poster Layer: Full-bleed on desktop, 16:9 centered band on portrait mobile */}
          <div className="relative w-full aspect-video md:aspect-auto md:h-full overflow-hidden flex-shrink-0">
            {/* Poster image with fetchPriority="high" for instant LCP */}
            <img
              src="/intro/intro-poster.webp"
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                videoReady && videoSrc ? "opacity-0" : "opacity-100"
              }`}
              style={{ filter: "saturate(0.92)" }}
            />

            {videoSrc && (
              <video
                ref={videoRef}
                src={videoSrc}
                poster="/intro/intro-poster.webp"
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                aria-hidden="true"
                className="w-full h-full object-cover"
                style={{ filter: "saturate(0.92)" }}
              />
            )}

            {/* Soft top & bottom navy gradients on mobile portrait */}
            <div className="md:hidden pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#04374D] to-transparent" />
            <div className="md:hidden pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#04374D] to-transparent" />
          </div>

          {/* Navy Multiply Overlay (12%) + Soft Vignette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[#04374D]/12 mix-blend-multiply"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, transparent 45%, rgba(2, 38, 54, 0.55) 100%)",
            }}
          />

          {/* Caption Layer: Masked line reveals (0.45, 0.55, 0.65), below band on mobile, lower-center on desktop */}
          <div
            ref={captionsWrapRef}
            aria-hidden="true"
            className="pointer-events-none relative md:absolute md:bottom-[14vh] inset-x-0 mt-8 md:mt-0 px-6 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 z-10"
          >
            <span className="overflow-hidden inline-block">
              <span
                ref={caption1Ref}
                className="block text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
                style={{ transform: "translate3d(0, 110%, 0)" }}
              >
                Engineer.
              </span>
            </span>
            <span className="overflow-hidden inline-block">
              <span
                ref={caption2Ref}
                className="block text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
                style={{ transform: "translate3d(0, 110%, 0)" }}
              >
                Procure.
              </span>
            </span>
            <span className="overflow-hidden inline-block">
              <span
                ref={caption3Ref}
                className="block text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
                style={{ transform: "translate3d(0, 110%, 0)" }}
              >
                Deliver<span className="text-[#2BC194]">.</span>
              </span>
            </span>
          </div>
        </div>

        {/* Off-white Plate (#EEF3F5) clipped to circle(0) -> circle(150%) at emblem center */}
        <div
          ref={plateRef}
          className="pointer-events-none absolute inset-0 z-20 bg-[#EEF3F5] flex flex-col items-center justify-center px-6"
          style={{
            clipPath: "circle(0% at var(--emblem-x, 50%) var(--emblem-y, 62%))",
          }}
        >
          {/* Real Logo Layer */}
          <div
            ref={logoWrapRef}
            className="flex flex-col items-center justify-center text-center will-change-transform"
            style={{ opacity: 0, transform: "scale(0.94)" }}
          >
            <div
              ref={logoClipRef}
              className="relative w-[clamp(280px,62vw,720px)] aspect-[1105/586] mb-5"
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              <Image
                src="/logo-mark.png"
                alt="Afroportico Integrated Services Limited Logo"
                fill
                priority
                className="object-contain"
              />
            </div>

            <p
              ref={companyNameRef}
              className="text-xs sm:text-sm md:text-base font-bold tracking-[0.22em] uppercase text-[#04374D]"
              style={{ opacity: 0, fontVariantCaps: "small-caps" }}
            >
              Afroportico Integrated Services Limited
            </p>
          </div>
        </div>

        {/* Scroll Cue: 0.00 -> 0.05 static (no idle pulse) */}
        <div
          ref={scrollCueRef}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/90">
            Scroll to begin
          </span>
          <span className="w-[1px] h-7 bg-gradient-to-b from-[#2BC194] to-transparent" />
        </div>
      </div>
    </section>
  );
}
