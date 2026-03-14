import { colors } from "./data/siteData";
import type { CSSProperties } from "react";
import { FileText, Mail, Linkedin } from "lucide-react";

export const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: colors.bg,
    color: colors.text,
    fontFamily: '"Adobe Gothic Std B", "Inter", "Helvetica Neue", Arial, sans-serif',
    position: "relative",
    overflowX: "hidden",
},
  backgroundLayerA: {
    position: "fixed",
    inset: 0,
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
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    background: `
      radial-gradient(ellipse at 22% 55%, rgba(74, 255, 255, 0.10), transparent 18%),
      radial-gradient(ellipse at 60% 45%, rgba(168, 85, 247, 0.10), transparent 22%),
      radial-gradient(ellipse at 88% 82%, rgba(91, 33, 182, 0.08), transparent 20%)
    `,
    mixBlendMode: "screen",
  },

  backgroundGlowLeft: {
    position: "fixed",
    left: "6%",
    bottom: "10%",
    width: 240,
    height: 520,
    borderRadius: 999,
    background: "rgba(62, 220, 255, 0.12)",
    filter: "blur(70px)",
    pointerEvents: "none",
  },

  backgroundGlowCenter: {
    position: "fixed",
    left: "38%",
    top: "8%",
    width: 280,
    height: 680,
    borderRadius: 999,
    background: "rgba(157, 78, 255, 0.12)",
    filter: "blur(90px)",
    pointerEvents: "none",
  },

  backgroundGlowRight: {
    position: "fixed",
    right: "8%",
    top: "0%",
    width: 260,
    height: 420,
    borderRadius: "50%",
    background: "rgba(47, 128, 255, 0.10)",
    filter: "blur(75px)",
    pointerEvents: "none",
  },
  header: {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  zIndex: 100,
  background: "linear-gradient(90deg, rgba(6,12,58,0.82), rgba(16,20,96,0.66), rgba(23,10,88,0.72))",
  backdropFilter: "blur(18px)",
  boxSizing: "border-box",
},


headerInner: {
  width: "100%",
  padding: "14px 42px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: 70,              // altura fixa da navbar
  boxSizing: "border-box",
},


brandTitle: {
  fontFamily: '"Syne", sans-serif',
  fontSize: 24,
  fontWeight: 600,
  letterSpacing: "-0.03em",
  color: "#F8FAFC",
},
  brandSub: { fontSize: 12, color: colors.muted, marginTop: 2, fontWeight: 500 },

navDesktop: {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 30,
  flexWrap: "wrap",
},

brandTextOnly: {
  textDecoration: "none",
  fontFamily: '"Syne", sans-serif',
  fontSize: 24,
  fontWeight: 600,
  letterSpacing: "-0.03em",
  color: "#F8FAFC",
},

heroTitleSingleLine: {
  fontFamily: '"Syne", sans-serif',
  fontWeight: 600,
  fontSize: "clamp(5rem, 10vw, 9rem)",
  lineHeight: 0.95,
  letterSpacing: "-0.065em",
  color: "#F8FAFC",
  textAlign: "center",
  margin: "0",
},

heroVestRow: {
  marginTop: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 20,
  flexDirection: "row",
},

heroVestIcon: {
  height: 120,
  width: "auto",
  display: "block",
  filter: "drop-shadow(0 0 18px rgba(0, 237, 245, 0.32))",
},

heroVestText: {
  fontFamily: '"Syne", sans-serif',
  fontWeight: 600,
  fontSize: "clamp(4.2rem, 8vw, 7rem)",
  lineHeight: 1,
  letterSpacing: "-0.055em",
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
  borderBottom: "2px solid #53D3FF",
},


downloadButton: {
  textDecoration: "none",
  color: "#F8FAFC",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 999,
  padding: "13px 22px",
  fontFamily: '"Syne", sans-serif',
  fontWeight: 600,
  fontSize: 15,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  whiteSpace: "nowrap",
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
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "130px 24px 24px",
  boxSizing: "border-box",
},


heroInner: {
  maxWidth: 1460,
  width: "100%",
  minHeight: "calc(100vh - 130px)",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  transform: "translateY(-10px)",
},

heroTopRight: {
  position: "absolute",
  top: 0,
  right: 0,
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
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
    borderRadius: 999,
    border: `1px solid ${colors.border}`,
    background: "rgba(255,255,255,0.10)",
    color: colors.text,
    fontSize: 13,
    fontWeight: 500,
  },
  heroTitle: {
    margin: "28px 0 0",
    maxWidth: 1500,
    fontFamily: '"Syne", sans-serif',
    fontWeight: 600,
    fontSize: "clamp(3.2rem, 7vw, 7rem)",
    lineHeight: 0.92,
    letterSpacing: "-0.03em",
    color: "#F8FAFC",
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
  fontSize: 14,
  border: "1px solid rgba(255,255,255,0.10)",
},



