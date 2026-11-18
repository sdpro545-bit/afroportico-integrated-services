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
  bgImage = "/images/hero-2.jpg",
}: PageHeaderProps) {
  return (
    <section className="pt-24 sm:pt-28 pb-8">
      <div className="site-container">
        <div className="relative rounded-[28px] overflow-hidden bg-[#04374D] text-white p-8 sm:p-14 lg:p-16 min-h-[300px] sm:min-h-[360px] flex flex-col justify-end shadow-md">
          {/* Background image overlay */}
          <div className="absolute inset-0">
            <Image
              src={bgImage}
              alt={title}
              fill
              className="object-cover opacity-35 filter contrast-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04374D] via-[#04374D]/80 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2BC194] mb-3">
              <Link href="/" className="hover:underline text-white/80">
                Home
              </Link>
              <span>/</span>
              <span>{breadcrumb}</span>
            </div>

            {eyebrow && (
              <span className="text-xs font-bold uppercase tracking-widest text-[#2BC194] block mb-2">
                {eyebrow}
              </span>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              {title}
            </h1>

            {description && (
              <p className="text-base sm:text-lg text-[#A9C2CD] leading-relaxed max-w-2xl font-normal">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
