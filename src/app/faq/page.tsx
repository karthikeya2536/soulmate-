"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    q: "How long does it take to make my shoes?",
    a: "Every Soulmate pair is made to order. From the moment you place your order, a single artisan in our Milan workshop begins cutting, stitching, and lasting your shoes by hand. The process takes 21 days. You'll receive a progress update at the 10-day mark and a tracking link the moment your shoes ship.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "You can modify or cancel your order within 48 hours of placing it — after that, your artisan has already started cutting the leather. Email order@soulmatestudio.com with your order number and we'll take care of it. Cancellations after 48 hours are treated as a return.",
  },
  {
    q: "What if my shoes don't fit?",
    a: "We offer free exchanges on first-time orders. If your size isn't right, email returns@soulmatestudio.com within 30 days of delivery and we'll send a prepaid return label. Your new size ships priority — we reserve it before the return arrives. See our full Size Guide for measuring tips.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes — we ship to every country. EU orders are delivered duty-paid with no surprise charges. International orders may incur local customs fees (typically 5–12% of the order value), which are the responsibility of the buyer. Shipping costs vary by region — see our Shipping & Returns page for details.",
  },
  {
    q: "How sustainable are Soulmate shoes?",
    a: "Sustainability isn't a marketing angle for us — it's a consequence of how we make things. Every pair is made to order (zero overproduction), from a single family tannery that uses vegetable-tanning (no chromium), by artisans working fair hours with fair wages. We offer a lifetime repair programme and use biodegradable packaging. We're not perfect, but we're honest about exactly what we do.",
  },
  {
    q: "What leathers do you use?",
    a: "Our primary leather comes from Conceria Puccini, a third-generation tannery in Tuscany. They vegetable-tan using a process passed down since 1892. Our calfskin is sourced from Northern Italy, our suede from France, and our patent leather from Germany. Every hide is a byproduct of the food industry — no animals are raised for their skins.",
  },
  {
    q: "Can I visit your studio?",
    a: "Our design studio in Paris and our workshop in Milan both welcome visitors by appointment. You can try on any silhouette, feel the leathers, and see the craft up close. Book an appointment through our Contact page — we recommend scheduling at least two weeks in advance.",
  },
  {
    q: "How do I care for my Soulmates?",
    a: "Brush them after each wear, let them rest 24 hours between wears, and condition every 2–3 months with a neutral leather balm. Store them in the cotton dust bags they arrived in. For full details, including material-specific advice, see our Care Guide — we've put together everything you need.",
  },
  {
    q: "What is the repair programme?",
    a: "We resole, re-stitch, and restore Soulmate shoes for life. Resoling costs €95, heel cap replacement is €35, and re-stitching loose threads is always free. The typical turnaround is 14 days from when we receive your shoes. Fill out the repair request on our Contact page to start the process.",
  },
  {
    q: "Can I return sale or custom items?",
    a: "Sale items can be returned within 14 days of delivery (standard return policy applies). Custom orders — including bespoke sizing, non-standard colourways, and monogrammed shoes — are final sale and cannot be returned or exchanged.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

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
          Questions
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.1 }}
          className="mt-4 font-display text-[clamp(1.75rem,6.5vw,3rem)] md:text-7xl lg:text-8xl tracking-[-0.025em] text-espresso leading-[0.95]"
        >
          Frequently
          <br />
          <span className="italic text-rose-gold">Asked Questions</span>
        </motion.h1>
      </section>

      {/* FAQ accordion */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 mt-16 md:mt-24">
        <dl className="max-w-3xl divide-y divide-surface">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.2, 0, 0, 1], delay: i * 0.03 }}
            >
              <dt>
                <button
                  onClick={() => toggle(i)}
                  className="flex items-start justify-between w-full text-left py-5 gap-4 group"
                  aria-expanded={openIndex === i}
                >
                  <span className="font-display text-base md:text-lg text-espresso group-hover:text-rose-gold transition-colors duration-200">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
                    className="mt-1 shrink-0 w-5 h-5 flex items-center justify-center text-ink-muted"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                      <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </motion.span>
                </button>
              </dt>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.dd
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-ink-muted leading-relaxed text-sm md:text-base -mt-2">
                      {faq.a}
                    </p>
                  </motion.dd>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </dl>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
        className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 mt-20 md:mt-28"
      >
        <div className="rounded-2xl bg-surface-warm/50 border border-surface p-10 md:p-14 text-center">
          <h2 className="font-display text-2xl md:text-3xl text-espresso">Still have questions?</h2>
          <p className="mt-3 text-ink-muted max-w-md mx-auto leading-relaxed">
            We&apos;re here to help.
            <br />
            <a
              href="/contact"
              className="inline-block mt-4 text-rose-gold hover:text-rose-gold-dark transition-colors font-medium underline underline-offset-4 decoration-rose-gold/30"
            >
              Get in touch →
            </a>
          </p>
        </div>
      </motion.section>
    </div>
  );
}
