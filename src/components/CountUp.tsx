"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "@/utils/motion";

interface CountUpProps {
  target: number;
  pad?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({
  target,
  pad = 0,
  suffix = "",
  prefix = "",
  duration = 1.2,
  className = "",
}: CountUpProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  const formatVal = (val: number) => {
    const rounded = Math.round(val);
    const str = pad > 0 ? String(rounded).padStart(pad, "0") : String(rounded);
    return `${prefix}${str}${suffix}`;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = spanRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      el.textContent = formatVal(target);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const obj = { val: 0 };

    const tween = gsap.to(obj, {
      val: target,
      duration,
      ease: EASE.out,
      scrollTrigger: {
        trigger: el,
        start: "top 92%",
        once: true,
      },
      onUpdate: () => {
        if (el) {
          el.textContent = formatVal(obj.val);
        }
      },
    });

    return () => {
      tween.kill();
    };
  }, [target, pad, suffix, prefix, duration]);

  return (
    <span ref={spanRef} className={`tabular-nums ${className}`}>
      {formatVal(target)}
    </span>
  );
}
