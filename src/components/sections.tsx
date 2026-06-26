import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowDown,
  CheckCircle2,
  ChevronRight,
  Clapperboard,
  Code2,
  Database,
  Eye,
  EyeOff,
  HardHat,
  Mail,
  FileText,
  Lightbulb,
  Linkedin,
  RadioTower,
  ShieldAlert,
  CircuitBoard,
  Presentation,
  UserRound,
  Users
} from "lucide-react";
import { motion } from "framer-motion";
import { getFadeUp } from "../animations";
import { sectionIds, siteData, colors } from "../data/siteData"
import { Card } from "./ui"
import { RevealImage } from "./RevealImage";
import daniel from "../assets/optimized/daniel.webp";
import david from "../assets/optimized/david.webp";
import francisco from "../assets/optimized/francisco.webp";
import fred from "../assets/optimized/fred.webp";
import raquel from "../assets/optimized/raquel.webp";
import tiago from "../assets/optimized/tiago.webp";
import { withBaseUrl } from "../utils/assetUrl";
import { useResponsive } from "../context/ResponsiveContext";
import MobileNav from "./MobileNav";

function useResponsiveStyles() {
  return useResponsive();
}

function hasExternalLink(href?: string) {
  return Boolean(href && href.trim() && href !== "#");
}

const teamPhotos: Record<string, string> = {
  "Francisco Mariquitos": francisco,
  "Raquel Barroso": raquel,
  "Daniel Khom'yak": daniel,
  "David Reimer": david,
  "Tiago Pinto": tiago,
  "Frederico Pinto": fred,
};

const controlBoxFrameUrls = Array.from({ length: 101 }, (_value, index) => {
  const frameNumber = Math.min(301, 1 + index * 3);
  return withBaseUrl(`animations/box-frames/frame-${String(frameNumber).padStart(4, "0")}.webp`);
});
const vestPreviewImage = withBaseUrl("showcase/vest/colete navisense.png");
const heroResourcePaths = siteData.project.resources;
const fallbackAppPreviewImage = withBaseUrl("blog-updates/05-mobile-app-launched.png");


const teamRoleIcons = {
  "Francisco Mariquitos": { icon: RadioTower, accent: "#5FA9E8", label: "Connectivity" },
  "Raquel Barroso": { icon: CircuitBoard, accent: "#A88FFF", label: "Engineering" },
  "Daniel Khom'yak": { icon: Code2, accent: "#5FA9E8", label: "Software" },
  "David Reimer": { icon: Clapperboard, accent: "#FFD966", label: "Media" },
  "Tiago Pinto": { icon: Presentation, accent: "#34d399", label: "Presentation" },
  "Frederico Pinto": { icon: Database, accent: "#A88FFF", label: "Dashboard" },
} as const;

function PreviewAssetImage({
  src,
  fallbackSrc,
  alt,
  accent,
  label,
  isPhone = false,
}: {
  src?: string;
  fallbackSrc?: string;
  alt: string;
  accent: string;
  label: string;
  isPhone?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const imageSrc = !failed && src ? withBaseUrl(src) : fallbackSrc ? withBaseUrl(fallbackSrc) : null;

  if (!imageSrc) {
    return (
      <div
        style={{
          minHeight: isPhone ? 260 : 220,
          aspectRatio: isPhone ? "459 / 821" : undefined,
          borderRadius: isPhone ? "16% / 7%" : 20,
          border: `1px dashed ${accent}55`,
          background: `linear-gradient(145deg, ${accent}14 0%, rgba(255,255,255,0.03) 100%)`,
          display: "grid",
          placeItems: "center",
          color: "rgba(224, 228, 233, 0.72)",
          textAlign: "center",
          padding: 18,
          lineHeight: 1.5,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="eager"
      decoding="async"
      onError={() => setFailed(true)}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        aspectRatio: isPhone ? "459 / 821" : undefined,
        borderRadius: isPhone ? "16% / 7%" : 18,
        boxShadow: isPhone ? "none" : "0 20px 40px rgba(2, 6, 23, 0.24)",
      }}
    />
  );
}

function ControlBoxLoopPreview() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadFrame = (url: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.decoding = "async";
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error(`Failed to load ${url}`));
        image.src = url;
      });

    void Promise.all(controlBoxFrameUrls.map((url) => loadFrame(url)))
      .then((frames) => {
        if (cancelled) {
          return;
        }

        framesRef.current = frames;
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) {
          setReady(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) {
      return undefined;
    }

    const canvas = canvasRef.current;
    const frames = framesRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context || !frames.length) {
      return undefined;
    }

    let frameIndex = 0;
    let direction = 1;
    let animationFrameId = 0;
    let lastFrameAt = 0;
    const frameDurationMs = 1000 / 22;

    const drawFrame = (image: HTMLImageElement) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      context.clearRect(0, 0, width, height);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      const rotationRad = -Math.PI / 4;
      const rotationCos = Math.abs(Math.cos(rotationRad));
      const rotationSin = Math.abs(Math.sin(rotationRad));
      const rotatedWidth = image.naturalWidth * rotationCos + image.naturalHeight * rotationSin;
      const rotatedHeight = image.naturalWidth * rotationSin + image.naturalHeight * rotationCos;
      const scale = Math.min(width / rotatedWidth, height / rotatedHeight) * 1.47;
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;

      context.save();
      context.translate(width / 2, height / 2);
      context.rotate(rotationRad);
      context.drawImage(image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
      context.restore();
    };

    const handleResize = () => {
      drawFrame(frames[frameIndex]);
    };

    const tick = (time: number) => {
      if (!lastFrameAt || time - lastFrameAt >= frameDurationMs) {
        lastFrameAt = time;
        drawFrame(frames[frameIndex]);

        let nextIndex = frameIndex + direction;
        if (nextIndex >= frames.length - 1) {
          direction = -1;
          nextIndex = frames.length - 1;
        } else if (nextIndex <= 0) {
          direction = 1;
          nextIndex = 0;
        }

        frameIndex = nextIndex;
      }

      animationFrameId = window.requestAnimationFrame(tick);
    };

    drawFrame(frames[0]);
    window.addEventListener("resize", handleResize);
    animationFrameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [ready]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 0,
        alignSelf: "stretch",
        justifySelf: "stretch",
        overflow: "hidden",
      }}
    >
      {ready ? (
        <canvas
          ref={canvasRef}
          aria-label="Animated control box preview"
          style={{
            position: "absolute",
            inset: 0,
            display: "block",
            width: "100%",
            height: "100%",
            filter:
              "drop-shadow(0 30px 40px rgba(2, 6, 23, 0.36)) drop-shadow(0 0 30px rgba(95, 169, 232, 0.18))",
          }}
        />
      ) : (
        <img
          src={controlBoxFrameUrls[0]}
          alt="Animated control box preview"
          loading="eager"
          decoding="async"
          style={{
            position: "absolute",
            inset: 0,
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: "rotate(-45deg) scale(1.08)",
            filter:
              "drop-shadow(0 30px 40px rgba(2, 6, 23, 0.36)) drop-shadow(0 0 30px rgba(95, 169, 232, 0.18))",
          }}
        />
      )}
    </div>
  );
}

