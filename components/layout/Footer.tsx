import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerNav, siteConfig } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppCTAButton } from "@/components/ui/WhatsAppCTAButton";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  const { contact, parentOrg } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 text-ink-300">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <Link href="/" className="inline-block rounded-lg">
            <Logo tone="light" />
          </Link>
          <p className="mt-5 max-w-sm text-base leading-relaxed">
            Technology built around your business — not the other way around.
          </p>
          <p className="mt-3 max-w-sm text-sm text-ink-400">
            A subsidiary of {parentOrg.name} ({parentOrg.shortName}).
          </p>
          <div className="mt-6">
            <WhatsAppCTAButton intent="startProject" source="footer" variant="light">
              Start a Project
            </WhatsAppCTAButton>
          </div>
        </div>

        {footerNav.map((group) => (
          <nav key={group.title} aria-label={group.title} className="lg:col-span-2">
            <h2 className="text-sm font-semibold tracking-wide text-white">{group.title}</h2>
            <ul className="mt-4 space-y-3">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold tracking-wide text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-400" />
              <a href={contact.phoneHref} className="hover:text-white">
                {contact.phoneDisplay} <span className="text-ink-400">(Phone &amp; WhatsApp)</span>
              </a>
            </li>
            {contact.email && (
              <li className="flex items-start gap-3">
                <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-400" />
                <a href={`mailto:${contact.email}`} className="break-all hover:text-white">
                  {contact.email}
                </a>
              </li>
            )}
            {contact.address && (
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-400" />
                <span>{contact.address}</span>
              </li>
            )}
          </ul>
          <SocialLinks tone="light" className="mt-6" />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>We Don&rsquo;t Just Build. We Understand. We Transform.</p>
        </div>
      </div>
    </footer>
  );
}
