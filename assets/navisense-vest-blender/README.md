# NaviSense Vest Blender Asset

This folder is the primary source for the serious 3D vest asset. The website still loads:

- `public/models/navisense-vest.glb`
- `public/models/navisense-vest-poster.svg`

The old Three.js generator is now only a legacy fallback. Use this Blender pipeline for the production-like vest.

## Visual Direction

Target: a dark, real wearable vest with believable volume.

- Body armor / utility vest silhouette, not a flat icon.
- Thick front and back body, broad shoulders, arm openings, U/V neck opening.
- Matte dark grey fabric with subtle cloth roughness.
- Webbing/MOLLE bands, seams, zipper track, side straps and buckles.
- NaviSense hardware is integrated and subtle: small cyan accents, side electronics box, front sensors, haptic modules and phone link.
- No large textures for v1. Use geometry, material roughness, bevels and small procedural displacement.

## Animation Contract

The exported GLB must include these top-level object names because `VestScene3D` animates them:

- `vest_body`
- `electronics_box`
- `controller`
- `battery`
- `depth_sensors`
- `haptic_motors`
- `gps_phone_link`

Children can change freely, but these group names must remain exact.

## Export

Install Blender locally, then run from the repo root:

```bash
npm run generate:vest
```

The npm script looks for Blender in this order:

1. `BLENDER_BIN`
2. `blender` on your PATH
3. common Windows install paths under `C:\Program Files\Blender Foundation\`

If Blender is installed somewhere else, run:

```bash
BLENDER_BIN="/mnt/c/Program Files/Blender Foundation/Blender 4.3/blender.exe" npm run generate:vest
```

Equivalent direct command:

```bash
blender --background --python assets/navisense-vest-blender/create_navisense_vest.py
```

The script writes:

- `assets/navisense-vest-blender/exports/navisense-vest.glb`
- `assets/navisense-vest-blender/exports/navisense-vest-poster.svg`
- `public/models/navisense-vest.glb`
- `public/models/navisense-vest-poster.svg`

## Validation

After export, run:

```bash
npm run typecheck
npm run lint
npm run build
```

Then verify the intro:

- Desktop loads the GLB and keeps the exploded view.
- Mobile/reduced-motion does not load WebGL and shows the SVG poster.
- The model reads as a real vest, not a PS1-style placeholder, icon, capsule, or flat polygon.

## Reference Images

Place local reference images in `assets/navisense-vest-blender/reference/`. Temporary Windows paths sent through chat are not reliably accessible from the workspace, so copied files are the safest source of truth.
