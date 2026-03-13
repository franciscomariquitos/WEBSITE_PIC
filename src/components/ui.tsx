import React from "react";
import { styles } from "../styles";

export function Badge({ children }: { children: React.ReactNode }) {
  return <span style={styles.badge}>{children}</span>;
}

export function Button({ children, secondary = false }: { children: React.ReactNode; secondary?: boolean }) {
  return <button style={secondary ? styles.buttonSecondary : styles.buttonPrimary}>{children}</button>;
}

export function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ ...styles.card, ...style }}>{children}</div>;
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
