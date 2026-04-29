import React from "react";
import { motion } from "framer-motion";
import { useResponsive } from "../context/ResponsiveContext";

const cardHoverVariants = {
  rest: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -2,
    scale: 1.002,
  },
};

const cardHoverGlowVariants = {
  rest: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
  },
};

export function Badge({ children }: { children: React.ReactNode }) {
  const { styles } = useResponsive();
  return <span style={styles.badge}>{children}</span>;
}

export function Button({ children, secondary = false }: { children: React.ReactNode; secondary?: boolean }) {
  const { styles } = useResponsive();
  return <button style={secondary ? styles.buttonSecondary : styles.buttonPrimary}>{children}</button>;
}

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const { disableMotion, styles } = useResponsive();
  const content = (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at top right, rgba(95, 169, 232, 0.075) 0%, rgba(95, 169, 232, 0.025) 18%, transparent 44%)",
          opacity: 0.30,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: "34%",
          height: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.025) 72%, rgba(255,255,255,0) 100%)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, height: "100%" }}>{children}</div>
    </>
  );

  if (disableMotion) {
    return <div style={{ ...styles.card, ...style, position: "relative" }}>{content}</div>;
  }

  return (
    <motion.div
      style={{ height: "100%" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div
        style={{
          ...styles.card,
          ...style,
          position: "relative",
          height: "100%",
          willChange: "transform",
        }}
        initial="rest"
        animate="rest"
        whileHover="hover"
        variants={cardHoverVariants}
        transition={{
          type: "spring",
          stiffness: 230,
          damping: 28,
          mass: 0.78,
        }}
      >
        <motion.div
          aria-hidden="true"
          variants={cardHoverGlowVariants}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            borderRadius: "inherit",
            background:
              "linear-gradient(145deg, rgba(95, 169, 232, 0.030) 0%, rgba(168, 143, 255, 0.022) 56%, rgba(255, 255, 255, 0.014) 100%)",
            boxShadow:
              "inset 0 0 0 1px rgba(95, 169, 232, 0.055), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        />
        {content}
      </motion.div>
    </motion.div>
  );
}

export function Dot() {
  const { styles } = useResponsive();
  return <span style={styles.dot} />;
}

export function ProgressBar({ value }: { value: number }) {
  const { styles } = useResponsive();
  return (
    <div style={styles.progressWrap}>
      <div style={{ ...styles.progressBar, width: `${value}%` }} />
    </div>
  );
}
