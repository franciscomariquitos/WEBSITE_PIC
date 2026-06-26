import { colors } from "./data/siteData";
import type { CSSProperties } from "react";

const defaultIsMobile =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(max-width: 980px)").matches;

export function getStyles(isMobile: boolean): Record<string, CSSProperties> {
  return {
	  page: {
	    minHeight: isMobile ? "100svh" : "100vh",
	    width: "100%",
	    maxWidth: "100%",
	    background: colors.bg,
	    color: colors.text,
	    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
	    position: "relative",
	    isolation: "isolate",
	    overflowX: "clip",
	    padding: isMobile ? "0" : undefined,
	  },
	  backgroundStage: {
	    display: isMobile ? "none" : "block",
	    position: "fixed",
	    inset: 0,
	    zIndex: 0,
	    pointerEvents: "none",
	    overflow: "hidden",
	    isolation: "isolate",
	    contain: "paint",
	    background: colors.bg,
	    transform: "translateZ(0)",
	    backfaceVisibility: "hidden",
	  },
	  backgroundLayerA: {
	    position: "absolute",
	    inset: 0,
	    zIndex: 0,
	    pointerEvents: "none",
	    background: `
	      radial-gradient(circle at 12% 70%, rgba(35, 197, 255, 0.16) 0%, rgba(35,197,255,0.10) 10%, transparent 26%),
	      radial-gradient(circle at 18% 30%, rgba(140, 76, 255, 0.18) 0%, rgba(140,76,255,0.10) 14%, transparent 30%),
	      radial-gradient(circle at 52% 52%, rgba(104, 71, 255, 0.16) 0%, rgba(104,71,255,0.08) 18%, transparent 36%),
	      radial-gradient(circle at 82% 18%, rgba(31, 111, 255, 0.12) 0%, rgba(31,111,255,0.06) 14%, transparent 28%),
	      linear-gradient(115deg, #01042d 0%, #031a72 28%, #1b1f86 55%, #24106a 76%, #060122 100%)
	    `,
	  },

	  backgroundLayerB: {
	    position: "absolute",
	    inset: 0,
	    zIndex: 0,
	    pointerEvents: "none",
	    display: "block",
	    background: `
	      radial-gradient(ellipse at 20% 58%, rgba(74, 255, 255, 0.11) 0%, rgba(74, 255, 255, 0.07) 11%, rgba(74, 255, 255, 0.03) 22%, transparent 38%),
	      radial-gradient(ellipse at 60% 44%, rgba(168, 85, 247, 0.11) 0%, rgba(168, 85, 247, 0.07) 12%, rgba(168, 85, 247, 0.03) 24%, transparent 40%),
	      radial-gradient(ellipse at 88% 80%, rgba(91, 33, 182, 0.09) 0%, rgba(91, 33, 182, 0.05) 12%, rgba(91, 33, 182, 0.02) 24%, transparent 40%)
	    `,
	    opacity: isMobile ? 0.9 : 0.96,
	  },

	  backgroundGlowLeft: {
	    position: "absolute",
	    left: "6%",
	    bottom: "10%",
	    width: isMobile ? 260 : 360,
	    height: isMobile ? 460 : 620,
	    borderRadius: 999,
	    background:
	      "radial-gradient(ellipse at center, rgba(62, 220, 255, 0.18) 0%, rgba(62, 220, 255, 0.13) 16%, rgba(62, 220, 255, 0.07) 34%, rgba(62, 220, 255, 0.03) 50%, transparent 72%)",
	    pointerEvents: "none",
	    zIndex: 0,
	    opacity: isMobile ? 0.84 : 0.92,
	  },

	  backgroundGlowCenter: {
	    position: "absolute",
	    left: "38%",
	    top: "8%",
	    width: isMobile ? 300 : 420,
	    height: isMobile ? 600 : 780,
	    borderRadius: 999,
	    background:
	      "radial-gradient(ellipse at center, rgba(157, 78, 255, 0.18) 0%, rgba(157, 78, 255, 0.13) 16%, rgba(157, 78, 255, 0.07) 34%, rgba(157, 78, 255, 0.03) 50%, transparent 72%)",
	    pointerEvents: "none",
	    zIndex: 0,
	    opacity: isMobile ? 0.84 : 0.94,
	  },

	  backgroundGlowRight: {
	    position: "absolute",
	    right: "8%",
	    top: "0%",
	    width: isMobile ? 260 : 340,
	    height: isMobile ? 420 : 520,
	    borderRadius: "50%",
	    background:
	      "radial-gradient(circle at center, rgba(47, 128, 255, 0.15) 0%, rgba(47, 128, 255, 0.10) 18%, rgba(47, 128, 255, 0.05) 36%, rgba(47, 128, 255, 0.02) 54%, transparent 72%)",
	    pointerEvents: "none",
	    zIndex: 0,
	    opacity: isMobile ? 0.82 : 0.9,
	  },

	  gridOverlay: {
	    position: "absolute",
	    inset: 0,
	    zIndex: 0,
	    pointerEvents: "none",
	    backgroundImage: `
	      linear-gradient(0deg, transparent 24%, rgba(35, 197, 255, 0.030) 25%, rgba(35, 197, 255, 0.030) 26%, transparent 27%, transparent 74%, rgba(35, 197, 255, 0.026) 75%, rgba(35, 197, 255, 0.026) 76%, transparent 77%, transparent),
	      linear-gradient(90deg, transparent 24%, rgba(35, 197, 255, 0.030) 25%, rgba(35, 197, 255, 0.030) 26%, transparent 27%, transparent 74%, rgba(35, 197, 255, 0.026) 75%, rgba(35, 197, 255, 0.026) 76%, transparent 77%, transparent)
	    `,
	    backgroundSize: isMobile ? "42px 42px" : "50px 50px",
	    opacity: 1,
	  },

	  header: {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  zIndex: 100,
  paddingTop: isMobile ? "env(safe-area-inset-top)" : 0,
  background: isMobile
    ? "linear-gradient(90deg, rgba(4,9,42,0.86), rgba(12,16,74,0.70), rgba(16,8,62,0.74))"
    : "linear-gradient(90deg, rgba(4,9,42,0.70), rgba(12,16,74,0.54), rgba(16,8,62,0.60))",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  boxSizing: "border-box",
},


  headerInner: {
    width: "100%",
    padding: "clamp(10px, 2vw, 14px) clamp(12px, 4vw, 42px)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "clamp(54px, 8vw, 70px)",
    boxSizing: "border-box",
  },


brandTitle: {
  fontFamily: '"Syne", sans-serif',
  fontSize: 28,
  fontWeight: 600,
  letterSpacing: "-0.03em",
  color: "#F8FAFC",
},
  brandSub: { fontSize: 16.33, color: colors.muted, marginTop: 2, fontWeight: 500 },

navDesktop: {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "clamp(9px, 1.4vw, 18px)",
  flexWrap: "nowrap",
  maxWidth: "calc(100% - 170px)",
},

brandTextOnly: {
  textDecoration: "none",
  fontFamily: '"Syne", sans-serif',
  fontSize: "clamp(1.15rem, 3vw, 1.5rem)",
  fontWeight: 600,
  letterSpacing: "-0.03em",
  color: "#F8FAFC",
},

heroEyebrow: {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  padding: isMobile ? "8px 14px" : "10px 16px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.035) 100%)",
  color: "rgba(224, 228, 233, 0.78)",
  fontSize: isMobile ? 11 : 12,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: isMobile ? "0.12em" : "0.16em",
  boxShadow: "0 10px 24px rgba(2, 6, 23, 0.10)",
},

heroEyebrowDot: {
  width: 8,
  height: 8,
  borderRadius: 999,
  background: colors.cyan2,
  boxShadow: "0 0 14px rgba(95, 169, 232, 0.55)",
},

  heroTitleSingleLine: {
  fontFamily: '"Syne", sans-serif',
  fontWeight: 700,
  fontSize: "clamp(3.2rem, 10vw, 9rem)",
  lineHeight: 0.95,
  letterSpacing: "-0.065em",
  color: "#F8FAFC",
  textAlign: "center",
  margin: "0",
  textShadow: "0 0 20px rgba(35, 197, 255, 0.1)",
},

heroVestRow: {
  marginTop: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "clamp(12px, 3vw, 20px)",
  flexDirection: isMobile ? "column" : "row",
},

heroVestIcon: {
  height: "clamp(70px, 18vw, 120px)",
  width: "auto",
  display: "block",
  filter: "drop-shadow(0 0 18px rgba(0, 237, 245, 0.32))",
},

heroVestText: {
  fontFamily: '"Syne", sans-serif',
  fontWeight: 700,
  fontSize: "clamp(3.2rem, 10vw, 9rem)",
  lineHeight: 0.95,
  letterSpacing: "-0.065em",
  color: "#F8FAFC",
},

navLink: {
  color: "#F8FAFC",
  fontFamily: '"Syne", sans-serif',
  fontSize: "clamp(0.82rem, 1.2vw, 1rem)",
  textDecoration: "none",
  fontWeight: 600,
  opacity: 0.95,
  position: "relative",
  paddingBottom: 0,
  display: "inline-block",
  whiteSpace: "nowrap",
  borderBottom: "1px solid rgba(95, 169, 232, 0.70)",
},


downloadButton: {
  textDecoration: "none",
  color: "#F8FAFC",
  background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 999,
  padding: "clamp(9px, 1.1vw, 11px) clamp(12px, 1.5vw, 17px)",
  fontFamily: '"Syne", sans-serif',
  fontWeight: 600,
  fontSize: "clamp(0.82rem, 1.2vw, 0.94rem)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  whiteSpace: "nowrap",
  boxShadow: "0 10px 20px rgba(2, 6, 23, 0.12)",
},

heroProductGrid: {
  width: "100%",
  maxWidth: 1240,
  minHeight: isMobile ? undefined : "calc(100vh - 150px)",
  display: "grid",
  gridTemplateColumns: isMobile
    ? "1fr"
    : "minmax(0, 0.95fr) minmax(430px, 0.82fr)",
  gap: isMobile ? 34 : 56,
  alignItems: "center",
},

heroProductCopy: {
  minWidth: 0,
  display: "grid",
  justifyItems: isMobile ? "center" : "start",
  textAlign: isMobile ? "center" : "left",
  gap: isMobile ? 14 : 16,
},

heroProductTitle: {
  margin: 0,
  maxWidth: isMobile ? 640 : 720,
  fontFamily: '"Syne", sans-serif',
  fontWeight: 700,
  fontSize: "clamp(3.3rem, 8.1vw, 7.4rem)",
  lineHeight: 0.92,
  letterSpacing: "-0.062em",
  color: "#F8FAFC",
  textShadow: "0 0 24px rgba(95, 169, 232, 0.12)",
},

heroProductSubtitle: {
  margin: 0,
  maxWidth: 650,
  color: "rgba(224, 228, 233, 0.82)",
  fontSize: "clamp(1rem, 1.55vw, 1.22rem)",
  lineHeight: 1.68,
  fontWeight: 500,
},

heroPrimaryButton: {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 9,
  padding: isMobile ? "12px 17px" : "13px 20px",
  borderRadius: 999,
  border: "1px solid rgba(95, 169, 232, 0.32)",
  background:
    "linear-gradient(135deg, rgba(95, 169, 232, 0.24) 0%, rgba(47, 44, 143, 0.22) 100%)",
  color: "#F8FAFC",
  textDecoration: "none",
  fontSize: isMobile ? 14 : 15,
  fontWeight: 700,
  boxShadow: "0 18px 32px rgba(2, 6, 23, 0.20), inset 0 1px 0 rgba(255,255,255,0.08)",
},

heroEcosystemVisual: {
  position: "relative",
  minHeight: isMobile ? 0 : 540,
  padding: isMobile ? 18 : 24,
  borderRadius: isMobile ? 24 : 28,
  border: "1px solid rgba(255, 255, 255, 0.10)",
  background:
    "linear-gradient(150deg, rgba(8, 16, 54, 0.66) 0%, rgba(14, 24, 78, 0.52) 46%, rgba(29, 24, 92, 0.48) 100%)",
  boxShadow:
    "0 28px 60px rgba(2, 6, 23, 0.24), inset 0 1px 0 rgba(255,255,255,0.06)",
  overflow: "hidden",
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "auto 1fr",
  gap: isMobile ? 16 : 18,
  alignItems: "stretch",
},

heroVisualGlow: {
  position: "absolute",
  inset: "-24% -20%",
  background:
    "radial-gradient(circle at 32% 42%, rgba(95, 169, 232, 0.20) 0%, rgba(95,169,232,0.08) 22%, transparent 44%), radial-gradient(circle at 82% 20%, rgba(168, 143, 255, 0.18) 0%, rgba(168,143,255,0.06) 24%, transparent 46%)",
  pointerEvents: "none",
},

heroVisualHeader: {
  position: "relative",
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 14,
  flexWrap: "wrap",
  paddingBottom: isMobile ? 4 : 2,
},

heroVisualTitle: {
  marginTop: 5,
  color: "#F8FAFC",
  fontFamily: '"Syne", sans-serif',
  fontSize: isMobile ? 22 : 25,
  fontWeight: 700,
  lineHeight: 1,
  letterSpacing: "-0.03em",
},

heroSignalPill: {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 11px",
  borderRadius: 999,
  border: "1px solid rgba(95, 169, 232, 0.20)",
  background: "rgba(95, 169, 232, 0.10)",
  color: "#cbe7fb",
  fontSize: 12,
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
},

heroSignalDot: {
  width: 8,
  height: 8,
  borderRadius: 999,
  background: colors.cyan2,
  boxShadow: "0 0 16px rgba(95, 169, 232, 0.74)",
},

heroVisualBody: {
  position: "relative",
  zIndex: 1,
  minWidth: 0,
  display: "grid",
  gridTemplateColumns: isMobile ? "1fr" : "0.86fr 1fr",
  gap: isMobile ? 16 : 22,
  alignItems: "center",
},

heroFlowGrid: {
  position: "relative",
  zIndex: 1,
  minWidth: 0,
  display: "grid",
  gridTemplateColumns: isMobile
    ? "1fr"
    : "minmax(180px, 0.92fr) minmax(0, 1.08fr)",
  gap: isMobile ? 12 : 14,
  alignItems: "stretch",
},

heroFlowNode: {
  position: "relative",
  minWidth: 0,
  minHeight: isMobile ? 0 : 0,
  padding: isMobile ? 16 : 13,
  borderRadius: 20,
  border: "1px solid rgba(95, 169, 232, 0.14)",
  background:
    "linear-gradient(168deg, rgba(255,255,255,0.070) 0%, rgba(255,255,255,0.026) 58%, rgba(95,169,232,0.035) 100%)",
  boxShadow:
    "0 18px 34px rgba(2, 6, 23, 0.16), inset 0 1px 0 rgba(255,255,255,0.06)",
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "auto minmax(88px, 1fr) auto",
  gap: isMobile ? 12 : 10,
  alignItems: "stretch",
  overflow: "hidden",
},

heroWearableNode: {
  minHeight: isMobile ? 0 : 300,
  padding: isMobile ? 16 : 16,
},

heroFlowNodeCompact: {
  minHeight: isMobile ? 0 : 144,
  gridTemplateRows: "auto minmax(74px, 1fr) auto",
},

heroFlowStack: {
  minWidth: 0,
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: isMobile ? "auto auto" : "1fr 1fr",
  gap: isMobile ? 12 : 12,
},

heroFlowNodeHeader: {
  position: "relative",
  zIndex: 1,
  minWidth: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  color: colors.cyan2,
},

heroVestStage: {
  position: "relative",
  zIndex: 1,
  minHeight: isMobile ? 104 : 168,
  display: "grid",
  placeItems: "center",
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.07)",
  background:
    "radial-gradient(circle at 50% 42%, rgba(95,169,232,0.20) 0%, rgba(95,169,232,0.06) 42%, transparent 72%)",
},

heroBridgeGraphic: {
  position: "relative",
  zIndex: 1,
  minHeight: isMobile ? 104 : 74,
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  alignItems: "center",
  gap: isMobile ? 12 : 8,
  padding: isMobile ? "10px 12px" : "8px 6px",
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.07)",
  background:
    "radial-gradient(circle at 50% 50%, rgba(168,143,255,0.16) 0%, rgba(95,169,232,0.05) 48%, transparent 74%)",
},

