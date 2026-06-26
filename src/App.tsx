import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getStyles } from "./styles";
import { siteData } from "./data/siteData";
import { SplashIntro } from "./components/SplashIntro";
import {
  AboutSection,
  ContactSection,
  EcosystemSection,
  Header,
  HeroSection,
  PartnersSection,
  TeamSection,
  TrackerSection,
  UpdatesSection,
} from "./components/sections";
import { useIsMobile } from "./hooks/useIsMobile";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { ResponsiveProvider } from "./context/ResponsiveContext";

function loadBlogPageNew() {
  return import("./components/BlogPageNew");
}

function loadNaviCareDashboard() {
  return import("./components/NaviCareDashboard");
}

const NAVICARE_HASH = "#navicare";

function hasNaviCareHash() {
  return (
    typeof window !== "undefined" &&
    window.location.hash.toLowerCase() === NAVICARE_HASH
  );
}

type IdleWindow = Window & {
  cancelIdleCallback?: (handle: number) => void;
  requestIdleCallback?: (
    callback: (_deadline: unknown) => void,
    options?: { timeout: number }
  ) => number;
};

const BlogPageNew = React.lazy(() =>
  loadBlogPageNew().then((module) => ({
    default: module.BlogPageNew,
  }))
);

const NaviCareDashboard = React.lazy(() =>
  loadNaviCareDashboard().then((module) => ({
    default: module.NaviCareDashboard,
  }))
);

export default function App() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const styles = useMemo(() => getStyles(isMobile), [isMobile]);
  const [showIntro, setShowIntro] = useState(() => !hasNaviCareHash());
  const [showBlogPage, setShowBlogPage] = useState(false);
  const [showNaviCare, setShowNaviCare] = useState(hasNaviCareHash);
  const [selectedPost, setSelectedPost] = useState<(typeof siteData.updates)[number] | null>(null);
  const handleCloseBlog = useCallback(() => {
    setShowBlogPage(false);
    setSelectedPost(null);
  }, []);
  const handleOpenBlog = useCallback(() => setShowBlogPage(true), []);
  const handlePostSelected = useCallback(() => setSelectedPost(null), []);
  const handleCloseNaviCare = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.location.hash.toLowerCase() === NAVICARE_HASH) {
      window.location.hash = "top";
      return;
    }

    setShowNaviCare(false);
  }, []);
  const responsiveValue = useMemo(
    () => ({
      disableMotion: isMobile || prefersReducedMotion,
      isMobile,
      prefersReducedMotion,
      styles,
    }),
    [isMobile, prefersReducedMotion, styles]
  );

  useEffect(() => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }, []);

  useEffect(() => {
    const syncHash = () => {
      const nextShowNaviCare = hasNaviCareHash();
      setShowNaviCare(nextShowNaviCare);

      if (nextShowNaviCare) {
        setShowIntro(false);
      }
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    if (!showNaviCare) {
      return undefined;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
    };
  }, [showNaviCare]);

  useEffect(() => {
    const idleWindow = window as IdleWindow;
    const preload = () => {
      void loadBlogPageNew();
    };

    if (typeof idleWindow.requestIdleCallback === "function") {
      const idleId = idleWindow.requestIdleCallback(() => preload(), {
        timeout: isMobile ? 4000 : 2200,
      });

      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(preload, isMobile ? 2800 : 1400);

    return () => window.clearTimeout(timeoutId);
  }, [isMobile]);

  return (
    <ResponsiveProvider value={responsiveValue}>
      <>
        {showIntro ? <SplashIntro onFinish={() => setShowIntro(false)} /> : null}

        {showBlogPage && (
          <React.Suspense fallback={null}>
            <BlogPageNew
              onClose={handleCloseBlog}
              selectedPost={selectedPost}
              onPostSelected={handlePostSelected}
            />
          </React.Suspense>
        )}

        {showNaviCare && (
          <React.Suspense
            fallback={
              <div
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 10000,
                  display: "grid",
                  placeItems: "center",
                  color: "#F8FAFC",
                  background: "#08111F",
                  fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 700,
                }}
              >
                Loading NaviCare
              </div>
            }
          >
            <NaviCareDashboard onClose={handleCloseNaviCare} />
          </React.Suspense>
        )}

        <div
          style={{
            ...styles.page,
          }}
        >
          <div style={styles.backgroundStage}>
            <div style={styles.backgroundLayerA} />
            <div style={styles.backgroundLayerB} />
            <div style={styles.backgroundGlowLeft} />
            <div style={styles.backgroundGlowCenter} />
            <div style={styles.backgroundGlowRight} />
            <div style={styles.gridOverlay} />
          </div>

          <Header />

          <main style={styles.main}>
            <HeroSection />
            <AboutSection />
            <EcosystemSection />
            <TrackerSection />
            <PartnersSection />
            <TeamSection />
            <UpdatesSection
              onOpenBlog={handleOpenBlog}
              onSelectPost={setSelectedPost}
            />
            <ContactSection />
          </main>

        </div>
      </>
    </ResponsiveProvider>
  );
}
