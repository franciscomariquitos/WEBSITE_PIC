import { useCallback, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { motion, useAnimation } from "framer-motion";
import navisenseLogo from "../assets/optimized/navisense-logo.webp";
import { useResponsive } from "../context/ResponsiveContext";

type SplashIntroProps = {
  onFinish: () => void;
};

export function SplashIntro({ onFinish }: SplashIntroProps) {
  const logo = useAnimation();
  const overlay = useAnimation();
  const finishedRef = useRef(false);
  const { isMobile, prefersReducedMotion } = useResponsive();

  const finish = useCallback(
    async (fast = false) => {
      if (finishedRef.current) {
        return;
      }

      finishedRef.current = true;
      const duration = fast ? 0.18 : 0.55;

      await Promise.all([
        logo.start({
          opacity: 0,
          scale: fast ? 0.995 : 0.98,
	          transition: {
	            duration,
	            ease: "easeOut",
	          },
        }),
        overlay.start({
          opacity: 0,
	          transition: {
	            duration: fast ? 0.2 : 0.65,
	            ease: "easeInOut",
	          },
        }),
      ]).catch(() => undefined);

      onFinish();
    },
    [logo, onFinish, overlay]
  );

  useEffect(() => {
    const finishOnScrollIntent = () => {
      void finish(true);
    };
    const passiveOptions: AddEventListenerOptions = { passive: true };

    window.addEventListener("wheel", finishOnScrollIntent, passiveOptions);
    window.addEventListener("touchmove", finishOnScrollIntent, passiveOptions);
    window.addEventListener("keydown", finishOnScrollIntent);

    void logo.start({
      opacity: [0, 1, 1],
      scale: prefersReducedMotion ? 1 : [0.94, 1.025, 1],
	      transition: {
	        duration: prefersReducedMotion ? 0.2 : isMobile ? 0.9 : 1.18,
	        ease: "easeOut",
	      },
    });

    const timeoutId = window.setTimeout(
      () => {
        void finish(false);
      },
      prefersReducedMotion ? 520 : isMobile ? 1350 : 1750
    );

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("wheel", finishOnScrollIntent);
      window.removeEventListener("touchmove", finishOnScrollIntent);
      window.removeEventListener("keydown", finishOnScrollIntent);
      logo.stop();
      overlay.stop();
    };
  }, [finish, isMobile, logo, overlay, prefersReducedMotion]);

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
          opacity: 0,
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%",
          scale: 0.94,
        }}
        style={logoStyle}
      />
    </motion.div>
  );
}

const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 9999,
  background: `
    radial-gradient(circle at 50% 45%, rgba(0,237,245,0.08) 0%, transparent 42%),
    linear-gradient(115deg,#01042d 0%,#031a72 28%,#1b1f86 55%,#24106a 76%,#060122 100%)
  `,
  pointerEvents: "none",
  willChange: "opacity",
};

const logoStyle: CSSProperties = {
  position: "fixed",
  width: "min(38vw,420px)",
  height: "auto",
  transformOrigin: "center center",
  filter: "drop-shadow(0 0 22px rgba(0,237,245,0.68))",
  willChange: "opacity, transform",
};
