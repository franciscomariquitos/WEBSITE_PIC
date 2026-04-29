import { colors } from "./data/siteData";
import type { CSSProperties } from "react";

const defaultIsMobile =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(max-width: 768px)").matches;

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
	    overflowX: "hidden",
	    padding: isMobile ? "0" : undefined,
	  },
	  backgroundStage: {
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
  gap: 24,
  flexWrap: "wrap",
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
  fontSize: 18,
  textDecoration: "none",
  fontWeight: 600,
  opacity: 0.95,
  position: "relative",
  paddingBottom: 0,
  display: "inline-block",
  borderBottom: "1px solid rgba(95, 169, 232, 0.70)",
},


downloadButton: {
  textDecoration: "none",
  color: "#F8FAFC",
  background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 999,
  padding: "12px 20px",
  fontFamily: '"Syne", sans-serif',
  fontWeight: 600,
  fontSize: 16,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  whiteSpace: "nowrap",
  boxShadow: "0 10px 20px rgba(2, 6, 23, 0.12)",
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
