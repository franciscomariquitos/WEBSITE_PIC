import React from "react";
import {
  BatteryCharging,
  Box,
  Cable,
  CircuitBoard,
  Cpu,
  Radio,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useResponsive } from "../context/ResponsiveContext";
import { withBaseUrl } from "../utils/assetUrl";
import "./ExplodedBoxSection.css";

const ASSET_VERSION = "box-exploded-frames-20260613";
const posterUrl = withBaseUrl("animations/box-exploded-poster.webp") + "?v=" + ASSET_VERSION;
const FRAME_COUNT = 301;
const FRAME_DRAW_WIDTH = 900;
const FRAME_DRAW_HEIGHT = 720;
const FRAME_LOAD_CONCURRENCY = 16;
const CANVAS_READY_FRAME_COUNT = 82;

type FocusBox = {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: string;
  rotate?: number;
};

type BoxModuleConfig = {
  key: string;
  title: string;
  body: string;
  icon: LucideIcon;
  start: number;
  end: number;
  textStart?: number;
  textDuration?: number;
  accent: string;
  focus: FocusBox;
  focusStart?: FocusBox;
  card: { x: number; y: number; shiftX: string; shiftY: string };
  connector: { x2: number; y2: number };
};

const boxModules = [
  {
    key: "enclosure",
    title: "Protective enclosure",
    body: "Printed shell protects the electronics and opens to reveal how every module is mounted.",
    icon: Box,
    start: 0.04,
    end: 0.18,
    textStart: 0.055,
    accent: "#5fa9e8",
    focusStart: { x: 55.2, y: 39.8, width: 28.6, height: 38.1, radius: "18px", rotate: -20 },
    focus: { x: 69.4, y: 23.4, width: 29.8, height: 39.8, radius: "18px", rotate: -20 },
    card: { x: 104, y: 0, shiftX: "0", shiftY: "0" },
    connector: { x2: 99, y2: 18 },
  },
  {
    key: "controller",
    title: "ESP32 controller",
    body: "Reads sensor signals, runs the control logic, and sends data to the app.",
    icon: Cpu,
    start: 0.19,
    end: 0.34,
    textStart: 0.215,
    accent: "#a88fff",
    focusStart: { x: 36.7, y: 51.3, width: 11.9, height: 24.7, radius: "11px", rotate: -9 },
    focus: { x: 37.8, y: 55.2, width: 9.8, height: 17, radius: "10px", rotate: -8 },
    card: { x: -4, y: 50, shiftX: "-100%", shiftY: "0" },
    connector: { x2: 1, y2: 55 },
  },
  {
    key: "cell",
    title: "Li-ion cell",
    body: "Portable Li-ion power source for wearable testing.",
    icon: BatteryCharging,
    start: 0.35,
    end: 0.49,
    textStart: 0.375,
    accent: "#ffd966",
    focusStart: { x: 51.9, y: 55.6, width: 9.9, height: 21.8, radius: "999px", rotate: -10 },
    focus: { x: 57.9, y: 48.9, width: 10.4, height: 21.9, radius: "999px", rotate: -10 },
    card: { x: 104, y: 50, shiftX: "0", shiftY: "0" },
    connector: { x2: 99, y2: 55 },
  },
  {
    key: "sensor-path",
    title: "Sensor connector path",
    body: "Routes external sensor lines into the box without tangling the vest wiring.",
    icon: Cable,
    start: 0.5,
    end: 0.62,
    textStart: 0.52,
    accent: "#22d3ee",
    focusStart: { x: 36.7, y: 51.3, width: 11.9, height: 24.7, radius: "10px", rotate: -8 },
    focus: { x: 38.8, y: 41.4, width: 11, height: 11, radius: "9px", rotate: -8 },
    card: { x: -4, y: 0, shiftX: "-100%", shiftY: "0" },
    connector: { x2: 1, y2: 18 },
  },
  {
    key: "transistors",
    title: "Transistor driver stage",
    body: "Switches the haptic outputs so the ESP32 can safely drive vibration feedback.",
    icon: Radio,
    start: 0.63,
    end: 0.76,
    textStart: 0.655,
    accent: "#fb7185",
    focusStart: { x: 51.5, y: 56.5, width: 12.2, height: 26, radius: "9px", rotate: -7 },
    focus: { x: 56.8, y: 55.2, width: 11.4, height: 14.5, radius: "8px", rotate: -7 },
    card: { x: 104, y: 92, shiftX: "0", shiftY: "-20%" },
    connector: { x2: 99, y2: 82 },
  },
  {
    key: "breadboard",
    title: "Breadboard mounting base",
    body: "Prototype mounting base where the ESP32, power, driver stage, and wiring sit together.",
    icon: CircuitBoard,
    start: 0.77,
    end: 1,
    textStart: 0.79,
    textDuration: 0.12,
    accent: "#34d399",
    focusStart: { x: 39.4, y: 64.3, width: 13, height: 35.1, radius: "8px", rotate: -6 },
    focus: { x: 39.8, y: 65.3, width: 25.5, height: 31, radius: "8px", rotate: -6 },
    card: { x: -4, y: 112, shiftX: "-100%", shiftY: "-25%" },
    connector: { x2: 1, y2: 96 },
  },
] satisfies readonly BoxModuleConfig[];

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(value: number) {
  const next = clamp01(value);
  return next * next * (3 - 2 * next);
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function getInterpolatedFocus(item: BoxModuleConfig, progress: number): FocusBox {
  const start = item.focusStart ?? item.focus;
  const end = item.focus;
  const amount = smoothstep((progress - item.start) / Math.max(0.01, item.end - item.start));
  const startRotate = start.rotate ?? 0;
  const endRotate = end.rotate ?? startRotate;

  return {
    x: lerp(start.x, end.x, amount),
    y: lerp(start.y, end.y, amount),
    width: lerp(start.width, end.width, amount),
    height: lerp(start.height, end.height, amount),
    radius: end.radius,
    rotate: lerp(startRotate, endRotate, amount),
  };
}

function getSectionProgress(section: HTMLElement) {
  const rect = section.getBoundingClientRect();
  const scrollableDistance = Math.max(1, rect.height - window.innerHeight);

  return clamp01(-rect.top / scrollableDistance);
}

function getFrameUrl(index: number) {
  const fileIndex = String(index + 1).padStart(4, "0");

  return withBaseUrl("animations/box-frames/frame-" + fileIndex + ".webp") + "?v=" + ASSET_VERSION;
}

function buildFrameLoadOrder() {
  const seen = new Set<number>();
  const order: number[] = [];
  const passes = [15, 5, 2, 1];

  passes.forEach((step) => {
    for (let index = 0; index < FRAME_COUNT; index += step) {
      if (!seen.has(index)) {
        seen.add(index);
        order.push(index);
      }
    }
  });

  const finalIndex = FRAME_COUNT - 1;

  if (!seen.has(finalIndex)) {
    order.push(finalIndex);
  }

  return order;
}

function resizeCanvas(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  return { height, width };
}

function drawContainedImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number
) {
  const scale = Math.min(canvasWidth / image.naturalWidth, canvasHeight / image.naturalHeight);
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;
  const x = (canvasWidth - width) / 2;
  const y = (canvasHeight - height) / 2;

  context.drawImage(image, x, y, width, height);
}

