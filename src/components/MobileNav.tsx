import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { sectionIds, siteData, colors } from "../data/siteData";
import { withBaseUrl } from "../utils/assetUrl";

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
          position: "relative",
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
            width: "100%",
            height: "100svh",
            background: "rgba(6,12,58,0.96)",
            color: colors.cyan2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "max(24px, env(safe-area-inset-top)) 24px max(24px, env(safe-area-inset-bottom))",
            overflowY: "auto",
            overscrollBehavior: "contain",
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
          <a
            href={withBaseUrl("proposal.pdf")}
            download="NAVISense_Project_Proposal.pdf"
            style={{
              marginTop: 18,
              padding: "12px 18px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.08)",
              color: "#F8FAFC",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 15,
            }}
            onClick={() => setOpen(false)}
          >
            Download Project Proposal
          </a>
        </nav>
      )}
    </>
  );
};

export default MobileNav;
