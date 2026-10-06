import { useState } from "react";
import { Check } from "lucide-react";
import { CtaLink, Section, SectionLabel } from "./primitives";

const inclusions = [
  "Exhaustive TAM mapping & continuous market development",
  "Decision-maker contact sourcing",
  "Sending infrastructure, warm-up & deliverability",
  "AI-enriched copy & personalised messaging",
  "Managed campaigns, follow-ups & ongoing optimisation",
  "Reply management, qualification & opportunity handover",
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
  const fee = 8250;
  const net = revenue - fee;
  const roi = (net / fee) * 100;
  const opportunityRate =
    values.prospects > 0 ? (values.opportunities / values.prospects) * 100 : 0;

  return (
    <Section id="pricing" className="py-20 md:py-24">
      <SectionLabel>Pricing</SectionLabel>
      <h2 className="mt-6 text-3xl font-semibold tracking-[-0.035em] md:text-5xl">
        Managed outbound. Matched to your market.
      </h2>
      <div className="mt-10 grid overflow-hidden rounded-xl border border-border lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-card p-6 md:p-9">
          <h3 className="mb-5 text-xl font-semibold tracking-tight">Fully managed outbound</h3>
          <p className="flex flex-wrap items-baseline gap-2">
            <span className="text-5xl font-semibold tracking-[-0.055em] md:text-6xl">£2,500</span>
            <span className="text-muted-foreground">/ month</span>
          </p>
          <p className="mt-3 text-base font-medium text-copper-deep">
            + £750 one-off onboarding
          </p>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            We build and continuously develop your target market, identify the relevant
            decision-makers, run and optimise the outbound infrastructure and campaigns, and manage
            responses through to qualified commercial opportunities.
          </p>
          <p className="mt-4 text-sm leading-relaxed">
            Campaign volume is determined by the available qualified market, typically{" "}
            <span className="font-medium">3,000–10,000 new prospects per month.</span>
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
                <dt className="text-muted-foreground">Three months + onboarding</dt>
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
                ? `${Math.ceil(fee / values.value)} new customers to cover three months plus onboarding in lifetime revenue.`
                : "Enter a customer value to calculate fee coverage."}
            </p>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            Illustrative inputs, not a forecast or guarantee. Assumes a £2,500 monthly fee plus
            £750 one-off onboarding and customers are acquired within three months; lifetime revenue
            may arrive later. ROI = (lifetime revenue − our fee) ÷ our fee. Our fee is the only cost
            included; this is not a profit calculation. An opportunity is not a guaranteed sale.
          </p>
        </div>
      </div>
      <article id="specialist-outbound" className="mt-8 scroll-mt-24 overflow-hidden rounded-xl border border-copper/40 bg-card">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-6 md:p-9">
            <SectionLabel>Specialist service</SectionLabel>
            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.035em] md:text-4xl">
              Specialist managed outbound
            </h3>
            <p className="mt-6 text-xl font-medium leading-snug">
              Find the businesses with a specific reason to buy your technology.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              For founder-led firms selling proven, high-value technical solutions: specialist
              heating and heat recovery, water treatment, industrial automation, sensors and
              other niche engineering technologies.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We build a bespoke prospecting pipeline around your applications, using evidence
              from each business to identify a plausible need and develop a relevant approach.
              Managed email outreach works alongside LinkedIn connections and founder content
              to open conversations and build familiarity with your solution.
            </p>
            <div className="mt-7">
              <CtaLink trackingPlacement="specialist_pricing">Discuss your specialist campaign</CtaLink>
            </div>
          </div>
          <div className="border-t border-copper/30 p-6 md:p-9 lg:border-t-0 lg:border-l">
            <h4 className="text-lg font-semibold">Research, outreach and visibility. Fully managed.</h4>
            <ul className="mt-6 space-y-5">
              {[
                ["Bespoke market discovery", "Map buyer applications and build your addressable market beyond standard industry filters."],
                ["Company research & deeper enrichment", "Find evidence of application fit and relevant buying triggers, then identify and verify decision-makers."],
                ["A tailored first offer", "Shape a useful assessment, technical discussion or other first step your team can deliver."],
                ["Evidence-led email campaigns", "Develop company-specific messaging, manage sending infrastructure, run follow-ups and refine campaigns from real replies."],
                ["Founder-led LinkedIn", "Manage relevant connection requests and plan, write and publish founder content with your approval, at an agreed cadence."],
                ["Qualified opportunity handover", "Manage replies and pass interested buyers to your team with the research and conversation context attached."],
                ["Reporting & continuous improvement", "Review applications, messaging and opportunity quality, using your sales feedback to guide the next campaign."],
              ].map(([title, description]) => (
                <li key={title} className="flex gap-3 text-sm leading-relaxed">
                  <Check size={17} className="mt-0.5 shrink-0 text-copper-deep" aria-hidden />
                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="mt-1 text-muted-foreground">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-copper/30 bg-background/60 p-6 md:px-9">
          <p className="text-sm leading-relaxed">
            <span className="font-medium">A practical example:</span> a holiday park with its own
            lake and a heated pool could be a prospect for water-source heating. We connect
            verified site facts to a potential application, then open a conversation to establish
            suitability and interest.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Best suited to commercially proven solutions with strong project economics and a team
            ready to develop new opportunities. Research depth, monthly outreach volume and
            LinkedIn activity are agreed around your qualified market before launch.
          </p>
        </div>
      </article>
    </Section>
  );
}
