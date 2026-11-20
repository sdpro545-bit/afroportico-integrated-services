"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { projectsData } from "@/content/site";

export default function ProjectsGallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<(typeof projectsData)[0] | null>(null);

  const categories = ["All", "Electrical", "Facility Management", "Mechanical"];

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
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#087A5E] mb-2 block reveal-fade">
              // Projects
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-bold text-[#04374D] tracking-tight reveal-title">
              From Blueprint to Breakthrough: Our Proven EPC Solutions
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 reveal-stagger">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="card-hover-effect group relative rounded-[24px] overflow-hidden bg-[#04374D] aspect-[4/3] sm:aspect-[16/11] border border-[rgba(4,55,77,0.12)] shadow-md cursor-pointer"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04374D]/85 via-[#04374D]/25 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

              {/* Illustrative Tag */}
              {project.illustrative && (
                <div className="absolute top-4 right-4 text-[9px] font-mono uppercase tracking-wider text-white/80 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  Illustrative Reference
                </div>
              )}

              {/* Floating Caption Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-[18px] bg-white/95 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-between transition-transform duration-300 group-hover:-translate-y-1">
                <div className="max-w-[78%]">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#087A5E] block">
                    {project.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#04374D] leading-tight mt-0.5 truncate">
                    {project.title}
                  </h3>
                  <span className="text-xs text-[#3D5A68] block mt-0.5 line-clamp-1">
                    {project.scope}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#2BC194] text-[#04374D] flex items-center justify-center flex-shrink-0 ml-3 shadow-xs">
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
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#04374D] z-10"
                aria-label="Close modal"
              >
                <X size={20} strokeWidth={2} />
              </button>

              <div className="relative aspect-[16/10] w-full rounded-[20px] overflow-hidden mb-6 bg-[#04374D]">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#087A5E]">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#04374D] mt-1">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm text-[#3D5A68] mt-2">
                    {selectedProject.scope}
                  </p>
                </div>

                <a
                  href="/contact-us?subject=project-inquiry"
                  className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-[#2BC194] hover:bg-[#4FD6AE] text-[#04374D] text-xs font-bold transition-all flex-shrink-0"
                >
                  Inquire on Similar Project
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
