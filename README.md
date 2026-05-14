# NAVISense Website

React + Vite website for the NAVISense project.

## Development

```bash
npm install
npm run dev
```

## Build

The public base path is configurable through `VITE_BASE_PATH`.

```bash
npm run build
```

For a subfolder deployment, keep `VITE_BASE_PATH` aligned with the final public URL:

```bash
VITE_BASE_PATH=/~ist1106726/NAVISENSE/ npm run build
```

## 3D Vest Asset

The production-like vest model is sourced from the Blender pipeline in `assets/navisense-vest-blender/`.

```bash
npm run generate:vest
```

If Blender is not on your PATH, set `BLENDER_BIN` to the executable:

```bash
BLENDER_BIN="/mnt/c/Program Files/Blender Foundation/Blender 4.3/blender.exe" npm run generate:vest
```

This exports `public/models/navisense-vest.glb` and `public/models/navisense-vest-poster.svg`. The older Three.js generator is kept only as a fallback:

```bash
npm run generate:vest:legacy
```

## Reports

Blog posts can keep their future `reportPdfUrl` values while the PDFs are not ready yet.
Until the file exists in `public/reports/`, keep `reportAvailable: false`; once the PDF is added, switch it to `true`.

## NaviCare Dashboard

Open the monitoring dashboard through `#navicare`. The current login is a simulated project account:

```text
username: navicare.monitor
password: NaviCare2026
```

If Supabase is not configured, NaviCare uses demo telemetry around IST/Lisbon. To read live data, configure:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_NAVICARE_VEST_ID=demo-vest-01
```

The website expects a read-only `vest_status` table or view with:

```text
vest_id, display_name, latitude, longitude, bluetooth_connected,
critical_state, last_seen_at, heart_rate_bpm
```

Keep Supabase anon access read-only and protected with RLS. The demo login is only a presentation layer, not real security.
