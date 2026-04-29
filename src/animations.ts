import type { Variants } from "framer-motion";

const isMobile = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 768px)").matches;

export function getFadeUp(isCompactMotion: boolean): Variants {
  return {
    hidden: {
      opacity: 0,
      y: isCompactMotion ? 10 : 28,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isCompactMotion ? 0.22 : 0.5,
        ease: "easeOut",
      },
    },
  };
}

export function getStaggerContainer(isCompactMotion: boolean): Variants {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: isCompactMotion ? 0.03 : 0.08,
      },
    },
  };
}

export const fadeUp = getFadeUp(isMobile);
export const staggerContainer = getStaggerContainer(isMobile);
