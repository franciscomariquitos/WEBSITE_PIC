import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import navisenseLogo from "../assets/navisense-logo.png";

type SplashIntroProps = {
  onFinish: () => void;
};

export function SplashIntro({ onFinish }: SplashIntroProps) {
  const logo = useAnimation();
  const overlay = useAnimation();

  useEffect(() => {
    const run = async () => {
      // 3 pulses de glow, sem mexer o colete
      await logo.start({
        filter: [
          "drop-shadow(0 0 6px rgba(0,237,245,1))",
          "drop-shadow(0 0 40px rgba(0,237,245,1))",
          "drop-shadow(0 0 10px rgba(0,237,245,1))",

          "drop-shadow(0 0 44px rgba(0,237,245,1))",
          "drop-shadow(0 0 12px rgba(0,237,245,1))",

          "drop-shadow(0 0 48px rgba(0,237,245,1))",
          "drop-shadow(0 0 16px rgba(0,237,245,1))"
        ],
        transition: {
          duration: 3,
          times: [0, 0.18, 0.5, 0.85, 1],
          ease: "easeInOut"
        }
      });

      // desaparece suavemente sem morph
      await Promise.all([
        logo.start({
          opacity: 0,
          scale: 0.98,
          transition: {
            duration: 0.55,
            ease: "easeOut"
          }
        }),
        overlay.start({
          opacity: 0,
          transition: {
            duration: 0.7,
            ease: "easeInOut"
          }
        })
      ]);

      onFinish();
    };

    run();
  }, [logo, overlay, onFinish]);

  return (
    <motion.div
      animate={overlay}
      initial={{ opacity: 1 }}
      style={overlayStyle}
    >
      <motion.img
        src={navisenseLogo}
        animate={logo}
        initial={{
          opacity: 1,
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%"
        }}
        style={logoStyle}
      />
    </motion.div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 9999,
  background: `
    radial-gradient(circle at 50% 45%, rgba(0,237,245,0.08) 0%, transparent 42%),
    linear-gradient(115deg,#01042d 0%,#031a72 28%,#1b1f86 55%,#24106a 76%,#060122 100%)
  `,
  pointerEvents: "none",
};

const logoStyle: React.CSSProperties = {
  position: "fixed",
  width: "min(38vw,420px)",
  height: "auto",
  transformOrigin: "center center",
  willChange: "transform, filter, opacity"
};