import { motion } from "motion/react";
import { Reveal, Section, SectionLabel, staggerChild, staggerParent } from "./primitives";
import drawingTube from "@/assets/drawing-tube.jpg";
import drawingFlange from "@/assets/drawing-flange.jpg";
import labels from "@/assets/labels.webp";

const examples = [
  {
    n: "01",
    title: "Aluminium tooling",
    problem:
      "A tooling manufacturer wanted more opportunities from UK manufacturers but had limited internal sales capacity.",
    solution:
      "Four CAD drawings came back from new clients within days of launch. Onboarding with a large shipbuilder for repeat batch componentry followed within a month.",
    image: drawingTube,
    alt: "Engineering drawing of an extruded tube component quoted by a tooling manufacturer",
    caption: "Drawing received for quotation",
  },
  {
    n: "02",
    title: "Print & packaging",
    problem:
      "An established global manufacturer wanted relationships with prospects in the UK and US.",
    solution:
      "A repeatable outbound channel into UK customers. Six orders in the first week, including a superyacht uniform supplier and well-known fashion names.",
    image: labels,
    alt: "Sample board of woven and printed garment labels produced by the manufacturer",
    caption: "Product samples sent to prospects",
  },
  {
    n: "03",
    title: "Prospect data",
    problem:
      "An established firm needed contact data and lead generation in a niche where marketing data is notoriously hard to find.",
    solution:
      "We built a database of 3,600+ prospects, which went on to generate tens of thousands of pounds of business value.",
    image: drawingFlange,
    alt: "Sectional engineering drawing of a flange used in the client's niche",
    caption: "Niche componentry market",
  },
];

export function Examples() {
  return (
    <Section id="results">
      <Reveal>
        <SectionLabel>Examples of what we solve</SectionLabel>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-8 max-w-2xl text-2xl leading-[1.25] tracking-[-0.02em] text-balance md:text-3xl">
          The same process works across specialist manufacturing and industrial services. Here's
          what that can look like.
        </p>
      </Reveal>

      <motion.ul
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-16 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-3"
      >
        {examples.map((e) => (
          <motion.li key={e.n} variants={staggerChild} className="group flex flex-col bg-card">
            <div className="overflow-hidden border-b border-border bg-secondary">
              <img
                src={e.image}
                alt={e.alt}
                loading="lazy"
                className="h-52 w-full object-cover object-center opacity-90 mix-blend-multiply transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
              />
            </div>
            <span className="border-b border-border px-8 py-3 font-mono text-[0.5625rem] tracking-[0.16em] text-muted-foreground uppercase">
              {e.caption}
            </span>
            <div className="flex flex-1 flex-col p-8">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground">
                  {e.n} /
                </span>
                <h3 className="text-base font-semibold tracking-[0.02em] uppercase">{e.title}</h3>
              </div>
              <div className="mt-6 space-y-5 text-sm leading-relaxed">
                <div>
                  <span className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
                    Problem
                  </span>
                  <p className="mt-1.5 text-muted-foreground">{e.problem}</p>
                </div>
                <div>
                  <span className="font-mono text-[0.625rem] tracking-[0.16em] text-copper-deep uppercase">
                    Solution
                  </span>
                  <p className="mt-1.5">{e.solution}</p>
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
