import React from "react";
import { motion } from "framer-motion";

// SVG circuit with animated neon flows
export function CrystalCircuitAnimation({ style }: { style?: React.CSSProperties }) {
  return (
    <motion.svg
      width="420"
      height="180"
      viewBox="0 0 420 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Glow background */}
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5FA9E8" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#8B9FE8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="neon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5FA9E8" />
          <stop offset="100%" stopColor="#B88FFF" />
        </linearGradient>
        <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect x="0" y="0" width="420" height="180" fill="url(#glow)" />
      {/* Main circuit lines */}
      <motion.path
        d="M40 90 H120 Q140 90 140 70 V40 Q140 20 160 20 H260 Q280 20 280 40 V70 Q280 90 300 90 H380"
        stroke="url(#neon)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glowFilter)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      />
      {/* Animated energy pulse and trailing ripple */}
      <motion.circle
        r={12}
        filter="url(#glowFilter)"
        style={{ mixBlendMode: "screen" }}
        animate={{
          cx: [40, 120, 140, 140, 140, 160, 260, 280, 280, 300, 380],
          cy: [90, 90, 90, 70, 40, 20, 20, 40, 70, 90, 90],
          opacity: [0.18, 0.32, 0.45, 0.32, 0.18, 0.12, 0.18, 0.32, 0.45, 0.32, 0.18],
          fill: [
            "#5FA9E8",
            "#B88FFF",
            "#5FA9E8",
            "#B88FFF",
            "#FFD966",
            "#5FA9E8",
            "#B88FFF",
            "#FFD966",
            "#5FA9E8",
            "#B88FFF",
            "#5FA9E8"
          ],
          scale: [1, 1.18, 1.28, 1.18, 1, 0.92, 1, 1.18, 1.28, 1.18, 1],
        }}
        transition={{
          duration: 3.2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
      {/* Trailing ripple effect */}
      <motion.circle
        r={22}
        filter="url(#glowFilter)"
        style={{ mixBlendMode: "screen" }}
        animate={{
          cx: [40, 120, 140, 140, 140, 160, 260, 280, 280, 300, 380],
          cy: [90, 90, 90, 70, 40, 20, 20, 40, 70, 90, 90],
          opacity: [0.08, 0.13, 0.18, 0.13, 0.08, 0.04, 0.08, 0.13, 0.18, 0.13, 0.08],
          fill: [
            "#B88FFF",
            "#5FA9E8",
            "#FFD966",
            "#5FA9E8",
            "#B88FFF",
            "#FFD966",
            "#5FA9E8",
            "#B88FFF",
            "#FFD966",
            "#5FA9E8",
            "#B88FFF"
          ],
          scale: [0.7, 0.9, 1.1, 0.9, 0.7, 0.5, 0.7, 0.9, 1.1, 0.9, 0.7],
        }}
        transition={{
          duration: 3.2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
      {/* Crystal nodes */}
      <motion.circle cx="140" cy="40" r="12" fill="#B88FFF" opacity="0.18" filter="url(#glowFilter)" />
      <motion.circle cx="280" cy="40" r="12" fill="#5FA9E8" opacity="0.18" filter="url(#glowFilter)" />
      <motion.rect x="158" y="8" width="24" height="24" rx="7" fill="#5FA9E8" opacity="0.13" filter="url(#glowFilter)" />
      <motion.rect x="238" y="8" width="24" height="24" rx="7" fill="#B88FFF" opacity="0.13" filter="url(#glowFilter)" />
    </motion.svg>
  );
}
