"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { mainNav, siteConfig } from "@/lib/site";
import { cn, isActivePath } from "@/lib/utils";
import { WhatsAppCTAButton } from "@/components/ui/WhatsAppCTAButton";

export function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the menu whenever the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        ref={toggleRef}
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-full text-ink-800 hover:bg-ink-50"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-ink-100 bg-white lg:top-[4.5rem]"
      >
        <nav aria-label="Mobile" className="container-page py-6">
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex min-h-12 items-center rounded-xl px-4 text-lg font-medium",
                      active ? "bg-brand-50 text-brand-800" : "text-ink-800 hover:bg-ink-50",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/hardware"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center rounded-xl px-4 text-lg font-medium text-ink-800 hover:bg-ink-50"
              >
                Technology &amp; Hardware
              </Link>
            </li>
          </ul>
          <div className="mt-6 grid gap-3 border-t border-ink-100 pt-6">
            <WhatsAppCTAButton intent="startProject" source="mobile_nav" size="lg">
              Start a Project
            </WhatsAppCTAButton>
            <WhatsAppCTAButton intent="talkToExpert" source="mobile_nav" variant="secondary" size="lg">
              Talk to an Expert
            </WhatsAppCTAButton>
            <p className="pt-2 text-center text-sm text-ink-500">
              WhatsApp / Phone:{" "}
              <a
                href={siteConfig.contact.phoneHref}
                className="font-medium text-ink-800 underline-offset-4 hover:underline"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
            </p>
          </div>
        </nav>
      </div>
    </div>
  );
}
