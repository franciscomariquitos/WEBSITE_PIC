import React, { useMemo } from "react";
import vesticon from "../assets/optimized/vesticon.webp";

import {
  AlertTriangle,
  ArrowDown,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Clapperboard,
  Code2,
  Database,
  Eye,
  EyeOff,
  HardHat,
  Mail,
  FileText,
  Gauge,
  Lightbulb,
  Linkedin,
  RadioTower,
  ShieldAlert,
  CircuitBoard,
  Presentation,
  UserRound,
  Users
} from "lucide-react";
import { motion } from "framer-motion";
import { getFadeUp, getStaggerContainer } from "../animations";
import { sectionIds, siteData, colors } from "../data/siteData"
import { Card } from "./ui"
import { RevealImage } from "./RevealImage";
import daniel from "../assets/optimized/daniel.webp";
import david from "../assets/optimized/david.webp";
import francisco from "../assets/optimized/francisco.webp";
import fred from "../assets/optimized/fred.webp";
import raquel from "../assets/optimized/raquel.webp";
import tiago from "../assets/optimized/tiago.webp";
import { withBaseUrl } from "../utils/assetUrl";
import { useResponsive } from "../context/ResponsiveContext";
import MobileNav from "./MobileNav";

function useResponsiveStyles() {
  return useResponsive();
}

function hasExternalLink(href?: string) {
  return Boolean(href && href.trim() && href !== "#");
}

const teamPhotos: Record<string, string> = {
  "Francisco Mariquitos": francisco,
  "Raquel Barroso": raquel,
  "Daniel Khom'yak": daniel,
  "David Reimer": david,
  "Tiago Pinto": tiago,
  "Frederico Pinto": fred,
};

const teamRoleIcons = {
  "Francisco Mariquitos": { icon: RadioTower, accent: "#5FA9E8", label: "Connectivity" },
  "Raquel Barroso": { icon: CircuitBoard, accent: "#A88FFF", label: "Engineering" },
  "Daniel Khom'yak": { icon: Code2, accent: "#5FA9E8", label: "Software" },
  "David Reimer": { icon: Clapperboard, accent: "#FFD966", label: "Media" },
  "Tiago Pinto": { icon: Presentation, accent: "#34d399", label: "Presentation" },
  "Frederico Pinto": { icon: Database, accent: "#A88FFF", label: "Dashboard" },
} as const;


