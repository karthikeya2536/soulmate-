"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

export function LenisProvider() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(1 - t, 3)),
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // ── Sync Lenis → GSAP ScrollTrigger (client only) ──
    // Dynamic import avoids SSR crash — GSAP needs the DOM.
    const syncGsap = async () => {
      try {
        const gsapMod = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsapMod.default.registerPlugin(ScrollTrigger);
        lenis.on("scroll", () => ScrollTrigger.update());
      } catch {
        // GSAP not available (e.g. build-time) — Lenis still works
      }
    };
    syncGsap();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
