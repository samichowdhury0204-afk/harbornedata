import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import logoDark from "@/assets/harborne-logo.png";
import logoLight from "@/assets/harborne-logo-light.png";
import mark from "@/assets/harborne-mark.png";

export function Logo({
  variant = "dark",
  className,
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  return (
    <img
      src={variant === "dark" ? logoDark : logoLight}
      alt="Harborne Data"
      width={330}
      height={88}
      className={cn("h-8 w-auto select-none", className)}
    />
  );
}

export function Mark({ className }: { className?: string }) {
  return <img src={mark} alt="" aria-hidden className={cn("w-auto", className)} />;
}

export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] } },
};

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 rule-copper" aria-hidden />
      <span className="label-xs">{children}</span>
    </div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-20 border-t border-border/70 py-24 md:py-32", className)}
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">{children}</div>
    </section>
  );
}

export function CtaLink({
  children = "Start a conversation",
  variant = "solid",
  className,
  href = "#contact",
}: {
  children?: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-xs px-5 py-3 text-sm font-medium transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
        variant === "solid"
          ? "bg-ink text-primary-foreground hover:bg-ink-deep"
          : "border border-border text-foreground hover:border-copper hover:text-copper-deep",
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-1"
        style={{ color: variant === "solid" ? "var(--copper-light)" : undefined }}
      >
        →
      </span>
    </a>
  );
}
