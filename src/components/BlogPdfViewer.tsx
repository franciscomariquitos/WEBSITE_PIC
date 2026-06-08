import React from "react";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import pdfWorkerUrl from "pdfjs-dist/legacy/build/pdf.worker.mjs?url";
import { useIsMobile } from "../hooks/useIsMobile";
import "./BlogPdfViewer.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

type PromiseWithResolversResult<T> = {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
};

type PromiseConstructorWithResolvers = PromiseConstructor & {
  withResolvers?: <T>() => PromiseWithResolversResult<T>;
};

function ensurePromiseWithResolvers() {
  const promiseConstructor = Promise as PromiseConstructorWithResolvers;

  if (typeof promiseConstructor.withResolvers === "function") {
    return;
  }

  Object.defineProperty(promiseConstructor, "withResolvers", {
    configurable: true,
    value: function withResolvers<T>() {
      let resolve!: PromiseWithResolversResult<T>["resolve"];
      let reject!: PromiseWithResolversResult<T>["reject"];
      const promise = new Promise<T>((promiseResolve, promiseReject) => {
        resolve = promiseResolve;
        reject = promiseReject;
      });

      return { promise, resolve, reject };
    },
  });
}

function isRenderCancellation(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  return (
    error.name === "RenderingCancelledException" ||
    /cancel/i.test(error.name) ||
    /cancel/i.test(error.message)
  );
}

ensurePromiseWithResolvers();

type BlogPdfViewerProps = {
  url: string;
  title: string;
};

const MOBILE_PAGE_MIN_WIDTH = 420;
const MOBILE_PAGE_MAX_WIDTH = 760;
const MOBILE_PAGE_WIDTH_MULTIPLIER = 1.45;

type PdfPageCanvasProps = {
  document: PDFDocumentProxy;
  onRenderError: () => void;
  pageNumber: number;
  pageWidth: number;
  scrollerRef: React.RefObject<HTMLDivElement | null>;
};

function PdfPageCanvas({
  document,
  onRenderError,
  pageNumber,
  pageWidth,
  scrollerRef,
}: PdfPageCanvasProps) {
  const pageRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [renderRequested, setRenderRequested] = React.useState(() => pageNumber === 1);
  const [renderState, setRenderState] = React.useState<"loading" | "ready" | "error">("loading");
  const estimatedPageHeight = pageWidth > 0 ? Math.round(pageWidth * 1.414) : 360;

  React.useEffect(() => {
    setRenderRequested(pageNumber === 1);
    setRenderState("loading");
  }, [document, pageNumber]);

  React.useEffect(() => {
    if (renderRequested) {
      return undefined;
    }

    const element = pageRef.current;

    if (!element || typeof IntersectionObserver === "undefined") {
      setRenderRequested(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRenderRequested(true);
          observer.disconnect();
        }
      },
      {
        root: scrollerRef.current,
        rootMargin: "900px 0px",
        threshold: 0.01,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [renderRequested, scrollerRef]);

  React.useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || pageWidth <= 0 || !renderRequested) {
      return undefined;
    }

    let cancelled = false;
    let renderTask: RenderTask | null = null;

    setRenderState("loading");

    document
      .getPage(pageNumber)
      .then((page) => {
        if (cancelled) {
          return null;
        }

        const baseViewport = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({
          scale: pageWidth / baseViewport.width,
        });
        const outputScale = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        renderTask = page.render({
          canvas,
          viewport,
          transform:
            outputScale !== 1
              ? [outputScale, 0, 0, outputScale, 0, 0]
              : undefined,
          background: "#020326",
        });

        return renderTask.promise;
      })
      .then(() => {
        if (!cancelled) {
          setRenderState("ready");
        }
      })
      .catch((error) => {
        if (!cancelled && !isRenderCancellation(error)) {
          console.warn(`Could not render PDF page ${pageNumber}.`, error);
          setRenderState("error");
          onRenderError();
        }
      });

    return () => {
      cancelled = true;
      renderTask?.cancel();
    };
  }, [document, onRenderError, pageNumber, pageWidth, renderRequested]);

  return (
    <div className="blog-pdf-page" ref={pageRef}>
      {renderState === "loading" ? (
        <div
          className="blog-pdf-page__loading"
          style={{
            width: pageWidth > 0 ? pageWidth : undefined,
            height: estimatedPageHeight,
          }}
        />
      ) : null}
      <canvas
        ref={canvasRef}
        className="blog-pdf-page__canvas"
        data-render-state={renderState}
        aria-label={`Page ${pageNumber}`}
      />
      {renderState === "error" ? (
        <div className="blog-pdf-viewer__status">This page could not be rendered.</div>
      ) : null}
    </div>
  );
}

