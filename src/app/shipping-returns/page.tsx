"use client";

import { motion } from "motion/react";

const policies = [
  {
    title: "Shipping",
    items: [
      ["Where we ship", "We ship worldwide. Orders within the EU are delivered duty-paid; international orders may incur local customs charges."],
      ["Production time", "Every Soulmate shoe is made to order. Please allow 21 days from order confirmation for your pair to be handcrafted."],
      ["Delivery times", "EU: 3–5 business days via DHL Express. UK: 5–7 business days. Rest of world: 7–12 business days."],
      ["Shipping cost", "Complimentary on all orders within the EU. €25 flat rate for UK, Switzerland, and Norway. €45 for the rest of the world."],
      ["Tracking", "You&apos;ll receive a tracking link the moment your shoes leave our Milan workshop."],
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      ["Return window", "We accept returns and exchanges within 30 days of delivery. Shoes must be unworn, in original packaging, with all inserts."],
      ["How to return", "Email returns@soulmatestudio.com with your order number. We&apos;ll send you a prepaid shipping label within 24 hours."],
      ["Cost", "Free for first-time exchanges. €15 return fee deducted from refunds (covers shipping, inspection, and restocking)."],
      ["Refund timeline", "Refunds are processed within 5 business days of our workshop receiving and inspecting the return."],
      ["Exchanges", "Exchanges ship priority — we reserve your new size before the return arrives. Turnaround is typically 7–10 days."],
    ],
  },
  {
    title: "Repair Programme",
    items: [
      ["Resoling", "Return your Soulmates after 500 miles and we&apos;ll replace the soles for €95. All materials and labour included."],
      ["Re-stitching", "Loose threads, worn stitching, or seam separation — repaired free of charge for the lifetime of the shoe."],
      ["Heel cap replacement", "Solid brass heel caps (The Rebel, The Lover) replaced for €35 including return shipping."],
      ["How it works", "Fill out the repair form on our Care Guide page, ship your shoes to us, and we&apos;ll return them within 14 days."],
    ],
  },
];

export default function ShippingReturnsPage() {
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
          Policies
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.1 }}
          className="mt-4 font-display text-5xl md:text-7xl lg:text-8xl tracking-[-0.025em] text-espresso leading-[0.95]"
        >
          Shipping &{" "}
          <br className="hidden sm:block" />
          <span className="italic text-rose-gold">Returns</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.25 }}
          className="mt-6 text-ink-muted max-w-xl text-base md:text-lg leading-relaxed"
        >
          Everything you need to know about getting your Soulmates to your door — and what happens if they&apos;re not quite right.
        </motion.p>
      </section>

      {/* Policy sections */}
      {policies.map((section, si) => (
        <motion.section
          key={section.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
          className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 mt-16 md:mt-28"
        >
          <span className="font-display text-xs tracking-[0.15em] text-rose-gold uppercase">
            {String(si + 1).padStart(2, "0")}
          </span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl text-espresso leading-[1.05]">
            {section.title}
          </h2>

          <dl className="mt-8 divide-y divide-surface">
            {section.items.map(([term, desc]) => (
              <div key={term} className="grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 py-5">
                <dt className="font-display text-sm tracking-[0.02em] text-espresso">{term}</dt>
                <dd className="text-ink-muted leading-relaxed text-sm md:text-base">{desc}</dd>
              </div>
            ))}
          </dl>
        </motion.section>
      ))}

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
        className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 mt-20 md:mt-28"
      >
        <div className="rounded-2xl bg-surface-warm/50 border border-surface p-10 md:p-14 text-center">
          <h2 className="font-display text-2xl md:text-3xl text-espresso">Have a question?</h2>
          <p className="mt-3 text-ink-muted max-w-md mx-auto leading-relaxed">
            Our customer care team replies within 24 hours.
            <br />
            <a
              href="/contact"
              className="inline-block mt-4 text-rose-gold hover:text-rose-gold-dark transition-colors font-medium underline underline-offset-4 decoration-rose-gold/30"
            >
              Contact us →
            </a>
          </p>
        </div>
      </motion.section>
    </div>
  );
}