heroBridgePerson: {
  justifySelf: "end",
  width: isMobile ? 56 : 46,
  height: isMobile ? 56 : 46,
  borderRadius: 18,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#F8FAFC",
  border: "1px solid rgba(95,169,232,0.20)",
  background: "rgba(95,169,232,0.12)",
  boxShadow: "0 12px 24px rgba(2,6,23,0.18)",
},

heroBridgePhone: {
  position: "relative",
  justifySelf: "start",
  width: isMobile ? 56 : 46,
  height: isMobile ? 56 : 46,
  borderRadius: 18,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: colors.cyan2,
  border: "1px solid rgba(168,143,255,0.22)",
  background: "rgba(168,143,255,0.11)",
  boxShadow: "0 12px 24px rgba(2,6,23,0.18)",
},

heroBridgeSignal: {
  width: isMobile ? 38 : 28,
  height: 2,
  borderRadius: 999,
  background:
    "linear-gradient(90deg, rgba(95,169,232,0.22), rgba(95,169,232,0.86), rgba(168,143,255,0.30))",
  boxShadow: "0 0 16px rgba(95,169,232,0.34)",
},

heroPhoneStatusDot: {
  position: "absolute",
  right: 10,
  top: 10,
  width: 8,
  height: 8,
  borderRadius: 999,
  background: colors.cyan2,
  boxShadow: "0 0 12px rgba(95,169,232,0.80)",
},

