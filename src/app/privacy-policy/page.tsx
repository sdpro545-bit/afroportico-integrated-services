import React from "react";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Afroportico Integrated Services Limited",
  description: "Privacy policy and client data handling principles for Afroportico Integrated Services Limited.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentPath="/" />
      <main className="flex-grow">
        <PageHeader
          title="Privacy Policy"
          eyebrow="Legal & Data Stewardship"
          description="How Afroportico Integrated Services Limited handles client contact information, project briefs, and technical inquiries."
          breadcrumb="Privacy Policy"
        />

        <article className="py-12 sm:py-20">
          <div className="site-container">
            <div className="max-w-3xl mx-auto bg-white rounded-[28px] p-8 sm:p-12 border border-[rgba(4,55,77,0.12)] shadow-sm space-y-6 text-[#3D5A68] text-sm sm:text-base leading-relaxed">
              <div className="p-4 rounded-xl bg-[#EEF3F5] text-xs text-[#04374D] font-medium border border-[rgba(4,55,77,0.1)]">
                Draft legal text prepared for Afroportico Integrated Services Limited. Subject to final legal review.
              </div>

              <h2 className="text-xl font-bold text-[#04374D]">1. Information We Collect</h2>
              <p>
                Afroportico Integrated Services Limited collects only the business information you voluntarily provide through our website contact forms, quotation requests, or direct correspondence, including your name, email, phone number, and project specifications.
              </p>

              <h2 className="text-xl font-bold text-[#04374D]">2. How We Use Your Information</h2>
              <p>
                We use collected information solely to respond to engineering inquiries, prepare technical proposals and cost estimates, and manage ongoing contractual engagements. We do not sell, rent, or distribute client contact details to third parties.
              </p>

              <h2 className="text-xl font-bold text-[#04374D]">3. Data Security &amp; Retention</h2>
              <p>
                Project documents and commercial communications are retained under secure operational safeguards. We retain correspondence only as long as necessary to fulfill project requirements or comply with Nigerian commercial laws.
              </p>

              <h2 className="text-xl font-bold text-[#04374D]">4. Contact Us</h2>
              <p>
                If you have questions regarding this privacy policy or your information, write to us at 37 Water Resources Road, Effurun, Warri, Delta State, Nigeria or call +234 803 088 5952.
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
