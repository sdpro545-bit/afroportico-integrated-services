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
    value: "info@afroportico.com",
    status: "approved" as const,
  },
  mapsUrl: {
    value: "https://www.google.com/maps/search/?api=1&query=37+Water+Resources+Road+Effurun+Warri+Delta+State+Nigeria",
    status: "approved" as const,
  },
  blurb: {
    value: "Quality mechanical, electrical and facility services with a focus on safety, reliability and client satisfaction.",
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
  socialLinks: {
    linkedin: {
      value: "[LINKEDIN_URL]",
      status: "pending" as const,
    },
    facebook: {
      value: "[FACEBOOK_URL]",
      status: "pending" as const,
    },
  },
};

export const heroSlides = [
  {
    eyebrow: "INNOVATIVE ENGINEERING, RELIABLE DELIVERY",
    title: "Welcome to Afroportico Integrated Services Limited",
    highlight: "Afroportico Integrated Services",
    description:
      "Engineering, Procurement and Contracting across Mechanical, Electrical, Refrigeration and Air-Conditioning, Facility Management and Telecoms. Delivered to international standards with a strong HSE culture, on-time and within budget.",
    primaryCta: { label: "Our Services", href: "/services" },
    status: "approved" as const,
    image: "/images/hero-1.webp",
    alt: "Afroportico engineering operations on site in Warri",
  },
  {
    eyebrow: "MECHANICAL AND OIL AND GAS",
    title: "EPC Delivery Across Mechanical, Oil and Gas",
    highlight: "Mechanical, Oil and Gas",
    description:
      "Upstream and downstream EPC, HVAC installations, piping fabrication, industrial equipment supply, and certified maintenance operations delivered to rigorous specifications.",
    primaryCta: { label: "Explore Projects", href: "/projects" },
    status: "draft" as const,
    image: "/images/hero-2.webp",
    alt: "Industrial pipeline, manifold and mechanical installations",
  },
  {
    eyebrow: "POWER AND FACILITY MANAGEMENT",
    title: "Reliable Power and Facility Management",
    highlight: "Power and Facility Management",
    description:
      "Switchgear, cell site upkeep, generators, and planned preventative maintenance schedules keeping critical industrial and commercial assets online.",
    primaryCta: { label: "HSE and Compliance", href: "/compliance" },
    status: "draft" as const,
    image: "/images/hero-3.webp",
    alt: "Power generation, switchgear control and electrical maintenance",
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

export const companyStats = [
  {
    id: "completion-rate",
    label: "Completion Rate",
    value: "[PENDING_STAT_1]",
    targetNumber: 0,
    suffix: "%",
    description: "Projects delivered strictly within scope, timeline and engineering quality standards.",
    status: "pending" as const,
  },
  {
    id: "client-satisfaction",
    label: "Client Satisfaction",
    value: "[PENDING_STAT_2]",
    targetNumber: 0,
    suffix: "%",
    description: "Client retention and recurring EPC engagements across key industrial assets.",
    status: "pending" as const,
  },
  {
    id: "cost-efficiency",
    label: "Cost Efficiency",
    value: "[PENDING_STAT_3]",
    targetNumber: 0,
    suffix: "%",
    description: "Rigorous procurement governance and lifecycle value optimization.",
    status: "pending" as const,
  },
];

export const whoWeAreContent = {
  eyebrow: "Who We Are",
  titlePart1: "Engineering excellence with ",
  highlightText: "Nigerian roots.",
  yearFoundedBadge: {
    prefix: "Since",
    value: "[YEAR_FOUNDED]",
    status: "pending" as const,
  },
  body: "Afroportico Integrated Services Limited is an engineering, procurement, contracting and facility management firm operating from Warri, Delta State. We deliver mechanical, electrical and structural solutions built on international codes, uncompromising safety and transparent client partnerships.",
  missionTab: {
    label: "Our Mission",
    status: "draft" as const,
    content:
      "To deliver engineering, procurement and contracting work that is safe, on schedule and built to last across Nigeria's strategic sectors.",
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
  checklist: [
    "International standards",
    "Strong HSE culture",
    "Clear communication from kickoff to handover",
  ],
  callPrompt: "Have a question?",
  phoneDisplay: "Call us on +234 803 088 5952",
  phoneRaw: "tel:+2348030885952",
  mainImage: "/images/who-we-are-main.webp",
  smallImage: "/images/who-we-are-small.webp",
};

export const servicesData = [
  {
    id: "mechanical",
    slug: "mechanical",
    tabLabel: "Mechanical",
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
    tabLabel: "Oil and Gas Service",
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
    tabLabel: "Facility Management Service",
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
    tabLabel: "Electrical / Telecommunications",
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

export const industriesData = [
  {
    id: "oil-gas",
    title: "Oil & Gas",
    description:
      "EPC delivery for upstream and downstream operations, including HVAC, electrical, equipment supply and site maintenance.",
    image: "/images/industry-oilgas.webp",
  },
  {
    id: "manufacturing",
    title: "Manufacturing & FMCG",
    description:
      "Industrial refrigeration, power distribution and facility management for production sites that cannot afford downtime.",
    image: "/images/industry-fmcg.webp",
  },
  {
    id: "telecoms",
    title: "Telecoms & Power",
    description:
      "Cell site maintenance, battery installations, and generator supply, leasing and maintenance, so networks stay up.",
    image: "/images/industry-power.webp",
  },
  {
    id: "public-sector",
    title: "Public Sector & Infrastructure",
    description:
      "Turnkey projects built to international standards, safe, efficient and compliant with regulations.",
    image: "/images/industry-infra.webp",
  },
];

export const clientLogos: Array<{ name: string; logo: string; status: "pending" | "approved" }> = [];

export const projectsData = [
  // Electrical Projects (3 items, unique images)
  {
    id: "elec-1",
    title: "Industrial Substation Power Distribution",
    category: "Electrical",
    image: "/images/service-electrical.webp",
    scope: "Installation and testing of MV/LV switchgear boards and telecom power",
    illustrative: true,
  },
  {
    id: "elec-2",
    title: "Motor Control Center & Switchgear",
    category: "Electrical",
    image: "/images/hero-3.webp",
    scope: "Variable speed drives, control panels and automated telemetry integration",
    illustrative: true,
  },
  {
    id: "elec-3",
    title: "Site Power & Infrastructure Survey",
    category: "Electrical",
    image: "/images/industry-infra.webp",
    scope: "Power routing, earthing protection and turnkey infrastructure commissioning",
    illustrative: true,
  },

  // Facility Management Projects (3 items, unique images)
  {
    id: "fm-1",
    title: "Commercial Headquarters Planned Maintenance",
    category: "Facility Management",
    image: "/images/service-facility.webp",
    scope: "Full-scope mechanical, electrical and HVAC preventive maintenance",
    illustrative: true,
  },
  {
    id: "fm-2",
    title: "HSE & Facility Operations Oversight",
    category: "Facility Management",
    image: "/images/faq-side.webp",
    scope: "24/7 site utilities monitoring, safety briefings and compliance audits",
    illustrative: true,
  },
  {
    id: "fm-3",
    title: "Industrial Plant Technical Inspection",
    category: "Facility Management",
    image: "/images/who-we-are-main.webp",
    scope: "Scheduled asset integrity inspections and building systems upkeep",
    illustrative: true,
  },

  // Mechanical Projects (3 items, unique images)
  {
    id: "mech-1",
    title: "Industrial Refrigeration Chiller Plant",
    category: "Mechanical",
    image: "/images/service-mechanical.webp",
    scope: "Design and commissioning of multi-stage industrial cooling loops",
    illustrative: true,
  },
  {
    id: "mech-2",
    title: "Process Piping & Manifold Installation",
    category: "Mechanical",
    image: "/images/project-2.webp",
    scope: "High-pressure certified welding, NDT testing and valve automation",
    illustrative: true,
  },
  {
    id: "mech-3",
    title: "High-Pressure Flange & Pipeline Assembly",
    category: "Mechanical",
    image: "/images/who-we-are-small.webp",
    scope: "Precision torque bolting, flange integrity testing and cold-room tie-ins",
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
    image: "/images/faq-side.webp",
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

export const stepsData = [
  {
    number: "01",
    title: "Engineering",
    description:
      "We survey the site and review the design with you before anything is ordered.",
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