heroVestNode: {
  position: "relative",
  zIndex: 1,
  minWidth: 0,
  display: "grid",
  justifyItems: "center",
  gap: 14,
  padding: isMobile ? 18 : 22,
  borderRadius: 24,
  border: "1px solid rgba(95, 169, 232, 0.16)",
  background:
    "radial-gradient(circle at 50% 32%, rgba(95,169,232,0.16) 0%, rgba(95,169,232,0.035) 40%, transparent 66%), linear-gradient(180deg, rgba(255,255,255,0.072) 0%, rgba(255,255,255,0.026) 100%)",
  boxShadow:
    "0 18px 34px rgba(2, 6, 23, 0.16), inset 0 1px 0 rgba(255,255,255,0.06)",
},

heroVisualLabel: {
  color: colors.cyan2,
  fontSize: 13,
  fontWeight: 800,
  lineHeight: 1,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
},

heroVestIconLarge: {
  width: isMobile ? 124 : 132,
  height: "auto",
  display: "block",
  filter: "drop-shadow(0 0 24px rgba(95, 169, 232, 0.32))",
},

heroNodeFooter: {
  position: "relative",
  zIndex: 1,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  padding: isMobile ? "8px 12px" : "8px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.045)",
  color: "rgba(224, 228, 233, 0.82)",
  fontSize: isMobile ? 13 : 12,
  fontWeight: 700,
  textAlign: "center",
  flexWrap: "wrap",
  lineHeight: 1.25,
  alignSelf: "end",
  justifySelf: "center",
},

