// src/auth/ui/Loader.tsx

import React from "react";
import { theme } from "./../theme/authTheme";

interface LoaderProps {
  label?: string;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ label = "Chargement...", fullScreen = false }) => {
  return (
    <div style={{ ...styles.wrap, ...(fullScreen ? styles.fullScreen : {}) }}>
      <div style={styles.glow} />
      <div style={styles.ring} aria-label="loading" />
      {label ? <div style={styles.text}>{label}</div> : null}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    position: "relative",
    padding: 10,
  },

  fullScreen: {
    minHeight: "100vh",
    background: theme.colors.black,
    overflow: "hidden",
  },

  glow: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: "50%",
    background: `radial-gradient(circle, ${theme.colors.roseGoldSoft}55, transparent 70%)`,
    filter: "blur(40px)",
    opacity: 0.9,
  },

  ring: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: "3px solid rgba(255,255,255,0.14)",
    borderTop: `3px solid ${theme.colors.roseGold}`,
    animation: "authSpin 0.9s linear infinite",
    zIndex: 2,
  },

  text: {
    zIndex: 2,
    fontSize: 12.5,
    fontWeight: 900,
    letterSpacing: 0.2,
    color: theme.colors.textMuted,
    textAlign: "center",
  },
};

/**
 * Petit hack propre:
 * On injecte l'animation une seule fois au runtime sans CSS file.
 * Ça évite "écran blanc" et évite de créer un fichier CSS.
 */
let injected = false;
function injectKeyframes() {
  if (injected) return;
  injected = true;

  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes authSpin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

if (typeof window !== "undefined") injectKeyframes();

export default Loader;
