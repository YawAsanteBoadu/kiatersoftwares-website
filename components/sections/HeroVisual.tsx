import {
  AppWindow,
  ClipboardList,
  FileSpreadsheet,
  LayoutDashboard,
  MessagesSquare,
  Router,
  Smartphone,
  Workflow,
} from "lucide-react";

const stages = ["Business", "Research", "Technology", "Transformation"];

const outputs = [
  { label: "Dashboard", Icon: LayoutDashboard },
  { label: "Mobile app", Icon: Smartphone },
  { label: "Web application", Icon: AppWindow },
  { label: "Automated workflow", Icon: Workflow },
  { label: "Connected hardware", Icon: Router },
];

const inputs = [
  { label: "Paper records", Icon: ClipboardList },
  { label: "Scattered spreadsheets", Icon: FileSpreadsheet },
  { label: "Manual follow-ups", Icon: MessagesSquare },
];

/**
 * Requirements §7: Business → Research → Technology → Transformation.
 * A business workflow enters the pipeline and emerges as digital systems.
 * Pure HTML/CSS so it never competes with the headline for LCP.
 */
export function HeroVisual() {
  return (
    <figure
      aria-label="How KAiTER works: a business workflow goes through research and technology and emerges as a dashboard, mobile app, web application, automated workflow and connected hardware."
      className="relative rounded-3xl border border-white/10 bg-ink-900/70 p-5 shadow-2xl shadow-black/40 backdrop-blur sm:p-6"
    >
      {/* Pipeline stages */}
      <ol className="relative grid grid-cols-4 gap-2" aria-hidden="true">
        <span className="absolute top-4 right-[12.5%] left-[12.5%] h-px bg-gradient-to-r from-ink-600 via-brand-700 to-brand-400" />
        {stages.map((stage, index) => (
          <li key={stage} className="relative flex flex-col items-center gap-2 text-center">
            <span
              className={
                index === stages.length - 1
                  ? "relative z-10 flex size-8 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-ink-950"
                  : "relative z-10 flex size-8 items-center justify-center rounded-full border border-brand-400/60 bg-ink-900 text-xs font-bold text-brand-200"
              }
            >
              {index + 1}
            </span>
            <span className="text-[0.7rem] font-medium tracking-wide text-ink-200 sm:text-xs">{stage}</span>
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto_1.35fr] sm:items-center" aria-hidden="true">
        {/* Input: the business today */}
        <div className="rounded-2xl border border-dashed border-white/15 p-4">
          <p className="text-[0.7rem] font-semibold tracking-[0.14em] text-ink-400 uppercase">Your business today</p>
          <ul className="mt-3 space-y-2">
            {inputs.map(({ label, Icon }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-ink-300">
                <Icon className="size-4 shrink-0 text-ink-400" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Transformation core */}
        <div className="relative mx-auto flex h-12 w-full items-center justify-center sm:h-auto sm:w-14 sm:self-stretch">
          <span className="absolute h-px w-full bg-gradient-to-r from-transparent via-brand-400 to-transparent sm:h-full sm:w-px sm:bg-gradient-to-b" />
          <span className="relative flex size-11 items-center justify-center rounded-xl bg-brand-500 shadow-lg shadow-brand-500/30">
            <span className="absolute inset-0 animate-ping rounded-xl bg-brand-400/30 motion-reduce:hidden" />
            <svg
              viewBox="0 0 24 24"
              className="relative size-5 text-ink-950"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* Outputs: digital systems */}
        <div className="rounded-2xl border border-brand-400/30 bg-gradient-to-br from-brand-500/15 to-transparent p-4">
          <p className="text-[0.7rem] font-semibold tracking-[0.14em] text-brand-300 uppercase">Digital systems</p>
          <ul className="mt-3 grid gap-1.5">
            {outputs.map(({ label, Icon }, index) => (
              <li
                key={label}
                style={{ animationDelay: `${index * 120}ms` }}
                className="flex animate-fade-up items-center gap-2 rounded-lg bg-white/5 px-2.5 py-1.5 text-sm font-medium text-white ring-1 ring-white/10"
              >
                <Icon className="size-4 shrink-0 text-brand-300" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}