heroNodeCopy: {
  margin: 0,
  color: "rgba(215, 226, 241, 0.70)",
  fontSize: isMobile ? 13 : 12,
  lineHeight: 1.42,
  textAlign: isMobile ? "center" : "left",
  gridColumn: isMobile ? undefined : "2",
  gridRow: isMobile ? undefined : "3",
  alignSelf: "start",
},

heroConnector: {
  display: isMobile ? "none" : "block",
  position: "absolute",
  left: "36%",
  top: "48%",
  width: "22%",
  height: 2,
  zIndex: 1,
  borderRadius: 999,
  background:
    "linear-gradient(90deg, rgba(95, 169, 232, 0.08) 0%, rgba(95, 169, 232, 0.86) 48%, rgba(168, 143, 255, 0.08) 100%)",
  boxShadow: "0 0 16px rgba(95, 169, 232, 0.28)",
},

heroDeviceStack: {
  position: "relative",
  zIndex: 1,
  minWidth: 0,
  display: "grid",
  gap: 16,
  alignContent: "center",
},

heroPhoneMock: {
  justifySelf: isMobile ? "center" : "start",
  width: isMobile ? "min(100%, 230px)" : 224,
  minHeight: 248,
  padding: 14,
  borderRadius: 28,
  border: "1px solid rgba(255, 255, 255, 0.13)",
  background:
    "linear-gradient(180deg, rgba(4, 9, 36, 0.88) 0%, rgba(8, 18, 56, 0.76) 100%)",
  boxShadow: "0 20px 38px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.08)",
  display: "grid",
  gap: 12,
},

heroPhoneTop: {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  color: "rgba(224, 228, 233, 0.74)",
  fontSize: 12,
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
},

heroPhoneBar: {
  width: 38,
  height: 5,
  borderRadius: 999,
  background: "rgba(255,255,255,0.20)",
},

heroPhoneMap: {
  position: "relative",
  minHeight: 104,
  borderRadius: 18,
  display: "grid",
  placeItems: "center",
  color: colors.cyan2,
  border: "1px solid rgba(95, 169, 232, 0.16)",
  background:
    "linear-gradient(135deg, rgba(95,169,232,0.12) 0%, rgba(47,44,143,0.10) 100%), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
  backgroundSize: "auto, 24px 24px, 24px 24px",
  overflow: "hidden",
},

heroMapPath: {
  position: "absolute",
  left: "26%",
  top: "34%",
  width: "48%",
  height: 34,
  borderLeft: "2px solid rgba(95,169,232,0.42)",
  borderBottom: "2px solid rgba(95,169,232,0.42)",
  borderRadius: "0 0 0 18px",
  transform: "rotate(-8deg)",
},

heroMapNode: {
  position: "absolute",
  width: 9,
  height: 9,
  borderRadius: 999,
  background: "#F8FAFC",
  boxShadow: "0 0 14px rgba(95, 169, 232, 0.64)",
},

heroPhoneRows: {
  display: "grid",
  gap: 7,
  alignContent: "start",
},

heroPhoneRow: {
  display: "block",
  height: 7,
  borderRadius: 999,
  background: "linear-gradient(90deg, rgba(95,169,232,0.48), rgba(255,255,255,0.12))",
},

