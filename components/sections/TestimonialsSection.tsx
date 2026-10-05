import type { Testimonial } from "@/lib/content";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Requirements §24. Renders nothing until genuine testimonials are added. */
export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;
  return (
    <section aria-labelledby="testimonials-heading" className="section bg-ink-50">
      <div className="container-page">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Client Testimonials"
          title="Built With Our Clients, Not Just For Them."
          align="center"
        />
        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li key={`${testimonial.clientName}-${testimonial.company}`}>
              <TestimonialCard testimonial={testimonial} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
