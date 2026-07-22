"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

export function LenisProvider() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Disable native scroll restoration so Lenis controls scroll position
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

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
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    // Fallback: also set it natively in case Lenis RAF hasn't kicked in yet
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  // Scroll to top when clicking a link that points to the current page
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#" || href === "") return;

      try {
        const linkPath = new URL(anchor.href, window.location.origin).pathname;
        if (linkPath === pathname) {
          const lenis = lenisRef.current;
          if (lenis) {
            lenis.scrollTo(0, { immediate: true });
          }
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }
      } catch {
        // ignore malformed URLs
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return null;
}
