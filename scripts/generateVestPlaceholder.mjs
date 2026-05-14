import fs from "node:fs";
import path from "node:path";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

// Legacy fallback only. The production-like vest asset source now lives in
// assets/navisense-vest-blender/create_navisense_vest.py.

if (typeof globalThis.FileReader === "undefined") {
  globalThis.FileReader = class FileReader {
    result = null;
    onloadend = null;

    async readAsArrayBuffer(blob) {
      this.result = await blob.arrayBuffer();
      this.onloadend?.();
    }
  };
}

const outputDir = path.resolve("public/models");
const modelPath = path.join(outputDir, "navisense-vest.glb");
const posterPath = path.join(outputDir, "navisense-vest-poster.svg");

fs.mkdirSync(outputDir, { recursive: true });

const scene = new THREE.Scene();
scene.name = "navisense_normal_vest";

const materials = {
  fabric: new THREE.MeshStandardMaterial({
    color: 0x20262d,
    metalness: 0.02,
    roughness: 0.9,
  }),
  fabricDark: new THREE.MeshStandardMaterial({
    color: 0x11171d,
    metalness: 0.02,
    roughness: 0.94,
  }),
  raisedFabric: new THREE.MeshStandardMaterial({
    color: 0x2b333c,
    metalness: 0.02,
    roughness: 0.86,
  }),
  seam: new THREE.MeshStandardMaterial({
    color: 0x424d58,
    metalness: 0.01,
    roughness: 0.9,
  }),
  trim: new THREE.MeshStandardMaterial({
    color: 0x5fa9e8,
    emissive: 0x0a2a43,
    emissiveIntensity: 0.2,
    metalness: 0.08,
    roughness: 0.48,
  }),
  device: new THREE.MeshStandardMaterial({
    color: 0x151b22,
    metalness: 0.12,
    roughness: 0.68,
  }),
  deviceFace: new THREE.MeshStandardMaterial({
    color: 0x26303a,
    metalness: 0.07,
    roughness: 0.72,
  }),
  board: new THREE.MeshStandardMaterial({
    color: 0x14304a,
    emissive: 0x061729,
    emissiveIntensity: 0.16,
    metalness: 0.08,
    roughness: 0.56,
  }),
  battery: new THREE.MeshStandardMaterial({
    color: 0x303843,
    metalness: 0.06,
    roughness: 0.78,
  }),
  sensor: new THREE.MeshStandardMaterial({
    color: 0x5fa9e8,
    emissive: 0x0a3f5c,
    emissiveIntensity: 0.36,
    metalness: 0.12,
    roughness: 0.34,
  }),
  motor: new THREE.MeshStandardMaterial({
    color: 0x7e72d9,
    emissive: 0x181247,
    emissiveIntensity: 0.18,
    metalness: 0.1,
    roughness: 0.6,
  }),
  phone: new THREE.MeshStandardMaterial({
    color: 0x070b12,
    metalness: 0.18,
    roughness: 0.5,
  }),
};

