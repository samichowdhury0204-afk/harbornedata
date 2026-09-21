import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo, CtaLink } from "./primitives";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { trackEvent } from "@/lib/analytics";
import { useLocation } from "@tanstack/react-router";

const links = [
  { href: "#pricing", label: "Pricing" },
  { href: "#results", label: "Results" },
  { href: "/book", label: "Book a call" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { dark, toggleTheme } = useTheme();
  const isHome = useLocation({ select: (location) => location.pathname === "/" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "site-nav fixed inset-x-0 top-0 z-50 bg-background text-foreground transition-shadow duration-500",
        scrolled ? "border-b border-border/80 bg-background" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:h-20 md:px-10">
        <a
          href={isHome ? "#top" : "/"}
          aria-label="Harborne Data — home"
          className="flex items-center"
        >
          <Logo className="h-7 md:h-8 dark:hidden" />
          <Logo variant="light" className="hidden h-7 md:h-8 dark:block" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href.startsWith("/") ? l.href : isHome ? l.href : `/${l.href}`}
              className="relative text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-copper after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
          >
            {dark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
          </button>
          <div className="hidden md:block">
            <CtaLink
              href="/book"
              trackingPlacement="navigation"
              className="px-4 py-2.5 text-[0.8125rem]"
            >
              Book a call
            </CtaLink>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={cn(
                  "absolute left-0 h-px w-5 bg-foreground transition-all duration-300",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px w-5 bg-foreground transition-all duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 bottom-0 border-t border-border bg-background px-6 pt-8 md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href.startsWith("/") ? l.href : isHome ? l.href : `/${l.href}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.05, duration: 0.4 }}
                  className="border-b border-border/70 pb-4 text-2xl font-medium tracking-tight"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                onClick={() => {
                  setOpen(false);
                  trackEvent("book_call_click", { placement: "mobile_navigation" });
                }}
                className="mt-2 rounded-xs bg-primary px-5 py-3 text-center font-medium text-primary-foreground"
                href="/book"
              >
                Book a call →
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
