import React from "react";
import { getStyles } from "../styles";

type ResponsiveValue = {
  disableMotion: boolean;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  styles: ReturnType<typeof getStyles>;
};

const ResponsiveContext = React.createContext<ResponsiveValue | null>(null);

export function ResponsiveProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ResponsiveValue;
}) {
  return (
    <ResponsiveContext.Provider value={value}>
      {children}
    </ResponsiveContext.Provider>
  );
}

export function useResponsive() {
  const value = React.useContext(ResponsiveContext);

  if (!value) {
    throw new Error("useResponsive must be used within a ResponsiveProvider.");
  }

  return value;
}
