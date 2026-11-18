export interface ContentField<T = string> {
  value: T;
  status: "approved" | "draft" | "pending";
}

export const siteConfig = {
  name: {
    value: "Afroportico Integrated Services Limited",
    status: "approved" as const,
  },
  shortName: {
    value: "Afroportico",
    status: "approved" as const,
  },
  tagline: {
    value: "Engineering, Procurement and Contracting",
    status: "approved" as const,
  },
  address: {
    value: "37 Water Resources Road, Effurun, Warri, Delta State, Nigeria.",
    status: "approved" as const,
  },
  phone: {
    value: "+234 803 088 5952",
    status: "approved" as const,
  },
  phoneRaw: {
    value: "+2348030885952",
    status: "approved" as const,
  },
  email: {
    value: "afroportico@gmail.com",
    status: "approved" as const,
  },
  mapsUrl: {
    value: "https://www.google.com/maps/search/?api=1&query=37+Water+Resources+Road+Effurun+Warri+Delta+State+Nigeria",
    status: "approved" as const,
  },
  yearFounded: {
    value: "[YEAR_FOUNDED]",
    status: "pending" as const,
  },
  cacNumber: {
    value: "[CAC_RC_NUMBER]",
    status: "pending" as const,
  },
};

export const heroSlides = [
  {
    eyebrow: "Integrated services from Warri, Delta State",
    title: "Welcome to Afroportico Integrated Services Limited",
    highlight: "Integrated Services",
    description:
      "Engineering, procurement and contracting across mechanical, electrical, refrigeration and air conditioning, facility management and telecoms. Built on international standards, a strong HSE culture and delivery on time and within budget.",
    primaryCta: { label: "Our Services", href: "/services" },
    secondaryCta: { label: "Call +234 803 088 5952", href: "tel:+2348030885952" },
    image: "/images/hero-1.png",
    alt: "Afroportico engineering technician on site in Warri",
  },
  {
    eyebrow: "Engineered for Nigerian Industry",
    title: "EPC Delivery Across Mechanical, Oil & Gas",
    highlight: "Mechanical, Oil & Gas",
    description:
      "Reliable upstream, downstream and heavy facility engineering with rigorous QA/QC inspection controls and dedicated maintenance support across Delta State and beyond.",
    primaryCta: { label: "Explore Projects", href: "/projects" },
    secondaryCta: { label: "Request a Quote", href: "/contact-us?subject=quote" },
    image: "/images/hero-2.jpg",
    alt: "Industrial pipeline and oilfield facility infrastructure",
  },
  {
    eyebrow: "Power & Facility Management",
    title: "Quality Maintenance and International Standards",
    highlight: "International Standards",
    description:
      "From power distribution switchgear and cell site upkeep to central cold room systems, our teams safeguard uptime and operational efficiency for critical infrastructure.",
    primaryCta: { label: "HSE & Compliance", href: "/compliance" },
    secondaryCta: { label: "Contact Engineers", href: "/contact-us" },
    image: "/images/hero-3.jpg",
    alt: "Turbine generator and power engineering installation",
  },
];

export const featureCards = [
  {
    id: "standards",
    icon: "ShieldCheck",
    title: "International standards",
    description:
      "Our work follows recognised engineering standards, from design through to handover.",
    link: "/about-us",
  },
  {
    id: "hse",
    icon: "BadgeCheck",
    title: "Strong HSE culture",
    description:
      "Safety is planned into every job before the first tool is picked up.",
    link: "/compliance",
  },
  {
    id: "qaqc",
    icon: "ClipboardCheck",
    title: "QA/QC discipline",
    description:
      "Every installation is inspected and documented before we call it done.",
    link: "/compliance",
  },
  {
    id: "delivery",
    icon: "CalendarCheck",
    title: "On time, on budget",
    description:
      "Clear scopes, tracked schedules and straight talk from kickoff to handover.",
    link: "/services",
  },
];

