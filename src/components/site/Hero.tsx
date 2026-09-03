import { motion, useReducedMotion } from "motion/react";
import { CtaLink, Mark } from "./primitives";

const stages = [
  { n: "01", label: "Target companies" },
  { n: "02", label: "Conversations" },
  { n: "03", label: "Qualified opportunities" },
  { n: "04", label: "RFQ / call" },
  { n: "05", label: "Your team" },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-background to-transparent"
        aria-hidden
      />
      <Mark
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-24 hidden h-[420px] opacity-[0.06] lg:block"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="label-xs"
        >
          Outbound sales for UK industry
        </motion.p>

        <h1 className="mt-7 max-w-4xl text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.03em] text-balance md:text-6xl lg:text-[4.25rem]">
          We Build a Steady Pipeline of New Opportunities
          <span className="mt-4 block text-xl leading-tight font-medium tracking-[-0.015em] text-copper-deep md:text-2xl lg:text-3xl">
            for Established Manufacturers and Industrial Firms
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.36 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          We identify the right buyers, start the conversation and hand qualified opportunities
          directly to your team.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.46 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <CtaLink />
          <a
            href="#solutions"
            className="group inline-flex items-center gap-2.5 rounded-xs border border-border px-5 py-3 text-sm font-medium transition-colors duration-300 hover:border-copper hover:text-copper-deep"
          >
            See how it works
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-y-1"
            >
              ↓
            </span>
          </a>
        </motion.div>

        <ProcessDiagram />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 text-sm text-muted-foreground"
        >
          Built for owner-led firms with capacity for more work and buyers we can identify.
        </motion.p>
      </div>
    </section>
  );
}

function ProcessDiagram() {
  const reduce = useReducedMotion();
  return (
    <div className="mt-16 md:mt-20">
      <div className="relative border-y border-border py-8">
        <motion.div
          aria-hidden
          className="absolute top-0 left-0 h-px bg-copper"
          initial={{ width: reduce ? "100%" : 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.6, delay: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        />
        <ol className="grid grid-cols-1 gap-y-7 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
          {stages.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + i * 0.13 }}
              className="relative lg:pr-6"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: i === 4 ? "var(--ink)" : "var(--copper)" }}
                  aria-hidden
                />
                <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground">
                  {s.n}
                </span>
              </div>
              <p className="mt-2.5 text-sm leading-snug font-medium tracking-tight">{s.label}</p>
              {i < stages.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-[0.3rem] right-2 hidden text-xs text-copper/60 lg:block"
                >
                  →
                </span>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
