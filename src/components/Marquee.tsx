"use client";

import { motion } from "motion/react";

export function Marquee() {
  const words = [
    "Paris Design",
    "Milanese Craft",
    "Tuscan Leather",
    "Made to Order",
    "Fewer, Better",
    "Soulmate",
  ];

  return (
    <section className="bg-espresso py-10 md:py-14 overflow-hidden">
      <div className="flex gap-8 md:gap-12 whitespace-nowrap">
        {[0, 1].map((dup) => (
          <motion.div
            key={dup}
            initial={{ x: dup === 0 ? 0 : "0%" }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex gap-8 md:gap-12 shrink-0"
          >
            {words.map((word, i) => (
              <span
                key={`${dup}-${i}`}
                className="font-display text-3xl md:text-5xl lg:text-6xl tracking-[-0.02em] text-white/20 italic"
              >
                {word}
              </span>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}