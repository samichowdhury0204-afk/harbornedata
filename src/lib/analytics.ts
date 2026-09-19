export type ConsentChoice = "all" | "analytics" | "none";

const consentKey = "harborne-consent-v1";
const consentEvent = "harborne-consent-change";
const measurementId =
  (import.meta.env["VITE_GA_MEASUREMENT_ID"] as string | undefined) || "G-085450TC55";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const choice = localStorage.getItem(consentKey);
    return choice === "all" || choice === "analytics" || choice === "none" ? choice : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(consentKey, choice);
  } catch {
    // The choice still applies for this page if storage is unavailable.
  }
  window.dispatchEvent(new CustomEvent(consentEvent, { detail: choice }));
}

export function subscribeToConsent(listener: () => void) {
  window.addEventListener(consentEvent, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(consentEvent, listener);
    window.removeEventListener("storage", listener);
  };
}

export function enableAnalytics(choice: ConsentChoice) {
  if (!measurementId) return;
  if (choice === "none" && !document.querySelector("script[data-harborne-google-tag]")) return;
  const analytics = choice === "all" || choice === "analytics";
  const ads = choice === "all";

  window.dataLayer ??= [];
  window.gtag ??= (...args: unknown[]) => window.dataLayer?.push(args);

  const firstLoad = !document.querySelector("script[data-harborne-google-tag]");
  if (firstLoad) {
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }

  window.gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: ads ? "granted" : "denied",
    ad_user_data: ads ? "granted" : "denied",
    ad_personalization: ads ? "granted" : "denied",
  });
  if (firstLoad) {
    window.gtag("js", new Date());
    window.gtag("config", measurementId);
    const script = document.createElement("script");
    script.async = true;
    script.dataset["harborneGoogleTag"] = "true";
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
  }
}

export function trackEvent(name: string, parameters: Record<string, string> = {}) {
  if (!measurementId || getConsent() === "none" || getConsent() === null) return;
  window.gtag?.("event", name, parameters);
}
