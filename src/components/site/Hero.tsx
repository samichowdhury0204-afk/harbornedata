import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import MuxPlayer from "@mux/mux-player-react/lazy";
import { CtaLink, Mark } from "./primitives";

const playbackId = "UIjswrAzK7fRBIcd3rlnA7xmWlzjtSL00Olci3Zzi00cw";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-background to-transparent"
        aria-hidden
      />
      <Mark
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-24 hidden h-[420px] opacity-[0.06] lg:block"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">
        <motion.div
          aria-hidden
          className="mb-7 h-1 rounded-full bg-gradient-to-r from-copper-deep via-copper-light to-transparent"
          initial={reduce ? false : { width: 0, opacity: 0 }}
          animate={{ width: 88, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
        />

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 0.61, 0.36, 1] }}
          className="max-w-5xl text-[2.9rem] leading-[1.02] font-semibold tracking-[-0.055em] text-balance text-ink md:text-[4.75rem] lg:text-[5.5rem]"
        >
          AI-led <span className="hero-highlight">cold outbound.</span>
        </motion.h1>

        <div className="mt-8 grid max-w-[820px] grid-cols-2 gap-3 sm:gap-6">
          <motion.div
            className="hero-stat min-w-0 px-4 pt-5 pb-4 sm:px-6 sm:pt-6 sm:pb-5"
            initial={reduce ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="relative text-[2.45rem] leading-none tracking-[-0.055em] sm:text-[3.5rem]">
              <AnimatedCounter
                from={5}
                to={20}
                prefix="£"
                suffix="k"
                delay={550}
                width="min-w-[5ch]"
              />
            </div>
            <p className="relative mt-2 text-sm font-medium tracking-[-0.015em] text-ink/75 sm:text-lg">
              in pipeline
            </p>
          </motion.div>

          <motion.div
            className="hero-stat min-w-0 px-4 pt-5 pb-4 sm:px-6 sm:pt-6 sm:pb-5"
            initial={reduce ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="relative text-[2.45rem] leading-none tracking-[-0.055em] sm:text-[3.5rem]">
              <AnimatedCounter from={5} to={30} delay={700} width="min-w-[3ch]" />
            </div>
            <p className="relative mt-2 text-sm font-medium tracking-[-0.015em] text-ink/75 sm:text-lg">
              sales conversations
            </p>
          </motion.div>
        </div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.48 }}
          className="mt-5 flex items-center gap-3 text-base font-normal text-muted-foreground md:text-lg"
        >
          <span aria-hidden className="h-px w-7 bg-copper" />
          Using email and LinkedIn
        </motion.p>
      </div>

      <div className="relative mx-auto mt-10 w-full max-w-6xl px-6 md:mt-12 md:px-10">
        <div className="overflow-hidden border border-border bg-card shadow-[0_24px_70px_-45px_rgba(16,32,37,0.55)]">
          <MuxPlayer
            playbackId={playbackId}
            autoPlay="muted"
            muted
            playsInline
            preload="auto"
            loading="page"
            metadata={{ video_id: "harborne-vsl", video_title: "Harborne Data introduction" }}
            style={{ display: "block", width: "100%", aspectRatio: "16 / 9" }}
          />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.46 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <CtaLink>Book a call</CtaLink>
        </motion.div>
      </div>
    </section>
  );
}

function AnimatedCounter({
  from,
  to,
  prefix = "",
  suffix = "",
  delay = 0,
  width,
}: {
  from: number;
  to: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
  width: string;
}) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (reduce) return;

    let startTime: number | undefined;
    let frameId: number;
    const duration = 3000;

    const tick = (time: number) => {
      startTime ??= time;
      const progress = Math.min(1, Math.max(0, (time - startTime - delay) / duration));
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(from + (to - from) * eased));

      if (progress < 1) frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [delay, from, reduce, to]);

  const displayed = reduce ? to : count;

  return (
    <span
      className={`hero-highlight hero-highlight-metric inline-block tabular-nums font-semibold ${width}`}
    >
      <span aria-hidden>
        {prefix}
        {displayed}
        {suffix}
        {displayed === to && (
          <motion.span
            className="inline-block"
            initial={reduce ? false : { opacity: 0, scale: 0.4, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
          >
            +
          </motion.span>
        )}
      </span>
      <span className="sr-only">
        {prefix}
        {to}
        {suffix} plus
      </span>
    </span>
  );
}
