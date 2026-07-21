"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-espresso/20 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-bg shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-surface">
              <h2 className="font-display text-lg text-espresso tracking-[-0.02em]">
                Cart
                {totalItems > 0 && (
                  <span className="text-sm font-body text-ink-muted ml-1.5 font-normal">
                    ({totalItems})
                  </span>
                )}
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-ink-muted hover:text-espresso transition-colors"
                aria-label="Close cart"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M15 5L5 15M5 5l10 10" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                  <div className="w-16 h-16 rounded-full bg-rose-gold/10 flex items-center justify-center mb-4">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-rose-gold"
                    >
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </div>
                  <p className="text-ink-muted text-sm font-medium">
                    Your cart is empty
                  </p>
                  <p className="text-ink-muted/50 text-xs mt-1">
                    Add some soulmates to get started
                  </p>
                </div>
              ) : (
                <ul className="px-6 py-4 space-y-4">
                  {items.map((item, index) => (
                    <motion.li
                      key={`${item.id}-${item.color}-${item.size}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4 py-4 border-b border-surface/50 last:border-0"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-surface flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-espresso truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-ink-muted/60 mt-0.5">
                          {item.color} / EU {item.size}
                        </p>
                        <p className="text-sm font-medium text-espresso mt-1">
                          &euro;{item.price}
                        </p>

                        {/* Quantity + Remove */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(index, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className="w-7 h-7 flex items-center justify-center rounded-full bg-surface text-ink-muted hover:text-espresso hover:bg-espresso/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed text-sm"
                            >
                              −
                            </button>
                            <span className="text-sm font-medium text-espresso w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(index, item.quantity + 1)
                              }
                              className="w-7 h-7 flex items-center justify-center rounded-full bg-surface text-ink-muted hover:text-espresso hover:bg-espresso/5 transition-all text-sm"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(index)}
                            className="text-xs text-ink-muted/40 hover:text-red-500 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-surface px-6 py-5 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-muted">Subtotal</span>
                  <span className="font-medium text-espresso">
                    &euro;{totalPrice.toLocaleString()}
                  </span>
                </div>
                <p className="text-[11px] text-ink-muted/40 tracking-[0.04em]">
                  Shipping & taxes calculated at checkout
                </p>

                {/* Checkout button */}
                <button
                  onClick={() => {
                    // Placeholder — would integrate Stripe/PayPal
                    alert("Checkout coming soon!");
                  }}
                  className="w-full py-3.5 bg-espresso text-white text-sm font-medium rounded-full hover:bg-rose-gold-dark transition-all duration-300"
                >
                  Checkout
                </button>

                {/* Continue shopping */}
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-xs text-ink-muted/50 hover:text-espresso transition-colors text-center"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
