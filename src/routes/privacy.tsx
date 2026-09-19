import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy notice — Harborne Data" },
      {
        name: "description",
        content: "How Harborne Data Ltd handles website, booking and B2B outreach data.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://www.harborne-data.com/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-32 md:px-10 md:pt-40">
        <p className="label-xs">Harborne Data Ltd</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">Privacy notice</h1>
        <p className="mt-5 text-sm text-muted-foreground">Last updated: 19 September 2026</p>
        <div className="mt-10 space-y-10 text-base leading-relaxed text-muted-foreground [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground [&_a]:text-copper-deep [&_a]:underline [&_a]:underline-offset-4">
          <section>
            <h2>Who we are</h2>
            <p>
              Harborne Data Ltd, 17 Bennison Drive, Romford, RM3 0WJ, United Kingdom, is responsible
              for personal data we use to run this website, handle enquiries and market our own
              services. Contact us at{" "}
              <a href="mailto:sami@harborne-data.com">sami@harborne-data.com</a> with privacy
              questions or requests.
            </p>
          </section>
          <section>
            <h2>What we collect and why</h2>
            <p>
              When you contact us or book a call, we receive the details you provide, such as your
              name, work email, company, meeting details and messages. We use these to respond,
              arrange the call and discuss a potential engagement. Our lawful basis is taking steps
              towards a contract at your request or our legitimate interest in handling business
              enquiries.
            </p>
            <p className="mt-3">
              For B2B prospecting we may use professional contact details, employer, role, public
              business information, campaign history and replies. These may come from company
              websites, professional networks, data providers, our clients or direct conversations.
              We use them to identify relevant businesses, contact appropriate decision-makers and
              manage replies. Where permitted, we rely on legitimate interests, balanced against
              your rights and expectations, and comply with applicable electronic marketing rules.
              You can object to direct marketing at any time by emailing us or using an opt-out in a
              message.
            </p>
            <p className="mt-3">
              We also receive basic technical information when you visit the site, such as device
              and browser details needed to serve the page and protect it. Our lawful basis is
              legitimate interests in operating a secure website.
            </p>
          </section>
          <section>
            <h2>Video, booking and analytics</h2>
            <p>
              The site uses Mux to deliver our video and Calendly to show available times and take
              bookings. Their embedded content loads when you visit the relevant page section and
              may use their own storage and collect technical usage data. Calendly handles the
              details you enter in its booking form and sends meeting information to our calendar.
              We do not have a separate CRM or spreadsheet tracking system for website bookings at
              present.
            </p>
            <p className="mt-3">
              A local setting remembers your light or dark theme. Optional Google Analytics and
              advertising measurement will be used only if you choose the relevant option in our
              privacy controls and after it is connected. Advertising consent may allow Google to
              use site activity for remarketing. You can change your choice using “Privacy settings”
              in the footer. We do not send your booking form details to Google through our website
              tracking.
            </p>
          </section>
          <section>
            <h2>Cookies and local storage</h2>
            <p>
              We use local storage to remember your theme and privacy choice. If you permit
              analytics or advertising measurement, Google may use cookies and similar technology to
              measure visits and conversions. You can refuse optional measurement or change your
              choice at any time through the Privacy settings link. Calendly and Mux may use their
              own storage when their content loads; their own privacy and cookie information is
              available through those services.
            </p>
          </section>
          <section>
            <h2>Who receives your data</h2>
            <p>
              Relevant service providers may process data for us, including our website host, Mux,
              Calendly, Google, email and calendar providers, and outbound campaign tools such as
              Instantly. Client campaign information may also be shared with the client for whom we
              are working. We share only what is needed to provide the service. These providers may
              process data outside the UK; where required, we use applicable safeguards and can
              provide more information on request.
            </p>
          </section>
          <section>
            <h2>How long we keep it</h2>
            <p>
              We aim to delete or anonymise prospect and booking enquiry data within six months of
              the last relevant interaction if no client relationship follows. Where a contract,
              accounting rule, legal obligation or dispute requires longer retention, we keep only
              what is needed for that purpose. We may keep a minimal suppression record for longer
              so we do not contact someone who has opted out again.
            </p>
          </section>
          <section>
            <h2>Your rights</h2>
            <p>
              You can ask for access, correction or deletion, object to direct marketing or other
              processing, ask us to restrict processing, or withdraw consent for optional tracking.
              Other rights may apply depending on the circumstances. Email{" "}
              <a href="mailto:sami@harborne-data.com">sami@harborne-data.com</a>.
            </p>
          </section>
          <section>
            <h2>Changes</h2>
            <p>
              We will update this notice when our tools or practices change and show the latest
              update date here.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
