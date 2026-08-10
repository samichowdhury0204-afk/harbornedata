import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Reveal, Section, SectionLabel } from "./primitives";

const steps = [
  {
    n: "01",
    title: "Understand",
    body: "We learn what you manufacture, where you're strongest, what work you want and what makes a good customer.",
  },
  {
    n: "02",
    title: "Find",
    body: "We identify companies and decision-makers that fit those requirements.",
  },
  {
    n: "03",
    title: "Engage",
    body: "We run targeted outbound campaigns and manage the conversations that follow.",
  },
  {
    n: "04",
    title: "Qualify",
    body: "We identify genuine opportunities — an RFQ, a technical conversation, a supplier requirement or a request for a call.",
  },
  {
    n: "05",
    title: "Handoff",
    body: "You take over when the opportunity is ready for your sales or technical team.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  return (
    <Section id="how-it-works">
      <Reveal>
        <SectionLabel>The process</SectionLabel>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-8 max-w-2xl text-3xl leading-[1.1] font-semibold tracking-[-0.025em] md:text-[2.75rem]">
          From prospect to opportunity.
        </h2>
      </Reveal>

      <div ref={ref} className="relative mt-16 pl-10 md:pl-16">
        <div className="absolute top-2 bottom-2 left-[3px] w-px bg-border md:left-[7px]" aria-hidden />
        <motion.div
          aria-hidden
          style={{ scaleY }}
          className="absolute top-2 bottom-2 left-[3px] w-px origin-top bg-copper md:left-[7px]"
        />
        <ol className="space-y-14 md:space-y-20">
          {steps.map((s, i) => (
            <ProcessStep key={s.n} step={s} index={i} progress={scrollYProgress} total={steps.length} />
          ))}
        </ol>
      </div>
    </Section>
  );
}

function ProcessStep({
  step,
  index,
  progress,
  total,
}: {
  step: (typeof steps)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  total: number;
}) {
  const threshold = index / total;
  const dotScale = useTransform(progress, [threshold - 0.02, threshold + 0.04], [1, 1.9]);
  const dotColor = useTransform(
    progress,
    [threshold - 0.02, threshold + 0.04],
    ["var(--border)", "var(--copper)"],
  );

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
      className="relative grid gap-4 md:grid-cols-12 md:gap-8"
    >
      <motion.span
        aria-hidden
        style={{ scale: dotScale, backgroundColor: dotColor }}
        className="absolute top-2 -left-10 h-[7px] w-[7px] rounded-full md:-left-16 md:h-[15px] md:w-[15px]"
      />
      <div className="md:col-span-4">
        <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground">
          {step.n} /
        </span>
        <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] uppercase md:text-2xl">
          {step.title}
        </h3>
      </div>
      <p className="text-base leading-relaxed text-muted-foreground md:col-span-7 md:col-start-6">
        {step.body}
      </p>
    </motion.li>
  );
}