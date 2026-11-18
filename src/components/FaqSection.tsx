"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { faqData } from "@/content/site";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-20 lg:py-24" id="faq">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Photo Frame */}
          <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-full rounded-[28px] overflow-hidden bg-[#04374D] border border-[rgba(4,55,77,0.12)] shadow-md">
            <Image
              src="/images/faq-side.png"
              alt="Afroportico engineers conducting safety toolbox meeting in Delta State"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04374D]/90 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2BC194] mb-1">
                Zero-Accident Safety
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                Clear engineering answers backed by field experience.
              </h3>
            </div>
          </div>

          {/* Right Column: Navy Accordion Block (radius 28) */}
          <div className="lg:col-span-7 bg-[#04374D] text-white rounded-[28px] p-6 sm:p-10 lg:p-12 shadow-lg flex flex-col justify-center">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2BC194] block mb-2">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Questions before you start?
              </h2>
            </div>

            <div className="divide-y divide-white/15">
              {faqData.map((faq, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div key={idx} className="py-5 sm:py-6">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(idx)}
                      className="w-full flex items-center justify-between text-left gap-4 focus:outline-none focus:text-[#2BC194]"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base sm:text-lg font-bold text-white transition-colors">
                        {faq.question}
                      </span>
                      <span
                        className={`w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#2BC194] transition-transform duration-300 flex-shrink-0 ${
                          isOpen ? "rotate-45 bg-[#2BC194] text-[#04374D]" : "rotate-0"
                        }`}
                      >
                        <Plus size={18} strokeWidth={2.2} />
                      </span>
                    </button>

                    {/* Smooth Animated Height Panel */}
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm sm:text-base text-[#A9C2CD] leading-relaxed pr-6">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
