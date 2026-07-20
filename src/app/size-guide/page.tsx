"use client";

import { motion } from "motion/react";

const sizeTable = [
  { eu: "35", uk: "2", us: "5", cm: "22.0" },
  { eu: "36", uk: "3", us: "6", cm: "22.8" },
  { eu: "37", uk: "4", us: "7", cm: "23.5" },
  { eu: "38", uk: "5", us: "8", cm: "24.3" },
  { eu: "39", uk: "6", us: "9", cm: "25.0" },
  { eu: "40", uk: "7", us: "10", cm: "25.8" },
  { eu: "41", uk: "8", us: "11", cm: "26.5" },
  { eu: "42", uk: "9", us: "12", cm: "27.3" },
];

const tips = [
  {
    title: "Measure at home",
    body: "Trace your foot on a piece of paper, then measure the distance from heel to longest toe. Compare against our cm column — that's your starting point.",
  },
  {
    title: "When in doubt, size up",
    body: "Leather stretches and moulds to your foot over time. A shoe that's slightly roomy will become a perfect fit; a shoe that's tight will stay tight.",
  },
  {
    title: "Consider the last",
    body: "Each silhouette uses a different last (the mould your shoe is built around). Heels run truest to size. Flats can be taken half a size down. Boots — always size up for thicker socks.",
  },
  {
    title: "Width matters",
    body: "Our standard width fits most feet, but if you're between widths, our calfskin styles (The Poet, The Lover) are unlined and will adapt to your foot's shape naturally.",
  },
];

export default function SizeGuidePage() {
  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-32">
      {/* Header */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
          className="font-display text-xs tracking-[0.15em] text-rose-gold uppercase"
        >
          The Perfect Fit
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.1 }}
          className="mt-4 font-display text-5xl md:text-7xl lg:text-8xl tracking-[-0.025em] text-espresso leading-[0.95]"
        >
          Size
          <br />
          <span className="italic text-rose-gold">Guide</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.25 }}
          className="mt-6 text-ink-muted max-w-xl text-base md:text-lg leading-relaxed"
        >
          A Soulmate shoe should feel like an extension of your own foot. Here's how to find yours — across every silhouette, last, and leather.
        </motion.p>
      </section>

      {/* Size table */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
        className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 mt-16 md:mt-24"
      >
        <div className="overflow-x-auto rounded-2xl border border-surface">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface">
                <th className="px-6 py-5 font-display text-sm tracking-[0.04em] text-espresso">EU</th>
                <th className="px-6 py-5 font-display text-sm tracking-[0.04em] text-espresso">UK</th>
                <th className="px-6 py-5 font-display text-sm tracking-[0.04em] text-espresso">US</th>
                <th className="px-6 py-5 font-display text-sm tracking-[0.04em] text-espresso">Foot length (cm)</th>
              </tr>
            </thead>
            <tbody>
              {sizeTable.map((row, i) => (
                <tr
                  key={row.eu}
                  className={`border-t border-surface transition-colors duration-200 hover:bg-surface/50 ${
                    i === sizeTable.length - 1 ? "" : ""
                  }`}
                >
                  <td className="px-6 py-4 text-espresso font-medium">{row.eu}</td>
                  <td className="px-6 py-4 text-ink-muted">{row.uk}</td>
                  <td className="px-6 py-4 text-ink-muted">{row.us}</td>
                  <td className="px-6 py-4 text-ink-muted">{row.cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-ink-muted/60">
          All measurements in centimetres. This table applies to every Soulmate silhouette.
        </p>
      </motion.section>

      {/* Tips */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 mt-20 md:mt-32">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
          className="font-display text-3xl md:text-4xl text-espresso leading-[1.05]"
        >
          Getting it right
        </motion.h2>

        <div className="mt-10 grid md:grid-cols-2 gap-x-12 gap-y-10">
          {tips.map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.2, 0, 0, 1], delay: i * 0.1 }}
            >
              <span className="font-display text-4xl text-surface-warm leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl text-espresso">{tip.title}</h3>
              <p className="mt-3 text-ink-muted leading-relaxed">{tip.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Still unsure CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
        className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 mt-20 md:mt-32"
      >
        <div className="rounded-2xl bg-surface-warm/50 border border-surface p-10 md:p-14 text-center">
          <h2 className="font-display text-2xl md:text-3xl text-espresso">Still unsure?</h2>
          <p className="mt-3 text-ink-muted max-w-md mx-auto leading-relaxed">
            Every Soulmate purchase includes free exchanges within 30 days. Not sure which size?
            <br />
            <a
              href="/contact"
              className="inline-block mt-4 text-rose-gold hover:text-rose-gold-dark transition-colors font-medium underline underline-offset-4 decoration-rose-gold/30"
            >
              Get in touch with our fit specialists →
            </a>
          </p>
        </div>
      </motion.section>
    </div>
  );
}
