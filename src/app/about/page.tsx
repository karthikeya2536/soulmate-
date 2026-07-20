import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "Our Story — Soulmate",
  description:
    "From a Parisian atelier to Milanese workshops — the story of how Soulmate came to craft the world's most considered footwear.",
};

export default function AboutPage() {
  return <AboutContent />;
}