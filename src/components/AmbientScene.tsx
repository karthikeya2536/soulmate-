"use client";

import { useEffect, useState, lazy, Suspense } from "react";

// ── WebGL capability check ───────────────────────────────────────────────────
// Returns true only if a hardware-accelerated WebGL context can be created.
// Uses failIfMajorPerformanceCaveat to reject the Microsoft Basic Render Driver.
function hasHardwareWebGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const cvs = document.createElement("canvas");
    const gl =
      cvs.getContext("webgl", { failIfMajorPerformanceCaveat: true }) ||
      (cvs.getContext("experimental-webgl", {
        failIfMajorPerformanceCaveat: true,
      }) as WebGLRenderingContext | null);
    if (gl) {
      const ext = gl.getExtension("WEBGL_lose_context");
      ext?.loseContext();
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

// ── CSS-only decorative fallback ─────────────────────────────────────────────
function CSSFallback() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <style>{`
        @keyframes amb-float0{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,-20px) scale(1.1)}}
        @keyframes amb-float1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-25px,15px) scale(0.9)}}
        @keyframes amb-float2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(20px,25px) scale(1.05)}}
        @keyframes amb-float3{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-35px,-10px) scale(0.95)}}
        @keyframes amb-float4{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(15px,-30px) scale(1.08)}}
        @keyframes amb-float5{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-20px,20px) scale(1.02)}}
      `}</style>
      {[
        { t: 12, l: 15, s: 6, d: 8, c: "rgba(212,165,116,0.12)" },
        { t: 60, l: 75, s: 4, d: 10, c: "rgba(232,196,160,0.10)" },
        { t: 80, l: 25, s: 5, d: 7, c: "rgba(184,132,90,0.08)" },
        { t: 20, l: 80, s: 3, d: 11, c: "rgba(212,165,116,0.15)" },
        { t: 70, l: 45, s: 7, d: 9, c: "rgba(232,196,160,0.08)" },
        { t: 40, l: 60, s: 4, d: 12, c: "rgba(184,132,90,0.10)" },
      ].map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${p.t}%`,
            left: `${p.l}%`,
            width: `${p.s}px`,
            height: `${p.s}px`,
            background: p.c,
            animation: `amb-float${i % 6} ${p.d}s ease-in-out infinite`,
            animationDelay: `${i * 1.2}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Lazy-loaded Three.js scene ───────────────────────────────────────────────
// Separated so the R3F/Three.js bundle (~150kB) is only loaded when WebGL is
// actually available. On Vercel (where HW WebGL is often absent), this chunk
// is never requested.
const ThreeScene = lazy(() =>
  import("./ThreeScene").then((m) => ({ default: m.ThreeScene }))
);

// ── Public export ─────────────────────────────────────────────────────────────
export function AmbientScene() {
  const [renderer, setRenderer] = useState<"webgl" | "fallback" | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setRenderer(hasHardwareWebGL() ? "webgl" : "fallback");
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // 🔇 render nothing on first paint (SSR safety + avoids layout shift)
  if (!renderer) {
    return <div className="absolute inset-0 pointer-events-none z-0" />;
  }

  if (renderer === "webgl") {
    return (
      <Suspense fallback={null}>
        <ThreeScene />
      </Suspense>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <CSSFallback />
    </div>
  );
}
