import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { siteData, colors } from "../data/siteData";
import { getStyles } from "../styles";
import { Card } from "./ui";
import { withBaseUrl } from "../utils/assetUrl";
import { useIsMobile } from "../hooks/useIsMobile";

// Custom scrollbar styles
const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(92, 110, 215, 0.04);
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, rgba(92, 110, 215, 0.4) 0%, rgba(140, 76, 255, 0.3) 100%);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, rgba(92, 110, 215, 0.6) 0%, rgba(140, 76, 255, 0.5) 100%);
  }
  
  select {
    color-scheme: dark;
  }
  
  select option {
    background: linear-gradient(135deg, rgba(18, 20, 60, 0.95) 0%, rgba(22, 25, 70, 0.9) 100%);
    color: #E0E4E9;
    padding: 10px 8px;
    border: 1px solid rgba(92, 110, 215, 0.2);
    margin: 4px 0;
  }
  
  select option:hover {
    background: linear-gradient(135deg, rgba(40, 50, 100, 0.9) 0%, rgba(45, 55, 110, 0.85) 100%);
    border-color: rgba(92, 110, 215, 0.4);
  }
  
  select option:checked {
    background: linear-gradient(135deg, rgba(50, 60, 120, 0.95) 0%, rgba(55, 65, 130, 0.9) 100%);
    border-color: rgba(92, 110, 215, 0.4);
    color: #E0E4E9;
    box-shadow: 0 0 8px rgba(92, 110, 215, 0.15);
  }
