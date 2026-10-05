import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline-light" | "light" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex max-w-full shrink-0 items-center justify-center gap-2 rounded-full text-center font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand-500 text-ink-950 shadow-sm shadow-brand-900/20 hover:bg-brand-400 focus-visible:outline-brand-700",
  secondary:
    "border border-ink-200 bg-white text-ink-900 hover:border-ink-300 hover:bg-ink-50 focus-visible:outline-brand-700",
  "outline-light":
    "border border-white/25 text-white hover:border-white/50 hover:bg-white/10 focus-visible:outline-white",
  light: "bg-white text-ink-950 hover:bg-brand-50 focus-visible:outline-white",
  ghost: "text-brand-800 hover:text-brand-900 hover:bg-brand-50 focus-visible:outline-brand-700",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-4 text-sm",
  md: "min-h-11 px-5 text-sm sm:text-base",
  lg: "min-h-12 px-6 text-base",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

/** Internal navigation styled as a button. */
export function ButtonLink({ variant, size, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize };

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}
