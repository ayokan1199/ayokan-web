// src/app/providers/MotionProvider.tsx
import React from "react";
import { AnimatePresence, LazyMotion, domAnimation, MotionConfig } from "framer-motion";

/**
 * MotionProvider
 * Centralise toute la config Framer Motion:
 * - réduit les animations si l’utilisateur préfère (prefers-reduced-motion)
 * - timing cohérent dans toute l’app
 * - lazy loading du moteur (bundle plus léger)
 *
 * Usage:
 * <MotionProvider>
 *   <App />
 * </MotionProvider>
 */

type MotionProviderProps = {
  children: React.ReactNode;
};

export default function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{
          type: "spring",
          stiffness: 320,
          damping: 28,
          mass: 0.6,
        }}
      >
        {/* AnimatePresence ici permet des transitions page-to-page propres */}
        <AnimatePresence mode="wait" initial={false}>
          {children}
        </AnimatePresence>
      </MotionConfig>
    </LazyMotion>
  );
}
