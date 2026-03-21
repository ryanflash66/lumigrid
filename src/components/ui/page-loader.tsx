"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const LOAD_DURATION = 1.2;
const EXIT_DURATION = 0.4;

export function PageLoader() {
  const prefersReduced = useReducedMotion();
  const [loading, setLoading] = useState(!prefersReduced);

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoading(false), LOAD_DURATION * 1000);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: EXIT_DURATION, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
          <span className="font-sans font-bold text-2xl tracking-[0.3em] text-foreground">
            LUMIGRID
          </span>
          <div className="mt-6 h-[2px] w-48 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: LOAD_DURATION, ease: "linear" }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
