import Image from "next/image";
import { cn } from "@/lib/utils";
const mark = "/images/brand/kaiter-mark.png";

/** Logo mark + "KAiTER Softwares" wordmark. The mark is decorative; the wordmark names the link. */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image src={mark} alt="" width={40} height={40} priority className="size-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-lg font-bold tracking-tight", light ? "text-white" : "text-ink-950")}>
          KA<span className={light ? "text-brand-400" : "text-brand-700"}>i</span>TER
        </span>
        <span
          className={cn(
            "text-[0.65rem] font-semibold tracking-[0.28em] uppercase",
            light ? "text-ink-300" : "text-ink-500",
          )}
        >
          Softwares
        </span>
      </span>
    </span>
  );
}
