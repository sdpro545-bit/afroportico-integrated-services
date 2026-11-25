import React from "react";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import ProjectsGallery from "@/components/ProjectsGallery";
import PreFooterCta from "@/components/PreFooterCta";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Projects | Afroportico Integrated Services Limited",
  description:
    "Explore Afroportico's engineering, procurement, and contracting portfolio across mechanical, electrical, and oilfield services.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentPath="/projects" />

      <main className="flex-grow">
        <PageHeader
          title="From Blueprint to Handover: Our EPC Portfolio"
          eyebrow="Track Record"
          description="Explore our execution capabilities across mechanical installations, oil and gas field facilities, electrical distribution setups, and plant maintenance."
          breadcrumb="Projects"
          bgImage="/images/hero-2.webp"
        />

        <ProjectsGallery />
        <PreFooterCta />
      </main>

      <Footer />
    </div>
  );
}
