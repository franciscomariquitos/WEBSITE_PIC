import React from "react";
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
  return (
    <div style={styles.page}>
    <div style={styles.backgroundLayerA} />
    <div style={styles.backgroundGlowCenter} />

      <Header />

      <main style={styles.main}>
        <HeroSection />
        <AboutSection />
        <SolutionSection />
        <PartnersSection />
        <UpdatesSection />
        <TrackerSection />
        <TeamSection />
        <RoadmapSection />
        <ContactSection />
      </main>
    </div>
  );
}
