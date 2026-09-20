import { useState } from "react";
import { Check } from "lucide-react";
import { CtaLink, Section, SectionLabel } from "./primitives";

const inclusions = [
  "Ideal customer targeting & prospect research",
  "Campaign copy & personalised messaging",
  "Email & LinkedIn campaign management",
  "Follow-ups & reply handling",
  "Qualification & opportunity handover",
  "Campaign reporting & ongoing optimisation",
];
const fields = [
  { key: "prospects", label: "Prospects contacted / month", min: 0, max: 1000000, step: 100 },
  { key: "opportunities", label: "Opportunities / month", min: 0, max: 1000000, step: 1 },
  {
    key: "conversion",
    label: "Opportunities that become customers (%)",
    min: 0,
    max: 100,
    step: 1,
  },
  { key: "value", label: "Customer lifetime value (£)", min: 0, max: 1000000, step: 100 },
] as const;
const defaults = { prospects: 5000, opportunities: 20, conversion: 10, value: 5000 };
const money = (value: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);

export function Pricing() {
  const [values, setValues] = useState(defaults);
  const customers = (values.opportunities * 3 * values.conversion) / 100;
  const revenue = customers * values.value;
  const fee = 6750;
  const net = revenue - fee;
  const roi = (net / fee) * 100;
  const opportunityRate =
    values.prospects > 0 ? (values.opportunities / values.prospects) * 100 : 0;

  return (
    <Section id="pricing" className="py-20 md:py-24">
      <SectionLabel>Pricing</SectionLabel>
      <h2 className="mt-6 text-3xl font-semibold tracking-[-0.035em] md:text-5xl">
        One fee. Fully managed outbound
      </h2>
      <div className="mt-10 grid overflow-hidden rounded-xl border border-border lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-card p-6 md:p-9">
          <p className="flex flex-wrap items-baseline gap-2">
            <span className="text-5xl font-semibold tracking-[-0.055em] md:text-6xl">£1,500–£3,000</span>
            <span className="text-muted-foreground">/ month</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Pricing depends on sourcing difficulty, outreach channels and campaign volume.
          </p>
          <p className="mt-5 text-sm leading-relaxed">
            Initial 3-month term. Rolling monthly after that.
          </p>
          <p className="mt-2 text-sm font-medium text-copper-deep">
            No setup fees. No per-lead charges.
          </p>
          <ul className="my-8 space-y-4 border-t border-border pt-7">
            {inclusions.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed">
                <Check size={17} className="mt-0.5 shrink-0 text-copper-deep" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <CtaLink trackingPlacement="pricing">Book a call</CtaLink>
        </div>
        <div className="border-t border-border p-6 md:p-9 lg:border-t-0 lg:border-l">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Modelled lifetime revenue</p>
              <h3
                aria-live="polite"
                aria-atomic="true"
                className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-copper-deep tabular-nums md:text-5xl"
              >
                {money(revenue)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                From customers acquired in your first three months.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setValues(defaults)}
              className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Reset
            </button>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <label
                key={field.key}
                className="block text-xs leading-relaxed text-muted-foreground"
                htmlFor={`roi-${field.key}`}
              >
                {field.label}
                <input
                  id={`roi-${field.key}`}
                  type="number"
                  inputMode="decimal"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={values[field.key]}
                  onChange={(event) => {
                    const next = Number(event.target.value);
                    setValues((current) => {
                      const amount = Math.min(
                        field.max,
                        Math.max(field.min, Number.isFinite(next) ? next : 0),
                      );
                      if (field.key === "prospects") {
                        const rate =
                          current.prospects > 0
                            ? current.opportunities / current.prospects
                            : defaults.opportunities / defaults.prospects;
                        return {
                          ...current,
                          prospects: amount,
                          opportunities: Math.round(amount * rate * 100) / 100,
                        };
                      }
                      return {
                        ...current,
                        [field.key]:
                          field.key === "opportunities"
                            ? Math.min(amount, current.prospects)
                            : amount,
                      };
                    });
                  }}
                  className="mt-2 block w-full rounded-md border border-border bg-card px-3 py-2.5 text-base font-medium text-foreground tabular-nums outline-none focus:border-copper focus:ring-1 focus:ring-copper"
                />
              </label>
            ))}
          </div>
          <div className="mt-6" aria-live="polite" aria-atomic="true">
            <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
              {Number(opportunityRate.toFixed(2))}% contact-to-opportunity rate. Changing contact
              volume scales opportunities at this rate; edit opportunities to adjust it.
            </p>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Modelled new customers</dt>
                <dd className="tabular-nums">{Number(customers.toFixed(1))}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Three-month fee</dt>
                <dd className="tabular-nums">{money(fee)}</dd>
              </div>
            </dl>
            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-copper/40 pt-5">
              <div>
                <p className="text-xs text-muted-foreground">Revenue less our fee</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums text-copper-deep">
                  {money(net)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">ROI · fee-only costs</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">
                  {Math.round(roi)}%
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {values.value > 0
                ? `${Math.ceil(fee / values.value)} new customers to cover the three-month fee in lifetime revenue.`
                : "Enter a customer value to calculate fee coverage."}
            </p>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            Illustrative inputs, not a forecast or guarantee. Assumes a £2,250 monthly fee and
            customers are acquired within three months; lifetime revenue may arrive later. ROI =
            (lifetime revenue − our fee) ÷ our fee. Our fee is the only cost included; this is not
            a profit calculation. An opportunity is not a guaranteed sale.
          </p>
        </div>
      </div>
    </Section>
  );
}
