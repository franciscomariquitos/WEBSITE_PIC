import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import CircuitEdgeDecoration from "./CircuitEdgeDecoration";

// Cyberpunk stylesheet with corner brackets and glitch effects
const cyberpunkStyles = `
  @keyframes glitch {
    0% {
      text-shadow: 0 0 0 rgba(35, 197, 255, 0.5);
    }
    50% {
      text-shadow: 2px 0 0 rgba(35, 197, 255, 0.7), -2px 0 0 rgba(140, 76, 255, 0.5);
    }
    100% {
      text-shadow: 0 0 0 rgba(35, 197, 255, 0.5);
    }
  }

  @keyframes cardGlow {
    0%, 100% {
      box-shadow: 0 0 12px rgba(35, 197, 255, 0.12), inset 0 0 15px rgba(35, 197, 255, 0.04);
    }
    50% {
      box-shadow: 0 0 18px rgba(35, 197, 255, 0.18), inset 0 0 18px rgba(35, 197, 255, 0.06);
    }
  }

  .cyber-card:hover {
    animation: cardGlow 1.5s ease-in-out;
  }

  .corner-bracket {
    position: absolute;
    width: 12px;
    height: 12px;
    border-color: rgba(35, 197, 255, 0.1);
  }

  .corner-bracket.top-left {
    top: 12px;
    left: 12px;
    border-top: 1px solid rgba(35, 197, 255, 0.1);
    border-left: 1px solid rgba(35, 197, 255, 0.1);
  }

  .corner-bracket.top-right {
    top: 12px;
    right: 12px;
    border-top: 1px solid rgba(35, 197, 255, 0.1);
    border-right: 1px solid rgba(35, 197, 255, 0.1);
  }

  .corner-bracket.bottom-left {
    bottom: 12px;
    left: 12px;
    border-bottom: 1px solid rgba(35, 197, 255, 0.1);
    border-left: 1px solid rgba(35, 197, 255, 0.1);
  }

  .corner-bracket.bottom-right {
    bottom: 12px;
    right: 12px;
    border-bottom: 1px solid rgba(35, 197, 255, 0.1);
    border-right: 1px solid rgba(35, 197, 255, 0.1);
  }
`;

export function Badge({ children }: { children: React.ReactNode }) {
  return <span style={styles.badge}>{children}</span>;
}

export function Button({ children, secondary = false }: { children: React.ReactNode; secondary?: boolean }) {
  return <button style={secondary ? styles.buttonSecondary : styles.buttonPrimary}>{children}</button>;
}

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      style={{ ...styles.card, ...style, position: "relative" }}
      whileHover={{ y: -8, boxShadow: "0 8px 32px rgba(35,197,255,0.12)" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.18 }}
    >
      {children}
    </motion.div>
  );
}

export function Dot() {
  return <span style={styles.dot} />;
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div style={styles.progressWrap}>
      <div style={{ ...styles.progressBar, width: `${value}%` }} />
    </div>
  );
}
