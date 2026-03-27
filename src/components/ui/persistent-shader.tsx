"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

/**
 * Lazy-load the shader — the heavy Three.js bundle only downloads once,
 * and the component is never unmounted after first mount because it lives
 * in the root layout.
 */
const DotShaderBackground = dynamic(
  () =>
    import("@/components/ui/dot-shader-background").then(
      (m) => m.DotShaderBackground,
    ),
  { ssr: false },
);

/**
 * Layout-level singleton for the WebGL dot shader.
 *
 * Rendered once in RootLayout → never destroyed on client-side navigation.
 * This means:
 *  • WebGL context created once, shader compiled once
 *  • Zero re-initialisation when navigating between pages
 *  • GPU textures and buffers persist in VRAM
 *
 * The shader sits behind all page content at z-0 as a fixed full-viewport
 * background.  Every page gets the subtle dot effect; pages that had their
 * own <DotShaderBackground> no longer need it.
 */
export function PersistentShader() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Delay mount by one tick so the initial HTML/CSS paint isn't blocked
  useEffect(() => {
    setMounted(true);
  }, []);

  if (prefersReducedMotion || !mounted) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-40"
      style={{ isolation: "isolate" }}
    >
      <DotShaderBackground />
    </div>
  );
}
