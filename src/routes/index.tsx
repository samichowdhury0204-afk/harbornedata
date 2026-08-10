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
      { title: "Harborne Data — Outsourced Sales for Manufacturers" },
      {
        name: "description",
        content:
          "Harborne Data finds the right companies, starts the conversation and hands qualified opportunities directly to your team.",
      },
      {
        property: "og:title",
        content: "Harborne Data — Outsourced Sales for Manufacturers",
      },
      {
        property: "og:description",
        content:
          "Targeted prospecting, outbound and opportunity qualification for UK and US manufacturers.",
      },
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
