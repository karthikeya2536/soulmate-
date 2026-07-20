"use client";

import { motion } from "motion/react";
import Image from "next/image";

export function BrandStory() {
  return (
    <section className="relative overflow-hidden bg-bg">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
            className="relative aspect-[3/4] overflow-hidden rounded-2xl"
          >
            <Image
              src="/assets/images/craft-detail.jpg"
              alt="Artisan hands working on a shoe last in a sunlit Milanese workshop"
              fill
              className="object-cover animate-ken-burns"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/30 via-transparent to-transparent" />
          </motion.div>

          {/* Text side */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
              className="font-display text-xs tracking-[0.15em] text-rose-gold uppercase"
            >
              The Story
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.1 }}
              className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] text-espresso leading-[1.05]"
            >
              A shoe should feel
              <br />
              <span className="italic text-rose-gold">like coming home</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.25 }}
              className="mt-8 text-ink-muted leading-relaxed max-w-lg"
            >
              Soulmate was born from a simple belief: the right pair of shoes
              doesn&apos;t just fit your foot — it fits your life. Every pair we
              make is designed in Paris and hand-finished by artisans in Milan,
              using leathers sourced from family-run tanneries in Tuscany.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.35 }}
              className="mt-4 text-ink-muted leading-relaxed max-w-lg"
            >
              We believe in fewer, better things. Six silhouettes. Infinite
              stories. Each pair is made to order, because the most sustainable
              shoe is the one you never want to take off.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.5 }}
              className="mt-8"
            >
              <a
                href="/about"
                className="inline-flex items-center gap-2 font-medium text-sm text-espresso hover:text-rose-gold transition-all duration-300 group"
              >
                Read the full story
                <span className="transition-all duration-300 group-hover:translate-x-1 group-hover:text-rose-gold">
                  →
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}