export function Header() {
  const { isMobile, styles } = useResponsiveStyles();
  return (
    <header style={styles.header}>
      <div style={styles.headerInner}>
        <a href="#top" style={styles.brandTextOnly}>
          NAVISense
        </a>
        {isMobile ? (
          <MobileNav />
        ) : (
          <nav style={styles.navDesktop} role="navigation" aria-label="Main navigation">
            {siteData.nav.map((item) => (
              <a
                key={item}
                href={`#${sectionIds[item as keyof typeof sectionIds]}`}
                style={styles.navLink}
                tabIndex={0}
                aria-label={item}
              >
                {item}
              </a>
            ))}
            <a
              href={withBaseUrl("proposal.pdf")}
              download="NAVISense_Project_Proposal.pdf"
              style={styles.downloadButton}
              tabIndex={0}
              aria-label="Download Project Proposal"
            >
              Download Our Project Proposal
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}


function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  const { isMobile, styles } = useResponsiveStyles();
  return (
    <div
      style={{
        maxWidth: 880,
        margin: `0 auto ${isMobile ? 30 : 42}px auto`,
        textAlign: "center",
      }}
    >
      {eyebrow ? <div style={styles.label}>{eyebrow}</div> : null}
      <h2 style={styles.sectionTitle}>{title}</h2>
      {description ? (
        <p style={styles.sectionDescription}>{description}</p>
      ) : null}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const { styles } = useResponsiveStyles();
  const map: Record<string, React.CSSProperties> = {
    Done: { background: "rgba(16,185,129,0.16)", color: "#a7f3d0", borderColor: "rgba(16,185,129,0.25)" },
    "In Progress": { background: "rgba(34,211,238,0.16)", color: "#a5f3fc", borderColor: "rgba(34,211,238,0.25)" },
    "To Do": { background: "rgba(148,163,184,0.16)", color: "#cbd5e1", borderColor: "rgba(148,163,184,0.25)" },
    Delayed: { background: "rgba(244,63,94,0.16)", color: "#fecdd3", borderColor: "rgba(244,63,94,0.25)" },
  };
  return <span style={{ ...styles.statusBadge, ...map[status] }}>{status}</span>;
}

function PriorityBadge({ priority }: { priority: string }) {
  const { styles } = useResponsiveStyles();
  const map: Record<string, React.CSSProperties> = {
    High: { background: "rgba(245,158,11,0.16)", color: "#fde68a", borderColor: "rgba(245,158,11,0.25)" },
    Medium: { background: "rgba(168,85,247,0.16)", color: "#e9d5ff", borderColor: "rgba(168,85,247,0.25)" },
    Low: { background: "rgba(148,163,184,0.16)", color: "#cbd5e1", borderColor: "rgba(148,163,184,0.25)" },
  };
  return <span style={{ ...styles.statusBadge, ...map[priority] }}>{priority}</span>;
}

type TrackerItem = (typeof siteData.tracker)[number];
type TrackerStatus = TrackerItem["status"];

const trackerRoadmap = [
  {
    period: "February",
    title: "Foundation",
    desc: "Website launch, blog structure, and materials planning.",
    state: "complete",
  },
  {
    period: "March-April",
    title: "Build",
    desc: "Prototype development, subsystem integration, and communications setup.",
    state: "current",
  },
  {
    period: "April-May",
    title: "Validate",
    desc: "Testing workflows, latency checks, and system refinement.",
    state: "upcoming",
  },
  {
    period: "May-June",
    title: "Showcase",
    desc: "Poster, demonstration video, and final presentation assets.",
    state: "upcoming",
  },
];

function getTrackerStatusTone(status: TrackerStatus) {
  switch (status) {
    case "Done":
      return {
        accent: "#34d399",
        border: "rgba(52, 211, 153, 0.20)",
        surface: "rgba(52, 211, 153, 0.08)",
        glow: "rgba(52, 211, 153, 0.28)",
        text: "#a7f3d0",
      };
    case "In Progress":
      return {
        accent: "#5FA9E8",
        border: "rgba(95, 169, 232, 0.24)",
        surface: "rgba(95, 169, 232, 0.10)",
        glow: "rgba(95, 169, 232, 0.28)",
        text: "#cbe7fb",
      };
    case "Delayed":
      return {
        accent: "#fb7185",
        border: "rgba(251, 113, 133, 0.22)",
        surface: "rgba(251, 113, 133, 0.10)",
        glow: "rgba(251, 113, 133, 0.24)",
        text: "#fecdd3",
      };
    default:
      return {
        accent: "#94a3b8",
        border: "rgba(148, 163, 184, 0.20)",
        surface: "rgba(148, 163, 184, 0.08)",
        glow: "rgba(148, 163, 184, 0.16)",
        text: "#e2e8f0",
      };
  }
}

function BlogCard({ post, onReadMore }: { post: (typeof siteData.updates)[number]; onReadMore?: (post: (typeof siteData.updates)[number]) => void }) {
  const { disableMotion, styles } = useResponsiveStyles();
  return (
    <Card>
      <div style={styles.blogTopRow}>
        <span style={styles.categoryPill}>{post.category}</span>
        <span style={styles.smallMuted}>{post.date}</span>
      </div>
      <h3 style={{ ...styles.cardTitle, textAlign: "left", marginTop: 10 }}>{post.title}</h3>
      <p style={{...styles.smallMuted, fontSize: "13px", marginBottom: "12px", textAlign: "left"}}>
        By {post.author}
      </p>
      <p style={{ ...styles.cardText, textAlign: "left", marginTop: 0 }}>{post.summary}</p>
	      <motion.button
	        onClick={() => onReadMore?.(post)}
	        style={styles.linkButton}
	        whileHover={disableMotion ? undefined : { gap: "12px" }}
	        whileTap={disableMotion ? undefined : { scale: 0.98 }}
	      >
        Read full update <ChevronRight size={16} style={{ transition: "all 0.2s ease" }} />
      </motion.button>
    </Card>
  );
}

export function HeroSection() {
  const { disableMotion, isMobile, styles } = useResponsiveStyles();
  const fadeUp = React.useMemo(() => getFadeUp(isMobile), [isMobile]);
  const staggerContainer = React.useMemo(() => getStaggerContainer(isMobile), [isMobile]);
  return (
    <motion.section
      id="top"
      style={styles.heroSection}
      variants={disableMotion ? undefined : staggerContainer}
      initial={disableMotion ? false : "hidden"}
      animate={disableMotion ? undefined : "show"}
    >
      <motion.div style={styles.heroInner} variants={disableMotion ? undefined : fadeUp}>
        <motion.h1 style={styles.heroTitleSingleLine} variants={disableMotion ? undefined : fadeUp}>
          NAVISense
        </motion.h1>

        <motion.div style={styles.heroVestRow} variants={disableMotion ? undefined : fadeUp}>
          <span style={styles.heroVestText}>Vest</span>

          <img
            src={vesticon}
            alt="NAVISense icon"
            style={styles.heroVestIcon}
            role="img"
            aria-label="NAVISense icon"
          />
        </motion.div>

        <motion.p style={styles.heroSubtitle} variants={disableMotion ? undefined : fadeUp}>
          {siteData.project.subtitle}
        </motion.p>

        <motion.div style={styles.heroActions} variants={disableMotion ? undefined : fadeUp}>
          <motion.a href="#about" style={styles.scrollLink} variants={disableMotion ? undefined : fadeUp}>
            Scroll to explore <ArrowDown size={16} />
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
export function AboutSection() {
  const { disableMotion, isMobile, styles } = useResponsiveStyles();
  const fadeUp = React.useMemo(() => getFadeUp(isMobile), [isMobile]);
  const aboutCards = [
    {
      title: "Why it exists",
      body: siteData.about.problem,
      icon: AlertTriangle,
      accent: "#5FA9E8",
      glow: "rgba(95, 169, 232, 0.16)",
    },
    {
      title: "Why it matters",
      body: siteData.about.importance,
      icon: Eye,
      accent: "#A88FFF",
      glow: "rgba(168, 143, 255, 0.14)",
    },
    {
      title: "Vision",
      body: siteData.about.vision,
      icon: Lightbulb,
      accent: "#FFD966",
      glow: "rgba(255, 217, 102, 0.12)",
    },
  ] as const;
  const aboutFeatureCardStyle: React.CSSProperties = {
    padding: isMobile ? 18 : 24,
    borderRadius: isMobile ? 20 : 22,
    border: "1px solid rgba(255, 255, 255, 0.09)",
    background:
      "linear-gradient(155deg, rgba(14, 20, 54, 0.44) 0%, rgba(18, 24, 62, 0.48) 48%, rgba(22, 24, 68, 0.38) 100%)",
    boxShadow:
      "0 18px 36px rgba(2, 6, 23, 0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
    display: "grid",
    alignContent: "start",
  };
  const aboutBenefitCardStyle: React.CSSProperties = {
    padding: isMobile ? 16 : 20,
    borderRadius: isMobile ? 18 : 20,
    border: "1px solid rgba(255, 255, 255, 0.08)",
    background:
      "linear-gradient(160deg, rgba(14, 20, 54, 0.38) 0%, rgba(18, 24, 62, 0.44) 58%, rgba(22, 22, 66, 0.34) 100%)",
    display: "grid",
    alignContent: "start",
    gap: 10,
  };
  const benefitIconMap = {
    "Visual Impairment": { icon: EyeOff, accent: "#5FA9E8" },
    "Older Adults": { icon: UserRound, accent: "#A88FFF" },
    "Industrial Safety": { icon: HardHat, accent: "#FFD966" },
    "Emergency Teams": { icon: ShieldAlert, accent: "#34d399" },
  } as const;

  return (
    <motion.section
      id="about"
      style={styles.sectionWrap}
      variants={disableMotion ? undefined : fadeUp}
      initial={disableMotion ? false : "hidden"}
      whileInView={disableMotion ? undefined : "show"}
      viewport={{ once: true, amount: isMobile ? 0.15 : 0.18 }}
    >
      <SectionHeading
        eyebrow="About the project"
        title="Safer Navigation"
        description=""
      />

      <div style={styles.threeGrid}>
        {aboutCards.map((item, index) => {
          const Icon = item.icon;

          return (
            <Card key={item.title} style={aboutFeatureCardStyle}>
	              <motion.div
	                style={{ display: "grid", gap: 14, height: "100%", alignContent: "start" }}
	                initial={disableMotion ? false : { opacity: 0, y: 24 }}
	                whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
	                animate={disableMotion ? { opacity: 1, y: 0 } : undefined}
	                transition={disableMotion ? undefined : { duration: 0.7, delay: 0.1 + index * 0.1 }}
	              >
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 16,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid ${item.accent}33`,
                    background: item.glow,
                    boxShadow: `0 0 14px ${item.accent}12`,
                  }}
                >
                  <Icon size={24} color={item.accent} />
                </div>

                <div style={{ ...styles.label, textAlign: "left" }}>{item.title}</div>
                <p style={{ ...styles.longText, marginTop: 0, textAlign: "left" }}>{item.body}</p>
              </motion.div>
            </Card>
          );
        })}
      </div>

      <div style={{ marginTop: isMobile ? 42 : 58 }}>
        <h3
          style={{
            margin: "0 0 24px",
            fontFamily: '"Syne", sans-serif',
            fontSize: isMobile ? 24 : 28,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: colors.cyan2,
          }}
        >
          Who benefits
        </h3>
        <div style={styles.fourGrid}>
          {siteData.about.beneficiaries.map((item) => {
            const benefitStyle =
              benefitIconMap[item.title as keyof typeof benefitIconMap] ?? {
                icon: Users,
                accent: colors.cyan2,
              };
            const Icon = benefitStyle.icon;

            return (
              <Card
                key={item.title}
                style={{
                  ...aboutBenefitCardStyle,
                  borderColor: `${benefitStyle.accent}24`,
                }}
              >
                <div
                  style={{
                    ...styles.iconChip,
                    color: benefitStyle.accent,
                    background: `${benefitStyle.accent}16`,
                    border: `1px solid ${benefitStyle.accent}26`,
                  }}
                >
                  <Icon size={18} />
                </div>
                <h3 style={{ ...styles.cardTitle, textAlign: "left" }}>{item.title}</h3>
                <p style={{ ...styles.cardText, textAlign: "left", marginTop: 8 }}>
                  {item.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

export function PartnersSection() {
  const { disableMotion, isMobile, styles } = useResponsiveStyles();
  const fadeUp = React.useMemo(() => getFadeUp(isMobile), [isMobile]);
  const featuredPartners = siteData.partners.filter(
    (partner) =>
      partner.type !== "Community Partner" && partner.type !== "Support Partner"
  );

  function getPartnerDescription(partner: (typeof siteData.partners)[number]) {
    if (partner.desc !== "Short description or role in the project.") {
      return partner.desc;
    }

    if (partner.type === "Institutional Partner") {
      return "Academic support and a stronger foundation for the development path.";
    }

    return "Accessibility-focused feedback grounded in real use cases.";
  }

  return (
    <motion.section
      id="partners"
      style={styles.sectionWrap}
      variants={disableMotion ? undefined : fadeUp}
      initial={disableMotion ? false : "hidden"}
      whileInView={disableMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.15 }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "minmax(0, 0.78fr) minmax(0, 1.22fr)",
          gap: isMobile ? 22 : 34,
          alignItems: isMobile ? "start" : "center",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: 16,
            maxWidth: isMobile ? "100%" : 420,
            alignContent: isMobile ? "start" : "center",
          }}
        >
          <div style={styles.label}>Partners</div>

          <h2
            style={{
              ...styles.sectionTitle,
              margin: 0,
              textAlign: "left",
            }}
          >
            Built alongside the right collaborators.
          </h2>

          <p
            style={{
              margin: 0,
              color: "rgba(203, 213, 225, 0.82)",
              lineHeight: 1.78,
              fontSize: isMobile ? 15 : 16,
            }}
          >
            NAVISense is being shaped with academic support and
            accessibility-focused collaboration, giving the project more
            grounding than a simple demo.
          </p>

        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(2, minmax(0, 1fr))",
            gap: 16,
            alignSelf: isMobile ? "stretch" : "center",
          }}
        >
          {featuredPartners.map((partner, idx) => (
            <Card
              key={`${partner.name}-${idx}`}
              style={{
                padding: isMobile ? 18 : 22,
                borderRadius: isMobile ? 20 : 22,
                display: "grid",
                gap: 18,
                borderColor: "rgba(255, 255, 255, 0.09)",
                background:
                  idx === 0
                    ? "linear-gradient(155deg, rgba(14, 20, 54, 0.46) 0%, rgba(18, 26, 62, 0.48) 52%, rgba(24, 34, 74, 0.34) 100%)"
                    : "linear-gradient(155deg, rgba(14, 20, 54, 0.42) 0%, rgba(20, 22, 64, 0.46) 52%, rgba(28, 20, 72, 0.34) 100%)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(95, 169, 232, 0.18)",
                    background: "rgba(95, 169, 232, 0.10)",
                    color: "#dbeafe",
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                >
                  {partner.logo}
                </div>

                <div
                  style={{
                    padding: "8px 12px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.10)",
                    background: "rgba(255,255,255,0.05)",
                    color: colors.cyan2,
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                  }}
                >
                  {partner.type.replace(" Partner", "")}
                </div>
              </div>

              <div style={{ display: "grid", gap: 8 }}>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: '"Syne", sans-serif',
                    fontSize: isMobile ? 22 : 23,
                    lineHeight: 1.08,
                    color: "#F8FAFC",
                  }}
                >
                  {partner.name}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "rgba(215, 226, 241, 0.82)",
                    lineHeight: 1.68,
                    fontSize: 14,
                  }}
                >
                  {getPartnerDescription(partner)}
                </p>
              </div>

            </Card>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export function UpdatesSection({ onOpenBlog, onSelectPost }: { onOpenBlog?: () => void; onSelectPost?: (post: (typeof siteData.updates)[number]) => void }) {
  const { disableMotion, isMobile, styles } = useResponsiveStyles();
  const fadeUp = React.useMemo(() => getFadeUp(isMobile), [isMobile]);
  // Sort posts by date descending (most recent first)
  const sortedPosts = [...siteData.updates].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  const displayedPosts = sortedPosts.slice(0, 3);
  const hasMore = sortedPosts.length > 3;

  const handleReadMore = (post: (typeof siteData.updates)[number]) => {
    onSelectPost?.(post);
    onOpenBlog?.();
  };

  return (
    <motion.section
      id="updates"
      style={styles.sectionWrap}
      variants={disableMotion ? undefined : fadeUp}
      initial={disableMotion ? false : "hidden"}
      whileInView={disableMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.15 }}
    >
      <SectionHeading
        eyebrow="Project blog"
        title="Latest development updates"
        description=""
      />

      <div style={styles.threeGrid}>
        {displayedPosts.map((post) => (
          <BlogCard key={`${post.title}-${post.date}`} post={post} onReadMore={handleReadMore} />
        ))}
      </div>

      {hasMore && onOpenBlog && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
          <button onClick={onOpenBlog} style={styles.buttonPrimary}>
            See all updates <ChevronRight size={18} style={{ marginLeft: "8px" }} />
          </button>
        </div>
      )}
    </motion.section>
  );
}

export function TrackerSection() {
  const { disableMotion, isMobile, styles } = useResponsiveStyles();
  const fadeUp = React.useMemo(() => getFadeUp(isMobile), [isMobile]);
  const groupedTracker = useMemo(() => {
    const groups: Record<string, typeof siteData.tracker> = {
      "In Progress": [],
      "To Do": [],
      Done: [],
      Delayed: [],
    };
    siteData.tracker.forEach((item) => groups[item.status].push(item));
    return groups;
  }, []);
  const totalTasks = siteData.tracker.length;
  const overallProgress = Math.round(
    siteData.tracker.reduce((total, item) => total + item.progress, 0) / totalTasks
  );
  const trackerStats = [
    {
      label: "Milestones done",
      value: `${groupedTracker.Done.length}/${totalTasks}`,
      icon: CheckCircle2,
      accent: "#34d399",
    },
    {
      label: "In progress",
      value: `${groupedTracker["In Progress"].length}`,
      icon: Clock3,
      accent: "#a5f3fc",
    },
    {
      label: "Delayed",
      value: `${groupedTracker.Delayed.length}`,
      icon: AlertTriangle,
      accent: "#fda4af",
    },
  ];
  const trackerBodyTextStyle: React.CSSProperties = {
    margin: 0,
    color: "rgba(224, 228, 233, 0.74)",
    fontSize: isMobile ? 14 : 15,
    lineHeight: 1.65,
  };
  const roadmapAccentMap = {
    complete: "#34d399",
    current: "#5FA9E8",
    upcoming: "#94a3b8",
  } as const;

  return (
    <motion.section
      id="tracker"
      style={styles.sectionWrap}
      variants={disableMotion ? undefined : fadeUp}
      initial={disableMotion ? false : "hidden"}
      whileInView={disableMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.15 }}
    >
      <SectionHeading
        eyebrow=""
        title="Progress Tracker"
        description=""
      />

      <div style={{ display: "grid", gap: isMobile ? 16 : 22 }}>
        <Card
          style={{
            padding: isMobile ? 18 : 24,
            borderRadius: isMobile ? 20 : 22,
            border: "1px solid rgba(255, 255, 255, 0.10)",
            background:
              "linear-gradient(135deg, rgba(10, 16, 44, 0.54) 0%, rgba(14, 22, 58, 0.50) 52%, rgba(24, 20, 64, 0.38) 100%)",
            boxShadow:
              "0 18px 42px rgba(2, 6, 23, 0.13), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.05fr 0.95fr",
              gap: isMobile ? 18 : 24,
              alignItems: "stretch",
            }}
          >
            <div style={{ display: "grid", gap: 18, alignContent: "center" }}>
              <div
                style={{
                  display: "grid",
                  gap: 14,
                  marginTop: 0,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: '"Syne", sans-serif',
                      fontSize: isMobile ? 48 : 68,
                      lineHeight: 0.92,
                      letterSpacing: "-0.06em",
                      color: "#F8FAFC",
                    }}
                  >
                    {overallProgress}%
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      color: "rgba(224, 228, 233, 0.62)",
                      fontSize: 13,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      fontWeight: 700,
                    }}
                  >
                    Project completion
                  </div>
                </div>
              </div>

              <div
                aria-label={`Project completion ${overallProgress}%`}
                style={{
                  position: "relative",
                  height: isMobile ? 12 : 14,
                  borderRadius: 999,
                  overflow: "hidden",
                  border: "1px solid rgba(95, 169, 232, 0.16)",
                  background: "rgba(255, 255, 255, 0.055)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 24px rgba(2, 6, 23, 0.14)",
                }}
              >
                <motion.div
                  aria-hidden="true"
                  initial={disableMotion ? false : { width: 0 }}
                  whileInView={{ width: `${overallProgress}%` }}
                  viewport={{ once: true, amount: 0.4 }}
	                  transition={disableMotion ? { duration: 0 } : { duration: 1.1, ease: "easeOut" }}
                  style={{
                    height: "100%",
                    borderRadius: 999,
                    background:
                      "linear-gradient(90deg, #f59e0b 0%, #fb7185 48%, #c084fc 100%)",
                    boxShadow: "0 0 18px rgba(251, 113, 133, 0.32)",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {!disableMotion ? (
                    <motion.div
                      aria-hidden="true"
	                      animate={{ x: ["-120%", "220%"] }}
	                      transition={{
	                        duration: 1.6,
	                        ease: "linear",
	                        repeat: Infinity,
	                        repeatDelay: 0.15,
	                      }}
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        width: "38%",
                        background:
                          "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.46) 48%, rgba(255,255,255,0) 100%)",
                        filter: "blur(1px)",
                      }}
                    />
                  ) : null}
                </motion.div>
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0) 58%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
                gap: 12,
                alignContent: "start",
              }}
            >
              {trackerStats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    style={{
                      position: "relative",
                      padding: isMobile ? 14 : 16,
	                      borderRadius: 18,
	                      border: `1px solid ${stat.accent}1f`,
	                      background:
	                        "linear-gradient(160deg, rgba(255,255,255,0.026) 0%, rgba(255,255,255,0.010) 100%)",
	                      boxShadow: "0 10px 20px rgba(2, 6, 23, 0.07)",
                      display: "grid",
                      gap: 12,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        inset: "0 0 auto 0",
                        height: 2,
                        background: `linear-gradient(90deg, ${stat.accent} 0%, rgba(255,255,255,0) 100%)`,
                      }}
                    />

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          color: "rgba(224, 228, 233, 0.68)",
                          fontSize: 11,
                          lineHeight: 1.45,
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          fontWeight: 700,
                        }}
                      >
                        {stat.label}
                      </div>

                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 12,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: `${stat.accent}18`,
                          color: stat.accent,
                          boxShadow: `inset 0 0 0 1px ${stat.accent}22`,
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={18} />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: '"Syne", sans-serif',
                          fontSize: isMobile ? 28 : 34,
                          lineHeight: 0.95,
                          color: "#F8FAFC",
                        }}
                      >
                        {stat.value}
                      </div>

                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 999,
                          background: stat.accent,
                          boxShadow: `0 0 16px ${stat.accent}88`,
                          flexShrink: 0,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        <Card
          style={{
            padding: isMobile ? 18 : 22,
	            borderRadius: isMobile ? 20 : 22,
	            display: "grid",
	            gap: 18,
              borderColor: "rgba(255, 255, 255, 0.09)",
              background:
                "linear-gradient(160deg, rgba(14, 20, 54, 0.38) 0%, rgba(18, 24, 62, 0.42) 58%, rgba(22, 22, 66, 0.32) 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                color: colors.cyan2,
                fontFamily: '"Syne", sans-serif',
                fontSize: isMobile ? 24 : 28,
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              Milestones
            </div>

            <div
              style={{
                padding: "10px 14px",
                borderRadius: 999,
                border: "1px solid rgba(95, 169, 232, 0.16)",
                background: "rgba(95, 169, 232, 0.10)",
                color: colors.cyan2,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {totalTasks} tracked items
            </div>
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            {siteData.tracker.map((task) => {
              const tone = getTrackerStatusTone(task.status);

              return (
                <div
                  key={task.title}
                  style={{
                    position: "relative",
                    padding: isMobile ? "16px 16px 16px 18px" : "18px 18px 18px 20px",
	                    borderRadius: 18,
	                    border: `1px solid ${tone.border}`,
	                    background:
	                      "linear-gradient(180deg, rgba(255,255,255,0.038) 0%, rgba(255,255,255,0.016) 100%)",
	                    boxShadow: "0 14px 28px rgba(2, 6, 23, 0.10)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      width: 4,
                      background: `linear-gradient(180deg, ${tone.accent} 0%, rgba(255,255,255,0) 100%)`,
                    }}
                  />

                  <div style={{ display: "grid", gap: 16 }}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
                        gap: 14,
                        alignItems: "start",
                      }}
                    >
                      <div style={{ display: "grid", gap: 10 }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                          <StatusBadge status={task.status} />
                          <PriorityBadge priority={task.priority} />
                        </div>

                        <h3
                          style={{
                            margin: 0,
                            fontFamily: '"Syne", sans-serif',
                            fontSize: isMobile ? 20 : 22,
                            lineHeight: 1.08,
                            letterSpacing: "-0.03em",
                            color: "#F8FAFC",
                            textAlign: "left",
                          }}
                        >
                          {task.title}
                        </h3>

                        <div
                          style={{
                            display: "flex",
                            gap: 14,
                            flexWrap: "wrap",
                            color: "rgba(224, 228, 233, 0.72)",
                            fontSize: 13,
                          }}
                        >
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <Users size={14} />
                            {task.owner}
                          </span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <CalendarDays size={14} />
                            {task.due}
                          </span>
                        </div>
                      </div>

                      <div
                        style={{
                          minWidth: isMobile ? 0 : 132,
                          padding: "12px 14px",
                          borderRadius: 18,
                          border: `1px solid ${tone.border}`,
                          background: tone.surface,
                          textAlign: isMobile ? "left" : "center",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: '"Syne", sans-serif',
                            fontSize: isMobile ? 28 : 34,
                            lineHeight: 0.95,
                            color: "#F8FAFC",
                          }}
                        >
                          {task.progress}%
                        </div>
                        <div
                          style={{
                            marginTop: 6,
                            color: tone.text,
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.12em",
                          }}
                        >
                          completion
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "grid", gap: 10 }}>
                      <div
                        style={{
                          width: "100%",
	                          height: 8,
                          borderRadius: 999,
                          overflow: "hidden",
                          border: "1px solid rgba(255,255,255,0.08)",
                          background: "rgba(255,255,255,0.05)",
                        }}
                      >
                        <div
                          style={{
                            width: `${task.progress}%`,
                            height: "100%",
                            borderRadius: 999,
                            background: `linear-gradient(90deg, ${tone.accent} 0%, rgba(168, 143, 255, 0.88) 100%)`,
                            boxShadow: `0 0 20px ${tone.glow}`,
                          }}
                        />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 12,
                          flexWrap: "wrap",
                          color: "rgba(224, 228, 233, 0.58)",
                          fontSize: 12,
                        }}
                      >
	                        <span>Progress</span>
	                        <span>{task.progress === 100 ? "Complete" : "In progress"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card
          style={{
            padding: isMobile ? 18 : 22,
	            borderRadius: isMobile ? 20 : 22,
	            display: "grid",
	            gap: 18,
              borderColor: "rgba(255, 255, 255, 0.09)",
              background:
                "linear-gradient(160deg, rgba(14, 20, 54, 0.36) 0%, rgba(18, 24, 62, 0.40) 58%, rgba(22, 22, 66, 0.30) 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                color: colors.cyan2,
                fontFamily: '"Syne", sans-serif',
                fontSize: isMobile ? 24 : 28,
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              Roadmap
            </div>

            <div
              style={{
                padding: "10px 14px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(224, 228, 233, 0.72)",
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {trackerRoadmap.length} phases mapped
            </div>
          </div>

          {isMobile ? (
            <div style={{ display: "grid", gap: 12 }}>
              {trackerRoadmap.map((item, index) => {
                const accent = roadmapAccentMap[item.state as keyof typeof roadmapAccentMap];

                return (
                  <div
                    key={`${item.period}-${item.title}`}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: 12,
                      alignItems: "start",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: 18,
                        display: "flex",
                        justifyContent: "center",
                        minHeight: index === trackerRoadmap.length - 1 ? 16 : 92,
                      }}
                    >
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          background: accent,
                          boxShadow: `0 0 18px ${accent}55`,
                          marginTop: 4,
                          zIndex: 1,
                        }}
                      />
                      {index !== trackerRoadmap.length - 1 ? (
                        <div
                          style={{
                            position: "absolute",
                            top: 18,
                            bottom: 0,
                            width: 2,
                            borderRadius: 999,
                            background: "rgba(255,255,255,0.08)",
                          }}
                        />
                      ) : null}
                    </div>

                    <div
                      style={{
                        padding: "0 0 2px",
                        display: "grid",
                        gap: 6,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 12,
                          color: colors.cyan2,
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          fontWeight: 700,
                        }}
                      >
                        {item.period}
                      </div>
                      <div
                        style={{
                          fontFamily: '"Syne", sans-serif',
                          fontSize: 18,
                          lineHeight: 1.08,
                          color: "#F8FAFC",
                        }}
                      >
                        {item.title}
                      </div>
                      <p style={{ ...trackerBodyTextStyle, fontSize: 14 }}>{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ position: "relative" }}>
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 18,
                  left: "8%",
                  right: "8%",
                  height: 2,
                  borderRadius: 999,
                  background:
                    "linear-gradient(90deg, rgba(52, 211, 153, 0.34) 0%, rgba(95, 169, 232, 0.28) 48%, rgba(148, 163, 184, 0.24) 100%)",
                }}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${trackerRoadmap.length}, minmax(0, 1fr))`,
                  gap: 16,
                  alignItems: "start",
                }}
              >
                {trackerRoadmap.map((item) => {
                  const accent = roadmapAccentMap[item.state as keyof typeof roadmapAccentMap];

                  return (
                    <div
                      key={`${item.period}-${item.title}`}
                      style={{
                        position: "relative",
                        display: "grid",
                        gap: 14,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          minHeight: 38,
                        }}
                      >
                        <div
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: 999,
                            background: accent,
                            boxShadow: `0 0 18px ${accent}66`,
                            flexShrink: 0,
                            zIndex: 1,
                          }}
                        />
                        <div
                          style={{
                            fontSize: 12,
                            color: colors.cyan2,
                            textTransform: "uppercase",
                            letterSpacing: "0.12em",
                            fontWeight: 700,
                          }}
                        >
                          {item.period}
                        </div>
                      </div>

                      <div
                        style={{
                          minHeight: 168,
                          padding: "18px 16px",
                          borderRadius: 22,
                          border: `1px solid ${accent}24`,
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                          display: "grid",
                          alignContent: "start",
                          gap: 8,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: '"Syne", sans-serif',
                            fontSize: 20,
                            lineHeight: 1.08,
                            color: "#F8FAFC",
                          }}
                        >
                          {item.title}
                        </div>

                        <p style={{ ...trackerBodyTextStyle, fontSize: 14 }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Card>
      </div>
    </motion.section>
  );
}

export function TeamSection() {
  const { disableMotion, isMobile, styles } = useResponsiveStyles();
  const fadeUp = React.useMemo(() => getFadeUp(isMobile), [isMobile]);

  return (
    <motion.section
      id="team"
      style={styles.sectionWrap}
      variants={disableMotion ? undefined : fadeUp}
      initial={disableMotion ? false : "hidden"}
      whileInView={disableMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.15 }}
    >
      <SectionHeading
        eyebrow="Team"
        title="Project development crew"
        description=""
      />

      <div style={styles.teamGrid}>
        {siteData.team.map((member) => {
          const roleStyle =
            teamRoleIcons[member.name as keyof typeof teamRoleIcons] ?? {
              icon: Users,
              accent: colors.cyan2,
              label: "Project",
            };
          const RoleIcon = roleStyle.icon;

          return (
            <Card
              key={member.name}
              style={{
                padding: isMobile ? 16 : 20,
                borderRadius: isMobile ? 20 : 22,
                display: "grid",
                gap: 16,
                borderColor: "rgba(255, 255, 255, 0.09)",
                background:
                  "linear-gradient(168deg, rgba(14, 20, 54, 0.40) 0%, rgba(18, 24, 62, 0.44) 58%, rgba(22, 22, 66, 0.34) 100%)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  title={member.role}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 13,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: roleStyle.accent,
                    border: `1px solid ${roleStyle.accent}26`,
                    background: `${roleStyle.accent}14`,
                    boxShadow: `0 0 14px ${roleStyle.accent}10`,
                  }}
                >
                  <RoleIcon size={18} />
                </div>

                <div style={styles.teamIcons}>
                  {hasExternalLink(member.cv) ? (
                  <a
                    href={member.cv}
                    style={styles.teamIconLink}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} CV`}
                  >
                    <FileText size={16} />
                  </a>
                  ) : null}

                  <a
                    href={`mailto:${member.email}`}
                    style={styles.teamIconLink}
                    aria-label={`${member.name} email`}
                  >
                    <Mail size={16} />
                  </a>

                  {hasExternalLink(member.linkedin) ? (
                    <a
                      href={member.linkedin}
                      style={styles.teamIconLink}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin size={16} />
                    </a>
                  ) : null}
                </div>
              </div>

              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  minHeight: isMobile ? 228 : 286,
                  height: isMobile ? 228 : 286,
                  marginBottom: 0,
                  overflow: "visible",
                  padding: 0,
                }}
              >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at 50% 16%, rgba(95, 169, 232, 0.075) 0%, rgba(95, 169, 232, 0.028) 20%, transparent 54%)",
                  pointerEvents: "none",
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: isMobile ? "30%" : "32%",
                  right: isMobile ? "30%" : "32%",
                  top: isMobile ? 20 : 24,
                  bottom: isMobile ? 34 : 38,
                  borderRadius: 999,
                  background:
                    "linear-gradient(180deg, rgba(95, 169, 232, 0.055) 0%, rgba(95, 169, 232, 0.016) 34%, rgba(95, 169, 232, 0) 100%)",
                  filter: "blur(14px)",
                  opacity: 0.7,
                  pointerEvents: "none",
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "20%",
                  right: "20%",
                  bottom: 14,
                  height: 22,
                  borderRadius: 999,
                  background:
                    "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.025) 45%, rgba(255,255,255,0) 76%)",
                  filter: "blur(8px)",
                  pointerEvents: "none",
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "22%",
                  right: "22%",
                  bottom: 10,
                  height: 1,
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0) 100%)",
                  pointerEvents: "none",
                }}
              />
              {teamPhotos[member.name] ? (
	                <RevealImage
	                  src={teamPhotos[member.name]}
	                  alt={member.name}
	                  style={styles.teamPhoto as React.CSSProperties}
	                  loading="lazy"
	                  decoding="async"
	                  fetchPriority="low"
	                />
              ) : (
                <div style={styles.memberAvatar}>{member.initials}</div>
              )}
              </div>

              <div style={{ display: "grid", gap: 9, marginTop: isMobile ? 10 : 14 }}>
                <div>
                  <h3 style={{ ...styles.cardTitle, textAlign: "left", fontSize: isMobile ? 22 : 24 }}>
                    {member.name}
                  </h3>
                  <div
                    aria-hidden="true"
                    style={{
                      width: "64%",
                      height: 1,
                      marginTop: 6,
                      background:
                        "linear-gradient(90deg, rgba(95, 169, 232, 0.82) 0%, rgba(95, 169, 232, 0.26) 58%, rgba(95, 169, 232, 0) 100%)",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "fit-content",
                    padding: "6px 9px",
                    borderRadius: 999,
                    border: `1px solid ${roleStyle.accent}22`,
                    background: `${roleStyle.accent}12`,
                    color: roleStyle.accent,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {roleStyle.label}
                </div>
                <p
                  style={{
                    ...styles.cardText,
                    textAlign: "left",
                    color: "rgba(224, 228, 233, 0.74)",
                    marginTop: 0,
                    lineHeight: 1.52,
                    fontSize: isMobile ? 13.5 : 14,
                  }}
                >
                  {member.role}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </motion.section>
  );
}

export function RoadmapSection() {
  const { disableMotion, isMobile, styles } = useResponsiveStyles();
  const fadeUp = React.useMemo(() => getFadeUp(isMobile), [isMobile]);
  return (
    <motion.section
      id="roadmap"
      style={styles.sectionWrap}
      variants={disableMotion ? undefined : fadeUp}
      initial={disableMotion ? false : "hidden"}
      whileInView={disableMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.15 }}
    >
      <SectionHeading
        eyebrow="Roadmap"
        title="Development timeline"
        description="Key project phases."
      />

      <div style={{ display: "grid", gap: 20 }}>
        {siteData.roadmap.map((item) => (
          <Card key={item.phase}>
            <div style={styles.phaseLabel}>{item.phase}</div>

            <div style={styles.roadmapTitle}>{item.title}</div>

            <p style={styles.cardText}>{item.desc}</p>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}

export function ContactSection() {
  const { disableMotion, isMobile, styles } = useResponsiveStyles();
  return (
    <motion.footer
      id="contact"
      initial={disableMotion ? false : { opacity: 0 }}
      whileInView={disableMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, amount: 0.12 }}
	      transition={disableMotion ? undefined : { duration: 0.55, ease: "easeOut" }}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        marginTop: isMobile ? 78 : 112,
        padding: isMobile
          ? "70px 0 max(28px, env(safe-area-inset-bottom))"
          : "96px 0 34px",
        background:
          "linear-gradient(180deg, rgba(2, 3, 38, 0) 0%, rgba(3, 9, 42, 0.58) 28%, rgba(4, 9, 43, 0.94) 72%, rgba(2, 4, 24, 1) 100%)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          height: 1,
          background:
            "linear-gradient(90deg, rgba(95,169,232,0) 0%, rgba(95,169,232,0.36) 45%, rgba(168,143,255,0.24) 62%, rgba(95,169,232,0) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          height: isMobile ? 110 : 150,
          background:
            "linear-gradient(180deg, rgba(95,169,232,0.10) 0%, rgba(95,169,232,0.025) 40%, rgba(95,169,232,0) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1040,
          margin: "0 auto",
          padding: isMobile ? "0 18px" : "0 30px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "minmax(0, 1.25fr) minmax(160px, 0.48fr) minmax(210px, 0.62fr)",
            gap: isMobile ? 34 : 50,
            alignItems: "start",
            textAlign: isMobile ? "center" : "left",
            minWidth: 0,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: '"Syne", sans-serif',
                fontWeight: 700,
                fontSize: isMobile ? 26 : 34,
                lineHeight: 1,
                letterSpacing: "-0.045em",
                color: "#F8FAFC",
              }}
            >
              {siteData.project.name}
            </div>
            <div
              aria-hidden="true"
              style={{
                width: isMobile ? 90 : 124,
                height: 1,
                margin: isMobile ? "16px auto 18px" : "18px 0 20px",
                background:
                  "linear-gradient(90deg, rgba(95,169,232,0.92) 0%, rgba(95,169,232,0.25) 66%, rgba(95,169,232,0) 100%)",
              }}
            />
            <p
              style={{
                margin: 0,
                color: "#d7e2f1",
                lineHeight: 1.72,
                fontSize: isMobile ? 14 : 15,
                maxWidth: isMobile ? "100%" : 440,
              }}
            >
              Multisensory wearable navigation, built to improve confidence,
              awareness, and safer movement.
            </p>
            <p
              style={{
                margin: "18px 0 0",
                color: "rgba(224, 228, 233, 0.58)",
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              {siteData.project.acknowledgements}
            </p>
          </div>

          <nav aria-label="Footer navigation" style={{ minWidth: 0 }}>
            <div style={{ ...styles.label, marginBottom: 16, textAlign: isMobile ? "center" : "left" }}>
              Navigate
            </div>
            <div
              style={{
                display: "grid",
                gap: 10,
                justifyItems: isMobile ? "center" : "start",
              }}
            >
              {siteData.nav.map((item) => (
                <a
                  key={item}
                  href={`#${sectionIds[item as keyof typeof sectionIds]}`}
                  style={{
                    color: "rgba(224, 228, 233, 0.76)",
                    textDecoration: "none",
                    fontSize: 14,
                    lineHeight: 1.35,
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(event) => {
                    const element = event.currentTarget as HTMLAnchorElement;
                    element.style.color = colors.cyan2;
                  }}
                  onMouseLeave={(event) => {
                    const element = event.currentTarget as HTMLAnchorElement;
                    element.style.color = "rgba(224, 228, 233, 0.76)";
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </nav>

          <div style={{ minWidth: 0 }}>
            <div style={{ ...styles.label, marginBottom: 16, textAlign: isMobile ? "center" : "left" }}>
              Contact
            </div>
            <div style={{ display: "grid", gap: 14, justifyItems: isMobile ? "center" : "start" }}>
              <a
                href={`mailto:${siteData.project.email}`}
                style={{
                  color: "#F8FAFC",
                  textDecoration: "none",
                  fontSize: isMobile ? 14 : 15,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  lineHeight: 1.35,
                  transition: "color 0.2s ease",
                  maxWidth: "100%",
                  minWidth: 0,
                  overflowWrap: "anywhere",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = colors.cyan2;
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = "#F8FAFC";
                }}
              >
                <Mail size={16} style={{ flexShrink: 0 }} />
                <span
                  style={{
                    minWidth: 0,
                    overflowWrap: "anywhere",
                  }}
                >
                  {siteData.project.email}
                </span>
              </a>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                {siteData.project.linkedin ? (
                  <a
                    href={siteData.project.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: colors.cyan2, opacity: 0.84, transition: "opacity 0.2s ease" }}
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                ) : null}
                <a
                  href={`mailto:${siteData.project.email}`}
                  style={{ color: colors.cyan2, opacity: 0.84, transition: "opacity 0.2s ease" }}
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: isMobile ? 38 : 54,
            paddingTop: isMobile ? 18 : 22,
            borderTop: "1px solid rgba(95, 169, 232, 0.12)",
            display: "flex",
            justifyContent: isMobile ? "center" : "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 14,
            textAlign: isMobile ? "center" : "left",
            color: "rgba(224, 228, 233, 0.58)",
            fontSize: 12,
            minWidth: 0,
          }}
        >
          <p style={{ margin: 0, minWidth: 0 }}>
            {siteData.project.name} 2026
          </p>
          <p style={{ margin: 0, minWidth: 0 }}>Designed with clarity and credibility.</p>
        </div>
      </div>
    </motion.footer>
  );
}
