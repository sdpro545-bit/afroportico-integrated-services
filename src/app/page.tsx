import Header from "@/components/Header";
import IntroSequence from "@/components/IntroSequence";
import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import WhoWeAre from "@/components/WhoWeAre";
import GhostMarquee from "@/components/GhostMarquee";
import DarkServices from "@/components/DarkServices";
import ProcessSteps from "@/components/ProcessSteps";
import IndustriesList from "@/components/IndustriesList";
import TrustedBy from "@/components/TrustedBy";
import ProjectsGallery from "@/components/ProjectsGallery";
import FaqSection from "@/components/FaqSection";
import ComplianceResources from "@/components/ComplianceResources";
import PreFooterCta from "@/components/PreFooterCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentPath="/" />
      <main className="flex-grow">
        <IntroSequence />
        <div className="-mt-[100svh] relative z-10">
          <Hero />
        </div>
        <FeatureCards />
        <WhoWeAre />
        <GhostMarquee />
        <DarkServices />
        <IndustriesList />
        <TrustedBy />
        <ProjectsGallery />
        <ProcessSteps />
        <FaqSection />
        <ComplianceResources />
        <PreFooterCta />
      </main>
      <Footer />
    </div>
  );
}
