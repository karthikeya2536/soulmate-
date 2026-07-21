"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

export function FeaturedProducts() {
  const featured = products.slice(0, 4);

  return (
    <section className="bg-surface-warm py-24 md:py-36">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
            className="font-display text-xs tracking-[0.15em] text-rose-gold uppercase"
          >
            The Collection
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.1 }}
            className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] text-espresso leading-[1.05]"
          >
            Six silhouettes.
            <br />
            <span className="italic">Infinite stories.</span>
          </motion.h2>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featured.map((product, i) => (
            <Link key={product.id} href={`/shop`} className="group block">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.6,
                  ease: [0.2, 0, 0, 1],
                  delay: i * 0.1,
                }}
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-surface">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/10 transition-all duration-500 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 bg-white text-espresso text-xs font-medium px-4 py-2 rounded-full">
                      View Details
                    </span>
                  </div>

                  {product.isNew && (
                    <span className="absolute top-3 left-3 bg-rose-gold text-white text-[10px] font-semibold tracking-[0.1em] px-3 py-1 rounded-full uppercase">
                      New
                    </span>
                  )}
                </div>

                {/* Info */}
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
                  <p className="text-sm text-ink-muted leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.4 }}
          className="mt-14 text-center"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 min-h-[44px] bg-espresso text-white font-medium text-sm rounded-full hover:bg-rose-gold-dark transition-all duration-300 group"
          >
            View Full Collection
            <span className="transition-all duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}