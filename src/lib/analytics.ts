type AnalyticsValue = string | number | boolean;

export type AnalyticsEventName =
  | "page_view"
  | "hero_cta_click"
  | "area_card_click"
  | "search_submit"
  | "filter_apply"
  | "route_open"
  | "map_interaction"
  | "external_map_open"
  | "save_click"
  | "related_click"
  | "source_open";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const sent = new Set<string>();
export const gaId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "";
export const gaEnabled =
  process.env.NEXT_PUBLIC_GA4_ENABLED === "true" &&
  /^G-[A-Z0-9]+$/.test(gaId);

export const track = (name: AnalyticsEventName, parameters: Record<string, AnalyticsValue> = {}) => {
  if (!gaEnabled || typeof window === "undefined" || typeof window.gtag !== "function") return false;
  const safe = Object.fromEntries(
    Object.entries(parameters).filter(([key]) =>
      !["query", "email", "phone", "address", "message", "url", "localStorage"].includes(key)
    )
  );
  const signature = JSON.stringify([name, safe]);
  if (sent.has(signature)) return false;
  sent.add(signature);
  window.gtag("event", name, safe);
  return true;
};

export const resetAnalyticsForTests = () => sent.clear();
