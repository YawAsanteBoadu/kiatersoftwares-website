import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppCTAButton } from "@/components/ui/WhatsAppCTAButton";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page max-w-2xl text-center">
        <p className="eyebrow text-brand-800">404</p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">We couldn&rsquo;t find that page.</h1>
        <p className="mt-5 text-lg text-ink-600">
          The page may have moved. Let&rsquo;s get you back to something useful.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className={buttonClasses("secondary", "lg")}>
            Back to Home
          </Link>
          <WhatsAppCTAButton intent="talkToExpert" source="not_found" size="lg">
            Talk to an Expert
          </WhatsAppCTAButton>
        </div>
      </div>
    </section>
  );
}
