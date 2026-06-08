import React from "react";
import { useResponsive } from "../context/ResponsiveContext";

export function RevealImage({
  alt,
  decoding = "async",
  fetchPriority,
  loading = "lazy",
  src,
  style,
}: {
  alt: string;
  decoding?: "async" | "auto" | "sync";
  fetchPriority?: "auto" | "high" | "low";
  loading?: "eager" | "lazy";
  src: string;
  style?: React.CSSProperties;
}) {
  const { disableMotion } = useResponsive();
  const [loaded, setLoaded] = React.useState(() => disableMotion);
  const imageRef = React.useRef<HTMLImageElement | null>(null);

  React.useEffect(() => {
    const image = imageRef.current;

    setLoaded(disableMotion || Boolean(image?.complete && image.naturalWidth > 0));
  }, [disableMotion, src]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "10% 18% 0",
          borderRadius: 24,
          background:
            "linear-gradient(180deg, rgba(95, 169, 232, 0.14) 0%, rgba(168, 143, 255, 0.08) 100%)",
          opacity: disableMotion || loaded ? 0 : 1,
          transform: disableMotion || loaded ? "scale(0.98)" : "scale(1)",
          transition: disableMotion ? "none" : "opacity 220ms ease, transform 220ms ease",
        }}
      />

      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        style={{
          ...style,
          opacity: disableMotion || loaded ? 1 : 0,
          transition: disableMotion ? "none" : "opacity 260ms ease",
          position: "relative",
          zIndex: 1,
        }}
      />
    </div>
  );
}
