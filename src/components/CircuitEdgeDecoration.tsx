import React from "react";


// More variable SVG circuit edge decoration
// PCB/processor-style circuit variants: right angles, parallel lines, geometric
const circuitVariants = [
  {
    paths: [
      // Main border circuit
      "M10 210 V40 H60 V10 H210",
      // Parallel trace
      "M30 210 V60 H80 V30 H210",
      // Shorter trace
      "M60 210 V100 H120 V50 H210",
      // Horizontal bus
      "M10 180 H210",
      // Vertical bus
      "M180 10 V210",
    ],
    nodes: [
      { cx: 10, cy: 210, r: 2.5, fill: "#FFD966" },
      { cx: 30, cy: 210, r: 2, fill: "#B88FFF" },
      { cx: 60, cy: 210, r: 2, fill: "#5FA9E8" },
      { cx: 210, cy: 10, r: 2.5, fill: "#FFD966" },
      { cx: 210, cy: 30, r: 2, fill: "#B88FFF" },
      { cx: 210, cy: 50, r: 2, fill: "#5FA9E8" },
      { cx: 180, cy: 10, r: 2, fill: "#FFD966" },
      { cx: 180, cy: 210, r: 2, fill: "#B88FFF" },
    ],
    glow: { stdDeviation: 3, colorA: "#B88FFF", colorB: "#5FA9E8" },
  },
  {
    paths: [
      // L-shaped border
      "M10 210 V80 H140 V10 H210",
      // Parallel trace
      "M40 210 V120 H160 V30 H210",
      // Shorter trace
      "M80 210 V160 H180 V50 H210",
      // Horizontal bus
      "M10 160 H210",
      // Vertical bus
      "M160 10 V210",
    ],
    nodes: [
      { cx: 10, cy: 210, r: 2.5, fill: "#FFD966" },
      { cx: 40, cy: 210, r: 2, fill: "#B88FFF" },
      { cx: 80, cy: 210, r: 2, fill: "#5FA9E8" },
      { cx: 210, cy: 10, r: 2.5, fill: "#FFD966" },
      { cx: 210, cy: 30, r: 2, fill: "#B88FFF" },
      { cx: 210, cy: 50, r: 2, fill: "#5FA9E8" },
      { cx: 160, cy: 10, r: 2, fill: "#FFD966" },
      { cx: 160, cy: 210, r: 2, fill: "#B88FFF" },
    ],
    glow: { stdDeviation: 3, colorA: "#FFD966", colorB: "#B88FFF" },
  },
  {
    paths: [
      // U-shaped border
      "M10 210 V120 H200 V10",
      // Parallel trace
      "M60 210 V160 H180 V30 H210",
      // Shorter trace
      "M120 210 V180 H200 V50 H210",
      // Horizontal bus
      "M10 200 H210",
      // Vertical bus
      "M200 10 V210",
    ],
    nodes: [
      { cx: 10, cy: 210, r: 2.5, fill: "#FFD966" },
      { cx: 60, cy: 210, r: 2, fill: "#B88FFF" },
      { cx: 120, cy: 210, r: 2, fill: "#5FA9E8" },
      { cx: 210, cy: 10, r: 2.5, fill: "#FFD966" },
      { cx: 210, cy: 30, r: 2, fill: "#B88FFF" },
      { cx: 210, cy: 50, r: 2, fill: "#5FA9E8" },
      { cx: 200, cy: 10, r: 2, fill: "#FFD966" },
      { cx: 200, cy: 210, r: 2, fill: "#B88FFF" },
    ],
    glow: { stdDeviation: 2.5, colorA: "#5FA9E8", colorB: "#FFD966" },
  },
];

function pickVariant(seed?: number) {
  // If a seed is provided, use it for deterministic selection (for cards, etc)
  if (typeof seed === "number") {
    return circuitVariants[seed % circuitVariants.length];
  }
  // Otherwise, randomize
  return circuitVariants[Math.floor(Math.random() * circuitVariants.length)];
}

const CircuitEdgeDecoration: React.FC<{
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  style?: React.CSSProperties;
  className?: string;
  variantSeed?: number; // for deterministic variant selection
}> = ({ position = "top-left", style, className, variantSeed }) => {
  const transforms: Record<string, string> = {
    "top-left": "",
    "top-right": "scaleX(-1)",
    "bottom-left": "scaleY(-1)",
    "bottom-right": "scale(-1,-1)",
  };
  const variant = pickVariant(variantSeed);
  const filterId = `circuitGlow-${variant.glow.colorA.replace('#','')}-${variant.glow.colorB.replace('#','')}`;

  return (
    <svg
      width="220"
      height="220"
      viewBox="0 0 220 220"
      style={{
        position: "absolute",
        pointerEvents: "none",
        zIndex: 0,
        ...style,
        transform: transforms[position],
      }}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={variant.glow.stdDeviation} result="blur" />
          <feFlood floodColor={variant.glow.colorA} floodOpacity="0.5" result="colorA" />
          <feFlood floodColor={variant.glow.colorB} floodOpacity="0.3" result="colorB" />
          <feComposite in="colorA" in2="blur" operator="in" result="glowA" />
          <feComposite in="colorB" in2="blur" operator="in" result="glowB" />
          <feMerge>
            <feMergeNode in="glowA" />
            <feMergeNode in="glowB" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="circuitGradient" x1="0" y1="0" x2="220" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B88FFF" />
          <stop offset="0.5" stopColor="#5FA9E8" />
          <stop offset="1" stopColor="#FFD966" />
        </linearGradient>
      </defs>
      <g filter={`url(#${filterId})`}>
        {variant.paths.map((d, i) => (
          <path key={i} d={d} stroke="url(#circuitGradient)" strokeWidth={2.5 - i} />
        ))}
      </g>
      {variant.nodes.map((node, i) => (
        <circle key={i} cx={node.cx} cy={node.cy} r={node.r} fill={node.fill} />
      ))}
    </svg>
  );
};

export default CircuitEdgeDecoration;
