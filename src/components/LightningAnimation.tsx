import React from "react";
import { motion } from "framer-motion";

// Stylized lightning bolt SVG with animated stroke and glow
export function LightningAnimation({ style, variant = "bolt" }: { style?: React.CSSProperties; variant?: "bolt" | "circuit" }) {
  // SVG paths for different variants
  const boltPath = "M20 10 L40 60 L30 60 L50 110 L25 80 L35 80 L20 130";
  const circuitPath = "M20 10 L40 40 L20 70 L40 100 L20 130";
  const path = variant === "circuit" ? circuitPath : boltPath;

  // New: direction prop for sideways
  // Accepts 'vertical' (default) or 'horizontal'
  const direction = style?.direction || "horizontal";
  // Blue gradient
  const gradientId = direction === "horizontal" ? "blueLightningH" : "blueLightningV";

  return (
    <motion.svg
      width={direction === "horizontal" ? "140" : "70"}
      height={direction === "horizontal" ? "70" : "140"}
      viewBox={direction === "horizontal" ? "0 0 140 70" : "0 0 70 140"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...style, transform: direction === "horizontal" ? "rotate(90deg)" : undefined }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="blueLightningH" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5FA9E8" />
          <stop offset="100%" stopColor="#B88FFF" />
        </linearGradient>
        <linearGradient id="blueLightningV" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5FA9E8" />
          <stop offset="100%" stopColor="#B88FFF" />
        </linearGradient>
      </defs>
      <motion.path
        d={path}
        stroke={`url(#${gradientId})`}
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </motion.svg>
  );
}
