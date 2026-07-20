import type { Metadata } from "next";
import { LookbookContent } from "./LookbookContent";

export const metadata: Metadata = {
  title: "Lookbook — Soulmate",
  description:
    "Campaign imagery and editorial stories featuring the Soulmate collection in motion.",
};

export default function LookbookPage() {
  return <LookbookContent />;
}