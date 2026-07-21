"use client";

import { motion } from "motion/react";
import Image from "next/image";

export function AboutContent() {
  return (
    <div className="pt-24 md:pt-32">
      {/* Hero */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 pb-20 md:pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
          className="relative aspect-[21/9] overflow-hidden rounded-2xl"
        >
          <Image
            src="/assets/images/craft-detail.jpg"
            alt="Artisan hands at work in a sunlit Milanese workshop"
            fill
            className="object-cover scale-105 animate-ken-burns"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-espresso/10 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-14">
            <h1 className="font-display text-[clamp(1.75rem,6.5vw,3rem)] md:text-7xl lg:text-8xl tracking-[-0.025em] text-white leading-[0.95]">
              Born in Paris.
              <br />
              <span className="italic text-rose-gold">Made in Milan.</span>
            </h1>
          </div>
        </motion.div>
      </section>

      {/* Story body */}
      <section className="bg-surface-warm py-20 md:py-32">
        <div className="max-w-screen-lg mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
                className="font-display text-xs tracking-[0.15em] text-rose-gold uppercase"
              >
                Chapter One
              </motion.span>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.1 }}
                className="mt-6 text-ink-muted leading-relaxed"
              >
                Soulmate began with a question every woman has asked herself in
                a shoe store: why does nothing feel quite right? Clara Moreau,
                our founder, spent a decade designing for Parisian fashion
                houses before realizing the industry had traded fit for speed.
                She walked away to start something slower.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.2 }}
                className="mt-4 text-ink-muted leading-relaxed"
              >
                The idea was simple: make fewer shoes, make them better, and
                make them for one woman at a time. No runway hype. No seasonal
                clearances. Just the quiet confidence of a shoe that feels
                like it was made for you — because it was.
              </motion.p>
            </div>
            <div>
              <motion.span
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
                className="font-display text-xs tracking-[0.15em] text-rose-gold uppercase"
              >
                The Craft
              </motion.span>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.1 }}
                className="mt-6 text-ink-muted leading-relaxed"
              >
                Every Soulmate shoe is made by a small team of artisans in
                Lombardy who have been making shoes for over forty years. They
                work in a sunlit workshop that smells of leather and beeswax,
                where the radio plays opera on weekday mornings and the pace is
                careful, never hurried.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.2 }}
                className="mt-4 text-ink-muted leading-relaxed"
              >
                A single pair passes through fourteen hands over twenty-one
                days. The leather is cut by eye, stitched by feel, and lasted
                with a patience that no machine can replicate. Your shoes will
                arrive with a handwritten note from the artisan who finished
                them.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Values grid */}
      <section className="bg-bg py-24 md:py-36">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {[
              {
                title: "Design",
                body: "Paris informs every line. We sketch by hand, sample obsessively, and don't release a shoe until all six of us would wear it every day.",
              },
              {
                title: "Materials",
                body: "Leather from a family tannery outside Florence. Solid brass hardware from a foundry in Brescia. Every component is chosen to age beautifully.",
              },
              {
                title: "People",
                body: "No factory floor. No conveyor belt. One artisan sees your shoe through from first cut to final polish. They know when something is off because they've made ten thousand pairs.",
              },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  ease: [0.2, 0, 0, 1],
                  delay: i * 0.12,
                }}
              >
                <div className="w-8 h-[2px] bg-rose-gold mb-6" />
                <h3 className="font-display text-2xl text-espresso tracking-[-0.02em]">
                  {value.title}
                </h3>
                <p className="mt-3 text-ink-muted leading-relaxed">
                  {value.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}