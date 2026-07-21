"use client";

import { motion } from "motion/react";
import { useState } from "react";

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24 md:pt-32 pb-24 md:pb-36">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: form */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
              className="font-display text-xs tracking-[0.15em] text-rose-gold uppercase"
            >
              Get in Touch
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.1 }}
              className="mt-4 font-display text-5xl md:text-6xl lg:text-7xl tracking-[-0.025em] text-espresso leading-[0.95]"
            >
              Let's
              <br />
              <span className="italic text-rose-gold">talk</span>
            </motion.h1>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 bg-surface-warm rounded-2xl p-10 text-center"
              >
                <p className="font-display text-3xl text-espresso tracking-[-0.02em]">
                  Thank you.
                </p>
                <p className="mt-3 text-ink-muted leading-relaxed">
                  We'll get back to you within 24 hours. In the meanwhile,
                  walk beautifully.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.3 }}
                onSubmit={handleSubmit}
                className="mt-10 space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-espresso mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-transparent focus:border-rose-gold/30 focus:bg-bg transition-all duration-300 outline-none text-espresso placeholder:text-ink-muted/40 text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-espresso mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-transparent focus:border-rose-gold/30 focus:bg-bg transition-all duration-300 outline-none text-espresso placeholder:text-ink-muted/40 text-sm"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-espresso mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-transparent focus:border-rose-gold/30 focus:bg-bg transition-all duration-300 outline-none text-espresso placeholder:text-ink-muted/40 text-sm"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-espresso mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-transparent focus:border-rose-gold/30 focus:bg-bg transition-all duration-300 outline-none text-espresso placeholder:text-ink-muted/40 text-sm resize-none"
                    placeholder="Tell us everything..."
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 min-h-[44px] bg-espresso text-white font-medium text-sm rounded-full hover:bg-rose-gold-dark transition-all duration-300 group"
                >
                  Send Message
                  <span className="transition-all duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </motion.form>
            )}
          </div>

          {/* Right: details */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.5 }}
              className="lg:pt-32"
            >
              <div className="space-y-12">
                <div>
                  <h3 className="font-display text-xs tracking-[0.15em] text-rose-gold uppercase mb-4">
                    Visit Us
                  </h3>
                  <address className="not-italic text-espresso leading-relaxed">
                    14 Rue des Saints-Pères
                    <br />
                    75007 Paris, France
                  </address>
                  <p className="mt-3 text-sm text-ink-muted">
                    By appointment only.
                    <br />
                    Tues–Sat, 10am–6pm
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-xs tracking-[0.15em] text-rose-gold uppercase mb-4">
                    Write Us
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    hello@soulmatestudio.com
                    <br />
                    press@soulmatestudio.com
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-xs tracking-[0.15em] text-rose-gold uppercase mb-4">
                    Follow
                  </h3>
                  <div className="flex gap-6">
                    {["Instagram", "Pinterest", "LinkedIn"].map((social) => (
                      <span
                        key={social}
                        className="text-sm text-ink-muted hover:text-rose-gold transition-colors duration-200 cursor-pointer"
                      >
                        {social}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}