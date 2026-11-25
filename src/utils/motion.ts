import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);

  // Register tokens once
  if (!CustomEase.get("out")) {
    CustomEase.create("out", "0.16, 1, 0.3, 1");
  }
  if (!CustomEase.get("inout")) {
    CustomEase.create("inout", "0.65, 0, 0.35, 1");
  }
}

export const EASE = {
  out: "out",
  inout: "inout",
} as const;
