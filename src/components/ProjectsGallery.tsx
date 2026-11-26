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
    <section className="py-12 sm:py-24 lg:py-28" id="projects">
      <div className="site-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#087A5E] mb-2 block reveal-fade">
              // Projects
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#04374D] tracking-tight leading-snug reveal-title">
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
                className={`h-9 sm:h-10 px-4 sm:px-5 rounded-full text-xs font-bold transition-all duration-200 ${
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

        {/* Gallery Grid: Clean unobstructed photo + editorial footer below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 reveal-stagger">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="card-hover-effect group rounded-[24px] overflow-hidden bg-white border border-[rgba(4,55,77,0.1)] shadow-sm cursor-pointer flex flex-col justify-between"
            >
              {/* Clean Photo Frame */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#04374D]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Clean Card Body Below Image */}
              <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#087A5E]">
                      {project.category}
                    </span>
                    {project.illustrative && (
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#3D5A68]/70">
                        • Illustrative
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-[#04374D] leading-snug truncate group-hover:text-[#087A5E] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#3D5A68] mt-1 line-clamp-1">
                    {project.scope}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#EEF3F5] group-hover:bg-[#2BC194] text-[#04374D] flex items-center justify-center flex-shrink-0 transition-colors">
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
