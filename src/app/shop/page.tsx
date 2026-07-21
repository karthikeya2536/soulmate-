import type { Metadata } from "next";
import { ShopContent } from "./ShopContent";

export const metadata: Metadata = {
  title: "Shop — Soulmate",
  description:
    "Discover your perfect pair. Six silhouettes. Infinite stories. Each pair is made to order, because the most sustainable shoe is the one you never want to take off.",
};

export default function ShopPage() {
  return <ShopContent />;
}
