import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Difference } from "@/components/site/Difference";
import { Process } from "@/components/site/Process";
import { Services } from "@/components/site/Services";
import { Handoff } from "@/components/site/Handoff";
import { Examples } from "@/components/site/Examples";
import { Why } from "@/components/site/Why";
import { Roles } from "@/components/site/Roles";
import { Offer } from "@/components/site/Offer";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harborne Data — Outsourced Sales for Manufacturers" },
      {
        name: "description",
        content:
          "Harborne Data finds the right companies, starts the conversation and hands qualified opportunities directly to your sales team.",
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
        <Difference />
        <Process />
        <Services />
        <Handoff />
        <Examples />
        <Why />
        <Roles />
        <Offer />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