`;

export function BlogPage({ onClose }: { onClose: () => void }) {
  const isMobile = useIsMobile();
  const styles = getStyles(isMobile);
  const [activeTab, setActiveTab] = useState("all");
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  let filteredPosts =
    activeTab === "all"
      ? siteData.updates
      : siteData.updates.filter((p) => p.category === activeTab);

  // Filter by search query (title, summary, content, or date)
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter((p) =>
      p.title.toLowerCase().includes(query) ||
      p.summary.toLowerCase().includes(query) ||
      p.content.toLowerCase().includes(query) ||
      p.date.toLowerCase().includes(query)
    );
  }

  // Sort by date
  filteredPosts = [...filteredPosts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <>
      <style>{scrollbarStyles}</style>
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(2, 3, 38, 0.6)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={onClose}
      >
        <motion.div
          style={{
            background: `linear-gradient(135deg, rgba(18, 20, 60, 0.7) 0%, rgba(22, 25, 70, 0.65) 100%)`,
            borderRadius: "20px",
            border: `1px solid rgba(92, 110, 215, 0.25)`,
            boxShadow: `
              0 0 40px rgba(92, 110, 215, 0.08),
              0 0 80px rgba(140, 76, 255, 0.04),
              inset 0 0 40px rgba(92, 110, 215, 0.02)
            `,
            maxWidth: "1000px",
            maxHeight: "85vh",
            overflow: "auto",
            width: "100%",
            position: "relative",
          }}
          initial={{ scale: 0.92, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 30 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.div
            style={{
              position: "sticky",
              top: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "28px 32px",
              borderBottom: `1px solid rgba(92, 110, 215, 0.15)`,
              background: `linear-gradient(135deg, rgba(18, 20, 60, 0.8) 0%, rgba(22, 25, 70, 0.7) 100%)`,              backdropFilter: "blur(12px)",
              zIndex: 10,
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: "600",
              background: `linear-gradient(135deg, #8B9FE8 0%, #B88FFF 100%)`,                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              All Blog Updates
            </h2>
            <button
              onClick={onClose}
              style={{
                background: "rgba(92, 110, 215, 0.12)",
                border: `1px solid rgba(92, 110, 215, 0.25)`,
                color: colors.text,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                borderRadius: "10px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "rgba(92, 110, 215, 0.2)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "rgba(92, 110, 215, 0.12)";
              }}
            >
              <X size={24} />
            </button>
          </motion.div>


          {/* Search and Sort Controls */}
          <motion.div
            style={{
              display: "flex",
              gap: "12px",
              padding: "16px 32px",
              borderBottom: `1px solid rgba(92, 110, 215, 0.15)`,
              background: `linear-gradient(135deg, rgba(18, 20, 60, 0.45) 0%, rgba(22, 25, 70, 0.35) 100%)`,
              backdropFilter: "blur(8px)",
              flexWrap: "wrap",
              alignItems: "center",
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <input
              type="text"
              placeholder="Search updates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: "1",
                minWidth: "200px",
                padding: "8px 12px",
                background: "rgba(92, 110, 215, 0.1)",
                border: `1px solid rgba(92, 110, 215, 0.2)`,
                borderRadius: "8px",
                color: colors.text,
                fontSize: "14px",
                outline: "none",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.background = "rgba(92, 110, 215, 0.15)";
                e.currentTarget.style.borderColor = "rgba(92, 110, 215, 0.4)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.background = "rgba(92, 110, 215, 0.1)";
                e.currentTarget.style.borderColor = "rgba(92, 110, 215, 0.2)";
              }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                onClick={() => setSortOrder("newest")}
                style={{
                  ...styles.tabButton,
                  ...(sortOrder === "newest" ? styles.tabButtonActive : {}),
                  minWidth: 110,
                  background: sortOrder === "newest"
                    ? "linear-gradient(135deg, rgba(92, 110, 215, 0.18) 0%, rgba(140, 76, 255, 0.13) 100%)"
                    : "rgba(92, 110, 215, 0.06)",
                  borderColor: sortOrder === "newest"
                    ? "rgba(92, 110, 215, 0.45)"
                    : "rgba(92, 110, 215, 0.15)",
                  color: colors.text,
                  fontWeight: 700,
                  fontSize: 14,
                  boxShadow: sortOrder === "newest"
                    ? "0 0 12px rgba(92, 110, 215, 0.12)"
                    : "none",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
              >
                Newest First
              </button>
              <button
                type="button"
                onClick={() => setSortOrder("oldest")}
                style={{
                  ...styles.tabButton,
                  ...(sortOrder === "oldest" ? styles.tabButtonActive : {}),
                  minWidth: 110,
                  background: sortOrder === "oldest"
                    ? "linear-gradient(135deg, rgba(92, 110, 215, 0.18) 0%, rgba(140, 76, 255, 0.13) 100%)"
                    : "rgba(92, 110, 215, 0.06)",
                  borderColor: sortOrder === "oldest"
                    ? "rgba(92, 110, 215, 0.45)"
                    : "rgba(92, 110, 215, 0.15)",
                  color: colors.text,
                  fontWeight: 700,
                  fontSize: 14,
                  boxShadow: sortOrder === "oldest"
                    ? "0 0 12px rgba(92, 110, 215, 0.12)"
                    : "none",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
              >
                Oldest First
              </button>
            </div>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            style={{
              display: "flex",
              gap: "8px",
              padding: "20px 32px",
              borderBottom: `1px solid rgba(92, 110, 215, 0.15)`,
              overflowX: "auto",
              background: `linear-gradient(135deg, rgba(18, 20, 60, 0.55) 0%, rgba(22, 25, 70, 0.45) 100%)`,
              backdropFilter: "blur(8px)",
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {["all", "Development", "Research", "Testing", "Partnerships", "Design"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    ...styles.tabButton,
                    ...(activeTab === tab
                      ? {
                          ...styles.tabButtonActive,
                          background: `linear-gradient(135deg, rgba(92, 110, 215, 0.2) 0%, rgba(120, 130, 255, 0.15) 100%)`,
                          borderColor: `rgba(92, 110, 215, 0.45)`,
                          boxShadow: `0 0 12px rgba(92, 110, 215, 0.12)`,
                        }
                      : {
                          background: "rgba(92, 110, 215, 0.06)",
                          border: `1px solid rgba(92, 110, 215, 0.15)`,
                        }),
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    if (activeTab !== tab) {
                      el.style.background = "rgba(92, 110, 215, 0.12)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    if (activeTab !== tab) {
                      el.style.background = "rgba(92, 110, 215, 0.06)";
                    }
                  }}
                >
                  {tab}
                </button>
              )
            )}
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
              padding: "32px",
            }}
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.02,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            {filteredPosts.map((post) => (
              <motion.div
                key={`${post.title}-${post.date}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: "easeOut" },
                  },
                }}
              >
                <Card>
                <div style={styles.blogTopRow}>
                  <span
                    style={styles.categoryPill}
                  >
                    {post.category}
                  </span>
                  <span style={styles.smallMuted}>{post.date}</span>
                </div>
                <h3
                  style={{
                    ...styles.cardTitle,
                    color: colors.text,
                  }}
                >
                  {post.title}
                </h3>
                <p style={{...styles.smallMuted, fontSize: "13px", marginBottom: "12px"}}>
                  By {post.author}
                </p>
                <p style={styles.cardText}>{post.summary}</p>
                <AnimatePresence>
                  {expandedPost === `${post.title}-${post.date}` && (
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
                <button
                  onClick={() =>
                    setExpandedPost(
                      expandedPost === `${post.title}-${post.date}`
                        ? null
                        : `${post.title}-${post.date}`
                    )
                  }
                  style={{
                    ...styles.linkButton,
                    color: "#8B9FE8",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.color = "#A8B5FF";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.color = "#8B9FE8";
                  }}
                >
                  {expandedPost === `${post.title}-${post.date}`
                    ? "Hide full update"
                    : "Read full update"}{" "}
                  <ChevronRight size={16} />
                </button>
                {post.reportPdfUrl ? (
                  <a
                    href={post.reportAvailable ? withBaseUrl(post.reportPdfUrl) : undefined}
                    download={post.reportAvailable}
                    aria-disabled={!post.reportAvailable}
                    onClick={(event) => {
                      if (!post.reportAvailable) {
                        event.preventDefault();
                      }
                    }}
                    style={{
                      ...styles.linkButton,
                      display: "inline-flex",
                      marginLeft: 12,
                      opacity: post.reportAvailable ? 1 : 0.62,
                      cursor: post.reportAvailable ? "pointer" : "not-allowed",
                    }}
                  >
                    {post.reportAvailable ? "Download report" : "Report coming soon"}
                  </a>
                ) : null}
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
