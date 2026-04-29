import React from "react";
import {
  Calendar,
  Download,
  Newspaper,
  Search,
  X,
} from "lucide-react";
import { colors, siteData } from "../data/siteData";
import { withBaseUrl } from "../utils/assetUrl";
import { useResponsive } from "../context/ResponsiveContext";

type BlogPost = (typeof siteData.updates)[number];

type MonthGroup = {
  key: string;
  label: string;
  posts: BlogPost[];
};

function getPostKey(post: BlogPost) {
  return `${post.date}-${post.title}`;
}

function getMonthKey(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getMonthLabel(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getCategoryColor(category: string) {
  const colorMap: Record<string, string> = {
    Development: "#5FA9E8",
    Partnerships: "#A88FFF",
    Design: "#FFD966",
    Testing: "#a7f3d0",
    Research: "#a5f3fc",
  };

  return colorMap[category] || "#E0E4E9";
}

function hasDownloadableReport(post: BlogPost) {
  return Boolean(post.reportPdfUrl && post.reportAvailable);
}

function groupPostsByMonth(posts: BlogPost[]): MonthGroup[] {
  const groups = new Map<string, MonthGroup>();

  posts.forEach((post) => {
    const key = getMonthKey(post.date);

    if (!groups.has(key)) {
      groups.set(key, {
        key,
        label: getMonthLabel(post.date),
        posts: [],
      });
    }

    groups.get(key)?.posts.push(post);
  });

  return Array.from(groups.values()).sort((leftMonth, rightMonth) =>
    rightMonth.key.localeCompare(leftMonth.key)
  );
}

function cardSurfaceStyle(isMobile: boolean): React.CSSProperties {
  return {
    background: isMobile
      ? "linear-gradient(160deg, rgba(14, 20, 54, 0.58) 0%, rgba(18, 24, 62, 0.62) 54%, rgba(22, 22, 66, 0.50) 100%)"
      : "linear-gradient(160deg, rgba(14, 20, 54, 0.46) 0%, rgba(18, 24, 62, 0.50) 52%, rgba(22, 22, 66, 0.40) 100%)",
    border: "1px solid rgba(255, 255, 255, 0.09)",
    borderRadius: isMobile ? 18 : 20,
    boxShadow: isMobile
      ? "0 14px 30px rgba(2, 6, 23, 0.16)"
      : "0 18px 42px rgba(2, 6, 23, 0.14)",
  };
}

export const BlogPageNew = React.memo(function BlogPageNew({
  onClose,
  selectedPost,
  onPostSelected,
}: {
  onClose: () => void;
  selectedPost?: BlogPost | null;
  onPostSelected?: () => void;
}) {
  const { disableMotion, isMobile } = useResponsive();
  const [expandedPostKey, setExpandedPostKey] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const postRefs = React.useRef<Record<string, HTMLElement | null>>({});

  const allPosts = React.useMemo(
    () =>
      [...siteData.updates].sort(
        (leftPost, rightPost) =>
          new Date(rightPost.date).getTime() - new Date(leftPost.date).getTime()
      ),
    []
  );

  const categories = React.useMemo(
    () => Array.from(new Set(siteData.updates.map((post) => post.category))),
    []
  );

  const filteredPosts = React.useMemo(() => {
    let posts = allPosts;

    if (selectedCategory) {
      posts = posts.filter((post) => post.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      posts = posts.filter((post) => {
        const dateText = formatDate(post.date).toLowerCase();

        return (
          post.title.toLowerCase().includes(query) ||
          post.summary.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query) ||
          dateText.includes(query)
        );
      });
    }

    return posts;
  }, [allPosts, searchQuery, selectedCategory]);

  const monthGroups = React.useMemo(() => groupPostsByMonth(filteredPosts), [filteredPosts]);
  const latestPost = filteredPosts[0] ?? allPosts[0] ?? null;
  const hasFilters = Boolean(searchQuery.trim() || selectedCategory);

  React.useEffect(() => {
    if (!selectedPost) {
      return;
    }

    const selectedKey = getPostKey(selectedPost);
    setExpandedPostKey(selectedKey);
    setSearchQuery("");
    setSelectedCategory(null);
    onPostSelected?.();

    const timeoutId = window.setTimeout(() => {
      postRefs.current[selectedKey]?.scrollIntoView({
        behavior: disableMotion ? "auto" : "smooth",
        block: "center",
      });
    }, 60);

    return () => window.clearTimeout(timeoutId);
  }, [disableMotion, onPostSelected, selectedPost]);

  React.useEffect(() => {
    if (!expandedPostKey) {
      return;
    }

    const stillVisible = filteredPosts.some(
      (post) => getPostKey(post) === expandedPostKey
    );

    if (!stillVisible) {
      setExpandedPostKey(null);
    }
  }, [expandedPostKey, filteredPosts]);

  const shellStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    overflowY: "auto",
    overscrollBehavior: "contain",
    background: isMobile
      ? `
        radial-gradient(circle at 16% 18%, rgba(168, 143, 255, 0.070) 0%, transparent 30%),
        radial-gradient(circle at 86% 10%, rgba(95, 169, 232, 0.055) 0%, transparent 31%),
        linear-gradient(115deg, #01031f 0%, #03104a 34%, #11145f 62%, #12083e 100%)
      `
      : `
        radial-gradient(circle at 14% 74%, rgba(95, 169, 232, 0.055) 0%, transparent 22%),
        radial-gradient(circle at 18% 28%, rgba(168, 143, 255, 0.065) 0%, transparent 28%),
        linear-gradient(115deg, #01031f 0%, #03104a 34%, #11145f 62%, #12083e 100%)
      `,
    color: colors.text,
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    WebkitOverflowScrolling: "touch",
  };

  return (
    <div style={shellStyle}>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background: isMobile
            ? `
              linear-gradient(180deg, rgba(255,255,255,0.030) 0%, transparent 34%),
              radial-gradient(ellipse at 50% 5%, rgba(95, 169, 232, 0.040), transparent 44%),
              radial-gradient(ellipse at 88% 38%, rgba(168, 143, 255, 0.032), transparent 34%)
            `
            : `
              radial-gradient(ellipse at 22% 55%, rgba(95, 169, 232, 0.035), transparent 20%),
              radial-gradient(ellipse at 60% 45%, rgba(168, 143, 255, 0.035), transparent 24%),
              radial-gradient(circle at 82% 12%, rgba(168, 143, 255, 0.04) 0%, transparent 23%)
            `,
        }}
      />

      <div style={{ position: "relative", minHeight: "100%", paddingBottom: "max(24px, env(safe-area-inset-bottom))" }}>
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 20,
            backdropFilter: isMobile ? "blur(14px)" : "blur(18px)",
            WebkitBackdropFilter: isMobile ? "blur(14px)" : "blur(18px)",
            background: isMobile
              ? "linear-gradient(180deg, rgba(4,9,42,0.90) 0%, rgba(8,12,54,0.74) 72%, rgba(8,12,54,0.34) 100%)"
              : "linear-gradient(180deg, rgba(4,9,42,0.88) 0%, rgba(8,12,54,0.76) 100%)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
            transition:
              "background 0.26s ease, border-color 0.26s ease, box-shadow 0.26s ease",
            boxShadow: isMobile ? "none" : "0 12px 30px rgba(2, 6, 23, 0.12)",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 1040,
              margin: "0 auto",
              padding: isMobile
                ? "max(12px, env(safe-area-inset-top)) 18px 12px"
                : "14px 30px",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: isMobile ? 14 : 24,
            }}
          >
            <div
              style={{
                minWidth: 0,
                display: "flex",
                alignItems: "center",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px 11px",
                  borderRadius: 999,
                  border: "1px solid rgba(95, 169, 232, 0.16)",
                  background: "rgba(95, 169, 232, 0.075)",
                  color: colors.cyan2,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  width: "fit-content",
                  flexShrink: 0,
                }}
              >
                <Newspaper size={14} />
                Project Journal
              </div>

              {!isMobile ? (
                <div
                  style={{
                    fontFamily: '"Syne", sans-serif',
                    fontSize: 20,
                    lineHeight: 1,
                    letterSpacing: "-0.025em",
                    color: "#F8FAFC",
                    whiteSpace: "nowrap",
                  }}
                >
                  Development updates
                </div>
              ) : null}
            </div>

            <button
              onClick={onClose}
              aria-label="Close blog"
              style={{
                width: 40,
                height: 40,
                borderRadius: 999,
                border: "1px solid rgba(255, 255, 255, 0.10)",
                background: "rgba(255, 255, 255, 0.035)",
                color: colors.text,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                boxShadow: "0 10px 24px rgba(2, 6, 23, 0.10)",
              }}
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {!isMobile ? (
          <section
            style={{
              width: "100%",
              maxWidth: 1040,
              margin: "0 auto",
              padding: "34px 30px 0",
              boxSizing: "border-box",
            }}
          >
            <h1
              style={{
                margin: "0 0 8px",
                fontFamily: '"Syne", sans-serif',
                fontSize: 42,
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                color: "#F8FAFC",
              }}
            >
              Development updates, week by week
            </h1>

            <p
              style={{
                margin: 0,
                color: "rgba(224, 228, 233, 0.72)",
                fontSize: 15,
                lineHeight: 1.7,
                maxWidth: 660,
              }}
            >
              A quieter record of decisions, progress, and project notes as the
              NAVISense prototype develops.
            </p>
          </section>
        ) : null}

        <main
          style={{
            width: "100%",
            maxWidth: 1040,
            margin: "0 auto",
            padding: isMobile ? "22px 18px 0" : "28px 30px 0",
            boxSizing: "border-box",
            display: "grid",
            gap: isMobile ? 24 : 34,
          }}
        >
          <section
            style={{
              ...cardSurfaceStyle(isMobile),
              padding: isMobile ? 16 : 20,
              display: "grid",
              gap: 16,
              background: isMobile
                ? "linear-gradient(160deg, rgba(14, 20, 54, 0.46) 0%, rgba(18, 24, 62, 0.50) 100%)"
                : "linear-gradient(160deg, rgba(14, 20, 54, 0.32) 0%, rgba(18, 24, 62, 0.36) 100%)",
            }}
          >
            <div
              style={{
                display: "grid",
                gap: 14,
                gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) auto",
                alignItems: "center",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  borderRadius: 14,
                  border: "1px solid rgba(255, 255, 255, 0.09)",
                  background: "rgba(255, 255, 255, 0.032)",
                  padding: "12px 14px",
                }}
              >
                <Search size={16} color={colors.muted} />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search updates or authors..."
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: colors.text,
                    fontSize: 14,
                  }}
                />
              </label>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  justifySelf: isMobile ? "start" : "end",
                  color: "rgba(224, 228, 233, 0.62)",
                  fontSize: 13,
                }}
              >
                <span>{filteredPosts.length} updates</span>
                <span aria-hidden="true">/</span>
                <span>{monthGroups.length} months</span>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <button
                onClick={() => setSelectedCategory(null)}
                style={{
                  padding: "8px 11px",
                  borderRadius: 999,
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  background:
                    selectedCategory === null
                      ? "rgba(95, 169, 232, 0.12)"
                      : "rgba(255, 255, 255, 0.025)",
                  color:
                    selectedCategory === null
                      ? "#F8FAFC"
                      : "rgba(224, 228, 233, 0.78)",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  minHeight: isMobile ? 44 : 36,
                }}
              >
                All updates
              </button>

              {categories.map((category) => {
                const active = selectedCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(active ? null : category)}
                    style={{
                      padding: "8px 11px",
                      borderRadius: 999,
                      border: `1px solid ${
                        active
                          ? `${getCategoryColor(category)}33`
                          : "rgba(255, 255, 255, 0.08)"
                      }`,
                      background: active
                        ? `${getCategoryColor(category)}18`
                        : "rgba(255, 255, 255, 0.025)",
                      color: active
                        ? getCategoryColor(category)
                        : "rgba(224, 228, 233, 0.78)",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      minHeight: isMobile ? 44 : 36,
                    }}
                  >
                    {category}
                  </button>
                );
              })}

              {hasFilters ? (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                  }}
                  style={{
                    padding: "8px 11px",
                    borderRadius: 999,
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    background: "rgba(255, 255, 255, 0.025)",
                    color: "rgba(224, 228, 233, 0.72)",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    minHeight: isMobile ? 44 : 36,
                  }}
                >
                  Clear filters
                </button>
              ) : null}
            </div>

          </section>

          {monthGroups.length ? (
            <div style={{ display: "grid", gap: isMobile ? 26 : 34 }}>
              {monthGroups.map((monthGroup) => (
                <section key={monthGroup.key} style={{ display: "grid", gap: isMobile ? 14 : 16 }}>
                  <div
                    style={{
                      display: "grid",
                      gap: isMobile ? 8 : 12,
                      alignItems: "center",
                      gridTemplateColumns: isMobile ? "1fr" : "auto auto 1fr",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: '"Syne", sans-serif',
                        fontSize: isMobile ? 22 : 28,
                        lineHeight: 1.05,
                        letterSpacing: "-0.035em",
                        color: "#F8FAFC",
                      }}
                    >
                      {monthGroup.label}
                    </div>

                    <div
                      style={{
                        color: "rgba(224, 228, 233, 0.56)",
                        fontSize: 12,
                        textTransform: "uppercase",
                        letterSpacing: "0.10em",
                        fontWeight: 700,
                      }}
                    >
                      {monthGroup.posts.length} update
                      {monthGroup.posts.length === 1 ? "" : "s"}
                    </div>

                    <div
                      aria-hidden="true"
                      style={{
                        height: 1,
                        width: "100%",
                        background:
                          "linear-gradient(90deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.026) 100%)",
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gap: isMobile ? 12 : 14 }}>
                    {monthGroup.posts.map((post) => {
                      const postKey = getPostKey(post);
                      const expanded = expandedPostKey === postKey;
                      const categoryColor = getCategoryColor(post.category);
                      const reportIsDownloadable = hasDownloadableReport(post);
                      const isLatest = latestPost
                        ? getPostKey(latestPost) === postKey
                        : false;

                      return (
                        <article
                          key={postKey}
                          ref={(element) => {
                            postRefs.current[postKey] = element;
                          }}
                          style={{
                            ...cardSurfaceStyle(isMobile),
                            padding: isMobile ? 16 : 20,
                            border: expanded
                              ? `1px solid ${categoryColor}30`
                              : "1px solid rgba(255, 255, 255, 0.08)",
                            borderLeft: `2px solid ${categoryColor}${expanded ? "88" : "44"}`,
                            borderRadius: isMobile ? 18 : 20,
                            background: expanded
                              ? "linear-gradient(160deg, rgba(255,255,255,0.054) 0%, rgba(255,255,255,0.024) 100%)"
                              : "linear-gradient(160deg, rgba(255,255,255,0.030) 0%, rgba(255,255,255,0.014) 100%)",
                            display: "grid",
                            gap: 14,
                            boxShadow: expanded
                              ? `0 18px 42px rgba(2, 6, 23, 0.16), 0 0 24px ${categoryColor}10`
                              : "0 12px 28px rgba(2, 6, 23, 0.10)",
                            transition:
                              "border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: 14,
                              flexWrap: "wrap",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 8,
                                alignItems: "center",
                              }}
                            >
                              {isLatest && !hasFilters ? (
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    padding: "5px 9px",
                                    borderRadius: 999,
                                    background: "rgba(95, 169, 232, 0.095)",
                                    border: "1px solid rgba(95, 169, 232, 0.14)",
                                    color: colors.cyan2,
                                    fontSize: 11,
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                  }}
                                >
                                  Latest
                                </span>
                              ) : null}

                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  padding: "5px 9px",
                                  borderRadius: 999,
                                  background: `${categoryColor}12`,
                                  border: `1px solid ${categoryColor}22`,
                                  color: categoryColor,
                                  fontSize: 11,
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.08em",
                                }}
                              >
                                {post.category}
                              </span>

                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 6,
                                  color: "rgba(224, 228, 233, 0.58)",
                                  fontSize: 13,
                                }}
                              >
                                <Calendar size={14} />
                                {formatDate(post.date)}
                              </span>
                            </div>

                            <div
                              style={{
                                color: "rgba(224, 228, 233, 0.56)",
                                fontSize: 13,
                              }}
                            >
                              By {post.author}
                            </div>
                          </div>

                          <div style={{ display: "grid", gap: 10 }}>
                            <h3
                              style={{
                                margin: 0,
                                fontFamily: '"Syne", sans-serif',
                                fontSize: isMobile ? 20 : 23,
                                lineHeight: 1.08,
                                letterSpacing: "-0.035em",
                                color: "#F8FAFC",
                              }}
                            >
                              {post.title}
                            </h3>

                            <p
                              style={{
                                margin: 0,
                                fontSize: isMobile ? 14.5 : 15,
                                lineHeight: 1.74,
                                color: "rgba(224, 228, 233, 0.76)",
                              }}
                            >
                              {post.summary}
                            </p>

                            {expanded ? (
                              <div
                                style={{
                                  padding: isMobile ? "12px 0 0 12px" : "14px 0 0 16px",
                                  borderTop: "1px solid rgba(255,255,255,0.07)",
                                  borderLeft: `1px solid ${categoryColor}46`,
                                }}
                              >
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: isMobile ? 14.5 : 15,
                                    lineHeight: 1.78,
                                    color: "rgba(224, 228, 233, 0.70)",
                                  }}
                                >
                                  {post.content}
                                </p>
                              </div>
                            ) : null}
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: isMobile ? 16 : 10,
                              alignItems: "center",
                            }}
                          >
                            <button
                              onClick={() =>
                                setExpandedPostKey((currentValue) =>
                                  currentValue === postKey ? null : postKey
                                )
                              }
                              style={{
                                padding: "8px 0",
                                borderRadius: 999,
                                border: "none",
                                background: "transparent",
                                color: categoryColor,
                                fontWeight: 700,
                                cursor: "pointer",
                                fontSize: 13,
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                minHeight: isMobile ? 44 : undefined,
                                display: "inline-flex",
                                alignItems: "center",
                              }}
                            >
                              {expanded ? "Show less" : "Read more"}
                            </button>

                            <a
                              href={
                                reportIsDownloadable
                                  ? withBaseUrl(post.reportPdfUrl)
                                  : undefined
                              }
                              download={reportIsDownloadable}
                              aria-disabled={!reportIsDownloadable}
                              title={
                                reportIsDownloadable
                                  ? "Download report"
                                  : "Report will be available soon"
                              }
                              onClick={(event) => {
                                if (!reportIsDownloadable) {
                                  event.preventDefault();
                                }
                              }}
                              style={{
                                padding: "8px 0",
                                borderRadius: 999,
                                border: "none",
                                background: "transparent",
                                color: reportIsDownloadable
                                  ? categoryColor
                                  : "rgba(224, 228, 233, 0.50)",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                textDecoration: "none",
                                fontWeight: 700,
                                fontSize: 13,
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                cursor: reportIsDownloadable ? "pointer" : "not-allowed",
                                minHeight: isMobile ? 44 : undefined,
                              }}
                            >
                              <Download size={15} />
                              {reportIsDownloadable ? "Download report" : "Report coming soon"}
                            </a>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <section
              style={{
                ...cardSurfaceStyle(isMobile),
                padding: isMobile ? 24 : 30,
                textAlign: "center",
              }}
            >
              <Newspaper size={34} style={{ margin: "0 auto 14px", opacity: 0.65 }} />
              <h2
                style={{
                  margin: 0,
                  fontFamily: '"Syne", sans-serif',
                  fontSize: isMobile ? 22 : 26,
                  letterSpacing: "-0.03em",
                }}
              >
                No matching updates
              </h2>
              <p
                style={{
                  margin: "10px auto 0",
                  maxWidth: 520,
                  color: "rgba(224, 228, 233, 0.72)",
                  lineHeight: 1.7,
                }}
              >
                Try clearing the search or selecting a different category to view the journal.
              </p>
            </section>
          )}
        </main>
      </div>
    </div>
  );
});
