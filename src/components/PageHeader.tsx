import React from "react";
import Link from "next/link";
import Image from "next/image";

interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  description?: string;
  breadcrumb: string;
  bgImage?: string;
}

export default function PageHeader({
  title,
  eyebrow,
  description,
  breadcrumb,
  bgImage = "/images/hero-2.webp",
}: PageHeaderProps) {
  return (
    <section className="pt-24 sm:pt-28 pb-8">
      <div className="site-container">
        <div className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden bg-[#04374D] text-white p-6 sm:p-12 lg:p-14 min-h-[240px] sm:min-h-[320px] flex flex-col justify-end shadow-md">
          {/* Background image overlay */}
          <div className="absolute inset-0">
            <Image
              src={bgImage}
              alt={title}
              fill
              className="object-cover opacity-55 filter contrast-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#022636]/90 via-[#04374D]/55 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2BC194] mb-3">
              <Link href="/" className="hover:underline text-white/80">
                Home
              </Link>
              <span>/</span>
              <span>{breadcrumb}</span>
            </div>

            {eyebrow && (
              <span className="text-xs font-bold uppercase tracking-widest text-[#2BC194] block mb-2 reveal-fade">
                {eyebrow}
              </span>
            )}

            <h1
              style={{ color: "#FFFFFF" }}
              className="text-2xl sm:text-3xl lg:text-[42px] font-semibold tracking-[-0.025em] !text-white leading-[1.16] mb-3 reveal-title drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
            >
              {title}
            </h1>

            {description && (
              <p
                style={{ color: "#E4EEF2" }}
                className="text-sm sm:text-base !text-[#E4EEF2] leading-relaxed max-w-xl font-normal reveal-fade"
              >
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
