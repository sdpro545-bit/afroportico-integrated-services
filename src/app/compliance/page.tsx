import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import PreFooterCta from "@/components/PreFooterCta";
import Footer from "@/components/Footer";
import { ShieldCheck, ClipboardCheck, ArrowUpRight, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Compliance & HSE | Afroportico Integrated Services Limited",
  description:
    "Our commitments to zero-incident Health, Safety & Environment (HSE) standards and rigorous Quality Assurance/Quality Control (QA/QC) procedures.",
};

export default function CompliancePage() {
  const qualityPillars = [
    {
      title: "Documented Inspection & Test Plans (ITP)",
      description:
        "Every installation begins with an approved inspection and testing schedule, validating raw materials, torque specifications, and electrical continuity.",
    },
    {
      title: "Material Traceability & OEM Authenticity",
      description:
        "All valves, piping components, refrigerants, cables, and switchgear are procured directly from certified original equipment manufacturers.",
    },
    {
      title: "Independent QA/QC Sign-off",
      description:
        "Field sign-offs require dual verification by our QA/QC inspection leads before any system is energized or pressurized.",
    },
    {
      title: "Continuous Defect Prevention",
      description:
        "Root cause analyses are conducted for any non-conformance, ensuring immediate correction and system-wide knowledge transfer.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header currentPath="/compliance" />

      <main className="flex-grow">
        <PageHeader
          title="Zero-Incident Culture &amp; Quality Discipline"
          eyebrow="HSE &amp; Quality Management"
          description="At Afroportico, safety and quality are not afterthoughts. They are the non-negotiable foundations upon which our engineering operations are planned and executed."
          breadcrumb="Compliance"
          bgImage="/images/faq-side.png"
        />

        {/* HSE Commitment Overview */}
        <section className="py-12 sm:py-20">
          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#087A5E] block">
                  Safety First
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold text-[#04374D] leading-tight">
                  Goal Zero: Protecting our workforce, community, and the environment.
                </h2>
                <p className="text-sm sm:text-base text-[#3D5A68] leading-relaxed">
                  We subscribe to the principle that all workplace incidents and injuries are preventable. Before any technician picks up a tool, a Job Hazard Analysis (JHA) is performed, toolbox talks are conducted, and mandatory PPE is inspected.
                </p>
                <p className="text-sm sm:text-base text-[#3D5A68] leading-relaxed">
                  Every employee and contractor on an Afroportico site exercises unconditional Stop-Work Authority whenever an unsafe act or hazardous condition is identified.
                </p>

                <div className="pt-2">
                  <Link
                    href="/hse-policy"
                    className="inline-flex items-center gap-3 h-12 pl-6 pr-2.5 rounded-full bg-[#04374D] hover:bg-[#022636] text-white text-xs font-bold transition-all shadow-md group"
                  >
                    <span>Read Full HSE Policy Statement</span>
                    <span className="w-8 h-8 rounded-full bg-[#2BC194] text-[#04374D] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                      <ArrowUpRight size={14} strokeWidth={2.2} />
                    </span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 relative aspect-[4/3] rounded-[28px] overflow-hidden border border-[rgba(4,55,77,0.12)] shadow-md">
                <Image
                  src="/images/faq-side.png"
                  alt="Afroportico engineers conducting safety toolbox meeting in Delta State"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quality Statement Section with anchor id="quality" */}
        <section id="quality" className="py-12 sm:py-20 bg-white/70 border-t border-[rgba(4,55,77,0.08)]">
          <div className="site-container">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-[#087A5E] block mb-2">
                Quality Assurance
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#04374D]">
                Our Quality Statement &amp; QA/QC Protocols
              </h2>
              <p className="text-sm sm:text-base text-[#3D5A68] mt-3">
                Our quality management framework governs every project phase from procurement verification to pre-commissioning checks.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {qualityPillars.map((qp, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-[24px] bg-white border border-[rgba(4,55,77,0.12)] shadow-[0_1px_2px_rgba(4,55,77,0.06),0_12px_32px_rgba(4,55,77,0.08)] flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-[#EEF3F5] text-[#087A5E] flex items-center justify-center flex-shrink-0 mt-1">
                    <ClipboardCheck size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#04374D] mb-2">
                      {qp.title}
                    </h3>
                    <p className="text-sm text-[#3D5A68] leading-relaxed">
                      {qp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PreFooterCta />
      </main>

      <Footer />
    </div>
  );
}
