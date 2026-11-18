"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import PreFooterCta from "@/components/PreFooterCta";
import Footer from "@/components/Footer";
import { Phone, MapPin, Send, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/content/site";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const subjectParam = searchParams.get("subject") || "quote";

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: subjectParam === "quote" ? "Request a quote" : subjectParam,
    message: "",
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot bot protection
    if (formState.honeypot) return;

    if (!formState.name.trim() || !formState.email.trim() || !formState.phone.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in your name, email address, and phone number.");
      return;
    }

    setStatus("submitting");

    // Domain pending simulation / fallback per Section 2.2b
    setTimeout(() => {
      // In domain pending mode, present confirmed status with phone fallback
      setStatus("success");
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      {/* Form Column (Col 1-7) */}
      <div className="lg:col-span-7 bg-white rounded-[28px] p-6 sm:p-10 border border-[rgba(4,55,77,0.12)] shadow-md">
        <span className="text-xs font-bold uppercase tracking-widest text-[#087A5E] block mb-2">
          Send a Scope of Work
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#04374D] mb-6">
          Request a Consultation or Quotation
        </h2>

        {status === "success" ? (
          <div className="p-8 rounded-2xl bg-[#EEF3F5] border border-[#2BC194] text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#2BC194] text-[#04374D] flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#04374D]">
              Message Received
            </h3>
            <p className="text-sm text-[#3D5A68] leading-relaxed max-w-md mx-auto">
              Thank you for reaching out to Afroportico. For urgent engineering or field mobilization inquiries, call our direct office at{" "}
              <a href={siteConfig.phoneRaw.value} className="font-bold text-[#04374D] underline">
                {siteConfig.phone.value}
              </a>.
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setFormState({
                  name: "",
                  email: "",
                  phone: "",
                  subject: "Request a quote",
                  message: "",
                  honeypot: "",
                });
              }}
              className="text-xs font-bold text-[#087A5E] hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot anti-spam field */}
            <input
              type="text"
              name="website"
              value={formState.honeypot}
              onChange={(e) => setFormState({ ...formState, honeypot: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {status === "error" && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-xs font-bold text-[#04374D] uppercase tracking-wider mb-2">
                Your Full Name *
              </label>
              <input
                id="name"
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="e.g. Engr. Tunde Oghenekaro"
                className="w-full h-14 px-5 rounded-[16px] border border-[rgba(4,55,77,0.15)] bg-[#EEF3F5]/50 focus:bg-white text-sm text-[#04374D] focus:outline-none focus:ring-2 focus:ring-[#04374D]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-[#04374D] uppercase tracking-wider mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full h-14 px-5 rounded-[16px] border border-[rgba(4,55,77,0.15)] bg-[#EEF3F5]/50 focus:bg-white text-sm text-[#04374D] focus:outline-none focus:ring-2 focus:ring-[#04374D]"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-bold text-[#04374D] uppercase tracking-wider mb-2">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  placeholder="+234 800 000 0000"
                  className="w-full h-14 px-5 rounded-[16px] border border-[rgba(4,55,77,0.15)] bg-[#EEF3F5]/50 focus:bg-white text-sm text-[#04374D] focus:outline-none focus:ring-2 focus:ring-[#04374D]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-bold text-[#04374D] uppercase tracking-wider mb-2">
                Inquiry Focus / Service Line
              </label>
              <select
                id="subject"
                value={formState.subject}
                onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                className="w-full h-14 px-5 rounded-[16px] border border-[rgba(4,55,77,0.15)] bg-[#EEF3F5]/50 focus:bg-white text-sm text-[#04374D] focus:outline-none focus:ring-2 focus:ring-[#04374D]"
              >
                <option value="Request a quote">Request a quote</option>
                <option value="Mechanical Services">Mechanical (Refrigeration &amp; HVAC)</option>
                <option value="Oil and Gas Services">Oil and Gas Services (Upstream &amp; Downstream)</option>
                <option value="Facility Management">Facility Management</option>
                <option value="Electrical and Telecommunications">Electrical and Telecommunications</option>
                <option value="Other Scope">Other Scope</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold text-[#04374D] uppercase tracking-wider mb-2">
                Project Scope, Location &amp; Timeline
              </label>
              <textarea
                id="message"
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Describe your equipment specifications, site location in Warri or Niger Delta, and anticipated project timeline..."
                className="w-full p-5 rounded-[16px] border border-[rgba(4,55,77,0.15)] bg-[#EEF3F5]/50 focus:bg-white text-sm text-[#04374D] focus:outline-none focus:ring-2 focus:ring-[#04374D] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full flex items-center justify-center gap-3 h-14 rounded-full bg-[#2BC194] hover:bg-[#4FD6AE] text-[#04374D] font-bold text-sm tracking-wide transition-all shadow-md active:scale-98 disabled:opacity-50"
            >
              <span>{status === "submitting" ? "Submitting Inquiry..." : "Submit Project Inquiry"}</span>
              <Send size={16} strokeWidth={2} />
            </button>
          </form>
        )}
      </div>

      {/* Direct Contact & Warri Details (Col 8-12) */}
      <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
        <div className="bg-[#04374D] text-white rounded-[28px] p-8 sm:p-10 shadow-lg space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2BC194] block">
            Direct Communications
          </span>
          <h3 className="text-2xl font-bold text-white">
            Connect directly with our engineering office.
          </h3>
          <p className="text-sm text-[#A9C2CD] leading-relaxed">
            Our operational headquarters in Effurun, Warri coordinates engineering teams across mechanical, electrical, and oilfield service jobs.
          </p>

          <div className="space-y-5 pt-4 border-t border-white/10">
            <a
              href={siteConfig.phoneRaw.value}
              className="flex items-center gap-4 group"
            >
              <span className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#2BC194] group-hover:scale-105 transition-transform">
                <Phone size={20} strokeWidth={1.75} />
              </span>
              <div>
                <span className="text-xs text-[#A9C2CD] block uppercase tracking-wider font-semibold">
                  Direct Phone Call
                </span>
                <span className="text-base font-bold text-white group-hover:text-[#2BC194] transition-colors">
                  {siteConfig.phone.value}
                </span>
              </div>
            </a>

            <div className="flex items-start gap-4 pt-2">
              <span className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#2BC194] flex-shrink-0 mt-0.5">
                <MapPin size={20} strokeWidth={1.75} />
              </span>
              <div>
                <span className="text-xs text-[#A9C2CD] block uppercase tracking-wider font-semibold">
                  Registered Office
                </span>
                <span className="text-sm text-[#E4EEF2] block mt-0.5 leading-relaxed font-medium">
                  {siteConfig.address.value}
                </span>
                <a
                  href={siteConfig.mapsUrl.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2BC194] hover:underline mt-2"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight size={13} strokeWidth={2.2} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-[24px] bg-white border border-[rgba(4,55,77,0.12)] shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[#087A5E] block mb-1">
            Prompt Response Time
          </span>
          <p className="text-xs sm:text-sm text-[#3D5A68] leading-relaxed">
            All submitted project scopes receive preliminary technical evaluation and follow-up consultation within 24 to 48 business hours.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentPath="/contact-us" />

      <main className="flex-grow">
        <PageHeader
          title="Speak with Our Engineering Leads"
          eyebrow="Contact Afroportico"
          description="Send your scope of work, technical requirements, or schedule a direct site consultation with our teams in Warri, Delta State."
          breadcrumb="Contact Us"
          bgImage="/images/hero-3.jpg"
        />

        <section className="py-12 sm:py-20">
          <div className="site-container">
            <Suspense fallback={<div className="text-center py-12 text-[#04374D]">Loading contact form...</div>}>
              <ContactFormInner />
            </Suspense>
          </div>
        </section>

        <PreFooterCta />
      </main>

      <Footer />
    </div>
  );
}
