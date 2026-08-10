import { motion, useReducedMotion } from "motion/react";
import { CtaLink, Reveal } from "./primitives";

export function FinalCta() {
  const reduce = useReducedMotion();
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
            Tell us what you manufacture, who you want to sell to and where you want to grow.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-10 flex justify-center">
            <a
              href="mailto:hello@harbornedata.com"
              className="group inline-flex items-center gap-2.5 rounded-xs bg-copper px-6 py-3.5 text-sm font-medium text-accent-foreground transition-colors duration-300 hover:bg-copper-light focus-visible:ring-2 focus-visible:ring-copper-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:outline-none"
            >
              Start a conversation
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 font-mono text-[0.625rem] tracking-[0.16em] text-primary-foreground/45 uppercase">
            No obligation. No lengthy sales presentation.
          </p>
        </Reveal>
      </div>
      <span className="sr-only">
        <CtaLink />
      </span>
    </section>
  );
}