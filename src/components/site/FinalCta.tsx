import { useTheme } from "@/lib/theme";
import { trackEvent } from "@/lib/analytics";
import { useEffect, useRef } from "react";
import { Reveal, Section, SectionLabel } from "./primitives";

const bookingUrl = "https://calendly.com/samichowdhury1708/30min";

export function FinalCta() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { dark } = useTheme();
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (
        event.origin !== "https://calendly.com" ||
        event.source !== iframeRef.current?.contentWindow
      )
        return;
      if (event.data?.event === "calendly.event_scheduled") {
        trackEvent("generate_lead", { method: "calendly" });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);
  const params = new URLSearchParams({
    embed_domain: "harborne-data.com",
    embed_type: "Inline",
    hide_event_type_details: "1",
    background_color: dark ? "172126" : "faf8f3",
    text_color: dark ? "eeeae2" : "17262b",
    primary_color: dark ? "d5a67d" : "92552e",
  });

  return (
    <Section id="contact" className="bg-secondary/40 py-20 md:py-24">
      <Reveal>
        <SectionLabel>Book a call</SectionLabel>
        <h2 className="mt-6 max-w-3xl text-3xl leading-[1.1] font-semibold tracking-[-0.03em] md:text-[2.75rem]">
          Let's fill your pipeline
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Pick a time for a 30-minute conversation about your offer, your buyers and whether
          outbound is a good fit.
        </p>
      </Reveal>
      <div className="mt-9 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <iframe
          ref={iframeRef}
          title="Book a 30-minute call with Sami at Harborne Data"
          src={`${bookingUrl}?${params.toString()}`}
          loading="lazy"
          className="block h-[780px] w-full border-0 sm:h-[720px]"
        />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Calendly handles the details you enter when booking. Read our{" "}
        <a className="underline underline-offset-4 hover:text-copper-deep" href="/privacy">
          privacy notice
        </a>
        .
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        Calendar not loading?{" "}
        <a
          className="underline underline-offset-4 hover:text-copper-deep"
          href={bookingUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          Open the booking page
        </a>
        .
      </p>
    </Section>
  );
}
