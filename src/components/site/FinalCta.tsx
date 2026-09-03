import { useEffect, type MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./primitives";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function FinalCta() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!document.getElementById("calendly-widget-css")) {
      const link = document.createElement("link");
      link.id = "calendly-widget-css";
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    if (!document.getElementById("calendly-widget-js")) {
      const script = document.createElement("script");
      script.id = "calendly-widget-js";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openCalendly = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.Calendly?.initPopupWidget({ url: "https://calendly.com/samichowdhury1708/30min" });
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden border-t border-border bg-ink py-28 text-primary-foreground md:py-36"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(245,242,236,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,242,236,0.07) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        animate={{ backgroundPositionX: reduce ? "0px" : ["0px", "72px"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--copper) 35%, var(--copper) 65%, transparent)",
        }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 text-center md:px-10">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-3xl leading-[1.1] font-semibold tracking-[-0.03em] text-balance md:text-[3.25rem]">
            Let's find out if there's an opportunity here.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-primary-foreground/70 md:text-lg">
            Tell us what your business makes or does, who buys it and where you have capacity.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://calendly.com/samichowdhury1708/30min"
              target="_blank"
              rel="noreferrer noopener"
              onClick={openCalendly}
              className="group inline-flex items-center justify-center gap-2.5 rounded-xs bg-copper px-6 py-3.5 text-sm font-medium text-accent-foreground transition-colors duration-300 hover:bg-copper-light focus-visible:ring-2 focus-visible:ring-copper-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:outline-none"
            >
              Schedule time with me
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <a
              href="mailto:sami@harborne-data.com"
              className="inline-flex items-center justify-center rounded-xs border border-border bg-background px-6 py-3.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-copper hover:text-copper-deep"
            >
              Send me an email
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 font-mono text-[0.625rem] tracking-[0.16em] text-primary-foreground/45 uppercase">
            No obligation. No lengthy sales presentation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