heroDashboardMock: {
  justifySelf: isMobile ? "stretch" : "end",
  width: isMobile ? "100%" : 278,
  padding: 16,
  borderRadius: 22,
  border: "1px solid rgba(255, 255, 255, 0.12)",
  background:
    "linear-gradient(160deg, rgba(255,255,255,0.070) 0%, rgba(255,255,255,0.026) 100%)",
  boxShadow: "0 20px 38px rgba(2, 6, 23, 0.16), inset 0 1px 0 rgba(255,255,255,0.06)",
  display: "grid",
  gap: 13,
},

heroDashboardTop: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  color: "#F8FAFC",
  fontFamily: '"Syne", sans-serif',
  fontWeight: 700,
  fontSize: 15,
},

heroLiveDot: {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "5px 8px",
  borderRadius: 999,
  background: "rgba(95, 169, 232, 0.14)",
  color: "#cbe7fb",
  border: "1px solid rgba(95, 169, 232, 0.24)",
  fontSize: 11,
  fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
},

heroDashboardMap: {
  position: "relative",
  zIndex: 1,
  minHeight: isMobile ? 114 : 74,
  borderRadius: 17,
  overflow: "hidden",
  border: "1px solid rgba(95, 169, 232, 0.14)",
  background:
    "radial-gradient(circle at 58% 46%, rgba(95,169,232,0.22) 0%, rgba(95,169,232,0.06) 18%, transparent 34%), linear-gradient(135deg, rgba(3, 27, 112, 0.56), rgba(47,44,143,0.38)), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.038) 1px, transparent 1px)",
  backgroundSize: "auto, auto, 22px 22px, 22px 22px",
},

heroNaviCareNode: {
  isolation: "isolate",
  background:
    "linear-gradient(168deg, rgba(8,16,54,0.54) 0%, rgba(15,25,74,0.38) 58%, rgba(95,169,232,0.035) 100%)",
},

heroNaviCareMapBackdrop: {
  position: "absolute",
  inset: 0,
  zIndex: 0,
  opacity: 0.42,
  pointerEvents: "none",
  background:
    "linear-gradient(135deg, rgba(3, 27, 112, 0.35), rgba(47,44,143,0.26)), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.038) 1px, transparent 1px)",
  backgroundSize: "auto, 24px 24px, 24px 24px",
},

heroMapRegionA: {
  position: "absolute",
  left: "8%",
  top: "16%",
  width: "44%",
  height: "42%",
  borderRadius: "48% 52% 42% 58%",
  background: "rgba(95,169,232,0.09)",
  border: "1px solid rgba(95,169,232,0.10)",
},

heroMapRegionB: {
  position: "absolute",
  right: "9%",
  bottom: "12%",
  width: "46%",
  height: "46%",
  borderRadius: "52% 48% 56% 44%",
  background: "rgba(168,143,255,0.08)",
  border: "1px solid rgba(168,143,255,0.10)",
},

heroDashboardRoute: {
  position: "absolute",
  left: "13%",
  right: "15%",
  top: "54%",
  height: 2,
  borderRadius: 999,
  background:
    "linear-gradient(90deg, rgba(95,169,232,0.16), rgba(95,169,232,0.72), rgba(168,143,255,0.40))",
  transform: "rotate(-12deg)",
  transformOrigin: "center",
},

heroMapMarker: {
  position: "absolute",
  left: "59%",
  top: "43%",
  width: 14,
  height: 14,
  borderRadius: 999,
  background: colors.cyan2,
  boxShadow: "0 0 0 8px rgba(95,169,232,0.14), 0 0 20px rgba(95,169,232,0.58)",
},

heroDashboardStats: {
  display: "grid",
  gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
  gap: 8,
},

heroDashboardStat: {
  minWidth: 0,
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "8px 9px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.040)",
  color: "rgba(224, 228, 233, 0.78)",
  fontSize: 12,
  fontWeight: 700,
},

heroTitleMainCentered: {
  fontFamily: '"Syne", sans-serif',
  fontWeight: 600,
  fontSize: "clamp(4.8rem, 9vw, 8.8rem)",
  lineHeight: 0.95,
  letterSpacing: "-0.06em",
  color: "#F8FAFC",
  textAlign: "center",
  margin: "0",
},

  main: { position: "relative", zIndex: 1 },
  heroSection: {
    minHeight: isMobile ? "100svh" : "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(88px, 11vw, 130px) clamp(12px, 4vw, 24px) 24px",
    boxSizing: "border-box",
  },


  heroInner: {
    maxWidth: isMobile ? 580 : 1280,
    width: "100%",
    minHeight: isMobile ? undefined : "calc(100vh - 130px)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    transform: isMobile ? "none" : "translateY(-10px)",
    gap: isMobile ? 10 : 12,
  },

heroTopRight: {
  position: "absolute",
  top: 0,
  right: 0,
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
},

blogImage: {
  width: "100%",
  height: "180px",
  objectFit: "cover",
  borderRadius: "12px",
  marginTop: "12px",
},

heroTopRow: {
  marginBottom: 26,
  display: "flex",
  justifyContent: "center",
  width: "100%",
},

  badge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 16px",
    borderRadius: 6,
    border: `1px solid rgba(35, 197, 255, 0.15)`,
    background: "rgba(35, 197, 255, 0.06)",
    color: colors.cyan2,
    fontSize: 15.16,
    fontWeight: 600,
    boxShadow: "0 0 8px rgba(35, 197, 255, 0.08)",
  },
  heroTitle: {
    margin: "28px 0 0",
    maxWidth: 1500,
    fontFamily: '"Syne", sans-serif',
    fontWeight: 700,
    fontSize: "clamp(3.2rem, 7vw, 7rem)",
    lineHeight: 0.92,
    letterSpacing: "-0.03em",
    color: "#F8FAFC",
    textShadow: "0 0 15px rgba(35, 197, 255, 0.12)",
  },
  heroTitleWrap: {
  marginTop: 28,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
},

