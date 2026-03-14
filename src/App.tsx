import React, { useState } from "react";
import { SplashIntro } from "./components/SplashIntro";
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

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <SplashIntro onFinish={() => setIntroDone(true)} />}

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

        <Header />

        <main style={styles.main}>
          <HeroSection />
          <AboutSection />
          <TeamSection />
          <SolutionSection />
          <PartnersSection />
          <UpdatesSection />
          <TrackerSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
}

