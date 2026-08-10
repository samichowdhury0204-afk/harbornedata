import { motion } from "motion/react";
import { Reveal, Section, SectionLabel, staggerChild, staggerParent } from "./primitives";

const rows = [
  { k: "Industry", v: "Automotive manufacturing" },
  { k: "Requirement", v: "Aluminium tooling for a new production programme" },
  { k: "Contact", v: "Engineering Manager" },
];

const chain = ["Reply", "Qualified", "Handoff", "Your sales team"];

export function Handoff() {
  return (
    <Section className="relative overflow-hidden">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionLabel>The handoff</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-8 text-3xl leading-[1.1] font-semibold tracking-[-0.025em] text-balance md:text-[2.5rem]">
              We don't hand you leads. We hand you opportunities.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              When a prospect has a genuine requirement, wants to discuss a project, is ready to
              provide drawings or wants to arrange a call, that's when we bring your team in.
            </p>
          </Reveal>

          <motion.ol
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12 space-y-3"
          >
            {chain.map((c, i) => (
              <motion.li key={c} variants={staggerChild} className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="h-px w-6"
                  style={{
                    background: i === chain.length - 1 ? "var(--ink)" : "var(--copper)",
                  }}
                />
                <span className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase">{c}</span>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
            className="border border-ink/15 bg-card shadow-[0_24px_60px_-40px_rgba(16,32,37,0.5)]"
          >
            <header className="flex items-center justify-between border-b border-border px-6 py-4">
              <span className="font-mono text-[0.6875rem] tracking-[0.18em] text-copper-deep uppercase">
                New opportunity
              </span>
              <span className="flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
                <motion.span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-copper"
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
                Live
              </span>
            </header>

            <div className="px-6 py-7">
              <h3 className="text-2xl font-semibold tracking-[-0.02em]">Example Engineering Ltd</h3>
              <dl className="mt-7 divide-y divide-border border-y border-border">
                {rows.map((r) => (
                  <div key={r.k} className="grid grid-cols-3 gap-4 py-3.5">
                    <dt className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
                      {r.k}
                    </dt>
                    <dd className="col-span-2 text-sm">{r.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 flex items-center gap-4">
                <span className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
                  Status
                </span>
                <span className="border border-copper/50 bg-[color-mix(in_oklab,var(--copper)_10%,transparent)] px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.16em] text-copper-deep uppercase">
                  Qualified
                </span>
              </div>

              <div className="mt-6">
                <span className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
                  Next step
                </span>
                <p className="mt-2 text-sm leading-relaxed">
                  Customer is ready to discuss requirements and provide drawings for quotation.
                </p>
              </div>
            </div>

            <footer className="border-t border-border">
              <a
                href="#contact"
                className="group flex items-center justify-between px-6 py-4 text-sm font-medium transition-colors duration-300 hover:bg-[color-mix(in_oklab,var(--copper)_8%,transparent)]"
              >
                Hand off to your team
                <span
                  aria-hidden
                  className="text-copper transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </footer>
          </motion.article>
        </div>
      </div>
    </Section>
  );
}