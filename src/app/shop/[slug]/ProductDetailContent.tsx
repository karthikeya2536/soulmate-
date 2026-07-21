"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";

export function ProductDetailContent({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = useCallback(() => {
    if (!selectedSize) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }, [product, selectedColor, selectedSize, addItem]);

  return (
    <div className="pt-20 md:pt-24">
      {/* Breadcrumb */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 py-4">
        <nav className="flex items-center gap-2 text-xs text-ink-muted/60 tracking-[0.04em]">
          <Link href="/" className="hover:text-espresso transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-espresso transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-espresso">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 pb-24 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* ── Product Image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-rose-gold text-white text-[10px] font-semibold tracking-[0.1em] px-3 py-1 rounded-full uppercase z-10">
                New
              </span>
            )}
          </motion.div>

          {/* ── Product Details ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.15 }}
            className="flex flex-col"
          >
            {/* Category label */}
            <span className="font-display text-xs tracking-[0.15em] text-rose-gold uppercase">
              {product.category}
            </span>

            {/* Name */}
            <h1 className="mt-2 font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] text-espresso leading-[1.05]">
              {product.name}
            </h1>

            {/* Price */}
            <p className="mt-4 text-2xl font-medium text-espresso">
              &euro;{product.price}
            </p>

            {/* Description */}
            <p className="mt-6 text-ink-muted leading-relaxed max-w-md">
              {product.description}
            </p>

            {/* ── Color Selector ── */}
            <div className="mt-10">
              <h3 className="text-sm font-medium text-espresso tracking-[0.04em]">
                Color —{" "}
                <span className="text-ink-muted">{selectedColor}</span>
              </h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.colors.map((color) => {
                  const colorMap: Record<string, string> = {
                    Noir: "#1a1a1a",
                    Blush: "#f5e0d0",
                    Ivory: "#faf3ea",
                    Sand: "#d4c4b0",
                    "Rose Gold": "#e8c4a0",
                    Espresso: "#3c2a20",
                    Olive: "#6b7355",
                    Tan: "#c4a882",
                    White: "#f5f5f0",
                    Gold: "#d4a860",
                  };
                  const bg = colorMap[color] || "#c4a882";
                  const isLight =
                    ["Blush", "Ivory", "Sand", "White", "Tan"].includes(color);
                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-10 h-10 rounded-full transition-all duration-300 ${
                        selectedColor === color
                          ? "ring-2 ring-espresso ring-offset-2 scale-110"
                          : "ring-1 ring-ink-muted/20 hover:scale-105"
                      }`}
                      style={{ backgroundColor: bg }}
                      aria-label={color}
                      title={color}
                    >
                      <span className="sr-only">{color}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Size Selector ── */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-espresso tracking-[0.04em]">
                Size —{" "}
                <span className="text-ink-muted">
                  {selectedSize ? `EU ${selectedSize}` : "Select"}
                </span>
              </h3>
              <div className="mt-3 grid grid-cols-7 gap-2 max-w-sm">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-espresso text-white"
                        : "bg-surface text-ink-muted hover:bg-espresso/10 hover:text-espresso border border-ink-muted/10"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Add to Cart ── */}
            <div className="mt-10 space-y-3">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-4 px-8 rounded-full text-sm font-medium tracking-[0.04em] transition-all duration-300 ${
                  added
                    ? "bg-green-600 text-white"
                    : !selectedSize
                    ? "bg-ink-muted/10 text-ink-muted/40 cursor-not-allowed"
                    : "bg-espresso text-white hover:bg-espresso/90"
                }`}
              >
                {added
                  ? "Added to Cart ✓"
                  : !selectedSize
                  ? "Select a Size"
                  : "Add to Cart"}
              </motion.button>

              <p className="text-xs text-ink-muted/50 text-center tracking-[0.04em]">
                Free shipping on orders over &euro;400
              </p>
            </div>

            {/* ── Details ── */}
            <div className="mt-12 border-t border-surface pt-8 space-y-4">
              {[
                { label: "Made to order", value: "3 weeks from order" },
                { label: "Materials", value: "Italian calfskin leather" },
                { label: "Origin", value: "Crafted in Milan" },
                {
                  label: "Care",
                  value: "Wipe with a soft, dry cloth. Store in dust bag.",
                },
              ].map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-start justify-between gap-4"
                >
                  <span className="text-sm text-ink-muted/70">
                    {detail.label}
                  </span>
                  <span className="text-sm text-espresso text-right max-w-[60%]">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Back link ── */}
            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-2 text-sm text-ink-muted hover:text-espresso transition-colors"
            >
              <span>←</span>
              <span>Back to Collection</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
