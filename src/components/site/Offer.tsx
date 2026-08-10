import { motion } from "motion/react";
import { CtaLink, Reveal, Section, staggerChild, staggerParent } from "./primitives";

const scope = [
  "Market & ICP research",
  "Prospect sourcing",
  "Decision-maker identification",
  "Campaign creation",
  "Outbound management",
  "Follow-ups",
  "Response handling",
  "Opportunity qualification",
  "Direct handoff",
];

export function Offer() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="text-3xl leading-[1.1] font-semibold tracking-[-0.025em] md:text-[2.75rem]">
              Your outsourced sales team.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-7 text-base leading-relaxed text-muted-foreground md:text-lg">
              We manage the front end of your sales process so your team can focus on engineering,
              quoting and delivering the work.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-10">
              <CtaLink />
            </div>
          </Reveal>
        </div>

        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:col-span-6 lg:col-start-7"
        >
          {scope.map((s, i) => (
            <motion.li
              key={s}
              variants={staggerChild}
              className="flex items-baseline gap-4 border-b border-border py-4"
            >
              <span className="font-mono text-[0.625rem] tracking-[0.16em] text-copper">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm md:text-base">{s}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}