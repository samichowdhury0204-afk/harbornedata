import { motion } from "motion/react";
import { Reveal, Section, SectionLabel, staggerChild, staggerParent } from "./primitives";

const services = [
  {
    n: "01",
    title: "Targeted prospecting",
    body: "Find the right companies rather than simply collecting more contacts.",
    items: [
      "Market research",
      "Company identification",
      "Decision-maker identification",
      "Lead segmentation",
    ],
  },
  {
    n: "02",
    title: "Outbound sales",
    body: "Start relevant conversations with potential customers.",
    items: ["Personalised outreach", "Follow-ups", "Campaign management"],
  },
  {
    n: "03",
    title: "Opportunity qualification",
    body: "Separate genuine opportunities from meaningless replies.",
    items: [
      "Requirement identification",
      "Opportunity qualification",
      "RFQ identification",
      "Call booking",
      "Direct handoff",
    ],
  },
];

export function Services() {
  return (
    <Section>
      <Reveal>
        <SectionLabel>The service</SectionLabel>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-8 max-w-3xl text-3xl leading-[1.1] font-semibold tracking-[-0.025em] text-balance md:text-[2.75rem]">
          An outsourced sales function, without the overhead.
        </h2>
      </Reveal>

      <motion.ul
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-16 grid gap-8 md:grid-cols-3"
      >
        {services.map((s) => (
          <motion.li
            key={s.title}
            variants={staggerChild}
            className="group flex flex-col border-t border-ink pt-6 transition-colors duration-500 hover:border-copper"
          >
            <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground">
              {s.n}
            </span>
            <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em]">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            <ul className="mt-7 space-y-2.5 border-t border-border pt-6">
              {s.items.map((i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span
                    aria-hidden
                    className="mt-2 h-px w-3 shrink-0 bg-copper transition-all duration-300 group-hover:w-5"
                  />
                  <span className="text-foreground/85">{i}</span>
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}