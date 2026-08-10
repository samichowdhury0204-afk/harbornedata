import { motion } from "motion/react";
import { Reveal, Section, SectionLabel, staggerChild, staggerParent } from "./primitives";

const points = [
  "We focus on companies that fit your capabilities.",
  "We handle the prospecting and initial conversations.",
  "We distinguish genuine opportunities from simple replies.",
  "Your team gets involved when technical and commercial expertise is actually needed.",
];

export function Why() {
  return (
    <Section id="about">
      <Reveal>
        <SectionLabel>Why Harborne Data</SectionLabel>
      </Reveal>
      <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal delay={0.05}>
            <h2 className="text-3xl leading-[1.1] font-semibold tracking-[-0.025em] text-balance md:text-[2.75rem]">
              Built around the way manufacturers actually sell.
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-6">
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              A manufacturing opportunity usually starts long before an order is placed. It begins
              with a supplier search, a new project, a capacity problem, a drawing, an engineering
              conversation or a request for a quotation. That's the stage we work in.
            </p>
          </Reveal>
          <motion.ul
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-10 divide-y divide-border border-y border-border"
          >
            {points.map((p) => (
              <motion.li
                key={p}
                variants={staggerChild}
                className="flex items-start gap-5 py-5 text-sm md:text-base"
              >
                <span aria-hidden className="mt-2.5 h-px w-6 shrink-0 bg-copper" />
                <span>{p}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </Section>
  );
}