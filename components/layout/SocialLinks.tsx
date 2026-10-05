import type { ComponentType, SVGProps } from "react";
import { siteConfig } from "@/lib/site";
import { buildWhatsAppLink, ctaMessages } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { FacebookIcon, InstagramIcon, LinkedInIcon, TikTokIcon, WhatsAppIcon } from "@/components/icons/SocialIcons";

type Social = { label: string; href: string; Icon: ComponentType<SVGProps<SVGSVGElement>> };

export function getSocialLinks(): Social[] {
  const { facebook, instagram, tiktok, linkedin } = siteConfig.social;
  const links: (Social | null)[] = [
    facebook ? { label: "Facebook", href: facebook, Icon: FacebookIcon } : null,
    instagram ? { label: "Instagram", href: instagram, Icon: InstagramIcon } : null,
    tiktok ? { label: "TikTok", href: tiktok, Icon: TikTokIcon } : null,
    linkedin ? { label: "LinkedIn", href: linkedin, Icon: LinkedInIcon } : null,
    { label: "WhatsApp", href: buildWhatsAppLink(ctaMessages.talkToExpert), Icon: WhatsAppIcon },
  ];
  return links.filter((link): link is Social => link !== null);
}

export function SocialLinks({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {getSocialLinks().map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`KAiTER Softwares on ${label} (opens in a new tab)`}
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full ring-1 transition-colors",
              tone === "light"
                ? "text-ink-200 ring-white/15 hover:bg-white/10 hover:text-white"
                : "text-ink-700 ring-ink-200 hover:bg-ink-50 hover:text-ink-950",
            )}
          >
            <Icon className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
