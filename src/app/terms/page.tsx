import React from "react";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | Afroportico Integrated Services Limited",
  description: "Terms and conditions of website use for Afroportico Integrated Services Limited.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentPath="/" />
      <main className="flex-grow">
        <PageHeader
          title="Terms of Service"
          eyebrow="Legal Notice"
          description="Terms governing the use of this website and communication channels for Afroportico Integrated Services Limited."
          breadcrumb="Terms of Service"
        />

        <article className="py-12 sm:py-20">
          <div className="site-container">
            <div className="max-w-3xl mx-auto bg-white rounded-[28px] p-8 sm:p-12 border border-[rgba(4,55,77,0.12)] shadow-sm space-y-6 text-[#3D5A68] text-sm sm:text-base leading-relaxed">
              <div className="p-4 rounded-xl bg-[#EEF3F5] text-xs text-[#04374D] font-medium border border-[rgba(4,55,77,0.1)]">
                Draft legal text prepared for Afroportico Integrated Services Limited. Subject to final corporate legal approval.
              </div>

              <h2 className="text-xl font-bold text-[#04374D]">1. General Use</h2>
              <p>
                By accessing this website, you agree to comply with these Terms of Service and applicable Nigerian laws and regulations. The content on this website is provided for general informational purposes concerning Afroportico Integrated Services Limited.
              </p>

              <h2 className="text-xl font-bold text-[#04374D]">2. Engineering Proposals &amp; Quotations</h2>
              <p>
                Information submitted through our quote forms does not constitute a binding contract. Formal engineering contracts, procurement commitments, and technical specifications are executed through signed commercial agreements.
              </p>

              <h2 className="text-xl font-bold text-[#04374D]">3. Intellectual Property</h2>
              <p>
                The Afroportico emblem, trade name, layout designs, and compiled text are the property of Afroportico Integrated Services Limited and may not be reproduced without written authorization.
              </p>

              <h2 className="text-xl font-bold text-[#04374D]">4. Governing Law</h2>
              <p>
                These terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria.
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
