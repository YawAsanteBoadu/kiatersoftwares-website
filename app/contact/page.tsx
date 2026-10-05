import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ProjectRequestForm } from "@/components/forms/ProjectRequestForm";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { PageHero } from "@/components/sections/PageHero";
import { StartProjectSteps } from "@/components/sections/StartProjectSteps";
import { WhatsAppCTAButton } from "@/components/ui/WhatsAppCTAButton";
import { siteConfig } from "@/lib/site";
import { buildWhatsAppLink, ctaMessages } from "@/lib/whatsapp";

export const metadata: Metadata = pageMetadata({
  title: "Contact — Let's Talk About What You're Building",
  description:
    "Start a project with KAiTER Softwares. Tell us about your business and the problem you want to solve, and we'll continue the conversation on WhatsApp.",
  path: "/contact",
});

export default function ContactPage() {
  const { contact } = siteConfig;

  const details = [
    { label: "Phone", value: contact.phoneDisplay, href: contact.phoneHref, Icon: Phone },
    {
      label: "WhatsApp",
      value: contact.phoneDisplay,
      href: buildWhatsAppLink(ctaMessages.talkToExpert),
      Icon: MessageCircle,
      external: true,
    },
    ...(contact.email ? [{ label: "Email", value: contact.email, href: `mailto:${contact.email}`, Icon: Mail }] : []),
    ...(contact.address ? [{ label: "Location", value: contact.address, Icon: MapPin }] : []),
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Talk About What You're Building."
        description="Tell us about your business and the problem you want to solve. Your brief opens straight into a WhatsApp conversation with our team."
      >
        <WhatsAppCTAButton intent="startProject" source="contact_hero" size="lg">
          Start a Project
        </WhatsAppCTAButton>
      </PageHero>

      <section aria-label="Contact details and project request form" className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-16">
          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div>
              <h2 className="text-2xl font-semibold">{siteConfig.name}</h2>
              <ul className="mt-6 space-y-5">
                {details.map(({ label, value, href, Icon, ...rest }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-ink-500">{label}</p>
                      <p className="mt-0.5 font-semibold break-words text-ink-950">
                        {href ? (
                          <a
                            href={href}
                            className="hover:text-brand-800"
                            {...("external" in rest && rest.external
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                          >
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-wide text-ink-500 uppercase">Follow us</h2>
              <SocialLinks className="mt-4" />
            </div>
            <div className="rounded-2xl bg-ink-950 p-6 text-ink-300">
              <p className="font-display font-semibold text-white">Prefer to just chat?</p>
              <p className="mt-2 text-sm leading-relaxed">Skip the form and talk to an expert directly on WhatsApp.</p>
              <WhatsAppCTAButton intent="talkToExpert" source="contact_aside" variant="light" className="mt-5 w-full">
                Talk to an Expert
              </WhatsAppCTAButton>
            </div>
          </aside>

          <div id="project-request" className="rounded-3xl border border-ink-100 bg-white p-6 shadow-sm sm:p-10">
            <p className="eyebrow text-brand-800">Project Request Form</p>
            <h2 className="mt-3 text-3xl font-semibold">Tell us about your business</h2>
            <p className="mt-3 mb-8 leading-relaxed text-ink-600">
              The more we understand about how your business works, the better we can help. It takes about two minutes.
            </p>
            <ProjectRequestForm />
          </div>
        </div>
      </section>

      <StartProjectSteps source="contact_steps" showCta={false} className="bg-ink-50" />
    </>
  );
}
