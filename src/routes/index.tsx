import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { IntelligentOutbound } from "@/components/site/IntelligentOutbound";
import { Pricing } from "@/components/site/Pricing";
// Services section removed from homepage composition per design
import { Examples } from "@/components/site/Examples";
// Roles section removed from homepage flow per request
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://www.harborne-data.com/" }],
    meta: [
      { title: "Harborne Data — Intelligent B2B Outbound" },
      {
        name: "description",
        content:
          "Research-led B2B outbound that learns your market. We discover and qualify accounts, test messages, run outreach and refine campaigns from real responses.",
      },
      {
        property: "og:title",
        content: "Harborne Data — Intelligent B2B Outbound",
      },
      {
        property: "og:description",
        content:
          "Research-led targeting, tested messaging and adaptive outbound for B2B businesses.",
      },
      { property: "og:url", content: "https://www.harborne-data.com/" },
      { property: "og:image", content: "https://www.harborne-data.com/og-image-v2.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Harborne Data — a steady pipeline of new opportunities",
      },
      { name: "twitter:image", content: "https://www.harborne-data.com/og-image-v2.png" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <IntelligentOutbound />
        <Pricing />
        <Examples />
      </main>
      <Footer />
    </div>
  );
}
