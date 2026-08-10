import { Logo } from "./primitives";

const links = [
  { href: "#solutions", label: "Solutions" },
  { href: "#results", label: "Results" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Logo className="h-7" />
            <p className="mt-4 text-sm text-muted-foreground">
              Outsourced sales for manufacturers.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors duration-300 hover:text-copper-deep"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-2 border-t border-border pt-6 font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Harborne Data</span>
          <span>United Kingdom</span>
        </div>
      </div>
    </footer>
  );
}