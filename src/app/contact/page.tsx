import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact — Soulmate",
  description:
    "Get in touch with the Soulmate atelier. We'd love to hear from you.",
};

export default function ContactPage() {
  return <ContactContent />;
}