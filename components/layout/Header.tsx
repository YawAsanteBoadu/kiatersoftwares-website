"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/site";
import { cn, isActivePath } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppCTAButton } from "@/components/ui/WhatsAppCTAButton";
import { MobileNav } from "./MobileNav";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white">
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Link href="/" className="-m-1 rounded-lg p-1">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {mainNav.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                      active ? "bg-brand-50 text-brand-800" : "text-ink-600 hover:bg-ink-50 hover:text-ink-950",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Start a Project stays visible at every breakpoint (Technical Spec §7). */}
          <WhatsAppCTAButton intent="startProject" source="header" size="sm" className="sm:min-h-10 sm:px-5">
            Start a Project
          </WhatsAppCTAButton>
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
