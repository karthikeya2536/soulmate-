"use client";

import dynamic from "next/dynamic";

const TextRevealInner = dynamic(
  () => import("@/components/TextReveal").then((mod) => ({ default: mod.TextReveal })),
  { ssr: false }
);

export function DynamicTextReveal() {
  return <TextRevealInner />;
}
