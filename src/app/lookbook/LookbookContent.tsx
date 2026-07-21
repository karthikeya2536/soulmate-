"use client";

import { motion } from "motion/react";
import Image from "next/image";

const looks = [
  {
    id: 1,
    image: "/assets/images/hero-shoe.jpg",
    title: "Golden Hour in Roma",
    location: "Trastevere",
    product: "The Muse in Blush",
  },
  {
    id: 2,
    image: "/assets/images/product-sandal.jpg",
    title: "Morning Light",
    location: "Palazzo Borromeo",
    product: "The Dreamer in Tan",
  },
  {
    id: 3,
    image: "/assets/images/product-boot.jpg",
    title: "After Dark",
    location: "Navigli, Milano",
    product: "The Rebel in Espresso",
  },
  {
    id: 4,
    image: "/assets/images/product-sneaker.jpg",
    title: "Weekend",
    location: "Jardin du Luxembourg",
    product: "The Icon in White",
  },
  {
    id: 5,
    image: "/assets/images/product-pump.jpg",
    title: "La Terrazza",
    location: "Lake Como",
    product: "The Lover in Gold",
  },
  {
    id: 6,
    image: "/assets/images/product-oxford.jpg",
    title: "A Porta",
    location: "Navigli, Milano",
    product: "The Poet in Sand",
  },
];

export function LookbookContent() {
  return (
    <div className="pt-24 md:pt-32">
      {/* Header */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 pb-20 md:pb-32">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
          className="font-display text-xs tracking-[0.15em] text-rose-gold uppercase"
        >
          Autumn 2026
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.1 }}
          className="mt-4 font-display text-[clamp(1.75rem,6.5vw,3rem)] md:text-7xl lg:text-8xl tracking-[-0.025em] text-espresso leading-[1.15]"
        >
          The Light
          <br />
          <span className="italic text-rose-gold">We Walk In</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.3 }}
          className="mt-8 text-ink-muted text-lg leading-relaxed max-w-xl"
        >
          Shot across Milan, Paris, and Lake Como — the Soulmate woman in her
          element. No studio. No posing. Just shoes in motion.
        </motion.p>
      </section>

      {/* Masonry-style grid */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 pb-24 md:pb-36">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8">
          {looks.map((look, i) => (
            <motion.div
              key={look.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.7,
                ease: [0.2, 0, 0, 1],
                delay: (i % 3) * 0.1,
              }}
              className="break-inside-avoid mb-6 md:mb-8 group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl bg-surface">
                <Image
                  src={look.image}
                  alt={look.title}
                  width={800}
                  height={i % 2 === 0 ? 1000 : 700}
                  className="w-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="font-display text-xl text-white">
                    {look.title}
                  </p>
                  <p className="text-sm text-white/70 mt-1">{look.location}</p>
                  <p className="text-xs text-rose-gold mt-1 tracking-[0.04em]">
                    {look.product}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}