/**
 * Fixed brand copy, taken from the KAiTER Softwares Commercial Website
 * Requirements document. Section numbers refer to that document.
 */
import type { CtaIntent } from "./whatsapp";

/** §8 Trust / Credibility Strip. No manufactured numbers. */
export const trustPoints = [
  { title: "4+ Years", text: "Software Development Experience" },
  { title: "Research Driven", text: "We understand before we build." },
  { title: "Business Focused", text: "Technology designed around operations." },
  { title: "Software + Technology", text: "Digital systems and technology infrastructure." },
] as const;

/** §9 The Problem Section. */
export const problems = [
  {
    title: "Still Using Manual Processes?",
    text: "Reduce repetitive work through digital workflows.",
    icon: "clipboard",
  },
  { title: "Losing Visibility?", text: "Centralize information and reporting.", icon: "eye-off" },
  {
    title: "Using Multiple Disconnected Tools?",
    text: "Connect your operations through integrated systems.",
    icon: "unplug",
  },
  {
    title: "Growing Beyond Your Current System?",
    text: "Build technology that can evolve with your business.",
    icon: "trending-up",
  },
  {
    title: "Don't Know What Technology You Actually Need?",
    text: "We research the problem with you before recommending a solution.",
    icon: "help",
  },
] as const;

export type ServicePillar = {
  id: string;
  letter: string;
  title: string;
  summary: string;
  details?: string;
  listTitle?: string;
  items: string[];
  icon: "code" | "workflow" | "transform" | "hardware";
  cta: { label: string } & ({ href: string } | { intent: CtaIntent });
};

/** §10 What We Do — four service pillars. */
export const servicePillars: ServicePillar[] = [
  {
    id: "custom-software",
    letter: "A",
    title: "Custom Software Development",
    summary: "Business-specific software designed around your workflows, requirements and goals.",
    listTitle: "Services may include",
    items: [
      "Web applications",
      "Mobile applications",
      "Business management systems",
      "Customer portals",
      "Administrative platforms",
      "Internal operational systems",
      "APIs and integrations",
      "Database-driven applications",
    ],
    icon: "code",
    cta: { label: "Explore Software Solutions", href: "/our-work" },
  },
  {
    id: "business-automation",
    letter: "B",
    title: "Business Automation",
    summary: "Turn repetitive manual processes into structured digital workflows.",
    listTitle: "Examples",
    items: [
      "Approval workflows",
      "Data collection",
      "Reporting",
      "Notifications",
      "Customer management",
      "Inventory workflows",
      "Internal administration",
      "Document workflows",
    ],
    icon: "workflow",
    cta: { label: "Automate Your Business", intent: "automateBusiness" },
  },
  {
    id: "digital-transformation",
    letter: "C",
    title: "Digital Transformation",
    summary: "We help businesses move from fragmented or manual processes toward connected digital operations.",
    details:
      "This is where our research-first approach matters most. We study how your business operates today, identify where information gets stuck and work gets repeated, and plan a practical path toward connected digital operations — one that your people can adopt without disrupting the business.",
    items: ["Business process research", "Workflow mapping", "Technology planning", "Phased digital rollout"],
    icon: "transform",
    cta: { label: "Book a Consultation", intent: "bookConsultation" },
  },
  {
    id: "technology-hardware",
    letter: "D",
    title: "Technology & Hardware Procurement",
    summary: "The right software needs the right technology environment.",
    details:
      "KAiTER Softwares can help businesses identify and procure technology appropriate for their operational requirements. We don't simply sell hardware. We help you identify the technology your business actually needs.",
    listTitle: "Possible categories",
    items: [
      "Computers",
      "Laptops",
      "Servers",
      "Networking equipment",
      "Workstations",
      "Business devices",
      "Technology accessories",
      "Specialized equipment",
    ],
    icon: "hardware",
    cta: { label: "Request a Technology Quote", intent: "technologyQuote" },
  },
];

/** §11 The KAiTER Difference — the six-step process. */
export const processSteps = [
  { number: "01", title: "Research", text: "We learn about your business." },
  { number: "02", title: "Understand", text: "We examine your workflows, challenges and objectives." },
  { number: "03", title: "Design", text: "We translate business requirements into a practical technology solution." },
  { number: "04", title: "Build", text: "We develop the software and systems." },
  { number: "05", title: "Integrate", text: "Where necessary, software, hardware and existing systems are connected." },
  { number: "06", title: "Transform", text: "The final solution becomes part of your business operation." },
] as const;

/** §20 Why KAiTER? — six cards. */
export const whyKaiter = [
  { title: "Business First", text: "We begin with the business problem.", icon: "briefcase" },
  { title: "Research Driven", text: "We investigate before recommending technology.", icon: "search" },
  { title: "Custom Built", text: "Solutions are designed around specific requirements.", icon: "ruler" },
  {
    title: "Integrated Thinking",
    text: "Software, hardware and infrastructure can be considered together.",
    icon: "layers",
  },
  { title: "Long-Term Thinking", text: "We build systems with future growth in mind.", icon: "sprout" },
  {
    title: "African Context",
    text: "Solutions are designed with the realities of African businesses in mind.",
    icon: "globe",
  },
] as const;

/** §25 How to Start a Project. */
export const startSteps = [
  { title: "Tell Us About Your Business" },
  { title: "We Research & Understand" },
  { title: "We Propose the Right Solution" },
  { title: "We Build & Implement" },
] as const;

/** §19 Hardware Procurement Page sections. */
export const hardwareCategories = [
  {
    title: "Computers & Laptops",
    text: "Desktops, laptops and workstations specified for the work your team actually does — from front-desk administration to design and data-heavy roles.",
    icon: "laptop",
  },
  {
    title: "Servers & Storage",
    text: "On-premise servers, storage and backup equipment sized for your data, your users and your growth plans.",
    icon: "server",
  },
  {
    title: "Networking",
    text: "Routers, switches, wireless access points and cabling that keep your people and systems reliably connected.",
    icon: "network",
  },
  {
    title: "Business Devices",
    text: "Tablets, point-of-sale terminals, scanners and other devices that put your software in the hands of the people who use it.",
    icon: "tablet",
  },
  {
    title: "Office Technology",
    text: "Printers, displays, power backup and the everyday technology that keeps an office running.",
    icon: "printer",
  },
  {
    title: "Specialized Hardware",
    text: "Equipment for specific operational needs, sourced after we understand exactly what the job requires.",
    icon: "cpu",
  },
] as const;

/** §26 Project Request Form options. */
export const formIndustries = [
  "Education",
  "Retail",
  "Healthcare",
  "Agriculture",
  "Logistics",
  "Hospitality",
  "Finance",
  "Manufacturing",
  "Professional Services",
  "Other",
] as const;

export const formNeeds = [
  "Custom Software",
  "Website",
  "Mobile App",
  "Business Automation",
  "Existing System Improvement",
  "Hardware Procurement",
  "Software + Hardware",
  "Consultation",
  "Not Sure",
] as const;

export const formTimelines = ["Immediately", "1–3 months", "3–6 months", "Exploring"] as const;