export function BlogPdfViewer({ url, title }: BlogPdfViewerProps) {
  const isMobile = useIsMobile();
  const viewerRef = React.useRef<HTMLDivElement | null>(null);
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [document, setDocument] = React.useState<PDFDocumentProxy | null>(null);
  const [pageCount, setPageCount] = React.useState(0);
  const [status, setStatus] = React.useState<"loading" | "ready" | "error">("loading");
  const [renderFailed, setRenderFailed] = React.useState(false);

  React.useEffect(() => {
    window.document.body.classList.add("navisense-report-pan-active");
    window.document.documentElement.classList.add("navisense-report-pan-active");

    return () => {
      window.document.body.classList.remove("navisense-report-pan-active");
      window.document.documentElement.classList.remove("navisense-report-pan-active");
    };
  }, []);

  React.useEffect(() => {
    const element = viewerRef.current;

    if (!element) {
      return undefined;
    }

    const updateWidth = () => {
      setContainerWidth(element.clientWidth);
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    const loadingTask = pdfjsLib.getDocument({
      url,
      stopAtErrors: false,
      useSystemFonts: true,
    });

    setStatus("loading");
    setDocument(null);
    setPageCount(0);
    setRenderFailed(false);

    loadingTask.promise
      .then((loadedDocument) => {
        if (cancelled) {
          void loadedDocument.destroy();
          return;
        }

        setDocument(loadedDocument);
        setPageCount(loadedDocument.numPages);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) {
          setStatus("error");
        }
      });

    return () => {
      cancelled = true;
      void loadingTask.destroy();
    };
  }, [url]);

  const pageWidth = React.useMemo(() => {
    if (!containerWidth) {
      return 0;
    }

    if (isMobile) {
      return Math.round(
        Math.min(
          Math.max(containerWidth * MOBILE_PAGE_WIDTH_MULTIPLIER, MOBILE_PAGE_MIN_WIDTH),
          MOBILE_PAGE_MAX_WIDTH
        )
      );
    }

    return Math.max(260, Math.min(containerWidth - 56, 860));
  }, [containerWidth, isMobile]);

  const handleRenderError = React.useCallback(() => {
    setRenderFailed(true);
  }, []);

  return (
    <div className="blog-pdf-viewer" ref={viewerRef}>
      <div
        className="blog-pdf-viewer__scroller"
        ref={scrollerRef}
        aria-label={`${title} report reader`}
      >
        {status === "loading" ? (
          <div className="blog-pdf-viewer__status">
            <span className="blog-pdf-viewer__spinner" aria-hidden="true" />
            Loading report
          </div>
        ) : null}

        {status === "error" ? (
          <div className="blog-pdf-viewer__status">
            The report could not be loaded. You can still use the download link above.
          </div>
        ) : null}

        {status === "ready" && document && pageWidth > 0 && !renderFailed ? (
          <div className="blog-pdf-viewer__pages">
            {Array.from({ length: pageCount }, (_, index) => (
              <PdfPageCanvas
                key={`${url}-${index + 1}`}
                document={document}
                onRenderError={handleRenderError}
                pageNumber={index + 1}
                pageWidth={pageWidth}
                scrollerRef={scrollerRef}
              />
            ))}
          </div>
        ) : null}

        {status === "ready" && renderFailed ? (
          <div className="blog-pdf-viewer__fallback-card">
            <strong>Embedded reader unavailable in this browser.</strong>
            <span>
              The PDF is attached, but this browser could not draw it inside the custom reader.
            </span>
            <a href={url} target="_blank" rel="noreferrer">
              Open PDF
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}
