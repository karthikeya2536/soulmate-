"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { products, categories } from "@/lib/products";

export function ShopContent() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-24 md:pt-32">
      {/* Header */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 pb-12 md:pb-20">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
          className="font-display text-xs tracking-[0.15em] text-rose-gold uppercase"
        >
          The Collection
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.1 }}
          className="mt-4 font-display text-[clamp(1.75rem,6.5vw,3rem)] md:text-7xl lg:text-8xl tracking-[-0.025em] text-espresso leading-[0.95]"
        >
          Find Your
          <br />
          <span className="italic text-rose-gold">Soulmate</span>
        </motion.h1>
      </section>

      {/* Category filter */}
      <div className="sticky top-16 md:top-20 z-30 bg-bg/90 backdrop-blur-md border-b border-surface">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 flex gap-6 md:gap-10 overflow-x-auto py-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-medium tracking-[0.04em] whitespace-nowrap transition-all duration-300 relative pb-1 ${
                activeCategory === cat
                  ? "text-espresso"
                  : "text-ink-muted hover:text-espresso"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.span
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-gold"
                  transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          >
            {filtered.map((product, index) => (
              <Link
                key={product.id}
                href={`/shop`}
                className="group block"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product image */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-surface">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    {...(index < 3 ? { loading: "eager" as const } : {})}
                  />

                  {/* Hover state */}
                  <div
                    className={`absolute inset-0 flex items-end p-6 transition-all duration-500 ${
                      hoveredProduct === product.id
                        ? "bg-gradient-to-t from-espresso/60 via-espresso/10 to-transparent opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="inline-block bg-white text-espresso text-xs font-medium px-4 py-2 rounded-full">
                        Quick View
                      </span>
                      <p className="mt-3 text-white/80 text-sm leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {product.isNew && (
                    <span className="absolute top-3 left-3 bg-rose-gold text-white text-[10px] font-semibold tracking-[0.1em] px-3 py-1 rounded-full uppercase z-10">
                      New
                    </span>
                  )}
                </div>

                {/* Product info */}
                <div className="mt-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg text-espresso group-hover:text-rose-gold transition-colors duration-300">
                      {product.name}
                    </h3>
                    <span className="text-sm font-medium text-ink-muted">
                      &euro;{product.price}
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted/70 uppercase tracking-[0.08em]">
                    {product.category}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {product.colors.map((color) => (
                      <span
                        key={color}
                        className="text-[11px] text-ink-muted/60 tracking-[0.04em]"
                      >
                        {color}
                        {product.colors.indexOf(color) <
                          product.colors.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
