"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
let gsapPromise: Promise<any> | null = null;

function ensureGsap() {
  if (!gsapPromise) {
    gsapPromise = (async () => {
      try {
        const gsapMod = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsapMod.default.registerPlugin(ScrollTrigger);
        ScrollTrigger.normalizeScroll(true);
        return { gsap: gsapMod.default, ScrollTrigger };
      } catch {
        return null;
      }
    })();
  }
  return gsapPromise;
}

const POSTER_SRC = "/assets/sequence/frame_001.jpg";
const VIDEO_MP4 = "/assets/sequence/sequence.mp4";
const VIDEO_WEBM = "/assets/sequence/sequence.webm";

export function ScrollSequenceHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const videoLoadedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [isTouch] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches;
  });

  // ── Preload entire video into memory via blob URL ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    let blobUrl: string | null = null;

    const loadVideo = async () => {
      try {
        const response = await fetch(VIDEO_MP4, { priority: "high" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const blob = await response.blob();
        if (cancelled) return;
        blobUrl = URL.createObjectURL(blob);
        video.src = blobUrl;
        video.load();
        video.onloadedmetadata = () => {
          if (cancelled) return;
          if (tlRef.current) {
            video.currentTime = tlRef.current.progress() * video.duration;
          }
          videoLoadedRef.current = true;
          setIsReady(true);
        };
        if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
          videoLoadedRef.current = true;
          setIsReady(true);
        }
      } catch (err) {
        if (cancelled) return;
        console.warn("Blob preload failed — falling back to CDN streaming", err);
        video.src = VIDEO_MP4;
        video.oncanplaythrough = () => {
          if (!cancelled) {
            if (tlRef.current) {
              video.currentTime = tlRef.current.progress() * video.duration;
            }
            videoLoadedRef.current = true;
            setIsReady(true);
          }
        };
        if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
          videoLoadedRef.current = true;
          setIsReady(true);
        }
      }
    };

    loadVideo();

    const fallback = setTimeout(() => {
      if (!cancelled && !videoLoadedRef.current) {
        videoLoadedRef.current = true;
        setIsReady(true);
      }
    }, 20000);

    return () => {
      cancelled = true;
      clearTimeout(fallback);
      video.onloadedmetadata = null;
      video.oncanplaythrough = null;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, []);

  // ── GSAP scroll-triggered video scrub + dolly zoom ──
  // ⚠️  Uses CSS position: sticky for the pin effect instead of GSAP's
  //     pin. CSS sticky is DOM-native — it never creates a pin-spacer
  //     wrapper — which eliminates the removeChild error on navigation.
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    const zoomEl = zoomRef.current;
    if (!video || !section || !zoomEl) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let cancelled = false;

    const initGsap = async () => {
      const loaded = await ensureGsap();
      if (!loaded || cancelled) return;
      const { gsap, ScrollTrigger } = loaded;

      const endDist = isTouch ? "+=120%" : "+=280%";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: endDist,
          scrub: 0.6,
          pin: false,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        {},
        {
          duration: 1,
          ease: "none",
          onUpdate: () => {
            if (!videoLoadedRef.current) return;
            video.currentTime = tl.progress() * video.duration;
          },
        },
        0
      );

      tl.to(
        zoomEl,
        { scale: isTouch ? 1.08 : 1.15, duration: 1, ease: "none" },
        0
      );

      tlRef.current = tl;
      ScrollTrigger.refresh();
    };

    initGsap();

    return () => {
      cancelled = true;
      if (tlRef.current) {
        const st = tlRef.current.scrollTrigger;
        if (st) st.kill();
        tlRef.current.kill();
        tlRef.current = null;
      }
    };
  }, [isTouch]);

  // Scroll distance: the outer section is this tall, while the inner
  // sticky div stays fixed at the top. This replaces GSAP's pin-spacer
  // — no DOM manipulation, no removeChild crash on navigation.
  const scrollDist = isTouch ? "120vh" : "280vh";

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-blush-light"
      style={{ height: scrollDist }}
    >
      {!isReady && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <div className="flex items-center gap-2 px-4 py-2 bg-espresso/5 backdrop-blur-sm rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-gold/50 animate-pulse" />
            <span className="text-[10px] text-ink-muted/40 tracking-[0.15em] uppercase">
              Loading
            </span>
          </div>
        </div>
      )}

      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ── Zoom wrapper — poster image renders instantly ── */}
        <div
          ref={zoomRef}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <div className="absolute inset-0 bg-blush-light" />

          <div className="absolute inset-[3%] md:inset-[5%] overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${POSTER_SRC})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <video
                ref={videoRef}
                playsInline
                muted
                loop={false}
                preload="auto"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  isReady ? "opacity-100" : "opacity-0"
                }`}
                poster={POSTER_SRC}
              />
            </div>
          </div>
        </div>

        {/* ── Gradient vignette overlay ── */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-blush-light/80 via-transparent to-blush-light/5 pointer-events-none" />

        {/* ── Content ── */}
        <div className="relative z-20 text-center px-6 pointer-events-none flex flex-col items-center justify-center h-full">
          <motion.h1
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.2, 0, 0, 1], delay: 0.4 }}
            className="font-display text-[clamp(2rem,8vw,3rem)] sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.03em] text-espresso leading-[0.92]"
          >
            Find Your
            <br />
            <span className="italic bg-gradient-to-r from-rose-gold to-gold bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(196,144,100,0.3)]">
              Soulmate
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0, 0, 1], delay: 0.7 }}
            className="mt-6 text-base md:text-lg text-espresso/70 max-w-md mx-auto font-light leading-relaxed"
          >
            Footwear that feels like it was made just for you.
            <br />
            Designed in Paris. Crafted in Milan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 1 }}
            className="mt-8 pointer-events-auto"
          >
            <a
              href="/shop"
              className="inline-flex items-center gap-2 px-8 min-h-[44px] bg-espresso text-white font-medium text-sm rounded-full hover:bg-espresso/90 transition-all duration-500 group"
            >
              Explore the Collection
              <span className="transition-all duration-300 group-hover:translate-x-1 inline-block">
                →
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
