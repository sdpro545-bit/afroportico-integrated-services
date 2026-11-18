import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import WhoWeAre from "@/components/WhoWeAre";
import GhostMarquee from "@/components/GhostMarquee";
import DarkServices from "@/components/DarkServices";
import ProcessSteps from "@/components/ProcessSteps";
import IndustriesList from "@/components/IndustriesList";
import FaqSection from "@/components/FaqSection";
import ProjectsGallery from "@/components/ProjectsGallery";
import ComplianceResources from "@/components/ComplianceResources";
import PreFooterCta from "@/components/PreFooterCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentPath="/" />
      <main className="flex-grow">
        <Hero />
        <FeatureCards />
        <WhoWeAre />
        <GhostMarquee />
        <DarkServices />
        <ProcessSteps />
        <IndustriesList />
        <FaqSection />
        <ProjectsGallery />
        <ComplianceResources />
        <PreFooterCta />
      </main>
      <Footer />
    </div>
  );
}
