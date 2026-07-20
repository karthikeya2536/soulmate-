import type { Metadata } from "next";
import { SustainabilityContent } from "./SustainabilityContent";

export const metadata: Metadata = {
  title: "Craft & Ethics — Soulmate",
  description:
    "How we make our shoes — from Tuscan leather to Milanese hands, with transparency at every step.",
};

export default function SustainabilityPage() {
  return <SustainabilityContent />;
}