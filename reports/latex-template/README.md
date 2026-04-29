# NAVISense Report Template

Premium LaTeX template for full blog reports. It follows the current NAVISense visual
language: dark technical background, cyan/purple accents, glass-style cards, compact
metadata tags, and a pitch-deck-inspired cover.

## How to Use

1. Duplicate the `latex-template` folder for a new report.
2. Rename `navisense-report-template.tex` if useful.
3. Edit the metadata block near the bottom of the `.tex` file:

```tex
\renewcommand{\ReportTitle}{Prototype Development Report}
\renewcommand{\ReportSubtitle}{A focused technical note on progress, decisions, risks, and next steps.}
\renewcommand{\ReportCategory}{Development}
\renewcommand{\ReportAuthor}{NAVISense Team}
\renewcommand{\ReportDate}{April 2026}
\renewcommand{\ReportVersion}{v1.0}
\renewcommand{\ReportStatus}{Draft}
```

4. Compile with **XeLaTeX** for the best visual result.

In Overleaf, set:

- Compiler: `XeLaTeX`
- Main document: `navisense-report-template.tex`

The template now also compiles with `pdfLaTeX` using fallback fonts, but `XeLaTeX`
is closer to the intended NAVISense / pitch-deck style.

Locally, if LaTeX is installed:

```bash
latexmk -xelatex navisense-report-template.tex
```

## Publishing to the Website

When the report PDF is ready:

1. Put the exported PDF in `public/reports/`.
2. Use a clean lowercase filename, for example:

```text
public/reports/prototype-development.pdf
```

3. In `src/data/siteData.tsx`, update the matching blog post:

```ts
reportPdfUrl: "reports/prototype-development.pdf",
reportAvailable: true,
```

4. Run the site build so `dist/` receives the PDF:

```bash
npm run build
```

## Useful Template Blocks

The template is now designed to work best as a clean report first: sections,
paragraphs, lists, and tables. Use boxes only when they add emphasis.

Use `NaviSectionNote` for a lightweight note inside a normal section:

```tex
\NaviSectionNote{Design decision}{Short explanation of the decision and why it matters.}
```

Use `NaviGlassBox` sparingly for content that genuinely needs to be visually separated:

```tex
\begin{NaviGlassBox}
Important context, observations, or evidence.
\end{NaviGlassBox}
```

Use `NaviAccentBox` only for major highlights:

```tex
\begin{NaviAccentBox}{Design decision}
Short explanation of the decision and why it matters.
\end{NaviAccentBox}
```

Use `NaviMetric` only if you want a more deck-like summary row:

```tex
\NaviMetric{62\%}{Progress}{Prototype integration is moving through the active build phase.}
```

## Notes

- The template references `assets/navisense-logo.png` and `assets/vesticon.png`.
- The visual style is intended for digital PDF viewing. If a print-friendly version is needed later, create a separate light theme rather than weakening this one.
- Keep reports focused: one report should explain one major update, not replace the full project proposal.
