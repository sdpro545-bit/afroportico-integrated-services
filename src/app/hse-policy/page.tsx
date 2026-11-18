import React from "react";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import PreFooterCta from "@/components/PreFooterCta";
import Footer from "@/components/Footer";
import { ShieldCheck, Check } from "lucide-react";

export const metadata = {
  title: "HSE Policy Statement | Afroportico Integrated Services Limited",
  description:
    "Official Health, Safety and Environment (HSE) Policy Statement for Afroportico Integrated Services Limited.",
};

export default function HsePolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentPath="/compliance" />

      <main className="flex-grow">
        <PageHeader
          title="Health, Safety &amp; Environment Policy Statement"
          eyebrow="Corporate Safety Standard"
          description="Our documented commitment to ensuring the health and safety of all personnel, safeguarding assets, and protecting the environmental integrity of our operational communities."
          breadcrumb="HSE Policy"
          bgImage="/images/faq-side.png"
        />

        <article className="py-12 sm:py-20">
          <div className="site-container">
            <div className="max-w-3xl mx-auto bg-white rounded-[28px] p-8 sm:p-14 border border-[rgba(4,55,77,0.12)] shadow-md space-y-8">
              <div className="border-b border-[rgba(4,55,77,0.1)] pb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#087A5E] block mb-1">
                  Afroportico Policy Document
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#04374D]">
                  Commitment to Zero Incidents &amp; Environmental Stewardship
                </h2>
                <p className="text-xs text-[#3D5A68] mt-2">
                  Document Reference: AIS-HSE-POL-01 • Head Office: Warri, Delta State
                </p>
              </div>

              <section className="space-y-4">
                <h3 className="text-lg font-bold text-[#04374D]">
                  1. Corporate Safety Policy Statement
                </h3>
                <p className="text-sm sm:text-base text-[#3D5A68] leading-relaxed">
                  Afroportico Integrated Services Limited is committed to conducting all engineering, procurement, contracting, and facility maintenance activities in a manner that protects the health and safety of its employees, contractors, clients, and host communities.
                </p>
                <p className="text-sm sm:text-base text-[#3D5A68] leading-relaxed">
                  We believe that safe operations are good business operations. Management accepts full responsibility for providing a safe working environment, adequate safety equipment, continuous training, and resources necessary to maintain high standards of safety performance.
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-lg font-bold text-[#04374D]">
                  2. Core HSE Commitments
                </h3>
                <div className="space-y-3">
                  {[
                    "Comply with all applicable statutory safety laws and regulations in Nigeria, including NUPRC, Federal Ministry of Environment, and client-specific HSE requirements.",
                    "Identify hazards and assess risks for every task prior to commencing work using documented Job Hazard Analyses (JHA).",
                    "Maintain an active Stop-Work Authority policy empowering every staff member to halt any job perceived to be unsafe without fear of reprisal.",
                    "Minimize environmental impact through waste reduction, efficient energy use, safe chemical handling, and rapid spill response readiness.",
                    "Conduct mandatory daily safety toolbox talks before daily mobilization and debrief after shifts.",
                    "Provide comprehensive personal protective equipment (PPE) suitable for specific operational risks.",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#2BC194] flex items-center justify-center text-[#04374D] flex-shrink-0 mt-0.5">
                        <Check size={12} strokeWidth={2.5} />
                      </span>
                      <p className="text-sm text-[#04374D] font-medium leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-lg font-bold text-[#04374D]">
                  3. Emergency Preparedness &amp; Continuous Review
                </h3>
                <p className="text-sm sm:text-base text-[#3D5A68] leading-relaxed">
                  Afroportico maintains comprehensive emergency preparedness procedures tailored to Warri and Niger Delta operating environments. Regular drills and audit inspections are carried out to test our response readiness.
                </p>
                <p className="text-sm sm:text-base text-[#3D5A68] leading-relaxed">
                  This HSE Policy Statement is subject to periodic management review to ensure ongoing alignment with evolving engineering codes, statutory requirements, and industry best practices.
                </p>
              </section>

              <div className="pt-6 border-t border-[rgba(4,55,77,0.1)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-[#3D5A68] block">Approved for Implementation:</span>
                  <span className="text-sm font-bold text-[#04374D]">Management Board • Afroportico Integrated Services Limited</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#087A5E]">
                  <ShieldCheck size={16} />
                  <span>Verified HSE Standard</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        <PreFooterCta />
      </main>

      <Footer />
    </div>
  );
}