heroTitleMain: {
  fontFamily: '"Syne", sans-serif',
  fontWeight: 600,
  fontSize: "clamp(4.2rem, 8vw, 7.6rem)",
  lineHeight: 0.92,
  letterSpacing: "-0.05em",
  color: "#F8FAFC",
  textAlign: "center",
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
  marginTop: 26,
  maxWidth: 980,
  fontSize: 22,
  lineHeight: 1.65,
  color: "rgba(248,250,252,0.88)",
  textAlign: "center",
},

proposalButton: {
  textDecoration: "none",
  borderRadius: 999,
  padding: "13px 22px",
  background: "rgba(255,255,255,0.10)",
  color: "#F8FAFC",
  fontWeight: 600,
  fontSize: 15,
  border: "1px solid rgba(255,255,255,0.10)",
},

  heroButtons: { display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 34 },
  buttonPrimary: {
    border: 0,
    borderRadius: 999,
    padding: "13px 22px",
    background: colors.text,
    color: colors.bg,
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
  },
  buttonSecondary: {
    border: `1px solid ${colors.border}`,
    borderRadius: 999,
    padding: "13px 22px",
    background: "rgba(255,255,255,0.10)",
    color: colors.text,
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
  },
  heroTags: { marginTop: 38, display: "flex", gap: 12, rowGap: 10, flexWrap: "wrap", justifyContent: "center", color: "#e2e8f0", fontSize: 15 },
  dot: { width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.55)", display: "inline-block", alignSelf: "center" },
  scrollLink: { marginTop: 36, display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#e2e8f0", fontSize: 14 },
  sectionWrap: {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "84px 24px 0",
  scrollMarginTop: 120,
},
  
sectionTitle: {
  fontFamily: '"Syne", sans-serif',
  fontWeight: 600,
  fontSize: "clamp(2rem, 4vw, 3.2rem)",
  lineHeight: 1.1,
  margin: "18px 0 0",
  letterSpacing: "-0.02em",
  color: "#F8FAFC",
},
  sectionDescription: {
  marginTop: 14,
  color: "#cbd5e1",
  lineHeight: 1.7,
  fontSize: 15.5,
  fontWeight: 500
},
card: {
  borderRadius: 28,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.045)",
  backdropFilter: "blur(10px)",
  padding: 16,
  boxSizing: "border-box",
  boxShadow: "0 10px 30px rgba(0,0,0,0.14)",
  overflow: "hidden",
},
  twoColGrid: { display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 24 },
  twoColGridAlt: { display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 24, alignItems: "start" },
  twoGrid: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 },
  threeGrid: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 24 },
  fourGrid: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 24 },
  fourGridFlat: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16, marginTop: 18 },
  blockGroup: { marginBottom: 24 },
  label: { color: colors.cyan2, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.20em", fontWeight: 600 },
  longText: { marginTop: 12, color: "#cbd5e1", lineHeight: 1.95, fontSize: 15.5 },
  iconChip: { width: 42, height: 42, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 16, border: "1px solid rgba(34,211,238,0.22)", background: "rgba(34,211,238,0.12)", color: colors.cyan2, marginBottom: 16 },
 cardTitle: {
  fontFamily: '"Syne", sans-serif',
  fontSize: 19,
  lineHeight: 1.2,
  margin: 0,
  fontWeight: 600,
  textAlign: "center",
  color: "#F8FAFC",
},
  cardText: {
  color: "#F8FAFC",
  lineHeight: 1.45,
  fontSize: 13.5,
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
  stepLabel: { fontSize: 11, textTransform: "uppercase", letterSpacing: "0.20em", color: colors.cyan2, marginBottom: 10, fontWeight: 600 },
  featureGradientCard: { background: "linear-gradient(135deg, rgba(8,145,178,0.12), rgba(91,33,182,0.12), rgba(255,255,255,0.03))" },
  logoBox: { width: 64, height: 64, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(34,211,238,0.22)", background: "rgba(34,211,238,0.12)", color: "#dbeafe", fontWeight: 700, marginBottom: 18 },
  partnerType: { marginTop: 8, color: colors.cyan2, fontSize: 14, fontWeight: 500 },
  tabsWrap: { display: "flex", flexWrap: "wrap", gap: 10, padding: 10, border: `1px solid ${colors.border}`, background: "rgba(255,255,255,0.05)", borderRadius: 18, marginBottom: 24 },
  tabButton: { border: 0, borderRadius: 12, padding: "10px 14px", background: "transparent", color: colors.text, cursor: "pointer", fontWeight: 500 },
  tabButtonActive: { background: colors.text, color: colors.bg },
  blogTopRow: { display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center" },
  categoryPill: { display: "inline-flex", alignItems: "center", borderRadius: 999, border: "1px solid rgba(34,211,238,0.22)", background: "rgba(34,211,238,0.12)", color: colors.cyan2, padding: "6px 10px", fontSize: 12, fontWeight: 500 },
  smallMuted: { color: "#94a3b8", fontSize: 12 },
  imagePlaceholder: { marginTop: 14, borderRadius: 18, border: `1px dashed ${colors.border}`, background: "rgba(2,6,23,0.35)", padding: 18, color: "#94a3b8", fontSize: 14 },
  linkButton: { marginTop: 14, border: 0, background: "transparent", color: colors.cyan2, display: "inline-flex", alignItems: "center", gap: 4, padding: 0, cursor: "pointer", fontSize: 14, fontWeight: 500 },
  taskCard: { borderRadius: 20, border: `1px solid ${colors.border}`, background: "rgba(2,6,23,0.42)", padding: 18 },
  taskTop: { display: "flex", justifyContent: "space-between", gap: 18, alignItems: "flex-start", flexWrap: "wrap" },
  taskBadgesRow: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" },
  statusBadge: { display: "inline-flex", alignItems: "center", borderRadius: 999, padding: "5px 10px", border: "1px solid transparent", fontSize: 12, fontWeight: 500 },
  metaRow: { display: "flex", gap: 16, flexWrap: "wrap", marginTop: 12, color: "#94a3b8", fontSize: 14 },
  metaItem: { display: "inline-flex", alignItems: "center", gap: 6, color: "#cbd5e1", fontSize: 14 },
  progressText: { color: colors.cyan2, fontSize: 14, minWidth: 110, textAlign: "right" },
  progressWrap: { marginTop: 14, width: "100%", height: 8, borderRadius: 999, background: "rgba(255,255,255,0.10)", overflow: "hidden" },
  progressBar: { height: "100%", borderRadius: 999, background: "linear-gradient(90deg, #5FA9E8, #FFFFFF)" },
  statusPanel: { borderRadius: 20, border: `1px solid ${colors.border}`, background: "rgba(2,6,23,0.42)", padding: 16 },
  statusPanelHeader: { display: "flex", justifyContent: "space-between", marginBottom: 12, alignItems: "center" },
  statusItem: { borderRadius: 12, background: "rgba(255,255,255,0.05)", padding: "10px 12px", color: "#cbd5e1", fontSize: 14 },
  monthRow: { display: "flex", gap: 18, borderRadius: 18, border: `1px solid ${colors.border}`, background: "rgba(2,6,23,0.42)", padding: 14, alignItems: "flex-start" },
  monthLabel: { width: 90, color: colors.cyan2, fontSize: 14, fontWeight: 500 },
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 28,
    alignItems: "stretch",
  },

  teamPhoto: {
  maxWidth: "82%",
  maxHeight: 260,
  width: "auto",
  height: "auto",
  objectFit: "contain",
  objectPosition: "center bottom",
  display: "block",
  margin: "0 auto",
},

teamPhotoWrap: {
  height: 260,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  marginBottom: 8,
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
  color: "#F8FAFC",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 30,
  height: 30,
  borderRadius: 999,
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.10)",
},

  memberAvatar: { width: 82, height: 82, borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(34,211,238,0.22)", background: "linear-gradient(135deg, rgba(28,124,199,0.18), rgba(75,47,153,0.18))", color: colors.text, fontWeight: 700, marginBottom: 18, fontSize: 20 },
  profileButton: { marginTop: 14, borderRadius: 999, border: `1px solid ${colors.border}`, background: "rgba(255,255,255,0.05)", color: colors.text, padding: "10px 14px", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer" },
  roadmapCard: { borderRadius: 28, border: `1px solid ${colors.border}`, padding: 24, display: "grid", gridTemplateColumns: "0.22fr 0.78fr", gap: 24, alignItems: "center" },
  roadmapComplete: { background: "rgba(16,185,129,0.10)", borderColor: "rgba(16,185,129,0.20)" },
  roadmapCurrent: { background: "rgba(34,211,238,0.10)", borderColor: "rgba(34,211,238,0.20)" },
  roadmapUpcoming: { background: "rgba(255,255,255,0.05)", borderColor: colors.border },
  phaseLabel: { fontSize: 12, textTransform: "uppercase", letterSpacing: "0.18em", color: colors.cyan2, fontWeight: 600 },
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
  footerLink: { color: "#cbd5e1", textDecoration: "none", fontSize: 14 },
};