proposalPill: {
  textDecoration: "none",
  borderRadius: 999,
  padding: "10px 18px",
  background: "rgba(255,255,255,0.10)",
  color: "#F8FAFC",
  fontFamily: '"Syne", sans-serif',
  fontWeight: 600,
  fontSize: 15.12,
},

heroTitleSub: {
  marginTop: 8,
  fontFamily: '"Syne", sans-serif',
  fontWeight: 600,
  fontSize: "clamp(2.8rem, 6vw, 5.6rem)",
  lineHeight: 0.98,
  letterSpacing: "-0.045em",
  color: "#F8FAFC",
  textAlign: "center",
  maxWidth: "88vw",
},
heroSubtitle: {
  marginTop: isMobile ? 16 : 20,
  maxWidth: 720,
  fontSize: "clamp(1rem, 1.7vw, 1.28rem)",
  lineHeight: isMobile ? 1.58 : 1.72,
  color: "rgba(224, 228, 233, 0.80)",
  textAlign: "center",
  paddingInline: isMobile ? 8 : 0,
},

proposalButton: {
  textDecoration: "none",
  borderRadius: 999,
  padding: "13px 22px",
  background: "rgba(255,255,255,0.10)",
  color: "#F8FAFC",
  fontWeight: 600,
  fontSize: 17.5,
  border: "1px solid rgba(255,255,255,0.10)",
},

  heroButtons: { display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 34 },
  buttonPrimary: {
    border: "1px solid rgba(35, 197, 255, 0.25)",
    borderRadius: 999,
    padding: "12px 20px",
    background: "linear-gradient(135deg, rgba(35, 197, 255, 0.1), rgba(140, 76, 255, 0.08))",
    color: colors.text,
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    boxShadow: "0 10px 22px rgba(2, 6, 23, 0.14), inset 0 0 12px rgba(35, 197, 255, 0.05)",
	    transition: "all 0.3s ease",
  },
  buttonSecondary: {
    border: "1px solid rgba(35, 197, 255, 0.15)",
    borderRadius: 999,
    padding: "12px 20px",
    background: "rgba(255,255,255,0.045)",
    color: colors.text,
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
	    transition: "all 0.3s ease",
  },
  heroTags: {
    marginTop: isMobile ? 18 : 28,
    display: "flex",
    gap: isMobile ? 8 : 10,
    rowGap: 10,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  heroTagPill: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: isMobile ? "10px 14px" : "11px 16px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.025) 100%)",
    color: "#e2e8f0",
    fontSize: isMobile ? 13 : 14,
    fontWeight: 600,
    boxShadow: "0 10px 22px rgba(2, 6, 23, 0.10)",
  },
  dot: { width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.55)", display: "inline-block", alignSelf: "center" },
  heroActions: {
    marginTop: isMobile ? 20 : 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: isMobile ? 12 : 14,
    flexWrap: "wrap",
  },
  heroGhostButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: isMobile ? "11px 16px" : "12px 18px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
    color: "#F8FAFC",
    textDecoration: "none",
    fontSize: isMobile ? 14 : 15,
    fontWeight: 600,
    boxShadow: "0 10px 22px rgba(2, 6, 23, 0.10)",
  },
  scrollLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
    color: "rgba(224, 228, 233, 0.86)",
    fontSize: isMobile ? 14 : 15,
    padding: isMobile ? "11px 4px" : "12px 6px",
  },
  sectionWrap: {
    width: "100%",
    maxWidth: 1280,
    margin: "0 auto",
    padding: "clamp(58px, 10vw, 108px) clamp(14px, 4vw, 28px) 0",
    boxSizing: "border-box",
    scrollMarginTop: isMobile ? 80 : 120,
  },

  ecosystemFlow: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(4, minmax(0, 1fr))",
    gap: isMobile ? 14 : 18,
    alignItems: "stretch",
    paddingTop: isMobile ? 0 : 30,
  },

  ecosystemRail: {
    display: isMobile ? "none" : "block",
    position: "absolute",
    top: 12,
    left: "10%",
    right: "10%",
    height: 2,
    borderRadius: 999,
    background:
      "linear-gradient(90deg, rgba(95,169,232,0.06) 0%, rgba(95,169,232,0.44) 34%, rgba(168,143,255,0.34) 66%, rgba(251,113,133,0.12) 100%)",
    boxShadow: "0 0 16px rgba(95,169,232,0.14)",
    zIndex: 0,
  },

  ecosystemStep: {
    position: "relative",
    zIndex: 1,
    minWidth: 0,
    minHeight: isMobile ? undefined : 250,
    display: "grid",
    alignContent: "start",
    gap: 12,
    padding: isMobile ? 18 : 20,
    borderRadius: 22,
    border: "1px solid rgba(255, 255, 255, 0.09)",
    background:
      "linear-gradient(165deg, rgba(14, 20, 54, 0.46) 0%, rgba(18, 24, 62, 0.44) 58%, rgba(22, 22, 66, 0.32) 100%)",
    boxShadow:
      "0 18px 36px rgba(2, 6, 23, 0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
  },

  ecosystemStepTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 2,
  },

  ecosystemStepIndex: {
    width: 46,
    height: 28,
    borderRadius: 999,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.10em",
    border: "1px solid rgba(95,169,232,0.22)",
    background: "rgba(95,169,232,0.10)",
  },
  
