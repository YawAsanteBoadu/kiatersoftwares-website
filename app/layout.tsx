import type { Metadata, Viewport } from "next";
import { Poppins, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Poppins({ 
  subsets: ["latin"], 
    weight: ["400", "500", "600", "700"], 
  variable: "--font-inter", 
  display: "swap" });
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — We Turn Business Challenges Into Digital Systems`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "custom software development Ghana",
    "business automation",
    "digital transformation",
    "web applications",
    "mobile applications",
    "business management systems",
    "technology procurement",
    "hardware procurement Ghana",
    "KAiTER Softwares",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#070c1d",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/brand/kaiter-mark.png`,
  description: siteConfig.description,
  parentOrganization: { "@type": "Organization", name: siteConfig.parentOrg.name },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+233533289892",
    contactType: "sales",
    areaServed: "GH",
    availableLanguage: ["English"],
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
  },
  sameAs: Object.values(siteConfig.social).filter(Boolean),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-brand-500 px-4 py-2 font-semibold text-ink-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
        {/* Vercel Analytics is served by the Vercel platform; skip it on other hosts. */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
