"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

// 300 source frames → sample every 7th = ~43, cap at 40 for low memory
const TOTAL_FRAMES = 40;
const FRAME_STEP = 7;

export function ScrollSequenceHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const currentFrameRef = useRef(0);
  const [ready, setReady] = useState(false);

  // ── Preload all 40 frames in parallel ──
  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const promises: Promise<void>[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const frameNum = 1 + i * FRAME_STEP;
      const idx = i;
      promises.push(
        new Promise<void>((resolve) => {
          const img = new window.Image();
          img.fetchPriority = i < 3 ? "high" : "low";
          img.src = `/assets/sequence/frame_${String(frameNum).padStart(3, "0")}.jpg`;
          img.onload = () => {
            imagesRef.current[idx] = img;
            resolve();
          };
          img.onerror = () => resolve();
        })
      );
    }
    Promise.all(promises).then(() => setReady(true));
  }, []);

  // ── Render a single frame to the canvas ──
  const renderFrame = (frameIndex: number) => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    const img = imagesRef.current[frameIndex];
    if (!ctx || !canvas || !img) return;

    ctx.fillStyle = "#e3d1c8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth = canvas.width, drawHeight = canvas.height, drawX = 0, drawY = 0;

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.width / imgRatio;
      drawY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      drawX = (canvas.width - drawWidth) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  };

  // ── GSAP scroll-triggered scrub + zoom ──
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const zoomEl = zoomRef.current;
    if (!canvas || !section || !zoomEl) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false; // nearest-neighbour for 1280×720 source → crisp + fast
    ctxRef.current = ctx;

    // DPR = 1.0 — no retina oversampling, smooth on every device
    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // RAF-throttled frame renderer
    const throttledRender = (frameIndex: number) => {
      if (currentFrameRef.current === frameIndex) return;
      currentFrameRef.current = frameIndex;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => renderFrame(frameIndex));
    };

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Draw frame 0 once images are ready
    const boot = () => {
      if (imagesRef.current[0]) { renderFrame(0); return; }
      requestAnimationFrame(boot);
    };
    boot();

    if (!prefersReduced) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=280%",
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      // ── Frame scrub ──
      tl.to(
        {},
        {
          duration: 1,
          ease: "none",
          onUpdate: () => {
            const progress = tl.progress();
            const fi = Math.min(Math.floor(progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
            throttledRender(fi);
          },
        },
        0
      );

      // ── Dolly zoom: canvas slowly scales up as you scroll ──
      tl.to(
        zoomEl,
        { scale: 1.18, duration: 1, ease: "none" },
        0
      );
    }

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#e3d1c8] flex flex-col"
    >
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        {/* ── Zoom wrapper (GSAP scales this) ── */}
        <div
          ref={zoomRef}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* ── Loading spinner ── */}
        {!ready && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#e3d1c8]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-6 h-6 border-2 border-rose-gold/40 border-t-rose-gold rounded-full animate-spin" />
            </div>
          </div>
        )}

        {/* ── Gradient vignette overlay ── */}
        {/* Removed overlay */}

        {/* ── Content overlay ── */}
        <div className="relative z-20 text-center px-6 pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.2, 0, 0, 1], delay: 0.4 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.03em] text-espresso leading-[0.92]"
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
              className="inline-flex items-center gap-2 px-8 py-3 bg-espresso text-white font-medium text-sm rounded-full hover:bg-espresso/90 transition-all duration-500 group"
            >
              Explore the Collection
              <span className="transition-all duration-300 group-hover:translate-x-1 inline-block">
                →
              </span>
            </a>
          </motion.div>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-auto"
        >
          <div className="flex flex-col items-center gap-2 text-espresso/40">
            <span className="text-[10px] tracking-[0.15em] uppercase font-light">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-6 bg-gradient-to-b from-espresso/40 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
