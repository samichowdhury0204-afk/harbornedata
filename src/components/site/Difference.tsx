import { motion } from "motion/react";
import { Reveal, Section, SectionLabel, staggerChild, staggerParent } from "./primitives";
import { cn } from "@/lib/utils";

const cards = [
  {
    n: "01",
    title: "Find",
    body: "We identify companies that fit your capabilities, markets and commercial requirements.",
  },
  {
    n: "02",
    title: "Engage",
    body: "We contact relevant decision-makers and start conversations on your behalf.",
  },
  {
    n: "03",
    title: "Qualify",
    body: "We identify genuine buying interest and pass meaningful opportunities to your team.",
    accent: true,
  },
];

export function Difference() {
  return (
    <Section id="solutions">
      <Reveal>
        <SectionLabel>The difference</SectionLabel>
      </Reveal>
      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <Reveal delay={0.05} className="lg:col-span-6">
          <h2 className="text-3xl leading-[1.1] font-semibold tracking-[-0.025em] text-balance md:text-[2.75rem]">
            You don't need another spreadsheet of companies.
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            You need someone to find the companies that fit, start the conversation and identify the
            ones that actually have a reason to speak to you.
          </p>
        </Reveal>
      </div>

      <motion.ul
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-16 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3"
      >
        {cards.map((c) => (
          <motion.li
            key={c.title}
            variants={staggerChild}
            className={cn(
              "group relative bg-card p-8 transition-colors duration-500 md:p-10",
              c.accent && "bg-[color-mix(in_oklab,var(--copper)_7%,var(--card))]",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-copper transition-transform duration-500 group-hover:scale-x-100",
                c.accent && "scale-x-100",
              )}
            />
            <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground">
              {c.n}
            </span>
            <h3
              className={cn(
                "mt-6 text-lg font-semibold tracking-tight uppercase",
                c.accent && "text-copper-deep",
              )}
            >
              {c.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
          </motion.li>
        ))}
      </motion.ul>

      <Reveal delay={0.1}>
        <p className="mt-14 max-w-2xl border-l border-copper pl-6 text-lg leading-relaxed tracking-tight md:text-xl">
          A company on a list isn't an opportunity. A reply isn't necessarily an opportunity either.
        </p>
      </Reveal>
    </Section>
  );
}