export const whoWeAreContent = {
  eyebrow: "Who we are",
  titlePart1: "Engineering excellence with ",
  highlightText: "Nigerian roots.",
  missionTab: {
    label: "Our Mission",
    status: "draft" as const,
    content:
      "To deliver engineering, procurement and contracting work that is safe, on schedule and built to last.",
  },
  visionTab: {
    label: "Our Vision",
    status: "pending" as const,
    content: "[VISION_STATEMENT]",
  },
  historyTab: {
    label: "Our History",
    status: "pending" as const,
    content: "[HISTORY_TEXT]",
  },
  body: "We bring disciplined project controls, proven HSE practices and a steady focus on quality. We deliver safely, on time and on budget.",
  checklist: [
    "International standards",
    "Strong HSE culture",
    "Clear communication from kickoff to handover",
  ],
  callPrompt: "Have a question?",
  phoneDisplay: "Call us on +234 803 088 5952",
  phoneRaw: "tel:+2348030885952",
  mainImage: "/images/who-we-are-main.png",
  smallImage: "/images/who-we-are-small.jpg",
};

export const servicesData = [
  {
    id: "mechanical",
    slug: "mechanical",
    title: "Mechanical Services",
    eyebrow: "Refrigeration & HVAC",
    shortDesc:
      "Design, installation and maintenance of industrial refrigeration and air conditioning, with sales, leasing and planned maintenance for all scales.",
    bullets: [
      "Industrial refrigeration and air conditioning",
      "Sales, leasing and maintenance of room, split and central ACs",
      "Cold room supply, installation and maintenance",
    ],
    image: "/images/service-mechanical.webp",
    alt: "Industrial mechanical refrigeration and HVAC systems",
  },
  {
    id: "oil-and-gas",
    slug: "oil-and-gas",
    title: "Oil and Gas Services",
    eyebrow: "EPC Upstream & Downstream",
    shortDesc:
      "EPC delivery for upstream and downstream operations: HVAC, electrical, equipment supply and site maintenance.",
    bullets: [
      "Upstream and downstream field technical services",
      "Specialized oilfield HVAC and ventilation systems",
      "Heavy equipment procurement and preventive maintenance",
    ],
    image: "/images/service-oil-gas.webp",
    alt: "Oil and gas EPC manifold and pipeline infrastructure",
  },
  {
    id: "facility-management",
    slug: "facility-management",
    title: "Facility Management",
    eyebrow: "Operations & Upkeep",
    shortDesc:
      "Planned and reactive maintenance that keeps buildings, plants and sites running at maximum operational reliability.",
    bullets: [
      "Comprehensive planned preventive maintenance (PPM)",
      "24/7 reactive breakdown and rapid repair response",
      "Plant utilities, HVAC monitoring and building integrity upkeep",
    ],
    image: "/images/service-facility.webp",
    alt: "Industrial facility plant and building operations management",
  },
  {
    id: "electrical-telecoms",
    slug: "electrical-telecoms",
    title: "Electrical & Telecommunications",
    eyebrow: "Power Systems & Networks",
    shortDesc:
      "Power distribution, cell site maintenance, battery installations, and generator supply, leasing and maintenance.",
    bullets: [
      "Industrial power distribution and MV/LV switchboards",
      "Telecom cell site turnkey power and battery bank installations",
      "Diesel generator supply, leasing, overhaul and planned maintenance",
    ],
    image: "/images/service-electrical.webp",
    alt: "Electrical switchgear and cell site power distribution system",
  },
];

export const stepsData = [
  {
    number: "01",
    title: "Engineering",
    description:
      "We define scope, standards and design with you before anything is ordered.",
  },
  {
    number: "02",
    title: "Procurement",
    description:
      "We source equipment and parts through OEMs and approved suppliers.",
  },
  {
    number: "03",
    title: "Contracting",
    description:
      "We install and commission under HSE and QA/QC control.",
  },
  {
    number: "04",
    title: "Maintenance",
    description:
      "Planned upkeep keeps the system performing long after handover.",
  },
];

