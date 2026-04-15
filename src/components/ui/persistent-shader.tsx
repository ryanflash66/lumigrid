"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

const DotShaderBackground = dynamic(
  () =>
    import("@/components/ui/dot-shader-background").then(
      (m) => m.DotShaderBackground,
    ),
  { ssr: false },
);

/** Pages where the dot shader should be visible. */
const SHADER_PAGES = new Set(["/", "/pricing"]);

/**
 * Layout-level singleton for the WebGL dot shader.
 *
 * Rendered once in RootLayout → never destroyed on client-side navigation.
 * On pages not in SHADER_PAGES, we keep the component mounted (preserving
 * the WebGL context) but hide it with opacity-0 so it's instant when the
 * user navigates back.
 */
export function PersistentShader() {
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (prefersReducedMotion || !mounted) return null;

  const visible = SHADER_PAGES.has(pathname);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[1] transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <DotShaderBackground />
    </div>
  );
}
