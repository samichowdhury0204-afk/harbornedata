import { motion } from "motion/react";
import { Reveal, Section, staggerChild, staggerParent } from "./primitives";
import { cn } from "@/lib/utils";

const columns = [
  {
    title: "You provide",
    items: [
      "What you manufacture",
      "Target markets",
      "Ideal customers",
      "Commercial requirements",
      "Capacity / priorities",
    ],
  },
  {
    title: "We handle",
    items: ["Research", "Prospecting", "Outreach", "Follow-ups", "Initial qualification"],
    accent: true,
  },
  {
    title: "You receive",
    items: [
      "Qualified conversations",
      "RFQs",
      "Technical enquiries",
      "Call opportunities",
      "Potential new customers",
    ],
  },
];

export function Roles() {
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <h2 className="text-3xl leading-[1.1] font-semibold tracking-[-0.025em] text-balance md:text-[2.75rem]">
            Your sales process doesn't need to change.
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            You tell us what a good opportunity looks like. We build the prospecting and outreach
            around it. When something real comes through, you take over.
          </p>
        </Reveal>
      </div>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-16 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3"
      >
        {columns.map((c) => (
          <motion.div
            key={c.title}
            variants={staggerChild}
            className={cn(
              "bg-card p-8 md:p-10",
              c.accent && "bg-[color-mix(in_oklab,var(--copper)_7%,var(--card))]",
            )}
          >
            <h3
              className={cn(
                "font-mono text-[0.6875rem] tracking-[0.18em] uppercase",
                c.accent ? "text-copper-deep" : "text-muted-foreground",
              )}
            >
              {c.title}
            </h3>
            <ul className="mt-6 space-y-3">
              {c.items.map((i) => (
                <li key={i} className="text-sm leading-relaxed md:text-base">
                  {i}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}