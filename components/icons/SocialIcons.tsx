import type { SVGProps } from "react";

/**
 * Minimal, monochrome brand marks (lucide-react no longer ships brand icons).
 * All are decorative — links carry their own accessible label.
 */
type IconProps = SVGProps<SVGSVGElement>;

const common = { viewBox: "0 0 24 24", "aria-hidden": true, focusable: false } as const;

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...common} fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...common} fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...common} fill="currentColor" {...props}>
      <rect x="3.5" y="9" width="3.5" height="11.5" rx="0.5" />
      <circle cx="5.25" cy="5.25" r="2" />
      <path d="M10 9h3.3v1.6c.5-.9 1.7-1.9 3.6-1.9 3.4 0 4.1 2.2 4.1 5.1v6.7h-3.5v-5.9c0-1.4 0-3.2-2-3.2s-2.2 1.5-2.2 3.1v6H10V9Z" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg {...common} fill="currentColor" {...props}>
      <path d="M16.6 3c.3 2.3 1.6 3.8 3.9 4v2.7c-1.4.1-2.6-.3-3.9-1.1v5.9c0 3.9-3.1 6.5-6.6 6.5A6.3 6.3 0 0 1 3.7 14.6c0-3.8 3.4-6.7 7.3-6v2.9c-.4-.1-.8-.2-1.2-.2-1.8 0-3.2 1.4-3.2 3.2s1.4 3.3 3.2 3.3c1.9 0 3.3-1.2 3.3-3.6V3h3.5Z" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg
      {...common}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3.5 20.5 4.8 16A8.5 8.5 0 1 1 8 19.3l-4.5 1.2Z" />
      <path
        d="M9 8.6c0 3.4 2.6 6.3 6.2 6.6l1-1.3-1.8-.9-.8.8c-1.2-.5-2.2-1.5-2.7-2.7l.8-.8-.9-1.8-1.3 1c-.3 0-.5 0-.5.1Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
