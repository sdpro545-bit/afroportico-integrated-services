"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { projectsData } from "@/content/site";

export default function ProjectsGallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<(typeof projectsData)[0] | null>(null);

  const categories = ["All", "Mechanical", "Oil and Gas", "Electrical", "Facility Management"];

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section className="py-12 sm:py-20 lg:py-24" id="projects">
      <div className="site-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#087A5E] mb-2 block">
              Projects
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-bold text-[#04374D]">
              From blueprint to handover: our EPC work.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`h-10 px-5 rounded-full text-xs font-bold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#04374D] text-white shadow-sm"
                    : "bg-white border border-[rgba(4,55,77,0.12)] text-[#04374D] hover:bg-[#EEF3F5]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid matching Reference Masonry Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative rounded-[24px] overflow-hidden bg-[#04374D] aspect-[4/3] sm:aspect-[16/11] border border-[rgba(4,55,77,0.12)] shadow-md cursor-pointer"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04374D]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Floating White Caption Card from Reference */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-[18px] bg-white/95 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-between transition-transform duration-300 group-hover:-translate-y-1">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#087A5E] block">
                    {project.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#04374D] leading-tight mt-0.5">
                    {project.title}
                  </h3>
                  <span className="text-xs text-[#3D5A68] block mt-0.5">
                    {project.scope}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#2BC194] text-[#04374D] flex items-center justify-center flex-shrink-0 ml-3">
                  <ArrowUpRight size={16} strokeWidth={2.2} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="relative max-w-3xl w-full bg-white rounded-[28px] overflow-hidden shadow-2xl p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#EEF3F5] text-[#04374D] flex items-center justify-center hover:bg-[#2BC194] transition-colors z-10"
                aria-label="Close modal"
              >
                <X size={20} strokeWidth={2} />
              </button>

              <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden mb-6">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-[#087A5E] block mb-1">
                {selectedProject.category} EPC Capability
              </span>
              <h3 className="text-2xl font-bold text-[#04374D] mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-sm sm:text-base text-[#3D5A68] leading-relaxed mb-6">
                {selectedProject.scope}. Every milestone is verified by rigorous QA/QC inspection protocols, compliance documentation, and strict adherence to Nigerian HSE regulations.
              </p>

              <div className="pt-4 border-t border-[rgba(4,55,77,0.12)] flex items-center justify-between">
                <span className="text-xs text-[#3D5A68]">
                  Verified Warri Operations • Delta State
                </span>
                <a
                  href="/contact-us?subject=quote"
                  className="text-xs font-bold text-[#087A5E] hover:underline"
                >
                  Request Technical Specification ↗
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
