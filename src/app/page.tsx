import { ScrollSequenceHero } from "@/components/ScrollSequenceHero";
import { BrandStory } from "@/components/BrandStory";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Marquee } from "@/components/Marquee";
import { TextReveal } from "@/components/TextReveal";

export default function HomePage() {
  return (
    <>
      <ScrollSequenceHero />
      <Marquee />
      <BrandStory />
      <TextReveal />
      <FeaturedProducts />
    </>
  );
}