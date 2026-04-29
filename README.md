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

## Reports

Blog posts can keep their future `reportPdfUrl` values while the PDFs are not ready yet.
Until the file exists in `public/reports/`, keep `reportAvailable: false`; once the PDF is added, switch it to `true`.
