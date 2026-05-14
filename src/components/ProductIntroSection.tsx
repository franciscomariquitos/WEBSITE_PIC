import React from "react";
import {
  ArrowDown,
  BatteryCharging,
  CircuitBoard,
  Cpu,
  FileText,
  MapPinned,
  Radio,
  Vibrate,
} from "lucide-react";
import { withBaseUrl } from "../utils/assetUrl";
import { useResponsive } from "../context/ResponsiveContext";
import "./ProductIntroSection.css";

const VestScene3D = React.lazy(() =>
  import("./VestScene3D").then((module) => ({
    default: module.VestScene3D,
  }))
);

const VEST_MODEL_VERSION =
  import.meta.env.VITE_NAVISENSE_VEST_MODEL_VERSION || "blender-panel-v3-20260514";
const posterUrl = `${withBaseUrl("models/navisense-vest-poster.svg")}?v=${encodeURIComponent(
  VEST_MODEL_VERSION
)}`;

const hotspots = [
  {
    key: "electronics_box",
    title: "Side electronics box",
    body: "Compact enclosure for the connected sensing and control hardware.",
    icon: CircuitBoard,
  },
  {
    key: "controller",
    title: "Embedded controller",
    body: "Coordinates sensor readings, vest logic, and communication with the mobile app.",
    icon: Cpu,
  },
  {
    key: "battery",
    title: "Power module",
    body: "Dedicated battery pack for wearable operation during navigation sessions.",
    icon: BatteryCharging,
  },
  {
    key: "depth_sensors",
    title: "Depth sensing",
    body: "Forward-facing sensing layer for obstacle awareness and spatial feedback.",
    icon: Radio,
  },
  {
    key: "haptic_motors",
    title: "Haptic feedback",
    body: "Vibration cues translate environmental information into intuitive body feedback.",
    icon: Vibrate,
  },
  {
    key: "gps_phone_link",
    title: "Phone and GPS link",
    body: "The app contributes location and bridges the vest to the NaviCare dashboard.",
    icon: MapPinned,
  },
] as const;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function segmentLinear(progress: number, start: number, end: number) {
  return clamp01((progress - start) / (end - start));
}

function smoothstep(value: number) {
  const next = clamp01(value);
  return next * next * (3 - 2 * next);
}

function easeInOutSine(value: number) {
  const next = clamp01(value);
  return -(Math.cos(Math.PI * next) - 1) / 2;
}

function easeOutQuart(value: number) {
  const next = clamp01(value);
  return 1 - Math.pow(1 - next, 4);
}

function segmentEased(
  progress: number,
  start: number,
  end: number,
  easing: (value: number) => number = smoothstep
) {
  return easing(segmentLinear(progress, start, end));
}

const MIN_DISPLAY_PROGRESS_DAMPING = 7.2;
const MAX_DISPLAY_PROGRESS_DAMPING = 13.4;
const DISPLAY_PROGRESS_BOOST_DISTANCE = 0.15;
const DISPLAY_PROGRESS_EPSILON = 0.00075;

function dampProgress(current: number, target: number, damping: number, delta: number) {
  return current + (target - current) * (1 - Math.exp(-damping * delta));
}

function getDisplayProgressDamping(distance: number) {
  return (
    MIN_DISPLAY_PROGRESS_DAMPING +
    (MAX_DISPLAY_PROGRESS_DAMPING - MIN_DISPLAY_PROGRESS_DAMPING) *
      easeOutQuart(distance / DISPLAY_PROGRESS_BOOST_DISTANCE)
  );
}

function useIntroScrollProgress(enabled: boolean) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const rawProgressRef = React.useRef(0);
  const displayProgressRef = React.useRef(0);
  const displayFrameRef = React.useRef(0);
  const displayLastTimeRef = React.useRef(0);
  const [rawProgress, setRawProgress] = React.useState(0);
  const [displayProgress, setDisplayProgress] = React.useState(0);
  const [active, setActive] = React.useState(false);

  const cancelDisplayProgress = React.useCallback(() => {
    if (displayFrameRef.current) {
      window.cancelAnimationFrame(displayFrameRef.current);
      displayFrameRef.current = 0;
    }
  }, []);

  const requestDisplayProgress = React.useCallback(() => {
    if (!enabled || displayFrameRef.current) {
      return;
    }

    displayLastTimeRef.current = performance.now();

    const tick = (time: number) => {
      displayFrameRef.current = 0;
      const delta = Math.min(0.05, (time - displayLastTimeRef.current) / 1000);
      displayLastTimeRef.current = time;
      const targetProgress = rawProgressRef.current;
      const progressDistance = Math.abs(targetProgress - displayProgressRef.current);

      let nextProgress = dampProgress(
        displayProgressRef.current,
        targetProgress,
        getDisplayProgressDamping(progressDistance),
        delta
      );

      if (Math.abs(nextProgress - targetProgress) <= DISPLAY_PROGRESS_EPSILON) {
        nextProgress = targetProgress;
      }

      displayProgressRef.current = nextProgress;
      setDisplayProgress((current) =>
        Math.abs(current - nextProgress) > DISPLAY_PROGRESS_EPSILON
          ? nextProgress
          : current
      );

      if (Math.abs(nextProgress - targetProgress) > DISPLAY_PROGRESS_EPSILON) {
        displayFrameRef.current = window.requestAnimationFrame(tick);
      }
    };

    displayFrameRef.current = window.requestAnimationFrame(tick);
  }, [enabled]);

  React.useEffect(() => {
    if (!enabled) {
      cancelDisplayProgress();
      rawProgressRef.current = 0;
      displayProgressRef.current = 0;
      setRawProgress(0);
      setDisplayProgress(0);
      setActive(false);
    }

    return () => {
      cancelDisplayProgress();
    };
  }, [cancelDisplayProgress, enabled]);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!enabled || !section) {
      rawProgressRef.current = 0;
      setRawProgress(0);
      setActive(false);
      return undefined;
    }

    let frameId = 0;

    const getMetrics = () => {
      const rect = section.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const travel = Math.max(1, rect.height - window.innerHeight);

      return {
        bottom: top + travel,
        top,
        travel,
      };
    };

    const update = () => {
      frameId = 0;
      const { top, travel } = getMetrics();
      const nextProgress = clamp01((window.scrollY - top) / travel);
      rawProgressRef.current = nextProgress;
      setRawProgress((current) =>
        Math.abs(current - nextProgress) > 0.002 ? nextProgress : current
      );
      requestDisplayProgress();
    };

    const requestUpdate = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(update);
      }
    };

    const handleScrollSync = () => {
      requestUpdate();
    };

    const handleHardSync = () => {
      requestUpdate();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(Boolean(entry?.isIntersecting));
        requestUpdate();
      },
      {
        threshold: [0, 0.08, 0.25, 0.5, 0.75, 1],
      }
    );

    observer.observe(section);
    window.addEventListener("scroll", handleScrollSync, { passive: true });
    window.addEventListener("resize", handleHardSync);
    window.addEventListener("hashchange", handleHardSync);
    requestUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollSync);
      window.removeEventListener("resize", handleHardSync);
      window.removeEventListener("hashchange", handleHardSync);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [enabled, requestDisplayProgress]);

  return { active, displayProgress, rawProgress, sectionRef };
}

