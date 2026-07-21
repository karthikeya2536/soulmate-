"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

// 300 source frames encoded as video for hardware-accelerated scrubbing.
// 3.3 MB MP4 with all-keyframe encoding — instant seeking on every frame.
const POSTER_SRC = "/assets/sequence/frame_001.jpg";
const VIDEO_MP4 = "/assets/sequence/sequence.mp4";
const VIDEO_WEBM = "/assets/sequence/sequence.webm";

export function ScrollSequenceHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const canScrubRef = useRef(false);
  const [isTouch] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches;
  });

  // ── Guard: only scrub once the video has buffered enough ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const markReady = () => {
      canScrubRef.current = true;
    };

    video.addEventListener("canplaythrough", markReady, { once: true });

    // If the video is small enough to already be buffered, mark ready immediately
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      canScrubRef.current = true;
    }

    // Fallback: enable scrub after 8 s even if canplaythrough never fires
    const fallback = setTimeout(() => {
      canScrubRef.current = true;
    }, 8000);

    return () => {
      video.removeEventListener("canplaythrough", markReady);
      clearTimeout(fallback);
    };
  }, []);

  // ── GSAP scroll-triggered video scrub + dolly zoom ──
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    const zoomEl = zoomRef.current;
    if (!video || !section || !zoomEl) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // Shorter scroll distance on touch to reduce fatigue
    const endDist = isTouch ? "+=120%" : "+=280%";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: endDist,
        scrub: 0.6,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
      },
    });

    // ── Video scrub — maps scroll progress (0→1) to video duration ──
    // Guarded by canScrubRef so we never seek into unloaded data.
    tl.to(
      {},
      {
        duration: 1,
        ease: "none",
        onUpdate: () => {
          if (!canScrubRef.current) return;
          video.currentTime = tl.progress() * video.duration;
        },
      },
      0
    );

    // ── Dolly zoom for parallax depth ──
    tl.to(
      zoomEl,
      { scale: isTouch ? 1.08 : 1.15, duration: 1, ease: "none" },
      0
    );

    tlRef.current = tl;
    ScrollTrigger.refresh();

    return () => {
      // ⚠️ Must kill with revert=true before React unmounts, otherwise
      // ScrollTrigger's pin-spacer wrapper breaks removeChild reconciliation.
      if (tlRef.current) {
        const st = tlRef.current.scrollTrigger;
        if (st) {
          st.kill(true); // true = revert pin, restore original DOM position
        }
        tlRef.current.kill();
        tlRef.current = null;
      }
    };
  }, [isTouch]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-blush-light flex flex-col"
    >
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        {/* ── Zoom wrapper — poster image renders instantly ── */}
        <div
          ref={zoomRef}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          {/* Pink fill — becomes visible as the zoom wrapper scales up during scroll,
              recreating the letterbox border effect from the original canvas approach */}
          <div className="absolute inset-0 bg-blush-light" />

          {/* Content area with inset gap that reveals the pink borders on zoom */}
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
                className="absolute inset-0 w-full h-full object-cover"
                poster={POSTER_SRC}
              >
                <source src={VIDEO_MP4} type="video/mp4" />
                <source src={VIDEO_WEBM} type="video/webm" />
              </video>
            </div>
          </div>
        </div>

        {/* ── Gradient vignette overlay — blush-light only, no espresso/white ── */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-blush-light/80 via-transparent to-blush-light/5 pointer-events-none" />

        {/* ── Content ── */}
        <div className="relative z-20 text-center px-6 pointer-events-none">
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