function PartnerLogoBadge({
  partner,
  isMobile,
}: {
  partner: (typeof siteData.partners)[number];
  isMobile: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const isIstLogo = partner.logoPath?.includes("ist.png") ?? false;
  const logoPath = partner.logoPath ? withBaseUrl(partner.logoPath) : null;

  if (logoPath && !failed) {
    return (
      <div
        style={{
          width: isMobile ? 136 : 172,
          height: isMobile ? 74 : 90,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          boxSizing: "border-box",
        }}
      >
        <img
          src={logoPath}
          alt={`${partner.name} logo`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          style={{
            display: "block",
            width: isIstLogo ? "158%" : "100%",
            height: isIstLogo ? "158%" : "100%",
            objectFit: "contain",
            objectPosition: "left center",
            filter: "drop-shadow(0 12px 18px rgba(2, 6, 23, 0.22))",
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(95, 169, 232, 0.18)",
        background: "rgba(95, 169, 232, 0.10)",
        color: "#dbeafe",
        fontWeight: 700,
        fontSize: isMobile ? 16 : 18,
      }}
    >
      {partner.logo}
    </div>
  );
}

function PrototypePreviewPanel({
  isMobile,
  styles,
}: {
  isMobile: boolean;
  styles: Record<string, React.CSSProperties>;
}) {
  const panelLayout = isMobile
    ? {
        panelLeft: 6,
        panelRight: 97,
        panelTop: 18,
        panelBottom: 99,
      }
    : {
        panelLeft: 28,
        panelRight: 98,
        panelTop: 4,
        panelBottom: 99,
      };
  const [zoomConnector, setZoomConnector] = useState({
    pocketTipX: isMobile ? 29 : 20.5,
    pocketTipY: isMobile ? 29 : 26.5,
    pocketTopX: isMobile ? 28.7 : 20.3,
    pocketTopY: isMobile ? 26.5 : 24,
    pocketBottomX: isMobile ? 29.3 : 20.7,
    pocketBottomY: isMobile ? 31.5 : 29,
    tipMarkerRadiusX: isMobile ? 0.82 : 1.15,
    tipMarkerRadiusY: 1.4,
    ...panelLayout,
  });
  const zoomStageRef = useRef<HTMLDivElement>(null);
  const vestImageRef = useRef<HTMLImageElement>(null);
  const boxPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = zoomStageRef.current;
    const vest = vestImageRef.current;
    const panel = boxPanelRef.current;

    if (!stage || !vest || !panel) {
      return;
    }

    let frameId = 0;

    const measureConnector = () => {
      const stageRect = stage.getBoundingClientRect();
      const vestRect = vest.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();

      if (!stageRect.width || !stageRect.height || !vestRect.width || !vestRect.height || !panelRect.width || !panelRect.height) {
        return;
      }

      const toX = (value: number) => ((value - stageRect.left) / stageRect.width) * 100;
      const toY = (value: number) => ((value - stageRect.top) / stageRect.height) * 100;
      const sourceXRatio = 0.5;
      const sourceTipRatio = 0.72;
      const sourceSpreadRatio = 0.055;

      const pocketTipX = toX(vestRect.left + vestRect.width * sourceXRatio);
      const pocketTipY = toY(vestRect.top + vestRect.height * sourceTipRatio);

      const nextConnector = {
        pocketTipX,
        pocketTipY,
        pocketTopX: pocketTipX,
        pocketTopY: toY(vestRect.top + vestRect.height * (sourceTipRatio - sourceSpreadRatio)),
        pocketBottomX: pocketTipX,
        pocketBottomY: toY(vestRect.top + vestRect.height * (sourceTipRatio + sourceSpreadRatio)),
        tipMarkerRadiusX: (stageRect.height / stageRect.width) * 1.4,
        tipMarkerRadiusY: 1.4,
        panelLeft: toX(panelRect.left),
        panelRight: toX(panelRect.right),
        panelTop: toY(panelRect.top),
        panelBottom: toY(panelRect.bottom),
      };

      setZoomConnector((current) => {
        const hasMeaningfulChange = Object.keys(nextConnector).some((key) => {
          const connectorKey = key as keyof typeof nextConnector;
          return Math.abs(current[connectorKey] - nextConnector[connectorKey]) > 0.15;
        });

        return hasMeaningfulChange ? nextConnector : current;
      });
    };

    const scheduleMeasure = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(measureConnector);
    };

    scheduleMeasure();

    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleMeasure);
    resizeObserver?.observe(stage);
    resizeObserver?.observe(vest);
    resizeObserver?.observe(panel);
    window.addEventListener("resize", scheduleMeasure);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, [isMobile]);

  return (
    <motion.div
      style={{
        ...styles.heroEcosystemVisual,
        width: "100%",
        maxWidth: 1180,
        minHeight: 0,
        padding: 0,
        border: "none",
        background: "transparent",
        boxShadow: "none",
        overflow: "visible",
        gridTemplateRows: "auto",
        gap: 0,
      }}
      initial={false}
      animate={{ opacity: 1 }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gap: isMobile ? 10 : 12,
          paddingTop: 0,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1.34fr) 72px minmax(280px, 0.82fr)",
            gap: isMobile ? 16 : 20,
            alignItems: isMobile ? "stretch" : "center",
          }}
        >
          <article
            style={{
              minWidth: 0,
              padding: isMobile ? 16 : 18,
              borderRadius: 26,
              border: "1px solid rgba(95, 169, 232, 0.18)",
              background:
                "linear-gradient(165deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.028) 58%, rgba(95,169,232,0.05) 100%)",
              boxShadow: "0 22px 40px rgba(2, 6, 23, 0.18)",
              display: "grid",
              gap: 10,
              overflow: "hidden",
              alignSelf: isMobile ? "stretch" : "center",
            }}
          >
            <div style={styles.heroVisualLabel}>Electronics box</div>

            <div
              ref={zoomStageRef}
              style={{
                position: "relative",
                height: isMobile ? 430 : 540,
                borderRadius: 24,
                border: "1px solid rgba(95, 169, 232, 0.14)",
                background:
                  "radial-gradient(circle at 22% 24%, rgba(95,169,232,0.14) 0%, rgba(95,169,232,0.05) 26%, transparent 48%), radial-gradient(circle at 78% 62%, rgba(95,169,232,0.18) 0%, rgba(95,169,232,0.07) 34%, transparent 58%), linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.025) 100%)",
                overflow: "hidden",
              }}
            >
              <img
                ref={vestImageRef}
                src={vestPreviewImage}
                alt="NAVISense vest preview"
                loading="eager"
                decoding="async"
                style={{
                  display: isMobile ? "none" : "block",
                  position: "absolute",
                  left: 24,
                  top: 20,
                  width: 112,
                  height: "auto",
                  filter: "drop-shadow(0 0 18px rgba(95, 169, 232, 0.24))",
                }}
              />

              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{
                  display: isMobile ? "none" : "block",
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                }}
              >
                <defs>
                  <marker
                    id="vest-zoom-arrow"
                    markerWidth="5"
                    markerHeight="5"
                    refX="4.4"
                    refY="2.5"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M 0 0 L 5 2.5 L 0 5 z" fill="rgba(95, 169, 232, 0.24)" />
                  </marker>
                </defs>
                <polygon
                  points={`${zoomConnector.pocketTopX},${zoomConnector.pocketTopY} ${zoomConnector.panelLeft},${zoomConnector.panelTop} ${zoomConnector.panelLeft},${zoomConnector.panelBottom} ${zoomConnector.pocketBottomX},${zoomConnector.pocketBottomY}`}
                  fill="rgba(95, 169, 232, 0.004)"
                />
                <rect
                  x={zoomConnector.panelLeft}
                  y={zoomConnector.panelTop}
                  width={zoomConnector.panelRight - zoomConnector.panelLeft}
                  height={zoomConnector.panelBottom - zoomConnector.panelTop}
                  rx="2.2"
                  fill="none"
                  stroke="rgba(95, 169, 232, 0.025)"
                  strokeWidth="0.18"
                />
                <line
                  x1={zoomConnector.pocketTopX}
                  y1={zoomConnector.pocketTopY}
                  x2={zoomConnector.pocketBottomX}
                  y2={zoomConnector.pocketBottomY}
                  stroke="rgba(95, 169, 232, 0.18)"
                  strokeWidth="0.18"
                  strokeLinecap="round"
                />
                <ellipse
                  cx={zoomConnector.pocketTipX}
                  cy={zoomConnector.pocketTipY}
                  rx={zoomConnector.tipMarkerRadiusX}
                  ry={zoomConnector.tipMarkerRadiusY}
                  fill="rgba(95, 169, 232, 0.16)"
                  stroke="rgba(95, 169, 232, 0.48)"
                  strokeWidth="0.22"
                />
                <line
                  x1={zoomConnector.pocketTipX}
                  y1={zoomConnector.pocketTipY}
                  x2={zoomConnector.panelLeft}
                  y2={zoomConnector.panelTop}
                  stroke="rgba(95, 169, 232, 0.26)"
                  strokeWidth="0.28"
                  strokeLinecap="round"
                  markerEnd="url(#vest-zoom-arrow)"
                />
                <line
                  x1={zoomConnector.pocketTipX}
                  y1={zoomConnector.pocketTipY}
                  x2={zoomConnector.panelLeft}
                  y2={zoomConnector.panelBottom}
                  stroke="rgba(95, 169, 232, 0.26)"
                  strokeWidth="0.28"
                  strokeLinecap="round"
                  markerEnd="url(#vest-zoom-arrow)"
                />
                <line
                  x1={zoomConnector.panelLeft}
                  y1={zoomConnector.panelTop}
                  x2={zoomConnector.panelLeft}
                  y2={zoomConnector.panelBottom}
                  stroke="rgba(95, 169, 232, 0.13)"
                  strokeWidth="0.3"
                  strokeLinecap="round"
                />
                <line
                  x1={zoomConnector.panelLeft}
                  y1={zoomConnector.panelTop}
                  x2={zoomConnector.panelLeft + 5}
                  y2={zoomConnector.panelTop}
                  stroke="rgba(95, 169, 232, 0.30)"
                  strokeWidth="0.44"
                  strokeLinecap="round"
                />
                <line
                  x1={zoomConnector.panelLeft}
                  y1={zoomConnector.panelBottom}
                  x2={zoomConnector.panelLeft + 5}
                  y2={zoomConnector.panelBottom}
                  stroke="rgba(95, 169, 232, 0.30)"
                  strokeWidth="0.44"
                  strokeLinecap="round"
                />
              </svg>

              <div
                ref={boxPanelRef}
                style={{
                  position: "absolute",
                  left: isMobile ? 0 : `${panelLayout.panelLeft}%`,
                  right: isMobile ? 0 : `${100 - panelLayout.panelRight}%`,
                  top: isMobile ? 0 : `${panelLayout.panelTop}%`,
                  bottom: isMobile ? 0 : `${100 - panelLayout.panelBottom}%`,
                  borderRadius: 22,
                  border: "1px solid rgba(95, 169, 232, 0.14)",
                  background:
                    "radial-gradient(circle at 50% 42%, rgba(95,169,232,0.18) 0%, rgba(95,169,232,0.055) 40%, transparent 68%), linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.025) 100%)",
                  overflow: "hidden",
                  padding: isMobile ? 14 : 18,
                  boxSizing: "border-box",
                }}
              >
                <ControlBoxLoopPreview />
              </div>
            </div>
          </article>

          <div
            aria-hidden="true"
            style={{
              position: "relative",
              minHeight: isMobile ? 82 : 360,
              height: "100%",
              width: "100%",
              alignSelf: isMobile ? "center" : "stretch",
              display: "grid",
              placeItems: "center",
              color: colors.cyan2,
            }}
          >
            {isMobile ? (
              <div
                style={{
                  position: "relative",
                  width: 2,
                  height: 74,
                  borderRadius: 999,
                  background: "linear-gradient(180deg, rgba(95,169,232,0.18), rgba(95,169,232,0.72))",
                  boxShadow: "0 0 14px rgba(95, 169, 232, 0.18)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    bottom: -7,
                    width: 0,
                    height: 0,
                    transform: "translateX(-50%)",
                    borderLeft: "5px solid transparent",
                    borderRight: "5px solid transparent",
                    borderTop: "8px solid rgba(95, 169, 232, 0.70)",
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: 320,
                  minWidth: 72,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    width: "58%",
                    height: 2,
                    transform: "translateY(-50%)",
                    borderRadius: 999,
                    background: "rgba(95, 169, 232, 0.52)",
                    boxShadow: "0 0 12px rgba(95, 169, 232, 0.18)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "58%",
                    top: "24%",
                    bottom: "24%",
                    width: 2,
                    transform: "translateX(-50%)",
                    borderRadius: 999,
                    background: "rgba(95, 169, 232, 0.42)",
                    boxShadow: "0 0 12px rgba(95, 169, 232, 0.16)",
                  }}
                />
                {[24, 76].map((top, index) => (
                  <React.Fragment key={top}>
                    <div
                      style={{
                        position: "absolute",
                        left: "58%",
                        right: 6,
                        top: `${top}%`,
                        height: 2,
                        transform: "translateY(-50%)",
                        borderRadius: 999,
                        background: index === 0 ? "rgba(168, 143, 255, 0.58)" : "rgba(95, 169, 232, 0.58)",
                        boxShadow: "0 0 12px rgba(95, 169, 232, 0.16)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: `${top}%`,
                        width: 0,
                        height: 0,
                        transform: "translateY(-50%)",
                        borderTop: "5px solid transparent",
                        borderBottom: "5px solid transparent",
                        borderLeft: `9px solid ${index === 0 ? "rgba(168, 143, 255, 0.68)" : "rgba(95, 169, 232, 0.68)"}`,
                      }}
                    />
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gridTemplateRows: "auto auto",
              gap: isMobile ? 14 : 16,
              alignItems: "stretch",
            }}
          >
            <article
              style={{
                minWidth: 0,
                padding: isMobile ? 14 : 15,
                borderRadius: 22,
                border: "1px solid rgba(168, 143, 255, 0.18)",
                background:
                  "linear-gradient(165deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.028) 58%, rgba(168,143,255,0.045) 100%)",
                boxShadow: "0 22px 40px rgba(2, 6, 23, 0.18)",
                display: "grid",
                gap: 10,
              }}
            >
              <div style={{ ...styles.heroVisualLabel, color: "#c4b5fd" }}>Mobile app</div>
              <div
                style={{
                  justifySelf: "center",
                  width: "min(100%, 210px)",
                  aspectRatio: "459 / 821",
                  padding: 0,
                  borderRadius: "16% / 7%",
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "transparent",
                  overflow: "hidden",
                  boxShadow: "0 16px 30px rgba(0,0,0,0.20)",
                }}
              >
                <PreviewAssetImage
                  src={heroResourcePaths.appPreviewImage}
                  fallbackSrc={fallbackAppPreviewImage}
                  alt="NAVISense mobile app preview"
                  accent="#A88FFF"
                  label="Add the mobile app screenshot at public/showcase/mobile-app-preview.png"
                  isPhone
                />
              </div>
            </article>


            <motion.a
              href="#navicare"
              aria-label="Open NaviCare dashboard"
              style={{
                minWidth: 0,
                padding: isMobile ? 18 : 18,
                borderRadius: 24,
                border: "1px solid rgba(95, 169, 232, 0.18)",
                background:
                  "linear-gradient(165deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.028) 58%, rgba(95,169,232,0.045) 100%)",
                boxShadow: "0 22px 40px rgba(2, 6, 23, 0.18)",
                display: "grid",
                gap: 14,
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
              whileHover={{ y: -3, borderColor: "rgba(95, 169, 232, 0.34)" }}
              whileTap={{ scale: 0.99 }}
            >
              <div style={styles.heroVisualLabel}>NaviCare system</div>
              <div
                style={{
                  minHeight: isMobile ? 220 : 260,
                  borderRadius: 22,
                  border: "1px solid rgba(95, 169, 232, 0.14)",
                  background:
                    "linear-gradient(160deg, rgba(8,16,54,0.70) 0%, rgba(15,25,74,0.44) 58%, rgba(95,169,232,0.05) 100%)",
                  overflow: "hidden",
                  padding: 12,
                }}
              >
                <PreviewAssetImage
                  src={heroResourcePaths.navicarePreviewImage}
                  alt="NaviCare dashboard preview"
                  accent="#5FA9E8"
                  label="Add the NaviCare screenshot at public/showcase/navicare-preview.png"
                />
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Header() {
  const { isMobile, styles } = useResponsiveStyles();
  return (
    <header style={styles.header}>
      <div style={styles.headerInner}>
        <a href="#top" style={styles.brandTextOnly}>
          NAVISense
        </a>
        {isMobile ? (
          <MobileNav />
        ) : (
          <nav style={styles.navDesktop} role="navigation" aria-label="Main navigation">
            {siteData.nav.map((item) => (
              <a
                key={item}
                href={`#${sectionIds[item as keyof typeof sectionIds]}`}
                style={styles.navLink}
                tabIndex={0}
                aria-label={item}
              >
                {item}
              </a>
            ))}
          </nav>
        )}
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
  const { isMobile, styles } = useResponsiveStyles();
  return (
    <div
      style={{
        maxWidth: 880,
        margin: `0 auto ${isMobile ? 30 : 42}px auto`,
        textAlign: "center",
      }}
    >
      {eyebrow ? <div style={styles.label}>{eyebrow}</div> : null}
      <h2 style={styles.sectionTitle}>{title}</h2>
      {description ? (
        <p style={styles.sectionDescription}>{description}</p>
      ) : null}
    </div>
  );
}

const trackerRoadmap = [
  {
    period: "February",
    title: "Foundation",
    desc: "Website launch, blog structure, and materials planning.",
    state: "complete",
  },
  {
    period: "March-April",
    title: "Build",
    desc: "Prototype development, subsystem integration, and communications setup.",
    state: "complete",
  },
  {
    period: "May",
    title: "Validate",
    desc: "Prototype testing, poster work, latency checks, and reliability refinement completed.",
    state: "complete",
  },
  {
    period: "Late May-June",
    title: "Showcase",
    desc: "Poster, demonstration video, dashboard, and final presentation assets completed.",
    state: "complete",
  },
];

function BlogCard({ post, onReadMore }: { post: (typeof siteData.updates)[number]; onReadMore?: (post: (typeof siteData.updates)[number]) => void }) {
  const { disableMotion, styles } = useResponsiveStyles();
  return (
    <Card>
      <div style={styles.blogTopRow}>
        <span style={styles.categoryPill}>{post.category}</span>
        <span style={styles.smallMuted}>{post.date}</span>
      </div>
      <h3 style={{ ...styles.cardTitle, textAlign: "left", marginTop: 10 }}>{post.title}</h3>
      <p style={{...styles.smallMuted, fontSize: "13px", marginBottom: "12px", textAlign: "left"}}>
        By {post.author}
      </p>
      <p style={{ ...styles.cardText, textAlign: "left", marginTop: 0 }}>{post.summary}</p>
	      <motion.button
	        onClick={() => onReadMore?.(post)}
	        style={styles.linkButton}
	        whileHover={disableMotion ? undefined : { gap: "12px" }}
	        whileTap={disableMotion ? undefined : { scale: 0.98 }}
	      >
        Read full update <ChevronRight size={16} style={{ transition: "all 0.2s ease" }} />
      </motion.button>
    </Card>
  );
}

export function HeroSection() {
  const { isMobile, styles } = useResponsiveStyles();

  return (
    <motion.section
      id="top"
      style={styles.heroSection}
      initial={false}
      animate={{ opacity: 1 }}
    >
      <motion.div
        style={{
          ...styles.heroProductGrid,
          gridTemplateColumns: "1fr",
          gap: isMobile ? 24 : 32,
          justifyItems: "center",
          maxWidth: 1320,
        }}
        initial={false}
        animate={{ opacity: 1 }}
      >
        <motion.div
          style={{
            ...styles.heroProductCopy,
            justifyItems: "center",
            textAlign: "center",
            maxWidth: 860,
          }}
          initial={false}
          animate={{ opacity: 1 }}
        >
          <h1 style={styles.heroProductTitle}>NAVISense Vest</h1>

          <p style={styles.heroProductSubtitle}>{siteData.project.subtitle}</p>

          <div style={{ ...styles.heroActions, justifyContent: "center" }}>
            <motion.a
              href={withBaseUrl(heroResourcePaths.pitchDeckUrl)}
              target="_blank"
              rel="noreferrer"
              style={styles.heroPrimaryButton}
            >
              <Presentation size={17} />
              Pitch deck
            </motion.a>

            <motion.a
              href={withBaseUrl(heroResourcePaths.posterUrl)}
              target="_blank"
              rel="noreferrer"
              style={styles.heroGhostButton}
            >
              <FileText size={16} />
              Poster
            </motion.a>

            <motion.a
              href={heroResourcePaths.videoUrl}
              target="_blank"
              rel="noreferrer"
              style={styles.heroGhostButton}
            >
              <Clapperboard size={16} />
              Our video
            </motion.a>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: isMobile ? 12 : 14 }}>
            <motion.a href="#navicare" style={{ ...styles.heroGhostButton, borderColor: "rgba(95, 169, 232, 0.28)", background: "rgba(95, 169, 232, 0.10)" }}>
              <ShieldAlert size={16} />
              Open NaviCare
            </motion.a>
          </div>

          <div
            style={{
              marginTop: isMobile ? 8 : 10,
              display: "grid",
              justifyItems: "center",
              gap: 6,
              color: "rgba(224, 228, 233, 0.74)",
              fontSize: isMobile ? 13 : 14,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            <span>Explore our project</span>
            <ArrowDown size={18} strokeWidth={1.8} aria-hidden="true" />
          </div>
        </motion.div>

      </motion.div>
    </motion.section>
  );
}

export function EcosystemSection() {
  const { disableMotion, isMobile, styles } = useResponsiveStyles();
  const fadeUp = React.useMemo(() => getFadeUp(isMobile), [isMobile]);

  return (
    <motion.section
      id="ecosystem"
      style={styles.sectionWrap}
      variants={disableMotion ? undefined : fadeUp}
      initial={disableMotion ? false : "hidden"}
      whileInView={disableMotion ? undefined : "show"}
      viewport={{ once: true, amount: isMobile ? 0.12 : 0.2 }}
    >
      <SectionHeading
        eyebrow="How NAVISense works"
        title="From sensing to support."
        description="NAVISense connects the vest, Android app, shared telemetry, and NaviCare into one clear monitoring flow."
      />

      <div style={styles.ecosystemFlow}>
        <div style={styles.ecosystemRail} aria-hidden="true" />
        {siteData.ecosystem.map((step, index) => {
          const Icon = step.icon;
          const accent = index === 1 ? "#A88FFF" : index === 3 ? "#fb7185" : colors.cyan2;

          return (
            <article
              key={step.title}
              style={{
                ...styles.ecosystemStep,
                borderColor: `${accent}24`,
              }}
            >
              <div style={styles.ecosystemStepTop}>
                <div
                  style={{
                    ...styles.ecosystemStepIndex,
                    color: accent,
                    borderColor: `${accent}30`,
                    background: `${accent}14`,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div
                  style={{
                    ...styles.iconChip,
                    color: accent,
                    background: `${accent}14`,
                    border: `1px solid ${accent}26`,
                    marginBottom: 0,
                  }}
                >
                  <Icon size={19} />
                </div>
              </div>
              <h3 style={{ ...styles.cardTitle, textAlign: "left" }}>{step.title}</h3>
              <p style={{ ...styles.cardText, textAlign: "left", marginTop: 0 }}>{step.desc}</p>
            </article>
          );
        })}
      </div>

      <div style={{ marginTop: isMobile ? 34 : 56 }}>
        <PrototypePreviewPanel isMobile={isMobile} styles={styles} />
      </div>
    </motion.section>
  );
}
export function AboutSection() {
  const { disableMotion, isMobile, styles } = useResponsiveStyles();
  const fadeUp = React.useMemo(() => getFadeUp(isMobile), [isMobile]);
  const aboutCards = [
    {
      title: "Why it exists",
      body: siteData.about.problem,
      icon: AlertTriangle,
      accent: "#5FA9E8",
      glow: "rgba(95, 169, 232, 0.16)",
    },
    {
      title: "Why it matters",
      body: siteData.about.importance,
      icon: Eye,
      accent: "#A88FFF",
      glow: "rgba(168, 143, 255, 0.14)",
    },
    {
      title: "Vision",
      body: siteData.about.vision,
      icon: Lightbulb,
      accent: "#FFD966",
      glow: "rgba(255, 217, 102, 0.12)",
    },
  ] as const;
  const aboutFeatureCardStyle: React.CSSProperties = {
    padding: isMobile ? 18 : 24,
    borderRadius: isMobile ? 20 : 22,
    border: "1px solid rgba(255, 255, 255, 0.09)",
    background:
      "linear-gradient(155deg, rgba(14, 20, 54, 0.44) 0%, rgba(18, 24, 62, 0.48) 48%, rgba(22, 24, 68, 0.38) 100%)",
    boxShadow:
      "0 18px 36px rgba(2, 6, 23, 0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
    display: "grid",
    alignContent: "start",
  };
  const aboutBenefitCardStyle: React.CSSProperties = {
    padding: isMobile ? 16 : 20,
    borderRadius: isMobile ? 18 : 20,
    border: "1px solid rgba(255, 255, 255, 0.08)",
    background:
      "linear-gradient(160deg, rgba(14, 20, 54, 0.38) 0%, rgba(18, 24, 62, 0.44) 58%, rgba(22, 22, 66, 0.34) 100%)",
    display: "grid",
    alignContent: "start",
    gap: 10,
  };
  const benefitIconMap = {
    "Visual Impairment": { icon: EyeOff, accent: "#5FA9E8" },
    "Older Adults": { icon: UserRound, accent: "#A88FFF" },
    "Industrial Safety": { icon: HardHat, accent: "#FFD966" },
    "Emergency Teams": { icon: ShieldAlert, accent: "#34d399" },
  } as const;

  return (
    <motion.section
      id="about"
      style={styles.sectionWrap}
      variants={disableMotion ? undefined : fadeUp}
      initial={disableMotion ? false : "hidden"}
      whileInView={disableMotion ? undefined : "show"}
      viewport={{ once: true, amount: isMobile ? 0.15 : 0.18 }}
    >
      <SectionHeading
        eyebrow="About the project"
        title="Safer Navigation"
        description=""
      />

      <div style={styles.threeGrid}>
        {aboutCards.map((item, index) => {
          const Icon = item.icon;

          return (
            <Card key={item.title} style={aboutFeatureCardStyle}>
	              <motion.div
	                style={{ display: "grid", gap: 14, height: "100%", alignContent: "start" }}
	                initial={disableMotion ? false : { opacity: 0, y: 24 }}
	                whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
	                animate={disableMotion ? { opacity: 1, y: 0 } : undefined}
	                transition={disableMotion ? undefined : { duration: 0.7, delay: 0.1 + index * 0.1 }}
	              >
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 16,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid ${item.accent}33`,
                    background: item.glow,
                    boxShadow: `0 0 14px ${item.accent}12`,
                  }}
                >
                  <Icon size={24} color={item.accent} />
                </div>

                <div style={{ ...styles.label, textAlign: "left" }}>{item.title}</div>
                <p style={{ ...styles.longText, marginTop: 0, textAlign: "left" }}>{item.body}</p>
              </motion.div>
            </Card>
          );
        })}
      </div>

      <div style={{ marginTop: isMobile ? 42 : 58 }}>
        <h3
          style={{
            margin: "0 0 24px",
            fontFamily: '"Syne", sans-serif',
            fontSize: isMobile ? 24 : 28,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: colors.cyan2,
          }}
        >
          Who benefits
        </h3>
        <div style={styles.fourGrid}>
          {siteData.about.beneficiaries.map((item) => {
            const benefitStyle =
              benefitIconMap[item.title as keyof typeof benefitIconMap] ?? {
                icon: Users,
                accent: colors.cyan2,
              };
            const Icon = benefitStyle.icon;

            return (
              <Card
                key={item.title}
                style={{
                  ...aboutBenefitCardStyle,
                  borderColor: `${benefitStyle.accent}24`,
                }}
              >
                <div
                  style={{
                    ...styles.iconChip,
                    color: benefitStyle.accent,
                    background: `${benefitStyle.accent}16`,
                    border: `1px solid ${benefitStyle.accent}26`,
                  }}
                >
                  <Icon size={18} />
                </div>
                <h3 style={{ ...styles.cardTitle, textAlign: "left" }}>{item.title}</h3>
                <p style={{ ...styles.cardText, textAlign: "left", marginTop: 8 }}>
                  {item.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

export function PartnersSection() {
  const { disableMotion, isMobile, styles } = useResponsiveStyles();
  const fadeUp = React.useMemo(() => getFadeUp(isMobile), [isMobile]);
  const featuredPartners = siteData.partners.filter(
    (partner) =>
      partner.type !== "Community Partner" && partner.type !== "Support Partner"
  );

  function getPartnerDescription(partner: (typeof siteData.partners)[number]) {
    return partner.desc;
  }

  return (
    <motion.section
      id="partners"
      style={styles.sectionWrap}
      variants={disableMotion ? undefined : fadeUp}
      initial={disableMotion ? false : "hidden"}
      whileInView={disableMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.15 }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "minmax(0, 0.78fr) minmax(0, 1.22fr)",
          gap: isMobile ? 22 : 34,
          alignItems: isMobile ? "start" : "center",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: 16,
            maxWidth: isMobile ? "100%" : 420,
            alignContent: isMobile ? "start" : "center",
          }}
        >
          <div style={styles.label}>Partners</div>

          <h2
            style={{
              ...styles.sectionTitle,
              margin: 0,
              textAlign: "left",
            }}
          >
            Built alongside the right collaborators.
          </h2>

          <p
            style={{
              margin: 0,
              color: "rgba(203, 213, 225, 0.82)",
              lineHeight: 1.78,
              fontSize: isMobile ? 15 : 16,
            }}
          >
            NAVISense is being shaped with academic support and
            accessibility-focused collaboration, giving the project more
            grounding than a simple demo.
          </p>

        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(2, minmax(0, 1fr))",
            gap: 16,
            alignSelf: isMobile ? "stretch" : "center",
          }}
        >
          {featuredPartners.map((partner, idx) => (
            <Card
              key={`${partner.name}-${idx}`}
              style={{
                padding: isMobile ? 18 : 22,
                borderRadius: isMobile ? 20 : 22,
                display: "grid",
                gap: 18,
                borderColor: "rgba(255, 255, 255, 0.09)",
                background:
                  idx === 0
                    ? "linear-gradient(155deg, rgba(14, 20, 54, 0.46) 0%, rgba(18, 26, 62, 0.48) 52%, rgba(24, 34, 74, 0.34) 100%)"
                    : "linear-gradient(155deg, rgba(14, 20, 54, 0.42) 0%, rgba(20, 22, 64, 0.46) 52%, rgba(28, 20, 72, 0.34) 100%)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >
                <PartnerLogoBadge partner={partner} isMobile={isMobile} />

                <div
                  style={{
                    padding: "8px 12px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.10)",
                    background: "rgba(255,255,255,0.05)",
                    color: colors.cyan2,
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                  }}
                >
                  {partner.type.replace(" Partner", "")}
                </div>
              </div>

              <div style={{ display: "grid", gap: 8 }}>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: '"Syne", sans-serif',
                    fontSize: isMobile ? 22 : 23,
                    lineHeight: 1.08,
                    color: "#F8FAFC",
                  }}
                >
                  {partner.name}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "rgba(215, 226, 241, 0.82)",
                    lineHeight: 1.68,
                    fontSize: 14,
                  }}
                >
                  {getPartnerDescription(partner)}
                </p>
              </div>

            </Card>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export function UpdatesSection({ onOpenBlog, onSelectPost }: { onOpenBlog?: () => void; onSelectPost?: (post: (typeof siteData.updates)[number]) => void }) {
  const { disableMotion, isMobile, styles } = useResponsiveStyles();
  const fadeUp = React.useMemo(() => getFadeUp(isMobile), [isMobile]);
  // Sort posts by date descending (most recent first)
  const sortedPosts = [...siteData.updates].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  const displayedPosts = sortedPosts.slice(0, 3);
  const hasMore = sortedPosts.length > 3;

  const handleReadMore = (post: (typeof siteData.updates)[number]) => {
    onSelectPost?.(post);
    onOpenBlog?.();
  };

  return (
    <motion.section
      id="updates"
      style={styles.sectionWrap}
      variants={disableMotion ? undefined : fadeUp}
      initial={disableMotion ? false : "hidden"}
      whileInView={disableMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.15 }}
    >
      <SectionHeading
        eyebrow="Project blog"
        title="Latest development updates"
        description=""
      />

      <div style={styles.threeGrid}>
        {displayedPosts.map((post) => (
          <BlogCard key={`${post.title}-${post.date}`} post={post} onReadMore={handleReadMore} />
        ))}
      </div>

      {hasMore && onOpenBlog && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
          <button onClick={onOpenBlog} style={styles.buttonPrimary}>
            See all updates <ChevronRight size={18} style={{ marginLeft: "8px" }} />
          </button>
        </div>
      )}
    </motion.section>
  );
}

export function TrackerSection() {
  const { disableMotion, isMobile, styles } = useResponsiveStyles();
  const fadeUp = React.useMemo(() => getFadeUp(isMobile), [isMobile]);
  const [showMilestonesList, setShowMilestonesList] = React.useState(false);
  const completedMilestones = siteData.tracker.map((item) => item.title);
  const totalTasks = completedMilestones.length;
  const overallProgress = 100;
  const trackerStats = [
    {
      label: "Milestones done",
      value: `${totalTasks}/${totalTasks}`,
      icon: CheckCircle2,
      accent: "#34d399",
      hasMilestonesList: true,
    },
    {
      label: "Project state",
      value: "Ready",
      icon: ShieldAlert,
      accent: "#5FA9E8",
      note: "All milestones achieved",
    },
  ];
  const trackerBodyTextStyle: React.CSSProperties = {
    margin: 0,
    color: "rgba(224, 228, 233, 0.74)",
    fontSize: isMobile ? 14 : 15,
    lineHeight: 1.65,
  };
  const roadmapAccentMap = {
    complete: "#34d399",
    current: "#5FA9E8",
    upcoming: "#94a3b8",
  } as const;

  return (
    <motion.section
      id="tracker"
      style={styles.sectionWrap}
      variants={disableMotion ? undefined : fadeUp}
      initial={disableMotion ? false : "hidden"}
      whileInView={disableMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.15 }}
    >
      <SectionHeading
        eyebrow=""
        title="Progress Tracker"
        description=""
      />

      <div style={{ display: "grid", gap: isMobile ? 16 : 22 }}>
        <Card
          style={{
            padding: isMobile ? 18 : 24,
            borderRadius: isMobile ? 20 : 22,
            border: "1px solid rgba(255, 255, 255, 0.10)",
            background:
              "linear-gradient(135deg, rgba(10, 16, 44, 0.54) 0%, rgba(14, 22, 58, 0.50) 52%, rgba(24, 20, 64, 0.38) 100%)",
            boxShadow:
              "0 18px 42px rgba(2, 6, 23, 0.13), inset 0 1px 0 rgba(255,255,255,0.05)",
            overflow: "visible",
            zIndex: 80,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.05fr 0.95fr",
              gap: isMobile ? 18 : 24,
              alignItems: "stretch",
            }}
          >
            <div style={{ display: "grid", gap: 18, alignContent: "center" }}>
              <div
                style={{
                  display: "grid",
                  gap: 14,
                  marginTop: 0,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: '"Syne", sans-serif',
                      fontSize: isMobile ? 48 : 68,
                      lineHeight: 0.92,
                      letterSpacing: "-0.06em",
                      color: "#F8FAFC",
                    }}
                  >
                    {overallProgress}%
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      color: "rgba(224, 228, 233, 0.62)",
                      fontSize: 13,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      fontWeight: 700,
                    }}
                  >
                    Project completion
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      width: "fit-content",
                      padding: "9px 12px",
                      borderRadius: 999,
                      border: "1px solid rgba(52, 211, 153, 0.22)",
                      background: "rgba(52, 211, 153, 0.10)",
                      color: "#a7f3d0",
                      fontSize: 13,
                      fontWeight: 800,
                    }}
                  >
                    <CheckCircle2 size={15} />
                    All milestones achieved
                  </div>
                </div>
              </div>

              <div
                aria-label={`Project completion ${overallProgress}%`}
                style={{
                  position: "relative",
                  height: isMobile ? 12 : 14,
                  borderRadius: 999,
                  overflow: "hidden",
                  border: "1px solid rgba(95, 169, 232, 0.16)",
                  background: "rgba(255, 255, 255, 0.055)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 24px rgba(2, 6, 23, 0.14)",
                }}
              >
                <motion.div
                  aria-hidden="true"
                  initial={disableMotion ? false : { width: 0 }}
                  whileInView={{ width: `${overallProgress}%` }}
                  viewport={{ once: true, amount: 0.4 }}
	                  transition={disableMotion ? { duration: 0 } : { duration: 1.1, ease: "easeOut" }}
                  style={{
                    height: "100%",
                    borderRadius: 999,
                    background:
                      "linear-gradient(90deg, #f59e0b 0%, #fb7185 48%, #c084fc 100%)",
                    boxShadow: "0 0 18px rgba(251, 113, 133, 0.32)",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {!disableMotion ? (
                    <motion.div
                      aria-hidden="true"
	                      animate={{ x: ["-120%", "220%"] }}
	                      transition={{
	                        duration: 1.6,
	                        ease: "linear",
	                        repeat: Infinity,
	                        repeatDelay: 0.15,
	                      }}
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        width: "38%",
                        background:
                          "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.46) 48%, rgba(255,255,255,0) 100%)",
                        filter: "blur(1px)",
                      }}
                    />
                  ) : null}
                </motion.div>
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0) 58%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>

            <div
              onMouseLeave={() => setShowMilestonesList(false)}
              style={{
                position: "relative",
                zIndex: 90,
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
                gap: 12,
                alignContent: "start",
              }}
            >
              {trackerStats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    tabIndex={stat.hasMilestonesList ? 0 : undefined}
                    aria-describedby={stat.hasMilestonesList ? "completed-milestones-list" : undefined}
                    onMouseEnter={() => stat.hasMilestonesList && setShowMilestonesList(true)}
                    onFocus={() => stat.hasMilestonesList && setShowMilestonesList(true)}
                    onBlur={() => stat.hasMilestonesList && setShowMilestonesList(false)}
                    style={{
                      position: "relative",
                      padding: isMobile ? 14 : 16,
                      borderRadius: 18,
                      border: `1px solid ${stat.accent}1f`,
                      background:
                        "linear-gradient(160deg, rgba(255,255,255,0.026) 0%, rgba(255,255,255,0.010) 100%)",
                      boxShadow: "0 10px 20px rgba(2, 6, 23, 0.07)",
                      display: "grid",
                      gap: 12,
                      overflow: "visible",
                      outline: "none",
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        inset: "0 0 auto 0",
                        height: 2,
                        background: `linear-gradient(90deg, ${stat.accent} 0%, rgba(255,255,255,0) 100%)`,
                      }}
                    />

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          color: "rgba(224, 228, 233, 0.68)",
                          fontSize: 11,
                          lineHeight: 1.45,
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          fontWeight: 700,
                        }}
                      >
                        {stat.label}
                      </div>

                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 12,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: `${stat.accent}18`,
                          color: stat.accent,
                          boxShadow: `inset 0 0 0 1px ${stat.accent}22`,
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={18} />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: '"Syne", sans-serif',
                          fontSize: isMobile ? 28 : 34,
                          lineHeight: 0.95,
                          color: "#F8FAFC",
                        }}
                      >
                        {stat.value}
                      </div>

                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 999,
                          background: stat.accent,
                          boxShadow: `0 0 16px ${stat.accent}88`,
                          flexShrink: 0,
                        }}
                      />
                    </div>

                    {stat.note ? (
                      <div
                        style={{
                          color: "rgba(224, 228, 233, 0.68)",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        {stat.note}
                      </div>
                    ) : null}

                    {stat.hasMilestonesList && showMilestonesList ? (
                      <div
                        id="completed-milestones-list"
                        role="tooltip"
                        style={{
                          position: "absolute",
                          top: "calc(100% + 10px)",
                          left: 0,
                          zIndex: 10000,
                          width: isMobile ? "min(100%, 360px)" : 360,
                          padding: 16,
                          borderRadius: 18,
                          border: "1px solid rgba(95, 169, 232, 0.40)",
                          background: "rgb(1, 5, 15)",
                          backgroundColor: "rgb(1, 5, 15)",
                          backgroundImage: "none",
                          opacity: 1,
                          isolation: "isolate",
                          mixBlendMode: "normal",
                          transform: "translateZ(0)",
                          boxShadow:
                            "0 26px 56px rgba(0, 0, 0, 0.78), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 2px rgba(1, 5, 15, 1), 0 0 28px rgba(95, 169, 232, 0.24)",
                        }}
                      >
                        <div
                          style={{
                            marginBottom: 12,
                            color: colors.cyan2,
                            fontSize: 11,
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "0.12em",
                          }}
                        >
                          Completed milestones
                        </div>
                        <ul
                          style={{
                            margin: 0,
                            padding: 0,
                            listStyle: "none",
                            display: "grid",
                            gap: 8,
                          }}
                        >
                          {completedMilestones.map((milestone) => (
                            <li
                              key={milestone}
                              style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                minHeight: 42,
                                padding: "9px 11px 9px 13px",
                                borderRadius: 13,
                                border: "1px solid rgba(95, 169, 232, 0.20)",
                                background: "rgb(5, 13, 31)",
                                backgroundColor: "rgb(5, 13, 31)",
                                backgroundImage: "none",
                                opacity: 1,
                                boxShadow:
                                  "0 10px 20px rgba(2, 6, 23, 0.28), inset 0 1px 0 rgba(255,255,255,0.06)",
                                color: "#F8FAFC",
                                fontSize: 14,
                                fontWeight: 750,
                                lineHeight: 1.35,
                                overflow: "hidden",
                              }}
                            >
                              <span
                                aria-hidden="true"
                                style={{
                                  position: "absolute",
                                  inset: "0 auto 0 0",
                                  width: 3,
                                  background:
                                    "linear-gradient(180deg, rgba(95, 169, 232, 1) 0%, rgba(52, 211, 153, 0.90) 100%)",
                                  boxShadow: "0 0 16px rgba(95, 169, 232, 0.56)",
                                }}
                              />
                              <span
                                aria-hidden="true"
                                style={{
                                  width: 22,
                                  height: 22,
                                  borderRadius: 999,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "rgb(9, 27, 58)",
                                  backgroundColor: "rgb(9, 27, 58)",
                                  color: colors.cyan2,
                                  boxShadow:
                                    "0 0 16px rgba(95, 169, 232, 0.38), inset 0 0 0 1px rgba(95, 169, 232, 0.28)",
                                  flexShrink: 0,
                                }}
                              >
                                <CheckCircle2 size={14} />
                              </span>
                              <span style={{ position: "relative", zIndex: 1 }}>{milestone}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        <Card
          style={{
            padding: isMobile ? 18 : 22,
	            borderRadius: isMobile ? 20 : 22,
	            display: "grid",
	            gap: 18,
              borderColor: "rgba(255, 255, 255, 0.09)",
              background:
                "linear-gradient(160deg, rgba(14, 20, 54, 0.36) 0%, rgba(18, 24, 62, 0.40) 58%, rgba(22, 22, 66, 0.30) 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                color: colors.cyan2,
                fontFamily: '"Syne", sans-serif',
                fontSize: isMobile ? 24 : 28,
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              Roadmap
            </div>

            <div
              style={{
                padding: "10px 14px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(224, 228, 233, 0.72)",
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {trackerRoadmap.length} phases mapped
            </div>
          </div>

          {isMobile ? (
            <div style={{ display: "grid", gap: 12 }}>
              {trackerRoadmap.map((item, index) => {
                const accent = roadmapAccentMap[item.state as keyof typeof roadmapAccentMap];

                return (
                  <div
                    key={`${item.period}-${item.title}`}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: 12,
                      alignItems: "start",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: 18,
                        display: "flex",
                        justifyContent: "center",
                        minHeight: index === trackerRoadmap.length - 1 ? 16 : 92,
                      }}
                    >
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          background: accent,
                          boxShadow: `0 0 18px ${accent}55`,
                          marginTop: 4,
                          zIndex: 1,
                        }}
                      />
                      {index !== trackerRoadmap.length - 1 ? (
                        <div
                          style={{
                            position: "absolute",
                            top: 18,
                            bottom: 0,
                            width: 2,
                            borderRadius: 999,
                            background: "rgba(255,255,255,0.08)",
                          }}
                        />
                      ) : null}
                    </div>

                    <div
                      style={{
                        padding: "0 0 2px",
                        display: "grid",
                        gap: 6,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 12,
                          color: colors.cyan2,
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          fontWeight: 700,
                        }}
                      >
                        {item.period}
                      </div>
                      <div
                        style={{
                          fontFamily: '"Syne", sans-serif',
                          fontSize: 18,
                          lineHeight: 1.08,
                          color: "#F8FAFC",
                        }}
                      >
                        {item.title}
                      </div>
                      <p style={{ ...trackerBodyTextStyle, fontSize: 14 }}>{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ position: "relative" }}>
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 18,
                  left: "8%",
                  right: "8%",
                  height: 2,
                  borderRadius: 999,
                  background:
                    "linear-gradient(90deg, rgba(52, 211, 153, 0.34) 0%, rgba(95, 169, 232, 0.28) 48%, rgba(148, 163, 184, 0.24) 100%)",
                }}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${trackerRoadmap.length}, minmax(0, 1fr))`,
                  gap: 16,
                  alignItems: "start",
                }}
              >
                {trackerRoadmap.map((item) => {
                  const accent = roadmapAccentMap[item.state as keyof typeof roadmapAccentMap];

                  return (
                    <div
                      key={`${item.period}-${item.title}`}
                      style={{
                        position: "relative",
                        display: "grid",
                        gap: 14,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          minHeight: 38,
                        }}
                      >
                        <div
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: 999,
                            background: accent,
                            boxShadow: `0 0 18px ${accent}66`,
                            flexShrink: 0,
                            zIndex: 1,
                          }}
                        />
                        <div
                          style={{
                            fontSize: 12,
                            color: colors.cyan2,
                            textTransform: "uppercase",
                            letterSpacing: "0.12em",
                            fontWeight: 700,
                          }}
                        >
                          {item.period}
                        </div>
                      </div>

                      <div
                        style={{
                          minHeight: 168,
                          padding: "18px 16px",
                          borderRadius: 22,
                          border: `1px solid ${accent}24`,
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                          display: "grid",
                          alignContent: "start",
                          gap: 8,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: '"Syne", sans-serif',
                            fontSize: 20,
                            lineHeight: 1.08,
                            color: "#F8FAFC",
                          }}
                        >
                          {item.title}
                        </div>

                        <p style={{ ...trackerBodyTextStyle, fontSize: 14 }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Card>
      </div>
    </motion.section>
  );
}

export function TeamSection() {
  const { disableMotion, isMobile, styles } = useResponsiveStyles();
  const fadeUp = React.useMemo(() => getFadeUp(isMobile), [isMobile]);

  return (
    <motion.section
      id="team"
      style={styles.sectionWrap}
      variants={disableMotion ? undefined : fadeUp}
      initial={disableMotion ? false : "hidden"}
      whileInView={disableMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.15 }}
    >
      <SectionHeading
        eyebrow="Team"
        title="Project development crew"
        description=""
      />

      <div style={styles.teamGrid}>
        {siteData.team.map((member) => {
          const roleStyle =
            teamRoleIcons[member.name as keyof typeof teamRoleIcons] ?? {
              icon: Users,
              accent: colors.cyan2,
              label: "Project",
            };
          const RoleIcon = roleStyle.icon;

          return (
            <Card
              key={member.name}
              style={{
                padding: isMobile ? 16 : 20,
                borderRadius: isMobile ? 20 : 22,
                display: "grid",
                gap: 16,
                borderColor: "rgba(255, 255, 255, 0.09)",
                background:
                  "linear-gradient(168deg, rgba(14, 20, 54, 0.40) 0%, rgba(18, 24, 62, 0.44) 58%, rgba(22, 22, 66, 0.34) 100%)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  title={member.role}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 13,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: roleStyle.accent,
                    border: `1px solid ${roleStyle.accent}26`,
                    background: `${roleStyle.accent}14`,
                    boxShadow: `0 0 14px ${roleStyle.accent}10`,
                  }}
                >
                  <RoleIcon size={18} />
                </div>

                <div style={styles.teamIcons}>
                  {hasExternalLink(member.cv) ? (
                  <a
                    href={member.cv}
                    style={styles.teamIconLink}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} CV`}
                  >
                    <FileText size={16} />
                  </a>
                  ) : null}

                  {member.email ? (
                    <a
                      href={`mailto:${member.email}`}
                      style={styles.teamIconLink}
                      aria-label={`${member.name} email`}
                    >
                      <Mail size={16} />
                    </a>
                  ) : null}

                  {hasExternalLink(member.linkedin) ? (
                    <a
                      href={member.linkedin}
                      style={styles.teamIconLink}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin size={16} />
                    </a>
                  ) : null}
                </div>
              </div>

              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  minHeight: isMobile ? 228 : 286,
                  height: isMobile ? 228 : 286,
                  marginBottom: 0,
                  overflow: "visible",
                  padding: 0,
                }}
              >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at 50% 16%, rgba(95, 169, 232, 0.075) 0%, rgba(95, 169, 232, 0.028) 20%, transparent 54%)",
                  pointerEvents: "none",
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: isMobile ? "30%" : "32%",
                  right: isMobile ? "30%" : "32%",
                  top: isMobile ? 20 : 24,
                  bottom: isMobile ? 34 : 38,
                  borderRadius: 999,
                  background:
                    "linear-gradient(180deg, rgba(95, 169, 232, 0.055) 0%, rgba(95, 169, 232, 0.016) 34%, rgba(95, 169, 232, 0) 100%)",
                  filter: "blur(14px)",
                  opacity: 0.7,
                  pointerEvents: "none",
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "20%",
                  right: "20%",
                  bottom: 14,
                  height: 22,
                  borderRadius: 999,
                  background:
                    "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.025) 45%, rgba(255,255,255,0) 76%)",
                  filter: "blur(8px)",
                  pointerEvents: "none",
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "22%",
                  right: "22%",
                  bottom: 10,
                  height: 1,
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0) 100%)",
                  pointerEvents: "none",
                }}
              />
              {teamPhotos[member.name] ? (
	                <RevealImage
	                  src={teamPhotos[member.name]}
	                  alt={member.name}
	                  style={styles.teamPhoto as React.CSSProperties}
	                  loading="lazy"
	                  decoding="async"
	                  fetchPriority="low"
	                />
              ) : (
                <div style={styles.memberAvatar}>{member.initials}</div>
              )}
              </div>

              <div style={{ display: "grid", gap: 9, marginTop: isMobile ? 10 : 14 }}>
                <div>
                  <h3 style={{ ...styles.cardTitle, textAlign: "left", fontSize: isMobile ? 22 : 24 }}>
                    {member.name}
                  </h3>
                  <div
                    aria-hidden="true"
                    style={{
                      width: "64%",
                      height: 1,
                      marginTop: 6,
                      background:
                        "linear-gradient(90deg, rgba(95, 169, 232, 0.82) 0%, rgba(95, 169, 232, 0.26) 58%, rgba(95, 169, 232, 0) 100%)",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "fit-content",
                    padding: "6px 9px",
                    borderRadius: 999,
                    border: `1px solid ${roleStyle.accent}22`,
                    background: `${roleStyle.accent}12`,
                    color: roleStyle.accent,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {roleStyle.label}
                </div>
                <p
                  style={{
                    ...styles.cardText,
                    textAlign: "left",
                    color: "rgba(224, 228, 233, 0.74)",
                    marginTop: 0,
                    lineHeight: 1.52,
                    fontSize: isMobile ? 13.5 : 14,
                  }}
                >
                  {member.role}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </motion.section>
  );
}

export function RoadmapSection() {
  const { disableMotion, isMobile, styles } = useResponsiveStyles();
  const fadeUp = React.useMemo(() => getFadeUp(isMobile), [isMobile]);
  return (
    <motion.section
      id="roadmap"
      style={styles.sectionWrap}
      variants={disableMotion ? undefined : fadeUp}
      initial={disableMotion ? false : "hidden"}
      whileInView={disableMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.15 }}
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
  const { disableMotion, isMobile, styles } = useResponsiveStyles();
  return (
    <motion.footer
      id="contact"
      initial={disableMotion ? false : { opacity: 0 }}
      whileInView={disableMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, amount: 0.12 }}
	      transition={disableMotion ? undefined : { duration: 0.55, ease: "easeOut" }}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        marginTop: isMobile ? 78 : 112,
        padding: isMobile
          ? "70px 0 max(28px, env(safe-area-inset-bottom))"
          : "96px 0 34px",
        background:
          "linear-gradient(180deg, rgba(2, 3, 38, 0) 0%, rgba(3, 9, 42, 0.58) 28%, rgba(4, 9, 43, 0.94) 72%, rgba(2, 4, 24, 1) 100%)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          height: 1,
          background:
            "linear-gradient(90deg, rgba(95,169,232,0) 0%, rgba(95,169,232,0.36) 45%, rgba(168,143,255,0.24) 62%, rgba(95,169,232,0) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          height: isMobile ? 110 : 150,
          background:
            "linear-gradient(180deg, rgba(95,169,232,0.10) 0%, rgba(95,169,232,0.025) 40%, rgba(95,169,232,0) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1040,
          margin: "0 auto",
          padding: isMobile ? "0 18px" : "0 30px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "minmax(0, 1.25fr) minmax(160px, 0.48fr) minmax(210px, 0.62fr)",
            gap: isMobile ? 34 : 50,
            alignItems: "start",
            textAlign: isMobile ? "center" : "left",
            minWidth: 0,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: '"Syne", sans-serif',
                fontWeight: 700,
                fontSize: isMobile ? 26 : 34,
                lineHeight: 1,
                letterSpacing: "-0.045em",
                color: "#F8FAFC",
              }}
            >
              {siteData.project.name}
            </div>
            <div
              aria-hidden="true"
              style={{
                width: isMobile ? 90 : 124,
                height: 1,
                margin: isMobile ? "16px auto 18px" : "18px 0 20px",
                background:
                  "linear-gradient(90deg, rgba(95,169,232,0.92) 0%, rgba(95,169,232,0.25) 66%, rgba(95,169,232,0) 100%)",
              }}
            />
            <p
              style={{
                margin: 0,
                color: "#d7e2f1",
                lineHeight: 1.72,
                fontSize: isMobile ? 14 : 15,
                maxWidth: isMobile ? "100%" : 440,
              }}
            >
              Multisensory wearable navigation, built to improve confidence,
              awareness, and safer movement.
            </p>
            <p
              style={{
                margin: "18px 0 0",
                color: "rgba(224, 228, 233, 0.58)",
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              {siteData.project.acknowledgements}
            </p>
          </div>

          <nav aria-label="Footer navigation" style={{ minWidth: 0 }}>
            <div style={{ ...styles.label, marginBottom: 16, textAlign: isMobile ? "center" : "left" }}>
              Navigate
            </div>
            <div
              style={{
                display: "grid",
                gap: 10,
                justifyItems: isMobile ? "center" : "start",
              }}
            >
              {siteData.nav.map((item) => (
                <a
                  key={item}
                  href={`#${sectionIds[item as keyof typeof sectionIds]}`}
                  style={{
                    color: "rgba(224, 228, 233, 0.76)",
                    textDecoration: "none",
                    fontSize: 14,
                    lineHeight: 1.35,
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(event) => {
                    const element = event.currentTarget as HTMLAnchorElement;
                    element.style.color = colors.cyan2;
                  }}
                  onMouseLeave={(event) => {
                    const element = event.currentTarget as HTMLAnchorElement;
                    element.style.color = "rgba(224, 228, 233, 0.76)";
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </nav>

          <div style={{ minWidth: 0 }}>
            <div style={{ ...styles.label, marginBottom: 16, textAlign: isMobile ? "center" : "left" }}>
              Contact
            </div>
            <div style={{ display: "grid", gap: 14, justifyItems: isMobile ? "center" : "start" }}>
              {siteData.project.email ? (
                <a
                  href={`mailto:${siteData.project.email}`}
                  style={{
                    color: "#F8FAFC",
                    textDecoration: "none",
                    fontSize: isMobile ? 14 : 15,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    lineHeight: 1.35,
                    transition: "color 0.2s ease",
                    maxWidth: "100%",
                    minWidth: 0,
                    overflowWrap: "anywhere",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = colors.cyan2;
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color = "#F8FAFC";
                  }}
                >
                  <Mail size={16} style={{ flexShrink: 0 }} />
                  <span
                    style={{
                      minWidth: 0,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {siteData.project.email}
                  </span>
                </a>
              ) : (
                <p
                  style={{
                    margin: 0,
                    color: "rgba(224, 228, 233, 0.72)",
                    fontSize: isMobile ? 14 : 15,
                    lineHeight: 1.55,
                    maxWidth: 250,
                  }}
                >
                  Contact details are shared through the project team channels.
                </p>
              )}
              {siteData.project.linkedin ? (
                <div
                  style={{
                    display: "flex",
                    gap: 14,
                    justifyContent: isMobile ? "center" : "flex-start",
                  }}
                >
                  <a
                    href={siteData.project.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: colors.cyan2, opacity: 0.84, transition: "opacity 0.2s ease" }}
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: isMobile ? 38 : 54,
            paddingTop: isMobile ? 18 : 22,
            borderTop: "1px solid rgba(95, 169, 232, 0.12)",
            display: "flex",
            justifyContent: isMobile ? "center" : "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 14,
            textAlign: isMobile ? "center" : "left",
            color: "rgba(224, 228, 233, 0.58)",
            fontSize: 12,
            minWidth: 0,
          }}
        >
          <p style={{ margin: 0, minWidth: 0 }}>
            {siteData.project.name} 2026
          </p>
          <p style={{ margin: 0, minWidth: 0 }}>Designed with clarity and credibility.</p>
        </div>
      </div>
    </motion.footer>
  );
}
