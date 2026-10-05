import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/content";
import { ContentImage } from "@/components/ui/ContentImage";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-7 sm:p-8">
      <Quote aria-hidden="true" className="size-8 text-brand-800" />
      <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-ink-800">
        <p>&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4 border-t border-ink-100 pt-6">
        {testimonial.logo && (
          <ContentImage
            src={testimonial.logo}
            alt={`${testimonial.company} logo`}
            width={48}
            height={48}
            className="size-12 rounded-lg object-contain"
          />
        )}
        <div>
          <p className="font-semibold text-ink-950">{testimonial.clientName}</p>
          <p className="text-sm text-ink-600">
            {testimonial.position}, {testimonial.company}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
