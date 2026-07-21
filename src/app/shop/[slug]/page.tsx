import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products } from "@/lib/products";
import { ProductDetailContent } from "./ProductDetailContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) return { title: "Not Found — Soulmate" };

  return {
    title: `${product.name} — Soulmate`,
    description: product.description,
    openGraph: {
      title: `${product.name} — Soulmate`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) notFound();

  return <ProductDetailContent product={product} />;
}