sectionTitle: {
  fontFamily: '"Syne", sans-serif',
  fontWeight: 700,
  fontSize: "clamp(2rem, 3.4vw, 3rem)",
  lineHeight: 1.04,
  margin: "12px 0 0",
  letterSpacing: "-0.035em",
  color: "#F8FAFC",
},
  sectionDescription: {
  marginTop: 14,
  maxWidth: 720,
  marginInline: "auto",
  color: "rgba(203, 213, 225, 0.78)",
  lineHeight: 1.7,
  fontSize: "clamp(1rem, 2.6vw, 1.2rem)",
  fontWeight: 500
},
card: {
  borderRadius: isMobile ? 20 : 22,
  border: "1px solid rgba(255, 255, 255, 0.09)",
  background: isMobile
    ? "linear-gradient(160deg, rgba(14, 20, 54, 0.52) 0%, rgba(18, 24, 62, 0.56) 52%, rgba(22, 22, 66, 0.46) 100%)"
    : "linear-gradient(160deg, rgba(14, 20, 54, 0.40) 0%, rgba(18, 24, 62, 0.46) 52%, rgba(22, 22, 66, 0.38) 100%)",
  padding: "clamp(16px, 2.8vw, 22px)",
  boxSizing: "border-box",
  boxShadow: isMobile
    ? "0 10px 22px rgba(2, 6, 23, 0.12), inset 0 1px 0 rgba(255,255,255,0.055)"
    : "0 18px 42px rgba(2, 6, 23, 0.14), inset 0 1px 0 rgba(255,255,255,0.06)",
  overflow: "hidden",
  position: "relative",
},
  twoColGrid: {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
    gap: isMobile ? 18 : 28
  },
  twoColGridAlt: {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "0.95fr 1.05fr",
    gap: isMobile ? 18 : 28,
    alignItems: "start"
  },
  twoGrid: {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
    gap: isMobile ? 14 : 20
  },
  threeGrid: {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
    gap: isMobile ? 16 : 26,
  },
  fourGrid: {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(4, minmax(0, 1fr))",
    gap: isMobile ? 14 : 24,
  },
  fourGridFlat: {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(4, minmax(0, 1fr))",
    gap: isMobile ? 8 : 16,
    marginTop: isMobile ? 8 : 18,
  },
  blockGroup: { marginBottom: 24 },
  label: { color: colors.cyan2, fontSize: isMobile ? 11 : 12, textTransform: "uppercase", letterSpacing: isMobile ? "0.12em" : "0.16em", fontWeight: 700 },
  longText: { marginTop: 12, color: "rgba(203, 213, 225, 0.82)", lineHeight: 1.76, fontSize: "clamp(0.98rem, 2.6vw, 1.06rem)" },
  iconChip: { width: 42, height: 42, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 12, border: "1px solid rgba(95, 169, 232, 0.18)", background: "rgba(95, 169, 232, 0.08)", color: colors.cyan2, marginBottom: 16 },
 cardTitle: {
  fontFamily: '"Syne", sans-serif',
  fontSize: "clamp(1.1rem, 2.7vw, 1.375rem)",
  lineHeight: 1.12,
  margin: 0,
  fontWeight: 700,
  textAlign: "center",
  color: "#F8FAFC",
  letterSpacing: "-0.018em",
},
  cardText: {
  color: "rgba(215, 226, 241, 0.82)",
  lineHeight: 1.64,
  fontSize: "clamp(0.94rem, 2.4vw, 1rem)",
  marginTop: 6,
  fontWeight: 500,
  textAlign: "center",
},

logoWrap: {
  display: "flex",
  alignItems: "center",
  transform: "translateY(6px)",   // ajusta posição vertical
},