type BoxModule = (typeof boxModules)[number];
type ModuleStyle = React.CSSProperties & Record<string, string | number>;

function getModuleStyle(item: BoxModule): ModuleStyle {
  const duration = Math.max(0.01, item.end - item.start);
  const textStart = item.textStart ?? item.start + duration * 0.18;
  const textDuration = Math.max(0.01, item.textDuration ?? duration * 0.6);

  return {
    "--accent": item.accent,
    "--module-start": item.start,
    "--module-end": item.end,
    "--module-scale": 1 / duration,
    "--module-text-start": textStart,
    "--module-text-scale": 1 / textDuration,
    "--focus-x": item.focus.x + "%",
    "--focus-y": item.focus.y + "%",
    "--focus-width": item.focus.width + "%",
    "--focus-height": item.focus.height + "%",
    "--focus-radius": item.focus.radius,
    "--focus-rotate": (item.focus.rotate ?? 0) + "deg",
    "--card-x": item.card.x + "%",
    "--card-y": item.card.y + "%",
    "--card-shift-x": item.card.shiftX,
    "--card-shift-y": item.card.shiftY,
  };
}

export function ExplodedBoxSection() {
  const { isMobile, prefersReducedMotion } = useResponsive();
  const enableCanvasScrub = !isMobile && !prefersReducedMotion;
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const moduleElementsRef = React.useRef<Record<string, HTMLDivElement | null>>({});
  const connectorElementsRef = React.useRef<Record<string, SVGLineElement | null>>({});
  const frameImagesRef = React.useRef<Array<HTMLImageElement | null>>(
    Array.from({ length: FRAME_COUNT }, () => null)
  );
  const frameLoadedRef = React.useRef<boolean[]>(Array.from({ length: FRAME_COUNT }, () => false));
  const frameLoadStartedRef = React.useRef(false);
  const displayProgressRef = React.useRef(0);
  const canvasHasFrameRef = React.useRef(false);
  const loadedFrameCountRef = React.useRef(0);
  const [shouldLoadFrames, setShouldLoadFrames] = React.useState(false);
  const [canvasHasFrame, setCanvasHasFrame] = React.useState(false);
  const [inspectedModuleKey, setInspectedModuleKey] = React.useState<string | null>(null);

  const updateAnnotationGeometry = React.useCallback((progress: number) => {
    boxModules.forEach((item) => {
      const focus = getInterpolatedFocus(item, progress);
      const moduleElement = moduleElementsRef.current[item.key];
      const connectorElement = connectorElementsRef.current[item.key];

      if (moduleElement) {
        moduleElement.style.setProperty("--focus-x", focus.x.toFixed(3) + "%");
        moduleElement.style.setProperty("--focus-y", focus.y.toFixed(3) + "%");
        moduleElement.style.setProperty("--focus-width", focus.width.toFixed(3) + "%");
        moduleElement.style.setProperty("--focus-height", focus.height.toFixed(3) + "%");
        moduleElement.style.setProperty("--focus-radius", focus.radius);
        moduleElement.style.setProperty("--focus-rotate", (focus.rotate ?? 0).toFixed(3) + "deg");
      }

      if (connectorElement) {
        connectorElement.setAttribute("x1", focus.x.toFixed(2));
        connectorElement.setAttribute("y1", focus.y.toFixed(2));
      }
    });
  }, []);

  const findNearestLoadedFrame = React.useCallback((targetIndex: number) => {
    for (let radius = 0; radius < FRAME_COUNT; radius += 1) {
      const lower = targetIndex - radius;
      const upper = targetIndex + radius;

      if (lower >= 0 && frameLoadedRef.current[lower]) {
        return { image: frameImagesRef.current[lower], index: lower };
      }

      if (upper < FRAME_COUNT && frameLoadedRef.current[upper]) {
        return { image: frameImagesRef.current[upper], index: upper };
      }
    }

    return null;
  }, []);

  const drawCanvasProgress = React.useCallback(
    (progress: number) => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      if (!canvas || !context) {
        return false;
      }

      const { height, width } = resizeCanvas(canvas);
      const exactFrame = clamp01(progress) * (FRAME_COUNT - 1);
      const targetIndex = Math.round(exactFrame);
      const targetImage = frameImagesRef.current[targetIndex];
      const loadedImage = frameLoadedRef.current[targetIndex]
        ? { image: targetImage, index: targetIndex }
        : findNearestLoadedFrame(targetIndex);

      if (!loadedImage?.image) {
        return false;
      }

      context.clearRect(0, 0, width, height);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
      drawContainedImage(context, loadedImage.image, width, height);

      if (!canvasHasFrameRef.current && loadedFrameCountRef.current >= CANVAS_READY_FRAME_COUNT) {
        canvasHasFrameRef.current = true;
        setCanvasHasFrame(true);
      }

      return true;
    },
    [findNearestLoadedFrame]
  );

  React.useEffect(() => {
    if (!enableCanvasScrub) {
      setShouldLoadFrames(false);
      sectionRef.current?.style.setProperty("--box-progress", "1");
      sectionRef.current?.style.setProperty("--box-eased-progress", "1");
      updateAnnotationGeometry(1);
      return;
    }

    const section = sectionRef.current;

    if (!section || !("IntersectionObserver" in window)) {
      setShouldLoadFrames(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadFrames(true);
          observer.disconnect();
        }
      },
      { rootMargin: "2200px 0px" }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [enableCanvasScrub, updateAnnotationGeometry]);

  React.useEffect(() => {
    if (!enableCanvasScrub || !shouldLoadFrames || frameLoadStartedRef.current) {
      return;
    }

    let cancelled = false;
    let activeLoads = 0;
    let nextOrderIndex = 0;
    const loadOrder = buildFrameLoadOrder();
    frameLoadStartedRef.current = true;

    const requestDraw = () => {
      window.requestAnimationFrame(() => {
        drawCanvasProgress(displayProgressRef.current);
      });
    };

    const loadNext = () => {
      if (cancelled) {
        return;
      }

      while (activeLoads < FRAME_LOAD_CONCURRENCY && nextOrderIndex < loadOrder.length) {
        const frameIndex = loadOrder[nextOrderIndex];
        nextOrderIndex += 1;

        if (frameLoadedRef.current[frameIndex]) {
          continue;
        }

        activeLoads += 1;
        const image = new Image(FRAME_DRAW_WIDTH, FRAME_DRAW_HEIGHT);
        image.decoding = "async";
        image.onload = () => {
          activeLoads -= 1;
          frameImagesRef.current[frameIndex] = image;
          frameLoadedRef.current[frameIndex] = true;
          loadedFrameCountRef.current += 1;
          requestDraw();
          loadNext();
        };
        image.onerror = () => {
          activeLoads -= 1;
          loadNext();
        };
        image.src = getFrameUrl(frameIndex);
      }
    };

    loadNext();

    return () => {
      cancelled = true;
    };
  }, [drawCanvasProgress, enableCanvasScrub, shouldLoadFrames]);

  React.useEffect(() => {
    if (!enableCanvasScrub) {
      return;
    }

    let frameId = 0;

    const updateSectionProgress = (progress: number) => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const next = clamp01(progress).toFixed(4);
      section.style.setProperty("--box-progress", next);
      section.style.setProperty("--box-eased-progress", next);
      updateAnnotationGeometry(progress);
    };

    const renderCurrentFrame = () => {
      const section = sectionRef.current;
      frameId = 0;

      if (!section) {
        return;
      }

      const progress = getSectionProgress(section);
      displayProgressRef.current = progress;
      updateSectionProgress(progress);
      drawCanvasProgress(progress);
    };

    const requestFrame = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(renderCurrentFrame);
    };

    renderCurrentFrame();
    window.addEventListener("scroll", requestFrame, { passive: true });
    window.addEventListener("resize", requestFrame);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", requestFrame);
      window.removeEventListener("resize", requestFrame);
    };
  }, [drawCanvasProgress, enableCanvasScrub, updateAnnotationGeometry]);

  return (
    <section
      className={
        "exploded-box-section " +
        (enableCanvasScrub ? "exploded-box-section--scrub" : "exploded-box-section--static")
      }
      ref={sectionRef}
      style={{ "--has-inspected": inspectedModuleKey ? 1 : 0 } as React.CSSProperties}
    >
      <div className="exploded-box-sticky">
        <div className="exploded-box-copy">
          <p className="exploded-box-eyebrow">Prototype electronics</p>
          <h2>Inside the control box</h2>
          <p>
            The enclosure groups the prototype electronics into a compact module that
            connects sensing, feedback, power, and communication in one wearable system.
          </p>
        </div>

        <div
          className="exploded-box-stage"
          aria-label="Exploded view of the NAVISense electronics box"
        >
          <div className="exploded-box-media-shell">
            {enableCanvasScrub ? (
              <>
                <canvas
                  aria-label="Scroll-scrub exploded view animation of the NAVISense electronics box"
                  className="exploded-box-canvas"
                  height={FRAME_DRAW_HEIGHT}
                  ref={canvasRef}
                  role="img"
                  width={FRAME_DRAW_WIDTH}
                />
                <img
                  alt="Exploded view of the NAVISense electronics box"
                  className={
                    "exploded-box-poster exploded-box-poster--fallback" +
                    (canvasHasFrame ? " exploded-box-poster--hidden" : "")
                  }
                  decoding="async"
                  loading="lazy"
                  src={posterUrl}
                />
              </>
            ) : (
              <img
                alt="Exploded view of the NAVISense electronics box"
                className="exploded-box-poster"
                decoding="async"
                loading="lazy"
                src={posterUrl}
              />
            )}

            <div className="exploded-box-annotations" aria-label="Control box component notes">
              <svg
                aria-hidden="true"
                className="exploded-box-connector-layer"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                {boxModules.map((item) => (
                  <line
                    className={
                      "exploded-box-connector exploded-box-connector--" +
                      item.key +
                      (inspectedModuleKey === item.key ? " exploded-box-connector--inspected" : "")
                    }
                    key={item.key}
                    pathLength={1}
                    ref={(node) => {
                      connectorElementsRef.current[item.key] = node;
                    }}
                    style={getModuleStyle(item)}
                    x1={item.focus.x}
                    x2={item.connector.x2}
                    y1={item.focus.y}
                    y2={item.connector.y2}
                  />
                ))}
              </svg>

              {boxModules.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    className={
                      "exploded-box-module exploded-box-module--" +
                      item.key +
                      (inspectedModuleKey === item.key ? " exploded-box-module--inspected" : "")
                    }
                    key={item.key}
                    ref={(node) => {
                      moduleElementsRef.current[item.key] = node;
                    }}
                    style={getModuleStyle(item)}
                  >
                    <span className="exploded-box-module-highlight" aria-hidden="true" />
                    <article
                      aria-label={item.title + ": " + item.body}
                      className="exploded-box-callout-card"
                      onBlur={() => {
                        setInspectedModuleKey((current) => (current === item.key ? null : current));
                      }}
                      onFocus={() => setInspectedModuleKey(item.key)}
                      onPointerEnter={() => setInspectedModuleKey(item.key)}
                      onPointerLeave={() => {
                        setInspectedModuleKey((current) => (current === item.key ? null : current));
                      }}
                      tabIndex={0}
                    >
                      <span className="exploded-box-callout-icon">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <div>
                        <h3>
                          <span className="exploded-box-typewriter">{item.title}</span>
                        </h3>
                        <p>
                          <span className="exploded-box-typewriter">{item.body}</span>
                        </p>
                      </div>
                      <span className="exploded-box-type-cursor" aria-hidden="true" />
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
