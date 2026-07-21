"use client";

import { motion } from "motion/react";
import Image from "next/image";

const pillars = [
  {
    title: "Made to Order",
    body: "Nothing leaves the workshop until you order it. No warehouses, no outlet stores, no landfill. A shoe is only made when it has a home to walk to.",
    image: "/assets/images/craft-detail.jpg",
  },
  {
    title: "Tuscan Leather",
    body: "Our leathers come from Conceria Puccini, a third-generation tannery outside Florence. They use a vegetable-tanning process passed down since 1892 — no chromium, no shortcuts, just patience.",
    image: "/assets/images/texture-suede.jpg",
  },
  {
    title: "Fair Wages, Fair Hours",
    body: "The artisans who make your shoes work 35 hours a week with five weeks of holiday. None of them works on commission. Quality dies with quotas.",
    image: "/assets/images/fabric-atmosphere.jpg",
  },
  {
    title: "Repair, Don't Replace",
    body: "Bring your Soulmates back after 500 miles. We'll resole them, re-stitch loose threads, and send them home looking newer than new. The longest-lasting shoe is the one that can be fixed.",
    image: "/assets/images/product-pump.jpg",
  },
];

export function SustainabilityContent() {
  return (
    <div className="pt-24 md:pt-32">
      {/* Hero */}
      <section className="mx-auto px-6 md:px-12 lg:px-16 pb-20 md:pb-32">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
          className="font-display text-xs tracking-[0.15em] text-rose-gold uppercase"
        >
          Our Promise
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.1 }}
          className="mt-4 font-display text-[clamp(1.75rem,6.5vw,3rem)] md:text-7xl lg:text-8xl tracking-[-0.025em] text-espresso leading-[0.95]"
        >
          Slow fashion
          <br />
          <span className="italic text-rose-gold">made real</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.3 }}
          className="mt-8 text-ink-muted text-lg leading-relaxed max-w-xl"
        >
          Luxury doesn't have to cost the earth. Here's exactly how we
          make each pair — and why we think it's the right way.
        </motion.p>
      </section>

      {/* Two-column alternating sections */}
      {pillars.map((pillar, i) => (
        <section
          key={pillar.title}
          className={`py-16 md:py-24 ${
            i % 2 === 0 ? "bg-surface-warm" : "bg-bg"
          }`}
        >
          <div className="max-w-screen-lg mx-auto px-6 md:px-12 lg:px-16">
            <div
              className={`grid md:grid-cols-2 gap-10 md:gap-20 items-center ${
                i % 2 !== 0 ? "md:[direction:rtl]" : ""
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
                className={i % 2 !== 0 ? "md:[direction:ltr]" : ""}
              >
                <span className="font-display text-xs tracking-[0.15em] text-rose-gold uppercase">
                  0{i + 1}
                </span>
                <h2 className="mt-3 font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em]">
                  {pillar.title}
                </h2>
                <p className="mt-4 text-ink-muted leading-relaxed">
                  {pillar.body}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.2, 0, 0, 1], delay: 0.15 }}
                className={`relative aspect-[4/3] overflow-hidden rounded-xl ${
                  i % 2 !== 0 ? "md:[direction:ltr]" : ""
                }`}
              >
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}