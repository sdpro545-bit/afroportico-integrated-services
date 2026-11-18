import React from "react";
import Image from "next/image";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import PreFooterCta from "@/components/PreFooterCta";
import Footer from "@/components/Footer";
import { Check, ShieldCheck, Wrench, HardHat, Award } from "lucide-react";
import { siteConfig } from "@/content/site";

export const metadata = {
  title: "About Us | Afroportico Integrated Services Limited",
  description:
    "Learn about Afroportico Integrated Services Limited: Warri-based multi-disciplinary engineering, procurement, and contracting firm built on international standards.",
};

export default function AboutPage() {
  const values = [
    {
      icon: ShieldCheck,
      title: "Zero-Compromise HSE",
      description:
        "Every job is risk-assessed, planned, and executed with our Goal Zero safety standard to protect all workers, client assets, and neighboring environments.",
    },
    {
      icon: Wrench,
      title: "Technical Rigour",
      description:
        "We implement documented QA/QC procedures across all mechanical, electrical, and facility works from initial engineering through commissioning.",
    },
    {
      icon: HardHat,
      title: "Nigerian Operational Agility",
      description:
        "Headquartered in Effurun, Warri, Delta State, our localized teams mobilize swiftly across Niger Delta industrial and commercial facilities.",
    },
    {
      icon: Award,
      title: "Delivery on Scope & Budget",
      description:
        "Transparent schedules, tracked scopes of work, and clear communication from kickoff to project handover.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header currentPath="/about-us" />

      <main className="flex-grow">
        <PageHeader
          title="Engineering Excellence with Nigerian Roots"
          eyebrow="About Afroportico"
          description="A multi-disciplinary EPC partner delivering mechanical, oil and gas, facility management, and electrical systems with unyielding dedication to international quality and safety."
          breadcrumb="About Us"
          bgImage="/images/hero-1.png"
        />

        {/* Narrative Section */}
        <section className="py-12 sm:py-20">
          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/11] rounded-[28px] overflow-hidden border border-[rgba(4,55,77,0.12)] shadow-md">
                <Image
                  src="/images/who-we-are-main.png"
                  alt="Afroportico engineers inspecting operations in Warri"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#087A5E] block">
                  Our Corporate Mission
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold text-[#04374D] leading-tight">
                  Disciplined project controls, proven HSE practices, and a steady focus on quality.
                </h2>
                <p className="text-sm sm:text-base text-[#3D5A68] leading-relaxed">
                  Afroportico Integrated Services Limited is structured to bridge the gap between heavy industry requirements and local delivery agility. We combine experienced Nigerian engineering leadership with rigorous operational controls.
                </p>
                <p className="text-sm sm:text-base text-[#3D5A68] leading-relaxed">
                  Whether providing industrial refrigeration retrofits, oilfield technical maintenance, facility management solutions, or power infrastructure support, we ensure total compliance with Nigerian statutory codes and client benchmarks.
                </p>

                <div className="pt-2">
                  <div className="p-4 rounded-2xl bg-white border border-[rgba(4,55,77,0.1)] flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#2BC194] text-[#04374D] flex items-center justify-center font-bold">
                      AIS
                    </div>
                    <div>
                      <span className="text-xs text-[#3D5A68] block">Registered Corporate Office</span>
                      <span className="text-sm font-bold text-[#04374D] block">{siteConfig.address.value}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Grid */}
        <section className="py-12 sm:py-20 bg-white/60 border-y border-[rgba(4,55,77,0.08)]">
          <div className="site-container">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-[#087A5E] block mb-2">
                Our Foundation
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#04374D]">
                Built on Principles that Endure
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div
                    key={i}
                    className="p-6 rounded-[24px] bg-white border border-[rgba(4,55,77,0.12)] shadow-[0_1px_2px_rgba(4,55,77,0.06),0_12px_32px_rgba(4,55,77,0.08)] flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-[#EEF3F5] text-[#04374D] flex items-center justify-center mb-5">
                        <Icon size={24} strokeWidth={1.75} />
                      </div>
                      <h3 className="text-lg font-bold text-[#04374D] mb-3">
                        {v.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#3D5A68] leading-relaxed">
                        {v.description}
                      </p>
                    </div>
                    <div className="mt-6 pt-3 border-t border-[rgba(4,55,77,0.08)] flex justify-end">
                      <span className="w-2 h-2 rounded-full bg-[#2BC194]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <PreFooterCta />
      </main>

      <Footer />
    </div>
  );
}
