import React, { useMemo, useState } from "react";
import navisenseLogo from "../assets/navisense-logo.png";
import ProjectProposal from "../public/Project_Proposal.pdf";
import vesticon from "../assets/vesticon.png";

import {
  ArrowDown,
  CalendarDays,
  ChevronRight,
  Clock3,
  ExternalLink,
  Mail,
  FileText,
  Linkedin,
  Sparkles,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";
import { sectionIds, siteData, colors } from "../data/siteData"
import { styles } from "../styles"
import { Badge, Button, Card, Dot, ProgressBar } from "./ui"
import daniel from "../assets/daniel.png";
import david from "../assets/david.png";
import francisco from "../assets/francisco.png";
import fred from "../assets/fred.png";
import raquel from "../assets/raquel.png";
import tiago from "../assets/tiago.png";
import { CrystalCircuitAnimation } from "./CrystalCircuitAnimation";


export function Header() {
  const isMobile = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
  const MobileNav = React.lazy(() => import("./MobileNav"));
  return (
    <header style={styles.header}>
      <div style={styles.headerInner}>
        <a href="#top" style={styles.brandTextOnly}>
          NAVISense
        </a>
        {isMobile ? (
          <React.Suspense fallback={null}>
            <MobileNav />
          </React.Suspense>
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
              href="/Project_Proposal.pdf"
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
  return (
    <div
  style={{
    maxWidth: 900,
    margin: "0 auto 36px auto",
    textAlign: "center",
  }}
>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {description ? (
        <p style={styles.sectionDescription}>{description}</p>
      ) : null}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, React.CSSProperties> = {
    Done: { background: "rgba(16,185,129,0.16)", color: "#a7f3d0", borderColor: "rgba(16,185,129,0.25)" },
    "In Progress": { background: "rgba(34,211,238,0.16)", color: "#a5f3fc", borderColor: "rgba(34,211,238,0.25)" },
    "To Do": { background: "rgba(148,163,184,0.16)", color: "#cbd5e1", borderColor: "rgba(148,163,184,0.25)" },
    Delayed: { background: "rgba(244,63,94,0.16)", color: "#fecdd3", borderColor: "rgba(244,63,94,0.25)" },
  };
  return <span style={{ ...styles.statusBadge, ...map[status] }}>{status}</span>;
}

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, React.CSSProperties> = {
    High: { background: "rgba(245,158,11,0.16)", color: "#fde68a", borderColor: "rgba(245,158,11,0.25)" },
    Medium: { background: "rgba(168,85,247,0.16)", color: "#e9d5ff", borderColor: "rgba(168,85,247,0.25)" },
    Low: { background: "rgba(148,163,184,0.16)", color: "#cbd5e1", borderColor: "rgba(148,163,184,0.25)" },
  };
  return <span style={{ ...styles.statusBadge, ...map[priority] }}>{priority}</span>;
}

function BlogCard({ post }: { post: (typeof siteData.updates)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <div style={styles.blogTopRow}>
        <span style={styles.categoryPill}>{post.category}</span>
        <span style={styles.smallMuted}>{post.date}</span>
      </div>
      <h3 style={styles.cardTitle}>{post.title}</h3>
      <p style={{...styles.smallMuted, fontSize: "13px", marginBottom: "12px"}}>
        By {post.author}
      </p>
      <p style={styles.cardText}>{post.summary}</p>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <p style={styles.cardText}>{post.content}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setOpen(!open)} style={styles.linkButton}>
        {open ? "Hide full update" : "Read full update"} <ChevronRight size={16} />
      </button>
    </Card>
  );
}

export function HeroSection() {
  return (
    <motion.section
      id="top"
      style={styles.heroSection}
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div style={styles.heroInner} variants={fadeUp}>
        <motion.h1 style={styles.heroTitleSingleLine} variants={fadeUp}>
          NAVISense
        </motion.h1>

        <motion.div style={styles.heroVestRow} variants={fadeUp}>
          <span style={styles.heroVestText}>Vest</span>

          <img
            src={vesticon}
            alt="NAVISense icon"
            style={styles.heroVestIcon}
            role="img"
            aria-label="NAVISense icon"
          />
        </motion.div>

        <motion.p style={styles.heroSubtitle} variants={fadeUp}>
          A wearable multisensory system designed to improve safe navigation,
          spatial awareness, and independent mobility through sensing, haptic
          feedback, and connected monitoring.
        </motion.p>


        <motion.div style={styles.heroTags} variants={fadeUp}>
          <span>Wearable sensing</span>
          <Dot />
          <span>Haptic guidance</span>
          <Dot />
          <span>Connected monitoring</span>
          <Dot />
          <span>Validation-ready architecture</span>
        </motion.div>

        <motion.a href="#about" style={styles.scrollLink} variants={fadeUp}>
          Scroll to explore <ArrowDown size={16} />
        </motion.a>
      </motion.div>
    </motion.section>
  );
}



import { AlertTriangle, Eye, Lightbulb } from "lucide-react";
import { LightningAnimation } from "./LightningAnimation";

export function AboutSection() {
  return (
    <motion.section
      id="about"
      style={styles.sectionWrap}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
    >
      <SectionHeading
        eyebrow="About the project"
        title="Safer Navigation"
        description=""
      />


      {/* Three-Column Main Concepts with animated icons */}
      <div style={styles.threeGrid}>
        <Card>
          <motion.div style={styles.blockGroup} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <motion.div
              style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}
              whileHover={{ scale: 1.13, rotate: -8 }}
              transition={{ type: "spring", stiffness: 220, damping: 12 }}
            >
              <AlertTriangle size={32} color="#5FA9E8" />
            </motion.div>
            <div style={styles.label}>Why it exists</div>
            <p style={styles.longText}>{siteData.about.problem}</p>
          </motion.div>
        </Card>

        <Card>
          <motion.div style={styles.blockGroup} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <motion.div
              style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}
              whileHover={{ scale: 1.13, rotate: 8 }}
              transition={{ type: "spring", stiffness: 220, damping: 12 }}
            >
              <Eye size={32} color="#A88FFF" />
            </motion.div>
            <div style={styles.label}>Why it matters</div>
            <p style={styles.longText}>{siteData.about.importance}</p>
          </motion.div>
        </Card>

        <Card>
          <motion.div style={styles.blockGroup} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
            <motion.div
              style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}
              whileHover={{ scale: 1.13, rotate: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 12 }}
            >
              <Lightbulb size={32} color="#FFD966" />
            </motion.div>
            <div style={styles.label}>Vision</div>
            <p style={styles.longText}>{siteData.about.vision}</p>
          </motion.div>
        </Card>
      </div>

      {/* Beneficiaries Section */}
      <div style={{ marginTop: "48px" }}>
        <h3 style={{ ...styles.label, marginBottom: "24px" }}>Who benefits</h3>
        <div style={styles.fourGrid}>
          {siteData.about.beneficiaries.map((item) => (
            <Card key={item.title}>
              <div style={styles.iconChip}>
                <Users size={18} />
              </div>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.cardText}>{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export function SolutionSection() {
  return (
    <motion.section
      id="solution"
      style={styles.sectionWrap}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
    >
      <SectionHeading
        eyebrow="Solution and features"
        title="Premium Architecture"
        description=""
      />

      <div style={styles.threeGrid}>
        {siteData.features.map((feature) => {
          const Icon = feature.icon;

          return (
            <Card key={feature.title}>
              <div style={styles.iconChip}>
                <Icon size={18} />
              </div>

              <h3 style={styles.cardTitle}>{feature.title}</h3>

              <p style={styles.cardText}>{feature.desc}</p>
            </Card>
          );
        })}
      </div>
    </motion.section>
  );
}

export function PartnersSection() {
  return (
    <motion.section
      id="partners"
      style={styles.sectionWrap}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
    >
      <SectionHeading
        eyebrow="Partners"
        title="Meet our partners"
        description=""
      />

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(220px, 1fr))",
        gap: 40,
        justifyContent: "center",
        alignItems: "stretch",
        margin: "0 auto",
        maxWidth: 600,
      }}>
        {siteData.partners
          .filter(p => p.type !== "Community Partner" && p.type !== "Support Partner")
          .map((partner, idx) => (
            <Card key={`${partner.name}-${idx}`}>
              <div style={styles.logoBox}>{partner.logo}</div>

              <h3 style={styles.cardTitle}>{partner.name}</h3>

              <div style={styles.partnerType}>{partner.type}</div>

              <p style={styles.cardText}>{partner.desc}</p>
            </Card>
          ))}
      </div>
    </motion.section>
  );
}

export function UpdatesSection({ onOpenBlog }: { onOpenBlog?: () => void }) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredPosts =
    activeTab === "all"
      ? siteData.updates
      : siteData.updates.filter((p) => p.category === activeTab);

  const displayedPosts = filteredPosts.slice(0, 3);
  const hasMore = filteredPosts.length > 3;

  return (
    <motion.section
      id="updates"
      style={styles.sectionWrap}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
    >
      <SectionHeading
        eyebrow="Weekly blog"
        title="Week-by-week development updates"
        description=""
      />

      <div style={styles.tabsWrap}>
        {["all", "Development", "Research", "Testing", "Partnerships", "Design"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                ...styles.tabButton,
                ...(activeTab === tab ? styles.tabButtonActive : {}),
              }}
            >
              {tab}
            </button>
          )
        )}
      </div>

      <div style={styles.threeGrid}>
        {displayedPosts.map((post) => (
          <BlogCard key={`${post.title}-${post.date}`} post={post} />
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

  return (
    <motion.section
      id="tracker"
      style={styles.sectionWrap}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
    >
      <SectionHeading
        eyebrow="Task tracker"
        title="Progress Tracker"
        description=""
      />

      <div style={styles.twoColGridAlt}>
        <Card>
          <h3 style={styles.cardTitle}>Milestone tracker</h3>
          <p style={styles.cardText}>
            Edit owners, priorities, due dates, and progress directly in the data array.
          </p>

          <div style={{ display: "grid", gap: 16, marginTop: 18 }}>
            {siteData.tracker.map((task) => (
              <div key={task.title} style={styles.taskCard}>
                <div style={styles.taskTop}>
                  <div>
                    <div style={styles.taskBadgesRow}>
                      <h3 style={{ ...styles.cardTitle, margin: 0 }}>{task.title}</h3>
                      <StatusBadge status={task.status} />
                      <PriorityBadge priority={task.priority} />
                    </div>

                    <div style={styles.metaRow}>
                      <span style={styles.metaItem}>
                        <Users size={14} /> {task.owner}
                      </span>
                      <span style={styles.metaItem}>
                        <CalendarDays size={14} /> {task.due}
                      </span>
                    </div>
                  </div>

                  <div style={styles.progressText}>{task.progress}% complete</div>
                </div>

                <ProgressBar value={task.progress} />
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display: "grid", gap: 24 }}>
          <Card>
            <h3 style={styles.cardTitle}>Status overview</h3>

            <div style={styles.twoGrid}>
              {Object.entries(groupedTracker).map(([status, items]) => (
                <div key={status} style={styles.statusPanel}>
                  <div style={styles.statusPanelHeader}>
                    <div style={{ fontWeight: 600 }}>{status}</div>
                    <div style={{ color: "#5FA9E8" }}>{items.length}</div>
                  </div>

                  <div style={{ display: "grid", gap: 8 }}>
                    {items.map((item) => (
                      <div key={item.title} style={styles.statusItem}>
                        {item.title}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 style={styles.cardTitle}>Mini calendar roadmap</h3>
            <p style={styles.cardText}>
              A simplified time view inspired by the proposal timeline.
            </p>

            <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
              {[
                ["February", "Website launch · Materials list"],
                ["March", "Prototype development starts"],
                ["April", "Testing workflow begins"],
                ["May", "Poster and demo assets"],
                ["June", "Final showcase"],
              ].map(([month, text]) => (
                <div key={month} style={styles.monthRow}>
                  <div style={styles.monthLabel}>{month}</div>
                  <div style={styles.cardText}>{text}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </motion.section>
  );
}

export function TeamSection() {
  const teamPhotos: Record<string, string> = {
    "Francisco Mariquitos": francisco,
    "Raquel Barroso": raquel,
    "Daniel Khom'yak": daniel,
    "David Reimer": david,
    "Tiago Pinto": tiago,
    "Frederico Pinto": fred,
  };

  return (
    <motion.section
      id="team"
      style={styles.sectionWrap}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
    >
      <SectionHeading
        eyebrow=""
        title="Project development team"
        description=""
      />

      <div style={styles.teamGrid}>
        {siteData.team.map((member) => (
          <Card key={member.name}>
            <div style={styles.teamCardTop}>
              <div style={styles.teamIcons}>
                <a
                  href={member.cv}
                  style={styles.teamIconLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${member.name} CV`}
                >
                  <FileText size={16} />
                </a>

                <a
                  href={`mailto:${member.email}`}
                  style={styles.teamIconLink}
                  aria-label={`${member.name} email`}
                >
                  <Mail size={16} />
                </a>

                <a
                  href={member.linkedin}
                  style={styles.teamIconLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>

            <div style={styles.teamPhotoWrap}>
              <img
                src={teamPhotos[member.name]}
                alt={member.name}
                style={styles.teamPhoto}
              />
            </div>

            <h3 style={styles.cardTitle}>{member.name}</h3>
            <p style={styles.cardText}>{member.role}</p>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}

export function RoadmapSection() {
  return (
    <motion.section
      id="roadmap"
      style={styles.sectionWrap}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
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
  return (
    <footer
      id="contact"
      style={{
        marginTop: 120,
        padding: "0 0 0 0",
        borderTop: `1px solid rgba(35, 197, 255, 0.13)`,
        background: "linear-gradient(180deg, rgba(2, 3, 38, 0.7) 60%, rgba(35,197,255,0.08) 100%)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 -2px 32px 0 rgba(35,197,255,0.08)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 24px 0 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 40 }}>
          {/* About */}
          <div style={{ minWidth: 220, flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 22, color: colors.cyan2, letterSpacing: "-0.02em", marginBottom: 12 }}>{siteData.project.name}</div>
            <p style={{ ...styles.cardText, opacity: 0.8, fontSize: 14, margin: 0, marginBottom: 12 }}>{siteData.project.acknowledgements}</p>
          </div>

          {/* Contact & Social */}
          <div style={{ minWidth: 220, flex: 1 }}>
            <div style={{ ...styles.label, marginBottom: 16 }}>Contact</div>
            <a
              href={`mailto:${siteData.project.email}`}
              style={{
                color: colors.cyan2,
                textDecoration: "none",
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 10,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = colors.cyan;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = colors.cyan2;
              }}
            >
              <Mail size={16} />
              {siteData.project.email}
            </a>
            <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
              <a href={siteData.project.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: colors.cyan2, opacity: 0.8, transition: "all 0.2s" }} aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${siteData.project.email}`} style={{ color: colors.cyan2, opacity: 0.8, transition: "all 0.2s" }} aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Navigation (moved below) */}
        <div style={{ marginTop: 40, marginBottom: 0, textAlign: "center" }}>
          <div style={{ ...styles.label, marginBottom: 16 }}>Navigate</div>
          <div style={{ display: "flex", flexDirection: "row", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
            {siteData.nav.map((item) => (
              <a
                key={item}
                href={`#${sectionIds[item as keyof typeof sectionIds]}`}
                style={{
                  color: styles.cardText.color,
                  textDecoration: "none",
                  fontSize: 14,
                  opacity: 0.8,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = colors.cyan2;
                  el.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = styles.cardText.color;
                  el.style.opacity = "0.8";
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div
          style={{
            borderTop: `1px solid rgba(35, 197, 255, 0.08)`,
            paddingTop: 24,
            marginTop: 40,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 13,
              opacity: 0.6,
              color: styles.cardText.color,
            }}
          >
            © 2026 {siteData.project.name}. All rights reserved.
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              opacity: 0.6,
              color: styles.cardText.color,
            }}
          >
            Designed with clarity and credibility.
          </p>
        </div>
      </div>
    </footer>
  );
}

{/* Visual separation: subtle top glow */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 18,
          background: "linear-gradient(180deg, rgba(35,197,255,0.18) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }} />
