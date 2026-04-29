import { useMediaQuery } from "./useMediaQuery";

/**
 * Hook that detects if the user prefers reduced motion
 * Returns true if user has set prefers-reduced-motion: reduce
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
