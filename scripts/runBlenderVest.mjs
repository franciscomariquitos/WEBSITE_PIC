import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const blenderScript = path.join(repoRoot, "assets/navisense-vest-blender/create_navisense_vest.py");

function pathExists(candidate) {
  try {
    return fs.existsSync(candidate);
  } catch {
    return false;
  }
}

function findWindowsBlender() {
  const baseDirs = [
    "/mnt/c/Program Files/Blender Foundation",
    "/mnt/c/Program Files (x86)/Blender Foundation",
  ];

  const candidates = [];

  for (const baseDir of baseDirs) {
    if (!pathExists(baseDir)) {
      continue;
    }

    for (const entry of fs.readdirSync(baseDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) {
        continue;
      }

      const blenderExe = path.join(baseDir, entry.name, "blender.exe");
      if (pathExists(blenderExe)) {
        candidates.push(blenderExe);
      }
    }
  }

  return candidates.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))[0];
}

function getCandidates() {
  const candidates = [];

  if (process.env.BLENDER_BIN) {
    candidates.push(process.env.BLENDER_BIN);
  }

  candidates.push("blender");

  const windowsBlender = findWindowsBlender();
  if (windowsBlender) {
    candidates.push(windowsBlender);
  }

  return [...new Set(candidates)];
}

function isWindowsBlender(candidate) {
  const normalized = candidate.toLowerCase();
  return normalized.endsWith(".exe") || normalized.startsWith("/mnt/");
}

function toWindowsPath(candidatePath) {
  const result = spawnSync("wslpath", ["-w", candidatePath], {
    encoding: "utf8",
    shell: false,
  });

  if (result.status !== 0 || !result.stdout.trim()) {
    return candidatePath;
  }

  return result.stdout.trim();
}

function runBlender(candidate) {
  const scriptPath = isWindowsBlender(candidate) ? toWindowsPath(blenderScript) : blenderScript;

  return spawnSync(candidate, ["--background", "--python", scriptPath], {
    cwd: repoRoot,
    stdio: "inherit",
    shell: false,
  });
}

for (const candidate of getCandidates()) {
  const result = runBlender(candidate);

  if (result.error?.code === "ENOENT") {
    continue;
  }

  if (result.error) {
    console.error(`Failed to run Blender at: ${candidate}`);
    console.error(result.error.message);
    process.exit(1);
  }

  process.exit(result.status ?? 0);
}

console.error("Could not find Blender.");
console.error("");
console.error("Install Blender, or point the project to Blender with BLENDER_BIN.");
console.error("");
console.error("Examples:");
console.error("  BLENDER_BIN=blender npm run generate:vest");
console.error("  BLENDER_BIN='/mnt/c/Program Files/Blender Foundation/Blender 5.1/blender.exe' npm run generate:vest");
console.error("");
console.error("If Blender is installed on Windows, make sure its blender.exe path exists under:");
console.error("  C:\\Program Files\\Blender Foundation\\Blender <version>\\blender.exe");
process.exit(1);
