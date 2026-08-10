import { motion } from "motion/react";
import { Reveal, Section, SectionLabel, staggerChild, staggerParent } from "./primitives";

const steps = [
  {
    n: "01",
    title: "Understand",
    body: "We learn what you manufacture, where you're strongest and what counts as a good customer.",
  },
  {
    n: "02",
    title: "Find",
    body: "We identify companies and decision-makers that match your capabilities and commercial goals.",
  },
  {
    n: "03",
    title: "Engage",
    body: "We run targeted outbound campaigns and manage the conversations that follow.",
  },
  {
    n: "04",
    title: "Qualify",
    body: "We surface only genuine opportunities that are ready for technical or commercial follow-up.",
  },
  {
    n: "05",
    title: "Handoff",
    body: "Your team steps in when the opportunity is real, qualified and worth their time.",
  },
];

const chain = ["Reply", "Qualified", "Handoff", "Your team"];

export function Solutions() {
  return (
    <Section id="solutions">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <SectionLabel>Solutions</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-8 text-3xl leading-[1.1] font-semibold tracking-[-0.025em] text-balance md:text-[2.5rem]">
              The full process from first contact to qualified opportunity.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              We merge targeted outreach, buyer engagement and opportunity qualification so your
              team only acts on work that is already moving toward a decision.
            </p>
          </Reveal>

          <motion.ol
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12 space-y-6"
          >
            {steps.map((step) => (
              <motion.li key={step.n} variants={staggerChild} className="rounded-sm border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-copper text-sm font-semibold text-foreground">
                    {step.n}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        <div className="lg:col-span-6">
          <Reveal>
            <SectionLabel>Opportunity flow</SectionLabel>
          </Reveal>
          <motion.article
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-8 space-y-6 rounded-xl border border-border bg-card p-8 shadow-[0_24px_60px_-40px_rgba(16,32,37,0.5)]"
          >
            <motion.div variants={staggerChild} className="flex items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">New opportunity</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">Example Engineering Ltd</h3>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-copper/40 bg-[color-mix(in_oklab,var(--copper)_12%,transparent)] px-3 py-1 text-[0.625rem] uppercase tracking-[0.16em] text-copper-deep">
                <span className="h-2 w-2 rounded-full bg-copper" />
                Qualified
              </span>
            </motion.div>

            <motion.div variants={staggerChild} className="grid gap-4 border-b border-border pb-5 text-sm leading-relaxed text-muted-foreground">
              {[
                { label: "Industry", value: "Automotive manufacturing" },
                { label: "Requirement", value: "Aluminium tooling for a new production programme" },
                { label: "Contact", value: "Engineering Manager" },
              ].map((item) => (
                <div key={item.label} className="grid grid-cols-[120px_1fr] gap-3">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {item.label}
                  </span>
                  <span>{item.value}</span>
                </div>
              ))}
            </motion.div>

            <motion.ol variants={staggerChild} className="space-y-3">
              {chain.map((item, index) => (
                <li key={item} className="flex items-center gap-3 text-sm uppercase tracking-[0.16em] text-muted-foreground">
                  <span className="h-px w-7 bg-border" />
                  <span className={index === chain.length - 1 ? "text-foreground font-semibold" : ""}>{item}</span>
                </li>
              ))}
            </motion.ol>

            <motion.p variants={staggerChild} className="text-sm leading-relaxed">
              When a reply becomes a real buying opportunity, we hand it across with technical clarity,
              commercial context and a clear next step for your team.
            </motion.p>

            <motion.a
              variants={staggerChild}
              href="#contact"
              className="group inline-flex items-center justify-center rounded-xs border border-copper px-6 py-3 text-sm font-medium text-copper-deep transition-colors duration-300 hover:bg-copper/10"
            >
              See contact options
              <span aria-hidden className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </motion.a>
          </motion.article>
        </div>
      </div>
    </Section>
  );
}
