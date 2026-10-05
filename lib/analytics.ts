import { track } from "@vercel/analytics";

/** Funnel events (Technical Spec §13). */
export type AnalyticsEvent =
  | "start_project_click"
  | "talk_to_expert_click"
  | "project_request_submit"
  | "hardware_quote_click"
  | "book_consultation_click"
  | "similar_project_click"
  | "project_category_filter"
  | "insight_category_filter";

type Properties = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Properties }) => void;
  }
}

/** Sends a custom event to Vercel Analytics (and Plausible, if it is loaded). Never throws. */
export function trackEvent(event: AnalyticsEvent, properties?: Properties) {
  try {
    track(event, properties);
    window.plausible?.(event, properties ? { props: properties } : undefined);
  } catch {
    // Analytics must never break a CTA.
  }
}