function makeBox(name, size, position, material, rotation = [0, 0, 0]) {
  const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  mesh.position.set(position[0], position[1], position[2]);
  mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function makeCylinder(name, radius, depth, position, rotation, material, radialSegments = 18) {
  const geometry = new THREE.CylinderGeometry(radius, radius, depth, radialSegments);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  mesh.position.set(position[0], position[1], position[2]);
  mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function makeCapsule(name, radius, length, position, rotation, material, scale = [1, 1, 1]) {
  const geometry = new THREE.CapsuleGeometry(radius, length, 3, 10);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  mesh.position.set(position[0], position[1], position[2]);
  mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
  mesh.scale.set(scale[0], scale[1], scale[2]);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function makeTube(name, points, radius, material, tubularSegments = 20, radialSegments = 6) {
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.TubeGeometry(curve, tubularSegments, radius, radialSegments, false);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function makeVestShell() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.62, -0.9);
  shape.lineTo(-0.76, -0.84);
  shape.bezierCurveTo(-0.82, -0.52, -0.82, 0.06, -0.68, 0.5);
  shape.bezierCurveTo(-0.58, 0.82, -0.5, 1.07, -0.34, 1.16);
  shape.bezierCurveTo(-0.21, 1.16, -0.13, 1.08, -0.08, 0.94);
  shape.bezierCurveTo(-0.045, 0.84, -0.02, 0.78, 0, 0.74);
  shape.bezierCurveTo(0.02, 0.78, 0.045, 0.84, 0.08, 0.94);
  shape.bezierCurveTo(0.13, 1.08, 0.21, 1.16, 0.34, 1.16);
  shape.bezierCurveTo(0.5, 1.07, 0.58, 0.82, 0.68, 0.5);
  shape.bezierCurveTo(0.82, 0.06, 0.82, -0.52, 0.76, -0.84);
  shape.lineTo(0.62, -0.9);
  shape.lineTo(-0.62, -0.9);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.38,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.055,
    bevelThickness: 0.065,
    curveSegments: 8,
  });
  geometry.translate(0, 0, -0.13);
  geometry.computeVertexNormals();

  const mesh = new THREE.Mesh(geometry, materials.fabric);
  mesh.name = "continuous_vest_shell";
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function makePosterSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" role="img" aria-label="NaviSense normal vest">
  <defs>
    <radialGradient id="body" cx="50%" cy="35%" r="70%">
      <stop offset="0" stop-color="#3a444f"/>
      <stop offset=".58" stop-color="#222a32"/>
      <stop offset="1" stop-color="#11171d"/>
    </radialGradient>
    <filter id="shadow" x="-25%" y="-20%" width="150%" height="155%">
      <feDropShadow dx="0" dy="26" stdDeviation="24" flood-color="#020326" flood-opacity=".42"/>
    </filter>
  </defs>
  <g filter="url(#shadow)">
    <path d="M151 532c-25-90-22-260 0-346 16-62 53-100 111-118 26 18 44 52 58 100 14-48 32-82 58-100 58 18 95 56 111 118 22 86 25 256 0 346-88 38-250 38-338 0Z" fill="url(#body)" stroke="#4a5662" stroke-width="10" stroke-linejoin="round"/>
    <path d="M251 74c-34 44-56 101-66 171M389 74c34 44 56 101 66 171" fill="none" stroke="#0f151b" stroke-width="35" stroke-linecap="round"/>
    <path d="M320 190v334" stroke="#10161d" stroke-width="24" stroke-linecap="round"/>
    <path d="M334 205v294" stroke="#5fa9e8" stroke-width="7" stroke-linecap="round"/>
    <path d="M192 295h256M183 372h274M194 449h252" stroke="#0c1218" stroke-width="26" stroke-linecap="round"/>
    <path d="M192 295h256M183 372h274M194 449h252" stroke="#46515d" stroke-width="7" stroke-linecap="round"/>
    <rect x="460" y="264" width="82" height="128" rx="24" fill="#151b22" stroke="#5fa9e8" stroke-opacity=".34" stroke-width="6"/>
    <rect x="478" y="294" width="9" height="68" rx="5" fill="#5fa9e8"/>
    <circle cx="224" cy="246" r="31" fill="#151b22" stroke="#5fa9e8" stroke-opacity=".34" stroke-width="6"/>
    <circle cx="416" cy="246" r="31" fill="#151b22" stroke="#5fa9e8" stroke-opacity=".34" stroke-width="6"/>
    <circle cx="224" cy="246" r="13" fill="#5fa9e8"/>
    <circle cx="416" cy="246" r="13" fill="#5fa9e8"/>
  </g>
</svg>\n`;
}

const root = new THREE.Group();
root.name = "navisense_vest";
scene.add(root);

const vestBody = new THREE.Group();
vestBody.name = "vest_body";
vestBody.add(makeVestShell());
vestBody.add(makeBox("left_upper_soft_panel", [0.42, 0.44, 0.035], [-0.31, 0.36, 0.27], materials.raisedFabric, [0, 0, -0.05]));
vestBody.add(makeBox("right_upper_soft_panel", [0.42, 0.44, 0.035], [0.31, 0.36, 0.27], materials.raisedFabric, [0, 0, 0.05]));
vestBody.add(makeBox("left_lower_soft_panel", [0.45, 0.5, 0.035], [-0.31, -0.28, 0.27], materials.raisedFabric, [0, 0, 0.03]));
vestBody.add(makeBox("right_lower_soft_panel", [0.45, 0.5, 0.035], [0.31, -0.28, 0.27], materials.raisedFabric, [0, 0, -0.03]));
vestBody.add(makeCapsule("left_shoulder_cap", 0.12, 0.42, [-0.45, 1.02, 0.14], [0, 0, -0.16], materials.fabricDark, [1.25, 1, 0.62]));
vestBody.add(makeCapsule("right_shoulder_cap", 0.12, 0.42, [0.45, 1.02, 0.14], [0, 0, 0.16], materials.fabricDark, [1.25, 1, 0.62]));
vestBody.add(makeCapsule("left_side_padding", 0.08, 0.62, [-0.85, -0.12, 0.07], [0, 0, 0], materials.fabricDark, [0.9, 1, 0.65]));
vestBody.add(makeCapsule("right_side_padding", 0.08, 0.62, [0.85, -0.12, 0.07], [0, 0, 0], materials.fabricDark, [0.9, 1, 0.65]));
vestBody.add(makeCapsule("lower_body_band", 0.065, 1.22, [0, -0.8, 0.16], [0, 0, Math.PI / 2], materials.fabricDark, [1, 1, 0.58]));
vestBody.add(makeCapsule("collar_rim_left", 0.026, 0.55, [-0.18, 0.98, 0.23], [0, 0, -0.25], materials.seam, [1, 1, 0.55]));
vestBody.add(makeCapsule("collar_rim_right", 0.026, 0.55, [0.18, 0.98, 0.23], [0, 0, 0.25], materials.seam, [1, 1, 0.55]));
vestBody.add(makeBox("center_front_zipper", [0.05, 1.34, 0.032], [0, -0.12, 0.295], materials.fabricDark));
vestBody.add(makeBox("center_status_accent", [0.018, 1.08, 0.018], [0.045, -0.08, 0.31], materials.trim));
vestBody.add(makeBox("upper_utility_band", [1.04, 0.05, 0.035], [0, 0.42, 0.29], materials.seam));
vestBody.add(makeBox("mid_utility_band", [1.14, 0.05, 0.035], [0, 0.06, 0.3], materials.seam));
vestBody.add(makeBox("lower_utility_band", [1.04, 0.05, 0.035], [0, -0.34, 0.29], materials.seam));
root.add(vestBody);

const electronicsBox = new THREE.Group();
electronicsBox.name = "electronics_box";
electronicsBox.add(makeBox("side_module_shell", [0.32, 0.58, 0.2], [0, 0, 0], materials.device));
electronicsBox.add(makeBox("side_module_face", [0.24, 0.42, 0.035], [0.012, 0, 0.12], materials.deviceFace));
electronicsBox.add(makeBox("side_module_status_slit", [0.032, 0.31, 0.018], [-0.11, 0, 0.18], materials.trim));
electronicsBox.add(makeBox("side_module_mount", [0.075, 0.5, 0.12], [-0.2, 0, 0.0], materials.fabricDark));
electronicsBox.position.set(0.96, 0.02, 0.22);
root.add(electronicsBox);

const controller = new THREE.Group();
controller.name = "controller";
controller.add(makeBox("controller_board", [0.28, 0.18, 0.045], [0, 0, 0], materials.board));
controller.add(makeBox("controller_chip", [0.11, 0.08, 0.03], [0.018, 0.012, 0.045], materials.device));
controller.add(makeCylinder("controller_port", 0.021, 0.03, [-0.105, -0.048, 0.048], [Math.PI / 2, 0, 0], materials.trim, 14));
controller.position.set(0.94, 0.18, 0.38);
root.add(controller);

const battery = new THREE.Group();
battery.name = "battery";
battery.add(makeBox("battery_pack", [0.2, 0.34, 0.1], [0, 0, 0], materials.battery));
battery.add(makeBox("battery_label", [0.13, 0.13, 0.012], [0, 0, 0.073], materials.fabricDark));
battery.add(makeBox("battery_terminal", [0.09, 0.026, 0.08], [0, 0.18, 0.01], materials.trim));
battery.position.set(0.94, -0.22, 0.38);
root.add(battery);

const depthSensors = new THREE.Group();
depthSensors.name = "depth_sensors";
depthSensors.add(makeTube("sensor_bridge", [new THREE.Vector3(-0.46, 0.48, 0.32), new THREE.Vector3(0, 0.5, 0.34), new THREE.Vector3(0.46, 0.48, 0.32)], 0.019, materials.fabricDark));
depthSensors.add(makeCylinder("left_depth_sensor_housing", 0.082, 0.065, [-0.46, 0.48, 0.34], [Math.PI / 2, 0, 0], materials.device, 18));
depthSensors.add(makeCylinder("right_depth_sensor_housing", 0.082, 0.065, [0.46, 0.48, 0.34], [Math.PI / 2, 0, 0], materials.device, 18));
depthSensors.add(makeCylinder("left_depth_sensor", 0.044, 0.074, [-0.46, 0.48, 0.38], [Math.PI / 2, 0, 0], materials.sensor, 16));
depthSensors.add(makeCylinder("right_depth_sensor", 0.044, 0.074, [0.46, 0.48, 0.38], [Math.PI / 2, 0, 0], materials.sensor, 16));
root.add(depthSensors);

const hapticMotors = new THREE.Group();
hapticMotors.name = "haptic_motors";
hapticMotors.add(makeCylinder("left_haptic_motor", 0.052, 0.105, [-0.48, -0.3, 0.32], [Math.PI / 2, 0, 0], materials.motor, 16));
hapticMotors.add(makeCylinder("right_haptic_motor", 0.052, 0.105, [0.48, -0.3, 0.32], [Math.PI / 2, 0, 0], materials.motor, 16));
hapticMotors.add(makeCylinder("lower_haptic_motor", 0.048, 0.1, [0, -0.58, 0.31], [Math.PI / 2, 0, 0], materials.motor, 16));
root.add(hapticMotors);

const gpsPhoneLink = new THREE.Group();
gpsPhoneLink.name = "gps_phone_link";
gpsPhoneLink.add(makeBox("phone_silhouette", [0.22, 0.48, 0.05], [0, 0, 0], materials.phone));
gpsPhoneLink.add(makeBox("phone_screen", [0.17, 0.34, 0.012], [0, 0.01, 0.055], materials.deviceFace));
gpsPhoneLink.add(makeBox("phone_nav_line", [0.12, 0.016, 0.012], [0, -0.12, 0.07], materials.trim));
gpsPhoneLink.position.set(-0.96, -0.04, 0.22);
root.add(gpsPhoneLink);

root.rotation.set(0.08, -0.28, 0);
root.scale.setScalar(1.36);

const exporter = new GLTFExporter();
const arrayBuffer = await exporter.parseAsync(scene, {
  binary: true,
  includeCustomExtensions: false,
});

fs.writeFileSync(modelPath, Buffer.from(arrayBuffer));
fs.writeFileSync(posterPath, makePosterSvg());

console.log(`Generated ${modelPath}`);
console.log(`Generated ${posterPath}`);
