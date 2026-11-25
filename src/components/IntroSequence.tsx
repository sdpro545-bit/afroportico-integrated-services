"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─── TUNABLE CONSTANTS ──────────────────────────────────────────────────────
export const INTRO_CONFIG = {
  /** Height of the #intro scroll wrapper in vh */
  scrollHeightVh: 400,
  /** Total extracted frame count (frame_0001.webp .. frame_0119.webp) */
  frameCount: 119,
  /** Smoothing factor per rAF tick (0.10 to 0.15 recommended) */
  lerpFactor: 0.12,
  /** Normalized scroll progress where final frame holds & hero reveal starts */
  revealPoint: 0.92,
  /** Number of initial frames required before unlocking scroll */
  initialPreloadCount: 10,
  /** Mobile breakpoint for selecting /frames-sm/ vs /frames/ */
  mobileBreakpointPx: 768,
  /** Minimum canvas aspect ratio before switching from "cover" to "contain" */
  minCoverAspect: 1.55,
} as const;

type FrameSource = HTMLImageElement | ImageBitmap;

function padFrame(index: number): string {
  return String(index + 1).padStart(4, "0");
}

export default function IntroSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const framesRef = useRef<Array<FrameSource | null>>(
    new Array(INTRO_CONFIG.frameCount).fill(null)
  );
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const lastDrawnIndexRef = useRef(-1);
  const isHeroShownRef = useRef(false);

  const [loaderPercent, setLoaderPercent] = useState(0);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Draw a specific frame onto the DPR-scaled canvas
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Pick exact frame or nearest loaded frame so scrubbing never flashes blank
    let img = framesRef.current[frameIdx];
    if (!img) {
      for (let offset = 1; offset < INTRO_CONFIG.frameCount; offset++) {
        if (frameIdx - offset >= 0 && framesRef.current[frameIdx - offset]) {
          img = framesRef.current[frameIdx - offset];
          break;
        }
        if (
          frameIdx + offset < INTRO_CONFIG.frameCount &&
          framesRef.current[frameIdx + offset]
        ) {
          img = framesRef.current[frameIdx + offset];
          break;
        }
      }
    }
    if (!img) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayW = canvas.clientWidth;
    const displayH = canvas.clientHeight;
    if (displayW === 0 || displayH === 0) return;

    const targetW = Math.round(displayW * dpr);
    const targetH = Math.round(displayH * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const imgW = img instanceof HTMLImageElement ? img.naturalWidth : img.width;
    const imgH = img instanceof HTMLImageElement ? img.naturalHeight : img.height;
    if (!imgW || !imgH) return;

    const canvasAspect = targetW / targetH;
    const imgAspect = imgW / imgH;

    // Use "contain" if the logo would be cropped on narrow/portrait screens, else "cover"
    const useContain = canvasAspect < INTRO_CONFIG.minCoverAspect;

    let drawW: number;
    let drawH: number;
    if (useContain) {
      if (canvasAspect > imgAspect) {
        drawH = targetH;
        drawW = drawH * imgAspect;
      } else {
        drawW = targetW;
        drawH = drawW / imgAspect;
      }
    } else {
      if (canvasAspect > imgAspect) {
        drawW = targetW;
        drawH = drawW / imgAspect;
      } else {
        drawH = targetH;
        drawW = drawH * imgAspect;
      }
    }

    const drawX = (targetW - drawW) / 2;
    const drawY = (targetH - drawH) / 2;

    // Match edge slate-navy background behind canvas so contain bands blend seamlessly
    ctx.fillStyle = "#05334A";
    ctx.fillRect(0, 0, targetW, targetH);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Preload frames (first 10 blocking scroll, rest in background via decode/createImageBitmap)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setIsReducedMotion(prefersReduced);

    const isMobile = window.innerWidth < INTRO_CONFIG.mobileBreakpointPx;
    const baseDir = isMobile ? "/frames-sm" : "/frames";

    let isCancelled = false;

    // If reduced motion, load only the final frame & unlock immediately
    if (prefersReduced) {
      document.documentElement.style.overflow = "";
      setIsLoaderVisible(false);
      window.dispatchEvent(
        new CustomEvent("afroportico:intro-state", { detail: { active: false } })
      );

      const lastIdx = INTRO_CONFIG.frameCount - 1;
      const img = new window.Image();
      img.src = `${baseDir}/frame_${padFrame(lastIdx)}.webp`;
      img.onload = async () => {
        if (isCancelled) return;
        try {
          if (img.decode) await img.decode();
        } catch {
          // ignore
        }
        framesRef.current[lastIdx] = img;
        drawFrame(lastIdx);
      };
      return () => {
        isCancelled = true;
      };
    }

    // Lock scroll while initial 10 frames load
    document.documentElement.style.overflow = "hidden";
    window.dispatchEvent(
      new CustomEvent("afroportico:intro-state", { detail: { active: true } })
    );

    let loadedInitial = 0;
    let isUnlocked = false;

    const unlockScroll = () => {
      if (isUnlocked || isCancelled) return;
      isUnlocked = true;
      document.documentElement.style.overflow = "";
      window.scrollTo(0, 0);
      setIsLoaderVisible(false);
      lastDrawnIndexRef.current = -1;
      drawFrame(0);
      ScrollTrigger.refresh();
    };

    const loadSingleFrame = (idx: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new window.Image();
        img.src = `${baseDir}/frame_${padFrame(idx)}.webp`;
        img.onload = async () => {
          if (isCancelled) return resolve();
          try {
            if (typeof createImageBitmap === "function") {
              const bitmap = await createImageBitmap(img);
              framesRef.current[idx] = bitmap;
            } else {
              if (img.decode) await img.decode();
              framesRef.current[idx] = img;
            }
          } catch {
            framesRef.current[idx] = img;
          }
          resolve();
        };
        img.onerror = () => resolve();
      });
    };

    // Safety timeout so user is never trapped on slow connections
    const safetyTimer = window.setTimeout(unlockScroll, 4000);

    (async () => {
      // Phase 1: Load first 10 frames first
      const initialIndices = Array.from(
        { length: INTRO_CONFIG.initialPreloadCount },
        (_, i) => i
      );

      await Promise.all(
        initialIndices.map(async (idx) => {
          await loadSingleFrame(idx);
          if (isCancelled) return;
          loadedInitial++;
          setLoaderPercent(
            Math.round((loadedInitial / INTRO_CONFIG.initialPreloadCount) * 100)
          );
          if (idx === 0) {
            drawFrame(0);
          }
        })
      );

      window.clearTimeout(safetyTimer);
      unlockScroll();

      // Phase 2: Load remaining frames (10 .. N-1) in small concurrent batches
      const batchSize = 6;
      for (
        let start = INTRO_CONFIG.initialPreloadCount;
        start < INTRO_CONFIG.frameCount;
        start += batchSize
      ) {
        if (isCancelled) break;
        const batch: Promise<void>[] = [];
        for (
          let idx = start;
          idx < Math.min(start + batchSize, INTRO_CONFIG.frameCount);
          idx++
        ) {
          batch.push(loadSingleFrame(idx));
        }
        await Promise.all(batch);
      }
    })();

    return () => {
      isCancelled = true;
      window.clearTimeout(safetyTimer);
      document.documentElement.style.overflow = "";
    };
  }, [drawFrame]);

  // ScrollTrigger mapping + rAF lerp loop + resize redraw
  useEffect(() => {
    if (typeof window === "undefined" || isReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const stage = stageRef.current;
    const scrollCue = scrollIndicatorRef.current;
    if (!section || !stage) return;

    const handleProgress = (progress: number) => {
      // Fade out "Scroll" indicator as soon as scrolling begins
      if (scrollCue) {
        const cueOpacity = gsap.utils.clamp(0, 1, 1 - progress / 0.04);
        scrollCue.style.opacity = String(cueOpacity);
      }

      // Map 0 -> revealPoint (0.92) to frame 0 -> N-1; hold final frame during 0.92 -> 1.0
      const frameProgress = gsap.utils.clamp(
        0,
        1,
        progress / INTRO_CONFIG.revealPoint
      );
      targetFrameRef.current = frameProgress * (INTRO_CONFIG.frameCount - 1);

      // Cross-fade & slide away intro stage at progress 0.92 -> 1.0
      const exitT = gsap.utils.clamp(
        0,
        1,
        (progress - INTRO_CONFIG.revealPoint) / (1 - INTRO_CONFIG.revealPoint)
      );
      stage.style.opacity = String(1 - exitT);
      stage.style.transform = `translate3d(0, ${-exitT * 40}px, 0)`;

      // Handoff to Hero & Header
      const shouldShowHero = progress >= INTRO_CONFIG.revealPoint;
      if (shouldShowHero !== isHeroShownRef.current) {
        isHeroShownRef.current = shouldShowHero;
        window.dispatchEvent(
          new CustomEvent("afroportico:intro-state", {
            detail: { active: !shouldShowHero },
          })
        );
      }
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          handleProgress(self.progress);
        },
        onLeaveBack: () => {
          handleProgress(0);
        },
      });
    }, sectionRef);

    // 60fps rAF lerp loop: only redraw canvas when rounded frame index changes
    let rafId = 0;
    const tick = () => {
      currentFrameRef.current +=
        (targetFrameRef.current - currentFrameRef.current) *
        INTRO_CONFIG.lerpFactor;
      const rounded = Math.round(currentFrameRef.current);

      if (rounded !== lastDrawnIndexRef.current) {
        lastDrawnIndexRef.current = rounded;
        drawFrame(rounded);
      }

      rafId = window.requestAnimationFrame(tick);
    };
    rafId = window.requestAnimationFrame(tick);

    const handleResize = () => {
      lastDrawnIndexRef.current = -1;
      drawFrame(Math.round(currentFrameRef.current));
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      ctx.revert();
    };
  }, [drawFrame, isReducedMotion]);

  const handleSkipToHero = () => {
    const heroEl = document.getElementById("hero");
    if (heroEl) {
      if (window.__lenis) {
        window.__lenis.scrollTo(heroEl, { duration: 1.0 });
      } else {
        heroEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (isReducedMotion) {
    return (
      <section
        id="intro"
        aria-label="Brand introduction"
        className="relative h-[70svh] w-full bg-[#05334A] overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="w-full h-full block"
        />
      </section>
    );
  }

  return (
    <>
      {/* Full-Screen Branded Preloader while initial 10 frames load */}
      {isLoaderVisible && (
        <div
          id="intro-preloader"
          role="progressbar"
          aria-valuenow={loaderPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Loading Afroportico brand intro"
          className="fixed inset-0 z-[100] bg-[#EEF3F5] flex flex-col items-center justify-center px-6 select-none"
        >
          {/* Wide logo sized by width (~1.9:1 aspect ratio) with subtle pulse */}
          <div className="relative w-[clamp(180px,42vw,300px)] aspect-[1105/586] mb-5 animate-pulse">
            <Image
              src="/logo-mark.png"
              alt="Afroportico Integrated Services"
              fill
              priority
              className="object-contain"
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-sm font-bold tracking-widest text-[#05334A] tabular-nums">
              {loaderPercent}%
            </span>
            <div className="w-40 h-[2px] bg-[#05334A]/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2BBB92] transition-all duration-150"
                style={{ width: `${loaderPercent}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 400vh Scroll Scrub Intro Section */}
      <section
        id="intro"
        ref={sectionRef}
        aria-label="Brand introduction"
        className="relative w-full bg-[#05334A]"
        style={{ height: `${INTRO_CONFIG.scrollHeightVh}vh` }}
      >
        <div
          ref={stageRef}
          className="sticky top-0 h-[100svh] w-full overflow-hidden will-change-transform"
        >
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="w-full h-full block"
          />

          {/* Skip to Hero Button (keyboard accessible) */}
          <button
            type="button"
            onClick={handleSkipToHero}
            className="absolute top-5 right-5 sm:top-8 sm:right-8 z-20 h-11 px-5 rounded-full bg-[#05334A]/70 hover:bg-[#05334A]/90 backdrop-blur-md border border-white/25 text-white text-xs font-bold tracking-wider uppercase transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2BBB92] active:scale-95"
            aria-label="Skip intro and go to hero"
          >
            Skip
          </button>

          {/* Animated Scroll Indicator at start of intro */}
          <div
            ref={scrollIndicatorRef}
            aria-hidden="true"
            className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-opacity duration-200"
          >
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/95 drop-shadow-sm">
              Scroll
            </span>
            <span className="w-[1px] h-7 bg-gradient-to-b from-[#2BBB92] to-transparent animate-bounce" />
          </div>
        </div>
      </section>
    </>
  );
}
