import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Solutions } from "@/components/site/Handoff";
// Services section removed from homepage composition per design
import { Examples } from "@/components/site/Examples";
// Roles section removed from homepage flow per request
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harborne Data — Outbound for UK Industry" },
      {
        name: "description",
        content:
          "Harborne Data finds and contacts the right B2B buyers for UK manufacturers and specialist industrial service firms.",
      },
      {
        property: "og:title",
        content: "Harborne Data — Outbound for UK Industry",
      },
      {
        property: "og:description",
        content:
          "Targeted prospecting, outbound and opportunity qualification for UK manufacturers and specialist industrial service firms.",
      },
      { property: "og:url", content: "https://www.harborne-data.com/" },
      { property: "og:image", content: "https://www.harborne-data.com/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Harborne Data — a steady pipeline of new opportunities",
      },
      { name: "twitter:image", content: "https://www.harborne-data.com/og-image.png" },
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
        <Solutions />
        <Examples />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
