"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AlertCircle, ArrowUpRight, CheckCircle2, ChevronDown } from "lucide-react";
import { formIndustries, formNeeds, formTimelines } from "@/lib/copy";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { buildWhatsAppLink, formatProjectBrief, type ProjectBrief } from "@/lib/whatsapp";
import { validateProjectBrief, PROBLEM_MAX_LENGTH, type BriefErrors } from "./validation";

const inputClass =
  "block w-full rounded-xl border bg-white px-4 py-3 text-base text-ink-950 placeholder:text-ink-500 transition-colors focus:border-brand-700 focus:ring-2 focus:ring-brand-500/30 focus:outline-none";

const emptyBrief: ProjectBrief = {
  name: "",
  company: "",
  email: "",
  phone: "",
  industry: "",
  needs: [],
  problem: "",
  timeline: "",
};

/**
 * Requirements §26 — the qualifying Project Request Form.
 * On a valid submit it builds a pre-filled WhatsApp message and opens it in a
 * new tab (Technical Spec §8). Nothing is posted to a server.
 */
export function ProjectRequestForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [brief, setBrief] = useState<ProjectBrief>(emptyBrief);
  const [errors, setErrors] = useState<BriefErrors>({});
  const [submittedLink, setSubmittedLink] = useState<string | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Bring the confirmation into view and announce it once the brief is ready.
  useEffect(() => {
    if (!submittedLink) return;
    statusRef.current?.scrollIntoView({ block: "center" });
    statusRef.current?.focus({ preventScroll: true });
  }, [submittedLink]);

  const fieldId = (name: string) => `${id}-${name}`;

  function update<K extends keyof ProjectBrief>(key: K, value: ProjectBrief[K]) {
    setBrief((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function toggleNeed(need: string) {
    update("needs", brief.needs.includes(need) ? brief.needs.filter((item) => item !== need) : [...brief.needs, need]);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateProjectBrief(brief);
    setErrors(result);

    const firstInvalid = Object.keys(result)[0];
    if (firstInvalid) {
      // Keep the visitor on the form and move focus to the first problem.
      const target = formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`);
      target?.focus();
      return;
    }

    const link = buildWhatsAppLink(formatProjectBrief({ ...brief, timeline: brief.timeline || undefined }));
    trackEvent("project_request_submit", {
      industry: brief.industry,
      needs: brief.needs.join(", "),
      timeline: brief.timeline || "not specified",
    });
    setSubmittedLink(link);

    // Not using the "noopener" feature string here: it makes window.open return
    // null, which would hide whether a popup blocker stopped the new tab.
    const opened = window.open(link, "_blank");
    if (opened) opened.opener = null;
    else window.location.href = link;
  }

  if (submittedLink) {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center outline-none sm:p-10"
      >
        <CheckCircle2 aria-hidden="true" className="mx-auto size-12 text-emerald-600" />
        <h3 className="mt-5 text-2xl font-semibold">Your project brief is ready in WhatsApp</h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-700">
          WhatsApp has opened with your brief pre-filled. Press <strong>send</strong> in WhatsApp to deliver it to our
          team, and we&rsquo;ll continue the conversation there.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={submittedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-6 font-semibold text-ink-950 hover:bg-brand-400"
          >
            WhatsApp didn&rsquo;t open? Open it again
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmittedLink(null);
              setBrief(emptyBrief);
            }}
            className="inline-flex min-h-12 items-center justify-center rounded-full px-6 font-semibold text-ink-700 ring-1 ring-ink-200 hover:bg-white"
          >
            Start a new brief
          </button>
        </div>
      </div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} className="space-y-8" aria-describedby={`${id}-intro`}>
      <p id={`${id}-intro`} className="text-sm text-ink-600">
        Fields marked <span className="text-red-700">*</span> are required. Submitting opens WhatsApp with your brief
        pre-filled — nothing is sent until you press send there.
      </p>

      {errorCount > 0 && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <p>
            Please fix {errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`} before
            submitting.
          </p>
        </div>
      )}

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">Your details</legend>
        <TextField
          id={fieldId("name")}
          name="name"
          label="Name"
          autoComplete="name"
          value={brief.name}
          error={errors.name}
          onChange={(v) => update("name", v)}
        />
        <TextField
          id={fieldId("company")}
          name="company"
          label="Company / Organization"
          autoComplete="organization"
          value={brief.company}
          error={errors.company}
          onChange={(v) => update("company", v)}
        />
        <TextField
          id={fieldId("email")}
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={brief.email}
          error={errors.email}
          onChange={(v) => update("email", v)}
        />
        <TextField
          id={fieldId("phone")}
          name="phone"
          label="Phone / WhatsApp"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={brief.phone}
          error={errors.phone}
          onChange={(v) => update("phone", v)}
        />

        <div className="sm:col-span-2">
          <FieldLabel htmlFor={fieldId("industry")} required>
            Industry
          </FieldLabel>
          <div className="relative">
            <select
              id={fieldId("industry")}
              data-field="industry"
              name="industry"
              value={brief.industry}
              onChange={(event) => update("industry", event.target.value)}
              aria-invalid={errors.industry ? true : undefined}
              aria-describedby={errors.industry ? `${fieldId("industry")}-error` : undefined}
              className={cn(inputClass, "appearance-none pr-12", errors.industry ? "border-red-500" : "border-ink-200")}
            >
              <option value="" disabled>
                Select your industry
              </option>
              {formIndustries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-ink-500"
            />
          </div>
          <FieldError id={`${fieldId("industry")}-error`} message={errors.industry} />
        </div>
      </fieldset>

      <fieldset aria-describedby={errors.needs ? `${fieldId("needs")}-error` : undefined}>
        <legend className="text-base font-semibold text-ink-950">
          What do you need?{" "}
          <span className="text-red-700" aria-hidden="true">
            *
          </span>
          <span className="sr-only">(required, choose at least one)</span>
        </legend>
        <p className="mt-1 text-sm text-ink-500">Choose all that apply.</p>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {formNeeds.map((need, index) => {
            const checked = brief.needs.includes(need);
            return (
              <label
                key={need}
                className={cn(
                  "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-700",
                  checked
                    ? "border-brand-700 bg-brand-50 text-brand-900"
                    : "border-ink-200 text-ink-800 hover:bg-ink-50",
                  errors.needs && !checked && "border-red-300",
                )}
              >
                <input
                  type="checkbox"
                  name="needs"
                  value={need}
                  checked={checked}
                  onChange={() => toggleNeed(need)}
                  data-field={index === 0 ? "needs" : undefined}
                  className="size-4 shrink-0 accent-brand-700"
                />
                {need}
              </label>
            );
          })}
        </div>
        <FieldError id={`${fieldId("needs")}-error`} message={errors.needs} />
      </fieldset>

      <div>
        <FieldLabel htmlFor={fieldId("problem")} required>
          Tell us about the problem
        </FieldLabel>
        <p id={`${fieldId("problem")}-hint`} className="-mt-1 mb-2 text-sm text-ink-500">
          How does your business work today, and what needs to change?
        </p>
        <textarea
          id={fieldId("problem")}
          data-field="problem"
          name="problem"
          rows={7}
          maxLength={PROBLEM_MAX_LENGTH}
          value={brief.problem}
          onChange={(event) => update("problem", event.target.value)}
          aria-invalid={errors.problem ? true : undefined}
          aria-describedby={`${fieldId("problem")}-hint ${fieldId("problem")}-count${errors.problem ? ` ${fieldId("problem")}-error` : ""}`}
          className={cn(inputClass, "resize-y", errors.problem ? "border-red-500" : "border-ink-200")}
        />
        <div className="mt-1.5 flex items-start justify-between gap-4">
          <FieldError id={`${fieldId("problem")}-error`} message={errors.problem} />
          <p id={`${fieldId("problem")}-count`} className="ml-auto shrink-0 text-xs text-ink-500 tabular-nums">
            {brief.problem.length}/{PROBLEM_MAX_LENGTH}
          </p>
        </div>
      </div>

      <fieldset>
        <legend className="text-base font-semibold text-ink-950">
          Expected timeline <span className="font-normal text-ink-500">(optional)</span>
        </legend>
        <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {formTimelines.map((timeline) => {
            const checked = brief.timeline === timeline;
            return (
              <label
                key={timeline}
                className={cn(
                  "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-700",
                  checked
                    ? "border-brand-700 bg-brand-50 text-brand-900"
                    : "border-ink-200 text-ink-800 hover:bg-ink-50",
                )}
              >
                <input
                  type="radio"
                  name="timeline"
                  value={timeline}
                  checked={checked}
                  onChange={() => update("timeline", timeline)}
                  className="size-4 shrink-0 accent-brand-700"
                />
                {timeline}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3 border-t border-ink-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-500">Opens WhatsApp in a new tab.</p>
        <button
          type="submit"
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-7 text-base font-semibold text-ink-950 shadow-sm hover:bg-brand-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 sm:w-auto"
        >
          Submit Project Brief
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </button>
      </div>
    </form>
  );
}

function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-ink-900">
      {children}
      {required && (
        <>
          {" "}
          <span className="text-red-700" aria-hidden="true">
            *
          </span>
          <span className="sr-only">(required)</span>
        </>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-700">
      <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
      {message}
    </p>
  );
}

function TextField({
  id,
  name,
  label,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
  inputMode,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  inputMode?: "email" | "tel" | "text";
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} required>
        {label}
      </FieldLabel>
      <input
        id={id}
        data-field={name}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputClass, error ? "border-red-500" : "border-ink-200")}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
