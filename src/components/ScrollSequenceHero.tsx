"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

// 300 source frames → sample every 19th = ~16 frames for fast Vercel loads
const TOTAL_FRAMES = 16;
const FRAME_STEP = 19;

const FIRST_FRAME_SRC = `/assets/sequence/frame_001.jpg`;

export function ScrollSequenceHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedRef = useRef(false);
  const framesLoadedRef = useRef<boolean[]>([]);
  const rafRef = useRef<number>(0);
  const currentFrameRef = useRef(0);
  const [ready, setReady] = useState(false);

  // ── Progressively load frames — render each as it arrives ──
  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    framesLoadedRef.current = new Array(TOTAL_FRAMES).fill(false);

    let loadedCount = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const frameNum = 1 + i * FRAME_STEP;
      const idx = i;
      const img = new window.Image();
      img.fetchPriority = i === 0 ? "high" : "low";
      img.src = `/assets/sequence/frame_${String(frameNum).padStart(3, "0")}.jpg`;
      img.onload = () => {
        imagesRef.current[idx] = img;
        framesLoadedRef.current[idx] = true;
        loadedCount++;
        // Render this frame immediately if canvas is ready
        if (ctxRef.current && idx === currentFrameRef.current) {
          renderFrame(idx);
        }
        if (loadedCount === TOTAL_FRAMES) setReady(true);
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) setReady(true);
      };
    }
  }, []);

  // ── Render a single frame to the canvas ──
  const renderFrame = (frameIndex: number) => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    const img = imagesRef.current[frameIndex];
    if (!ctx || !canvas || !img) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

    const ctx = canvas.getContext("2d", { alpha: false, willReadFrequently: false });
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
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
    let resizeTimer: number;
    const handleResize = () => {
      cancelAnimationFrame(resizeTimer);
      resizeTimer = requestAnimationFrame(setCanvasSize);
    };
    window.addEventListener("resize", handleResize);

    // RAF-throttled frame renderer
    const throttledRender = (frameIndex: number) => {
      if (currentFrameRef.current === frameIndex) return;
      currentFrameRef.current = frameIndex;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => renderFrame(frameIndex));
    };

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

      // ── Dolly zoom ──
      tl.to(
        zoomEl,
        { scale: 1.15, duration: 1, ease: "none" },
        0
      );
    }

    return () => {
      window.removeEventListener("resize", handleResize);
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
        {/* ── Zoom wrapper ── */}
        <div
          ref={zoomRef}
          className="absolute inset-0 w-full h-full will-change-transform"
          // Show first frame as CSS background for instant paint
          style={{ backgroundImage: `url(${FIRST_FRAME_SRC})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* ── Gradient vignette overlay ── */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#e3d1c8]/80 via-transparent to-transparent pointer-events-none" />

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
              <span className="transition-all duration-300 group-hover:translate-x-1 inline-block">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
