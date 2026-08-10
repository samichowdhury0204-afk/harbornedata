import { motion } from "motion/react";
import { Reveal, Section, SectionLabel, staggerChild, staggerParent } from "./primitives";

const functions = [
  {
    title: "Target",
    body: "We learn your market, define the right customers and focus on the companies most likely to buy.",
  },
  {
    title: "Engage",
    body: "We start the conversation with the right people and keep momentum going across the funnel.",
  },
  {
    title: "Qualify",
    body: "We identify genuine opportunities and hand them over when the timing and fit are right.",
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

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12 rounded-xl border border-border bg-card p-6 md:p-8"
          >
            <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Outsourced sales function</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-foreground">
                  Built to feel like part of your team.
                </h3>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {functions.map((item) => (
                <motion.div key={item.title} variants={staggerChild} className="rounded-lg border border-border/70 bg-background/70 p-4">
                  <h4 className="text-sm font-semibold tracking-tight text-foreground">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
