import { motion, useReducedMotion } from "motion/react";
import { Crosshair, Send, CheckCheck, CalendarCheck } from "lucide-react";
import { Reveal, Section, SectionLabel } from "./primitives";

const stages = [
  { title: "Target", detail: "Find the right companies and decision-makers.", icon: Crosshair },
  {
    title: "Engage",
    detail: "Start relevant conversations through email and LinkedIn.",
    icon: Send,
  },
  { title: "Qualify", detail: "Check interest, fit and the next step.", icon: CheckCheck },
  { title: "Handoff", detail: "Bring qualified opportunities to your team.", icon: CalendarCheck },
];

export function Solutions() {
  const reduce = useReducedMotion();
  return (
    <Section id="solutions" className="py-20 md:py-24">
      <Reveal>
        <SectionLabel>How it works</SectionLabel>
        <h2 className="mt-6 max-w-3xl text-3xl leading-[1.1] font-semibold tracking-[-0.03em] md:text-[2.75rem]">
          From the right audience to your next sales conversation.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          A focused outbound process, built around your offer, your market and what makes a good
          customer.
        </p>
      </Reveal>
      <ol
        className="outbound-flow mt-12 grid gap-0 md:grid-cols-4"
        aria-label="Our outbound process"
      >
        {stages.map(({ title, detail, icon: Icon }, index) => (
          <motion.li
            key={title}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="flow-stage relative grid grid-cols-[3.5rem_1fr] gap-x-5 pb-9 last:pb-0 md:block md:pr-7 md:pb-0"
          >
            <div
              className="flow-icon relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-copper/35 bg-card text-copper-deep"
              style={{ animationDelay: `${index * 1.2}s` }}
            >
              <Icon size={23} strokeWidth={1.5} aria-hidden />
            </div>
            <div className="md:mt-6">
              <p className="text-xs font-medium tracking-[0.12em] text-copper-deep" aria-hidden>
                0{index + 1}
              </p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {detail}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
