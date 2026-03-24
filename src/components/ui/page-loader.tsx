"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

const LOAD_DURATION = 1.2;
const EXIT_DURATION = 0.5;

export function PageLoader() {
  const prefersReduced = useReducedMotion();
  const [loading, setLoading] = useState(true);
  const [showFlash, setShowFlash] = useState(false);

  // Mobile: skip loader entirely — every ms counts for lead conversion
  // Runs after hydration to avoid SSR mismatch
  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      setLoading(false);
    }
  }, []);

  // Animated progress value (0-100)
  const progress = useMotionValue(0);
  const displayPercent = useTransform(progress, (v) => Math.round(v));

  // Reduced motion: show briefly then skip
  useEffect(() => {
    if (prefersReduced) {
      const timer = setTimeout(() => setLoading(false), 200);
      return () => clearTimeout(timer);
    }
  }, [prefersReduced]);

  // Animate progress counter from 0 to 100
  useEffect(() => {
    if (!loading || prefersReduced) return;
    let flashTimer: ReturnType<typeof setTimeout>;
    const controls = animate(progress, 100, {
      duration: LOAD_DURATION,
      ease: "linear",
      onComplete: () => {
        setShowFlash(true);
        flashTimer = setTimeout(() => {
          setShowFlash(false);
          setLoading(false);
        }, 250);
      },
    });
    return () => {
      controls.stop();
      clearTimeout(flashTimer);
    };
  }, [loading, prefersReduced, progress]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          exit={
            prefersReduced
              ? { opacity: 0 }
              : { clipPath: "inset(0 0 100% 0)" }
          }
          transition={{
            duration: prefersReduced ? 0.15 : EXIT_DURATION,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
          {/* Glow flash overlay at 100% */}
          <AnimatePresence>
            {showFlash && !prefersReduced && (
              <motion.div
                key="flash"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/30 via-accent/20 to-transparent"
              />
            )}
          </AnimatePresence>

          {/* Cinematic title with letter-spacing spring */}
          <motion.span
            initial={
              prefersReduced
                ? undefined
                : { letterSpacing: "0.5em" }
            }
            animate={
              prefersReduced
                ? undefined
                : { letterSpacing: "0.3em" }
            }
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="font-sans font-bold text-2xl tracking-[0.3em] text-foreground"
          >
            LUMIGRID
          </motion.span>

          {/* Progress bar */}
          <div className="mt-6 h-[2px] w-48 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: LOAD_DURATION, ease: "linear" }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>

          {/* Percentage counter */}
          {!prefersReduced && (
            <motion.span
              className="mt-3 font-mono text-xs text-muted-foreground tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              <motion.span>{displayPercent}</motion.span>%
            </motion.span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
