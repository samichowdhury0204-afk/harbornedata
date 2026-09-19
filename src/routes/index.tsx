import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Pricing } from "@/components/site/Pricing";
// Services section removed from homepage composition per design
import { Examples } from "@/components/site/Examples";
// Roles section removed from homepage flow per request
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://www.harborne-data.com/" }],
    meta: [
      { title: "Harborne Data — AI-led B2B Outbound" },
      {
        name: "description",
        content:
          "AI-led B2B outbound through email and LinkedIn. We find the right buyers, start conversations and qualify opportunities for your team.",
      },
      {
        property: "og:title",
        content: "Harborne Data — AI-led B2B Outbound",
      },
      {
        property: "og:description",
        content:
          "Buyer research, targeted email and LinkedIn outreach, and qualified opportunities for B2B businesses.",
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
        <Pricing />
        <Examples />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
