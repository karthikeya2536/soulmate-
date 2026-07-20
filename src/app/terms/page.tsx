"use client";

import { motion } from "motion/react";

const sections = [
  {
    title: "General",
    content:
      "These Terms of Service govern your use of the Soulmate website and your purchase of Soulmate products. By accessing the site or placing an order, you agree to these terms. If you do not agree, please do not use the site. Soulmate Studio SAS (hereafter 'Soulmate') reserves the right to update these terms at any time; material changes will be notified by email.",
  },
  {
    title: "Orders & Payment",
    content:
      "When you place an order, you enter into a binding agreement to purchase the products at the price listed at the time of checkout. Payment is collected at the time of order. We accept all major credit cards, PayPal, and Apple Pay. All prices are listed in Euros (€) and include applicable VAT for EU customers; non-EU customers may be subject to local customs duties.",
  },
  {
    title: "Made to Order",
    content:
      "All Soulmate products are made to order. Production begins once your payment is confirmed and typically takes 21 days. Because each pair is crafted specifically for you, modifications to an order can only be made within 48 hours of placement (see our FAQ for details). Made-to-order status does not affect your right to return unworn shoes within 30 days.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content on this website — including text, images, design, logos, and product silhouettes — is the intellectual property of Soulmate Studio SAS. You may not reproduce, distribute, or create derivative works without our express written permission. The Soulmate name, logo, and product names are registered trademarks.",
  },
  {
    title: "Limitation of Liability",
    content:
      "Soulmate shall not be liable for indirect, incidental, or consequential damages arising from the use of our products or website, including but not limited to discomfort from improper sizing (see our Size Guide for fit advice), allergic reactions to materials (see our materials list for known allergens), or delays caused by customs or shipping carriers beyond our reasonable control. Our total liability is limited to the purchase price of the products in question.",
  },
  {
    title: "Warranty",
    content:
      "Every Soulmate shoe is covered by a two-year warranty against manufacturing defects. This includes separation of soles, failure of stitching, and defects in materials. It does not cover normal wear and tear, damage from improper care (see our Care Guide), or damage from exposure to water, chemicals, or excessive force. We stand behind our craft — if something is wrong, we will repair or replace it.",
  },
  {
    title: "Cancellation & Returns",
    content:
      "You have the right to cancel your order within 14 days of receiving your shoes, for any reason. Shoes must be unworn, in their original packaging, with all dust bags and inserts intact. To initiate a return, email returns@soulmatestudio.com with your order number. Refunds are processed within 5 business days of inspection. See our Shipping & Returns page for full details.",
  },
  {
    title: "Governing Law",
    content:
      "These terms are governed by the laws of France. Any disputes arising from these terms or your use of the site shall be resolved in the courts of Paris. If any provision of these terms is found to be unenforceable, the remaining provisions shall remain in full force and effect.",
  },
];

export default function TermsPage() {
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
          Legal
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.1 }}
          className="mt-4 font-display text-5xl md:text-7xl lg:text-8xl tracking-[-0.025em] text-espresso leading-[0.95]"
        >
          Terms of
          <br />
          <span className="italic text-rose-gold">Service</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.25 }}
          className="mt-6 text-ink-muted max-w-xl text-base md:text-lg leading-relaxed"
        >
          Last updated: 1 January 2026. Please read these terms carefully before placing an order.
        </motion.p>
      </section>

      {/* Sections */}
      {sections.map((section, si) => (
        <motion.section
          key={section.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
          className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 mt-14 md:mt-20"
        >
          <h2 className="font-display text-xl md:text-2xl text-espresso">{section.title}</h2>
          <p className="mt-4 text-ink-muted leading-relaxed max-w-3xl">{section.content}</p>
        </motion.section>
      ))}

      {/* Contact */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
        className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 mt-20 md:mt-28"
      >
        <div className="rounded-2xl bg-surface-warm/50 border border-surface p-10 md:p-14 text-center">
          <h2 className="font-display text-2xl md:text-3xl text-espresso">Questions about these terms?</h2>
          <p className="mt-3 text-ink-muted max-w-md mx-auto leading-relaxed">
            Contact our legal team at{" "}
            <a href="mailto:legal@soulmatestudio.com" className="text-rose-gold hover:text-rose-gold-dark transition-colors underline underline-offset-4 decoration-rose-gold/30">
              legal@soulmatestudio.com
            </a>
          </p>
        </div>
      </motion.section>
    </div>
  );
}
