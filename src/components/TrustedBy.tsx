"use client";

import React from "react";
import Image from "next/image";
import { clientLogos } from "@/content/site";

export default function TrustedBy() {
  // Hidden in production until client supplies approved logos with permission
  if (!clientLogos || clientLogos.length === 0) {
    return null;
  }

  // Duplicate logos for seamless infinite loop
  const marqueeLogos = [...clientLogos, ...clientLogos];

  return (
    <section className="py-12 sm:py-16 bg-[#EEF3F5] border-y border-[rgba(4,55,77,0.08)] overflow-hidden">
      <div className="site-container mb-8 text-center">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#3D5A68]">
          Trusted by leading brands
        </h3>
      </div>

      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex items-center gap-12 sm:gap-16 w-max animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
          {marqueeLogos.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex-shrink-0"
            >
              <div className="relative h-10 w-28 sm:w-36">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