function IntroPoster() {
  return (
    <div className="product-intro-poster" aria-hidden="true">
      <img src={posterUrl} alt="" loading="eager" decoding="async" />
    </div>
  );
}

function ComponentCards({ progress }: { progress: number }) {
  return (
    <div className="product-intro-components" aria-label="NAVISense Vest components">
      {hotspots.map((item, index) => {
        const Icon = item.icon;
        const revealAt = 0.68 + index * 0.035;
        const visible = progress >= revealAt;

        return (
          <article
            className={`product-intro-component ${visible ? "product-intro-component--visible" : ""}`}
            key={item.key}
          >
            <span className="product-intro-component-icon">
              <Icon size={18} aria-hidden="true" />
            </span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function ComponentCallouts({ progress }: { progress: number }) {
  return (
    <div className="product-intro-callouts" aria-label="NAVISense Vest component callouts">
      {hotspots.map((item, index) => {
        const Icon = item.icon;
        const revealAt = 0.79 + index * 0.024;
        const reveal = segmentEased(progress, revealAt, revealAt + 0.115, easeOutQuart);
        const visible = reveal > 0.02;

        return (
          <article
            className={`product-intro-callout product-intro-callout--${item.key} ${
              visible ? "product-intro-callout--visible" : ""
            }`}
            key={item.key}
            style={
              {
                "--callout-line-reveal": reveal,
                "--callout-opacity": reveal,
                "--callout-y": `${(1 - reveal) * 5}px`,
                "--callout-scale": 0.992 + reveal * 0.008,
              } as React.CSSProperties
            }
          >
            <span className="product-intro-callout-dot" aria-hidden="true" />
            <span className="product-intro-callout-line" aria-hidden="true" />
            <span className="product-intro-callout-icon">
              <Icon size={15} aria-hidden="true" />
            </span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function ProductIntroSection() {
  const { isMobile, prefersReducedMotion } = useResponsive();
  const enable3D = !isMobile && !prefersReducedMotion;
  const { active, displayProgress, sectionRef } = useIntroScrollProgress(enable3D);
  const progress = enable3D ? displayProgress : 0;
  const copyExit = enable3D ? segmentEased(progress, 0.035, 0.215, easeInOutSine) : 0;
  const centerProgress = enable3D ? segmentEased(progress, 0.04, 0.43, easeInOutSine) : 0;
  const explodeProgress = enable3D ? segmentEased(progress, 0.6, 0.94, easeInOutSine) : 0;
  const calloutProgress = enable3D ? segmentEased(progress, 0.78, 0.965, easeOutQuart) : 0;

  return (
    <section
      className={`product-intro-section ${enable3D ? "product-intro-section--scroll" : "product-intro-section--static"}`}
      id="top"
      ref={sectionRef}
    >
      <div
        className="product-intro-sticky"
        style={
          {
            "--intro-progress": progress,
            "--copy-exit": copyExit,
            "--center-progress": centerProgress,
            "--explode-progress": explodeProgress,
            "--callout-progress": calloutProgress,
          } as React.CSSProperties
        }
      >
        <div className="product-intro-copy">
          <p className="product-intro-eyebrow">
            <span />
            Product system
          </p>
          <h1>NaviSense Vest</h1>
          <p>
            A connected multisensory assistive vest built around spatial sensing,
            haptic feedback, and remote monitoring.
          </p>

          <div className="product-intro-actions">
            <a href="#about" className="product-intro-link">
              Scroll to explore <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a
              className="product-intro-button"
              download="NAVISense_Project_Proposal.pdf"
              href={withBaseUrl("proposal.pdf")}
            >
              <FileText size={16} aria-hidden="true" />
              Project proposal
            </a>
          </div>

          {!enable3D ? <ComponentCards progress={1} /> : null}
        </div>

        <div className="product-intro-visual">
          <div className="product-intro-orbit" />
          {enable3D ? (
            <React.Suspense fallback={<IntroPoster />}>
              <VestScene3D active={active} progress={progress} />
            </React.Suspense>
          ) : (
            <IntroPoster />
          )}
          {enable3D ? <ComponentCallouts progress={progress} /> : null}
        </div>
      </div>
    </section>
  );
}
