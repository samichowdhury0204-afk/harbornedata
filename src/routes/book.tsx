import Cal, { getCalApi } from "@calcom/embed-react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { trackEvent } from "@/lib/analytics";
import { useTheme } from "@/lib/theme";

const bookingUrl = "https://cal.com/harborne/harborne-outbound-strategy-call";
const namespace = "harborne-outbound-strategy-call";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a call — Harborne Data" },
      {
        name: "description",
        content:
          "Choose a time to talk with Harborne Data about your buyers, outbound and pipeline.",
      },
      { property: "og:title", content: "Book a call — Harborne Data" },
      { property: "og:url", content: "https://www.harborne-data.com/book" },
    ],
    links: [{ rel: "canonical", href: "https://www.harborne-data.com/book" }],
  }),
  component: BookPage,
});

function BookPage() {
  const { dark } = useTheme();

  useEffect(() => {
    let active = true;
    const onBookingSuccessful = () => trackEvent("generate_lead", { method: "cal_com" });
    let calApi: Awaited<ReturnType<typeof getCalApi>> | undefined;

    void getCalApi({ namespace }).then((cal) => {
      calApi = cal;
      if (!active) return;
      cal("on", { action: "bookingSuccessfulV2", callback: onBookingSuccessful });
    });

    return () => {
      active = false;
      calApi?.("off", { action: "bookingSuccessfulV2", callback: onBookingSuccessful });
    };
  }, []);

  useEffect(() => {
    void getCalApi({ namespace }).then((cal) => {
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: dark ? "dark" : "light",
        styles: { branding: { brandColor: dark ? "#d5a67d" : "#92552e" } },
      });
    });
  }, [dark]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto w-full max-w-6xl px-6 pb-20 pt-32 md:px-10 md:pt-40">
        <div className="max-w-3xl">
          <p className="label-xs">Harborne Data · Strategy call</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Let's fill your pipeline.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Choose a time to discuss your offer, your buyers and whether outbound is a good fit.
          </p>
        </div>
        <div className="mt-10 min-h-[780px] overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:min-h-[720px]">
          <Cal
            namespace={namespace}
            calLink="harborne/harborne-outbound-strategy-call"
            className="h-[780px] w-full md:h-[720px]"
            style={{ width: "100%", overflow: "auto" }}
            config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
          />
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            Cal.com handles your booking details. Read our{" "}
            <a className="underline underline-offset-4 hover:text-copper-deep" href="/privacy">
              privacy notice
            </a>
            .
          </p>
          <a
            className="underline underline-offset-4 hover:text-copper-deep"
            href={bookingUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            Having trouble? Open Cal.com directly ↗
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
