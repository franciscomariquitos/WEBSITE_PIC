import { useEffect, useState } from "react";

type LegacyMediaQueryList = MediaQueryList & {
  addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
  removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
};

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return false;
    }

    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(query) as LegacyMediaQueryList;
    const syncTimer = window.setTimeout(() => {
      setMatches(mediaQuery.matches);
    }, 0);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);

      return () => {
        window.clearTimeout(syncTimer);
        mediaQuery.removeEventListener("change", handleChange);
      };
    }

    mediaQuery.addListener?.(handleChange);

    return () => {
      window.clearTimeout(syncTimer);
      mediaQuery.removeListener?.(handleChange);
    };
  }, [query]);

  return matches;
}
