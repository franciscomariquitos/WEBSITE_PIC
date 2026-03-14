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
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";
import { sectionIds, siteData } from "../data/siteData"
import { styles } from "../styles"
import { Badge, Button, Card, Dot, ProgressBar } from "./ui"
import daniel from "../assets/daniel.png";
import david from "../assets/david.png";
import francisco from "../assets/francisco.png";
import fred from "../assets/fred.png";
import raquel from "../assets/raquel.png";
import tiago from "../assets/tiago.png";


export function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.headerInner}>
        <a href="#top" style={styles.brandTextOnly}>
          NAVISense
        </a>

        <nav style={styles.navDesktop}>
          {siteData.nav.map((item) => (
            <a
              key={item}
              href={`#${sectionIds[item as keyof typeof sectionIds]}`}
              style={styles.navLink}
            >
              {item}
            </a>
          ))}

          <a
            href={`${import.meta.env.BASE_URL}proposal.pdf`}
            download
            style={styles.downloadButton}
          >
            Download Our Project Proposal
          </a>
        </nav>
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
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
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
      <p style={styles.cardText}>{post.summary}</p>
      <div style={styles.imagePlaceholder}>Optional image slot</div>
      {open && <p style={styles.cardText}>{post.content}</p>}
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
          <span style={styles.heroVestText}>VEST</span>

          <img
            src={vesticon}
            alt="NAVISense icon"
            style={styles.heroVestIcon}
          />
        </motion.div>

        <motion.p style={styles.heroSubtitle} variants={fadeUp}>
          A wearable multisensory system designed to improve safe navigation,
          spatial awareness, and independent mobility through sensing, haptic
          feedback, and connected monitoring.
        </motion.p>

        <motion.div style={styles.heroButtons} variants={fadeUp}>
          <Button>Explore the Project</Button>
        </motion.div>

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
        title="A wearable system designed for safer, more confident navigation"
        description="This section translates the proposal into a clearer public-facing narrative while preserving the core positioning of the project."
      />

      <div style={styles.twoColGrid}>
        <Card>
          <div style={styles.blockGroup}>
            <div style={styles.label}>Why it exists</div>
            <p style={styles.longText}>{siteData.about.problem}</p>
          </div>

          <div style={styles.blockGroup}>
            <div style={styles.label}>Why it matters</div>
            <p style={styles.longText}>{siteData.about.importance}</p>
          </div>

          <div style={styles.blockGroup}>
            <div style={styles.label}>Vision</div>
            <p style={styles.longText}>{siteData.about.vision}</p>
          </div>
        </Card>

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
        title="Technical architecture presented as a premium product narrative"
        description="The proposal describes a system centered on sensing, haptic feedback, localization, communications, and live monitoring."
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
        title="A dedicated partner wall"
        description="Grid structure so collaborators and sponsors can be added easily."
      />

      <div style={styles.fourGrid}>
        {siteData.partners.map((partner, idx) => (
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

export function UpdatesSection() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredPosts =
    activeTab === "all"
      ? siteData.updates
      : siteData.updates.filter((p) => p.category === activeTab);

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
        description="Progress tracking for development, testing and research."
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
        {filteredPosts.map((post) => (
          <BlogCard key={`${post.title}-${post.date}`} post={post} />
        ))}
      </div>
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
        title="A dashboard-like project tracker blending roadmap, calendar, and milestones"
        description="This section is deliberately editable through arrays, making it practical for deadlines, ownership, status labels, and progress monitoring."
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
    <section id="contact" style={{ ...styles.sectionWrap, paddingBottom: 80 }}>
      <div style={styles.contactPanel}>
        <div>
          <Badge>Contact and footer</Badge>
          <h2 style={{ ...styles.sectionTitle, marginTop: 20 }}>Built to present progress with clarity and credibility</h2>
          <p style={styles.sectionDescription}>Use this section for project contact details, social links, acknowledgements, and navigation shortcuts. The entire website is structured for easy long-term maintenance.</p>
          <div style={styles.heroButtons}><Button>{siteData.project.email}</Button><Button secondary>Project media kit</Button></div>
        </div>
        <div style={styles.twoGrid}>
          <Card style={styles.darkPanel}>
            <div style={styles.partnerType}>Navigation</div>
            <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
              {siteData.nav.map((item) => <a key={item} href={`#${sectionIds[item as keyof typeof sectionIds]}`} style={styles.footerLink}>{item}</a>)}
            </div>
          </Card>
          <Card style={styles.darkPanel}>
            <div style={styles.partnerType}>Acknowledgement</div>
            <p style={{ ...styles.cardText, marginTop: 16 }}>{siteData.project.acknowledgements}</p>
            <p style={{ ...styles.cardText, marginTop: 18, display: "flex", alignItems: "center", gap: 8 }}><Mail size={16} /> {siteData.project.email}</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