export const industriesData = [
  {
    id: "oil-gas",
    title: "Oil and Gas",
    description:
      "EPC delivery for upstream and downstream operations, including HVAC, electrical, equipment supply and site maintenance.",
    image: "/images/industry-oilgas.jpg",
  },
  {
    id: "manufacturing",
    title: "Manufacturing and FMCG",
    description:
      "Industrial refrigeration, power distribution and facility management for production sites that cannot afford downtime.",
    image: "/images/industry-fmcg.jpg",
  },
  {
    id: "telecoms",
    title: "Telecoms and Power",
    description:
      "Cell site maintenance, battery installations, and generator supply, leasing and maintenance, so networks stay up.",
    image: "/images/industry-power.jpg",
  },
  {
    id: "public-sector",
    title: "Public Sector and Infrastructure",
    description:
      "Turnkey projects built to international standards, safe, efficient and compliant with regulations.",
    image: "/images/industry-infra.jpg",
  },
];

export const faqData = [
  {
    question: "What services do you offer?",
    answer:
      "Mechanical, oil and gas, facility management, and electrical and telecommunications services. The services page has the complete technical detail.",
  },
  {
    question: "How do I request a quote?",
    answer:
      "Use our online quote form, call +234 803 088 5952 directly, or speak with our engineers in Warri. We review your scope, site and timeline immediately.",
  },
  {
    question: "How do you manage safety?",
    answer:
      "HSE is planned into each job from the start before work commences. Read our HSE policy statement and compliance standards on our compliance page.",
  },
  {
    question: "Where are your main operations located?",
    answer:
      "Our registered office is located at 37 Water Resources Road, Effurun, Warri, Delta State, Nigeria, deploying technical crews across regional industrial clusters.",
  },
];

export const projectsData = [
  {
    id: "p1",
    title: "Industrial Refrigeration Installation",
    category: "Mechanical",
    image: "/images/project-1.jpg",
    scope: "Heavy industrial cooling plant commissioning",
    illustrative: true,
  },
  {
    id: "p2",
    title: "Facility Pumping & Manifold Station",
    category: "Oil and Gas",
    image: "/images/project-2.jpg",
    scope: "Fluid distribution and flow line maintenance",
    illustrative: true,
  },
  {
    id: "p3",
    title: "Turnkey Power Generation Setup",
    category: "Electrical",
    image: "/images/project-3.jpg",
    scope: "High-capacity diesel generator installation",
    illustrative: true,
  },
  {
    id: "p4",
    title: "Central AC System Retrofit",
    category: "Mechanical",
    image: "/images/project-4.jpg",
    scope: "Ducting, chilling and air handling overhaul",
    illustrative: true,
  },
  {
    id: "p5",
    title: "Cell Site Telecommunications Power",
    category: "Electrical",
    image: "/images/project-5.jpg",
    scope: "Solar hybrid and battery storage deployment",
    illustrative: true,
  },
  {
    id: "p6",
    title: "Industrial Plant Facility Upkeep",
    category: "Facility Management",
    image: "/images/project-6.jpg",
    scope: "Preventive maintenance and utility management",
    illustrative: true,
  },
];

export const complianceResources = [
  {
    id: "hse",
    title: "HSE Policy Statement",
    category: "Safety Standard",
    description:
      "Our framework for hazard identification, risk assessment, and zero-accident commitment across all engineering sites.",
    link: "/hse-policy",
    image: "/images/faq-side.png",
  },
  {
    id: "quality",
    title: "Quality Statement (QA/QC)",
    category: "Quality Assurance",
    description:
      "Structured quality management system ensuring every mechanical and electrical installation meets stringent international codes.",
    link: "/compliance#quality",
    image: "/images/service-mechanical.webp",
  },
  {
    id: "technical-faqs",
    title: "Technical Execution FAQs",
    category: "Engineering Guide",
    description:
      "Answers to core questions regarding scope definition, procurement logistics, OEM warranties, and Warri operational support.",
    link: "/contact-us#faq",
    image: "/images/service-electrical.webp",
  },
];
