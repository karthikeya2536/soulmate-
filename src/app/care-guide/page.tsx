"use client";

import { motion } from "motion/react";

const sections = [
  {
    title: "Daily Care",
    content:
      "Your Soulmate shoes are made from natural materials that gain character with age. After every wear, let them rest in their dust bags for at least 24 hours before wearing again — this lets the leather fibres recover their shape. Insert shoe trees (cedar is best) to absorb moisture and maintain the silhouette.",
    tips: [
      "Use a soft horsehair brush after each wear to remove surface dust and dirt.",
      "For smooth leathers, a weekly buff with a dry cotton cloth restores the natural lustre.",
      "Avoid direct sunlight and radiators — leather dries and cracks when heat is applied directly.",
    ],
  },
  {
    title: "Cleaning",
    content:
      "Different materials need different care. Always test any product on an inconspicuous area first. For smooth calfskin and nappa: wipe with a slightly damp cloth and let air dry. For suede and nubuck: use a brass-bristle suede brush in one direction to lift the nap. For patent leather: wipe with a soft damp cloth — no polish, no wax.",
    tips: [
      "Never submerge leather shoes in water. Damp cloth only.",
      "For salt stains (winter): mix equal parts white vinegar and water, dab gently, let dry naturally.",
      "Avoid saddle soap on delicate calfskin — it strips the natural oils.",
      "Suede protectant spray is recommended before first wear in wet conditions.",
    ],
  },
  {
    title: "Conditioning",
    content:
      "Leather is skin — it needs moisture. Condition your Soulmates every 2–3 months, or whenever the leather feels dry to the touch. Use a high-quality neutral leather balm (we recommend Bickmore Bick 4 or Saphir Renovateur). Apply sparingly with a soft cloth, let absorb for 30 minutes, then buff gently.",
    tips: [
      "Darken your shoes slightly when conditioning. The colour returns to normal as the balm absorbs.",
      "Never condition suede or nubuck — it ruins the texture.",
      "For our vegetable-tanned leathers (The Dreamer, The Icon), use a dedicated veg-tan conditioner.",
    ],
  },
  {
    title: "Storage",
    content:
      "When you&apos;re not wearing your Soulmates, store them in the cotton dust bags they arrived in — never in plastic. Keep them in a cool, dry place with consistent temperature. Avoid attics, basements, and bathroom cupboards where humidity fluctuates. If you live in a humid climate, add a silica gel packet to each dust bag.",
    tips: [
      "Use cedar shoe trees to maintain shape and absorb moisture.",
      "Never store shoes stacked — the weight of one pair deforms the other.",
      "For boots, use boot shapers or rolled magazines to keep the shafts upright.",
    ],
  },
  {
    title: "Repair & Restoration",
    content:
      "We believe a well-made shoe should last decades, not seasons. Soulmate offers a comprehensive repair programme to keep your pairs in rotation. From resoling to re-stitching, heel cap replacement to colour restoration — send us your worn pairs and we&apos;ll bring them back to life.",
    tips: [
      "Resoling costs €95 and takes 14 days. We use the same Italian leather and technique as the original.",
      "Free re-stitching for loose threads or seam separation — lifetime guarantee.",
      "Heel cap replacement (brass): €35 including return shipping.",
      "Fill out the repair request form on our Contact page to start the process.",
    ],
  },
];

const quickReference = [
  { material: "Calfskin / Nappa", care: "Horsehair brush + damp cloth", condition: "Neutral leather balm" },
  { material: "Suede / Nubuck", care: "Brass suede brush only", condition: "Never condition" },
  { material: "Patent leather", care: "Soft damp cloth", condition: "Never condition" },
  { material: "Vegetable-tanned", care: "Soft dry cloth", condition: "Veg-tan conditioner" },
  { material: "Textile / Canvas", care: "Mild soap + water", condition: "Not needed" },
];

export default function CareGuidePage() {
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
          Maintenance
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.1 }}
          className="mt-4 font-display text-[clamp(1.75rem,6.5vw,3rem)] md:text-7xl lg:text-8xl tracking-[-0.025em] text-espresso leading-[0.95]"
        >
          Care
          <br />
          <span className="italic text-rose-gold">Guide</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.25 }}
          className="mt-6 text-ink-muted max-w-xl text-base md:text-lg leading-relaxed"
        >
          Well-made shoes live longer when they&apos;re cared for. Here&apos;s how to keep your Soulmates beautiful for years.
        </motion.p>
      </section>

      {/* Quick reference table */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
        className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 mt-16 md:mt-24"
      >
        <h2 className="font-display text-xs tracking-[0.15em] text-rose-gold uppercase">Quick Reference</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-surface">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface">
                <th className="px-6 py-4 font-display text-sm text-espresso">Material</th>
                <th className="px-6 py-4 font-display text-sm text-espresso">Clean</th>
                <th className="px-6 py-4 font-display text-sm text-espresso">Condition</th>
              </tr>
            </thead>
            <tbody>
              {quickReference.map((row, i) => (
                <tr
                  key={row.material}
                  className="border-t border-surface transition-colors duration-200 hover:bg-surface/50"
                >
                  <td className="px-6 py-4 text-espresso font-medium">{row.material}</td>
                  <td className="px-6 py-4 text-ink-muted">{row.care}</td>
                  <td className="px-6 py-4 text-ink-muted">{row.condition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Detailed sections */}
      {sections.map((section, si) => (
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
          <p className="mt-6 text-ink-muted leading-relaxed max-w-3xl">{section.content}</p>
          <ul className="mt-6 space-y-3 max-w-2xl">
            {section.tips.map((tip) => (
              <li key={tip} className="flex items-start gap-3 text-sm text-ink-muted">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-rose-gold/50" />
                {tip}
              </li>
            ))}
          </ul>
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
          <h2 className="font-display text-2xl md:text-3xl text-espresso">Need a repair?</h2>
          <p className="mt-3 text-ink-muted max-w-md mx-auto leading-relaxed">
            We&apos;ll restore your Soulmates to their former glory.
            <br />
            <a
              href="/contact"
              className="inline-block mt-4 text-rose-gold hover:text-rose-gold-dark transition-colors font-medium underline underline-offset-4 decoration-rose-gold/30"
            >
              Request a repair →
            </a>
          </p>
        </div>
      </motion.section>
    </div>
  );
}
