import { useEffect, useState } from "react";
import {
  enableAnalytics,
  getConsent,
  saveConsent,
  subscribeToConsent,
  type ConsentChoice,
} from "@/lib/analytics";

export function PrivacyControls() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => {
      const saved = getConsent();
      setChoice(saved);
      if (saved) enableAnalytics(saved);
    };
    sync();
    const unsubscribe = subscribeToConsent(sync);
    const showSettings = () => setOpen(true);
    window.addEventListener("harborne-open-privacy-settings", showSettings);
    return () => {
      unsubscribe();
      window.removeEventListener("harborne-open-privacy-settings", showSettings);
    };
  }, []);

  const select = (next: ConsentChoice) => {
    const previouslyTracking = choice === "all" || choice === "analytics";
    saveConsent(next);
    setChoice(next);
    enableAnalytics(next);
    setOpen(false);
    if (next === "none" && previouslyTracking) window.location.reload();
  };

  if (choice !== null && !open) return null;

  return (
    <section
      aria-label="Privacy choices"
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-xl border border-border bg-card p-5 text-card-foreground shadow-2xl md:bottom-6 md:p-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-lg">
          <h2 className="text-base font-semibold">Privacy choices</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Video and Calendly load to play the video and let you book. Optional Google analytics
            and ad measurement run only if you choose them. You can change this later. Read our{" "}
            <a href="/privacy" className="underline underline-offset-4">
              privacy notice
            </a>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-2 md:max-w-72 md:justify-end">
          <button
            type="button"
            onClick={() => select("none")}
            className="rounded-md border border-border px-3 py-2 text-xs font-medium hover:bg-secondary"
          >
            Reject optional
          </button>
          <button
            type="button"
            onClick={() => select("analytics")}
            className="rounded-md border border-border px-3 py-2 text-xs font-medium hover:bg-secondary"
          >
            Analytics only
          </button>
          <button
            type="button"
            onClick={() => select("all")}
            className="rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
          >
            Accept all
          </button>
        </div>
      </div>
    </section>
  );
}