logoImage: {
  height: 100,
  transform: "translateY(6px)"
},



  stepCard: { borderRadius: 20, border: `1px solid ${colors.border}`, background: "rgba(2,6,23,0.45)", padding: 16 },
  stepLabel: { fontSize: 12.83, textTransform: "uppercase", letterSpacing: "0.20em", color: colors.cyan2, marginBottom: 10, fontWeight: 600 },
  featureGradientCard: { background: "linear-gradient(135deg, rgba(8,145,178,0.12), rgba(91,33,182,0.12), rgba(255,255,255,0.03))" },
  logoBox: { width: 64, height: 64, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(34,211,238,0.22)", background: "rgba(34,211,238,0.12)", color: "#dbeafe", fontWeight: 700, marginBottom: 18 },
  partnerType: { marginTop: 8, color: colors.cyan2, fontSize: 16.33, fontWeight: 500 },
  tabsWrap: { display: "flex", flexWrap: "wrap", gap: 10, padding: 10, border: `1px solid ${colors.border}`, background: "rgba(255,255,255,0.05)", borderRadius: 18, marginBottom: 24 },
  tabButton: { border: "1px solid rgba(35, 197, 255, 0.1)", borderRadius: 10, padding: "10px 14px", background: "rgba(255,255,255,0.02)", color: colors.text, cursor: "pointer", fontWeight: 600, transition: "all 0.2s ease", fontSize: 14 },
  tabButtonActive: { background: "linear-gradient(135deg, rgba(35, 197, 255, 0.1), rgba(140, 76, 255, 0.08))", border: "1px solid rgba(35, 197, 255, 0.2)", color: colors.text, boxShadow: "0 0 8px rgba(35, 197, 255, 0.1)" },
  blogTopRow: {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    gap: isMobile ? 4 : 16,
    alignItems: isMobile ? "flex-start" : "center",
  },
  categoryPill: {
    display: "inline-flex",
    alignItems: "center",
    color: colors.cyan2,
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.10em",
  },
  smallMuted: { color: "#94a3b8", fontSize: 14 },
  imagePlaceholder: { marginTop: 14, borderRadius: 18, border: `1px dashed ${colors.border}`, background: "rgba(2,6,23,0.35)", padding: 18, color: "#94a3b8", fontSize: 16.33 },
  linkButton: {
    marginTop: 14,
    border: 0,
    background: "transparent",
    color: colors.cyan2,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: 0,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 700,
	    transition: "all 0.2s ease",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    textShadow: "0 0 6px rgba(95, 169, 232, 0.15)",
  },
  taskCard: { borderRadius: 20, border: `1px solid ${colors.border}`, background: "rgba(2,6,23,0.42)", padding: 18 },
  taskTop: { display: "flex", justifyContent: "space-between", gap: 18, alignItems: "flex-start", flexWrap: "wrap", flexDirection: isMobile ? "column" : "row" },
  taskBadgesRow: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    padding: "6px 10px",
    border: "1px solid transparent",
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  metaRow: { display: "flex", gap: 16, flexWrap: "wrap", marginTop: 12, color: "#94a3b8", fontSize: "clamp(0.82rem, 2vw, 1rem)" },
  metaItem: { display: "inline-flex", alignItems: "center", gap: 6, color: "#cbd5e1", fontSize: "clamp(0.82rem, 2vw, 1rem)" },
  progressText: { color: colors.cyan2, fontSize: 14, minWidth: isMobile ? 0 : 110, textAlign: isMobile ? "left" : "right" },
  progressWrap: { marginTop: 14, width: "100%", height: 8, borderRadius: 0, background: "rgba(35, 197, 255, 0.06)", overflow: "hidden", border: "1px solid rgba(35, 197, 255, 0.12)" },
  progressBar: { height: "100%", borderRadius: 0, background: "linear-gradient(90deg, rgba(35, 197, 255, 0.6), rgba(140, 76, 255, 0.6))", boxShadow: "0 0 10px rgba(35, 197, 255, 0.2)" },
  statusPanel: { borderRadius: 20, border: `1px solid ${colors.border}`, background: "rgba(2,6,23,0.42)", padding: 16 },
  statusPanelHeader: { display: "flex", justifyContent: "space-between", marginBottom: 12, alignItems: "center" },
  statusItem: { borderRadius: 12, background: "rgba(255,255,255,0.05)", padding: "10px 12px", color: "#cbd5e1", fontSize: isMobile ? 14 : 16.33 },
  monthRow: { display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 8 : 18, borderRadius: 18, border: `1px solid ${colors.border}`, background: "rgba(2,6,23,0.42)", padding: 14, alignItems: "flex-start" },
  monthLabel: { width: isMobile ? "auto" : 90, color: colors.cyan2, fontSize: isMobile ? 14 : 16.33, fontWeight: 500 },
  teamGrid: {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
    gap: isMobile ? 16 : 24,
    alignItems: "stretch",
  },

  teamPhoto: {
  maxWidth: isMobile ? "74%" : "92%",
  maxHeight: isMobile ? 224 : 286,
  width: "auto",
  height: "auto",
  objectFit: "contain",
  objectPosition: "center bottom",
  display: "block",
  margin: "0 auto",
},

teamPhotoWrap: {
  height: isMobile ? 200 : 260,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  marginBottom: isMobile ? 12 : 8,
},

teamCardTop: {
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: 4,
},

teamIcons: {
  display: "flex",
  gap: 10,
  alignItems: "center",
},

teamIconLink: {
  color: "rgba(248, 250, 252, 0.88)",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  borderRadius: 999,
  background: "rgba(255,255,255,0.035)",
  border: "1px solid rgba(255,255,255,0.075)",
	  transition: "transform 0.2s ease, border-color 0.2s ease, background 0.2s ease",
},

  memberAvatar: { width: 82, height: 82, borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(34,211,238,0.22)", background: "linear-gradient(135deg, rgba(28,124,199,0.18), rgba(75,47,153,0.18))", color: colors.text, fontWeight: 700, marginBottom: 18, fontSize: 20 },
  profileButton: { marginTop: 14, borderRadius: 999, border: `1px solid ${colors.border}`, background: "rgba(255,255,255,0.05)", color: colors.text, padding: "10px 14px", fontSize: 16.33, display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer" },
  roadmapCard: { borderRadius: 28, border: `1px solid ${colors.border}`, padding: 24, display: "grid", gridTemplateColumns: "0.22fr 0.78fr", gap: 24, alignItems: "center" },
  roadmapComplete: { background: "rgba(16,185,129,0.10)", borderColor: "rgba(16,185,129,0.20)" },
  roadmapCurrent: { background: "rgba(34,211,238,0.10)", borderColor: "rgba(34,211,238,0.20)" },
  roadmapUpcoming: { background: "rgba(255,255,255,0.05)", borderColor: colors.border },
  phaseLabel: { fontSize: 14, textTransform: "uppercase", letterSpacing: "0.18em", color: colors.cyan2, fontWeight: 600 },
  roadmapTitle: {
  marginTop: 8,
  fontFamily: '"Syne", sans-serif',
  fontSize: 30,
  fontWeight: 600,
  lineHeight: 1.1,
},
  roadmapContentRight: { display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "center" },
  contactPanel: { borderRadius: 28, border: `1px solid ${colors.border}`, background: "linear-gradient(135deg, rgba(8,145,178,0.14), rgba(91,33,182,0.16), rgba(255,255,255,0.04))", padding: 32, display: "grid", gridTemplateColumns: "1fr 0.7fr", gap: 28 },
  darkPanel: { background: "rgba(2,6,23,0.35)" },
  footerLink: { color: "#cbd5e1", textDecoration: "none", fontSize: 16.33 },
  };
}

export const isMobile = defaultIsMobile;
export const styles = getStyles(defaultIsMobile);
