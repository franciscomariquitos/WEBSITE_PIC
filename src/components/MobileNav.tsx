import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { sectionIds, siteData, colors } from "../data/siteData";
import { styles } from "../styles";

const MobileNav: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-label={open ? "Close navigation" : "Open navigation"}
        style={{
          background: "none",
          border: "none",
          color: colors.cyan2,
          fontSize: 24,
          padding: 6,
          cursor: "pointer",
          zIndex: 120,
        }}
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>
      {open && (
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(6,12,58,0.96)",
            color: colors.cyan2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 110,
            transition: "background 0.3s",
          }}
        >
          {siteData.nav.map((item) => (
            <a
              key={item}
              href={`#${sectionIds[item as keyof typeof sectionIds]}`}
              style={{
                fontSize: 22,
                color: colors.cyan2,
                textDecoration: "none",
                margin: "18px 0",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                transition: "color 0.2s",
              }}
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
      )}
    </>
  );
};

export default MobileNav;
