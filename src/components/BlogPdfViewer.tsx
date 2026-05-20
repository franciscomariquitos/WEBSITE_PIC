import React from "react";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.mjs?url";
import "./BlogPdfViewer.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

type BlogPdfViewerProps = {
  url: string;
  title: string;
};

type PdfPageCanvasProps = {
  document: PDFDocumentProxy;
  pageNumber: number;
  pageWidth: number;
};

function PdfPageCanvas({ document, pageNumber, pageWidth }: PdfPageCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [renderState, setRenderState] = React.useState<"loading" | "ready" | "error">("loading");

  React.useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || pageWidth <= 0) {
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
        if (!cancelled && error?.name !== "RenderingCancelledException") {
          setRenderState("error");
        }
      });

    return () => {
      cancelled = true;
      renderTask?.cancel();
    };
  }, [document, pageNumber, pageWidth]);

  return (
    <div className="blog-pdf-page">
      {renderState === "loading" ? <div className="blog-pdf-page__loading" /> : null}
      <canvas
        ref={canvasRef}
        className="blog-pdf-page__canvas"
        aria-label={`Page ${pageNumber}`}
        style={{ display: renderState === "ready" ? "block" : "none" }}
      />
      {renderState === "error" ? (
        <div className="blog-pdf-viewer__status">This page could not be rendered.</div>
      ) : null}
    </div>
  );
}

export function BlogPdfViewer({ url, title }: BlogPdfViewerProps) {
  const viewerRef = React.useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [document, setDocument] = React.useState<PDFDocumentProxy | null>(null);
  const [pageCount, setPageCount] = React.useState(0);
  const [status, setStatus] = React.useState<"loading" | "ready" | "error">("loading");

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
    const loadingTask = pdfjsLib.getDocument({ url });

    setStatus("loading");
    setDocument(null);
    setPageCount(0);

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

    return Math.max(260, Math.min(containerWidth - 56, 860));
  }, [containerWidth]);

  return (
    <div className="blog-pdf-viewer" ref={viewerRef}>
      <div className="blog-pdf-viewer__scroller" aria-label={`${title} report reader`}>
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

        {status === "ready" && document && pageWidth > 0 ? (
          <div className="blog-pdf-viewer__pages">
            {Array.from({ length: pageCount }, (_, index) => (
              <PdfPageCanvas
                key={`${url}-${index + 1}`}
                document={document}
                pageNumber={index + 1}
                pageWidth={pageWidth}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
