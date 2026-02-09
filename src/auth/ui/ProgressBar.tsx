// src/auth/ui/ProgressBar.tsx

import React from "react";
import { theme } from "./../theme/authTheme";

interface ProgressBarProps {
  value: number; // 0 → 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div style={styles.container}>
      <div style={{ ...styles.bar, width: `${clamped}%` }} />
    </div>
  );
};

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100%",
    height: 8,
    borderRadius: 999,
    background: "rgba(255,255,255,.08)",
    overflow: "hidden",
    marginBottom: 16,
  },

  bar: {
    height: "100%",
    borderRadius: 999,
    background: theme.gradients.primaryButton,
    boxShadow: "0 0 10px rgba(232,162,182,.5)",
    transition: "width .35s ease",
  },
};

export default ProgressBar;
