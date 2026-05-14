import React, { useEffect, useRef } from "react";
import {
  AmbientLight,
  DirectionalLight,
  Euler,
  Group,
  MathUtils,
  Object3D,
  PerspectiveCamera,
  PointLight,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
  type Mesh,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { withBaseUrl } from "../utils/assetUrl";

type VestScene3DProps = {
  active: boolean;
  progress: number;
};

const VEST_MODEL_VERSION =
  import.meta.env.VITE_NAVISENSE_VEST_MODEL_VERSION || "blender-panel-v3-20260514";
const MODEL_URL = `${withBaseUrl("models/navisense-vest.glb")}?v=${encodeURIComponent(
  VEST_MODEL_VERSION
)}`;

const EXPLODED_OFFSETS: Record<string, Vector3> = {
  vest_body: new Vector3(-0.04, -0.04, 0),
  electronics_box: new Vector3(0.3, 0.06, 0.28),
  controller: new Vector3(0.5, 0.34, 0.46),
  battery: new Vector3(0.48, -0.34, 0.46),
  depth_sensors: new Vector3(-0.02, 0.5, 0.36),
  haptic_motors: new Vector3(-0.04, -0.58, 0.38),
  gps_phone_link: new Vector3(-0.46, -0.08, 0.34),
};

type AnimatedPartName = keyof typeof EXPLODED_OFFSETS;

const PART_REVEALS: Record<AnimatedPartName, { start: number; end: number; settle: number }> = {
  vest_body: { start: 0.6, end: 0.82, settle: 0.006 },
  electronics_box: { start: 0.6, end: 0.8, settle: 0.01 },
  controller: { start: 0.64, end: 0.84, settle: 0.018 },
  battery: { start: 0.67, end: 0.88, settle: 0.017 },
  depth_sensors: { start: 0.7, end: 0.91, settle: 0.014 },
  haptic_motors: { start: 0.72, end: 0.94, settle: 0.014 },
  gps_phone_link: { start: 0.74, end: 0.96, settle: 0.016 },
};

const PART_PATH_CONTROLS: Record<AnimatedPartName, Vector3> = {
  vest_body: new Vector3(0, 0, 0.06),
  electronics_box: new Vector3(0.08, 0.02, 0.14),
  controller: new Vector3(0.18, 0.12, 0.28),
  battery: new Vector3(0.18, -0.12, 0.28),
  depth_sensors: new Vector3(0, 0.18, 0.24),
  haptic_motors: new Vector3(0, -0.2, 0.26),
  gps_phone_link: new Vector3(-0.2, 0.02, 0.28),
};

const ANIMATED_PARTS = Object.keys(EXPLODED_OFFSETS) as AnimatedPartName[];

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(value: number) {
  const next = clamp01(value);
  return next * next * (3 - 2 * next);
}

function easeOutCubic(value: number) {
  const next = clamp01(value);
  return 1 - Math.pow(1 - next, 3);
}

function easeOutQuart(value: number) {
  const next = clamp01(value);
  return 1 - Math.pow(1 - next, 4);
}

function easeInOutSine(value: number) {
  const next = clamp01(value);
  return -(Math.cos(Math.PI * next) - 1) / 2;
}

function segment(
  progress: number,
  start: number,
  end: number,
  easing: (value: number) => number = smoothstep
) {
  return easing((progress - start) / (end - start));
}

function disposeObject(root: Object3D) {
  root.traverse((object) => {
    const mesh = object as Mesh;
    if (mesh.geometry) {
      mesh.geometry.dispose();
    }

    const material = mesh.material;
    if (Array.isArray(material)) {
      material.forEach((item) => item.dispose());
    } else if (material) {
      material.dispose();
    }
  });
}

export function VestScene3D({ active, progress }: VestScene3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(progress);
  const activeRef = useRef(active);
  const requestRenderRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    progressRef.current = progress;
    requestRenderRef.current();
  }, [progress]);

  useEffect(() => {
    activeRef.current = active;
    requestRenderRef.current();
  }, [active]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return undefined;
    }

    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    mount.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.16, 5.1);

    const stage = new Group();
    scene.add(stage);

    const keyLight = new DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(3.5, 3.2, 4.5);
    scene.add(keyLight);

    const cyanLight = new PointLight(0x35c5ff, 3.2, 7);
    cyanLight.position.set(-2.2, 1.5, 2.5);
    scene.add(cyanLight);

    const purpleLight = new PointLight(0xa88fff, 1.6, 6);
    purpleLight.position.set(2.4, -1.4, 2.4);
    scene.add(purpleLight);

    const focusLight = new PointLight(0x5fa9e8, 0, 4.2);
    focusLight.position.set(0.6, 0.2, 1.2);
    scene.add(focusLight);

    const ambientLight = new AmbientLight(0x9fb9ff, 1.15);
    scene.add(ambientLight);

    const loader = new GLTFLoader();
    const initialPositions = new Map<string, Vector3>();
    const initialRotations = new Map<string, Euler>();
    let model: Object3D | null = null;
    let frameId = 0;
    let lastTime = performance.now();
    let introTime = 0;
    let destroyed = false;
    const activePartPosition = new Vector3();
    const controlPosition = new Vector3();
    const pathStart = new Vector3();
    const pathEnd = new Vector3();
    const targetPosition = new Vector3();
    const shouldSpin = () => activeRef.current && progressRef.current < 0.16;

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      const safeWidth = Math.max(1, width);
      const safeHeight = Math.max(1, height);
      renderer.setSize(safeWidth, safeHeight, false);
      camera.aspect = safeWidth / safeHeight;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };

    const applyAnimation = (currentProgress: number) => {
      const center = segment(currentProgress, 0.04, 0.43, easeInOutSine);
      const faceForward = segment(currentProgress, 0.34, 0.58, easeInOutSine);
      const openPrep = segment(currentProgress, 0.52, 0.66, easeInOutSine);
      const openBox = segment(currentProgress, 0.56, 0.81, easeOutQuart);
      const explodedFrame = segment(currentProgress, 0.6, 0.94, easeInOutSine);
      const calloutFrame = segment(currentProgress, 0.78, 0.96, easeOutQuart);
      const cameraCenter = segment(currentProgress, 0.06, 0.47, easeInOutSine);
      const cameraExplode = segment(currentProgress, 0.56, 0.96, easeInOutSine);
      const spinWeight = 1 - segment(currentProgress, 0.08, 0.25, easeInOutSine);
      const idleTurn =
        (Math.sin(introTime * 0.58) * 0.16 + Math.sin(introTime * 0.23) * 0.045) * spinWeight;
      const initialYaw = -0.4 + idleTurn;

      stage.position.set(
        MathUtils.lerp(0.14, -0.02, center) - explodedFrame * 0.012,
        MathUtils.lerp(0.03, -0.066, center) + Math.sin(openBox * Math.PI) * 0.006,
        0
      );
      stage.rotation.set(
        MathUtils.lerp(0.04, 0.006, faceForward) + Math.sin(explodedFrame * Math.PI) * 0.0025,
        MathUtils.lerp(initialYaw, 0.28, faceForward) - openBox * 0.025,
        MathUtils.lerp(0.02, 0, faceForward)
      );
      stage.scale.setScalar(MathUtils.lerp(MathUtils.lerp(0.8, 0.835, center), 0.755, cameraExplode));

      camera.position.set(
        MathUtils.lerp(MathUtils.lerp(0.02, 0.12, cameraCenter), -0.02, cameraExplode),
        MathUtils.lerp(MathUtils.lerp(0.2, 0.08, cameraCenter), 0.13, cameraExplode),
        MathUtils.lerp(MathUtils.lerp(6.35, 6.12, cameraCenter), 6.82, cameraExplode)
      );
      camera.lookAt(
        MathUtils.lerp(MathUtils.lerp(0, 0.075, cameraCenter), -0.02, cameraExplode),
        MathUtils.lerp(-0.04, 0.02, cameraExplode),
        0
      );

      let strongestReveal = 0;
      let activePart: Object3D | null = null;

      ANIMATED_PARTS.forEach((name) => {
        const part = stage.getObjectByName(name);
        const initial = initialPositions.get(name);
        const initialRotation = initialRotations.get(name);
        if (!part || !initial) {
          return;
        }

        const reveal = PART_REVEALS[name];
        const partProgress = segment(currentProgress, reveal.start, reveal.end, easeInOutSine);
        const pathProgress = easeOutCubic(partProgress);
        const settlePulse = Math.sin(partProgress * Math.PI) * reveal.settle * 0.28;
        const offset = EXPLODED_OFFSETS[name];
        const controlOffset = PART_PATH_CONTROLS[name];

        targetPosition.copy(initial).add(offset);
        controlPosition.copy(initial).addScaledVector(offset, 0.42).add(controlOffset);
        pathStart.copy(initial).lerp(controlPosition, pathProgress);
        pathEnd.copy(controlPosition).lerp(targetPosition, pathProgress);
        part.position.copy(pathStart.lerp(pathEnd, pathProgress));
        part.position.addScaledVector(offset, settlePulse);

        if (initialRotation) {
          part.rotation.copy(initialRotation);
        }

        if (name !== "vest_body" && name !== "electronics_box") {
          const rotateSettle = Math.sin(partProgress * Math.PI) * 0.016;
          part.rotation.x += rotateSettle * Math.sign(offset.y || 1);
          part.rotation.y -= rotateSettle * Math.sign(offset.x || 1);
        }

        if (name === "electronics_box") {
          part.rotation.y += openPrep * 0.032 - openBox * 0.29;
          part.position.x += openBox * 0.067 - openPrep * 0.012;
        }

        const revealFocus = Math.sin(partProgress * Math.PI);
        if (name !== "vest_body" && revealFocus > strongestReveal) {
          strongestReveal = revealFocus;
          activePart = part;
        }
      });

      if (activePart) {
        activePart.getWorldPosition(activePartPosition);
        focusLight.position.set(activePartPosition.x + 0.12, activePartPosition.y + 0.1, 1.45);
      }

      focusLight.intensity = MathUtils.lerp(0, 1.25, strongestReveal) + calloutFrame * 0.18;
      cyanLight.intensity = MathUtils.lerp(3.2, 3.55, explodedFrame);
      purpleLight.intensity = MathUtils.lerp(1.6, 1.25, calloutFrame);
    };

    const requestRender = () => {
      if (!frameId && !destroyed) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const render = (time: number) => {
      frameId = 0;
      const delta = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;
      if (activeRef.current && progressRef.current < 0.2) {
        introTime += delta;
      }

      applyAnimation(progressRef.current);
      renderer.render(scene, camera);

      if (shouldSpin()) {
        requestRender();
      }
    };

    requestRenderRef.current = requestRender;
    resize();
    window.addEventListener("resize", resize);

    loader.load(
      MODEL_URL,
      (gltf) => {
        if (destroyed) {
          disposeObject(gltf.scene);
          return;
        }

        model = gltf.scene;
        model.name = "navisense_vest_model";
        stage.add(model);

        ANIMATED_PARTS.forEach((name) => {
          const part = stage.getObjectByName(name);
          if (part) {
            initialPositions.set(name, part.position.clone());
            initialRotations.set(name, part.rotation.clone());
          }
        });

        applyAnimation(progressRef.current);
        renderer.render(scene, camera);
        requestRender();
      },
      undefined,
      () => undefined
    );

    requestRender();

    return () => {
      destroyed = true;
      requestRenderRef.current = () => undefined;
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("resize", resize);
      if (model) {
        disposeObject(model);
      }
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="product-intro-canvas" aria-hidden="true" />;
}
