import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getStyles } from "./styles";
import { siteData } from "./data/siteData";
import { SplashIntro } from "./components/SplashIntro";
import {
  AboutSection,
  ContactSection,
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

export default function App() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const styles = useMemo(() => getStyles(isMobile), [isMobile]);
  const [showIntro, setShowIntro] = useState(true);
  const [showBlogPage, setShowBlogPage] = useState(false);
  const [selectedPost, setSelectedPost] = useState<(typeof siteData.updates)[number] | null>(null);
  const handleCloseBlog = useCallback(() => {
    setShowBlogPage(false);
    setSelectedPost(null);
  }, []);
  const handleOpenBlog = useCallback(() => setShowBlogPage(true), []);
  const handlePostSelected = useCallback(() => setSelectedPost(null), []);
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
            <TeamSection />
            <PartnersSection />
            <TrackerSection />
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
