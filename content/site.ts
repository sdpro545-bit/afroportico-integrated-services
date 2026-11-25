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
    targetNumber: 99,
    suffix: "%",
    description: "Projects delivered strictly within scope, timeline and engineering quality standards.",
    status: "pending" as const,
  },
  {
    id: "client-satisfaction",
    label: "Client Satisfaction",
    value: "[PENDING_STAT_2]",
    targetNumber: 98,
    suffix: "%",
    description: "Client retention and recurring EPC engagements across key industrial assets.",
    status: "pending" as const,
  },
  {
    id: "cost-efficiency",
    label: "Cost Efficiency",
    value: "[PENDING_STAT_3]",
    targetNumber: 95,
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
    status: "approved" as const,
    content:
      "To deliver engineering, procurement and contracting work that is safe, on schedule and built to last across Nigeria's strategic sectors.",
  },
  visionTab: {
    label: "Our Vision",
    status: "approved" as const,
    content:
      "To be Nigeria's foremost multi-disciplinary engineering contractor, synonymous with uncompromising safety, technical precision and enduring client value.",
  },
  historyTab: {
    label: "Our History",
    status: "approved" as const,
    content:
      "Established in Warri to deliver integrated engineering solutions that combine local operational agility with international technical and safety benchmarks.",
  },
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
    image: "/images/industry-oilgas.jpg",
  },
  {
    id: "manufacturing",
    title: "Manufacturing & FMCG",
    description:
      "Industrial refrigeration, power distribution and facility management for production sites that cannot afford downtime.",
    image: "/images/industry-fmcg.jpg",
  },
  {
    id: "telecoms",
    title: "Telecoms & Power",
    description:
      "Cell site maintenance, battery installations, and generator supply, leasing and maintenance, so networks stay up.",
    image: "/images/industry-power.jpg",
  },
  {
    id: "public-sector",
    title: "Public Sector & Infrastructure",
    description:
      "Turnkey projects built to international standards, safe, efficient and compliant with regulations.",
    image: "/images/industry-infra.jpg",
  },
];

export const clientLogos: Array<{ name: string; logo: string; status: "pending" | "approved" }> = [];

export const projectsData = [
  // Electrical Projects (8 items)
  {
    id: "elec-1",
    title: "Industrial Substation Power Distribution",
    category: "Electrical",
    image: "/images/project-3.jpg",
    scope: "Installation and testing of MV/LV switchgear boards and control panels",
    illustrative: true,
  },
  {
    id: "elec-2",
    title: "Telecom Cell Site Hybrid Power Setup",
    category: "Electrical",
    image: "/images/project-5.jpg",
    scope: "Solar hybrid, deep-cycle battery storage and DC rectifier deployment",
    illustrative: true,
  },
  {
    id: "elec-3",
    title: "High-Capacity Generator Synchronization",
    category: "Electrical",
    image: "/images/service-electrical.webp",
    scope: "Parallel generator synchronization for continuous industrial base load",
    illustrative: true,
  },
  {
    id: "elec-4",
    title: "Regional Grid Step-Down Substation",
    category: "Electrical",
    image: "/images/industry-power.jpg",
    scope: "Transformer installation, busbar cabling and surge protection network",
    illustrative: true,
  },
  {
    id: "elec-5",
    title: "Motor Control Center Automation",
    category: "Electrical",
    image: "/images/hero-3.jpg",
    scope: "Variable speed drives and automated telemetry integration",
    illustrative: true,
  },
  {
    id: "elec-6",
    title: "Emergency UPS & Backup Power Architecture",
    category: "Electrical",
    image: "/images/project-3.jpg",
    scope: "Zero-transfer-time uninterruptible power system for data terminals",
    illustrative: true,
  },
  {
    id: "elec-7",
    title: "Industrial Lighting & Earthing Protection",
    category: "Electrical",
    image: "/images/project-5.jpg",
    scope: "Hazardous area ATEX-certified lighting and lightning protection grid",
    illustrative: true,
  },
  {
    id: "elec-8",
    title: "Power Cable Trenching & Tray Routing",
    category: "Electrical",
    image: "/images/service-electrical.webp",
    scope: "Armoured cable laydown, termination and high-pot testing",
    illustrative: true,
  },

  // Facility Management Projects (6 items)
  {
    id: "fm-1",
    title: "Commercial Headquarters Planned Maintenance",
    category: "Facility Management",
    image: "/images/project-6.jpg",
    scope: "Full-scope mechanical, electrical and HVAC preventive maintenance",
    illustrative: true,
  },
  {
    id: "fm-2",
    title: "Industrial Logistics Hub Operations",
    category: "Facility Management",
    image: "/images/service-facility.webp",
    scope: "Site utilities management, lighting upkeep and building integrity",
    illustrative: true,
  },
  {
    id: "fm-3",
    title: "Manufacturing Plant Utilities Management",
    category: "Facility Management",
    image: "/images/industry-fmcg.jpg",
    scope: "Boiler, chiller, compressed air and water filtration scheduled service",
    illustrative: true,
  },
  {
    id: "fm-4",
    title: "Civic Infrastructure Facility Servicing",
    category: "Facility Management",
    image: "/images/industry-infra.jpg",
    scope: "Turnkey operational support and reactive maintenance dispatch",
    illustrative: true,
  },
  {
    id: "fm-5",
    title: "Critical Cooling Plant Facility Oversight",
    category: "Facility Management",
    image: "/images/faq-side.png",
    scope: "24/7 environmental control monitoring and chilled water circulation",
    illustrative: true,
  },
  {
    id: "fm-6",
    title: "Energy Audit & Environmental Compliance",
    category: "Facility Management",
    image: "/images/project-6.jpg",
    scope: "Comprehensive energy conservation measures and waste reduction audit",
    illustrative: true,
  },

  // Mechanical Projects (4 items)
  {
    id: "mech-1",
    title: "Industrial Refrigeration Chiller Plant",
    category: "Mechanical",
    image: "/images/project-1.jpg",
    scope: "Design and commissioning of multi-stage ammonia cooling loop",
    illustrative: true,
  },
  {
    id: "mech-2",
    title: "Central Air Conditioning System Retrofit",
    category: "Mechanical",
    image: "/images/project-4.jpg",
    scope: "Ducting fabrication, air handling units and chilled water piping",
    illustrative: true,
  },
  {
    id: "mech-3",
    title: "Cold Room Construction & Thermal Insulation",
    category: "Mechanical",
    image: "/images/service-mechanical.webp",
    scope: "High-density polyurethane panels, condensing units and monitoring",
    illustrative: true,
  },
  {
    id: "mech-4",
    title: "Process Piping & Manifold Installation",
    category: "Mechanical",
    image: "/images/service-oil-gas.webp",
    scope: "High-pressure certified welding, NDT testing and valve automation",
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
