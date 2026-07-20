"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { AmbientScene } from "./AmbientScene";

export function TextReveal() {
  return (
    <section className="relative bg-bg py-24 md:py-36 overflow-hidden">
      <AmbientScene />
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image first on mobile, right on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:order-2"
          >
            <Image
              src="/assets/images/fabric-atmosphere.jpg"
              alt="Sunlight falling across hand-stitched leather in a quiet Milanese atelier"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Text */}
          <div className="lg:order-1">
            <motion.span
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
              className="font-display text-xs tracking-[0.15em] text-rose-gold uppercase"
            >
              The Philosophy
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.1 }}
              className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] text-espresso leading-[1.05]"
            >
              The most sustainable shoe
              <br />
              <span className="italic text-rose-gold">
                is the one you keep
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.25 }}
              className="mt-8 text-ink-muted leading-relaxed max-w-lg"
            >
              We don&apos;t chase seasons. Every Soulmate shoe is made to order
              in small batches by Milanese artisans who&apos;ve spent decades
              learning their craft. The leather comes from a single family
              tannery outside Florence — they know the name of every cow.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.35 }}
              className="mt-4 text-ink-muted leading-relaxed max-w-lg"
            >
              Your pair takes three weeks from order to doorstep. No
              warehouses. No overproduction. No landfill. Just a shoe made for
              you, by hands that care.
            </motion.p>

            {/* Craft markers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.5 }}
              className="mt-10 grid grid-cols-3 gap-6"
            >
              {[
                { value: "21", label: "Days to craft" },
                { value: "142", label: "Hands involved" },
                { value: "6", label: "Silhouettes" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-ink-muted/70 uppercase tracking-[0.08em]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}