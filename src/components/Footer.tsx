import Link from "next/link";

const footerLinks = {
  Shop: [
    { href: "/shop", label: "All Shoes" },
    { href: "/shop?category=heels", label: "Heels" },
    { href: "/shop?category=flats", label: "Flats" },
    { href: "/shop?category=boots", label: "Boots" },
    { href: "/shop?category=sandals", label: "Sandals" },
  ],
  About: [
    { href: "/about", label: "Our Story" },
    { href: "/sustainability", label: "Craft & Ethics" },
    { href: "/lookbook", label: "Lookbook" },
    { href: "/contact", label: "Contact" },
  ],
  Support: [
    { href: "/size-guide", label: "Size Guide" },
    { href: "/shipping-returns", label: "Shipping & Returns" },
    { href: "/care-guide", label: "Care Guide" },
    { href: "/faq", label: "FAQ" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-espresso text-white">
      {/* Top wave */}
      <div className="relative h-16 md:h-24 overflow-hidden bg-bg">
        <svg
          viewBox="0 0 1440 100"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 100 C 240 0, 480 0, 720 50 C 960 100, 1200 100, 1440 50 L 1440 100 Z"
            fill="oklch(0.22 0.025 60)"
          />
        </svg>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-display text-2xl tracking-[-0.02em] text-white hover:text-rose-gold transition-colors duration-300"
            >
              Soulmate
            </Link>
            <p className="mt-4 text-sm text-ink-muted/70 leading-relaxed max-w-xs">
              Footwear for the woman who walks her own path. Designed in
              Paris, crafted in Milan since 2024.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-display text-sm tracking-[0.04em] text-rose-gold mb-4">
                {title}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Soulmate. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Terms
            </Link>
            <span className="text-xs text-white/40 hover:text-white/60 transition-colors cursor-pointer">
              Instagram
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}