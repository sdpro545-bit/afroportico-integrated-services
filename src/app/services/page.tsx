import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import IndustriesList from "@/components/IndustriesList";
import PreFooterCta from "@/components/PreFooterCta";
import Footer from "@/components/Footer";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import { servicesData } from "@/content/site";

export const metadata = {
  title: "Our Services | Afroportico Integrated Services Limited",
  description:
    "Explore our four primary service lines: Mechanical, Oil and Gas Services, Facility Management, and Electrical & Telecommunications.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentPath="/services" />

      <main className="flex-grow">
        <PageHeader
          title="Engineered Services for Nigerian Industry"
          eyebrow="Our Core Capabilities"
          description="Comprehensive engineering, procurement, and contracting services designed to keep mechanical, electrical, and oilfield operations safe, compliant, and cost-effective."
          breadcrumb="Services"
          bgImage="/images/service-mechanical.webp"
        />

        {/* Detailed Service Blocks with Alternating Layouts */}
        <section className="py-12 sm:py-20">
          <div className="site-container space-y-16 sm:space-y-24">
            {servicesData.map((service, index) => {
              const isEven = index % 2 === 1;

              return (
                <div
                  key={service.id}
                  id={service.slug}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center p-6 sm:p-10 rounded-[28px] bg-white border border-[rgba(4,55,77,0.12)] shadow-[0_1px_2px_rgba(4,55,77,0.06),0_12px_32px_rgba(4,55,77,0.08)]"
                >
                  {/* Photo Column */}
                  <div
                    className={`lg:col-span-5 relative aspect-[16/11] rounded-[24px] overflow-hidden border-2 border-[rgba(4,55,77,0.1)] shadow-inner ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-[#04374D] uppercase tracking-wider">
                      {service.eyebrow}
                    </div>
                  </div>

                  {/* Copy Column */}
                  <div className={`lg:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#087A5E] block mb-2">
                      AIS Scope 0{index + 1}
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#04374D] mb-4">
                      {service.title}
                    </h2>
                    <p className="text-sm sm:text-base text-[#3D5A68] leading-relaxed mb-6">
                      {service.shortDesc}
                    </p>

                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#04374D] mb-3">
                      Key Deliverables &amp; Focus Areas:
                    </h3>
                    <ul className="space-y-2.5 mb-8">
                      {service.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3 text-sm text-[#04374D]">
                          <CheckCircle2 size={16} className="text-[#2BC194] mt-0.5 flex-shrink-0" />
                          <span className="font-medium">{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Request This Service Button with prefilled subject */}
                    <Link
                      href={`/contact-us?subject=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center gap-3 h-12 pl-6 pr-2.5 rounded-full bg-[#04374D] hover:bg-[#022636] text-white text-xs font-bold transition-all shadow-md group"
                    >
                      <span>Request this service</span>
                      <span className="w-8 h-8 rounded-full bg-[#2BC194] text-[#04374D] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                        <ArrowUpRight size={14} strokeWidth={2.2} />
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <IndustriesList />
        <PreFooterCta />
      </main>

      <Footer />
    </div>
  );
}
