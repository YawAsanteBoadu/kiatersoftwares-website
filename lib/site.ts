/**
 * Site-wide configuration. Values that can change per environment come from
 * NEXT_PUBLIC_* variables (see .env.example); brand facts live here.
 */

function trimTrailingSlash(url: string) {
  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "KAiTER Softwares",
  shortName: "KAiTER",
  tagline: "We Don't Just Build. We Understand. We Transform.",
  description:
    "KAiTER Softwares researches your business, understands how it operates, and transforms real business challenges into reliable software and digital systems.",
  url: trimTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  parentOrg: {
    name: "Krobea Asante Institute of Technology, Engineering and Research",
    shortName: "KAiTER",
    // Set to the parent organization's website to enable the "Learn About KAiTER" CTA.
    url: "",
  },
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
    /** Local display format, per the technical spec. */
    phoneDisplay: "0533289892",
    phoneHref: "tel:+233533289892",
    address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "",
  },
  /**
   * Official social profiles. Leave a value empty to hide that link;
   * WhatsApp is always shown because it is the v1 contact channel.
   */
  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
    linkedin: "",
  },
  experience: "4+ Years",
} as const;

export type NavItem = { label: string; href: string };

/** Primary navigation — Section 5 of the requirements document. */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Our Work", href: "/our-work" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "How We Work", href: "/how-we-work" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Solutions",
    items: [
      { label: "What We Do", href: "/what-we-do" },
      { label: "Our Work", href: "/our-work" },
      { label: "Industries", href: "/industries" },
      { label: "Technology & Hardware", href: "/hardware" },
    ],
  },
];
