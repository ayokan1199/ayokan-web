// src/auth/ui/AuthLayout.tsx

import React from "react";
import { theme } from "./../theme/authTheme";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showLogo = true,
}) => {
  return (
    <div style={styles.page}>
      {/* Fond gradient premium */}
      <div style={styles.background} />
      <div style={styles.glowLeft} />
      <div style={styles.glowRight} />

      <div style={styles.card}>
        {showLogo && (
          <div style={styles.logoContainer}>
            <div style={styles.logoMark} />
            <span style={styles.logoText}>AYOKAN</span>
          </div>
        )}

        {title && <h1 style={styles.title}>{title}</h1>}
        {subtitle && <p style={styles.subtitle}>{subtitle}</p>}

        <div style={styles.content}>{children}</div>
      </div>
    </div>
  );
};

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    background: "#07060A",
    padding: 24,
  },

  background: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.9) 70%, rgba(0,0,0,.96) 100%)",
    zIndex: 0,
  },

  glowLeft: {
    position: "absolute",
    width: 720,
    height: 520,
    left: -220,
    top: -180,
    background: `radial-gradient(circle, ${theme.colors.roseGoldSoft}, transparent 70%)`,
    filter: "blur(50px)",
    zIndex: 0,
  },

  glowRight: {
    position: "absolute",
    width: 680,
    height: 520,
    right: -220,
    top: -200,
    background: `radial-gradient(circle, ${theme.colors.goldSoft}, transparent 70%)`,
    filter: "blur(50px)",
    zIndex: 0,
  },

  card: {
    zIndex: 2,
    width: "min(420px,100%)",
    padding: 26,
    borderRadius: theme.radii.lg,
    background:
      "radial-gradient(260px 180px at 18% 12%, rgba(232,162,182,0.16), transparent 62%)," +
      "radial-gradient(260px 180px at 82% 10%, rgba(215,178,124,0.12), transparent 62%)," +
      "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 18px 60px rgba(0,0,0,.55)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },

  logoMark: {
    width: 30,
    height: 30,
    borderRadius: 10,
    background: theme.gradients.primaryButton,
    boxShadow: "0 0 0 1px rgba(255,255,255,.12)",
  },

  logoText: {
    letterSpacing: 4,
    fontWeight: 900,
    fontSize: 13,
    color: theme.colors.textPrimary,
  },

  title: {
    fontSize: 26,
    fontWeight: 900,
    color: theme.colors.textPrimary,
    margin: "10px 0 6px",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: theme.colors.textMuted,
    marginBottom: 18,
    textAlign: "center",
    lineHeight: 1.5,
  },

  content: {
    width: "100%",
  },
};

export default AuthLayout;
