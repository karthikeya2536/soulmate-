"use client";

import { motion } from "motion/react";

const sections = [
  {
    title: "Information We Collect",
    content:
      "We collect only the information necessary to process your order and provide you with the best possible experience. This includes your name, email address, shipping address, payment information (processed securely by our payment partner, never stored by us), and — if you choose to provide it — your shoe size and style preferences so we can recommend the perfect fit.",
  },
  {
    title: "How We Use Your Information",
    content:
      "Your data is used exclusively to fulfil orders, communicate about your purchase, send you updates you've opted into (we never buy or sell mailing lists), and improve our products and services. We do not sell, rent, or trade your personal information to third parties. Period.",
  },
  {
    title: "Cookies",
    content:
      "We use a minimal set of cookies: essential session cookies required for the shopping cart to function, and — only with your consent — a single analytics cookie to understand which of our silhouettes are most loved. We do not use retargeting pixels, advertising cookies, or third-party trackers. You can manage cookie preferences at any time through your browser settings.",
  },
  {
    title: "Data Sharing",
    content:
      "We share your information only with the service providers essential to fulfilling your order: our payment processor (Stripe), our shipping carrier (DHL Express), and our email provider (for order confirmations and support responses). Each provider is contractually bound to use your data solely for the purpose we specify and to delete it when it's no longer needed.",
  },
  {
    title: "Data Retention",
    content:
      "We retain your order data for as long as necessary to fulfil our legal obligations (tax records, warranty claims) — typically seven years. Marketing preferences and browsing data are retained until you withdraw consent. You can request deletion of your data at any time by emailing privacy@soulmatestudio.com, and we will comply within 30 days.",
  },
  {
    title: "Your Rights",
    content:
      "Under GDPR and applicable privacy laws, you have the right to access, correct, or delete your personal data; to restrict or object to processing; to data portability; and to withdraw consent at any time without affecting the lawfulness of processing before withdrawal. To exercise any of these rights, email privacy@soulmatestudio.com. We will respond within 30 days.",
  },
  {
    title: "Security",
    content:
      "All data transmitted through our site is encrypted using TLS 1.3. Payment information is tokenised by Stripe — we never see or store your full card details. Our systems are audited annually for compliance with PCI DSS standards. If a data breach occurs that affects your personal information, we will notify you within 72 hours.",
  },
  {
    title: "Updates",
    content:
      "This policy was last updated on 1 January 2026. We may update it periodically to reflect changes in our practices or legal requirements. Material changes will be notified by email and via a notice on our website. Continued use of the site after changes constitutes acceptance of the updated policy.",
  },
];

export default function PrivacyPage() {
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
          Privacy
          <br />
          <span className="italic text-rose-gold">Policy</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.25 }}
          className="mt-6 text-ink-muted max-w-xl text-base md:text-lg leading-relaxed"
        >
          We believe privacy is a matter of trust — and we take it seriously. Here&apos;s exactly what data we collect, why, and how we protect it.
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
        <div className="rounded-2xl bg-surface-warm/50 border border-surface p-10 md:p-14">
          <h2 className="font-display text-2xl md:text-3xl text-espresso">Questions about your data?</h2>
          <p className="mt-3 text-ink-muted max-w-lg leading-relaxed">
            Email our Data Protection Officer at{" "}
            <a href="mailto:privacy@soulmatestudio.com" className="text-rose-gold hover:text-rose-gold-dark transition-colors underline underline-offset-4 decoration-rose-gold/30">
              privacy@soulmatestudio.com
            </a>
            . We respond to all privacy requests within 30 days.
          </p>
        </div>
      </motion.section>
    </div>
  );
}
