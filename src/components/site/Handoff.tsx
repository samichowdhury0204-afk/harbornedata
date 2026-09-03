import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Reveal, Section, SectionLabel, staggerChild, staggerParent } from "./primitives";

import companiesHouse from "@/assets/icons-flowchart/companies-house-icon.png";
import aiArk from "@/assets/icons-flowchart/ai-ark.jpg";
import linkedin from "@/assets/icons-flowchart/linkedin-icon.png";
import excel from "@/assets/icons-flowchart/excel-icon.jpg";

import instantly from "@/assets/icons-flowchart/instantly-icon.png";
import emailIcon from "@/assets/icons-flowchart/email-icon.jpg";

import gptIcon from "@/assets/icons-flowchart/gpt-icon.png";
import claudeIcon from "@/assets/icons-flowchart/claude-icon.png";

const functions = [
  {
    title: "Target",
    icons: [companiesHouse, aiArk, linkedin, excel],
    body: "We learn what you sell, map the buyer market and qualify the companies most likely to need it.",
  },
  {
    title: "Engage",
    icons: [instantly, emailIcon],
    body: "We start the conversation with the right people and keep momentum going across the funnel.",
  },
  {
    title: "Qualify",
    icons: [gptIcon, claudeIcon],
    body: "We identify genuine opportunities and hand them over when the timing and fit are right.",
  },
];

function IconCarousel({ icons, interval = 2000 }: { icons: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!icons || icons.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % icons.length), interval);
    return () => clearInterval(t);
  }, [icons, interval]);

  return (
    <div className="relative h-14 w-14 md:h-16 md:w-16">
      {icons.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          alt=""
          initial={{ opacity: 0, scale: 0.94 }}
          animate={i === index ? { opacity: 1, scale: 1.08 } : { opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.38 }}
          className="absolute inset-0 h-full w-full rounded-full object-contain bg-transparent p-0"
        />
      ))}
    </div>
  );
}

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
              We combine buyer research, targeted outreach and reply qualification so your team only
              steps in when there is something worth discussing.
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
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Managed outbound
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-foreground">
                  Built around your market and capacity.
                </h3>
              </div>
            </div>

            <div className="mt-6 relative">
              <div className="absolute left-6 top-16 bottom-6 w-px bg-border/60" aria-hidden />
              <ol className="space-y-8 pl-12">
                {functions.map((item, idx) => (
                  <motion.li
                    key={item.title}
                    variants={staggerChild}
                    className="relative flex items-start gap-4"
                  >
                    <div className="-left-8 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background p-2">
                      <IconCarousel icons={item.icons} />
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold tracking-tight text-foreground">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground max-w-md">
                        {item.body}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ol>
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
            <motion.div
              variants={staggerChild}
              className="flex items-center justify-between gap-4 border-b border-border pb-4"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Anonymised opportunity
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">
                  Automotive Manufacturer
                </h3>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-copper/40 bg-[color-mix(in_oklab,var(--copper)_12%,transparent)] px-3 py-1 text-[0.625rem] uppercase tracking-[0.16em] text-copper-deep">
                <span className="h-2 w-2 rounded-full bg-copper" />
                Qualified
              </span>
            </motion.div>

            <motion.div
              variants={staggerChild}
              className="grid gap-4 border-b border-border pb-5 text-sm leading-relaxed text-muted-foreground"
            >
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
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm uppercase tracking-[0.16em] text-muted-foreground"
                >
                  <span className="h-px w-7 bg-border" />
                  <span
                    className={index === chain.length - 1 ? "text-foreground font-semibold" : ""}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </motion.ol>

            <motion.p variants={staggerChild} className="text-sm leading-relaxed">
              When a reply becomes a real buying opportunity, we hand it across with technical
              clarity, commercial context and a clear next step for your team.
            </motion.p>

            <motion.a
              variants={staggerChild}
              href="#contact"
              className="group inline-flex items-center justify-center rounded-xs border border-copper px-6 py-3 text-sm font-medium text-copper-deep transition-colors duration-300 hover:bg-copper/10"
            >
              See contact options
              <span
                aria-hidden
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </motion.a>
          </motion.article>
        </div>
      </div>
    </Section>
  );
}
