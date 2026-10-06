import type { Industry } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <article 
      className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-7 transition-shadow hover:shadow-lg relative overflow-hidden"
      style={{
        backgroundImage: industry.backgroundImage 
          ? `url(${industry.backgroundImage})` 
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/20 rounded-2xl" />
      
      <div className="relative z-10">
        <span className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
          <Icon name={industry.icon} className="size-6" />
        </span>
        
        <h3 className="mt-6 text-xl font-semibold text-brand-500">
          {industry.name}
        </h3>
        
        <p className="mt-2 leading-relaxed text-white font-medium">
          {industry.description}
        </p>
      </div>
    </article>
  );
}