import React, { useState } from "react";
import { SplashIntro } from "./components/SplashIntro";
import { BlogPage } from "./components/BlogPage";
import { styles } from "./styles";
import {
  AboutSection,
  ContactSection,
  Header,
  HeroSection,
  PartnersSection,
  RoadmapSection,
  SolutionSection,
  TeamSection,
  TrackerSection,
  UpdatesSection,
} from "./components/sections";
import CircuitEdgeDecoration from "./components/CircuitEdgeDecoration";

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [showBlogPage, setShowBlogPage] = useState(false);

  return (
    <>
      {!introDone && <SplashIntro onFinish={() => setIntroDone(true)} />}
      {showBlogPage && <BlogPage onClose={() => setShowBlogPage(false)} />}

      <div
        style={{
          ...styles.page,
          opacity: introDone ? 1 : 0.999,
          transition: "opacity 0.55s ease",
          pointerEvents: introDone ? "auto" : "none",
        }}
      >
        <div style={styles.backgroundLayerA} />
        <div style={styles.backgroundLayerB} />
        <div style={styles.backgroundGlowLeft} />
        <div style={styles.backgroundGlowCenter} />
        <div style={styles.backgroundGlowRight} />
          {/* Circuit edge decorations (removed from Hero/Presentation section) */}

        <Header />

        <main style={styles.main}>
          <HeroSection />
          <AboutSection />
          <SolutionSection />
          <TeamSection />
          <PartnersSection />
          <TrackerSection />
          <UpdatesSection onOpenBlog={() => setShowBlogPage(true)} />
          <ContactSection />
        </main>

        {/* Grid Pattern Overlay */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(35, 197, 255, 0.035) 25%, rgba(35, 197, 255, 0.035) 26%, transparent 27%, transparent 74%, rgba(35, 197, 255, 0.035) 75%, rgba(35, 197, 255, 0.035) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(35, 197, 255, 0.035) 25%, rgba(35, 197, 255, 0.035) 26%, transparent 27%, transparent 74%, rgba(35, 197, 255, 0.035) 75%, rgba(35, 197, 255, 0.035) 76%, transparent 77%, transparent)
            `,
            backgroundSize: "50px 50px",
            pointerEvents: "none",
          }}
        />
      </div>
    </>
  );
}

